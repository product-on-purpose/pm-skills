---
title: Design Sprint FAQ
description: "Common questions about running a Design Sprint with pm-skills: when to use, who attends, comparison to agile sprints + Foundation Sprint + smaller experiments, recovery from common failures, and how the pm-skills AI-era implementation differs from canonical Knapp/Zeratsky/Kowitz."
---

> **Design Sprint is NOT an agile / Scrum sprint.** Design Sprint is a 5-day prototype-and-test workshop methodology from Knapp, Zeratsky, and Kowitz (Sprint book, 2016). For the cross-method disambiguation, see [Workshop Sprints vs Agile Sprints](../concepts/workshop-sprints-vs-agile-sprints.md).

This FAQ addresses common questions about running a Design Sprint using the pm-skills `tool-design-sprint-*` family. For the operational walkthrough, see [Using the Design Sprint Tools](using-design-sprint.md). For the conceptual deep-dive, see [the Design Sprint concept doc](../concepts/design-sprint.md). For terminology, see the [Sprint Methodology Glossary](../reference/sprint-methodology-glossary.md).

## When to use a Design Sprint

### Q: When should we run a Design Sprint?

When you have a specific risky assumption that needs validation before committing to a build cycle, AND you can recruit 5 target customers for Friday testing. The single most useful signal: you can name "the question we'd answer on Friday" in one sentence, and that question can be answered through a customer's interaction with a 1-day prototype.

Common scenarios: testing a Founding Hypothesis from a prior Foundation Sprint; validating a redesigned key flow before committing 6 weeks of build; resolving stakeholder disagreement about a customer-facing decision; pre-empting build-then-rebuild cycles when the team has multiple plausible approaches.

### Q: When should we NOT run a Design Sprint?

- No clear challenge. Run problem framing or Foundation Sprint first.
- Challenge too broad to fit one week. "Redesign onboarding" is too broad; "design and test the first-time signup for B2B trial customers" is sprint-sized.
- No Decider available for load-bearing moments (Mon AM, Wed AM, Fri PM). Without strategic authority, Wednesday's supervote becomes a popularity contest.
- No customer access for Friday and no realistic recruiting plan. A Design Sprint that can't test on Friday is just a 4-day workshop with no learning event.
- Leadership has already decided what to build. The Friday scorecard cannot change the decision; running the sprint is theater.
- Low-stakes tweaks where 5 days plus customer cost would be disproportionate. Use [`measure-experiment-design`](../../skills/measure-experiment-design/SKILL.md) for a smaller cycle.

The `tool-design-sprint-readiness` skill formalizes these into 8 canonical readiness checks and returns Go / Conditional Go / Wait. Run it 1-2 weeks before the proposed sprint Monday.

### Q: How is Design Sprint different from Foundation Sprint?

Different purpose, different output, different attendees, different timing.

| Dimension | Foundation Sprint | Design Sprint |
|---|---|---|
| Duration | 2 days | 5 days |
| Output | Founding Hypothesis sentence + assumption scorecard | Friday scorecard + Decider's build/iterate/pivot/stop call |
| Customer access | Not required | 5 target customers Friday |
| Prototype | No | Yes (one-day Thursday build) |
| Team size | 3-5 | 4-7 |

Foundation Sprint chooses WHICH risky bet is worth testing. Design Sprint TESTS a chosen bet. Many teams run both back-to-back (1-2 week gap for recruiting); see [`_workflows/foundation-to-design.md`](../../_workflows/foundation-to-design.md).

### Q: How is Design Sprint different from a smaller experiment (fake-door, A/B test)?

Design Sprint produces qualitative depth from 5 customer interviews; experiments produce quantitative breadth from N customers in production. Different methods for different questions.

Use Design Sprint when:
- The assumption is about customer comprehension, motivation, or workflow.
- The prototype can be built in 1 day.
- You need direct conversation with target customers to understand WHY.

Use [`measure-experiment-design`](../../skills/measure-experiment-design/SKILL.md) when:
- The assumption is testable via "will users click X?".
- You have production traffic to A/B test against.
- You need statistical confidence, not interpretive depth.

