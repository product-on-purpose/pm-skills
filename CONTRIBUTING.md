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

## Maintainer notes: architectural workarounds

A few things in the codebase look like odd code but exist for specific reasons. If you are tempted to "clean these up," read the inline comment in the source file first. Each one has a real reason that is non-obvious from the syntax alone.

### 1. The docs site lives in `site/` (Pattern S); generated content is gitignored

The Astro Starlight project lives entirely under `site/`. Rendered content lives in `site/src/content/docs/` and is read by the stock Starlight `docsLoader()` (no custom loader, no `docs/` prefix in sidebar `autogenerate` directories). Reference pages (skills, workflows, showcase, commands, and the library samples) are emitted by `scripts/gen-site.mjs` into that tree and are **gitignored and rebuilt each build** (`site/src/content/docs/{skills,workflows,showcase,samples}/` and `reference/commands.md`). The hand-authored `skills/index.md` and `samples/index.md` overviews sit at the root of those dirs and stay tracked. Repo-root `docs/` holds only governance/human docs (`docs/internal/`), never built by Astro.

### 2. `scripts/gen-site.mjs` is the single content generator

One zero-dependency Node generator reads `skills/`, `_workflows/`, `commands/`, and `library/skill-output-samples/` and emits Starlight content. It replaced three Python generators. It rewrites source `../../docs/` links to `../../` at the copy boundary (source SKILL.md paths are correct from their source location; the generator translates at the boundary, so do not "consolidate" by changing source paths).

### 3. `scripts/remark-resolve-links.mjs` resolves relative links at build time

Relative `.md` links resolve to Starlight slug URLs via a remark (mdast) transform, not a post-build HTML rewrite. It fires because the stock `docsLoader()` uses Astro's standard markdown pipeline (the previous custom glob loader prevented remark plugins from running, which is why an HTML rewriter was needed before; that rewriter is now retired). Cross-target links (`../../skills/.../SKILL.md`, `_workflows/`, `../internal/`) map to in-site slugs or GitHub source URLs. `scripts/check-rendered-links.mjs` is the build-aware regression gate (must report 0 broken); it supersedes the retired filesystem link validators.

### 4. Validators skip generated content

`scripts/validate-docs-frontmatter.{sh,ps1}` and `scripts/check-no-body-h1.{sh,ps1}` scan `site/src/content/docs/` but auto-skip the generated subtrees (`skills/`, `workflows/`, `showcase/`, `samples/`, `reference/commands.md`): generated pages and verbatim library samples have their own frontmatter/heading conventions. `git grep`-based validators (e.g. `check-count-consistency`) never see generated content because it is gitignored; their `:!site/src/content/docs/changelog.md` / `releases/` exclusions cover the hand-authored historical pages.

### 5. Generated pages do NOT emit a body `# Heading` matching the frontmatter title

Starlight renders the frontmatter `title:` field as the page heading. If a markdown body ALSO starts with `# Heading` matching that title, both render and the heading appears twice. `gen-site.mjs` omits the body H1 on generated pages and strips the leading `# ` line from `_workflows/*.md` at the copy boundary (`rest.replace(/^#[ \t]+.+\r?\n+/m, '')`). Source `_workflows/*.md` files keep their H1 for standalone-on-GitHub readability. When authoring hand-authored docs: rely on frontmatter `title:` as the page heading; do not add a `# Heading` line below the closing `---`.

### 6. Sub-agent definitions live in `agents/`; coordination context lives in `_agent-context/`

Sub-agent definition files live in the fixed `agents/` directory at the plugin root, which Claude Code's plugin runtime auto-discovers. There is no plugin.json field for a custom sub-agent path.

Through v2.16.x the directory was named `subagents/` to dodge a case-insensitivity collision: pm-skills also had an uppercase `AGENTS/` coordination directory, and on case-insensitive filesystems (Windows NTFS, macOS APFS) a lowercase `agents/` next to it would alias to the same inode. v2.17.0 (W2) resolved this by renaming the coordination directory to `_agent-context/`, which freed the `agents/` name for native discovery.

Validation: `scripts/validate-agents-md.{sh,ps1}` enumerates `agents/*.md` and verifies each sub-agent name appears in `AGENTS.md`. If you add a new Claude Code plugin sub-agent, place its definition in `agents/`; do not reintroduce a `subagents/` directory or a plugin.json custom-path field.

Origin: case-collision caught during v2.16.0 Phase 1 execution (D31 amendment); resolved by the v2.17.0 directory rename in `docs/internal/release-plans/v2.17.0/spec_agents-directory-rename.md`.

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing. We are committed to providing a welcoming and inclusive environment for everyone.

## Questions?

- Open an issue for skill ideas or questions
- Check existing issues before creating new ones
- See the [README](README.md) for project context and roadmap

---

*By contributing, you agree that your contributions will be licensed under the Apache 2.0 license.*
