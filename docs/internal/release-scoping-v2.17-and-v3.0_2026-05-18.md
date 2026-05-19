---
title: Release Scoping. v2.17.0 (sub-agent native registration) vs v3.0.0 (marketplace identity rename)
description: 'Backwards-compatibility analysis for two architectural changes deferred from v2.16.1. Recommends splitting them across two releases: v2.17.0 carries the additive sub-agent native-registration fix (low risk); v3.0.0 carries the marketplace identity rename and host-repo migration (real backwards-compat risk, requires verification work). Captures the SemVer rationale and the pre-v3.0.0 verification gaps that must close before scheduling.'
date: 2026-05-18
status: draft
audience: pm-skills maintainers, v2.17 + v3.0 planners
related:
  - marketplace-multi-plugin-migration_2026-05-18.md
  - release-plans/v2.17.0/plan_v2.17.0.md
  - "../releases/Release_v2.16.1.md"
---

# Release Scoping. v2.17.0 (sub-agent native registration) vs v3.0.0 (marketplace identity rename)

**Date**: 2026-05-18
**Status**: Draft for discussion
**Decision needed**: Confirm the v2.17 vs v3.0 split before scheduling either release

## Executive summary

Two architectural changes are queued after v2.16.1:

1. **Sub-agent native registration** (carryover from v2.16.1). Rename `AGENTS/` coordination directory + rename `subagents/` → `agents/` so Claude Code auto-discovers the 4 sub-agents at install time.
2. **Marketplace identity rename and host-repo migration** (from `marketplace-multi-plugin-migration_2026-05-18.md`). Rename marketplace identity from `pm-skills-marketplace` to `product-on-purpose`. Optionally move marketplace.json to a dedicated host repo.

These changes are **architecturally orthogonal**. They share no code and have entirely different backwards-compat profiles.

**Recommended scoping**:
- v2.17.0: ships **only** the sub-agent native registration fix. Additive, low risk.
- v3.0.0: ships the marketplace rebrand. Major-version bump signals the breaking change. Migration guide in release notes.

