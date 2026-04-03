# [F-10] PM Skill Validate
Status: Design (post-Codex review)
Release: v2.8.0
Issue: #121
Agent: Claude Opus 4.6
Last updated: 2026-04-03

## Scope

Create `utility-pm-skill-validate` — a utility skill that audits an existing pm-skills skill against current conventions, CI rules, and quality criteria. Produces a structured validation report with pass/fail on structural correctness plus LLM-assessed quality checks. The report format is designed to be consumed by F-11 (`/pm-skill-iterate`) as an input.

## Relationship

Part of the PM Skill lifecycle: Create (F-05) → **Validate (F-10)** → Iterate (F-11)

## Design Decisions

### 1. Separate skill, not a mode of pm-skill-builder

One skill, one job. The builder creates; the validator audits. This keeps each skill focused and independently testable.

### 2. LLM skill, not a script

CI scripts (`lint-skills-frontmatter.sh`) check structure via regex and field presence. The validator goes deeper — it reads SKILL.md, TEMPLATE.md, and EXAMPLE.md and assesses whether they are *coherent* with each other: does the output contract cover all template sections? Is the example a complete artifact or just an outline? Are checklist items testable? These require reading comprehension.

### 3. Output format: Structured Markdown with pipe-delimited check lines

The report uses Markdown for human readability but follows a rigid section contract so F-11 can parse it. Each check line uses a pipe-delimited format: `STATUS | TIER | CHECK-ID | message`. Recommendations include target file paths and check IDs for traceability.

```markdown
# Validation Report: {skill-name}
Date: {date}
Skill version: {version}
Validator version: 1.0.0
Report schema: v1
Result: PASS | WARN | FAIL

## Summary
{1-2 sentence overall assessment}
Errors: {n} | Warnings: {n} | Info: {n}

> Tier 2 findings are heuristic quality assessments and may require human review.

## Structural Checks
- PASS | structural | name-match | frontmatter `name` matches directory
- WARN | structural | description-length | description at 18 words (minimum is 20)
- FAIL | structural | example-exists | missing references/EXAMPLE.md

## Quality Checks
- WARN | quality | output-contract-coverage | template not referenced in Output Contract
- PASS | quality | checklist-verifiability | all checklist items are testable
- WARN | quality | example-completeness | EXAMPLE.md missing sections: Scope, Risks
- INFO | quality | when-not-to-use | no "When NOT to Use" section (optional)

## Recommendations
1. FAIL | example-exists | Target: skills/deliver-prd/references/EXAMPLE.md
   Action: Add a complete worked example (all template sections filled)
2. WARN | description-length | Target: skills/deliver-prd/SKILL.md
   Action: Expand description to meet 20-word minimum
3. WARN | output-contract-coverage | Target: skills/deliver-prd/SKILL.md
   Action: Add reference to template in Output Contract section
```

**Why pipe-delimited over checkbox markers:** Checkbox-like markers (`[x]`, `[!]`, `[ ]`) are ambiguous — `[ ]` renders as an unchecked task box, `[!]` is not valid Markdown. Pipe-delimited fields are unambiguous, positionally parseable (F-11 splits on `|`), and still human-scannable.

**Why `Report schema: v1`:** Separates report format versioning from validator tool versioning. F-11 keys compatibility to the schema version, not the validator release number. A validator patch can keep the same schema; a schema change is what F-11 cares about.

**Implementation constraint:** F-11 should match an exact allowlist of section headings (`## Summary`, `## Structural Checks`, `## Quality Checks`, `## Recommendations`) and ignore any `##` inside fenced code blocks.

### 4. Three severity levels

| Level | Meaning | F-11 behavior | Tier 2 constraint |
|-------|---------|---------------|-------------------|
| **FAIL** | Violates convention or CI rule — must fix | F-11 treats as required change | Only for objectively grounded failures (missing sections, placeholder leakage) |
| **WARN** | Below quality bar, not a rule violation — should fix | F-11 treats as recommended change | Default cap for Tier 2 heuristic findings |
| **INFO** | Suggestion for improvement — nice to have | F-11 presents as optional | Used for v2.8 standard suggestions on older skills |

Overall result = worst severity: any FAIL → `FAIL`, else any WARN → `WARN`, else `PASS`.

### 5. Single skill default, batch summary available

**Primary mode:** `/pm-skill-validate deliver-prd` — one skill, detailed report (Tier 1 + Tier 2). This is the F-11 integration path.

**Batch mode:** `/pm-skill-validate --all` — **Tier 1 structural checks only** with summary table:

```markdown
# Batch Validation Summary
| Skill | Result | Errors | Warnings |
|-------|--------|--------|----------|
| deliver-prd | PASS | 0 | 1 |
| define-hypothesis | WARN | 0 | 2 |
Run `/pm-skill-validate {skill}` for details.
```

