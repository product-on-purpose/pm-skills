# PM-Skills: Next Efforts Breakdown

> **Date**: 2026-03-21 (revised 2026-03-22)
> **Author**: Claude Opus 4.6
> **Status**: Active working document — update status table as work progresses
> **Context**: Post-session reassessment after Knowledge OS separation
> **Note**: Effort estimates are in effort-days, not calendar-days. This is a side project with variable time allocation.

---

## Status Table

| # / ID | Effort | Type | Est. | Status | Notes |
|---|--------|------|------|--------|-------|
| 0 | Marketplace submission | Quick win | 30 min | Not started | Zero engineering, high visibility |
| 1 | CI validation enhancement | Infrastructure | 0.5-1 day | Review complete, ready to commit | Extend existing CI with new checks |
| 2 | PM Skill Builder skill | New skill | 3-5 days | Design reviewed, implementation pending | Depends on #1; packaging boundary now tracked separately as M-16 |
| 3 | `deliver-acceptance-criteria` | New skill | 2 days | Review complete, ready to commit | Independent, quick win |
| M-16 | Exclude `docs/internal/**` from release ZIP | Infrastructure | 0.5 day | Implemented locally, verification passed | v2.7.0 packaging hygiene fix before final tag |
| 4 | Convention alignment pass | Quality | 1-2 days | Not started | Use #2 audit mode logic |
| 5 | Release automation enhancement | Infrastructure | 2+ days | Not started | Depends on #1 |
| 6 | Community contribution setup | Ecosystem | 1 day | Not started | Depends on #1 |
| 7 | `discover-market-sizing` | New skill | 2-3 days | Not started | Independent |
| 8 | `measure-survey-analysis` | New skill | 2-3 days | Not started | Independent |

---

## What Changed From My Earlier Recommendation

The earlier recommendation was right directionally but conflated pm-skills work with what's now Knowledge OS. Here's the updated framing:

**Removed from pm-skills scope** (now Knowledge OS — separate repo, separate timeline):
- Multi-project workspace (`/project new`, `/project switch`, artifact persistence)
- Document evolution (`/update-doc`, `/link-docs`, versioning)
- Transcript processing
- Hooks (SessionStart context loading, PostToolUse auto-save)
- Output styles
- All of M-01, M-02, M-03, M-04

**Remaining in pm-skills scope**:
- The skill library itself (content quality, new skills, conventions)
- The skill-builder (meta-skill for creating more skills)
- Plugin packaging and marketplace presence
- CI validation (ensures skill quality regardless of who creates them)
- Release automation (reduces maintainer toil)
- Community contribution infrastructure

This simplification is significant. pm-skills no longer needs to become a "PM workspace" — it needs to be an excellent, visible, community-ready skill library. Knowledge OS handles the workspace layer separately.

**The earlier recommendation's core advice stands**: stop exploring, ship something small. But now the "something small" is even smaller because workspace features moved to Knowledge OS.

---

## Effort 0: Anthropic Marketplace Submission

**What**: Submit pm-skills to the Anthropic official plugin directory.
**Why**: Highest visibility-to-effort ratio of anything on this list. The plugin is already compliant (M-11 verified). This puts pm-skills in front of every Claude Code user browsing the directory.
**Why now**: The plugin has been compliant since v2.6.0. Every day it's not listed is missed discovery.

### Human decisions needed
- [ ] Confirm plugin name: `pm-skills` (permanent once submitted)
- [ ] Provide contact email for Anthropic
- [ ] Write 50-100 word plugin description for directory listing
- [ ] Write 3+ example use cases

