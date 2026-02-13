# PM-Skills Quick Start

## What's Included

- **24 PM skills** across 6 phases (Discover, Define, Develop, Deliver, Measure, Iterate)
- **Slash commands** for instant skill invocation (`/prd`, `/hypothesis`, etc.)
- **Workflow bundles** for multi-skill processes (Triple Diamond, Lean Startup, Feature Kickoff)
- **MCP sync guardrail** via GitHub Actions (`validate-mcp-sync`, observe-first rollout)

## Installation

### Claude.ai / Claude Desktop

1. Go to **Settings > Capabilities** (Desktop) or **Project Settings > Add Files** (Claude.ai)
2. Upload the latest release ZIP (`pm-skills-vX.X.X.zip`) from [Releases](https://github.com/product-on-purpose/pm-skills/releases)
3. Skills are now available in your conversations

### Claude Code

Clone or copy to your project:

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
```

Or download and extract the latest ZIP from [Releases](https://github.com/product-on-purpose/pm-skills/releases) to your project root.

### Other AI Agents

Point your agent to `AGENTS.md` for skill discovery. Each skill is self-contained in `skills/{phase-skill}/SKILL.md` (e.g., `skills/deliver-prd/SKILL.md`).

More detail: see `docs/getting-started.md` for the long-form guide.

## Usage

### Slash Commands

```
/prd "Feature description"
/hypothesis "Assumption to test"
/user-stories "PRD or feature context"
/competitive-analysis "Market or product area"
```

See `AGENTS.md` for the complete command list.

### Workflow Bundles

Run multi-skill workflows:

```
/kickoff "Feature name"  # Problem → Hypothesis → PRD → Stories
```

Bundle definitions are in `_bundles/`.

## File Structure

```
skills/            # All 24 skill definitions (flat: discover-*, define-*, ...)
commands/          # Slash command triggers
_bundles/          # Multi-skill workflows
scripts/           # sync-claude.(sh|ps1), build-release helpers
.claude/pm-skills-for-claude.md  # instructions for Claude Code users
AGENTS.md          # Agent discovery index
```

For Claude Code discovery, run `./scripts/sync-claude.sh` (or `.ps1`) to populate `.claude/skills` and `.claude/commands` from the flat source.

## Maintainer Notes (v2.2.0)

- Cross-repo drift check:
  - Workflow: `.github/workflows/validate-mcp-sync.yml`
  - Script: `.github/scripts/validate-mcp-sync.js`
  - Guide: `docs/guides/validate-mcp-sync.md`
- Default is observe mode in v2.2.0. Planned transition to blocking mode is in v2.3.0 after MCP alignment closure.
- Planning/backlog governance references:
  - `docs/internal/planning-persistence-policy.md`
  - `docs/internal/planning-artifact-tier-map.md`
  - `docs/internal/backlog-canonical.md`

## Learn More

- Full documentation: https://github.com/product-on-purpose/pm-skills
- Skill specification: https://agentskills.io/specification

---

*Built by [Product on Purpose](https://github.com/product-on-purpose) for PMs who ship.*
