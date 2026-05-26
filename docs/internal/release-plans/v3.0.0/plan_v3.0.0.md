# v3.0.0 Release Plan - Convergence (the breaking major) [STUB]

**Status:** RESERVED / TRIGGER-GATED. Not scheduled. This is the first genuinely breaking release on the roadmap; it is held until its trigger fires.
**Created:** 2026-05-25, when the v3 line was reframed. The additive marketplace launch became [v2.21.0](../v2.21.0/plan_v2.21.0.md) (minor) and the additive naming standardization became [v2.22.0](../v2.22.0/plan_v2.22.0.md) (minor). `v3.0.0` is reserved for the one release that actually **removes** things.
**Type:** **MAJOR.** Existing users must act for their setup to keep working. That is the test that makes this a major (contrast v2.21.0 / v2.22.0, which removed nothing).

**Trigger:** plugin #2 (`thinking-framework-skills`) ships, giving old-path users a concrete reason to move. Until then, the additive launches stand and nothing is removed.

---

## Theme

Pull the two deferred breaking removals in a single, well-signaled major, at the moment a second plugin makes the new marketplace clearly worth moving to. This is the "band-aid pulled once," aimed at the *removals*, not the additive launches that preceded them.

## The two breaking removals this bundles

1. **Retire the old marketplace path** (`pm-skills-marketplace`, self-hosted `source: ./`). Closes the dual-home opened in v2.21.0. Resolves the deferred end of D-V3-2.
   - End-of-window mechanic to choose at execution: **tombstone** (replace the old path's content with a single "retired - remove this marketplace, add `product-on-purpose`, reinstall" notice) is preferred over a silent **delist**. See [`../v2.21.0/launch-and-notification-playbook.md`](../v2.21.0/launch-and-notification-playbook.md) Part 4.
2. **Remove the deprecated skill-name aliases** introduced in v2.22.0 (the old phase-prefixed names that were kept resolving as deprecated aliases). Resolves the deferred D-V31-4 alias removal. After this, only the short canonical skill names exist.

## Why these two belong together

Both are breaking removals of things kept alive purely for transition. Both are low-stakes individually once their deprecation window has run. Bundling them means users absorb a single, clearly-announced migration at the plugin #2 moment rather than two separate disruptions, and the version signal (3.0.0) carries real breaking weight instead of crying wolf.

## Preconditions before scheduling

- v2.21.0 (marketplace launch) SHIPPED and adopted; the dual-home transition has run long enough.
- v2.22.0 (naming) SHIPPED; the deprecation alias window has run for at least one release.
- plugin #2 is real (or adoption data justifies convergence on its own).

## Provisional scope (flesh out when triggered)

- Retire the old marketplace (tombstone), announced one release ahead per the notification playbook's heavy comms stack.
- Remove the name aliases; sweep any remaining references; correct docs.
- Version bump to 3.0.0; CHANGELOG under "Removed" / "Changed (breaking)"; release notes lead with the two removals and the exact migration steps.
- Full pre-tag validator bundle + Astro build green; smoke-test the post-removal install paths.

## References
- [`../v2.21.0/plan_v2.21.0.md`](../v2.21.0/plan_v2.21.0.md) - the additive marketplace launch (D-V3-1, D-V3-2 deferred here).
- [`../v2.22.0/plan_v2.22.0.md`](../v2.22.0/plan_v2.22.0.md) - the additive naming standardization (D-V31-4 alias removal deferred here).
- [`../v2.21.0/launch-and-notification-playbook.md`](../v2.21.0/launch-and-notification-playbook.md) - retirement comms + best practices.
