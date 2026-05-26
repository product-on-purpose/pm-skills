# v2.21.0 Install + Upgrade Smoke-Test Matrix

> **Purpose.** The executable verification gate for the marketplace launch (audit finding P2-06). Run from a clean Claude Code state before announcing the launch. Companion to [`plan_v2.21.0.md`](plan_v2.21.0.md) (the Phase 4 gate) and [`launch-and-notification-playbook.md`](launch-and-notification-playbook.md). **Last updated 2026-05-25** (renumbered from v3.0.0; the tag the registry pins is now the v2.21.0 tag).

---

## How to run

- Use a **clean Claude Code profile** (no pm-skills marketplaces added) so results are not polluted by existing state. For scenarios that start from an existing install, set that up first as the precondition.
- **Test the real launch config:** stage the registry with `strict: true` already set (the launch value) before running S1-S7, so smoke exercises the configuration users will actually get, not an interim one.
- **Two phases:** S1-S7 run while the registry is **private** (authenticated to the org). **S8 runs only after the public flip**, from a client that is *not* org-authenticated - it is the gate that proves a normal public user can install (D-V3-3). Do not treat private S1-S7 as proof of public installability.
- Record **PASS / FAIL + notes** per scenario; archive the results as release evidence.
- **Command spellings:** the steps below use representative `/plugin` forms. Confirm the exact current Claude Code syntax at run time (some `/plugin update`/`uninstall` behavior is undocumented), and **write the confirmed syntax back into the migration guide and release notes before publishing** - the duplicate-avoidance ordering depends on exact spellings, so unconfirmed commands must not ship.

## The matrix

| ID  | Scenario                                          | Expected                                    | Pass criteria                                                                          |
| --- | ------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------- |
| S1  | Fresh install from the new marketplace            | pm-skills installs at the pinned version    | installed version == registry pin; commands resolve                                    |
| S2  | Existing old-path install keeps working           | dual-home: old path still updates           | updates cleanly, no errors                                                             |
| S3  | Remove old, then add new (the migration path)     | clean switch, no duplicates                 | exactly one set of pm-skills commands, from `@product-on-purpose`                      |
| S4  | Direct repo install (one-plugin fallback)         | still works                                 | pm-skills installs from the direct repo path                                           |
| S5  | Pinned `sha` integrity                            | installed commit matches the pin            | commit == registry `sha` exactly                                                       |
| S6  | NEGATIVE: both marketplaces added                 | duplication / conflict (documented footgun) | reproduces the duplication; captured for the guide                                     |
| S7  | RECOVERY: clean up from the duplicated state      | back to exactly one install                 | from S6's duplicated state, the documented recovery yields exactly one set of commands |
| S8  | PUBLIC (post-flip): unauthenticated user installs | new-path install works for the public       | from a non-org-authed client, add + install succeeds; commands resolve                 |

### S1 - Fresh install from the new marketplace

- **Pre:** clean state.
- **Steps:** `/plugin marketplace add product-on-purpose/agent-plugins` then `/plugin install pm-skills@product-on-purpose`.
- **Expected:** pm-skills installs at the pinned version; spot-check that slash commands resolve (`/prd`, `/hypothesis`) and skills load.
- **Pass:** installed version equals the registry pin; commands present.

### S2 - Existing old-path install keeps working

- **Pre:** pm-skills installed via `pm-skills@pm-skills-marketplace` (the old self-hosted path).
- **Steps:** `/plugin marketplace update` then `/plugin update pm-skills`.
- **Expected:** still works; receives the latest from the old path (dual-home). No breakage from the new marketplace existing.
- **Pass:** old-path install updates cleanly; no errors.

### S3 - Remove old, then add new (the migration path)

- **Pre:** pm-skills installed via the old path.
- **Steps (in order):** `/plugin uninstall pm-skills` -> `/plugin marketplace remove pm-skills-marketplace` -> `/plugin marketplace add product-on-purpose/agent-plugins` -> `/plugin install pm-skills@product-on-purpose`.
- **Expected:** clean switch to the new identity; **no duplicate** commands/skills.
- **Pass:** exactly one set of pm-skills commands, installed from `@product-on-purpose`.

### S4 - Direct repo install (one-plugin fallback)

- **Pre:** clean state.
- **Steps:** install pm-skills directly from `product-on-purpose/pm-skills` (the repo's own self-hosted marketplace).
- **Expected:** still works; pm-skills remains independently installable from its own repo.
- **Pass:** pm-skills installs via the direct path.

### S5 - Pinned `sha` integrity

- **Pre:** completed S1.
- **Steps:** inspect the installed plugin's commit.
- **Expected:** the installed commit equals the `sha` in the registry entry.
- **Pass:** exact match.

### S6 - NEGATIVE: both marketplaces added (the duplicate hazard)

- **Pre:** pm-skills installed via the old path.
- **Steps:** WITHOUT removing the old, also `/plugin marketplace add product-on-purpose/agent-plugins` and `/plugin install pm-skills@product-on-purpose`.
- **Expected:** **duplicate / conflicting** pm-skills commands (the documented footgun).
- **Purpose:** confirm and document exactly what a careless user sees, so the migration guide's "remove first" warning is concrete. Recovery is S7 (do not just "clean up" ad hoc - prove the documented path works).

### S7 - RECOVERY: clean up from the duplicated state

- **Pre:** the duplicated state produced by S6 (both marketplaces added, pm-skills installed from each).
- **Steps:** follow the migration guide's recovery path and record the **exact** commands. The likely path: `/plugin uninstall pm-skills` (note whether this is ambiguous when two installs share the name - if so, capture the marketplace-qualified form, e.g. `pm-skills@pm-skills-marketplace`, or the manual cleanup under `~/.claude/plugins/`), then `/plugin marketplace remove pm-skills-marketplace`, leaving the single `@product-on-purpose` install.
- **Expected:** exactly one set of pm-skills commands remains, from `@product-on-purpose`; no duplicates.
- **Pass:** single clean install; the recovery commands are confirmed and written back into the migration guide's "Need help?" section. If `/plugin uninstall pm-skills` proves ambiguous, the disambiguation is documented.

### S8 - PUBLIC (post-flip): unauthenticated user installs

- **Pre:** the registry is **public** (the Phase 5 flip has happened); use a client that is **not** authenticated to the `product-on-purpose` org (logged out, or a different account with no access).
- **Steps:** `/plugin marketplace add product-on-purpose/agent-plugins` then `/plugin install pm-skills@product-on-purpose`.
- **Expected:** the add and install both succeed for a user with no special access; commands resolve.
- **Pass:** public install works end to end. This is the gate before publishing the Release and announcing - private S1-S7 do not prove it.

## Exit criteria

- **Private gate (Phase 4):** S1-S5 PASS; S6 reproduces the duplication as documented; S7 proves recovery to a single clean install. Confirmed `/plugin` syntax written back into the migration guide + release notes. Results archived. Only then proceed to the public flip (D-V3-3).
- **Public gate (Phase 5):** after the flip, **S8 PASSES** from a non-org-authenticated client before the Release is published or the launch announced. If S8 fails, **immediately flip the `agent-plugins` repo back to private** so no public user hits the broken listing, then hold and diagnose; re-flip public and re-run S8 only once the cause is fixed. Do not publish the Release or announce until S8 passes. (Nothing dangles: the Release and README repoint are later steps, per `plan_v2.21.0.md` Phase 5.)