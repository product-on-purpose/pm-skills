# PM-Skills

> Open source Product Management skills for AI agents

This repository contains professional PM skills organized by the Triple Diamond framework plus foundation capabilities. Each skill helps AI agents produce high-quality PM artifacts.

## Skills

### Foundation Classification

#### lean-canvas
**Path:** `skills/foundation-lean-canvas/SKILL.md`

Generate a one-page lean canvas across nine interlocking blocks (problem, customer, UVP, solution, channels, revenue, cost, metrics, unfair advantage). Optional visual mode writes a self-contained HTML file rendering the canonical Maurya layout for sharing, printing, or presentation.

#### persona
**Path:** `skills/foundation-persona/SKILL.md`

Generates a context-appropriate persona for product or marketing workflows with explicit assumptions, confidence, and evidence trail. Use when shaping artifact perspective, stress-testing decisions, or framing PM/GTM decisions.

#### okr-writer
**Path:** `skills/foundation-okr-writer/SKILL.md`

Drafts, reviews, rewrites, and coaches outcome-based OKR sets. Supports five entry modes (Guided default, One-Shot via --oneshot, Sustained Coach, Audit Only, Rewrite). Diagnoses empowered-team context, refuses to fabricate baselines, refuses compensation coupling, and reframes feature-delivery KRs into outcome KRs. Member of the OKR Skills set (companion: `measure-okr-grader`).

#### meeting-agenda
**Path:** `skills/foundation-meeting-agenda/SKILL.md`

Produces an attendee-facing agenda with time-boxed topics, type tags (Discussion / Decision / Information / Working), owners, and attendee prep. Supports ten meeting-type variants (standup, planning, review, decision-making, brainstorm, 1-on-1, stakeholder-review, project-kickoff, working-session, exec-briefing). Member of the Meeting Skills Family.

#### meeting-brief
**Path:** `skills/foundation-meeting-brief/SKILL.md`

Produces a private strategic prep document with stakes, stakeholder reads, ranked desired outcomes, key messages, anticipated Q&A, risks, and specific asks. Member of the Meeting Skills Family. Distinct from meeting-agenda because the brief is private by default, not shared with attendees.

#### meeting-recap
**Path:** `skills/foundation-meeting-recap/SKILL.md`

Produces a topic-segmented post-meeting summary with decisions bold-flagged inline and actions captured per topic (plus consolidated action view). Auto-populates topic skeleton from a sibling meeting-agenda when available. Accepts transcripts from any tool. Member of the Meeting Skills Family.

#### meeting-synthesize
**Path:** `skills/foundation-meeting-synthesize/SKILL.md`

Cross-meeting archaeology skill. Consumes multiple meeting recaps over a period and surfaces patterns invisible in any single meeting: decision evolution, stakeholder position shifts, stalled threads, contradictions. Produces plain-text timeline, themes, prioritized follow-ups. Member of the Meeting Skills Family.

#### stakeholder-update
**Path:** `skills/foundation-stakeholder-update/SKILL.md`

Produces async communication to stakeholders from a meeting recap. Supports five channel variants (slack, teams, email, notion, exec-memo) and five audience variants (engineering, design, leadership, customer-facing, mixed). Surfaces primary CTA up front, logs technical-to-business translations, detects thread continuation. Member of the Meeting Skills Family.

> Meeting skills share a contract at `docs/reference/skill-families/meeting-skills-contract.md` governing frontmatter, file naming, go-mode behavior, and universal output requirements. Enforced by `scripts/validate-meeting-skills-family.sh`.

---

### Discover Phase

#### competitive-analysis
**Path:** `skills/discover-competitive-analysis/SKILL.md`

Creates a structured competitive analysis comparing features, positioning, and strategy across competitors. Use when entering a market, planning differentiation, or understanding the competitive landscape.

#### interview-synthesis
**Path:** `skills/discover-interview-synthesis/SKILL.md`

Synthesizes user research interviews into actionable insights, patterns, and recommendations. Use after conducting user interviews, customer calls, or usability sessions to extract and communicate findings.

#### stakeholder-summary
**Path:** `skills/discover-stakeholder-summary/SKILL.md`

