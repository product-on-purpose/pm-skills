---
name: measure-okr-grader
description: Scores completed OKR sets at cycle close with KR-level scoring per the canonical OKR type enum (committed | aspirational | learning | operational_health | compliance_or_safety), committed-vs-aspirational interpretation, evidence quality assessment, learning synthesis, and next-cycle recommendations. Refuses to retroactively change targets or shrink committed scope, average away guardrail KRs, treat 0.7 as success for committed or compliance_or_safety KRs, equate effort with impact, or use scores for individual performance. Hands off to iterate-lessons-log, iterate-retrospective, define-hypothesis, measure-dashboard-requirements, measure-instrumentation-spec, and foundation-okr-writer.
phase: measure
version: "1.0.0"
updated: 2026-05-01
license: Apache-2.0
metadata:
  category: reflection
  frameworks: [triple-diamond, okrs, lean-startup]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# OKR Grader

An OKR Cycle Review is a backward-looking artifact that closes the loop on a completed OKR set. It scores each KR against its baseline and target, separates committed from aspirational interpretation, surfaces what evidence does and does not support, names what the team learned, and prepares input for next-cycle drafting. Done well, a cycle review protects the integrity of the OKR operating system by refusing to dress up missed commitments as aspirational stretch, refusing to celebrate effort over outcome, and refusing to let scoring carry weight it cannot bear.

This skill is an evidence interpreter, not an arithmetic engine. Its job is to read final KR values, compare them against the original OKR set's intent, and produce a review that names the learning honestly. It enforces the empirical scoring conventions drawn from Doerr (`Measure What Matters`), Wodtke (`Radical Focus`), Castro (committed vs aspirational interpretation), Grove (`High Output Management`), and the OKR community's accumulated practice on misuse failure modes. It pairs with `foundation-okr-writer` (which produced the OKR set being scored) and hands off the learnings produced here to the iterate skills that consume them.

## When to Use

- The OKR cycle has ended (or you are scoring a partial-cycle close)
- You have final or interim KR values, baselines, and targets
- Stakeholders need a clear review with score, evidence, and learning
- The team is deciding what to continue, stop, change, or carry forward
- There is disagreement about whether a score is good or bad
- Evidence quality across KRs is uneven and needs to be made visible

## When NOT to Use

- You are still drafting OKRs . use `/okr-writer`
- You want a generic team retro . use `/retrospective`
- You are reporting a single experiment result . use `/experiment-results`
- You need a stakeholder progress update without scoring . use `/stakeholder-update`
- The OKR set was never agreed on or never tracked . scoring requires an authored set; backfill via `/okr-writer` first
- You want to use scores to evaluate individuals . the skill refuses this

## Instructions

When asked to score completed OKRs, follow these steps:

1. **Validate scoring readiness**
   Check inputs: original OKR set, cycle dates, final KR values (or interim values for partial-close), baselines, targets, evidence sources, and OKR types (committed | aspirational | learning | operational_health | compliance_or_safety). If a value is missing, mark it explicitly (`not-yet-observable`, `not-instrumented`, `not-supplied`); never fabricate. Refuse to grade KRs whose original definitions are missing entirely.

2. **Classify each KR's type and indicator class**
   The OKR type is one of `committed | aspirational | learning | operational_health | compliance_or_safety` (the five values produced by `foundation-okr-writer`). The indicator class is one of `leading | lagging | guardrail | health | evidence_generation`. Carry both forward from the original OKR set, or assign defaults if the original set did not specify. The OKR type determines the scoring convention: `aspirational` uses the 0.6 to 0.7 sweet spot; `committed` targets 1.0; `compliance_or_safety` is binary; `operational_health` is pass | fail | drift-within-tolerance against a threshold band; `learning` grades by validated or invalidated rather than by score. The indicator class adds independent rules that apply on top of the type's scoring (see Step 3).

3. **Score each KR**
   For each KR, compute or assign a score using the convention for its OKR type:
   - `aspirational` KR: numeric score = (actual - baseline) / (target - baseline). Sweet spot is 0.6 to 0.7.
   - `committed` KR: pass or fail against the target. Anything below 1.0 is a miss.
   - `compliance_or_safety` KR: binary. Met or not met. No partial credit. No retroactive scope shrinkage when coverage is partial; mark as not-yet-fully-observable instead.
   - `operational_health` KR: pass | fail | drift-within-tolerance against the threshold band.
   - `learning` KR: validated, invalidated, partially-validated, or insufficient-evidence. No numeric score.
   Then apply indicator-class rules independently of the OKR type:
   - any KR with indicator class `guardrail` is reported as its own signal and is NEVER averaged into the primary objective score, regardless of its OKR type. A failed guardrail does not dilute a high primary KR score.
   For each score, state the calculation or rationale and the evidence confidence (high | medium | low | unknown).

4. **Interpret the objective score**
   Avoid naive averaging when one KR is a guardrail, compliance threshold, or learning KR. Produce a qualitative read of the objective alongside any rough numeric average. State explicitly what the score does and does not mean.

