## What's Included

- **{{SKILLS}} shipped PM skills in `skills/`** ({{PHASE}} phase skills across 6 phases, {{FOUNDATION}} foundation skills, {{UTILITY}} utility skills, {{TOOL}} tool skills)
- **{{COMMANDS}} slash-command docs in `commands/`** ({{WORKFLOW_COMMANDS}} `/workflow-*` orchestrator commands + the `/chain` command)
- **{{WORKFLOWS}} Workflows** for multi-skill processes (Triple Diamond, Lean Startup, Feature Kickoff, and {{WORKFLOWS_MINUS_3}} more)

## Installation

### Claude Code (recommended)

Install from the plugin marketplace, no clone required:

```
/plugin marketplace add product-on-purpose/agent-plugins
/plugin install pm-skills@product-on-purpose
```

All {{SKILLS}} skills are available immediately. Invoke any by name, for example `/pm-skills:deliver-prd`. Already on the old `pm-skills-marketplace`? It keeps working; see [Setup by Platform]({{PLATFORMS_LINK}}) to switch homes.

### Cross-agent (Cursor, GitHub Copilot, Cline, and others)

```bash
npx skills add product-on-purpose/pm-skills
```

Installs all {{SKILLS}} skills into your agent's default skills directory via the open [skills CLI](https://github.com/vercel-labs/skills). No clone, no sync.

### Claude.ai / Claude Desktop

1. Go to **Settings > Capabilities** (Desktop) or **Project Settings > Add Files** (Claude.ai)
2. Upload the latest release ZIP (`pm-skills-vX.X.X.zip`) from [Releases](https://github.com/product-on-purpose/pm-skills/releases)
3. Skills are now available in your conversations

### Clone or download (everything included)

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
```

Or download and extract the latest ZIP from [Releases](https://github.com/product-on-purpose/pm-skills/releases). Point any other agent to `AGENTS.md` for skill discovery; each skill is self-contained in `skills/{skill-name}/SKILL.md` (for example `skills/deliver-prd/SKILL.md`).

More detail: see the [full getting-started guide]({{WALKTHROUGH_LINK}}) for the long-form walkthrough.

## Verify It Worked

Confirm the install landed before you start building:

- **Claude Code**: run `/plugin list` to confirm `pm-skills` is installed, then invoke `/pm-skills:deliver-prd "test feature"` and expect a complete PRD artifact back.
- **Claude.ai / Claude Desktop**: ask "Use the prd skill to create requirements for a test feature" and expect a complete PRD artifact back.
- **Other AI agents** (Cursor, Windsurf, Copilot, Gemini CLI, and similar): ask "Use the hypothesis skill to test my assumption about checkout abandonment" and expect a structured hypothesis artifact back.

If you get a generic response instead of a structured artifact, the agent has not discovered the skill; see [Setup by Platform]({{PLATFORMS_LINK}}) for troubleshooting.

## Usage

### Slash Commands

```
/pm-skills:deliver-prd "Feature description"
/pm-skills:define-hypothesis "Assumption to test"
/pm-skills:deliver-acceptance-criteria "Story or feature slice"
/pm-skills:deliver-user-stories "PRD or feature context"
/pm-skills:discover-competitive-analysis "Market or product area"
```

See `AGENTS.md` for the complete command list.

### Workflows

Run multi-skill workflows:

```
/workflow-feature-kickoff "Feature name"  # Problem → Hypothesis → PRD → Stories
```

Workflow definitions are in `_workflows/`.

## Skill Lifecycle Tools

Three utility skills manage the skill library itself:

```mermaid
flowchart LR
    Create["utility-pm-skill-builder\nCreate"] --> Validate["utility-pm-skill-validate\nValidate"]
    Validate -- "PASS" --> Ship["Ship"]
    Validate -- "Findings" --> Iterate["utility-pm-skill-iterate\nIterate"]
    Iterate --> Validate
```

See the [pm-skill-lifecycle guide]({{LIFECYCLE_GUIDE_LINK}}) for detailed workflow patterns.

## File Structure

```
skills/            # All {{SKILLS}} skill definitions ({{PHASE}} phase + {{FOUNDATION}} foundation + {{UTILITY}} utility + {{TOOL}} tool, flat)
commands/          # {{COMMANDS}} command markdown files ({{WORKFLOW_COMMANDS}} workflow + /chain)
_workflows/        # Multi-skill workflows
scripts/           # sync, validation, and release helpers
.claude/pm-skills-for-claude.md  # instructions for Claude Code users
AGENTS.md          # Agent discovery index
```

For Claude Code discovery, run `./scripts/sync-claude.sh` (or `.ps1`) to populate `.claude/skills` and `.claude/commands` from the flat source.

## Learn More

{{LEARN_MORE_LINKS}}

---

*Built by [Product on Purpose](https://github.com/product-on-purpose) for PMs who ship.*
