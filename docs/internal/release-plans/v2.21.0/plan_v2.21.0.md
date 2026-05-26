# v2.21.0 Release Plan - Marketplace Launch (additive)

**Status:** PLANNED - design + decisions LOCKED 2026-05-25 (Approach B, additive soft-migration). Ready to execute once the maintainer schedules the cut. Decision briefs D-V3-1..D-V3-5 are DECIDED (below).
**Created:** 2026-05-23 as the v3.0.0 "marketplace migration" plan; **renumbered to v2.21.0 and reframed as a MINOR on 2026-05-25** after the launch approach was locked to additive (Approach B). The breaking convergence is reserved as the real [v3.0.0](../v3.0.0/plan_v3.0.0.md).
**Predecessor:** [v2.20.0](../v2.20.0/) SHIPPED 2026-05-25 (tag `e1db5ec`; Sprint Workflow Commands + validator/doc hardening; catalog 63; 73 commands).
**Type:** **MINOR** (2.20.0 -> 2.21.0). The marketplace launch is **additive**: the new `product-on-purpose` marketplace becomes the promoted canonical path, the existing self-hosted path keeps working, and **no existing user has to change anything for their install to keep working**. That single test (does an existing user have to act? no) is what makes this a minor, not a major. See D-V3-5.

**Theme:** Stand up the multi-plugin `product-on-purpose` marketplace (hosted at `product-on-purpose/agent-plugins`) and make it the canonical, promoted home for installing pm-skills, **without** forcing or breaking any existing install. The catalog stays at 63 skills; only the recommended front door is added.

**Provenance:** Work items sourced from (a) the 2026-05-21 Codex v3-prep audit (P1-04 naming, P1-05 production-safe registry, P2-06 upgrade tests), (b) the Claude review of that audit, (c) a live inspection of the `agent-plugins` and `thinking-framework-skills` repos on 2026-05-23, and (d) the 2026-05-25 launch-approach decision (Approach B). See the audit files under `docs/internal/audit/` and the companion [`launch-and-notification-playbook.md`](launch-and-notification-playbook.md).

> **Decision-ID note.** The decision briefs retain their original `D-V3-*` identifiers (from when this was the v3.0.0 plan) as stable references. They are decisions about *this* launch; the `V3` in the ID is historical, not the ship version.

---

## Why this release exists now

This is the repo's first actively promoted release. v2.20.0 and the hardening before it (validators, CI hygiene, community-health files) cleared the way so this release can focus on its single headline: standing up the marketplace. The move matters because the long-term direction is multiple independent plugins under one marketplace (`pm-skills`, later `thinking-framework-skills`, and others), and a single self-hosted plugin repo cannot host that. The `product-on-purpose/agent-plugins` registry repo already exists and encodes the locked naming. What remains is publishing it safely and pointing users at it.

**The defining constraint:** Claude Code keys installed plugins by marketplace identity. Existing users installed `pm-skills@pm-skills-marketplace`; the new recommended identity is `pm-skills@product-on-purpose`. Those are different identities, so installs do **not** auto-migrate, and if a user adds *both* marketplaces at once, pm-skills loads twice and its commands duplicate. The additive approach (B) handles this by never forcing the switch: the old path keeps working, so no user is pushed into the duplicate-install hazard. The migration steps (for users who *choose* to move) are documented with the mandatory "remove old first" ordering.

---

## Launch approach: B (additive soft-migration) - LOCKED

