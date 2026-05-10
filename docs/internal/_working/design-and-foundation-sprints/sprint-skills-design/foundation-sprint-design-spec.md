# Foundation Sprint Track: Design Spec

**Status:** Draft for review
**Authored:** 2026-05-10
**Cross-references:** `sprint-skills-architecture.md` (shared decisions), `design-sprint-design-spec.md` (sibling track)

## Track purpose

Foundation Sprint is a 2-day workshop that converts fuzzy early-stage product beliefs into a testable strategic promise:

> If we help [target customer] solve [important problem] with [approach], they will choose it over [competitors or alternatives] because our solution is [differentiators].

This track delivers 7 AI-assisted facilitation skills covering the canonical Foundation Sprint arc.

## What this document covers

- 7 Foundation Sprint skill contracts
- `foundation-sprint` workflow
- Library samples plan for the track
- Track-specific open questions

This document references `sprint-skills-architecture.md` for shared decisions (packaging, repo layout, frontmatter contract, family contract, validators, versioning). Architecture content is NOT duplicated here.

Cross-track skills (`sprint-note-and-vote` shared, `sprint-foundation-to-design` bridge) are documented in `design-sprint-design-spec.md` to keep them in one place.

## Method fidelity and canonical sources

Sources weighted by procedural authority:

1. **Click** (Knapp and Zeratsky, 2025): book-length canonical method
2. **Character Foundation Sprint guide** (https://www.character.vc/guide/foundation-sprint): most complete public procedural source
3. **Lenny's Newsletter "Introducing the Foundation Sprint"**: additional logic for the Founding Hypothesis
4. **Design Sprint Academy Foundation Sprint articles**: enterprise adaptation guidance

The 7 skills encode Character's structure (Basics, Differentiation, Approach), use Lenny's Founding Hypothesis template, and incorporate Design Sprint Academy's enterprise prep guidance into the readiness skill.

## Skill catalog summary

| # | Skill slug | Move | Timebox | Primary bundled output |
|---|---|---|---|---|
| 1 | `foundation-sprint-readiness` | Pre-sprint | 30-45 min | Readiness assessment with go/conditional-go/wait verdict |
| 2 | `foundation-sprint-brief` | Pre-sprint | 45-60 min | Sprint brief: scope, team, logistics, success criteria |
| 3 | `foundation-sprint-basics` | Day 1 morning | 90-120 min | Target customer plus important problem plus advantage inventory plus competitor map |
| 4 | `foundation-sprint-differentiation` | Day 1 afternoon | 120-180 min | Differentiator set plus 2x2 chart plus decision principles plus mini-manifesto |
| 5 | `foundation-sprint-approach-options` | Day 2 morning | 60-90 min | One-page summaries for 3-7 candidate approaches |
| 6 | `foundation-sprint-magic-lenses` | Day 2 afternoon | 90-120 min | Lens evaluation (classic plus custom) plus top bet plus backup |
| 7 | `foundation-sprint-founding-hypothesis` | Day 2 end | 30-45 min | Founding Hypothesis plus assumption scorecard plus recommended next test |

Plus 1 bridge skill `sprint-foundation-to-design` (cross-track, defined in design-sprint-design-spec.md) and 1 shared skill `sprint-note-and-vote` used 8 or more times across this track.

## Per-skill detailed contracts

### 1. foundation-sprint-readiness

**Purpose:** assess whether a Foundation Sprint fits the team's current question. Prevents the most common sprint failure mode (running sprints without prerequisites for success).

**When to use:** team is considering starting a Foundation Sprint and needs a fast diagnostic before committing 2 days.

**When NOT to use:** team has already decided to run the sprint (use `foundation-sprint-brief`); team needs deep customer discovery (use pm-skills problem framing first).

**Inputs:**

- Initiative description (what is the project)
- Team composition draft
- Decider name and availability
- Existing customer/market knowledge level (self-assessed)

**Bundled output:**

- Readiness verdict: Go / Conditional Go / Wait
- Diagnosis (what's missing, if anything)
- Recommended preconditions if not ready
- If Go: recommended attendee list and pre-sprint activities

**Roles:** facilitator, PM, prospective Decider

**Timebox:** 30-45 min

**Frontmatter prerequisites:** none (entry point)

**Canonical references:** Character readiness checklist; DSA enterprise readiness criteria; Click readiness guidance

**Common pitfalls:**

- Skipping readiness because "we're going to run it anyway"
- Treating Conditional Go as Go without doing the prep
- Confusing readiness assessment with problem framing

**Decider checkpoint:** Decider signs off on Go/Wait verdict.

---

### 2. foundation-sprint-brief

**Purpose:** produce the pre-sprint brief that aligns the team on scope, participants, logistics, and success criteria before Day 1.

**When to use:** after readiness verdict is Go; before the sprint starts.

**When NOT to use:** after the sprint has started (it's a prep artifact).

**Inputs:**

- Readiness verdict and recommendations (from `foundation-sprint-readiness`)
- Initiative description
- Team roster
- Logistics constraints (dates, location, remote/hybrid)

**Bundled output:**

- Initiative statement and stakes
- Decision the sprint must unlock
- Team roster with role assignments
- Logistics plan (dates, location, format, tools)
- Existing inputs to bring (research, metrics, competitor notes)
- Readiness reaffirmation (final check before starting)

**Roles:** facilitator, PM, Decider

**Timebox:** 45-60 min

**Frontmatter prerequisites:** `foundation-sprint-readiness` (recommended) or skip if user has done equivalent

**Canonical references:** Character pre-sprint guide; Click prep recommendations; pm-skills `foundation-meeting-brief` precedent for brief structure

**Common pitfalls:**

- Over-engineering the brief (it's a one-pager, not a strategy doc)
- Treating brief as a deliverable to stakeholders (it's internal prep)

**Decider checkpoint:** Decider signs off on scope, team, and success criteria.

---

### 3. foundation-sprint-basics

**Purpose:** produce Day 1 morning's bundled output, which is the foundational decisions about who the product is for, what problem it solves, why the team has a right to win, and what customers do instead today.

**When to use:** Day 1 morning of a Foundation Sprint, after brief is locked.

**When NOT to use:** when the team lacks enough customer knowledge to make informed choices (run customer research first).

**Inputs:**

- Sprint brief
- Existing customer/market context packet
- Competitor and alternatives knowledge
- Team advantage notes

**Bundled output** (one coherent artifact, not 4 separate ones):

- Target customer statement (plain language, specific)
- Important problem statement (with painful-enough rationale)
- Team advantage inventory (capabilities, insights, relationships, assets)
- Competitor and alternative map (direct competitors, workarounds, "do nothing")
- Note-and-vote trace showing how each decision was made

**Roles:** facilitator, Decider, PM, customer expert, optional technical expert

**Timebox:** 90-120 min

**Frontmatter prerequisites:** `foundation-sprint-brief`

**Cross-skill usage:** invokes `sprint-note-and-vote` 4 times (once per decision)

**Canonical references:** Character Basics agenda; Click Day 1 morning; Lenny's "target customer" and "important problem" sections

**Common pitfalls:**

- Vague customer ("SaaS PMs" instead of "PMs at Series-B SaaS companies between 20 and 100 engineers")
- Mild-annoyance problems mistaken for painful ones
- Generic advantages ("great team") instead of specific (capability, insight, asset)
- Ignoring "do nothing" as a competitor
- Treating Basics as separable atomic decisions instead of one coherent strategic frame

**Decider checkpoint:** Decider signs off on the bundled artifact before moving to Differentiation.

---

### 4. foundation-sprint-differentiation

**Purpose:** produce Day 1 afternoon's bundled artifact, which is the differentiation chart, decision principles, and mini-manifesto that define how the product will stand apart.

**When to use:** Day 1 afternoon, after Basics is signed off.

**When NOT to use:** when Basics is unresolved (the inputs aren't ready).

**Inputs:**

- Basics bundled artifact (target customer, problem, advantage, competitors)
- Differentiation candidates (generated in-skill or pre-supplied)

**Bundled output** (one coherent artifact):

- Scored differentiator candidates (classic and custom dimensions)
- 2 chosen differentiators
- 2x2 differentiation chart with competitors plotted
- Decision principles list (3 to 5 principles that operationalize the differentiation)
- One-page mini-manifesto (Day 1 strategic summary)

**Roles:** facilitator, Decider, PM, design lead (essential for chart)

**Timebox:** 120-180 min

**Frontmatter prerequisites:** `foundation-sprint-basics`

**Cross-skill usage:** invokes `sprint-note-and-vote` for differentiator selection

**Canonical references:** Character Differentiation agenda; Click Day 1 afternoon; Lenny's differentiation section

**Common pitfalls:**

- Marketing-claim differentiators the product can't deliver
- Differentiators that are not customer-perceived (internal team values)
- Principles that are generic ("simple", "fast") instead of decision-making
- Treating chart, principles, manifesto as separable artifacts

**Decider checkpoint:** Decider signs off on the bundled artifact before Day 1 ends.

---

### 5. foundation-sprint-approach-options

**Purpose:** produce Day 2 morning's output, which is one-page summaries for 3 to 7 candidate approaches that will be evaluated through Magic Lenses.

**When to use:** Day 2 morning, after Day 1 is signed off.

**When NOT to use:** when the team has only one approach in mind (force-generate alternatives or skip the sprint).

**Inputs:**

- Basics bundled artifact
- Differentiation bundled artifact
- Approach candidates (generated in-skill or pre-supplied)

**Bundled output:**

- 3 to 7 one-page approach summaries, each containing:
  - Approach name and label (color, letter, ID)
  - What it is (one sentence)
  - Why it's a good idea (rationale)
  - Simple doodle or visual description
  - How it serves the chosen differentiators

**Roles:** facilitator, PM, design lead, technical lead

**Timebox:** 60-90 min

**Frontmatter prerequisites:** `foundation-sprint-differentiation`

**Canonical references:** Character Approach agenda; Click Day 2 morning

**Common pitfalls:**

- Generating "approaches" that are actually features (an approach is a strategic path, not a feature)
- Too few options (always force at least 3)
- Approaches that don't actually serve the chosen differentiators

**Decider checkpoint:** Decider signs off on the set of approaches that advance to Magic Lenses.

---

### 6. foundation-sprint-magic-lenses

**Purpose:** produce Day 2 afternoon's bundled output, which is the lens evaluation that compares approaches across multiple perspectives and yields a top bet plus backup.

**When to use:** Day 2 afternoon, after Approach Options is signed off.

**When NOT to use:** when fewer than 2 options exist (use the option directly).

**Inputs:**

- Approach summaries (from `foundation-sprint-approach-options`)
- Optional: team-specific custom lenses

**Bundled output:**

- Classic lens charts: customer, pragmatic, growth, money
- Custom lens charts (1 to 3 team-specific)
- Pattern review: consistent winners, contradictions, biggest tradeoff
- Top bet (chosen approach)
- Backup plan (fallback if top bet fails validation)
- Decision rationale (one paragraph)

**Roles:** facilitator, Decider, PM, growth/finance expert (helpful for money lens)

**Timebox:** 90-120 min

**Frontmatter prerequisites:** `foundation-sprint-approach-options`

**Cross-skill usage:** invokes `sprint-note-and-vote` for top bet selection

**Canonical references:** Character Magic Lenses; Click Day 2 afternoon; Lenny's "Magic Lenses" section

**Common pitfalls:**

- Treating lens scoring as mathematical truth (it's a sense-making tool)
- Arbitrary precision in scoring (3.7 vs 3.8 is meaningless)
- Skipping the backup plan
- Falling in love with the top bet before testing

**Decider checkpoint:** Decider names top bet and backup explicitly.

---

### 7. foundation-sprint-founding-hypothesis

**Purpose:** produce Day 2 end's bundled output, which is the Founding Hypothesis statement plus assumption scorecard that defines what to test next.

**When to use:** Day 2 end, after Magic Lenses is signed off.

**When NOT to use:** when top bet is unclear (return to Magic Lenses).

**Inputs:**

- Basics bundled artifact
- Differentiation bundled artifact
- Top bet and backup (from `foundation-sprint-magic-lenses`)

**Bundled output:**

- Founding Hypothesis statement using the canonical template: "If we help [customer] solve [problem] with [approach], they will choose it over [alternatives] because our solution is [differentiators]"
- Assumption scorecard (table of assumptions, why they matter, current confidence, best next test)
- "Why we believe this" rationale (3 to 5 points)
- "What could prove us wrong" risks (3 to 5 points)
- Recommended next validation step (Design Sprint, customer interviews, landing page test, etc.)

**Roles:** facilitator, Decider, PM

**Timebox:** 30-45 min

**Frontmatter prerequisites:** `foundation-sprint-magic-lenses`

**Canonical references:** Character Founding Hypothesis template; Lenny's hypothesis structure; Click Founding Hypothesis

**Common pitfalls:**

- Vague customer or problem in the statement
- Non-falsifiable hypothesis ("we will succeed")
- Treating hypothesis as a strategy doc instead of a test target
- Skipping the assumption scorecard (the hypothesis is half the value; the test plan is the other half)

**Decider checkpoint:** Decider signs the hypothesis. Sprint ends.

**Hand-off:** outputs feed `sprint-foundation-to-design` (if next step is a Design Sprint) or pm-skills validation skills (if next step is non-sprint: `measure-experiment-design`, `discover-interview-synthesis`, etc.).

---

## Workflow: `foundation-sprint`

`sprint-skills/_workflows/foundation-sprint.md` chains the 7 skills with optional prep.

```text
workflow: foundation-sprint
duration: 2 days canonical, plus 1 prep day
team_size: 3 to 5 people including Decider

steps:
  prep:
    - foundation-sprint-readiness
    - foundation-sprint-brief
  day_1:
    morning:
      - foundation-sprint-basics
    afternoon:
      - foundation-sprint-differentiation
  day_2:
    morning:
      - foundation-sprint-approach-options
    afternoon:
      - foundation-sprint-magic-lenses
    end:
      - foundation-sprint-founding-hypothesis

next_workflow_options:
  - foundation-to-design                # if next step is a Design Sprint
  - pm-skills:workflow-feature-kickoff  # if hypothesis becomes a PRD
  - pm-skills:measure-experiment-design # if direct experimentation
```

The workflow document includes timeboxes, role expectations per day, and explicit handoffs to next steps.

## Library samples plan

Three fictional clients consistent with the pm-skills sample convention (Brainshelf, Storevine, Workbench, used in meeting-skills family samples):

- **Brainshelf:** consumer SaaS, B2C library management for personal book collections
- **Storevine:** B2B retail analytics, helps small retailers compete with big-box stores
- **Workbench:** developer tooling, B2D, helps backend engineers debug distributed systems

Each client gets a complete Foundation Sprint trace using all 7 skills.

- 7 skills times 3 clients = 21 samples for this track
- Each sample includes: filled TEMPLATE with realistic content, decision rationale notes, common-pitfall annotations (where the sample team almost made a mistake), cross-reference to the next sample in the same client's sprint

## Track-specific open questions

1. **Approach option count enforcement.** Character recommends 3 to 7. Should the skill enforce a minimum of 3 with a warning if 1 or 2 are supplied, or accept any count? Lean enforce minimum 3 for v0.1.
2. **Custom lens count in Magic Lenses.** 1 to 3 custom lenses recommended. Should the skill prompt for them, or accept the classic-only minimum? Lean prompt for at least 1 custom lens.
3. **Hypothesis template strictness.** Should the skill emit hypothesis text strictly in the canonical "If we help X solve Y with Z, they will choose it over A because B" template, or allow paraphrase? Lean strict for v0.1.
4. **Assumption scorecard "right size."** 5 to 7 assumptions in the scorecard feels right per Lenny's. Should the skill enforce a count or let the team decide?
5. **Shorter variants.** Whether to support a 1-day "compressed Foundation Sprint" for follow-up sessions. Defer to v0.2.
6. **AI-era guidance.** Character's AI-era framing (Foundation Sprint matters more when building is fast). Should this be a SKILL-level note or a separate guide? Lean guide.
