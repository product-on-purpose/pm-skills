# v3.0.0 Migration Guide (draft)

> **Purpose.** The user-facing migration content. Feeds `docs/releases/Release_v3.0.0.md` and the `agent-plugins` README "Migration during transition" section. This is the distilled, publishable version; the internal strategy and full options live in [`launch-and-notification-playbook.md`](launch-and-notification-playbook.md). **Framed around the recommended Approach B** (additive: the old path keeps working, the new path is canonical, moving is encouraged not forced). Bracketed `[Approach C]` notes mark what changes under a hard migration. **Last updated 2026-05-23.**
>
> Draft note: confirm exact `/plugin` command spellings against current Claude Code syntax before publishing.

---

## What changed (and what didn't)

pm-skills is now available through the **`product-on-purpose` marketplace**, a single home for multiple Product on Purpose plugins. This is a **distribution change** - how you install and update pm-skills. Your skills, commands, and their behavior are unchanged: the same catalog, just a cleaner front door built for more than one plugin.

**[Approach B]** The previous install path still works. You do not have to do anything. The new path is simply the recommended home going forward, and where future plugins will live.

> **[Approach C]** Under a hard migration, replace the line above with: "The previous path will be retired after `<window>`. Please move to the new path by then to keep receiving updates."

## Which situation are you in?

### I am a new user

Use the new path:

```text
/plugin marketplace add product-on-purpose/agent-plugins
/plugin install pm-skills@product-on-purpose
```

You add the marketplace by its **repo path** (`product-on-purpose/agent-plugins`) and install by its **identity** (`@product-on-purpose`).

### I installed pm-skills the old way (`pm-skills@pm-skills-marketplace`)

You have two options:

- **Keep it.** It keeps working, and `/plugin update pm-skills` updates it as before. **[Approach B]** No action required.
- **Move to the new canonical home.** Do these steps **in this order** to avoid duplicate commands:

  ```text
  1. /plugin uninstall pm-skills
  2. /plugin marketplace remove pm-skills-marketplace
  3. /plugin marketplace add product-on-purpose/agent-plugins
  4. /plugin install pm-skills@product-on-purpose
  ```

  > **Warning:** do not add the new marketplace while the old install is still present. Claude Code treats the two as separate sources, so you would get **duplicate, conflicting** pm-skills commands. Remove the old install first.

### I use `npx skills add` or `git clone`

**No change.** Those paths do not use the marketplace.

- `npx skills add product-on-purpose/pm-skills` works as before.
- `git clone` works as before.

## Why the version number

> **[Approach C]** v3.0.0 is a **major** version because the install path - part of how you consume the library - changed, even though no skills changed.

**[Approach B]** This is an additive marketplace launch. Your existing install is unaffected, so there is no breaking change to your setup.

## Timeline

**[Approach B]** The old path remains supported. If it is ever retired, we will announce it well ahead of time, tied to the marketplace's growth (for example, when a second plugin makes the new home clearly worth moving to).

> **[Approach C]** The old path will be retired after the next 2 releases. A reminder will appear in each release until then, and the old listing will end with a notice pointing here.

## Verify it worked

After installing from the new path:

- `/plugin` should list pm-skills under `@product-on-purpose`.
- Your slash commands (`/prd`, `/hypothesis`, and the rest) should resolve.
- If you moved from the old path, confirm there is **only one** set of pm-skills commands (no duplicates).

## Need help?

Open a discussion or issue on the [pm-skills repo](https://github.com/product-on-purpose/pm-skills). If you see duplicate commands, you likely have both marketplaces added: uninstall pm-skills, remove the old `pm-skills-marketplace`, and reinstall from `@product-on-purpose`.
