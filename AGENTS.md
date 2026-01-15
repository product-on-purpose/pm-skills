# PM-Skills

> Open source Product Management skills for AI agents

This repository contains 24 professional PM skills organized by the Triple Diamond framework. Each skill helps AI agents produce high-quality PM artifacts.

## Skills

### Discover Phase

#### interview-synthesis
**Path:** `skills/discover/interview-synthesis/SKILL.md`

Synthesizes user research interviews into actionable insights, patterns, and recommendations. Use after conducting user interviews, customer calls, or usability sessions to extract and communicate findings.

#### competitive-analysis
**Path:** `skills/discover/competitive-analysis/SKILL.md`

Creates a structured competitive analysis comparing features, positioning, and strategy across competitors. Use when entering a market, planning differentiation, or understanding the competitive landscape.

#### stakeholder-summary
**Path:** `skills/discover/stakeholder-summary/SKILL.md`

Documents stakeholder needs, concerns, and influence for a project or initiative. Use when starting projects, managing complex stakeholder relationships, or ensuring alignment across organizational boundaries.

---

### Define Phase

#### problem-statement
**Path:** `skills/define/problem-statement/SKILL.md`

Creates a clear problem framing document with user impact, business context, and success criteria. Use when starting a new initiative, realigning a drifted project, or communicating up to leadership.

#### hypothesis
**Path:** `skills/define/hypothesis/SKILL.md`

Defines a testable hypothesis with clear success metrics and validation approach. Use when forming assumptions to test, designing experiments, or aligning team on what success looks like.

#### opportunity-tree
**Path:** `skills/define/opportunity-tree/SKILL.md`

Creates an opportunity solution tree mapping desired outcomes to opportunities and potential solutions. Use for outcome-driven product discovery, prioritization, or communicating product strategy.

#### jtbd-canvas
**Path:** `skills/define/jtbd-canvas/SKILL.md`

Creates a Jobs to be Done canvas capturing the functional, emotional, and social dimensions of a customer job. Use when deeply understanding customer motivations, designing for jobs, or reframing product positioning.

---

### Develop Phase

#### solution-brief
**Path:** `skills/develop/solution-brief/SKILL.md`

Creates a concise one-page solution overview that communicates the proposed approach, key decisions, and trade-offs. Use when pitching solutions to stakeholders, aligning teams on approach, or documenting solution intent before detailed specification.

#### spike-summary
**Path:** `skills/develop/spike-summary/SKILL.md`

Documents the results of a time-boxed technical or design exploration (spike). Use after completing a spike to capture learnings, findings, and recommendations for the team.

#### adr
**Path:** `skills/develop/adr/SKILL.md`

Creates an Architecture Decision Record following the Nygard format to document significant technical decisions, their context, and consequences. Use when making technical choices that affect system architecture, technology selection, or development patterns.

#### design-rationale
**Path:** `skills/develop/design-rationale/SKILL.md`

Documents the reasoning behind design decisions including alternatives considered, trade-offs evaluated, and principles applied. Use when making significant UX decisions, aligning with stakeholders on design direction, or preserving design context for future reference.

---

### Deliver Phase

#### prd
**Path:** `skills/deliver/prd/SKILL.md`

Creates a comprehensive Product Requirements Document that aligns stakeholders on what to build, why, and how success will be measured. Use when specifying features, epics, or product initiatives for engineering handoff.

#### user-stories
**Path:** `skills/deliver/user-stories/SKILL.md`

Generates user stories with clear acceptance criteria from product requirements or feature descriptions. Use when breaking down features for sprint planning, writing tickets, or communicating requirements to engineering.

#### edge-cases
**Path:** `skills/deliver/edge-cases/SKILL.md`

Documents edge cases, error states, boundary conditions, and recovery paths for a feature. Use during specification to ensure comprehensive coverage, or during QA planning to identify test scenarios.

#### launch-checklist
**Path:** `skills/deliver/launch-checklist/SKILL.md`

