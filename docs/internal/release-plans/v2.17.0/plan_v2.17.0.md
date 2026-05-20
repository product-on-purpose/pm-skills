# v2.17.0 Release Plan: Spec Compliance + Sub-Agent Native Registration

**Status:** ACTIVE (scoped 2026-05-19; v2.16.1 G4 P0 attestation FULL PASS 2026-05-19; v2.16.2 fast-patch scheduled BEFORE v2.17.0 execution per maintainer choice)
**Owner:** Maintainers
**Type:** Minor release
**Theme:** Close two cross-cutting structural commitments shipped as deferred in v2.16.0 / v2.16.1: (1) move proprietary skill-frontmatter under `metadata:` for agentskills.io spec compliance, (2) rename `subagents/` to `agents/` to deliver native Claude Code sub-agent registration that v2.16.0 attempted and v2.16.1 documented as deferred.
**Created:** 2026-05-17 (initial stub during v2.16.0 Phase 0 adversarial review)
**Updated:** 2026-05-19 (post-v2.16.1 ship: TIGHT scope reframe per maintainer 2026-05-19 directive; Path B1 chosen for sub-agent rename per concrete-behavior comparison; supersedes prior stub framing)

---

## Where We Are

This plan supersedes the 2026-05-17 stub. The stub accumulated 169 lines of carryover content across v2.15, v2.16.0, and v2.16.1 deferral lists. Per the 2026-05-19 maintainer directive following v2.16.1 ship, v2.17.0 scope is now **TIGHT**: two cross-cutting structural items + scope-controlled deferrals to v2.19.0+.

The reframe applies the `feedback_no-effort-doc-bloat` memory rule (for refactor/maintenance releases, work items live as rows in the release plan, not per-item effort docs) and the `feedback_pre-tag-validator-bundle` rule (every truly-enforcing validator must pass before tag).

**See companion docs:**

- Strategic context: [`../../_working/roadmap_opus-4.7-max_2026-05-14.md`](../../_working/roadmap_opus-4.7-max_2026-05-14.md) Section 5 (R-05) + Section 6 (R-04 carryover)
- Delta vs. roadmap: [`../../_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md`](../../_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md)
- v2.16.1 plan (predecessor + carryover source): [`../v2.16.1/plan_v2.16.1.md`](../v2.16.1/plan_v2.16.1.md)
- v2.16.1 known-limitation reference (sub-agent registration deferred to v2.17.0): [`../../../releases/Release_v2.16.1.md`](../../../releases/Release_v2.16.1.md)
- v2.17.0 spec for frontmatter migration: [`spec_frontmatter-metadata-migration.md`](spec_frontmatter-metadata-migration.md)
- v2.17.0 spec for AGENTS rename: [`spec_agents-directory-rename.md`](spec_agents-directory-rename.md)

---

## Scope

### Primary work items (committed to v2.17.0)

| ID | Item | Type | Effort | Spec |
|---|---|---|---|---|
| W1 | Frontmatter metadata sweep: move proprietary fields under `metadata:` block | INFRA | 2-3 d | [`spec_frontmatter-metadata-migration.md`](spec_frontmatter-metadata-migration.md) |
| W2 | `AGENTS/` to `_agent-context/` rename + `subagents/` to `agents/` rename for native Claude Code sub-agent registration | INFRA | 1-2 d | [`spec_agents-directory-rename.md`](spec_agents-directory-rename.md) |
| W3 | Validator portability fix: rewrite 5 bash-4 validators for bash-3.2 compat + non-git-checkout fallback for check-count-consistency | INFRA | 1-2 d | (no separate spec; details below in W3 expansion) |
| W4 | Doc-refresh: CONTEXT.md Notes section + enforcing-validator count framing | DOCS | 0.5 d | (absorbed into W2 reference sweep which already touches CONTEXT.md) |

**Total v2.17.0 effort: 4.5-7.5 effort-days** (was 3-5 days pre-audit-findings).

