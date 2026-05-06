---
artifact: discovery-note
title: Library Sample Frontmatter Correction Example
cycle: v2.14.0
created: 2026-05-06
status: draft
topic: library-sample-frontmatter-placement-bug
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Library Sample Frontmatter: Corrected Format Example

> **Note**: This file is itself an example of correctly-placed frontmatter. The `---` block above is at byte 0 of the file, with the attribution comment placed immediately after the closing fence. View this file on GitHub to see the rendered two-column metadata table at the top of the page; that table is what every library sample file should produce after the v2.14.0 sweep.

> **Discovery**: 2026-05-06
> **Cycle**: v2.14.0
> **Source bug**: 100 of 100 files in `library/skill-output-samples/**/sample_*.md` place an HTML attribution comment on line 1, which prevents GitHub (and downstream static-site generators including Astro Starlight) from parsing the YAML frontmatter that follows. The block renders as a run-on paragraph instead of a metadata table.
> **Decision**: Keep the attribution comment. Move it below the closing `---` so frontmatter begins at byte 0.

---

## Reference sample

Source file used for this example:
`library/skill-output-samples/define-opportunity-tree/sample_define-opportunity-tree_brainshelf_resurface.md`

---

## Before (current state, broken)

```markdown
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
artifact: opportunity-tree
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . opportunity tree for saved content re-engagement
---

## Scenario

Brainshelf's PM built an opportunity solution tree...
```

**GitHub render**: YAML fields collapse into a single run-on paragraph at the top of the page. The frontmatter parser never engages because line 1 is an HTML comment, not the opening `---` fence.

---

## After (corrected, canonical layout)

```markdown
---
artifact: opportunity-tree
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . opportunity tree for saved content re-engagement
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Brainshelf's PM built an opportunity solution tree...
```

**GitHub render**: frontmatter renders as a two-column key/value table at the top of the rendered page. The attribution comment is preserved, just relocated below the closing fence where it does not disrupt parsing.

---

## The change in one operation

| Operation | Detail |
|---|---|
| Removed | Line 1: `<!-- PM-Skills \| https://github.com/product-on-purpose/pm-skills \| Apache 2.0 -->` |
| Inserted | The same comment, on the line immediately after the closing `---` (typically line 11 or 12 depending on the file) |
| Net change | One line relocated. No bytes added or removed beyond the single line move. |

The fix is mechanically identical across all 100 files in scope.

---

## Why this works

GitHub's markdown renderer (and every other YAML-frontmatter parser the repo will encounter, including Astro Starlight, Jekyll, Hugo, and MkDocs Material's meta plugin) requires the opening `---` fence at byte 0 of the file. Any preceding content, including HTML comments, BOMs, and whitespace, causes the parser to fall through to body-markdown mode, at which point the YAML block becomes prose and markdown's soft-break rule collapses single newlines into spaces.

The corrected layout places the attribution comment in body-markdown territory (where HTML comments are valid and invisible to readers) without violating the byte-0 requirement.

---

## Validated by repo precedent

Every `skills/*/SKILL.md` file already uses the corrected pattern and renders correctly on GitHub today. Reference example:

```markdown
---
name: define-opportunity-tree
description: Creates an opportunity solution tree mapping desired outcomes to opportunities and potential solutions. Use for outcome-driven product discovery, prioritization, or communicating product strategy.
phase: define
version: "2.0.0"
updated: 2026-01-26
license: Apache-2.0
metadata:
  category: problem-framing
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Opportunity Solution Tree
```

Source: `skills/define-opportunity-tree/SKILL.md` (lines 1 to 14).

The pattern is proven. The library samples diverged from it during sample-generator authoring; this discovery realigns the samples to the repo-wide convention.
