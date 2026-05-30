---
title: "Iterate Lessons Log: Workbench Blueprints"
description: "Workbench enterprise collaboration platform: Blueprints skip-and-submit enforcement lesson."
artifact: lessons-log
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: workbench
context: "Workbench enterprise collaboration platform: Blueprints skip-and-submit enforcement lesson"
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Two weeks after Blueprints v1 GA, Rachel V. is documenting the most significant lesson from the launch: required-section enforcement, while successful at reducing time-to-approved, created an unintended "skip-and-submit" behavior where some authors pasted minimal placeholder text into required sections to bypass the enforcement gate. The behavior was predicted as a risk in the PRD but the team underestimated how quickly it would emerge at scale. The lesson informs a design change for v1.1, specifically shifting enforcement from authoring time (submit gate) to approval time (approver-visible completeness score).

This lesson connects the full arc of the Blueprints narrative, from the problem statement (38% empty-section rate [fictional]) through the A/B test (6% empty-section rate in treatment [fictional]) to the post-launch reality (7% submission rate with placeholders [fictional], plus an additional 4% using workarounds that bypass the content-presence check [fictional]).

### Source Notes

- Goodhart's Law and metric gaming in product design: Strathern, M. "Improving Ratings: Audit in the British University System," European Review, 1997
- Content quality enforcement patterns in enterprise tools: Atlassian Confluence page quality documentation (atlassian.com)
- Behavioral economics of compliance mechanisms: Thaler and Sunstein, "Nudge," Penguin Books, 2008

## Prompt

```
iterate-lessons-log

I need to document a lesson learned from the Blueprints launch. Here's the context:

**Title:** Required-Section Enforcement Caused Skip-and-Submit Behavior

**What happened:**
- Required-section enforcement successfully reduced the empty-section submission rate from 37% to 7% [fictional]
- But post-launch analysis revealed that approximately 4% of submitted Blueprints contain placeholder text in required sections [fictional] -- authors typing "TBD," "See above," "Will update," or pasting Lorem Ipsum to clear the gate
- Combined, 11% of Blueprints reaching approval still have quality issues [fictional] (7% empty + 4% placeholder), vs. our 10% target
- This was flagged as a risk in the PRD (Risk row 1: "Required sections cause author frustration and workarounds") but we underestimated the speed of adoption
- The root cause: we enforced completeness at the wrong point. Blocking submit punishes the author but doesn't help the approver. Approvers still have to manually check for placeholder text.

**The lesson:**
- Enforce quality at the approval gate, not the authoring gate
- Shift from "block the author from submitting" to "give the approver a completeness score"
- The submit gate should remain (it catches genuine omissions) but add a visible completeness/quality signal to the approval view

**Team:** Rachel V., Karen L., Leo M.
**Timeline:** Identified May 10, 2026 (Leo M.'s 2-week post-launch analysis); documented May 14

Please generate the full lessons-log entry.
```


## Output

# Required-Section Enforcement Caused Skip-and-Submit: Enforce at the Approval Gate, Not the Authoring Gate

## Metadata

| Field | Value |
|---|---|
| Lesson ID | LL-007 |
| Date identified | May 10, 2026 |
| Date documented | May 14, 2026 |
| Author | Rachel V. |
| Project | Blueprints v1 GA |
| Severity | Medium: does not block launch success but erodes the intended quality improvement |
| Status | Active: informing v1.1 design |

## Summary

Required-section enforcement successfully reduced the empty-section submission rate from 37% to 7% [fictional], but approximately 4% of submitted Blueprints contain placeholder text in required sections [fictional] ("TBD," "See above," "Will update," Lorem Ipsum). Combined, 11% of Blueprints reaching the approval queue still have quality issues [fictional], slightly above the 10% target [fictional]. The root cause is that enforcement at the submission gate punishes authors for incompleteness but does not help approvers detect low-quality content. The lesson: enforcement should operate at the approval gate (giving approvers a quality signal) in addition to the authoring gate (blocking submission of genuinely empty documents). This is a textbook instance of Goodhart's Law in product design, where optimizing for a measurable proxy (content presence) diverged from the actual goal (content quality).

