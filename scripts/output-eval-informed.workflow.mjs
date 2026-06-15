// scripts/output-eval-informed.workflow.mjs - the M-33 output-eval THREE-ARM runner (the informed
// control, codex adversarial review finding 2). Run it via the Claude Code Workflow tool (multi-agent
// opt-in required), not `node`.
//
// Why a third arm: the freehand control measures skill-vs-no-skill, which bundles the value of the
// skill's STRUCTURE (its template) with the value of its RIGOR (its instructions). This runner adds an
// INFORMED control that gets the template + scenario but NOT the skill instructions, isolating the two:
//   - skill arm    = real SKILL.md instructions + references/TEMPLATE.md + the scenario
//   - informed arm = references/TEMPLATE.md + the scenario (structure, NO instructions/rigor)
//   - freehand arm = the scenario only (neither)
// A skill that merely emits the expected sections ties the informed control; a skill that adds real
// rigor still beats it. The verdict (gateVerdict3) gains a 'pass-structural' tier for "beats freehand
// but the rigor premium over template-only is thin."
//
// Relationship to the canonical logic: the un-blind + two-gap aggregation + the verdict below MIRROR
// unblindAndAggregate3 + gateVerdict3 in scripts/output-eval-aggregate.mjs, which is unit-tested.
// Workflow scripts cannot `import`, so the logic is duplicated; keep it in sync with that module.
// The 2-arm batch runner (output-eval-batch.workflow.mjs) is unchanged.

export const meta = {
  name: 'output-eval-informed',
  description: 'M-33 three-arm output-quality eval (skill vs freehand control vs informed control) across N sampled skills, Sonnet gen + Sonnet judges. The informed control reads the template (structure) but not the skill instructions (rigor), so the run separates the skill\'s structural value from its rigor. N blind judges score all three artifacts verbatim with positions rotated; derive the gap vs each control + inter-judge agreement vs the validity gates. Self-shakedown: skill 1 runs first and the rest fan out only if it returns a valid result. Fails closed per skill.',
  phases: [
    { title: 'Generate', detail: 'skill arm (reads SKILL.md+template) + informed (template only) + freehand (scenario only), Sonnet' },
    { title: 'Judge', detail: 'N blind Sonnet judges score all three arms verbatim, positions rotated' },
  ],
}

const a = typeof args === 'string' ? JSON.parse(args) : (args || {})
const CFGS = a.skills || []
const G = Math.max(1, a.generations || 2)
const N = Math.max(2, a.judges || 3)
const GEN_OPTS = a.genModel ? { model: a.genModel } : {}
const JUDGE_OPTS = a.judgeModel ? { model: a.judgeModel } : {}
const ANCHOR = (a.anchorScale || []).join('\n')

const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length
const stdev = (xs) => { const m = mean(xs); return Math.sqrt(mean(xs.map((x) => (x - m) ** 2))) }

// The three rotations so each arm lands in each of the A/B/C slots across judges (de-bias position).
const ROTATIONS = [
  { skillPos: 'a', freehandPos: 'b', informedPos: 'c' },
  { skillPos: 'b', freehandPos: 'c', informedPos: 'a' },
  { skillPos: 'c', freehandPos: 'a', informedPos: 'b' },
]