Documents stakeholder needs, concerns, and influence for a project or initiative. Use when starting projects, managing complex stakeholder relationships, or ensuring alignment across organizational boundaries.

---

### Define Phase

#### hypothesis
**Path:** `skills/define-hypothesis/SKILL.md`

Defines a testable hypothesis with clear success metrics and validation approach. Use when forming assumptions to test, designing experiments, or aligning team on what success looks like.

#### jtbd-canvas
**Path:** `skills/define-jtbd-canvas/SKILL.md`

Creates a Jobs to be Done canvas capturing the functional, emotional, and social dimensions of a customer job. Use when deeply understanding customer motivations, designing for jobs, or reframing product positioning.

#### opportunity-tree
**Path:** `skills/define-opportunity-tree/SKILL.md`

Creates an opportunity solution tree mapping desired outcomes to opportunities and potential solutions. Use for outcome-driven product discovery, prioritization, or communicating product strategy.

#### problem-statement
**Path:** `skills/define-problem-statement/SKILL.md`

Creates a clear problem framing document with user impact, business context, and success criteria. Use when starting a new initiative, realigning a drifted project, or communicating up to leadership.

---

### Develop Phase

#### adr
**Path:** `skills/develop-adr/SKILL.md`

Creates an Architecture Decision Record following the Nygard format to document significant technical decisions, their context, and consequences. Use when making technical choices that affect system architecture, technology selection, or development patterns.

#### design-rationale
**Path:** `skills/develop-design-rationale/SKILL.md`

Documents the reasoning behind design decisions including alternatives considered, trade-offs evaluated, and principles applied. Use when making significant UX decisions, aligning with stakeholders on design direction, or preserving design context for future reference.

#### solution-brief
**Path:** `skills/develop-solution-brief/SKILL.md`

Creates a concise one-page solution overview that communicates the proposed approach, key decisions, and trade-offs. Use when pitching solutions to stakeholders, aligning teams on approach, or documenting solution intent before detailed specification.

#### spike-summary
**Path:** `skills/develop-spike-summary/SKILL.md`

Documents the results of a time-boxed technical or design exploration (spike). Use after completing a spike to capture learnings, findings, and recommendations for the team.

---

### Deliver Phase

#### acceptance-criteria
**Path:** `skills/deliver-acceptance-criteria/SKILL.md`

Generates structured Given/When/Then acceptance criteria for a user story or feature slice. Use when translating product requirements into testable scenarios that cover the happy path, edge cases, error states, and non-functional expectations for engineering handoff and QA.

#### edge-cases
**Path:** `skills/deliver-edge-cases/SKILL.md`

Documents edge cases, error states, boundary conditions, and recovery paths for a feature. Use during specification to ensure comprehensive coverage, or during QA planning to identify test scenarios.

#### launch-checklist
**Path:** `skills/deliver-launch-checklist/SKILL.md`

Creates a comprehensive pre-launch checklist covering engineering, design, marketing, support, legal, and operations readiness. Use before releasing features, products, or major updates to ensure nothing is missed.

#### prd
**Path:** `skills/deliver-prd/SKILL.md`

Creates a comprehensive Product Requirements Document that aligns stakeholders on what to build, why, and how success will be measured. Use when specifying features, epics, or product initiatives for engineering handoff.

#### release-notes
**Path:** `skills/deliver-release-notes/SKILL.md`

Creates user-facing release notes that communicate new features, improvements, and fixes in clear, benefit-focused language. Use when shipping updates to communicate changes to users, customers, or stakeholders.

#### user-stories
**Path:** `skills/deliver-user-stories/SKILL.md`

Generates user stories with clear acceptance criteria from product requirements or feature descriptions. Use when breaking down features for sprint planning, writing tickets, or communicating requirements to engineering.

---

### Measure Phase

#### dashboard-requirements
**Path:** `skills/measure-dashboard-requirements/SKILL.md`

Specifies requirements for an analytics dashboard including metrics, visualizations, filters, and data sources. Use when requesting dashboards from data teams, defining KPI tracking, or documenting reporting needs.

#### experiment-design
**Path:** `skills/measure-experiment-design/SKILL.md`

Designs an A/B test or experiment with clear hypothesis, variants, success metrics, sample size, and duration. Use when planning experiments to validate product changes or test hypotheses.

