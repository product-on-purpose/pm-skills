# v3.0.0 Release Plan - Marketplace Migration

**Status:** PLANNED - design approved 2026-05-23; all 5 decision briefs drafted with recommendations (maintainer slots open); ready to lock and execute once the maintainer confirms the briefs.
**Created:** 2026-05-23 (after v2.19.0 ship; supersedes the `marketplace-repo-skeleton/` draft).
**Predecessor:** [v2.19.0](../v2.19.0/plan_v2.19.0.md) SHIPPED 2026-05-23 (tag `a18e4d5`; 63 skills; pre-promotion hardening complete).
**Type:** MAJOR (2.19.0 -> 3.0.0). No skill behavior changes; the **install/distribution contract changes** for users. See D-V3-5 for the major-bump rationale.

**Theme:** Move pm-skills from its self-hosted `pm-skills-marketplace` onto the multi-plugin `product-on-purpose` marketplace hosted at `product-on-purpose/agent-plugins`, without stranding existing users. This is a distribution change, not a behavior change: the catalog stays at 63 skills.

**Provenance:** Work items are sourced from (a) the 2026-05-21 Codex v3-prep audit (P1-04 naming, P1-05 production-safe registry, P2-06 upgrade tests, and its Phase D work plan + v3 acceptance criteria), (b) the Claude review of that audit (naming resolution, dual-home transition, skeleton supersession), and (c) a direct inspection of the live `agent-plugins` and `thinking-framework-skills` repos on 2026-05-23. See [`docs/internal/audit/2026-05-21_codex-v3prep.md`](../../audit/2026-05-21_codex-v3prep.md) and [`..._reviewed-by-claude.md`](../../audit/2026-05-21_codex-v3prep_reviewed-by-claude.md).

---

## Why this release exists now

The next release is the repo's first actively promoted one. v2.19.0 did the pre-promotion hardening (validators, CI hygiene, community-health files, link/path/newcomer polish) so this release can focus on its single headline: the marketplace move. The move matters because the long-term direction is multiple independent plugins under one marketplace ( `pm-skills`, later `thinking-framework-skills`, and others), and a single self-hosted plugin repo cannot host that. The architecture decision is already made and already partly built: the `product-on-purpose/agent-plugins` registry repo exists and encodes the locked naming. What remains is the migration itself, done safely.

The defining constraint: **Claude Code keys installed plugins by marketplace identity.** Existing users installed `pm-skills@pm-skills-marketplace`. The new recommended identity is `pm-skills@product-on-purpose`. Those are different identities, so installs do **not** auto-migrate. A naive cutover (repoint the docs, retire the old marketplace) would break `/plugin update pm-skills` for every existing user. The whole release is organized around not doing that.

---

## Current state -> target state

| Aspect | Today (v2.19.0) | v3.0.0 target |
|---|---|---|
| Marketplace host repo | `product-on-purpose/pm-skills` (self-hosted) | `product-on-purpose/agent-plugins` (separate thin registry) |
| Marketplace identity (`name`) | `pm-skills-marketplace` | `product-on-purpose` |
| Install step 1 (add) | `/plugin marketplace add product-on-purpose/pm-skills` | `/plugin marketplace add product-on-purpose/agent-plugins` |
| Install step 2 (install) | `/plugin install pm-skills@pm-skills-marketplace` | `/plugin install pm-skills@product-on-purpose` |
| pm-skills `source` in registry | `./` (same repo) | `{ github, repo: product-on-purpose/pm-skills, sha: <v3.0.0 tag> }` (pinned, cross-repo) |
| Evergreen paths (unchanged) | `npx skills add product-on-purpose/pm-skills`; `git clone` | identical (these do not touch the marketplace) |

**Live registry state as inspected 2026-05-23** (`product-on-purpose/agent-plugins`, private): `marketplace.json` already has `name: product-on-purpose`, one `pm-skills` entry pinned to `sha b6ff373` (v2.17.0) at `version 2.17.0`, `strict: true`, `metadata.version 0.1.0`. README already carries the correct three-name explanation, a "Preview" banner, and a "Migration during transition" section. The repo has `.claude-plugin/marketplace.json`, `README.md`, `CONTRIBUTING.md`, `LICENSE`, `.gitignore`. It has **no CI workflows**. So the registry is well-formed and pinned, but the pin is **two releases stale** (v2.17.0, not v3.0.0), the repo is **private**, and it has **no validation gate**. Those three gaps are this release's registry-side work.

