# Design Sprint Track: Design Spec

**Status:** Draft (architectural amendment 2026-05-13: tool classification, dropped bridge, two families)
**Authored:** 2026-05-10; amended 2026-05-13
**Cross-references:** `foundation-sprint-design-spec.md` (sibling track); architectural decisions captured in `docs/internal/release-plans/v2.15.0/plan_v2.15.0.md` Ratified Decisions table and project memory `project_v2.15-tool-classification-decisions.md`

> **Amendment note (2026-05-13):** This spec's original architecture used `classification: sprint` with `sprint_type` and `sprint_move` root fields, plus a `sprint-foundation-to-design` bridge skill (full contract below) and a `sprint-note-and-vote` shared skill (full contract below) within a single `sprint-skills` family. The integration plans now reflect a refactored architecture: `classification: tool`, two families (`foundation-sprint-skills` + `design-sprint-skills`), bridge skill DROPPED entirely, note-and-vote relocated to `tool-note-and-vote` as a standalone tool. Skill slugs throughout this spec should be read as `tool-design-sprint-{move}` in the new architecture. The per-skill content contracts (purpose, inputs, outputs, common pitfalls, Decider checkpoints) remain valid. The bridge skill section below is HISTORICAL ONLY; the integration plan does not ship it.

## Track purpose

Design Sprint is a 5-day workshop that tests a risky product idea with target customers through a realistic prototype. The output is a tested prototype, scorecard answers, and an evidence-backed decision: build, iterate, run another sprint, or stop.

This track delivers 7 AI-assisted facilitation skills covering the canonical Design Sprint arc. The originally-planned 2 cross-track skills are now: `tool-note-and-vote` (standalone tool, ships with FS plan; contract preserved below for historical reference); `tool-foundation-sprint-to-design` bridge skill DROPPED entirely.

## What this document covers

- 7 Design Sprint skill contracts (current, post-amendment)
- 2 cross-track skill contracts (HISTORICAL; bridge dropped, note-and-vote relocated)
- `design-sprint` and `foundation-to-design` workflows (the latter has narrative transition, not a bridge skill invocation)
- Library samples plan for the track
- Track-specific open questions (ratified in the DS integration plan)

Architectural decisions live in the integration plans and the master release plan, not duplicated here. See `plan_v2.15.0.md` Ratified Decisions table.

## Method fidelity and canonical sources

Sources weighted by procedural authority:

