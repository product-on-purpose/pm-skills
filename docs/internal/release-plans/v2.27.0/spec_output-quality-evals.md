# Spec: Output-Quality Evals (M-33) - "does the skill produce a good artifact when it fires?"

Status: DRAFT (2026-06-13). Successor to the trigger-accuracy evals (M-31). Where M-31 measures
*whether the right skill activates*, M-33 measures *whether the artifact it produces is actually good*.
This is the deeper, higher-value layer of the "provable quality" story.

## 0. Why this is a different instrument than trigger evals

The two eval layers are mirror images, and that flips the right engine (learned empirically in M-31):

| | Trigger evals (M-31) | Output evals (M-33) |
|---|---|---|
| Question | Does the right skill fire? | Is the artifact good when it does? |
| Cases | Many + light (580 queries, 5-token answers) | Few + heavy (a handful of scenarios/skill, full artifacts) |
| Right engine | Messages API (cheap, cacheable, parallel) | Pro/Max subagents (generate + judge, no API cost) |
| Cost driver | Per-call count | Per-case generation + judging depth |

So output evals run on the **subscription via subagents** (the workflow runtime), not the Messages API.
The throttle that wrecked the M-31 trigger workflow is a non-issue here because there are far fewer,
slower cases.

## 1. Method

Per skill, per scenario:
1. **Generate (skill arm):** a subagent executes the skill's instructions on a realistic scenario and
   produces the artifact.
2. **Generate (control arm):** a subagent produces a deliberately weak/generic artifact for the same
   scenario (the "freehand without the skill" baseline). This is the **negative control**.
3. **Judge panel:** N independent judge subagents (N=3 to start) score BOTH artifacts, blind to which is
   which, against a rubric, on each criterion (1-5) plus an overall (1-5). Structured output (schema).
4. **Aggregate:** per-criterion mean across judges for each arm; overall mean; the **discrimination gap**
   (skill overall minus control overall); and **inter-judge agreement** (stdev of overall across judges).

### Validity gates (the eval must prove itself before its numbers count)

These are the output-eval analog of the trigger eval's "6/6 calibration" discipline:
- **Discrimination:** the skill artifact must score materially higher than the negative control (target
  gap >= ~1.0 on the 1-5 overall). If the panel cannot tell the skill's work from generic mush, the
  rubric or judges are not discriminating and the result is void.
- **Agreement:** inter-judge stdev on the overall should be low (target <= ~0.7). High disagreement means
  the rubric is ambiguous; tighten it before trusting scores.
- **Human anchoring (per family, once):** a maintainer hand-scores 1-2 artifacts ("this is a 5, this is a
  2") and we confirm the panel lands near the anchor. Guards against panel drift/grade inflation.

A result that fails discrimination or agreement is a finding about the **rubric**, not the skill.

## 2. Rubrics: one per skill family, anchored to the skill's own contract

Each skill already ships a **Quality Checklist** and an **Output Format** section. The rubric is built
directly from those (the skill's own stated standard) plus two universal criteria:
- **specificity** (concrete to the scenario vs generic boilerplate - the anti-mush check), and
- **completeness** (fills the skill's required sections).

Skills cluster into families with shared rubric spines (specification: prd/edge-cases/acceptance-criteria;
discovery: interview-synthesis/competitive/journey; measurement: experiment-design/results/okr-grader;
etc.), so we author ~6-8 family rubrics, not 29 bespoke ones. Per-skill criteria are appended where the
skill's checklist is distinctive.

## 3. Scenarios

Each skill needs 1-3 realistic input scenarios (a feature brief for deliver-prd, raw interview notes for
discover-interview-synthesis, KR actuals for measure-okr-grader). Scenarios live next to the fixtures:
`skills/<name>/evals/output-scenarios/`. Start with 1 high-signal scenario per skill; add edge scenarios
(thin input, adversarial input) as the program matures.

## 4. Metrics and the recorded gate

Per skill (headline): the skill-arm overall mean, the discrimination gap, and the agreement stdev, with
the per-criterion breakdown for diagnosis. As with M-31, the **recorded result is the evidence gate**;
LLM-judged lanes are never enforcing CI. A skill "passes" output eval when: overall >= a family bar
(start ~3.5/5), discrimination gap >= 1.0, agreement stdev <= 0.7, and no single criterion is failing
(< 2.5) without a logged reason.

## 5. Scope and sequencing

- **Phase 0 (PoC, deliver-prd):** prove discrimination + agreement on one skill. Results below.
- **Phase 1:** DONE 2026-06-14. Harness `scripts/output-eval.workflow.mjs` (a saved Workflow-tool
  script), the `specification` family rubric (`docs/internal/eval-rubrics/specification.md`), the
  scenario format, and the recorded-results convention all landed; the per-family human anchor awaits
  maintainer sign-off. First family run: `deliver-acceptance-criteria` PASSED (gap 1.67, agreement 0.47).
- **Phase 2..N:** roll out family by family via the living tracker in the implementation plan; each skill
  gets a scenario + a recorded result; findings feed targeted skill-body improvements (the F-12 mechanism,
  now for body quality not just descriptions).

## 6. PoC validation results (Phase 0) - PASSED, with one calibration fix

Workflow `output-eval-poc-deliver-prd` (2026-06-13, deliver-prd, 1 scenario, 3 judges, subscription
subagents; 5 agents, ~207k tokens, ~2 min):

- **Skill PRD overall 5.0; weak control overall 2.33; discrimination gap 2.67** (target >= 1.0). PASS.
- **Inter-judge agreement (overall stdev): skill 0.0, control 0.47** (target <= 0.7). PASS.
- Per-criterion (skill / control): problem 5/4, metrics 5/1.67, scope 5/2.33, requirements 4.33/2,
  technical 5/3.67, risks 5/2, specificity 5/4, completeness 5/2. The gap concentrates on the rigor
  dimensions (metrics, requirements, risks, completeness) - the eval correctly attributes the skill's
  value to rigor, not surface specificity (the control scored 4 on problem and specificity).
- All three judges independently wrote the SAME rationale (quantified metrics, explicit scope, testable
  requirements, risk table with owners) - high construct validity.

**Both validity gates cleared: the method is sound.** Two refinements before rollout:
1. **Ceiling effect.** The skill arm hit a perfect 5.0, leaving no headroom to detect regression. Fix:
   harden the rubric anchors ("5 = exceptional, nothing to improve; 4 = solid, minor gaps; 3 = adequate")
   so good-but-improvable work lands ~4. Re-confirm against a human anchor.
2. **Generation noise.** One generation per arm. Run the skill arm 2-3x and average so a single lucky/
   unlucky draft does not set the score.

The negative-control design is validated as-is: a "competent but thin" freehand baseline (not a strawman)
is the right control - it isolates the skill's marginal value.

## 7. Open questions the PoC + early rollout must answer

- Does a 3-judge panel discriminate reliably, or do we need 5 / a stronger judge model?
- Is one scenario per skill enough signal, or do we need 2-3 to average out scenario luck?
- Judge model: Sonnet (cost-effective) vs Opus (more reliable grader) - calibrate against human anchors.
- How much does generation nondeterminism move the skill-arm score (run the skill arm 2-3x and average)?
- Cost/time per skill (drives the full-roster budget) - measured by the PoC.
