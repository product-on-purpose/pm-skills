# MkDocs Material Launch — Execution Plan

Status: Active
Created: 2026-04-04
Agent: Claude Opus 4.6
Effort brief: `docs/internal/efforts/launch-mkdocs.md`

## Context

The pm-skills repo (29 skills, 30 commands, 3 workflows) has rich documentation but no documentation site. The effort brief at `launch-mkdocs.md` provides a comprehensive starting point (MkDocs Material config, GitHub Actions workflow, Diataxis-based IA, migration strategy) but contains factual errors that this execution plan corrects.

MkDocs Material v9.7.0 unlocked all Insiders features for free. The goal: zero to deployed GitHub Pages site with all existing content migrated.

## Corrections to Effort Brief

| Issue | Brief says | Actual |
|-------|-----------|--------|
| Skill count | 27 | 29 (25 domain + 1 foundation + 3 utility) |
| Command count | 28 | 30 |
| SKILL.md sections | Purpose, Key Concepts, Application, Common Pitfalls, References | When to Use, Instructions, Output Format, Quality Checklist, Examples |
| Install tabs | `claude install`, `codex install` | These commands don't exist — git clone / ZIP download |
| Related skills grid | Hardcodes nonexistent skill names | Omit for v1 |
| Missing from migration | `pm-skill-lifecycle.md`, `agent-skill-anatomy.md` | Must include |
| Blog for releases | Primary approach | Defer; simple releases section for v1 |

## Phase 0: Foundation

**Goal:** Site builds and deploys with a landing page stub.

### Files to create

