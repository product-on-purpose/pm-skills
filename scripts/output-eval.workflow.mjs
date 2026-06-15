// scripts/output-eval.workflow.mjs - the productized M-33 output-quality eval harness.
//
// This is a WORKFLOW-TOOL script (not a standalone node script). Run it via the Claude
// Code Workflow tool, which requires explicit multi-agent opt-in (ultracode / "use a
// workflow"). It orchestrates subscription subagents: it does NOT call the Messages API
// (output evals are few + heavy; the API engine is for trigger evals only).
//
// Method (spec_output-quality-evals.md + docs/internal/eval-rubrics/<family>.md):
//   1. Generate the skill arm G times (G generations, to average generation noise) and
//      the control arm once (a competent-but-thin freehand baseline, the negative control).
//   2. N blind judges each score one (skill-draft, control) pair against the rubric,
//      with A/B order alternated by judge index to de-bias position. Judges receive each
//      artifact VERBATIM and in full (a hard requirement: summarizing an artifact
//      asymmetrically under-credits the richer arm - learned the hard way on 2026-06-14).
//   3. Aggregate per-criterion means, derive overall as the criterion mean (NOT a separate
//      holistic score - holistic-overall ceilings even when criteria do not), compute the
//      discrimination gap and inter-judge agreement, and check the validity gates.
//
// The script has NO filesystem access, so the orchestrating session reads the skill
// instructions, scenario, and rubric and passes them in `args`:
//   args = {
//     skill: 'deliver-acceptance-criteria',
//     scenario: '<full scenario brief text>',
//     skillPrompt: '<the skill arm system content: the skill instructions + output template>',
//     criteria: ['mapping','happy_path','edge_error','non_functional','testability','no_impl_leak','specificity','completeness'],
//     anchorScale: '<the hardened 1-5 anchor scale text from the family rubric, section 2>',
//     criteriaDefs: '<one line per criterion: key - what it measures>',
//     generations: 2,   // skill-arm drafts (default 2)
//     judges: 3,        // panel size (default 3)
//     genModel: 'sonnet',   // OPTIONAL model for the generation arms (skill + control). Default: inherit.
//     judgeModel: 'sonnet', // OPTIONAL model for the judge panel. Default: inherit.
//   }
//
// genModel / judgeModel let the orchestrator pin the cheap+parallel rollout engine (Sonnet
// generation + Sonnet judges, validated 2026-06-14) without switching the orchestrating
// session's model: the main-loop model and the workflow-agent model are independent. When a
// model arg is unset, that arm inherits the session model (the documented default-inherit
// behaviour). Keep the judge model consistent within a run.

export const meta = {
  name: 'output-eval',
  description: 'M-33 output-quality eval for one skill + scenario: generate skill arm (xG) + a thin control, run an N-judge blind rubric panel, and report discrimination gap + inter-judge agreement against the validity gates.',
  phases: [
    { title: 'Generate', detail: 'skill arm (xG drafts) + control arm, same model' },
    { title: 'Judge', detail: 'N blind judges score both arms verbatim' },
  ],
}

const a = args || {}
const SKILL = a.skill || 'unknown-skill'
const SCENARIO = a.scenario || ''
const SKILL_PROMPT = a.skillPrompt || ''
const CRITERIA = a.criteria || ['specificity', 'completeness']
const ANCHOR = a.anchorScale || ''
const CRIT_DEFS = a.criteriaDefs || ''
const G = Math.max(1, a.generations || 2)
const N = Math.max(1, a.judges || 3)
// Optional model pins. Unset -> the arm inherits the session model (default-inherit). Built
// once and spread into each agent() opts so generation arms and judges can run on different
// models (the validated rollout: Sonnet generation + Sonnet judges, orchestrated on Opus).
const GEN_OPTS = a.genModel ? { model: a.genModel } : {}
const JUDGE_OPTS = a.judgeModel ? { model: a.judgeModel } : {}

