---
name: tool-design-sprint-prototype-plan
description: Day 4 (Thursday) move of a Design Sprint that produces the planning artifact for the day. Output covers the prototype role plan (Maker, Stitcher, Writer, Asset Collector, Interviewer), prototype brief (what to build, fidelity bar, time allocation per role), canonical Five-Act Interview script (Welcome, Context, Intro, Tasks, Debrief), trial-run checklist, and Friday participant confirmation tracker. The actual prototype build is craft work outside the skill's AI invocation surface. Use Thursday morning after Wednesday's storyboard is signed off.
license: Apache-2.0
metadata:
  classification: tool
  version: "0.1.0"
  updated: 2026-05-15
  tool: design-sprint
  move: prototype-plan
  category: discovery
  frameworks:
    - design-sprint
    - sprint
  timebox_minutes: 90
  roles:
    - facilitator
    - design
    - engineering
    - researcher
    - pm
  prerequisites:
    - tool-design-sprint-decide-and-storyboard
  inputs:
    - storyboard (from Wednesday)
    - sprint questions (from Monday)
    - founding hypothesis (optional; from a prior Foundation Sprint)
    - prototype medium choice (from the brief)
  outputs:
    - prototype role plan
    - prototype brief
    - interview script (Five-Act)
    - trial-run checklist
    - participant confirmation tracker
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Design Sprint Prototype Plan (Thursday morning)

Thursday is the prototype build day. This skill produces the morning planning artifact that makes the build run; it does NOT build the prototype itself. The skill assigns roles, locks the fidelity bar, drafts the Five-Act interview script, defines the trial-run gate, and confirms Friday participants. The actual building (Figma frames, slideware decks, role-play scripts, paper assemblies) is craft work the team owns through the rest of Thursday.

Family contract: [`docs/reference/skill-families/design-sprint-skills-contract.md`](../../docs/reference/skill-families/design-sprint-skills-contract.md). This skill is a member of `design-sprint-skills`.

## When to Use

- It is Thursday morning of the Design Sprint and Wednesday's storyboard is signed off.
- The Friday participant tracker needs a Thursday-morning confirmation check; cancellations now trigger buffer activation.
- The interview script needs to be drafted (or refined from a prior sprint's template) before the interviewer can mock-run it Thursday afternoon.
- The team needs role assignments before parallel build work begins; ad-hoc assignment Thursday afternoon wastes 1-2 hours.

## When NOT to Use

- Wednesday is not closed. Return to `tool-design-sprint-decide-and-storyboard`; without a locked storyboard, the prototype has no spec.
- The team is trying to use this skill to build the prototype. The prototype is craft work (per Ratified Decision 1 in the DS integration plan). This skill plans Thursday; the build happens in Figma, Keynote, paper, or whatever the medium is.
- The team has decided to skip Friday's trial run. Trial run is the gate that catches "prototype is unreachable" or "interview script confuses customer" before live interviews start. Skipping it converts Friday into a debugging session.
- Friday participant cancellations have triggered cohort-shrinks-to-fewer-than-4. Pause the sprint and decide whether to postpone Friday or accept a reduced-evidence test.

## What This Skill Produces

A single bundled artifact with five sections:

1. **Prototype role plan**: assigns 5 canonical roles (Maker, Stitcher, Writer, Asset Collector, Interviewer) across the team. Roles can double up on small teams; cannot triple up except for Asset Collector.
2. **Prototype brief**: one-page spec covering what to build (storyboard panels in scope), fidelity bar (what "real enough" means for the medium), time allocation per role, and what's explicitly NOT being built.
3. **Interview script (Five-Act)**: canonical Five-Act structure (Welcome, Context, Intro, Tasks, Debrief) with team-supplied task wording derived from the storyboard. The act sequence is fixed; only Tasks is heavily customized.
4. **Trial-run checklist**: the gates the prototype must pass Thursday afternoon (canonically 16:00-17:00) before Friday begins. Each gate is a yes/no item the interviewer or Maker confirms.
5. **Participant confirmation tracker**: Thursday morning re-confirmation of all 5 Friday slots; cancellations trigger buffer-slot activation; failures cascade to a cohort-decision moment.

See `references/TEMPLATE.md` for the canonical structure and `references/EXAMPLE.md` for the Brainshelf book-catalog Thursday morning artifact.

## Five Canonical Roles

Sprint book Chapter 16 defines these 5 roles. The skill assigns them; the humans fill them.

| Role | What they do | Typical owner |
|---|---|---|
| Maker | Builds the prototype surface (Figma frames, Keynote slides, role-play props). Owns visual and interaction work. | Design lead |
| Stitcher | Connects the Maker's surfaces into a coherent end-to-end flow (Figma interactions, Keynote transitions, role-play sequence). | Design lead OR engineering lead |
| Writer | Writes prototype copy (button labels, body text, error states, microcopy). Critical for credibility; bad copy breaks trust. | PM OR researcher |
| Asset Collector | Sources images, icons, sample data (book covers, names, dates, fake-but-believable data). | Anyone with free hands; often whoever isn't on the critical path. |
| Interviewer | Runs Friday's interviews. Spends Thursday afternoon drafting and mock-running the Five-Act script. | Researcher OR PM with interview experience. |

On a 4-person team, Maker and Stitcher typically merge (one design owner); Writer and Asset Collector can merge; Interviewer is always a dedicated role.

## Five-Act Interview Structure

Canonical structure from Sprint book Chapter 17. The act sequence is fixed; the Tasks act is heavily customized; the other acts are mostly canonical wording.

| Act | Time | Purpose | Canonicality |
|---|---|---|---|
| Welcome | 5 min | Friendly intro; consent confirmation; explain not testing the customer | Canonical wording with team-name swap |
| Context | 5-10 min | Learn the customer's current behavior and context related to the challenge | Canonical questions; team adapts to challenge |
| Intro | 5 min | Introduce the prototype; explain it's a prototype (some things won't work) and ask the customer to think aloud | Canonical wording |
| Tasks | 20-30 min | Customer attempts the storyboard tasks; interviewer observes and probes; team observes silently from breakout room | Team-supplied wording derived from storyboard |
| Debrief | 5-10 min | Open-ended reactions; pricing questions if relevant; thank-you | Canonical structure; team adapts pricing question |

