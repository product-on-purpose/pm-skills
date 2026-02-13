# PM-Skills v2.2.0 Release Review

**Reviewer:** Claude (Opus 4.6)
**Date:** 2026-02-13
**Release Under Review:** v2.2.0 — Guardrails and Governance
**Produced By:** Codex agent
**Review Type:** Post-ship quality and completeness assessment

---

## Executive Summary

v2.2.0 is a well-scoped governance release that delivers on its three stated objectives: observe-mode MCP drift detection (B-02 phase 1), planning persistence policy (B-07), and canonical backlog governance (B-08). The release is disciplined in what it excludes — no new skills, no blocking CI, no premature contract decisions — which is a strength. The artifacts are clean, internally consistent, and set up the v2.3–v2.5 roadmap with clear dependency ordering.

**Overall assessment: Solid execution.** A few gaps noted below, mostly around staleness in adjacent tracked files and a minor `.gitignore` contradiction.

---

## 1. Scope Adherence

### What was promised (from `checklist_v2.2.0.md`)

| Item | Scope | Delivered? |
|------|-------|-----------|
| B-02 phase 1: `validate-mcp-sync` observe mode | Script + workflow + guide | Yes |
| B-07: Planning persistence policy + `.gitignore` alignment | Policy doc + tier map + `.gitignore` changes | Yes |
| B-08: Canonical backlog + supersession pointers | `backlog-canonical.md` + redirect headers in legacy files | Partially — see finding #3 |

### Non-goals respected

| Non-goal | Violated? |
|----------|-----------|
| No blocking CI drift enforcement | No |
| No output/config contract lock | No |
| No foundation/persona decision closure | No |

**Verdict:** Scope was respected. The release does what it says and avoids scope creep.

---

## 2. Artifact-by-Artifact Review

### 2.1 MCP Sync Validation Script (`.github/scripts/validate-mcp-sync.js`)

**Strengths:**
- Clean, readable Node.js with no external dependencies — appropriate for a CI script
- Dual-mode design (`observe` / `block`) with environment variable toggle is well-architected for progressive rollout
- Handles both flat (`skills/{phase-skill}/`) and legacy nested (`skills/{phase}/{skill}/`) directory structures via `normalizeSkillName()` — good forward/backward compatibility
- Produces GitHub Actions step summary output (`GITHUB_STEP_SUMMARY`), which is a nice CI UX touch
- Actionable manual sync checklist printed on drift detection — reduces cognitive load for contributors
- Separate exit codes (1 for drift-block, 2 for execution errors) enable proper CI differentiation

**Issues:**
1. **Missing `package.json` type declaration.** The script uses `import` (ESM syntax) but there is no `package.json` with `"type": "module"` in `.github/scripts/`. The workflow invokes it as `node pm-skills/.github/scripts/validate-mcp-sync.js` directly. This will fail on Node 18+ without either a `.mjs` extension or a `package.json` declaring ESM. **Severity: Medium** — may silently break in CI depending on the runner's Node version and whether the MCP repo's `package.json` type field is inherited.
2. **No SKILL.md content comparison.** The script only checks skill inventory (presence/absence), not content drift. A skill could be present in both repos but with divergent content. This is acknowledged as out-of-scope for B-02 phase 1, but worth noting for B-02 phase 2 planning.
3. **`foundation` in PHASES set.** The `PHASES` constant includes `"foundation"` which is not yet a decided phase (deferred to B-05 in v2.5.0). Including it preemptively is pragmatic but could cause confusion if the phase is never adopted.

### 2.2 MCP Sync Workflow (`.github/workflows/validate-mcp-sync.yml`)

**Strengths:**
- Correctly scoped triggers: only fires on changes to `skills/**`, `commands/**`, and the sync infrastructure itself
- Supports manual dispatch with mode selection — useful for testing
- Minimal permissions (`contents: read`) — good security posture
- Checks out both repos side-by-side for accurate comparison

**Issues:**
1. **Cross-repo checkout assumes public access.** The workflow checks out `product-on-purpose/pm-skills-mcp` without authentication. This works for public repos but would silently fail if the MCP repo were ever made private. Not a current risk, but worth a comment in the workflow.
2. **No Node version pinned.** The workflow relies on the runner's default Node. Given the ESM concern above, pinning `actions/setup-node@v4` with a specific version would be safer.

### 2.3 MCP Sync Guide (`docs/guides/validate-mcp-sync.md`)

