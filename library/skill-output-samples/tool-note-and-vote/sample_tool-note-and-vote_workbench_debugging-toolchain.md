---
title: "Note and Vote: Workbench 2x2 Axis Selection"
description: "Workbench Day 1 afternoon note-and-vote during Differentiation block to select the 2x2 chart axes; 20-minute structured group decision."
artifact: tool-note-and-vote
version: "1.0"
repo_version: "2.15.0"
skill_version: "0.1.0"
created: 2026-05-21
status: sample
thread: workbench
context: "Workbench Day 1 PM Differentiation block, 2x2 axis-selection stalling; facilitator runs note-and-vote at 14:45 PT"
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Question

"Which two axes should the Workbench Differentiation 2x2 chart use?"

The Differentiation block had stalled at 14:35 PT with team members proposing different axis pairs. The chart needs two orthogonal axes that meaningfully separate Workbench from the competitor set. Three candidate pairs had emerged:

- Priya: Always-on vs Incident-time on X; Disorientation-phase strength (weak to strong) on Y
- Marcus: Data depth (shallow to deep) on X; Tool scope (narrow to broad) on Y
- Jin: Setup friction (low to high) on X; Incident-relevance (low to high) on Y

The facilitator (Ari, rotating) called for a `tool-note-and-vote` rather than continuing open argument. Decider (Priya) confirmed.

## Roles

| Role | Member |
|---|---|
| Facilitator | Ari |
| Decider | Priya |
| Participants | Priya, Marcus, Ari, Jin |
| Scribe | Marcus |

## Protocol Executed

**Step 1: Silent ideation (4 minutes).** Each participant wrote 2-3 candidate axis pairs on individual stickies.

**Step 2: Affinity clustering (3 minutes).** Ari clustered 11 individual sticky notes into 5 candidate pairs on the wall.

**Step 3: Silent voting (2 minutes).** Each participant gets 2 dot-votes; can split or stack.

**Step 4: Decider supervote (4 minutes).** Priya reviews + brief discussion + commits.

**Step 5: Capture (3 minutes).** Marcus records the decision; Ari resumes Differentiation at 15:05 PT.

Total elapsed: 16 minutes. Differentiation block resumed without further axis debate.

## Candidate Set (After Affinity)

| Cluster | Axis pair | Vote count |
|---|---|---|
| A | Always-on vs Incident-time x Disorientation-phase strength | 5 |
| B | Setup friction x Incident-relevance | 2 |
| C | Data depth x Tool scope | 1 |
| D | Single-purpose vs Multi-purpose x Cognitive load reduction | 0 |
| E | Vendor footprint x SRE-vocabulary alignment | 0 |

Total dot-votes: 8 (2 per participant x 4). Cluster A won 5 of 8 (62.5%).

## Decider Supervote

Priya reviewed and committed:

> "Cluster A: Always-on vs Incident-time on X; Disorientation-phase strength on Y. It got the most votes and it also maps most cleanly to the Mini Manifesto we're about to write. The other axes have signal: Marcus, your data-depth-vs-scope frame is honest about a real tradeoff but it's an Approach Options question, not a Differentiation one. Jin, your setup-friction-vs-relevance frame is useful but the relevance axis is what Cluster A's disorientation-phase axis is really getting at. We go with A. Final."

## Decision Recorded

**2x2 axes for Workbench Differentiation: X = Always-on vs Incident-time (continuous spectrum); Y = Disorientation-phase strength (weak to strong).**

The chart will plot existing competitors (Datadog, Honeycomb, Sentry, PagerDuty, Grafana stack, multi-tool juggling) at their natural positions and identify the empty upper-right quadrant where Workbench wants to sit.

This decision feeds directly into the Differentiation bundled artifact (`sample_tool-foundation-sprint-differentiation_workbench_debugging-toolchain.md`).

## What This Note-and-Vote Did NOT Decide

- The specific competitor placements on the chart (deferred to chart-drawing in Differentiation)
- The differentiator scoring (deferred to D1-D8 scoring step in Differentiation)
- The principles or Mini Manifesto language (deferred to Day 1 PM second half)

## Decider Checkpoint (lightweight; inside Differentiation block)

Priya explicitly affirms the decision is binding for the rest of the sprint:

- [x] Cluster A axes are locked for the Differentiation 2x2 chart.
- [x] Re-litigation requires explicit Decider re-opening; not automatic.
- [x] Marcus, Ari, Jin commit to building on Cluster A without revisiting.

**Signed:** Priya, 2026-05-21 15:03 PT

---

**Cross-reference note:** the tool-note-and-vote standalone skill is invoked multiple times within both threads (Storevine and Workbench). This sample captures one such invocation for the Workbench thread; the parallel Storevine note-and-vote sample captures a different decision moment (target customer specificity during Basics). Both samples follow the same canonical protocol; only the question, participants, and outcome differ.
