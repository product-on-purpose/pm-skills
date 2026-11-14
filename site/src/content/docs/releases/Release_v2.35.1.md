---
slug: releases/Release_v2.35.1
title: Release v2.35.1
description: A documentation patch. The README and the docs homepage now say what the tests found about the skills, including where a skill adds nothing.
---

This patch changes no skill. It changes what we say about the skills.

:::note[Quick facts]
**Tagged 2026-11-13.** Documentation PATCH.
**Catalog unchanged:** 68 skills (30 phase + 11 foundation + 12 utility + 15 tool), 6 sub-agents.
**Changed:** the README, the docs homepage, the evals reference page, and the `deliver-prd` history.
:::

## Getting it

```bash
claude plugin marketplace update product-on-purpose
claude plugin update pm-skills
```

Run both commands. The plugin update alone cannot see a registry it has not re-fetched. Full instructions, including the file-based install, are in [Updating pm-skills](../guides/updating-pm-skills.md).

---

## Why this patch exists

Since October, every fair test has compared the skills against a capable model given the same scenario and no skill. In those tests, the plain model matched the skills on output quality. In most comparisons, a skill's template alone did about as well as the full skill, so the structure carries most of the measured value. The one exception so far is `define-problem-statement`, whose full skill beat its own template, although neither beat the no-skill arm.

The README and the docs homepage still claimed more than that. They said the frameworks were "refined across hundreds of product launches", that a model's unguided output is "mediocre", and that the plugin gives "consistent output, every time". None of those claims is something we measured.

## What changed

- **The README** now says what the skills give your agent: frameworks, templates, and worked examples that set the expected structure and depth. It links to the test results, including where a skill adds nothing.
- **The docs homepage** now promises "the same structure every time" in place of "consistent output, every time".
- **The evals reference page** has a new section, [What the tests have found](../reference/evals.md#what-the-tests-have-found). It summarizes every no-skill comparison to date, including the losses, and links each result to its record.
- **The `deliver-prd` history** records that a third test, which counted each spec's blocking questions, could not measure a difference. The model doing the counting disagreed with itself on up to 39 percent of the same specs between runs. The narrow result recorded in v2.35.0 stands, but this test does not confirm it.

## What this means for you

A skill gives your agent a consistent structure and a checklist of sections, including sections a model may leave out. It does not make a capable model reason better than a well-written prompt would. The two skills that lost twice, `define-problem-statement` and `discover-interview-synthesis`, are queued for a re-test in the way they are designed to be used, asking stakeholder questions.

## If you are upgrading

Nothing breaks. No skill, template, command or count changed.

---

## More

- [Full changelog](../changelog.md) for every version
- [What the tests have found](../reference/evals.md#what-the-tests-have-found)
- [All releases](./)

*If something here is wrong or unhelpful, [open an issue](https://github.com/product-on-purpose/pm-skills/issues/new).*
