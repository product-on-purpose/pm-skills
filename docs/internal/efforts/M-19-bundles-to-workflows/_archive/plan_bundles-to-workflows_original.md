# Rename Plan: `_bundles` → `_workflows` + `/workflow-` Command Prefix

Status: Planning
Parent: [plan_v2.9.0.md](plan_v2.9.0.md)
Scope: pm-skills (primary) + pm-skills-mcp (downstream)

## Context

The term "bundle" is a packaging metaphor (webpack, npm). What the repo actually describes is a **process** — a guided, sequenced, multi-step workflow with handoffs and context flow. Every user-facing explanation in the repo already reaches for "workflow" to describe the concept. The pm-skills-mcp server already uses `pm_workflow_` as its tool name prefix.

This rename aligns terminology with:
- The repo's own documentation (which says "Workflow Bundles" everywhere)
- The broader agent/automation ecosystem (GitHub Actions, n8n, Zapier, Temporal — all use "workflow")
- The MCP server's existing public API (`pm_workflow_feature_kickoff`, etc.)

**Scope of change:** ~399 references across ~106 files in pm-skills, ~14 files in pm-skills-mcp.

---

## Decisions

| Decision | Answer | Rationale |
|----------|--------|-----------|
| Directory rename | `_bundles/` → `_workflows/` | Matches concept name |
| Docs directory | `docs/bundles/` → `docs/workflows/` | Follows source directory |
| Internal efforts dir | Already reorganized to `F-13-workflow-expansion/` | Done — draft files keep `bundle_` prefix as historical artifacts |
| Command prefix | `/workflow-{name}` | Namespace protection, signals multi-step process |
| `/kickoff` handling | Keep as alias, add `/workflow-feature-kickoff` | Backwards compatibility |
| MCP tool names | No change — already `pm_workflow_*` | Already correct |
| MCP type names | `WorkflowBundle` → `Workflow` | Drop "Bundle" from internal types |
| Nav section name | "Bundles" → "Workflows" | Matches concept |
| Timing | Part of v2.9.0 | Cheapest time — already touching every file for expansion |

---

## Impact Inventory

### A. Directory & File Renames (structural)

| Current Path | New Path | Type |
|-------------|----------|------|
| `_bundles/` | `_workflows/` | Directory rename |
| `_bundles/feature-kickoff.md` | `_workflows/feature-kickoff.md` | Moved with directory |
| `_bundles/lean-startup.md` | `_workflows/lean-startup.md` | Moved with directory |
| `_bundles/triple-diamond.md` | `_workflows/triple-diamond.md` | Moved with directory |
| `docs/bundles/` | `docs/workflows/` | Directory rename |
| `docs/bundles/index.md` | `docs/workflows/index.md` | Moved with directory |
| `docs/bundles/feature-kickoff.md` | `docs/workflows/feature-kickoff.md` | Moved with directory |
| `docs/bundles/lean-startup.md` | `docs/workflows/lean-startup.md` | Moved with directory |
| `docs/bundles/triple-diamond.md` | `docs/workflows/triple-diamond.md` | Moved with directory |
| ~~`docs/internal/efforts/bundles/`~~ | Reorganized to `F-13-workflow-expansion/` | Already done — see [F-13](../F-13-workflow-expansion.md) |
| `commands/kickoff.md` | `commands/workflow-feature-kickoff.md` | File rename + keep `kickoff.md` as alias |
| (new) | `_workflows/README.md` | Clarifies source-of-truth role, repo-relative links, do not edit `docs/workflows/` |
| (new) | `docs/workflows/README.md` | "Generated — do not edit directly. Run `scripts/generate-workflow-pages.py`." |

### B. New Command Files (6 new workflows + 1 rename)