## Context

### Background

Blueprints v1 introduced required-section enforcement as its core value proposition. The A/B test (March 9 through April 5, 2026) validated the hypothesis: required sections reduced the median time-to-approved by 40% (from 4.0 to 2.4 days [fictional]) and the empty-section submission rate dropped from 37% to 6% in the test group [fictional]. The feature shipped as default for all accounts at GA (April 28).

The PRD Risk section identified "Required sections cause author frustration and workarounds (e.g., placeholder text)" as a medium-likelihood, high-impact risk. The mitigation was to "monitor skip-and-submit patterns; enforce at approval gate if needed." The risk materialized faster than expected, appearing within the first two weeks of GA rather than the 60-to-90-day window the team had anticipated.

### Timeline

| Date | Event |
|---|---|
| Jan 2026 | PRD finalized; placeholder-text risk documented |
| Mar 9 through Apr 5 | A/B test; 6% empty-section rate in treatment [fictional]; placeholder text not measured |
| Apr 28 | GA launch; progressive rollout begins |
| May 5 | Rollout complete (100% of 500 accounts [fictional]) |
| May 10 | Leo M.'s 2-week post-launch analysis identifies placeholder pattern |
| May 14 | Lesson documented |

### Team and Stakeholders

| Name | Role | Involvement |
|---|---|---|
| Leo M. | Data Analyst | Identified the pattern through content-length analysis |
| Rachel V. | Technical PM | Documented the lesson; owns the v1.1 mitigation |
| Karen L. | Engineering Lead | Estimated the engineering effort for approval-gate scoring |
| Tomás G. | Design Lead | Designing the approver-visible completeness score UI |

### Constraints

- The A/B test measured empty-section rate (binary: content or no content) but did not measure content quality or detect placeholder text. This gap meant the workaround behavior was invisible during the experiment.
- The content-presence check (non-whitespace character) was designed to be the simplest possible enforcement. Adding content-quality analysis (NLP, minimum word count) was explicitly deferred in the PRD as a non-goal for v1.
- The team's instrumentation during the experiment focused on lifecycle metrics (time-to-approved, abandonment) rather than content-quality metrics (word count distributions), which is why the placeholder pattern was not detected until Leo M. ran a dedicated post-launch analysis.

## What Happened

### Sequence of Events

1. **A/B test (Mar 9 through Apr 5):** The treatment group showed a 6% empty-section submission rate [fictional], well below the 10% target. The test did not include placeholder detection, so the 6% figure reflected only genuinely empty sections. The team interpreted this as strong validation.

2. **GA launch (Apr 28):** Required-section enforcement shipped as default. Support ticket volume was low (47 tickets in 2 weeks [fictional]), and the empty-section rate held at 7% [fictional] across all accounts.

3. **Post-launch analysis (May 10):** Leo M. ran a content-length distribution analysis on sections that passed the enforcement check. He discovered a bimodal distribution: most sections had 50+ words, but a distinct cluster had fewer than 10 words. Manual inspection of the low-word-count cluster revealed placeholder text patterns:
   - "TBD" or "To be determined" (most common, 38% of placeholders [fictional])
   - "See above" or "Refer to previous section" (27% [fictional])
   - "Will update before review" (19% [fictional])
   - Lorem Ipsum or copied boilerplate (16% [fictional])

4. **Quantification:** Approximately 4% of all submitted Blueprints contain at least one required section with placeholder text [fictional]. Combined with the 7% empty-section rate [fictional], 11% of Blueprints reaching the approval queue have quality issues [fictional]. Leo M. noted that the bimodal distribution was unmistakable in the data, with a clear valley between the placeholder cluster (3-8 words) and the genuine-content cluster (50+ words).

### Key Decisions Made

