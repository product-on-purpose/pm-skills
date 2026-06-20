---
title: "Stakeholder Briefings: Storevine Campaigns Templates A/B Result"
description: "The templates-vs-blank-canvas A/B experiment result projected to four lenses (Data/BI, Executive, PMM, Engineering) from one traceable master."
artifact: stakeholder-briefings
version: "1.0"
repo_version: "2.28.0"
skill_version: "1.0.0"
created: 2026-06-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform - templates-vs-blank-canvas first-send A/B result fanned out to four stakeholder lenses for the ship decision
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

The templates-vs-blank-canvas A/B test on the Campaigns first-send flow has read out, and the result is clear: the pre-built template treatment beats the blank canvas. Storevine's Growth PM needs the result to reach the teams who act on it, each with a different decision: Data owns whether the read is sound, Exec owns the ship call, PMM owns whether it changes the story, Engineering owns making the winner the default. The PM runs `foundation-stakeholder-briefings` against the experiment results and takes the experiment proposal (Data/BI, Executive, PMM, Engineering).

**Source Notes:**

- Storevine is fictional.
- All metrics [fictional].

## Prompt

```
/foundation-stakeholder-briefings @campaigns-templates-ab-results.md

Source: Campaigns first-send A/B results. Treatment = pre-built templates,
control = blank canvas. Primary metric = first-send rate. Treatment +22%
relative on first send vs control; significant. Decision on the table: ship
templates as the default first-send experience. Tie-in: this is the activation
lever behind the 12% -> 30% first-send target.

Audiences: take the experiment proposal (Data/BI, Executive, PMM, Engineering).
```

## Output

```markdown
# Stakeholder briefings: Campaigns templates A/B result

## Master document

**What and why**

- M1: The Campaigns first-send A/B tested pre-built templates (treatment) against a blank canvas (control) to find the lever that lifts first-send activation.
- M2: This is the activation lever behind the 12% -> 30% first-send target [fictional] for the ~68% of merchants [fictional] coming off external tools.

**Decisions**

- M3: The decision on the table is whether to ship pre-built templates as the default first-send experience.

**Status**

- M4: Treatment beat control on the primary metric, first-send rate, by +22% relative [fictional], and the result is statistically significant.
- M5: Guardrail metrics (unsubscribe rate, spam-complaint rate) stayed within acceptable range in both arms [fictional].

**Risks and open questions**

- M6: The effect is measured on the first-send moment; durability beyond the first send (repeat sends, longer-term adoption) is not yet established.
- M7: Making templates the default is an engineering change (flag flip plus removing blank canvas from the primary path), not just an analysis result.

**Asks**

- M8: Approve shipping templates as the default first-send experience.

**Timeline**

- M9: If approved, default-flip lands in the next sprint; durability is re-checked at 90 days post-flip.

## Briefings

--- BEGIN: Data/BI ---

**Draws on:** M1, M4, M5, M6
**Primary ask:** Confirm the +22% read is sound and define the 90-day durability check.

**Templates win the first-send by +22%; the read is clean, durability is the open question**

**What this means for the Data team**

The experiment did what it was designed to do. Treatment (pre-built templates) beat control (blank canvas) on the primary metric, first-send rate, by +22% relative [fictional], and the difference is statistically significant. Both guardrails, unsubscribe rate and spam-complaint rate, stayed inside the acceptable band in both arms [fictional], so the lift did not come at the cost of list health.

The one thing the experiment does not answer is durability: it measures the first-send moment, not whether template-started merchants keep sending. Confirm the primary read holds under your standard checks (sample balance, novelty, segment sanity), then define the 90-day durability metric (repeat-send rate for template-started merchants) so the ship decision has a follow-up it can be held to.

--- END ---

--- BEGIN: Executive ---

**Draws on:** M2, M3, M4, M8

**Primary ask:** Approve shipping pre-built templates as the default first-send experience.

**The activation bet paid off: templates lift first sends by +22%**

**What this means for the Executive sponsor**

The experiment behind the Campaigns activation goal has read out in our favor. Pre-built templates lifted first-send rate by +22% [fictional] over a blank canvas, statistically significant, which directly serves the 12% -> 30% first-send target [fictional] for the ~68% of merchants [fictional] coming off external tools. The decision on the table is simple and low-risk: make templates the default first-send experience. Decision needed from you: approve the default.

--- END ---

--- BEGIN: PMM ---

**Draws on:** M1, M2, M4

**Primary ask:** Update the launch proof point to "merchants send their first campaign faster with built-in templates."

**A proof point, not just a metric: templates make the first send easy**

**What this means for PMM**

The A/B result hands you a concrete, defensible proof point for the consolidation story: merchants who start from a pre-built template send their first campaign at a meaningfully higher rate, +22% [fictional] over a blank canvas. That is the marketing-grade version of the activation thesis, and it reinforces the template-first simplicity angle rather than reading as a missing-feature excuse.

Frame it around the merchant outcome (getting that first campaign out the door easily), not the experiment mechanics, and tie it to the audience that matters: the ~68% of merchants [fictional] switching off an external tool want to be productive fast. Update the launch proof point to the template-first first-send story.

--- END ---

--- BEGIN: Engineering ---

**Draws on:** M3, M7, M9

**Primary ask:** Land the default-flip (templates default, blank canvas demoted) in the next sprint behind a clean flag flip.

**The winner has to be made default: flip the flag, demote blank canvas**

**What this means for Engineering**

The experiment picked a winner; turning that into the product is an engineering change, not an analysis artifact. Shipping templates as the default means flipping the experiment flag to 100% treatment and removing the blank canvas from the primary first-send path (keep it reachable as a secondary option, not the default entry).

Scope it as a clean flag flip with the blank-canvas entry demoted rather than deleted, so it is reversible if the 90-day durability check disappoints. If the default is approved, land the flip in the next sprint so the change is in place well before the 90-day durability re-check.

--- END ---

---

## Translations applied (internal)

- "+22% relative on the primary metric, statistically significant" kept precise for Data/BI; rendered as "lifted first-send rate by +22%" for Executive and PMM.
- "first-send rate 12% -> 30% target" kept as the metric for Data/BI and Executive; rendered as "send their first campaign faster / get productive fast" for PMM (merchant-outcome framing).
- "flip the experiment flag to 100% treatment; demote blank canvas from the primary path" kept precise for Engineering; rendered as "make templates the default" for Executive.

**Flagged but kept** (may need review):

- "durability beyond first send is not yet established" (M6) - surfaced to Data/BI and Engineering as the 90-day check; deliberately not raised to Executive, since it is a follow-up condition, not a blocker to the ship decision. Confirm the Exec is comfortable approving with the durability check as a tracked follow-up.

## Sources and References

- Source artifact: campaigns-templates-ab-results.md [fictional]
- **Generated:** 2026-06-20T16:50:00Z | **Skill version:** 1.0.0 | **Audiences:** Data/BI, Executive, PMM, Engineering | **Input quality:** high (experiment result with primary metric, significance, guardrails, and a stated decision)
- **Invariant self-check:** 4 briefings; all Draws-on IDs resolve to M1-M9; one Primary ask each; master reviewed as audience-neutral.
```
