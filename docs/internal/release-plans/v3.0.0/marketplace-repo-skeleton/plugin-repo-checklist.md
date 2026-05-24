> **SUPERSEDED (2026-05-23).** Draft, retained for provenance. The live `product-on-purpose/agent-plugins` repo already carries its own `CONTRIBUTING.md` (host path changed `plugins` -> `agent-plugins`). Refine the listing contract there, not here. See the v3.0.0 plan: [`../plan_v3.0.0.md`](../plan_v3.0.0.md).

# Plugin Repo Checklist

The contract a repo must satisfy to be listed as a plugin in the `product-on-purpose` marketplace. Build to this and your repo is listable with a one-line registry entry.

## 1. A valid plugin at the repo root (required)

- `.claude-plugin/plugin.json` exists at the repo root.
- Required fields: `name` (kebab-case, unique within the marketplace), `version` (SemVer), `description`, `license`.
- Recommended fields: `homepage`, `repository`, `author`, `keywords`.
- Skill frontmatter follows the [agentskills.io spec](https://agentskills.io/specification): top level keeps `name` / `description` / `license`; proprietary fields nest under `metadata:` (the post-v2.17.0 structure).

## 2. The plugin is independently valid (the one-way rule)

- The plugin installs and runs standalone. A user could add the plugin repo directly as a one-plugin marketplace if it also carries its own `marketplace.json`.
- The plugin repo does **not** reference the marketplace. Association is declared only in the marketplace's `marketplace.json`. Pointing is one-way: marketplace to plugin.

## 3. Component palette (what a plugin may contain)

A plugin can ship any subset of these. It does not have to ship all of them.

| Directory / file | Component |
|---|---|
| `skills/` | agent skills (`SKILL.md` + references) |
| `commands/` | slash commands |
| `agents/` | sub-agents (native registration) |
| `hooks/` | event hooks (`hooks.json` + scripts) |
| `.mcp.json` or `mcpServers` config | bundled MCP server(s) |
| `_workflows/` | multi-skill workflow chains |

`pm-skills` ships skills + commands + agents. A pure framework plugin like `thinking-tools` might ship only skills + commands.

## 4. Versioning and release

- Per-plugin SemVer in `plugin.json`. Each plugin versions on its own cadence.
- Tag releases in the plugin repo (for example `v3.0.0`).
- Maintain a `CHANGELOG.md` in the plugin repo.

## 5. How to get listed in the marketplace

Add one entry to `plugins/.claude-plugin/marketplace.json` in the `plugins` array:

```jsonc
{
  "name": "<plugin-name>",
  "source": { "source": "github", "repo": "product-on-purpose/<repo>", "sha": "<released-commit>" },
  "description": "...",
  "version": "<matches the plugin's released version>",
  "strict": true
}
```

- `source` forms: `github` (`repo` shorthand), `url` (full `.git` URL, any host), `git-subdir` (a subdirectory of another repo), or a relative path string (only if the plugin lives inside the marketplace repo).
- **Pin `sha`** to a released commit. This is what makes the marketplace authoritative over what users receive.
- Set `strict: true` once the plugin passes strict validation.

## 6. Naming conventions

- Plugin `name` should match the repo name where practical (`pm-skills`, `thinking-tools`).
- kebab-case, descriptive, unique within the marketplace.
- MCP servers: bundle into the owning plugin, or list as their own plugin. For example `pm-skills-mcp` could be folded into the `pm-skills` plugin or listed as a separate entry; it is a choice, not a requirement.

## 7. Validate before listing

- `plugin.json` parses and all required fields are present.
- The plugin installs cleanly on a fresh Claude Code.
- For a pinned source, the `sha` exists and sits on a released tag.
