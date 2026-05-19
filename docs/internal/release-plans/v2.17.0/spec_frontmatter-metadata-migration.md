# Spec: Frontmatter Metadata Migration (W1)

**Status:** READY FOR EXECUTION (pending v2.16.1 G4 P0 attestation per parent plan D6)
**Parent plan:** [`plan_v2.17.0.md`](plan_v2.17.0.md)
**Work item ID:** W1
**Effort estimate:** 2-3 effort-days
**Source:** Strategic roadmap R-05 (Section 5 of `../../_working/roadmap_opus-4.7-max_2026-05-14.md`)

---

## 1. What changes

Move proprietary skill-frontmatter fields under a `metadata:` block to comply with the agentskills.io open specification (released 2025-12-18; adopted by 12+ tools including Codex CLI, Gemini CLI, Cursor, Windsurf, Cline, Copilot).

Top-level frontmatter keeps only spec-canonical fields: `name`, `description`, `license`, and optional `compatibility`. All other current top-level proprietary fields (`classification`, `phase`, `version`, `updated`) move under `metadata:`.

### 1.1 Before / after example (phase skill)

**BEFORE (current v2.16.x convention):**

```yaml
---
name: deliver-prd
description: Create a Product Requirements Document with hypothesis, success criteria, scope, and acceptance criteria
classification: phase
phase: deliver
version: 1.0.0
updated: 2026-04-18
license: Apache-2.0
metadata:
  subset_kind: phase
  category: planning
  frameworks: [triple-diamond]
  author: product-on-purpose
---
```

**AFTER (post-v2.17.0):**

```yaml
---
name: deliver-prd
description: Create a Product Requirements Document with hypothesis, success criteria, scope, and acceptance criteria
license: Apache-2.0
compatibility:
  - claude-code
  - codex-cli
  - cursor
  - windsurf
  - copilot-cli
  - gemini-cli
metadata:
  classification: phase
  phase: deliver
  version: 1.0.0
  updated: 2026-04-18
  subset_kind: phase
  category: planning
  frameworks: [triple-diamond]
  author: product-on-purpose
---
```

### 1.2 Before / after example (utility dispatch skill)

**BEFORE:**

```yaml
---
name: utility-pm-critic
description: Run adversarial review on a PM artifact via the pm-critic sub-agent. ...
classification: utility
version: "1.0.0"
updated: 2026-05-17
license: Apache-2.0
metadata:
  category: review
  frameworks: [triple-diamond]
  author: product-on-purpose
---
```

**AFTER:**

```yaml
---
name: utility-pm-critic
description: Run adversarial review on a PM artifact via the pm-critic sub-agent. ...
license: Apache-2.0
compatibility:
  - claude-code
  - codex-cli
  - cursor
  - windsurf
  - copilot-cli
  - gemini-cli
metadata:
  classification: utility
  version: "1.0.0"
  updated: 2026-05-17
  category: review
  frameworks: [triple-diamond]
  author: product-on-purpose
---
```

### 1.3 Before / after example (tool sprint skill)

**BEFORE:**

```yaml
---
name: tool-foundation-sprint-basics
description: Day 1 morning Foundation Sprint Basics; produces target customer, ...
classification: tool
version: 1.0.0
updated: 2026-05-13
license: Apache-2.0
metadata:
  family: foundation-sprint-skills
  tool:
    family: foundation-sprint
    day: 1
    phase: morning
    sequence: 1
  move: foundation-sprint-basics
---
```

**AFTER:**

```yaml
---
name: tool-foundation-sprint-basics
description: Day 1 morning Foundation Sprint Basics; produces target customer, ...
license: Apache-2.0
compatibility:
  - claude-code
  - codex-cli
  - cursor
  - windsurf
  - copilot-cli
  - gemini-cli
metadata:
  classification: tool
  version: 1.0.0
  updated: 2026-05-13
  family: foundation-sprint-skills
  tool:
    family: foundation-sprint
    day: 1
    phase: morning
    sequence: 1
  move: foundation-sprint-basics
---
```

---

## 2. Schema definition (canonical, post-v2.17.0)

### 2.1 Required top-level fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Skill name; matches directory name and slash command (per agentskills.io spec) |
| `description` | string | One-line description (max 1024 chars per spec) used by skill discovery |
| `license` | string | SPDX license identifier (e.g., `Apache-2.0`) |

### 2.2 Optional top-level fields