**Strengths:**
- Concise and well-structured — covers purpose, workflow, script, manual checklist, and rollout sequencing
- Cross-references actual file paths correctly
- Clear escalation path (observe → block after B-01 closure)

**Issues:**
- None significant. This is a good reference document.

### 2.4 Planning Persistence Policy (`docs/internal/planning-persistence-policy.md`)

**Strengths:**
- Clear three-tier model (durable / working-state / scratch) with explicit examples
- Promotion rule is well-defined: only finalized decisions get promoted, not raw notes
- Governance checks tied to release process

**Issues:**
1. **`AGENTS/DECISIONS.md` contradiction.** The policy lists `AGENTS/DECISIONS.md` as Tier 1 (tracked), but the `.gitignore` file contains `AGENTS/DECISIONS.md` at line 60, which **ignores** it. The `!AGENTS/DECISIONS.md` negation at line 53 is overridden by the explicit ignore at line 60 (last match wins in `.gitignore`). **Severity: High** — this means the cross-agent decision index is effectively untracked despite the policy declaring it durable. This appears to be a `.gitignore` ordering bug.

### 2.5 Planning Artifact Tier Map (`docs/internal/planning-artifact-tier-map.md`)

**Strengths:**
- Useful reference table that complements the policy narrative
- Promotion checklist with three clear conditions is actionable

**Issues:**
- Duplicates the policy content in a different format. Not necessarily bad (reference table vs. narrative), but increases maintenance surface. Consider whether one document could serve both purposes.

### 2.6 Canonical Backlog Governance (`docs/internal/backlog-canonical.md`)

**Strengths:**
- Clearly designates a single canonical backlog file
- Lists superseded files explicitly
- Release cadence anchors tie backlog items to version targets

**Issues:**
1. **Canonical file is in `_NOTES/` (gitignored).** The designated canonical backlog is at `_NOTES/efforts/backlog/backlog_codex_2026-02-02_...md`, which is in the `_NOTES/` directory — a Tier 3 ignored path. This means external contributors and collaborators cannot access the canonical backlog. The governance document itself is tracked (`docs/internal/`), but the artifact it points to is not. **Severity: Medium** — this is internally consistent with the planning persistence policy (backlogs are working-state), but "canonical" implies durability that "gitignored" contradicts. The operating rule compensates ("reflect release-ready changes in `docs/releases/*.md`"), but the naming creates cognitive dissonance.

### 2.7 Release Execution Plan (`docs/releases/Release_v2.2_to_v2.5_execution-plan.md`)

**Strengths:**
- Excellent dependency-safe sequencing across four releases
- Each release has clear scope, exit criteria, and non-goals
- Interface impact summary at the end is a good addition for downstream consumers
- Test scenarios section provides concrete validation targets

**Issues:**
- None significant. This is one of the strongest artifacts in the release.

### 2.8 Release Checklists (`checklist_v2.2.0.md` through `checklist_v2.5.0.md`)

**Strengths:**
- Consistent format across all four checklists
- Non-goals explicitly confirmed (prevents scope creep)
- Exit criteria are specific and verifiable

**Issues:**
1. **v2.2.0 checklist status says "In progress"** despite the release being shipped. Should be updated to "Complete" or "Shipped" to match `Release_v2.2.md`.

---

## 3. Cross-Cutting Findings

### Finding #1: CONTEXT.md is stale

`AGENTS/claude-opus-4.5/CONTEXT.md` still describes the project as "Post-v1.2.0" with v2.0 migration as the next step. It was last updated 2026-01-26. The architecture section still shows the nested `skills/{phase}/{skill}/` structure. This is a Tier 1 tracked file that should reflect current state.

**Recommendation:** Update CONTEXT.md to reflect v2.2.0 state, flat structure, and current roadmap.

### Finding #2: DECISIONS.md has no v2.x entries

`AGENTS/claude-opus-4.5/DECISIONS.md` only contains three decisions from 2026-01-14. The v2.0 structural migration, v2.1 MCP alignment, and v2.2 governance decisions are not recorded. Per the planning persistence policy, decisions that affect release behavior should be captured here.

**Recommendation:** Add decision records for the flat structure migration (v2.0), MCP alignment approach (v2.1), and governance model choices (v2.2).

### Finding #3: Supersession pointers unverifiable

The `backlog-canonical.md` states that superseded backlog files should carry "redirect headers," but since these files are in `_NOTES/` (gitignored), there's no way to verify this was actually done. The checklist marks this as complete, but the evidence is not accessible in the tracked repository.

