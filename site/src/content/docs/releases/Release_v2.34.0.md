---
slug: releases/Release_v2.34.0
title: Release v2.34.0
description: Two planned AI skills lost to a no-skill control and were not built. What survived went into deliver-prd, and the samples now label the figures they invent.
---

This release was supposed to ship two new skills for AI features. Before building them, we tested each one against an analyst with no skill at all.

**Both lost.** So neither ships, and this release carries what the test actually found.

:::note[Quick facts]
**Tagged 2026-10-17.** Additive MINOR.
**Catalog unchanged:** 68 skills (30 phase + 11 foundation + 12 utility + 15 tool), 6 sub-agents.
**Changed:** 4 skills (1 major, 2 minor, 1 patch). The sample library is 202 samples across 63 skills.
**Breaking-ish:** `utility-pm-skill-builder` went MAJOR, because its packet now must include a `HISTORY.md`. [What upgrading means](#if-you-are-upgrading).
:::

## Getting it

```bash
claude plugin marketplace update product-on-purpose
claude plugin update pm-skills
```

Run both commands. The plugin update alone cannot see a registry it has not re-fetched. Full instructions, including the file-based install, are in [Updating pm-skills](../guides/updating-pm-skills.md).

---

## The skills we did not build

The plan named two skills: an AI evaluation spec and an AI behavior spec. Each would have been a new entry in the catalog.

The test was simple. One analyst used a frozen draft of the skill, and an equally capable analyst used nothing. Both worked the same six AI features from the sample library. Three judges per skill, each applying a different lens (the build decision, labeling after the fact, or a hunt for failures), decided whether the skill changed a decision for the better.

| Proposed skill | Judges who said it helped | Result |
|---|---|---|
| AI evaluation spec | 0 of 3 | Not built |
| AI behavior spec | 1 of 3 | Not built |

The evaluation-spec loss was not close. On one feature, the skill's own sign-off gate tested a permission boundary the feature already guaranteed by design. The analyst without the skill tested the boundary that actually leaked.

All six judges said the same thing: what is useful here belongs in a skill you already have. That skill is [`deliver-prd`](../skills/deliver/deliver-prd.md), whose AI section shipped in v2.33.0.

## What survived, now in deliver-prd 3.1.0

The `AI Behavior and Evaluation` section of a PRD gains the decisions that beat the control, or that skilled analysts on both sides skipped.

- **Runs per case.** The evaluation set now asks how many times each case runs at production settings, and when a case counts as passed. The same case can pass once and fail the next time.
- **Content the model reads is data.** A new recommended row, for features where the model reads documents, pages or email. Instructions inside them are never followed unless the product's instructions or the user said to obey them, as with a style guide the user supplies. No analyst in either arm built a prompt-injection case unprompted.
- **No lower-access audience.** A new recommended row, for output shown to people other than the requester: the output never reaches anyone with less access than its source.
- **"Passing threshold" is now "Pass rule".** The old column invited percentage thresholds, while the section's own guidance said a curated test set supports no rate. Every analyst in both tests wrote percentages anyway. A pass rule is fixed before the run and applies per case. A requirement you state as a rate stays a rate, with its verification marked unresolved until a designed sample backs it.
- **The trigger is narrower.** A property that a deterministic check can decide no longer pulls a feature into this section just because a model produced the output.

[`deliver-acceptance-criteria`](../skills/deliver/deliver-acceptance-criteria.md) 1.1.1 now points criteria stated as a rate over model output to that section.

## The samples now label what they invent

The sample library and each skill's worked example are full of figures: conversion rates, interview counts, revenue, quotes. Almost all of them are invented, and until now you could not tell which.

They now carry a `[fictional]` marker wherever the sample made something up. Facts the scenario supplies, decisions the team made, and stable public facts about real companies stay unmarked. The convention and its edge cases are in the [samples guide](https://github.com/product-on-purpose/pm-skills/blob/main/library/skill-output-samples/README_SAMPLES.md).

- **The library:** 4,508 markers across 194 of the 202 samples.
- **The skill examples:** 1,518 markers across 62 of the 68 `EXAMPLE.md` files, up from 77.

The repository's fabricated-metrics check now reads every skill example as well as the samples. It stays advisory: of the first ten findings it raised on the swept samples, eight were things the convention deliberately leaves unmarked.

## New skills start with a version history

[`utility-pm-skill-builder`](../skills/utility/utility-pm-skill-builder.md) 2.0.0 now requires a `HISTORY.md` with a baseline row in every skill packet it creates. [`utility-pm-skill-iterate`](../skills/utility/utility-pm-skill-iterate.md) 1.1.0 offers to create a missing one for any skill at 1.0.0 or later.

Both follow a rule this repository adopted during the cycle. Each skill's `HISTORY.md` is now its only version record, and the older per-release `skills-manifest.yaml` files are retired.

---

## If you are upgrading

One skill went MAJOR. `utility-pm-skill-builder` 2.0.0 requires a `HISTORY.md` in every packet, so a packet you drafted with an earlier version and have not yet promoted needs one, with a baseline row, before you promote it.

Nothing else breaks. A PRD written against `deliver-prd` 3.0.0 still conforms to 3.1.0, because every addition is recommended or conditional and no checklist item was added.

:::tip[Worth doing anyway]
If you have a PRD for a model-backed feature, check its evaluation set for two things. Does each case say how many runs it gets? Does any row state a percentage on a hand-picked test set? The second one is the habit this release is trying to break.
:::

The sample library lost 11 samples since v2.33.0, all from two retired sample threads, `orbit` and `legacy`. The three canonical threads, `storevine`, `brainshelf` and `workbench`, are unchanged in scope.

---

## More

- [Full changelog](../changelog.md) for every version
- [Adversarial review](../guides/adversarial-review.md), the method behind this release's gate
- [Sample library](../samples/) for worked output across 63 skills
- [All releases](./)

*If something here is wrong or unhelpful, [open an issue](https://github.com/product-on-purpose/pm-skills/issues/new).*
