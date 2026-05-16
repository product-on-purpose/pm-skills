---
title: Foundation Sprint FAQ
description: "Common questions about running a Foundation Sprint with pm-skills: when to use, who attends, comparison to agile sprints + Design Sprint + Lean Canvas, recovery from common failures, and how the pm-skills AI-era implementation differs from canonical Knapp/Zeratsky."
---

> **Foundation Sprint is NOT an agile / Scrum sprint.** Foundation Sprint is a 2-day strategic-alignment workshop methodology from Knapp and Zeratsky (Character Capital). For the cross-method disambiguation, see [Workshop Sprints vs Agile Sprints](../concepts/workshop-sprints-vs-agile-sprints.md).

This FAQ addresses common questions about running a Foundation Sprint using the pm-skills `tool-foundation-sprint-*` family. For the operational walkthrough, see [Using the Foundation Sprint Tools](using-foundation-sprint.md). For the conceptual deep-dive, see [the Foundation Sprint concept doc](../concepts/foundation-sprint.md). For terminology, see the [Sprint Methodology Glossary](../reference/sprint-methodology-glossary.md).

## When to use a Foundation Sprint

### Q: When should we run a Foundation Sprint?

When you're starting a significant new initiative and the strategic direction is unclear. The single most useful signal: your team has multiple plausible directions and the cost of picking the wrong one is high. Foundation Sprint forces a choice in 2 days that would otherwise drag for weeks in unstructured discussion.

Common scenarios: pre-seed founders deciding what product to build; established teams launching a major new product line; PM at the start of a strategic initiative that affects multiple downstream cycles.

### Q: When should we NOT run a Foundation Sprint?

- No concrete initiative or strategic question yet. Foundation Sprint sharpens an existing direction; it does not invent one.
- No customer or market knowledge. Foundation Sprint depends on existing knowledge; it is not a substitute for customer research.
- No Decider available. Without strategic authority, Foundation Sprint produces options without commitment.
- The decision is small. Use a lighter prioritization tool.
- The hypothesis is already clear. Jump straight to a Design Sprint or experiment to validate.

The `tool-foundation-sprint-readiness` skill formalizes these criteria into 8 canonical readiness checks and returns Go / Conditional Go / Wait. Run it before committing two days.

### Q: How is Foundation Sprint different from Lean Canvas?

Both produce a one-page strategic frame, but Foundation Sprint is heavier and more ritualized. Lean Canvas (~60-90 min, 1-3 people) is solo or small-team prose work. Foundation Sprint (2 days, 3-5 people including Decider) forces a multi-stakeholder team to make 4 explicit choices through silent ideation + note-and-vote + Decider supervote. Foundation Sprint output is a testable Founding Hypothesis sentence; Lean Canvas output is a 9-block canvas.

Use Lean Canvas when you have a single PM or founder thinking through a model. Use Foundation Sprint when you have a cross-functional team that needs to commit to one direction together.

### Q: How is Foundation Sprint different from a Design Sprint?

Different purpose, different output, different attendees, different timing.

| Dimension | Foundation Sprint | Design Sprint |
|---|---|---|
| Duration | 2 days | 5 days |
| Output | Founding Hypothesis sentence + assumption scorecard | Friday scorecard + Decider's build/iterate/pivot/stop call |
| Customer access | Not required | 5 target customers Friday |
| Prototype | No | Yes (one-day Thursday build) |
| Team size | 3-5 | 4-7 |

Foundation Sprint chooses WHICH risky bet is worth testing. Design Sprint TESTS a chosen bet. Many teams run both back-to-back (1-2 week gap for recruiting); see [`_workflows/foundation-to-design.md`](../../_workflows/foundation-to-design.md).

## Attendees and roles

### Q: Who must attend a Foundation Sprint?

- **Decider** (full both days; non-negotiable): the person with strategic authority who will make the supervote calls.
- **Facilitator** (full both days): runs timeboxes, enforces silent work, owns note-and-vote moments.
- **PM** (full both days): brings customer/market knowledge; often the same person as the Decider in early-stage startups.
- **Design** (full both days): contributes differentiator candidates, sketches the 2x2 chart and Mini Manifesto.
- **Engineering OR customer expert** (full both days): one of these; engineering checks feasibility of approach options; customer expert contributes target-customer + competitor knowledge.

