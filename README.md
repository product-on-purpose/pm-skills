# PM-Skills

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![Skills](https://img.shields.io/badge/skills-24-brightgreen.svg)](#skills-inventory)
[![v1.0.1](https://img.shields.io/badge/version-1.0.1-blue.svg)](https://github.com/product-on-purpose/pm-skills/releases)
[![Agent Skills Spec](https://img.shields.io/badge/spec-agentskills.io-orange.svg)](https://agentskills.io/specification)

> **Ship better products, faster.** Open source PM skills that supercharge your AI assistant.

---

## What is PM-Skills?

**PM-Skills** transforms your AI assistant into a seasoned product manager. Instead of starting from scratch every conversation, your AI gets instant access to battle-tested frameworks, templates, and examples for every stage of product development.

```
You: "Create a PRD for our new search feature"

AI + PM-Skills: *Generates a comprehensive PRD with problem statement,
                 success metrics, user stories, scope definition, and
                 technical considerations—all in professional format*
```

**The result?** Consistent, high-quality PM artifacts in seconds—not hours.

---

## Why PM-Skills?

| Without PM-Skills | With PM-Skills |
|-------------------|----------------|
| Generic AI responses | Professional PM frameworks |
| Inconsistent formats | Production-ready templates |
| Missing key sections | Comprehensive coverage |
| Starting from scratch | Building on best practices |
| Prompt engineering every time | One command, instant results |

---

## Quick Start

### Claude Code (Fastest)

```bash
# Use skills directly—no installation needed
/prd "Search feature for e-commerce platform"
/hypothesis "Will one-page checkout increase conversion?"
/user-stories "Recurring tasks feature from PRD"
```

### Claude.ai / Desktop

1. Download from [Releases](https://github.com/product-on-purpose/pm-skills/releases)
2. Upload ZIP in **Settings > Capabilities**
3. Start using: "Use the prd skill to..."

### Any AI Assistant (GitHub Copilot, Cursor, Windsurf)

```bash
git clone https://github.com/product-on-purpose/pm-skills.git
```

Skills auto-discover via `AGENTS.md`.

---

## The 24 Skills

PM-Skills covers the complete product lifecycle using the **Triple Diamond** framework:

### Discover — *Find the right problem*

| Skill | What it does |
|-------|--------------|
| `interview-synthesis` | Turn user research into actionable insights |
| `competitive-analysis` | Map the landscape, find opportunities |
| `stakeholder-summary` | Understand who matters and what they need |

### Define — *Frame the problem*

| Skill | What it does |
|-------|--------------|
| `problem-statement` | Crystal-clear problem framing |
| `hypothesis` | Testable assumptions with success metrics |
| `opportunity-tree` | Teresa Torres-style outcome mapping |
| `jtbd-canvas` | Jobs to be Done framework |

### Develop — *Explore solutions*

| Skill | What it does |
|-------|--------------|
| `solution-brief` | One-page solution pitch |
| `spike-summary` | Document technical explorations |
| `adr` | Architecture Decision Records (Nygard format) |
| `design-rationale` | Why you made that design choice |

### Deliver — *Ship it*

| Skill | What it does |
|-------|--------------|
| `prd` | Comprehensive product requirements |
| `user-stories` | INVEST-compliant stories with acceptance criteria |
| `edge-cases` | Error states, boundaries, recovery paths |
| `launch-checklist` | Never miss a launch step again |
| `release-notes` | User-facing release communication |

### Measure — *Validate with data*

| Skill | What it does |
|-------|--------------|
| `experiment-design` | Rigorous A/B test planning |
| `instrumentation-spec` | Event tracking requirements |
| `dashboard-requirements` | Analytics dashboard specs |
| `experiment-results` | Document learnings from experiments |

### Iterate — *Learn and improve*

| Skill | What it does |
|-------|--------------|
| `retrospective` | Team retros that drive action |
| `lessons-log` | Build organizational memory |
| `refinement-notes` | Capture backlog refinement outcomes |
| `pivot-decision` | Evidence-based pivot/persevere framework |

---

## Workflow Bundles

Don't know where to start? Use a bundle:

| Bundle | Best for | Skills included |
|--------|----------|-----------------|
| **[Feature Kickoff](_bundles/feature-kickoff.md)** | New features | problem-statement → hypothesis → prd → user-stories → launch-checklist |
| **[Lean Startup](_bundles/lean-startup.md)** | Rapid validation | hypothesis → experiment-design → experiment-results → pivot-decision |
| **[Triple Diamond](_bundles/triple-diamond.md)** | Major initiatives | All 24 skills across 6 phases |

---

## Slash Commands

For Claude Code users—24 commands covering every skill:

<details>
<summary><strong>Discover</strong></summary>

| Command | What it does |
|---------|--------------|
| `/competitive-analysis` | Map the competitive landscape |
| `/interview-synthesis` | Synthesize user research |
| `/stakeholder-summary` | Document stakeholder needs |

</details>

<details>
<summary><strong>Define</strong></summary>

| Command | What it does |
|---------|--------------|
| `/hypothesis` | Create testable hypotheses |
| `/jtbd-canvas` | Jobs to be Done canvas |
| `/opportunity-tree` | Outcome-driven opportunity mapping |
| `/problem-statement` | Frame the problem clearly |

</details>

<details>
<summary><strong>Develop</strong></summary>

| Command | What it does |
|---------|--------------|
| `/adr` | Architecture Decision Record |
| `/design-rationale` | Document design decisions |
| `/solution-brief` | One-page solution overview |
| `/spike-summary` | Document spike findings |

</details>

<details>
<summary><strong>Deliver</strong></summary>

| Command | What it does |
|---------|--------------|
| `/edge-cases` | Document error states and boundaries |
| `/launch-checklist` | Pre-launch readiness checklist |
| `/prd` | Product Requirements Document |
| `/release-notes` | User-facing release notes |
| `/user-stories` | Break features into stories |

</details>

<details>
<summary><strong>Measure</strong></summary>

| Command | What it does |
|---------|--------------|
| `/dashboard-requirements` | Analytics dashboard specs |
| `/experiment-design` | Design A/B tests |
| `/experiment-results` | Document experiment outcomes |
| `/instrumentation-spec` | Event tracking requirements |

</details>

<details>
<summary><strong>Iterate</strong></summary>

| Command | What it does |
|---------|--------------|
| `/lessons-log` | Capture lessons learned |
| `/pivot-decision` | Pivot or persevere framework |
| `/refinement-notes` | Backlog refinement outcomes |
| `/retrospective` | Team retrospective |

</details>

<details>
<summary><strong>Bundles</strong></summary>

| Command | What it does |
|---------|--------------|
| `/kickoff` | Run the full feature kickoff workflow |

</details>

---

## How Skills Work

Each skill is a self-contained instruction set:

```
skills/deliver/prd/
├── SKILL.md              # Instructions for the AI
└── references/
    ├── TEMPLATE.md       # Output structure
    └── EXAMPLE.md        # Real-world example
```

The AI reads the skill, follows the instructions, uses the template, and references the example to produce consistent, professional output.

### Example: The PRD Skill

**You say:** "Create a PRD for adding dark mode to our app"

**The AI:**
1. Reads `skills/deliver/prd/SKILL.md` for instructions
2. Follows the structured approach (problem → solution → metrics → scope)
3. Uses `TEMPLATE.md` for formatting
4. References `EXAMPLE.md` for quality benchmarks
5. Outputs a complete, professional PRD

---

## Platform Compatibility

| Platform | Status | Method |
|----------|--------|--------|
| Claude Code | Native | Slash commands |
| Claude.ai | Native | ZIP upload |
| Claude Desktop | Native | ZIP upload |
| GitHub Copilot | Native | AGENTS.md discovery |
| Cursor | Universal | AGENTS.md discovery |
| Windsurf | Universal | AGENTS.md discovery |
| OpenCode | Native | Skill format |

---

## Built on Best Practices

PM-Skills incorporates wisdom from:

- **Teresa Torres** — Continuous Discovery Habits, Opportunity Solution Trees
- **Marty Cagan** — Product discovery, empowered teams
- **Eric Ries** — Lean Startup, Build-Measure-Learn
- **Clayton Christensen** — Jobs to be Done theory
- **Michael Nygard** — Architecture Decision Records

Every skill is field-tested and follows the [Agent Skills Specification](https://agentskills.io/specification).

---

## Contributing

We welcome contributions! PM-Skills uses a curated model:

1. **Propose** — Open a "Request a Skill" issue
2. **Discuss** — Get maintainer feedback
3. **Build** — Follow the [skill template](_templates/skill-template/)
4. **Ship** — Submit PR, pass review

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## Repository Structure

```
pm-skills/
├── skills/               # 24 skills across 6 phases
│   ├── discover/         # Research and understanding
│   ├── define/           # Problem framing
│   ├── develop/          # Solution exploration
│   ├── deliver/          # Specification and shipping
│   ├── measure/          # Validation and metrics
│   └── iterate/          # Learning and improvement
├── _bundles/             # Workflow sequences
├── _docs/                # Schema and references
├── _templates/           # Skill creation templates
├── commands/             # Claude Code slash commands
├── AGENTS.md             # Universal agent discovery
└── CONTRIBUTING.md       # How to contribute
```

---

## License

[Apache License 2.0](LICENSE) — Use commercially, modify freely, contribute back.

---

<p align="center">
  <strong>Built by <a href="https://github.com/product-on-purpose">Product on Purpose</a></strong><br>
  <sub>For PMs who ship.</sub>
</p>
