# Privacy Policy

**PM-Skills** is an open-source collection of product management skill files for AI agents.

## Data Collection

PM-Skills **does not collect, transmit, or store any user data**. It is a set of static markdown files that AI agents read locally to produce PM artifacts.

Specifically:

- **No analytics or telemetry** — no usage data is collected or sent anywhere
- **No network requests** — the plugin operates entirely offline using local files
- **No user data storage** — no databases, cookies, local storage, or caching of user content
- **No authentication** — no accounts, tokens, or credentials are required or processed
- **No third-party services** — no external APIs are called

## What the Plugin Does

When invoked, an AI agent reads the skill's instruction files (SKILL.md, TEMPLATE.md, EXAMPLE.md) from the local filesystem and uses them to guide artifact generation. All processing happens within the AI agent's session. The plugin provides instructions only — it does not execute code or access external systems.

## Companion MCP Server

The optional companion package [pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp) runs as a local MCP server. It reads skill files from the local filesystem and serves them to MCP clients over a local connection. It does not make external network requests or collect user data.

## License

PM-Skills is licensed under [Apache 2.0](LICENSE). See the license file for full terms.

## Contact

For privacy questions, open an issue at [github.com/product-on-purpose/pm-skills/issues](https://github.com/product-on-purpose/pm-skills/issues).
