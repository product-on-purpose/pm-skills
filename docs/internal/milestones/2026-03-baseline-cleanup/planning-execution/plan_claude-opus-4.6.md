# Repo-Hygiene and Operating-Model Baseline Plan

**Author:** Claude Opus 4.6
**Date:** 2026-03-09
**Scope:** pm-skills repository (`E:\Projects\product-on-purpose\pm-skills`)
**Status:** Draft — awaiting owner review

---

## Table of Contents

1. [Executive Recommendation](#1-executive-recommendation)
2. [Current-State Findings](#2-current-state-findings)
3. [Recommended Baseline](#3-recommended-baseline)
4. [Artifact Placement Rules](#4-artifact-placement-rules)
5. [Foundational Skills and Commands](#5-foundational-skills-and-commands)
6. [Prioritized Action Plan](#6-prioritized-action-plan)
7. [Open Questions](#7-open-questions)
8. [Not In Scope Now](#8-not-in-scope-now)

---

## 1. Executive Recommendation

The pm-skills repo architecture is sound. The 3-tier persistence policy, skill structure, command mappings, and docs organization are all well-designed and internally consistent. **The problem is not structural — it is maintenance discipline on tracked files during releases.**

Three critical issues need immediate attention:

1. `AGENTS/claude/CONTEXT.md` is 7+ releases behind (says v2.3.0, repo is at v2.6.1)
2. `CHANGELOG.md` references a gitignored `_NOTES/` path, violating the project's own documentation rules
3. `.claude/settings.json` is deleted but uncommitted, leaving dirty git state

After fixing those, the one systemic change needed is ensuring the `wrap-session` workflow includes a CONTEXT.md currency check so this drift doesn't recur.

No new skills, no structural reorganization, no new tooling. Just fix what's broken and tighten the maintenance loop.

---

## 2. Current-State Findings

### 2.1 Critical Issues

#### C-1. CONTEXT.md is severely stale

| Field            | Value                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| **File**         | `AGENTS/claude/CONTEXT.md`                                                                           |
| **What's wrong** | Header says `v2.3.0 shipped` (2026-02-14). Repo is at `v2.6.1` (2026-03-04).                         |
| **Impact**       | Any new session reading CONTEXT.md gets a project picture that's ~7 releases behind. Session continuity — the primary purpose of CONTEXT.md — is broken. |
| **Evidence**     | Line 5: `**Status:** v2.3.0 shipped`; CHANGELOG.md line 13: `## [2.6.1] - 2026-03-04`                |

#### C-2. CHANGELOG.md references a gitignored path

| Field            | Value                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| **File**         | `CHANGELOG.md`, line 25                                                                              |
| **What's wrong** | References `_NOTES/delivery-plan/releases/v2.6.1/artifacts/skill-output-samples_manifest.v2.6.1.json` |
| **Impact**       | Violates CLAUDE.md rule: *"Never reference gitignored internal notes in public-facing files."* Anyone cloning the repo sees a broken reference. |
| **Evidence**     | CLAUDE.md § "Public vs Private Files"; `.gitignore` line 37: `_NOTES/`                               |

#### C-3. Uncommitted deletion of .claude/settings.json

| Field            | Value                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| **File**         | `.claude/settings.json`                                                                              |
| **What's wrong** | File is deleted (`D` in `git status`) but not committed. Leaves the repo in a dirty baseline state.  |
| **Impact**       | Low functional impact (file only contained one `gh issue list` permission), but it means `git status` is never clean. |

---

### 2.2 Moderate Issues

#### M-1. Shared DECISIONS.md is sparse

| Field            | Value                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| **File**         | `AGENTS/DECISIONS.md`                                                                                |
| **What's wrong** | Only 2 entries (both 2026-02-13), while `AGENTS/claude/DECISIONS.md` has 7 entries through 2026-02-14. The cross-agent index isn't capturing significant decisions. |
| **Impact**       | A second agent (or new human contributor) reading the shared log misses 5 decisions about licensing, MCP sync strategy, and release guardrails. |

#### M-2. Stale redirect file in docs/templates

| Field            | Value                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| **File**         | `docs/templates/skill-template.md`                                                                   |
| **What's wrong** | Single-line file coexisting with the proper `docs/templates/skill-template/` directory (which contains SKILL.md, TEMPLATE.md, EXAMPLE.md). Unclear whether this is an old redirect or intentional. |

#### M-3. Shipped release checklists accumulate without status

| Field            | Value                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| **Files**        | `docs/internal/release-planning/checklist_v2.2.0.md` through `checklist_v2.5.0.md`                   |
| **What's wrong** | Four checklists for shipped releases remain in the active release-planning directory with no completion markers. The README defines status values (`Planned`, `In progress`, `Shipped`, `Superseded`) but the checklists don't use them. |

#### M-4. Frontmatter divergence for foundation-persona

| Field            | Value                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| **File**         | `skills/foundation-persona/SKILL.md`                                                                 |
| **What's wrong** | Uses `classification: foundation` and `version: "2.5.0"` while all 24 other skills use `phase:` and `version: "2.0.0"`. The lint script handles this (checks for `classification` when `phase` is absent), but no documentation explains the convention. |

---

### 2.3 What's Working Well

These areas need no changes:

| Area                   | Status               | Evidence                                                                        |
| ---------------------- | -------------------- | ------------------------------------------------------------------------------- |
| **Skill structure**    | 100% consistent      | 25 dirs, each with SKILL.md + TEMPLATE.md + EXAMPLE.md                          |
| **Command mappings**   | Correct              | 26 files in `commands/` match AGENTS.md table                                   |
| **Workflow bundles**   | Current              | 3 bundles in `_bundles/`, all cross-referencing valid skills                    |
| **Validation scripts** | Current & documented | 4 script pairs (sh + ps1), README_SCRIPTS.md                                    |
| **Sample library**     | Complete             | 97 samples across 27 skills in `library/skill-output-samples/`                  |
| **docs/ organization** | Clean separation     | guides/, reference/, frameworks/, templates/ (public) vs internal/ (governance) |
| **Tier system**        | Well-defined         | `docs/internal/planning-persistence-policy.md` with clear promotion rules       |
| **.gitignore**         | Correct              | Properly reflects Tier 2/3 rules, preserves Tier 1 tracked files                |

---

## 3. Recommended Baseline

These are the tracked files that together define the day-to-day operating model. They should be current at all times.

### 3.1 Project Identity (public)

| File              | Role                                              | Maintenance trigger                         |
| ----------------- | ------------------------------------------------- | ------------------------------------------- |
| `README.md`       | Public entry point, installation, skill catalog   | Any release, skill addition, or docs change |
| `CHANGELOG.md`    | Version history for users and contributors        | Every release                               |
| `CONTRIBUTING.md` | Contribution guidelines                           | Rarely, on process changes                  |
| `LICENSE`         | Apache 2.0                                        | Never                                       |
| `AGENTS.md`       | Universal agent discovery (Copilot, Cursor, etc.) | Skill or command additions                  |

### 3.2 Agent Context (tracked subset)

| File                         | Role                              | Maintenance trigger                                   |
| ---------------------------- | --------------------------------- | ----------------------------------------------------- |
| `AGENTS/claude/CONTEXT.md`   | Project state for Claude sessions | **Every release and milestone**                       |
| `AGENTS/claude/DECISIONS.md` | Claude-specific decision log      | Any architectural or process decision                 |
| `AGENTS/DECISIONS.md`        | Cross-agent decision index        | Decisions affecting multiple agents or external tools |

### 3.3 Governance and Internal Docs

| File                                           | Role                                          | Maintenance trigger         |
| ---------------------------------------------- | --------------------------------------------- | --------------------------- |
| `CLAUDE.md`                                    | Claude Code instructions, documentation rules | On rule changes             |
| `docs/internal/planning-persistence-policy.md` | Tier 1/2/3 artifact rules                     | On persistence rule changes |
| `docs/internal/planning-artifact-tier-map.md`  | Tier map reference table                      | On tier rule changes        |
| `docs/internal/release-planning/README.md`     | Release conventions                           | On release process changes  |
| `docs/internal/delivery-plan/README.md`        | Delivery artifact policy                      | On delivery process changes |

### 3.4 Release Artifacts

| File pattern                                     | Role                                | Maintenance trigger                   |
| ------------------------------------------------ | ----------------------------------- | ------------------------------------- |
| `docs/releases/Release_v*.md`                    | Per-release notes                   | Each release                          |
| `docs/internal/release-planning/checklist_v*.md` | Forward-looking release plans       | Release planning, then marked Shipped |
| `docs/internal/delivery-plan/v*/*.md`            | Blocker decisions and closure paths | When blocking decisions are made      |

### 3.5 Skills, Commands, and Content

| Path                            | Count          | Role                      |
| ------------------------------- | -------------- | ------------------------- |
| `skills/{phase}-{skill}/`       | 25 directories | Canonical skill source    |
| `commands/*.md`                 | 26 files       | Slash command definitions |
| `_bundles/*.md`                 | 3 files        | Workflow bundles          |
| `library/skill-output-samples/` | 97 files       | Sample output library     |
| `scripts/`                      | 13 files       | Automation and validation |

### 3.6 User-Facing Documentation

| Path                             | Files | Role                                               |
| -------------------------------- | ----- | -------------------------------------------------- |
| `docs/getting-started.md`        | 1     | Entry point                                        |
| `docs/agent-skill-anatomy.md`    | 1     | Skill structure deep-dive                          |
| `docs/guides/*.md`               | 4     | Usage, authoring, MCP, validation                  |
| `docs/reference/*.md` + `.yaml`  | 4     | Categories, structure, ecosystem, frontmatter spec |
| `docs/frameworks/*.md`           | 1     | Triple Diamond process guide                       |
| `docs/templates/skill-template/` | 3     | Starter templates for new skills                   |

---

## 4. Artifact Placement Rules

The existing 3-tier system from `docs/internal/planning-persistence-policy.md` is correct. The refinement below adds clarity on where specific types of feature work go.

### 4.1 The Tier System (unchanged)

| Tier  | Location                                                          | Tracked? | What belongs here                           |
| ----- | ----------------------------------------------------------------- | -------- | ------------------------------------------- |
| **1** | `AGENTS/*.md`, `docs/internal/`, `docs/releases/`, `CHANGELOG.md` | Yes      | Decisions, release artifacts, governance    |
| **2** | `AGENTS/*/SESSION-LOG/`, `AGENTS/*/PLANNING/`, `AGENTS/*/TODO.md` | No       | Agent working state, session continuity     |
| **3** | `_NOTES/`, `.claude/` (generated), `.obsidian/`                   | No       | Scratch, feature iteration, research drafts |

### 4.2 Feature Workflow: Where Artifacts Go

When building a new feature (e.g., persona library, contract-lock), use this placement:

| Stage                      | Location                                         | Tier | What goes here                                            |
| -------------------------- | ------------------------------------------------ | ---- | --------------------------------------------------------- |
| **Research & exploration** | `_NOTES/efforts/{effort-id}/prep/`               | 3    | Raw research, competitor notes, brainstorm outputs        |
| **Planning & design**      | `_NOTES/efforts/{effort-id}/planning/`           | 3    | Draft plans, option analyses, scope explorations          |
| **Final spec**             | `_NOTES/efforts/{effort-id}/final-spec/`         | 3    | Working spec that drives implementation                   |
| **Blocking decision**      | `docs/internal/delivery-plan/`                   | 1    | Decision that affects release behavior — **promote here** |
| **Release checklist**      | `docs/internal/release-planning/checklist_v*.md` | 1    | Forward-looking execution plan                            |
| **Shipped artifact**       | `docs/releases/Release_v*.md`                    | 1    | Post-ship release notes                                   |

### 4.3 Promotion Rules (unchanged from existing policy)

Promote from Tier 3 to Tier 1 when:

- A decision affects release behavior, compatibility, or contracts
- Content needs to be visible to contributors who don't have `_NOTES/`
- An artifact becomes the canonical reference (not a working draft)

**Do not promote:** Raw research, iteration drafts, chat exports, brainstorm notes.

### 4.4 What Stays in _NOTES/ Permanently

| Content type                       | Location                                    | Why it stays                             |
| ---------------------------------- | ------------------------------------------- | ---------------------------------------- |
| Active feature effort workspaces   | `_NOTES/efforts/`                           | Working drafts, not canonical            |
| Chat exports and research archives | `_NOTES/chat-exports/`, `_NOTES/resources/` | Background material                      |
| Submission tracking                | `_NOTES/repo-submission/`                   | Operational tracking, not project docs   |
| Archived process experiments       | `_NOTES/_archived-agentic-process/`         | Historical, explicitly superseded        |
| Vision/strategy notes              | `_NOTES/VISION.md`                          | Strategic framing that may not be public |

---

## 5. Foundational Skills and Commands

### 5.1 Skills That Need Updates

**None.** All 25 skills are structurally complete and consistently formatted. The foundation-persona frontmatter divergence (M-4) is cosmetic and handled by the lint script.

### 5.2 Commands That Need Updates

#### `wrap-session` — Add CONTEXT.md currency check

The `wrap-session` command currently updates README, CHANGELOG, agent context files, and creates session logs. But it does not verify that CONTEXT.md reflects the current release version. This is why CONTEXT.md drifted 7 releases behind.

**Proposed change:** Add a step to the wrap-session workflow that checks `AGENTS/claude/CONTEXT.md` header against the latest CHANGELOG version and flags a mismatch.

This is the only command change needed. Details in Action A-5 below.

### 5.3 Scripts That Need Updates

**None.** All 4 script pairs are current, documented, and cross-platform.

---

## 6. Prioritized Action Plan

Eleven actions, ordered smallest-to-largest. Each is independently shippable. See **Agent Assignment** at the end for recommended Claude vs Codex split.

---

### A-1. Commit the .claude/settings.json deletion

**Why:** Clean git state is prerequisite for a clean baseline.
**Effort:** < 5 minutes
**Risk:** None (file contained one `gh issue list` permission)

<details>
<summary><strong>Execution steps</strong></summary>

**Verify the deletion is safe:**

```bash
cd "E:\Projects\product-on-purpose\pm-skills"
git show HEAD:.claude/settings.json
```

Expected: `{ "permissions": { "allow": ["Bash(gh issue list:*)"] } }`

**Commit:**

```bash
git add .claude/settings.json
git commit -m "chore: remove tracked .claude/settings.json (machine-specific permissions)"
```

**Verify:**

```bash
git status
# Should show no pending changes related to .claude/
```

</details>

---

### A-2. Fix CHANGELOG.md _NOTES/ reference

**Why:** Public file must not reference gitignored paths (CLAUDE.md rule).
**Effort:** < 5 minutes
**Risk:** None

<details>
<summary><strong>Execution steps</strong></summary>

**Open:** `CHANGELOG.md`, line 24-25

**Current text:**

```markdown
- Sample coverage manifest moved to release-planning artifacts:
  - `_NOTES/delivery-plan/releases/v2.6.1/artifacts/skill-output-samples_manifest.v2.6.1.json`
```

**Replace with:**

```markdown
- Sample coverage manifest moved to release-planning artifacts (internal)
```

**Commit:**

```bash
git add CHANGELOG.md
git commit -m "fix(docs): remove _NOTES/ path reference from CHANGELOG per documentation rules"
```

</details>

---

### A-3. Remove stale docs/templates/skill-template.md redirect

**Why:** Confusing single-line file coexisting with the proper directory.
**Effort:** < 5 minutes
**Risk:** None (the directory `docs/templates/skill-template/` has the real content)

<details>
<summary><strong>Execution steps</strong></summary>

**Verify the file is a stub:**

```bash
cat docs/templates/skill-template.md
```

If it's a one-liner redirect, delete it:

```bash
git rm docs/templates/skill-template.md
git commit -m "chore: remove stale skill-template.md redirect (directory version is canonical)"
```

</details>

---

### A-4. Update AGENTS/claude/CONTEXT.md to v2.6.1

**Why:** This is the most impactful fix. Every new session reads this file first.
**Effort:** 20-30 minutes
**Risk:** Low (file is Tier 1 tracked, changes are factual updates)

<details>
<summary><strong>Execution steps</strong></summary>

**Use this prompt in a Claude Code session:**

> Read `AGENTS/claude/CONTEXT.md` and `CHANGELOG.md` (full contents). Update CONTEXT.md to reflect the current state of the repo:
>
> 1. **Current State header**: Change status to `v2.6.1 shipped`, update the date to `2026-03-04`, update the release link, and update the Next Step to reflect what's actually next.
> 2. **Recent Work section**: Add entries for v2.4 through v2.6.1 releases, summarizing what each release delivered. Use the CHANGELOG as source.
> 3. **Recent Infrastructure section**: Update command count (26), skill count (25), mention sample library (97 samples), mention plugin manifest.
> 4. **Next Steps section**: Remove completed items, add current priorities.
> 5. **Skills Inventory**: Update if any changes (foundation-persona is now v2.5.0).
>
> Do not change the document structure. Only update facts. Preserve the existing writing style.

**Commit:**

```bash
git add AGENTS/claude/CONTEXT.md
git commit -m "docs(agents): update CONTEXT.md to v2.6.1 state (was stuck at v2.3.0)"
```

</details>

---

### A-5. Add CONTEXT.md currency check to wrap-session

**Why:** Prevents CONTEXT.md from going stale again. This is the systemic fix.
**Effort:** 15-20 minutes
**Risk:** Low (additive change to existing workflow)

<details>
<summary><strong>Execution steps</strong></summary>

**Locate the wrap-session skill:**

- Canonical: `skills/wrap-session/SKILL.md` (if it exists as a tracked skill)
- Or command only: `commands/wrap-session.md`

**Add this check to the wrap-session workflow instructions** (in whatever file defines the steps):

After the existing "Update CHANGELOG" step, add:

> **Verify CONTEXT.md currency**
>
> 1. Read the `## Current State` header in `AGENTS/claude/CONTEXT.md`
> 2. Compare the version stated there against the latest version in `CHANGELOG.md`
> 3. If they differ, update CONTEXT.md to reflect the current release
> 4. If no release happened this session, verify the "Next Step" line is still accurate

**Commit:**

```bash
git add skills/wrap-session/SKILL.md  # or commands/wrap-session.md
git commit -m "feat(wrap-session): add CONTEXT.md currency check to prevent staleness"
```

</details>

---

### A-6. Backfill AGENTS/DECISIONS.md and mark shipped checklists

**Why:** Housekeeping that improves the cross-agent index and release planning hygiene.
**Effort:** 15-20 minutes
**Risk:** None

<details>
<summary><strong>Execution steps — Part 1: Backfill shared decisions</strong></summary>

**Use this prompt:**

> Read `AGENTS/claude/DECISIONS.md` and `AGENTS/DECISIONS.md`. Identify decisions in the Claude-specific log that affect multiple agents or external contributors. Add concise summary entries to `AGENTS/DECISIONS.md` for:
>
> - Apache 2.0 license choice (affects all contributors)
> - MCP Sync Automation — Validation-Only approach (affects CI and MCP repo)
> - Make validate-mcp-sync blocking (affects CI)
>
> Use the existing format in AGENTS/DECISIONS.md. Keep entries to 3-4 lines each.

**Commit:**

```bash
git add AGENTS/DECISIONS.md
git commit -m "docs(agents): backfill shared DECISIONS.md with cross-agent decisions"
```

</details>

<details>
<summary><strong>Execution steps — Part 2: Mark shipped checklists</strong></summary>

For each of these files:

- `docs/internal/release-planning/checklist_v2.2.0.md`
- `docs/internal/release-planning/checklist_v2.3.0.md`
- `docs/internal/release-planning/checklist_v2.4.0.md`
- `docs/internal/release-planning/checklist_v2.5.0.md`

Add `Status: Shipped` to the header (if not already present), per the conventions in `docs/internal/release-planning/README.md`.

**Commit:**

```bash
git add docs/internal/release-planning/checklist_v*.md
git commit -m "docs(release-planning): mark v2.2-v2.5 checklists as Shipped"
```

</details>

---

### A-7. Backfill classification documentation (from Q-1)

**Why:** The `classification` frontmatter field shipped in v2.5.0 with lint enforcement but zero user-facing docs. Anyone authoring a foundation/utility skill has no guidance.
**Effort:** 20 minutes
**Risk:** None (additive documentation)

<details>
<summary><strong>Execution steps</strong></summary>

**1. Update `docs/reference/frontmatter-schema.yaml`:**

Add the `classification` field definition alongside the existing `phase` field:

```yaml
classification:
  type: string
  enum: [domain, foundation, utility]
  description: >
    Used instead of 'phase' for skills that are not tied to a specific
    Triple Diamond phase. Mutually exclusive with 'phase'.
  required_when: "phase is absent"
```

**2. Update `docs/guides/authoring-pm-skills.md`:**

Add a section after the phase explanation:

> **Foundation and utility skills**
>
> Skills that span the entire product lifecycle (like persona management) use `classification:` instead of `phase:` in their frontmatter. The values are:
>
> - `foundation` — skills that support all phases (e.g., persona)
> - `utility` — helper skills (e.g., wrap-session)
> - `domain` — domain-specific skills not tied to a phase
>
> The `phase` and `classification` fields are mutually exclusive. The lint script (`scripts/lint-skills-frontmatter.sh`) enforces this.

**3. Update `docs/agent-skill-anatomy.md`:**

Add a note that not all skills have a `phase:` — some use `classification:` for cross-phase skills.

**Commit:**

```bash
git add docs/reference/frontmatter-schema.yaml docs/guides/authoring-pm-skills.md docs/agent-skill-anatomy.md
git commit -m "docs: backfill classification field documentation (shipped in v2.5.0, never documented)"
```

</details>

---

### A-8. Create `scripts/check-context-currency.sh` + `.ps1` (from Q-4)

**Why:** Enables automated detection of stale CONTEXT.md files across all agents.
**Effort:** 20 minutes
**Risk:** None (new script, no existing behavior changed)

<details>
<summary><strong>Execution steps</strong></summary>

**Create `scripts/check-context-currency.sh`:**

The script should:

1. Find all `AGENTS/*/CONTEXT.md` files
2. Extract the version from the `Status:` line (regex: `v[0-9]+\.[0-9]+\.[0-9]+`)
3. Extract the latest version from `CHANGELOG.md` (first `## [vX.Y.Z]` heading)
4. Compare — if they differ, print a warning and exit with code 1
5. If all match, exit 0

**Key design choices:**

- Agent-agnostic: checks every `AGENTS/*/CONTEXT.md` it finds
- No auto-fix: just reports the discrepancy
- CI-friendly exit codes: 0 = pass, 1 = stale detected

**Create `scripts/check-context-currency.ps1`:**

PowerShell equivalent for Windows development.

**Commit:**

```bash
git add scripts/check-context-currency.sh scripts/check-context-currency.ps1
git commit -m "feat(scripts): add CONTEXT.md currency check for CI and local use"
```

</details>

---

### A-9. Add CI advisory step to `.github/workflows/validation.yml` (from Q-4)

**Why:** Surfaces CONTEXT.md staleness as a visible warning on PRs, without blocking merges.
**Effort:** 15 minutes
**Risk:** Low (advisory only — cannot break existing CI)
**Depends on:** A-8 (the script must exist first)

<details>
<summary><strong>Execution steps</strong></summary>

**Add a new step to the existing validation workflow:**

```yaml
- name: Check CONTEXT.md currency
  run: bash scripts/check-context-currency.sh
  continue-on-error: true  # Advisory — never blocks merge
```

The `continue-on-error: true` flag means:

- If CONTEXT.md is current → green check
- If CONTEXT.md is stale → yellow warning annotation (visible in Checks tab)
- Either way, the PR can still merge

**Commit:**

```bash
git add .github/workflows/validation.yml
git commit -m "ci: add advisory CONTEXT.md currency check (non-blocking)"
```

</details>

---

### A-10. Consolidate release governance into `docs/internal/release-plans/` (from Q-2)

**Why:** Three overlapping locations (`docs/internal/release-planning/`, `docs/internal/delivery-plan/`, `_NOTES/delivery-plan/`) cause confusion about where to find canonical release artifacts. Unifying to one structure.
**Effort:** 30-45 minutes
**Risk:** Low (moves tracked files, updates README pointers)

<details>
<summary><strong>Execution steps</strong></summary>

**1. Create the new structure:**

```
docs/internal/release-plans/
├── README.md              <- How to use this directory (status lifecycle, what goes where)
├── v2.2.0/
│   └── checklist.md       <- moved from release-planning/checklist_v2.2.0.md
├── v2.3.0/
│   └── checklist.md
├── v2.4.0/
│   ├── checklist.md
│   └── decisions.md       <- moved from delivery-plan/v2.4-*.md
├── v2.5.0/
│   ├── checklist.md
│   └── decisions.md       <- moved from delivery-plan/v2.5-*.md
├── v2.5.1/                <- NEW (backfill — was missing)
│   └── checklist.md       <- minimal: "Shipped 2026-02-XX. Hotfix release."
├── v2.5.2/                <- NEW (backfill)
│   └── checklist.md
├── v2.6.0/                <- NEW (backfill)
│   └── checklist.md
└── v2.6.1/
    └── checklist.md
```

**2. Move existing files:**

```bash
# Create version directories
for v in v2.2.0 v2.3.0 v2.4.0 v2.5.0 v2.5.1 v2.5.2 v2.6.0 v2.6.1; do
  mkdir -p "docs/internal/release-plans/$v"
done

# Move checklists
git mv docs/internal/release-planning/checklist_v2.2.0.md docs/internal/release-plans/v2.2.0/checklist.md
git mv docs/internal/release-planning/checklist_v2.3.0.md docs/internal/release-plans/v2.3.0/checklist.md
git mv docs/internal/release-planning/checklist_v2.4.0.md docs/internal/release-plans/v2.4.0/checklist.md
git mv docs/internal/release-planning/checklist_v2.5.0.md docs/internal/release-plans/v2.5.0/checklist.md

# Move decision records
git mv docs/internal/delivery-plan/v2.4-*.md docs/internal/release-plans/v2.4.0/decisions.md
git mv docs/internal/delivery-plan/v2.5-*.md docs/internal/release-plans/v2.5.0/decisions.md
```

**3. Create minimal backfill checklists for v2.5.1, v2.5.2, v2.6.0, v2.6.1:**

Each should contain:

```markdown
# Release Checklist — vX.Y.Z
Status: Shipped
Date: YYYY-MM-DD (from CHANGELOG.md)

Backfilled during repo-hygiene audit. See CHANGELOG.md for full release details.
```

**4. Write `docs/internal/release-plans/README.md`:**

Explain the structure, status lifecycle (Planned → In progress → Shipped → Superseded), what goes in each version directory (checklist, decisions, post-ship review if applicable).

**5. Remove empty old directories** (if all files have been moved):

```bash
git rm -r docs/internal/release-planning/  # after moving all checklists
git rm -r docs/internal/delivery-plan/      # after moving all decisions
```

Note: preserve any README.md files in the old directories if they contain useful policy content — fold that into the new `docs/internal/release-plans/README.md`.

**6. Update planning-persistence-policy.md** — change Tier 1 references from `docs/internal/release-planning/*.md` and `docs/internal/delivery-plan/*.md` to `docs/internal/release-plans/**/*.md`.

**Commit:**

```bash
git add docs/internal/release-plans/ docs/internal/planning-persistence-policy.md
git rm -r docs/internal/release-planning/ docs/internal/delivery-plan/
git commit -m "docs(internal): consolidate release governance into docs/internal/release-plans/{version}/"
```

</details>

---

### A-11. Set up effort tracking (from Q-3)

**Why:** Enables agent-accessible effort context across local and cloud environments. Three-layer system: GitHub Issues (lifecycle) + tracked briefs (specs) + `_NOTES/` (working space).
**Effort:** 30 minutes
**Risk:** None (new files, new Issues)

<details>
<summary><strong>Execution steps</strong></summary>

**1. Create `docs/internal/efforts/` directory with brief files for existing efforts:**

```bash
mkdir -p docs/internal/efforts
```

Create brief files for shipped and active efforts:

- `F-02-persona-brief.md` — Status: Shipped, Milestone: v2.5.0
- `F-03-persona-library-brief.md` — Status: Active, Milestone: v2.7.0
- `M-10-sample-library-brief.md` — Status: Shipped, Milestone: v2.6.1

Use the brief template from Q-3 (scope, key decisions, artifacts produced, PR links).

**2. Create GitHub Issues for each effort:**

```bash
# Create effort label
gh label create effort --description "Feature or maintenance effort" --color 0E8A16

# Create issues (adjust titles/bodies as needed)
gh issue create --title "[F-02] Persona skill" --label effort --body "Status: Shipped (v2.5.0). Brief: docs/internal/efforts/F-02-persona-brief.md"
gh issue create --title "[F-03] Persona library Tier-0" --label effort --body "Status: Active. Brief: docs/internal/efforts/F-03-persona-library-brief.md"
gh issue create --title "[M-10] Sample outputs library" --label effort --body "Status: Shipped (v2.6.1). Brief: docs/internal/efforts/M-10-sample-library-brief.md"
```

Close shipped efforts immediately:

```bash
gh issue close <F-02 number> --comment "Shipped in v2.5.0"
gh issue close <M-10 number> --comment "Shipped in v2.6.1"
```

**3. Create milestones for releases:**

```bash
gh api repos/{owner}/{repo}/milestones -f title="v2.7.0" -f state="open"
```

Assign active effort issues to the milestone.

**4. Commit tracked files:**

```bash
git add docs/internal/efforts/
git commit -m "docs(efforts): add effort brief files and establish 3-layer tracking (Q-3)"
```

</details>

---

### Action Summary

| #    | Action                                      | Effort    | Type                | Source | Agent  |
| ---- | ------------------------------------------- | --------- | ------------------- | ------ | ------ |
| A-1  | Commit .claude/settings.json deletion       | 5 min     | Git hygiene         | Audit  | Claude |
| A-2  | Fix CHANGELOG.md _NOTES/ reference          | 5 min     | Compliance fix      | Audit  | Claude |
| A-3  | Remove stale skill-template.md redirect     | 5 min     | Cleanup             | Audit  | Claude |
| A-4  | Update CONTEXT.md to v2.6.1                 | 20-30 min | Critical state fix  | Audit  | Claude |
| A-5  | Add CONTEXT.md check to wrap-session        | 15-20 min | Systemic prevention | Q-4    | Claude |
| A-6  | Backfill shared decisions + mark checklists | 15-20 min | Housekeeping        | Audit  | Codex  |
| A-7  | Backfill classification documentation       | 20 min    | Documentation debt  | Q-1    | Codex  |
| A-8  | Create check-context-currency scripts       | 20 min    | Tooling             | Q-4    | Claude |
| A-9  | Add CI advisory step                        | 15 min    | CI improvement      | Q-4    | Claude |
| A-10 | Consolidate release governance              | 30-45 min | Structural cleanup  | Q-2    | Codex  |
| A-11 | Set up effort tracking                      | 30 min    | Process             | Q-3    | Claude |

**Total estimated effort: ~185-215 minutes (~3-3.5 hours)**

Suggested execution order: A-1 → A-2 → A-3 → A-4 → A-6 → A-7 → A-5 → A-8 → A-9 → A-10 → A-11

---

### Agent Assignment: Claude Opus 4.6 vs Codex GPT-5.4

**Principle:** Assign based on what each agent does best, not just to split the work evenly.

| Strength         | Claude Code (Opus 4.6)                                                                               | Codex (GPT-5.4 Extra High)                                                                           |
| ---------------- | ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **Best at**      | Local file operations, git commits, script authoring, CI workflow editing, skill/command modifications, nuanced context-aware edits | Bulk document generation, structured backfills, cross-file consistency sweeps, pattern application across many files |
| **Access to**    | `_NOTES/` (local), all repo files, shell, `gh` CLI                                                   | Clean checkout only (no `_NOTES/`), tracked files, `gh` CLI                                          |
| **Risk profile** | Can iterate and self-correct locally                                                                 | Runs in sandbox; good for isolated, well-scoped tasks                                                |

**Claude Code (Opus 4.6) — 8 actions:**

| Action                                        | Why Claude                                                                                           |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **A-1** Commit .claude/settings.json deletion | Local git state, trivial but needs shell access                                                      |
| **A-2** Fix CHANGELOG.md reference            | Requires understanding CLAUDE.md documentation rules in context                                      |
| **A-3** Remove stale redirect                 | Local git rm, needs verification of directory contents                                               |
| **A-4** Update CONTEXT.md to v2.6.1           | **Critical.** Requires reading CHANGELOG + understanding narrative context. Claude wrote the original CONTEXT.md and has session history. Highest-judgment task. |
| **A-5** Add CONTEXT.md check to wrap-session  | Modifying a skill that Claude Code uses directly. Needs to understand the wrap-session workflow from the inside. |
| **A-8** Create check-context-currency scripts | Shell scripting (bash + PowerShell). Claude has stronger script authoring and can test locally.      |
| **A-9** Add CI advisory step                  | YAML workflow edit that depends on A-8 script. Same session as A-8 for coherence.                    |
| **A-11** Set up effort tracking               | Requires `gh` CLI for Issue/label/milestone creation + writing brief files informed by `_NOTES/efforts/` content (which only Claude can see). |

**Codex (GPT-5.4 Extra High) — 3 actions:**

| Action                                          | Why Codex                                                                                            |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **A-6** Backfill DECISIONS.md + mark checklists | Well-scoped cross-file consistency task. Read agent-specific DECISIONS.md files, extract entries that belong in the shared log, write summaries. Add status headers to 4 checklist files. No `_NOTES/` access needed — all source files are tracked. |
| **A-7** Backfill classification documentation   | Structured documentation generation across 3 files (frontmatter-schema.yaml, authoring guide, anatomy doc). All inputs are in tracked files. Clear pattern to apply. |
| **A-10** Consolidate release governance         | Bulk file moves + directory restructuring + README creation. Well-suited to Codex's strength at following explicit file-operation instructions across many files. All source files are tracked. |

**Why this split:**

- **Claude gets the judgment-heavy and local-access tasks.** A-4 (CONTEXT.md update) is the most impactful action and needs narrative understanding. A-5, A-8, A-9 form a coherent cluster (wrap-session + scripts + CI) that should be done in one session. A-11 needs `_NOTES/` access.
- **Codex gets the structured, self-contained bulk operations.** A-6, A-7, A-10 are all "read these files, apply this pattern, write these files" tasks that don't need local scratch access or iterative judgment. Codex excels at these well-scoped sweeps.
- **No cross-dependencies between the two groups.** Claude's actions and Codex's actions can run in parallel. The only ordering constraint is within each group (A-8 before A-9).

---

## 7. Open Questions (all 4 resolved)

Each question follows a consistent format: context, discussion, resolution status, and any remaining sub-questions.

Legend: **RESOLVED** = decision made, ready to execute | **AGREED** = direction set, details being refined | **OPEN** = needs further input

---

### Q-1. Classification documentation debt from v2.5.0 — RESOLVED

**Decision:** Update three user-facing docs to document the `classification:` convention.

**Rationale:** The convention shipped in v2.5.0 and is enforced by the lint script, but the reference docs that skill authors actually read were never updated. This is documentation debt.

**Actions (new A-7):** Update these files (~20-30 min total):

1. `docs/reference/frontmatter-schema.yaml` — Add `classification` field definition with enum values (`domain`, `foundation`, `utility`) and the mutual-exclusion rule with `phase`
2. `docs/guides/authoring-pm-skills.md` — Add a "Phase vs Classification" section explaining when to use each
3. `docs/agent-skill-anatomy.md` — Add a note on foundation skill structure differences

<details>
<summary>Discussion history</summary>

**Original question:** Should `classification:` vs `phase:` be documented as a formal convention?

**Options considered:** (a) Document the convention, (b) Leave implicit, (c) Unify to `phase:` with `foundation` value

**Owner response:** "Foundation classification was supposed to be released with the recent versions. The documentation should exist somewhere, but clearly everything wasn't updated."

**Investigation (2026-03-09):** Found that enforcement code is complete (lint scripts validate 3 values: `domain`, `foundation`, `utility`) and release notes documented the breaking change. But three key user-facing docs were never updated:

| Location                                 | Gap         | What's missing                                        |
| ---------------------------------------- | ----------- | ----------------------------------------------------- |
| `docs/reference/frontmatter-schema.yaml` | Critical    | No `classification` field at all                      |
| `docs/guides/authoring-pm-skills.md`     | Significant | No mention of when to use `classification` vs `phase` |
| `docs/agent-skill-anatomy.md`            | Structural  | No explanation of foundation skill differences        |

**Where it IS documented:** lint scripts (enforcement), `scripts/lint-skills-frontmatter.md` (rules), `docs/releases/Release_v2.5.0.md` (migration matrix), `AGENTS.md` (structural heading), `CHANGELOG.md` (brief mention).

**Owner resolution:** "We definitely need to update the documentation resources so they are current and correct!"

</details>

---

### Q-2. Consolidate release governance into `docs/internal/release-plans/` — AGREED

**Decision:** Merge `docs/internal/release-planning/` and `docs/internal/delivery-plan/` into a unified `docs/internal/release-plans/` organized by version. Use status markers for lifecycle, not separate directories.

**Rationale:** Three overlapping locations (`release-planning/`, `delivery-plan/`, `_NOTES/delivery-plan/`) created confusion and governance drift. A single location with lifecycle status is cleaner and matches how most projects handle this.

**How shipped vs. in-progress works (the best-practice answer to the follow-up):**

The same directory holds both. The status field is the differentiator, not the location:

| Release lifecycle stage | What happens                                                               |
| ----------------------- | -------------------------------------------------------------------------- |
| **Planning starts**     | Create `docs/internal/release-plans/v2.7.0/checklist.md` with `Status: Planned` |
| **Work begins**         | Update to `Status: In Progress`                                            |
| **Release ships**       | Update to `Status: Shipped`                                                |
| **Blocker arises**      | Add decision record to same version directory                              |

This means at any given time, `docs/internal/release-plans/` might contain:

- Several `Shipped` version folders (historical record)
- One `In Progress` folder (current release)
- Optionally one `Planned` folder (next release, if planning ahead)

`_NOTES/delivery-plan/` remains the *working scratch* during release prep (drafts, bundles, runbooks, experiments). Once the release ships, the final checklist is promoted to tracked `docs/internal/release-plans/v2.X.Y/`. The `_NOTES/` working copy stays as personal archive.

**Target structure:**

```
docs/internal/release-plans/
├── README.md                         ← lifecycle rules, status values, patch vs minor/major policy
├── runbook_cut-tag-publish.md        ← shared procedure (moved from release-planning/)
├── v2.2.0/
│   └── checklist.md                  Status: Shipped
├── v2.3.0/
│   └── checklist.md                  Status: Shipped
├── v2.4.0/
│   ├── checklist.md                  Status: Shipped
│   └── contract-lock-summary.md      (decision record)
├── v2.5.0/
│   ├── checklist.md                  Status: Shipped
│   ├── B-05-foundation-phase-decision.md
│   ├── B-06-persona-decision-record.md
│   └── closure-path.md
├── v2.6.0/
│   └── checklist.md                  Status: Shipped (promoted from _NOTES/)
└── v2.6.1/
    └── checklist.md                  Status: Shipped (backfilled)
```

**Patch version policy:** Patches (v2.X.Y where Y > 0) don't require checklists unless scope is non-trivial. Release notes in `docs/releases/` are sufficient for patches.

**Actions (replaces original A-6):**

1. Create `docs/internal/release-plans/` with README.md
2. Move files from `release-planning/` and `delivery-plan/` into version subdirectories
3. Promote v2.6.0 checklist from `_NOTES/`
4. Backfill v2.6.1 checklist
5. Delete old `release-planning/` and `delivery-plan/` directories
6. Update `planning-persistence-policy.md` to reflect new structure

**Effort:** ~30-45 minutes

<details>
<summary>Discussion history</summary>

May

| Directory                 | Purpose                                                | Audience                | Changes?                                                               |
| ------------------------- | ------------------------------------------------------ | ----------------------- | ---------------------------------------------------------------------- |
| `docs/releases/`          | **Public release notes** (e.g., `Release_v2.6.1.md`)   | End users, contributors | **No change.** Stays exactly as-is.                                    |
| `docs/internal/release-plans/` | **Internal governance** (checklists, decision records) | Maintainers, agents     | **NEW.** This is what replaces `release-planning/` + `delivery-plan/`. |

The status field (`Planned` → `In Progress` → `Shipped`) goes in the *internal* checklists at `docs/internal/release-plans/v2.X.Y/checklist.md`. The public release notes in `docs/releases/` are never touched by this change.

**Concrete example of what "before release" vs "after release" looks like:**

Before v2.7.0 ships:

```
docs/releases/                    ← public, no v2.7.0 file yet
docs/internal/release-plans/v2.7.0/
    └── checklist.md              Status: In Progress
_NOTES/delivery-plan/releases/v2.7.0/
    ├── RELEASE_BUNDLE.md         ← working scratch
    └── RUNBOOK.md                ← working scratch
```

After v2.7.0 ships:

```
docs/releases/
    └── Release_v2.7.0.md         ← public release notes (created at ship time)
docs/internal/release-plans/v2.7.0/
    └── checklist.md              Status: Shipped (promoted from _NOTES/ or updated in place)
_NOTES/delivery-plan/releases/v2.7.0/
    └── (stays as personal archive)
```

</details>

---

### Q-3. Where should effort tracking live? — AGREED

**Decision: Approach D — GitHub Issue + one tracked brief per effort.**

Three layers, each doing one job:

| Layer                                         | What it holds                        | Who maintains it                   | Who reads it              |
| --------------------------------------------- | ------------------------------------ | ---------------------------------- | ------------------------- |
| **GitHub Issue** (`effort` label + milestone) | Status, lifecycle, cross-refs to PRs | You (open/close)                   | Everyone                  |
| **`docs/internal/efforts/{id}-brief.md`**     | Spec, scope, key decisions, PR links | You/agent at start + end of effort | All agents, collaborators |
| **`_NOTES/efforts/{id}/`**                    | Discovery, prep, drafts, scratch     | You/agent during active work       | Local agents only         |

**Why this over the earlier proposals:**

The owner's feedback identified two gaps the previous approaches all had:

1. GitHub Issues alone are too thin — can't hold discovery, specs, or be collaborated on with agents
2. `_NOTES/` is gitignored — cloud agents (Codex) and collaborators on other machines can't see it

The tracked brief file bridges that gap. It's small enough to avoid drift (one file per effort, ~20-50 lines, updated at start and end only) but rich enough that any agent — local or cloud — can understand the effort's scope and decisions.

**What the brief file contains:**

```markdown
# [F-03] Persona Library Tier-0
Status: Active
Milestone: v2.7.0
Issue: #42

## Scope
One-paragraph description of what this effort delivers.

## Key Decisions
- Decision 1 (link to DECISIONS.md entry if applicable)
- Decision 2

## Artifacts Produced
- `skills/foundation-persona/` (updated)
- `library/personas/` (new)

## PRs
- #38 — initial persona template
- #41 — library scaffolding
```

**What `_NOTES/efforts/` looks like (unchanged — no deletions):**

```
_NOTES/                                    <- Personal scratch + working space
├── efforts/                               <- Working drafts (prep/, planning/, notes/)
│   ├── F-02/                              <- Rich discovery, prep, drafts
│   ├── F-03/
│   └── M-10/
├── delivery-plan/                         <- Release prep scratch
├── library-working/                       <- Pre-release persona library drafts
├── repo-submission/                       <- Awesome-list submission tracking
├── resources/                             <- Reference materials
├── baseline-standards/                    <- This plan and related prompts
├── VISION.md                              <- Strategic framing
├── _archive/                              <- Old README versions (kept)
├── _archived-agentic-process/             <- Superseded plans (kept)
├── chat-exports/                          <- Old conversation exports (kept)
└── backup-git/                            <- Git snapshot (kept)
```

**What `docs/internal/efforts/` looks like (new, minimal):**

```
docs/internal/efforts/
├── F-02-persona-brief.md         <- shipped (Status: Shipped)
├── F-03-persona-library-brief.md <- active
└── M-10-sample-library-brief.md  <- shipped
```

<details>
<summary>Discussion history</summary>

**Original question:** Should _NOTES/ get a cleanup pass?

**Options considered:** (a) Clean up now, (b) Clean up later, (c) Don't bother

**Owner response:** "I do not want to delete /_archive, /chat-exports, or /backup-git or related archive folders. I would rather just keep _NOTES for random stuff like that that I don't want to delete, but don't need to be surfaced in the released repo in any way. I need the vision for what it looks like to move /efforts/ and other resources appropriately out of _NOTES and into /docs/internal/"

**First proposal:** `docs/internal/efforts/` with active/done/backlog subdirectories + promotion workflow from _NOTES/.

**Owner pushback:** "I don't really like or see how /docs/internal/efforts/ is best practice or scalable. It seems really prone to drift and confusion. Surely there are better practices... perhaps that partly use github issues."

**Rethink (round 2):** Dropped the parallel file tree. Proposed three approaches: (A) GitHub Issues only, (B) Single backlog file, (C) Don't track. Recommended A.

**Owner pushback (round 3):** "It seems like we are still missing critical options here. It makes sense there should be a github issue. However, the github issue can't hold all the discovery and other resources... and can't be executed / collaborated on as well with agents."

**Key insight:** The real gap was agent accessibility. `_NOTES/` is invisible to cloud agents (Codex). Issues are too thin for specs. Need a tracked bridge file. Led to Approach D (GitHub Issue + tracked brief + `_NOTES/` working space).

**Also considered Approach E** (effort section in CONTEXT.md instead of separate brief files) — rejected because it overloads CONTEXT.md and briefs are too thin when embedded as 2-3 lines.

</details>

---

### Q-4. CONTEXT.md staleness prevention — AGREED (details being refined)

**Decision:** Two layers: CI advisory check (non-blocking) + wrap-session skill update. Defer the Stop hook — owner had a bad experience with hooks previously and wants to start simpler.

**Scope:** Both `AGENTS/claude/CONTEXT.md` and `AGENTS/codex/CONTEXT.md`. No centralized `AGENTS/CONTEXT.md` (agreed — would just be a third place to maintain).

**What we agreed on:**

- No auto-updating CONTEXT.md in CI (narrative content needs human/agent judgment)
- No centralized `AGENTS/CONTEXT.md` (shared facts already in CHANGELOG.md and README.md)
- The `check-context-currency.sh` script checks ALL `AGENTS/*/CONTEXT.md` files — agent-agnostic, works for both Claude and Codex
- CI check should be **advisory** (warning annotation, not blocking) — best practice for documentation checks

**Answers to owner follow-up questions:**

**1. Do CONTEXT.md files reference DECISIONS.md?**

No. They're sibling files in the same `AGENTS/{agent}/` directory, maintained in parallel by convention. CONTEXT.md tracks project *state* (version, next steps, recent work). DECISIONS.md tracks *choices* (architecture, process). Neither explicitly cross-references the other in its content. The link is structural (same directory) not textual.

**2. Is check-context-currency.sh for Codex too?**

Yes. The script would check every `AGENTS/*/CONTEXT.md` it finds — it's not Claude-specific. If `AGENTS/codex/CONTEXT.md` exists and has a version in its Status line, the script checks that too. This means it catches drift for any current or future agent.

**3. Bad experience with hooks**

Understood. The Stop hook is deferred. The two-layer approach (CI advisory + wrap-session skill) gives you drift detection without the complexity of hooks. If drift persists after a few release cycles, you can revisit adding a hook later.

**4. CI advisory vs blocking — best practice reasoning:**

Advisory is the right starting point because:

- Documentation drift shouldn't prevent code merges (it's not a correctness issue)
- A warning annotation on the PR is visible enough to prompt action
- Blocking checks create merge friction that leads to people working around them
- You can always escalate to blocking later if advisory proves insufficient

**Implementation plan:**

| #   | Action                                              | What it does                                              | Effort  |
| --- | --------------------------------------------------- | --------------------------------------------------------- | ------- |
| A-5 | Update wrap-session skill                           | Adds CONTEXT.md currency check step                       | ~15 min |
| A-8 | Create `scripts/check-context-currency.sh` + `.ps1` | Compares CONTEXT.md version vs CHANGELOG for all agents   | ~20 min |
| A-9 | Add CI step to `.github/workflows/validation.yml`   | Runs check-context-currency as advisory annotation on PRs | ~15 min |

**Remaining sub-questions — resolved with guidance:**

**1. CI annotation vs PR comment?**

> Owner: "I don't know how to answer this and need more context / details and guidance."

Here's what each looks like in practice:

| Option         | What you see on a PR                                                                                 | Complexity                                       |
| -------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **Annotation** | A yellow warning icon next to the "Checks" section. You see `⚠ CONTEXT.md is behind CHANGELOG (v2.3.0 vs v2.6.1)`. Must click into the check details to see it. | Simple — just the script exit code + message     |
| **PR comment** | A bot comment posted directly in the PR conversation: "CONTEXT.md shows v2.3.0 but CHANGELOG is at v2.6.1. Please update AGENTS/claude/CONTEXT.md and AGENTS/codex/CONTEXT.md before merging." | Needs `github-script` action + write permissions |

**My call: Start with annotation only.** It's simpler to implement, doesn't require extra permissions, and is visible enough. If you find yourself missing the warnings (because they're tucked in the Checks tab), upgrade to PR comments later. This is a 5-minute change if needed.

**2. Check DECISIONS.md staleness too?**

> Owner: "I don't know how to answer this and need more context / details and guidance."

Here's why this is different from CONTEXT.md:

| File             | Staleness signal                                         | Can a script detect it?                                                                              |
| ---------------- | -------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **CONTEXT.md**   | Version number in "Status:" line doesn't match CHANGELOG | **Yes** — compare two strings                                                                        |
| **DECISIONS.md** | Missing entries that should have been added              | **No** — there's no version number to compare. You'd need AI judgment to know "this release had decisions that weren't logged." |

**My call: CONTEXT.md only for now.** A version check is objective and automatable. DECISIONS.md staleness is subjective — the script can't know what *should* be there. Instead, the wrap-session skill update (A-5) already includes a DECISIONS.md review step. That's the right layer for decisions.

**Both sub-questions are now resolved. No further input needed on Q-4.**

<details>
<summary>Discussion history</summary>

**Original question:** Should CONTEXT.md be updated manually or is wrap-session sufficient?

**Options considered:** (a) Wrap-session only, (b) CI check, (c) Manual discipline, (d) Both a+c

**Owner response:** "Both A and C ultimately require manual trigger. I would really like to feel confident this is getting regularly updated without remembering to do it. The right answer is probably A, B, C and/or something else... perhaps that uses a hook?"

**Owner sub-questions:** Does this apply to codex CONTEXT.md too? Is there such thing as a centralized AGENTS/CONTEXT.md? Does this apply to decisions?

**Investigation (2026-03-09):** Found Codex CONTEXT.md is also stale (v2.4.3). No centralized CONTEXT.md exists. DECISIONS.md (shared) has only 2 entries vs 10 total across agents.

**Automation layers evaluated:**

| Layer          | Reliability | Effort | Owner comfort                       |
| -------------- | ----------- | ------ | ----------------------------------- |
| Stop hook      | High        | Low    | **Deferred** (bad prior experience) |
| CI advisory    | High        | Medium | **Accepted**                        |
| CI blocking    | Highest     | Medium | Rejected (too much friction)        |
| wrap-session   | Medium      | Low    | **Accepted** (A-5)                  |
| Checklist item | Low         | None   | Acceptable but insufficient alone   |

**Owner follow-ups (round 2):**

- "Do CONTEXT.md files reference DECISIONS.md?" → No, sibling files by convention, not by reference.
- "Is check-context-currency.sh for Codex too?" → Yes, checks all AGENTS/*/CONTEXT.md.
- "Bad experience with hooks" → Deferred. Start with CI + wrap-session.
- "I align with 'what I would NOT recommend'" → No centralized CONTEXT.md, no auto-update in CI.

</details>

---

## 8. Not In Scope Now

These topics came up during the audit but are explicitly excluded from this plan:

| Topic                                                                             | Why excluded                                                         |
| --------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| **Memory tooling** (claude-mem, CASS, MemSearch, OpenMemory)                      | External tooling; doesn't affect repo baseline                       |
| **GSD or external workflow frameworks**                                           | Cross-project abstraction; not needed for repo hygiene               |
| **Speculative command wrappers** (`project-context`, `update-doc`, `link-docs`)   | Ideas in `AGENTS/claude/PLANNING/`; interesting but not foundational |
| **Cross-project abstractions** (shared CLAUDE.md patterns, multi-repo governance) | Out of scope for single-repo baseline                                |
| **Session log archival strategy**                                                 | `AGENTS/claude/SESSION-LOG/` is gitignored; pileup is cosmetic       |
| **Automation roadmap** (auto-sync, auto-release, auto-context-update)             | Premature; fix the manual process first, then consider automation    |
| **MCP server changes**                                                            | Separate repo (`pm-skills-mcp`); validated by existing CI            |
| **New skill development** (e.g., the idea_* docs in PLANNING/)                    | Feature work, not baseline hygiene                                   |
| **foundation-persona v2.5 changes**                                               | Already shipped; frontmatter divergence is tracked in Q-1            |

---

## Appendix: Files Inspected

For traceability, the full list of files and directories examined during this audit:

**Root files:** AGENTS.md, CLAUDE.md, README.md, CHANGELOG.md, .gitignore
**Agent files:** AGENTS/DECISIONS.md, AGENTS/claude/CONTEXT.md, AGENTS/claude/DECISIONS.md, AGENTS/claude/PLANNING/* (11 files), AGENTS/claude/SESSION-LOG/* (47 files)
**Claude config:** .claude/pm-skills-for-claude.md, .claude/commands/* (28 files), .claude/skills/* (28 dirs)
**Docs:** docs/getting-started.md, docs/agent-skill-anatomy.md, docs/guides/* (4), docs/reference/* (4), docs/frameworks/* (1), docs/templates/* (4), docs/internal/* (7 + subdirs), docs/releases/* (12)
**Skills:** skills/*/ (25 directories, 75 files total)
**Commands:** commands/*.md (26 files)
**Other:** _bundles/* (3), library/skill-output-samples/* (97), scripts/* (13), _NOTES/* (directory listing only)