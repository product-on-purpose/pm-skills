# v3.0.0 Decision Worksheet (plain-language tracker)

> **Purpose.** A revisit-friendly companion to [`plan_v3.0.0.md`](plan_v3.0.0.md). The plan holds the formal 6-part Decision Briefs; this file is the plain-language status tracker, the open questions, the one verified constraint, and the deprecation toolbox - written so you can pick it up cold without decoding letters and numbers. **Last updated 2026-05-23.**

## How to read this

- **Decisions** = forks that need your call. Each has a short name, the real choices described in words, a recommendation, and a status.
- **Constraints** = things that are simply true (verified against the Claude Code docs) and must be handled. Not a choice.
- **Open question** = the one thing still genuinely unresolved (sequencing).
- The letters `(A)/(B)/(C)` appear only in parentheses to cross-reference the formal briefs in the plan. Ignore them if they add noise - the words are what matter.

---

## Status at a glance

| Short name | What you said | Recommendation | Status |
|---|---|---|---|
| 1. Fate of the built-in marketplace | "definitely A" | Keep both during a window | **LOCKED: keep** |
| 2. How/when the OLD path retires | "B or C, want to monitor" | Retire after the next 2 releases | Leaning locked: release-boxed (see note) |
| 3. When the NEW registry goes public | "A or B, pending sequencing" | Public at launch | Pending the sequencing question below |
| 4. Does the registry CI block bad listings | "follow your rec" | Yes, enforcing | **LOCKED: enforcing** |
| 5. Why 3.0.0 with no new skills | "A" | Major (install contract changed) | **LOCKED: major** |
| Sequencing (the real open question) | not yet decided | v2.20.0 hygiene first, then v3 | **OPEN** |

---

## The five decisions, in plain language

### 1. What happens to pm-skills's own built-in marketplace? (the keystone)

Today pm-skills carries a marketplace *inside its own repo*. After v3 the real marketplace lives in a separate repo. So: keep, delete, or rebrand the built-in one?

- **Keep it alive during a transition window (A).** Existing users keep getting updates from it until they choose to move; it retires later on a schedule. ← recommended, and you locked it.
- Delete it now (B): clean, but every existing user's updates stop working until they manually re-add the new marketplace.
- Rebrand it to converge identities (C): collides, because two repos would then claim the same identity.

**Outcome of your choice (keep):** nobody breaks on day one; the cost is that during the window you bump two homes each release. This is the decision everything else hangs on.

### 2. How long does the OLD path stay alive, and how does it end?

This only exists because of decision 1. "During the transition" needs a concrete end.

- After roughly 90 days (A): a calendar deadline.
- **After the next 2 releases (B), with removal announced one release ahead.** ← recommended.
- When old-path usage drops below some level (C): **not viable** - see the Constraint section; you cannot measure old-path usage.

**Why B over C:** you can watch the new path get adopted (via GitHub clone traffic on the registry repo), but you have no way to watch the old path's usage fall, and that falling number is exactly the trigger C would need. So commit to a release-based deadline and use traffic only as a sanity check, not the trigger.

### 3. When does the NEW registry repo become public?

The registry repo is private right now. A normal user cannot add a private marketplace, so it has to be public to launch.

- **Flip it public at launch, after it points at the real v3.0.0 tag (A).** ← recommended. You can test it privately (signed in) before flipping.
- Make it public right now (B).
- Public now but pointing at the current 2.x release (C).

**Decision 2 vs 3 - the thing that felt like overlap:** they are opposite ends of the same migration, on different clocks.
- **Decision 2 is about the OLD path *dying*** (a retirement date, end of the window).
- **Decision 3 is about the NEW path *being born*** (a go-public moment, the launch).
They never refer to the same date. One closes the old door; the other opens the new one.

### 4. Does the new registry's CI block a bad listing, or just warn?

- **Block it (enforcing) (A):** CI fails the registry if an entry is missing a pinned commit, points at no release, or does not install. ← recommended, you locked it.
- Warn only (B).
- Block the cheap checks, warn on the install test (C): the fallback if the install test proves flaky.

**Outcome (enforcing):** a broken listing can never reach users; this is the check that protects you most once a second or third plugin gets listed.