**`mkdocs.yml`** — Based on effort brief config with these changes:
- Fix description: "29" not "27+"
- Remove `blog` plugin (defer to Phase 2)
- Remove `git-revision-date-localized` plugin (adds CI complexity; defer)
- Remove `custom_dir: overrides` and `extra_css` references (don't exist)
- Remove `mkdocs-rss-plugin` and `mkdocs-glightbox` from requirements
- Start with minimal nav referencing only files that exist

**`requirements-docs.txt`** — Minimal:
```
mkdocs-material>=9.6.0
pillow>=10.0.0
cairosvg>=2.7.0
```

**`.github/workflows/deploy-docs.yml`** — Simplified:
- Remove cairo system deps for first deploy (social cards disabled locally)
- Use `mkdocs gh-deploy --force`
- Trigger on: push to main (docs/**, mkdocs.yml, requirements-docs.txt, skills/**/SKILL.md)

**`docs/index.md`** — Stub landing page

### Verify
```bash
pip install -r requirements-docs.txt
mkdocs serve
```

## Phase 1: Content Migration

**Goal:** All existing prose on the site. Skills tab has stubs.

### Copy (not move) existing files

Source files stay in place — consumed by skills, commands, AGENTS.md, Claude plugin.

| Source | Destination |
|--------|-------------|
| `docs/getting-started.md` | `docs/getting-started/index.md` |
| `QUICKSTART.md` | `docs/getting-started/quickstart.md` |
| `docs/pm-skill-anatomy.md` | `docs/concepts/skill-anatomy.md` |
| `docs/agent-skill-anatomy.md` | `docs/concepts/agent-skill-anatomy.md` |
| `docs/pm-skill-lifecycle.md` | `docs/concepts/skill-lifecycle.md` |
| `docs/frameworks/triple-diamond-delivery-process.md` | `docs/concepts/triple-diamond.md` |
| `docs/reference/*` | Keep paths |
| `docs/guides/*` | Keep paths (rename authoring → creating-skills) |
| `CONTRIBUTING.md` | `docs/contributing/index.md` |
| `CODE_OF_CONDUCT.md` | `docs/contributing/code-of-conduct.md` |
| `SECURITY.md` | `docs/contributing/security.md` |
| `PRIVACY.md` | `docs/contributing/privacy.md` |
| `CHANGELOG.md` | `docs/changelog.md` |
| `_workflows/*.md` | `docs/workflows/` |
| `docs/releases/Release_v*.md` | Keep paths, add index page |

### README.md split

Extract into `docs/index.md`: hero section (The Big Idea), Key Features, Skill Lifecycle Tools, compatibility table, quick start snippet. Link to other pages rather than duplicating.

### Create stub index pages

- `docs/getting-started/index.md`
- `docs/concepts/index.md`
- `docs/guides/index.md`
- `docs/contributing/index.md`
- `docs/workflows/index.md`
- `docs/releases/index.md`
- `docs/skills/index.md` + `docs/skills/{phase}/index.md` (8 phase stubs)

## Phase 1.5: Skill Page Generation Script

**Goal:** All 29 skill pages generated from SKILL.md + TEMPLATE.md + EXAMPLE.md triplets.

### Script: `scripts/generate-skill-pages.py`

**Algorithm per skill:**
1. Parse SKILL.md frontmatter (regex, no pyyaml dependency)
2. Classify: `phase:` → domain, `classification: foundation/utility` → non-domain
3. Extract sections by `## ` heading
4. Read TEMPLATE.md and EXAMPLE.md content
5. Assemble merged page:

```markdown
---
title: "{display_name}"
description: "{description}"
tags:
  - {Phase or Classification}
  - {category}
---

# {Title}

!!! info "Quick facts"
    **Phase:** {phase} | **Version:** {version} | **Category:** {category}

{Intro paragraph}

## When to Use
{content}

## When NOT to Use  ← only if present (utility skills)
{content}

## How to Use

`/{command-name} "Your context here"`

## Instructions
{content}

## Output Template
{Full TEMPLATE.md content}

## Example Output
??? example "Complete example"
    {Full EXAMPLE.md content, indented}

## Quality Checklist
{content}
```

**Also generates:**
- Phase index pages (8) with skill tables
- Main skills index page
- Commands reference page (single table, not 30 thin pages)
- Nav YAML snippet for mkdocs.yml

**Edge cases:**
- Utility skills: include When NOT to Use, preserve interactive workflow structure
- HTML comment before frontmatter (`<!-- PM-Skills | ... -->`)
- TEMPLATE.md has its own frontmatter — preserve as content, don't parse as MkDocs frontmatter
- EXAMPLE.md sizes range from 58 to 367 lines — collapsible admonition handles all

**Run in CI:** Execute in `deploy-docs.yml` before `mkdocs build`. Generated pages not checked into git.

## Phase 2: Polish (Deferred)

- Landing page with Material grid cards
- git-revision-date-localized plugin
- Social cards (cairo system deps in CI)
- Tags plugin + tags.md
- Custom CSS (`docs/stylesheets/extra.css`)
- Versioning concepts page (public version of skill-versioning.md)
- Blog for releases (optional)
- `overrides/` directory for customization

## Key Design Decisions

1. **Copy, not move** — source files stay in place for backward compatibility
2. **Generate skill pages** — 29 x 3 files is too much manual work; script keeps them in sync
3. **Run generator in CI** — no generated files in git
4. **Simple releases section** — avoid blog plugin complexity for v1
5. **No fake install tabs** — pm-skills is git clone / ZIP, not a package manager install
6. **No related skills grid** — effort brief hardcodes nonexistent names; omit for v1
7. **Minimal requirements** — only mkdocs-material + pillow + cairosvg for v1

## Session Breakdown

| Session | Scope | Deliverable |
|---------|-------|-------------|
| 1 | Phase 0 + Phase 1 start | Site deployed with landing + migrated prose |
| 2 | Phase 1.5 | Generation script + 29 skill pages |
| 3 | Phase 1 completion | README split, cross-links, final review |
| 4+ | Phase 2 | Polish, advanced features |

## Verification

1. `mkdocs serve` renders with no build warnings
2. All 29 skill pages render with correct sections
3. Navigation tabs work: Home, Getting Started, Skills, Workflows, Guides, Concepts, Contributing, Releases
4. Mermaid diagrams render
5. GitHub Actions deployment succeeds
6. Site accessible at `https://product-on-purpose.github.io/pm-skills/`
