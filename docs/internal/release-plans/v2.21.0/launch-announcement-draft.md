# v2.21.0 launch announcement - draft (Phase 5, light stack)

> **Held until Phase 5** (post public-flip + S8 pass - both done). Internal draft for review; publish verbatim (or edited) at announce time. Matches the locked **light comms stack** for an additive launch: release watchers + a gentle pointer, no skill-output banner. Channels: the GitHub Release body (already in `docs/releases/Release_v2.21.0.md`) + a pinned GitHub Discussion + the org `.github` profile if desired.
>
> **Maintainer to verify before posting:** the upcoming-plugin names + descriptions in "What's coming" are drafted from inference - confirm the names (the sibling dir is `agent-skill-toolkit` singular; this draft uses your `agent-skills-toolkit`) and that each scope is accurate.

## Pinned GitHub Discussion (or Release highlight)

**Title:** pm-skills now installs from the `product-on-purpose` marketplace (additive - nothing breaks)

**Body:**

pm-skills v2.21.0 introduces a dedicated marketplace: **`product-on-purpose`** - the home for a growing set of Product on Purpose plugins.

This is a **distribution change only**. Your skills, commands, and their behavior are unchanged (same 63 skills, 73 commands). If you already installed pm-skills, **it keeps working - you do not have to do anything.**

**Install (new, recommended):**
```
/plugin marketplace add product-on-purpose/agent-plugins
/plugin install pm-skills@product-on-purpose
```

`npx skills add` and `git clone` users: unaffected.

**Want to switch from the old path?** It's optional - the old `pm-skills-marketplace` path keeps working. If you'd like to move to the new home, do it in **this order** (remove the old install first, or Claude Code will load pm-skills twice and you'll get duplicate commands):

```
/plugin uninstall pm-skills
/plugin marketplace remove pm-skills-marketplace
/plugin marketplace add product-on-purpose/agent-plugins
/plugin install pm-skills@product-on-purpose
```

If you ever see duplicate commands, that means pm-skills is installed from both marketplaces at once - uninstall it, remove the old `pm-skills-marketplace`, and reinstall from `@product-on-purpose` to get back to a single clean install.

**Why a minor and not a 3.0?** The launch is backward-compatible - nothing was removed. The old path retires only in a future major, announced well ahead.

### What's coming to product-on-purpose

The marketplace exists because pm-skills is the first of several plugins. On the roadmap:

- **`thinking-framework-skills`** - canonical thinking and reasoning frameworks as agent skills (SCQA, MECE, the Pyramid Principle, First Principles, OODA, and more), so your agent structures analysis the way a sharp strategist would.
- **`agent-config-toolkit`** - a toolkit for configuring AI coding agents: settings, hooks, permissions, and project scaffolding, to standardize how a team sets up its agents.
- **`agent-skills-toolkit`** - meta-tooling for building and maintaining your own agent skills (scaffolding, validation, authoring helpers) - the kind of machinery behind a library like pm-skills.

(Names and scope are still firming up - watch the marketplace for releases.)

### We'd love your feedback

This is the first actively promoted release, and we want to hear from you:

- **Use cases** - how are you using pm-skills, and what's working well?
- **Feature requests** - which skills, workflows, or improvements would help you most?
- **Bugs** - anything broken, confusing, or surprising?
- **General feedback** - reactions, rough edges, anything.

Share it in [Discussions](https://github.com/product-on-purpose/pm-skills/discussions) or open an [issue](https://github.com/product-on-purpose/pm-skills/issues/new). This is the first promoted release, so your input directly shapes what ships next.

## Old-marketplace listing (already done in M2)

The self-hosted `pm-skills-marketplace` plugin description already carries the additive-launch line; existing users see it on `/plugin marketplace update`. No further edit needed at announce.

## Do NOT use this launch

- No in-chat skill-output banner (reserved for the future retirement).
- No tombstone/delist (retirement only).
