// scripts/output-eval-batch.workflow.mjs - the M-33 output-eval batch runner. It is a Workflow-tool
// script: run it via the Claude Code Workflow tool (multi-agent opt-in required), not `node`.
//
// Provenance: the 2026-06-14 representative-sample run (records/output-eval-batch-20260614.md + its
// .raw.json) used the version of this file committed at 25c37e9b. This revision (post codex adversarial
// review) emits the raw per-judge rows and a verdict so future runs are fully re-derivable and self-
// labelling; the recorded 2026-06-14 numbers are unchanged (the revision is for the next wave).
//
// Relationship to the canonical logic: the un-blinding + criterion-mean aggregation + the absolute-
// failure-first verdict below MIRROR scripts/output-eval-aggregate.mjs, which is unit-tested
// (output-eval-aggregate.test.mjs). Workflow scripts cannot `import`, so the logic is duplicated; keep
// it in sync with that module, which is the reference. The single-skill harness
// scripts/output-eval.workflow.mjs is the canonical tool; this batch runner fans the same per-skill flow
// across N skills with a self-shakedown gate.
//
// REMAINING LIMITATION: the control arm is freehand-only (no output contract); the "informed control"
// enhancement (codex finding 2) is not yet implemented here.

export const meta = {
  name: 'output-eval-batch',
  description: 'M-33 output-quality eval across N sampled skills (Sonnet gen + Sonnet judges). Per skill: skill-arm reads its real SKILL.md+template and produces the artifact; a thin freehand control reads only the scenario; N blind judges score both verbatim; derive discrimination gap + inter-judge agreement vs the validity gates. Self-shakedown: skill 1 runs first and the rest fan out only if it returns a valid result. Fails closed per skill.',
  phases: [
    { title: 'Generate', detail: 'skill arm (reads real skill files) + thin control, Sonnet' },
    { title: 'Judge', detail: 'N blind Sonnet judges score both arms verbatim' },
  ],
}

const a = typeof args === 'string' ? JSON.parse(args) : (args || {})
const CFGS = a.skills || []
const G = Math.max(1, a.generations || 2)
const N = Math.max(1, a.judges || 3)
const GEN_OPTS = a.genModel ? { model: a.genModel } : {}
const JUDGE_OPTS = a.judgeModel ? { model: a.judgeModel } : {}
const ANCHOR = (a.anchorScale || []).join('\n')

const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length
const stdev = (xs) => { const m = mean(xs); return Math.sqrt(mean(xs.map((x) => (x - m) ** 2))) }

function judgeSchema(criteria) {
  const props = {}
  for (const k of criteria) props[k] = { type: 'integer', minimum: 1, maximum: 5 }
  props.notes = { type: 'string' }
  const art = { type: 'object', properties: props, required: [...criteria], additionalProperties: false }
  return {
    type: 'object',
    properties: { artifact_a: art, artifact_b: art, which_is_stronger: { type: 'string', enum: ['A', 'B'] }, one_line_rationale: { type: 'string' } },
    required: ['artifact_a', 'artifact_b', 'which_is_stronger', 'one_line_rationale'],
    additionalProperties: false,
  }
}