Total: 3-5 people. Smaller fails ("not enough perspectives"); larger fails ("debate doesn't converge").

### Q: Can the Decider be remote?

Yes. Both days work fully remote via video + a shared whiteboard tool (Miro is the most-common canonical reference). The Decider's role does not require physical presence; it requires attention. A distracted in-person Decider is worse than a focused remote Decider.

### Q: Can the same person be Decider and Facilitator?

Possible but not recommended. The Facilitator role demands neutral attention to time and process; the Decider role demands engaged judgment on content. Splitting the roles produces better calls. In a 3-person Foundation Sprint where you must combine: have the most strategically-bought-in person be the Decider, and a less-strategically-bought-in person facilitate.

## Process questions

### Q: What if our team can't generate 3 approach options?

Approach Options enforces a minimum of 3 specifically to break anchoring on the first idea anyone said out loud. If the team genuinely cannot generate 3 distinct approaches, treat that as a research gap (not a Foundation Sprint failure): you do not have enough strategic options to choose among, and the right next move is customer research, market research, or competitive teardown to expand the set.

### Q: What if the Decider doesn't show up for the supervote?

Postpone the Founding Hypothesis ratification until the Decider is present. Continue Day 2 work to the extent possible (Approach Options can be generated; Magic Lenses can be scored) but the supervote requires the Decider. Without it, the Founding Hypothesis becomes a "what the team thinks" artifact instead of a "what we committed to" artifact, and the next-step testing reverts to ad-hoc.

### Q: How do we know if the Founding Hypothesis is good?

Two tests:

1. **Public commitability:** the Decider can read the sentence aloud to a stranger (potential customer, investor, board member) without flinching. If the Decider would soften or hedge, the hypothesis is not yet committed.
2. **Testability:** the highest-risk assumption in the scorecard can be tested through a Design Sprint, customer research, or focused experiment within 2-4 weeks. If the highest-risk assumption requires a 6-month build to test, the hypothesis is at the wrong altitude.

### Q: Can we run Foundation Sprint without doing the full Mini Manifesto?

Not recommended in v0.1. The Mini Manifesto is the sanity-check artifact every later decision in Day 2 references ("does this approach option align with the manifesto?"). Skipping it makes Day 2 Magic Lenses scoring noisy because the lens criteria lack a strategic anchor. If you're truly time-constrained, compress Day 1 afternoon to 90 minutes instead of skipping.

## Variants and adaptations

### Q: Can we compress Foundation Sprint to 1 day?

Possible but loses rigor. Knapp and Zeratsky designed the 2-day cadence specifically because Day 1's strategic positioning needs to "settle" overnight before Day 2's approach generation. Compressing to 1 day produces approach options anchored on Day 1 morning's first ideas. If you genuinely have only 1 day, consider Lean Canvas + a half-day approach-options workshop instead.

### Q: Can we extend Foundation Sprint to 3 days?

Possible when you have 2+ Decider candidates and need a Day 0 alignment moment. Adding a half-day "pre-sprint" before Day 1 to align Decider candidates is common in enterprise contexts. Extending Day 2 to a full Day 3 is less common and usually a sign that the team is debating too much within Magic Lenses; the Facilitator should enforce timeboxes harder rather than extend.

### Q: How does Foundation Sprint adapt for hardware / service / B2B / regulated products?

The 2-day cadence is methodology-stable but the inputs change:
- **Hardware:** Add manufacturing-feasibility lens to Magic Lenses (5+ lenses instead of 4+1).
- **Service:** Replace "prototype direction" framing with "service blueprint direction".
- **B2B with multi-stakeholder buyers:** Run Basics for the buyer persona AND the end-user persona; both feed Differentiation.
- **Regulated (healthcare, finance):** Add compliance lens to Magic Lenses; expect Decider to have explicit authority for the regulatory dimension.