5. **Assess evidence quality**
   For each KR, name the evidence's reliability and any caveats (instrumentation gaps, target shifts mid-cycle, cohort definition changes, measurement window mismatches, sample-size limitations). Recommend fixes for next cycle's measurement plan.

6. **Review initiatives as bets**
   For each initiative the team ran, name which KR it was expected to move, whether it shipped, what its apparent contribution was, and whether the evidence supports continuing, retiring, or reworking it. Use Castro's "initiatives are bets, not commitments" framing. Separate ship-status from KR-impact; an initiative that shipped on time but did not move its KR is not a partial win.

7. **Synthesize learning**
   Capture validated assumptions, invalidated assumptions, surprises, and decision implications. Distinguish between learnings about the customer or product (carry forward), learnings about team process (hand to `/retrospective`), and learnings about measurement (hand to `/instrumentation-spec` or `/dashboard-requirements`).

8. **Prepare next-cycle recommendations**
   For each objective: continue, revise, retire, or escalate. Suggest candidate next-cycle OKRs or open questions for `/okr-writer`. Hand-off measurement gaps to `/dashboard-requirements` or `/instrumentation-spec`. Hand-off assumption tests to `/hypothesis`. Hand-off team-process work to `/retrospective`. Hand-off organizational memory to `/lessons-log`. Hand-off next-cycle drafting to `/okr-writer`.

9. **Surface risks in interpretation**
   Make explicit any places the score could mislead a reader: forced numeric scores on KRs that are not yet observable, confounded initiative results, stakeholder framings that under-state evidence, single-cycle results that need a second cycle of confirmation.

10. **Note the source of truth**
    The artifact is a review document, not the canonical OKR system. Include a `source_of_truth` field pointing to the original OKR tracker.

11. **Finalize for direct use**
    Remove all skill instruction commentary from the final artifact. The final output should be reader-facing.

## Constraint Rules (MUST / MUST NOT)

These rules are non-negotiable. The skill enforces them in every grading run.

- **MUST NOT** retroactively change baselines, targets, or KR definitions. If the team adjusted these mid-cycle, document the change explicitly and grade against both the original and adjusted versions.
- **MUST NOT** retroactively shrink the scope of a `committed` or `compliance_or_safety` KR to mark partial coverage as a pass. If the original commitment named 3 healthcare accounts and only 1 has been audited, the KR is `not-yet-fully-observable`. The 1-account result is a sub-signal, not the KR score.
- **MUST NOT** treat 0.7 as success for `committed`, `compliance_or_safety`, or `operational_health` KRs. Those target 1.0 (or the threshold band).
- **MUST NOT** average away a failed guardrail. A failed guardrail is a separate signal that does not get diluted by the primary KR's success.
- **MUST NOT** equate effort with impact. Initiatives that shipped on time but failed to move their KR are not partial wins.
- **MUST NOT** use OKR scores as individual performance ratings or compensation inputs. If the user requests this, refuse and explain the sandbagging and learning-suppression risks.
- **MUST NOT** punish honest stretch when aspirational intent was explicit and disclosed at OKR-writing time. A 0.6 aspirational score is the designed sweet spot.
- **MUST NOT** celebrate missed committed goals as ambitious failure. Committed misses are misses.
- **MUST** mark any not-yet-observable KR explicitly (e.g., a 90-day retention cohort whose window extends past cycle close). Forced numeric scores on not-yet-observable KRs are misleading.
- **MUST** include evidence confidence on every KR score (high | medium | low | unknown).
- **MUST NOT** become the canonical source of truth. Always include a `source_of_truth` pointer to the user's actual OKR tracker.

## Scoring Rules

The skill applies these conventions to every cycle review. The convention follows the OKR type, not the team's preference at grading time. OKR type and indicator class are independent dimensions; type controls scoring, indicator class adds reporting rules.

OKR types determine the scoring convention:

- **`aspirational`**: numeric score on a 0 to 1 scale = (actual - baseline) / (target - baseline). Sweet spot is 0.6 to 0.7. Below 0.4 is a miss; above 0.8 over multiple cycles suggests sandbagged targets needing recalibration.
- **`committed`**: pass or fail against the target. Anything below 1.0 is a miss requiring postmortem. Do not soften with aspirational interpretation.
- **`compliance_or_safety`**: binary. Met or not met. No partial credit. No retroactive scope shrinkage. If the committed scope is only partially observable (some audits pending, some accounts deferred), mark the KR as `not-yet-fully-observable`; the observed subset is a sub-signal, not the KR score.
- **`operational_health`**: pass | fail | drift-within-tolerance against the threshold band.
- **`learning`**: validated | invalidated | partially-validated | insufficient-evidence. No numeric score.

Indicator class rules apply on top of the OKR type's scoring:

