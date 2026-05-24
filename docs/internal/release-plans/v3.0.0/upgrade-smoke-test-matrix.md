# v3.0.0 Install + Upgrade Smoke-Test Matrix

> **Purpose.** The executable verification gate for the marketplace launch (audit finding P2-06). Run from a clean Claude Code state before announcing the launch. Companion to [`plan_v3.0.0.md`](plan_v3.0.0.md) (the Phase 4 gate) and [`launch-and-notification-playbook.md`](launch-and-notification-playbook.md). **Last updated 2026-05-23.**

---

## How to run

- Use a **clean Claude Code profile** (no pm-skills marketplaces added) so results are not polluted by existing state. For scenarios that start from an existing install, set that up first as the precondition.
- The registry may stay **private during testing** if you are authenticated to the org; flip it public only after S1-S5 pass (decision D-V3-3).
- Record **PASS / FAIL + notes** per scenario; archive the results as release evidence.
- **Command spellings:** the steps below use representative `/plugin` forms; confirm the exact current Claude Code syntax at run time (some `/plugin update` behavior is undocumented).

## The matrix

| ID | Scenario | Expected | Pass criteria |
|---|---|---|---|
| S1 | Fresh install from the new marketplace | pm-skills installs at the pinned version | installed version == registry pin; commands resolve |
| S2 | Existing old-path install keeps working | dual-home: old path still updates | updates cleanly, no errors |
| S3 | Remove old, then add new (the migration path) | clean switch, no duplicates | exactly one set of pm-skills commands, from `@product-on-purpose` |
| S4 | Direct repo install (one-plugin fallback) | still works | pm-skills installs from the direct repo path |
| S5 | Pinned `sha` integrity | installed commit matches the pin | commit == registry `sha` exactly |
| S6 | NEGATIVE: both marketplaces added | duplication / conflict (documented footgun) | reproduces the duplication; captured for the guide |

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
- **Purpose:** confirm and document exactly what a careless user sees, so the migration guide's "remove first" warning is concrete. Clean up afterward.

## Exit criteria

- **S1-S5 PASS**; **S6 reproduces** the duplication as documented (feeds the migration guide).
- Results archived. Only then flip the registry public and announce (D-V3-3).