## Common Pitfalls

- **Treating the prototype as a deliverable instead of a learning tool.** The prototype dies Friday at 17:00 PT regardless of how Friday goes. Investing engineering time in polishing it past the fidelity bar wastes Thursday.
- **Polishing instead of building enough realism.** Fidelity bar question: "Will a customer believe this is real for the 30-minute interview?" If yes, the prototype is done. Polishing past that point steals time from trial run and recovery.
- **Interview script with leading questions.** "Did you find the camera flow easy?" leads; "Walk me through what you just did" doesn't. Writer (or Interviewer) reviews script for leading questions before trial run.
- **Skipping trial run.** Trial run catches dead Figma links, missing assets, confusing copy, and interviewer-script-too-long failures. Always run with a fake customer (a teammate playing a target-profile customer) Thursday afternoon.
- **Asset Collector role left unassigned because "it's not important."** Asset Collector is the role that prevents "lorem ipsum on the demo screen" and "stock photo of a person who clearly isn't the target customer." Always assign.
- **Five-Act Tasks act over-scripted.** Tasks should be open-ended ("Try to capture this book and find it later in your library"); over-scripted tasks become a tutorial, not a test.
- **Cancellations Thursday morning not surfaced because "we'll figure it out."** Thursday morning is the last clean window to activate buffer participants. By Thursday afternoon, recruiter has lower confidence in confirmation.

## Cross-Skill Usage

Prerequisites: `tool-design-sprint-decide-and-storyboard`. Prototype-plan consumes Wednesday's storyboard as the build spec. Without a storyboard, this skill has no panels to map roles against.

This skill does NOT invoke `tool-note-and-vote`. Thursday morning planning has no voting moment; the role plan and script decisions are Facilitator-led with Decider sign-off.

Next invocation in the sprint: `tool-design-sprint-test-and-score` Friday morning.

## Canonical Sources

- Knapp, J., Zeratsky, J., and Kowitz, B. *Sprint*. Simon and Schuster, 2016. Thursday chapter (Chapters 14-16) and Five-Act Interview (Chapter 17).
- GV Design Sprint Guide. "Sprint Week Thursday." https://www.gv.com/sprint/
- Character Capital. "Design Sprint Day 4." https://www.character.vc
- Google Design Sprint Kit. "Thursday agenda template + Five-Act Interview script template." https://designsprintkit.withgoogle.com/

## Decider Checkpoint

This skill ends with a Decider Checkpoint in `references/TEMPLATE.md`. The Decider approves the role plan, the fidelity bar in the prototype brief, the interview script's Tasks act, and the trial-run gate criteria. Once signed, the team disperses into parallel build work; the Decider returns Friday PM for the post-interview Decider review.
