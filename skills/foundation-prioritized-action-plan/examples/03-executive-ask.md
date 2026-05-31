# Example 03: Executive ask (Complex domain)

A vague, high-pressure ask with almost no context. The problem is undefined and the cause is unknown, so this is Complex: the plan is discovery-heavy, Section 4 (questions) carries most of the weight, and nothing is marked High confidence.

---

## The input (pasted verbatim)

> From the CEO, in Slack: "We're getting crushed in SMB. Competitor is winning all the sub-50-seat deals and our win rate there is like half what it is upmarket. Sales says it's pricing, product says we're missing table-stakes features, and the data team thinks it's onboarding - nobody actually knows. I want us to be more competitive in SMB next quarter. Figure out what it takes. Not asking for a 10-person team, just want a real plan. Also our SMB churn is higher than enterprise, which feels related. Go."

---

## Step 0: Source ledger

```
S1: "We're getting crushed in SMB" (origin: pasted text)
S2: "Competitor is winning all the sub-50-seat deals" (origin: pasted text)
S3: "our win rate there is like half what it is upmarket" (origin: pasted text)
S4: "I want us to be more competitive in SMB next quarter" (origin: pasted text)
S5: "Not asking for a 10-person team, just want a real plan" (origin: pasted text)
S6: "our SMB churn is higher than enterprise, which feels related" (origin: pasted text)
S7: "Sales says it's pricing, product says we're missing table-stakes features, and the data team thinks it's onboarding - nobody actually knows" (origin: pasted text)
```

---

## Section 0. Executive summary

- **Situation classification:** Complex (Cynefin). The problem is undefined ("more competitive," S4), the cause of losses is unknown, and the churn link is an untested hunch ("feels related," S6).
- **The binding constraint:** there is no defined SMB problem or diagnosis. Without a target metric and a reason we lose, any solution is a guess.
- **The critical next effort (P1):** define the win condition and diagnose why SMB deals are lost and why SMB churns, before proposing fixes.
- **Overall plan confidence:** Low. This is honest: the ask contains pressure and a hunch, not a diagnosis.
- **Time-to-value:** about 2 weeks to a defined problem and a first diagnosis.

## Section 1. Input mirror - what I understand

- **What you gave me:** a CEO ask to become more competitive in SMB (sub-50-seat) next quarter (S2, S4), citing a win rate roughly half of upmarket (S3) and SMB churn higher than enterprise that "feels related" (S6), with an explicit constraint that this is a lean effort, not a 10-person initiative (S5).
- **What you appear to be trying to accomplish:** reverse SMB underperformance quickly and cheaply. Confidence: Low (the desired end state is a feeling, "more competitive," not a metric).
- **Adjacent intents I noticed but did not assume:** an SMB pricing change, a competitor feature-parity push, and a churn-reduction program. I did not assume any is the answer; each is a hypothesis.

## Section 2. Situation classification (Cynefin)

**Domain:** Complex. **Source:** S2, S3, S6, S7.

Cause and effect are not yet knowable, and there is no internal consensus on why. Sales, product, and the data team each name a different driver (pricing, missing features, onboarding) and "nobody actually knows" (S7); the churn link is explicitly a hunch (S6), not evidence. That conflicting, unreconciled signal is the test for Complex rather than Complicated: an expert loss analysis presumes you already know which mechanism to analyze, and here the team genuinely does not, so the cause is only knowable in hindsight after probing. "More competitive" (S4) also has no metric. Posture: discovery and safe-to-fail probes to find the mechanism before committing. Confidence ceiling: Low to Medium-Low, with no High markers in this plan.

## Section 3. The binding constraint (Theory of Constraints)

