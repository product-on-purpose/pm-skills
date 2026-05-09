# Update Suggestions for Codex Agent Context
Author: Claude Opus 4.6
Date: 2026-04-03
Context: Post-v2.8.0 release wrap

## Summary

After completing v2.8.0, several items in the Codex agent context files are stale. These suggestions are for the next Codex session to pick up.

## CONTEXT.md . `AGENTS/codex/CONTEXT.md`

### 1. Status section (line 4-5) . STALE

**Current:**
```
- Active; last updated: 2026-03-22
- Focus: `v2.7.0` execution/handoff...
```

**Should be:**
```
- Active; last updated: 2026-04-03
- Focus: Post-v2.8.0 . backlog triage, M-13 convention alignment, next release planning
```

### 2. Project snapshot (lines 12-23) . STALE

**Current:**
```
- Latest published release baseline: `v2.6.1`
- local branch is ahead of `origin/main` by `2` commits
- `26` skills total
- `0` committed utility skills
```

**Should be:**
```
- Latest published release baseline: `v2.8.0`
- local branch is up to date with `origin/main`
- `29` skills total
- `25` domain skills
- `1` foundation skill: `foundation-persona`
- `3` utility skills: `utility-pm-skill-builder`, `utility-pm-skill-validate`, `utility-pm-skill-iterate`
```

### 3. Current execution snapshot (lines 33-48) . STALE

The entire section describes v2.7.0 execution state (M-12, F-06, M-16, F-05). All of this is done. Replace with:

```
- Codex execution lane:
  - v2.8.0: M-18 CI scripts implemented and committed (`c099efa`) . validate-skill-history + validate-skills-manifest
  - v2.8.0: Pre-release consistency review completed . 8 findings, all resolved by Claude
  - No active Codex work in progress
- Claude execution lane:
  - v2.8.0 released and tagged (2026-04-03)
  - All efforts committed: F-10, F-11, D-03, D-04, M-18
  - MCP synced: pm-skills-mcp v2.8.0
```

### 4. Immediate next steps (lines 57-60) . STALE

Replace with:
```
1. Backlog triage . review `docs/internal/backlog-canonical.md` for next priority
2. M-13 convention alignment pass is next in backlog priority
3. End-to-end lifecycle test (builder → validator → iterator) still pending from v2.8.0
```

### 5. Reference section (lines 62-67) . STALE

Update:
- `Current release governance` → `docs/internal/release-plans/v2.8.0/plan_v2.8.0.md`
- Add: `Skill versioning governance: docs/internal/skill-versioning.md`
- Add: `v2.8.0 Codex design review: docs/internal/release-plans/v2.8.0/_archived/plan_v2.8.0_original_reviewed-by-codex.md`

### 6. release-plans path (line 27) . Already correct

The line already says `docs/internal/release-plans/**` . this was updated during the session. No change needed.

## DECISIONS.md . `AGENTS/codex/DECISIONS.md`

Not reviewed in detail. Codex should check for any stale references to `docs/internal/releases/` (old path) and update to `docs/internal/release-plans/`.

## AGENTS/DECISIONS.md . Shared decisions

### Suggest adding:

```
## 2026-04-03: Skill versioning governance
**Status:** Accepted
**Summary:** Each skill has independent SemVer versioning tracked in SKILL.md frontmatter. skills-manifest.yaml per release records which skill versions changed. HISTORY.md per skill is created at second-version trigger. Tie-breaker rule resolves gray-area bumps.
**Applies to:** Claude, Codex, release packaging, lifecycle tools.
**Consequences:** F-11 iterator suggests version bumps; M-18 CI validates HISTORY.md and manifest consistency; release prep includes skills-manifest.yaml.
```

```
## 2026-04-03: PM skill lifecycle tools
**Status:** Accepted
**Summary:** Three utility skills form a Create → Validate → Iterate lifecycle. F-10 validator produces pipe-delimited reports (Report schema: v1). F-11 iterator consumes reports and applies changes. Quality standard is evolutionary . validates current conventions, surfaces v2.8 standard as suggestions.
**Applies to:** Claude, Codex, skill creation and maintenance workflows.
**Consequences:** New skills should be validated before shipping; convention changes should use batch validate → triage → iterate workflow.
```
