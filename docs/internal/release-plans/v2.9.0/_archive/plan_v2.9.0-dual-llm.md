# v2.9.0 Dual-LLM Execution Plan

Parent: [plan_v2.9.0.md](plan_v2.9.0.md)

## Agent Assignment Framework

| Agent | Strengths | Assign when |
|-------|----------|-------------|
| **Claude Opus 4.6** | Design thinking, PM domain expertise, interactive iteration, novel content, contextual judgment | Ambiguous changes, new workflow authoring, content that needs human collaboration |
| **Codex GPT-5.4** | Mechanical batch operations, pattern-following, bounded autonomous tasks, scripting | Well-specified find-replace, script creation from spec, file generation, validation |

---

## Assignment Rationale

### What Codex does best here

M-19 is predominantly **mechanical rename work** — find `_bundles` replace with `_workflows`, find "Workflow Bundles" replace with "Workflows", update path references. This is exactly Codex's strength: a well-specified, bounded, pattern-following task across many files. Codex can:
- Execute the ~400-reference rename across ~100 files without fatigue or drift
- Create the terminology guard script from the pseudocode spec
- Update CI workflow YAML files (exact path changes specified)
- Update build scripts (exact string replacements)
- Run validation and report results

### What Claude does best here

F-13 requires **authoring new workflow content** — adapting the `bundle_*` drafts into production `_workflows/*.md` files that match the established format (header block, When to Use, Workflow Steps, Context Flow, Tips and Variations). This requires:
- PM domain judgment about workflow guidance quality
- Contextual adaptation of draft content to match existing workflow style
- Writing the generation script (`generate-workflow-pages.py`) with understanding of the dual-file pattern
- Authoring the release notes narrative
- Interactive review with user

---

## Execution Plan

### Phase 1: M-19 Rename (Commit 1)

```
                    ┌─────────────────────────┐
                    │ Phase 1A: Codex (parallel)│
                    │ Mechanical rename        │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │ Phase 1B: Claude (review)│
                    │ Verify + edge cases      │
                    └────────────┬────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │ Phase 1C: Commit 1       │
                    │ Human approval           │
                    └────────────┬────────────┘
                                 │
          ┌──────────────────────┼──────────────────────┐
          │                      │                      │
┌─────────▼─────────┐ ┌─────────▼─────────┐ ┌─────────▼─────────┐
│ Phase 2A: Claude   │ │ Phase 2B: Codex   │ │ Phase 2C: Codex   │
│ Author 6 workflows │ │ Generation script │ │ Commands + updates │
│ (sequential)       │ │ (parallel)        │ │ (after 2A)        │
└─────────┬─────────┘ └─────────┬─────────┘ └─────────┬─────────┘
          │                      │                      │
          └──────────────────────┼──────────────────────┘
                                 │
                    ┌────────────▼────────────┐
                    │ Phase 3: Release         │
                    │ Claude: release notes    │
                    │ Codex: validation sweep  │
                    └─────────────────────────┘
```

### Phase 1A — Codex: Mechanical Rename

**Agent:** Codex GPT-5.4
**Can start:** Immediately
**Blocked by:** Nothing

All of M-19 except edge-case review. This is the critical path bottleneck — ~100 files, ~400 references.

| # | Task | Files | Notes |
|---|------|-------|-------|
| 1.1 | Directory renames | `_bundles/` → `_workflows/`, `docs/bundles/` → `docs/workflows/` | `git mv` |
| 1.2 | CI path triggers | `validate-docs.yml`, `deploy-docs.yml`, `sync-agents-md.yml`, `release.yml` | Exact string replacement |
| 1.3 | Build scripts | `build-release.sh`, `build-release.ps1`, `build-release.md` | `_bundles` → `_workflows` |
| 1.4 | Command rename | `kickoff.md` → `workflow-feature-kickoff.md`, delete `kickoff.md` | Update internal refs in the renamed file |
| 1.5 | mkdocs nav + redirects | `mkdocs.yml`, `requirements-docs.txt` | Nav paths, section name, redirects plugin |
| 1.6 | sync-agents-md.yml rewrite | `.github/workflows/sync-agents-md.yml` | Hardcoded table: headers, links, section name |
| 1.7 | generate-skill-pages.py | `scripts/generate-skill-pages.py` | Bundle count, `/kickoff` row, command table |
| 1.8 | Public-facing docs rename | `README.md`, `AGENTS.md`, `QUICKSTART.md`, `marketplace.json`, `.claude-plugin/plugin.json` | "bundles" → "workflows", paths, counts |
| 1.9 | Docs site pages | ~15 files in `docs/` (getting-started, concepts, guides, reference, showcase, skills) | Contextual find-replace per tier tables |
| 1.10 | Internal docs | `docs/internal/` files (release plans, mkdocs config, skill-versioning, etc.) | Bundle terminology → workflow |
| 1.11 | Agent context | `AGENTS/claude/CONTEXT.md`, `AGENTS/codex/CONTEXT.md`, `AGENTS/DECISIONS.md` | Structure listing, feature set |
| 1.12 | `docs/changelog.md` | Separate from `CHANGELOG.md` — update v2.9.0 entry independently | Both files need independent updates |
| 1.13 | Create terminology guard | `scripts/check-stale-bundle-refs.sh` + `.ps1` | From pseudocode spec in M-19 plan |
| 1.14 | Wire guard into CI | `.github/workflows/validation.yml` | Add advisory job/step |
| 1.15 | Directory READMEs | `_workflows/README.md`, `docs/workflows/README.md` | From spec in plan |