The marketplace rebrand has unknowns that must be tested before scheduling (Claude Code's actual behavior on marketplace name changes is not documented).

---

## The two changes side by side

|  | Change A: Sub-agent native registration | Change B: Marketplace identity rename |
|---|---|---|
| **Goal** | Sub-agents auto-discovered as native Claude Code components | Marketplace brand aligns with publisher identity (product-on-purpose) |
| **Surface** | Internal directory rename + plugin.json clean-up | Marketplace.json `name` field change; optional host-repo move |
| **User-facing capability change** | Adds native sub-agent invocation on Claude Code | Renames the marketplace string users reference at install time |
| **Reversibility** | Easy. Internal rename can be reverted with another rename. | Hard. Once users update, undoing requires another migration. |
| **Required user action** | None. `/plugin update pm-skills` is sufficient. | Maybe none (if Claude Code auto-migrates), maybe `marketplace remove + add` cycle, maybe re-install plugins. Unknown. |
| **Affects external references** | No | Yes (READMEs, blog posts, tutorials, pm-skills-mcp metadata) |
| **SemVer classification** | Minor (additive) | Major (breaking) |
| **Recommended release** | v2.17.0 | v3.0.0 |

---

## Change A: Sub-agent native registration

### Background

v2.16.0 attempted to declare a custom sub-agent path via `"agents": ["./subagents/"]` in `.claude-plugin/plugin.json` because the canonical `agents/` directory would collide with the existing tracked `AGENTS/` directory on case-insensitive filesystems (Windows NTFS, macOS APFS). Master plan D31 amendment documents the design choice.

The problem: Claude Code's plugin schema does not include an `agents` field. The v2.16.0 manifest fails validation. v2.16.1 patches the manifest by removing the invalid field, but in doing so loses the (intended) sub-agent registration mechanism.

The proper fix: free up the `agents/` directory name by renaming `AGENTS/`, then rename `subagents/` → `agents/`. Claude Code auto-discovery does the rest.

### Implementation

1. Rename tracked `AGENTS/` to a name that does not collide with `agents/` on case-insensitive filesystems. Candidates: `_agent-coordination/`, `coordination/`, `agent-context/`, `_meta/`. Pick one per Phase 0 of the v2.17 plan.
2. Sweep all internal references to `AGENTS/` and update path strings:
   - Scripts: `validate-agents-md.{sh,ps1}` (currently scans `subagents/*.md`, will need to scan `agents/*.md` after rename B is applied)
   - Docs: CONTRIBUTING.md, AGENTS.md (the file, not the directory), CLAUDE.md, internal CONTEXT.md files
   - CI workflows: any YAML that references `AGENTS/` paths
3. Rename `subagents/` → `agents/` at the plugin root.
4. Update internal references to `subagents/`:
   - `_chain-permitted.yaml` comments
   - `_pairing.yaml` references
   - validator path scans
   - Dispatch skills (`utility-pm-*`) that read `subagents/pm-{role}.md`
5. Verify Claude Code auto-discovery: install fresh, confirm all 4 sub-agents register.
6. Update v2.16.1 release notes' "Known limitations" to mark this resolved.

### Backwards-compat profile

| Surface | Impact |
|---|---|
| Slash commands (`/prd`, `/hypothesis`, etc.) | None |
| Dispatch skills (`utility-pm-*`) | Behavior unchanged on Claude Code (now use native dispatch instead of inline fallback). User-transparent. |
| Sub-agent invocation | New capability on Claude Code (was missing in v2.16.1) |
| Plugin install command | Unchanged |
| Marketplace name | Unchanged |
| Existing cached installs | Update applies cleanly via `/plugin update pm-skills` |
| External references (READMEs, tutorials) | None |

The only failure modes are internal: contributor confusion if internal `AGENTS/` references get missed during the sweep, or validator breakage. Both are caught by CI before ship.

### Risk: low. Recommended for v2.17.0.

---

## Change B: Marketplace identity rename

### Background

Today the marketplace identity is `pm-skills-marketplace`, which conflates the marketplace name with the plugin name. The user-intended model treats `product-on-purpose` as the marketplace and pm-skills (plus future thinking-framework-skills, etc.) as plugins under it. The migration plan (`marketplace-multi-plugin-migration_2026-05-18.md`) lays out the full architecture.

The change has three sub-decisions:

1. **Marketplace identity rename**: change the `name` field in marketplace.json from `pm-skills-marketplace` to `product-on-purpose`.
2. **Marketplace host repo decision** (Forks 1a-1c from the migration plan):
   - F1a: keep marketplace.json in the pm-skills repo; pm-skills plugin source stays `./`.
   - F1b: move marketplace.json to a new dedicated repo (`product-on-purpose/marketplace`); pm-skills referenced via external `github` source object.
   - F1c: hybrid (in-place pm-skills, new plugins external).
3. **Plugin source format**: relative paths (in-repo) vs typed `github` source objects (external).

### The unknowns

Claude Code's behavior when a marketplace's `name` field changes is **not documented**. Three plausible behaviors:

| Sub-case | Behavior | Severity for users |
|---|---|---|
| Best | Claude Code keys local marketplace entries by source URL. `/plugin marketplace update` silently picks up the new name. Plugin `@product-on-purpose` install syntax works immediately. | Minor: README install snippets become stale |
| Middle | Local entry keyed by name. After update, the local cache has both an old `pm-skills-marketplace` reference and the new fetched data. Users must `/plugin marketplace remove pm-skills-marketplace` then `/plugin marketplace add product-on-purpose/...` | Moderate: documented migration step |
| Worst | Local entry silently stops syncing because the name doesn't match the local cache key. Updates never apply. Users do not notice. | Severe: silently stale fleet of installs |

The actual behavior is testable: stand up a sacrificial marketplace, push a name-field change, observe what `/plugin marketplace update` does on a fresh Claude Code instance. This test should run before scheduling v3.0.0.

### Additional concerns

- **Plugin install command changes**. Today: `/plugin install pm-skills@pm-skills-marketplace`. After rename: `/plugin install pm-skills@product-on-purpose`. Stale READMEs, blog posts, GitHub issues, tutorials, third-party docs.
- **Marketplace host repo URL may change**. If we adopt F1b (dedicated host repo), the add-marketplace command also changes: `/plugin marketplace add product-on-purpose/pm-skills` (today) → `/plugin marketplace add product-on-purpose/marketplace` (after). This is a genuine resource move on top of the identity rename.
- **Cross-repo metadata**. `pm-skills-mcp/pm-skills-source.json` and related files reference the marketplace identity. Need a cross-repo coordinated update.
- **Validator: `scripts/validate-plugin-install.{sh,ps1}`**. Today it asserts marketplace name `pm-skills-marketplace`. Must update before v3.0.0.
- **GitHub repo rename (optional)**. If we also rename the repo from `pm-skills` to `product-on-purpose-skills` for brand alignment (Fork 2a), that adds a third user-visible URL change. GitHub redirects soften it but don't eliminate it.

### Backwards-compat profile

| Surface | Impact |
|---|---|
| Slash commands | None (same plugin content, same commands) |
| Plugin install command | Changes (new `@product-on-purpose` suffix) |
| Marketplace install command | Changes if host repo also moves (F1b) |
| Existing cached installs | Behavior depends on the unknown Claude Code rename handling |
| External documentation | Becomes stale (READMEs, tutorials, blog posts) |
| Companion `pm-skills-mcp` repo metadata | Needs coordinated cross-repo update |
| Skill content | None |

### Risk: real and partially unknown. Requires verification work. Recommended for v3.0.0.

---

## Why split the changes

Bundling A and B into one release has costs and no benefits:

1. **SemVer signaling is harder.** If v2.17.0 includes both, it's a major-version bump but called minor. Confusing.
2. **Risk concentration.** A bundled release means one rollback affects both. Splitting means each can be reverted independently if needed.
3. **Migration guide complexity.** A bundled release requires a migration guide that handles both changes. Splitting means each release's guide is focused.
4. **Verification timing.** Change A is ready to schedule today (architectural cleanup). Change B is blocked on the marketplace-rename behavior test. Bundling forces A to wait on B.
5. **Communication clarity.** "v2.17 ships sub-agent native registration" is a clean release narrative. "v3.0.0 ships the product-on-purpose marketplace rebrand" is a clean release narrative. Combined, it's two narratives competing for a single release announcement.

The split is cheap (each release is small) and the benefits are real (clean SemVer, isolated risk, independent scheduling).

---

## Recommended scoping

| Release | Carries | Backwards-compat | User action required | Ready to schedule? |
|---|---|---|---|---|
| **v2.16.1** (today) | Plugin manifest schema fix | None | `/plugin update pm-skills` once shipped | Yes (ready to commit + tag) |
| **v2.17.0** | Sub-agent native registration: `AGENTS/` rename + `subagents/` → `agents/` rename + plugin.json adjustments + validator updates | Minimal (additive capability) | `/plugin update pm-skills`; gain native sub-agent invocation | Yes once `AGENTS/` rename target is decided |
| **v3.0.0** | Marketplace identity rename (`pm-skills-marketplace` → `product-on-purpose`), optional host-repo move (Fork 1b), optional repo rename (Fork 2a) | Real (severity unknown until tested) | Documented migration: `/plugin marketplace remove ...` + `/plugin marketplace add ...` + reinstall plugins | No; blocked on verification work |

---

## Pre-v3.0.0 verification work

Three items must close before v3.0.0 is scheduled:

### V1: Marketplace-rename behavior test (BLOCKER)

Stand up a sacrificial test marketplace. Push a `name`-field change. Observe Claude Code's behavior on `/plugin marketplace update` from a fresh and from an existing install.

**Outputs**:

- Documented behavior for the rename path
- Decision: is the user migration "automatic" (best case), "documented one-liner" (middle case), or "multi-step recovery" (worst case)?
- Estimated user-visible disruption

### V2: Host-repo strategy decision (Fork 1a / 1b / 1c)

Once V1 outcome is known, decide where the marketplace.json physically lives:

- If Claude Code handles rename cleanly: Fork 1a (in-place) is viable; minimal disruption
- If Claude Code requires user action regardless: Fork 1b (new dedicated repo) gives a cleaner reset; might as well take the user-action hit once and on a clean architecture

### V3: Cross-repo coordinated update plan

Audit and list all external references to the current marketplace identity:

- `pm-skills-mcp/pm-skills-source.json` and any other metadata files
- `pm-skills-mcp/README.md` install snippets
- Any tutorials, blog posts, GitHub issue templates, FAQ docs we maintain
- Internal docs (CONTRIBUTING.md, README.md, AGENTS.md install snippets)

Each becomes a coordinated v3.0.0 ship-day update.

---

## Open questions

1. **What name does the `AGENTS/` coordination directory get renamed to?** Candidates: `_agent-coordination/`, `coordination/`, `agent-context/`, `_meta/`. Resolves at Phase 0 of v2.17.0.
2. **Should v3.0.0 also rename the GitHub repo** (`pm-skills` → `product-on-purpose-skills`)? Trade-off: brand alignment vs URL churn. GitHub redirects soften but don't eliminate.
3. **Should thinking-framework-skills be in scope for v3.0.0**, or ship as a follow-on once the marketplace is restructured? Recommend: skeleton-only as part of v3.0.0 to prove the multi-plugin model; content follows later.
4. **Migration window**: hard-cut at v3.0.0, or maintain `pm-skills-marketplace` as a frozen-alongside-but-deprecated marketplace for one release cycle? Depends on V1 outcome.
5. **Order of v2.17 vs v3.0.0**: ship v2.17 first then v3.0.0? They are independent and can interleave. Recommend v2.17 first because it has no blockers; v3.0.0 ships when V1+V2+V3 close.

---

## Relationship to other docs

| Doc | Relationship |
|---|---|
| `marketplace-multi-plugin-migration_2026-05-18.md` | This doc scopes the migration into v2.17 + v3.0 phases. The migration plan covers the architecture; this doc covers the release-phasing decision. |
| `release-plans/v2.17.0/plan_v2.17.0.md` | v2.17 plan stub should be updated to scope to "sub-agent native registration only" per this doc's recommendation. |
| `releases/Release_v2.16.1.md` | The "Known limitations" section in v2.16.1 release notes references the v2.17 carryover. This doc fleshes out what v2.17 will and won't carry. |
| `multi-repo-extraction-design_2026-04-19.md` | Prior architectural exploration. Its Option A4 is the foundation for the migration plan; this scoping doc is downstream of that direction. |

---

## Decision log

| Date | Decision | Rationale |
|---|---|---|
| 2026-05-18 | Split sub-agent fix (v2.17.0) from marketplace rename (v3.0.0) | Orthogonal changes; different backwards-compat profiles; SemVer signaling clarity |
| 2026-05-18 | v2.17.0 is unblocked and ready to schedule once `AGENTS/` rename target is decided | Sub-agent fix is additive; no verification work needed |
| 2026-05-18 | v3.0.0 is blocked on V1 (marketplace-rename behavior test), V2 (host-repo decision), V3 (cross-repo update audit) | Marketplace rename has real unknowns; ship preparation must close them first |
| TBD | `AGENTS/` rename target | Pending [Open question 1](#open-questions) |
| TBD | V1 marketplace-rename behavior outcome | Blocks v3.0.0 |
| TBD | Fork 1a vs 1b vs 1c (host-repo strategy) | Depends on V1 outcome |
| TBD | Repo rename (`pm-skills` → `product-on-purpose-skills`) yes/no | Pending [Open question 2](#open-questions) |

---

## Next steps

1. Confirm the v2.17 vs v3.0 split direction. If aligned, this doc's decisions become canonical.
2. v2.17.0 path: pick `AGENTS/` rename target, draft v2.17.0 plan from this doc's Change A section.
3. v3.0.0 path: schedule V1 marketplace-rename behavior test. Outcomes feed V2 and V3.
4. Update `marketplace-multi-plugin-migration_2026-05-18.md` recommendation to point at this doc for the release-phasing decision.