### 5. Why call it 3.0.0 when no skills change?

- **Major, 3.0.0 (A):** the *install contract* changes (the commands users run change; the old path is deprecated). That is a breaking change to how users consume the library, even though the skills behave identically. ← recommended, you locked it.
- Minor, 2.20.0 (B): understates a deprecation.
- Major but wait until paired with new skills (C): delays a migration existing users should get cleanly.

**Outcome (major):** release notes lead with "the install path changed; your skills did not."

---

## The open question: sequencing (this is what "pending version decision" meant)

Decision 3's "pending" was really pointing here. The fork is **what ships next**, and it also decides where the small backlog cleanup goes.

### Option X (recommended): a small v2.20.0 hygiene release first, then v3.0.0

**Sequence:** v2.19.0 (shipped) -> **v2.20.0 (small, no new skills)** -> **v3.0.0 (the migration)**.

**What v2.20.0 would contain** (all already captured in the existing `v2.20.0` stub; these are public-surface nits that a first promoted audience would notice):
- Fix the `pm-skills-mcp` "40 skills" description where the README links to the MCP repo (and the MCP repo's own one-liner). It is stale against the real 63.
- Reconcile the README "12 workflows" claim against the 2 workflows that have no `/workflow-` command - either add the two commands or correct the number. (Count accuracy is this repo's perennial weak spot.)
- Regenerate the skill pages so the `pm-skill-auditor` sample tables stop listing the `validate-mcp-sync` validator that v2.19.0 removed.
- Optionally the validator-internal tidy-ups (`check-stale-bundle-refs`, the count-checker subset rule), or defer those.

**Why do this first:**
- v3 is the **first actively promoted release**, so its public surfaces should be clean before the spotlight, not during it.
- It keeps v3's commit diff and its story **purely about the migration** - easier to review, easier to explain, smaller smoke-test surface.
- It makes decision 3 unambiguous: the registry goes public at v3 launch, with nothing half-finished in front of it.

**Cost:** one extra small release cycle (likely a single short session, no new skills, low risk).

### Option Y: v3 next, fold the cheapest fixes into v3 prep

Skip v2.20.0; do only the workflow-count and MCP-description fixes inside v3's release-prep, defer the rest. Fewer releases, but it slightly muddies v3's "migration only" diff and narrative.

**Recommendation:** X. The separation is worth one small release, especially for a first promotion.

---

## Constraint discovered during verification (NOT a decision): adding the new path without removing the old creates duplicates

This is the most important thing verification surfaced, and it is a fact to handle, not a choice.

**What is true** (confirmed against the Claude Code docs): installs are tracked per-marketplace and treated as distinct. There is **no auto-migration** when a plugin moves to a new marketplace identity. If a user has **both** marketplaces added at once, **both copies of pm-skills load** and the namespaced commands/skills **duplicate** (two `/pm-skills:...`), causing conflicts. There is no built-in de-duplication.

**What it forces (no optionality here):**
- The migration guide must instruct, in this exact order: **remove the old marketplace -> add the new marketplace -> reinstall.** Doing it in this order never produces an overlap.
- A bolded warning: "do not add the new marketplace while the old one is still added."
- In the smoke matrix, the **remove-old-then-add-new** scenario becomes the load-bearing test, plus a new negative observation ("both added at once -> confirm the duplication, so we can describe exactly what a careless user sees").

This does not change any of the five decisions. It changes the *content* of the migration guide and the smoke matrix.

---

## Deprecation + notification toolbox (for the END of the window)

You asked whether we can intentionally retire the old path while telling users what to do, whether a skill can print an in-chat notice, what else exists, and what is best practice. We do **not** need to pick the exact mechanic now (it is an end-of-window move), but here are the options, with their real reach and tradeoffs. Verified mechanics are noted.

**A key enabling fact:** the old path serves the pm-skills repo's latest default-branch content, while the new path is pinned to the v3.0.0 tag. So after v3 tags, anything we push to the repo reaches **old-path users on update but not new-path users** (they are frozen at the tag). That divergence is what lets us target the old path specifically.

**The catch on all in-tool channels:** there is **no push**. A change only reaches a user when they refresh. A marketplace listing/description change is delivered on `/plugin marketplace update`; new plugin *content* (a skill banner or a tombstone) is delivered only when the user actually updates the plugin. A user who never updates keeps their last-pulled copy working forever - you cannot reach them in-tool at all. Claude Code marketplaces have **no redirect** (unlike a GitHub repo rename), so every signpost is manual.

Options, gentle to aggressive:

1. **Marketplace description notice** (lightest, verified). Edit the old plugin's `description` to read "Moved - install via the `product-on-purpose` marketplace; this path retires after v3.x." Shows in the `/plugin` UI; delivered on `/plugin marketplace update`. Low noise, but only seen by users who refresh and look.

2. **In-chat skill banner** (your "skill outputs a notice"). Add a one-line migration footer to skill outputs on the old path (pushed to the repo after the v3 tag, so only old-path users get it). Reaches **active** users in context, every invocation. Cons: noisy if overdone; delivered only after the user updates the plugin content, not just the marketplace; intrusive to skill output (a trust/quality consideration). Best kept to a single short line, possibly only on high-traffic skills.

3. **Dedicated migration command** (e.g., `/pm-skills-migrate`). Opt-in, zero noise, but low reach (they have to run it). Weak on its own; fine as a backstop.

4. **Tombstone = "brick with a signpost"** (the controlled retirement you described). At end-of-window, replace the old path's commands/skills with a single notice: "This install path is retired. To continue: remove this marketplace, add `product-on-purpose`, reinstall." Old-path users who update get a self-explaining stub instead of stale skills. This is the right **final** step, announced ahead - not an opening move. It still only reaches updaters.

5. **Delist** (hardest). Remove the pm-skills entry from the old marketplace.json. On update, the plugin simply disappears from that marketplace. Cleaner removal but **less self-explaining** than a tombstone (the skill just vanishes with no message). Prefer tombstone over delist for user-friendliness.

**Best practice (synthesis):** graceful, signposted deprecation, never a silent break.
1. Announce + keep working (dual-home) - decisions 1 and 2.
2. Passive notices through the window: the description channel + README banner + release notes + a pinned GitHub announcement.
3. Optionally one low-noise in-product nudge (a single-line skill footer), reversible.
4. At end-of-window, retire **loudly with a signpost** (tombstone), not a silent vanish; back it with the GitHub announcement for the non-updater tail.
5. Accept that an irreducible tail of users who never update will keep a working old copy - that is fine; they are not broken, just behind.

This whole toolbox is the back half of decision 2 (the window). We capture it now; we choose the exact mechanic when the window is closing.

---

## Verified Claude Code facts (so we do not re-litigate them)

Confirmed via the claude-code-guide agent against `code.claude.com/docs` on 2026-05-23:

- **No install analytics** for marketplace owners. GitHub clone traffic is the only proxy.
- **No built-in user-notification** mechanism; no auto-migration across marketplace identities; both-added produces duplicate, conflicting plugins.
- **Descriptions are surfaced** in the `/plugin` UI; `/plugin marketplace update` re-fetches the marketplace.json (it is cached under `~/.claude/plugins/`). So the description channel works for users who refresh.
- **`sha` pins the exact commit** users receive.
- **`strict: true`** (the live registry's setting, and the documented default) means "the plugin's own `plugin.json` is the authority" and the marketplace entry supplements it. It is *not* a "passed validation" badge. pm-skills has a clean `plugin.json`, so `strict: true` is correct; the registry CI still verifies installability independently.
- **Undocumented:** whether `/plugin` shows an "update available" badge, and exactly which marketplace `/plugin update <name>` pulls from. Do not bank the plan on either.

---

## Decisions still needed from you

1. **Sequencing:** Option X (v2.20.0 hygiene first, then v3) or Option Y (v3 next)? Everything else is effectively settled.
2. **Confirm decision 2 = release-boxed** (retire the old path after the next 2 releases, announced one release ahead). You leaned "B or C"; the analytics finding rules out C.
3. (Later, not now) the exact end-of-window retirement mechanic (tombstone vs delist).

Once 1 and 2 are set, the plan gets the verified mechanics folded in and the three companion docs get written (migration guide, smoke matrix, registry CI spec).
