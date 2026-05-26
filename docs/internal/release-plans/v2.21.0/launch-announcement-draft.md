# v2.21.0 launch announcement - draft (Phase 5, light stack)

> **Held until Phase 5** (post public-flip + S8 pass). Internal draft for review; publish verbatim (or edited) at announce time. Matches the locked **light comms stack** for an additive launch: release watchers + a gentle pointer, no skill-output banner. Channels: the GitHub Release body (already in `docs/releases/Release_v2.21.0.md`) + a pinned GitHub Discussion + the org `.github` profile if desired.

## Pinned GitHub Discussion (or Release highlight)

**Title:** pm-skills now installs from the `product-on-purpose` marketplace (additive - nothing breaks)

**Body:**

pm-skills v2.21.0 introduces a dedicated marketplace: **`product-on-purpose`**, the home for multiple Product on Purpose plugins.

This is a distribution change only. Your skills, commands, and their behavior are unchanged (same 63 skills, 73 commands). If you already installed pm-skills, **it keeps working - you do not have to do anything.**

**New (recommended):**
```
/plugin marketplace add product-on-purpose/agent-plugins
/plugin install pm-skills@product-on-purpose
```

**Already installed via the old path?** It keeps working. To move to the new home (optional), remove the old install first to avoid duplicate commands - the exact steps are in the [release notes](https://github.com/product-on-purpose/pm-skills/releases/tag/v2.21.0).

`npx skills add` and `git clone` users: unaffected.

Why a minor and not a 3.0? The launch is backward-compatible - nothing was removed. The old path retires only in a future major, announced well ahead.

## Old-marketplace listing (already done in M2)

The self-hosted `pm-skills-marketplace` plugin description already carries the additive-launch line; existing users see it on `/plugin marketplace update`. No further edit needed at announce.

## Do NOT use this launch

- No in-chat skill-output banner (reserved for the future retirement).
- No tombstone/delist (retirement only).
