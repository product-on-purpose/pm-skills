# MkDocs Configuration and Deployment Guide

Status: Active
Owner: Maintainers
Created: 2026-04-04
Last updated: 2026-04-04

## Overview

The pm-skills documentation site is built with [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) and deployed to GitHub Pages. This document explains how everything fits together — from the source files in the repo to the live site at `https://product-on-purpose.github.io/pm-skills/`.

## How MkDocs Works

### The mental model

MkDocs is a static site generator. It takes markdown files as input and produces a folder of HTML, CSS, and JavaScript as output. MkDocs Material is a theme that makes the output look professional with features like search, tabbed navigation, dark mode, and mermaid diagram rendering.

```
┌─────────────────────┐         ┌──────────────────────┐
│  Source (main branch)│         │  Output (gh-pages)   │
│                      │  build  │                      │
│  docs/index.md       │ ──────► │  index.html          │
│  docs/concepts/*.md  │         │  concepts/index.html │
│  docs/skills/*.md    │         │  skills/index.html   │
│  mkdocs.yml          │         │  assets/ (CSS, JS)   │
│                      │         │  search/index.json   │
└─────────────────────┘         └──────────────────────┘
```

**Key point:** The source markdown stays on `main`. The built HTML goes to a separate `gh-pages` branch. GitHub Pages serves from `gh-pages`. You never edit `gh-pages` directly.

### What lives where

| Location | Branch | What it contains | Who edits it |
|----------|--------|-----------------|-------------|
| `docs/**` | `main` | Markdown source files for the site | You |
| `mkdocs.yml` | `main` | Site configuration (theme, nav, plugins, extensions) | You |
| `requirements-docs.txt` | `main` | Python dependencies for the build | You (rarely) |
| `.github/workflows/deploy-docs.yml` | `main` | CI workflow that builds and deploys | You (rarely) |
| `scripts/generate-skill-pages.py` | `main` | Script that generates skill pages from source SKILL.md files | You (when skill structure changes) |
| `site/` | not tracked | Local build output (gitignored) | `mkdocs build` |
| `gh-pages` branch | `gh-pages` | Built HTML served by GitHub Pages | CI only (never manual) |
| `.cache/` | not tracked | MkDocs privacy plugin font/asset cache (gitignored) | `mkdocs build` |

## The Build Process

### What happens when you push to main

1. **Trigger check**: The `deploy-docs.yml` workflow checks if the push changed any of these paths:
   - `docs/**` — any documentation file
   - `mkdocs.yml` — site configuration
   - `requirements-docs.txt` — Python dependencies
   - `skills/**/SKILL.md`, `skills/**/TEMPLATE.md`, `skills/**/EXAMPLE.md` — skill source files
   - `_bundles/**` — workflow bundle files

2. **Checkout**: Full git history is checked out (`fetch-depth: 0`) — this is needed if the `git-revision-date-localized` plugin is ever enabled (currently deferred).

3. **Python setup**: Installs Python 3.x and the dependencies from `requirements-docs.txt`.

4. **Cache**: Uses a weekly cache key (`%V` = ISO week number) for the `.cache/` directory. This caches downloaded fonts and assets from the privacy plugin, speeding up subsequent builds.

5. **Build and deploy**: `mkdocs gh-deploy --force` does three things:
   - Runs `mkdocs build` to generate HTML in a temp directory
   - Force-pushes the built HTML to the `gh-pages` branch
   - GitHub Pages automatically serves the updated content

### What `mkdocs gh-deploy --force` does under the hood

```
mkdocs build              # Generate HTML from docs/ + mkdocs.yml
                          # Output goes to a temp directory

git checkout gh-pages     # Switch to the deployment branch
rm -rf *                  # Clear old content
cp -r <temp>/* .          # Copy new build
git add -A                # Stage everything
git commit                # Commit with auto-generated message
git push --force          # Force push (history doesn't matter for builds)

git checkout main         # Switch back to main
```

The `--force` flag ensures a clean deployment every time. The `gh-pages` branch has no meaningful history — each deploy replaces the entire content.

### Running locally

To preview the site before pushing:

```bash
# Install dependencies (first time only)
pip install -r requirements-docs.txt

# Start local dev server with hot reload
mkdocs serve

# Opens at http://127.0.0.1:8000/pm-skills/
# Changes to docs/ files auto-reload in the browser
```

To build without serving (check for warnings):