**Codex Execution Context:**
- **Read first:** `plan_bundles-to-workflows.md` (full plan with tier tables), existing `_bundles/feature-kickoff.md` (format reference), `commands/kickoff.md` (current content), `.github/workflows/sync-agents-md.yml` (hardcoded table)
- **Convention:** All `_bundles` → `_workflows`, all `docs/bundles` → `docs/workflows`, "Workflow Bundles" → "Workflows", "bundle" → "workflow" where contextual. Tier 6 exclusions must be respected.
- **Constraints:** Do NOT modify historical release notes (v2.0–v2.8.x), archived docs, sample library, F-13 draft files, or `scripts/README_SCRIPTS.md`.

### Phase 1B — Claude: Edge-Case Review

**Agent:** Claude Opus 4.6
**Can start:** After Phase 1A completes
**Blocked by:** Phase 1A

Quick review pass for contextual judgment calls that mechanical rename may get wrong.

| # | Task | Why Claude |
|---|------|-----------|
| 1.16 | Review Codex's diff for false positives | "bundled with", "bundle of", or product-context "bundle" that shouldn't become "workflow" |
| 1.17 | Verify `docs/workflows/index.md` content quality | Title, description, table formatting — not just string replacement |
| 1.18 | Verify `sync-agents-md.yml` table renders correctly | Hardcoded heredoc is fragile |
| 1.19 | Run AT-1 through AT-11 and report results | Judgment on edge cases |

### Phase 1C — Commit 1

**Agent:** Human (approval) + Claude (commit)
**Blocked by:** Phase 1B

- Human reviews the diff
- Commit as Commit 1 (M-19)
- Verify CI passes on push

---

### Phase 2A — Claude: Author 6 Workflows

**Agent:** Claude Opus 4.6
**Can start:** After Phase 1C (Commit 1 landed)
**Blocked by:** Commit 1

This is the creative work — adapting the F-13 draft files into production workflows.

| # | Task | Why Claude |
|---|------|-----------|
| 2.1 | Author `_workflows/customer-discovery.md` | Adapt from `bundle_customer-discovery.md`, match existing workflow format, PM domain judgment |
| 2.2 | Author `_workflows/sprint-planning.md` | Same |
| 2.3 | Author `_workflows/product-strategy.md` | Same — longest/most complex workflow (5 skills) |
| 2.4 | Author `_workflows/post-launch-learning.md` | Same — spans pre-launch and post-launch |
| 2.5 | Author `_workflows/stakeholder-alignment.md` | Same |
| 2.6 | Author `_workflows/technical-discovery.md` | Same |

**Input:** Draft files at `docs/internal/efforts/F-13-workflow-expansion/bundle_*.md`
**Pattern to follow:** Existing `_workflows/feature-kickoff.md` format (header, When to Use, Workflow Steps, Context Flow, Tips and Variations)
**Output:** 6 production-ready `_workflows/*.md` files with repo-relative links

### Phase 2B — Codex: Generation Script (parallel with 2A)

**Agent:** Codex GPT-5.4
**Can start:** After Phase 1C (Commit 1 landed)
**Blocked by:** Commit 1 (needs `_workflows/` directory to exist)
**Parallel with:** Phase 2A

| # | Task | Why Codex |
|---|------|----------|
| 2.7 | Create `scripts/generate-workflow-pages.py` | Well-specified script: read `_workflows/*.md`, rewrite links, write to `docs/workflows/`. Pattern exists in `generate-skill-pages.py`. |
| 2.8 | Test against 3 existing workflows | Verify generated output matches current `docs/workflows/` content |

**Codex Execution Context:**
- **Read first:** `scripts/generate-skill-pages.py` (pattern to follow), `_workflows/feature-kickoff.md` (input format), `docs/workflows/feature-kickoff.md` (expected output)
- **Link rewrite rules:** `../skills/{phase}-{skill}/SKILL.md` → `../skills/{phase}/{phase}-{skill}.md`; `../README.md` → `https://github.com/product-on-purpose/pm-skills/blob/main/README.md`
- **Must also generate:** `docs/workflows/index.md` with full workflow table