| File | Command |
|------|---------|
| `commands/workflow-customer-discovery.md` | `/workflow-customer-discovery` |
| `commands/workflow-sprint-planning.md` | `/workflow-sprint-planning` |
| `commands/workflow-product-strategy.md` | `/workflow-product-strategy` |
| `commands/workflow-post-launch-learning.md` | `/workflow-post-launch-learning` |
| `commands/workflow-stakeholder-alignment.md` | `/workflow-stakeholder-alignment` |
| `commands/workflow-technical-discovery.md` | `/workflow-technical-discovery` |
| `commands/workflow-feature-kickoff.md` | `/workflow-feature-kickoff` (new canonical name) |
| `commands/kickoff.md` | `/kickoff` (retained as alias → points to workflow-feature-kickoff) |

### C. Critical File Updates (pm-skills)

Files grouped by impact severity. Reference counts from exhaustive grep.

#### Tier 1 — Structural (breaks CI if missed)

| File | Refs | What Changes |
|------|------|-------------|
| `mkdocs.yml` | 4 | Nav section: "Bundles" → "Workflows", paths `bundles/` → `workflows/` |
| `.github/workflows/validate-docs.yml` | 2 | Path trigger: `_bundles/**` → `_workflows/**` |
| `.github/workflows/deploy-docs.yml` | 2 | Path trigger: `_bundles/**` → `_workflows/**` |
| `.github/workflows/sync-agents-md.yml` | 5 | Hardcoded bundle table generation → workflow table |
| `scripts/generate-skill-pages.py` | 3 | Bundle count, command table, bundle references |
| `scripts/build-release.sh` | 2 | `$ROOT/_bundles` → `$ROOT/_workflows` |
| `scripts/build-release.ps1` | 1 | Same path change |

#### Tier 2 — Public-facing (visible to users)

| File | Refs | What Changes |
|------|------|-------------|
| `README.md` | 29 | "workflow bundles" → "workflows", `_bundles/` → `_workflows/`, counts, links, feature table |
| `AGENTS.md` | 3 | "Workflow Bundles" table → "Workflows", links to `_workflows/*.md` |
| `QUICKSTART.md` | 4 | Directory references, bundle definitions location |
| `CHANGELOG.md` | 11 | Historical entries — update only v2.9.0 entry; older entries keep original wording |
| `docs/changelog.md` | 11 | Same as CHANGELOG.md (appears to be a copy) |
| `.claude-plugin/plugin.json` | 1 | Description text |
| `marketplace.json` | 1 | Marketplace listing text |

#### Tier 3 — Documentation site pages

| File | Refs | What Changes |
|------|------|-------------|
| `docs/workflows/index.md` (was `docs/bundles/index.md`) | 3 | Title, description, "bundle" → "workflow" |
| `docs/getting-started/index.md` | 5 | Bundle references → workflow |
| `docs/getting-started/quickstart.md` | 4 | Bundle definitions location |
| `docs/getting-started.md` | 5 | Bundle references → workflow |
| `docs/reference/project-structure.md` | 8 | `/_bundles/` section → `/_workflows/`, command count |
| `docs/reference/ecosystem.md` | 2 | Bundle references |
| `docs/reference/commands.md` | 2 | `/kickoff` bundle command → workflow command |
| `docs/concepts/skill-anatomy.md` | 2 | Bundles section → Workflows |
| `docs/concepts/versioning.md` | 3 | Bundle versioning notes |
| `docs/guides/using-skills.md` | 3 | "Using Workflow Bundles" → "Using Workflows" |
| `docs/guides/recipes.md` | 1 | Bundle cross-reference |
| `docs/guides/mcp-integration.md` | 1 | Bundle reference |
| `docs/showcase/workbench.md` | 2 | Showcase narrative |
| `docs/pm-skill-anatomy.md` | 2 | Bundle section |
| Various `docs/skills/*.md` | ~6 | Incidental bundle references |
| Various `docs/releases/Release_v*.md` | ~8 | Historical — update only v2.9.0 notes; leave older releases as-is |

