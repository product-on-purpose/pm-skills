# Sample Creation Standards

This document defines the canonical standards for adding or updating sample outputs in `library/skill-output-samples/`.

## 1) Scope

Applies to all sample markdown files under:

- `library/skill-output-samples/<skill-name>/`

This excludes:

- `README_SAMPLES.md` (navigation doc)
- tracked release-governance artifacts under `docs/internal/release-plans/`

## 2) Canonical Naming

Use this exact pattern for every sample output file:

- `sample_skill_thread_<additional-helpful-context>.md`

Rules:

1. `skill` must match the folder/skill id (for example `define-hypothesis`, `deliver-prd`, `foundation-persona`).
2. `thread` should be one of:
   - `storevine`
   - `brainshelf`
   - `workbench`
   - `orbit` (legacy PRD calibration samples)
   - `legacy` (older non-thread baseline examples)
3. `<additional-helpful-context>` should be short and hyphenated (`[a-z0-9-]` only).
4. Use lowercase only.
5. Do not use spaces.

Examples:

- `sample_define-hypothesis_storevine_campaigns.md`
- `sample_deliver-prd_orbit_ideal.md`
- `sample_foundation-persona_workbench_marketing-detailed-blueprints.md`
- `sample_discover-competitive-analysis_legacy_ecommerce-platform.md`

## 3) Folder Structure

1. Keep one folder per skill:
   - `library/skill-output-samples/<skill-name>/`
2. Do not mix skill outputs across folders.
3. Keep legacy samples in their original skill folder, using `thread=legacy` in filename.

## 4) Required Content Structure

Every sample should keep this section order:

1. `Scenario`
2. `Prompt`
3. `Output`

Additional requirements:

1. Output must follow the corresponding skill `references/TEMPLATE.md` section order.
2. No unresolved placeholders (`TBD`, `TODO`, `<...>` placeholder text).
3. Any invented metric/value should include `[fictional]` marker.
4. If real public claims are used, include `Source Notes` with public references.

## 5) Frontmatter Standards

Library sample frontmatter MUST start at byte 0 of the file (the opening `---` fence on line 1, no preceding content of any kind including HTML comments, BOM, or whitespace). The `<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->` attribution comment goes on the line immediately after the closing `---` fence, with no blank line between them. This placement satisfies GitHub's markdown renderer (which displays the YAML as a structured metadata table at the top of the page) and Astro Starlight's content-collection schema validation.

### Required schema

For modern thread samples (`storevine`, `brainshelf`, `workbench`), the frontmatter has 10 fields in this order:

| # | Field | Required | Purpose |
|---|---|---|---|
| 1 | `title` | Required | SEO-load-bearing; appears in Starlight listing-page nav, search results, social cards, and HTML `<title>` tag |
| 2 | `description` | Required | SEO-load-bearing; 1-2 sentences for Starlight listing-page excerpt and meta description |
| 3 | `artifact` | Required | Skill artifact type (e.g., `opportunity-tree`, `prd`) |
| 4 | `version` | Required | Sample-content version, string-quoted (e.g., `"1.0"`) |
| 5 | `repo_version` | Required | pm-skills version when sample was authored (e.g., `"2.5.0"`) |
| 6 | `skill_version` | Required | Skill version when sample was authored (e.g., `"2.0.0"`) |
| 7 | `created` | Required | ISO date (e.g., `2026-02-20`) |
| 8 | `status` | Required | One of `sample`, `legacy` |
| 9 | `thread` | Required | One of `storevine`, `brainshelf`, `workbench` |
| 10 | `context` | Required | Scenario-load-bearing; richer narrative (the why-this-sample); distinct from `description:` which is SEO-grade |

The two SEO-load-bearing fields (`title:` and `description:`) come first because Starlight conventions place them at the top. The remaining 8 fields preserve the existing schema order.

### Canonical example

```markdown
---
title: "Opportunity Tree: Brainshelf Resurface 60-day Retention"
description: "Outcome-driven tree mapping three opportunities for re-engaging saved content in the Brainshelf consumer PKM app."
artifact: opportunity-tree
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app - opportunity tree for saved content re-engagement
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

[Body content begins here]
```

### `description` vs `context` distinction

The two fields look similar but serve different purposes:

- **`description:`** is SEO-grade. 1-2 sentences. Appears in listing-page excerpts, meta description tags, and search-result previews. Should read as a summary that makes a reader want to click through.
- **`context:`** is scenario framing. Richer narrative. Captures the why-this-sample-exists: the product, the team, the constraint that makes this sample illustrative. Not displayed in listing UI; used for cross-sample analysis and authoring guidance.

When in doubt: `description:` answers "what is this sample showing?"; `context:` answers "in what scenario was this sample produced?".

### Validation

`scripts/lint-skills-frontmatter.sh` (and `.ps1`) enforces:

- byte-0 `---` fence (no HTML comment, BOM, or whitespace on line 1)
- attribution comment immediately after closing `---` fence (no blank line between them)
- presence of all 10 required fields
- `created` is ISO date format
- `status` is one of the 2 enum values
- `thread` is one of the 3 enum values

Legacy files (`status: legacy`) may not have full modern frontmatter; avoid back-editing legacy unless there is a correctness issue.

## 6) Release-Coverage Metadata

Release-coverage manifest is maintained as a tracked internal release-governance artifact (not in this folder):

- `docs/internal/release-plans/v2.6.1/skill-output-samples_manifest.v2.6.1.json`

When sample files are added/renamed/removed, update that tracked manifest in the same change set.

## 7) README_SAMPLES Update Workflow

When adding or renaming files, update `library/skill-output-samples/README_SAMPLES.md` in the same pass.

Required updates:

1. **Browse by Skill** table links must point to new filenames.
2. **Browse by Company** section links must point to new filenames.
3. Any descriptive text referencing old scenario/file names should be updated.

Do not leave stale links.

## 8) Validation Checklist

Before considering sample updates complete:

1. All markdown links in `README_SAMPLES.md` resolve to existing files.
2. Filenames conform to `sample_skill_thread_<additional-helpful-context>.md`.
3. Section order and completeness checks pass (`Scenario`, `Prompt`, `Output`).
4. Release-coverage manifest entries match actual filenames for expected samples.

## 9) Practical Policy Notes

1. Keep canonical coverage deterministic (currently 84 core samples).
2. Additional legacy files are allowed but should be explicitly treated as legacy in naming.
3. Avoid ad-hoc naming exceptions; update this document first if policy changes.