| Field | Type | Description |
|---|---|---|
| `compatibility` | list of strings | Platforms the skill is verified on. Standard list for pm-skills: `[claude-code, codex-cli, cursor, windsurf, copilot-cli, gemini-cli]`. Reduce list if skill uses platform-specific features. |

### 2.3 Required `metadata:` block fields

| Field | Type | Description |
|---|---|---|
| `metadata.classification` | string | One of: `phase`, `foundation`, `utility`, `tool` |
| `metadata.version` | string | SemVer version of the skill itself (independent of repo version) |
| `metadata.updated` | string | ISO date YYYY-MM-DD of last meaningful update |

### 2.4 Conditional `metadata:` block fields

| Field | Type | When required | Description |
|---|---|---|---|
| `metadata.phase` | string | when `classification: phase` | One of: `discover`, `define`, `develop`, `deliver`, `measure`, `iterate` |
| `metadata.family` | string | when skill is a family member | Family identifier (e.g., `meeting-skills`, `foundation-sprint-skills`, `design-sprint-skills`) |
| `metadata.subset_kind` | string | when skill belongs to a discovery subset | Matches `family` or `classification` for grouping in discovery |
| `metadata.tool.*` | object | when `classification: tool` | Tool-specific metadata (per existing tool skill convention; family, day, phase, sequence) |
| `metadata.move` | string | when `classification: tool` (sprint family member) | Move name (e.g., `foundation-sprint-basics`) |

### 2.5 Free-form `metadata:` block fields (allowed)

| Field | Notes |
|---|---|
| `metadata.category` | Subject category (free string) |
| `metadata.frameworks` | List of methodology references (e.g., `[triple-diamond, lean-startup]`) |
| `metadata.author` | Origin attribution (e.g., `product-on-purpose`) |
| Other `metadata.*` | Allowed if not in the reserved list above (extensibility) |

### 2.6 Disallowed top-level fields (must move to `metadata:`)

These fields appear at top-level in v2.16.x skills and MUST move to `metadata:` in v2.17.0:

- `classification`
- `phase`
- `version`
- `updated`

### 2.7 Disallowed everywhere (now and after)