#### Tier 4 — Internal docs (low risk, update for consistency)

| File | Refs | What Changes |
|------|------|-------------|
| `docs/internal/release-plans/v2.9.0/plan_v2.9.0.md` | 64 | Bundle expansion plan → workflow expansion |
| `docs/internal/efforts/workflows/*.md` (was bundles/) | ~60 | Already moved; update internal "bundle" terminology |
| `docs/internal/mkdocs/mkdocs-config.md` | 3 | Config references |
| `docs/internal/mkdocs/site-enhancements-plan.md` | 3 | Enhancement references |
| `docs/internal/skill-versioning.md` | 3 | Bundle versioning notes |
| `docs/internal/skill-library-evaluation-anthropic-guide.md` | 3 | Evaluation criteria |
| Various other internal docs | ~30 | Effort briefs, milestone plans, working docs |

#### Tier 5 — Agent context files

| File | Refs | What Changes |
|------|------|-------------|
| `AGENTS/claude/CONTEXT.md` | 8 | Structure listing, feature set |
| `AGENTS/codex/CONTEXT.md` | 1 | Minor reference |
| `AGENTS/DECISIONS.md` | 1 | Decision record |

#### Tier 6 — No change needed

| File | Refs | Why Skip |
|------|------|----------|
| `library/skill-output-samples/*.md` | ~6 | "bundle" appears in product example content (e.g., "JavaScript bundle size"), not workflow references |
| `.github/issues-archive/*.md` | ~10 | Historical issue snapshots — leave as-is |
| `docs/releases/Release_v2.0.md` through `v2.8.x` | ~8 | Historical release notes — document what was true at that time |
| `docs/internal/_working/distilled/_archived/*.md` | ~15 | Archived working docs — leave as-is |

---

## pm-skills-mcp Impact

**The MCP server is already 90% aligned.** The public tool names (`pm_workflow_*`), the listing tool (`pm_list_workflows`), and the source directory (`src/workflows/`) all use "workflow" already. The rename is almost entirely cosmetic in the MCP repo — just internal type names (`WorkflowBundle` → `Workflow`) and comments. No user-facing MCP API changes at all.

### Files to Update

| File | Refs | What Changes |
|------|------|-------------|
| `src/workflows/index.ts` | ~40 | `WorkflowBundle` interface → `Workflow`, `WORKFLOW_BUNDLES` → `WORKFLOWS`, `listWorkflowBundles()` → `listWorkflows()`, `getWorkflowBundle()` → `getWorkflow()` |
| `src/server.ts` | ~20 | Import renames, variable names (`bundles` → `workflows`), comment text |
| `src/config.ts` | 2 | Comment: "workflow bundle tools" → "workflow tools" |
| `tests/workflows.test.ts` | ~15 | `WORKFLOW_BUNDLES` → `WORKFLOWS`, function name updates |
| `tests/resources.test.ts` | 1 | Legacy URI test: `pm-skills://bundles/` → `pm-skills://workflows/` |
| `README.md` | ~10 | "Workflow Bundles" → "Workflows" in headings and descriptions |
| `CHANGELOG.md` | ~5 | v2.9.0 entry only; historical entries unchanged |
| `CLAUDE.md` | 1 | Tool count description |
| `AGENTS.md` | ~5 | Workflow table heading |
| `docs/architecture.md` | ~10 | "Workflow Bundles" → "Workflows" section |
| `docs/getting-started.md` | ~8 | "Workflow bundles" → "Workflows" |
| `docs/integration-guide.md` | ~5 | Bundle references in examples |
| `docs/releases/Release_v2.7.0.md` | 1 | Historical — leave as-is |
| `package.json` | 1 | Description text |

### What Does NOT Change in MCP

