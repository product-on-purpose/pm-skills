# Contributing to PM-Skills

Thank you for your interest in contributing to PM-Skills! This document provides guidelines for contributing skills and other improvements.

## Contribution Model

PM-Skills uses a **Curated Contributions** model:

1. Open a "Request a Skill" issue describing the skill concept
2. Maintainers review and approve the concept
3. Submit a PR following the guidelines below
4. Review for quality and consistency
5. Merge and release

## How to Request a Skill

Before creating a new skill, open an issue with:

- **Skill name** (lowercase, hyphens only)
- **Category** (research, problem-framing, ideation, specification, validation, reflection, coordination)
- **Description** (1-2 sentences on what it does and when to use it)
- **Use cases** (3+ real PM scenarios where this skill adds value)
- **Example output** (brief sample of what the skill would produce)

## Quality Criteria

All contributed skills must:

1. **Solve a real PM workflow problem** - Not theoretical or edge-case
2. **Follow agentskills.io spec** - Valid frontmatter, naming conventions
3. **Include TEMPLATE.md** - Output template for the artifact
4. **Include EXAMPLE.md** - Completed example demonstrating quality
5. **Have descriptive triggers** - Description includes keywords for discovery
6. **Be well-tested** - Verified to produce useful output

## Skill Structure

Every skill requires three files:

```
skills/<skill-name>/
├── SKILL.md           # Main instructions with frontmatter
└── references/
    ├── TEMPLATE.md    # Output template
    └── EXAMPLE.md     # Completed example
```

### SKILL.md Requirements

```yaml
---
name: skill-name                    # Must match directory name
description: What it does...        # 1-1024 characters
license: Apache-2.0
metadata:
  category: specification           # One of 7 categories
  frameworks: [triple-diamond]      # Applicable methodologies
  author: your-github-username
  version: "1.0.0"
---
```

### Naming Conventions

Per agentskills.io specification:
- Lowercase letters, numbers, and hyphens only
- No consecutive hyphens (`--`)
- 1-64 characters
- Must match directory name exactly

**Valid:** `problem-statement`, `prd`, `user-stories`
**Invalid:** `Problem_Statement`, `PRD`, `user--stories`

## Pull Request Process

1. Fork the repository
2. Create a branch: `skill/<skill-name>` or `fix/<description>`
3. Make your changes following the structure above
4. Test your skill by using it with an AI assistant
5. Submit a PR with:
   - Clear description of the skill or change
   - Link to the approved issue (for new skills)
   - Confirmation that you've tested the skill

## MCP Sync Guardrail

This repo uses `.github/workflows/validate-mcp-sync.yml` to detect drift between `pm-skills` and `pm-skills-mcp`.

- Default mode is `observe` (reports mismatch without failing CI).
- The MCP companion server entered maintenance mode 2026-05-04 (M-22 decision; pm-skills-mcp v2.9.2 announcement). Catalog frozen at v2.9.2 build (40 skill tools + 11 workflow tools + 8 utility tools); subsequent pm-skills releases do not re-embed. Drift is therefore expected and accepted; the observe-only posture surfaces drift for visibility without breaking CI.
- If you need blocking validation (e.g., when revisiting maintenance-mode policy or preparing an MCP catalog refresh), pass `mode: block` via `workflow_dispatch`.
- For drift triage, follow `docs/guides/validate-mcp-sync.md`. Source-of-truth metadata is `pm-skills-mcp/pm-skills-source.json` (`pmSkillsVersion`, `outputContractVersion`, `configContractVersion`, and `maintenance: true` flag indicate the maintenance posture).

## Maintainer notes: architectural workarounds

Seven workarounds in the codebase look like odd code but exist for specific reasons. If you are tempted to "clean these up," read the inline comment in the source file first. Each one has a real reason that is non-obvious from the syntax alone.

### 1. Autogenerate paths prefixed with `docs/` in `astro.config.mjs`

```js
{ label: 'Skills', items: [{ label: 'Discover', autogenerate: { directory: 'docs/skills/discover' } }] }
```

The `directory` value includes the `docs/` prefix. This is required because of our D2 Option B custom glob loader in `src/content.config.ts` that mounts `docs/` in-place; entry `filePath` retains the prefix, so Starlight's autogenerate must match against it. Removing the prefix breaks the sidebar.

### 2. `scripts/post-build-strip-md-links.mjs` runs after `astro build`

Astro's `markdown.remarkPlugins` did not invoke our custom plugin in the Starlight + custom-glob-loader setup. We solved the `.md` link issue (Codex P0 finding from v2.14 Phase 2 review) by running a post-build HTML rewrite instead. Do not "fix" by moving back to a remark plugin without verifying the plugin actually runs.

