> **SUPERSEDED (2026-05-23).** This was a draft skeleton for a future marketplace repo, drafted when the host repo path was tentatively `product-on-purpose/plugins`. The real registry now exists and is authoritative at **`product-on-purpose/agent-plugins`** (host path changed `plugins` -> `agent-plugins`; the second plugin was renamed `thinking-tools` -> `thinking-framework-skills`). This file is retained for provenance only. See the marketplace plan: [`../plan_v2.21.0.md`](../plan_v2.21.0.md).

# Product on Purpose

Thematic AI agent skill and tool collections for product work. One marketplace, multiple independent plugins. Install only the collections you want.

## Quick start

```bash
# 1. Add the marketplace once
/plugin marketplace add product-on-purpose/plugins

# 2. Install the plugins you want (each is independent)
/plugin install pm-skills@product-on-purpose
/plugin install thinking-tools@product-on-purpose

# 3. Update any plugin independently
/plugin update pm-skills
```

You add the marketplace by its **repo path** (`product-on-purpose/plugins`). You install plugins by the marketplace **identity** (`@product-on-purpose`). Those differ by design: the repo path is the address, the identity is the brand.

## Plugins

| Plugin | What it is | Repo |
|---|---|---|
| `pm-skills` | Product management skills, sub-agents, and sprint tools across the full product lifecycle | `product-on-purpose/pm-skills` |
| `thinking-tools` | _(coming)_ Canonical thinking and reasoning frameworks (SCQA, MECE, Pyramid Principle, First Principles, OODA) | `product-on-purpose/thinking-tools` |

Each plugin lives in its **own repo** with its own version, changelog, and release cadence. This repo holds only the registry (`.claude-plugin/marketplace.json`); it contains no plugin code.

## How listing works

The registry points outward at each plugin repo via a `source` entry. The plugin repos do not point back; they only need a valid `.claude-plugin/plugin.json`. To list a new plugin, add one entry to `marketplace.json` and pin it to a released commit.

**Pinning:** production entries should pin a `sha` so the marketplace controls exactly which commit of each plugin users receive (a plugin repo cannot then ship to your users by force-pushing `main`). Bumping a plugin = updating its `sha` and `version` in this one file. The draft `marketplace.json` omits `sha` for readability.

## Adding a plugin

See [`plugin-repo-checklist.md`](plugin-repo-checklist.md) for the contract a repo must satisfy to be listed.

## License

Each plugin carries its own license (see the plugin's repo). pm-skills is Apache-2.0.