- **System and goal:** improve SMB commercial performance (win rate and retention) next quarter within a lean footprint (S5).
- **The constraint:** an undefined-and-undiagnosed problem. There is no agreed metric for "more competitive" (S4) and no known reason for the losses (S2, S3) or the churn (S6). This is the primary planning bottleneck: solutions cannot be sequenced before the problem is defined and the cause is found.
- **Source:** S3, S4, S6.
- **Candidate constraints considered:** (1) A product gap versus the competitor (S2). Plausible, but assuming it pre-empts the diagnosis. (2) SMB churn (S6). The CEO links it, but "feels related" is a hypothesis to test, not a constraint to accept. Both are subordinate to defining and diagnosing first.
- **Why P1 lifts it:** defining the win metric and running a loss-and-churn diagnosis turns a feeling into a problem that can actually be solved within the quarter.

## Section 4. Prioritized questions, gaps, and open decisions

This section carries the plan. The ask is mostly unknowns.

| Rank | Question / gap | Why it matters | Decision required? | How to resolve |
|---|---|---|---|---|
| Q1 | What does "more competitive in SMB" mean as a number? (S4) | Without a target, success is unprovable and scope is infinite | Yes, blocks everything | CEO and PM agree on a metric (for example, SMB win rate or net retention) and a quarter target |
| Q2 | Why are we losing sub-50-seat deals? (S2, S3) | The fix depends entirely on the cause (price, product, motion) | Yes, blocks solutioning | Loss analysis on recent SMB losses plus 5 to 8 loss interviews |
| Q3 | Is SMB churn actually related to the loss problem? (S6) | The CEO's hunch could send the team the wrong way | No, resolve by diagnosis | Churn analysis by reason code; test the "related" hypothesis explicitly |
| Q4 | Is the competitor winning on price, product, or motion? (S2) | Determines whether this is a product, pricing, or GTM plan | No, resolve by diagnosis | Competitive teardown plus win/loss notes |
| Q5 | What does "not a 10-person team" bound us to? (S5) | Sets the realistic scope of any solution | Yes | Confirm the staffing and time envelope with the CEO |

## Section 5. The prioritized action plan

#### P1. Define the win condition and diagnose the SMB gap

- **Why:** lifts the binding constraint. Everything else is a guess until "more competitive" (S4) is a metric and the loss/churn cause is known.
- **What:** a one-page SMB problem definition (the metric and target) plus a first diagnosis of why we lose (S2, S3) and whether churn is related (S6).
- **How:** (1) Agree the metric and target with the CEO (Q1, Q5). (2) Run a loss analysis on recent sub-50-seat losses and 5 to 8 loss interviews. (3) Pull churn by reason code and test the "feels related" hypothesis.
- **Confidence:** Low-Medium. Respects the Complex ceiling; this is discovery, not a committed fix.
- **Source:** S2, S3, S4, S6.
- **Expected outcome / success signal:** a defined SMB metric and a diagnosed primary cause, enough to choose a direction.
- **Estimated effort:** about 2 weeks.
- **Dependencies:** none.

#### P2. Run one or two safe-to-fail probes against the leading cause

- **Why:** once P1 names a likely cause, a cheap probe tests a fix without committing the quarter to a guess, which fits the lean constraint (S5).
- **What:** one or two reversible experiments aimed at the diagnosed cause (for example, an SMB pricing test, a targeted onboarding change, or a single parity feature).
- **How:** (1) Pick the highest-leverage hypothesis from P1. (2) Design it as an experiment with a metric and kill criterion. (3) Run on a limited SMB cohort.
- **Confidence:** Low. The exact probe is unknown until P1.
- **Source:** S5.
- **Expected outcome / success signal:** an early read on whether the candidate fix moves the P1 metric.
- **Estimated effort:** 2 to 3 weeks.
- **Dependencies:** P1.

#### P3. Synthesize into a lean SMB plan and report up

- **Why:** the CEO asked for "a real plan" (S5); P3 turns diagnosis and probe results into a costed, sequenced quarter plan.
- **What:** a short plan tying the defined metric to the diagnosed cause and the probe evidence, scoped to the lean footprint.
- **How:** (1) Combine P1 and P2 findings. (2) Recommend a focused set of moves. (3) Present the metric, the diagnosis, and the bet.
- **Confidence:** Low-Medium.
- **Source:** S4, S5.
- **Expected outcome / success signal:** CEO alignment on a defined, evidence-backed SMB plan.
- **Estimated effort:** about 1 week.
- **Dependencies:** P1, P2.

