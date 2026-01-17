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
skills/<phase>/<skill-name>/
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

## Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing. We are committed to providing a welcoming and inclusive environment for everyone.

## Questions?

- Open an issue for skill ideas or questions
- Check existing issues before creating new ones
- See the [README](README.md) for project context and roadmap

---

*By contributing, you agree that your contributions will be licensed under the Apache 2.0 license.*