- **During the A/B test:** The team decided not to measure content quality because the test was designed to validate the enforcement mechanism, not the content outcome. This was a reasonable scope decision at the time but created a blind spot.
- **During PRD authoring:** Content quality scoring was explicitly listed as a non-goal for v1. The mitigation for placeholder behavior was documented as "enforce at approval gate if needed," a known future option.
- **Post-launch (May 12 retro):** The team agreed to implement a completeness score visible to approvers in v1.1, rather than adding client-side content-quality checks at the authoring gate.

### Outcome

The overall launch is still successful: the 40% reduction in time-to-approved [fictional] is real and the primary metric is on target. However, the 11% quality-issue rate [fictional] slightly exceeds the 10% target and, more importantly, shifts the quality burden from authors to approvers. Approvers now receive complete-looking documents that may contain low-quality sections, which is arguably worse than receiving obviously incomplete documents (where the problem is immediately visible). The net effect is that the enforcement mechanism solved the *presence* problem but created a subtler *quality* problem.

## The Lesson

### What We Learned

**Enforcement at the authoring gate optimizes for form, not substance.** When the submit button is gated on content presence, authors optimize for clearing the gate rather than producing quality content. The enforcement mechanism successfully eliminated empty sections but inadvertently incentivized a new class of low-quality submissions.

**Goodhart's Law applies to product design, not just management metrics.** "When a measure becomes a target, it ceases to be a good measure." The empty-section rate was our target metric, and authors found ways to satisfy the metric without satisfying the underlying intent (complete, reviewable documents). This dynamic is well-documented in organizational behavior literature but is equally relevant when designing product enforcement mechanisms.

**Enforcement should serve the downstream consumer, not the upstream producer.** The required-section gate was designed from the author's perspective (prevent them from submitting). It should have been designed from the approver's perspective (help them identify quality issues quickly). The right enforcement point is where the quality judgment happens, which is the approval gate.

### Why This Matters

- **For Blueprints v1.1:** The team needs to build an approver-visible completeness signal that flags low-word-count or pattern-matching placeholder sections before the approver invests review time. This is now the second-highest priority for v1.1 (after the approval UX fix).
- **For Workbench product culture:** This is a reusable lesson about enforcement design. Any future feature that gates user actions on content quality will face the same Goodhart's Law dynamic. The principle "enforce at the point of judgment" should be applied broadly.
- **For the 500-to-650 growth target:** Enterprise customers expect documents reaching their approval queues to be genuinely complete. If the placeholder pattern grows unchecked, it undermines the value proposition that differentiates Blueprints from competitors like Confluence, which offers no section-level enforcement at all.

### Root Cause Analysis

| Level | Cause |
|---|---|
| Proximate cause | Authors pasted placeholder text to clear the non-whitespace enforcement gate |
| Contributing cause | The A/B test did not measure content quality, only content presence, creating a measurement blind spot |
| Contributing cause | The PRD correctly identified the risk but the mitigation ("enforce at approval gate if needed") was not pre-built; it was deferred |
| Root cause | Enforcement was designed at the wrong point in the workflow. The submit gate optimizes for author compliance, not approver experience |

## Recommendations

### Do This

1. **Add an approver-visible completeness score.** Display a per-section quality indicator in the approval review view. Sections with fewer than 20 words or matching placeholder patterns (regex: `^(TBD|to be determined|see above|will update|lorem ipsum)`) are flagged with a yellow warning badge. The approver can still approve but is alerted to potential quality issues. Tomás G. is designing the UI for the May 28 design review.

2. **Keep the submit gate.** The non-whitespace enforcement still catches genuinely empty sections (7% of submissions [fictional]). Removing it would regress to the 37% baseline [fictional]. The submit gate and the approval-gate scoring work together as complementary enforcement layers.

3. **Measure content quality, not just content presence.** Add a `section_word_count` distribution metric to the post-launch dashboard. Set an alert if the percentage of sections with fewer than 10 words exceeds 5% [fictional] over a 7-day window.

4. **Design enforcement from the downstream consumer's perspective.** For any future feature that gates user actions, ask: "Who judges quality, and where in the workflow do they do it?" Place the strongest enforcement at the judgment point.

### Avoid This