1. **Sprint** (Knapp, Zeratsky, Kowitz, 2016): book-length canonical method
2. **GV Design Sprint guide** (https://www.gv.com/sprint/): original public 5-day procedural source
3. **Character Design Sprint guide** (https://www.character.vc/guide/design-sprint): current updated guide
4. **Google Design Sprint Kit**: methodology overview
5. **Design Sprint Academy facilitation kits**: operational and remote guidance

The 7 skills preserve the GV five-day structure (Monday-Friday). The "Goldilocks prototype" principle and "Five-Act Interview" structure come from Sprint book. DSA's remote-facilitation guidance shapes the brief skill.

## Skill catalog summary

| # | Skill slug (post-amendment) | Move | Timebox | Primary bundled output |
|---|---|---|---|---|
| 1 | `tool-design-sprint-readiness` | Pre-sprint | 30-45 min | Readiness assessment with go/conditional-go/wait verdict |
| 2 | `tool-design-sprint-brief` | Pre-sprint | 60-90 min | Sprint brief: challenge, team, customer recruiting plan, logistics |
| 3 | `tool-design-sprint-map-and-target` | Monday | 90-120 min | Long-term goal plus sprint questions plus customer map plus HMW clusters plus target moment |
| 4 | `tool-design-sprint-sketch` | Tuesday | 150-210 min | Lightning demo board plus four-step sketches plus assignments |
| 5 | `tool-design-sprint-decide-and-storyboard` | Wednesday | 180-240 min | Heat map plus critique notes plus supervote plus storyboard |
| 6 | `tool-design-sprint-prototype-plan` | Thursday | 60-120 min | Prototype role plan plus interview script plus trial-run checklist plus participant schedule |
| 7 | `tool-design-sprint-test-and-score` | Friday | 240-300 min | Interview observations plus scorecard plus decisions plus hot takes plus next-step memo |

Historical cross-track skills (DOCUMENTED BELOW FOR ORIGIN REFERENCE; current architecture):

- `sprint-foundation-to-design` (bridge): DROPPED 2026-05-13. Not a canonical Knapp/Zeratsky move. The FS-to-DS transition lives narratively in `_workflows/foundation-to-design.md` and both user guides.
- `sprint-note-and-vote` (shared): relocated to `tool-note-and-vote` standalone tool (ships with FS integration plan). Used multiple times across both tracks at decision moments.

## Per-skill detailed contracts

### 1. tool-design-sprint-readiness

**Purpose:** assess whether a Design Sprint fits. Critical because Design Sprint failure modes are expensive (5-day team commitment plus customer recruiting cost).

**When to use:** team is considering starting a Design Sprint and needs a fast diagnostic.

**When NOT to use:** pure discovery phase (use problem framing or Foundation Sprint first); low-stakes tweaks; no customer access available.

**Inputs:**

- Challenge description
- Existing hypothesis (from Foundation Sprint or other source)
- Customer access status
- Decider availability
- Team composition draft

**Bundled output:**

- Verdict: Go / Conditional Go / Wait
- Diagnosis (what's missing)
- Recommended preconditions if Wait
- If Go: recommended attendee list, customer recruiting plan, prep checklist

**Roles:** facilitator, PM, prospective Decider

**Timebox:** 30-45 min

**Frontmatter prerequisites:** none

**Canonical references:** Sprint book Chapter 2; GV "Is Your Idea Sprint-Worthy?"; Character "When to Sprint"

**Common pitfalls:**

- Sprint theater (leadership has already decided)
- No Decider
- No customer access for Friday
- Challenge too broad to fit in one week

**Decider checkpoint:** Decider signs off on Go/Wait.

---

### 2. tool-design-sprint-brief

**Purpose:** produce the pre-sprint brief covering challenge, team, customer recruiting plan, logistics, and success definition.

**When to use:** after readiness verdict is Go; before Monday.

**When NOT to use:** after the sprint has started.

**Inputs:**

- Readiness verdict (or skip readiness)
- Challenge description
- Founding Hypothesis (if Foundation Sprint completed)
- Team roster
- Customer recruiting source/plan
- Logistics constraints

**Bundled output:**

- Challenge title and why now
- Sprint questions to answer
- Decider's required attendance windows
- Team roster with role assignments
- Customer recruiting plan (target profile, source, count, incentive)
- Prototype medium decision (clickable, slideware, service role-play)
- Interview format (live, remote, moderated)
- Logistics plan
- Success criteria

**Roles:** facilitator, PM, Decider, researcher (for recruiting plan)

**Timebox:** 60-90 min (longer than Foundation Sprint brief because customer recruiting adds dimensions)

**Frontmatter prerequisites:** `tool-design-sprint-readiness` (recommended). When coming from a Foundation Sprint, the FS Founding Hypothesis output is consumed as optional input context (no separate bridge skill).

**Canonical references:** Sprint book Chapter 3; Character pre-sprint guide; AJ&Smart remote sprint template

**Common pitfalls:**

- Vague sprint questions (must be answerable through a prototype test)
- Recruiting plan that doesn't match target customer
- Skipping prototype medium decision (forces Thursday team into ad-hoc choice)

**Decider checkpoint:** Decider signs off on scope, team, recruiting plan.

---

### 3. tool-design-sprint-map-and-target (Monday)

**Purpose:** produce Monday's bundled artifact, which is the long-term goal, sprint questions, customer/system map, HMW clusters, and chosen target moment.

**When to use:** Day 1 of the Design Sprint, after brief is locked.

**When NOT to use:** when no challenge is defined (return to brief).

**Inputs:**

- Sprint brief
- Existing research, analytics, customer examples (from brief)
- Expert interview transcripts (run during Monday)

**Bundled output:**

- Long-term goal (1 to 5 years out)
- Sprint questions (3 to 7 questions converting fears into testable risks)
- Customer or system map (5 to 15 step flow from key player to outcome)
- Expert interview notes
- HMW (How Might We) cluster board
- Target moment (the Decider's selected point in the map)

**Roles:** facilitator, Decider, PM, design, engineering, researcher; experts on Monday cameo

**Timebox:** 90-120 min for facilitated section (does not include expert interviews which run in parallel)

**Frontmatter prerequisites:** `tool-design-sprint-brief`

**Cross-skill usage:** invokes `tool-note-and-vote` for HMW prioritization and target selection

**Canonical references:** Sprint book Monday chapter; GV "Sprint Week Monday"; Character Day 1 of Design Sprint

**Common pitfalls:**

- Long-term goal too short (1 month is a roadmap goal, not a long-term goal)
- Sprint questions phrased as solutions instead of risks
- Map too detailed (5 to 15 steps, not 50)
- Skipping HMW because the team "already knows the opportunities"

**Decider checkpoint:** Decider picks the target moment. Team disperses for the day.

---

### 4. tool-design-sprint-sketch (Tuesday)

**Purpose:** produce Tuesday's bundled artifact, which is lightning demo inspirations and four-step solution sketches from each team member.

**When to use:** Day 2, after Monday is signed off.

**When NOT to use:** when target is unclear (return to Monday).

**Inputs:**

- Map and target (from Monday)
- Lightning demo sources (each person comes with 3 examples)
- Sketch assignment (divide vs swarm)

**Bundled output:**

- Lightning demo board (each demo plus reusable pattern extracted)
- Sketch assignment plan
- Four-step sketches from each team member:
  - Notes (20 min reviewing)
  - Ideas (20 min rough)
  - Crazy 8s (8 min with 8 variations)
  - Solution sketch (30 to 90 min final)
- Recruiting tracker update

**Roles:** facilitator, whole team (each person sketches independently)

**Timebox:** 150-210 min

**Frontmatter prerequisites:** `tool-design-sprint-map-and-target`

**Canonical references:** Sprint book Tuesday chapter; GV "Sprint Week Tuesday"; Character Day 2

**Common pitfalls:**

- Group brainstorming instead of independent sketching (Sprint method explicitly avoids this)
- Sketches not concrete enough (must be understandable without the artist explaining)
- Skipping lightning demos
- Demo facilitator failing to extract reusable patterns

**Decider checkpoint:** none mid-day; all sketches must be ready by Wednesday morning.

---

### 5. tool-design-sprint-decide-and-storyboard (Wednesday)

**Purpose:** produce Wednesday's bundled artifact, which is the decision (which sketch becomes the prototype) plus the storyboard that will drive Thursday's build.

**When to use:** Day 3, after Tuesday sketches are ready.

**When NOT to use:** when sketches are missing or insufficient quality.

**Inputs:**

- All solution sketches (from Tuesday)
- Map and target (for storyboard framing)

**Bundled output:**

- Art museum layout (sketches posted anonymously)
- Heat map (silent stickers on promising parts)
- Speed critique notes per sketch
- Straw poll results
- Supervote: Decider's choice
- Rumble vs all-in-one decision
- Storyboard (5 to 15 step, drives Thursday's build plan)

**Roles:** facilitator, Decider, whole team

**Timebox:** 180-240 min (Wednesday is the most decision-heavy day)

**Frontmatter prerequisites:** `tool-design-sprint-sketch`

**Cross-skill usage:** invokes `tool-note-and-vote` for straw poll and supervote

**Canonical references:** Sprint book Wednesday chapter; GV "Sprint Week Wednesday"; Character Day 3

**Common pitfalls:**

- Consensus drift instead of Decider supervote
- Storyboard too vague (must be specific enough that Thursday can build without re-debating)
- Skipping critique to save time (critique surfaces concerns the storyboard must address)

**Decider checkpoint:** Decider's supervote chooses what gets prototyped. Storyboard ready by Wednesday end.

---

### 6. tool-design-sprint-prototype-plan (Thursday morning / setup)

**Purpose:** produce Thursday's planning artifact, which is the prototype role plan, interview script, trial-run checklist, and participant confirmation. Note: this skill plans Thursday's work; the actual prototype build is a craft activity outside the AI's invocation surface.

**When to use:** Thursday morning, after Wednesday's storyboard is signed off.

**When NOT to use:** without a storyboard (return to Wednesday).

**Inputs:**

- Storyboard (from Wednesday)
- Sprint questions (from Monday)
- Founding Hypothesis (if Foundation Sprint preceded)
- Decider's prototype medium choice (clickable, slideware, etc.)

**Bundled output:**

- Prototype role plan (Maker, Stitcher, Writer, Asset Collector, Interviewer)
- Prototype brief (one-page: what to build, fidelity bar, time allocation per role)
- Interview script (Five-Act Interview: welcome, context, intro, tasks, debrief)
- Trial-run checklist (gates before Friday)
- Participant confirmation tracker

**Roles:** facilitator, design, engineering, interviewer, PM

**Timebox:** 60-120 min (skill output); the prototype build itself takes the rest of Thursday

**Frontmatter prerequisites:** `tool-design-sprint-decide-and-storyboard`

**Canonical references:** Sprint book Thursday chapter; GV "Sprint Week Thursday"; Character Day 4

**Common pitfalls:**

- Treating prototype as a deliverable instead of a learning tool
- Polishing instead of building enough realism
- Interview script with leading questions
- Skipping trial run

**Decider checkpoint:** Decider approves role plan and interview script before build starts.

---

### 7. tool-design-sprint-test-and-score (Friday)

**Purpose:** produce Friday's bundled artifact, which is the customer interviews, scorecard, decisions, hot takes, and next-step memo.

**When to use:** Day 5, after Thursday prototype is built and trial-run passes.

**When NOT to use:** without a working prototype or confirmed participants.

**Inputs:**

- Prototype (built Thursday, not produced by this skill)
- Interview script (from `design-sprint-prototype-plan`)
- Sprint questions (from Monday)
- Founding Hypothesis questions (if Foundation Sprint preceded)
- Participant schedule

**Bundled output:**

- Per-customer interview observation notes
- Best quotes
- Scorecard grid: question rows by customer columns, with Y/N notes per cell and day-end decision per row
- Observed patterns (worked, hesitated, broke trust, unexpected)
- Hot takes from each team member
- Decider summary: build / iterate / stop / reframe, plus highest-confidence learning, most important revision, next artifact

**Roles:** facilitator, interviewer, whole team observing, Decider

**Timebox:** 240-300 min (5 interviews of 30 to 45 min each plus 60 to 90 min synthesis)

**Frontmatter prerequisites:** `tool-design-sprint-prototype-plan`

**Canonical references:** Sprint book Friday chapter; GV "Sprint Week Friday"; Character Day 5

**Common pitfalls:**

- Testing with wrong participants
- Leading questions in the interview
- Internal debate during observation (silent observation is the protocol)
- Failing to convert observations into Yes/No decisions
- No Friday decision (the sprint loses much of its value if learning does not change action)

**Decider checkpoint:** Decider's final call (build/iterate/stop/reframe) closes the sprint.

**Hand-off:** outputs feed pm-skills downstream (`deliver-prd`, `measure-experiment-design`, `iterate-pivot-decision`) or trigger a follow-up Design Sprint.

---

## Cross-track skills (HISTORICAL: amended 2026-05-13)

> **The two sub-sections below are HISTORICAL.** Per the 2026-05-13 architectural amendment, the cross-track design changed: `sprint-note-and-vote` was renamed to `tool-note-and-vote` and reclassified as a standalone tool (ships with the FS integration plan, not a family member). `sprint-foundation-to-design` was DROPPED entirely (not canonical Knapp/Zeratsky methodology; transition lives in `_workflows/foundation-to-design.md` and both user guides). The contracts below remain useful for understanding original design intent.

### sprint-note-and-vote (historical; current name: tool-note-and-vote)

**Purpose:** universal decision mechanic used throughout both Foundation Sprint and Design Sprint. Captures silent ideation, vote summaries, and decision records.

**When to use:** any sprint moment requiring a group decision with diverse input.

**When NOT to use:** outside sprint context (existing pm-skills decision tooling fits better).

**Inputs:**

- Decision question
- Time allocation
- Voting method (single-vote, dot-vote, weighted)
- Optional: silent-write prompt

**Bundled output:**

- Silent ideation board (timestamped contributions)
- Vote summary (counts per option)
- Discussion notes
- Decision record (chosen option plus Decider sign-off)

**Roles:** facilitator, whole team (Decider for final calls)

**Timebox:** 20-30 min per invocation

**Frontmatter prerequisites:** none (utility skill)

**Frontmatter sprint_type:** `shared`

**Canonical references:** Character "Note and Vote" guide; Sprint book Wednesday chapter (heat map / supervote variant)

**Common pitfalls:**

- Skipping silent ideation (groupthink)
- Skipping Decider supervote (consensus drift)
- Long discussion phase that erodes time for actual sprint moves

**Decider checkpoint:** Decider supervote for final call when votes don't converge.

---

### sprint-foundation-to-design (HISTORICAL; DROPPED)

> This skill was dropped per the 2026-05-13 amendment. The conversion logic described below now lives as narrative content in `_workflows/foundation-to-design.md` and in the two user guides. The original contract is preserved here for context.

**Purpose:** bridge skill that converts a Founding Hypothesis plus assumption scorecard from a Foundation Sprint into a Design Sprint brief. The highest-risk assumption becomes the Design Sprint challenge.

**When to use:** team has completed a Foundation Sprint and is starting a Design Sprint to validate.

**When NOT to use:** starting a Design Sprint without a Foundation Sprint (use `design-sprint-brief` directly); starting another Foundation Sprint to revise the hypothesis (no bridge needed).

**Inputs:**

- Founding Hypothesis statement
- Assumption scorecard
- Top bet and backup approach
- Team availability for Design Sprint

**Bundled output:**

- Highest-risk assumption identified (from scorecard)
- Design Sprint challenge statement (derived from assumption)
- Recommended sprint questions (mapped from scorecard rows)
- Recommended prototype medium given the assumption type
- Customer recruiting profile (derived from Founding Hypothesis target customer)
- Team carry-over (which roles continue from Foundation Sprint to Design Sprint)

**Roles:** facilitator, PM, Decider

**Timebox:** 30-45 min

**Frontmatter prerequisites:** `foundation-sprint-founding-hypothesis`

**Frontmatter sprint_type:** `bridge`

**Canonical references:** Character "Foundation Sprint to Design Sprint" handoff guidance; Lenny's "Foundation Sprint feeds Design Sprint" framing

**Common pitfalls:**

- Carrying over the whole hypothesis as the challenge (challenge should be specific to the riskiest assumption)
- Recruiting customers from a different segment than the Founding Hypothesis target
- Letting the team's Founding Hypothesis confidence go untested

**Decider checkpoint:** Decider confirms the Design Sprint challenge and team continuation.

**Hand-off:** outputs become input to `design-sprint-brief`.

---

## Workflows

### `design-sprint`

`_workflows/design-sprint.md` chains the 7 Design Sprint skills.

```text
workflow: design-sprint
duration: 5 days canonical (Monday-Friday) plus 1 prep day
team_size: 7 or fewer including Decider

steps:
  prep:
    - tool-design-sprint-readiness
    - tool-design-sprint-brief
  monday:
    - tool-design-sprint-map-and-target
  tuesday:
    - tool-design-sprint-sketch
  wednesday:
    - tool-design-sprint-decide-and-storyboard
  thursday:
    - tool-design-sprint-prototype-plan
    (prototype build is craft activity outside AI invocation)
  friday:
    - tool-design-sprint-test-and-score

next_workflow_options:
  - pm-skills:workflow-feature-kickoff       # build path
  - pm-skills:workflow-post-launch-learning  # iterating with experiment
  - design-sprint                            # follow-up sprint
  - pm-skills:iterate-pivot-decision         # stop or reframe
```

### `foundation-to-design`

`_workflows/foundation-to-design.md` documents the end-to-end Foundation Sprint to Design Sprint arc, with a narrative transition section (no bridge skill).

```text
workflow: foundation-to-design
duration: 7 to 8 days (2 FS + 5 DS, plus prep; no separate bridge day)
team_size: 3 to 5 for FS; expanded to 7 or fewer for DS

steps:
  foundation_sprint:
    - all 7 tool-foundation-sprint-* skills via foundation-sprint workflow
  transition:
    # narrative section in the workflow doc; no skill invocation
    # covers: which FS outputs map to which DS inputs, go/no-go checkpoint, team continuity, timing
  design_sprint:
    - all 7 tool-design-sprint-* skills via design-sprint workflow
```

The transition section is the load-bearing replacement for the dropped bridge skill.

## Library samples plan

Same fictional clients as Foundation Sprint (Brainshelf, Storevine, Workbench). Each client gets a complete Design Sprint trace.

- 7 Design Sprint skills times 3 clients = 21 samples (this plan's contribution)
- 0 cross-track samples (bridge dropped; tool-note-and-vote samples ship with FS plan)
- Combined v2.15.0 sprint-skills library: 21 (Foundation track + 3 note-and-vote samples) + 21 (Design track) + 3 (tool-note-and-vote samples) = 45 samples

Each sample includes: filled TEMPLATE with realistic content, decision rationale notes, common-pitfall annotations, cross-reference to the next sample in the same client's sprint.

For the FS-to-DS handoff: each client's `tool-foundation-sprint-founding-hypothesis` sample documents the strategic context (highest-risk assumption identified in the scorecard) that the team carries into their `tool-design-sprint-readiness` sample. No separate bridge sample.

## Track-specific open questions

1. **Prototype build inside or outside skill scope.** This spec excludes the prototype-build itself from `design-sprint-prototype-plan` (the skill plans, doesn't build). Confirm this scoping. Alternative: a separate `design-sprint-prototype-build` skill that walks through the build process. Recommend keeping out of scope: build is craft, not workshop facilitation.
2. **Five-Act Interview script generation.** Should the interview script be hardcoded structure (canonical Five Acts) or templated with team choices? Lean canonical for v0.1.
3. **Scorecard customer count.** Canonical is 5 customers. Should the skill accept 3 to 7 with warnings, or strictly require 5? Lean 5 with warning at 3 or 4 and at 6 or 7.
4. **Friday synthesis depth.** Decider summary asks for build/iterate/stop/reframe. Should the skill also generate an exec memo, or leave that to `pm-skills:foundation-stakeholder-update`? Lean leave to stakeholder-update.
5. **Rumble support.** Should the skill support testing 2 to 3 competing prototypes (Rumble variant)? Adds complexity; defer to v0.2 unless dogfooding demands it.
6. **Remote vs in-person variant.** Should there be a `design-sprint-brief-remote` variant, or does the same skill accept a `format` parameter? Lean parameter for v0.1.
7. **Hardware or service sprint variants.** Sprint book documents these; should v0.1 cover or defer? Lean defer; document in canonical-source-mapping.md as known variants for future.