---

## Scope

### In scope

- **Install-identity cutover** (Phase 1): repoint README + docs-site install instructions to the new marketplace, framed as dual-home (new path primary, old path "during transition"); version bump to 3.0.0; CHANGELOG; release notes.
- **Registry finalization** (Phase 2, staged): the agent-plugins `marketplace.json` target (sha + version + `metadata.version`); a registry validation CI spec; the go-public preparation.
- **Migration safety** (Phase 3): the migration guide; the dual-home transition mechanics and deprecation window; the migration messaging.
- **Verification** (Phase 4): the 5-scenario install/upgrade smoke matrix run from clean state.
- **Launch + hygiene** (Phase 5): tag, pin, flip the registry public, publish the Release, announce, G4 hygiene.

### Out of scope (deferred, with destination)

- **Second plugin launch** (`thinking-framework-skills`): the repo is an empty stub (only `.gitignore` + `README.md`); building and listing it is its own future release. Roadmap, post-v3.0.0.
- **New content skills**: roadmap (carried in the v2.20.0 stub and beyond).
- **pm-skills-mcp catalog/description drift** ("40 skills" vs 63): the session log tags this "v3/promotion-prep," but the MCP server is a separate repo in maintenance mode (M-22). Tracked as a roadmap item below; not gated into the pm-skills v3 tag.
- **Marketplace governance beyond pm-skills** (multi-plugin contribution policy, plugin-repo contract evolution): the `CONTRIBUTING.md` / plugin-repo checklist already live in the agent-plugins repo; refine there, not here.

---

## Phases

Execution order respects the migration's load-bearing dependency: the registry pins a commit SHA that does not exist until the pm-skills v3.0.0 tag, and the registry repo should not go public until it points at that real tag. So the spine is **prep -> tag -> pin -> smoke (private) -> public -> announce**.

### Phase 0 - Entrance gate

**Satisfied as of 2026-05-23.** v2.19.0 (pre-promotion hardening) is SHIPPED at `a18e4d5`: 18-validator pre-tag bundle, community-health files present, link/path/newcomer/404 hygiene done, `.gitattributes` in place. The live agent-plugins registry has been inspected (above). No further entrance work; this release may be sequenced immediately after v2.19.0 or after a v2.20.0 content release at the maintainer's choice (see Dependencies).

### Phase 1 - pm-skills-side cutover prep

| Item | Goal | Decision | Effort |
|---|---|---|---|
| M1 | Repoint install instructions to dual-home | D-V3-1 | Medium |
| M2 | Version bump to 3.0.0 across all surfaces | - | Small |
| M3 | CHANGELOG + Release notes framed as a distribution change | D-V3-5 | Small-Med |

**M1 - Repoint install instructions (dual-home).**
- Goal: README and docs-site install blocks currently show only the old path (`marketplace add product-on-purpose/pm-skills` + `install pm-skills@pm-skills-marketplace`, at README lines ~120-121 and ~392-393). v3 makes the new path primary while keeping the old path documented for the transition window.
- Approach: present the new path (`marketplace add product-on-purpose/agent-plugins` + `install pm-skills@product-on-purpose`) as the recommended install; add a short, clearly-labeled "Already installed the old way?" pointer to the migration guide. Leave the evergreen `npx skills add` and `git clone` paths untouched (they do not use the marketplace). Resolve the fate of pm-skills's own self-hosted `marketplace.json` per D-V3-1.
- Acceptance: README + docs-site install blocks lead with the new path; the old path is present but labeled transitional; evergreen paths unchanged; the enforcing link/anchor checks (FU-3, now covering README) stay green.

**M2 - Version bump to 3.0.0.**
- Goal: every current-version surface reads 3.0.0.
- Approach: bump `plugin.json`, the self-hosted `.claude-plugin/marketplace.json` plugin entry, README version badge + At-a-Glance row, both `_agent-context/*/CONTEXT.md` currency tokens. The bundle now enforces `validate-version-consistency` (folded in at v2.19.0), so all four enforced surfaces must agree.
- Acceptance: `validate-version-consistency` PASS at 3.0.0; `check-context-currency` PASS; bundle green.