Decided 2026-05-25. Stand up `product-on-purpose` as the canonical, promoted path; keep the old `pm-skills-marketplace` alive and working; force no migration. Commit to retiring the old path at a **trigger** (when plugin #2 ships and gives old-path users a real reason to move), not a fixed date. The launch is non-breaking (a minor); the eventual retirement is the breaking step and is reserved for the convergence major ([v3.0.0](../v3.0.0/plan_v3.0.0.md)). Full approach analysis: [`launch-and-notification-playbook.md`](launch-and-notification-playbook.md).

---

## Current state -> target state

| Aspect | Today (v2.20.0) | v2.21.0 target |
|---|---|---|
| Marketplace host repo | `product-on-purpose/pm-skills` (self-hosted) | add `product-on-purpose/agent-plugins` (separate thin registry) as canonical |
| Promoted marketplace identity | `pm-skills-marketplace` | `product-on-purpose` |
| Install step 1 (add) | `/plugin marketplace add product-on-purpose/pm-skills` | `/plugin marketplace add product-on-purpose/agent-plugins` |
| Install step 2 (install) | `/plugin install pm-skills@pm-skills-marketplace` | `/plugin install pm-skills@product-on-purpose` |
| Old self-hosted path | the only path | **kept alive** during the transition (D-V3-1) |
| pm-skills `source` in registry | `./` (same repo) | `{ github, repo: product-on-purpose/pm-skills, sha: <v2.21.0 tag> }` (pinned, cross-repo) |
| Evergreen paths (unchanged) | `npx skills add product-on-purpose/pm-skills`; `git clone` | identical (these do not touch the marketplace) |

**Live registry state as inspected 2026-05-23** (`product-on-purpose/agent-plugins`, private): `marketplace.json` has `name: product-on-purpose`, one `pm-skills` entry pinned to `sha b6ff373` (v2.17.0), `strict: true`, `metadata.version 0.1.0`. README carries the three-name explanation, a Preview banner, and a migration section. The repo has no CI workflows. So the registry is well-formed but the pin is **stale** (v2.17.0), the repo is **private**, and it has **no validation gate**. Those three gaps are this release's registry-side work.

---

## Scope

### In scope
- **Install-identity launch** (Phase 1): repoint README + docs-site install instructions to the new marketplace as canonical, framed as additive dual-home; version bump to 2.21.0; CHANGELOG; release notes.
- **Registry finalization** (Phase 2): the agent-plugins `marketplace.json` target (sha + version); a registry validation CI spec; go-public preparation.
- **Migration safety** (Phase 3): the migration guide (for users who choose to move); the dual-home mechanics.
- **Verification** (Phase 4): the 6-scenario install/upgrade smoke matrix from clean state.
- **Launch + hygiene** (Phase 5): tag, pin, flip the registry public, publish the Release, announce, post-tag hygiene.

### Out of scope (deferred, with destination)
- **The old-path retirement + the breaking convergence**: reserved for [v3.0.0](../v3.0.0/plan_v3.0.0.md), triggered by plugin #2. This release only *launches* the new path; it removes nothing.
- **Command/skill naming standardization**: [v2.22.0](../v2.22.0/plan_v2.22.0.md) (additive minor). Independent of the marketplace move.
- **Second plugin launch** (`thinking-framework-skills`): empty stub today; its own future release.
- **New content skills**: roadmap (see carried backlog below).
- **pm-skills-mcp catalog/description drift** ("40 skills" vs 63): separate maintenance-mode repo; aligned on the MCP cadence, not gated into this tag.

---

## Phases

Execution spine: **prep -> tag -> pin -> smoke (private) -> public -> announce.** The registry pins a commit SHA that does not exist until the pm-skills v2.21.0 tag, and the registry should not go public until it points at that real tag.

### Phase 0 - Entrance gate
**Satisfied.** Pre-promotion hardening shipped through v2.20.0 (validator bundle, community-health files, link/path hygiene). The live agent-plugins registry has been inspected. This release may be sequenced as the next cut.

### Phase 1 - pm-skills-side launch prep

| Item | Goal | Decision | Effort |
|---|---|---|---|
| M1 | Repoint install instructions to canonical-new + additive dual-home | D-V3-1 | Medium |
| M2 | Version bump to 2.21.0 across all surfaces | - | Small |
| M3 | CHANGELOG + Release notes framed as an additive distribution launch | D-V3-5 | Small-Med |

**M1 - Repoint install instructions (additive dual-home).** README + docs-site install blocks lead with the new path (`marketplace add product-on-purpose/agent-plugins` + `install pm-skills@product-on-purpose`); add a short "Already installed the old way? It keeps working; to move, see the migration guide" pointer. Leave evergreen `npx skills add` and `git clone` untouched. Keep pm-skills's own self-hosted `marketplace.json` alive per D-V3-1.
- Acceptance: install blocks lead with the new path; the old path is present and labeled as still-working; evergreen paths unchanged; enforcing link/anchor checks stay green.

**M2 - Version bump to 2.21.0.** Bump `plugin.json`, the self-hosted `.claude-plugin/marketplace.json` plugin entry, README version badge + At-a-Glance row, both `_agent-context/*/CONTEXT.md` currency tokens.
- Acceptance: `validate-version-consistency` PASS at 2.21.0; `check-context-currency` PASS; bundle green.

**M3 - CHANGELOG + Release notes.** Explain this is an **additive** distribution launch: a new recommended marketplace, old path unaffected. CHANGELOG `[2.21.0]` entry under "Added" (new install path) / "Changed" (recommended path), not a breaking notice. `docs/releases/Release_v2.21.0.md` leads with the marketplace launch and links the migration guide.
- Acceptance: release notes/CHANGELOG name the launch as additive; no breaking-change or new-skill claims; public-paths-only.

### Phase 2 - Registry finalization

| Item | Goal | Decision | Effort |
|---|---|---|---|
| M4 | Stage the agent-plugins `marketplace.json` target | - | Small |
| M5 | Registry validation CI spec | D-V3-4 | Medium |
| M6 | Go-public preparation + repo hardening | D-V3-3 | Small-Med |

**M4 - Stage the registry target.** Bump the `pm-skills` entry `sha` to the v2.21.0 tag commit, `version` to `2.21.0`, and the registry's own `metadata.version` to its launch version (e.g., `1.0.0`). Hold `strict: true` only after the install smoke passes.

```jsonc
// product-on-purpose/agent-plugins .claude-plugin/marketplace.json (target at launch)
{
  "name": "product-on-purpose",
  "metadata": { "version": "1.0.0" },           // was 0.1.0
  "plugins": [
    {
      "name": "pm-skills",
      "source": { "source": "github", "repo": "product-on-purpose/pm-skills", "sha": "<v2.21.0 tag SHA>" }, // was b6ff373 (v2.17.0)
      "version": "2.21.0",                        // was 2.17.0
      "strict": true                              // hold true only after install smoke passes
    }
  ]
}
```
- Acceptance: the staged target is unambiguous; the SHA slot is marked "fill at Phase 4 after the tag exists."

**M5 - Registry validation CI spec.** Spec only; the workflow lives in agent-plugins. See [`registry-ci-spec.md`](registry-ci-spec.md). Enforcement per D-V3-4.

**M6 - Go-public preparation + repo hardening.** The `agent-plugins` repo already has `README.md`, `LICENSE` (Apache 2.0), `CONTRIBUTING.md`, and `.claude-plugin/marketplace.json`; it is currently **private** with **no CI**. Prepare it for a clean public flip via an explicit readiness checklist, so Phase 5's flip is a single deliberate step. Timing per D-V3-3.

Go-public + hardening checklist (all boxes green before the Phase 5 flip):
- [ ] **README review + update** (update, not create - it exists): refresh for a public audience. Remove the Preview banner; correct the stale pin reference (v2.17.0 -> v2.21.0); state plainly that this is a thin registry that holds **no plugin code**; give the canonical install commands (`marketplace add product-on-purpose/agent-plugins` + `install pm-skills@product-on-purpose`); keep the "Migration during transition" section accurate.
- [ ] **LICENSE confirm**: Apache 2.0 already present; confirm it matches pm-skills.
- [ ] **CONTRIBUTING confirm**: already present; confirm it points at the right repos and the registry-only contribution scope.
- [ ] **Secret scan**: no tokens/secrets in the tree or git history; `.gitignore` excludes local-only paths (`_LOCAL/`, `.memsearch/`).
- [ ] **CI green**: the registry validation workflow (M5) is committed and passing on `main`.
- [ ] **Branch protection**: protect `main` and require the validate-registry check, set at or before go-public.
- [ ] **Repo metadata**: GitHub About description + topics point at the canonical install.
- Acceptance: every box checked; the only remaining go-public action is the visibility flip in Phase 5.

### Phase 3 - Migration safety

| Item | Goal | Decision | Effort |
|---|---|---|---|
| M7 | Migration guide (for users who choose to move) | D-V3-1 | Medium |
| M8 | Dual-home mechanics | D-V3-2 | Small |

**M7 - Migration guide.** See [`migration-guide-draft.md`](migration-guide-draft.md). Covers the three user situations: (1) new user (use the new path), (2) existing old-path user (it keeps working; here is how to move if you want, in the mandatory order), (3) `npx`/`git clone` user (unaffected). Framed as additive.

**M8 - Dual-home mechanics.** Keep the pm-skills self-hosted `marketplace.json` alive and version-bumped during the transition; both homes serve the same plugin. The retirement trigger + end-of-window mechanic are deferred to the convergence release (D-V3-2).

### Phase 4 - Tag, pin, verify
1. Run the full pre-tag validator bundle + Astro build on the release-prep HEAD; CI green.
2. Tag pm-skills `v2.21.0` at the CI-verified SHA (tag only the SHA whose full CI is green).
3. Fill the staged registry `sha` (M4) with the v2.21.0 tag commit; apply to the agent-plugins registry (still private).
4. Run the 6-scenario smoke matrix (authed, while private) per [`upgrade-smoke-test-matrix.md`](upgrade-smoke-test-matrix.md). S1-S5 pass; S6 reproduces the documented duplicate-install footgun.

### Phase 5 - Launch + hygiene
1. Flip the agent-plugins repo public (D-V3-3), once the M6 go-public + hardening checklist is fully green.
2. Publish the pm-skills `v2.21.0` GitHub Release as Latest with the `Release_v2.21.0.md` body; verify no orphan draft.
3. Announce the launch (link the migration guide) on the channels the README points at. Use the **light comms stack** (additive launch): README repoint, release notes, and a gentle "also available via product-on-purpose" line on the old listing. The heavy stack (skill banner, tombstone) is reserved for the convergence retirement.
4. Post-tag hygiene: flip this plan + both CONTEXT.md to SHIPPED; refresh MEMORY.md; confirm the next-version stubs.

---

## Decisions (Decision Briefs) - DECIDED 2026-05-25

Each brief uses the 6-part format; the maintainer slot is now filled. Options labeled A/B/C.

### D-V3-1 - Fate of pm-skills's own self-hosted `.claude-plugin/marketplace.json`
- **What:** keep, repoint, or remove the self-hosted marketplace (identity `pm-skills-marketplace`, source `./`) at this launch.
- **Why:** it is what existing `pm-skills@pm-skills-marketplace` users update against, and the "install direct from the repo" fallback. Removing it strands existing users.
- **Alternatives:** A) **Keep** during the transition, version-bumped; retire at the convergence (D-V3-2). B) **Remove** now; existing users must re-add. C) **Repoint** its `name` to `product-on-purpose`.
- **DECISION: A.** Keep the self-hosted marketplace alive and version-bumped; it retires at the convergence major. This is the additive dual-home. B breaks existing installs on day one; C cannot work (a self-hosted `source: ./` cannot masquerade as the cross-repo `product-on-purpose` identity).

