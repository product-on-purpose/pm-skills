# Rename Plan: `_bundles` → `_workflows` + `/workflow-` Command Prefix

Status: Planning (post-review)
Parent: [plan_v2.9.0.md](../../release-plans/v2.9.0/plan_v2.9.0.md)
Scope: pm-skills (primary) + pm-skills-mcp (downstream)
Reviewed by: Codex (GPT-5.4) — [review document](plan_bundles-to-workflows_reviewed-by-codex.md)

## Context

The term "bundle" is a packaging metaphor (webpack, npm). What the repo actually describes is a **process** — a guided, sequenced, multi-step workflow with handoffs and context flow. Every user-facing explanation in the repo already reaches for "workflow" to describe the concept. The pm-skills-mcp server already uses `pm_workflow_` as its tool name prefix.

This rename aligns terminology with:
- The repo's own documentation (which says "Workflow Bundles" everywhere)
- The broader agent/automation ecosystem (GitHub Actions, n8n, Zapier, Temporal — all use "workflow")
- The MCP server's existing public API (`pm_workflow_feature_kickoff`, etc.)

**Scope of change:** Approximately 400 references across ~100 files in pm-skills, ~14 files in pm-skills-mcp. Reference counts are approximate from a session-time grep (2026-04-06); re-verify from live tree before execution.

---

## Decisions

| Decision | Answer | Rationale |
|----------|--------|-----------|
| Directory rename | `_bundles/` → `_workflows/` | Matches concept name |
| Docs directory | `docs/bundles/` → `docs/workflows/` | Follows source directory |
| Internal efforts dir | Already reorganized to `F-13-workflow-expansion/` | Done — draft files keep `bundle_` prefix as historical artifacts |
| Command prefix | `/workflow-{name}` | Namespace protection, signals multi-step process |
| `/kickoff` handling | **Delete `commands/kickoff.md`**. Only `/workflow-feature-kickoff` exists. | Low adoption; avoids alias complexity and validator conflicts. Breaking change documented in release notes. |
| MCP tool names | No change — already `pm_workflow_*` | Already correct |
| MCP type renames | `WorkflowBundle` → `Workflow` etc. — **source-level API refactor**, not cosmetic | Exported TypeScript symbols change. No user-facing MCP tool-name break. |
| Nav section name | "Bundles" → "Workflows" | Matches concept |
| Timing | Part of v2.9.0 (Commit 1 per parent release plan) | Cheapest time — already touching every file for expansion |
| Terminology guard | Advisory (WARN) during transition; **promote to FAIL after v2.9.0 ships** | Prevents regression once exception list is stable |

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
| `commands/kickoff.md` | `commands/workflow-feature-kickoff.md` | Rename (old file deleted, not aliased) |
| (new) | `_workflows/README.md` | Clarifies source-of-truth role, repo-relative links, do not edit `docs/workflows/` |
| (new) | `docs/workflows/README.md` | "Generated — do not edit directly. Run `scripts/generate-workflow-pages.py`." |

### B. Command File Changes (M-19 scope: rename only)

M-19 renames the existing command. The 6 new workflow commands are created in F-13.

| File | Command | Action |
|------|---------|--------|
| `commands/workflow-feature-kickoff.md` | `/workflow-feature-kickoff` | Rename from `kickoff.md`, update internal `_bundles/` → `_workflows/` references |
| `commands/kickoff.md` | `/kickoff` | **Deleted** — breaking change, documented in release notes |

### C. Critical File Updates (pm-skills)

Files grouped by impact severity. Reference counts are approximate — re-verify before execution.

#### Tier 1 — Structural (breaks CI or packaging if missed)

