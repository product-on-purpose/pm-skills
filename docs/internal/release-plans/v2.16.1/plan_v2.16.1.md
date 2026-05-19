# v2.16.1 Release Plan: Plugin Manifest Schema Patch

**Status**: SHIPPED 2026-05-19 (tag `v2.16.1` at SHA `15ab561`)
**Owner**: Maintainers
**Type**: Patch release (3-file manifest schema correction)
**Created**: 2026-05-18
**Updated**: 2026-05-19

## Release Theme

Remove the invalid `agents` field from `.claude-plugin/plugin.json` that has blocked `/plugin update pm-skills` since v2.16.0 shipped on 2026-05-17. The 59-skill catalog is unchanged from v2.16.0; the patch is fully scoped to the plugin manifest.

## Context

v2.16.0 declared a custom sub-agent path via `"agents": ["./subagents/"]` to work around the case-insensitive-filesystem collision between the tracked `AGENTS/` coordination directory and the canonical `agents/` directory Claude Code auto-discovers (per master plan D31 amendment). The schema assumption was wrong: Claude Code's plugin schema does not include an `agents` field. Result: every `/plugin update pm-skills` against v2.16.0 has been failing with:

```
Plugin pm-skills has an invalid manifest file at .claude-plugin/plugin.json.
Validation errors: agents: Invalid input
```

This patch removes the offending field. The dispatch skills at `skills/utility-pm-{role}/` continue to provide cross-client compatibility via inline execution. Native Claude Code sub-agent registration is deferred to v2.17.0 pending the `AGENTS/` directory rename.

### Prerequisites

- [x] v2.16.0 tagged and pushed (done 2026-05-17)
- [x] Validation error reproduced and root-caused (Claude Code plugin schema does not include `agents`)
- [x] v2.17.0 plan stub exists with the architectural fix scoped (`AGENTS/` rename + `subagents/` to `agents/` rename)
- [x] Release scoping doc `docs/internal/release-scoping-v2.17-and-v3.0_2026-05-18.md` captures the v2.17 vs v3.0 split

---

## Decisions

| Decision | Answer | Rationale |
|---|---|---|
| **Version** | **v2.16.1** (patch) | No skill content changes. Fixes a previously-broken update path. Patch per SemVer. |
| **Bundle scope** | plugin.json field removal + marketplace.json version bump + description refresh + CHANGELOG entry + release notes | All four changes are coupled to the same manifest defect. Smallest releasable unit. |
| **Sub-agent registration fix** | DEFER to v2.17.0 | Requires renaming the tracked `AGENTS/` coordination directory (multiple coordination files, scripts, docs reference it). Too large for a patch. Carried as Known Limitation per Release_v2.16.1.md. |
| **Description refresh in marketplace.json** | Include in v2.16.1 | Mentions the patch context (schema fix) for users reading the marketplace listing. Aligns description with reality. |
| **Adversarial review** | Run lightweight review at G1 attestation | Initial scope-based proposal was to waive (3-file mechanical patch). Maintainer elected at G1 to run a quick review for second-pair-of-eyes value. codex:codex-rescue dispatch returned a status placeholder without filling findings (tool-surface mismatch: Bash-only agent vs. structured-edit task); Claude (claude-opus-4.7) ran the review in-session. Findings + severity + disposition captured at `docs/internal/release-plans/v2.16.1/plan_v2.16.1_reviewed-by-claude.md`. Cross-LLM independence NOT preserved for this review; documented in the file's Reviewer Assessment block. |
| **Validator strategy** | Full pre-tag-validate bundle | Per `feedback_pre-tag-validator-bundle` memory: every truly-enforcing validator with `--strict`, not the "feels green" subset. v2.16.0 was tagged at HEAD `a05e55e` then this work plus 2 README draft commits accumulated; need re-verification of HEAD before tagging. |
| **Branch** | Direct on main | Patch is minimal. Worktree adds friction without isolation benefit at this scope. |
| **Tag SHA** | G2.5-captured commit only | Per D22: tag points at the commit containing release-prep edits, not at pre-edit HEAD. |