### Agent-executable steps
None — this is a form submission. Human-only.
- Shortlink: [clau.de/plugin-directory-submission](https://clau.de/plugin-directory-submission)
- In-app: `claude.ai/settings/plugins/submit` or `platform.claude.com/plugins/submit`

### Done when
- [ ] Form submitted
- [ ] Confirmation received from Anthropic

---

## Effort 1: CI Validation Enhancement

**What**: Extend the existing CI validation with 2 new checks (AGENTS.md consistency, MCP impact advisory) and targeted enhancements to the existing linter.
**Why**: CI already runs on every PR and catches most convention issues. The gaps are: AGENTS.md/skill directory sync, MCP impact awareness, description length enforcement, and TEMPLATE.md structural checks. Closing these gaps completes the safety net for community contributions.
**Why now**: It's the prerequisite for the skill-builder (#2) and community contributions (#6). Closing the gaps is a small effort with high leverage.

### What already exists

The repo already has cross-platform CI validation running on every PR:

| Script | What it checks |
|--------|---------------|
| `scripts/lint-skills-frontmatter.sh` (+ `.ps1`) | Frontmatter presence, `name` field + dir match, `version`/`updated`/`license` required, `phase` validity (6 values), `classification` validity (domain/foundation/utility), phase-classification consistency, no duplicate/nested versions, `references/TEMPLATE.md` + `EXAMPLE.md` exist |
| `scripts/validate-commands.sh` (+ `.ps1`) | Command file path validation |
| `scripts/check-context-currency.sh` (+ `.ps1`) | Advisory CONTEXT.md currency check (non-blocking) |
| `.github/workflows/validation.yml` | Runs all scripts on push to main + PRs, ubuntu + windows |

### What's missing (the actual delta)

| Gap | Priority | How to fill |
|-----|----------|-------------|
| AGENTS.md ↔ skill directory sync | Must have | New script: `validate-agents-md.sh` (+ `.ps1`) |
| MCP impact advisory | Nice to have | New script: `check-mcp-impact.sh` (+ `.ps1`) |
| Description length (20-100 words) | Should have | Extend `lint-skills-frontmatter.sh` |
| TEMPLATE.md has ≥3 ## headers | Should have | Extend `lint-skills-frontmatter.sh` |
| `metadata.category` validation | Nice to have | Extend `lint-skills-frontmatter.sh` |

### Human decisions needed
- [ ] Confirm validation strictness: block on required fields, warn on advisory items like MCP impact? (Recommendation: yes)

### Agent-executable steps

**Step 1**: Extend `scripts/lint-skills-frontmatter.sh` (+ `.ps1`):
- Add description word-count check (20-100 words)
- Add TEMPLATE.md header-count check (≥3 `##` headers)
- Optionally add `metadata.category` validation

**Step 2**: Create `scripts/validate-agents-md.sh` (+ `.ps1` + `.md`):
```
Input: AGENTS.md + all skills/*/SKILL.md
Checks:
  - Every skill directory has a corresponding AGENTS.md entry
  - No orphan entries in AGENTS.md
Output: Pass/fail with specific mismatches
```

**Step 3**: Create `scripts/check-mcp-impact.sh` (+ `.ps1` + `.md`):
```
Input: Changed files in PR (via git diff)
Checks:
  - If new skill added or skill renamed, flag advisory:
    "This change needs a corresponding pm-skills-mcp update"
Output: Advisory message (non-blocking)
```

**Step 4**: Update `.github/workflows/validation.yml`:
- Add the 2 new scripts to the existing workflow
- Keep existing cross-platform (ubuntu + windows) execution

**Step 5**: Verify all 25 existing skills pass the enhanced validators. Fix any that don't.

### Done when
- [ ] All 25 existing skills pass all validators (existing + new)
- [ ] AGENTS.md sync check catches missing or orphan entries
- [ ] MCP impact advisory appears on PRs adding new skills
- [ ] Enhanced linter checks description length and template structure
- [ ] Workflow still runs in < 60 seconds

---

## Effort 2: PM Skill Builder Skill

**What**: A utility skill (`utility-pm-skill-builder`) that guides contributors from "I have an idea for a PM skill" to a complete Skill Implementation Packet — draft files ready for PR.
**Why**: This is the highest-value meta-skill. It encodes the repo's conventions (3-file pattern, frontmatter schema, naming rules, classification, validation checklist) into an interactive workflow. Without it, every new skill requires reading 6+ reference documents and knowing tribal knowledge. With it, a contributor runs `/skill-builder` and gets repo-compatible output.
**Why now**: The prior analysis (approach_opus-4.6.md + approach_gpt-5.4.md) already converged on the design. CI validation (#1) can verify the builder's output. The Anthropic marketplace listing (#0) will drive new users who may want to contribute.

### Human decisions needed
- [x] ~~Confirm naming~~ — **Decided**: directory `skills/utility-pm-skill-builder/`, command `/pm-skill-builder`. General builder is `utility-agent-skill-builder` / `/agent-skill-builder` (also in pm-skills, ships later).
- [ ] Confirm v1 scope: create mode only, or include revise/audit modes?
  - Recommendation: create mode for v1, revise/audit as fast follow

### Agent-executable steps

**Step 1**: Create `skills/utility-pm-skill-builder/SKILL.md`
```
Frontmatter:
  name: utility-pm-skill-builder
  description: [from approach doc — gap analysis, classification, implementation packet]
  classification: utility
  version: "1.0.0"
  updated: [current date]
  license: Apache-2.0
  metadata:
    category: coordination
    frameworks: [triple-diamond]
    author: product-on-purpose

Content sections:
  - Purpose
  - When to Use / When NOT to Use
  - Current Library Reference (table of all 25+ skills by phase)
  - Instructions:
    Step 1: Gap Analysis (check existing skills for overlap)
    Step 2: Why Gate (name 2-3 specific prompts where existing skills fail)
    Step 3: Repo-Fit Assessment (new skill / revise / workflow / command / docs-only)
    Step 4: Classification (domain/foundation/utility + phase + category)
    Step 5: Generate Implementation Packet (all draft files + checklists)
    Step 6: Writing Lens (optional — process/knowledge/reflection type guidance)
    Step 7: Validation Checklist
  - Output Contract (what the packet MUST include)
  - Quality Criteria
```

**Step 2**: Create `skills/utility-pm-skill-builder/references/TEMPLATE.md`
```
The Skill Implementation Packet template:
  - Decision (recommendation + Why Gate evidence)
  - Classification (type, phase, category, name)
  - Overlap Analysis
  - Draft Frontmatter (YAML block)
  - Draft SKILL.md Outline
  - Draft TEMPLATE.md Sections
  - EXAMPLE.md Scenario
  - Draft Command
  - AGENTS.md Entry
  - Repo Update Checklist
```

**Step 3**: Create `skills/utility-pm-skill-builder/references/EXAMPLE.md`
```
A completed Skill Implementation Packet for a hypothetical skill:
  measure-survey-analysis
Complete and realistic — all sections filled, frontmatter valid,
checklist items specific.
```

**Step 4**: Create `commands/skill-builder.md`
```
Slash command with:
  name: skill-builder
  description: Create or revise a PM skill for the pm-skills library
  Arguments: optional mode (create/revise/audit)
```

**Step 5**: Update AGENTS.md with new skill entry.

**Step 6**: Verify output passes CI validation (#1).

**Step 7**: Test end-to-end — use `/skill-builder` to design a real skill candidate, verify the packet is usable.

### Done when
- [ ] `/skill-builder` produces a complete Skill Implementation Packet
- [ ] Packet includes all required files + frontmatter + checklist
- [ ] Gap analysis correctly identifies overlap with existing skills
- [ ] Files created from the packet pass CI validation
- [ ] Tested with at least one real skill design scenario

---

## Effort 3: `deliver-acceptance-criteria` Skill

**What**: A new domain skill that generates detailed acceptance criteria (Given/When/Then format) for user stories.
**Why**: Quick win that adds visible value. Directly extends `deliver-user-stories` (the most frequently used delivery skill). Small scope, clear output contract, easy to validate. Also serves as a test case for the CI pipeline and a reference for future community-contributed skills.
**Why now**: It's independent of all other efforts. Can be built in parallel with #1 or #2. Demonstrates that pm-skills is still adding domain content, not just infrastructure.

### Human decisions needed
- [ ] Confirm this is the right next domain skill (vs. market-sizing or survey-analysis)

### Agent-executable steps

**Step 1**: Create directory `skills/deliver-acceptance-criteria/`

**Step 2**: Create `SKILL.md`
```
Instructions for generating acceptance criteria:
  - Read the user story (or ask for it)
  - Identify the happy path
  - Identify edge cases and error states
  - Write Given/When/Then scenarios for each
  - Include non-functional criteria (performance, security, accessibility)
  - Cross-reference with PRD requirements if available
Output: Structured acceptance criteria document
```

**Step 3**: Create `references/TEMPLATE.md` — acceptance criteria template with sections for each story.

**Step 4**: Create `references/EXAMPLE.md` — completed acceptance criteria for a realistic feature.

**Step 5**: Create `commands/acceptance-criteria.md`

**Step 6**: Update AGENTS.md. Verify CI passes.

### Done when
- [ ] `/acceptance-criteria` produces structured Given/When/Then criteria
- [ ] All CI validations pass
- [ ] Tested with at least 2 different feature scenarios

---

## Effort M-16: Exclude `docs/internal/**` from Release ZIP

**What**: Adjust release packaging so published pm-skills ZIPs exclude `docs/internal/**` while continuing to ship public docs.
**Why**: The current release build ships the whole `docs/` tree, which leaks internal governance material to end users. This also complicates F-05 because any tracked internal builder artifacts would ride along in the release package.
**Why now**: It is a small packaging fix with immediate release-quality impact, and it should land before the final `v2.7.0` tag.

### Human decisions needed
- [ ] Confirm the public docs boundary for the ZIP: preserve user-facing docs such as `docs/releases/**`, guides, and reference docs; exclude only `docs/internal/**`

### Agent-executable steps

**Step 1**: Update `scripts/build-release.sh` to exclude `docs/internal/**` while keeping public docs.

**Step 2**: Update `scripts/build-release.ps1` to match the same packaging rule on Windows.

**Step 3**: Review `.github/workflows/release.yml` for any assumptions about the full `docs/` tree and adjust only if needed.

**Step 4**: Verify the staged ZIP contents:
- `docs/internal/**` absent
- public docs still present
- release notes still present

**Step 5**: Update release-governance docs for `v2.7.0` to record the packaging boundary.

### Done when
- [ ] Both release build scripts exclude `docs/internal/**`
- [ ] Public docs still ship in the ZIP
- [ ] Internal governance docs no longer ship in release artifacts
- [ ] The `v2.7.0` release checklist explicitly gates on this boundary

---

## Effort 4: Convention Alignment Pass

**What**: Audit all 25 existing skills against current conventions. Fix any gaps.
**Why**: The CI pipeline (#1) defines what "correct" looks like. Some older skills may not fully comply — missing guidance comments in templates, short descriptions, missing output contracts. Fixing these before community contributions start ensures contributors see consistent examples.
**Why now**: After CI (#1), the packaging boundary (M-16), and the skill-builder (#2) are done, this is the right cleanup pass. The skill-builder's audit mode logic (even if not shipped as a command yet) provides the checklist.

### Human decisions needed
- [ ] How strict? Fix everything CI catches, or also improve content quality (descriptions, template guidance)?

### Agent-executable steps

**Step 1**: Run CI validators against all 25 skills. Capture any failures or warnings.

**Step 2**: For each issue found:
- Fix frontmatter gaps (missing fields, short descriptions)
- Add guidance comments to TEMPLATE.md sections that lack them
- Ensure EXAMPLE.md fills all template sections
- Verify output contracts exist in SKILL.md

**Step 3**: Commit fixes as a single "convention alignment" PR.

### Done when
- [ ] All 25 skills pass CI validation with zero warnings
- [ ] Every TEMPLATE.md has guidance comments in all sections
- [ ] Every SKILL.md has an Output Contract section
- [ ] Descriptions are 20-100 words and specific

---

## Effort 5: Release Automation Enhancement

**What**: Extend the existing release workflow with version validation and MCP sync dispatch.
**Why**: The repo already has tag-triggered release packaging and GitHub Release creation in `.github/workflows/release.yml`. The gaps are: no version-tag validation against `.claude-plugin/plugin.json`, basic release notes, and no automated MCP sync. Closing these gaps makes releases a safer one-step process.
**Why now**: After CI (#1) is enhanced and M-16 closes the immediate packaging leak, release automation is the next infrastructure investment. It reduces maintainer toil and makes more frequent releases feasible.

### What already exists

| Component | What it does |
|-----------|-------------|
| `.github/workflows/release.yml` | Tag-triggered release packaging, GitHub Release creation |
| `scripts/build-release.sh` (+ `.ps1`) | Artifact build for distribution |

### What's missing (the delta)

| Gap | Priority |
|-----|----------|
| Validate tag matches `.claude-plugin/plugin.json` version | Must have |
| Improved release notes generation | Should have |
| MCP sync dispatch to pm-skills-mcp | Should have |

### Human decisions needed
- [ ] Automate MCP sync dispatch? Requires a PAT secret for cross-repo workflow dispatch.
  - Recommendation: yes, automate it

### Agent-executable steps

**Step 1**: Create `scripts/validate-version-match.sh` (+ `.ps1` + `.md`) — ensures git tag matches `.claude-plugin/plugin.json` version.

**Step 2**: Enhance release notes generation (extend existing inline template or create `scripts/generate-release-notes.sh`).

**Step 3**: Update `.github/workflows/release.yml`:
- Add version match validation step (gate before release)
- Improve release notes
- Add MCP sync dispatch (`repository_dispatch` to pm-skills-mcp)

**Step 4**: Create receiving workflow in pm-skills-mcp (if access available):
- On `repository_dispatch` with `pm-skills-release` event
- Run `embed-skills.js`, test, create sync PR

### Done when
- [ ] Tag push creates GitHub release with improved notes
- [ ] Version mismatch between tag and `.claude-plugin/plugin.json` is blocked
- [ ] MCP sync PR is auto-created in pm-skills-mcp (if PAT configured)

---

## Effort 6: Community Contribution Setup

**What**: Issue templates, PR templates, and CONTRIBUTING.md updates that make it easy for external contributors to propose and submit new skills.
**Why**: Once the marketplace listing (#0) drives discovery and the skill-builder (#2) lowers the creation barrier, community contributions become feasible. The infrastructure should be ready.
**Why now**: After CI (#1) can validate contributions automatically, and after the packaging boundary is clear via M-16, this becomes a small effort with high potential payoff.

### Human decisions needed
- [ ] Accept community skill proposals via GitHub issues?
- [ ] Require issue approval before PR? (Recommendation: yes, prevents wasted effort)

### Agent-executable steps

**Step 1**: Create `.github/ISSUE_TEMPLATE/skill-proposal.yml`
```
Fields: proposed name, phase, problem description, evidence (2-3 gaps),
        artifact description, overlap with existing skills
Labels: skill-proposal
```

**Step 2**: Update CONTRIBUTING.md with:
- "How to propose a new skill" section
- "How to build a skill using /skill-builder" section
- "What CI checks" section
- "Review process" section

**Step 3**: Add auto-label workflow for skill PRs (label by phase, flag new vs. update).

### Done when
- [ ] Skill proposal issue template works
- [ ] CONTRIBUTING.md clearly guides external contributors
- [ ] A hypothetical external contributor could go from idea → issue → PR → merge following the docs

---

## Efforts 7-8: New Domain Skills

These are independent and can be built anytime. Lower priority than infrastructure (#1, #5) and meta-skills (#2), but they add visible library value. Build them when you want a break from infrastructure work, or delegate to Codex.

### Effort 7: `discover-market-sizing`

**What**: Framework-driven market sizing skill (TAM/SAM/SOM + bottoms-up estimation).
**Why**: Fills a real gap in the Discover phase. PMs need structured market sizing for business cases and new market entry decisions. No existing skill covers quantitative market analysis.

### Effort 8: `measure-survey-analysis`

**What**: Survey results analysis skill with persona segmentation, hypothesis validation, and prioritized recommendations.
**Why**: Fills a gap in the Measure phase. Complements experiment-results (which is A/B focused) with broader survey/research analysis.

Both follow the standard pattern: SKILL.md + TEMPLATE.md + EXAMPLE.md + command + AGENTS.md entry. Use the skill-builder (#2) to generate the implementation packets.

---

## Execution Order

Effort-days are not calendar-days. Sequence within each batch matters; batches themselves happen as time allows.

```
Batch 1 (effort-days 1-2):
  Effort 0 — marketplace submission (30 min, human-only)
  Effort 1 — CI enhancement (extend linter + 2 new scripts)

Batch 2 (effort-days 3-4):
  Effort 3 — acceptance-criteria (quick win, can overlap with infrastructure work)
  Effort M-16 — release ZIP packaging fix (`docs/internal/**` excluded before final v2.7.0 cut)

Batch 3 (effort-days 5-9):
  Effort 2 — skill-builder (SKILL.md + TEMPLATE.md + EXAMPLE.md + command + testing)

Batch 4 (effort-days 10-14):
  Effort 4 — convention alignment (fix any issues enhanced CI found)
  Effort 5 — release automation
  Effort 6 — community contribution setup

Batch 5+ (as time allows):
  Effort 7 or 8 — new domain skills
```

Knowledge OS is a separate Product on Purpose initiative tracked at `docs/internal/_working/knowledge/`. It does not block pm-skills work.

---

## What's Different From My Earlier Recommendation

| Earlier | Now | Why |
|---------|-----|-----|
| "Ship project workspace" as pm-skills feature | Moved to Knowledge OS (separate repo) | Topics 1 & 2 are bigger than pm-skills |
| "Build hooks for context loading" | Deferred to Knowledge OS | Hooks serve the workspace, not the skill library |
| "Build output styles" | Dropped from pm-skills scope | Nice polish but not core skill library value |
| "Build transcript processing agent" | Moved to Knowledge OS | Artifact processing is Layer 2, not Layer 3 |
| Marketplace submission was "quick win" | Still #0, unchanged | Still the highest ROI action |
| CI pipeline was #1 | Still #1, unchanged | Still the critical-path enabler |
| Skill-builder was #2 | Still #2, unchanged | Still the highest-value meta-skill |
| 8 efforts total | 9 efforts, including release packaging hygiene (M-16) | Removing workspace features simplified everything, then M-16 was added from the F-05 release-packaging review |

**Net effect**: pm-skills scope is 40% smaller than before. The same effort produces a more focused, higher-quality skill library instead of a half-built workspace.
