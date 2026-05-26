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
- **Verification** (Phases 4-5): the 8-scenario install/upgrade smoke matrix - private S1-S7 at Phase 4, post-flip public S8 at Phase 5.
- **Launch + hygiene** (Phase 5): flip the registry public, post-flip public smoke (S8), publish the Release, announce, post-tag hygiene. (The tag + registry pin happen in Phase 4.)

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
- **Sequencing guard (executable mechanism):** the new path is a dead end until the registry is public, so the install-block repoint must **not** reach `main` before the Phase 5 flip. Mechanism: **the install-block repoint is excluded from the Phase 4 tagged release-prep commit** and lands as a **separate commit on `main` during Phase 5 step 4**, after the public flip. Only the M2 version-badge / At-a-Glance bump (a different region of the README) rides the tagged commit; the install instructions themselves defer. This is safe because new-path users install pinned at the tag and read `main` on GitHub for instructions, so the tagged commit carrying the pre-repoint README is correct. Until Phase 5, the repo keeps showing a working install path.
- Acceptance: install blocks lead with the new path; the old path is present and labeled as still-working; evergreen paths unchanged; enforcing link/anchor checks stay green; the repoint is not the public default before the registry is public.

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

**M4 - Stage the registry target.** Use the complete `marketplace.json` below as the executable source of truth: it carries every field the registry CI enforces (`registry-ci-spec.md` checks 2-3 require `$schema`, `name`, `owner`, `plugins`; and per-entry `name`, `source`, `version`, `description`), so the documented target passes its own gate. Only the commented fields change from the live v2.17.0 file. Bump the `pm-skills` entry `sha` to the v2.21.0 tag commit, `version` to `2.21.0`, and the registry's own `metadata.version` to its launch version (e.g., `1.0.0`). **Keep `strict: true` set for the smoke run** so S1-S5 exercise the real launch configuration; it is already the live setting and the documented default, and it is not a "passed validation" badge (see the playbook appendix), so there is no reason to defer it.

```jsonc
// product-on-purpose/agent-plugins .claude-plugin/marketplace.json (complete launch target)
{
  "$schema": "https://anthropic.com/claude-code/marketplace.schema.json",
  "name": "product-on-purpose",
  "owner": { "name": "Product on Purpose", "url": "https://github.com/product-on-purpose" },
  "metadata": {
    "description": "Product on Purpose: thematic AI agent skill and tool collections for product work.",
    "version": "1.0.0"                            // was 0.1.0
  },
  "plugins": [
    {
      "name": "pm-skills",
      "source": { "source": "github", "repo": "product-on-purpose/pm-skills", "sha": "<v2.21.0 tag SHA>" }, // was b6ff373 (v2.17.0)
      "description": "Product management skills, sub-agents, and sprint tools across the full product lifecycle. Follows the agentskills.io specification.",
      "version": "2.21.0",                        // was 2.17.0
      "strict": true
    }
  ]
}
```
- Acceptance: the staged target is the complete file (every CI-enforced field present, so it passes `validate-registry` as written); the SHA slot is marked "fill at Phase 4 after the tag exists."

**M5 - Registry validation CI spec.** Spec only; the workflow lives in agent-plugins. See [`registry-ci-spec.md`](registry-ci-spec.md). Enforcement per D-V3-4.

**M6 - Go-public preparation + repo hardening.** The `agent-plugins` repo already has `README.md`, `LICENSE` (Apache 2.0), `CONTRIBUTING.md`, and `.claude-plugin/marketplace.json`; it is currently **private** with **no CI**. Prepare it for a clean public flip via an explicit readiness checklist, so Phase 5's flip is a single deliberate step. Timing per D-V3-3.

Go-public + hardening checklist (all boxes green before the Phase 5 flip):
- [ ] **README review + update** (update, not create - it exists): refresh for a public audience. Remove the Preview banner; correct the stale pin reference (v2.17.0 -> v2.21.0); state plainly that this is a thin registry that holds **no plugin code**; give the canonical install commands (`marketplace add product-on-purpose/agent-plugins` + `install pm-skills@product-on-purpose`); keep the "Migration during transition" section accurate.
- [ ] **LICENSE confirm**: Apache 2.0 already present; confirm it matches pm-skills.
- [ ] **CONTRIBUTING confirm**: already present; confirm it points at the right repos and the registry-only contribution scope.
- [ ] **Secret scan**: run `gitleaks detect --no-banner` (or GitHub secret-scanning / push protection if enabled on the org) over the working tree **and full git history**; archive the run output showing zero findings as launch evidence; confirm `.gitignore` excludes local-only paths (`_LOCAL/`, `.memsearch/`).
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

### Phase 4 - Tag, pin, verify (private)
1. Run the full pre-tag validator bundle + Astro build on the release-prep HEAD; CI green.
2. Push the release-prep commit to pm-skills `main`, then tag `v2.21.0` at the CI-verified SHA (tag only the SHA whose full CI is green) **and push the tag**. The tag must be public *before* the registry is staged: the registry's `sha`-on-tag check (`registry-ci-spec.md` check 5) needs the tag ref to resolve remotely, and the private smoke installs the plugin by that `sha`. The tag is safe to move at this point - no public Release and no public registry reference it yet (see step 5).
3. Fill the staged registry `sha` (M4) with the v2.21.0 tag commit; apply to the agent-plugins registry (still private). The registry `validate-registry` CI runs here, and check 5 (`sha` is a release-tag target) passes against the tag pushed in step 2.
4. Run the private smoke scenarios (authed, while private) per [`upgrade-smoke-test-matrix.md`](upgrade-smoke-test-matrix.md): S1-S5 pass; S6 reproduces the documented duplicate-install footgun; S7 confirms recovery from the duplicated state. Archive results as release evidence, and **update the migration guide + release notes with the exact `/plugin` command syntax confirmed during smoke** (the guide and matrix currently carry representative spellings) before anything is published.
5. **If private smoke fails (abort/rollback):** do not flip the registry public, do not publish the Release, and do not repoint public surfaces. The maintainer decides patch-forward vs re-tag. The `v2.21.0` tag is already public (step 2), but it is still safe to delete and re-push it at the corrected SHA while the registry stays private and no public Release references it. Resolve, then re-enter Phase 4 from step 1.