- **indicator class `guardrail`**: the KR is scored per its OKR type, and additionally is reported as its own signal, never averaged into the primary objective score. A failed guardrail does not dilute a high primary KR score, regardless of whether the guardrail itself is `committed`, `aspirational`, `operational_health`, or `compliance_or_safety`.

Special states:

- **`not-yet-observable`**: score deferred. Do not force a numeric score; mark interim signal and projected score with explicit confidence and the date the final score becomes available.
- **`not-yet-fully-observable`**: a `committed` or `compliance_or_safety` KR with partial coverage. Score the KR as deferred until full coverage is observable. Do NOT promote a sub-signal to a KR-level pass.

## Anti-Patterns the Skill Detects

The skill scans for these and either flags or refuses:

- Retroactive target adjustment (we hit it because we changed the target) . document the change; grade against both definitions
- Retroactive scope shrinkage on a `committed` or `compliance_or_safety` KR (committed to 3 healthcare audits, 1 audit completed, scored as "pass on in-scope") . refuse and mark not-yet-fully-observable
- Average-the-guardrail-away (a failed guardrail dissolved into a high primary score) . separate the guardrail signal
- Aspirational-grading-of-committed (treating 0.7 as success on a committed KR) . refuse and explain
- Effort-equals-impact (initiative shipped, score did not move, scored as partial win) . separate ship-status from KR-impact
- Compensation coupling (using the score for performance reviews) . refuse and explain
- Missed-committed-as-stretch (we did not quite hit the contractual deadline but the team really tried) . refuse the framing
- Sandbagged target (consistently scoring above 0.85 on aspirational targets) . flag for next-cycle target recalibration
- Forced score on not-yet-observable (giving a numeric score to a KR whose 90-day window has not closed) . mark deferred
- Initiative-as-cause-without-evidence (claiming Initiative X drove KR Y when timing or instrumentation cannot support it) . separate apparent contribution from causal claim
- Hidden low-confidence (precise numeric scores with weak evidence) . surface confidence; do not let precision mask uncertainty
- Stakeholder narrative override (a leader's preferred framing taking precedence over the evidence) . the grader's read is independent of stakeholder framing
- Single-cycle confirmation (treating one cycle's signal as proof) . recommend a second cycle when the evidence is suggestive but not robust

## Output Contract (v1.0.0)

- All required sections present in canonical order: Summary, Scorecard, Objective Interpretation, Evidence Quality, Initiative Review, Learning, Next-cycle Recommendations, Risks in Interpretation
- Every KR in the Scorecard includes: actual value (or `not-yet-observable` / `not-yet-fully-observable` marker), score using the type-appropriate convention, evidence confidence, interpretation
- `aspirational` KRs use the 0 to 1 numeric scale; `committed` KRs are pass or fail; `compliance_or_safety` KRs are binary; `operational_health` KRs are pass | fail | drift-within-tolerance; `learning` KRs use validated or invalidated language
- KRs with indicator class `guardrail` are surfaced separately and never averaged into the primary objective score, regardless of OKR type
- Partial-coverage on a `committed` or `compliance_or_safety` KR is marked `not-yet-fully-observable`, not `pass-on-in-scope`
- Source-of-truth note is present and points to a non-skill location
- Hand-off section names specific downstream skills for learnings, team-process work, assumption tests, and measurement gaps
- Markdown only output. No JSON.
- Measure phase classification: `phase: measure` in frontmatter; no `classification:` field

## Quality Checklist

Before finalizing, verify:

- [ ] Every KR has a final value, an explicit `not-yet-observable` marker, or an explicit `not-yet-fully-observable` marker (for partial-coverage on `committed` or `compliance_or_safety` KRs)
- [ ] Every KR has an evidence confidence rating
- [ ] Every KR's score uses the convention for its OKR type from the canonical enum: `committed | aspirational | learning | operational_health | compliance_or_safety`
- [ ] `guardrail` is treated as indicator class, not as an OKR type
- [ ] KRs with indicator class `guardrail` are surfaced separately and never averaged into the primary score
- [ ] No retroactive target changes are silently absorbed
- [ ] No retroactive scope shrinkage on `committed` or `compliance_or_safety` KRs (partial coverage is `not-yet-fully-observable`, not `pass-on-in-scope`)
- [ ] No committed KR is graded as aspirational
- [ ] No effort-equals-impact framing on initiatives
- [ ] No compensation-coupled framing
- [ ] Risks-in-interpretation section names where the score could mislead a reader
- [ ] Hand-off section names specific downstream skills with rationale
- [ ] Source-of-truth note present
- [ ] Skill instruction commentary removed from final artifact
- [ ] Markdown only . no JSON output

## Examples

See `references/EXAMPLE.md` for a completed cycle review in the storevine sample thread (Campaigns team, Q3 2026 close), demonstrating aspirational scoring with one KR not-yet-observable, a held guardrail, and a templates-as-retention-driver thesis invalidation. The companion `foundation-okr-writer` skill produces the OKR sets this skill scores; together they cover the full quarterly arc.