#### experiment-results
**Path:** `skills/measure-experiment-results/SKILL.md`

Documents the results of a completed experiment or A/B test with statistical analysis, learnings, and recommendations. Use after experiments conclude to communicate findings, inform decisions, and build organizational knowledge.

#### instrumentation-spec
**Path:** `skills/measure-instrumentation-spec/SKILL.md`

Specifies event tracking and analytics instrumentation requirements for a feature. Use when defining what data to collect, ensuring consistent tracking implementation, or documenting analytics requirements for engineering.

#### okr-grader
**Path:** `skills/measure-okr-grader/SKILL.md`

Scores completed OKR sets at cycle close with KR-level scoring, committed-vs-aspirational interpretation, evidence quality assessment, learning synthesis, and next-cycle recommendations. Refuses to retroactively change targets, average away failed guardrails, treat 0.7 as success for committed or compliance KRs, equate effort with impact, or use scores as individual performance ratings. Hands off learnings to /lessons-log, team-process work to /retrospective, assumption tests to /hypothesis, measurement gaps to /dashboard-requirements or /instrumentation-spec, and next-cycle drafting to /okr-writer. Member of the OKR Skills set (companion: `foundation-okr-writer`).

---

### Iterate Phase

#### lessons-log
**Path:** `skills/iterate-lessons-log/SKILL.md`

Creates a structured lessons learned entry for organizational memory. Use after projects, incidents, or significant learnings to capture knowledge for future teams and initiatives.

#### pivot-decision
**Path:** `skills/iterate-pivot-decision/SKILL.md`

Documents a strategic pivot or persevere decision with the evidence, analysis, and rationale. Use when evaluating whether to change direction on a product, feature, or strategy based on market feedback.

#### refinement-notes
**Path:** `skills/iterate-refinement-notes/SKILL.md`

Documents backlog refinement session outcomes including stories refined, estimates, questions raised, and decisions made. Use during or after refinement to capture the results and share with absent team members.

#### retrospective
**Path:** `skills/iterate-retrospective/SKILL.md`

Facilitates and documents a team retrospective capturing what went well, what to improve, and action items. Use at the end of sprints, projects, or milestones to reflect and improve team practices.

---

### Utility Skills

#### pm-skill-builder
**Path:** `skills/utility-pm-skill-builder/SKILL.md`

Guides contributors from a PM skill idea to a complete Skill Implementation Packet with gap analysis, classification, and draft files. Use when creating new domain, foundation, or utility skills for the pm-skills library.

---

#### pm-skill-validate
**Path:** `skills/utility-pm-skill-validate/SKILL.md`

Audits an existing pm-skills skill against structural conventions and quality criteria. Produces a structured validation report with severity-graded findings and actionable recommendations. Use when checking whether a skill meets repo standards before shipping or after making changes.

---

#### pm-skill-iterate
**Path:** `skills/utility-pm-skill-iterate/SKILL.md`

Applies targeted improvements to an existing pm-skills skill based on feedback, validation reports, or convention changes. Previews proposed changes, writes on confirmation, and suggests a version bump. Use when improving a skill after validation or feedback.

---

#### mermaid-diagrams
**Path:** `skills/utility-mermaid-diagrams/SKILL.md`

Teaches PMs to create syntactically valid mermaid diagrams by selecting the right diagram type for their communication need. Covers 15 diagram types with PM-relevant examples, a dual-lens navigation system (type catalog and use-case guide), and a dedicated syntax validity reference. Use when creating, debugging, or reviewing mermaid diagrams in product documents.

---

#### slideshow-creator
**Path:** `skills/utility-slideshow-creator/SKILL.md`

Generates professional presentations from a JSON deck specification using 18 slide types with dark/light variants. Zero design decisions at generation time . Claude selects slide types and fills content slots; all visual properties are pre-decided by the theme. Use when creating slide decks, stakeholder updates, or product review presentations.

---

#### update-pm-skills
**Path:** `skills/utility-update-pm-skills/SKILL.md`

Checks for newer pm-skills releases, compares local vs. latest version, previews what would change, and updates local files after user confirmation. Generates a structured update report documenting changed files, new capabilities, and the value delta between versions. Use when you want to bring a local pm-skills installation up to date.