| File | Refs | What Changes |
|------|------|-------------|
| `mkdocs.yml` | ~5 | Nav section: "Bundles" → "Workflows", paths `bundles/` → `workflows/`, add `mkdocs-redirects` plugin config |
| `.github/workflows/validate-docs.yml` | 1 | Path trigger: `_bundles/**` → `_workflows/**` |
| `.github/workflows/deploy-docs.yml` | 1 | Path trigger: `_bundles/**` → `_workflows/**` |
| `.github/workflows/sync-agents-md.yml` | ~10 | Hardcoded bundle table → workflow table, path trigger `_bundles/*.md` → `_workflows/*.md`, section header, link targets |
| `.github/workflows/release.yml` | 1 | "Workflow bundles" → "Workflows" in release notes template |
| `scripts/generate-skill-pages.py` | 3 | Bundle/workflow count, command table (remove `/kickoff`, add `/workflow-feature-kickoff`), bundle references |
| `scripts/build-release.sh` | 2 | `$ROOT/_bundles` → `$ROOT/_workflows` |
| `scripts/build-release.ps1` | 1 | `_bundles` → `_workflows` in copy list |
| `scripts/build-release.md` | 2 | `_bundles/` path references in documentation |

#### Tier 2 — Public-facing (visible to users)

| File | Refs | What Changes |
|------|------|-------------|
| `README.md` | ~33 | "workflow bundles" → "workflows", `_bundles/` → `_workflows/`, counts, links, feature table |
| `AGENTS.md` | 3 | "Workflow Bundles" table → "Workflows", links to `_workflows/*.md` |
| `QUICKSTART.md` | 4 | Directory references, bundle definitions location |
| `CHANGELOG.md` | ~11 | Update only v2.9.0 entry; older entries keep original wording |
| `docs/changelog.md` | ~11 | **Separate file from `CHANGELOG.md`** (different content, different sizes). Update only v2.9.0 entry independently. |
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
| `docs/reference/commands.md` | 2 | Remove `/kickoff`, add `/workflow-feature-kickoff` |
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
| `docs/internal/release-plans/v2.9.0/plan_v2.9.0.md` | ~64 | Bundle → workflow terminology |
| `docs/internal/mkdocs/mkdocs-config.md` | 3 | Config references |
| `docs/internal/mkdocs/site-enhancements-plan.md` | 3 | Enhancement references |
| `docs/internal/skill-versioning.md` | 3 | Bundle versioning notes |
| `docs/internal/skill-library-evaluation-anthropic-guide.md` | 3 | Evaluation criteria |
| Various other internal docs | ~30 | Effort briefs, milestone plans, working docs |

Note: Draft files in `docs/internal/efforts/F-13-workflow-expansion/` keep their `bundle_` prefix as historical artifacts — not updated by M-19.

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
| `scripts/README_SCRIPTS.md` | 1 | "release bundle" is generic usage, not a workflow reference |
| `docs/internal/efforts/F-13-workflow-expansion/bundle_*.md` | ~60 | Historical draft files — keep `bundle_` prefix |

---

## pm-skills-mcp Impact

**The MCP server is already 90% aligned.** The public tool names (`pm_workflow_*`), the listing tool (`pm_list_workflows`), and the source directory (`src/workflows/`) all use "workflow" already. The rename is a **source-level API refactor** inside the MCP repo — exported TypeScript symbols (`WorkflowBundle`, `WORKFLOW_BUNDLES`, `listWorkflowBundles()`, `getWorkflowBundle()`) change, but no user-facing MCP tool names or IDs change.

### Files to Update

| File | Refs | What Changes |
|------|------|-------------|
| `src/workflows/index.ts` | ~40 | `WorkflowBundle` interface → `Workflow`, `WORKFLOW_BUNDLES` → `WORKFLOWS`, `listWorkflowBundles()` → `listWorkflows()`, `getWorkflowBundle()` → `getWorkflow()` |
| `src/server.ts` | ~20 | Import renames, variable names (`bundles` → `workflows`), comment text |
| `src/config.ts` | 2 | Comment: "workflow bundle tools" → "workflow tools" |
| `tests/workflows.test.ts` | ~15 | `WORKFLOW_BUNDLES` → `WORKFLOWS`, function name updates |
| `README.md` | ~10 | "Workflow Bundles" → "Workflows" in headings and descriptions |
| `CHANGELOG.md` | ~5 | v2.9.0 entry only; historical entries unchanged |
| `CLAUDE.md` | 1 | Tool count description |
| `AGENTS.md` | ~5 | Workflow table heading |
| `docs/architecture.md` | ~10 | "Workflow Bundles" → "Workflows" section |
| `docs/getting-started.md` | ~8 | "Workflow bundles" → "Workflows" |
| `docs/integration-guide.md` | ~5 | Bundle references in examples |
| `package.json` | 1 | Description text |