The canonical [Character Capital Foundation Sprint guide](https://www.character.vc/guide/foundation-sprint) covers some variants in more depth.

## Recovery from common failures

### Q: What if Day 1 ends and the team hasn't converged?

Most common cause: the target customer or important problem from Basics is too vague. Re-do Basics morning of Day 2 with sharper inputs (specific customer name vs vague segment; specific painful moment vs broad "frustration"). This sacrifices Approach Options time but Day 2's downstream work is impossible without solid Basics.

### Q: What if the Decider wants to change the top bet after the Founding Hypothesis is ratified?

Two paths:

1. **If new evidence has emerged** (customer signal, market shift, competitor move): re-run a half-day Magic Lenses with the new evidence and re-ratify.
2. **If the Decider is just second-guessing**: hold the line. The point of the Decider Checkpoint is to prevent re-litigation. The team should test the Founding Hypothesis as ratified; if testing invalidates it, that's data; if Decider just wants to change directions without data, that's failure of decision discipline and the next sprint will face the same problem.

### Q: What if we ran the Foundation Sprint and now we're not sure whether to follow with a Design Sprint?

Use the 3-question go/no-go checkpoint documented in [`_workflows/foundation-to-design.md`](../../_workflows/foundation-to-design.md):

1. Is the highest-risk assumption testable through a single-week prototype with target customers?
2. Is customer access feasible within the 1-2 week recruiting window?
3. Can the team clear 5 consecutive days plus a Decider for the load-bearing moments?

If any answer is No, the next test is NOT a Design Sprint. Options include customer research, fake-door experiment, concierge MVP, or longer-cycle validation. Use [`measure-experiment-design`](../../skills/measure-experiment-design/SKILL.md) to design the alternative.

## pm-skills implementation

### Q: How does the pm-skills implementation differ from Knapp/Zeratsky's canonical Foundation Sprint?

pm-skills implements the canonical Knapp/Zeratsky 2-day method as 7 AI-invocable skills (one per canonical move). The differences:

- **AI is a first-class participant** for drafting, synthesizing, generating alternatives, and summarizing. The Decider still decides; the team still contributes; the AI prepares.
- **Decider Checkpoint is family-contract-enforced** at the end of every TEMPLATE.md. Without sign-off, the output is advisory; with sign-off, it triggers the next move.
- **The output artifacts have canonical templates** (TEMPLATE.md per skill) so the Founding Hypothesis, Mini Manifesto, etc. follow a consistent format across teams.

The methodology itself is unchanged. If you've run a canonical Foundation Sprint before, pm-skills will feel familiar; the skills are tools that accelerate the work, not a replacement for the workshop.

### Q: Can I use the pm-skills Foundation Sprint family without AI?

Yes. The TEMPLATE.md files at `skills/tool-foundation-sprint-*/references/TEMPLATE.md` are usable as workshop worksheets without AI. The SKILL.md instructions become facilitator notes. The library samples at `library/skill-output-samples/tool-foundation-sprint-*/` are reference examples. The Foundation Sprint methodology stands without the AI invocation surface.

## Related resources

- [Using the Foundation Sprint Tools](using-foundation-sprint.md) - the operational walkthrough
- [Foundation Sprint concept doc](../concepts/foundation-sprint.md) - the methodology deep-dive
- [Foundation Sprint cheat sheet](foundation-sprint-cheat-sheet.md) - the printable 1-pager
- [Foundation Sprint case studies](foundation-sprint-case-studies.md) - 3 end-to-end examples
- [Foundation Sprint recovery playbook](foundation-sprint-recovery.md) - mid-sprint failure recovery
- [Foundation Sprint skills contract](../reference/skill-families/foundation-sprint-skills-contract.md) - the formal v0.3.0 spec
- [Sprint Methodology Glossary](../reference/sprint-methodology-glossary.md) - terminology reference
- [Workshop Sprints vs Agile Sprints](../concepts/workshop-sprints-vs-agile-sprints.md) - cross-method disambiguation
- [`_workflows/foundation-sprint.md`](../../_workflows/foundation-sprint.md) - the canonical 7-skill workflow

---

*Part of [PM-Skills](https://github.com/product-on-purpose/pm-skills) - Open source Product Management skills for AI agents.*