### D-V3-2 - Dual-home retirement (window + end-state)
- **What:** how long the old path stays alive and what triggers its removal.
- **Alternatives:** A) Time-boxed (~90 days). B) Release-boxed (next N releases). C) **Trigger-boxed** (retire when plugin #2 ships / adoption clears a bar).
- **DECISION: C (trigger-based), deferred to the convergence release.** The old path stays alive until plugin #2 gives users a real reason to move; the exact end-of-window notification mechanic (tombstone vs delist) is chosen at that point. This launch removes nothing, so the window length does not gate it. Detail: [`launch-and-notification-playbook.md`](launch-and-notification-playbook.md) Part 1 + Part 4.

### D-V3-3 - agent-plugins go-public timing
- **What:** when the private registry becomes public.
- **Alternatives:** A) **At launch** (stay private through Phase 4, flip public in Phase 5 after the real-tag pin). B) Early. C) Public + pre-release-pinned.
- **DECISION: A.** Keeps the public registry correct from the first moment it is reachable; smoke runs authed while private.

### D-V3-4 - Registry validation CI enforcement level
- **What:** whether agent-plugins CI blocks a listing on failure or only warns.
- **Alternatives:** A) **Enforcing** (fail on missing/invalid sha, sha-not-on-tag, missing fields, failed install smoke). B) Advisory. C) Tiered (enforce schema + sha; installability smoke advisory).
- **DECISION: A, with the C fallback for check 7 only.** Checks 1-6 enforcing; the installability smoke (check 7) demotes to advisory only if it proves flaky. Detail: [`registry-ci-spec.md`](registry-ci-spec.md).

