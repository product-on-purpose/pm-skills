# Topic 3 — Exploration: PM Skill Builder Skill

> **Date**: 2026-03-21
> **Author**: Claude Opus 4.6
> **Status**: Draft — exploration document
> **Related efforts**: M-11 (plugin packaging), skill_utility-skill-builder
> **Prior art**: `_NOTES/efforts/active/skill_utility-skill-builder/approach_opus-4.6.md` (comprehensive analysis)

---

## Table of Contents

1. [Summary](#1-summary)
2. [Problem Deep-Dive](#2-problem-deep-dive)
3. [Prior Analysis Review](#3-prior-analysis-review)
4. [Web-Based Execution Feasibility](#4-web-based-execution-feasibility)
5. [CI/CD Automation Needs](#5-cicd-automation-needs)
6. [Best Practices & Prior Art](#6-best-practices--prior-art)
7. [Approaches & Tradeoffs](#7-approaches--tradeoffs)
8. [Recommendations & 80/20 Value](#8-recommendations--8020-value)
9. [Questions for Clarification](#9-questions-for-clarification)
10. [Creative Ideas](#10-creative-ideas)
11. [Assumptions](#11-assumptions)
12. [Feasibility Assessment](#12-feasibility-assessment)
13. [Cautions & Gotchas](#13-cautions--gotchas)
14. [What You Might Be Missing](#14-what-you-might-be-missing)
15. [Value Evaluation](#15-value-evaluation)
16. [Next Steps](#16-next-steps)
17. [Sources](#17-sources)

---

## 1. Summary

The pm-skills library currently contains 25 PM skills across 8 categories (6 Triple Diamond phases + foundation + utility). Creating a new skill requires understanding the 3-file pattern, frontmatter schema, naming conventions, command creation, AGENTS.md registration, and MCP sync requirements. This knowledge is scattered across the authoring guide, frontmatter schema, CONTRIBUTING.md, and tribal knowledge.

**A pm-skill-builder would consolidate this into an interactive workflow** that guides a contributor from "I have an idea for a PM skill" to "here's a complete, validated implementation packet ready for PR."

The prior analysis (`approach_opus-4.6.md`) already established the core design direction: **two skills — `/pm-skill-builder` (repo-specific utility) and `/skill-builder` (PM-oriented foundation)**, with the pm-skill-builder shipping first. This exploration builds on that analysis to address the additional questions: web-based execution, CI/CD automation, community publishing, and cross-tool compatibility.

---

## 2. Problem Deep-Dive

### 2.1 The Skill Creation Barrier

Today, creating a new pm-skill requires:

1. **Know the structure**: `skills/{phase-name}/SKILL.md` + `references/TEMPLATE.md` + `references/EXAMPLE.md`
2. **Know the frontmatter schema**: name, description, classification, version, updated, license, metadata (category, frameworks, author)
3. **Know the naming rules**: phase-prefixed, kebab-case, 1-64 chars, matching directory name
4. **Know the classification system**: domain (6 phases) / foundation / utility, plus category
5. **Know the command pattern**: `commands/{skill-name}.md` with frontmatter
6. **Know the validation**: frontmatter lint, command validation, AGENTS.md consistency
7. **Know the MCP implications**: tool naming (`pm_{skill}`), sync validation
8. **Know the quality bar**: existing skills as exemplars, authoring guide standards

This is 8 knowledge domains, spread across 6+ reference files. A new contributor faces a steep onboarding curve.

### 2.2 The Iteration Barrier

Even for existing maintainers, updating a skill requires:
1. Check current conventions (they evolve)
2. Verify frontmatter against the latest schema
3. Ensure AGENTS.md is updated
4. Run validation scripts
5. Check MCP sync implications
6. Update CHANGELOG

The pm-skill-builder should handle maintenance tasks, not just creation.

### 2.3 The Community Contribution Barrier

If pm-skills wants community contributions (the prompt mentions "allow a larger community to publish skills"), the barrier is even higher:
1. Contributors need to understand the full repo structure
2. PRs must pass validation
3. Quality must match existing skills
4. Naming must avoid collisions
5. MCP sync must be considered
6. Changelog and release notes must be updated

### 2.4 The Cross-Tool Deployment Challenge

The prompt asks: "Can web-based Claude Code and Codex execute the full deployment lifecycle?"

This is about whether the skill creation workflow can be executed from:
- **Claude Code CLI** (terminal) — full capability
- **Claude Code web** (claude.ai with projects) — limited to file operations
- **Codex** (autonomous tasks) — sandboxed, no interactive input
- **Gemini CLI** — skill loading but no commands
- **Cursor/Copilot** — skill loading via AGENTS.md

---

## 3. Prior Analysis Review

### 3.1 What's Already Decided

The `approach_opus-4.6.md` document (reviewed and agreed by both Opus 4.6 and GPT-5.4) established:

| Decision | Resolution |
|----------|-----------|
| Import vs. customize upstream skill-builder | **Customize** — don't import |
| One skill or two | **Two** — `/pm-skill-builder` (utility) + `/skill-builder` (foundation) |
| Primary gate | **Repo-fit assessment** > zone assessment |
| K/P/C/W zones | **Demoted** — lightweight writing lens, not primary framework |
| Output artifact | **Skill Implementation Packet** = the TEMPLATE.md |
| Exemplars | **Shipped skills** (deliver-prd, discover-competitive-analysis, etc.) |
| File structure | **Standard 3-file pattern** (SKILL.md + TEMPLATE.md + EXAMPLE.md) |
| Ship order | **pm-skill-builder first**, then skill-builder |
| Revision mode | **Planned** for v1 or v1.1 |

### 3.2 What's Still Open

| Question | Status |
|----------|--------|
| Frontmatter name: `skill-builder` vs `utility-skill-builder` | Needs resolution (must match dir name) |
| Bundle handling in v1: recommend bundles or just identify? | Needs decision |
| Revision/audit modes: v1 or v1.1? | Needs decision |
| Web-based and Codex execution | Not yet analyzed |
| CI/CD automation for skill deployment | Not yet designed |
| Community contribution workflow | Not yet designed |
| MCP alignment automation | Not yet designed |

---

## 4. Web-Based Execution Feasibility

### 4.1 Platform Capability Matrix for Skill Building

| Capability | Claude Code CLI | Claude Code Web | Codex | Gemini CLI | Cursor |
|-----------|----------------|----------------|-------|-----------|--------|
| Read repo files | ✅ | ✅ (project files) | ✅ (cloned repo) | ✅ | ✅ |
| Write new files | ✅ | ✅ (project files) | ✅ (sandboxed) | ✅ | ✅ |
| Run validation scripts | ✅ | ❌ | ✅ (sandboxed) | ✅ | ✅ |
| Interactive user input | ✅ | ✅ | ❌ (autonomous) | ✅ | ✅ |
| Git operations | ✅ | ❌ | ✅ (sandboxed) | ✅ | ✅ |
| Create PR | ✅ | ❌ | ✅ | ✅ | ✅ |
| Invoke slash commands | ✅ | ❌ | ❌ | ❌ | ⚠️ |
| Load skills | ✅ | ⚠️ (manual) | ✅ | ✅ | ✅ |
| Run hooks | ✅ | ❌ | ❌ | ❌ | ❌ |

### 4.2 Deployment Lifecycle by Platform

**Full lifecycle**: scaffold → author → validate → test → PR → review → merge → release → changelog → sample library → MCP sync

| Phase | Claude Code CLI | Claude Code Web | Codex |
|-------|----------------|----------------|-------|
| **Scaffold** (create directories + files) | ✅ | ✅ | ✅ |
| **Author** (write SKILL.md, TEMPLATE.md, EXAMPLE.md) | ✅ | ✅ | ✅ (autonomous) |
| **Validate** (run lint scripts) | ✅ | ❌ (CI does it) | ✅ |
| **Test** (run skill with test scenarios) | ✅ | ⚠️ (manual) | ⚠️ (limited) |
| **PR** (create pull request) | ✅ | ❌ | ✅ |
| **Review** (code review feedback) | ✅ | ✅ (manual) | ❌ |
| **Merge** (merge PR) | ✅ | ❌ | ✅ |
| **Release** (tag + GitHub release) | ✅ | ❌ | ❌ |
| **Changelog** (update CHANGELOG.md) | ✅ | ✅ | ✅ |
| **Sample library** (generate sample output) | ✅ | ✅ | ✅ |
| **MCP sync** (update pm-skills-mcp) | ✅ | ❌ | ⚠️ (separate repo) |

### 4.3 Feasibility Verdict

**Claude Code CLI**: Can execute the **full lifecycle** — this is the primary platform.

**Claude Code Web**: Can execute **scaffold + author + changelog** — useful for initial skill design and content creation. Validation, PR, and release must happen elsewhere (CI or CLI).

**Codex**: Can execute **scaffold + author + validate + PR** — excellent for autonomous skill creation from a spec. Codex can be given a Skill Implementation Packet and produce all files autonomously. However, it can't do interactive design sessions (no user input during execution).

**Recommended workflow**: Use Claude Code Web or CLI for the interactive design phase (gap analysis, why gate, classification). Use Codex for autonomous file generation from a completed spec. Use CI for validation and release.

---

## 5. CI/CD Automation Needs

### 5.1 Existing CI/CD

| Workflow | File | Purpose |
|----------|------|---------|
| `validation.yml` | `.github/workflows/validation.yml` | CONTEXT.md currency check |
| `validate-mcp-sync.yml` | `.github/workflows/validate-mcp-sync.yml` | Cross-repo MCP parity |

### 5.2 New CI/CD Workflows Needed

#### A. Skill Validation Workflow (`validate-skills.yml`)

**Trigger**: PR that touches `skills/` or `commands/`
**Purpose**: Ensure new/modified skills meet all conventions

```yaml
name: Validate Skills
on:
  pull_request:
    paths:
      - 'skills/**'
      - 'commands/**'

jobs:
  validate:
    steps:
      - name: Frontmatter lint
        run: ./scripts/lint-skills-frontmatter.ps1

      - name: Command validation
        run: ./scripts/validate-commands.ps1

      - name: AGENTS.md consistency
        run: ./scripts/validate-agents-md.js  # NEW

      - name: Naming convention check
        run: ./scripts/validate-skill-naming.js  # NEW

      - name: Skill completeness check
        run: ./scripts/validate-skill-completeness.js  # NEW
        # Checks: SKILL.md exists, TEMPLATE.md exists, EXAMPLE.md exists,
        # frontmatter has all required fields, command file exists

      - name: Template section check
        run: ./scripts/validate-template-sections.js  # NEW
        # Checks: all template sections have guidance comments

      - name: MCP sync advisory
        run: ./scripts/check-mcp-impact.js  # NEW
        # Advisory: flags if new skill needs pm-skills-mcp update
```

#### B. Release Automation Workflow (`release.yml`)

**Trigger**: Git tag push (`v*.*.*`)
**Purpose**: Automate release process

```yaml
name: Release
on:
  push:
    tags: ['v*.*.*']

jobs:
  release:
    steps:
      - name: Validate tag matches plugin.json version
        run: ./scripts/validate-version-match.js

      - name: Generate release notes
        run: ./scripts/generate-release-notes.js

      - name: Create GitHub release
        run: gh release create $TAG --notes-file release-notes.md

      - name: Trigger MCP sync
        run: ./scripts/trigger-mcp-sync.js  # Dispatches workflow in pm-skills-mcp

      - name: Update sample library
        run: ./scripts/update-sample-library.js  # NEW
```

#### C. MCP Alignment Automation (`sync-mcp.yml`)

**Trigger**: On release OR manual dispatch
**Purpose**: Keep pm-skills-mcp in sync with pm-skills

```yaml
name: Sync MCP
on:
  workflow_dispatch:
  release:
    types: [published]

jobs:
  sync:
    steps:
      - name: Checkout pm-skills
      - name: Checkout pm-skills-mcp
      - name: Run embed-skills
        run: cd pm-skills-mcp && npm run embed-skills ../pm-skills/skills
      - name: Run validation
        run: ./scripts/validate-mcp-sync.js
      - name: Create sync PR in pm-skills-mcp
        run: |
          cd pm-skills-mcp
          git checkout -b sync/pm-skills-$TAG
          git add .
          gh pr create --title "Sync with pm-skills $TAG"
```

#### D. Community Contribution Workflow

**Trigger**: PR from external contributor with `skills/` changes
**Purpose**: Guided review process for community skills

```yaml
name: Community Skill Review
on:
  pull_request:
    paths: ['skills/**']

jobs:
  # Step 1: Automated validation (same as validate-skills.yml)
  validate:
    ...

  # Step 2: Generate review checklist
  review-checklist:
    steps:
      - name: Generate review comment
        run: |
          # Automatically comment on PR with:
          # - Which skills are new/modified
          # - Frontmatter validation results
          # - Naming convention compliance
          # - Missing files
          # - Suggested reviewers based on skill phase

  # Step 3: Label for review
  label:
    steps:
      - name: Add labels
        run: |
          # Add labels: "new-skill", "skill-update", phase label, etc.
```

### 5.3 New Scripts Needed

| Script | Purpose | Trigger |
|--------|---------|---------|
| `validate-agents-md.js` | Ensure every skill has an AGENTS.md entry | PR validation |
| `validate-skill-naming.js` | Check naming conventions (phase-prefix, kebab-case, length) | PR validation |
| `validate-skill-completeness.js` | Check 3-file pattern, required frontmatter | PR validation |
| `validate-template-sections.js` | Check template has guidance comments | PR validation |
| `check-mcp-impact.js` | Advisory: does this change need MCP update? | PR validation |
| `generate-release-notes.js` | Build release notes from commits | Release |
| `trigger-mcp-sync.js` | Dispatch sync workflow in pm-skills-mcp | Release |
| `update-sample-library.js` | Generate sample output for new skills | Release |
| `validate-version-match.js` | Ensure tag matches plugin.json version | Release |

---

## 6. Best Practices & Prior Art

### 6.1 Community Plugin/Skill Publishing Models

| Platform | Contribution Model | Quality Gates | Review Process |
|----------|-------------------|---------------|---------------|
| **Claude Code plugins** | GitHub repo + submission form | Anthropic manual review | 1-2 week turnaround |
| **VS Code extensions** | Open source repo + marketplace | CI + marketplace review | Automated + manual |
| **npm packages** | `npm publish` from any repo | CI tests + community trust | Self-publish |
| **Homebrew formulas** | PR to homebrew-core | CI + 2 reviewer approvals | Community reviewers |
| **Terraform providers** | PR to registry | CI + HashiCorp review | Automated + manual |

**Best pattern for pm-skills**: The **Homebrew model** — community PRs with CI validation and maintainer review. The CI catches convention violations; maintainers assess PM quality and fit.

### 6.2 Scaffolding Tool Patterns

| Tool | Approach | Strengths |
|------|----------|-----------|
| `create-react-app` | CLI wizard → generates project | Simple, opinionated |
| `yeoman` | Generators with prompts → scaffolds | Flexible, community generators |
| `plop` | Template-based micro-generators | Lightweight, file-level |
| GSD `/gsd:new-project` | Guided questions → `.planning/` directory | Context-aware, PM-adjacent |

**Best pattern for pm-skill-builder**: A **GSD-style guided workflow** that asks questions and produces files, implemented as a pm-skill (not a separate CLI tool). This keeps everything within the Claude Code experience.

---

## 7. Approaches & Tradeoffs

### Approach A: Skill-Only Builder (Recommended for v1)

The pm-skill-builder is itself a pm-skill. No external tooling. The skill guides the user through gap analysis, classification, and produces a Skill Implementation Packet.

**Tradeoffs**:
| Pro | Con |
|-----|-----|
| Zero new dependencies | Can't run validation scripts inline |
| Works on any platform that loads skills | Interactive only (no autonomous mode) |
| Follows the repo's own conventions | Relies on CI for validation |
| Contributors learn by using a pm-skill | Output must be manually placed in correct directories |

### Approach B: Skill + Companion Scripts

The pm-skill-builder skill + helper scripts for scaffolding and validation. A `/pm-skill-builder scaffold` command creates the directory structure; the skill fills in the content.

**Tradeoffs**:
| Pro | Con |
|-----|-----|
| Automates directory creation | Scripts add maintenance burden |
| Validation inline during creation | Platform-specific (scripts need shell) |
| Faster creation workflow | Two components to maintain |

### Approach C: Full Automation Pipeline

The pm-skill-builder skill + GitHub Actions workflows + Codex integration. Codex can autonomously create skills from specs.

**Tradeoffs**:
| Pro | Con |
|-----|-----|
| Fully automated from spec to PR | Complex infrastructure |
| Community can submit via issue template | Over-engineering for current scale |
| Codex handles file generation | Requires careful prompt engineering for Codex |
| CI handles all validation | Slow feedback loop |

---

## 8. Recommendations & 80/20 Value

### Primary Recommendation: Approach A + CI (Approach B for v1.1)

**Phase 1 (v1)**: Build the pm-skill-builder as a skill only. It produces a Skill Implementation Packet — a structured document that includes all draft files. The user (or an agent) then places the files in the correct directories. CI validates on PR.

**Phase 2 (v1.1)**: Add companion scripts for scaffolding (`scripts/scaffold-skill.sh`) and inline validation. Add `/pm-skill-builder scaffold` subcommand.

**Phase 3 (v2)**: Add Codex integration — a Codex task template that takes a Skill Implementation Packet and produces a PR. Add GitHub issue template for community skill proposals.

### 80/20 Value Breakdown

| Capability | Value | Effort | Priority |
|-----------|-------|--------|----------|
| Gap analysis against existing 25 skills | Very High | Low | P1 |
| Why Gate (specific prompts/outputs not served) | Very High | Low | P1 |
| Repo-fit classification | High | Low | P1 |
| Phase + category selection | High | Low | P1 |
| Implementation Packet generation | Very High | Medium | P1 |
| Skill validation CI workflow | Very High | Medium | P1 |
| Companion scaffolding scripts | Medium | Low | P2 |
| Revision/audit mode | High | Medium | P2 |
| Release automation workflow | High | Medium | P2 |
| Codex autonomous skill creation | Medium | High | P3 |
| Community contribution workflow | Medium | High | P3 |
| MCP alignment automation | High | High | P3 |

---

## 9. Questions for Clarification

1. **Two skills confirmed?** The prior analysis recommends both `/pm-skill-builder` (utility) and `/skill-builder` (foundation). Should both be built, or just the pm-specific one?

2. **Naming**: Should the command be `/skill-builder` or `/pm-skill-builder`? The directory would be `skills/utility-pm-skill-builder/` with frontmatter name `utility-pm-skill-builder`.

3. **Codex integration priority**: How important is autonomous skill creation via Codex vs. interactive creation via CLI?

4. **Community publishing**: Is the goal to enable community PRs to pm-skills, or to enable community members to create skills for their own repos using pm-skills patterns?

5. **Sample library automation**: Should new skills automatically generate sample outputs for `library/skill-output-samples/`?

6. **MCP sync**: Should MCP sync be automated on release or remain a manual step?

---

## 10. Creative Ideas

### 10.1 Skill Proposal Issue Template

A GitHub issue template that community members fill out:

```markdown
## Skill Proposal

**Name**: [proposed skill name]
**Phase**: [discover/define/develop/deliver/measure/iterate/foundation/utility]
**Problem**: What PM task is poorly served today?
**Evidence**: Name 2-3 specific prompts where existing skills fall short
**Artifact**: What document/artifact would this skill produce?
**Overlap**: Which existing skills are closest? How does this differ?
```

A Codex task or GitHub Action can then draft a Skill Implementation Packet from the proposal.

### 10.2 Skill Quality Dashboard

A GitHub Actions workflow that runs weekly and produces a README badge:

```
pm-skills quality: 25/25 skills pass validation
Coverage: 100% frontmatter | 100% commands | 100% AGENTS.md
```

### 10.3 "Improve This Skill" Mode

Beyond creating new skills, the builder could analyze existing skills and suggest improvements:

```
/pm-skill-builder audit deliver-prd

Audit: deliver-prd
├── Frontmatter: ✅ Valid (all required fields present)
├── TEMPLATE.md: ⚠️ 2 sections missing guidance comments
├── EXAMPLE.md: ✅ Complete (all sections filled)
├── Command: ✅ Present, valid frontmatter
├── AGENTS.md: ✅ Entry exists
└── Conventions: ⚠️ Description could be more specific (current: 42 words)

Suggestions:
1. Add guidance comments to TEMPLATE.md sections 'Technical Architecture' and 'Dependencies'
2. Tighten description to focus on functional requirements and scope boundaries
3. Consider adding a 'Quick Mode' for simple features
```

### 10.4 Skill Dependency Visualization

Generate a visual map of which skills feed into which:

```
/pm-skill-builder deps

Skill Dependencies (pm-skills):

  stakeholder-summary ─→ problem-statement ─→ hypothesis ─→ prd
  interview-synthesis ─↗                                      │
  competitive-analysis ─→ hypothesis                          ↓
                                                         user-stories ─→ launch-checklist
                                                              │
  experiment-design ─→ experiment-results ─→ pivot-decision   │
                                                              ↓
  retrospective ←── release-notes ←──────── launch-checklist
```

---

## 11. Assumptions

1. The two-skill approach (pm-skill-builder + skill-builder) is confirmed
2. The 3-file pattern (SKILL.md + TEMPLATE.md + EXAMPLE.md) remains the standard
3. Claude Code CLI is the primary platform for skill building
4. Community contributions are desirable but not yet at scale
5. MCP sync remains a separate repo (pm-skills-mcp)
6. The existing frontmatter schema and validation scripts are the quality baseline

---

## 12. Feasibility Assessment

| Component | Feasibility | Effort | Dependencies |
|-----------|------------|--------|-------------|
| pm-skill-builder skill (v1) | ✅ Highly feasible | Medium (3-5 days) | Authoring guide, frontmatter schema |
| CI validation workflow | ✅ Straightforward | Low (1-2 days) | Existing validation scripts |
| Scaffolding scripts | ✅ Straightforward | Low (1 day) | None |
| Release automation | ✅ Feasible | Medium (2-3 days) | GitHub Actions |
| Codex integration | ⚠️ Feasible with constraints | Medium (2-3 days) | Codex access |
| MCP sync automation | ⚠️ Complex (cross-repo) | High (3-5 days) | PAT secrets, pm-skills-mcp |
| Community contribution workflow | ✅ Feasible | Medium (2-3 days) | GitHub templates |
| Sample library automation | ⚠️ Feasible but tricky | High (3-5 days) | Skill execution environment |

---

## 13. Cautions & Gotchas

### 13.1 The Skill-Builder Paradox

A skill-builder skill must be an excellent example of a well-built skill. If it violates its own conventions (poor frontmatter, missing EXAMPLE.md, vague description), it undermines its credibility. **Build this skill last** after all conventions are locked down.

### 13.2 Over-Automation Risk

Automating skill creation is only valuable if the *quality* of automated output matches hand-crafted skills. A scaffold that produces boilerplate but not PM insight is worse than no scaffold — it creates false confidence.

### 13.3 Community Scale Mismatch

The community contribution infrastructure (issue templates, review workflows, Codex automation) is designed for scale that doesn't exist yet. Build the interactive skill first. Add automation when community volume justifies it.

### 13.4 Cross-Repo CI Complexity

Automating MCP sync requires cross-repo workflow dispatch, PAT secrets, and careful error handling. This is the highest-risk piece of the automation puzzle.

### 13.5 Sample Library Generation

Generating sample outputs requires actually running skills with test inputs. This means having a reliable execution environment that can invoke Claude, run the skill, and capture the output. Not trivial to automate.

---

## 14. What You Might Be Missing

1. **Skill retirement**: Not just creating skills — what about deprecating or merging skills that overlap?
2. **Skill versioning**: How do skill versions relate to plugin versions? Can a skill be at v2.0 while the plugin is at v2.6?
3. **A/B testing skills**: If you want to compare two versions of a skill, you need a mechanism to run both and compare outputs.
4. **Skill analytics**: Which skills are used most? Least? This informs roadmap priorities.
5. **Cross-language support**: Should skills support non-English PM work? This affects templates and examples.

---

## 15. Value Evaluation

### Where the Real Value Is

The highest-value outcome isn't the skill-builder skill itself — it's the **CI pipeline** it enables. Today, there's no automated way to verify that a PR adding a new skill meets all conventions. The validation workflow is the foundation for everything else: community contributions, release automation, quality assurance.

| Component | Real Value | Reason |
|-----------|-----------|--------|
| CI validation workflow | ⭐⭐⭐⭐⭐ | Foundation for all automation |
| pm-skill-builder skill | ⭐⭐⭐⭐ | Reduces contributor onboarding time |
| Release automation | ⭐⭐⭐⭐ | Reduces maintainer toil |
| MCP sync automation | ⭐⭐⭐ | Reduces cross-repo coordination |
| Codex integration | ⭐⭐ | Nice-to-have, not critical path |
| Community workflow | ⭐⭐ | Needed when scale justifies it |

---

## 16. Next Steps

### Immediate
1. Resolve naming: `utility-pm-skill-builder` or `utility-skill-builder`?
2. Confirm two-skill approach
3. Build CI validation workflow (highest standalone value)

### Near-Term
4. Build pm-skill-builder skill (v1 — interactive, no scripts)
5. Build release automation workflow
6. Test on Claude Code CLI end-to-end

### Medium-Term
7. Add scaffolding scripts
8. Add revision/audit modes
9. Build MCP sync automation
10. Design community contribution workflow

---

## 17. Sources

### Internal Sources
- `_NOTES/efforts/active/skill_utility-skill-builder/approach_opus-4.6.md` — Two-skill approach analysis
- `_NOTES/efforts/active/skill_utility-skill-builder/prep_opus-4.6.md` — Opus prep document
- `_NOTES/efforts/active/skill_utility-skill-builder/prep_gpt-5.4.md` — GPT-5.4 prep document
- `_NOTES/efforts/active/skill_utility-skill-builder/approach_gpt-5.4.md` — GPT-5.4 approach
- `_NOTES/efforts/active/M-11-claude-plugin-packaging/final-spec/final-spec_claude-plugin_opus-4.6.md` — Plugin packaging spec
- `_NOTES/efforts/active/M-11-claude-plugin-packaging/planning/implementation-plan.md` — Plugin implementation plan
- `docs/guides/authoring-pm-skills.md` — Authoring guide
- `docs/reference/frontmatter-schema.yaml` — Frontmatter schema
- `.github/workflows/validation.yml` — Existing CI workflow

### External Sources
- [GSD Framework](https://github.com/gsd-build/get-shit-done) — Spec-driven development reference
- [agentskills.io Specification](https://agentskills.io/specification) — Open standard
- [Claude Code Plugins](https://code.claude.com/docs/en/plugins) — Plugin system
- [OpenAI Codex CLI](https://developers.openai.com/codex/cli) — Codex autonomous execution
- [GitHub Actions Automation Best Practices](https://docs.github.com/en/actions) — CI/CD reference