Creates a comprehensive pre-launch checklist covering engineering, design, marketing, support, legal, and operations readiness. Use before releasing features, products, or major updates to ensure nothing is missed.

#### release-notes
**Path:** `skills/deliver/release-notes/SKILL.md`

Creates user-facing release notes that communicate new features, improvements, and fixes in clear, benefit-focused language. Use when shipping updates to communicate changes to users, customers, or stakeholders.

---

### Measure Phase

#### experiment-design
**Path:** `skills/measure/experiment-design/SKILL.md`

Designs an A/B test or experiment with clear hypothesis, variants, success metrics, sample size, and duration. Use when planning experiments to validate product changes or test hypotheses.

#### instrumentation-spec
**Path:** `skills/measure/instrumentation-spec/SKILL.md`

Specifies event tracking and analytics instrumentation requirements for a feature. Use when defining what data to collect, ensuring consistent tracking implementation, or documenting analytics requirements for engineering.

#### dashboard-requirements
**Path:** `skills/measure/dashboard-requirements/SKILL.md`

Specifies requirements for an analytics dashboard including metrics, visualizations, filters, and data sources. Use when requesting dashboards from data teams, defining KPI tracking, or documenting reporting needs.

#### experiment-results
**Path:** `skills/measure/experiment-results/SKILL.md`

Documents the results of a completed experiment or A/B test with statistical analysis, learnings, and recommendations. Use after experiments conclude to communicate findings, inform decisions, and build organizational knowledge.

---

### Iterate Phase

#### retrospective
**Path:** `skills/iterate/retrospective/SKILL.md`

Facilitates and documents a team retrospective capturing what went well, what to improve, and action items. Use at the end of sprints, projects, or milestones to reflect and improve team practices.

#### lessons-log
**Path:** `skills/iterate/lessons-log/SKILL.md`

Creates a structured lessons learned entry for organizational memory. Use after projects, incidents, or significant learnings to capture knowledge for future teams and initiatives.

#### refinement-notes
**Path:** `skills/iterate/refinement-notes/SKILL.md`

Documents backlog refinement session outcomes including stories refined, estimates, questions raised, and decisions made. Use during or after refinement to capture the results and share with absent team members.

#### pivot-decision
**Path:** `skills/iterate/pivot-decision/SKILL.md`

Documents a strategic pivot or persevere decision with the evidence, analysis, and rationale. Use when evaluating whether to change direction on a product, feature, or strategy based on market feedback.

---

## Workflow Bundles

### Triple Diamond
**Path:** `_bundles/triple-diamond.md`

Complete product development cycle covering all 6 phases: Discover, Define, Develop, Deliver, Measure, Iterate.

### Lean Startup
**Path:** `_bundles/lean-startup.md`

Build-Measure-Learn rapid iteration cycle for hypothesis validation and MVPs.

### Feature Kickoff
**Path:** `_bundles/feature-kickoff.md`

Quick-start workflow: problem-statement → hypothesis → prd → user-stories → launch-checklist.

---

## Commands

| Command | Description |
|---------|-------------|
| `/prd` | Create a Product Requirements Document |
| `/problem-statement` | Create a clear problem statement |
| `/hypothesis` | Define a testable hypothesis |
| `/user-stories` | Generate user stories with acceptance criteria |
| `/kickoff` | Run the Feature Kickoff workflow |

---

## Skill Structure

Each skill follows this structure:

```
skills/<phase>/<skill-name>/
├── SKILL.md              # Instructions
└── references/
    ├── TEMPLATE.md       # Output template
    └── EXAMPLE.md        # Completed example
```

---

## Usage

### Claude Code

```bash
# Use any skill
/prd
/problem-statement
/hypothesis
```

### GitHub Copilot / Cursor / Windsurf

Skills are auto-discovered via this AGENTS.md file.

### Manual

Read `skills/<phase>/<skill-name>/SKILL.md` for instructions, use `TEMPLATE.md` for output format.

---

## License

Apache-2.0

---

*Built by [Product on Purpose](https://github.com/product-on-purpose) for PMs who ship.*