---

#### pm-critic
**Path:** `skills/utility-pm-critic/SKILL.md`

Cross-client dispatch wrapper for the `pm-critic` sub-agent (v2.16.0+). Runs adversarial review on a PM artifact and returns findings graded P0/P1/P2/P3 with concrete fix suggestions per finding, plus a layered Status Summary section and machine-readable Status YAML block per master plan D26. Dispatches natively on Claude Code with the pm-skills plugin (invokes `@agent-pm-critic`); on non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) reads `agents/pm-critic.md` and executes the system prompt inline. Use to review PRDs, OKR sets, personas, lean canvases, meeting recaps, interview syntheses, edge case catalogs, or other PM artifacts.

---

#### pm-skill-auditor
**Path:** `skills/utility-pm-skill-auditor/SKILL.md`

Cross-client dispatch wrapper for the `pm-skill-auditor` sub-agent (v2.16.0+). Runs a repo-wide cross-cutting governance audit: invokes the full enforcing validator suite (via `scripts/pre-tag-validate.{sh,ps1}` as canonical orchestration entry point), aggregates results, runs cross-cutting checks no single validator catches alone (skill-without-command, sample gaps, family contract orphans, etc.), re-derives aggregate counters against declared values, and returns a layered audit report (full findings + Status Summary prose + Status YAML envelope per master plan D26). Dispatches natively on Claude Code (invokes `@agent-pm-skill-auditor`); on non-Claude clients reads `agents/pm-skill-auditor.md` and executes inline. Use pre-release for governance check or for repo-health audits.

---

#### pm-changelog-curator
**Path:** `skills/utility-pm-changelog-curator/SKILL.md`

Cross-client dispatch wrapper for the `pm-changelog-curator` sub-agent (v2.16.0+). Drafts CHANGELOG entries from git log between two tags. Applies CLAUDE.md hygiene rules (no internal-notes references, no em-dashes, no Claude attribution trailers, public paths only). Returns a layered draft (full CHANGELOG draft with hidden justification comments + Status Summary prose + Status YAML envelope per master plan D26). Dispatches natively on Claude Code (invokes `@agent-pm-changelog-curator`); on non-Claude clients reads `agents/pm-changelog-curator.md` and executes inline. Refuses on dirty working tree unless `--committed-only` passed. Use during release prep (gate G2 of the release runbook).

---

#### pm-release-conductor
**Path:** `skills/utility-pm-release-conductor/SKILL.md`

Cross-client dispatch wrapper for the `pm-release-conductor` sub-agent (v2.16.0+). Walks the guided release runbook with 6 explicit gates (G0 Pre-tag readiness, G1 Adversarial review status, G2 Version bump + CHANGELOG prep, G2.5 Commit + re-verify, G3 Tag + push, G4 Post-tag hygiene). Chains to `pm-skill-auditor` at G0 + G2.5 and to `pm-changelog-curator` at G2 on Claude Code (native sub-agent chain); on non-Claude clients uses the reference-and-execute-inline pattern to inline auditor + curator behaviors at the relevant gates. Refuses to advance past failed gates; tags only the G2.5-captured SHA per master plan D22 (prevents broken-tag bug). G4 P0 sub-checks block "Release complete" output per D23. No bypass possible (--skip-gates removed per D24). **Status: dispatch skill CONDITIONAL on Phase 2 GATE C sub-spike outcome.** If GATE C fails, conductor stays Claude-Code-only (D-revised path).

---

### Tool Classification

The `tool` classification represents named external methodologies composed of multiple skills working as a system. The first inhabitants are the Foundation Sprint and Design Sprint families plus a standalone decision tool.

#### tool-note-and-vote
**Path:** `skills/tool-note-and-vote/SKILL.md`

Structured group-decision mechanic that captures silent ideation, voting summaries, and Decider sign-off in a single bundled artifact. Use when a small team needs to make a fast decision with diverse input, when groupthink is a risk, or when a workshop moment demands silent contribution before discussion. Applicable to Foundation Sprint, Design Sprint, and any participatory decision context.

---

#### Foundation Sprint Family