### Phase 5 - Launch + hygiene
1. Flip the agent-plugins repo public (D-V3-3), once the M6 go-public + hardening checklist is fully green.
2. **Post-flip public smoke (gate before Release):** from a clean Claude Code profile that is **not** authenticated to the `product-on-purpose` org (or a logged-out client), run **S8** - `/plugin marketplace add product-on-purpose/agent-plugins` then `/plugin install pm-skills@product-on-purpose`, and confirm commands resolve. This is the only step that proves a *normal public user* can install; Phase 4's authed-private smoke does not. If S8 fails, the repo is reachable but not installable (visibility scope, pin, or registry CI): hold the Release and the announce, diagnose, and do not proceed until S8 passes.
3. Publish the pm-skills `v2.21.0` GitHub Release as Latest with the `Release_v2.21.0.md` body (the tag was pushed in Phase 4 step 2); verify no orphan draft.
4. **Land the M1 install-block repoint as a separate commit on `main` now that the registry is public** (it was held out of the Phase 4 tagged commit per the M1 sequencing guard), so repo visitors are never sent to a still-private registry. This is the moment the new path becomes the user-visible default.
5. Announce the launch (link the migration guide) on the channels the README points at. Use the **light comms stack** (additive launch): README repoint, release notes, and a gentle "also available via product-on-purpose" line on the old listing. The heavy stack (skill banner, tombstone) is reserved for the convergence retirement.
6. Post-tag hygiene: flip this plan + both CONTEXT.md to SHIPPED; refresh MEMORY.md; confirm the next-version stubs.

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
- Remove-old-then-add-new leaves no duplicate commands (smoke S3); both-added reproduces the footgun (smoke S6, documented); recovery from the duplicated state is verified (smoke S7).
- Direct install from `product-on-purpose/pm-skills` still works (smoke S4); installed commit matches the registry `sha` (smoke S5).
- After the public flip, a clean **non-org-authenticated** client installs pm-skills from the public marketplace (smoke S8) before the Release is published.
- The migration guide and release notes carry the **exact `/plugin` command syntax confirmed during smoke** - no "representative" or "confirm later" placeholders remain at publish.
- A failed smoke run has a defined abort path per Phase 4 step 5: the registry is not flipped public, the Release is not published, and the public README/docs repoint is not landed; the already-public tag is deleted and re-pushed at the corrected SHA (safe while the registry is private and no public Release references it).
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
- **Cross-repo coordination:** spans two repos. pm-skills-side work (Phases 1, 3, 4 tag, 5 Release) is authored and committed here. agent-plugins-side work (Phases 2, 4 pin, 5 go-public) is staged here as drafts and hand-applied to the live registry at execution. The registry `sha` can only be finalized after the pm-skills tag exists (Phase 4). The cross-repo handoffs are enumerated below so none is dropped at execution.
- **Relationship to v2.22.0 (naming):** independent and additive; either order works, though shipping the marketplace first keeps the promoted launch's "your skills did not change" message clean.

### Cross-repo execution checklist

Every row is launch-blocking: if a `product-on-purpose/agent-plugins` row cannot be completed (permissions, CI), the launch holds rather than going public half-configured.

| Repo | Work | Owner / permission | Branch / PR | Expected commit(s) | Evidence | Gate |
|---|---|---|---|---|---|---|
| `product-on-purpose/pm-skills` | M2 version bump, M3 CHANGELOG/release notes, tag (tagged commit); **M1 install-block repoint deferred to a separate Phase 5 commit** per the M1 sequencing guard | maintainer (write) | release-prep branch -> `main`; M1 repoint commit post-flip | version-bump + docs commit; annotated tag `v2.21.0`; later M1 repoint commit | green pre-tag bundle + Astro build | Phase 4 (tag); Phase 5 (M1 repoint) |
| `product-on-purpose/agent-plugins` | M4 `marketplace.json` (complete target, real SHA), M5 `validate-registry.yml`, M6 README/hardening | maintainer needs **admin** on agent-plugins (for branch protection + visibility flip), not just write | `launch-prep` PR -> `main` | registry-update commit; CI workflow commit; README update commit | CI run link; branch-protection screenshot; secret-scan output | Phase 2, 5 |
| `product-on-purpose/agent-plugins` | go-public visibility flip | maintainer with **admin** | repo settings (not a commit) | n/a (settings change) | post-flip public S8 evidence | Phase 5 |

- **Permission pre-check (do at Phase 0):** confirm the executor actually holds **admin** on `agent-plugins` (branch protection and the visibility flip both require it). A write-only collaborator can stage `marketplace.json` and CI but cannot complete M6 or the flip - discover that before tag day, not during launch.

---

## Companion documents

| File | Purpose |
|---|---|
| [`migration-guide-draft.md`](migration-guide-draft.md) | User-facing migration content (3 user situations, exact commands), finalized to Approach B |
| [`upgrade-smoke-test-matrix.md`](upgrade-smoke-test-matrix.md) | The 8-scenario install/upgrade smoke runbook (Phase 4 private gate S1-S7 + Phase 5 public gate S8) |
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