| Item | Current | Stays the Same |
|------|---------|---------------|
| Tool name prefix | `pm_workflow_` | Yes — already correct |
| Tool IDs | `feature-kickoff`, `lean-startup`, etc. | Yes — no "bundle" in IDs |
| Listing tool | `pm_list_workflows` | Yes — already correct |
| Module directory | `src/workflows/` | Yes — already correct |
| Resource URIs | `pm-skills://skills/*` | Yes — workflows aren't exposed as resources |

### MCP Coordination Timing

The MCP rename is **non-breaking** — no public tool names change. It can ship as:
- A patch release (`pm-skills-mcp v2.x.y`) for internal cleanup
- Bundled with the release that adds 6 new workflow tools

Recommend: ship MCP cleanup alongside the new workflow tool additions in a single pm-skills-mcp release after pm-skills v2.9.0.

---

## New CI to Add

### 1. Terminology Guard Script

**File:** `scripts/check-stale-bundle-refs.sh` + `.ps1`

**Purpose:** Post-rename migration guard that catches any remaining "bundle" references that should be "workflow". Runs in CI to prevent regression.

**Logic:**
```
1. Grep for /bundle/i across tracked files
2. Exclude known exceptions:
   - Historical release notes (docs/releases/Release_v2.0.md through v2.8.x)
   - Archived working docs (docs/internal/_working/distilled/_archived/)
   - Issue archives (.github/issues-archive/)
   - Sample library content (library/skill-output-samples/) — "bundle" may appear in product context
   - This plan file itself
   - Third-party files (node_modules, .git)
3. If any matches remain → WARN (advisory, not blocking)
4. Output list of files with stale references
```

**CI integration:** Add as advisory check in main `validate.yml` workflow, triggered by `docs/**` and `_workflows/**` changes.

### 2. Updated Path Triggers

**`validate-docs.yml`:**
```yaml
paths:
  - 'docs/**'
  - 'mkdocs.yml'
  - 'requirements-docs.txt'
  - 'skills/**/SKILL.md'
  - 'skills/**/TEMPLATE.md'
  - 'skills/**/EXAMPLE.md'
  - '_workflows/**'    # was: '_bundles/**'
```

**`deploy-docs.yml`:**
```yaml
paths:
  - 'docs/**'
  - 'mkdocs.yml'
  - '_workflows/**'    # was: '_bundles/**'
```

### 3. Updated AGENTS.md Sync Workflow

**`.github/workflows/sync-agents-md.yml`:**
- Hardcoded bundle table generation must be updated to reference `_workflows/` paths
- Section header: "Workflow Bundles" → "Workflows"
- Link targets: `_bundles/*.md` → `_workflows/*.md`

---

## Implementation Sequence

The rename must be sequenced carefully to avoid breaking CI at any intermediate commit.

### Option A: Single Atomic Commit (Recommended)

One commit that performs all renames and reference updates simultaneously. CI sees a consistent state.

**Pros:** No intermediate broken state, clean git history
**Cons:** Large diff, harder to review

### Option B: Two-Phase Commit

**Phase 1:** Directory renames + CI path updates + mkdocs nav (structural)
**Phase 2:** Content updates across all documentation files

**Pros:** Easier to review in two passes
**Cons:** Phase 1 alone may leave stale "bundle" text in docs (cosmetic, not broken)

### Recommended: Option A

Since this is a terminology rename (not a behavioral change), a single commit is cleaner. The diff is large but mechanical — find-and-replace with targeted exceptions.

---

## Acceptance Tests

### AT-1: Directory Structure

- [ ] `_bundles/` directory no longer exists
- [ ] `_workflows/` directory exists with 9 `.md` files (3 existing + 6 new)
- [ ] `docs/bundles/` directory no longer exists
- [ ] `docs/workflows/` directory exists with 10 files (9 workflows + `index.md`)
- [ ] `docs/internal/efforts/bundles/` directory no longer exists (already reorganized to `F-13-workflow-expansion/`)
- [ ] `docs/internal/efforts/workflows/` directory exists with all effort files

### AT-2: Command Namespace