1. **Do not add a minimum word count to the submit gate.** This would escalate the arms race, as authors would paste more boilerplate to hit the threshold. Minimum word counts at the authoring gate treat the symptom, not the cause.

2. **Do not remove the submit gate in response to workaround behavior.** The gate is still effective for its intended purpose (blocking genuinely empty sections). Removing it because of edge cases would be an overreaction that regresses to the pre-experiment baseline.

3. **Do not blame authors for workaround behavior.** Authors who paste placeholders are often under time pressure and intend to fill in the content later. The system should accommodate this workflow (allow submission, flag for approver) rather than punish it.

### Questions to Ask

When designing future enforcement mechanisms:
- Who is the downstream consumer of this content, and what do they need to judge quality?
- Can the enforcement signal serve the consumer rather than blocking the producer?
- What workaround behavior will users adopt to clear this gate? Is the workaround better or worse than the original problem?
- Are we measuring the thing we actually care about, or a proxy that can be gamed?

## Applicability

### When This Applies

- Any feature that gates user actions on content quality (form validation, document submission, approval workflows)
- Any metric that measures presence rather than quality (filled vs. empty, submitted vs. not submitted)
- Any two-party workflow where one party produces content and another evaluates it

### When This May Not Apply

- Hard technical constraints where enforcement at the gate is the only option (e.g., file format validation, authentication checks)
- Single-party workflows where the producer and consumer are the same person
- Situations where the workaround behavior is genuinely harmful (e.g., security bypass), not just low-quality

### Related Situations

- Email template systems that require all fields be filled (users often type "N/A" or ".")
- Code review tools that require PR descriptions (developers paste commit messages or "see code")
- Compliance forms with mandatory fields (employees paste "see attached" without attaching)
- CRM systems that require opportunity notes before stage advancement (sales reps type "call pending")

## Supporting Evidence

### Metrics/Data

| Metric | Value | Source |
|---|---|---|
| Empty-section submission rate (post-GA) | 7% [fictional] | Analytics pipeline, May 10 |
| Placeholder-text submission rate | 4% [fictional] | Leo M. content-length analysis, May 10 |
| Combined quality-issue rate | 11% [fictional] | Derived (7% + 4%) |
| Target quality-issue rate | ≤10% [fictional] | PRD success metrics |
| Most common placeholder pattern | "TBD" / "To be determined" (38% of placeholders [fictional]) | Manual inspection of low-word-count sections |
| Median word count (normal sections) | 142 words [fictional] | Analytics pipeline |
| Median word count (placeholder sections) | 4 words [fictional] | Leo M. analysis |

### Quotes

- Karen L. (retro, May 12): "We built the gate in the right place for catching empty sections, but the wrong place for catching lazy sections."
- Leo M. (analysis debrief, May 10): "The bimodal distribution was obvious once I plotted it. There's a cluster at 3-8 words that's clearly not real content."
- Rachel V. (retro, May 12): "The PRD literally said 'enforce at approval gate if needed.' We had the answer; we just didn't build it into v1."

### Artifacts

- PRD Risks section: Risk row 1 ("Required sections cause author frustration and workarounds")
- Post-launch dashboard: Section word-count distribution chart (added May 11)
- A/B test experiment results: Empty-section rate data (measurement gap documented)
- Retrospective action item AI-06: Build approver-visible completeness score (v1.1 Sprint 1)

## Tags and Categories

| Field | Value |
|---|---|
| Category | Product design |
| Tags | enforcement, Goodhart's Law, workaround behavior, approval UX, content quality |
| Phase | Iterate |
| Confidence | High: supported by quantitative data and qualitative observation |
| Reusability | High: applicable to any two-party content workflow with enforcement gates |

## Review and Updates

| Date | Reviewer | Update |
|---|---|---|
| May 14, 2026 | Rachel V. | Initial entry |
| May 19, 2026 (planned) | Tomás G. | Review after v1.1 design sprint; update with design approach for completeness score |
| Jun 30, 2026 (planned) | Leo M. | Review after v1.1 ships; update with post-fix metrics |