// Per-artifact judge schema: one integer 1-5 per criterion + a short note. `overall` is
// NOT asked of the judge; it is derived as the criterion mean during aggregation.
const artifactScoreProps = {}
for (const k of CRITERIA) artifactScoreProps[k] = { type: 'integer', minimum: 1, maximum: 5 }
artifactScoreProps.notes = { type: 'string' }
const ARTIFACT_SCHEMA = { type: 'object', properties: artifactScoreProps, required: [...CRITERIA], additionalProperties: false }
const JUDGE_SCHEMA = {
  type: 'object',
  properties: {
    artifact_a: ARTIFACT_SCHEMA,
    artifact_b: ARTIFACT_SCHEMA,
    which_is_stronger: { type: 'string', enum: ['A', 'B'] },
    one_line_rationale: { type: 'string' },
  },
  required: ['artifact_a', 'artifact_b', 'which_is_stronger', 'one_line_rationale'],
  additionalProperties: false,
}

const mean = (xs) => xs.reduce((s, x) => s + x, 0) / xs.length
const stdev = (xs) => { const m = mean(xs); return Math.sqrt(mean(xs.map((x) => (x - m) ** 2))) } // population

phase('Generate')

// G skill drafts (same skill, same scenario - generation noise only) + 1 control.
const skillThunks = Array.from({ length: G }, (_, i) => () => agent(
  `${SKILL_PROMPT}\n\n=== FEATURE BRIEF (the scenario) ===\n${SCENARIO}\n\n=== END BRIEF ===\n\nProduce ONLY the completed artifact in the prescribed format. No preamble, no commentary.`,
  { label: `skill-arm:${SKILL}#${i + 1}`, phase: 'Generate', ...GEN_OPTS },
))
const controlThunk = () => agent(
  `You are a competent product manager asked to quickly produce a "${SKILL}"-type artifact for a feature. You have solid general PM experience but you are NOT using any special template, framework, or checklist, and you only have a few minutes. Write a reasonable first-pass artifact from memory. Do not deliberately make it weak; just write what you would actually produce quickly without special tooling.\n\nYour entire final message must be ONLY the artifact (no preamble, no commentary).\n\n=== FEATURE BRIEF ===\n${SCENARIO}\n\n=== END BRIEF ===`,
  { label: `control-arm:${SKILL}`, phase: 'Generate', ...GEN_OPTS },
)

const gen = await parallel([...skillThunks, controlThunk])
const skillDrafts = gen.slice(0, G).filter(Boolean)
const control = gen[G]
// Fail closed: a partial panel must never produce a score. If any of the G skill drafts
// or the control did not come back, the run is VOID (not a pass, not a silent degrade).
if (skillDrafts.length < G || !control) {
  log(`Generation incomplete: ${skillDrafts.length}/${G} skill drafts, control ${control ? 'ok' : 'missing'}. Voiding - a partial panel cannot produce evidence.`)
  return { status: 'void', reason: 'generation-incomplete', skill: SKILL, expected: { generations: G }, actual: { skillDrafts: skillDrafts.length, control: !!control } }
}

phase('Judge')

const rubricBlock = `=== THE ANCHOR SCALE (apply to every criterion) ===\n${ANCHOR}\n\n=== CRITERIA (score each 1-5 for BOTH artifacts) ===\n${CRIT_DEFS}`

// Each judge scores one (skill draft, control) pair, full text verbatim. A/B order
// alternates by judge index to de-bias position (even -> skill is A; odd -> skill is B).
const judgeThunks = Array.from({ length: N }, (_, j) => () => {
  const draft = skillDrafts[j % skillDrafts.length]
  const skillIsA = j % 2 === 0
  const artifactA = skillIsA ? draft : control
  const artifactB = skillIsA ? control : draft
  const prompt = `You are an expert Product Management reviewer acting as a blind judge in an output-quality evaluation. You are given a feature scenario and TWO artifacts (Artifact A and Artifact B) produced for it. Score BOTH against the rubric. You do not know how either was produced. Be rigorous, independent, and score CONSERVATIVELY: when torn between two levels, pick the LOWER. 5 is reserved for work a senior PM would not touch.\n\n${rubricBlock}\n\n=== THE SCENARIO ===\n${SCENARIO}\n\n=== ARTIFACT A ===\n${artifactA}\n\n=== ARTIFACT B ===\n${artifactB}\n\nReturn your per-criterion integer scores (1-5) for each artifact, which is stronger, and a one-line rationale.`
  return agent(prompt, { label: `judge#${j + 1}:${SKILL}`, phase: 'Judge', schema: JUDGE_SCHEMA, ...JUDGE_OPTS })
    .then((v) => (v ? { judge: j + 1, skillIsA, v } : null))
})