- [ ] `commands/workflow-feature-kickoff.md` exists
- [ ] `commands/workflow-customer-discovery.md` exists
- [ ] `commands/workflow-sprint-planning.md` exists
- [ ] `commands/workflow-product-strategy.md` exists
- [ ] `commands/workflow-post-launch-learning.md` exists
- [ ] `commands/workflow-stakeholder-alignment.md` exists
- [ ] `commands/workflow-technical-discovery.md` exists
- [ ] `commands/kickoff.md` exists (alias, points to workflow-feature-kickoff)
- [ ] Each command file references correct `_workflows/*.md` path
- [ ] `scripts/validate-commands.ps1` passes

### AT-3: MkDocs Site

- [ ] `mkdocs build --strict` passes with zero warnings
- [ ] Nav shows "Workflows" section (not "Bundles") with 9 entries
- [ ] `docs/workflows/index.md` renders with 9-row table
- [ ] All 9 workflow pages render correctly
- [ ] Internal links between workflow pages resolve
- [ ] Skill links from workflow pages resolve to correct skill doc pages
- [ ] `mkdocs serve` — manual visual check of workflow section

### AT-4: CI Workflows

- [ ] `validate-docs.yml` triggers on `_workflows/**` changes (not `_bundles/**`)
- [ ] `deploy-docs.yml` triggers on `_workflows/**` changes (not `_bundles/**`)
- [ ] `sync-agents-md.yml` generates correct workflow table with `_workflows/` links
- [ ] `scripts/validate-commands.ps1` passes with new `workflow-*` commands
- [ ] `scripts/validate-agents-md.ps1` passes

### AT-5: AGENTS.md

- [ ] "Workflows" section (not "Workflow Bundles") lists 9 workflows
- [ ] All links point to `_workflows/*.md` (not `_bundles/`)
- [ ] `scripts/validate-agents-md.ps1` passes

### AT-6: README

- [ ] No occurrence of "3 workflow bundles" — now "9 workflows"
- [ ] Feature badge says "Workflows" not "Workflow Bundles"
- [ ] Workflow table lists all 9 with correct `_workflows/` links
- [ ] Directory tree shows `_workflows/` not `_bundles/`

### AT-7: Terminology Guard

- [ ] `scripts/check-stale-bundle-refs.sh` exists and runs
- [ ] Running it against the repo produces zero unexpected matches
- [ ] Known exceptions (historical releases, archives, samples) are properly excluded
- [ ] Script returns exit code 0 (pass)

### AT-8: Cross-Link Integrity

- [ ] No broken internal links in MkDocs build (covered by `--strict`)
- [ ] `grep -r "_bundles" docs/ _workflows/ commands/ AGENTS.md README.md mkdocs.yml scripts/ .github/` returns zero matches
- [ ] `grep -r "docs/bundles" docs/ mkdocs.yml` returns zero matches
- [ ] `grep -r "/bundle-" commands/` returns zero matches

### AT-9: Generate Script

- [ ] `scripts/generate-bundle-pages.py` renamed to `scripts/generate-workflow-pages.py`
- [ ] Script reads from `_workflows/` and writes to `docs/workflows/`
- [ ] Generated output matches manual `docs/workflows/` content
- [ ] Script regenerates `docs/workflows/index.md` with 9-entry table

### AT-10: pm-skills-mcp Compatibility

- [ ] No `pm_workflow_*` tool names changed (backwards compatible)
- [ ] `pm_list_workflows` tool still works
- [ ] Internal type `WorkflowBundle` renamed to `Workflow` in source
- [ ] `WORKFLOW_BUNDLES` constant renamed to `WORKFLOWS`
- [ ] All tests pass: `npm test` in pm-skills-mcp
- [ ] New workflow IDs added to pm-skills-mcp match `_workflows/` filenames:
  - `customer-discovery`
  - `sprint-planning`
  - `product-strategy`
  - `post-launch-learning`
  - `stakeholder-alignment`
  - `technical-discovery`

