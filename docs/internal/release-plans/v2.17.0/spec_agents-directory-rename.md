# Spec: AGENTS/ and subagents/ Directory Rename (W2)

**Status:** READY FOR EXECUTION (pending v2.16.1 G4 P0 attestation per parent plan D6)
**Parent plan:** [`plan_v2.17.0.md`](plan_v2.17.0.md)
**Work item ID:** W2
**Effort estimate:** 1-2 effort-days
**Source:** v2.16.0 master plan D31 amendment carryover + v2.16.1 Known Limitations deferral
**Path decision:** Path B1 (deliver native sub-agent registration; close gap upward) per 2026-05-19 maintainer choice over Path A2 (retract @-mention promises in dispatch skill descriptions)

---

## 1. What changes

Two coordinated directory renames at the pm-skills plugin root:

1. **`AGENTS/`** (coordination directory) **renames to `_AGENTS/`** (underscore prefix). Same content; just renamed to free up the `agents/` name on case-insensitive filesystems.

2. **`subagents/`** (sub-agent definitions directory) **renames to `agents/`**. Same content; just renamed so Claude Code's native plugin auto-discovery scans it.

Both renames happen in the same commit. Internal references throughout the repo update to the new paths.

### 1.1 Before / after directory tree

**BEFORE (v2.16.x):**

```
pm-skills/
├── AGENTS/                          ← coordination dir (NOT auto-discovered)
│   ├── claude/CONTEXT.md
│   ├── codex/CONTEXT.md
│   ├── DECISIONS.md
│   └── SESSION-LOG/
├── subagents/                       ← sub-agent definitions (NOT auto-discovered)
│   ├── _chain-permitted.yaml
│   ├── _pairing.yaml
│   ├── pm-changelog-curator.md
│   ├── pm-critic.md
│   ├── pm-release-conductor.md
│   ├── pm-skill-auditor.md
│   └── README.md
└── ...
```

**AFTER (v2.17.0):**

```
pm-skills/
├── _AGENTS/                         ← coordination dir (renamed; underscore prefix)
│   ├── claude/CONTEXT.md
│   ├── codex/CONTEXT.md
│   ├── DECISIONS.md
│   └── SESSION-LOG/
├── agents/                          ← sub-agent definitions (AUTO-DISCOVERED by Claude Code)
│   ├── _chain-permitted.yaml
│   ├── _pairing.yaml
│   ├── pm-changelog-curator.md
│   ├── pm-critic.md
│   ├── pm-release-conductor.md
│   ├── pm-skill-auditor.md
│   └── README.md
└── ...
```

**Filesystem behavior:** On Windows NTFS and macOS APFS (case-insensitive), `_AGENTS/` and `agents/` are distinct directory names (the underscore is a separate character even after case-folding). The previous collision between `AGENTS/` and `agents/` is resolved.

### 1.2 What this delivers

After the rename, Claude Code's plugin runtime:

- Scans the plugin root for `agents/*.md` at install time
- Discovers the 4 sub-agents (pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor)
- Registers them as native sub-agents accessible via `@-mention` and the `Agent` tool
- Honors the `Use proactively after ...` description triggers (pm-critic auto-invocation works)
- Permits chain composition per `_chain-permitted.yaml` (currently only pm-release-conductor is allowed to chain)

This makes the dispatch skill descriptions (`utility-pm-critic/SKILL.md`, etc.) accurate: they claim native @-mention dispatch on Claude Code; post-W2, that claim is true.

---

## 2. Files affected

### 2.1 Directory operations (the renames themselves)

| Operation | Source | Target |
|---|---|---|
| `git mv` (or filesystem rename) | `AGENTS/` | `_AGENTS/` |
| `git mv` (or filesystem rename) | `subagents/` | `agents/` |

### 2.2 Scripts referencing the directories