**M3 - CHANGELOG + Release notes.**
- Goal: explain that v3.0.0 is a distribution change, not a behavior change, so a 2.x -> 3.0 jump with zero new skills reads coherently.
- Approach: CHANGELOG `[3.0.0]` entry under a "Changed" heading (install path / marketplace identity), not "Added"; `docs/releases/Release_v3.0.0.md` leads with the migration and links the migration guide; reinforce the D-V3-5 rationale ("the install contract changed; your skills did not").
- Acceptance: release notes and CHANGELOG name the migration as the headline; no new-skill claims; public-paths-only (per repo rule).

### Phase 2 - Registry finalization (staged)

| Item | Goal | Decision | Effort |
|---|---|---|---|
| M4 | Stage the agent-plugins `marketplace.json` target | - | Small |
| M5 | Registry validation CI spec | D-V3-4 | Medium |
| M6 | Go-public preparation | D-V3-3 | Small |

**M4 - Stage the registry target.** (Applied to agent-plugins at execution; staged here per the chosen authoring boundary.)
- Goal: define exactly what the live `marketplace.json` should become at launch.
- Approach: the diff is small - bump the `pm-skills` entry `sha` to the v3.0.0 tag commit, `version` to `3.0.0`, and the registry's own `metadata.version` to its launch version (e.g., `1.0.0`). Keep `strict: true` only if the install smoke test passes (M5/Phase 4). Captured inline:

```jsonc
// product-on-purpose/agent-plugins .claude-plugin/marketplace.json (target at launch)
{
  "name": "product-on-purpose",
  "metadata": { "version": "1.0.0" },           // was 0.1.0
  "plugins": [
    {
      "name": "pm-skills",
      "source": { "source": "github", "repo": "product-on-purpose/pm-skills", "sha": "<v3.0.0 tag SHA>" }, // was b6ff373 (v2.17.0)
      "version": "3.0.0",                         // was 2.17.0
      "strict": true                              // hold true only after install smoke passes
    }
  ]
}
```
- Acceptance: the staged target is unambiguous; the SHA slot is explicitly marked "fill at Phase 4 after the tag exists."

**M5 - Registry validation CI spec.** (Spec only; the workflow lives in agent-plugins. Policy: D-V3-4.) See [`registry-ci-spec.md`](registry-ci-spec.md).
- Goal: the registry currently has no validation. The audit recommends CI that fails if an entry lacks a `sha`, points at no tag, or is `strict: true` without a passing install smoke test.
- Approach: specify a workflow that validates JSON-schema validity, required fields, that each `sha` exists and sits on a released tag, and an installability smoke check. Mirror the pm-skills validator philosophy (deterministic, enforcing). The spec is authored here; applying it to agent-plugins is execution-time.
- Acceptance: the spec is complete enough to implement directly in agent-plugins; enforcement level set per D-V3-4.

**M6 - Go-public preparation.** (Timing: D-V3-3.)
- Goal: the registry repo is private; `/plugin marketplace add` cannot reach a private repo without auth, so it must be public at launch.
- Approach: prepare the public-readiness checklist (README "Preview" banner removed or updated, LICENSE present - confirmed, no secrets, CI green) so the flip is a single deliberate step at Phase 5.
- Acceptance: a go-public checklist exists; the flip itself is gated to Phase 5 per D-V3-3.

### Phase 3 - Migration safety

| Item | Goal | Decision | Effort |
|---|---|---|---|
| M7 | Migration guide | D-V3-1 | Medium |
| M8 | Dual-home mechanics + deprecation window | D-V3-2 | Small-Med |

**M7 - Migration guide.** See [`migration-guide-draft.md`](migration-guide-draft.md).
- Goal: a single source of migration truth that feeds both `Release_v3.0.0.md` and the agent-plugins README "Migration during transition" section.
- Approach: cover the three user situations explicitly - (1) new user (use the new path), (2) existing `pm-skills@pm-skills-marketplace` user (how to move to the new identity, or keep working during the window), (3) `npx skills add` / `git clone` user (unaffected). Frame everything as a distribution change. State the deprecation timeline (D-V3-2).
- Acceptance: every user situation has exact commands and an expected result; the guide is consistent with the smoke matrix (Phase 4).

