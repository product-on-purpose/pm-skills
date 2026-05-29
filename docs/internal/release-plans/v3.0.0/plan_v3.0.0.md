# v3.0.0 Release Plan - Convergence (the breaking major) [STUB]

**Status:** RESERVED / TRIGGER-GATED. Not scheduled. This is the first genuinely breaking release on the roadmap; it is held until its trigger fires.
**Created:** 2026-05-25, when the v3 line was reframed. The additive marketplace launch became [v2.21.0](../v2.21.0/plan_v2.21.0.md) (minor) and the naming standardization became [v2.22.0](../v2.22.0/plan_v2.22.0.md) (minor; reframed 2026-05-29 to wrapper deletion, short-name rename deferred). `v3.0.0` is reserved for the one release that actually **removes** things.
**Type:** **MAJOR.** Existing users must act for their setup to keep working: the old marketplace path goes away. (Contrast v2.21.0, which removed nothing; v2.22.0 removes only the duplicate command wrappers and keeps the skill names, shipping as a minor. This major is the marketplace-path removal, a change to the governed install contract.)

**Trigger:** plugin #2 (`thinking-framework-skills`) ships, giving old-path users a concrete reason to move. Until then, the prior launches stand and the old marketplace path is not removed.

---

## Theme

Retire the old marketplace path in a single, well-signaled major, at the moment a second plugin makes the new marketplace clearly worth moving to. (This release carries no skill-name alias removal: the deprecation-alias approach was dropped, so no aliases were ever created.) Aimed at the *removal*, not the additive launches that preceded it.

## The breaking removal this carries

1. **Retire the old marketplace path** (`pm-skills-marketplace`, self-hosted `source: ./`). Closes the dual-home opened in v2.21.0. Resolves the deferred end of D-V3-2.
   - End-of-window mechanic to choose at execution: **tombstone** (replace the old path's content with a single "retired - remove this marketplace, add `product-on-purpose`, reinstall" notice) is preferred over a silent **delist**. See [`../v2.21.0/launch-and-notification-playbook.md`](../v2.21.0/launch-and-notification-playbook.md) Part 4.

The skill-name alias removal that earlier drafts bundled here is **no longer applicable**: the deprecation-alias approach was dropped, so no aliases were ever created. v2.22.0 ships wrapper deletion and keeps the skill names; the short-name rename is deferred to [`../_deferred/2026-05-29_skills-short-rename/`](../_deferred/2026-05-29_skills-short-rename/) and, if revived, uses a migration table rather than aliases.

## Why this waits for the plugin #2 trigger

Retiring the old marketplace path is a breaking removal of something kept alive purely for transition (the dual-home). It is low-stakes once there is a concrete reason to move, which a second plugin provides. Holding it until then means users absorb a single, clearly-announced migration at the plugin #2 moment, and the version signal (3.0.0) carries real breaking weight instead of crying wolf.

## Preconditions before scheduling

- v2.21.0 (marketplace launch) SHIPPED and adopted; the dual-home transition has run long enough.
- v2.22.0 SHIPPED. (No alias window to wait out; no aliases were created.)
- plugin #2 is real (or adoption data justifies convergence on its own).

## Provisional scope (flesh out when triggered)

- Retire the old marketplace (tombstone), announced one release ahead per the notification playbook's heavy comms stack.
- Sweep any remaining references to the old marketplace path; correct docs. (No name-alias removal: no aliases were ever created.)
- Version bump to 3.0.0; CHANGELOG under "Removed" / "Changed (breaking)"; release notes lead with the marketplace retirement and the exact migration steps.
- Full pre-tag validator bundle + Astro build green; smoke-test the post-removal install paths.

## References
- [`../v2.21.0/plan_v2.21.0.md`](../v2.21.0/plan_v2.21.0.md) - the additive marketplace launch (D-V3-1, D-V3-2 deferred here).
- [`../v2.22.0/plan_v2.22.0.md`](../v2.22.0/plan_v2.22.0.md) - the command/skill de-duplication (wrapper deletion; skill names kept; no alias removal deferred, no aliases exist).
- [`../v2.21.0/launch-and-notification-playbook.md`](../v2.21.0/launch-and-notification-playbook.md) - retirement comms + best practices.
