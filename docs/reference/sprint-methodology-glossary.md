---
title: Sprint Methodology Glossary
description: "Cross-method glossary of terminology used in the Foundation Sprint and Design Sprint workshop methodologies (Knapp, Zeratsky, Kowitz). Covers terms specific to each methodology plus shared primitives (Decider, Note-and-Vote, etc.). Does NOT cover agile / Scrum sprint terminology - see disambiguation note at top."
---

## Scope and disambiguation

This glossary covers terms used in the **Foundation Sprint** and **Design Sprint** workshop methodologies developed by Jake Knapp, John Zeratsky, and Braden Kowitz. It does NOT cover agile / Scrum sprint terminology - those are a different methodology entirely (see [Workshop Sprints vs Agile Sprints](../concepts/workshop-sprints-vs-agile-sprints.md) for the disambiguation, and [`_workflows/sprint-planning.md`](../../_workflows/sprint-planning.md) for pm-skills' agile sprint planning content).

Entries are organized into three sections: **Foundation Sprint specific**, **Design Sprint specific**, and **Shared primitives** (used in both). Within each section, terms are alphabetical.

## Foundation Sprint specific terms

**Approach options.** The Day 2 morning move of a Foundation Sprint that generates 3-7 candidate approaches as one-page summaries before the team converges on a top bet. Anti-anchoring discipline; teams that skip approach options often anchor on the first idea anyone proposes. Owner: `tool-foundation-sprint-approach-options` skill.

**Basics.** The Day 1 morning move of a Foundation Sprint that forces explicit team choices on four foundational dimensions: target customer, important problem, team advantage, and competitors/alternatives. Output is one coherent strategic frame, not four separable decisions. Owner: `tool-foundation-sprint-basics` skill.

**Click book.** The 2024 Simon and Schuster book by Knapp and Zeratsky titled ***Click: How to Make What People Want***. Book-length canonical source for the Foundation Sprint methodology. [theclickbook.com](https://www.theclickbook.com/).

**Decision principles.** A Day 1 afternoon Foundation Sprint output: 3-5 statements describing the team's stance on contested decisions ("we prioritize X over Y"). Authored during the Differentiation step. Serve as guardrails for downstream Magic Lenses voting and prototype-or-build decisions.

**Differentiation.** The Day 1 afternoon move of a Foundation Sprint that converts the morning Basics frame into a defensible strategic position through scored differentiator candidates, a 2x2 chart with competitors plotted, decision principles, and a one-page Mini Manifesto. Owner: `tool-foundation-sprint-differentiation` skill.

**Founding Hypothesis.** The Day 2 end capstone artifact of a Foundation Sprint: a single canonical sentence following the strict template "If we help [target customer] solve [important problem] with [top bet approach], they will choose it over [competitors/alternatives] because [differentiators]." The Founding Hypothesis plus assumption scorecard plus recommended next test are what the entire 2-day workshop exists to produce. Owner: `tool-foundation-sprint-founding-hypothesis` skill.

**Magic Lenses.** The Day 2 afternoon move of a Foundation Sprint that evaluates the approach options through 4 canonical lenses (customer, pragmatic, growth, money) plus at least 1 custom lens. Each lens scores all candidate approaches on its dimension; pattern analysis surfaces the top bet and backup. Owner: `tool-foundation-sprint-magic-lenses` skill.

**Mini Manifesto.** A one-page Day 1 afternoon Foundation Sprint output that captures the team's defensible strategic position in 4-6 sentences. Serves as a sanity-check artifact in downstream Design Sprint Day 1 Map and Target.

**Top bet / backup.** The Day 2 afternoon Foundation Sprint output: the Decider's supervoted single approach (top bet) plus a strategically-distinct alternative (backup plan) that activates if the top bet invalidates in downstream testing.

## Design Sprint specific terms

**Art museum layout.** The Wednesday morning Design Sprint mechanic where Tuesday's solution sketches are arrayed anonymously (typically on a wall or shared Figma board) so the team can view all sketches as if visiting a small art museum. Precedes the heat map. Sketcher attribution must be stripped before this layout to honor the blind-vote requirement.

**Blast radius.** Visual representation of the spread or impact of an incident, change, or problem across services or systems. Often appears in Workbench-thread Design Sprint sketches (SRE incident-response context). Not a canonical Sprint book term but common in practitioner sketching.

**Blind vote / blind heat map.** A voting mechanic where sketches are anonymized (sketcher names removed) before the team votes. Discipline that prevents votes from converging on the loudest voice or most-senior sketcher. Required by the Design Sprint family contract.

**Crazy 8s.** The third step of the Tuesday four-step sketch protocol: 8 minutes to produce 8 small sketch variations of the strongest idea from the Ideas step. Time-boxed discipline that forces divergent thinking before convergent commitment to a Solution Sketch.

**Decider supervote.** The Wednesday morning Design Sprint moment where the Decider places their 3 supervote dots on the sketch (or sketches, if rumble) that will be storyboarded. The supervote is the Decider's call; the prior straw poll is input, not result. Distinct from Foundation Sprint magic-lenses supervote in that DS supervote selects a design direction, while FS supervote selects a strategic approach.

**Decide-and-storyboard.** The Wednesday move of a Design Sprint that runs the art museum layout, heat map, speed critique, straw poll, Decider supervote, rumble-vs-all-in-one decision, and the 5-15 panel storyboard. Most decision-heavy day of the Sprint week. Owner: `tool-design-sprint-decide-and-storyboard` skill.

**Five-Act Interview.** The canonical Sprint book interview script structure used on Friday: Welcome (5 min) - Context (5-10 min) - Intro (5 min) - Tasks (20-30 min) - Debrief (5-10 min). The Tasks act is team-supplied wording derived from the storyboard; the other 4 acts have mostly canonical wording.

**Four-step sketch protocol.** The Tuesday Design Sprint structure for each team member's individual sketching work: Notes (20 min reviewing Monday output) plus Ideas (20 min rough doodles) plus Crazy 8s (8 minutes plus 8 variations) plus Solution Sketch (30-90 min final 3-panel storyboard-style sketch). Always silent and independent.

**GV.** Google Ventures (now just GV). The Knapp/Zeratsky/Kowitz original employer where the Design Sprint methodology was developed before Knapp and Zeratsky left to found Character Capital. The GV Design Sprint Guide at [gv.com/sprint](https://www.gv.com/sprint/) is the original canonical public reference.

**Heat map.** The Wednesday morning Design Sprint mechanic where each team member silently places small dot stickers (typically 3 per voter) on the most-compelling parts of the anonymous sketches. Surfaces hot spots before critique without the team having to speak. Often invoked via `tool-note-and-vote`.

**HMW (How Might We).** A Monday Design Sprint reframing pattern: each problem statement ("the form has too many fields") is rewritten as an opportunity question ("how might we shorten the form?"). HMW notes are clustered into themes and heat-mapped to surface the most-actionable opportunities. Originally from IDEO.

**Lightning demos.** The Tuesday Design Sprint morning mechanic where each team member presents 3 demos (3 min each) of useful solutions from inside or outside the company. The Facilitator extracts the reusable pattern from each demo into a one-line note. Inputs the Tuesday sketch step.

**Map and Target.** The Monday move of a Design Sprint that produces the long-term goal, refined sprint questions, customer-or-system map, expert interview notes, HMW cluster board, and the Decider's target moment selection. Owner: `tool-design-sprint-map-and-target` skill.

**Note-and-Vote.** See Shared primitives section.

**Prototype plan.** The Thursday morning Design Sprint move that produces the 5 canonical Sprint book roles (Maker, Stitcher, Writer, Asset Collector, Interviewer), prototype brief, Five-Act interview script, trial-run checklist, and Friday participant tracker. The actual prototype BUILD is craft work outside the skill's invocation surface. Owner: `tool-design-sprint-prototype-plan` skill.

**Rumble.** A Wednesday Design Sprint Decider option: build TWO prototypes from two different supervoted sketches as competing Friday tests (vs. the default "all-in-one" build of a single supervoted sketch). v0.1 supports the rumble decision and storyboard but warns that dual-prototype Thursday execution is hard for 4-person teams.

**Solution sketch.** The fourth step of the Tuesday four-step sketch protocol: a 3-panel storyboard-style final sketch produced by each team member in 30-90 minutes of silent independent work. Must be understandable Wednesday morning WITHOUT the sketcher explaining it.

**Speed critique.** The Wednesday Design Sprint mechanic where each anonymous sketch gets 3 minutes of structured walkthrough by the Facilitator (or rotated team member). The sketcher is silent during their own sketch's critique. Concerns surface as "what would worry me" notes that inform the storyboard.

**Sprint book.** The 2016 Simon and Schuster book by Knapp, Zeratsky, and Kowitz titled ***Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days***. Book-length canonical source for the Design Sprint methodology. [thesprintbook.com](https://www.thesprintbook.com/).

**Sprint questions.** The Monday Design Sprint output: 3-7 questions converting team fears into testable risks. Phrased as "Can we... ?" / "Will... ?" / "How... ?"; not phrased as solutions. The lead question (Q1) is typically the highest-risk assumption from a prior Foundation Sprint's scorecard.

**Sprint-worthy.** A Design Sprint readiness criterion (canonical to Sprint book Chapter 2): the challenge is specific enough to prototype in 4 days AND big enough that a wrong direction would be costly. Not all worthwhile challenges are sprint-worthy; small UX tweaks and pure-discovery questions both fail this criterion.

**Storyboard.** The Wednesday Design Sprint capstone artifact: a 5-15 panel chronological sequence showing what the customer sees + what the customer does + system response + notes for builders for each panel. Drives Thursday's prototype build. Must be specific enough that Thursday's builders can begin without re-debating design.

**Straw poll.** The Wednesday Design Sprint mechanic where each team member silently places 1 large dot on their personal favorite sketch. Non-binding; informs the Decider's supervote. Different from FS magic-lenses voting in that straw poll is one-shot, not lens-by-lens.

**Sub-3-second capture.** A Brainshelf-specific Founding Hypothesis criterion (not a Sprint book canonical term). Appears repeatedly in Brainshelf Design Sprint samples as the threshold for "would customers adopt the camera-first flow?" Illustrates the practice of pulling a specific testable threshold from the Founding Hypothesis assumption scorecard into the Design Sprint as a measurable sprint question.

**Supervote.** See Decider supervote.

**Target moment.** The Monday Design Sprint Decider output: the single point on the customer-or-system map that Tuesday's sketches and Wednesday's storyboard will design against. Without a Decider-selected target moment, Tuesday's sketches diverge with no shared direction.

**Test and score.** The Friday Design Sprint sprint-closing move that runs 5 customer interviews using the Five-Act script, captures observations, builds the scorecard grid, surfaces patterns, collects hot takes, and frames the Decider's build / iterate / pivot / stop call. Owner: `tool-design-sprint-test-and-score` skill.

**Trial run.** The Thursday late-afternoon Design Sprint gate where a teammate plays a target-profile customer through the just-built prototype to catch dead Figma links, missing assets, confusing copy, and interviewer-script-too-long failures BEFORE Friday's actual interviews. Failure of trial run by 19:00 PT triggers Friday postponement.

## Shared primitives (used in both Foundation Sprint and Design Sprint)

**Adversarial review.** A pre-release review pattern (not Sprint book canonical) where the team invokes an independent reviewer (often a second LLM via `codex:rescue`) to catch issues the authoring team is structurally bad at seeing in their own work. Used during both Foundation Sprint and Design Sprint family Phase 2 closures in pm-skills v2.15.0.

**Brainshelf / Storevine / Workbench.** The three canonical narrative threads pm-skills uses for library samples across both Foundation Sprint and Design Sprint families. Brainshelf is B2C book-tracking (pre-seed, 4-person founding team); Storevine is B2B specialty-retail managed-intelligence (post-pilot, 4-person team); Workbench is SRE incident-response observability (post-pilot, 4-person team). Each thread tells a coherent end-to-end FS-to-DS arc.

**Cameo expert.** A subject-matter expert invited to a single sprint moment (typically 15-30 minutes) rather than attending the whole sprint. Used in Design Sprint Monday for Map and Target context, and occasionally in Foundation Sprint Day 1 Basics.

**Character Capital.** The early-stage investment firm Jake Knapp and John Zeratsky founded after leaving GV. Character publishes the current authoritative guides for both Foundation Sprint and Design Sprint at [character.vc/guide/foundation-sprint](https://www.character.vc/guide/foundation-sprint) and [character.vc/guide/design-sprint](https://www.character.vc/guide/design-sprint). Also publishes the canonical Note-and-Vote guide.

**Decider.** The single person with strategic authority during a Foundation Sprint or Design Sprint. The Decider makes the strategic calls the team would otherwise spend hours debating (Foundation Sprint: top bet supervote, Founding Hypothesis ratification; Design Sprint: target moment selection, supervote, build/iterate/pivot/stop call). The single most common cause of failed sprints in either methodology is "no Decider, or Decider-by-committee." Different from a Product Owner in Scrum: the Decider's authority is bounded to the sprint week itself.

**Decider Checkpoint.** The mandatory end-of-skill sign-off section in every Foundation Sprint or Design Sprint TEMPLATE.md (family-contract enforced). Captures the Decider's explicit acceptance of the skill's output before the next skill in the chain begins. Without sign-off, the output is advisory; with sign-off, it is the commitment that triggers the next move.

**Family contract.** A canonical-source document at `docs/reference/skill-families/{family-name}-contract.md` that governs shared behavior across the skills in a family. Both `foundation-sprint-skills` and `design-sprint-skills` have CI-enforced family contracts. Specifies frontmatter shape, naming convention, file anatomy, Decider Checkpoint requirement, library sample requirements, and CI enforcement rules.

**Family validator.** A pair of Bash + PowerShell scripts (`scripts/validate-{family}-skills-family.{sh,ps1}`) that enforce the family contract on every PR. Both Foundation Sprint and Design Sprint families have validators; both support `--strict` / `-Strict` mode that fails on partial family state for release-time enforcement.

**Facilitator.** The neutral participant who runs the sprint week (Foundation Sprint or Design Sprint). Owns timeboxes, enforces silent-work discipline (especially Tuesday sketches), runs note-and-vote moments, and surfaces patterns. Can be the same person as the Decider in small teams but ideally separate roles.

**Foundation-to-Design handoff.** The narrative-only conversation between Foundation Sprint Day 2 close and Design Sprint readiness invocation. Not a SKILL.md; canonical Knapp/Zeratsky methodology has no formal handoff move so pm-skills does not invent one. Documented at [`_workflows/foundation-to-design.md`](../../_workflows/foundation-to-design.md): 5-step conversation structure, 12-row slot-mapping table, 3-question go/no-go checkpoint.

**Note-and-Vote.** The canonical Knapp/Zeratsky/Kowitz group-decision mechanic used at decision moments throughout both sprints. 5-step structure: silent ideation (note) - present (each person shares) - silent vote (heat map dots) - brief discussion - Decider supervote. Available as the standalone `tool-note-and-vote` skill in pm-skills. The single most-reused primitive across both sprint methodologies.

**Sprint week.** A unit of facilitated workshop time in either methodology. For Foundation Sprint, "sprint week" is two consecutive workshop days (sometimes called "the 2-day sprint"). For Design Sprint, "sprint week" is 5 consecutive workshop days. Note: this is intentionally NOT the agile / Scrum sprint meaning of "sprint week"; see disambiguation note at top.

**Thread.** A library-sample narrative arc following one consistent customer/team context across all skills in a family. Both FS and DS families ship samples in three threads (Brainshelf, Storevine, Workbench) so a reader can follow one customer's journey end-to-end. Family contract specifies thread requirements with version-tiered coverage (Brainshelf REQUIRED at v0.1.0; all three threads REQUIRED at v1.0.0).

**Tool classification.** The pm-skills `classification: tool` value (added in v2.15.0) for skills implementing named external methodologies composed of multiple skills working as a system. Foundation Sprint family, Design Sprint family, and `tool-note-and-vote` are the first inhabitants. Distinct from `phase`, `foundation`, and `utility` classifications.

## Related pm-skills resources

- [Workshop Sprints vs Agile Sprints](../concepts/workshop-sprints-vs-agile-sprints.md) - disambiguation reference
- [Workshop Method Comparison Matrix](workshop-method-comparison.md) - when-to-use comparison across methodologies
- [Foundation Sprint concept doc](../concepts/foundation-sprint.md) - FS methodology in depth
- [Design Sprint concept doc](../concepts/design-sprint.md) - DS methodology in depth
- [Foundation Sprint skills contract](skill-families/foundation-sprint-skills-contract.md)
- [Design Sprint skills contract](skill-families/design-sprint-skills-contract.md)

## Canonical sources

- Knapp, J.; Zeratsky, J. ***Click: How to Make What People Want***. Simon and Schuster (2024). Foundation Sprint book-length canon.
- Knapp, J.; Zeratsky, J.; Kowitz, B. ***Sprint: How to Solve Big Problems and Test New Ideas in Just Five Days***. Simon and Schuster (2016). Design Sprint book-length canon.
- Character Capital. **Foundation Sprint guide.** [character.vc/guide/foundation-sprint](https://www.character.vc/guide/foundation-sprint).
- Character Capital. **Design Sprint guide.** [character.vc/guide/design-sprint](https://www.character.vc/guide/design-sprint).
- Character Capital. **Note and Vote guide.** [character.vc/guide/note-and-vote](https://www.character.vc/guide/note-and-vote).
- GV. **The Design Sprint.** [gv.com/sprint](https://www.gv.com/sprint/). Original public Design Sprint reference.
- Google. **Design Sprint Kit.** [designsprintkit.withgoogle.com](https://designsprintkit.withgoogle.com/). Methodology overview, templates, community resources.

---

*Part of [PM-Skills](https://github.com/product-on-purpose/pm-skills) - Open source Product Management skills for AI agents.*