**Sequencing (Now / Next / Later)**

| Now | Next | Later |
|---|---|---|
| P1 (define + diagnose) | P2 (probe the leading cause) | P3 (synthesize and report) |

**What to defer / what NOT to do**

- Do not build competitor parity features (S2) before P1 names the cause.
- Do not launch a churn program on the strength of "feels related" (S6); test it first.
- Do not staff up; the ask is explicitly lean (S5).

## Section 6. Risks and pre-mortem

| Risk | Likelihood | Impact | Early signal | Mitigation | Source |
|---|---|---|---|---|---|
| Team jumps to building parity features before diagnosis | M | H | Roadmap fills with competitor features before P1 reads | Gate any build on the P1 diagnosis; hold the metric first | S2 |
| The churn hunch misdirects the effort | M | H | Energy flows to churn before Q3 confirms a link | Treat S6 as a hypothesis; test it in P1 | S6 |
| "More competitive" never gets a number, so nothing is provable | M | H | Q1 stays open past week one | Refuse to start P2 until the metric is agreed | S4 |
| Lean constraint makes the diagnosis shallow | L | M | P1 timeline slips on access to data | Scope diagnosis to recent losses and reason-coded churn only | S5 |

## Section 7. Recommended pm-skill prompts (copy/paste ready)

#### To execute P1: define the SMB problem

**Skill:** `define-problem-statement`
**Why this skill:** P1 must convert a pressured, undefined ask into a crisp problem with a metric before any diagnosis or fix.
**Source:** S2, S3, S4, S6

**Prompt:**
> Frame the problem behind a CEO ask to become "more competitive in SMB" next quarter. Context: we lose most sub-50-seat deals to a competitor, our SMB win rate is about half our upmarket rate, SMB churn is higher than enterprise and the CEO believes it is related, and this is a lean effort, not a 10-person team. Produce a problem statement that forces a measurable definition of "more competitive," separates the loss problem from the churn hypothesis, and states what we must learn before proposing fixes.

#### To execute P1: diagnose why SMB deals are lost

**Skill:** `discover-competitive-analysis`
**Why this skill:** the diagnosis needs a structured read of how the competitor wins sub-50-seat deals (price, product, or motion).
**Source:** S2

**Prompt:**
> Build a competitive analysis focused on the sub-50-seat (SMB) segment where a competitor is winning most deals and our win rate is about half our upmarket rate. Compare on pricing, packaging, product fit for small teams, onboarding, and sales motion. Ground it in our recent SMB loss reasons and flag where evidence is thin versus assumed.

## Section 8. Evidence and source map

| Claim / recommendation | Source ID | Exact quote |
|---|---|---|
| SMB is underperforming | S1 | "We're getting crushed in SMB" |
| Losses concentrate in sub-50-seat deals | S2 | "Competitor is winning all the sub-50-seat deals" |
| Win rate gap is large | S3 | "our win rate there is like half what it is upmarket" |
| The ask is undefined | S4 | "I want us to be more competitive in SMB next quarter" |
| The effort must stay lean | S5 | "Not asking for a 10-person team, just want a real plan" |
| Churn link is a hunch | S6 | "our SMB churn is higher than enterprise, which feels related" |
| No internal diagnostic consensus | S7 | "Sales says it's pricing, product says we're missing table-stakes features, and the data team thinks it's onboarding - nobody actually knows" |

**Inferred (Low confidence) claims:** none load-bearing; every effort cites a quote. The churn-loss link (S6) is treated as a hypothesis to test, not a fact.
**Evidence gaps:** no metric for "competitive," no diagnosed loss cause, no confirmed churn link. The plan is discovery-first precisely because of these gaps. No High confidence marker appears anywhere.