**Execution status (2026-05-20):**
- **W1 - SHIPPED** (`be1352b`): frontmatter metadata migration across 59 skills + consumers; CI green.
- **W2 - SHIPPED + VERIFIED** (`3691b77`): `AGENTS/` to `_agent-context/` + `subagents/` to `agents/` renames, lockstep validators, reference sweep, status pointers. Full pre-tag bundle 15/15 PASS; Astro build 345 pages 0 errors. Native registration ATTESTED 2026-05-20: after `/plugin update` + `/reload-plugins` all 4 sub-agents auto-discover in the Claude Code `@`-mention menu (AC 4.2 first item confirmed). Follow-up fix: removed `agents/README.md` (Claude Code scans every `.md` in `agents/` as an agent, so the carried-over README registered as a phantom `pm-skills:README` agent).
- **W4 - SHIPPED with W2** (`3691b77`): coordination-file pointers + project-structure section updated. The deeper `_agent-context/claude/CONTEXT.md` current-state refresh (version/status block) remains for the v2.17.0 release-prep pass.
- **W3 - PENDING**: bash-3.2 validator portability; needs macOS to verify; candidate to defer to v2.17.1.
- **F-P2-01 (second half) - PENDING**: wire `check-version-references` into the pre-tag bundle (README now current).

All four items are cross-cutting structural or documentation changes. Co-shipping them in one release minimizes surface-area churn for downstream consumers (`pm-skills-mcp` companion repo, doc-stack templates, third-party validators tracking pm-skills as a reference implementation).

### W3 expansion: Validator portability fix

**Origin:** v2.16.1 G4 P0 audit finding F-P0-01 (see `release-plans/v2.16.1/plan_v2.16.1.md` G4 status + `release-plans/v2.16.2/plan_v2.16.2.md` Context section).

**Problem:** 5 of 14 validators in `scripts/pre-tag-validate.sh` use bash 4 features (`mapfile`, `declare -A`); they syntax-error on macOS default bash 3.2.57. A 6th validator (`check-count-consistency.sh`) assumes a git working tree and hard-fails under `set -euo pipefail` when run from a non-git directory (e.g., the unpacked install-cache shape).

**Affected validators (per audit finding F-P0-01):**

1. `scripts/validate-agents-md.sh:24` (mapfile)
2. `scripts/validate-commands.sh:9` (mapfile)
3. `scripts/validate-meeting-skills-family.sh:52` (mapfile + declare -A)
4. `scripts/validate-foundation-sprint-skills-family.sh:42` (mapfile + declare -A)
5. `scripts/validate-design-sprint-skills-family.sh:45` (mapfile + declare -A)
6. `scripts/check-count-consistency.sh:14,73` (git -C + set -euo pipefail)

**Fix approach (per audit disposition recommendation):**