### 3. `EXCLUDE_PATHS` hardcoded arrays in 4 validator scripts mirror `src/content.config.ts` glob excludes

`scripts/check-internal-link-validity.{sh,ps1}` and `scripts/validate-docs-frontmatter.{sh,ps1}` have hardcoded `EXCLUDE_PATHS` arrays listing `workflows/README.md`, `reference/README.md`, etc. These mirror the glob excludes in `src/content.config.ts`. If those globs change (new docs section, new exclusion), update the EXCLUDE_PATHS arrays to match. The bash scripts do not parse the TypeScript config; mirroring by hand is a deliberate simplicity trade-off.

### 4. `scripts/generate-skill-pages.py` rewrite_internal_paths() helper

Source `skills/{name}/SKILL.md` files use paths like `../../docs/reference/skill-families/meeting-skills-contract.md` which resolve correctly from the source location (going up 2 dirs to repo root, then into docs/). When the generator copies that content to `docs/skills/{phase}/{skill}.md`, the same relative path doubles up (`docs/docs/reference/...` which does not exist). The `rewrite_internal_paths()` helper translates `../../docs/` to `../../` at the generator boundary. Do not "consolidate" by changing source SKILL.md paths because the source paths are CORRECT from their source location; the generator just needs the translation step at the copy boundary.

### 5. `scripts/check-internal-link-validity.sh` LC_ALL=C.UTF-8 prepend

The script's `grep -P` (Perl regex) requires a UTF-8 locale. On Windows Git Bash with empty default `LANG`/`LC_ALL`, `grep -P` silently fails with "supports only unibyte and UTF-8 locales" and returns no matches; the validator then reports 0 broken links because link extraction never ran. CI Linux runners use `C.UTF-8` by default and work fine. The script prepends `export LC_ALL=${LC_ALL:-C.UTF-8}` so Windows Git Bash testing surfaces the same findings as CI Linux. Defense-in-depth; do not remove.

### 6. Generators do NOT emit a body `# Heading` matching the frontmatter title

Starlight automatically renders the frontmatter `title:` field as the page heading. If a markdown body ALSO starts with `# Heading` matching that title, both render and the heading appears twice. (This was a regression from the MkDocs Material to Astro Starlight migration; Material did not auto-render the frontmatter title, so the body H1 was the only heading.)

All three generators (`generate-skill-pages.py`, `generate-workflow-pages.py`, `generate-showcase.py`) explicitly do NOT emit a body H1 after the frontmatter block. The workflow generator additionally strips the source `# Workflow Name` H1 from `_workflows/*.md` files at the copy boundary via a regex pass (`re.sub(r'^#\s+.+?\n+', '', rest, count=1, flags=re.MULTILINE)`). Source `_workflows/*.md` files keep their H1 for standalone-on-GitHub readability; the stripping happens only in the docs/workflows/ output.

If you are authoring new hand-authored docs or adding generator paths: rely on frontmatter `title:` as the page heading; do not add a `# Heading` line below the closing `---`. The page content should start with a paragraph or the first `## Section` heading.

### 7. Sub-agent definitions live under `subagents/` (custom path), not the default `agents/`

The Claude Code plugin convention is to place sub-agent definition files under an `agents/` directory at the plugin root. pm-skills uses a custom `subagents/` directory instead, declared via the `"agents": ["./subagents/"]` field in `.claude-plugin/plugin.json`.

The reason: Windows NTFS is case-insensitive by default. pm-skills already has an `AGENTS/` directory (uppercase) for cross-tool agent context per the AGENTS.md convention. Adding a lowercase `agents/` directory next to it would resolve to the same NTFS inode on case-insensitive Windows filesystems, causing the two directories to alias. The plugin.json custom path field is the supported override per the plugin manifest spec and avoids the collision entirely.

Validation: `scripts/validate-agents-md.{sh,ps1}` was extended in v2.16.0 to recognize `subagents/` (per v2.16.0 master plan D19 + D31 amendment). If you are adding a new Claude Code plugin to pm-skills or are tempted to "fix" the directory name to match Anthropic's default, leave the `subagents/` layout as-is and verify the plugin.json `agents` field is still pointing at it.

Origin: caught during v2.16.0 Phase 1 execution; D31 amendment in `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md`.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing. We are committed to providing a welcoming and inclusive environment for everyone.

## Questions?

- Open an issue for skill ideas or questions
- Check existing issues before creating new ones
- See the [README](README.md) for project context and roadmap

---

*By contributing, you agree that your contributions will be licensed under the Apache 2.0 license.*
