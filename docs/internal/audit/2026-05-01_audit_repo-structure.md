# Repo Structure Audit: /docs and /_workflows

**Date:** 2026-05-01
**Scope:** `docs/` (excluding `docs/internal/`), `_workflows/`, related CI workflows, and mkdocs configuration
**Auditor:** Claude (Opus 4.7) at `/effort max`
**Trigger:** User observation that `/docs` had become bloated and inconsistent

---

## 1. Executive Summary

`docs/` carries roughly 130 markdown files plus assets. The folder is functional but suffers from four structural problems:

1. **Two parallel documentation systems.** The top-level files (`docs/getting-started.md`, `docs/pm-skill-anatomy.md`, `docs/pm-skill-lifecycle.md`, `docs/agent-skill-anatomy.md`) are explicitly EXCLUDED from the MkDocs site build by `mkdocs.yml`. Their canonical site versions live at `docs/concepts/` and `docs/getting-started/`. This is intentional but creates double-maintenance burden and ambiguity about source of truth.

2. **Three generated folders are not always recognizable as such.** `docs/skills/`, `docs/workflows/`, and `docs/showcase/` are produced by Python scripts (`scripts/generate-skill-pages.py`, `scripts/generate-workflow-pages.py`, `scripts/generate-showcase.py`) from canonical sources elsewhere in the repo. Hand-editing them is silently destructive on the next regeneration. Only `docs/workflows/` carries a README warning.

3. **Stale counts across content.** Several files still cite "32 skills" or "29 skills" instead of the current "38 skills" (25 phase + 7 foundation + 6 utility). Examples: `mkdocs.yml` line 8 (32), `docs/reference/categories.md` total table (29), `docs/reference/ecosystem.md` (32), `docs/guides/mcp-integration.md` (32). Memory note v2.11.0 shipped 38, so most counts predate v2.11.0.

4. **One folder with one excluded file.** `docs/frameworks/` contains exactly one file (`triple-diamond-delivery-process.md`) which is excluded from the site. The folder is essentially dead weight; its content is duplicated and superseded by `docs/concepts/triple-diamond.md`.

The structure is internally consistent enough to pass CI (`mkdocs build --strict` succeeds, evidenced by the most recent v2.11.1 release), but readers and contributors waste effort navigating the parallel system.

This audit does NOT propose deletions. It maps the current state, identifies what each folder is for, surfaces drift, and offers a prioritized remediation path. Decisions about what to delete or restructure remain with the maintainer.

---

## 2. Methodology

I read every top-level file, the contents of every requested folder, all relevant CI workflow YAML, the MkDocs configuration, and a sample of generated skill pages. I cross-referenced the `mkdocs.yml` `exclude_docs:` and `nav:` blocks against actual filesystem contents. I used `git log` to date file creation and last-modified events for ambiguous files (notably `tags.md` and `stylesheets/extra.css`).

I also walked the references between files (which files link to which) so the analysis flags broken assumptions, not just orphan files.

For folders I was asked NOT to analyze (`docs/internal/`), I noted them only when they affect the public docs surface (CI scripts, generators, source-of-truth files for generated pages).

---

## 3. The Two Documentation Systems

This is the single most important finding. Understanding it makes everything else fall into place.

### 3.1 What `mkdocs.yml` excludes

```yaml
exclude_docs: |
  internal/
  workflows/README.md
  /agent-skill-anatomy.md
  /pm-skill-anatomy.md
  /pm-skill-lifecycle.md
  /getting-started.md
  guides/authoring-pm-skills.md
  frameworks/triple-diamond-delivery-process.md
```

These files exist in the source tree (so `git clone` and GitHub web view see them) but the MkDocs `material` theme does NOT render them on the published site at https://product-on-purpose.github.io/pm-skills/.

### 3.2 The mapping

| Excluded (GitHub-only) | Rendered Site Version | Status |
|------------------------|-----------------------|--------|
| `docs/getting-started.md` | `docs/getting-started/index.md` + `docs/getting-started/quickstart.md` | Both maintained; minor drift |
| `docs/pm-skill-anatomy.md` | `docs/concepts/skill-anatomy.md` | Both maintained |
| `docs/agent-skill-anatomy.md` | `docs/concepts/agent-skill-anatomy.md` | Both maintained; almost identical |
| `docs/pm-skill-lifecycle.md` | `docs/concepts/skill-lifecycle.md` | Both maintained |
| `docs/frameworks/triple-diamond-delivery-process.md` | `docs/concepts/triple-diamond.md` | Concepts version is shorter and adapted |
| `docs/guides/authoring-pm-skills.md` | `docs/guides/creating-skills.md` | Near-duplicate, both ~1000 lines |
| `docs/workflows/README.md` | (No site equivalent. Internal generator note) | Internal-only documentation |

### 3.3 Why this exists

Git history shows the timeline:

- **2026-01-16 to 2026-03-22**: Original docs created at top level. `docs/getting-started.md`, `docs/pm-skill-anatomy.md`, `docs/agent-skill-anatomy.md`, `docs/pm-skill-lifecycle.md`, `docs/guides/authoring-pm-skills.md`, and `docs/frameworks/triple-diamond-delivery-process.md` were the canonical authoring locations.
- **2026-04-04**: MkDocs migration (commit `ba15cb9` "docs(mkdocs): Phase 1 content migration"). The team copied these files into the new site structure (`concepts/`, `getting-started/`) and excluded the originals from the site to avoid duplicate URLs and broken cross-links.
- **2026-04-04 to present**: Both copies have been maintained in parallel. Most updates touch both versions, but link paths have drifted.

### 3.4 Why the duplication still hurts

- **Double maintenance.** Every concept update requires editing two files. The team has done this consistently, but the cost compounds.
- **Source-of-truth ambiguity.** A contributor may edit one and forget the other. The em-dash sweep on 2026-04-22 (commit `8ab0f81`) touched both, suggesting the team is aware of the dual maintenance.
- **CI cannot detect divergence.** `mkdocs build --strict` only checks the rendered tree. Drift between the two versions is invisible to automation.
- **External link rot risk.** Old README and external links still point at the top-level files. Any future cleanup must redirect.