- Rewrite the 5 mapfile/declare-A validators to use `while read` + parallel arrays (bash-3.2 compatible). This is mechanical but tedious.
- For `check-count-consistency.sh`: add non-git-repo detection at the top and fall back to `find` + `grep -r` when git isn't available.
- Add a preamble check at the top of `pre-tag-validate.sh`: `if [ "${BASH_VERSINFO[0]:-0}" -lt 4 ] && [ -z "$ALLOW_BASH3" ]; then echo "WARNING: bash 4+ recommended; some validators may have reduced features" >&2; fi` (warn but don't block; the rewritten validators should work either way).

**Acceptance criteria for W3:**

- [ ] All 14 validators in pre-tag-validate.sh run cleanly on macOS bash 3.2 from a non-git working tree (the install-cache shape)
- [ ] Validators continue to PASS on Linux bash 4+ from a git working tree (CI environment unchanged)
- [ ] The dispatch skill `/pm-skills:pm-audit-repo` can run the full bundle from `~/.claude/plugins/cache/pm-skills-marketplace/pm-skills/{version}/` on macOS without bash-version errors

### Out of scope for v2.17.0 (deferrals)

The previous v2.17.0 stub listed several v2.16-carryover items. Per the TIGHT scope decision, these defer to v2.17.1 (fast-follow) or v2.19.0:

**Candidates for v2.17.1 fast-follow** (pair naturally with v2.17.0 work):

- `check-sub-agent-command-pair.{sh,ps1,md}` (validates pairing in `_pairing.yaml`; pairs with the agents/ rename since pairing manifest moves with the directory)
- R-24 PostToolUse hook for skill frontmatter validation (pairs with W1 frontmatter sweep; protects the new structure on every Edit/Write)

**Defer to v2.19.0** (independently valuable, no pairing constraint):

- `check-em-dashes.{sh,ps1,md}` canonical script (replace perl one-liners)
- `check-runtime-components-sync.{sh,ps1,md}` (each sub-agent has runtime-components.md row)
- `check-aggregate-counters` extension (CONTEXT.md + AGENTS.md surface coverage)
- Chain-permitted allowlist enforcement (parse subagents/*.md frontmatter for Agent tool, fail if not in `_chain-permitted.yaml`)
- Validator regex anchoring (FN-04 from v2.16.0 Codex review)
- `docs/contributing/ci-conventions.md` (pairs with the validators above)
- Tags-as-feature doc-stack support
- URL slug normalization across docs site
- `sync-agents-md.yml` workflow rewrite (two-layer defense + apply:true input gate)
- Validator-cleanup safety (check-generated-content-untouched safeguard for tracked files)
- Cross-client validation expansion (validate dispatch on Cursor + Windsurf + Copilot CLI + Gemini CLI per v2.16.0 Codex P0 challenge review)
- LIVE-release validation of conductor on Codex CLI (currently DRY-RUN VALIDATED only)
- Multi-tool concurrency advisory or lock-file convention for the conductor
- Sub-agent v2.17 entrance criteria specification (30-day burn-in metrics)
- G2.5 invariant phrasing tightening (Codex P2 challenge review)

**Defer to v3.0.0** (marketplace identity rename):

- Marketplace follow-through (R-09; bundled with v3.0 marketplace identity rename per `release-scoping-v2.17-and-v3.0_2026-05-18.md`)

**Defer to v2.20+ pending signal accumulation:**

- AI-Native PM Pack (R-01, R-02, R-03, R-14): see [issues-conflicts doc](../../_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md) Section 4.10 for competitive-risk discussion
- Reviewer pairing for top 5 artifacts (R-19): pending 30-day pm-critic adoption signal
- Skill proposal funnel (R-08): pending v3.0.0 marketplace identity stability
- PM Voice output style (R-45)
- Multi-reviewer critique board (R-58)
- Family-steward sub-agent design (master plan D8)
- pm-skills-mcp catalog unfreeze (blocked on M-22 decision)

---

## Decisions

| # | Decision | Answer | Rationale |
|---|---|---|---|
| D1 | Release type | v2.17.0 (minor) | Frontmatter sweep is structural but additive (no skill content removed). AGENTS rename is internal restructure with new affordance (native sub-agent registration). Both qualify as MINOR per SemVer. |
| D2 | Co-ship vs. sequence | Co-ship both W1 + W2 in v2.17.0 | Both are cross-cutting structural; bundling minimizes consumer-update cycles. Co-shipping = 1.5x effort vs. 2x audit value. |
| D3 | AGENTS rename target | `AGENTS/` to `_agent-context/` (RESOLVED 2026-05-20; was tentatively `_AGENTS/`) | Descriptive name beats minimal-diff `_AGENTS/`: the load-bearing content is the `claude/CONTEXT.md` + `codex/CONTEXT.md` files the conductor/auditor read at G0, so `_agent-context/` says what it is. Fits the repo's underscore convention (`_workflows/`, `_NOTES/`, `_LOCAL/`, `_staging/`). Resolves the case-insensitive collision with `agents/`. Avoids the `_AGENTS/` vs `AGENTS.md` visual near-collision. Considered `_agent-coordination/` (captures decisions+logs too) but `context` is the most-referenced content and reads cleaner. Sweep is mechanical either way (~20 functional files; see spec 2.0). |
| D4 | Sub-agent rename direction | Path B1 (close the gap upward; `subagents/` to `agents/`) | Per concrete-behavior comparison 2026-05-19: dispatch skill descriptions already PROMISE `@agent-pm-critic` invocation on Claude Code; not delivering this is a divergence between description and runtime. Path A2 (retract promises by sweeping 10-15 docs) is comparable effort with permanent loss of proactive review + parallel sub-agent invocation. Path B1 is the lower-net-cost path that honors v2.16.1 release notes commitment. |
| D5 | Frontmatter spec target | agentskills.io canonical: top-level keeps `name`, `description`, `license`, optional `compatibility`; everything else moves under `metadata:` block | Spec adoption is at 12+ tools as of 2026-05-14 (Codex CLI, Gemini CLI, Cursor, Windsurf, Cline, Copilot, etc.). Top-level proprietary fields are an emerging anti-pattern that silently break canonical validators. One-time sweep with permanent payoff. |
| D6 | v2.17.0 entrance criteria | v2.16.1 G4 P0 attestation PASS (DONE 2026-05-19) + v2.16.2 hygiene patch ship (BEFORE v2.17.0 execution) | v2.16.1 G4 P0 FULL PASS 2026-05-19. v2.16.2 ships next as a 1-2 hour fast-patch closing 2 P1 + 1 P2 audit findings (README badge + CONTEXT.md Status + 2-validator bundle wire). v2.17.0 execution starts AFTER v2.16.2 ships. |
| D7 | Adversarial review | Run claude-opus-4.7 G1 review pre-tag (per Phase 0 Adversarial Review Loop codified in v2.16.0). Codex review optional pending codex:codex-rescue tool-surface improvements (per v2.16.1 attempt). | Both W1 and W2 are mechanical/structural; primary risk is "did the sweep miss a file?" Adversarial review catches missed files better than the validator bundle (which only catches structural defects, not semantic completeness). |
| D8 | Validator strategy | Full pre-tag-validate bundle + new spec-compliance validator | Per `feedback_pre-tag-validator-bundle` memory rule. v2.17.0 ADDS a validator that enforces the new metadata-nested frontmatter structure (per W1 spec). v2.17.0 also UPDATES validate-agents-md and validate-commands paths to point at `agents/` (per W2 spec). |
| D9 | Branch strategy | Direct on main (matches v2.16.x precedent) | Both items are mechanical sweeps with full validator coverage. Worktree isolation adds friction without isolation benefit at this scope. |
| D10 | Tag SHA discipline | Per D22 (codified in v2.16.x): tag points at G2.5-captured SHA only | Honor the load-bearing invariant established in v2.16.0. |
| D11 | Documentation reconciliation | Update Release_v2.16.1.md Known Limitations cross-reference (mark sub-agent registration RESOLVED). Update sub-agent compatibility matrix doc. Update concept docs (sub-agents.md, active-orchestration.md). | When W2 ships, the v2.16.1 deferral is closed; downstream docs must reflect that. Audit + sweep included in v2.17.0 release-prep checklist. |
| D12 | Plugin.json description | Use forward-compatible phrasing for v2.17.0 description refresh (e.g., "Recent: ..." instead of "v2.17.0 introduces ...") | Per v2.16.1 G1 review Note: "plugin.json description forward-compatibility" - avoid repeated description rewrites every patch. |
| D13 | v2.16.1 carryover items disposition | Defer all carryover items NOT in W1/W2 to v2.17.1 or v2.19+ per the deferrals list above | Hard scope cap. Memory rule `feedback_no-effort-doc-bloat` applies. |

---

## Deliverables

### W1: Frontmatter metadata sweep

Per [`spec_frontmatter-metadata-migration.md`](spec_frontmatter-metadata-migration.md). Summary:

| File | Change |
|---|---|
| `skills/*/SKILL.md` (59 files) | Move proprietary frontmatter fields (`classification`, `phase`, `version`, `updated`) under `metadata:` block. Top-level keeps `name`, `description`, `license`, optional `compatibility`. |
| `skills/*/EXAMPLE.md` (where applicable) | Same migration pattern for any EXAMPLE.md files with frontmatter |
| `scripts/lint-skills-frontmatter.{sh,ps1,md}` | Update validator to enforce new structure: required top-level fields, required `metadata:` block, accepted metadata sub-keys per classification |
| `scripts/check-frontmatter-yaml.mjs` | Update if schema check is impacted |
| `skills/utility-pm-skill-builder/TEMPLATE.md` | Update skill template to generate new structure |
| `skills/utility-pm-skill-builder/SKILL.md` | Update skill prompt to author skills in new structure |
| `skills/utility-pm-skill-iterate/SKILL.md` | Update to migrate older skills it processes |
| `docs/contributing/skill-authoring.md` (if exists) | Document the new structure |
| `docs/reference/skill-anatomy.md` | Document the new structure |
| `CHANGELOG.md` | v2.17.0 entry under Changed (structural) |

### W2: AGENTS/ + subagents/ rename

Per [`spec_agents-directory-rename.md`](spec_agents-directory-rename.md). Summary:

| File / Operation | Change |
|---|---|
| `AGENTS/` directory | Rename to `_agent-context/` |
| `subagents/` directory | Rename to `agents/` |
| `scripts/validate-agents-md.{sh,ps1}` | Update path scan to `agents/*.md` (was `subagents/*.md`) |
| `scripts/check-mcp-impact.{sh,ps1}` | Update path detection to include `agents/` and `_agent-context/` (if scoped) |
| `scripts/pre-tag-validate.{sh,ps1}` | Verify no path references to old locations |
| `agents/_pairing.yaml` (moved from subagents/) | Path references inside file unchanged (sub-agent names don't change) |
| `agents/_chain-permitted.yaml` (moved from subagents/) | Same |
| `agents/README.md` (moved) | Update internal cross-references if any |
| `skills/utility-pm-critic/SKILL.md` (and 3 other dispatch skills) | Update path reference from `subagents/pm-{role}.md` to `agents/pm-{role}.md` |
| `commands/pm-critic.md` (and 3 other paired commands) | Update path reference if present |
| `CLAUDE.md` (repo root) | Update references to `AGENTS/` and `subagents/` |
| `CONTRIBUTING.md` | Same |
| `AGENTS.md` (singular file at root; UNCHANGED structure but content edits) | Update any `AGENTS/` path references to `_agent-context/`; update `subagents/` references to `agents/` |
| `_agent-context/claude/CONTEXT.md` | Update path references; update directory-name references |
| `_agent-context/codex/CONTEXT.md` | Same |
| `_agent-context/DECISIONS.md` | Update path references |
| `docs/contributing/release-runbook.md` | Update `subagents/pm-release-conductor.md` to `agents/pm-release-conductor.md` |
| `docs/contributing/authoring-sub-agents.md` | Update all path references |
| `docs/contributing/sub-agent-design-patterns.md` | Same |
| `docs/concepts/sub-agents.md` | Update all path references |
| `docs/concepts/active-orchestration.md` | Update all path references |
| `docs/guides/adversarial-review.md` | Update all path references |
| `docs/guides/using-sub-agents.md` | Update all path references |
| `docs/reference/runtime-components.md` | Update all path references |
| `docs/reference/sub-agent-compatibility.md` | Update all path references |
| `docs/releases/Release_v2.16.1.md` | Update Known Limitations to mark sub-agent registration RESOLVED |
| `docs/releases/Release_v2.16.0.md` | Update if path references present |
| `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md` | Update D31 amendment note ("resolved in v2.17.0") |
| `docs/internal/release-plans/v2.16.1/plan_v2.16.1.md` | Update Known Limitations cross-reference |
| `.github/workflows/*.yml` (any that reference these paths) | Update path references |
| `CHANGELOG.md` | v2.17.0 entry under Changed (structural) |

### Release artifacts

| File | Change |
|---|---|
| `.claude-plugin/plugin.json` | Bump version to 2.17.0; refresh description (forward-compatible phrasing) |
| `.claude-plugin/marketplace.json` | Bump plugin version to 2.17.0; refresh description |
| `CHANGELOG.md` | New `## [2.17.0] - YYYY-MM-DD` entry |
| `docs/releases/Release_v2.17.0.md` | New release notes (target ~150-200 lines: scope + migration guide + before/after examples) |
| `docs/internal/release-plans/v2.18.0/plan_v2.18.0.md` | Already exists; promote to ACTIVE post-v2.17.0 tag |

---

## Pre-release checklist (6-gate runbook)

Walk the 6-gate runbook codified in `docs/contributing/release-runbook.md` via `/pm-release v2.17.0`.

### G0: Pre-tag readiness

- [ ] Working tree clean
- [ ] `scripts/pre-tag-validate.{sh,ps1}` PASS (full bundle, --strict)
- [ ] Em-dash sweep PASS (per CLAUDE.md hard rule)
- [ ] Aggregate counters unchanged from v2.16.x (59 skills + 4 sub-agents + 12 workflows + 66 commands)
- [ ] Cross-cutting audit via pm-skill-auditor (chain or inline; verify sub-agent + companion command pairing intact post-rename)
- [ ] Master plan READY TO TAG state
- [ ] Release notes drafted
- [ ] v2.16.1 G4 P0 runtime attestation CONFIRMED PASSING (entrance criteria per D6)

### G1: Adversarial review

- [ ] claude-opus-4.7 G1 review run (Path B1 default)
- [ ] Optional: Codex CLI review if codex:codex-rescue tool-surface allows structured edits
- [ ] All P0 findings closed; P1+P2 findings dispositioned

### G2: Version bump + CHANGELOG prep

- [ ] plugin.json version 2.16.1 to 2.17.0
- [ ] marketplace.json version + description refresh
- [ ] CHANGELOG.md v2.17.0 entry (Fixed / Added / Changed / Migration notes)
- [ ] Release notes complete at docs/releases/Release_v2.17.0.md
- [ ] Hidden-comment leak check (grep CHANGELOG.md for `<!-- justification:`)

### G2.5: Commit release-prep + re-verify

- [ ] Stage release-prep files
- [ ] Commit with `chore(v2.17.0): release-prep edits`
- [ ] Re-run G0 validator bundle against new HEAD
- [ ] Push to origin/main
- [ ] Verify CI green on new commit (Validation + CodeQL + Deploy to GitHub Pages + Validate Plugin Packaging)
- [ ] Capture commit SHA (only this SHA G3 may tag)

### G3: Tag + push

- [ ] Per D22, verify tag target SHA = G2.5 captured SHA. Refuse to tag any other SHA.
- [ ] Annotated tag message drafted
- [ ] `git tag -a v2.17.0 -m <message> <G2.5-SHA>`
- [ ] `git push origin v2.17.0` after explicit ship-it confirmation

### G4: Post-tag hygiene

**P0: Plugin install path + sub-agent native registration smoke test (Claude Code).** Run within 30 minutes of G3 push.

Three scenarios; all must pass:

1. **Upgrade path:**
   - On Claude Code with pm-skills at v2.16.1, run `/plugin marketplace update` then `/plugin update pm-skills`
   - Expected: update succeeds; plugin reports version 2.17.0

2. **Native sub-agent registration (the new capability):**
   - On the updated/fresh-install Claude Code, type `@pm-critic review this PRD: [paste any short PRD]`
   - Expected: pm-critic sub-agent spawns natively; returns adversarial-review findings in fresh-context isolation
   - Alternate: trigger proactive invocation by running `/prd` (or any PM-artifact-producing skill) and observing whether pm-critic auto-fires

3. **Dispatch skill compatibility (cross-client carryover):**
   - On Codex CLI 0.128.0+, run the dispatch skill: invoke `utility-pm-critic` per its SKILL.md
   - Expected: command resolves; dispatch skill runs the inline path (same as v2.16.x behavior)

Pass: all 3 scenarios succeed. Fail: any scenario errors. Resolution: ship v2.17.1 fast-patch.

**Other G4 sub-checks:**

- [ ] Marketplace registration resolves (P1; implicit in scenario 1)
- [ ] GitHub Pages rebuild triggered (P1)
- [ ] GitHub Release UI body authored with rich content from Release_v2.17.0.md (P2)
- [ ] v2.18.0 plan stub promoted from STUB to ACTIVE (P2)
- [ ] Memory snapshot refresh: update MEMORY.md project-state block to v2.17.0 state (P2)
- [ ] v2.17.1 stub created with the v2.17.1 fast-follow candidates if any (P2)

---

## Migration guide outline

Per Release_v2.17.0.md (will be authored during G2):

### For users on v2.16.1

```
# Update path
/plugin marketplace update
/plugin update pm-skills

# After update, pm-skills version reports 2.17.0
# New capability: @pm-critic native invocation in Claude Code
```

### For contributors

- New skills authored after v2.17.0 use the metadata-nested frontmatter structure
- Existing skills sweep automatically via the W1 migration (no manual contributor action)
- The `_agent-context/` directory replaces the old `AGENTS/` directory; old paths in scripts will need update if you have local forks
- The `agents/` directory contains sub-agent definitions (was `subagents/`); slash commands (`/pm-critic`, `/pm-audit-repo`, etc.) work identically

### For pm-skills-mcp (companion repo)

The companion `pm-skills-mcp` reads pm-skills' skill manifests. v2.17.0 frontmatter restructure may require coordinated update in pm-skills-mcp's manifest parser. Spec details in spec_frontmatter-metadata-migration.md Section 5.

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Frontmatter sweep misses some files | Medium | High (broken validator on shipped state) | Spec lists exhaustive file inventory; validator enforces new structure; G1 adversarial review specifically checks for missed files |
| Reference sweep for AGENTS/ rename misses some files | Medium | Medium (stale references; broken links) | Spec lists exhaustive file inventory; check-internal-link-validity --strict catches broken links; G0 pre-tag validator catches inconsistencies |
| Native sub-agent registration on Claude Code doesn't work as expected after rename | Low | High (have to ship v2.17.1 or revert) | G4 P0 scenario 2 explicitly tests this. If fails, ship v2.17.1 with re-evaluation (either fix or document with explicit "still broken" carryover) |
| pm-skills-mcp parser breaks on new frontmatter structure | Medium | Medium (companion repo stale until cross-repo update) | Coordinated cross-repo update planned per Migration guide; pm-skills-mcp is in maintenance mode (M-22) so timing is flexible |
| Doc-stack rebuild fails on renamed paths in mdx | Low | High (Pages broken) | Astro 6.3.x build is part of pre-tag validator bundle; G2.5 sub-check 6 (CI green) catches |
| Memory snapshot drift continues | Medium | Low | G4 P2 explicitly schedules memory refresh; not blocking |
| v2.16.1 G4 P0 attestation reveals defect in v2.16.1 | Low | Critical (v2.17.0 blocked until v2.16.2 ships) | Per D6 entrance criteria; if v2.16.2 ships, v2.17.0 plan stays valid; just delayed |
| Sub-agent + dispatch skill drift after rename | Low | Medium | All 4 dispatch skill descriptions, 4 sub-agent definitions, and the compatibility matrix doc get coordinated update in W2 |

---

## Open decisions for maintainer

1. **v2.17.1 fast-follow scope.** Commit to v2.17.1 with check-sub-agent-command-pair + R-24 hook? Or push them to v2.19.0?
2. **AI-Native Pack timing.** Per issues-conflicts doc Section 4.10, competitive risk vs. focus trade-off. Should `measure-eval-suite-spec` (R-01) promote into v2.18.0 alongside the 4 highest-consensus skills?
3. **v3.0.0 V1 parallel execution.** Run marketplace-rename behavior test in parallel with v2.17.0 prep? Per issues-conflicts doc Section 4.6.
4. **Migration documentation.** How much migration guidance for pm-skills-mcp does Release_v2.17.0.md include vs. a separate cross-repo coordination doc?
5. **Adversarial review reviewer.** Default to claude-opus-4.7 per the v2.16.1 G1 pattern, or attempt codex:codex-rescue again (with the lessons-learned about tool-surface mismatch)?

---

## Status block

- **Status:** ACTIVE (scoped; awaiting v2.16.1 G4 P0 attestation before execution start)
- **Pre-execution HEAD reference:** `141c417` (post-v2.16.1 G4 housekeeping commit; current main as of 2026-05-19)
- **Expected G2.5 commit SHA:** TBD
- **Expected tag SHA:** equals G2.5 commit SHA per D22

---

## Cross-references

- v2.16.0 master plan: [`../v2.16.0/plan_v2.16.0.md`](../v2.16.0/plan_v2.16.0.md) (D31 amendment is the architectural origin of W2)
- v2.16.1 master plan: [`../v2.16.1/plan_v2.16.1.md`](../v2.16.1/plan_v2.16.1.md)
- v2.16.1 G1 review artifact: [`../v2.16.1/plan_v2.16.1_reviewed-by-claude.md`](../v2.16.1/plan_v2.16.1_reviewed-by-claude.md)
- v2.18.0 master plan (next cycle): [`../v2.18.0/plan_v2.18.0.md`](../v2.18.0/plan_v2.18.0.md)
- Strategic roadmap: [`../../_working/roadmap_opus-4.7-max_2026-05-14.md`](../../_working/roadmap_opus-4.7-max_2026-05-14.md)
- Roadmap delta + conflicts log: [`../../_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md`](../../_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md)
- Marketplace identity rename (v3.0.0 target; out of v2.17.0 scope): [`../../marketplace-multi-plugin-migration_2026-05-18.md`](../../marketplace-multi-plugin-migration_2026-05-18.md)
- v2.17 vs v3.0 release scoping: [`../../release-scoping-v2.17-and-v3.0_2026-05-18.md`](../../release-scoping-v2.17-and-v3.0_2026-05-18.md)
- Release runbook (load-bearing artifact; G3 procedure): [`../../../contributing/release-runbook.md`](../../../contributing/release-runbook.md)

---

## Change log

| Date | Author | Change |
|---|---|---|
| 2026-05-17 | maintainer | Initial v2.17.0 stub created during v2.16.0 Phase 0 adversarial review (closes FN-06 dangling-link finding) |
| 2026-05-19 (early) | claude-opus-4.7 (v2.16.1 G4 follow-up) | Added v2.16.1 carry-over section: sub-agent native registration as PRIMARY theme, 4 Note-level findings, reference docs |
| 2026-05-19 (late) | claude-opus-4.7 (v2.17 scoping session) | TIGHT scope reframe per maintainer 2026-05-19 directive. Frontmatter metadata sweep (R-05) added as PRIMARY co-equal with AGENTS rename. Path B1 chosen for sub-agent rename per concrete-behavior comparison. 169-line stub content reorganized: 2 items committed, ~12 items deferred to v2.17.1 / v2.19.0 / v3.0.0 / v2.20+. Stub status promoted from STUB to ACTIVE (pending v2.16.1 G4 P0 attestation). |
