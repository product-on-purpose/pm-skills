# v2.8.0 Internal Release Governance

Status: Planning (post-Codex review; M-18 complete)
Owner: Maintainers
Last updated: 2026-04-03

This directory is the tracked internal release-governance home for the `v2.8.0` release: PM skill lifecycle completion.

## Release Theme

**Complete the PM skill lifecycle: Create → Validate → Iterate.**

v2.7.0 shipped the PM Skill Builder (`/pm-skill-builder`), giving contributors a guided path to *create* new skills. v2.8.0 closes the loop with two companion utility skills — Validate audits an existing skill against conventions and quality criteria, and Iterate applies feedback to improve an existing skill. Together, the three tools form a self-reinforcing lifecycle for skill quality.

Secondary: lifecycle documentation, skill versioning governance, and CI to support skill evolution.

## Release Contents

| Effort | Type | Description | Agent | Status | Issue |
|--------|------|-------------|-------|--------|-------|
| — | Governance | `skill-versioning.md` tie-breaker rule update | Claude | **Done** | — |
| F-10 | New skill | `utility-pm-skill-validate` (`/pm-skill-validate`) — SKILL.md | Claude | **Done** (`1398835`) | [#121](https://github.com/product-on-purpose/pm-skills/issues/121) |
| F-10 | New skill | `utility-pm-skill-validate` — TEMPLATE.md + EXAMPLE.md + command | Claude | **Done** (included in SKILL.md commit) | [#121](https://github.com/product-on-purpose/pm-skills/issues/121) |
| F-11 | New skill | `utility-pm-skill-iterate` (`/pm-skill-iterate`) — SKILL.md | Claude | **Done** (`2f6577e`) | [#122](https://github.com/product-on-purpose/pm-skills/issues/122) |
| F-11 | New skill | `utility-pm-skill-iterate` — TEMPLATE.md + EXAMPLE.md + command | Claude | **Done** (included in SKILL.md commit) | [#122](https://github.com/product-on-purpose/pm-skills/issues/122) |
| D-03 | Documentation | PM skill lifecycle guide — how Create, Validate, and Iterate work together | Claude | **Done** (`f678344`) | — |
| M-18 | Infrastructure | CI: validate HISTORY.md consistency and `skills-manifest.yaml` | Codex | **Done** | — |
| D-04 | Documentation | Public docs refresh for v2.8.0 — counts, lifecycle references | Claude | **Done** | — |

## Dependency Chain and Execution Phases

### Dependency graph

```
Phase 0:  skill-versioning.md tie-breaker ─────────────────────────┐
          (no dependencies, unblocks F-11)                         │
                                                                    │
Phase 1:  F-10 SKILL.md (Claude) ──────┐    M-18 CI (Codex) ──┐   │
          (needs Phase 0 done)          │    (parallel, needs   │   │
                                        │     versioning.md     │   │
                                        │     format only)      │   │
                                        │                       │   │
Phase 2:  F-11 SKILL.md (Claude) ──┐   │  F-10 EXAMPLE (Codex)│   │
          (needs F-10 report format)│   │  (needs F-10 SKILL.md)   │
                                    │   │                       │   │
Phase 3:  D-03 guide (Claude) ─┐   │  F-11 EXAMPLE (Codex) ──┤   │
          (needs both SKILL.md) │   │  (needs F-11 SKILL.md)   │   │
                                │   │                           │   │
Phase 4:  ───────────────────── D-04 docs refresh (Codex) ─────┘   │
          (needs all content finalized)                             │
                                                                    │
Phase 5:  Release prep (CHANGELOG, skills-manifest, version bumps) ─┘
```

### Why this ordering

- **F-10 SKILL.md is the keystone.** It defines the report format (`Report schema: v1`) that F-11 consumes and that the F-10 example must demonstrate. Everything downstream depends on it.
- **F-10 EXAMPLE.md and F-11 SKILL.md can run in parallel** (Phase 2) because they depend on *different outputs* of Phase 1: F-11 needs the report format spec; the F-10 example needs the validation instructions.
- **M-18 is fully parallel** with the skill work — it depends on `skill-versioning.md` format contracts (already written), not on skill content.
- **D-03 can overlap with F-11 EXAMPLE.md** (Phase 3) because the lifecycle guide needs both SKILL.md files (Phases 1-2) but not the examples.
- **D-04 is last** because it needs final file paths, counts, and command names.

### Critical path

`Phase 0` → `F-10 SKILL.md` → `F-11 SKILL.md` → `D-03` → `D-04` → `Release prep`

The Claude track is the bottleneck. Codex track runs alongside without blocking.

### Phase summary

| Phase | Claude track | Codex track | Blocked by |
|-------|-------------|-------------|------------|
| 0 | `skill-versioning.md` tie-breaker rule (**done**) | — | Nothing |
| 1 | F-10 SKILL.md (**done**) | M-18 CI scripts (**done**) | Phase 0 |
| 2 | F-11 SKILL.md (**done**) | F-10 TEMPLATE+EXAMPLE (**done** — Claude wrote with SKILL.md) | Phase 1 |
| 3 | D-03 lifecycle guide (**done**) | F-11 TEMPLATE+EXAMPLE (**done** — Claude wrote with SKILL.md) | Phase 2 |
| 4 | — | D-04 docs refresh (**done** — Claude) | Phase 3 |
| 5 | Release prep (CHANGELOG, skills-manifest, version bumps) | — | Phase 4 |

## Gating Criteria

- [x] F-10 committed and local validators pass (`1398835`)
- [x] F-11 committed and local validators pass (`2f6577e`)
- [ ] F-10 and F-11 work end-to-end: builder creates → validator audits → iterator improves
- [x] D-03: lifecycle guide created at `docs/pm-skill-lifecycle.md` (`f678344`)
- [x] M-18: CI scripts created (`.sh` + `.ps1` + `.md` convention) and added to `validation.yml`
- [x] D-04: public docs refreshed (skill count 29, command count 30, lifecycle references, M-18 script docs)
- [ ] MCP impact evaluated (see MCP Impact section below)
- [x] CHANGELOG.md updated with v2.8.0 section
- [x] `skills-manifest.yaml` finalized (date: 2026-04-03)
- [ ] Local enhanced validation passes for 29 skills, 30 command docs
- [ ] Tag `v2.8.0` pushed → release.yml fires → ZIP published

## Effort Details

### F-10: utility-pm-skill-validate

**What it does:** Audits an existing skill directory against structural conventions (mirroring CI) and LLM-assessed quality criteria (beyond CI). Produces a structured validation report that humans can scan and F-11 can consume.

**Design decisions (resolved, updated post-Codex review 2026-04-02):**

1. **Output format: Structured Markdown with pipe-delimited check lines.** Report uses rigid section headings (`## Structural Checks`, `## Quality Checks`, `## Recommendations`). Each check line uses `STATUS | TIER | CHECK-ID | message` format. Recommendations include target file paths. Report header includes `Report schema: v1` for forward compatibility.

   Example check line: `- FAIL | structural | example-exists | missing references/EXAMPLE.md`
   Example recommendation:
   ```
   1. FAIL | example-exists | Target: skills/deliver-prd/references/EXAMPLE.md
      Action: Add a complete worked example (all template sections filled)
   ```

2. **Three severity levels:** FAIL (must fix, violates convention), WARN (should fix, below quality bar), INFO (suggestion). Overall result = worst severity found. **Tier 2 findings capped at WARN** unless objectively grounded (missing required sections, placeholder leakage). Report includes caveat: "Tier 2 findings are heuristic quality assessments and may require human review."

3. **Single skill default, batch summary available.** Primary: `/pm-skill-validate deliver-prd` → detailed report (Tier 1 + Tier 2). Batch: `/pm-skill-validate --all` → **Tier 1 structural checks only** with summary table. Single-skill mode is the deep-assessment and F-11 integration path.

4. **Two-tier assessment (rebaselined against shipped library):**
   - **Tier 1 (Structural):** Mirrors CI checks — frontmatter, naming, file presence, description word count. Deterministic.
   - **Tier 2 (Quality):** LLM-assessed, calibrated to current library conventions:
     - **Output Contract** — WARN only if template is not referenced at all; accept "use the template" as valid
     - **Quality Checklist verifiability** — are items testable, not vague?
     - **Example completeness** — all template sections filled, no placeholder scaffolding; line count is informational, not a gate
     - **Template-Example alignment** — EXAMPLE.md follows TEMPLATE.md section structure
     - **Description actionability** — includes trigger phrase ("Use when...")
     - **Instruction clarity** — steps are numbered and imperative
     - **Placeholder/scaffolding leakage** (new) — flags `[Feature Name]`, `<!-- ... -->`, leftover guidance blockquotes
     - **When NOT to Use** — INFO only (present in 1/27 shipped skills, not yet a convention)
   - Explicitly excludes: writing style, domain accuracy, framework coverage

5. **Quality standard framing:** F-10 validates against *current library conventions* (what exists today) and surfaces the *v2.8 standard* (what the builder produces) as suggestions. Older skills may legitimately receive WARNs/INFOs until iterated. This is evolutionary, not retroactive.

6. **MCP-safe behavior:** Single-skill mode is the MCP-portable path. Both modes require reading skill files. In degraded environments (MCP/embedded), require the user to provide relevant file excerpts if file system access is unavailable.

**Artifacts:**
- `skills/utility-pm-skill-validate/SKILL.md`
- `skills/utility-pm-skill-validate/references/TEMPLATE.md` (validation report template)
- `skills/utility-pm-skill-validate/references/EXAMPLE.md` (example report for a real skill)
- `commands/pm-skill-validate.md`
- AGENTS.md entry

**Effort brief:** `docs/internal/efforts/F-10-pm-skill-validate.md`
**Codex review:** `docs/internal/release-plans/v2.8.0/_archived/plan_v2.8.0_original_reviewed-by-codex.md`

### F-11: utility-pm-skill-iterate

**What it does:** Takes feedback, a validation report, or an improvement request and applies targeted changes to an existing skill. Shows proposed changes grouped by file, writes on confirmation, suggests a version bump class, and offers to update HISTORY.md.

**Design decisions (resolved, updated post-Codex review 2026-04-02):**

1. **Proposed changes preview, then direct write.** No staging area — the iterator modifies existing files, not creating from scratch. Shows proposed changes as before/after blocks grouped per file, user confirms all-or-nothing, changes are written. Git is the safety net. **Stale-preview guard:** before writing, re-read each target file and compare to the content used for the preview. If any target file has changed since the preview was generated, abort the write and regenerate.

2. **Suggest version bump class, don't auto-write the number.** After applying changes, the iterator classifies the change (wording fix → patch, new section → minor, contract restructure → major) and suggests the bump class per `skill-versioning.md` rules. The `updated` date is written immediately (tracks file modification time). The `version` number is only written on explicit user confirmation — this prevents compounding bumps across multiple iterations before release. Uses the tie-breaker rule: new compliance requirement = major, additive/optional = minor, clarification only = patch.

3. **Offer to update HISTORY.md (create at trigger point).** If HISTORY.md exists: offer to append after validating its format. If HISTORY.md does not exist but this iteration creates the skill's second version: offer to *create* it with entries for both versions (this is the governance trigger point per `skill-versioning.md`). If format validation fails on an existing HISTORY.md: warn and show proposed content without writing.

4. **One unified flow with input normalization (v1).** Accepts validation reports, user feedback, convention changes, or general improvement requests through the same flow. **First step: normalize any input into a structured list of intended changes before generating edits.** No explicit modes. Can split in a future version if usage patterns demand it.

5. **MCP-safe behavior:** Validation-report-driven iteration is the MCP-portable path (report carries the context). For free-text iteration, file system access is required. In degraded environments (MCP/embedded), require the user to provide relevant file excerpts if file contents are unavailable.

**Artifacts:**
- `skills/utility-pm-skill-iterate/SKILL.md`
- `skills/utility-pm-skill-iterate/references/TEMPLATE.md` (change summary template)
- `skills/utility-pm-skill-iterate/references/EXAMPLE.md` (example iteration of a real skill)
- `commands/pm-skill-iterate.md`
- AGENTS.md entry

**Effort brief:** `docs/internal/efforts/F-11-pm-skill-iterate.md`
**Codex review:** `docs/internal/release-plans/v2.8.0/_archived/plan_v2.8.0_original_reviewed-by-codex.md`

### D-03: PM Skill Lifecycle Guide

**What it does:** Public-facing documentation explaining the Create → Validate → Iterate lifecycle.

**Target path:** `docs/pm-skill-lifecycle.md`

**Should cover:**
1. The lifecycle model: why three separate tools instead of one
2. When to use each tool
3. Workflow patterns:
   - **New skill:** `/pm-skill-builder` → promote → `/pm-skill-validate` → fix issues → ship
   - **Improve existing:** `/pm-skill-validate` → review report → `/pm-skill-iterate` with report → review changes → ship
   - **Convention change:** `/pm-skill-validate` (batch) → triage → `/pm-skill-iterate` per skill → ship
   - **Feedback loop:** receive feedback → `/pm-skill-iterate` with feedback → `/pm-skill-validate` → confirm → ship
4. How lifecycle tools relate to versioning (`docs/internal/skill-versioning.md`)
5. How lifecycle tools relate to CI (what CI catches vs. what validate catches)
6. The quality standard model: validator checks *current conventions* and surfaces the *v2.8 standard* as suggestions; the library converges over time through the lifecycle, not retroactively
7. Examples of each workflow pattern

### M-18: CI — HISTORY.md and skills-manifest.yaml validation

**What it does:** Two new validation scripts following the `.sh` + `.ps1` + `.md` convention.

**Status (2026-04-03): Done**

**Implemented artifacts:**
- `scripts/validate-skill-history.sh`
- `scripts/validate-skill-history.ps1`
- `scripts/validate-skill-history.md`
- `scripts/validate-skills-manifest.sh`
- `scripts/validate-skills-manifest.ps1`
- `scripts/validate-skills-manifest.md`
- `.github/workflows/validation.yml` updated with advisory bash/pwsh steps after the existing `check-context-currency` steps

**Local verification (2026-04-03):**
- `bash scripts/validate-skill-history.sh` -> exit 0
- `pwsh -File scripts/validate-skill-history.ps1` -> exit 0
- `bash scripts/validate-skills-manifest.sh` -> exit 0 in the current workspace state
- `pwsh -File scripts/validate-skills-manifest.ps1` -> exit 0 in the current workspace state

**Note:** The local workspace already contains `skills/utility-pm-skill-iterate/`, so the draft `v2.8.0` manifest no longer demonstrates the expected missing-skill failure described earlier in planning.

**Script 1: `validate-skill-history.sh` / `.ps1`**
- For any skill with a HISTORY.md: check that the table includes an entry matching the SKILL.md frontmatter `version`
- Check that HISTORY.md follows the expected format (summary table + version sections)
- Advisory (non-blocking) for now — becomes blocking once HISTORY.md is more widely adopted

**Script 2: `validate-skills-manifest.sh` / `.ps1`**
- For any release folder with a `skills-manifest.yaml`: check that listed skill names exist in `skills/`
- Check that listed versions match the current SKILL.md frontmatter (for the latest release only)
- Advisory (non-blocking) — catches stale manifests

**Added to:** `.github/workflows/validation.yml`

### D-04: Public Docs Refresh

Same pattern as v2.7.0's D-02. Review and update:

| File | Review focus |
|------|-------------|
| `docs/guides/*` | Skill count (29), command count (30), lifecycle tools |
| `docs/pm-skill-anatomy.md` | Reference lifecycle tools, link to lifecycle guide |
| `docs/getting-started.md` | Mention `/pm-skill-validate` and `/pm-skill-iterate` |
| `QUICKSTART.md` | Updated counts, lifecycle mention |
| `scripts/README_SCRIPTS.md` | Document M-18 scripts |
| `AGENTS.md` | Two new utility skills |

## Suggested Commit Order

1. `skill-versioning.md` tie-breaker rule update (Phase 0)
2. F-10 SKILL.md (Phase 1, Claude)
3. M-18 CI scripts (Phase 1, Codex — can land same time as #2)
4. F-10 TEMPLATE.md + EXAMPLE.md + command + AGENTS.md entry (Phase 2, Codex)
5. F-11 SKILL.md (Phase 2, Claude — can land same time as #4)
6. F-11 TEMPLATE.md + EXAMPLE.md + command + AGENTS.md entry (Phase 3, Codex)
7. D-03 lifecycle guide (Phase 3, Claude — can land same time as #6)
8. D-04 public docs refresh (Phase 4, Codex)
9. Release prep: CHANGELOG, `skills-manifest.yaml`, version bumps (Phase 5)
10. Tag and release

## By the Numbers (projected)

- **29 skills** (up from 27): 25 domain + 1 foundation + 3 utility
- **30 command docs** (up from 28)
- **2 new CI validation scripts** (advisory)
- **1 new public guide** (`docs/pm-skill-lifecycle.md`)

## MCP Impact

**Evaluate before tagging.** Run `scripts/check-mcp-impact.sh` and review.

### Pre-tag: Impact Assessment

| Question | Answer |
|----------|--------|
| Do new skills need MCP tool registration? | Yes — F-10 and F-11 each need a tool |
| Do existing MCP tools change? | No |
| Does `embed-skills.js` naming handle the new skills? | Needs verification — `utility-` prefix stripping was added for F-05, should work for F-10/F-11 |
| Do the new skills require file-read capabilities? | Yes — both read existing skill directories. MCP versions need embedded content or read access |
| Is a pm-skills-mcp release required? | Yes — new tools must be registered |

### Post-tag: MCP Update Required

After tagging v2.8.0, `pm-skills-mcp` needs a corresponding update:

| Action | Detail |
|--------|--------|
| Re-embed skills | Run `scripts/embed-skills.js` against the v2.8.0 tag |
| Add F-10 tool | `utility-pm-skill-validate` → `pm_pm_skill_validate` |
| Add F-11 tool | `utility-pm-skill-iterate` → `pm_pm_skill_iterate` |
| Verify naming | Confirm `utility-` prefix stripping produces correct tool names |
| Test read access | Both tools need to read skill directories — verify MCP embedded content includes enough context |
| MCP version bump | Bump `pm-skills-mcp` version to match or follow v2.8.0 |

## Canonical Artifacts

1. `docs/internal/release-plans/v2.8.0/plan_v2.8.0.md` (this file)
2. `docs/internal/release-plans/v2.8.0/skills-manifest.yaml` (draft, finalize at release prep)
3. `docs/releases/Release_v2.8.0.md` (public release notes — create at tag time)
4. Effort briefs: `F-10`, `F-11`, `D-03`, `M-18` in `docs/internal/efforts/`