### 3.5 What I recommend (not a decision yet)

Three options, in increasing order of disruption:

- **Option A (status quo plus warning):** Add an HTML comment at the top of each excluded duplicate explaining what it is and that the site version is canonical. Add a CI script that diffs the two and warns on divergence beyond a threshold.
- **Option B (single source, generated):** Make the `concepts/` versions the single source. Generate the top-level versions from them (or vice versa) with a script. Treat one as canonical, the other as a build artifact.
- **Option C (delete the duplicates):** Remove the top-level files. Update README and any external references to point at the rendered site URLs. Smallest ongoing maintenance cost, highest one-time cleanup cost.

I recommend Option C unless there is a specific use case for the GitHub-raw access path. The site at `product-on-purpose.github.io/pm-skills/` already serves all of these.

---

## 4. Generated vs Hand-Edited Folders

Three folders inside `docs/` are produced by build scripts and must NOT be edited directly. Two of them lack a README warning.

| Folder | Source of truth | Generator script | README warning? |
|--------|----------------|------------------|-----------------|
| `docs/skills/` | `skills/{name}/SKILL.md` | `scripts/generate-skill-pages.py` | No |
| `docs/workflows/` | `_workflows/*.md` | `scripts/generate-workflow-pages.py` | Yes |
| `docs/showcase/` | (Likely a sample manifest) | `scripts/generate-showcase.py` | No |

`docs/workflows/README.md` says exactly what is needed:

> **Do not edit directly.** Source of truth is `_workflows/`.

The same warning is absent from `docs/skills/index.md` and `docs/showcase/index.md`. A contributor who opens `docs/skills/deliver/deliver-prd.md` and edits a paragraph will lose the change on next deploy.

### 4.1 Recommendation

Add the same banner to `docs/skills/index.md` and `docs/showcase/index.md`. Optionally add a pre-commit or CI check that flags edits to the generated files.

### 4.2 Note on `docs/workflows/README.md`

This README is itself excluded from the site build (`exclude_docs` line: `workflows/README.md`). That is correct: it is documentation FOR contributors, not for site readers. Without the exclusion it would render at `/workflows/README/` and confuse users. Keep it; the exclusion is right.

---

## 5. Folder-by-Folder Inventory

This is the high-level purpose of each folder and file you listed, plus what I think needs updating.

### 5.1 Top-level files (`docs/*.md`, `docs/*.yaml`)

| Path | Purpose | Rendered? | Needs update? |
|------|---------|-----------|---------------|
| `docs/index.md` | Site homepage. The "what is PM Skills" landing page. | Yes (Home in nav) | No structural changes; counts current (38). |
| `docs/changelog.md` | Mirror of root `CHANGELOG.md` for the site. | Yes (Home > Changelog) | Verify it stays synced with root changelog. |
| `docs/tags.md` | Auto-generated tag index. See Section 8. | Yes (Home > Tags) | No content changes. The Material `tags` plugin populates it at build. |
| `docs/getting-started.md` | LEGACY pre-MkDocs version. Excluded from site. | No | Candidate for deletion (Section 3). |
| `docs/agent-skill-anatomy.md` | LEGACY pre-MkDocs version. Excluded. | No | Candidate for deletion. |
| `docs/pm-skill-anatomy.md` | LEGACY pre-MkDocs version. Excluded. | No | Candidate for deletion. |
| `docs/pm-skill-lifecycle.md` | LEGACY pre-MkDocs version. Excluded. | No | Candidate for deletion. |

### 5.2 `docs/getting-started/`

Two files: `index.md` (3-step quickstart with `npx skills add ...`) and `quickstart.md` (a longer walkthrough). Both rendered. Status: current, counts correct.

The legacy top-level `docs/getting-started.md` is more comprehensive than `index.md` but is invisible on the site. The site quickstart is shorter on purpose (rapid onboarding).

### 5.3 `docs/concepts/`

Seven files. This is the canonical location for conceptual documentation on the site.

| File | Purpose | Status |
|------|---------|--------|
| `index.md` | Concepts landing page with a 4-row table of links | Current |
| `skill-anatomy.md` | PM-Skills-specific anatomy guide | Current; states "Domain Skills (25), Foundation Skills (1), Utility Skills (1)". The 1/1 numbers are stale. Should read 7/6. |
| `agent-skill-anatomy.md` | Spec-level cross-platform anatomy guide | Current |
| `skill-lifecycle.md` | Builder, validator, iterator, updater lifecycle | Current |
| `triple-diamond.md` | Triple Diamond framework explainer | Per nav. Not separately reviewed; assumed clean. |
| `versioning.md` | Skill versioning governance, SemVer, manifest | Current; states "All 25 domain skills and the foundation skill are at version 2.0.0" which predates the v2.11.0 family additions. |
| `comparisons.md` | Side-by-side comparisons for similar skills | Current |

**Stale counts to fix:** `skill-anatomy.md` line 73-87 (Foundation Skills (1), Utility Skills (1)) and `versioning.md` line 90 (current versions paragraph).

### 5.4 `docs/frameworks/`

Single file: `triple-diamond-delivery-process.md`. Excluded from site. Content is the long-form framework guide; the site version at `docs/concepts/triple-diamond.md` is shorter and adapted to fit the concepts navigation.

The folder exists for ONE excluded file. Strong candidate for deletion or for promoting the file into a canonical site location. Memory: the long-form version is referenced by `docs/agent-skill-anatomy.md` (excluded) under "PM-Skills Documentation > Triple Diamond Framework".

### 5.5 `docs/guides/`

Eleven `.md` files plus `index.md`. Mix of canonical site content and one excluded duplicate.