const judged = (await parallel(judgeThunks)).filter(Boolean)
// Fail closed: agreement is the stdev of the skill arm's overall across judges, which is
// 0 by construction with a single surviving judge - a degraded panel would then PASS the
// agreement gate on no real agreement. Require the full N-judge panel (and N >= 2 for a
// meaningful stdev); otherwise the run is VOID.
if (judged.length < N || N < 2) {
  log(`Judge panel unusable: ${judged.length}/${N} judges returned (need the full panel, N >= 2). Voiding - agreement is undefined, so a score here would be false confidence.`)
  return { status: 'void', reason: 'panel-incomplete', skill: SKILL, expected: { judges: N }, actual: { judges: judged.length } }
}

// Un-blind: map A/B back to skill/control per judge.
const skillRows = []
const controlRows = []
for (const { skillIsA, v } of judged) {
  skillRows.push(skillIsA ? v.artifact_a : v.artifact_b)
  controlRows.push(skillIsA ? v.artifact_b : v.artifact_a)
}

const perCriterion = (rows, k) => mean(rows.map((r) => r[k]))
const overallOf = (rows) => mean(rows.map((r) => mean(CRITERIA.map((k) => r[k])))) // derived: criterion mean
const skillOveralls = skillRows.map((r) => mean(CRITERIA.map((k) => r[k])))

const skillCrit = {}, controlCrit = {}
for (const k of CRITERIA) { skillCrit[k] = perCriterion(skillRows, k); controlCrit[k] = perCriterion(controlRows, k) }

const skillOverall = overallOf(skillRows)
const controlOverall = overallOf(controlRows)
const gap = skillOverall - controlOverall
const agreement = stdev(skillOveralls)
const skillWins = judged.filter(({ skillIsA, v }) => (v.which_is_stronger === 'A') === skillIsA).length

const gates = {
  discrimination: { value: gap, target: 1.0, pass: gap >= 1.0 },
  agreement: { value: agreement, target: 0.7, pass: agreement <= 0.7 },
}

log(`${SKILL}: skill ${skillOverall.toFixed(2)} vs control ${controlOverall.toFixed(2)} | gap ${gap.toFixed(2)} (${gates.discrimination.pass ? 'PASS' : 'FAIL'}) | agreement ${agreement.toFixed(2)} (${gates.agreement.pass ? 'PASS' : 'FAIL'}) | blind preference ${skillWins}/${judged.length} to skill`)

return {
  skill: SKILL,
  generations: skillDrafts.length,
  judges: judged.length,
  skill_overall: skillOverall,
  control_overall: controlOverall,
  discrimination_gap: gap,
  agreement_stdev: agreement,
  blind_preference_skill: `${skillWins}/${judged.length}`,
  skill_per_criterion: skillCrit,
  control_per_criterion: controlCrit,
  gates,
  rationales: judged.map(({ judge, v }) => ({ judge, stronger: v.which_is_stronger, why: v.one_line_rationale })),
  // The verbatim generated artifact TEXT (not just scores), so a human anchor (P1-5) can be staged
  // from a run: the maintainer must read the exact artifact the panel scored. Run an anchor at
  // generations:1 so skill_drafts[0] is the single draft every judge (and the maintainer) scores.
  artifacts: { skill_drafts: skillDrafts, control },
}