### D-V3-5 - Version designation (why MINOR, not 3.0.0)
- **What:** how to version a release that adds a marketplace but breaks nothing.
- **Alternatives:** A) Major (3.0.0). B) **Minor (2.21.0)**. C) Major, deferred until paired with content.
- **DECISION: B (MINOR).** SemVer versions compatibility, not significance. The launch is backward-compatible (old path keeps working, no user must act), so it is a minor. Deprecation is a minor; only the *removal* of the old path is a major, and that is reserved for the convergence ([v3.0.0](../v3.0.0/plan_v3.0.0.md)). A "marketing major" here would cry wolf and devalue the version signal right before the real breaking change.

---

## Release-level acceptance criteria

- The `product-on-purpose/agent-plugins` registry is public and contains only registry + docs files (no plugin code).
- `pm-skills` remains independently installable from its own repo (direct fallback still works).
- The registry `pm-skills` entry is pinned to the v2.21.0 tag SHA at `version 2.21.0`.
- Fresh install from the new marketplace installs pm-skills at v2.21.0 (smoke S1).
- An existing `pm-skills@pm-skills-marketplace` install keeps working (smoke S2) and has a documented, working move path (smoke S3).
- Remove-old-then-add-new leaves no duplicate commands (smoke S3); both-added reproduces the footgun (smoke S6, documented).
- Direct install from `product-on-purpose/pm-skills` still works (smoke S4); installed commit matches the registry `sha` (smoke S5).
- Registry CI validates schema, required fields, pinned-SHA-on-a-tag, and installability per D-V3-4.
- The agent-plugins repo is hardened before the visibility flip: README updated for a public audience (no Preview banner, pin corrected to v2.21.0, thin-registry scope stated), LICENSE + CONTRIBUTING confirmed, no secrets, branch protection on `main`, and the registry CI green (M6 checklist fully green).
- Release notes explain the launch as **additive** (new path added; old path unaffected; nothing removed).
- The full pre-tag validator bundle + Astro build are green on the tagged SHA; GitHub Release is Latest; no orphan draft.

