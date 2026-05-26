---
title: v2.21.0 Release Notes - Marketplace Launch (additive)
description: 'v2.21.0 publishes pm-skills through the new product-on-purpose marketplace, a single home for multiple Product on Purpose plugins. This is a distribution change only: the skill catalog (63), commands (73), and all behavior are unchanged, and the existing install path keeps working, so no existing user has to act. Shipped as a minor because nothing was removed.'
date: 2026-05-26
status: SHIPPED
type: minor
---

**Released:** 2026-05-26
**Type:** Minor (additive distribution launch; no skill, command, or behavior changes)
**Day-to-day usage:** unchanged. Every skill, command, sub-agent, and workflow behaves exactly as in v2.20.0. Existing installs keep updating as before; the only thing that changed is the recommended front door.

## TL;DR

pm-skills now has a dedicated marketplace: **`product-on-purpose`**, hosted at `product-on-purpose/agent-plugins`. It is the recommended home going forward and the place future Product on Purpose plugins will live. This is purely a **distribution** change.

- **Your skills did not change.** Same catalog (63 skills), same 73 commands, same 4 sub-agents, same behavior.
- **The old path keeps working.** If you installed via `pm-skills-marketplace`, nothing breaks and you do not have to act.
- **Why a minor, not a major?** The launch is backward-compatible: nothing was removed. Versions encode compatibility, not significance. The eventual retirement of the old path is the breaking step, and it is reserved for a future major.

## How to install

**New (recommended):**

```text
/plugin marketplace add product-on-purpose/agent-plugins
/plugin install pm-skills@product-on-purpose
```

You add the marketplace by its **repo path** (`product-on-purpose/agent-plugins`) and install by its **identity** (`@product-on-purpose`). The marketplace is a thin registry: it lists plugins and holds no plugin code, and the pm-skills entry is pinned to the v2.21.0 tag.

**Evergreen paths (unchanged):**

```text
npx skills add product-on-purpose/pm-skills
git clone https://github.com/product-on-purpose/pm-skills.git
```

These do not use the marketplace and are unaffected.

## Already installed the old way?

If you installed via `pm-skills@pm-skills-marketplace`, you have two options:

- **Keep it.** It keeps working, and `/plugin update pm-skills` updates it as before. No action required.
- **Move to the new home.** Do these steps **in this order** to avoid duplicate commands:

  ```text
  1. /plugin uninstall pm-skills
  2. /plugin marketplace remove pm-skills-marketplace
  3. /plugin marketplace add product-on-purpose/agent-plugins
  4. /plugin install pm-skills@product-on-purpose
  ```

  > **Warning:** do not add the new marketplace while the old install is still present. Claude Code treats the two as separate sources, so installing pm-skills from both produces **duplicate, conflicting** commands. Remove the old install first.

If you see duplicate commands, it means pm-skills is installed from both identities at once: uninstall pm-skills, remove the old `pm-skills-marketplace`, and reinstall from `@product-on-purpose` to return to a single install.

## What this means for you

- **If you use the skills:** nothing changes. Update when convenient. The new marketplace is the recommended path going forward, but the old one keeps working.
- **If you contribute:** the canonical install instructions now point at the `product-on-purpose` marketplace; the self-hosted `marketplace.json` remains for the direct-install fallback.

## Timeline

The old path remains supported. If it is ever retired, we will announce it well ahead of time, tied to the marketplace's growth (for example, when a second plugin makes the new home clearly worth moving to). That retirement is the breaking step and will be a future major.

## What does NOT change in v2.21.0

- All skills, templates, examples, commands, sub-agents, and workflows are unchanged; no behavior changes.
- Skill catalog (63), slash commands (73), sub-agents (4), and workflows (12) are unchanged.
- The `npx skills add` and `git clone` install paths are unaffected.
- Doc-stack (Astro 6.3.x + Starlight 0.39.x) is unchanged.

## Affected areas

| Area | Change |
|---|---|
| `README.md` / docs site | Install instructions lead with the `product-on-purpose` marketplace; the old path is retained and labeled as still-working. Version surfaces bumped to v2.21.0; What's New + release-history entries added. |
| `.claude-plugin/plugin.json` + `marketplace.json` | Version 2.20.0 to 2.21.0; descriptions note the additive marketplace launch. The self-hosted marketplace is kept alive (dual-home). |
| `product-on-purpose/agent-plugins` (separate repo) | The marketplace registry is published: pm-skills entry pinned to the v2.21.0 tag, registry validation CI, public launch. |
