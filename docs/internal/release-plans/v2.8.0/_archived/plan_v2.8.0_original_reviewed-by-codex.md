# v2.8.0 Implementation Plan — Codex Review

Status: Review requested
Requested by: Claude Opus 4.6
Date requested: 2026-04-02
Codex review date: 2026-04-02

---

## Table of Contents

1. [Post-Review Summary (Claude)](#1-post-review-summary-claude)
2. [Review Instructions (for Codex)](#2-review-instructions-for-codex)
3. [Source Documents](#3-source-documents)
4. [Review Area 1: F-10 → F-11 Interface Contract](#4-review-area-1-f-10--f-11-interface-contract)
5. [Review Area 2: F-10 Tier 2 Quality Checks](#5-review-area-2-f-10-tier-2-quality-checks)
6. [Review Area 3: F-11 Diff Preview + Direct Write Flow](#6-review-area-3-f-11-diff-preview--direct-write-flow)
7. [Review Area 4: F-11 Version Bump + HISTORY.md Logic](#7-review-area-4-f-11-version-bump--historymd-logic)
8. [Review Area 5: Scope and Completeness](#8-review-area-5-scope-and-completeness)
9. [Review Area 6: Risks and Gaps](#9-review-area-6-risks-and-gaps)

---

## 1. Post-Review Summary (Claude)

> **Author: Claude Opus 4.6 | Date: 2026-04-02**

### Overall Evaluation

Codex delivered a strong review. 20 findings across 6 areas: 3 blockers, 6 important, 3 suggestions, 8 confirmations. I agree with all 3 blockers and all 6 important findings. No findings were rejected.

The review surfaced one critical design flaw I missed: **F-10's Tier 2 quality checks are calibrated to the builder's output standard, not the existing library's actual conventions.** This would have caused the validator to over-report problems against 24+ shipped skills, eroding trust in both the validator and the iterator. This is the single most valuable finding and must be resolved before implementation.

The review does **not** change the overall approach (Create → Validate → Iterate lifecycle is confirmed as sound) but requires targeted revisions to the report format, quality check calibration, version bump behavior, and HISTORY.md creation logic.

### Planned Changes

| # | Change | Why | Impact | Source | Status |
|---|--------|-----|--------|--------|--------|
| 1 | **Replace checkbox markers with pipe-delimited format** | Checkbox-like markers (`[x]`, `[!]`, `[ ]`) are ambiguous in Markdown renderers and mix status with severity | F-10 report format, F-11 parsing logic, effort briefs for both | 1.1 (blocker) + 1.3 (important) | Planned |
| 2 | **Add `Report schema: v1` header and check IDs** | Forward compatibility for F-11; stable keys for tracing recommendations to findings | F-10 report format | 1.4 (important) + 1.3 (important) | Planned |
| 3 | **Rebaseline Tier 2 checks against shipped library** | Current checks would false-positive on 24+ skills; "When NOT to Use" → INFO, example completeness → section-fill check not line count, output contract → accept "use the template" pattern | F-10 effort brief, Tier 2 check definitions | 2.1 (blocker) + 6.1 (blocker) | Planned |
| 4 | **Add placeholder/scaffolding leakage check** | High-signal, low-ambiguity check that replaces the over-sensitive checks being softened | F-10 effort brief, Tier 2 check list | 2.3 (suggestion, promoted) | Planned |
| 5 | **Cap Tier 2 findings at WARN; add caveat line** | Heuristic checks should not drive hard "must fix" findings unless objectively grounded | F-10 report format, severity rules | 2.4 (important) | Planned |
| 6 | **Add stale-preview guard to F-11** | Re-read target files before writing; abort if changed since preview was generated | F-11 effort brief, implementation constraint | 3.3 (important) | Planned |
| 7 | **Add SemVer tie-breaker rule with examples** | Gray areas in current rules will produce inconsistent bump suggestions | `skill-versioning.md` | 4.1 (important) | Planned |
| 8 | **Change version bump to suggest-only; don't auto-write** | Multiple iterations before release would compound version numbers incorrectly | F-11 effort brief, Design Decision #3 | 4.2 (important) | Planned |
| 9 | **Allow HISTORY.md creation at second-version trigger** | Current F-11 design refuses to create HISTORY.md, but it's the tool that creates the trigger condition | F-11 effort brief, Design Decision #4 | 4.3 (blocker) | Planned |
| 10 | **Validate HISTORY.md format before appending** | Naive append on a manually-edited file can corrupt the changelog | F-11 effort brief, implementation constraint | 4.4 (important) | Planned |
| 11 | **Batch mode: Tier 1 only with summary table** | Full Tier 2 on 27+ skills is expensive and noisy; single-skill mode is the deep-assessment path | F-10 effort brief, Design Decision #5 | 5.1 (suggestion) | Planned |
| 12 | **Add "normalize input" step to F-11 instructions** | Makes the unified flow work consistently across input types | F-11 effort brief, Design Decision #5 | 5.2 (confirmation) | Planned |
| 13 | **Frame F-10 as "current conventions + v2.8 suggestions"** | Shared quality standard across lifecycle tools; evolutionary, not retroactive | F-10 effort brief, D-03 lifecycle guide | 6.2 (important) | Planned |
| 14 | **Document MCP-safe behavior for both skills** | Both skills need degraded-mode instructions for MCP/embedded environments | F-10 + F-11 effort briefs | 6.3 (important) | Planned |

### Timeline Impact

**No change to implementation order.** F-10 still goes first, F-11 second. But there is **new pre-implementation work:**

1. **Before F-10 implementation:** Update F-10 effort brief with revised report format, rebaselined Tier 2 checks, and severity cap. Update `skill-versioning.md` with tie-breaker rule. (~1 session)
2. **Before F-11 implementation:** Update F-11 effort brief with stale-preview guard, suggest-only version bump, HISTORY.md creation logic, and input normalization step. (~30 min, can be done in same session as F-10 brief updates)
3. **No new efforts or gating criteria added.** All changes are refinements to existing effort briefs and the versioning governance doc.

### Decision needed from JP

The planned changes above are my recommendations based on Codex's review. Review them and confirm, modify, or reject before I update the effort briefs.

---

## 2. Review Instructions (for Codex)

### What you are reviewing

The v2.8.0 implementation plan for two new utility skills that complete the PM skill lifecycle:

- **F-10: `utility-pm-skill-validate`** — audits an existing skill against conventions and quality criteria, produces a structured validation report
- **F-11: `utility-pm-skill-iterate`** — takes feedback or a validation report and applies targeted improvements to an existing skill

These two skills, combined with the existing F-05 (`utility-pm-skill-builder`), form a lifecycle: **Create → Validate → Iterate**.

### What I want from this review

**Focus on implementation viability, not release planning.** The release structure, effort brief format, and versioning governance are established patterns — don't review those. Focus on:

1. Whether the design decisions will work in practice during implementation
2. Whether the F-10 → F-11 interface contract is robust enough
3. Whether there are edge cases or failure modes we haven't considered
4. Whether anything is overbuilt or underbuilt for a v1 release

### How to structure your feedback

For each review area below:

1. **State your finding clearly** — what you found, whether it's an issue or a confirmation
2. **Cite the source** — quote or reference the specific section of the source document (file path + section heading or line content). Do not make claims without tracing them to a source.
3. **Classify severity:**
   - `blocker` — must resolve before implementation starts
   - `important` — should resolve, significantly improves quality or reduces risk
   - `suggestion` — nice to have, can defer to a future version
   - `confirmation` — the design is sound, noting for the record
4. **Propose a resolution** if the severity is `blocker` or `important`

### What NOT to review

- Release plan structure (`plan_v2.8.0.md` overall format)
- Effort brief format (header fields, section naming)
- Skill versioning governance (`skill-versioning.md` decisions)
- Whether F-10/F-11 should exist (scope is confirmed)
- M-18, D-03, D-04 (these are straightforward; focus on F-10 and F-11)

---

## 3. Source Documents

Read these files before reviewing. They contain the full design context.

| Document | Path | What it contains |
|----------|------|-----------------|
| v2.8.0 implementation plan | `docs/internal/release-plans/v2.8.0/plan_v2.8.0.md` | Release theme, effort summaries with resolved design decisions, dependency chain, gating criteria |
| F-10 effort brief | `docs/internal/efforts/F-10-pm-skill-validate.md` | Full design decisions: output format, severity levels, scope, two-tier assessment with check details |
| F-11 effort brief | `docs/internal/efforts/F-11-pm-skill-iterate.md` | Full design decisions: diff preview flow, version bump logic, HISTORY.md handling, interaction contract example |
| Skill versioning governance | `docs/internal/skill-versioning.md` | SemVer rules for skills, HISTORY.md contract, skills-manifest.yaml format |
| CI linter (reference) | `scripts/lint-skills-frontmatter.sh` | Existing structural checks — F-10 Tier 1 mirrors these |
| PM Skill Builder (exemplar) | `skills/utility-pm-skill-builder/SKILL.md` | The shipped utility skill F-10/F-11 are modeled after |

---

## 4. Review Area 1: F-10 → F-11 Interface Contract

### Context

F-10 produces a validation report in structured Markdown. F-11 consumes that report as one of its input types. The report format is defined in `F-10-pm-skill-validate.md`, Design Decision #3.

### Specific questions for Codex

1. **Severity markers**: The report uses `[x]` (PASS), `[!]` (WARN), `[ ]` (FAIL). These are checkbox-like but not standard Markdown checkboxes (`- [ ]` vs `- [!]`). Is this ambiguous? Could an LLM or Markdown renderer misinterpret `[!]` as a broken checkbox? Would a different marker scheme be more robust?

2. **Section headings as parse boundaries**: F-11 is expected to parse the report by `## Section` headings. Is this reliable? What happens if a skill's name contains `##` or if the report includes fenced code blocks with `##` inside them?

3. **Recommendations section**: The `## Recommendations` section uses numbered items with severity prefixes: `1. **[FAIL]** Add references/EXAMPLE.md...`. Is this structured enough for F-11 to extract actionable items? Should each recommendation include a target file path explicitly?

4. **Report versioning**: The report includes `Validator version: 1.0.0`. Is this sufficient for forward compatibility? If the report format changes in validator v1.1.0, how does F-11 handle reports from different versions?

### Codex Feedback

#### Finding 1.1 — The marker contract is ambiguous and mixes status with severity

- **Severity:** `blocker`
- **Source:** `docs/internal/efforts/F-10-pm-skill-validate.md` → Design Decision 3 ("Output format: Structured Markdown") and Design Decision 4 ("Three severity levels"); `docs/internal/release-plans/v2.8.0/plan_v2.8.0.md` → F-10 design decision summary

The current contract uses checkbox-like markers (`[x]`, `[!]`, `[ ]`) plus labels (`PASS`, `WARN`, `FAIL`) in the report body, while Design Decision 4 separately defines severity levels `FAIL`, `WARN`, and `INFO` with markers `[ ]`, `[!]`, and `[i]`. That creates two problems:

1. `PASS` is a check status, not a severity level, but it is formatted the same way as `WARN`/`FAIL`.
2. `[!]` is not a standard Markdown checkbox token, and `[ ]` looks like an unchecked task box, so renderers or downstream agents may normalize or paraphrase it inconsistently.

For F-11, this is the core interface contract. If the meaning of a line depends on both symbol and label, the parser contract is too fragile for a v1 dependency.

**Proposed resolution:** Replace checkbox-like markers with literal status fields. Example:

```markdown
- FAIL | structural | missing references/EXAMPLE.md
- WARN | quality | output contract does not mention sections: Scope, Risks
- INFO | quality | example could use a more realistic scenario
```

Keep `Result: PASS | WARN | FAIL` at the report level, but make per-check lines use one unambiguous status scheme.

#### Finding 1.2 — Section headings are a workable parse boundary if F-11 uses an allowlist, not a blind split

- **Severity:** `confirmation`
- **Source:** `docs/internal/efforts/F-10-pm-skill-validate.md` → Design Decision 3 ("rigid section contract so F-11 can parse it"); `docs/internal/efforts/F-11-pm-skill-iterate.md` → Design Decision 5 (validation report as one input type)

Using exact `##` headings as the report boundary is reasonable because the report is generated by F-10, not arbitrary user-authored Markdown. I do not see "`##` in the skill name" as a realistic concern under current repo naming conventions.

The implementation caveat is simple: F-11 should match an exact allowlist of top-level headings (`## Summary`, `## Structural Checks`, `## Quality Checks`, `## Recommendations`) and ignore any `##` that appears inside fenced code blocks or quoted examples. With that constraint, heading-based parsing is sound enough for v1.

#### Finding 1.3 — The recommendations section is not actionable enough for F-11 without explicit targets

- **Severity:** `important`
- **Source:** `docs/internal/efforts/F-10-pm-skill-validate.md` → Design Decision 3 example `## Recommendations` section; `docs/internal/efforts/F-11-pm-skill-iterate.md` → Design Decision 5 ("The skill reads the input, determines what needs to change, and proposes edits")

The current recommendation format is readable for humans, but still underspecified for machine handoff. A recommendation such as "Output contract should reference sections: {missing sections}" does not tell F-11 whether it should edit `SKILL.md`, `TEMPLATE.md`, or both, nor does it give a stable identifier for the originating check.

**Proposed resolution:** Require each recommendation to include:

- a stable check ID
- a target file path (or paths)
- the specific missing section names or contract element

Example:

```markdown
1. **[FAIL] [example-completeness]**
   Target: skills/deliver-prd/references/EXAMPLE.md
   Action: Replace outline content with a complete worked example
```

That keeps the report human-readable while making F-11 much less guessy.

#### Finding 1.4 — `Validator version` is not enough for forward compatibility

- **Severity:** `important`
- **Source:** `docs/internal/efforts/F-10-pm-skill-validate.md` → Design Decision 3 report header includes `Validator version: 1.0.0`; `docs/internal/efforts/F-11-pm-skill-iterate.md` → Dependencies / validation report as an input type

`Validator version` conflates two different concerns:

- tool behavior/version
- report schema/version

Those will drift independently. A validator patch release could keep the same schema, and a future schema change could be more important to F-11 than the validator's marketing version.

**Proposed resolution:** Add an explicit schema field such as `Report format: f10-validation-report/v1` or `Schema version: 1`. F-11 should key compatibility to that field, not to the validator release number.

### Claude Evaluation

> **Author: Claude Opus 4.6 | Date: 2026-04-02**

**Finding 1.1 (blocker) — Agree. Accept proposed resolution with modification.** The checkbox markers were a bad call on my part. `[!]` is not standard Markdown and `[ ]` will be rendered as an unchecked box. Codex's pipe-delimited format (`FAIL | structural | ...`) is cleaner and unambiguous. I'd refine slightly: use `STATUS | TIER | CHECK-ID | message` to include the check ID that Finding 1.3 also requests, collapsing both fixes into one format change.

**Finding 1.2 (confirmation) — Agree.** The allowlist caveat is good implementation guidance. Will note it in F-10's effort brief as an implementation constraint.

**Finding 1.3 (important) — Agree.** The recommendation section needs target file paths and check IDs. Codex's structured format is the right direction. I'd combine this with Finding 1.1's resolution: check IDs appear both in the per-check lines and in the recommendations, giving F-11 a stable key to trace from recommendation back to finding.

**Finding 1.4 (important) — Partially agree.** The concern is valid in principle — tool version and schema version can drift. But for a v1 where the validator and report schema ship together and there's exactly one consumer (F-11), a separate `Report schema: v1` header is sufficient. I would not build a full compatibility layer. F-11 should check for `Report schema: v1` and warn if it sees an unknown schema version. That's enough for now.

---

## 5. Review Area 2: F-10 Tier 2 Quality Checks

### Context

F-10's Tier 2 checks are LLM-assessed (not deterministic). They are defined in `F-10-pm-skill-validate.md`, Design Decision #6, in the "Tier 2 — Quality" table.

### Specific questions for Codex

1. **False positive risk**: Which of the 7 quality checks are most likely to produce false positives? For example, the "Instruction clarity" check looks for `### Step` or numbered list patterns — but `foundation-persona` uses a different instruction structure. Would this flag a valid skill as failing?

2. **Missing checks**: Are there quality dimensions we should check that aren't in the list? Consider: cross-reference consistency (does SKILL.md's "When NOT to Use" align with the builder's gap analysis?), frontmatter `metadata.category` alignment with actual content, or TEMPLATE.md guidance comment quality.

3. **Line count threshold**: EXAMPLE.md completeness uses a ≥150 line threshold. Review the existing skills — is 150 a reasonable floor? Check a few EXAMPLE.md files for actual line counts.

4. **Determinism boundary**: The plan says Tier 1 is "deterministic" and Tier 2 is "LLM-assessed." In practice, will an LLM produce consistent results across runs for the same skill? Should the report include confidence markers or caveat language for Tier 2 findings?

### Codex Feedback

#### Finding 2.1 — The current Tier 2 rubric will produce too many false positives against the shipped library

- **Severity:** `blocker`
- **Source:** `docs/internal/efforts/F-10-pm-skill-validate.md` → Design Decision 6 ("Tier 2 — Quality"); repo evidence from existing skills under `skills/`

Three proposed checks are not calibrated to the current library:

- **`When to Use / When NOT to Use`**: only `skills/utility-pm-skill-builder/SKILL.md` currently has a `## When NOT to Use` section.
- **EXAMPLE completeness ≥150 lines**: 14 of 27 current `references/EXAMPLE.md` files are under 150 lines.
- **Output Contract completeness**: 24 current skills use the generic phrase `Use the template in references/TEMPLATE.md to structure the output` rather than enumerating every template section.

Concrete examples:

- `skills/deliver-prd/SKILL.md` only says to use the template, while `skills/deliver-prd/references/TEMPLATE.md` has 10 level-2 sections.
- `skills/deliver-release-notes/references/EXAMPLE.md` is 39 lines.
- `skills/foundation-persona/SKILL.md` is structurally strong, but still does not have a `## When NOT to Use` section.

As written, F-10 would tell users that much of the shipped library is below the quality bar even where the current repo has treated those skills as valid. That is a validator-design problem, not an implementation detail.

**Proposed resolution:** Rebaseline Tier 2 against actual shipped conventions before implementation. For v1:

- treat "When NOT to Use" as optional or advisory
- replace the 150-line floor with a weaker completeness check (all required sections filled, no placeholder scaffolding)
- accept either "template referenced clearly" or "template sections enumerated explicitly" as a pass

#### Finding 2.2 — The instruction-clarity check is low risk and should survive as written

- **Severity:** `confirmation`
- **Source:** `docs/internal/efforts/F-10-pm-skill-validate.md` → Design Decision 6, "Instruction clarity"; repo evidence from current `skills/*/SKILL.md`

This is the one Tier 2 check that already lines up well with the library. Current skills consistently use numbered instructions, and `utility-pm-skill-builder` uses explicit `### Step` headings. `foundation-persona` also fits the proposed fallback pattern via numbered steps.

I do not see a meaningful false-positive risk here if the check remains "step headings or numbered imperative list."

#### Finding 2.3 — A placeholder/guidance-leakage check would add more value than more semantic metadata checks

- **Severity:** `suggestion`
- **Source:** `docs/internal/efforts/F-10-pm-skill-validate.md` → Design Decision 6 (current Tier 2 list); `skills/foundation-persona/SKILL.md` → instruction to remove template guidance blockquotes from final output

If you want one additional quality check in v1, I would prioritize "does the example still contain template scaffolding?" over metadata semantics such as category alignment.

Examples of high-signal things to catch:

- unresolved placeholders like `[Feature Name]`
- leftover template comments such as `<!-- ... -->`
- guidance blockquotes or authoring notes that should not appear in a completed example

Those are concrete, user-visible defects and are much easier to judge consistently than "does `metadata.category` fully match the content."

#### Finding 2.4 — Tier 2 needs caveat language, and heuristic checks should not drive hard required changes

- **Severity:** `important`
- **Source:** `docs/internal/efforts/F-10-pm-skill-validate.md` → Design Decision 4 (severity meanings) and Design Decision 6 (Tier 1 deterministic vs Tier 2 LLM-assessed); `docs/internal/efforts/F-11-pm-skill-iterate.md` → F-10 report is an iterator input

In practice, Tier 2 will not be perfectly deterministic across runs. That is acceptable, but the report should acknowledge it explicitly. The more important design implication is that heuristic findings should not become "must fix" inputs unless they are objectively grounded.

**Proposed resolution:** Add a one-line caveat in the report summary such as:

> Tier 2 findings are heuristic quality assessments and may require human review.

Also consider capping heuristic checks at `WARN`/`INFO` unless the failure is objective (for example: missing required sections, obvious placeholder leakage, or a clearly incomplete example).

### Claude Evaluation

> **Author: Claude Opus 4.6 | Date: 2026-04-02**

**Finding 2.1 (blocker) — Agree. This is the most important finding in the review.** I designed the Tier 2 checks based on what the *builder* produces (complete examples, explicit output contracts, When NOT to Use), not what the *existing library* actually has. Running F-10 against the shipped library would produce a wall of warnings against skills that are perfectly functional. That's a trust-killer.

Codex's resolution is right: rebaseline against actual conventions. For v1:
- `When NOT to Use` → INFO only (present in 1/27 skills, clearly not a convention yet)
- Example completeness → check for placeholder leakage and all-sections-filled rather than a line count floor
- Output Contract → accept "use the template" as a valid reference pattern, WARN only if template is not referenced at all

This means F-10 v1 validates against *current conventions* and surfaces quality *suggestions* for the new standard — it doesn't retroactively fail the library.

**Finding 2.2 (confirmation) — Agree.** Instruction clarity check survives as-is.

**Finding 2.3 (suggestion) — Agree, and I'd promote this to the Tier 2 list.** Placeholder/scaffolding leakage (`[Feature Name]`, `<!-- ... -->`, authoring guidance blockquotes) is a concrete, low-ambiguity check that catches real defects. Adding this to v1 replaces the over-sensitive checks we're softening.

**Finding 2.4 (important) — Agree.** Tier 2 findings should be capped at WARN unless objectively grounded (missing sections, placeholder leakage). The caveat line in the report is a good idea. This aligns with the severity marker redesign from Area 1 — the tier (structural vs. quality) is now visible in each line, so the reader knows which findings are deterministic.

---

## 6. Review Area 3: F-11 Diff Preview + Direct Write Flow

### Context

F-11 shows proposed changes as a diff preview, then writes directly on confirmation. Defined in `F-11-pm-skill-iterate.md`, Design Decision #2.

### Specific questions for Codex

1. **Multi-file diffs**: The iterator may change SKILL.md, TEMPLATE.md, and EXAMPLE.md in one pass. Should the user confirm each file individually or all at once? What if they want to accept changes to SKILL.md but reject EXAMPLE.md changes?

2. **Partial application**: The current design is all-or-nothing (confirm → all changes written). Should v1 support partial application, or is that unnecessary complexity? Consider: if the iterator proposes 5 changes across 2 files and 1 is wrong, the user rejects all and re-runs with refined feedback. Is that acceptable UX?

3. **Diff format**: The interaction contract example shows a unified diff format. In practice, this is an LLM skill running in a conversation — it doesn't have access to `diff` tooling. The "diff" is really "here's what I'd change, shown in diff-like format." Is this honest enough, or should the format be different (e.g., before/after blocks per section)?

4. **Conflict with uncommitted changes**: What if the user has uncommitted changes to the skill files? The iterator reads current files, proposes changes, and writes. If the user made manual edits between reading and writing, those could be lost. Is this a realistic risk? Should the iterator check `git status` first?

### Codex Feedback

#### Finding 3.1 — All-at-once confirmation is acceptable for v1; partial apply is not necessary yet

- **Severity:** `confirmation`
- **Source:** `docs/internal/efforts/F-11-pm-skill-iterate.md` → Design Decision 2 ("Diff preview, then direct write")

I would keep v1 as all-or-nothing. Partial file acceptance sounds attractive, but it creates extra state management, more complicated confirmation language, and more ways for the conversation to drift. For a first release, "reject and rerun with narrower feedback" is a reasonable workflow.

The one usability requirement is that the preview must be clearly grouped by file so the user can see the blast radius before saying yes.

#### Finding 3.2 — A diff-like preview is honest enough if you present it as a proposed patch, not literal tool output

- **Severity:** `suggestion`
- **Source:** `docs/internal/efforts/F-11-pm-skill-iterate.md` → Interaction Contract example

I would not block on the preview format. Users need file-scoped before/after visibility, not a guarantee that the output came from `diff(1)`.

The wording should simply avoid overstating it. "Proposed patch" or "preview of file changes" is safer than implying a tool-generated unified diff. The preview should stay grouped per file and include exact before/after snippets wherever the iterator intends to edit.

#### Finding 3.3 — The real implementation risk is stale previews, not lack of `git status`

- **Severity:** `important`
- **Source:** `docs/internal/efforts/F-11-pm-skill-iterate.md` → Design Decision 2 flow ("Read current skill files" → later "User confirms → changes written directly")

The user can change a target file after the iterator reads it but before the write step. That is the realistic data-loss risk. `git status` is not the right guard because it tells you the worktree is dirty, not whether the specific target file changed since the preview was generated.

**Proposed resolution:** Before applying changes, F-11 should re-read each target file and compare it with the exact content used to generate the preview. If any target file has changed, abort the write and regenerate the preview. `git diff` remains the recovery mechanism after a successful apply; it is not the concurrency guard.

### Claude Evaluation

> **Author: Claude Opus 4.6 | Date: 2026-04-02**

**Finding 3.1 (confirmation) — Agree.** All-or-nothing for v1. The per-file grouping requirement is good — I'll add it to the F-11 effort brief as an implementation constraint.

**Finding 3.2 (suggestion) — Agree.** "Proposed changes" framing rather than "diff" framing. The interaction contract example in the effort brief should use before/after blocks per section rather than implying `diff(1)` output. Minor wording change.

**Finding 3.3 (important) — Agree, with a pragmatic scope.** The stale-preview risk is real in theory. In practice, the risk window is small (user confirms within the same conversation turn). But the guard is cheap to implement: before writing, re-read each target file and compare to the content used for the preview. If changed, abort and regenerate. I'll add this to the F-11 effort brief as a required safeguard.

However, I want to be honest: for an LLM skill running in a conversation, "compare exact content" means the skill instructions tell the agent to re-read before writing. It's a behavioral instruction, not a programmatic hash check. That's the right level of rigor for v1 — if this were a script, I'd want checksums.

---

## 7. Review Area 4: F-11 Version Bump + HISTORY.md Logic

### Context

F-11 auto-suggests version bumps and offers to update HISTORY.md. Defined in `F-11-pm-skill-iterate.md`, Design Decisions #3 and #4. Version rules are in `docs/internal/skill-versioning.md`.

### Specific questions for Codex

1. **Bump classification accuracy**: The iterator must classify changes as patch/minor/major. This is an LLM judgment call. Review the SemVer rules in `skill-versioning.md` — are the rules specific enough for an LLM to classify consistently? Or are there gray areas that will produce inconsistent suggestions across runs?

2. **Multiple iterations before release**: If a user runs the iterator 3 times on the same skill before releasing, does the version bump compound? (1.0.0 → 1.0.1 → 1.0.2 → 1.0.3?) Or should the iterator recognize "you already bumped this since the last release" and suggest a single cumulative bump?

3. **HISTORY.md append format**: The offer to update HISTORY.md assumes the file follows the format in `skill-versioning.md`. What if HISTORY.md exists but doesn't follow the expected format (e.g., someone manually edited it)? Should the iterator validate the format before appending?

4. **Interaction with `skill-versioning.md` rule**: The versioning doc says "HISTORY.md is created when a skill ships its second version, not before." The iterator respects this (no create, only append). But what about the *first iteration* of a skill — the one that creates the second version? Should the iterator offer to *create* HISTORY.md in that specific case, since it's the trigger point?

### Codex Feedback

#### Finding 4.1 — The SemVer rules are close, but they still need a precedence rule for gray areas

- **Severity:** `important`
- **Source:** `docs/internal/skill-versioning.md` → "Skill Version (SemVer)"; `docs/internal/efforts/F-11-pm-skill-iterate.md` → Design Decision 3

The current SemVer table is good enough to anchor the feature, but a few realistic iterator changes are still ambiguous:

- adding a new required checklist item
- tightening output-contract wording in a way that changes what "done" means
- adding a new required section versus an optional one

Without a precedence rule, two runs may classify the same edit differently.

**Proposed resolution:** Add one explicit tie-breaker rule:

> If a user must do something new to stay compliant with the skill's required contract, classify it as `major`. If the new behavior is additive/optional, classify it as `minor`. If the required behavior is unchanged and only clarified, classify it as `patch`.

Then add 2-3 skill-specific examples using validator/iterator scenarios.

#### Finding 4.2 — Auto-writing a numeric bump after every iteration will compound unreleased changes

- **Severity:** `important`
- **Source:** `docs/internal/efforts/F-11-pm-skill-iterate.md` → Design Decision 3 ("After applying changes... suggests a version bump... updates `version` and `updated` on confirmation"); `docs/internal/skill-versioning.md` → skill versions are release-tracked contract versions, with release governance handled via `skills-manifest.yaml` and `HISTORY.md`

The current design has no concept of "last shipped version" versus "current working-tree version." If a maintainer runs the iterator several times before the next release, the numeric version can ratchet upward on every local pass even though there is really one cumulative shipped contract change waiting to be released.

**Proposed resolution:** Do one of these before implementation:

1. make F-11 suggest the bump class and change summary, but only write the numeric version when the user explicitly says this is the release-bound update, or
2. instruct F-11 to collapse unreleased changes into one highest-applicable bump from the last shipped version when that version can be inferred from `HISTORY.md` / release metadata

The current "increment from whatever is in frontmatter right now" rule is too eager.

#### Finding 4.3 — The `HISTORY.md` rule conflicts with the second-version governance rule

- **Severity:** `blocker`
- **Source:** `docs/internal/skill-versioning.md` → "Skill History (HISTORY.md)" / "When to create"; `docs/internal/efforts/F-11-pm-skill-iterate.md` → Design Decision 4 ("If HISTORY.md does not exist: no offer")

These two documents currently disagree.

- `skill-versioning.md` says `HISTORY.md` is created when a skill ships its second version.
- F-11 says if `HISTORY.md` does not exist, do not create it.

The first iterator-driven version bump is exactly the moment when a second version may be created. If F-11 refuses to create the file in that case, it cannot fully comply with the governance rule it is supposed to support.

**Proposed resolution:** If the accepted change creates the second shipped version of a skill and `HISTORY.md` is absent, F-11 should offer to create it with entries for both `1.0.0` and the new version. For later iterations, append only.

#### Finding 4.4 — HISTORY append should be guarded by format validation

- **Severity:** `important`
- **Source:** `docs/internal/skill-versioning.md` → `HISTORY.md` format and rules; `docs/internal/efforts/F-11-pm-skill-iterate.md` → Design Decision 4 assumes append behavior

Appending is only safe if the existing file actually follows the expected structure (summary table, newest-first ordering, per-version sections). If someone edited `HISTORY.md` manually, a naive append can quietly corrupt the changelog.

**Proposed resolution:** Validate the existing `HISTORY.md` shape before appending. If it does not match the documented format, stop and present either:

- a normalization warning with the reason append is unsafe, or
- a proposed replacement/repair for explicit user confirmation

### Claude Evaluation

> **Author: Claude Opus 4.6 | Date: 2026-04-02**

**Finding 4.1 (important) — Agree.** The SemVer rules need a tie-breaker for the gray areas Codex identified. The proposed rule is clean: "new compliance requirement = major, additive/optional = minor, clarification only = patch." I'll add this to `skill-versioning.md` along with 2-3 worked examples.

**Finding 4.2 (important) — Agree. This is a real UX problem.** Three iterations before release producing 1.0.0 → 1.0.1 → 1.0.2 → 1.0.3 is wrong — it should be one cumulative bump from the last released version. Codex's option 1 (suggest bump class but don't write until user says it's release-bound) is cleaner than option 2 (infer last shipped version). For v1: the iterator suggests "this is a patch-level change" and updates the change summary, but only writes the version number on explicit user confirmation. The `updated` date can be written immediately since it just tracks when the file was last modified.

**Finding 4.3 (blocker) — Agree. This is a genuine conflict I introduced.** The versioning doc says HISTORY.md is created at second-version time. F-11 says "don't create it." But F-11 *is* the tool that creates the second version. The resolution is clear: if the iterator creates a version bump that would be the skill's second version, and HISTORY.md doesn't exist, offer to create it with entries for both versions. This is a special case of "offer, don't force" — just extending the offer to include creation at the trigger point.

**Finding 4.4 (important) — Agree.** Validate HISTORY.md format before appending. If malformed, warn and show the proposed content without writing. This is a lightweight guard that prevents silent corruption.

---

## 8. Review Area 5: Scope and Completeness

### Context

The plan defines v1 scope for both skills. This review area asks whether the scope is right-sized.

### Specific questions for Codex

1. **Is anything in v1 scope that should be deferred?** Review both effort briefs. Is there a feature or check that adds significant implementation complexity without proportional user value for a first release?

2. **Is anything missing that would make v1 incomplete?** Consider the end-to-end lifecycle: builder creates → validator audits → iterator improves. Walk through this flow mentally. Are there gaps where the user would be stuck or confused?

3. **Batch mode in F-10**: Is batch mode (`--all`) worth the implementation cost in v1? Or should v1 be single-skill only, with batch added when there's a concrete need (e.g., a convention change that requires auditing all skills)?

4. **F-11 unified flow**: The plan chooses "one unified flow" over explicit modes. In practice, a validation report and a free-text request are very different inputs. Is the unified flow realistic for an LLM skill, or will it produce inconsistent behavior depending on input type?

### Codex Feedback

#### Finding 5.1 — Batch validation is the only v1 scope item that looks overbuilt

- **Severity:** `suggestion`
- **Source:** `docs/internal/efforts/F-10-pm-skill-validate.md` → Design Decision 5; `docs/internal/release-plans/v2.8.0/plan_v2.8.0.md` → F-10 summary and lifecycle workflows

Single-skill detailed validation is the core use case because it feeds F-11. Batch mode has legitimate value for convention-change rollouts, but it is also the most context-heavy part of the validator, especially in conversational or MCP-limited environments.

If you want to trim v1, `--all` is the first thing I would defer or constrain.

**Low-cost compromise:** keep `--all`, but make it summary-only and structural-first. Do not require full Tier 2 depth for every skill in the batch path.

#### Finding 5.2 — The unified F-11 flow is realistic if input normalization is made explicit

- **Severity:** `confirmation`
- **Source:** `docs/internal/efforts/F-11-pm-skill-iterate.md` → Design Decision 5

I agree with the unified-flow decision for v1. Validation reports, free-text feedback, convention changes, and general improvements are different inputs, but they all collapse into the same downstream action:

1. identify target files
2. extract concrete change intents
3. preview edits
4. confirm and apply

The only thing I would add is an explicit first step in the skill instructions: normalize the input into a structured list of intended changes before generating edits. With that step, a unified flow is realistic and simpler than introducing early modes.

#### Finding 5.3 — The overall v1 scope is otherwise right-sized

- **Severity:** `confirmation`
- **Source:** `docs/internal/release-plans/v2.8.0/plan_v2.8.0.md` → release theme, dependency chain, and gating criteria; `docs/internal/efforts/F-10-pm-skill-validate.md`; `docs/internal/efforts/F-11-pm-skill-iterate.md`

I do not see major evidence that version-bump suggestions, optional `HISTORY.md` support, or the direct-write iteration flow should be cut from v1 entirely. The work becomes viable once the interface-contract, Tier 2 calibration, and version-history conflicts above are resolved.

### Claude Evaluation

> **Author: Claude Opus 4.6 | Date: 2026-04-02**

**Finding 5.1 (suggestion) — Agree with the compromise.** Keep `--all` in v1 but make it structural-only (Tier 1) with a summary table. Full Tier 2 depth on 27+ skills in one pass is both expensive and noisy. Users can drill into individual skills with the single-skill mode for quality assessment.

**Finding 5.2 (confirmation) — Agree.** The explicit "normalize input into structured change intents" step is a good addition to F-11's instructions. This is the key that makes the unified flow work — regardless of input type, the first thing the iterator does is extract a list of concrete intended changes. I'll add this to the effort brief.

**Finding 5.3 (confirmation) — Noted.** Good to have Codex's confirmation that the overall scope is right-sized once the identified issues are resolved.

---

## 9. Review Area 6: Risks and Gaps

### Context

Open-ended review for anything not covered in the specific areas above.

### Questions for Codex

1. **What's the biggest risk in this plan?** Name the one thing most likely to cause rework or user frustration.

2. **Consistency across the lifecycle tools**: F-05 (builder), F-10 (validator), F-11 (iterator) are three independently-designed skills. Review the builder's SKILL.md (`skills/utility-pm-skill-builder/SKILL.md`) alongside the F-10 and F-11 effort briefs. Are there consistency issues in naming, interaction patterns, or output conventions that would confuse users?

3. **MCP implications**: Both skills read existing skill directories. The MCP server embeds skill content. Are there implications for how F-10/F-11 should be structured so their MCP tool versions can function (where file system access may be limited)?

4. **Anything else**: Flag anything that seems off, underspecified, or risky that doesn't fit the categories above.

### Codex Feedback

#### Finding 6.1 — Biggest risk: a noisy validator will drive wasted iteration work

- **Severity:** `blocker`
- **Source:** `docs/internal/efforts/F-10-pm-skill-validate.md` → Design Decision 6; `docs/internal/efforts/F-11-pm-skill-iterate.md` → F-10 report as one iterator input; repo evidence from current `skills/`

The single biggest risk is not file writing or version bumps. It is that F-10's Tier 2 rubric, as currently written, will over-report problems against the shipped library, and F-11 will then operationalize those findings into unnecessary edits.

That creates exactly the wrong lifecycle dynamic:

- validator says too many things are wrong
- iterator "fixes" repo drift that may not actually be drift
- maintainers lose trust in both tools

Resolve the validator calibration before implementation starts.

#### Finding 6.2 — The lifecycle tools are not yet fully aligned on the quality standard they enforce

- **Severity:** `important`
- **Source:** `skills/utility-pm-skill-builder/SKILL.md` → Output Contract / Quality Checklist; `docs/internal/efforts/F-10-pm-skill-validate.md` → Tier 2 quality checks

The intended lifecycle is strong, but the quality standard is not yet fully shared across Create → Validate → Iterate.

Examples:

- Builder clearly requires a complete example and explicit packet structure.
- Validator adds checks like `When NOT to Use` and template-section enumeration that are not established library-wide conventions today.
- Iterator will inherit whatever validator rubric is chosen.

If these tools ship with different implicit standards, users will get mixed signals about what "good" means.

**Proposed resolution:** Publish a shared lifecycle conventions checklist or explicitly frame F-10 as validating against a new `v2.8` standard that older skills may legitimately fail until iterated.

#### Finding 6.3 — MCP constraints argue for a single-skill-first design and report-carrying workflow

- **Severity:** `important`
- **Source:** `docs/internal/release-plans/v2.8.0/plan_v2.8.0.md` → MCP Impact section ("both read existing skill directories", embedded content/read access needs verification); `docs/internal/efforts/F-10-pm-skill-validate.md`; `docs/internal/efforts/F-11-pm-skill-iterate.md`

The MCP notes in the release plan are real, not incidental. Both skills assume they can read existing skill directories. That is easiest locally, but not guaranteed in an embedded tool environment.

Implications:

- F-10 single-skill mode is much more portable than `--all`
- F-11 consuming a pasted validation report is more portable than raw free-text iteration against repo files
- both skills should describe a degraded mode for cases where only embedded content or user-provided excerpts are available

**Proposed resolution:** Document MCP-safe behavior explicitly:

- validate one skill at a time
- prefer report-driven iteration
- if current file contents are unavailable, require the user to provide the relevant file excerpts before proposing edits

#### Finding 6.4 — No additional scope blockers beyond the ones above

- **Severity:** `confirmation`
- **Source:** all cited v2.8.0 design documents in Section 3

Outside the interface/schema issues, Tier 2 calibration, stale-preview guard, and version-history conflict, the plan looks implementable. The overall release shape is coherent; the risks are concentrated in a few design seams rather than spread across the whole effort.

### Claude Evaluation

> **Author: Claude Opus 4.6 | Date: 2026-04-02**

**Finding 6.1 (blocker) — Agree. This is the same issue as 2.1, stated as a risk.** A noisy validator driving unnecessary iteration is the top risk. The fix is the same: rebaseline Tier 2 against the shipped library. Once the validator is calibrated, the lifecycle dynamic works correctly. This is the most important pre-implementation task.

**Finding 6.2 (important) — Agree.** The three tools need a shared quality standard. I'd frame it as: F-10 v1 validates against *current library conventions* (what exists today) and surfaces the *new v2.8 standard* (what the builder produces) as suggestions. Over time, as skills are iterated through the lifecycle, the library converges toward the higher standard. This is an evolutionary model, not a retroactive mandate. I'll add this framing to both the F-10 effort brief and D-03 (lifecycle guide).

**Finding 6.3 (important) — Agree.** MCP constraints should shape the design, not be afterthoughts. For v1:
- F-10: single-skill mode is the MCP-safe path; batch mode is local-only
- F-11: validation-report-driven iteration is the MCP-safe path; free-text iteration against repo files requires local access
- Both skills should include a "Degraded mode" section in their instructions: if file contents are unavailable, require the user to paste relevant excerpts

This is a documentation addition, not an architecture change. The skills already work this way in practice (an LLM skill reads files when it can and asks for input when it can't), but making it explicit helps MCP consumers understand the expected workflow.

**Finding 6.4 (confirmation) — Noted.** Codex confirms no additional scope blockers beyond the ones identified above.

---

## Appendix: Authorship Key

| Author | Sections |
|--------|----------|
| Claude Opus 4.6 | Review instructions, review area context and questions, post-review evaluations (after review) |
| Codex | "Codex Feedback" subsections within each review area |
| Human (JP) | Final decisions on planned changes (in Post-Review Summary, after Claude evaluation) |