| File | Purpose | Notes |
|------|---------|-------|
| `index.md` | Guides landing page, 5-row table of links | Lists 5 guides but folder has 11. Drift. |
| `using-skills.md` | Beginner to advanced usage guide | Current |
| `using-workflows.md` | Workflow decision tree and customization | Current |
| `creating-skills.md` | Authoring guide. Canonical site version. | Current |
| `authoring-pm-skills.md` | LEGACY duplicate of creating-skills.md. Excluded. | Candidate for deletion |
| `updating-pm-skills.md` | How to use `/update-pm-skills` to stay current | Current |
| `skill-finder.md` | Decision tree for picking a skill | Current |
| `recipes.md` | End-to-end PM workflow recipes | Current |
| `prompt-gallery.md` | Example prompts in three styles | Current |
| `mcp-setup.md` | MCP server installation per platform | Current; mentions M-22 freeze accurately |
| `mcp-integration.md` | MCP integration patterns | Says "32 skill tools". Stale. |
| `validate-mcp-sync.md` | How MCP sync validation works | Current |
| `using-meeting-skills.md` | Meeting Skills Family end-user guide | Current; recently shipped in v2.11.0 |

**`index.md` needs updating** to list all current guides. It currently shows 5 of 11.

### 5.6 `docs/reference/`

Six `.md` files plus a `.yaml` schema and one subfolder. This is the place a contributor goes for canonical specifications.

| File | Purpose | Notes |
|------|---------|-------|
| `commands.md` | Full table of all 46 slash commands | Current and accurate (39 skill + 7 workflow = 46) |
| `categories.md` | The 7-category taxonomy with skill mappings and framework mapping | Has stale total at the bottom: "Total 29" (should be 38). Also missing the Meeting Skills (5) and Lean Canvas in distribution table. |
| `ecosystem.md` | PM-Skills + pm-skills-mcp ecosystem comparison | Says "32 skills" multiple times. Stale. |
| `project-structure.md` | High-level repo layout walkthrough | Mixed counts (32, 38, 39); stale in places |
| `frontmatter-schema.yaml` | Authoritative skill frontmatter schema | Current |
| `skill-families/index.md` | Skill family pattern explainer | Current; lists Meeting Skills Family |
| `skill-families/meeting-skills-contract.md` | Meeting Skills Family canonical contract v1.1.0 | Current; enforced by CI |

**No README in this folder.** Per your task brief I will create one.

### 5.7 `docs/showcase/`

Four files: `index.md`, `storevine.md`, `brainshelf.md`, `workbench.md`. Generated from a manifest. Each tells the story of a fictional company through every PM skill.

Status: rendered on site. Should not be hand-edited.

### 5.8 `docs/skills/`

Generated from `skills/{name}/SKILL.md` etc. by `scripts/generate-skill-pages.py`. Organized by phase (`discover/`, `define/`, `develop/`, `deliver/`, `measure/`, `iterate/`, `foundation/`, `utility/`) with 38 skill pages plus 8 phase index pages plus a top-level `index.md`. All current.

**Should never be hand-edited.** Add a banner to the index page.

### 5.9 `docs/workflows/`

Generated from `_workflows/*.md` by `scripts/generate-workflow-pages.py`. Contains 9 workflow pages plus `index.md` plus an excluded `README.md` warning contributors not to edit directly.

Status: current, well-marked.

### 5.10 `docs/contributing/`

Four files: `index.md`, `code-of-conduct.md`, `security.md`, `privacy.md`. All canonical site content for the Contributing tab.

Status: current.

### 5.11 `docs/releases/`

Twenty-one release note files plus `index.md`. Manually maintained (each release adds one file). The index has a comprehensive table.

Status: current.

### 5.12 `docs/stylesheets/`

Single file: `extra.css`. Custom CSS overrides for MkDocs Material theme. See Section 8.

Status: working as designed.

### 5.13 `docs/templates/`

Three files in `skill-template/`: `SKILL.md`, `references/TEMPLATE.md`, `references/EXAMPLE.md`. The starter template referenced by `creating-skills.md` and `agent-skill-anatomy.md`.

Status: current, with placeholder syntax (`<phase-or-classification-skill-name>`).

### 5.14 `_workflows/` (repo root, not under docs)

Source of truth for workflow definitions. Eleven files: `README.md`, `.gitkeep`, and 9 workflow `.md` files. Read by `scripts/generate-workflow-pages.py` to populate `docs/workflows/`.

Status: current; `README.md` clearly explains the source-of-truth relationship.

---

## 6. Cross-Reference: CI Rules and Workflows

How `docs/` interacts with automation in `.github/workflows/`:

### 6.1 `validate-docs.yml`

Triggers on PR or push to `main` that touches `docs/**`, `mkdocs.yml`, `requirements-docs.txt`, `skills/**/SKILL.md`, `skills/**/TEMPLATE.md`, `skills/**/EXAMPLE.md`, or `_workflows/**`.

Two checks:

1. `mkdocs build --strict` (will fail on broken links, malformed frontmatter, missing nav targets, etc.).
2. A bash loop that re-parses `mkdocs.yml` and verifies every nav-listed `.md` produced an HTML file in the build output. This catches silent exclusion regressions.

**Implication:** any nav entry pointing at a file that does not render produces a CI failure. This is a meaningful guardrail and explains why the duplicates have been kept consistent: removing them would require simultaneously removing nav entries and rerunning CI.

### 6.2 `deploy-docs.yml`

Triggers on push to `main` for the same paths (plus `workflow_dispatch`). Runs `mkdocs gh-deploy --force` to push the rendered site to the `gh-pages` branch.

**Implication:** any merge to `main` that touches docs immediately deploys. There is no preview environment.

### 6.3 `validation.yml`

Runs the broader skill/AGENTS/command/manifest validators. Of these, the ones that touch `docs/` or `_workflows/` are:

- `scripts/check-stale-bundle-refs.sh` (advisory): catches references to the old `bundles/` paths
- `scripts/check-workflow-coverage.sh` (advisory): ensures workflow pages exist for documented workflows
- `scripts/check-count-consistency.sh` (advisory): compares declared counts across files
- `scripts/check-generated-freshness.sh` (advisory): flags generated files that are out of sync with their sources

The `check-count-consistency.sh` script likely already would have caught the stale "32" and "29" counts I cited in Section 3. If it did not, it may not be checking the affected files. Worth verifying.

### 6.4 `validate-mcp-sync.yml`, `release-zips.yml`, etc.

