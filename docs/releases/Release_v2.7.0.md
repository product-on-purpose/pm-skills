# PM-Skills v2.7.0 Release Notes

**Date**: 2026-03-22
**Status**: Released (tag `v2.7.0`)

---

## Executive Summary

v2.7.0 is the largest pm-skills release since the v2.0 restructure. It ships **two new skills**, introduces the **utility skill classification**, hardens the **CI pipeline**, cleans up **release packaging**, and delivers a comprehensive **documentation refresh** across the entire public surface.

The headline feature is the **PM Skill Builder** (`/pm-skill-builder`) — the first utility-classified skill, which guides contributors through creating new PM skills interactively. This closes the loop on the skill creation workflow: instead of reverse-engineering existing skills, contributors now have a structured builder with gap analysis, classification guidance, and draft file generation.

**By the numbers:**
- **27 skills** (up from 25): 25 domain + 1 foundation + 1 utility
- **28 command docs** (up from 26): 27 skill commands + 1 workflow bundle
- **4 new CI validation scripts**: extended linter, AGENTS.md sync, command validator, MCP impact detection
- **16 public docs updated** for accuracy and completeness

---

## What's New and Why It Matters

### New Skill: `deliver-acceptance-criteria` (F-06)

**What**: A Deliver-phase skill that generates structured Given/When/Then acceptance criteria for user stories or feature slices. Covers happy path, edge cases, error states, and non-functional expectations.

**Why it matters**: Acceptance criteria are the handoff contract between PM and engineering. Vague criteria lead to rework. This skill produces testable, unambiguous scenarios that QA can verify without guessing intent — reducing back-and-forth during sprint execution.

**Use it**: `/acceptance-criteria "User can reset password via email"`