### What Does NOT Change in MCP

| Item | Current | Stays the Same |
|------|---------|---------------|
| Tool name prefix | `pm_workflow_` | Yes — already correct |
| Tool IDs | `feature-kickoff`, `lean-startup`, etc. | Yes — no "bundle" in IDs |
| Listing tool | `pm_list_workflows` | Yes — already correct |
| Module directory | `src/workflows/` | Yes — already correct |
| Resource URIs | `pm-skills://skills/*` | Yes — workflows aren't exposed as resources |
| `tests/resources.test.ts` | Asserts `pm-skills://bundles/feature-kickoff` returns null | Yes — keep existing rejection test as-is |

### MCP Coordination Timing

The MCP rename is **non-breaking** for tool consumers — no public tool names change. It can ship as:
- A patch release (`pm-skills-mcp v2.x.y`) for the source refactor
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
   - F-13 draft files (docs/internal/efforts/F-13-workflow-expansion/bundle_*)
   - scripts/README_SCRIPTS.md ("release bundle" is generic usage)
   - Third-party files (node_modules, .git)
3. If any matches remain → WARN (advisory during v2.9.0 transition)
4. Output list of files with stale references
5. Post-v2.9.0: promote to FAIL to prevent regression
```

**CI integration:** Add as advisory check in `.github/workflows/validation.yml`, triggered by `docs/**` and `_workflows/**` changes.

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
- Path trigger: `_bundles/*.md` → `_workflows/*.md`
- Hardcoded workflow table: update section header "Workflow Bundles" → "Workflows", column header "Bundle" → "Workflow"
- Link targets: `_bundles/*.md` → `_workflows/*.md`
- All 3 existing workflow entries updated; 6 new entries added in F-13

---

## Implementation Sequence

M-19 ships as **Commit 1** in the v2.9.0 release (per the parent release plan's two-commit strategy). The "single atomic commit" recommendation means all M-19 rename work lands in one commit — not that all of v2.9.0 is one commit.

### Single Atomic Commit for M-19

One commit that performs all directory renames, file renames, reference updates, CI changes, and redirect setup simultaneously. CI sees a consistent state.

**Pros:** No intermediate broken state, clean git history
**Cons:** Large diff, harder to review

This is appropriate because the rename is mechanical — find-and-replace with targeted exceptions per the "What NOT to Change" section.

---

## Acceptance Tests

### M-19 Completion Criteria (3 renamed workflows)

These tests verify M-19 is complete as a standalone effort. They reference only the 3 existing workflows that were renamed.

#### AT-1: Directory Structure

- [ ] `_bundles/` directory no longer exists
- [ ] `_workflows/` directory exists with 3 `.md` files + `README.md`
- [ ] `docs/bundles/` directory no longer exists
- [ ] `docs/workflows/` directory exists with 3 workflow files + `index.md` + `README.md`

#### AT-2: Command Namespace

- [ ] `commands/workflow-feature-kickoff.md` exists with `_workflows/` references
- [ ] `commands/kickoff.md` no longer exists (deleted, not aliased)
- [ ] `scripts/validate-commands.ps1` passes

#### AT-3: MkDocs Site

- [ ] `mkdocs build --strict` passes with zero warnings
- [ ] Nav shows "Workflows" section (not "Bundles") with 3 entries (existing renamed workflows)
- [ ] `docs/workflows/index.md` renders with 3-row table
- [ ] All 3 workflow pages render correctly
- [ ] Skill links from workflow pages resolve to correct skill doc pages

#### AT-4: CI Workflows

- [ ] `validate-docs.yml` triggers on `_workflows/**` changes (not `_bundles/**`)
- [ ] `deploy-docs.yml` triggers on `_workflows/**` changes (not `_bundles/**`)
- [ ] `sync-agents-md.yml` path trigger updated to `_workflows/*.md`
- [ ] `release.yml` no longer references "bundles"
- [ ] `scripts/validate-commands.ps1` passes
- [ ] `scripts/validate-agents-md.ps1` passes

#### AT-5: AGENTS.md

- [ ] "Workflows" section (not "Workflow Bundles") lists 3 workflows
- [ ] All links point to `_workflows/*.md` (not `_bundles/`)
- [ ] `scripts/validate-agents-md.ps1` passes

#### AT-6: README

- [ ] No occurrence of "workflow bundles" — now "workflows"
- [ ] Feature badge says "Workflows" not "Workflow Bundles"
- [ ] Workflow table lists 3 with correct `_workflows/` links
- [ ] Directory tree shows `_workflows/` not `_bundles/`
- [ ] `/kickoff` no longer appears in command listings

#### AT-7: Terminology Guard

- [ ] `scripts/check-stale-bundle-refs.sh` exists and runs
- [ ] Running it against the repo produces zero unexpected matches
- [ ] Known exceptions (historical releases, archives, samples, F-13 drafts) are properly excluded
- [ ] Script returns exit code 0 (pass)

#### AT-8: Cross-Link Integrity

- [ ] No broken internal links in MkDocs build (covered by `--strict`)
- [ ] `grep -r "_bundles"` across public surfaces (`_workflows/ commands/ AGENTS.md README.md QUICKSTART.md mkdocs.yml scripts/*.py scripts/*.sh scripts/*.ps1 .github/workflows/ .claude-plugin/ marketplace.json`) returns zero matches
- [ ] `grep -r "docs/bundles" mkdocs.yml docs/workflows/ docs/guides/ docs/concepts/ docs/reference/ docs/getting-started/` returns zero matches
- [ ] Note: historical release notes and Tier 6 exclusions are NOT scanned (aligns with terminology guard exclusions)

#### AT-9: Metadata & Scripts

- [ ] `scripts/generate-skill-pages.py` no longer references "bundle" or `/kickoff`
- [ ] `scripts/build-release.sh` references `_workflows/` not `_bundles/`
- [ ] `scripts/build-release.ps1` references `_workflows/` not `_bundles/`
- [ ] `scripts/build-release.md` references `_workflows/` not `_bundles/`
- [ ] `marketplace.json` description says "workflows" not "bundles"
- [ ] `.claude-plugin/plugin.json` description says "workflows"
- [ ] Release zip includes `_workflows/` directory

#### AT-10: CHANGELOG & Release Artifacts

- [ ] `CHANGELOG.md` v2.9.0 entry uses "workflows" terminology
- [ ] `docs/changelog.md` v2.9.0 entry uses "workflows" terminology (updated independently — separate file)
- [ ] Historical release notes (v2.0 through v2.8.x) unchanged
- [ ] `docs/releases/Release_v2.9.0.md` includes breaking-change callout for `/kickoff` removal and `_bundles/` → `_workflows/` path rename

#### AT-11: URL Redirects

- [ ] `mkdocs-redirects` added to `requirements-docs.txt`
- [ ] Redirect map configured in `mkdocs.yml` for all 3 existing bundle URLs
- [ ] `mkdocs build --strict` still passes with redirects plugin
- [ ] Visiting `localhost:8000/bundles/feature-kickoff/` during `mkdocs serve` redirects to `workflows/feature-kickoff/`
- [ ] Visiting `localhost:8000/bundles/` redirects to `workflows/`

### v2.9.0 Release Verification (combined M-19 + F-13, 9 workflows)

These tests verify the complete v2.9.0 release state after both Commit 1 (M-19) and Commit 2 (F-13) land.

#### AT-12: Full Workflow Coverage

- [ ] `_workflows/` contains 9 `.md` files + `README.md`
- [ ] `docs/workflows/` contains 9 workflow pages + `index.md` + `README.md`
- [ ] `docs/workflows/index.md` renders with 9-row table
- [ ] Nav shows "Workflows" section with 9 entries
- [ ] All 7 `commands/workflow-*.md` files exist and pass `validate-commands.ps1`
- [ ] AGENTS.md "Workflows" section lists 9 workflows
- [ ] README says "9 workflows"

#### AT-13: Generation Script

- [ ] `scripts/generate-workflow-pages.py` exists (created in F-13, not M-19)
- [ ] Script reads from `_workflows/` and writes to `docs/workflows/`
- [ ] Generated output matches `docs/workflows/` content
- [ ] Script regenerates `docs/workflows/index.md` with 9-entry table

#### AT-14: pm-skills-mcp Compatibility

- [ ] No `pm_workflow_*` tool names changed (backwards compatible)
- [ ] `pm_list_workflows` tool still works
- [ ] Internal type `WorkflowBundle` renamed to `Workflow` in source
- [ ] `WORKFLOW_BUNDLES` constant renamed to `WORKFLOWS`
- [ ] `tests/resources.test.ts` unchanged — existing `pm-skills://bundles/` rejection test kept as-is
- [ ] All tests pass: `npm test` in pm-skills-mcp
- [ ] New workflow IDs added matching `_workflows/` filenames

---

## What NOT to Change

| Category | Reason |
|----------|--------|
| Historical release notes (`docs/releases/Release_v2.0.md` through `v2.8.x`) | Document what was true at release time |
| Historical CHANGELOG entries (pre-v2.9.0) | Same — historical record |
| Archived working docs (`docs/internal/_working/distilled/_archived/`) | Dead documents, not worth the churn |
| Issue archive (`.github/issues-archive/`) | External snapshots |
| Sample library content (`library/skill-output-samples/`) | "bundle" in product context (e.g., JS bundle size), not workflow references |
| `scripts/README_SCRIPTS.md` | "release bundle" is generic usage, not a workflow reference |
| F-13 draft files (`docs/internal/efforts/F-13-workflow-expansion/bundle_*`) | Historical drafts — keep original terminology |
| MCP tool names (`pm_workflow_*`) | Already correct — no user-facing change |
| MCP tool IDs (`feature-kickoff`, etc.) | Already correct |
| MCP resource test (`tests/resources.test.ts`) | Tests URI rejection, not support — keep as-is |

---

## Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|-----------|
| Broken internal links | High | `mkdocs build --strict` catches all broken doc links; AT-8 grep verification |
| Stale "bundle" references | Medium | Terminology guard script (AT-7) + AT-8 cross-link check; promote to FAIL post-v2.9.0 |
| CI path triggers stale | High | AT-4 explicitly verifies new triggers fire |
| AGENTS.md sync workflow broken | Medium | AT-5 + manual check of sync-agents-md.yml output |
| MCP source API break | Low | No user-facing tool names change; TypeScript export renames are internal to pm-skills-mcp |
| Docs site URL breakage | **High** | `mkdocs-redirects` plugin — see URL Redirect Plan below |
| Repo-path breakage (external consumers) | Medium | Breaking-change callout in v2.9.0 release notes. Low adoption mitigates impact. |
| Release packaging misses `_workflows/` | Medium | AT-9 verifies build scripts updated |
| `/kickoff` removal | Low | Documented in release notes. Low adoption. |

### URL Redirect Plan (required)

The docs site is public and indexed — old `bundles/*` URLs will 404 after the rename unless redirects are in place.

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

**Step 3 — Verify:** AT-11.

This handles:
- Direct bookmarks to bundle pages
- Search engine cached URLs
- External sites linking to the docs
- Zero maintenance — the plugin generates static redirect HTML files

**Note:** URL redirects only cover the docs site. GitHub repo-path links to `_bundles/` will break. This is documented as a breaking change in the v2.9.0 release notes.