**M8 - Dual-home mechanics + deprecation window.** (Window + end-state: D-V3-2.)
- Goal: existing users are not stranded; the old identity keeps working for a bounded, communicated window.
- Approach: keep the pm-skills self-hosted `marketplace.json` (identity `pm-skills-marketplace`) alive and version-bumped during the window (per D-V3-1); both homes serve the same plugin; the deprecation window length and removal trigger are set in D-V3-2 and announced in the migration guide.
- Acceptance: both install homes resolve to a working v3.0.0 install during the window; the window and its end-state are documented and announced.

### Phase 4 - Tag, pin, verify

1. Run the full 18-validator pre-tag bundle + Astro build on the release-prep HEAD; CI green.
2. Tag pm-skills `v3.0.0` at the CI-verified SHA (D22 invariant: tag only the SHA whose full CI is green).
3. Fill the staged registry `sha` (M4) with the v3.0.0 tag commit; apply to the agent-plugins registry (still private).
4. Run the 5-scenario upgrade smoke matrix (authed, while private) per [`upgrade-smoke-test-matrix.md`](upgrade-smoke-test-matrix.md). All scenarios pass before launch.

### Phase 5 - Launch + hygiene

1. Flip the agent-plugins repo public (D-V3-3).
2. Publish the pm-skills `v3.0.0` GitHub Release as Latest with the `Release_v3.0.0.md` body; verify no orphan draft.
3. Announce the migration (link the migration guide) on the channels the README points at (Discussions, etc.).
4. G4 post-tag hygiene: flip this plan + both CONTEXT.md to SHIPPED; create the next-version stub; refresh MEMORY.md (latest-tagged -> v3.0.0; dual-home window + removal trigger recorded).

---

## Decisions (Decision Briefs)

Each decision uses the 6-part brief (what / why / outcomes if unresolved / alternatives / recommendation / maintainer slot). Options are labeled A/B/C.

### D-V3-1 - Fate of pm-skills's own self-hosted `.claude-plugin/marketplace.json`

- **What:** whether the pm-skills repo keeps, repoints, or removes its self-hosted marketplace (identity `pm-skills-marketplace`, source `./`) at v3.0.0.
- **Why:** this file is what existing `pm-skills@pm-skills-marketplace` users update against, and it is also the "install direct from the repo as a one-plugin marketplace" fallback the audit and skeleton both call out. Removing it strands existing users; keeping it forever defeats the consolidation.
- **Outcomes if unresolved:** either the cutover strands existing installs, or the repo carries two competing marketplace identities indefinitely with no retirement plan.
- **Alternatives:**
  - A) **Keep** the self-hosted marketplace during the deprecation window, version-bumped to 3.0.0; retire it after the window (D-V3-2).
  - B) **Remove** it at v3.0.0; existing users must re-add the new marketplace to keep updating.
  - C) **Repoint** it (change its `name` to `product-on-purpose`) so the identities converge in one repo.
- **Recommendation:** A. It is the dual-home transition the Claude review specified: existing users keep working, new users get the consolidated identity, and the file retires on a stated schedule. B breaks existing installs on day one. C cannot work cleanly: a self-hosted `source: ./` cannot masquerade as the cross-repo `product-on-purpose` identity without colliding with the real registry.
- **Maintainer decision:** _open_

### D-V3-2 - Dual-home deprecation window length + end-state

- **What:** how long the old `pm-skills-marketplace` home stays alive, and what triggers its removal.
- **Why:** "during the transition" is meaningless without a concrete end; an unbounded window is just two permanent homes.
- **Outcomes if unresolved:** the transition never ends, or it ends abruptly without warning and breaks late movers.
- **Alternatives:**
  - A) **Time-boxed:** keep the old home for ~90 days, then remove in a follow-up patch with a final notice.
  - B) **Release-boxed:** keep it for the next 2 minor releases, then remove.
  - C) **Signal-boxed:** keep it until telemetry/issue volume shows old-path installs have dropped below a threshold, then remove.