The 7 `tool-foundation-sprint-*` skills implement Knapp and Zeratsky's two-day Foundation Sprint workshop. Family contract: `docs/reference/skill-families/foundation-sprint-skills-contract.md`. Workflow: `_workflows/foundation-sprint.md`.

##### tool-foundation-sprint-readiness
**Path:** `skills/tool-foundation-sprint-readiness/SKILL.md`

Pre-sprint diagnostic that determines whether a team should run a Foundation Sprint now, postpone it, or do prerequisite work first. Produces a Go / Conditional Go / Wait verdict with diagnosis, recommended preconditions, attendee list, and pre-sprint activities. Use when a team is considering starting a Foundation Sprint.

---

##### tool-foundation-sprint-brief
**Path:** `skills/tool-foundation-sprint-brief/SKILL.md`

Pre-sprint brief that locks scope, the decision the sprint must unlock, team and role assignments, logistics, inputs to bring, and success criteria before Day 1 of a Foundation Sprint. Use after the readiness verdict is Go and before the sprint begins.

---

##### tool-foundation-sprint-basics
**Path:** `skills/tool-foundation-sprint-basics/SKILL.md`

Day 1 morning move of a Foundation Sprint. Forces explicit team choices on target customer, important problem, team advantage, and competitors and alternatives. Produces a single coherent strategic frame that becomes the input to Day 1 afternoon Differentiation.

---

##### tool-foundation-sprint-differentiation
**Path:** `skills/tool-foundation-sprint-differentiation/SKILL.md`

Day 1 afternoon move of a Foundation Sprint. Converts the morning Basics frame into a defensible strategic position by scoring differentiator candidates, choosing two committed differentiators, plotting alternatives on a 2x2 chart, writing decision principles, and producing a one-page Mini Manifesto.

---

##### tool-foundation-sprint-approach-options
**Path:** `skills/tool-foundation-sprint-approach-options/SKILL.md`

Day 2 morning move of a Foundation Sprint. Forces generation of 3 to 7 candidate approaches as one-page summaries before the team converges on a top bet. Enforces a minimum of 3 approaches to prevent first-idea anchoring.

---

##### tool-foundation-sprint-magic-lenses
**Path:** `skills/tool-foundation-sprint-magic-lenses/SKILL.md`

Day 2 afternoon move of a Foundation Sprint. Evaluates the candidate approach set through multiple lenses (4 classic plus at least 1 custom) to surface trade-offs, identify consistent winners and contradictions, and produce a top bet plus a backup plan.

---

##### tool-foundation-sprint-founding-hypothesis
**Path:** `skills/tool-foundation-sprint-founding-hypothesis/SKILL.md`

Day 2 end capstone move of a Foundation Sprint. Compresses the sprint's full strategic frame into a single canonical sentence (the Founding Hypothesis) plus an assumption scorecard, why-we-believe, what-could-prove-us-wrong, and recommended next validation step.

#### Design Sprint Family

The 7 `tool-design-sprint-*` skills implement Knapp, Zeratsky, and Kowitz's five-day Design Sprint workshop. Family contract: `docs/reference/skill-families/design-sprint-skills-contract.md`. Workflow: `_workflows/design-sprint.md`. End-to-end FS-to-DS workflow: `_workflows/foundation-to-design.md`. User guide: `docs/guides/using-design-sprint.md`. Concept doc: `docs/concepts/design-sprint.md`.

##### tool-design-sprint-readiness
**Path:** `skills/tool-design-sprint-readiness/SKILL.md`

Pre-sprint diagnostic that determines whether a team should run a Design Sprint now, postpone it, or do prerequisite work first. Produces a Go / Conditional Go / Wait verdict with diagnosis, recommended preconditions, attendee list, customer recruiting plan, and pre-sprint activities. Use when a team is considering starting a Design Sprint and wants a fast yes/no diagnosis before committing five days of team time and customer recruiting cost.

##### tool-design-sprint-brief
**Path:** `skills/tool-design-sprint-brief/SKILL.md`

Pre-sprint brief that locks challenge, sprint questions, team and role assignments, customer recruiting plan, prototype medium, interview format, logistics, and success criteria before Monday of a Design Sprint. Use after the readiness verdict is Go and before Monday begins. Produces a two-page artifact the team and Decider sign off on as the contract for the next five days.

