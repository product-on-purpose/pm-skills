---
slug: releases/Release_v2.33.0
title: Release v2.33.0
description: The three user-reported skill defects get fixed at the reporter's suggested shape, the project-memory feature finally gets a front door and a worked end-to-end example, and the AI-product skill family opens with four conditional sections across three skills.
---

**Released 2026-08-29.** Additive MINOR. No new skills; catalog stays 68 skills (30 phase + 11 foundation + 12 utility + 15 tool), 6 sub-agents unchanged.

## The short version

The last release was an infrastructure cycle. It shipped a genuinely useful opt-in feature that the front door never mentioned, while three defects reported by actual users sat untracked for two weeks.

This release corrects that balance. All three reported defects are fixed, each at the shape its reporter suggested. The memory feature gets a front door and a worked example you can read end to end. And the AI-product skill family opens, adding sections for the case where the thing you are specifying is a model rather than a form.

## What changed

### The three field-reported defects

Every one of these came from someone using the skills, not from the repo inspecting itself. That distinction matters, and the plan for this release says why: self-inspection scales and user reports do not, so a finding with a validator behind it always looks more actionable than a report with a person behind it. These were prioritized anyway.

**`foundation-persona` 2.6.1.** Its example was not a filled-in instance of its own template, which is the one thing an example in a template-driven skill has to be. Regenerated and verified structurally rather than by eye: 13 of 13 template sections present, none added, no leaked authoring blockquotes, no unfilled placeholders. The existing persona was **re-rendered, not replaced**, which was the objection recorded against doing this at all.

**`define-prioritization-framework` 1.3.0.** Three separate friction points, all fixed at the reporter's suggested shape:

- The top-and-bottom rule now scales at ten or fewer items, instead of assuming a long list.
- RICE **Effort** becomes capacity-weeks scaled to your team's real capacity, with the conversion stated rather than assumed.
- **Kano** gains explicit evidence tiers, surveyed and inferred, so the skill refuses only when there is no research at all rather than when the research is not a formal survey. The tier is set by collection method; sample adequacy is a separate gate on how strong a claim you may make. The skill deliberately declines to define "clearly leads" as a number, and says so in the text rather than leaving it unstated: a house cutoff would carry more authority than the judgment it displaced.

**Cross-skill handoff pointers.** The original scope named fourteen skills. Measuring during execution narrowed it to four, and the other ten turned out to be regex noise exactly as the recorded residual risk predicted. "Shared with `foundation-meeting-brief`" is not a handoff. The precise signal is a sibling skill named inside an output, routing, or refusal section.

### Project memory gets a front door, and a worked example

v2.32.0 shipped project memory and then did not tell anyone. Four surfaces now point at it: the README, the site index, the quickstart, and the site quickstart.

Auditing the destination before writing those pointers turned out to matter, because the deep documentation was not usable either, so four surfaces would have routed people to a dead end. Fixed along the way, and it surfaced a real defect: the docs twice called the state file "gitignored", which is a property of *this* repository's `.gitignore`, not of the file. Nobody was telling you to ignore it in your own project, so anyone following the docs would have committed a file holding their initiative, decisions, and artifact paths while the docs assured them it was ignored.

The worked example is a published sample **pair** on the Storevine thread: an interview synthesis, then a PRD that consumes it. You can read the handoff end to end and see the PRD prompt shrink because the personas and findings are already on record rather than pasted in again. A walkthrough sits in [Hooks and project memory](../concepts/hooks.md).

**A limit worth stating, because it is easy to overread.** This demonstrates the loop as designed, not as executed. It does not prove the propose-then-confirm write path behaves correctly at runtime; it shows what the artifacts look like when it does.

### The AI-product skill family opens

Four conditional sections across three skills, for the case where what you are specifying involves a model.

- **`deliver-prd` 3.0.0** gains **AI Behavior and Evaluation**, which pairs each behavior requirement with the evidence that actually holds it up and gives refusal and abstention their own rows rather than leaving them implied. It also gains **Agent Execution Contract**: authoritative sources, do-not-touch boundaries, a requirement-to-verification map, and a stop-and-escalate rule.
- **`measure-instrumentation-spec` 3.0.0** gains **Model Trace Capture**, a privacy contract for prompt and completion traces: what is captured, what is minimized before egress and again before durable storage, what happens when either minimization fails, what ultimately becomes of a failed trace, who can read a trace, whether that read is logged, retention, sampling, and opt-out.
- **`develop-adr` 3.0.0** gains **Model Choice** inside Consequences.

**These are skill-MAJORs, not minors, and the reasoning was corrected during the release.** The original plan called them additive because they are conditional. That was wrong: conditionality narrows *who* is affected without changing *what happens* to them, and the tie-breaker asks whether existing usage breaks. It did. Two published PRD samples describing an AI-generated summary feature carried no `AI Behavior and Evaluation` section, which made them non-compliant with the skill that produced them. Both were retrofitted.

### Version and sample counts

Eight skills bumped this cycle: three major, four minor, one patch. The sample library grows to **213 samples across 63 skills**.

## Notes for the curious

This release's gate ran unusually long, and the reason is worth recording publicly because it is a general lesson about templates rather than a story about this repository.

The adversarial review before shipping ran **twelve rounds**. Splitting all fifty-six findings by what the fix that produced the surface actually did separates them completely: **fixes that removed a claim converged, and fixes that authored new methodology churned.** One section produced zero findings across the nine rounds after its shaky derivation was simply deleted. Another survived a full rewrite, then a deletion with an authored replacement, then a row split, and produced a fresh high-severity finding after each one, because each of those authored something new for the reviewer to attack.

The sharpest instance: a fix that split a table row in order to assert "each row must make exactly one claim" wrote a replacement row that makes two. The principle was right, and embodying it in authored structure reintroduced the defect one level down.

The practical takeaway for anyone writing templates: **a PM-authored template can name a contract and demand evidence, but it cannot author correct engineering test design, and a determined reviewer will keep proving it.** Several sections in this release now name what must be true and who owns proving it, rather than prescribing how. A test that cannot fail is worse than a named requirement, because it converts an open question into a checked box.