**Issue**: [#114](https://github.com/product-on-purpose/pm-skills/issues/114)

---

### New Skill: `utility-pm-skill-builder` (F-05)

**What**: The first utility-classified skill. An interactive builder that guides contributors from a PM skill idea to a complete Skill Implementation Packet — including gap analysis, a Why Gate to prevent duplicates, classification, exemplar-driven drafting, and a staging-to-promotion workflow.

**Why it matters**: Before the builder, creating a new PM skill required reverse-engineering existing skills and manually assembling 5+ files across 3 directories. The builder encodes all conventions, runs overlap detection against all 27 existing skills, and produces CI-compliant drafts. It reduces the skill creation process from hours of convention-hunting to a guided conversation.

**How it works**:
1. Describe your skill idea (problem-first or skill-first)
2. Builder checks all existing skills for overlap
3. If overlap is found, a Why Gate asks you to justify the gap
4. Builder classifies (domain/foundation/utility) and selects exemplar skills
5. Draft files are generated to `_staging/` (gitignored)
6. On confirmation, files are promoted to canonical locations

**Use it**: `/pm-skill-builder "A skill for creating stakeholder update emails"`

**Issue**: [#113](https://github.com/product-on-purpose/pm-skills/issues/113)

---

### Enhanced CI Validation (M-12)

**What**: Extended the frontmatter linter and added three new validation scripts:
- `lint-skills-frontmatter` — now checks description word count (20-100) and TEMPLATE.md header count (>=3)
- `validate-agents-md` — verifies AGENTS.md paths match actual skill directories
- `validate-commands` — verifies command files reference valid skill paths
- `check-mcp-impact` — advisory detection of skill changes that may affect the MCP server

**Why it matters**: As the skill library grows, manual validation doesn't scale. These scripts catch naming mismatches, orphaned entries, and structural drift before they ship. Every new skill committed in this release passed all four validators on both bash and PowerShell.

**Issue**: [#112](https://github.com/product-on-purpose/pm-skills/issues/112)

---

### Release Packaging Hygiene (M-16)

**What**: Release packagers (`build-release.sh` and `build-release.ps1`) now strip `docs/internal/**` from staged ZIP artifacts. Internal governance docs (effort briefs, release planning, decision logs) stay tracked in-repo but no longer ship to end users.

**Why it matters**: Prior releases accidentally included internal planning documents in the published ZIP. Users downloading pm-skills got ~50 files they didn't need and shouldn't see. This fix keeps the repo transparent for maintainers while keeping the distribution clean for users.

**Issue**: [#123](https://github.com/product-on-purpose/pm-skills/issues/123)

---

### Utility Skill Classification

**What**: Skills now have three classifications:
- **Domain** (25 skills) — phase-specific PM activities (discover, define, develop, deliver, measure, iterate)
- **Foundation** (1 skill) — cross-cutting capabilities that apply across phases
- **Utility** (1 skill) — meta-skills that operate on the repository, workflow, or other skills

**Why it matters**: The original two-tier model (domain + foundation) couldn't cleanly accommodate tooling skills like the builder. Utility skills don't produce PM artifacts — they produce *other skills*. The three-tier model is more expressive and sets up the planned Create (F-05) -> Validate (F-10) -> Iterate (F-11) lifecycle.

---

### Documentation Refresh (D-01, D-02)

**What**:
- **D-01**: New `docs/pm-skill-anatomy.md` — practical guide to pm-skills structure covering directory layout, the three-file model, classification types, frontmatter rules, Triple Diamond phases, the wiring layer, and CI validation.
- **D-02**: Updated 14 public-facing docs for v2.7.0 accuracy — skill counts, command counts, M-12 script documentation, classification model, skill template modernization, and frontmatter schema with utility examples.

**Why it matters**: Public docs were showing stale counts (25 skills instead of 27), missing the new CI scripts, and had no explanation of utility skills. The new anatomy guide gives contributors a single starting point for understanding how skills work, complementing the spec-level `agent-skill-anatomy.md`.

---

## Breaking Changes

None. All existing skills, commands, templates, and bundles are unchanged.

---

## MCP Compatibility

The companion MCP server ([pm-skills-mcp](https://github.com/product-on-purpose/pm-skills-mcp)) is release-pinned and requires a re-embed to pick up v2.7.0 changes:

- **`deliver-acceptance-criteria`** should be added to the MCP tool set as `pm_acceptance_criteria`
- **`utility-pm-skill-builder`** is a file-writing meta-skill designed for Claude Code environments and may not be suitable for MCP exposure (it requires file system access that MCP tools cannot provide)

A matching pm-skills-mcp release will follow separately.

---

## Validation

All validators pass on both bash and PowerShell:

| Validator | Result |
|-----------|--------|
| `lint-skills-frontmatter` | 27 skills, 0 failures |
| `validate-agents-md` | 27 paths sync |
| `validate-commands` | 28 commands valid |
| `check-mcp-impact` | No blocking impact |
| Release ZIP inspection | `docs/internal/**` excluded, public docs included |

---

## Commit History

| Hash | Description |
|------|-------------|
| `8d2a418` | M-12 CI validation enhancement + F-06 deliver-acceptance-criteria |
| `0c2e637` | M-16 exclude docs/internal from release ZIP |
| `3c50108` | F-05 add _staging/ to .gitignore |
| `df794a1` | F-05 skill content (SKILL.md, TEMPLATE.md, EXAMPLE.md) |
| `a67f144` | F-05 command + AGENTS.md entry |
| `1db6201` | F-05 effort brief reconciliation |
| `12a30a9` | D-02 public docs review + post-F-05 reconciliation |
| `b478276` | D-01 pm-skill-anatomy.md |
| `e62da0c` | CHANGELOG + README updates |

---

## Contributors

- **Codex 5.4**: M-12, F-06, M-16, D-02 first pass, F-05 design review, F-05 implementation review
- **Claude Opus 4.6**: F-05 design, F-05 implementation, D-01, D-02 reconciliation, release prep
- **Human maintainer**: Release governance, design decisions, review coordination

---

## Canonical References

- `CHANGELOG.md` — version history
- `docs/releases/Release_v2.7.0.md` — this document
- `docs/internal/releases/v2.7.0/README.md` — internal release governance
- `docs/internal/releases/v2.7.0/decisions.md` — key decisions log
- Effort briefs: `docs/internal/efforts/` (M-12, M-16, F-05, F-06)