async function evalSkill(cfg) {
  const SKILL = cfg.skill
  const SCEN = cfg.scenarioPath
  const CRITERIA = cfg.criteria
  const CRIT_DEFS = (cfg.criteriaDefs || []).join('\n')
  const JUDGE_SCHEMA = judgeSchema(CRITERIA)
  const SKILL_PATH = `skills/${SKILL}/SKILL.md`
  const TEMPLATE_PATH = `skills/${SKILL}/references/TEMPLATE.md`

  // Skill arm: reads the REAL skill files and executes the skill on the brief.
  const skillThunks = Array.from({ length: G }, (_, i) => () => agent(
    `You are executing a pm-skills product-management skill to produce a real artifact for a feature.\n1. Read the skill definition at \`${SKILL_PATH}\` and, if it exists, its template at \`${TEMPLATE_PATH}\`.\n2. Read the input brief at \`${SCEN}\`. Use only the brief content (the "Feature brief" / "Situation" / "Context" / "Research context" sections); ignore the eval meta-note at the top of that file.\n3. Follow the skill's Instructions and Output Format EXACTLY to produce the artifact for that brief. Make reasonable assumptions for anything unspecified; do NOT ask questions or add commentary.\nYour entire final message must be ONLY the completed artifact in the skill's prescribed format. No preamble, no commentary.`,
    { label: `skill:${SKILL}#${i + 1}`, phase: 'Generate', ...GEN_OPTS },
  ))
  // Control arm: competent-but-thin freehand. Reads ONLY the scenario, no skill files.
  const controlThunk = () => agent(
    `You are a competent product manager asked to quickly produce a "${SKILL}"-type artifact for a feature. You have solid general PM experience but you are NOT using any special template, framework, or checklist, and you only have a few minutes.\nRead ONLY the input brief at \`${SCEN}\` (use the brief sections; ignore the eval meta-note at the top). Do NOT read or use any SKILL.md, template, references, or rubric file.\nWrite a reasonable first-pass artifact from memory. Do not deliberately make it weak; just write what you would actually produce quickly without special tooling.\nYour entire final message must be ONLY the artifact. No preamble, no commentary.`,
    { label: `control:${SKILL}`, phase: 'Generate', ...GEN_OPTS },
  )

  const gen = await parallel([...skillThunks, controlThunk])
  const skillDrafts = gen.slice(0, G).filter(Boolean)
  const control = gen[G]
  if (skillDrafts.length < G || !control) return { skill: SKILL, status: 'void', reason: 'generation-incomplete', actual: { skillDrafts: skillDrafts.length, control: !!control } }

  const rubricBlock = `=== THE ANCHOR SCALE (apply to every criterion) ===\n${ANCHOR}\n\n=== CRITERIA (score each 1-5 for BOTH artifacts) ===\n${CRIT_DEFS}`
  const judgeThunks = Array.from({ length: N }, (_, j) => () => {
    const draft = skillDrafts[j % skillDrafts.length]
    const skillIsA = j % 2 === 0
    const artifactA = skillIsA ? draft : control
    const artifactB = skillIsA ? control : draft
    const prompt = `You are an expert Product Management reviewer acting as a blind judge in an output-quality evaluation. You are given a feature scenario and TWO artifacts (Artifact A and Artifact B) produced for it. Score BOTH against the rubric. You do not know how either was produced. Be rigorous, independent, and score CONSERVATIVELY: when torn between two levels, pick the LOWER. 5 is reserved for work a senior PM would not touch.\n\nFirst read the scenario at \`${SCEN}\` for context (use the brief sections; ignore the eval meta-note). Then score.\n\n${rubricBlock}\n\n=== ARTIFACT A ===\n${artifactA}\n\n=== ARTIFACT B ===\n${artifactB}\n\nReturn your per-criterion integer scores (1-5) for each artifact, which is stronger, and a one-line rationale.`
    return agent(prompt, { label: `judge#${j + 1}:${SKILL}`, phase: 'Judge', schema: JUDGE_SCHEMA, ...JUDGE_OPTS })
      .then((v) => (v ? { judge: j + 1, skillIsA, v } : null))
  })

  const judged = (await parallel(judgeThunks)).filter(Boolean)
  if (judged.length < N || N < 2) return { skill: SKILL, status: 'void', reason: 'panel-incomplete', judges: judged.length }

  const skillRows = [], controlRows = []
  for (const { skillIsA, v } of judged) { skillRows.push(skillIsA ? v.artifact_a : v.artifact_b); controlRows.push(skillIsA ? v.artifact_b : v.artifact_a) }
  const perCriterion = (rows, k) => mean(rows.map((r) => r[k]))
  const overallOf = (rows) => mean(rows.map((r) => mean(CRITERIA.map((k) => r[k]))))
  const skillOveralls = skillRows.map((r) => mean(CRITERIA.map((k) => r[k])))
  const skillCrit = {}, controlCrit = {}
  for (const k of CRITERIA) { skillCrit[k] = perCriterion(skillRows, k); controlCrit[k] = perCriterion(controlRows, k) }
  const skillOverall = overallOf(skillRows), controlOverall = overallOf(controlRows)
  const gap = skillOverall - controlOverall, agreement = stdev(skillOveralls)
  const skillWins = judged.filter(({ skillIsA, v }) => (v.which_is_stronger === 'A') === skillIsA).length
  const gates = { discrimination: { value: gap, target: 1.0, pass: gap >= 1.0 }, agreement: { value: agreement, target: 0.7, pass: agreement <= 0.7 } }
  // Absolute-failure-first verdict - MIRRORS gateVerdict in scripts/output-eval-aggregate.mjs (tested).
  // A sub-bar or floored skill is a FAIL regardless of the gap; only an absolute-clearing skill is VOID
  // on a sub-threshold gap or high disagreement.
  const floored = Object.entries(skillCrit).filter(([, m]) => m < 2.5).map(([k]) => k)
  const absolutePass = skillOverall >= 3.5 && floored.length === 0
  const verdict = !absolutePass ? 'fail' : (!gates.discrimination.pass || !gates.agreement.pass) ? 'void-inconclusive' : 'pass'
  log(`${SKILL}: ${verdict.toUpperCase()} | skill ${skillOverall.toFixed(2)} vs control ${controlOverall.toFixed(2)} | gap ${gap.toFixed(2)} (${gates.discrimination.pass ? 'PASS' : 'FAIL'}) | agreement ${agreement.toFixed(2)} (${gates.agreement.pass ? 'PASS' : 'FAIL'}) | pref ${skillWins}/${judged.length}`)
  return {
    skill: SKILL, status: 'ok', verdict, absolute_pass: absolutePass, floored_criteria: floored,
    generations: skillDrafts.length, judges: judged.length,
    skill_overall: skillOverall, control_overall: controlOverall, discrimination_gap: gap, agreement_stdev: agreement,
    blind_preference_skill: `${skillWins}/${judged.length}`, skill_per_criterion: skillCrit, control_per_criterion: controlCrit, gates,
    rationales: judged.map(({ judge, v }) => ({ judge, stronger: v.which_is_stronger, why: v.one_line_rationale })),
    // Raw per-judge rows for independent re-aggregation (codex finding 3): each judge's full A/B
    // per-criterion scores + their blind assignment, so records/*.raw.json is re-derivable end to end.
    raw_judges: judged.map(({ judge, skillIsA, v }) => ({ judge, skillIsA, artifact_a: v.artifact_a, artifact_b: v.artifact_b, which_is_stronger: v.which_is_stronger })),
    // The verbatim generated artifact TEXT (not just scores), so a human anchor (P1-5) can be staged:
    // the maintainer needs to read the exact artifact the panel scored, which the score-only raw.json
    // cannot supply. Run an anchor at generations:1 so skill_drafts[0] is the single draft every judge
    // (and the maintainer) scores; the freehand control text is included for context.
    artifacts: { skill_drafts: skillDrafts, control },
  }
}

if (!CFGS.length) return { error: 'no skills supplied' }

// Self-shakedown: evaluate skill 1 fully first; only fan out the rest if it returns a valid result.
log(`Shakedown: evaluating ${CFGS[0].skill} first (1 of ${CFGS.length})...`)
const first = await evalSkill(CFGS[0])
if (!first || first.status !== 'ok') {
  log(`Shakedown did NOT produce a valid result for ${CFGS[0].skill} (status: ${first ? first.status : 'null'}). Stopping before spending the remaining ${CFGS.length - 1} skills.`)
  return { shakedown: 'failed', results: [first] }
}
log(`Shakedown OK (${CFGS[0].skill} gap ${first.discrimination_gap.toFixed(2)}). Fanning out the remaining ${CFGS.length - 1} skills.`)
const rest = await parallel(CFGS.slice(1).map((c) => () => evalSkill(c)))
return { results: [first, ...rest] }
