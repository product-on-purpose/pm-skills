---
title: "MCP Integration"
description: "Status and recommended path for using PM-Skills via Model Context Protocol."
---

# MCP Integration

!!! warning "MCP server is in maintenance mode"

    The companion MCP server [`pm-skills-mcp`](https://github.com/product-on-purpose/pm-skills-mcp) entered maintenance mode on 2026-05-04. The published [v2.9.2](https://github.com/product-on-purpose/pm-skills-mcp/releases/tag/v2.9.2) release remains available on npm and continues to expose 40 PM skills, 11 workflow tools, and 8 utility tools via the Model Context Protocol. Active development is paused pending demonstrated demand. Security patches and critical bug fixes will continue; new skill parity with this `pm-skills` library is on hold after the v2.9.2 build.

## Recommended path: file-based install

For new users, the **file-based install path** is the recommended way to use PM-Skills. It is under active maintenance, ships the full current catalog of all 40 skills, and works with any agent supported by the open [`skills` CLI](https://github.com/vercel-labs/skills) or by Claude Code's slash-command system.

- [Getting Started](../getting-started/index.md) for installation
- [Skills catalog](../skills/index.md) for the full list
- [Workflows](../workflows/index.md) for multi-skill chains

## Using the MCP server (legacy path)

If your team has already adopted `pm-skills-mcp` or has a specific reason to use the MCP transport (e.g., a client that does not support file-based skills), the v2.9.2 release remains fully functional. Setup, configuration, and troubleshooting are documented in the MCP server's own README:

- [`pm-skills-mcp` README](https://github.com/product-on-purpose/pm-skills-mcp)
- [`pm-skills-mcp` releases](https://github.com/product-on-purpose/pm-skills-mcp/releases)

## Skill parity at maintenance time

| | This `pm-skills` library | `pm-skills-mcp` v2.9.2 (frozen) |
|---|---|---|
| Total skills | 40 (and growing) | 40 (frozen at v2.9.2 build) |
| Workflows | 9 | 11 (legacy names retained) |
| Active maintenance | Yes | Maintenance mode |

The v2.9.2 build of `pm-skills-mcp` embeds the full current 40-skill catalog at the time of its publication (2026-05-05). Skills added to `pm-skills` after that build are not embedded in the MCP server. Use the file-based install for parity with future pm-skills releases.

## Registering interest in resumed MCP development

If your team would benefit from resumed MCP server development, [open a discussion](https://github.com/product-on-purpose/pm-skills-mcp/discussions). Demand signals (discussion engagement, install volume growth, direct contact) inform when development resumes.