```bash
mkdocs build

# Output goes to site/ (gitignored)
# Check console for WARNING lines — these indicate broken links
```

## Configuration: mkdocs.yml

The `mkdocs.yml` file is the single source of truth for the site's behavior. Here's what each section does.

### Site metadata

```yaml
site_name: PM Skills
site_url: https://product-on-purpose.github.io/pm-skills/
site_author: jprisant
site_description: >-
  29 AI agent skills for product managers...
repo_name: product-on-purpose/pm-skills
repo_url: https://github.com/product-on-purpose/pm-skills
edit_uri: edit/main/docs/
```

- `site_url` is critical — social cards, sitemap, canonical URLs, and the privacy plugin all depend on it. Without it, many features silently break.
- `edit_uri` enables the "edit this page" pencil icon on every page, linking directly to the source file on GitHub.
- `repo_url` adds a GitHub link/icon in the header.

### Theme configuration

```yaml
theme:
  name: material
  palette: [...]   # Light/dark/auto color schemes
  font:
    text: Inter
    code: JetBrains Mono
  features: [...]  # Navigation, search, content features
```

**Key features enabled:**

| Feature | What it does |
|---------|-------------|
| `navigation.instant` | Single-page-app behavior — clicks don't reload the page |
| `navigation.tabs` | Top-level nav items render as tabs (Home, Skills, Guides, etc.) |
| `navigation.tabs.sticky` | Tabs stay visible when scrolling |
| `navigation.sections` | Groups nav items under section headers in the sidebar |
| `navigation.indexes` | Section index pages (e.g., `skills/index.md` is the Skills tab landing) |
| `navigation.path` | Shows breadcrumb navigation |
| `navigation.top` | "Back to top" button |
| `navigation.prune` | Only renders visible nav items (performance) |
| `toc.follow` | Table of contents highlights the current section |
| `search.suggest` | Search autocomplete |
| `search.highlight` | Highlights search terms on the target page |
| `content.code.copy` | Copy button on code blocks |
| `content.tabs.link` | Linked tabs — selecting "Claude Code" on one page remembers it everywhere |
| `content.action.edit` | "Edit this page" button linking to GitHub |

### Plugins

```yaml
plugins:
  - search:
      separator: '[\s\-\.]+'
  - privacy:
      enabled: !ENV [CI, true]
```

- **search**: Built-in full-text search. The custom separator ensures hyphenated skill names (like `deliver-prd`) are searchable by individual words.
- **privacy**: Downloads external assets (fonts, scripts) and serves them locally. This avoids third-party requests from the site, improving privacy and load time. Enabled by default, but the `!ENV` syntax lets you disable it locally if needed.

**Plugins not yet enabled (Phase 2):**

| Plugin | Why deferred | What it does |
|--------|-------------|-------------|
| `social` | Requires system-level Cairo library in CI | Generates OpenGraph social card images for link previews |
| `tags` | Needs a `tags.md` page and tag taxonomy | Adds tag-based browsing and filtering |
| `blog` | Adds complexity; simple releases section works for now | Converts release notes into blog posts with dates and categories |
| `git-revision-date-localized` | Requires `fetch-depth: 0` in CI | Shows "last updated" dates on each page |
| `optimize` | Not needed at current scale | Compresses images and assets |
| `meta` | Not needed until `.meta.yml` files are used | Auto-applies frontmatter to pages in a directory |

### Markdown extensions

The extensions control what markdown syntax is available in documentation files.

**Essential for pm-skills:**

| Extension | What it enables | Example |
|-----------|----------------|---------|
| `admonition` + `pymdownx.details` | Collapsible info/warning/example boxes | `!!! info "Title"` and `??? example "Title"` (collapsible) |
| `pymdownx.superfences` (with mermaid fence) | Mermaid diagram rendering | ` ```mermaid ` code blocks |
| `pymdownx.tabbed` | Content tabs | `=== "Tab 1"` / `=== "Tab 2"` |
| `pymdownx.highlight` | Syntax-highlighted code blocks | Automatic language detection |
| `pymdownx.tasklist` | Checkbox lists | `- [x] Done` / `- [ ] Todo` |
| `toc` with `permalink: true` | Linkable section headers | Anchor icon on hover |
| `attr_list` + `md_in_html` | Custom attributes and HTML in markdown | Grid cards, badges |

### Navigation (nav)

The `nav` section in `mkdocs.yml` defines the site's navigation structure explicitly. MkDocs renders this as tabs (top level) with sidebar sections (nested levels).

```yaml
nav:
  - Home:           # Tab
    - index.md      # Tab landing page
    - changelog.md

  - Skills:         # Tab
    - skills/index.md
    - Discover:     # Sidebar section
      - skills/discover/index.md
      - skills/discover/discover-competitive-analysis.md
      ...