**Recommendation:** Either add a verification step that can run against the local workspace, or note this as a locally-verified-only item.

### Finding #4: `.gitignore` has conflicting rules for `AGENTS/DECISIONS.md`

Lines 48-55 set up negation patterns to track `CONTEXT.md` and `DECISIONS.md`:
```
AGENTS/*/SESSION-LOG/
AGENTS/*/TODO.md
AGENTS/*/PLANNING/
!AGENTS/*/CONTEXT.md
!AGENTS/*/DECISIONS.md
!AGENTS/DECISIONS.md
```

But line 60 adds:
```
AGENTS/DECISIONS.md
```

The line 60 entry re-ignores the cross-agent `AGENTS/DECISIONS.md` file that line 53 tried to un-ignore. This may be intentional (if the file doesn't exist yet and the team prefers it not be tracked), but it contradicts the planning persistence policy which lists it as Tier 1 durable.

**Recommendation:** Remove line 60 if the cross-agent decision index should be tracked, or update the policy to reflect the actual intent.

### Finding #5: No CHANGELOG entry for v2.1.0 governance work

The CHANGELOG v2.2.0 entry is well-structured and follows Keep a Changelog format. No issues there. However, the Release Notes section references blocker IDs (B-02, B-07, B-08) without linking to where these are defined. An external reader encountering these identifiers would have no way to understand them since the backlog is gitignored.

**Recommendation:** Either briefly expand the blocker descriptions in the CHANGELOG, or add a tracked reference document mapping blocker IDs to descriptions.

---

## 4. Code Quality Assessment

### `validate-mcp-sync.js` — Detailed

| Dimension | Rating | Notes |
|-----------|--------|-------|
| Readability | Good | Clear function names, logical flow, no unnecessary abstraction |
| Error handling | Adequate | Try/catch at top level, `pathExists` helper, but no validation of env var paths |
| Testability | Fair | Functions are well-separated but no test suite exists; would benefit from unit tests before switching to block mode |
| Robustness | Fair | ESM import concern; no handling for symlinks, permissions errors, or very large skill directories |
| Documentation | Good | Inline comments are minimal but the companion guide compensates |

---

## 5. Release Process Observations

**What worked well:**
- Clear separation of release notes (`Release_v2.2.md`) from checklists — serves different audiences
- Execution plan covering v2.2–v2.5 in one document shows strategic thinking
- Non-goals are stated and enforced — prevents the common failure mode of governance releases expanding into feature work
- Progressive rollout (observe → block) demonstrates maturity in CI/CD thinking

**What could improve:**
- Tracked context files (CONTEXT.md, DECISIONS.md) were not updated as part of the release
- The checklist status field was not finalized post-ship
- No automated tests for the validation script itself

---

## 6. Recommendations for v2.3.0

1. **Fix the `.gitignore` DECISIONS.md conflict** before it causes confusion during B-01 closure work
2. **Add `actions/setup-node@v4`** to the MCP sync workflow with a pinned Node version
3. **Add a `package.json`** in `.github/scripts/` with `"type": "module"` (or rename to `.mjs`)
4. **Update `AGENTS/claude-opus-4.5/CONTEXT.md`** to reflect current project state
5. **Add v2.0–v2.2 decision records** to `AGENTS/claude-opus-4.5/DECISIONS.md`
6. **Write unit tests for `validate-mcp-sync.js`** before flipping to block mode — a blocking CI check deserves test coverage
7. **Consider adding content-level drift detection** (hash comparison of SKILL.md files) as a B-02 phase 2 enhancement

---

## 7. Summary Scorecard

| Dimension | Score | Notes |
|-----------|-------|-------|
| Scope adherence | 9/10 | Delivered all three objectives; non-goals respected |
| Artifact quality | 7/10 | Clean code and docs; ESM issue and .gitignore conflict are notable |
| Documentation | 8/10 | Good guides and policies; CONTEXT.md staleness is a gap |
| Release process | 7/10 | Strong planning artifacts; checklist not finalized post-ship |
| Strategic value | 9/10 | Establishes governance foundation for v2.3–v2.5 roadmap |
| **Overall** | **8/10** | **Solid governance release with a few housekeeping gaps** |

---

*Review produced by Claude (Opus 4.6) on 2026-02-13 as a cross-agent quality check of Codex-produced v2.2.0 release artifacts.*