---

## Deliverables

### Manifest fixes

| File | Change | Status |
|---|---|---|
| `.claude-plugin/plugin.json` | Removed `agents` field (line 23-24); bumped `version` from `2.16.0` to `2.16.1` | Done (staged) |
| `.claude-plugin/marketplace.json` | Bumped `plugins[0].version` to `2.16.1`; refreshed description to mention the schema patch + v2.17.0 carryover | Done (staged) |

### Documentation

| File | Change | Status |
|---|---|---|
| `CHANGELOG.md` | New `## [2.16.1] - 2026-05-18` entry: Fixed + Known limitations + Not changed + Affected files | Done (staged) |
| `docs/releases/Release_v2.16.1.md` | Release notes (TL;DR + What's fixed + Why it matters + Known limitations + What does NOT change + Affected files) | Done (untracked) |

### Release governance

| File | Change | Status |
|---|---|---|
| `docs/internal/release-plans/v2.16.1/plan_v2.16.1.md` | This file | Done |
| `docs/internal/release-scoping-v2.17-and-v3.0_2026-05-18.md` | Scope split between v2.17.0 (sub-agent native registration; additive) and v3.0.0 (marketplace identity rename; breaking) | Done (untracked, drafts v2.17 + v3.0 trajectory) |
| `docs/internal/marketplace-multi-plugin-migration_2026-05-18.md` | Multi-plugin marketplace architecture target | Done (untracked, informational for v3.0.0) |

---

## Pre-release checklist (6-gate runbook)

### G0: Pre-tag readiness

- [ ] Working tree expectations confirmed (3 staged manifest files + 3 untracked plan/scoping/release-notes docs)
- [ ] `scripts/pre-tag-validate.ps1` PASS (full enforcing validator inventory with --strict)
- [ ] Em-dash sweep PASS (no U+2014 or U+2013 in committed content per CLAUDE.md)
- [ ] Aggregate counters unchanged from v2.16.0 (59 skills + 4 sub-agents + 12 workflows + 66 commands)
- [ ] Cross-cutting audit via pm-skill-auditor logic inline (sub-agent not yet natively registered)
- [ ] Master plan exists (this file)
- [ ] Release notes exist (Release_v2.16.1.md)

### G1: Adversarial review

- [ ] Maintainer attests: 3-file manifest patch scope does not warrant full adversarial review cycle; documented in Decisions table above

### G2: Version bump + CHANGELOG prep (already complete in working tree)

- [x] plugin.json version 2.16.0 to 2.16.1
- [x] marketplace.json version 2.16.0 to 2.16.1 + description refresh
- [x] CHANGELOG.md 2.16.1 entry
- [x] Release notes drafted at Release_v2.16.1.md
- [ ] Hidden-comment leak check (grep CHANGELOG.md for `<!-- justification:` debug comments)

### G2.5: Commit release-prep + re-verify

- [ ] Stage 3 staged files + 1 untracked release notes + this plan + scoping docs
- [ ] Commit with message `chore(v2.16.1): release-prep edits for v2.16.1`
- [ ] Working tree clean post-commit
- [ ] Re-run G0 sub-checks against new HEAD
- [ ] Push to origin/main
- [ ] Verify CI green on the new commit
- [ ] Capture commit SHA (the only SHA G3 will tag)

### G3: Tag + push

- [ ] **Per D22, verify tag target SHA = G2.5 captured SHA. Refuse to tag any other SHA.** This is the load-bearing invariant that prevents the broken-tag class of bug (see `subagents/pm-release-conductor.md` Critical Discipline Points section).
- [ ] Annotated tag message drafted
- [ ] `git tag -a v2.16.1 -m <message> <G2.5-SHA>` (SHA from G2.5 sub-check 7 only)
- [ ] `git push origin v2.16.1` (after explicit ship-it confirmation)

### G4: Post-tag hygiene

**P0: Plugin install path smoke test (Claude Code).** This is the only sub-check that proves v2.16.1 delivers value. Run within 30 minutes of G3 push.

Three scenarios; all must pass:

1. **Existing install update path:**
   - On a Claude Code instance with pm-skills currently at v2.15.x (or with a failed v2.16.0 update attempt), run `/plugin marketplace update`
   - Expected: no schema validation errors; marketplace fetch succeeds
   - Then run `/plugin update pm-skills`
   - Expected: update succeeds; no `agents: Invalid input` error; plugin reports version `2.16.1`

2. **Fresh install path:**
   - On a Claude Code instance with NO pm-skills installed, run `/plugin marketplace add product-on-purpose/pm-skills`
   - Then run `/plugin install pm-skills@pm-skills-marketplace`
   - Expected: both succeed; plugin reports version `2.16.1`

3. **Dispatch skill execution (Claude Code):**
   - On the updated/fresh-install instance, run `/pm-audit-repo` (dispatch slash command from utility-pm-skill-auditor)
   - Expected: command resolves; dispatch skill executes the inline-execution path (sub-agent not natively registered; this is the carry-over behavior from v2.16.0 that v2.17.0 will resolve)

Pass: all 3 scenarios succeed. Fail: any scenario errors. Resolution path on failure: ship v2.16.2 via the same runbook (do NOT revert v2.16.1 tag per runbook Rollback Semantics).

Other G4 sub-checks:

- [ ] GitHub Pages rebuild triggered (P1)
- [ ] GitHub Release UI body authored (P2 reminder)
- [ ] v2.17.0 plan stub updated with the carryover items (P2 reminder; stub already exists)

**Rollback note:** If v2.16.1 itself ships with a defect (e.g., marketplace.json description refresh accidentally violates schema), ship v2.16.2 immediately via the same runbook. Tag reversion is destructive and not in v2.16 scope per runbook.

---

## Known limitations carried forward to v2.17.0

Native Claude Code sub-agent registration. Sub-agents live in `subagents/` rather than `agents/`. The architectural fix (rename `AGENTS/` then rename `subagents/` to `agents/`) is too large for a patch. Tracked at `docs/internal/release-plans/v2.17.0/plan_v2.17.0.md`.

The dispatch skills at `skills/utility-pm-{role}/` continue to provide the user-visible capability on every client (Claude Code via the inline path while native registration is deferred; Codex CLI + Cursor + Windsurf + Copilot + Gemini CLI via the validated reference-and-execute-inline pattern).

---

## Status block

- **Status:** SHIPPED 2026-05-19
- **Pre-G2.5 HEAD:** `0836672` (before release-prep commit)
- **G2.5 commit SHA #1 (release-prep):** `e22f32e` (release-prep bundle - failed CI on Astro YAML parse)
- **G2.5 commit SHA #2 (fix-forward):** `15ab561` (YAML colon-space fix; tag target per D22)
- **Tag SHA:** `15ab561` (annotated tag `v2.16.1` pushed to origin 2026-05-19)
- **GitHub Release:** https://github.com/product-on-purpose/pm-skills/releases/tag/v2.16.1 (published 2026-05-19T07:03:44Z; body replaced with rich content from Release_v2.16.1.md)
- **G4 P0 smoke test:** PENDING maintainer execution on Claude Code (3 scenarios per G4 checklist above)

## Related documentation

- Release notes: `docs/releases/Release_v2.16.1.md`
- v2.17.0 stub: `docs/internal/release-plans/v2.17.0/plan_v2.17.0.md`
- v2.17 vs v3.0 scoping: `docs/internal/release-scoping-v2.17-and-v3.0_2026-05-18.md`
- v3.0 architecture target: `docs/internal/marketplace-multi-plugin-migration_2026-05-18.md`
- Master plan D31 amendment (sub-agent registration): `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md`
- Canonical 6-gate runbook: `docs/contributing/release-runbook.md`