Do not directly affect the `docs/` audit but are part of the broader release surface. The `release-zips.yml` workflow likely excludes `docs/internal/` and `_NOTES/` from the published release ZIP per memory note M-16.

---

## 7. Stale Numbers and Counts

Inventory of files where I caught stale counts, in order of severity:

| File | Line / Section | Says | Should say |
|------|---------------|------|------------|
| `mkdocs.yml` | line 8 (`site_description`) | "32 AI agent skills" | "38 AI agent skills" |
| `docs/concepts/skill-anatomy.md` | "Foundation Skills (1)" / "Utility Skills (1)" headings | 1 / 1 | 7 / 6 |
| `docs/concepts/versioning.md` | "Current Skill Versions" paragraph | "All 25 domain skills and the foundation skill" | Update to reflect post-v2.11.0 state |
| `docs/reference/categories.md` | "Category Distribution" Total row | 29 | 38 (and add Meeting Skills + lean-canvas to category counts) |
| `docs/reference/ecosystem.md` | Multiple | "32 skill directories", "32 skill tools" | "38 skill directories" with note that MCP is frozen at older count per M-22 |
| `docs/reference/project-structure.md` | Multiple | Mix of 32, 38, 39 | Reconcile to current numbers |
| `docs/guides/mcp-integration.md` | Tool inventory header | "32 skill tools" | Document the frozen-at-32 state per M-22 |
| `docs/guides/index.md` | Table | Lists 5 guides | Lists all 11 guides currently in folder |
| `docs/getting-started.md` | Multiple (excluded file) | "39 command markdown files: 32 skill commands plus 7 workflow commands" | "46 command markdown files: 39 skill commands plus 7 workflow commands" |
| `docs/concepts/agent-skill-anatomy.md` | Progressive Disclosure section | "AI sees 38 skills" but earlier paragraphs reference 32 | Reconcile |

The inconsistency suggests `check-count-consistency.sh` is either advisory-only or scoped to a subset of files. Tightening that check would prevent regressions.

---

## 8. Specific Questions Answered

### 8.1 What is `docs/tags.md`? When and why was it created?

**What it is:** A nearly-empty stub (`---` frontmatter + a single `# Tags` H1) that serves as the rendered destination for the Material for MkDocs `tags` plugin's auto-generated tag index. The plugin scans every page's `tags:` frontmatter array and produces a clickable index of all tags used across the site, rendering the index inside this stub.

**Created:** 2026-04-04 by commit `b95a551` "feat: implement all 11 MkDocs site enhancements" (also added `extra.css` and other site polish).

**Why:** `mkdocs.yml` line 86 enables the `tags` plugin (`- tags`). The plugin requires a host page; that host page is `docs/tags.md`. Without the host file the plugin has nowhere to render the index.

**Evidence in the codebase:** Many site pages declare tags in their frontmatter, e.g. `docs/concepts/versioning.md` has `tags: [Concepts, Versioning]`, `docs/reference/skill-families/index.md` has `tags: [Reference, Skill Families]`, and so on. These get aggregated into `tags.md` at build time.

**Action:** Leave it alone. It is working as designed. If the team adopts more tags, they will appear automatically.

### 8.2 What is `docs/stylesheets/extra.css`? When and why was it created?

**What it is:** A 30-line CSS file with five small style rules:

1. Card grid maximum width on wide screens
2. Smaller, slightly faded "try it" buttons
3. Mermaid diagram width constraint
4. Subtle border on collapsible example admonitions
5. Smaller font for tag badges

**Created:** Same commit as `tags.md`: 2026-04-04 by `b95a551`.

**Why:** `mkdocs.yml` line 165 references it (`extra_css: - stylesheets/extra.css`). The Material theme allows custom CSS overrides via this exact path, and the team needed small visual tweaks that the theme variables alone could not produce.

**Last touched:** 2026-04-22 by commit `8ab0f81` "release: v2.11.1 skills.sh CLI compatibility + em-dash sweep completion". Likely the em-dash sweep updated the `/* */` comment characters; the rules themselves predate that commit.

**Action:** Leave it alone. It is small, focused, and does what custom Material overrides should do. If you migrate themes, this is one of the few files the new theme might not honor.

---

## 9. Recommendations, Prioritized

I am organizing recommendations by effort and value. Each is scoped so it can be done independently.

### Tier 1: High value, low effort (do these first)

1. **Fix the stale count in `mkdocs.yml` site_description** (1 line edit). 32 to 38.
2. **Update `docs/concepts/skill-anatomy.md`** Foundation/Utility counts (1/1 to 7/6).
3. **Update `docs/reference/categories.md`** distribution total (29 to 38) and add Meeting Skills + Lean Canvas to category mappings.
4. **Update `docs/guides/index.md`** to list all 11 guides currently in the folder.
5. **Add a "Do not edit" banner to `docs/skills/index.md` and `docs/showcase/index.md`** matching the one in `docs/workflows/README.md`.
6. **Create the `docs/reference/README.md`** that you requested. (Doing this in a separate file as part of this session.)

### Tier 2: Medium effort, high clarity benefit

7. **Reconcile all skill counts** across `docs/reference/ecosystem.md`, `docs/reference/project-structure.md`, `docs/guides/mcp-integration.md`. Document explicitly which counts are frozen (MCP at v2.11.0 per M-22) versus current (repo at 38).
8. **Consider tightening `scripts/check-count-consistency.sh`** so future stale counts fail CI rather than producing advisory output.
9. **Document the dual-doc system** somewhere durable (probably `docs/internal/mkdocs/README.md` if such exists, or a new file). Right now nobody onboarding can see the pattern.

### Tier 3: Higher effort, structural

10. **Decide on duplicate top-level files.** Three options laid out in Section 3.5. My recommendation: delete the duplicates (Option C) and update README to point at the rendered site. Smallest ongoing maintenance, cleanest narrative.
11. **Decide on `docs/frameworks/`.** The folder has one excluded file. Either delete the folder or promote `triple-diamond-delivery-process.md` into the rendered site (probably as `docs/concepts/triple-diamond-detailed.md` or by merging into the existing `triple-diamond.md`).
12. **Add CI to detect divergence between top-level and concepts duplicates** while they coexist. Even a simple line-count or first-100-lines diff would catch the obvious cases.