### AT-11: Release Artifacts

- [ ] `CHANGELOG.md` v2.9.0 entry uses "workflows" terminology
- [ ] `docs/releases/Release_v2.9.0.md` uses "workflows" terminology
- [ ] Historical release notes (v2.0 through v2.8.x) unchanged
- [ ] `.claude-plugin/plugin.json` version bumped, description says "workflows"

### AT-12: Build & Package

- [ ] `scripts/build-release.sh` references `_workflows/` not `_bundles/`
- [ ] `scripts/build-release.ps1` references `_workflows/` not `_bundles/`
- [ ] Release zip includes `_workflows/` directory

---

## What NOT to Change

| Category | Reason |
|----------|--------|
| Historical release notes (`docs/releases/Release_v2.0.md` through `v2.8.x`) | Document what was true at release time |
| Historical CHANGELOG entries (pre-v2.9.0) | Same — historical record |
| Archived working docs (`docs/internal/_working/distilled/_archived/`) | Dead documents, not worth the churn |
| Issue archive (`.github/issues-archive/`) | External snapshots |
| Sample library content (`library/skill-output-samples/`) | "bundle" in product context (e.g., JS bundle size), not workflow references |
| MCP tool names (`pm_workflow_*`) | Already correct — no user-facing change |
| MCP tool IDs (`feature-kickoff`, etc.) | Already correct |

---

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Broken internal links | High | `mkdocs build --strict` catches all broken doc links; AT-8 grep verification |
| Stale "bundle" references | Medium | Terminology guard script (AT-7) + AT-8 cross-link check |
| CI path triggers stale | High | AT-4 explicitly verifies new triggers fire |
| AGENTS.md sync workflow broken | Medium | AT-5 + manual check of sync-agents-md.yml output |
| MCP consumers break | Low | No public API names change — only internal type renames |
| External links to docs site break | **High** | **Hidden risk.** Anyone who bookmarked `product-on-purpose.github.io/pm-skills/bundles/feature-kickoff/` will get a 404 after rename. Mitigated by `mkdocs-redirects` plugin — see section below. |
| Release packaging misses `_workflows/` | Medium | AT-12 verifies build scripts updated |

### URL Redirect Plan (required)

This is a hidden risk that warrants proactive mitigation. The docs site is public and indexed — old `bundles/*` URLs will 404 after the rename unless redirects are in place.

**Solution: `mkdocs-redirects` plugin.** The repo already manages MkDocs plugins via `requirements-docs.txt`, so adding one more is trivial.

**Step 1 — Install:**
```
# Add to requirements-docs.txt
mkdocs-redirects
```

**Step 2 — Configure in `mkdocs.yml`:**
```yaml
plugins:
  - redirects:
      redirect_maps:
        'bundles/index.md': 'workflows/index.md'
        'bundles/feature-kickoff.md': 'workflows/feature-kickoff.md'
        'bundles/lean-startup.md': 'workflows/lean-startup.md'
        'bundles/triple-diamond.md': 'workflows/triple-diamond.md'
        # New workflows don't need redirects — they never had bundle URLs
```

**Step 3 — Verify:** Add acceptance test (see AT-13 below).

This handles:
- Direct bookmarks to bundle pages
- Search engine cached URLs
- External sites linking to the docs
- Zero maintenance — the plugin generates static redirect HTML files

### AT-13: URL Redirects

- [ ] `mkdocs-redirects` added to `requirements-docs.txt`
- [ ] Redirect map configured in `mkdocs.yml` for all 3 existing bundle URLs
- [ ] `mkdocs build --strict` still passes with redirects plugin
- [ ] Visiting `localhost:8000/bundles/feature-kickoff/` during `mkdocs serve` redirects to `workflows/feature-kickoff/`
- [ ] Visiting `localhost:8000/bundles/` redirects to `workflows/`
