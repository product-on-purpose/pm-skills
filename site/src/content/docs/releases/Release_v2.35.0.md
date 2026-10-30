---
slug: releases/Release_v2.35.0
title: Release v2.35.0
description: A quality release with no headline. pm-skills now declares a Standard, two templates catch up with their own skills, and the sample library gains a model-trace example.
---

This release has no headline feature, and that is a decision, not an accident.

The planned headline was to test the shipped skills against a plain model with no skill, and publish what each one adds. Before committing to it, we ran a pilot on three skills. **None of the three beat the no-skill arm.** So that headline does not ship, and this release carries the smaller work that has landed since v2.34.0.

:::note[Quick facts]
**Tagged 2026-10-30.** Quality MINOR.
**Catalog unchanged:** 68 skills (30 phase + 11 foundation + 12 utility + 15 tool), 6 sub-agents.
**Changed:** 2 skills, both patches. The sample library is 203 samples.
**New:** a `library.json` that declares edition 0.17 of the Advanced Skill Library Standard at Bronze.
:::

## Getting it

```bash
claude plugin marketplace update product-on-purpose
claude plugin update pm-skills
```

Run both commands. The plugin update alone cannot see a registry it has not re-fetched. Full instructions, including the file-based install, are in [Updating pm-skills](../guides/updating-pm-skills.md).

---

## Why there is no headline

The pilot tested `deliver-prd`, `define-problem-statement` and `discover-interview-synthesis`. Each skill ran three ways: the full skill, its template alone, and no skill at all. Three blind judges per skill decided whether the skill changed a decision for the better than the no-skill arm.

| Skill | Judges who said it added value |
|---|---|
| `deliver-prd` | 0 of 3 |
| `define-problem-statement` | 1 of 3 |
| `discover-interview-synthesis` | 0 of 3 |

The pilot has a clear limit. Every arm ran on the same capable model with complete scenario data, and every arm caught most of the planted traps. So it cannot say whether a skill helps a weaker model, or a user who brings thin inputs. It does say that publishing "what each skill adds" would not yet be honest.

## pm-skills now declares a Standard

The plugin now ships a `library.json` that declares edition 0.17 of the [Advanced Skill Library Standard](https://github.com/product-on-purpose/agent-skills-toolkit) at Bronze. That is the edition every plugin in the Product on Purpose marketplace is moving to.

Graded from a consumer's position with agent-skills-toolkit 1.22.0, pm-skills returns tier universal with 0 errors and 40 warnings. All 40 are description-score advice that predates this change.

Adopting it also fixed 41 reference links across 28 skill files. They broke when the documentation moved to `site/src/content/docs/`. Each now points at the page's new location, and no link was deleted. They resolve when you install from the marketplace or a git clone. The release ZIP does not carry those pages yet, so in a ZIP install the links still do not resolve, as in v2.34.0; that moves to v2.36.0.

## Two templates catch up with their skills

Both fixes close a gap where a skill's instructions asked for something its own template did not.

- **`measure-instrumentation-spec` 3.0.1.** The `Model Trace Capture` template's `Retention` row now asks how a deletion request reaches a trace that was copied into an evaluation set. The skill has required that answer since 3.0.0, but the template dropped it.
- **`utility-pm-release-conductor` 1.0.2.** The post-tag template no longer offers to log a delivery failure as a known regression. A release that reached nobody now stays open until delivery is confirmed, as the release runbook has required since v2.34.0.

## A new sample: model trace capture

The sample library gains a Brainshelf example for `measure-instrumentation-spec`. It shows the conditional privacy contract for a feature that captures model inputs and outputs, with claim-level checks planned. A contributor started it, and maintainers finished it. The library is now 203 samples.

## What moved to v2.36.0

The plan for this release also listed carries from v2.34.0. Three of them are rewrites of `measure-instrumentation-spec`'s trace table, a kind of change that took twelve review rounds in v2.33.0. Rather than hold this release for them, they move to v2.36.0, together with three smaller items. Shipping the documentation pages inside the release ZIP moves there too.

## If you are upgrading

Nothing breaks. Both skill changes are patches: a document written against the previous versions still conforms.

---

## More

- [Full changelog](../changelog.md) for every version
- [Sample library](../samples/) for worked output
- [All releases](./)

*If something here is wrong or unhelpful, [open an issue](https://github.com/product-on-purpose/pm-skills/issues/new).*
