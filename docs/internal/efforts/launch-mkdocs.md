# Launching a MkDocs Material docs site for pm-skills

**The pm-skills repo (27 AI agent skills for product managers) has rich content but no documentation site.** Every skill already ships with structured SKILL.md, TEMPLATE.md, and EXAMPLE.md files [GitHub](https://github.com/product-on-purpose/pm-skills) using YAML frontmatter — making automated migration to MkDocs Material straightforward. MkDocs Material v9.7.0 (its final feature release) has unlocked all previously paid Insiders features for free, [MkDocs Material](https://squidfunk.github.io/mkdocs-material/changelog/) meaning the full suite of social cards, privacy controls, tags, blog, and navigation features are available at zero cost. This plan covers repo analysis, complete configuration, deployment workflow, information architecture, content migration, SEO, and analytics — everything needed to go from zero to production in a single sprint.

---

## What the repo already gives you to work with

The repo at `github.com/product-on-purpose/pm-skills` contains **no existing mkdocs.yml** — documentation lives as standalone Markdown files rendered by GitHub. The good news: there's substantial, well-structured content ready for migration.

**Repository structure at a glance:**

| Directory/File | Content | Migration Effort |
|---|---|---|
| `skills/` (27 directories) | Each skill has `SKILL.md` + `TEMPLATE.md` + `EXAMPLE.md` | Medium — merge into single tabbed pages |
| `README.md` | Comprehensive (~2000+ words) covering features, compatibility, installation, skill tables | Split into 4-5 pages |
| `QUICKSTART.md` | Quick-start guide | Direct migration |
| `docs/getting-started.md` | Long-form onboarding guide | Direct migration |
| `docs/pm-skill-anatomy.md` | Skill structure reference | Direct migration |
| `commands/` (~28 files) | Slash command definitions | Batch migration |
| `_bundles/` (3 files) | Workflow bundles (Feature Kickoff, Lean Startup, Triple Diamond) | Direct migration |
| `CHANGELOG.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `SECURITY.md` | Standard open-source files | Direct migration |
| `docs/releases/Release_v*.md` | Per-version release notes | Blog or releases section |
| `docs/internal/` | Internal planning docs | **Do NOT migrate** |

Each skill follows a strict naming convention — `{phase}-{skill-name}` — across six Triple Diamond phases (discover, define, develop, deliver, measure, iterate) plus foundation and utility categories. [GitHub](https://github.com/product-on-purpose/pm-skills) Every SKILL.md contains YAML frontmatter with `name`, `description`, `license`, and `metadata.version`, [Agentskills](https://agentskills.io/specification) followed by six consistent sections: Purpose, Key Concepts, Application, Examples, Common Pitfalls, and References. [GitHub](https://github.com/deanpeters/Product-Manager-Skills/blob/main/docs/Using%20PM%20Skills%20with%20Claude.md) This consistency is a gift for templated migration.

---

## The complete mkdocs.yml configuration

MkDocs Material **9.7.0 is the final feature release** — the team has shifted to building Zensical, a next-gen static site generator. All previously Insiders-only features (social cards customization, privacy plugin, tags, blog, navigation.path breadcrumbs) are now free. [lecody](https://andrew.lecody.com/guides/mkdocs-material-insider-github-pages-action/) [MkDocs Material](https://squidfunk.github.io/mkdocs-material/blog/2025/11/11/insiders-now-free-for-everyone/) Maintenance and security updates are guaranteed through at least November 2026. [MkDocs Material](https://squidfunk.github.io/mkdocs-material/changelog/)

Here is the production-ready configuration file:

```yaml
# ===========================================================================
# mkdocs.yml — PM Skills Documentation Site
# ===========================================================================
site_name: PM Skills
site_url: https://product-on-purpose.github.io/pm-skills/
site_author: jprisant
site_description: >-
  27+ AI agent skills for product managers. Open-source, spec-compliant
  skills for Claude Code, Cursor, Codex CLI, GitHub Copilot, and more.
repo_name: product-on-purpose/pm-skills
repo_url: https://github.com/product-on-purpose/pm-skills
edit_uri: edit/main/docs/
copyright: >-
  Copyright &copy; 2026 product-on-purpose –
  <a href="#__consent">Cookie settings</a>

# ===========================================================================
# THEME
# ===========================================================================
theme:
  name: material
  custom_dir: overrides
  palette:
    - media: "(prefers-color-scheme)"
      toggle:
        icon: material/brightness-auto
        name: Switch to light mode
    - media: "(prefers-color-scheme: light)"
      scheme: default
      primary: indigo
      accent: deep purple
      toggle:
        icon: material/brightness-7
        name: Switch to dark mode
    - media: "(prefers-color-scheme: dark)"
      scheme: slate
      primary: black
      accent: deep purple
      toggle:
        icon: material/brightness-4
        name: Switch to system preference
  font:
    text: Inter
    code: JetBrains Mono
  icon:
    logo: material/robot-happy
    repo: fontawesome/brands/github
  favicon: assets/favicon.png
  language: en
  features:
    # Navigation
    - navigation.instant
    - navigation.instant.prefetch
    - navigation.instant.progress
    - navigation.tabs
    - navigation.tabs.sticky
    - navigation.sections
    - navigation.indexes
    - navigation.path
    - navigation.top
    - navigation.prune
    # Table of contents
    - toc.follow
    # Search
    - search.suggest
    - search.highlight
    - search.share
    # Header
    - header.autohide
    # Content
    - content.code.copy
    - content.code.annotate
    - content.tabs.link
    - content.tooltips
    - content.footnote.tooltips
    - content.action.edit
    - content.action.view

# ===========================================================================
# PLUGINS
# ===========================================================================
plugins:
  - search:
      separator: '[\s\-\.]+'
  - social:
      enabled: !ENV [CI, false]
  - tags:
      tags_file: tags.md
  - privacy:
      enabled: !ENV [CI, true]
  - optimize:
      enabled: !ENV [CI, false]
  - meta
  - blog:
      blog_dir: blog
      post_date_format: long
      post_url_format: "{slug}"
      post_readtime: true
      post_excerpt: optional
      archive: true
      categories: true
  - git-revision-date-localized:
      enabled: !ENV [CI, false]
      type: timeago
      enable_creation_date: true
      fallback_to_build_date: true

# ===========================================================================
# MARKDOWN EXTENSIONS
# ===========================================================================
markdown_extensions:
  # Python Markdown
  - abbr
  - admonition
  - attr_list
  - def_list
  - footnotes
  - md_in_html
  - tables
  - toc:
      permalink: true
      toc_depth: 3
  # PyMdown Extensions
  - pymdownx.betterem:
      smart_enable: all
  - pymdownx.caret
  - pymdownx.critic
  - pymdownx.details
  - pymdownx.emoji:
      emoji_index: !!python/name:material.extensions.emoji.twemoji
      emoji_generator: !!python/name:material.extensions.emoji.to_svg
  - pymdownx.highlight:
      anchor_linenums: true
      line_spans: __span
      pygments_lang_class: true
  - pymdownx.inlinehilite
  - pymdownx.keys
  - pymdownx.mark
  - pymdownx.smartsymbols
  - pymdownx.snippets
  - pymdownx.superfences:
      custom_fences:
        - name: mermaid
          class: mermaid
          format: !!python/name:pymdownx.superfences.fence_code_format
  - pymdownx.tabbed:
      alternate_style: true
      slugify: !!python/object/apply:pymdownx.slugs.slugify
        kwds:
          case: lower
  - pymdownx.tasklist:
      custom_checkbox: true
  - pymdownx.tilde

# ===========================================================================
# EXTRA
# ===========================================================================
extra:
  social:
    - icon: fontawesome/brands/github
      link: https://github.com/product-on-purpose/pm-skills
  consent:
    title: Cookie consent
    description: >-
      We use cookies to recognize your repeated visits and preferences, and
      to measure the effectiveness of our documentation. With your consent,
      you help us improve.
    actions:
      - accept
      - reject
      - manage

extra_css:
  - stylesheets/extra.css

# ===========================================================================
# NAVIGATION
# ===========================================================================
nav:
  - Home:
    - index.md
    - changelog.md
    - Tags: tags.md

  - Getting Started:
    - getting-started/index.md
    - Quickstart: getting-started/quickstart.md
    - Platform setup: getting-started/platform-setup.md
    - Your first skill: getting-started/first-skill.md
    - Chaining skills: getting-started/chaining-skills.md

  - Skills:
    - skills/index.md
    - Discover:
      - skills/discover/index.md
      # One .md per discover-* skill
    - Define:
      - skills/define/index.md
      # One .md per define-* skill
    - Develop:
      - skills/develop/index.md
      # One .md per develop-* skill
    - Deliver:
      - skills/deliver/index.md
      # One .md per deliver-* skill
    - Measure:
      - skills/measure/index.md
      # One .md per measure-* skill
    - Iterate:
      - skills/iterate/index.md
      # One .md per iterate-* skill
    - Foundation:
      - skills/foundation/index.md
    - Utility:
      - skills/utility/index.md

  - Bundles:
    - bundles/index.md
    - Feature Kickoff: bundles/feature-kickoff.md
    - Lean Startup: bundles/lean-startup.md
    - Triple Diamond: bundles/triple-diamond.md

  - Guides:
    - guides/index.md
    - Installing skills: guides/installation.md
    - Customizing skills: guides/customization.md
    - Creating a skill: guides/creating-skills.md
    - Team setup: guides/team-setup.md
    - Troubleshooting: guides/troubleshooting.md
    - FAQ: guides/faq.md

  - Concepts:
    - concepts/index.md
    - What are agent skills: concepts/agent-skills.md
    - Skill anatomy: concepts/skill-anatomy.md
    - The Triple Diamond: concepts/triple-diamond.md
    - Platform differences: concepts/platforms.md
    - Skills vs MCP: concepts/skills-vs-mcp.md

  - Contributing:
    - contributing/index.md
    - Skill guidelines: contributing/guidelines.md
    - Skill template: contributing/template.md
    - Code of conduct: contributing/code-of-conduct.md
    - Security: contributing/security.md

  - Blog:
    - blog/index.md
```

**Critical gotchas to avoid:** You must explicitly list `- search` under plugins (it's not auto-included once you define any plugins). The `pymdownx.tabbed` extension requires `alternate_style: true` or tabs render incorrectly. The Mermaid custom fence under `pymdownx.superfences` is mandatory for diagram rendering. [MkDocs Material](https://squidfunk.github.io/mkdocs-material/setup/extensions/python-markdown-extensions/) The palette must be a YAML list (not a single dict) for the dark/light toggle to appear. [MkDocs Material](https://squidfunk.github.io/mkdocs-material/setup/changing-the-colors/) The `site_url` must be set — social cards, sitemap, instant navigation, and canonical URLs all depend on it. [MkDocs Material +2](https://squidfunk.github.io/mkdocs-material/setup/setting-up-navigation/)

---

## GitHub Actions deployment in one workflow file

The **`mkdocs gh-deploy`** approach is the officially recommended method. It's simpler, uses a single CI job, and is the only approach compatible with mike versioning if you ever need it. The newer `actions/deploy-pages` approach avoids creating a `gh-pages` branch but doesn't work with mike and requires more complex YAML.

**File: `.github/workflows/deploy-docs.yml`**

```yaml
name: Deploy Documentation
on:
  push:
    branches: [main]
    paths:
      - 'docs/**'
      - 'mkdocs.yml'
      - 'requirements-docs.txt'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0    # Full history for git-revision-date plugin

      - name: Configure Git Credentials
        run: |
          git config user.name github-actions[bot]
          git config user.email 41898282+github-actions[bot]@users.noreply.github.com

      - uses: actions/setup-python@v5
        with:
          python-version: 3.x

      - run: echo "cache_id=$(date --utc '+%V')" >> $GITHUB_ENV

      - uses: actions/cache@v4
        with:
          key: mkdocs-material-${{ env.cache_id }}
          path: .cache
          restore-keys: |
            mkdocs-material-

      - name: Install system dependencies (for social cards)
        run: sudo apt-get install -y libcairo2-dev libfreetype6-dev libffi-dev libjpeg-dev libpng-dev libz-dev pngquant

      - name: Install Python dependencies
        run: pip install -r requirements-docs.txt

      - name: Deploy to GitHub Pages
        run: mkdocs gh-deploy --force
```

**File: `requirements-docs.txt`**

```
mkdocs-material>=9.6.0
mkdocs-git-revision-date-localized-plugin>=1.4.0
mkdocs-glightbox>=0.4.0
mkdocs-rss-plugin>=1.15.0
pillow>=10.0.0
cairosvg>=2.7.0
```

After the first deployment, go to **Settings → Pages → Source** and select "Deploy from a branch" with branch `gh-pages` and folder `/ (root)`. The `--force` flag ensures clean deployments every time. [GitHub](https://github.com/squidfunk/mkdocs-material/blob/master/docs/publishing-your-site.md) The weekly cache key (`%V`) balances freshness with build speed. [MkDocs Material](https://squidfunk.github.io/mkdocs-material/publishing-your-site/) The `paths` filter avoids triggering deploys for non-docs changes.

**Mike versioning is unnecessary here.** It's designed for software libraries maintaining multiple API versions simultaneously. A skills catalog has one current version. Skip mike entirely and add it later if the need arises.

---

## Information architecture built on Diataxis and the Triple Diamond

The navigation structure maps the **Diataxis framework** (tutorials, how-to guides, reference, explanation) onto MkDocs Material's tab-based navigation, while organizing the 27 skills by their existing Triple Diamond phase prefixes.

**Top-level tabs and their Diataxis roles:**

| Tab | Diataxis Type | Content |
|---|---|---|
| **Home** | — | Landing page hero, key features, compatibility grid |
| **Getting Started** | Tutorials | Learning-oriented walkthroughs from zero to working |
| **Skills** | Reference | The browsable catalog — one page per skill |
| **Bundles** | Reference | The 3 workflow bundles with linked skills |
| **Guides** | How-to | Task-oriented guides for specific goals |
| **Concepts** | Explanation | Understanding-oriented content about the "why" |
| **Contributing** | How-to | Contributor onboarding and templates |
| **Blog** | — | Releases, announcements, changelog posts |

The skills catalog uses `navigation.indexes` so each phase folder (`skills/discover/`, `skills/deliver/`, etc.) has an `index.md` landing page displaying grid cards for all skills in that phase. The `.meta.yml` file in each phase directory auto-applies phase tags to all pages within it, eliminating repetitive frontmatter. [MkDocs Material](https://squidfunk.github.io/mkdocs-material/plugins/meta/)

**Per-skill page template** — each skill page merges SKILL.md, TEMPLATE.md, and EXAMPLE.md into a single page with content tabs:

```markdown
---
title: "deliver-prd"
description: "Generate a comprehensive PRD with problem statement, metrics, user stories, and technical considerations."
tags:
  - Deliver
  - PRD
  - Documentation
---

# deliver-prd

!!! info "Quick facts"
    **Phase:** Deliver · **Version:** 2.6 · **License:** Apache-2.0

Short description of what this skill does and when to use it.

## Installation

=== "Claude Code"
    ```bash
    claude install product-on-purpose/pm-skills
    ```

=== "Cursor"
    Copy `skills/deliver-prd/` to your project's `.cursor/skills/` directory.

=== "Codex CLI"
    ```bash
    codex install product-on-purpose/pm-skills
    ```

=== "GitHub Copilot"
    Reference via `AGENTS.md` auto-discovery.

=== "Manual"
    Download the latest release ZIP and extract to your project root.

## Purpose
<!-- Content from SKILL.md Purpose section -->

## Key concepts
<!-- Content from SKILL.md Key Concepts section -->

## Application
<!-- Content from SKILL.md Application section -->

## Output template
<!-- Content from TEMPLATE.md -->

## Example output
<!-- Content from EXAMPLE.md, in a collapsible admonition -->
??? example "Complete example"
    <!-- Full EXAMPLE.md content -->

## Common pitfalls
<!-- Content from SKILL.md Common Pitfalls section -->

## Related skills

<div class="grid cards" markdown>
- :material-magnify: **discover-opportunity**
  ---
  Feeds discovery findings into this PRD
  [:octicons-arrow-right-24: View](../discover/discover-opportunity.md)

- :material-format-list-checks: **define-user-story**
  ---
  Break PRD requirements into user stories
  [:octicons-arrow-right-24: View](../define/define-user-story.md)
</div>
```

The **`content.tabs.link`** feature ensures that when a user selects "Cursor" on one skill page, every other skill page remembers that selection — critical for a multi-platform catalog. [MkDocs Material](https://squidfunk.github.io/mkdocs-material/reference/content-tabs/) [Diataxis](https://diataxis.fr/) Use **identical tab labels** across all pages (`"Claude Code"`, `"Cursor"`, `"Codex CLI"`, `"GitHub Copilot"`, `"Manual"`) since linking is label-based. [MkDocs Material](https://squidfunk.github.io/mkdocs-material/reference/content-tabs/)

---

## Content migration strategy: what moves where

The migration has three tiers of effort. **Tier 1 (direct copy)** involves files that need only minor path adjustments. **Tier 2 (restructure)** requires splitting or merging. **Tier 3 (create new)** requires writing new content to fill the Diataxis framework.

**Tier 1 — Direct migration (Day 1-2):**

- `QUICKSTART.md` → `docs/getting-started/quickstart.md`
- `docs/getting-started.md` → `docs/getting-started/index.md`
- `docs/pm-skill-anatomy.md` → `docs/concepts/skill-anatomy.md`
- `CONTRIBUTING.md` → `docs/contributing/index.md`
- `CODE_OF_CONDUCT.md` → `docs/contributing/code-of-conduct.md`
- `SECURITY.md` → `docs/contributing/security.md`
- `CHANGELOG.md` → `docs/changelog.md`
- `_bundles/*.md` → `docs/bundles/{name}.md` (3 files)
- `docs/templates/skill-template/` → `docs/contributing/template.md`
- `docs/releases/Release_v*.md` → `docs/blog/posts/` (as blog posts)

**Tier 2 — Merge/split (Day 2-3):**

- **Split README.md** into: `docs/index.md` (hero + features + compatibility), `docs/guides/faq.md` (FAQ section), `docs/concepts/platforms.md` (platform compatibility table), `docs/concepts/skills-vs-mcp.md` (comparison section)
- **Merge per-skill triplets**: For each of the 27 skills, combine `SKILL.md` + `TEMPLATE.md` + `EXAMPLE.md` into a single tabbed page using the template above. This is the most labor-intensive step but is highly scriptable — a Python script can read the YAML frontmatter, extract sections by heading, and generate the merged page.
- **Commands**: Evaluate whether the ~28 command files warrant individual pages or a single reference table. A reference table with expandable details is likely more useful than 28 thin pages.

**Tier 3 — New content (Day 3-5):**

- Category index pages (`skills/{phase}/index.md`) with grid cards — 8 new pages
- `docs/index.md` landing page with hero section and feature highlights
- `docs/guides/installation.md` — consolidated cross-platform installation guide
- `docs/guides/customization.md` — how to modify skill behavior
- `docs/guides/team-setup.md` — set