```

**How nav maps to the UI:**

- Top-level items → **tabs** in the header
- Second-level items → **sidebar sections** with collapsible groups
- `index.md` files → **section landing pages** (enabled by `navigation.indexes` feature)

**When nav and files disagree:** If a file exists in `docs/` but isn't listed in `nav`, MkDocs builds it but shows an INFO message. It won't appear in navigation but is still accessible by direct URL. The `exclude_docs` setting prevents files from being built at all.

### Excluded files

```yaml
exclude_docs: |
  internal/
  agent-skill-anatomy.md
  pm-skill-anatomy.md
  pm-skill-lifecycle.md
  getting-started.md
  guides/authoring-pm-skills.md
```

- `internal/` — governance docs that should never appear on the public site
- The individual files — these are the **originals** that have **copies** in the MkDocs tree (e.g., `docs/pm-skill-anatomy.md` is copied to `docs/concepts/skill-anatomy.md`). Without excluding the originals, MkDocs would build both, causing duplicate content and broken-link warnings.

## Skill Page Generation

### Why a script?

The repo has 29 skills, each with 3 files (SKILL.md, TEMPLATE.md, EXAMPLE.md = 87 files). Writing 29 individual MkDocs pages by hand would be tedious and unmaintainable. The generation script reads the source files and produces merged pages automatically.

### How it works

**Script:** `scripts/generate-skill-pages.py`

```
Input:  skills/{phase}-{name}/SKILL.md + references/TEMPLATE.md + references/EXAMPLE.md
Output: docs/skills/{phase}/{phase}-{name}.md (one merged page per skill)
        docs/skills/{phase}/index.md (one index page per phase)
        docs/reference/commands.md (single commands reference table)
```

**Per-skill page structure:**

1. **Frontmatter** — title, description, tags (for future tagging)
2. **Quick facts admonition** — phase, version, category, license
3. **When to Use** section (from SKILL.md)
4. **When NOT to Use** section (utility skills only, from SKILL.md)
5. **How to Use** — slash command invocation
6. **Instructions** (from SKILL.md)
7. **Output Template** — full TEMPLATE.md content inline
8. **Example Output** — full EXAMPLE.md in a collapsible `??? example` admonition
9. **Quality Checklist** (from SKILL.md)

### Running the script

```bash
python scripts/generate-skill-pages.py
```

Output:
```
Generated 29 skill pages
  Discover: 3 skills
  Define: 4 skills
  ...
Generated commands reference page

# === NAV SNIPPET FOR mkdocs.yml ===
(paste this into mkdocs.yml under the Skills tab)
```

The script also prints a nav YAML snippet that can be pasted into `mkdocs.yml` to keep the navigation in sync.

### When to re-run

- After adding a new skill
- After changing a skill's SKILL.md, TEMPLATE.md, or EXAMPLE.md
- After changing skill frontmatter (name, description, version, phase)

**Future improvement:** Add the script to the CI workflow so generated pages are always in sync. Currently the generated pages are checked into the branch, so the script needs to be run manually and committed.

## GitHub Pages Configuration

### One-time setup

1. Go to **Settings → Pages** on the GitHub repo
2. Under **Source**, select **Deploy from a branch**
3. Set branch to **`gh-pages`**, folder to **`/ (root)`**
4. Save

### How deployment flows

```
You push to main
    │
    ▼
deploy-docs.yml triggers (if docs/skills/mkdocs paths changed)
    │
    ▼
CI installs Python + mkdocs-material
    │
    ▼
mkdocs gh-deploy --force
    │
    ├─► Builds HTML from docs/ + mkdocs.yml
    │
    └─► Force-pushes to gh-pages branch
            │
            ▼
        GitHub Pages serves from gh-pages
            │
            ▼
        https://product-on-purpose.github.io/pm-skills/