function judgeSchema(criteria) {
  const props = {}
  for (const k of criteria) props[k] = { type: 'integer', minimum: 1, maximum: 5 }
  props.notes = { type: 'string' }
  const art = { type: 'object', properties: props, required: [...criteria], additionalProperties: false }
  return {
    type: 'object',
    properties: { artifact_a: art, artifact_b: art, artifact_c: art, which_is_strongest: { type: 'string', enum: ['A', 'B', 'C'] }, one_line_rationale: { type: 'string' } },
    required: ['artifact_a', 'artifact_b', 'artifact_c', 'which_is_strongest', 'one_line_rationale'],
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

  // Skill arm: real SKILL.md instructions + template + scenario.
  const skillThunks = Array.from({ length: G }, (_, i) => () => agent(
    `You are executing a pm-skills product-management skill to produce a real artifact for a feature.\n1. Read the skill definition at \`${SKILL_PATH}\` and its template at \`${TEMPLATE_PATH}\` (if it exists).\n2. Read the input brief at \`${SCEN}\`. Use only the brief content; ignore the eval meta-note at the top of that file.\n3. Follow the skill's Instructions and Output Format EXACTLY to produce the artifact for that brief. Make reasonable assumptions for anything unspecified; do NOT ask questions or add commentary.\nYour entire final message must be ONLY the completed artifact in the skill's prescribed format. No preamble, no commentary.`,
    { label: `skill:${SKILL}#${i + 1}`, phase: 'Generate', ...GEN_OPTS },
  ))
  // Informed control: the TEMPLATE (structure) + scenario, but NOT the skill instructions (rigor).
  const informedThunk = () => agent(
    `You are a competent product manager producing a "${SKILL}"-type artifact for a feature. You have the OUTPUT TEMPLATE for this artifact (the section structure to fill) but NOT the skill's methodology, instructions, or quality checklist.\n1. Read ONLY the template at \`${TEMPLATE_PATH}\` to learn the required sections, and the input brief at \`${SCEN}\` (use the brief content; ignore the eval meta-note). Do NOT read \`${SKILL_PATH}\` or any other skill instructions, references, or rubric.\n2. Fill the template's sections for this brief as well as you can from general PM knowledge. Do not invent rigor the template does not ask for; just complete the structure competently.\nYour entire final message must be ONLY the artifact in the template's structure. No preamble, no commentary.`,
    { label: `informed:${SKILL}`, phase: 'Generate', ...GEN_OPTS },
  )
  // Freehand control: scenario only, no structure.
  const freehandThunk = () => agent(
    `You are a competent product manager asked to quickly produce a "${SKILL}"-type artifact for a feature. You have solid general PM experience but you are NOT using any special template, framework, or checklist, and you only have a few minutes.\nRead ONLY the input brief at \`${SCEN}\` (use the brief sections; ignore the eval meta-note). Do NOT read or use any SKILL.md, template, references, or rubric file.\nWrite a reasonable first-pass artifact from memory. Do not deliberately make it weak; just write what you would actually produce quickly without special tooling.\nYour entire final message must be ONLY the artifact. No preamble, no commentary.`,
    { label: `freehand:${SKILL}`, phase: 'Generate', ...GEN_OPTS },
  )

  const gen = await parallel([...skillThunks, informedThunk, freehandThunk])
  const skillDrafts = gen.slice(0, G).filter(Boolean)
  const informed = gen[G]
  const freehand = gen[G + 1]
  if (skillDrafts.length < G || !informed || !freehand) {
    return { skill: SKILL, status: 'void', reason: 'generation-incomplete', actual: { skillDrafts: skillDrafts.length, informed: !!informed, freehand: !!freehand } }
  }

  const rubricBlock = `=== THE ANCHOR SCALE (apply to every criterion) ===\n${ANCHOR}\n\n=== CRITERIA (score each 1-5 for ALL THREE artifacts) ===\n${CRIT_DEFS}`
  const judgeThunks = Array.from({ length: N }, (_, j) => () => {
    const draft = skillDrafts[j % skillDrafts.length]
    const rot = ROTATIONS[j % 3]
    const arms = { [rot.skillPos]: draft, [rot.freehandPos]: freehand, [rot.informedPos]: informed }
    const prompt = `You are an expert Product Management reviewer acting as a blind judge in an output-quality evaluation. You are given a feature scenario and THREE artifacts (Artifact A, Artifact B, Artifact C) produced for it. Score ALL THREE against the rubric. You do not know how any was produced. Be rigorous, independent, and score CONSERVATIVELY: when torn between two levels, pick the LOWER. 5 is reserved for work a senior PM would not touch.\n\nFirst read the scenario at \`${SCEN}\` for context (use the brief sections; ignore the eval meta-note). Then score.\n\n${rubricBlock}\n\n=== ARTIFACT A ===\n${arms.a}\n\n=== ARTIFACT B ===\n${arms.b}\n\n=== ARTIFACT C ===\n${arms.c}\n\nReturn your per-criterion integer scores (1-5) for each of the three artifacts, which is strongest, and a one-line rationale.`
    return agent(prompt, { label: `judge#${j + 1}:${SKILL}`, phase: 'Judge', schema: JUDGE_SCHEMA, ...JUDGE_OPTS })
      .then((v) => (v ? { judge: j + 1, ...rot, v } : null))
  })

  const judged = (await parallel(judgeThunks)).filter(Boolean)
  if (judged.length < N) return { skill: SKILL, status: 'void', reason: 'panel-incomplete', judges: judged.length }

  // Un-blind via each judge's rotation - MIRRORS unblindAndAggregate3 in output-eval-aggregate.mjs (tested).
  const pick = (v, pos) => v[`artifact_${pos}`]
  const skillRows = [], freehandRows = [], informedRows = []
  for (const { skillPos, freehandPos, informedPos, v } of judged) {
    skillRows.push(pick(v, skillPos)); freehandRows.push(pick(v, freehandPos)); informedRows.push(pick(v, informedPos))
  }
  const perCriterion = (rows, k) => mean(rows.map((r) => r[k]))
  const overallOf = (rows) => mean(rows.map((r) => mean(CRITERIA.map((k) => r[k]))))
  const per = (rows) => { const o = {}; for (const k of CRITERIA) o[k] = perCriterion(rows, k); return o }
  const skillOveralls = skillRows.map((r) => mean(CRITERIA.map((k) => r[k])))
  const skillOverall = overallOf(skillRows), freehandOverall = overallOf(freehandRows), informedOverall = overallOf(informedRows)
  const gapFreehand = skillOverall - freehandOverall, gapInformed = skillOverall - informedOverall
  const agreement = stdev(skillOveralls)
  let skillWins = 0
  for (const { skillPos, v } of judged) if (v.which_is_strongest === skillPos.toUpperCase()) skillWins += 1

  // Verdict - MIRRORS gateVerdict3 in output-eval-aggregate.mjs (tested). Absolute-failure-first, then
  // the freehand discrimination gate, then the informed "rigor premium" tier.
  const floored = Object.entries(per(skillRows)).filter(([, m]) => m < 2.5).map(([k]) => k)
  const absolutePass = skillOverall >= 3.5 && floored.length === 0
  const freehandPass = gapFreehand >= 1.0
  const informedPass = gapInformed >= 0.5
  const agreementPass = agreement <= 0.7
  const verdict = !absolutePass ? 'fail' : (!freehandPass || !agreementPass) ? 'void-inconclusive' : (!informedPass ? 'pass-structural' : 'pass')

  log(`${SKILL}: ${verdict.toUpperCase()} | skill ${skillOverall.toFixed(2)} | vs freehand ${freehandOverall.toFixed(2)} (gap ${gapFreehand.toFixed(2)} ${freehandPass ? 'PASS' : 'FAIL'}) | vs informed ${informedOverall.toFixed(2)} (gap ${gapInformed.toFixed(2)} ${informedPass ? 'PASS' : 'FAIL'}) | agree ${agreement.toFixed(2)} | pref ${skillWins}/${judged.length}`)
  return {
    skill: SKILL, status: 'ok', verdict, absolute_pass: absolutePass, floored_criteria: floored,
    generations: skillDrafts.length, judges: judged.length,
    skill_overall: skillOverall, freehand_overall: freehandOverall, informed_overall: informedOverall,
    gap_vs_freehand: gapFreehand, gap_vs_informed: gapInformed, agreement_stdev: agreement,
    blind_preference_skill: `${skillWins}/${judged.length}`,
    skill_per_criterion: per(skillRows), freehand_per_criterion: per(freehandRows), informed_per_criterion: per(informedRows),
    gates: { freehand: { value: gapFreehand, target: 1.0, pass: freehandPass }, informed: { value: gapInformed, target: 0.5, pass: informedPass }, agreement: { value: agreement, target: 0.7, pass: agreementPass } },
    raw_judges: judged.map(({ judge, skillPos, freehandPos, informedPos, v }) => ({ judge, skillPos, freehandPos, informedPos, artifact_a: v.artifact_a, artifact_b: v.artifact_b, artifact_c: v.artifact_c, which_is_strongest: v.which_is_strongest })),
    artifacts: { skill_drafts: skillDrafts, informed, freehand },
  }
}

if (!CFGS.length) return { error: 'no skills supplied' }

log(`Shakedown: evaluating ${CFGS[0].skill} first (1 of ${CFGS.length})...`)
const first = await evalSkill(CFGS[0])
if (!first || first.status !== 'ok') {
  log(`Shakedown did NOT produce a valid result for ${CFGS[0].skill} (status: ${first ? first.status : 'null'}). Stopping before spending the remaining ${CFGS.length - 1} skills.`)
  return { shakedown: 'failed', results: [first] }
}
log(`Shakedown OK (${CFGS[0].skill}: ${first.verdict}). Fanning out the remaining ${CFGS.length - 1} skills.`)
const rest = await parallel(CFGS.slice(1).map((c) => () => evalSkill(c)))
return { results: [first, ...rest] }
