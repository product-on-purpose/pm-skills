---
slug: releases/Release_v2.33.0
title: Release v2.33.0
description: Every fix in this release came from someone using the skills and saying what broke. Three field-reported defects, a front door and a worked example for project memory, and the AI-product family opens across three skills.
---

**Prepared 2026-08-29, tagged and published 2026-09-01.** Additive MINOR. No new skills; the catalog stays at 68 skills (30 phase + 11 foundation + 12 utility + 15 tool) and 6 sub-agents.

## The short version

**Every fix here came from someone using the skills and telling us what broke.**

That is a first for this project, and worth naming as a bias rather than a boast. Previous releases were largely the repository inspecting itself: audits, adversarial reviews, generators. Self-inspection scales and bug reports do not, so a finding with a validator behind it always *looks* more actionable than a report with a person behind it. These were prioritized anyway.

If you only read one section, read [the partial-install fix](#skills-pointed-you-at-skills-you-had-not-installed). It is the least visible change here and the one most likely to have been quietly costing you something.

## Getting it

```bash
claude plugin marketplace update product-on-purpose
claude plugin update pm-skills
```

Both commands are needed. The plugin update alone cannot see a registry it has not re-fetched. Full instructions, including the file-based install: [Updating pm-skills](../guides/updating-pm-skills.md).

---

## The three things people reported

### The persona example did not match the persona template

[`foundation-persona`](../skills/foundation/foundation-persona.md) shipped a template and an example that demonstrated **different formats**. If you copied the example, which is the entire purpose of an example, you got a persona that did not conform to the template the skill would then judge it against.

It is now regenerated as a filled-in instance of its own template, and checked structurally rather than by eye: all 13 template sections present, none added, no leftover authoring blockquotes, no unfilled placeholders.

The existing persona was **re-rendered, not replaced**. If you were already working with her, she is the same person.

*Reported in [#251](https://github.com/product-on-purpose/pm-skills/issues/251). Skill version 2.6.1.*

### Prioritization assumed a big company with a long list

Three separate frustrations in [`define-prioritization-framework`](../skills/define/define-prioritization-framework.md), each fixed the way the person reporting them suggested.

**"Show the top 5 and bottom 5" is useless when you have 6 items.** The highlight rule now scales below ten items instead of assuming a long backlog.

**RICE Effort was expressed in person-months, which means nothing to a team of two.** Effort is now capacity-weeks measured against your team's real capacity, and the skill states the conversion rather than leaving you to invent one.

**Kano refused to run without a formal survey.** It now recognizes two tiers of evidence, surveyed and inferred, decided by how you collected it, and refuses only when you have no research at all. How *much* research you have became a separate question that limits how strong a claim you may make, rather than a gate that stops you entirely.

The skill still declines to define "clearly leads" as a number, and now says so in the text instead of leaving it unstated. A house cutoff would carry more authority than the judgment it displaced.

*Reported in [#252](https://github.com/product-on-purpose/pm-skills/issues/252). Skill version 1.3.0.*

### Skills pointed you at skills you had not installed

This is the subtle one, and the most valuable fix in the release.

Every skill was written assuming the whole library was present. So when a skill correctly decided it was the wrong tool and handed you off, it simply named the right one. **If you install skills individually, which many people do, that name was a dead end:** the skill correctly refused, correctly identified the alternative, and left you holding nothing you could act on.

Four skills now **name the gap and inline the minimum** instead of just pointing:

| Skill | What it does now instead of pointing |
|---|---|
| [`measure-survey-analysis`](../skills/measure/measure-survey-analysis.md) | States the minimum viable experiment in plain language rather than naming an experiment-design skill you may not have |
| [`foundation-build-risk-review`](../skills/foundation/foundation-build-risk-review.md) | Inlines the minimum for every skill it routes to, so a risk review never ends on a step you cannot take |
| [`discover-journey-map`](../skills/discover/discover-journey-map.md) | Describes the work in plain language when its single-touchpoint refusal fires |
| [`define-prioritization-framework`](../skills/define/define-prioritization-framework.md) | Same fallback pattern on its routing paths |

Worth knowing how the scope shrank. The original plan named fourteen affected skills; measuring during the work cut it to four. The other ten matched a search for "mentions another skill" without actually routing to one. Saying "shared with `foundation-meeting-brief`" is a mention, not a handoff.

*Reported in [#253](https://github.com/product-on-purpose/pm-skills/issues/253).*

---

## What is new

### You can now write specs for AI features

Four new sections across three skills. They appear **only** when the thing you are specifying involves a model, so nothing changes for ordinary product work.

**[`deliver-prd`](../skills/deliver/deliver-prd.md) 3.0.0** gains two:

- **AI Behavior and Evaluation**, pairing every behavior requirement with the evidence that actually holds it up, and giving refusal and abstention their own rows rather than leaving them implied.
- **Agent Execution Contract**: which sources are authoritative, what must not be touched, how each requirement gets verified, and when to stop and escalate.

**[`measure-instrumentation-spec`](../skills/measure/measure-instrumentation-spec.md) 3.0.0** gains **Model Trace Capture**, a privacy contract for prompt and completion traces. It treats minimization at two separate boundaries, before data leaves your system and again before it is durably stored, because those are genuinely different decisions with different failure modes. It also covers what happens when either one fails, what becomes of a failed trace, who may read one, whether that read is logged, retention, sampling, and opt-out.

**[`develop-adr`](../skills/develop/develop-adr.md) 3.0.0** gains **Model Choice** inside Consequences: build versus buy versus prompt, what becomes coupled to the choice, the operating cost you are accepting, what reversing would cost, and the observation that should reopen the decision. The six Nygard headings are untouched.

### Project memory has a front door, and a worked example

The previous release shipped project memory and then never mentioned it anywhere a user would look. Four surfaces now point at it, and the concept is documented in [Hooks and project memory](../concepts/hooks.md).

Auditing the destination before adding those pointers turned out to matter, because the documentation they led to was not usable either. Four signposts to a dead end would have been worse than none.

That audit also caught a real trap. The docs twice described the memory state file as "gitignored." That is a property of *this* repository's ignore rules, not a property of the file. Nobody was telling you to ignore it in your own project, so anyone following those docs would have committed a file holding their initiative, decisions, and artifact paths while the documentation assured them it was handled.

**The worked example is a published pair you can read end to end**, both on the [Storevine](../showcase/storevine.md) thread:

1. [Interview synthesis: SMS opt-in](../samples/discover-interview-synthesis/sample_discover-interview-synthesis_storevine_sms-optin.md)
2. [The PRD that consumes it](../samples/deliver-prd/sample_deliver-prd_storevine_sms-optin.md)

Read them in that order and watch the PRD prompt get shorter, because the personas and findings are already on record instead of being pasted in again.

One honest limit: this demonstrates the loop **as designed, not as executed**. It shows what the artifacts look like when the memory write path works. It is not proof that the write path behaves correctly at runtime.

---

## If you are upgrading

Three skills went to a new major version: `deliver-prd`, `develop-adr`, and `measure-instrumentation-spec`.

They were originally typed as minor updates, on the reasoning that a section which only appears sometimes cannot break anyone. **That reasoning was overturned before this release shipped**, and the correction generalizes well enough to be worth stating:

> Making something conditional narrows *who* is affected. It does not change *what happens* to them.

The proof was internal. Two published PRD samples describing an AI-generated summary feature carried no `AI Behavior and Evaluation` section, which made them non-compliant with the very skill that produced them. Both were retrofitted before this shipped.

**What this means for you:** if you have existing PRDs, ADRs, or instrumentation specs covering model-backed features, they are now incomplete against the current version of those skills. Documents that do not involve a model are unaffected, and nothing else here requires migration.

**One known gap ships with this release.** The retention section of `measure-instrumentation-spec` does not yet carry the evaluation-set copy question its own skill file requires. That is a content gap rather than a structural one, deferred with written reasoning to the next release.

## By the numbers

| | |
|---|---|
| Skills updated | **8** (3 major, 4 minor, 1 patch) |
| Sample library | **213 samples across 63 skills** |
| Catalog | **68 skills**, unchanged (30 phase + 11 foundation + 12 utility + 15 tool) |
| Sub-agents | **6**, unchanged |
| New skills, renames, removals | none |

## Notes for the curious

This release's pre-ship review ran unusually long, and the reason is worth recording publicly because it is a general lesson about templates rather than a story about this repository.

The adversarial review ran **twelve rounds**. Splitting all fifty-six findings by what the fix that produced the surface actually did separates them completely: **fixes that removed a claim converged, and fixes that authored new methodology churned.** One section produced zero findings across the nine rounds after its shaky derivation was simply deleted. Another survived a full rewrite, then a deletion with an authored replacement, then a row split, and produced a fresh high-severity finding after each one, because each of those authored something new for the reviewer to attack.

The sharpest instance: a fix that split a table row in order to assert "each row must make exactly one claim" wrote a replacement row that makes two. The principle was right, and embodying it in authored structure reintroduced the defect one level down.

**The practical takeaway for anyone writing templates:** a PM-authored template can name a contract and demand evidence, but it cannot author correct engineering test design, and a determined reviewer will keep proving it. Several sections in this release now name what must be true and who owns proving it, rather than prescribing how. **A test that cannot fail is worse than a named requirement,** because it converts an open question into a checked box.

If you want the method rather than the story, it is written up in [Adversarial review](../guides/adversarial-review.md).

---

## More

- [Full changelog](../changelog.md) for every version
- [Using skills](../guides/using-skills.md) if you are new here
- [Sample library](../samples/) for worked output on every skill
- [All releases](./)