### Phase 2C — Codex: Commands + Cross-Cutting Updates (after 2A)

**Agent:** Codex GPT-5.4
**Can start:** After Phase 2A completes (needs workflow files to reference)
**Blocked by:** Phase 2A (command files reference workflow skill chains)

| # | Task | Why Codex |
|---|------|----------|
| 2.9 | Create 6 `commands/workflow-*.md` files | Pattern-following from `commands/workflow-feature-kickoff.md` |
| 2.10 | Run `generate-workflow-pages.py` to produce `docs/workflows/*.md` | Mechanical execution |
| 2.11 | Add 6 nav entries to `mkdocs.yml` | Exact YAML additions |
| 2.12 | Update AGENTS.md | Add 6 workflow rows to table |
| 2.13 | Update README.md | Counts (3→9), workflow table (add 6 rows) |
| 2.14 | Update `docs/reference/project-structure.md` | Table 3→9, command count |
| 2.15 | Update `docs/reference/commands.md` | Add 6 workflow commands to table |
| 2.16 | Update `scripts/generate-skill-pages.py` | Command count, add 6 workflow commands to reference |
| 2.17 | Update `AGENTS/claude/CONTEXT.md` | Workflow count |
| 2.18 | Update `.github/workflows/sync-agents-md.yml` | Add 6 new workflow rows to hardcoded table |
| 2.19 | Bump `.claude-plugin/plugin.json` version to 2.9.0 | Mechanical |
| 2.20 | Update `CHANGELOG.md` v2.9.0 entry | Add F-13 items, finalize breaking-change callout |
| 2.21 | Update `docs/changelog.md` v2.9.0 entry | Same — independent file |

**Codex Execution Context:**
- **Read first:** `commands/workflow-feature-kickoff.md` (command format), `AGENTS.md` (current table), `README.md` (current workflow table)
- **Convention:** Command filename = `workflow-{workflow-name}.md`. Command references `_workflows/{name}.md` for skill paths.
- **Constraints:** Only add rows — do not restructure existing tables.

---

### Phase 3 — Release

**Blocked by:** Phase 2A, 2B, 2C all complete

| # | Task | Agent | Why |
|---|------|-------|-----|
| 3.1 | Author `docs/releases/Release_v2.9.0.md` | **Claude** | Narrative writing, breaking-change framing |
| 3.2 | Run full AT-1 through AT-14 | **Codex** | Mechanical validation sweep |
| 3.3 | Run `mkdocs build --strict` + `mkdocs serve` visual check | **Claude** | Judgment on rendering quality |
| 3.4 | Human approval → Commit 2 → tag v2.9.0 | **Human** | Final sign-off |

---

## Critical Path

```
Phase 1A (Codex: rename)         ████████████░░░░░░░░░░░░░░░░░░░░
Phase 1B (Claude: review)                    ███░░░░░░░░░░░░░░░░░
Phase 1C (Human: commit 1)                      █░░░░░░░░░░░░░░░░
Phase 2A (Claude: author 6 wf)                    ████████████░░░░
Phase 2B (Codex: gen script)                       █████░░░░░░░░░░  ← parallel with 2A
Phase 2C (Codex: commands+updates)                          █████░  ← after 2A
Phase 3  (Release)                                               ██

Critical path: 1A → 1B → 1C → 2A → 2C → 3
```

**The critical path runs through Claude**, not Codex. Phase 2A (authoring 6 workflows) is the longest creative task and nothing in Phase 2C can start until it's done (commands reference workflow skill chains). Codex's Phase 2B (generation script) runs in parallel with 2A and is not on the critical path.

**Key parallel opportunity:** While Claude authors workflows (2A), Codex builds and tests the generation script (2B). When 2A finishes, Codex immediately runs the script (2.10) and creates commands (2C).

---

## Conflict Avoidance

### Files touched by both agents

These files are modified in Phase 1 (M-19, Codex) AND Phase 2 (F-13, Codex/Claude). Since Commit 1 lands before Phase 2 starts, there is no concurrent edit conflict — Phase 2 works on the post-Commit-1 state.

| File | Phase 1 (M-19) | Phase 2 (F-13) |
|------|----------------|----------------|
| `mkdocs.yml` | Rename nav paths, add redirects | Add 6 new nav entries |
| `AGENTS.md` | Rename 3 existing rows | Add 6 new rows |
| `README.md` | Rename terminology, update paths | Update count 3→9, add 6 table rows |
| `docs/reference/project-structure.md` | Rename `_bundles/` → `_workflows/` | Update table 3→9 |
| `docs/reference/commands.md` | Rename `/kickoff` | Add 6 new commands |
| `scripts/generate-skill-pages.py` | Rename bundle refs | Update count, add 6 commands |
| `.github/workflows/sync-agents-md.yml` | Rename table | Add 6 new rows |
| `AGENTS/claude/CONTEXT.md` | Rename refs | Update count |
| `CHANGELOG.md` | M-19 rename entry | F-13 expansion items |
| `docs/changelog.md` | Same | Same |