The pm-skills convention: Friday Decider call of "iterate" usually leads to a smaller experiment (via `measure-experiment-design`) rather than another full Design Sprint.

## Attendees and roles

### Q: Who must attend a Design Sprint?

- **Decider** (load-bearing moments at minimum: Mon AM + Wed AM + Fri PM; ideally all 5 days): the person with strategic authority who makes target-moment selection, supervote, and Friday build/iterate/pivot/stop call.
- **Facilitator** (all 5 days): runs timeboxes, enforces silent independent sketching Tuesday, owns voting moments.
- **Design lead** (all 5 days; Tue + Thu critical): sketches Tuesday, co-builds Thursday prototype.
- **Engineering lead** (all 5 days; Thu critical): co-builds Thursday prototype; feasibility-checks sketches.
- **PM or Researcher** (all 5 days; Friday critical): interview moderation Friday.
- **Customer expert or domain SME** (Mon + Fri at minimum): contributes customer context Monday; observes Friday.

Total: 4-7 people. Smaller fails ("missing perspective on critical days"); larger fails ("decision-making slows").

### Q: What if my Decider can't attend all 5 days?

Acceptable if the Decider attends the three load-bearing windows: Monday morning (target-moment selection), Wednesday morning (heat map + supervote), Friday afternoon (Decider review by 17:30). Other days can be observer-only or even absent if Friday's call window is committed.