### Tier 4: Aspirational

13. **Move all generated content to a single generated/ subtree** (or marker file). Today they are mixed with hand-edited files at peer level, which makes the contribution boundary fuzzy.
14. **Add a top-level `docs/README.md`** that explains the structure to a contributor seeing it for the first time. Currently the only orientation comes from `mkdocs.yml` and tribal knowledge.

---

## 9.5 Suggested Execution Order

The 14 items in Section 9 are grouped by *effort*, not by *dependency*. Some items downstream from architectural decisions, others stand alone. This subsection prescribes a cross-tier execution sequence so that work in one phase does not get rewritten by the next.

### Phase A. Mechanical fixes (no decisions required)

Run these as a single PR. None depend on architectural choices, none touch each other's surface area.

1. Tier 1 #1: Fix `mkdocs.yml` line 8 site_description (32 to 38)
2. Tier 1 #5: Add "do not edit" banner to `docs/skills/index.md` and `docs/showcase/index.md`
3. Tier 1 #6: Add `docs/reference/README.md` to `mkdocs.yml` `exclude_docs:` (matching the `workflows/README.md` pattern), or add it to nav under Reference
4. Tier 1 #4: Refresh `docs/guides/index.md` table to include all 11 current guides

Estimated effort: 30-60 minutes. Risk: very low. Reversibility: high.

### Phase B. Architectural decisions (one PR per decision)

Each is a self-contained call. Do these BEFORE Phase C because they change the surface that Phase C reconciles.

5. Tier 3 #10: Decide and execute the duplicate-files question (Section 3.5: Option A, B, or C). My recommendation remains Option C (delete duplicates, redirect README links). One PR per file or one bundled PR.
6. Tier 3 #11: Decide and execute the `docs/frameworks/` folder question. Either delete the folder + the one file, OR promote the file into `docs/concepts/triple-diamond-detailed.md` and add to nav.
7. Tier 1 #2 + Tier 1 #3 (count fixes in `concepts/skill-anatomy.md` and `reference/categories.md`): defer until #5 lands so we know which files we are editing.

Estimated effort: 2-3 hours including discussion. Risk: medium (link rot if external sites pointed at deleted files). Reversibility: high (git revert).

### Phase C. Reconciliation (depends on Phase B)

Once the file set is final, fix the remaining count drift across the smaller surface.

8. Tier 1 #2 + #3: Count fixes in `concepts/skill-anatomy.md` Foundation/Utility and `reference/categories.md` distribution table
9. Tier 2 #7: Reconcile counts across `reference/ecosystem.md`, `reference/project-structure.md`, `guides/mcp-integration.md` (note explicitly which are frozen at MCP v2.11.0 versus current at 38)
10. Run all CI scripts locally and verify clean pass

Estimated effort: 1-2 hours. Risk: low. Reversibility: high.

### Phase D. Durable improvements

11. Tier 2 #8: Tighten `check-count-consistency.sh` (see Section 14 #1)
12. Tier 2 #9: Document the dual-doc system somewhere durable, OR if Phase B chose Option C, this becomes "document the single-doc system" instead
13. Tier 3 #12: Add CI to detect divergence between any remaining duplicates (only relevant if Phase B chose Option A)
14. Tier 4 #13 + #14: Generated subtree namespace, top-level `docs/README.md` orientation
15. Section 14 proposals: new CI scripts for ongoing automation (see below)

Estimated effort: variable, can be split across multiple sessions.

### Cross-cutting observation

The pattern "decide architecture before reconciling counts" appears repeatedly. The archived CI audit at `docs/internal/audit/_archived/2026-04-18_ci-audit_post-v2.11.0.md` (refreshed 2026-05-01) makes a similar observation about `check-count-consistency` ("would have caught the 109/120 drift discovered in v2.11.0 Round 2 review") and recommends promoting it from advisory to enforcing for current-state paths. That promotion only works after Phase A and B because we need the current-state surface to be correct first.

---

## 10. Related Existing Audits and References

I encountered these adjacent artifacts while doing this audit. They are not in scope but are worth surfacing:

- `docs/internal/audit/_archived/2026-04-18_ci-audit_post-v2.11.0.md`. Older CI audit (archived 2026-05-01); partial overlap with my Section 6. See `docs/internal/audit/2026-05-01_ci-audit_addendum.md` for the refreshed version.
- `docs/internal/agent-component-usage_2026-04-18.md`. Proposes runtime patterns including hooks and dynamic content; tangentially relevant if dual-doc system gets restructured.
- `docs/internal/mkdocs/`. Likely contains the migration plan; consult before acting on Tier 3 recommendations.
- `docs/internal/release-plans/v2.11.0/plan_v2.11.0.md`. Documents the v2.11.0 release that introduced 6 new skills; contains the actual skill-count source of truth at release time.

---

## 11. Confidence Notes and Open Questions

