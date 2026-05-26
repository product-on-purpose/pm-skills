# v2.21.0 Marketplace Launch + User-Notification Playbook

> **DECIDED 2026-05-25: Approach B (additive soft-migration), shipped as the MINOR v2.21.0.** The old path stays alive; retirement is trigger-gated (plugin #2) and reserved for the [v3.0.0](../v3.0.0/plan_v3.0.0.md) convergence major, along with the heavy comms stack and the tombstone retirement mechanic. The analysis below (Approach A/B/C spectrum, channel inventory) stands as the rationale and the future-retirement reference. In-body references to a "major (3.0.0)" now correctly point to that convergence.
>
> **Purpose.** The comprehensive options reference for *how* to launch the `product-on-purpose` marketplace, whether and how to move existing pm-skills users onto it, and every channel available to notify users. Includes recommendations and best practices. Companion to [`plan_v2.21.0.md`](plan_v2.21.0.md) (the plan) and [`decision-worksheet.md`](decision-worksheet.md) (the decision tracker). **Last updated 2026-05-25** (renumbered from v3.0.0; Approach B locked).

---

## 0. Terminology: it is a launch, not strictly a "rename"

The old marketplace is not being renamed in place. A **new, separate** marketplace is being stood up; the old one continues to exist until (and unless) it is deliberately retired. Three distinct names are in play:

| Name | Value | Role |
|---|---|---|
| Host repo path | `product-on-purpose/agent-plugins` | The address users type at `/plugin marketplace add` |
| Marketplace identity (`name`) | `product-on-purpose` | The brand users install against: `install pm-skills@product-on-purpose` |
| Plugin name | `pm-skills` | The plugin itself, unchanged |
| (Old) marketplace identity | `pm-skills-marketplace` | The self-hosted marketplace in the pm-skills repo today (`source: ./`) |

The strategic question is what happens to the old `pm-skills-marketplace` identity. That is Part 1.

---

## 1. Launch-approach options

These run from least to most disruptive for existing users. The deciding facts: a plugin can be listed in two marketplaces at once (they are independent registries); Claude Code does **not** auto-migrate an install across marketplace identities; and nothing breaks for existing users unless the old listing is removed.

### Approach A - Additive launch (coexist, no forced migration)

- **What:** publish `product-on-purpose` as the canonical home; list pm-skills there (pinned). Keep the old `pm-skills-marketplace` listing alive indefinitely. Point new users and all promotion at the new path.
- **User impact:** none for existing users. They keep updating via the old path and never have to act.
- **Version implication:** non-breaking, so likely a **minor** release (no install contract is removed), not 3.0.0.
- **Pros:** zero disruption; promotion still gets one clean recommended path; the multi-plugin home exists for when plugin #2 ships.
- **Cons:** two install identities for pm-skills persist; the duplicate-skills hazard (Part 3) lingers as a latent footgun; no forcing function ever moves stragglers.
- **Right when:** the second plugin does not exist yet (current state) and disruption avoidance outranks identity cleanliness.

### Approach B - Soft migration (dual-home, retirement deferred to a trigger)

- **What:** Approach A, plus a stated intent to retire the old path - but the retirement is tied to a **trigger** (plugin #2 ships, or adoption of the new path clears a bar), not a fixed near-term date.
- **User impact:** none until the trigger; then a clearly-announced, generous window.
- **Version implication:** the launch itself is minor/non-breaking; the eventual retirement is the breaking step (could itself be the 3.0.0 moment, later).
- **Pros:** non-disruptive now, but with a real path to a single clean identity; converges only when there is a user-visible reason to.
- **Cons:** requires discipline to actually execute retirement later; the dual-identity period is open-ended.
- **Right when:** you want the clean end-state but there is no payoff to forcing it before plugin #2.

### Approach C - Hard migration (converge now, fixed deprecation)

- **What:** publish the new marketplace, deprecate the old `pm-skills-marketplace` on a fixed window (e.g., retire after the next 2 releases), and drive all users to converge. This is the original v3 plan.
- **User impact:** every existing user must eventually remove the old marketplace, add the new one, and reinstall (Part 3 ordering).
- **Version implication:** breaking install contract, so a **major** bump (3.0.0) is correct.
- **Pros:** one clean canonical identity immediately; cleanest promotion story; "rip the bandaid" while the user base is smallest.
- **Cons:** imposes a breaking migration whose payoff (multi-plugin) is invisible until plugin #2 exists; maximizes disruption for the least current benefit.
- **Right when:** you weight a single clean identity for promotion over minimizing disruption, and you accept paying the migration cost before the multi-plugin benefit lands.

### Comparison

| Dimension | A - Additive | B - Soft migration | C - Hard migration |
|---|---|---|---|
| Existing-user disruption | None | None until trigger | Full (re-add + reinstall) |
| Version bump | Minor | Minor now, major later | Major (3.0.0) |
| Old path retired | Never (until you choose) | At a trigger (plugin #2 / adoption) | Fixed window (e.g., 2 releases) |
| Promotion story | One recommended path | One recommended path | One identity, clean |
| Dual-identity period | Indefinite | Bounded by trigger | Short (the window) |
| Duplicate-skills footgun | Lingers | Lingers until retirement | Resolved at convergence |

### Recommendation

**Approach B, behaving as A until plugin #2 nears.** Stand up the marketplace now (additive, non-breaking), make `product-on-purpose` the canonical/promoted path, keep the old path alive, and tie hard retirement to the moment plugin #2 ships and gives old-path users an actual reason to move. This captures the clean end-state without paying disruption for a benefit that does not yet exist. Escalate to C's fixed window only once a second plugin is real or adoption data justifies convergence. (This refines worksheet decisions D-V3-2 and D-V3-5: retirement is trigger-based, and the major bump attaches to the eventual retirement, not the additive launch.)

---

## 2. User-notification channels (complete inventory)

Channels are grouped by where they reach the user. For each: the mechanic, who it reaches, reach level, when it is delivered, intrusiveness, and the key caveat. Verified Claude Code mechanics are in the Part 5 appendix.

### 2a. In-tool channels (reach installed users through Claude Code)

| Channel | Mechanic | Reaches | Reach | Delivered when | Intrusiveness | Key caveat |
|---|---|---|---|---|---|---|
| **Old plugin description notice** | Edit the `description` of the pm-skills entry in the old self-hosted `marketplace.json` to carry a "Moved - install via `product-on-purpose`" line | Existing old-path users | Medium | On `/plugin marketplace update` (re-fetches marketplace.json) | Low | Only seen by users who refresh the marketplace and look at the listing; no push |
| **New plugin description positioning** | The new marketplace entry's `description` frames pm-skills as part of the `product-on-purpose` catalog | New + browsing users | Medium | On install / browse | Low | Positioning, not a migration alert |
| **In-chat skill-output banner** | Add a one-line migration footer to skill outputs on the old path (push to pm-skills main after the v3 tag, so only old-path / unpinned users get it; the new path is pinned and unaffected) | Active old-path users | High (for active users) | On `/plugin update pm-skills` (content re-pull; needs a version bump to signal "update available") | High if overused | Reaches only users who update the plugin content; intrudes on every skill output; keep to one line |
| **Dedicated migration command/skill** | Ship a `/pm-skills-migrate` (or a `migration-notice` skill) on the old path that prints the steps | Opt-in users | Low | When the user runs it | None | Almost nobody runs an opt-in notice; backstop only |
| **Tombstone (end-of-window "brick + signpost")** | At retirement, replace the old path's skills/commands with a single notice: "retired - remove this marketplace, add `product-on-purpose`, reinstall" | Old-path users who update | Medium | On `/plugin update` after the tombstone ships | High (intentional) | Reaches only updaters; non-updaters keep the last working copy; this is the *final* step, announced ahead |
| **Delist** | Remove the pm-skills entry from the old `marketplace.json` | Old-path users who update | Low signal | On `/plugin marketplace update` | High but silent | The plugin just vanishes from that marketplace with no message; prefer the tombstone, which explains itself |

### 2b. Repo / web channels (reach people who look at the project)

| Channel | Mechanic | Reaches | Reach | Key caveat |
|---|---|---|---|---|
| **Release notes** (`Release_v3.0.0.md` + GitHub Release body) | Lead with the marketplace change; link the migration steps | Release watchers, visitors | Medium | Only people who read releases |
| **CHANGELOG `[3.0.0]`** (or `[2.x]` if additive) | Record the change under "Changed"; public paths only | Changelog readers | Low-Medium | Record, not an alert |
| **README install-section repoint + banner** | Make the new path primary; add an "Already installed the old way?" pointer to the migration steps | Anyone landing on the repo | High (for visitors) | Does not reach already-installed users who never revisit |
| **README "What's New" / "Recent Updates" row** | One-line entry pointing at the migration | Repo visitors | Low-Medium | Same limit |
| **New marketplace README "Migration during transition" section** | Already present in the live `agent-plugins` repo; keep it accurate | New-path users | Medium | Reaches people who read the marketplace repo |
| **Pinned GitHub Discussion / Announcement** | A pinned announcement post with the migration steps | Watchers, community | Medium | Opt-in audience |
| **GitHub repo "About" + topics** | Short description points at the canonical install | Discoverers | Low | Cosmetic reinforcement |
| **Issue/PR template or FAQ note** | A short "moving marketplaces?" FAQ entry | People filing issues | Low | Backstop / support deflection |

### 2c. External channels (reach beyond the repo)

| Channel | Mechanic | Reaches | Key caveat |
|---|---|---|---|
| **skills.sh listing** (the `npx skills add` path) | Update the listing description; note this path is unaffected by the marketplace change | skills.sh users | Third-party surface; this install path does not use the marketplace, so it is unaffected |
| **Org `.github` profile README** (`product-on-purpose/.github`) | Point the org landing at the canonical marketplace | Org-page visitors | Low traffic but free reinforcement |
| **`pm-skills-mcp` README cross-reference** | Sibling-repo README points at the canonical install | MCP repo visitors | Separate repo; align during promotion-prep |
| **Social / mailing list (if any)** | Announce the launch + canonical install | Followers | Only as effective as the audience you have |

---

## 3. The duplicate-skills hazard and the canonical migration sequence

This applies to **every** approach (A/B/C) and is the single most important user-facing instruction.

**The hazard (verified):** if a user has **both** marketplaces added and pm-skills installed from each, Claude Code loads pm-skills twice and the namespaced commands/skills **duplicate**, causing conflicts. There is no de-duplication and no auto-migration.

**The canonical sequence (must be in the migration guide, bolded):**

```text
1. /plugin uninstall pm-skills           # remove the old install
2. /plugin marketplace remove pm-skills-marketplace   # drop the old marketplace
3. /plugin marketplace add product-on-purpose/agent-plugins
4. /plugin install pm-skills@product-on-purpose
```

Order matters: remove old, then add new, then reinstall. Never add the new marketplace while the old install is still present. (Exact command spellings to be confirmed against the current Claude Code `/plugin` syntax during execution.)

---

## 4. Recommendations and best practices

### Recommended comms stack, matched to the approach

- **If Approach A or B (recommended):** the launch is non-breaking, so comms can be **light**: repoint the README to the canonical path (with the "already installed?" pointer), publish release notes, keep the new marketplace README migration section accurate, and set the **old plugin description** to a gentle "also available via `product-on-purpose`" line. No skill banner, no tombstone yet. Save the heavier channels for the eventual retirement.
- **If/when retiring the old path (B's trigger, or Approach C):** escalate. Announce the retirement **one release ahead** in release notes + a pinned announcement; set the old description to a clear deprecation notice; optionally add a single-line skill banner during the final window; and finish with a **tombstone** (not a silent delist) so the last thing an old-path updater sees is the migration steps.

### Best-practice principles

1. **Never silently break.** Every retirement step must leave a signpost. A tombstone that explains the move beats a delist that just makes the plugin vanish.
2. **There is no redirect.** Unlike a GitHub repo rename, Claude Code marketplaces do not forward. Every pointer is manual, and some users will never see an in-tool notice - so the repo/web channels are the backstop, not an afterthought.
3. **Announce retirement ahead of time**, in the unit you control: releases. Repeat the notice in each interim release.
4. **Accept the non-updater tail.** Users who never run `/plugin update` keep a working old copy and cannot be reached in-tool. That is fine; they are behind, not broken. It is another reason to keep the old path alive generously.
5. **Use the dual-home window as a comms asset.** Because you control the old self-hosted marketplace, its plugin description is your one in-tool broadcast channel to existing users. Keeping the old path alive (A/B) is what makes that channel available.
6. **Match comms intensity to disruption.** An additive launch needs light comms; a forced migration needs the full stack. Over-notifying a non-breaking change trains users to ignore your notices.
7. **Pin everything.** The new registry entry pins a `sha`, so users get a reproducible install and a plugin repo cannot push to your users by force-pushing main.
8. **Lead with value, not mechanics.** Release notes and the README should say "the install path moved; your skills did not," then give the steps. Mechanics second.

### Reach reality (so expectations are calibrated)

No channel reaches all installed users, because there is no push and no owner-side install analytics. Ranked by reliable reach to *existing* users: README/release notes (only those who revisit) < old plugin description (those who run marketplace update) < skill banner / tombstone (those who update the plugin). Plan for a long tail that never migrates, and make the old path safe to keep serving them.

---

## 5. Verified Claude Code mechanics (appendix)

Confirmed via the claude-code-guide agent against `code.claude.com/docs` on 2026-05-23:

- **No built-in user-notification mechanism**; no push to installed users. Users learn of changes only on `/plugin marketplace update` or, if enabled, auto-update (which defaults on only for *official* marketplaces; a third-party one may not).
- **Plugin descriptions are surfaced** in the `/plugin` UI; `/plugin marketplace update` re-fetches the marketplace's `marketplace.json` (cached under `~/.claude/plugins/`). Editing a listed plugin's description therefore reaches users who refresh.
- **Plugin content** (skills/commands files) updates via `/plugin update <plugin>`, gated by version match/mismatch (a version bump is what signals "update available"). This is a heavier action than a marketplace refresh - relevant to skill-banner and tombstone delivery.
- **No auto-migration** across marketplace identities; installs are treated as **distinct** per marketplace; **both added = duplicate, conflicting plugins**.
- **No install analytics** for marketplace owners. GitHub clone traffic on the registry repo is the only adoption proxy (and it can only show new-path uptake, not old-path decline).
- **`sha` pins** the exact commit users receive. **`strict: true`** (the live registry's setting and the documented default) means the plugin's own `plugin.json` is authoritative and the marketplace entry supplements it; it is not a "passed validation" badge.
- **Undocumented:** whether `/plugin` shows an "update available" badge, and exactly which marketplace `/plugin update <name>` pulls from. Do not depend on either.

---

## 6. Open decisions this playbook informs

1. **Launch approach (A / B / C).** Recommended: **B**, behaving as A until plugin #2 nears. Feeds plan_v3.0.0 D-V3-1, D-V3-2, D-V3-5.
2. **Which notification channels to commit to** for the launch vs the eventual retirement (see the Part 4 stack).
3. **Whether the launch is a minor or major bump** - which follows directly from the approach (A/B launch = minor; C or the eventual retirement = major). This reopens D-V3-5.