- **Recommendation:** B (release-boxed), with the removal itself announced one release ahead. Releases are the unit this project actually controls and communicates through; calendar windows drift and signal data is not instrumented. Pair with a one-line notice in each interim release's notes.
- **Maintainer decision:** _open_

### D-V3-3 - agent-plugins go-public timing

- **What:** when the private registry repo becomes public.
- **Why:** it must be public for unauthenticated `marketplace add`, but going public early exposes a registry that may still point at a stale or release-candidate SHA.
- **Outcomes if unresolved:** either the launch blocks on a private repo, or users discover a half-finished registry.
- **Alternatives:**
  - A) **At launch:** stay private through Phase 4, run smoke tests authed, flip public in Phase 5 only after the registry pins the real v3.0.0 tag.
  - B) **Early:** make it public now so anyone can test the new path immediately.
  - C) **Public + pre-release-pinned:** public early but pinned to the current v2.x tag until v3 launches.
- **Recommendation:** A. It keeps the public-facing registry correct from the first moment it is reachable, and the smoke matrix can run authed while private. C invites users onto a path that will change under them; B is C without even a correct pin.
- **Maintainer decision:** _open_

### D-V3-4 - Registry validation CI enforcement level

- **What:** whether the agent-plugins registry CI blocks a listing on failure, or only warns.
- **Why:** the registry is the distribution boundary; an unpinned or uninstallable entry is a user-facing break, not a style nit.
- **Outcomes if unresolved:** the registry can ship an entry with a missing/invalid `sha` or a `strict: true` plugin that does not actually install.
- **Alternatives:**
  - A) **Enforcing:** CI fails the registry repo if any entry lacks a `sha`, the `sha` is not on a released tag, required fields are missing, or the install smoke fails.
  - B) **Advisory:** run the checks but do not block; rely on maintainer discipline.
  - C) **Tiered:** enforce schema + `sha` presence; keep the installability smoke advisory (it needs network + a runner).
- **Recommendation:** A, falling back to C only if the installability smoke proves too flaky to gate on. The pm-skills repo already treats its distribution checks (`validate-plugin-install`) as enforcing; the registry deserves the same bar. Detailed in [`registry-ci-spec.md`](registry-ci-spec.md).
- **Maintainer decision:** _open_

### D-V3-5 - Major-bump rationale (why 3.0.0 with no new skills)

- **What:** how to justify and frame a major version bump for a release that changes no skill behavior.
- **Why:** a 2.x -> 3.0 jump that adds zero skills will confuse users unless the contract change is named explicitly.
- **Outcomes if unresolved:** users read 3.0.0 as a big feature release and are disappointed, or read it as arbitrary and lose trust in the versioning.
- **Alternatives:**
  - A) **Major (3.0.0):** the install/distribution contract changes (users must re-add a new marketplace and reinstall under a new identity); that is a breaking change to the consumer contract even though skill behavior is unchanged.
  - B) **Minor (2.20.0):** treat the marketplace move as additive since the old path still works during the window.
  - C) **Major, but defer until paired with new content** so 3.0.0 also carries a feature headline.
- **Recommendation:** A. SemVer "breaking" is about the consumer contract, and the install path is part of that contract; the dual-home window softens the break but does not erase it (the old path is deprecated). Release notes lead with "the install contract changed; your skills did not." C couples an install migration to unrelated content and delays a change existing users should get cleanly; B understates a deprecation.
- **Maintainer decision:** _open_

---

## Release-level acceptance criteria

Adapted from the audit's recommended v3 acceptance criteria, made concrete:

- The `product-on-purpose/agent-plugins` registry exists, is public, and contains only registry + docs files (no plugin code).
- `pm-skills` remains independently installable from its own repo (the direct / one-plugin fallback still works).
- The registry `pm-skills` entry is pinned to the v3.0.0 tag SHA, at `version 3.0.0`.
- Fresh install from the new marketplace installs pm-skills at v3.0.0 (smoke scenario 1).
- An existing `pm-skills@pm-skills-marketplace` install has a documented, working migration path (smoke scenario 2).
- Remove-old-then-add-new leaves no duplicate commands or stale cache (smoke scenario 3).
- Direct install from `product-on-purpose/pm-skills` still works (smoke scenario 4).
- The installed commit matches the registry `sha` (smoke scenario 5).
- No placeholder plugin appears in the production registry JSON (already true; hold it true).
- Registry CI validates schema, required fields, pinned-SHA-on-a-tag, and installability per D-V3-4.
- The pm-skills release notes explain the change as a distribution change, not a skill-behavior change.
- The full 18-validator pre-tag bundle + Astro build are green on the tagged SHA; GitHub Release is Latest; no orphan draft.