##### tool-design-sprint-map-and-target
**Path:** `skills/tool-design-sprint-map-and-target/SKILL.md`

Day 1 (Monday) move of a Design Sprint. Produces the bundled Monday artifact: long-term goal, sprint questions (3-7 testable risks), customer or system map (5-15 step flow), expert interview notes, HMW (How Might We) cluster board, and the Decider's chosen target moment. Use Day 1 morning and afternoon after the sprint brief is locked. Sets the design target for Tuesday's sketches and Wednesday's storyboard.

##### tool-design-sprint-sketch
**Path:** `skills/tool-design-sprint-sketch/SKILL.md`

Day 2 (Tuesday) move of a Design Sprint that structures lightning demos and the four-step independent solution sketch protocol (Notes, Ideas, Crazy 8s, Solution Sketch). Each team member produces one solution sketch individually; the skill orchestrates the day but does not author the sketches themselves. Use Tuesday morning after Monday's target moment is locked.

##### tool-design-sprint-decide-and-storyboard
**Path:** `skills/tool-design-sprint-decide-and-storyboard/SKILL.md`

Day 3 (Wednesday) move of a Design Sprint that runs the art museum layout, heat map, speed critique, straw poll, Decider supervote, rumble-vs-all-in-one decision, and the storyboard that drives Thursday's prototype build. The most decision-heavy day of the sprint. Use Wednesday morning and afternoon after Tuesday's sketches are collected and attribution-stripped.

##### tool-design-sprint-prototype-plan
**Path:** `skills/tool-design-sprint-prototype-plan/SKILL.md`

Day 4 (Thursday) move of a Design Sprint that produces the planning artifact for the day. Output covers the prototype role plan (Maker, Stitcher, Writer, Asset Collector, Interviewer), prototype brief, canonical Five-Act Interview script (Welcome, Context, Intro, Tasks, Debrief), trial-run checklist, and Friday participant confirmation tracker. The actual prototype build is craft work outside the skill's AI invocation surface.

##### tool-design-sprint-test-and-score
**Path:** `skills/tool-design-sprint-test-and-score/SKILL.md`

Day 5 (Friday) sprint-closing move of a Design Sprint that produces the bundled Friday artifact covering per-customer interview observations, best quotes, scorecard grid (sprint questions by customers), observed patterns, hot takes from each team member, and the Decider summary (build, iterate, pivot, or stop, plus highest-confidence learning, most important revision, and next artifact). Use Friday after Thursday's prototype passes trial run and during/after the 5 customer interviews. The sprint's payoff artifact.

---

## Workflows

| Workflow | Description |
|----------|-------------|
| [Triple Diamond](_workflows/triple-diamond.md) | Complete product development cycle |
| [Lean Startup](_workflows/lean-startup.md) | Build-Measure-Learn rapid iteration |
| [Feature Kickoff](_workflows/feature-kickoff.md) | Quick-start workflow for features |
| [Customer Discovery](_workflows/customer-discovery.md) | Transform raw research into a validated problem |
| [Sprint Planning](_workflows/sprint-planning.md) | Prepare sprint-ready stories from a backlog |
| [Product Strategy](_workflows/product-strategy.md) | Frame a major strategic initiative |
| [Post-Launch Learning](_workflows/post-launch-learning.md) | Measure results and capture learnings after launch |
| [Stakeholder Alignment](_workflows/stakeholder-alignment.md) | Build a case for leadership buy-in |
| [Technical Discovery](_workflows/technical-discovery.md) | Evaluate technical feasibility and architecture |

Workflow links are repo-relative within this repository.

---

## Commands

