# PM-Skills

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Skills](https://img.shields.io/badge/skills-24-purple.svg)](#skills-inventory)
[![Agent Skills Spec](https://img.shields.io/badge/spec-agentskills.io-orange.svg)](https://agentskills.io/specification)

> Open source Product Management skills for AI agents

**PM-Skills** is a curated collection of reusable instruction sets that help AI assistants produce high-quality PM artifacts—PRDs, problem statements, user stories, experiment designs, and more.

Built on the [Agent Skills Specification](https://agentskills.io/specification), PM-Skills works across multiple AI platforms and follows the **Triple Diamond** framework for complete product development coverage.

---

## Highlights

- **24 Professional Skills** — Covering the entire product lifecycle from discovery to iteration
- **Triple Diamond Framework** — Organized across 6 phases: Discover, Define, Develop, Deliver, Measure, Iterate
- **Cross-Platform Compatible** — Works with Claude Code, Claude.ai, GitHub Copilot, Cursor, and more
- **Production-Ready Templates** — Every skill includes templates and real-world examples
- **Framework Agnostic** — Skills map to Lean Startup, Design Thinking, and other methodologies via bundles

---

## Quick Start

### Claude Code (Recommended)

```bash
# Install from marketplace
claude plugin marketplace add product-on-purpose/pm-skills

# Use any skill
/prd
/problem-statement
/hypothesis
```

### Claude.ai / Claude Desktop

1. Download a skill ZIP from [Releases](https://github.com/product-on-purpose/pm-skills/releases)
2. Go to **Settings > Capabilities**
3. Upload the ZIP file
4. Start a conversation and reference the skill

### GitHub Copilot / Cursor / Windsurf

Skills are auto-discovered via `AGENTS.md`. Clone or fork this repository, and your AI assistant will find the skills automatically.

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
```

### Manual Installation

Copy any skill folder to your project's `.claude/skills/` directory:

```
your-project/
└── .claude/
    └── skills/
        └── problem-statement/
            ├── SKILL.md
            └── references/
                ├── TEMPLATE.md
                └── EXAMPLE.md
```

---

## Skills Inventory

### Discover — Understanding the Problem Space

| Skill | Category | Description |
|-------|----------|-------------|
| `interview-synthesis` | research | Synthesize user research into actionable insights |
| `competitive-analysis` | research | Map competitive landscape and identify opportunities |
| `stakeholder-summary` | research | Document stakeholder needs and constraints |

### Define — Framing the Problem

| Skill | Category | Description |
|-------|----------|-------------|
| `problem-statement` | problem-framing | Create clear problem framing with user impact and success criteria |
| `hypothesis` | ideation | Define testable assumptions with success metrics |
| `opportunity-tree` | problem-framing | Map outcome-driven opportunities (Teresa Torres method) |
| `jtbd-canvas` | problem-framing | Apply Jobs to be Done framework |

### Develop — Exploring Solutions

| Skill | Category | Description |
|-------|----------|-------------|
| `solution-brief` | ideation | Document proposed solution approach (one-pager) |
| `spike-summary` | coordination | Capture time-boxed technical exploration results |
| `adr` | specification | Record architecture decisions (Nygard format) |
| `design-rationale` | specification | Document design decision reasoning |

### Deliver — Specifying and Shipping

| Skill | Category | Description |
|-------|----------|-------------|
| `prd` | specification | Write comprehensive product requirements |
| `user-stories` | specification | Generate user stories with acceptance criteria (INVEST) |
| `edge-cases` | specification | Document error states, boundaries, recovery paths |
| `launch-checklist` | coordination | Pre-launch validation across all functions |
| `release-notes` | coordination | User-facing release documentation |

### Measure — Validating with Data

| Skill | Category | Description |
|-------|----------|-------------|
| `experiment-design` | validation | Design A/B tests and experiments |
| `instrumentation-spec` | validation | Define event tracking requirements |
| `dashboard-requirements` | validation | Specify analytics dashboard needs |
| `experiment-results` | reflection | Document experiment outcomes and learnings |

### Iterate — Learning and Improving

| Skill | Category | Description |
|-------|----------|-------------|
| `retrospective` | reflection | Facilitate team retrospectives |
| `lessons-log` | reflection | Build organizational memory |
| `refinement-notes` | coordination | Document backlog refinement outcomes |
| `pivot-decision` | reflection | Framework for pivot/persevere decisions |

---

## Workflow Bundles

Bundles are curated skill sequences for specific methodologies:

| Bundle | Description | Core Skills |
|--------|-------------|-------------|
| **Triple Diamond** | Complete product development cycle | All 24 skills across 6 phases |
| **Lean Startup** | Build-Measure-Learn rapid iteration | hypothesis → experiment-design → experiment-results → pivot-decision |
| **Feature Kickoff** | Quick-start for feature development | problem-statement → hypothesis → prd → user-stories → launch-checklist |

See [`_bundles/`](_bundles/) for detailed workflow guides.

---

## Platform Compatibility

| Platform | Method | Status |
|----------|--------|--------|
| Claude Code | Plugin marketplace | Native |
| Claude.ai (web) | ZIP upload | Native |
| Claude Desktop | ZIP upload | Native |
| Claude API | Skills API | Native |
| GitHub Copilot | AGENTS.md | Native |
| Cursor | AGENTS.md | Universal |
| Windsurf | AGENTS.md | Universal |
| OpenCode | Native skill support | Native |

---

## Skill Structure

Each skill follows a consistent structure:

```
skills/<phase>/<skill-name>/
├── SKILL.md              # Instructions with frontmatter
└── references/
    ├── TEMPLATE.md       # Output template for the artifact
    └── EXAMPLE.md        # Completed example
```

### Frontmatter Schema

```yaml
---
name: problem-statement
description: Creates a clear problem framing document...
license: Apache-2.0
metadata:
  category: problem-framing
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
  version: "1.0.0"
---
```

See [`_docs/frontmatter-schema.yaml`](_docs/frontmatter-schema.yaml) for the complete schema.

---

## Repository Structure

```
pm-skills/
├── skills/               # PM skills organized by phase
│   ├── discover/         # Research and understanding
│   ├── define/           # Problem framing
│   ├── develop/          # Solution exploration
│   ├── deliver/          # Specification and shipping
│   ├── measure/          # Validation and measurement
│   └── iterate/          # Learning and improvement
├── _bundles/             # Workflow documentation
├── _docs/                # Schema and reference docs
├── _templates/           # Skill creation templates
├── commands/             # Claude Code slash commands
├── releases/             # Pre-packaged ZIPs
├── AGENTS.md             # Universal agent discovery
├── VISION.md             # Project vision and roadmap
└── CONTRIBUTING.md       # Contribution guidelines
```

---

## Roadmap

### Phase 0: Foundation ✅ COMPLETE
- [x] Repository structure (README, LICENSE, .gitignore)
- [x] Directory structure (skills/, _bundles/, _docs/, _templates/, commands/, releases/)
- [x] CONTRIBUTING.md
- [x] Schema documentation (`_docs/frontmatter-schema.yaml`)
- [x] Category reference (`_docs/categories.md`)
- [x] Skill template structure (`_templates/skill-template/`)

### Phase 1: Core Skills (P0)
- [ ] `problem-statement`
- [ ] `hypothesis`
- [ ] `prd`
- [ ] `user-stories`
- [ ] `launch-checklist`

### Phase 2: Extended Skills (P1)
- [ ] 8 additional skills (see [VISION.md](_NOTES/VISION.md))

### Phase 3: Complete Coverage (P2)
- [ ] 11 remaining skills
- [ ] Workflow bundles
- [ ] Slash commands
- [ ] GitHub Actions automation

See [`_NOTES/VISION.md`](_NOTES/VISION.md) for the complete roadmap.

---

## Contributing

We welcome contributions! PM-Skills uses a **curated contribution model**:

1. Open a "Request a Skill" issue to propose new skills
2. Get approval from maintainers
3. Submit a PR following the skill template
4. Pass quality review

### Quality Criteria

All skills must:

- Solve a real PM workflow problem
- Follow the [Agent Skills Specification](https://agentskills.io/specification)
- Include `TEMPLATE.md` and `EXAMPLE.md`
- Have descriptive triggers in the description
- Produce useful, professional output

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## Related Projects

- [Agent Skills Specification](https://agentskills.io) — Format standard
- [Anthropic Skills](https://github.com/anthropics/skills) — Reference patterns
- [OpenSkills](https://github.com/numman-ali/openskills) — Universal distribution

---

## License

PM-Skills is released under the [Apache License 2.0](LICENSE).

This license allows commercial use, modification, and distribution while requiring attribution and including an explicit patent grant.

---

## Acknowledgments

Built with insights from:
- Teresa Torres' *Continuous Discovery Habits*
- Marty Cagan's *Inspired* and *Empowered*
- Eric Ries' *The Lean Startup*
- Clayton Christensen's *Jobs to be Done* theory
- Michael Nygard's ADR format

---

<p align="center">
  <sub>Built by <a href="https://github.com/product-on-purpose">Product on Purpose</a> for PMs who ship.</sub>
</p>