- `claude_code:` block (pm-skills doesn't use plugin-specific extensions today; if added later, must nest under `metadata.claude_code:` per spec Risk 7)

---

## 3. File inventory (what changes)

### 3.1 Skill files (59 SKILL.md files)

All 59 SKILL.md files migrate to the new structure:

- 26 phase skills under `skills/{phase}-{name}/SKILL.md`
- 8 foundation skills under `skills/foundation-{name}/SKILL.md`
- 10 utility skills under `skills/utility-{name}/SKILL.md`
- 15 tool skills under `skills/tool-{name}/SKILL.md`

Plus their accompanying TEMPLATE.md and EXAMPLE.md files where frontmatter is present:

- TEMPLATE.md files generally have no frontmatter (just markdown templates); verify
- EXAMPLE.md files in some skills have frontmatter (e.g., `utility-pm-release-conductor/EXAMPLE.md`); migrate where present

### 3.2 Validator scripts

| File | Change |
|---|---|
| `scripts/lint-skills-frontmatter.sh` | Update to enforce: (a) required top-level `name`, `description`, `license`; (b) required `metadata:` block; (c) required `metadata.classification`, `metadata.version`, `metadata.updated`; (d) conditional fields per classification; (e) REJECTS top-level `classification`, `phase`, `version`, `updated` |
| `scripts/lint-skills-frontmatter.ps1` | PowerShell parity |
| `scripts/lint-skills-frontmatter.md` | Documentation triplet update |
| `scripts/check-frontmatter-yaml.mjs` | Update YAML schema check to new structure (if separate from lint-skills-frontmatter) |

### 3.3 Skill-builder + skill-iterate templates

| File | Change |
|---|---|
| `skills/utility-pm-skill-builder/SKILL.md` | Update skill prompt to generate skills in new structure |
| `skills/utility-pm-skill-builder/TEMPLATE.md` | Update frontmatter template |
| `skills/utility-pm-skill-iterate/SKILL.md` | Add migration logic: detect old-style frontmatter, propose new-structure rewrite |
| `skills/utility-pm-skill-validate/SKILL.md` | Update validation rubric to expect new structure |

### 3.4 Documentation

| File | Change |
|---|---|
| `docs/contributing/skill-authoring.md` (if exists) | Document new structure |
| `docs/reference/skill-anatomy.md` | Document new structure with annotated example |
| `docs/reference/pm-skill-anatomy.md` (if exists) | Same |
| `docs/concepts/*.md` (any that reference frontmatter shape) | Update examples to new structure |
| `CHANGELOG.md` | v2.17.0 entry under Changed (structural) with migration note |
| `docs/releases/Release_v2.17.0.md` | New release notes; include migration guide section for contributors |

### 3.5 Companion repo impact (pm-skills-mcp)

The companion `pm-skills-mcp` repo parses pm-skills frontmatter via `scripts/embed-skills.js`. v2.17.0 frontmatter restructure requires coordinated update. Per project_mcp-maintenance-mode memory rule (M-22), pm-skills-mcp is in maintenance mode; cross-repo update can be deferred OR shipped same-day as v2.17.0.

**Recommendation:** Author pm-skills-mcp PR same-day as v2.17.0 G3 tag. PR draft prepared during v2.17.0 G2 prep, ships within 24 hours of v2.17.0 tag. Defer if maintainer chooses; document as "v2.17.0 known consumer break" if so.

---

## 4. Execution steps

### 4.1 Phase 1: Validator update (1 day)

1. Update `scripts/lint-skills-frontmatter.{sh,ps1,md}` to enforce new structure
2. Add migration mode: validator can run in "expect old structure" mode to verify current state PRE-sweep, then switch to "expect new structure" mode POST-sweep
3. Add `--migration-mode {pre,post}` flag (transient; removed in v2.17.1)
4. Test validator against current state (PRE) - should PASS
5. Test validator against new structure (POST) - hand-craft 3 example skills, verify validator passes

### 4.2 Phase 2: Skill sweep (1-2 days)

Use a deterministic migration script (NEW; ships in v2.17.0 release but is one-time-use):

1. Author `scripts/migrate-skills-frontmatter.{sh,ps1}` that:
   - Parses each `skills/*/SKILL.md` frontmatter
   - Detects old structure (top-level `classification`, `phase`, `version`, `updated`)
   - Rewrites frontmatter into new structure preserving all field values
   - Adds `compatibility:` block with the standard 6-platform list (unless skill already has reduced list)
   - Writes back to the same file
   - Logs per-file change to `migration-log.txt`
2. Run script against all 59 skills + applicable EXAMPLE.md files
3. Manually spot-check 5-10 skills across all classifications for correctness
4. Run lint-skills-frontmatter in POST mode - should PASS
5. Commit migration as a single commit: `refactor(v2.17.0): migrate all skill frontmatter to metadata-nested structure`

### 4.3 Phase 3: Template + builder update (0.5 day)

1. Update `skills/utility-pm-skill-builder/TEMPLATE.md` frontmatter template
2. Update `skills/utility-pm-skill-builder/SKILL.md` to author skills in new structure
3. Update `skills/utility-pm-skill-iterate/SKILL.md` to detect + migrate old-structure skills
4. Update `skills/utility-pm-skill-validate/SKILL.md` validation rubric
5. Test by running pm-skill-builder to generate a hypothetical new skill; verify output uses new structure

### 4.4 Phase 4: Documentation sweep (0.5 day)

1. Update `docs/reference/skill-anatomy.md` (or equivalent) with new structure example
2. Update any `docs/contributing/*.md` that shows frontmatter examples
3. Update any `docs/concepts/*.md` that shows frontmatter examples
4. Search for `classification: phase`, `classification: foundation`, etc. in `docs/` and update example references

### 4.5 Phase 5: pm-skills-mcp coordination (parallel; 1-2 hours)

1. Draft PR in companion repo updating `scripts/embed-skills.js` to parse new structure
2. Update README + manifests in pm-skills-mcp to mention v2.17.0 compatibility
3. Schedule merge for same-day as pm-skills v2.17.0 G3 tag

### 4.6 Phase 6: Pre-tag validator bundle (0.5 day)

Per `feedback_pre-tag-validator-bundle`:

1. Run `scripts/pre-tag-validate.{sh,ps1}` - all 14 enforcing validators PASS
2. Em-dash sweep clean
3. Aggregate counters unchanged (59 skills total)
4. Cross-cutting audit via pm-skill-auditor (chain or inline)

---

## 5. Acceptance criteria

### 5.1 Functional

- [ ] All 59 SKILL.md files use new metadata-nested structure
- [ ] `scripts/lint-skills-frontmatter` (without `--migration-mode` flag) PASSES against new structure
- [ ] `scripts/lint-skills-frontmatter` REJECTS a hand-crafted skill with top-level `classification:` field
- [ ] `pm-skill-builder` slash command generates new skills in new structure (verified by test invocation)
- [ ] `pm-skill-iterate` detects + migrates old-structure skills (verified against synthetic old-structure skill)
- [ ] Astro doc-stack builds cleanly (Pages deploys without YAML parse failures)
- [ ] check-internal-link-validity --strict PASSES

### 5.2 Spec compliance

- [ ] Top-level fields in every SKILL.md are limited to: `name`, `description`, `license`, optional `compatibility`
- [ ] Every SKILL.md has `metadata:` block
- [ ] Every SKILL.md has `metadata.classification`, `metadata.version`, `metadata.updated`
- [ ] Phase skills have `metadata.phase`
- [ ] Tool sprint skills have `metadata.family`, `metadata.tool.*`, `metadata.move`
- [ ] Foundation, utility, and other classifications conform to Section 2 schema

### 5.3 Documentation

- [ ] Release_v2.17.0.md migration guide section authored
- [ ] CHANGELOG.md v2.17.0 entry describes the structural change
- [ ] Skill-authoring documentation reflects new structure
- [ ] At least one before/after example in public-facing docs

### 5.4 Companion repo

- [ ] pm-skills-mcp PR drafted (merged same-day as v2.17.0 G3 tag OR documented as carry-over per maintainer choice)

---

## 6. Risks specific to W1

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Migration script malforms YAML on some skills | Medium | High | Run script on test branch first; spot-check 5-10 skills; lint-skills-frontmatter catches; G1 adversarial review |
| `compatibility:` block addition breaks some skill that has platform-specific behavior we missed | Low | Medium | Default to 6-platform list; if skill has known platform restriction (e.g., Claude Code-only sub-agent integration), set explicitly |
| Astro/Starlight schema chokes on new structure | Low | High | Test against doc-stack BEFORE migrating production skills; new structure aligns with Starlight schema (which uses YAML frontmatter compatible with new shape) |
| pm-skills-mcp parser breaks downstream | Medium | Medium | Companion PR drafted in parallel; M-22 maintenance mode means timing is flexible |
| Third-party validators (agentskills.io canonical, etc.) reject the new structure | Low | Low | New structure aligns WITH agentskills.io spec; risk is lower than current state |
| Maintainer notices structural inconsistency post-migration (e.g., one skill kept top-level `version:` somehow) | Medium | Low | Migration log captures every change; spot-check protocol; validator catches |

---

## 7. Rollback plan

If W1 ships and a defect surfaces post-tag (e.g., pm-skills-mcp can't parse; Astro build breaks; an unknown consumer breaks):

- Ship v2.17.1 with a `--legacy-frontmatter` mode in the validator that accepts BOTH structures temporarily
- Document the defect and the rollback path in v2.17.1 release notes
- Do NOT revert v2.17.0 tag (per runbook Rollback Semantics)

For a critical defect that requires full revert:

- Run `scripts/migrate-skills-frontmatter.{sh,ps1} --reverse` to migrate skills back to old structure
- Ship v2.17.1 with reversed migration + post-mortem in release notes
- Treat the defect as a v2.18.0 prerequisite to fix before re-attempting

---

## 8. Sources

- Strategic roadmap R-05: `../../_working/roadmap_opus-4.7-max_2026-05-14.md` Section 5
- agentskills.io spec: https://agentskills.io/specification (referenced 2026-05-14)
- Web research on 12+ tool adoption: per roadmap citation pattern
- Repo convention review: existing `skills/utility-pm-critic/SKILL.md` frontmatter is the test case for utility dispatch pattern; existing `skills/tool-foundation-sprint-basics/SKILL.md` is the test case for tool sprint pattern; existing `skills/deliver-prd/SKILL.md` is the test case for phase pattern

---

## 9. Cross-references

- Parent plan: [`plan_v2.17.0.md`](plan_v2.17.0.md)
- Companion spec (W2): [`spec_agents-directory-rename.md`](spec_agents-directory-rename.md)
- Strategic roadmap: [`../../_working/roadmap_opus-4.7-max_2026-05-14.md`](../../_working/roadmap_opus-4.7-max_2026-05-14.md)
- Roadmap delta: [`../../_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md`](../../_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md)
- Memory rule (load-bearing): `feedback_yaml-parse-validity-in-sweeps` (codified 2026-05-08 after W3.5 19-file regression; YAML parse-validity checks must accompany structural placement checks in any frontmatter sweep)
