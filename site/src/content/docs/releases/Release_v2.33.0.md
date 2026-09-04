---
slug: releases/Release_v2.33.0
title: Release v2.33.0
description: Every fix in this release came from someone using the skills and saying what broke. Three field-reported defects, a front door and a worked example for project memory, and the AI-product family opens across three skills.
---

Somebody copied our persona example, exactly the way you are supposed to, and got back a persona that our own skill would have marked non-conforming.

They told us. So did two other people, about two other things. **Every fix in this release came from one of those reports.**

:::note[Quick facts]
**Prepared 2026-08-29, tagged and published 2026-09-01.** Additive MINOR.
**Catalog unchanged:** 68 skills (30 phase + 11 foundation + 12 utility + 15 tool), 6 sub-agents.
**Changed:** 8 skills (3 major, 4 minor, 1 patch). Sample library grows to 213 across 63 skills.
**Breaking-ish:** three skills went MAJOR. [Jump to what that means for you](#if-you-are-upgrading).
:::

## Why that opening matters

Previous releases were largely this repository inspecting itself: audits, adversarial reviews, generators. That produces a lot of findings, and it produces them on demand.

**Self-inspection scales. Bug reports do not.** So a finding with a validator behind it always *looks* more actionable than a report with a person behind it, and the person quietly loses on equal footing.

These three were prioritized anyway. That is the whole theme.

## Getting it

```bash
claude plugin marketplace update product-on-purpose
claude plugin update pm-skills
```

Both commands. The plugin update alone cannot see a registry it has not re-fetched. Full instructions, including the file-based install: [Updating pm-skills](../guides/updating-pm-skills.md).

---

## Report 1: the example contradicted the template

[`foundation-persona`](../skills/foundation/foundation-persona.md) shipped a template and an example that demonstrated **different formats**.

Think about what that does to you. You open the skill, find the example, copy it because that is what examples are for, and produce a persona that fails the very template the skill judges against. The example was not a shortcut. It was a trap.

The example is now generated as a filled-in instance of its own template and **checked structurally rather than by eye**: all 13 sections present, none added, no leftover authoring blockquotes, no unfilled placeholders. It grew from 152 lines to 229 in the process, because a real instance of the template is simply bigger than the sketch that preceded it.

The persona herself was **re-rendered, not replaced**. If you were already working with her, she is the same person.

*Reported in [#251](https://github.com/product-on-purpose/pm-skills/issues/251). Now at 2.6.1.*

## Report 2: prioritization assumed you worked at a big company

Three frustrations in [`define-prioritization-framework`](../skills/define/define-prioritization-framework.md), each fixed the way the person reporting it suggested.

**"Show the top 5 and bottom 5" is useless when you have 6 items.** You get one item in the middle. The highlight rule now scales below ten instead of assuming a long backlog.

**RICE Effort was in person-months, which means nothing to a team of two.** Effort is now capacity-weeks against your team's real capacity, with the conversion stated rather than left for you to invent.

**Kano refused to run without a formal survey.** It now recognizes two tiers of evidence, surveyed and inferred, decided by *how you collected it*. It refuses only when you have no research at all. How much you have became a separate question, limiting how strong a claim you may make rather than stopping you at the door.

:::tip[A deliberate non-fix]
The skill still declines to define "clearly leads" as a number, and now says so out loud instead of leaving it unstated. A house cutoff would carry more authority than the judgment it displaced.
:::

*Reported in [#252](https://github.com/product-on-purpose/pm-skills/issues/252). Now at 1.3.0.*

## Report 3: skills sent you to skills you did not have

**This is the least visible fix here and the most valuable one.**

Every skill was written assuming the whole library was present. So when a skill correctly decided it was the wrong tool, it handed you off by simply naming the right one.

If you install skills individually, which many people do, that name was a dead end. The skill refused correctly, identified the alternative correctly, and left you holding **nothing you could act on**. Worse than a wrong answer, because it looked like a right one.

Four skills now **name the gap and inline the minimum** instead of pointing:

| Skill | What it does now |
|---|---|
| [`measure-survey-analysis`](../skills/measure/measure-survey-analysis.md) | States the minimum viable experiment in plain language rather than naming a skill you may not have |
| [`foundation-build-risk-review`](../skills/foundation/foundation-build-risk-review.md) | Inlines the minimum for every skill it routes to, so a review never ends on a step you cannot take |
| [`discover-journey-map`](../skills/discover/discover-journey-map.md) | Describes the work in plain language when its single-touchpoint refusal fires |
| [`define-prioritization-framework`](../skills/define/define-prioritization-framework.md) | Same fallback on its routing paths |

The scope shrank in a way worth knowing about. The plan named **fourteen** skills. Measuring during the work cut it to **four**. The other ten matched a search for "mentions another skill" without actually routing anywhere. Saying "shared with `foundation-meeting-brief`" is a mention, not a handoff, and shipping fixes to ten skills that were never broken would have been its own defect.

*Reported in [#253](https://github.com/product-on-purpose/pm-skills/issues/253).*

---

## New: you can write specs for AI features now

Four sections across three skills. They appear **only** when what you are specifying involves a model, so nothing changes for ordinary product work.

**[`deliver-prd`](../skills/deliver/deliver-prd.md)** gains two. **AI Behavior and Evaluation** pairs every behavior requirement with the evidence that actually holds it up, and gives refusal and abstention their own rows instead of leaving them implied. **Agent Execution Contract** covers which sources are authoritative, what must not be touched, how each requirement gets verified, and when to stop and escalate.

**[`measure-instrumentation-spec`](../skills/measure/measure-instrumentation-spec.md)** gains **Model Trace Capture**, a privacy contract for prompt and completion traces. It treats minimization at two separate boundaries, before data leaves your system and again before it is durably stored, because those are genuinely different decisions that fail in different ways. Plus what happens when either fails, what becomes of a failed trace, who may read one, whether that read is logged, retention, sampling, and opt-out.

**[`develop-adr`](../skills/develop/develop-adr.md)** gains **Model Choice** inside Consequences: build versus buy versus prompt, what gets coupled to the choice, the operating cost you are accepting, what reversing would cost, and the observation that should reopen the decision. The six Nygard headings are untouched.

## New: project memory has a front door

The previous release shipped project memory and then never mentioned it anywhere a user would look.

Four surfaces now point at it, and the concept is documented in [Hooks and project memory](../concepts/hooks.md). Auditing the destination *before* adding those pointers turned out to matter, because the documentation they led to was not usable either. Four signposts to a dead end would have been worse than none.

:::caution[The trap that audit caught]
The docs twice called the memory state file "gitignored."

That is a property of **this repository's** ignore rules, not a property of the file. Nobody was telling you to ignore it in your own project. Anyone following those docs would have committed a file holding their initiative, decisions, and artifact paths, while the documentation cheerfully assured them it was handled.
:::

**There is now a worked example you can read end to end**, both on the [Storevine](../showcase/storevine.md) thread:

1. [Interview synthesis: SMS opt-in](../samples/discover-interview-synthesis/sample_discover-interview-synthesis_storevine_sms-optin.md)
2. [The PRD that consumes it](../samples/deliver-prd/sample_deliver-prd_storevine_sms-optin.md)

Read them in that order and watch the PRD prompt get shorter, because the personas and findings are already on record instead of being pasted in again.

**One honest limit:** this shows the loop *as designed, not as executed*. It is what the artifacts look like when the memory write path works. It is not proof the write path behaves correctly at runtime.

---

## If you are upgrading

Three skills went MAJOR: `deliver-prd`, `develop-adr`, `measure-instrumentation-spec`.

They were drafted as *minor* updates, on the reasoning that a section which only appears sometimes cannot break anyone. **That reasoning was overturned before shipping**, and the correction is worth stealing:

> Making something conditional narrows *who* is affected.
> It does not change *what happens* to them.

The proof was embarrassing and internal. Two published PRD samples on the Orbit thread, `sample_deliver-prd_orbit_ideal` and `sample_deliver-prd_orbit_reality`, describe an AI-generated summary feature and carried no `AI Behavior and Evaluation` section. They were **non-compliant with the skill that produced them**. Both were retrofitted before this shipped.

:::caution[What this means for you]
If you have existing PRDs, ADRs, or instrumentation specs covering model-backed features, they are now incomplete against the current version of those skills.

Documents that do not involve a model are unaffected. Nothing else here requires migration.
:::

**One known gap ships with this release.** The retention section of `measure-instrumentation-spec` does not yet carry the evaluation-set copy question its own skill file requires. A content gap rather than a structural one, deferred with written reasoning to the next release.

---

## The part we did not expect to learn

The pre-ship adversarial review ran **twelve rounds**. That is four times longer than any previous release, and the reason turned out to be a general lesson about templates rather than a story about this repository.

Split all **fifty-six findings** by what the fix that created the surface actually did, and they separate completely:

> **Fixes that removed a claim converged. Fixes that authored new methodology churned.**

One section produced **zero findings across the nine rounds** after its shaky derivation was simply deleted. Another survived a full rewrite, then a deletion with an authored replacement, then a row split, and produced a fresh high-severity finding **after every single one**, because each attempt authored something new for the reviewer to attack.

The sharpest instance is almost a joke. A fix split a table row in order to assert that *each row must make exactly one claim*. The replacement row it wrote makes two.

The principle was right. Embodying it in authored structure reintroduced the defect one level down.

:::tip[The takeaway for anyone writing templates]
A PM-authored template can name a contract and demand evidence. It cannot author correct engineering test design, and a determined reviewer will keep proving it.

Several sections in this release now name **what must be true and who owns proving it**, rather than prescribing how. A test that cannot fail is worse than a named requirement, because it converts an open question into a checked box.
:::

The method is written up in [Adversarial review](../guides/adversarial-review.md).

---

## More

- [Full changelog](../changelog.md) for every version
- [Using skills](../guides/using-skills.md) if you are new here
- [Sample library](../samples/) for worked output across 63 skills
- [All releases](./)

*If something here is wrong or unhelpful, [open an issue](https://github.com/product-on-purpose/pm-skills/issues/new). Three of the four sections above exist because someone did.*