---

## Carried-forward content backlog (non-blocking; future content minor)

Folded in from the prior v2.21.0 content stub; these are not marketplace work and may ride a later content release or this one if convenient:
- **`1/27 shipped skills` dated ratio prose** in `skills/utility-pm-skill-validate/SKILL.md`, its `references/EXAMPLE.md`, and the generated page: the "27" denominator predates the 63-skill catalog. Update numerator + denominator when the worked example is next revised.
- **Roadmap content skills** under consideration: develop-pre-mortem, develop-product-vision.

---

## Dependencies and sequencing

- **Hard dependency (met):** pre-promotion hardening, shipped through v2.20.0.
- **Cross-repo coordination:** spans two repos. pm-skills-side work (Phases 1, 3, 4 tag, 5 Release) is authored and committed here. agent-plugins-side work (Phases 2, 4 pin, 5 go-public) is staged here as drafts and hand-applied to the live registry at execution. The registry `sha` can only be finalized after the pm-skills tag exists (Phase 4).
- **Relationship to v2.22.0 (naming):** independent and additive; either order works, though shipping the marketplace first keeps the promoted launch's "your skills did not change" message clean.

---

## Companion documents

| File | Purpose |
|---|---|
| [`migration-guide-draft.md`](migration-guide-draft.md) | User-facing migration content (3 user situations, exact commands), finalized to Approach B |
| [`upgrade-smoke-test-matrix.md`](upgrade-smoke-test-matrix.md) | The 6-scenario install/upgrade smoke runbook (the Phase 4 gate) |
| [`registry-ci-spec.md`](registry-ci-spec.md) | Spec for the agent-plugins registry validation workflow |
| [`launch-and-notification-playbook.md`](launch-and-notification-playbook.md) | Launch-approach options + notification channel inventory + best practices (Approach B locked) |
| [`decision-worksheet.md`](decision-worksheet.md) | Plain-language decision tracker + verified Claude Code facts (now resolved) |
| [`marketplace-repo-skeleton/`](marketplace-repo-skeleton/) | SUPERSEDED draft (kept for provenance); the live agent-plugins repo is authoritative |

---

## Notes

- Distribution release: per the repo convention against per-item effort docs, work items live as rows/subsections here; only genuinely distinct deliverables get companion files.
- This plan and its companions were renumbered from `v3.0.0/` to `v2.21.0/` on 2026-05-25 when the launch approach was locked to additive (Approach B = minor). The breaking convergence retains the `v3.0.0` number.

## Review history
- **Design approved 2026-05-23:** scope = marketplace launch; artifacts staged in-folder, live private registry not mutated this pass.
- **Live-repo inspection 2026-05-23:** confirmed the registry encodes the locked naming + a stale pin, is private, has no CI.
- **Decisions locked 2026-05-25:** Approach B (additive soft-migration); D-V3-1..5 decided; release reframed as a MINOR (v2.21.0); convergence reserved as v3.0.0.
- **Pending:** schedule the cut; then a Codex adversarial pass on this plan before execution.