```

### What triggers a deploy

| Change | Triggers deploy? | Why |
|--------|-----------------|-----|
| Edit `docs/**/*.md` | Yes | Documentation content changed |
| Edit `mkdocs.yml` | Yes | Site config changed |
| Edit `requirements-docs.txt` | Yes | Build dependencies changed |
| Edit `skills/**/SKILL.md` | Yes | Skill content changed (need to regenerate pages) |
| Edit `_bundles/**` | Yes | Bundle content changed |
| Edit `README.md` | No | README is not part of the MkDocs source |
| Edit `scripts/*.py` | No | Script changes don't affect the site unless run |
| Edit `.github/workflows/*.yml` | No (unless it's deploy-docs.yml) | Other workflows are independent |
| Manual trigger | Yes | `workflow_dispatch` allows manual deploy from GitHub Actions |

### The `gh-pages` branch

- Auto-created by `mkdocs gh-deploy` on first run
- Contains only built HTML, CSS, JS, and assets
- Has no meaningful git history (force-pushed on every deploy)
- Should never be manually edited or merged into
- If corrupted, delete the branch and re-run the deploy workflow

## File Relationship Diagram

```
main branch                              gh-pages branch
┌────────────────────────────┐          ┌──────────────────────┐
│ mkdocs.yml (config)        │          │ index.html           │
│ requirements-docs.txt      │          │ skills/              │
│ docs/                      │  build   │   discover/          │
│   index.md                 │ ──────►  │   define/            │
│   concepts/                │          │   ...                │
│   skills/ (generated)      │          │ concepts/            │
│   guides/                  │          │ guides/              │
│   bundles/                 │          │ assets/              │
│   releases/                │          │ search/index.json    │
│   ...                      │          │ sitemap.xml          │
│ skills/ (source)           │          └──────────────────────┘
│   deliver-prd/SKILL.md     │
│   ...                      │
│ scripts/                   │
│   generate-skill-pages.py  │
└────────────────────────────┘
```

**The source `skills/` directory** (at repo root) contains the canonical skill files consumed by AI agents. The **generated `docs/skills/` pages** are derived copies for the documentation site. Both coexist — the source files are the single source of truth.

## Common Tasks

### Preview locally before pushing

```bash
mkdocs serve
# Opens http://127.0.0.1:8000/pm-skills/
```

### Check for broken links

```bash
mkdocs build 2>&1 | grep "^WARNING"
# Zero warnings = all links resolve
```

### Add a new skill to the site

1. Create the skill in `skills/{phase}-{name}/` as usual
2. Run `python scripts/generate-skill-pages.py`
3. Copy the nav snippet from the script output
4. Paste into `mkdocs.yml` under the appropriate phase
5. Run `mkdocs build` to verify
6. Commit the generated page + updated mkdocs.yml

### Force a manual deploy

Go to **Actions → Deploy Documentation → Run workflow** on GitHub, or:

```bash
gh workflow run deploy-docs.yml
```

### Rebuild after theme or config changes

```bash
mkdocs build --clean
# --clean removes the old site/ directory first
```

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `mkdocs-material` | >=9.6.0 | Theme with all Material features (search, tabs, dark mode, mermaid, etc.) |
| `pillow` | >=10.0.0 | Image processing (required by social cards plugin, even when disabled) |
| `cairosvg` | >=2.7.0 | SVG rendering (required by social cards plugin, even when disabled) |

**Note on MkDocs Material v9.7.0:** This is the final feature release. All previously paid Insiders features (social cards, privacy, tags, blog, navigation.path) are now free. The team has shifted to building Zensical (next-gen SSG). Maintenance and security updates continue through at least November 2026.

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Site shows README.md instead of docs site | Pages configured to serve from `main` branch instead of `gh-pages` | Settings → Pages → Source → `gh-pages` branch, `/` root |
| `<h4 align="center">` visible as text | HTML tags from README rendering in MkDocs (which strips GitHub-specific HTML) | This means Pages is serving the wrong branch |
| Warnings about broken links | Copied files have relative paths from their original location | Fix the relative paths in the copies, not the originals |
| `exclude_docs` not working | Typo in path or missing trailing `/` for directories | Check `mkdocs.yml` exclude_docs syntax |
| Local `mkdocs serve` fails | Missing Python dependencies | Run `pip install -r requirements-docs.txt` |
| Deploy workflow doesn't trigger | Push didn't change any watched paths | Check the `paths:` filter in `deploy-docs.yml` |
| Social cards not generating | Cairo system libraries not installed in CI | Add `apt-get install libcairo2-dev...` step (deferred to Phase 2) |
| Mermaid diagrams not rendering | Missing custom fence config | Ensure `pymdownx.superfences` has the mermaid fence in mkdocs.yml |