Batch produces a triage table with structural checks only — no Tier 2 depth across 27+ skills. Useful for convention change rollouts. Single-skill mode is the deep-assessment path.

### 6. Two-tier assessment (rebaselined against shipped library)

**Quality standard framing:** F-10 validates against *current library conventions* (what exists today) and surfaces the *v2.8 standard* (what the builder produces) as suggestions. Older skills may legitimately receive WARNs/INFOs until iterated through the lifecycle. This is evolutionary, not retroactive.

**Tier 1 — Structural (deterministic, mirrors CI):**
Re-runs CI checks locally so the user gets one unified report:
- Frontmatter fields present and valid (name, description, version, updated, license)
- Name matches directory
- Description word count (20-100)
- Phase/classification consistency
- TEMPLATE.md exists with ≥3 `##` sections
- EXAMPLE.md exists
- Command file references correct path
- AGENTS.md entry exists and matches

**Tier 2 — Quality (LLM-assessed, calibrated to current library):**

| Check ID | What it assesses | How | Max severity |
|----------|-----------------|-----|-------------|
| `output-contract-coverage` | SKILL.md references the template | WARN only if template is not referenced at all; accept "use the template" pattern as valid | WARN |
| `checklist-verifiability` | Checklist items are testable, not vague | Flag items like "is good quality" vs. specific criteria | WARN |
| `example-completeness` | EXAMPLE.md fills all template sections, no placeholder scaffolding | Check section coverage + absence of `[Feature Name]`, `<!-- -->`, guidance blockquotes; line count is informational, not a gate | WARN |
| `template-example-alignment` | EXAMPLE.md follows TEMPLATE.md structure | Compare section headers between files | WARN |
| `description-actionability` | Description tells *when* to use, not just *what* | Check for trigger phrase ("Use when...") | WARN |
| `instruction-clarity` | Steps are numbered and imperative | Check for `### Step` or numbered list pattern | WARN |
| `placeholder-leakage` | No leftover scaffolding in shipped files | Flag `[Placeholder]`, `<!-- ... -->`, template guidance blockquotes, authoring notes | FAIL (objectively grounded) |
| `when-not-to-use` | "When NOT to Use" section present | INFO only — present in 1/27 shipped skills, not yet a convention | INFO |

**Explicitly out of scope:**
- Writing quality / prose style (too subjective)
- Domain accuracy (validator doesn't judge PM methodology)
- Framework coverage completeness (that's the builder's job)

### 7. MCP-safe behavior

Single-skill mode is the MCP-portable path. Both modes require reading skill files. In degraded environments (MCP/embedded where file system access is unavailable), require the user to provide relevant file excerpts before generating the report. The skill instructions should include a "Degraded mode" section documenting this.

## Dependencies

- F-05 (#113) — establishes the conventions the validator checks against
- M-12 (#112) — CI rules that the validator mirrors at a deeper level

## Artifacts Produced

| Artifact | Agent | Phase |
|----------|-------|-------|
| `skills/utility-pm-skill-validate/SKILL.md` | Claude Opus 4.6 (extended thinking) | Phase 1 |
| `skills/utility-pm-skill-validate/references/TEMPLATE.md` | Codex / GPT-5.4 (extended thinking) | Phase 2 |
| `skills/utility-pm-skill-validate/references/EXAMPLE.md` | Codex / GPT-5.4 (extended thinking) | Phase 2 |
| `commands/pm-skill-validate.md` | Codex / GPT-5.4 | Phase 2 |
| AGENTS.md entry | Codex / GPT-5.4 | Phase 2 |

**Why the split:** SKILL.md encodes complex multi-constraint logic (two-tier checks, pipe-delimited format, quality standard framing, degraded mode). Extended thinking helps hold all constraints coherently. TEMPLATE.md, EXAMPLE.md, and command are evidence-grounded artifacts — EXAMPLE.md should be a real validation report run against a shipped skill (e.g., `deliver-prd`). Codex is strong at reading multiple files and producing concrete, evidence-grounded output.

## Codex Review

Reviewed 2026-04-02. See `docs/internal/release-plans/v2.8.0/_archived/plan_v2.8.0_original_reviewed-by-codex.md` for full findings and evaluations. Key changes from review:
- Report format changed from checkbox markers to pipe-delimited (Finding 1.1)
- Added `Report schema: v1` header and check IDs (Findings 1.3, 1.4)
- Tier 2 rebaselined against shipped library — example completeness by section-fill not line count, output contract accepts "use the template," When NOT to Use → INFO (Finding 2.1)
- Added placeholder/scaffolding leakage check (Finding 2.3)
- Tier 2 findings capped at WARN with caveat line (Finding 2.4)
- Batch mode limited to Tier 1 structural checks (Finding 5.1)

## PRs

- TBD
