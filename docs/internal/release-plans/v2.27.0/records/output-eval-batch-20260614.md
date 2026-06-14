# Output-eval batch result: 10 sampled skills (2026-06-14)

The first representative-sample output-quality run (M-33 Phase 2), per the sample-then-regression-trigger
scope (`spec_output-quality-evals.md` section 8). One high-signal skill (1-2 per family) across 7
families, run on the validated cheap engine: **Sonnet generation + 3 Sonnet judges**, orchestrated by an
Opus session via a single Workflow fan-out. Follows the `deliver-acceptance-criteria` Sonnet validation
(`output-eval-deliver-acceptance-criteria-20260614.md`).

## Engine and method

| | value |
|---|---|
| Generation | 2 skill-arm drafts + 1 thin control per skill, model `sonnet` |
| Judges | 3 blind per skill, model `sonnet`, A/B order alternated by judge index |
| Overall | derived as the per-criterion mean (NOT a holistic judge score) |
| Skill arm | a subagent reads the skill's REAL `SKILL.md` (+ `references/TEMPLATE.md`) and the scenario, then produces the artifact |
| Control arm | a subagent reads ONLY the scenario (no skill, no template) and produces a competent-but-thin freehand artifact |
| Fail-closed | a partial panel (missing gen or judge) voids that skill; no vacuous pass |
| Cost | 60 agents, ~1.74M subscription tokens, ~6.4 min wall-clock for all 10 |
| Validity gates | discrimination gap >= 1.0; inter-judge agreement (skill-overall stdev) <= 0.7 |
| Pass bar | gates clear AND overall >= 3.5 AND no skill criterion mean < 2.5 |

The run used a batch Workflow fan-out (saved at the session's workflow scripts dir as
`output-eval-batch-*.js`) with a self-shakedown: `deliver-edge-cases` was evaluated first and the
remaining 9 fanned out only after it returned a valid result. The canonical reusable tool remains the
single-skill harness `scripts/output-eval.workflow.mjs`; the batch runner is orchestration glue over the
same generate/judge/aggregate logic and is NOT committed (it needs the codex adversarial-review the
methodology requires before becoming a repo asset).

## Headline (all 10)

| Skill | Family | Skill overall | Control overall | Gap | Agreement | Blind pref | Verdict |
|---|---|---|---|---|---|---|---|
| foundation-okr-writer | framing | 5.00 | 2.54 | **2.46** | 0.00 | 3/3 | PASS |
| deliver-edge-cases | specification | 5.00 | 2.88 | **2.13** | 0.00 | 3/3 | PASS |
| define-problem-statement | framing | 4.75 | 3.00 | **1.75** | 0.10 | 3/3 | PASS |
| discover-interview-synthesis | discovery | 4.88 | 3.38 | **1.50** | 0.10 | 3/3 | PASS |
| measure-okr-grader | measurement | 5.00 | 3.54 | **1.46** | 0.00 | 3/3 | PASS |
| discover-competitive-analysis | discovery | 4.88 | 3.54 | **1.33** | 0.10 | 3/3 | PASS |
| iterate-retrospective | learning | 4.83 | 3.75 | **1.08** | 0.06 | 3/3 | PASS |
| develop-adr | technical | 4.83 | 3.92 | 0.92 | 0.24 | 2/3 | VOID (gap<1.0) |
| deliver-release-notes | communication | 4.63 | 3.79 | 0.83 | 0.27 | 3/3 | VOID (gap<1.0) |
| measure-experiment-design | measurement | 4.42 | 4.21 | 0.21 | 0.41 | 2/3 | VOID (gap<1.0) |

**7 of 10 PASS** both validity gates and the family bar with healthy margins and unanimous blind
preference. **3 of 10 are VOID** on the discrimination gate (gap < 1.0): per the rubric's validity
gates, a sub-threshold gap is a finding about the INSTRUMENT (rubric / control / scenario), not a skill
failure. None of the 10 has a skill-arm criterion mean below 2.5.

## The 7 passes (per-criterion skill / control)

- **foundation-okr-writer** (gap 2.46): skill straight 5.0; control low on kr_measurability (2.0),
  guardrails (2.0), completeness (2.0), integrity_audit (2.33). Judges independently named the same
  discriminators: outcome-vs-feature KRs, placeholder-marked baselines (no fabrication), a guardrail
  for the team's own vanity-metric trap, and the pass/risk/fail audit. The control invented targets
  against uninstrumented baselines and mixed tasks into KRs. Textbook discrimination.
- **deliver-edge-cases** (gap 2.13): skill straight 5.0; control collapsed on `prioritized` (1.33),
  `messages` (2.0), `recovery` (2.33). The skill's value (priority tiers, exact error copy, recovery
  paths) is exactly what the freehand control omitted.
- **define-problem-statement** (gap 1.75): control cratered on `success_metrics` (1.0, no metrics
  table) and `completeness` (2.0); skill strong throughout. Discriminator: a metrics table with
  baselines/targets vs an executive memo.