| File | Change |
|---|---|
| `scripts/validate-agents-md.sh` | Update path scan `subagents/*.md` to `agents/*.md` |
| `scripts/validate-agents-md.ps1` | Same |
| `scripts/validate-agents-md.md` | Documentation triplet update |
| `scripts/check-mcp-impact.sh` | If scoped to detect changes in `subagents/` or `AGENTS/`, update path globs |
| `scripts/check-mcp-impact.ps1` | Same |
| `scripts/pre-tag-validate.sh` | Verify no path references to old locations |
| `scripts/pre-tag-validate.ps1` | Same |
| `scripts/check-generated-content-untouched.sh` | Update if it touches these paths |
| `scripts/check-generated-content-untouched.ps1` | Same |
| `scripts/validate-mcp-sync.sh` | If references `subagents/`, update |
| `scripts/validate-mcp-sync.ps1` | Same |

### 2.3 Sub-agent and pairing manifests (inside the renamed dir)

| File (new path) | Change |
|---|---|
| `agents/_pairing.yaml` | Path references INSIDE the file are agnostic (sub-agent names don't change); no edits needed |
| `agents/_chain-permitted.yaml` | Same; no edits |
| `agents/README.md` | Update internal references that mention `subagents/` |
| `agents/pm-critic.md` | Update Cross-References section path (`docs/internal/release-plans/v2.16.0/spec_pm-critic.md` references etc.) |
| `agents/pm-skill-auditor.md` | Same |
| `agents/pm-changelog-curator.md` | Same |
| `agents/pm-release-conductor.md` | Same; also update referent to `_AGENTS/` if present |

### 2.4 Dispatch skills and commands

| File | Change |
|---|---|
| `skills/utility-pm-critic/SKILL.md` | Update inline-execution path reference from `subagents/pm-critic.md` to `agents/pm-critic.md` |
| `skills/utility-pm-skill-auditor/SKILL.md` | Same pattern |
| `skills/utility-pm-changelog-curator/SKILL.md` | Same |
| `skills/utility-pm-release-conductor/SKILL.md` | Same |
| `skills/utility-pm-critic/EXAMPLE.md` (if present) | Same |
| `skills/utility-pm-skill-auditor/EXAMPLE.md` (if present) | Same |
| `skills/utility-pm-changelog-curator/EXAMPLE.md` (if present) | Same |
| `skills/utility-pm-release-conductor/EXAMPLE.md` (if present) | Same |
| `commands/pm-critic.md` | Update path reference if present |
| `commands/pm-audit-repo.md` | Same |
| `commands/pm-draft-changelog.md` | Same |
| `commands/pm-release.md` | Same |

### 2.5 Repo-root documentation

| File | Change |
|---|---|
| `CLAUDE.md` (repo root) | Update references to `AGENTS/` (→ `_AGENTS/`) and `subagents/` (→ `agents/`) |
| `CONTRIBUTING.md` | Same |
| `AGENTS.md` (singular file; UNCHANGED structure; content edits only) | Update directory references inside the file. The file ITSELF stays named `AGENTS.md` per agentskills.io spec convention. |
| `README.md` | If contains directory references, update |

### 2.6 Coordination directory contents (now under `_AGENTS/`)

| File (new path) | Change |
|---|---|
| `_AGENTS/claude/CONTEXT.md` | Update any internal references to `AGENTS/` or `subagents/` |
| `_AGENTS/codex/CONTEXT.md` | Same |
| `_AGENTS/DECISIONS.md` | Same |
| `_AGENTS/SESSION-LOG/*.md` | Update if any reference these paths (most are gitignored archive notes) |

### 2.7 Astro doc-stack content (under `docs/`)

| File | Change |
|---|---|
| `docs/contributing/release-runbook.md` | Update `subagents/pm-release-conductor.md` → `agents/pm-release-conductor.md` |
| `docs/contributing/authoring-sub-agents.md` | Update all `subagents/` references to `agents/`; update `AGENTS/` to `_AGENTS/` |
| `docs/contributing/sub-agent-design-patterns.md` | Same |
| `docs/contributing/ci-overview.md` | Same |
| `docs/concepts/sub-agents.md` | Update all references |
| `docs/concepts/active-orchestration.md` | Same |
| `docs/guides/adversarial-review.md` | Same |
| `docs/guides/using-sub-agents.md` | Same |
| `docs/reference/runtime-components.md` | Update all references |
| `docs/reference/sub-agent-compatibility.md` | Update all references; note the v2.17.0 milestone (`@-mention native registration LIVE`) |

### 2.8 Release artifacts

| File | Change |
|---|---|
| `docs/releases/Release_v2.16.1.md` | Update Known Limitations section: mark "Native Claude Code sub-agent registration" as RESOLVED in v2.17.0 |
| `docs/releases/Release_v2.16.0.md` | If contains `subagents/` references, update; if D31 amendment is referenced, add post-script noting v2.17.0 resolution |
| `docs/releases/Release_v2.17.0.md` | NEW file authored at G2; documents the rename + migration guide |

### 2.9 Release plans (release plan + spec + workspace docs)

| File | Change |
|---|---|
| `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md` | Update D31 amendment status: mark as RESOLVED in v2.17.0 |
| `docs/internal/release-plans/v2.16.0/spec_pm-critic.md` | Update path references if present |
| `docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md` | Same |
| `docs/internal/release-plans/v2.16.0/spec_pm-changelog-curator.md` | Same |
| `docs/internal/release-plans/v2.16.0/spec_pm-release-conductor.md` | Same |
| `docs/internal/release-plans/v2.16.0/ci-plan.md` | Same |
| `docs/internal/release-plans/v2.16.1/plan_v2.16.1.md` | Update Known Limitations cross-reference (mark sub-agent registration RESOLVED) |
| `docs/internal/release-plans/v2.16.1/plan_v2.16.1_reviewed-by-claude.md` | Update Section 4 finding status (Note about dispatch verification on Claude Code: RESOLVED via W2) |
| `docs/internal/release-scoping-v2.17-and-v3.0_2026-05-18.md` | Update Change A status: mark as SHIPPED in v2.17.0 |
| `docs/internal/marketplace-multi-plugin-migration_2026-05-18.md` | Update if references `subagents/`; mark Section 2.4 (Cross-client dispatch) as updated |
| `docs/internal/_working/roadmap_opus-4.7-max_2026-05-14.md` | Update Section 9 v2.17.0 entry; Section 14 change log |
| `docs/internal/_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md` | Update Section 2.1 (Sub-agent native registration is not yet working) to mark RESOLVED |

### 2.10 CI workflows

| File | Change |
|---|---|
| `.github/workflows/validation.yml` | If validate-agents-md or scan-related steps reference `subagents/` or `AGENTS/`, update |
| `.github/workflows/sync-agents-md.yml` | Same |
| `.github/workflows/codeql.yml` | Unlikely to reference; check |
| `.github/workflows/deploy-pages.yml` | Unlikely to reference; check |
| `.github/workflows/release.yml` | Check; unlikely impact |
| `.github/workflows/validate-plugin.yml` | Check |
| `.github/workflows/validate-mcp-sync.yml` | Check |
| `.github/workflows/create-issues-from-drafts.yml` | Check |

### 2.11 Memory + meta (not in repo)

| File | Change |
|---|---|
| `MEMORY.md` (user's auto-memory at `C:\Users\jpris\.claude\projects\E--Projects-product-on-purpose-pm-skills\memory\MEMORY.md`) | Update Project Identity block: references to `AGENTS/` → `_AGENTS/`; `subagents/` → `agents/`. Scheduled in G4 P2 reminder per parent plan. Not part of the commit; user memory edited separately. |

### 2.12 Companion repo (pm-skills-mcp)

| File | Change |
|---|---|
| `pm-skills-mcp/scripts/embed-skills.js` | If parses sub-agent metadata from `subagents/`, update to `agents/`. Likely no impact since MCP focuses on skill manifests. |
| `pm-skills-mcp/pm-skills-source.json` | If references sub-agent paths, update |
| `pm-skills-mcp/README.md` | If documents the sub-agent location, update |

---

## 3. Execution steps

### 3.1 Phase 1: Pre-flight verification (15 min)

1. Verify case-insensitive collision is current state: `ls agents/` should return same files as `ls AGENTS/` on Windows NTFS / macOS APFS
2. Verify no existing local-only files in `_AGENTS/` (the target path) - should be empty / non-existent
3. Verify v2.16.1 G4 P0 attestation PASSING (per parent plan D6 entrance criteria) - if not, BLOCK
4. Verify W1 (frontmatter sweep) is committed before starting W2 OR confirm parallel execution is safe (recommendation: serialize W1 first, W2 second to keep commits readable; alternatively, both in one commit but spec is intricate)

### 3.2 Phase 2: Directory renames (30 min)

```bash
# Step 1: rename coordination directory
git mv AGENTS _AGENTS
# (Verify): ls _AGENTS shows the same content; AGENTS no longer exists

# Step 2: rename sub-agent directory
git mv subagents agents
# (Verify): ls agents shows the same content; subagents no longer exists

# Step 3: verify on Windows that _AGENTS/ and agents/ are now distinct
ls _AGENTS agents
# Should show two distinct directories with different contents
```

**Caveat:** On Windows, `git mv` is case-insensitive. `git mv AGENTS _AGENTS` may fail or no-op if Git interprets the target as the same path. Use a two-step rename if needed:

```bash
# Two-step rename to force the case-sensitive operation
git mv AGENTS AGENTS_TMP_RENAME
git mv AGENTS_TMP_RENAME _AGENTS
```

Alternatively use the explicit case-folding flag: `git mv -f AGENTS _AGENTS` (some Git versions).

### 3.3 Phase 3: Reference sweep (1 day)

Run a sed-style sweep against every file listed in Section 2:

```bash
# Sweep AGENTS/ to _AGENTS/ (case-sensitive)
grep -rl --include='*.md' --include='*.yml' --include='*.sh' --include='*.ps1' --include='*.json' 'AGENTS/' . | xargs sed -i 's|AGENTS/|_AGENTS/|g'

# Sweep subagents/ to agents/ (case-sensitive)
grep -rl --include='*.md' --include='*.yml' --include='*.sh' --include='*.ps1' --include='*.json' 'subagents/' . | xargs sed -i 's|subagents/|agents/|g'
```

**Caveats:**

- Sed replacement is mechanical; manually review the diff
- Some references like `subagents/_pairing.yaml` need the same sweep; sed handles those
- `AGENTS.md` (the singular file at root) is NOT affected by `AGENTS/` sweep (no trailing slash difference); spec-compliant
- Watch for false positives: an existing reference to `pm-subagents/` (hypothetical) would also match; spot-check
- The sweep does NOT touch the BODY content of files describing the rename narratively; only path references

After the sweep, run `git diff --stat` to see scope. Expected: ~30-40 files modified.

### 3.4 Phase 4: Script update verification (30 min)

1. Run `bash scripts/validate-agents-md.sh` (now scanning `agents/*.md`); verify PASS
2. Run `pwsh scripts/validate-agents-md.ps1`; verify PASS
3. Run full `bash scripts/pre-tag-validate.sh`; verify ALL CHECKS PASSED

### 3.5 Phase 5: Doc-stack rebuild verification (15 min)

1. Run `npm run build` locally; verify no Astro errors
2. Spot-check renderable docs at `dist/concepts/sub-agents/index.html`, `dist/contributing/release-runbook/index.html`, `dist/reference/runtime-components/index.html` for path references rendering correctly

### 3.6 Phase 6: Dispatch skill semantic verification (1 hour)

The dispatch skills describe themselves as "dispatches natively on Claude Code". Post-W2 this should actually work. Verify:

1. On a fresh Claude Code install with v2.17.0-prep state, run `/plugin marketplace add <repo path>`
2. Run `/plugin install pm-skills`
3. In a new conversation, type `@pm-critic` - verify auto-completion shows pm-critic as a sub-agent
4. Type `@pm-critic review this PRD: [paste a short PRD]` - verify pm-critic spawns and returns findings
5. Trigger proactive invocation: run a PM-artifact-producing skill (e.g., `/prd` or any phase skill) and observe whether pm-critic auto-fires per its "Use proactively after ..." description

If any of these fail, the rename architecture has a deeper issue. BLOCK release.

### 3.7 Phase 7: Companion repo (parallel; 1-2 hours)

1. Draft pm-skills-mcp PR updating any path references to `agents/` and `_AGENTS/`
2. Schedule merge for same-day as pm-skills v2.17.0 G3 tag

### 3.8 Phase 8: Memory snapshot refresh (G4 P2)

After v2.17.0 ships, update user-level memory:

1. Edit `MEMORY.md` Project Identity block: `AGENTS/` → `_AGENTS/`; `subagents/` → `agents/`
2. Update "Latest tagged version" to v2.17.0
3. Update repo counts (unchanged at 59 + 4 + 12 + 66)
4. Add note: "Native Claude Code sub-agent registration LIVE since v2.17.0"

---

## 4. Acceptance criteria

### 4.1 Functional

- [ ] `AGENTS/` directory no longer exists; replaced by `_AGENTS/`
- [ ] `subagents/` directory no longer exists; replaced by `agents/`
- [ ] `agents/*.md` files (4 sub-agent definitions + 2 yaml + README) accessible at new path
- [ ] `_AGENTS/` directory contents (claude/, codex/, DECISIONS.md, SESSION-LOG/) intact at new path
- [ ] All 30-40 file references swept to new paths
- [ ] `scripts/validate-agents-md.{sh,ps1}` PASSES (now scans `agents/`)
- [ ] Full pre-tag-validate bundle PASSES
- [ ] Astro doc-stack builds without errors
- [ ] check-internal-link-validity --strict PASSES

### 4.2 Native sub-agent registration

- [ ] On fresh Claude Code install with v2.17.0, `@pm-critic` auto-completes
- [ ] `@pm-critic review this PRD: ...` spawns the sub-agent and returns findings
- [ ] Proactive invocation: pm-critic auto-fires after a PM-artifact-producing skill completes (per description)
- [ ] Conductor's chain composition works: `pm-release-conductor` can chain to `pm-skill-auditor` and `pm-changelog-curator` via Agent tool

### 4.3 Documentation reconciliation

- [ ] Release_v2.16.1.md Known Limitations marks sub-agent registration RESOLVED in v2.17.0
- [ ] Sub-agent compatibility matrix doc updated with `@-mention native PRODUCTION on Claude Code 2026-05-XX`
- [ ] CHANGELOG.md v2.17.0 entry describes the rename + capability
- [ ] Release_v2.17.0.md migration guide section authored

### 4.4 Cross-client compatibility unchanged

- [ ] Dispatch skills (skills/utility-pm-*/) still work on Codex CLI, Cursor, Windsurf, Copilot CLI, Gemini CLI via inline path (validated at v2.16.0 Codex GATE B+C; v2.17.0 doesn't break this)

---

## 5. Risks specific to W2

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| `git mv` fails on case-insensitive filesystem | Medium | Medium | Use two-step rename via temporary name; documented in Section 3.2 caveats |
| Sed sweep introduces false positives | Low | Low | Manual diff review; spot-check 5+ files per file type |
| Reference sweep misses a file in non-standard location | Medium | Medium | check-internal-link-validity --strict catches broken refs; G1 adversarial review catches missed semantic refs |
| Claude Code's auto-discovery doesn't actually fire for `agents/` | Low | Critical | G4 P0 scenario 2 explicitly tests this; if fails, ship v2.17.1 reverting the rename OR documenting as unresolved gap |
| Proactive invocation triggers too aggressively (every skill fires pm-critic) | Medium | Medium | pm-critic description is scoped to "PM-artifact-producing skills" but Claude Code's interpretation may differ; observe behavior; tighten description if needed |
| `_AGENTS/` underscore prefix interpreted as "ignore" by some tool | Low | Low | Documented tracked-file behavior in existing `_workflows/` pattern; same convention |
| pm-skills-mcp breaks because of subagents/ path change | Low | Low | Manifest parser in pm-skills-mcp focuses on skill metadata, not sub-agent paths; verify and update if needed |
| Memory file references go stale | High | Low | G4 P2 schedules memory refresh; not blocking |
| Some session log file under _AGENTS/SESSION-LOG/ has hardcoded absolute paths to AGENTS/ | Low | Low | Session logs are gitignored archive notes; not load-bearing |

---

## 6. Rollback plan

If W2 ships and the native registration doesn't work as expected post-tag:

### Minor defect (e.g., one sub-agent doesn't @-mention)

- Investigate; ship v2.17.1 with the specific fix
- Update sub-agent compatibility matrix to document the partial state

### Critical defect (e.g., Claude Code doesn't recognize agents/ at all)

- Ship v2.17.1 reverting the directory renames
- Run `scripts/migrate-skills-frontmatter` reverse path for `subagents/` to come back (this script doesn't exist; create as part of v2.17.1)
- Update release notes with post-mortem
- Re-investigate the architectural assumption (maybe Claude Code expects `agents/` at a different relative path)

### Documentation drift

- Doc fixes are sed-able; ship v2.17.1 with the sweep

---

## 7. Sources

- v2.16.0 master plan D31 amendment: documents the original case-insensitive collision discovery
- v2.16.1 Known Limitations: documents the deferral to v2.17.0
- 2026-05-19 maintainer choice (concrete-behavior comparison conversation): Path B1 over Path A2
- Existing dispatch skill descriptions (`skills/utility-pm-*/SKILL.md`): assert that @-mention dispatch works on Claude Code
- `feedback_no-em-dashes` memory rule: ensures spec content respects CLAUDE.md style
- `feedback_pre-tag-validator-bundle` memory rule: drives the validator coverage approach in Phase 4

---

## 8. Cross-references

- Parent plan: [`plan_v2.17.0.md`](plan_v2.17.0.md)
- Companion spec (W1): [`spec_frontmatter-metadata-migration.md`](spec_frontmatter-metadata-migration.md)
- v2.16.0 master plan (D31 amendment origin): [`../v2.16.0/plan_v2.16.0.md`](../v2.16.0/plan_v2.16.0.md)
- v2.16.1 plan (deferral documentation): [`../v2.16.1/plan_v2.16.1.md`](../v2.16.1/plan_v2.16.1.md)
- v2.16.1 G1 review: [`../v2.16.1/plan_v2.16.1_reviewed-by-claude.md`](../v2.16.1/plan_v2.16.1_reviewed-by-claude.md)
- Roadmap delta: [`../../_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md`](../../_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md) Section 2.1
- v2.17 vs v3.0 scoping: [`../../release-scoping-v2.17-and-v3.0_2026-05-18.md`](../../release-scoping-v2.17-and-v3.0_2026-05-18.md) (Change A is W2)
- Sub-agent compatibility matrix (load-bearing artifact updated by W2): `../../../reference/sub-agent-compatibility.md`
- Release runbook (load-bearing artifact updated by W2): `../../../contributing/release-runbook.md`