| Command | Description |
|---------|-------------|
| `/acceptance-criteria` | Generate acceptance criteria with Given/When/Then |
| `/adr` | Create an Architecture Decision Record |
| `/competitive-analysis` | Create a structured competitive analysis |
| `/dashboard-requirements` | Specify requirements for an analytics dashboard |
| `/design-rationale` | Document the reasoning behind design decisions |
| `/edge-cases` | Document edge cases and error states for a feature |
| `/experiment-design` | Design an A/B test or experiment |
| `/experiment-results` | Document experiment results and learnings |
| `/hypothesis` | Define a testable hypothesis with success metrics |
| `/instrumentation-spec` | Specify event tracking and analytics instrumentation |
| `/interview-synthesis` | Synthesize user research interviews into insights |
| `/jtbd-canvas` | Create a Jobs to be Done canvas |
| `/workflow-feature-kickoff` | Run the Feature Kickoff workflow (problem → hypothesis → PRD → stories) |
| `/workflow-customer-discovery` | Run the Customer Discovery workflow |
| `/workflow-sprint-planning` | Run the Sprint Planning workflow |
| `/workflow-product-strategy` | Run the Product Strategy workflow |
| `/workflow-post-launch-learning` | Run the Post-Launch Learning workflow |
| `/workflow-stakeholder-alignment` | Run the Stakeholder Alignment workflow |
| `/workflow-technical-discovery` | Run the Technical Discovery workflow |
| `/launch-checklist` | Create a comprehensive pre-launch checklist |
| `/lean-canvas` | Generate a one-page lean canvas with optional HTML output |
| `/meeting-agenda` | Generate an attendee-facing meeting agenda with time-boxed topics, type tags, owners, and attendee prep |
| `/meeting-brief` | Generate a private strategic preparation document for a meeting (stakeholder reads, ranked outcomes, key messages, Q&A) |
| `/meeting-recap` | Generate a topic-segmented post-meeting recap with decisions highlighted and actions captured inline |
| `/meeting-synthesize` | Generate a cross-meeting synthesis surfacing patterns, trajectories, stalled threads, and contradictions |
| `/mermaid-diagrams` | Create syntactically valid mermaid diagrams for product documentation |
| `/stakeholder-update` | Generate an async stakeholder update from a meeting recap, tailored by channel and audience |
| `/lessons-log` | Create a structured lessons learned entry |
| `/okr-grader` | Score completed OKRs at cycle close with evidence-based interpretation and learning synthesis |
| `/okr-writer` | Draft, review, rewrite, or coach OKRs with outcome-based KRs and quality audit |
| `/opportunity-tree` | Create an opportunity solution tree |
| `/persona` | Generate a product or marketing persona |
| `/pivot-decision` | Document a pivot or persevere decision |
| `/pm-skill-builder` | Create a new PM skill with gap analysis and a Skill Implementation Packet |
| `/pm-skill-iterate` | Apply targeted improvements to a skill from feedback or validation reports |
| `/pm-skill-validate` | Audit a skill against structural conventions and quality criteria |
| `/prd` | Create a Product Requirements Document |
| `/problem-statement` | Create a clear problem statement with success criteria |
| `/refinement-notes` | Document backlog refinement session outcomes |
| `/release-notes` | Create user-facing release notes |
| `/retrospective` | Facilitate and document a team retrospective |
| `/slideshow-creator` | Generate professional presentations from JSON deck specs |
| `/update-pm-skills` | Check for updates and update local pm-skills installation |
| `/solution-brief` | Create a one-page solution overview |
| `/spike-summary` | Document the results of a technical or design spike |
| `/stakeholder-summary` | Document stakeholder needs and influence |
| `/user-stories` | Generate user stories with acceptance criteria |
| `/workflow-foundation-sprint` | Run the Foundation Sprint workflow (2-day strategic-alignment arc producing a Founding Hypothesis) |
| `/workflow-design-sprint` | Run the Design Sprint workflow (5-day prototype-and-test arc producing a Decider's build/iterate/pivot/stop call) |
| `/workflow-foundation-to-design` | Run the end-to-end Foundation Sprint + Design Sprint workflow with narrative handoff |
| `/tool-note-and-vote` | Run a structured group decision (silent ideation + heat-map voting + Decider supervote) |
| `/tool-foundation-sprint-readiness` | Foundation Sprint: pre-sprint Go / Conditional Go / Wait diagnostic |
| `/tool-foundation-sprint-brief` | Foundation Sprint: one-page scope contract before Day 1 |
| `/tool-foundation-sprint-basics` | Foundation Sprint Day 1 AM: target customer + important problem + team advantage + competitor map |
| `/tool-foundation-sprint-differentiation` | Foundation Sprint Day 1 PM: scored differentiators + 2x2 chart + decision principles + Mini Manifesto |
| `/tool-foundation-sprint-approach-options` | Foundation Sprint Day 2 AM: 3-7 candidate approaches as one-page summaries |
| `/tool-foundation-sprint-magic-lenses` | Foundation Sprint Day 2 PM: top bet + backup via 4 classic + 1 custom lens evaluation |
| `/tool-foundation-sprint-founding-hypothesis` | Foundation Sprint Day 2 end: canonical hypothesis sentence + assumption scorecard + recommended next test |
| `/tool-design-sprint-readiness` | Design Sprint: pre-sprint Go / Conditional Go / Wait diagnostic + customer recruiting plan |
| `/tool-design-sprint-brief` | Design Sprint: two-page scope contract before Monday |
| `/tool-design-sprint-map-and-target` | Design Sprint Monday: long-term goal + sprint questions + customer map + HMW board + target moment |
| `/tool-design-sprint-sketch` | Design Sprint Tuesday: lightning demos + 4 independent solution sketches per team member |
| `/tool-design-sprint-decide-and-storyboard` | Design Sprint Wednesday: heat map + Decider supervote + 5-15 panel storyboard |
| `/tool-design-sprint-prototype-plan` | Design Sprint Thursday AM: 5-role plan + Five-Act interview script + trial-run checklist |
| `/tool-design-sprint-test-and-score` | Design Sprint Friday: 5 customer interviews + scorecard + Decider's build / iterate / pivot / stop call |
| `/pm-critic` | Run adversarial review on a PM artifact via the pm-critic sub-agent |
| `/pm-audit-repo` | Run a repo-wide cross-cutting governance audit via the pm-skill-auditor sub-agent |
| `/pm-draft-changelog` | Draft CHANGELOG entries from git log via the pm-changelog-curator sub-agent |
| `/pm-release` | Walk the guided release runbook (6 gates) via the pm-release-conductor sub-agent |

---

## Sub-Agents

pm-skills v2.16.0 introduces sub-agents as a new runtime-component class. Sub-agents are Claude Code plugin features that the intent classifier matches against `description:` frontmatter to delegate work; each runs in its own context window with an isolated tool budget.

Four sub-agents ship in v2.16.0:

- `pm-critic` - adversarial reviewer for PM artifacts (proactive trigger on Claude Code)
- `pm-skill-auditor` - repo-level cross-cutting governance audits
- `pm-changelog-curator` - CHANGELOG drafter from git log
- `pm-release-conductor` - guided release runbook with 6 gates (G0, G1, G2, G2.5, G3, G4)

The canonical sub-agents catalog with full audience, trigger, lifetime, tool surface, and composition data lives at [`docs/reference/runtime-components.md`](https://github.com/product-on-purpose/pm-skills/blob/main/docs/reference/runtime-components.md). Sub-agent definition files live at `agents/{name}.md`, the fixed path Claude Code's plugin runtime auto-discovers (renamed from `subagents/` in v2.17.0 W2).

### Cross-client compatibility

Sub-agents are a Claude Code plugin feature. Non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI) access sub-agent intent via dispatch skills at `skills/utility-pm-{role}/`. Dispatch skills detect runtime and dispatch appropriately: native sub-agent on Claude Code, or "read agent definition and execute inline" on other clients. codex-rescue is an optional shortcut for users with both Claude Code and Codex CLI; it is NOT a baseline requirement.

All 4 dispatch skills shipped in v2.16.0 with Codex CLI VALIDATED 2026-05-17 (GATE B + C PASS). Cursor / Windsurf / Copilot CLI / Gemini CLI status is EXPERIMENTAL pending v2.17 cross-client expansion. See the canonical [Sub-Agent Compatibility Matrix](https://github.com/product-on-purpose/pm-skills/blob/main/docs/reference/sub-agent-compatibility.md) for per-sub-agent + per-client status, safe-usage guidance, and how-to-validate-a-new-client maintainer guide. Mechanism details at [`docs/reference/runtime-components.md#cross-client-compatibility`](https://github.com/product-on-purpose/pm-skills/blob/main/docs/reference/runtime-components.md#cross-client-compatibility).

---

## License

Apache-2.0

---

*Built by [Product on Purpose](https://github.com/product-on-purpose) for PMs who ship.*