- **discover-interview-synthesis** (gap 1.50): control failed `limitations` (1.33, omitted entirely)
  and was weak on `quotes` (3.0) and `completeness` (2.67). `pii_protected` tied at 5.0 (both protect
  IDs). Discriminator: attributed verbatim quotes, named insights, and an honest limitations section.
- **measure-okr-grader** (gap 1.46): skill straight 5.0; control weak on `learning_synthesis` (3.0),
  `next_cycle` (3.0), `completeness` (3.0), `evidence_quality` (3.33). The scenario's traps worked: the
  skill correctly scored the committed KR as a miss (not softened), kept the failed guardrail separate,
  marked the not-yet-observable cohort, and refused the retroactive scope-shrinkage framing. One judge
  flagged the control's 70% arithmetic error on the aspirational KR.
- **discover-competitive-analysis** (gap 1.33): control weak on `feature_matrix` (2.67) and
  `sources_confidence` (3.0). Discriminator: a real feature matrix, named positioning axes with white
  space, and per-source confidence vs prose.
- **iterate-retrospective** (gap 1.08, the tightest pass): control weak on `standalone` (3.33),
  `inclusive` (3.33), `completeness` (3.0). Discriminator: discussion notes with root cause, prior-action
  review, and structural handling of the quiet attendees (the scenario named Sam and Lee as quiet).

## The 3 VOID results (instrument findings, NOT skill failures)

Per the validity gates, these are findings about the eval instrument. Do NOT fabricate skill-body fixes;
queue an instrument re-look (stronger scenario that isolates the skill's marginal value, and/or a
full-fidelity re-run with more generations to damp draft noise).

- **measure-experiment-design** (gap 0.21, the weakest): the control scored 4.21, essentially tied with
  the skill (4.42), and even led on aggregate `sample_size` (4.0 vs 3.0), `duration` (5.0 vs 3.67), and
  `primary_metric` (5.0 vs 4.67). Experiment design is a familiar, well-structured task a strong
  generalist model does competently freehand, so the skill's marginal value is small here. One judge
  flagged a ~2.4x sample-size error in the CONTROL's draft, but on average judges rated the control's
  sizing higher, which points to generation noise in the skill arm's sample-size math (the skill arm's
  `sample_size` mean was only 3.0). Instrument action: a scenario that more sharply rewards the skill's
  pre-registration/guardrail discipline, and run the skill arm at G>=3 to average out the sizing draw.
  Possible mild real signal: the skill arm's sample-size calculation reliability is worth a clean re-run
  before any conclusion.
- **develop-adr** (gap 0.92, a near-miss): the control produced a solid ADR (3.92); the skill still won
  2/3 blind and led every criterion, but the margin fell just under 1.0. ADR is a famous, rigid format
  with low freehand failure rate. Instrument action: a scenario with more competing forces / alternatives
  so a freehand control more visibly thins out; or accept ADR's marginal skill value is genuinely modest
  for a strong model and note it.
- **deliver-release-notes** (gap 0.83): the skill won 3/3 blind (judges preferred it) yet the gap stayed
  sub-threshold because the `concise` criterion inverted - control 4.67 vs skill 3.33. The skill arm's
  notes were more complete (Highlights, Known Issues, no-leak) but more verbose, with judge-noted
  redundancy between Highlights and New Features. This is the rubric penalizing the skill's completeness
  via the brevity criterion. Instrument action: reweight or sharpen `concise` so it does not cancel the
  skill's completeness/no-leak value; one judge also dinged a "cold start time" jargon leak in one skill
  draft (a mild, real, single-draft signal, not a pattern). Do not change the skill on one draft.

## Cross-cutting instrument observation: residual ceiling

Three skills (`foundation-okr-writer`, `deliver-edge-cases`, `measure-okr-grader`) scored a straight
**5.00** on every criterion. Discrimination is large (controls 2.5-3.5) so the gates pass and the verdicts
are robust, but a straight 5.0 leaves no regression headroom: the hardened anchor scale still ceilings for
the strongest skills under a Sonnet panel. This is the exact condition the per-family **human anchor**
(P1-5, still awaiting maintainer sign-off) exists to catch. Until a human anchor lands, treat 5.0 skill
overalls as "passes with no measured headroom," not as literal perfection.

## Status and next steps

- 7 skills certified PASS on output quality (gates clear, unanimous or near-unanimous blind preference,
  family bar cleared). No skill-body changes indicated.
- 3 skills VOID on discrimination: instrument findings, queued for a scenario/control re-look and a
  full-fidelity re-run. No skill-body fixes fabricated.
- Engine and harness are now proven end-to-end at batch scale (10 skills, one fan-out, fail-closed,
  Sonnet). The productized single-skill harness `scripts/output-eval.workflow.mjs` and the family rubrics
  are validated working assets.
- Remaining roster stays deferred to regression-triggered runs (a skill is evaled when its body changes).
- The human anchor (P1-5) is the open calibration step, made more pressing by the residual ceiling above.