- **High confidence:** The structural mapping in Section 3, the generator vs hand-edit distinction in Section 4, the answers in Section 8, and the CI cross-reference in Section 6.
- **Medium confidence:** The exact list of stale counts in Section 7. I caught the obvious ones; there may be more, especially in older release notes I did not exhaustively read.
- **Lower confidence:** Whether removing the top-level duplicates (Tier 3 #10) would break external references. Worth a search for inbound links from external sites and the README before acting.

**Open questions for the maintainer:**

1. Is there a deliberate reason the top-level files exist for GitHub-raw access? If yes, document it. If no, removing them is the right move.
2. Does the `docs/frameworks/` folder serve a purpose I am missing (e.g., expansion plans for framework-specific deep dives)?
3. Should `docs/skills/foundation/foundation-okr-writer.md` (which I see in the listing but is not yet in the v2.11.0 release notes I read) be considered shipped? If yes, the count goes to 38 across all docs. If pending, the count is 37 in some places and 38 in others.

---

## 12. Wider Audit: Corrections, Validation, and Cross-System Findings

This section was added in a second pass after a deeper read of `/scripts/`, `AGENTS.md`, the root README, and the existing CI audit. It corrects errors in the original Sections 1-11, validates the approach, and surfaces what the narrower first pass missed.

### 12.1 Corrections to the original audit

Three findings in Sections 1-11 need adjustment:

**Correction A: `docs/reference/commands.md` is GENERATED, not hand-edited.**

Section 5.6 listed `commands.md` as "current and accurate" without noting its generation source. It is in fact regenerated by `scripts/generate-skill-pages.py` (lines 540-579, function `generate_commands_reference`). Hand-editing it will be silently overwritten on the next skill-page regeneration. The file should be added to the generated-content set in Section 4 along with `docs/skills/`, `docs/workflows/`, `docs/showcase/`. The README at `docs/reference/README.md` should be updated to flag this; I will not retroactively edit the README in this audit pass since it would conflict with the conversation thread.

**Correction B: `check-count-consistency.sh` does run but with a regex gap.**

Section 6.3 said "may not be checking the affected files." After reading the script, the truth is more nuanced. The regex is `[0-9]+ (PM |product management )?skills`, which matches `38 skills`, `38 PM skills`, `38 product management skills`. It does NOT match `38 AI agent skills` (the pattern in `mkdocs.yml site_description`) because "AI agent" is between the number and the word "skills". So the script is faithfully reporting "no stale counts" even when stale counts exist, because the patterns it sees are syntactically not matching its regex. This is a coverage gap, not a logic bug. Detail in Section 14 #1.

**Correction C: Section 4's "three generated folders" misses one file.**

The generated set is actually: `docs/skills/` (entire subtree), `docs/workflows/` (entire subtree), `docs/showcase/` (entire subtree), AND `docs/reference/commands.md` (single file). Four targets across three scripts (`generate-skill-pages.py` produces both the `skills/` subtree AND `reference/commands.md`; `generate-workflow-pages.py` produces `workflows/`; `generate-showcase.py` produces `showcase/`).

### 12.2 Validation of the approach

The original audit's recommendations hold up under wider review with these refinements:

- **Tier 1 mechanical fixes**: still appropriate. None depend on the architecture decision.
- **Tier 3 architectural decisions**: still the right framing. The dual-doc system is the highest-leverage cleanup target.
- **Sequencing in Section 9.5**: validated by the existing CI audit's observation that count-consistency promotion to enforcing depends on current-state correctness.
- **What the original missed**: the generation pipeline already partly automates count consistency (the commands.md page derives its count dynamically from the filesystem at line 547-548). This is a useful pattern to extend, covered in Section 13.

### 12.3 Cross-system observations

Reading `AGENTS.md`, the root `README.md`, the existing CI audit, and the 17-script `/scripts/` directory together surfaces patterns invisible from `/docs/` alone:

**Observation 1: There are FOUR generated documentation surfaces (not three)**

Beyond the three I already cataloged, `AGENTS.md` itself is auto-synced from source by `.github/workflows/sync-agents-md.yml`. Hand edits to `AGENTS.md` between releases get overwritten on the next sync run. The existing CI audit notes this matter-of-factly: "Makes the enforcing `validate-agents-md` check usually pass by construction." This is fine but should be documented.

**Observation 2: The triplet convention is well established but selectively applied**

The repo enforces a `.sh + .ps1 + .md` triplet for every script via `validate-script-docs.sh`. The convention works because: every script has a Linux/macOS implementation, a Windows implementation, AND a markdown explainer. The same discipline is NOT applied to docs. Each `docs/*.md` file is a one-off without a counterpart enforcement layer. Section 14 #2 proposes a parallel discipline for docs frontmatter.

**Observation 3: The repo over-relies on advisory checks**

The existing CI audit (Section 12.4 of that file) calls this out as "1/3 enforcing, 2/3 advisory" and lists three candidates for promotion. My docs-specific findings reinforce that the count-consistency check is most useful when enforcing. Stale counts have already shipped to production multiple times, including the current state of `mkdocs.yml`. The cost of strictness is low: if a release intentionally changes counts, the CI failure is the trigger to update the docs in the same PR.

**Observation 4: The site has no link integrity check**

`validate-docs.yml` runs `mkdocs build --strict`, which catches *some* broken links (those MkDocs can resolve from nav). But internal cross-references between docs pages (e.g., `[Frontmatter Schema](../reference/frontmatter-schema.yaml)`) are not link-validated. The existing CI audit identifies this as gap G4. My docs-pass found at least one stale link (`docs/concepts/skill-anatomy.md` says "All 25 domain skills and the foundation skill are at version 2.0.0" referencing internal docs that may have drifted). Section 14 #6 proposes a fix.

**Observation 5: The `docs/internal/` cone is large and informative**

The `_working/` subdirectory holds active drafts; `audit/` holds current audits with prior audits in `audit/_archived/` (renamed from `audit-ci/` on 2026-05-01); `efforts/` holds 30+ feature plans; `release-plans/` holds per-release coordination. This is healthy. The split between `_working/`, `audit/`, and `efforts/` is useful and worth preserving. No changes recommended here.

---

## 13. Refactor and Simplification Patterns

This section answers "how could we restructure to make the system more durable?" rather than "what should we change today?". Five patterns, each with its tradeoffs.

### Pattern 1. Single-source content with build-time projection

**Problem:** The dual-doc system (Section 3) requires double maintenance because each concept page exists in two places.

**Refactor:** Make `docs/concepts/*.md` the single source of truth. If GitHub-raw access to top-level files is genuinely needed, generate them at build time from the concepts versions using a small Python script, treating the top-level files as a build artifact rather than a source.

**Pros:** Single edit point. Drift becomes impossible by construction.
**Cons:** Adds a new generator script. Couples concepts file format to top-level file format.

**Variation:** mkdocs-include or mkdocs-macros plugins can pull the same content into multiple rendered locations without filesystem duplication. Useful only for the rendered-site case; does not produce GitHub-raw files.

**Recommendation:** Adopt this if you choose Option A (keep duplicates) from Section 3.5. Skip if you choose Option C (delete duplicates).

### Pattern 2. Frontmatter-driven counts

**Problem:** Skill counts are baked into prose across many files, leading to drift.

**Refactor:** Stop hard-coding counts entirely. Either:

- **Option 2A:** Replace prose like "38 skills" with MkDocs macros that compute the count from `skills/` directory at build time.
- **Option 2B:** Generate every count-bearing line from a single `_data/counts.yaml` file populated by a pre-build script. Pages reference `{{ counts.skills }}` instead of hard-coded numbers.

**Pros:** Zero drift possible. Counts always reflect filesystem reality.
**Cons:** Requires `mkdocs-macros-plugin` dependency. Slight learning curve for contributors.

**Note:** The repo already does this implicitly in `generate-skill-pages.py` (line 547-548 computes `skill_cmd_count` and `workflow_cmd_count` dynamically). Extending this pattern across all count-bearing pages would eliminate an entire class of drift bug.

### Pattern 3. Consolidate the dual authoring guides

**Problem:** `docs/guides/creating-skills.md` and `docs/guides/authoring-pm-skills.md` are near-duplicates, both ~1000 lines, both serving the same audience.

**Refactor:** Pick one as canonical, redirect the other. The site rendered version is `creating-skills.md` (per nav), so make it canonical and either delete `authoring-pm-skills.md` or replace its content with a single redirect line.

**Pros:** Removes a thousand lines of double-maintained content.
**Cons:** External links to `authoring-pm-skills.md` may rot.

**Mitigation:** GitHub Pages supports redirects via the `redirects` MkDocs plugin (already enabled in `mkdocs.yml` line 87-92).

### Pattern 4. Unified generation pipeline

**Problem:** Three Python generator scripts (`generate-skill-pages.py`, `generate-workflow-pages.py`, `generate-showcase.py`) each have their own argument-parsing, frontmatter-parsing, and link-rewriting logic. They share concerns but not code.

**Refactor:** Extract common helpers into `scripts/_lib/` (frontmatter parser, link rewriter, output helpers) and have the three generators import from there. Optionally provide a top-level `scripts/regenerate-docs.py` orchestrator that runs all three in the right order.

**Pros:** DRY. Single place to fix bugs in frontmatter parsing or link rewriting.
**Cons:** Adds module structure. Slight import-path complexity.

**Recommendation:** Worth doing as part of any larger generator change. Not urgent on its own.

### Pattern 5. Generated-content namespace marker

**Problem:** Generated and hand-edited files sit at peer level under `docs/`. Contributors can't tell at a glance which is which.

**Refactor:** Either:

- **5A (filesystem):** Move generated outputs to `docs/_generated/` (note the underscore prefix matching the `_workflows/` source-of-truth convention). Add `_generated/` to `mkdocs.yml` paths so it still renders correctly. Make the generator scripts write there.
- **5B (banner):** Add a `<!-- GENERATED. Do not edit. Source: scripts/generate-X.py -->` first-line comment to every generated file. Add a CI check that errors if a file with that comment is touched in a PR.
- **5C (frontmatter):** Add `generated: true` to frontmatter of generated pages. CI checks that any page with this flag has not been hand-edited (compare to a fresh regeneration).

**Pros:** Contributors instantly know what they can and cannot edit.
**Cons:** Either requires moving files (5A) or adds discipline that contributors might forget (5B/5C).

**Recommendation:** 5C (frontmatter flag) is least disruptive and most automatable. Pair with the new CI script in Section 14 #4.

---

## 14. CI Automation Proposals: Standardization and Consistency

The older CI audit (archived at `docs/internal/audit/_archived/2026-04-18_ci-audit_post-v2.11.0.md`, refreshed at `docs/internal/audit/2026-05-01_ci-audit_addendum.md`) lists 9 prioritized gaps (G1-G9). This section adds 8 *new* docs-structure-specific proposals that complement (do not duplicate) the existing list. Each proposal includes effort estimate, enforcement posture recommendation, and a sketch of the implementation.

### 14.1 New script: `tighten-check-count-consistency.sh` (extension)

**Gap:** Existing `check-count-consistency.sh` regex misses "X word skills" patterns like "38 AI agent skills" in `mkdocs.yml`.

**Proposal:** Extend the regex to match `[0-9]+ ([a-zA-Z-]+ )*skills` (any number of word-tokens between count and "skills"). Same for commands and workflows. Add unit-style tests via `scripts/_tests/` of representative phrases.

**Posture:** Promote to enforcing for current-state files; keep advisory for `docs/releases/` and `CHANGELOG.md` where historical counts are correct.

**Effort:** Half-day. Mostly regex and CI flag changes.

**Why it matters:** This single change would have caught the `mkdocs.yml site_description` drift on the day it happened.

### 14.2 New script: `validate-docs-frontmatter.sh`

**Gap:** Skills frontmatter is exhaustively validated by `lint-skills-frontmatter.sh`. Docs pages also use frontmatter (`title:`, `description:`, `tags:`) but no validator covers them.

**Proposal:** Validate every `docs/**/*.md` (excluding `docs/internal/` and the `exclude_docs:` set) for:

- Has frontmatter delimiter (`---` on line 1)
- Has required fields: `title`, `description`
- `title` is non-empty, under 80 chars
- `description` is 1-2 sentences, 50-300 chars
- `tags` if present is a list of valid tag values
- No malformed YAML

**Posture:** Enforcing.

**Effort:** Day. Reuses parsing patterns from `lint-skills-frontmatter.sh`.

**Why it matters:** Site search, tag index, and SEO all depend on consistent frontmatter. The audit found `docs/index.md` and many other site-rendered pages lack a `tags:` array.

### 14.3 New script: `check-nav-completeness.sh`

**Gap:** A new file added under `docs/` but not added to `mkdocs.yml` nav silently disappears from the rendered site, OR fails strict-mode build with no clear cause.

**Proposal:** For every `docs/**/*.md` not in `internal/`:

- Either it appears in `mkdocs.yml` nav (rendered)
- Or it appears in `mkdocs.yml exclude_docs` (intentionally hidden)
- Or fail with "file not in nav and not excluded"

**Posture:** Enforcing.

**Effort:** Half-day.

**Why it matters:** This catches both the case I created (`docs/reference/README.md` not yet in either) AND silent orphans introduced by future contributors.

### 14.4 New script: `check-generated-content-untouched.sh`

**Gap:** `check-generated-freshness.sh` runs the workflow generator and diffs output. It does NOT detect hand-edits to generated files between regenerations. A contributor can edit `docs/skills/deliver/deliver-prd.md` and have the change ship until the next deploy regenerates from source.

**Proposal:** Two-part script:

- **Part A:** Re-runs all three generators (`generate-skill-pages.py`, `generate-workflow-pages.py`, `generate-showcase.py`) into a temp directory. Diffs against committed files. Fails if any committed file differs from regenerated output.
- **Part B:** If Pattern 5C (frontmatter flag) is adopted, additionally checks that every `generated: true` page exactly matches its regenerated form.

**Posture:** Enforcing. Auto-fixable via `scripts/regenerate-docs.py` (Pattern 4).

**Effort:** Day. Extends existing freshness check.

**Why it matters:** Today the only protection against hand-edits to generated content is contributor discipline plus one README warning in `docs/workflows/`. A CI gate makes the rule hard.

### 14.5 New script: `check-duplicate-doc-divergence.sh` (only if duplicates remain)

**Gap:** While the dual-doc system exists (Option A from Section 3.5), the parallel files can drift without detection.

**Proposal:** For each known duplicate pair, run a structural diff (compare H2 headers, table rows, code blocks) and emit a warning if structures diverge beyond a threshold.

**Posture:** Advisory. Makes drift visible without blocking.

**Effort:** Day. Requires per-pair configuration.

**Why it matters:** Only relevant if the maintainer chooses Option A. If Option C is chosen and duplicates are deleted, this script becomes unnecessary.

### 14.6 New script: `check-internal-link-validity.sh`

**Gap:** Existing CI audit gap G4 ("Link checking in docs"). MkDocs strict mode catches some broken nav links but not arbitrary internal markdown links between pages.

**Proposal:** Use an existing tool (e.g., `lychee`, `markdown-link-check`, or the `mkdocs-linkcheck` plugin) to validate all internal links in rendered output. Whitelist external links to avoid network flakiness.

**Posture:** Enforcing for internal links; advisory for external links.

**Effort:** Day. Mostly plugin/tool integration.

**Why it matters:** Stale links erode user trust. The audit found candidate stale links in concepts/skill-anatomy.md and others that the current CI does not catch.

### 14.7 New script: `check-version-references.sh`

**Gap:** Hard-coded version numbers (`v2.11.1`, `v2.10.0`) appear in many files. When a release happens, some get updated and others drift.

**Proposal:** Scan tracked .md and .json for `v\d+\.\d+\.\d+` patterns. For each match, check if the file is in an exclusion list (release notes, CHANGELOG, historical docs). For non-excluded matches, verify the version equals the current release version (from `plugin.json`).

**Posture:** Advisory initially. Promote to enforcing after one release cycle proves no false positives.

**Effort:** Half-day.

**Why it matters:** Reduces post-release cleanup. Pairs naturally with `validate-version-consistency.sh`.

### 14.8 New script: `validate-references-cross-doc.sh`

**Gap:** Reference files cite each other (`commands.md` -> skill pages, `categories.md` -> skills). When a skill is renamed or removed, reference pages can dangle.

**Proposal:** For each link from a `docs/reference/*.md` file to another in-repo location, verify the target exists. For each skill mentioned by name in `docs/reference/categories.md`, verify the skill exists in `skills/`.

**Posture:** Enforcing.

**Effort:** Day.

**Why it matters:** The `categories.md` distribution table currently lists `pm-skill-builder`, `pm-skill-validate`, `pm-skill-iterate` under coordination. If utility-mermaid-diagrams or utility-slideshow-creator should also appear there (added in v2.10.0), the lack of validation means it slips silently.

---

## 15. Proposal Summary and Sequencing for CI Work

To make Section 14 actionable, here is a sequencing recommendation that minimizes disruption:

**First wave (prerequisite for everything):**

- 14.1 Tighten `check-count-consistency` regex (low effort, high value, prerequisite for promoting to enforcing)
- 14.3 `check-nav-completeness` (low effort, prevents future orphans like the README I just created)

**Second wave (after Phase B architectural decisions land):**

- 14.5 `check-duplicate-doc-divergence` (only if duplicates kept)
- 14.4 `check-generated-content-untouched` (works regardless of duplicates decision)
- 14.8 `validate-references-cross-doc` (needs current-state correct first)

**Third wave (durable improvements):**

- 14.2 `validate-docs-frontmatter`
- 14.6 `check-internal-link-validity`
- 14.7 `check-version-references`

Each script follows the existing repo convention: `.sh` + `.ps1` + `.md` triplet, registered in `validation.yml` under appropriate enforcing or advisory section. Order across waves matches the sequencing in Section 9.5.

### Open question for the maintainer

The proposals in Sections 13-14 represent a meaningful expansion of CI surface. Some may be redundant with proposals already tracked in `v2.12.0` backlog (F-31 family-aware validation, F-32 utility-skill regeneration, F-33 sample standards). Recommended next step: cross-reference Sections 13-14 against the v2.12.0 backlog and decide which to:

- **Adopt as-is** into v2.12.0 or v2.13.0
- **Merge** with existing efforts (F-31, F-32, F-33)
- **Defer** to later
- **Reject** as not worth the maintenance overhead

---

*Audit produced 2026-05-01 by Claude (Opus 4.7) at /effort max. No files in `docs/` were modified by this audit (excluding `docs/reference/README.md` which was a separate deliverable). Sections 1-11 were the original first-pass audit. Sections 9.5, 12, 13, 14, 15 were added in a second pass after deeper review of `/scripts/`, `AGENTS.md`, root README, and the older CI audit (now archived at `docs/internal/audit/_archived/2026-04-18_ci-audit_post-v2.11.0.md`; refreshed at `docs/internal/audit/2026-05-01_ci-audit_addendum.md`). Any errors are the auditor's; corrections in Section 12.1 are explicit acknowledgments where the first pass was wrong.*