**No concurrent conflict** because:
1. Commit 1 (M-19) lands and is pushed before Phase 2 begins
2. Phase 2A (Claude: authoring) touches only `_workflows/*.md` — no overlap with Phase 2C (Codex: cross-cutting)
3. Phase 2B (Codex: script) touches only `scripts/generate-workflow-pages.py` — no overlap with 2A or 2C
4. Phase 2C (Codex: commands + updates) starts after 2A, so no concurrent edits

### Git worktree consideration

If using worktrees for isolation:
- **Phase 1A (Codex):** Can run in a worktree branched from `main`
- **Phase 2B (Codex):** Can run in a separate worktree branched from Commit 1 — no file overlap with Phase 2A
- **Phase 2A (Claude) + 2C (Codex):** Must be sequential on the same branch — 2C depends on 2A's output

---

## Summary Table

### Phase 1 — M-19 Rename (Commit 1)

| # | Task | Agent | Parallel? | Depends on |
|---|------|-------|-----------|------------|
| 1.1 | Directory renames | Codex | — | — |
| 1.2 | CI path triggers | Codex | 1.1 | 1.1 |
| 1.3 | Build scripts | Codex | ∥ 1.2 | 1.1 |
| 1.4 | Command rename + delete | Codex | ∥ 1.2 | 1.1 |
| 1.5 | mkdocs nav + redirects | Codex | ∥ 1.2 | 1.1 |
| 1.6 | sync-agents-md.yml rewrite | Codex | ∥ 1.2 | 1.1 |
| 1.7 | generate-skill-pages.py | Codex | ∥ 1.2 | 1.1 |
| 1.8 | Public-facing docs | Codex | ∥ 1.2 | 1.1 |
| 1.9 | Docs site pages | Codex | ∥ 1.2 | 1.1 |
| 1.10 | Internal docs | Codex | ∥ 1.2 | 1.1 |
| 1.11 | Agent context files | Codex | ∥ 1.2 | 1.1 |
| 1.12 | docs/changelog.md | Codex | ∥ 1.2 | 1.1 |
| 1.13 | Create terminology guard | Codex | ∥ 1.2 | — |
| 1.14 | Wire guard into CI | Codex | after 1.13 | 1.13 |
| 1.15 | Directory READMEs | Codex | ∥ 1.2 | 1.1 |
| 1.16 | Review diff for false positives | **Claude** | after 1.1-1.15 | All 1.x |
| 1.17 | Verify index.md quality | **Claude** | ∥ 1.16 | All 1.x |
| 1.18 | Verify sync-agents-md.yml | **Claude** | ∥ 1.16 | All 1.x |
| 1.19 | Run AT-1 through AT-11 | **Claude** | after 1.16-1.18 | 1.16-1.18 |

### Phase 2 — F-13 Expansion (Commit 2)

| # | Task | Agent | Parallel? | Depends on |
|---|------|-------|-----------|------------|
| 2.1-2.6 | Author 6 workflows | **Claude** | sequential | Commit 1 |
| 2.7 | Create generation script | Codex | **∥ 2.1-2.6** | Commit 1 |
| 2.8 | Test script on 3 existing | Codex | after 2.7 | 2.7 |
| 2.9 | Create 6 command files | Codex | after 2.6 | 2.1-2.6 |
| 2.10 | Run generation script | Codex | after 2.6 + 2.8 | 2.6, 2.8 |
| 2.11-2.21 | Cross-cutting updates | Codex | after 2.10 | 2.10 |

### Phase 3 — Release

| # | Task | Agent | Depends on |
|---|------|-------|------------|
| 3.1 | Author release notes | **Claude** | All Phase 2 |
| 3.2 | Run AT-1 through AT-14 | Codex | All Phase 2 |
| 3.3 | Visual check (mkdocs serve) | **Claude** | 3.2 |
| 3.4 | Commit 2 + tag v2.9.0 | **Human** | 3.1-3.3 |

---

## Agent Load Summary

| Agent | Tasks | Type of work |
|-------|-------|-------------|
| **Codex** | 1.1-1.15, 2.7-2.8, 2.9-2.21, 3.2 | ~35 tasks: rename, script creation, commands, cross-cutting updates, validation |
| **Claude** | 1.16-1.19, 2.1-2.6, 3.1, 3.3 | ~12 tasks: review, workflow authoring, release notes, visual verification |
| **Human** | 1C, 3.4 | 2 approval gates |

Codex does the volume (mechanical, parallel). Claude does the judgment (creative, sequential, critical path).
