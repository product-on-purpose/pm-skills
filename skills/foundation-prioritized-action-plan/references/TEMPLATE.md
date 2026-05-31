# Prioritized Action Plan - Output Template

Fill this scaffold to produce one prioritized action plan. Build the Step 0 source ledger first, then work Sections 0 through 8 in order.

> **Template note:** Blockquote notes (`>`) and `[bracketed guidance]` are authoring scaffolding. Replace every bracketed span with real content and remove the `>` notes from the finished plan. A delivered plan contains no brackets and no template notes.

---

## Step 0: Source ledger (internal scaffolding, feeds Section 8)

> Extract 3 to 12 exact quotes from the input (or all load-bearing facts if fewer than 3 exist). Each `Source:` field elsewhere references these IDs. Quotes must be exact substrings of the input.

```
S1: "[exact quote from input]" (origin: [pasted text | file path + heading])
S2: "[exact quote from input]" (origin: [...])
S3: "[exact quote from input]" (origin: [...])
```

---

## Section 0. Executive summary

> 120 to 180 words. The fast-skim layer. Keep this order.

- **Situation classification:** [Clear | Complicated | Complex | Chaotic] (Cynefin) - [one-line reasoning]
- **The binding constraint:** [what is currently limiting progress] (TOC)
- **The critical next effort (P1):** [one sentence]
- **Overall plan confidence:** [High | Medium | Low] - [one-line reasoning; must respect the Cynefin ceiling]
- **Time-to-value:** [how long to see signal from P1]

## Section 1. Input mirror - what I understand

- **What you gave me:** [the substantive content, restated concisely]
- **What you appear to be trying to accomplish:** [inferred intent] - confidence: [High | Medium | Low]
- **Adjacent intents I noticed but did not assume:** [things mentioned in passing]

## Section 2. Situation classification (Cynefin)

**Domain:** [Clear | Complicated | Complex | Chaotic]
**Source:** [ledger IDs that drove the classification]

[2 to 4 sentences justifying the domain with the decision rules: state the cause-and-effect knowability, why this domain and not the adjacent one, and the resulting posture. If Complex, commit to probes; if Chaotic, commit to stabilization.]

## Section 3. The binding constraint (Theory of Constraints)

- **System and goal:** [what process or outcome we are advancing, one line]
- **The constraint:** [named in plain language]
- **Source:** [ledger IDs]
- **Candidate constraints considered:** [1 to 2 others, and why they are downstream of or subordinate to this one]
- **Why P1 lifts it:** [the causal link from P1 to relieving this constraint]

> If evidence for one constraint is weak, label it "primary planning bottleneck (low confidence)", flag it as the top gap in Section 4, and demote overall confidence one notch.

## Section 4. Prioritized questions, gaps, and open decisions

> 3 to 7 entries, ranked. The "Decision required?" column flags items needing a user call before the relevant effort can start.

| Rank | Question / gap | Why it matters | Decision required? | How to resolve |
|---|---|---|---|---|
| Q1 | [most important unknown] | [impact on the plan] | [Yes, blocks P1 \| No] | [research, conversation, or artifact that resolves it] |
| Q2 | [...] | [...] | [...] | [...] |

## Section 5. The prioritized action plan

> Exactly 3 to 5 efforts, ranked P1 (lifts the constraint) through P5. P1 gets the fullest treatment; P2 to P5 keep all eight fields but are shorter. P1 may not be Inferred.

#### P1. [Effort name]

- **Why:** [TOC reasoning: which constraint this lifts; why it is the critical next move]
- **What:** [concrete deliverable or outcome]
- **How:** [3 to 5 concrete steps]
- **Confidence:** [High | Medium | Low] - [one-line reasoning; respects the Cynefin ceiling]
- **Source:** [ledger IDs, or `Inferred (Low confidence)` - not allowed for P1]
- **Expected outcome / success signal:** [what changes if this works]
- **Estimated effort:** [honest time estimate]
- **Dependencies:** [what must be true first, or "none"]

#### P2. [Effort name]

- **Why:** [...]
- **What:** [...]
- **How:** [...]
- **Confidence:** [...]
- **Source:** [...]
- **Expected outcome / success signal:** [...]
- **Estimated effort:** [...]
- **Dependencies:** [...]

> Repeat the block for P3 to P5 as needed.

**Sequencing (Now / Next / Later)**

| Now | Next | Later |
|---|---|---|
| [P1] | [P2, P3] | [P4, P5] |

**What to defer / what NOT to do**

- [Explicit non-action 1]
- [Explicit non-action 2]

## Section 6. Risks and pre-mortem

> Assume the plan failed. 3 to 5 specific risks (named signal and mitigation), not generic ones.

| Risk | Likelihood | Impact | Early signal | Mitigation | Source |
|---|---|---|---|---|---|
| [specific failure mode] | [H/M/L] | [H/M/L] | [observable indicator] | [pre-emptive action] | [ledger ID or `Inferred`] |

## Section 7. Recommended pm-skill prompts (copy/paste ready)

> Cap at the top 3 efforts (P1 to P3). Recommend only Tier 1 or conditional Tier 2 skills (see `recommendable-tiers.md`); never Tier 3 or this skill. Name a skill only if its exact name is in `skill-catalog.md` or the embedded Tier 1 list; otherwise describe the step in plain language.

#### To execute P1: [effort name]

**Skill:** `[exact-skill-name]`
**Why this skill:** [one line]
**Source:** [ledger IDs that justify recommending this next step]

**Prompt:**
> [Full prompt with the user's actual context injected. No placeholders.]

#### To execute P2: [effort name]

**Skill:** `[exact-skill-name]`
**Why this skill:** [one line]
**Source:** [ledger IDs]

**Prompt:**
> [Full prompt with the user's actual context injected.]

## Section 8. Evidence and source map

> Audit of the inline sources. Confirm the binding constraint and P1 cite non-Inferred sources.

| Claim / recommendation | Source ID | Exact quote |
|---|---|---|
| [what was claimed] | [S3] | "[exact words from input]" |

**Inferred (Low confidence) claims:** [list any, and confirm none drive the binding constraint or P1]
**Evidence gaps:** [state honestly what the input did not support]