---

## Dependencies and sequencing

- **Hard dependency (met):** v2.19.0 pre-promotion hardening, SHIPPED 2026-05-23 (`a18e4d5`).
- **Relationship to v2.20.0:** v3.0.0 is independent of the v2.20.0 content/residuals backlog. The maintainer may ship v3.0.0 as the next release, or ship a v2.20.0 content release first and v3.0.0 after. The only thing v3 needed (hardening) is already done. Recommendation: do not block v3 on v2.20.0 - the migration is the higher-leverage, time-sensitive change because every release widens the population on the soon-to-be-deprecated install path.
- **Cross-repo coordination:** this release spans two repos. pm-skills-side work (Phases 1, 3, 4 tag, 5 Release) is authored and committed here. agent-plugins-side work (Phases 2, 4 pin, 5 go-public) is **staged here as drafts** per the chosen authoring boundary and hand-applied to the live registry at execution. The registry `sha` can only be finalized after the pm-skills tag exists (Phase 4).

---

## Companion documents

| File | Purpose | Destination at execution |
|---|---|---|
| [`migration-guide-draft.md`](migration-guide-draft.md) | User-facing migration content (3 user situations, exact commands, timeline) | `Release_v3.0.0.md` + agent-plugins README migration section |
| [`upgrade-smoke-test-matrix.md`](upgrade-smoke-test-matrix.md) | The 5-scenario install/upgrade smoke runbook (the Phase 4 gate) | Run at Phase 4; archived as release evidence |
| [`registry-ci-spec.md`](registry-ci-spec.md) | Spec for the agent-plugins registry validation workflow | A workflow in the agent-plugins repo |
| [`launch-and-notification-playbook.md`](launch-and-notification-playbook.md) | Launch-approach options (additive vs converge) + full user-notification channel inventory + best practices | Internal options reference; feeds the approach decision |
| [`decision-worksheet.md`](decision-worksheet.md) | Plain-language decision tracker (the 5 briefs + sequencing) and verified Claude Code facts | Internal decision tracker |
| [`marketplace-repo-skeleton/`](marketplace-repo-skeleton/) | SUPERSEDED draft (kept for provenance); the live agent-plugins repo is authoritative | - |

---

## Deferred / roadmap

- **Second plugin (`thinking-framework-skills`):** empty stub today; its own future release (author skills + commands + `plugin.json` + CI, then add a registry entry). The marketplace move in v3.0.0 is the prerequisite that makes it possible.
- **pm-skills-mcp description drift** ("40 skills" vs 63): separate maintenance-mode repo; align during promotion-prep on the MCP cadence, not gated into the pm-skills v3 tag.
- **Registry governance:** multi-plugin contribution policy and plugin-repo contract evolution live in the agent-plugins `CONTRIBUTING.md`; refine there as more plugins list.

---

## Notes

- This is a distribution release: per the repo convention against per-item effort docs on non-feature cycles, work items live as rows/subsections here, and only genuinely distinct deliverables (migration guide, smoke matrix, registry CI spec) get companion files.
- The `marketplace-repo-skeleton/` draft is superseded by the live `agent-plugins` repo and this plan. Its three files carry a SUPERSEDED banner and are retained for provenance, not deleted.

## Review history

- **Design approved 2026-05-23** (maintainer): scope = migration only; authoring boundary = stage all artifacts in `v3.0.0/`, do not mutate the live private registry this pass.
- **Live-repo inspection 2026-05-23:** confirmed the agent-plugins registry already encodes the locked naming and a (stale) pin, is private, and has no CI; confirmed `thinking-framework-skills` is an empty stub. These facts supersede the `marketplace-repo-skeleton/` draft and the audit's pre-resolution P1-04/P1-05 framing.
- **Pending:** lock D-V3-1..D-V3-5; then a Codex adversarial pass on this plan before execution (per the Phase 0 adversarial-review loop).