Unacceptable: Decider attends only Monday or only Friday. Without Wednesday's supervote, the team's storyboard converges by consensus (not by the Decider's call) and Thursday builds an unbought-in prototype. Without Friday's review, the sprint produces observations without a call.

### Q: Why does the Friday cohort need to be exactly 5 customers?

This comes from Jakob Nielsen's 2000 research on usability test power curves: 5 participants identify ~85% of usability problems in a given test; additional participants produce diminishing returns. Sprint book Chapter 17 canonicalizes 5 as the optimal cohort size.

In practice:
- 5 is the canonical recommended cohort.
- 4 is acceptable if 1 cancellation cannot be replaced; the day-end decision rule degrades from 4-of-5 to 3-of-4.
- 3 or fewer is too noisy; signal vs noise becomes hard to distinguish.
- 6-7 increases coverage marginally but adds significant synthesis overhead.
- 8+ is rarely worth the cost.

If you have multiple distinct personas (B2B with both buyer and end-user personas), 5 per persona is the convention - so you'd run 10 customers total, not 5. See Nielsen's 2012 follow-up at [nngroup.com/articles/how-many-test-users](https://www.nngroup.com/articles/how-many-test-users/).

### Q: What's the difference between a Decider and a Product Owner (Scrum)?

Different roles, different methodologies, different time horizons.

A Product Owner owns backlog prioritization continuously across agile sprints; their authority is on what gets built and in what order over months and quarters. A Decider's authority is bounded to a single Design Sprint week and is about WHICH design direction gets tested. The PO is permanent; the Decider role activates per sprint.

The same person can be both, especially in early-stage startups. In larger orgs, the Decider is often the executive sponsor or initiative owner; the PO is more delivery-focused.

## Process questions

### Q: What if the prototype build slips past Thursday 17:00 PT?

The trial run is the gate. If the prototype can't pass trial run by 17:00 PT, Thursday evening (17:00-19:00) is recovery time. If recovery fails by 19:00, Friday postpones.

Common slip causes and recoveries:
- **Asset Collector role unstaffed** → 1-hour fix; pull in any team member to source the missing assets.
- **Inter-frame interaction logic complex** → cut scope to fewer panels; keep core interaction working.
- **Copy not finalized** → ship with "good enough" copy; flag for post-sprint iteration if Build is the call.
- **OCR / API integration faking too hard** → rebuild as paper/wizard-of-oz; lose some realism but save Friday.

If Friday postpones, recruiting must be re-confirmed (most customers can accept a 3-7 day shift but not longer); typically push the sprint to the following week.

### Q: What if 2+ Friday customers cancel?

5 confirmed slots with 1 buffer (6 total) is the canonical pattern. If 1 cancels, buffer absorbs. If 2 cancel, the cohort drops to 4-of-5 which is the lower-end of acceptable; scorecard rules degrade as documented in `tool-design-sprint-test-and-score` SKILL.md. If 3+ cancel, postpone Friday rather than run with insufficient signal.

Recruiting buffer pattern: recruit 6, schedule 5 + 1 in the slot you'd use only if a no-show occurs (canonically 17:00 PT). Riley (or whoever owns recruiting) activates the buffer slot during the day as needed.

### Q: What if Wednesday's supervote is a tie?

The supervote is the Decider's call; ties don't happen in a single-Decider model. If the Decider genuinely cannot pick one over two options, that's a signal to use **rumble** (storyboard 2 sketches and build 2 prototypes Thursday). Rumble doubles Thursday build complexity; only viable if the team is 5+ people with 2 capable Makers + 2 Stitchers.

If the Decider hedges to avoid making a call, the Facilitator should intervene: name the hedge explicitly, and ask the Decider to commit by end of day or accept that the sprint cannot proceed Thursday. Most "ties" resolve in 10 minutes once the Decider is asked to commit.

### Q: How do we keep group brainstorming from contaminating Tuesday sketches?

Sprint method explicitly forbids group brainstorming Tuesday because it produces sketches that converge on the loudest voice. The Facilitator's job is enforcement:
- Physically separate sketchers if possible.
- No talking during the Notes + Ideas + Crazy 8s + Solution Sketch steps.
- No looking at others' sketches until end of day.
- If someone breaks silence, the Facilitator intervenes immediately.

If silent independent sketching is genuinely impossible (team won't commit to the discipline), Design Sprint is probably the wrong methodology for the team. Consider a facilitated brainstorm + storyboard workshop instead.

## Variants and adaptations

### Q: Can we run a 4-day Design Sprint?

Yes; the canonical Sprint book mentions this as the "compressed" variant. Compress Tuesday (sketch) or Thursday (build) to half-day. Tuesday compression works when the team has sprint experience; Thursday compression requires a smaller-scope prototype. 5 days is the default; 4 days is for experienced teams with tight calendars.

### Q: Can we run a Design Sprint fully remote?

Yes. Use Zoom + Miro + Figma. The remote pattern is documented in [AJ&Smart's Remote Design Sprint template](https://www.ajsmart.com/remote-design-sprint-template) and adapted in pm-skills. Three considerations:

- **Sketch + storyboard steps** need explicit screen-share discipline (Tuesday) and shared-Figma collaboration (Wednesday).
- **Friday observer-room** uses Zoom breakout room; observers note-take in a shared Miro board in real time.
- **Decider Checkpoint** is verbal commitment in shared video; capture in the artifact text.

Slightly slower than in-person but viable. Common in distributed companies and post-2020 organizations.

### Q: Hardware / service / regulated industries - any adaptations?

- **Hardware**: replace clickable Figma with physical mock; Friday testing requires the mock in-person (rarely remote).
- **Service / role-play**: prototype is a service script with team members acting roles; Friday testing is a guided service experience.
- **Regulated (healthcare, finance)**: add compliance / regulatory lens to Wednesday critique; expect Decider to have explicit authority for the regulatory dimension.

The canonical [Character Capital Design Sprint guide](https://www.character.vc/guide/design-sprint) and [Service Design Network](https://www.service-design-network.org/) cover variants in more depth.

## Recovery from common failures

### Q: What if Monday ends without a clear target moment?

Most common cause: the customer or system map is too broad. Re-do Monday afternoon with a sharper target framing: pick a specific moment within the existing map rather than re-mapping. The Decider can also force a target selection by end of day even if the team disagrees; better to test the "wrong" target moment than to lose Tuesday.

### Q: What if Friday scorecard is inconclusive (3-of-5 partial, 0 N, 0 Y)?

Inconclusive scorecard signals the prototype was testing the wrong question or the question was poorly framed. The Decider call is typically "iterate" (refine the prototype + re-sprint with sharper sprint questions) rather than "build" or "pivot". If 2+ sprints produce inconclusive scorecards on similar questions, that's a signal the question needs to be reframed at the Foundation Sprint level.

### Q: What if Friday signals "build" but the team has reservations?

This is the failure-mode-of-success: scorecard says go but team intuition resists. Force the conversation: have each team member's hot take address the reservation explicitly. If the reservation surfaces evidence the scorecard missed (e.g., "all 5 customers said 'yes' but body language said 'no'"), Decider call becomes "iterate" not "build". If the reservation is just team anxiety without evidence, the Decider holds the build call.

### Q: What if the prototype is so successful Friday that customers ask to keep using it?

Happy problem. Two paths:

1. **Concierge MVP path**: convert the Figma prototype into a manual-back-end service for the 5 Friday customers as a real product test. Useful when you want production-realism signal before committing to engineering build.
2. **Build path**: thank customers, deliver the v0.1 build in 6-8 weeks, follow up. The signal is valuable but the build cycle is the right path.

## pm-skills implementation

### Q: How does the pm-skills implementation differ from Knapp/Zeratsky/Kowitz's canonical Design Sprint?

pm-skills implements the canonical 5-day method as 7 AI-invocable skills (one per canonical move) plus an explicit Foundation-to-Design narrative handoff. The differences:

- **AI is a first-class participant** for drafting the sprint questions, scoring approach options, drafting the Five-Act script, synthesizing Friday observations, and drafting the Decider summary. The Decider still decides; the team still sketches and builds; the AI prepares.
- **Decider Checkpoint is family-contract-enforced** at the end of every TEMPLATE.md. Without sign-off, the day's output is advisory; with sign-off, it triggers the next day's move.
- **The Thursday prototype build is craft work outside the AI surface** (Ratified Decision 1 in the integration plan). The skill plans Thursday but does not build the prototype.
- **Exec memo authoring is delegated** to `foundation-stakeholder-update` (Ratified Decision 4). The Decider summary captures the call; the exec memo is a downstream artifact.

The methodology itself is unchanged. If you've run a canonical Design Sprint before, pm-skills will feel familiar; the skills are tools that accelerate the work, not a replacement for the workshop.

### Q: Can I use the pm-skills Design Sprint family without AI?

Yes. The TEMPLATE.md files at `skills/tool-design-sprint-*/references/TEMPLATE.md` are usable as workshop worksheets without AI. The SKILL.md instructions become facilitator notes. The library samples demonstrate end-to-end arcs as reference. The Design Sprint methodology stands without the AI invocation surface.

## Related resources

- [Using the Design Sprint Tools](using-design-sprint.md) - the operational walkthrough
- [Design Sprint concept doc](../concepts/design-sprint.md) - the methodology deep-dive
- [Design Sprint cheat sheet](design-sprint-cheat-sheet.md) - the printable 1-pager
- [Design Sprint case studies](design-sprint-case-studies.md) - 3 end-to-end examples
- [Design Sprint recovery playbook](design-sprint-recovery.md) - mid-sprint failure recovery
- [Design Sprint skills contract](../reference/skill-families/design-sprint-skills-contract.md) - the formal v0.2.0 spec
- [Sprint Methodology Glossary](../reference/sprint-methodology-glossary.md) - terminology reference
- [Workshop Sprints vs Agile Sprints](../concepts/workshop-sprints-vs-agile-sprints.md) - cross-method disambiguation
- [`_workflows/design-sprint.md`](../../_workflows/design-sprint.md) - the canonical 7-skill workflow
- [`_workflows/foundation-to-design.md`](../../_workflows/foundation-to-design.md) - end-to-end FS+DS arc

---

*Part of [PM-Skills](https://github.com/product-on-purpose/pm-skills) - Open source Product Management skills for AI agents.*
