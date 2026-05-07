---
artifact: spec
title: Frontmatter Placement Correction and Schema Enhancement
cycle: v2.14.0
created: 2026-05-06
status: draft
topic: library-and-example-frontmatter-bug
related:
  - discovery/frontmatter-correction-example.md
  - plan_v2.14_starlight-spike-report_2026-05-06.md
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Spec: Frontmatter Placement Correction and Schema Enhancement

> **STATUS: AWAITING MAINTAINER SIGN-OFF.** This spec is fully drafted but execution is blocked. Before any code or content edits ship, the 5 questions below must be answered and locked into this document. After sign-off, proceed to execution per the "Implementation order" section further down.
>
> Owner of sign-off: jprisant. Drafted: 2026-05-06.

## What this spec needs from you (maintainer-action block)

Answer each question by replacing the `_______` with your decision, then convert the leading `- [ ]` to `- [x]`. The body of the spec (Maintainer Slots inside each Decision Brief) carries the same questions in context; this block exists at the top so a future-session pickup sees the gating decisions immediately without scrolling.

- [ ] **Q1. Placement format.** Comment goes on the line immediately after the closing `---` fence, with no blank line between them, matching `discovery/frontmatter-correction-example.md`. Confirm or override.
  - **Answer**: _______
- [ ] **Q2. Schema scope.** Bundle `title:` + `description:` additions together (recommended), or ship `title:` only and defer `description:` to a future cycle.
  - **Answer**: _______
- [ ] **Q3. `context:` field disposition.** Keep `context:` alongside `description:` with distinct semantics (default), rename to `scenario:`, or merge into `description:`.
  - **Answer**: _______
- [ ] **Q4. OKR-skill EXAMPLE.md schema scope.** Do the 2 OKR-skill `references/EXAMPLE.md` files receive only the placement fix (smaller scope), or also `title:`/`description:` if Q2 lands the broader schema.
  - **Answer**: _______
- [ ] **Q5. PR boundaries.** Bundle generators + sweep + lint into one PR (recommended), or split into multiple PRs.
  - **Answer**: _______

## Other open items not yet resolved

These are not gating but are worth resolving before execution begins:

- [ ] This spec is not yet referenced from `plan_v2.14.0.md` (Phases 1-4 migration execution) or `plan_v2.14_starlight-migration.md`. A row should be added pointing to this spec before execution starts, otherwise the work is invisible to anyone reading the cycle plan or migration plan.
- [ ] The audit logic that produced the 102-file count is not yet archived as a reproducible script. Consider committing as `scripts/check-frontmatter-byte-zero.sh` (advisory-only at first; the same logic becomes the basis for the CI lint extension proposed in this spec).
- [ ] No entry in `C:\Users\jpris\.claude\projects\E--Projects-product-on-purpose-pm-skills\memory\MEMORY.md` flags this work for fresh-session pickup. A one-line index entry would help future-session re-entry without having to grep `v2.14.0/discovery/`.

---

## Summary

102 markdown files in this repository carry their YAML frontmatter on lines 2-N instead of lines 1-N because an HTML attribution comment occupies line 1. GitHub, Astro Starlight, and every other YAML-frontmatter parser the v2.14.0 migration will encounter require the opening `---` fence at byte 0. Until corrected, these files render as run-on paragraphs on github.com and will fail (or silently bypass) Starlight's content-collection schema validation during the v2.14 migration.

This spec covers three coupled work items intended to ship as a single PR within the v2.14.0 cycle:

1. Placement fix in 102 affected files (mechanical sweep).
2. Generator and CI updates that prevent regression.
3. Frontmatter schema enhancements that align library samples with Starlight requirements.

Per the repo's "no effort-doc bloat on refactor cycles" rule, this work appears as one row in `plan_v2.14.0.md`, with this spec carrying the depth.

---

## Bug scope (definitive count)

**Total broken files: 102**

| Location | Count | Pattern |
|---|---|---|
| `library/skill-output-samples/**/sample_*.md` | 100 | Attribution comment on line 1, `---` on line 2 |
| `skills/measure-okr-grader/references/EXAMPLE.md` | 1 | Same pattern; shipped in v2.12.0 |
| `skills/foundation-okr-writer/references/EXAMPLE.md` | 1 | Same pattern; shipped in v2.12.0 |

**Corroboration**: All 26 other skill `references/EXAMPLE.md` files have `---` on line 1 correctly. The two OKR-skill EXAMPLE.md files diverged because the contributor copied from a sample file (which has the bug) rather than from another EXAMPLE.md (which does not).

**Out of scope (verified clean)**: All `skills/*/SKILL.md`, all `skills/*/references/TEMPLATE.md`, all 27 other `references/EXAMPLE.md`, all `commands/*.md`, all `_workflows/*.md` (these have no frontmatter, so the bug cannot apply), all `docs/**/*.md` files audited.

---

## Decision Brief 1: Placement correction

### What

In all 102 affected files, relocate the line `<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->` from its current position (line 1, before the opening `---`) to the line immediately after the closing `---` fence of the YAML frontmatter block. No other content changes.

### Why

GitHub's markdown renderer recognizes YAML frontmatter only when the file *begins* with `---\n`. Any preceding bytes (HTML comment, BOM, whitespace) cause the renderer to fall through to body-markdown mode. In body mode, the YAML block becomes a paragraph; markdown's soft-break rule joins single newlines with a space, collapsing the field list into a single run-on line.

The same byte-0 requirement applies to:
- Astro Starlight content collections (Zod schema validation runs on parsed frontmatter)
- Jekyll, Hugo, MkDocs Material's `meta` plugin
- Most static-site generators

The placement bug therefore has two costs:
1. **Today**: 100 sample pages on github.com show degraded rendering (no metadata table at top of page).
2. **At v2.14.0 cut**: Starlight will either reject these files (build failure) or strip them silently (missing pages). Per the spike report, the build pipeline expects all sample pages to be valid Starlight content.

### Desired outcomes

| Outcome | How verified |
|---|---|
| All 102 files render their frontmatter as a metadata table on github.com | Spot-check 6 files (2 per thread) on `main` after merge |
| Starlight build succeeds with all 102 files indexed in their content collections | `astro build` exits 0 with expected page count, and a sample URL renders as a Starlight page |
| Sample-creation guidance documents the correct pattern so future samples ship correctly | `SAMPLE_CREATION.md` Section 5 explicitly mandates byte-0 placement with an example |

### Alternatives considered

| Alternative | Reason rejected |
|---|---|
| **Delete the attribution comment entirely** | User decision (2026-05-06): keep the comment. Per-file attribution improves browsability when samples are viewed in isolation outside the repo. Repo root LICENSE alone does not survive the user-copies-a-single-file workflow. |
| **Move the comment to the end of each file** | Standard convention is to place attribution at the top of source files where readers expect to find it. End-of-file placement is unconventional and fragile (easy to lose in edits that touch the bottom of the file). |
| **Wrap each frontmatter block in a fenced code block on github.com via custom rendering** | Not possible. GitHub's markdown rendering is fixed-behavior and not configurable per repo. The fix must be in the file. |
| **Defer the fix until v2.15.0 (post-Starlight)** | The Starlight migration cannot proceed cleanly with broken files. Per the spike report (Caveat 1), the migration already requires per-file frontmatter touches; folding this fix in is cheaper than two passes. |

### Recommendation

Move the attribution comment to the line immediately after the closing `---` fence in all 102 files via a single mechanical script. Verify rendering on a representative sample on github.com before merging.

### Maintainer slot

- [ ] Confirm the move (not delete) decision still stands after seeing spec scope.
- [ ] Confirm the format shown in `discovery/frontmatter-correction-example.md` is the canonical target shape (no blank line between closing `---` and the comment).

---

## Decision Brief 2: Frontmatter schema enhancement

### What

Augment the library-sample frontmatter schema with two additions and one deprecation candidate, applied during the same sweep as the placement fix:

| Change | Rationale |
|---|---|
| **Add `title:`** field (required) | Astro Starlight content collections require `title:` on every collected page. Currently absent on 100 sample files; will be required for 100 of 100. |
| **Add `description:`** field (optional, recommended) | Starlight uses `description:` for SEO meta tags, social cards, and listing-page excerpts. Currently absent. |
| **Audit `context:` field for retention or rename** | `context:` partially overlaps with `description:`. Decide whether to keep both (with distinct semantics), rename `context:` to a more specific name like `scenario:`, or fold it into `description:`. |

The two skill EXAMPLE.md files (the additional 2 in scope) use a smaller frontmatter shape (5 fields vs 8) and may not need `description:` since they are not directly published as Starlight pages today; they receive only the placement fix unless the schema decision treats them as in-scope for the broader enhancement.

### Why

The Starlight spike report documents Caveat 1 as: "title-frontmatter required (51/125 files; ~1 hour script)." That count is for `docs/**/*.md` only; library samples were not audited at spike time. With samples now in scope for Starlight publishing, the `title:` requirement applies repo-wide. Adding `title:` during the placement sweep is cheaper than adding it in a second pass.

`description:` is optional but high-value: it controls how each sample appears in Starlight's automatic listing pages, search results, and any social-card preview. Without it, Starlight falls back to the first 160 characters of body text, which for samples means raw scenario prose without context.

The `context:` field's overlap with `description:` is a smaller concern, but worth resolving now to avoid having two near-synonym fields in the schema long-term.

### Desired outcomes

| Outcome | How verified |
|---|---|
| Every library sample carries a `title:` derived from its skill, thread, and scenario | Linter passes; Starlight build succeeds |
| Every library sample carries a `description:` of 1-2 sentences | Spot-check 6 samples; confirm they read well as listing-page excerpts |
| The `context:` field's role is clarified (kept, renamed, or merged) | Schema decision committed in this spec |

### Alternatives considered

| Alternative | Reason rejected (or held) |
|---|---|
| **Defer schema enhancements until after the placement fix** | Two passes mean two PRs touching the same 100 files, two reviews, two merge conflicts to resolve. Bundling is cheaper. |
| **Add only `title:`, defer `description:`** | Acceptable fallback if scope feels too large. `title:` is the only Starlight-required addition; `description:` improves quality but does not gate the build. **Held as a fallback if maintainer prefers smaller scope.** |
| **Generate `title:` automatically from filename via Starlight config** | Starlight supports this but produces low-quality titles ("sample define opportunity tree brainshelf resurface"). Hand-curated titles per file are higher quality and worth the one-time effort. |
| **Drop `repo_version:` and `skill_version:` from sample frontmatter as part of this cleanup** | Out of scope. Those fields carry sample-provenance information valuable for backlinking samples to specific shipped versions; they should not be removed without a separate decision. |

### Recommendation

Bundle the schema enhancement with the placement fix:

1. Add `title:` (required) to all 100 library samples and to the 2 OKR-skill EXAMPLE.md files. Derive titles by hand or via a one-time generator script that reads the existing `artifact`, `thread`, and `context` fields.
2. Add `description:` (optional, populated) to all 100 library samples. Derive from the existing `context:` field as a starting point, then refine where the result is awkward.
3. Hold `context:` retention decision for a follow-up turn. Default position: keep `context:` as it carries scenario-specific framing distinct from `description:`'s SEO role; let them coexist with clear distinct semantics documented in `SAMPLE_CREATION.md`.

If maintainer prefers smaller scope: ship `title:` only in this PR and defer `description:` and the `context:` decision to v2.15.0 prep.

### Proposed final schema for library samples

```yaml
---
title: "Opportunity Tree: Brainshelf Resurface 60-day Retention"
description: "Outcome-driven tree mapping three opportunities for re-engaging saved content in the Brainshelf consumer PKM app."
artifact: opportunity-tree
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . opportunity tree for saved content re-engagement
---
```

Field ordering: Starlight conventions place `title:` and `description:` first because they are SEO-load-bearing. Existing fields follow. The closing `---` and the attribution comment then follow as specified in Decision Brief 1.

### Maintainer slot

- [ ] Approve the schema enhancement bundling (one PR with both changes), or split into two PRs.
- [ ] Approve `title:` and `description:` additions, or restrict to `title:` only.
- [ ] Confirm `context:` retention decision (keep / rename / merge into `description:`).

---

## CI work item: extend `lint-skills-frontmatter.sh`

### What

The existing `scripts/lint-skills-frontmatter.sh` already enforces byte-0 `---` for files matching `skills/*/SKILL.md` (line 31-36). Two extensions:

1. **Broaden the byte-0 check** to additionally cover:
   - `skills/*/references/TEMPLATE.md` (currently ~40 files)
   - `skills/*/references/EXAMPLE.md` (currently ~40 files)
   - `library/skill-output-samples/**/*.md` (currently 102 files including README and standards docs that have no frontmatter; the check should skip files that have no `---` at all and only fail on files that have `---` somewhere but not at byte 0)

2. **Add a schema check** for library samples specifically:
   - Required fields: `title`, `description` (if Decision Brief 2 lands the full schema), `artifact`, `version`, `created`, `status`, `thread`, `context`
   - Per-field validation: `created` is ISO date; `thread` is one of the canonical thread enum values; `status` is `sample` or `legacy`.

The existing PowerShell counterpart `lint-skills-frontmatter.ps1` receives matching changes.

### Why

The bug shipped because the linter's byte-0 check was scoped to one file class (`skills/*/SKILL.md`). All other markdown file classes were unverified. Extending the existing check is cheaper than building a new linter and keeps the CI surface area consolidated.

### Desired outcomes

| Outcome | How verified |
|---|---|
| `bash scripts/lint-skills-frontmatter.sh` exits 0 across all in-scope file classes after the sweep | Run locally on a clean tree |
| Reintroducing the bug pattern in any in-scope file class causes CI to fail with a clear error message | Manual test: insert a comment before `---` in one sample file, run the linter, verify FAIL with file path and reason |
| Linter is idempotent and side-effect-free | No file mutations; exit code is the only signal |

### Implementation note

The byte-0 check at line 31-36 of the existing script reads:

```bash
first_line=$(head -1 "$skill" | tr -d '\r')
if [[ "$first_line" != "---" ]]; then
  echo "✗ $rel : first line must be '---' ..."
  FAIL=1
  skill_fail=1
fi
```

This logic is reusable. The extension is to wrap it in a function that accepts a file path and a "must have frontmatter" flag (so files like `library/skill-output-samples/README_SAMPLES.md`, which legitimately has no frontmatter, are skipped rather than flagged).

A representative wrapper:

```bash
check_frontmatter_at_byte_zero() {
  local file="$1"
  if grep -q "^---$" "$file" 2>/dev/null; then
    local first_line
    first_line=$(head -1 "$file" | tr -d '\r')
    if [[ "$first_line" != "---" ]]; then
      echo "✗ ${file#$ROOT/} : first line must be '---' (frontmatter must start at byte 0)"
      return 1
    fi
  fi
  return 0
}
```

Then iterate this function over the new file classes added to the linter's scope.

---

## Generator and standards work items

### `library/skill-output-samples/SAMPLE_CREATION.md`

**Current state**: Section 5 ("Frontmatter Standards") lists required keys but does not specify placement. No example block.

**Change**: Rewrite Section 5 to:
1. Explicitly require `---` at byte 0 of the file (no preceding content of any kind, including HTML comments).
2. Place the attribution comment (`<!-- PM-Skills | ... | Apache 2.0 -->`) on the line immediately after the closing `---` fence.
3. Include a complete frontmatter block as an in-line example (the same one shown in Decision Brief 2 above).
4. List all required and optional fields with semantics.

This is the canonical authoring spec; making it correct prevents the bug class from recurring during human-authored sample additions.

### `skills/utility-pm-skill-builder/SKILL.md`

**Current state**: Step 5 generates a "Draft Frontmatter . complete, valid YAML block" but does not enforce byte-0 placement in the output instructions. Step 6 writes drafts to `_staging/`. Step 7 promotes to canonical paths.

**Change**: 
1. In Step 5, add explicit instruction: "The draft `SKILL.md` content MUST begin with `---` at byte 0. Place any attribution comment AFTER the closing `---` fence, never before."
2. Update `references/TEMPLATE.md` if it serves as the literal template for generated SKILL.md files (verify no leftover examples that put the comment first).

### `skills/utility-pm-skill-iterate/SKILL.md`

**Current state**: Modifies existing skills, including the `updated:` field (Step 5). Does not generate new files from scratch.

**Change**: 
1. In Step 5, when re-reading and re-writing files, verify byte-0 `---` placement is preserved. Add a defensive check: if the existing file violates byte-0, the iterator should warn and offer to fix the placement before applying other changes.

### `skills/utility-pm-skill-validate/SKILL.md`

**Current state**: Tier 1 structural checks include `name-match`, `description-present`, etc. The `placeholder-leakage` check (Tier 2) scans for HTML comments but explicitly excepts "the license header" without validating its position.

**Change**:
1. Add a new Tier 1 structural check: `frontmatter-at-byte-zero`. Pass condition: line 1 of `SKILL.md`, `references/TEMPLATE.md`, and `references/EXAMPLE.md` is exactly `---`. Severity: FAIL.
2. Update the Step 3 checks table accordingly.
3. Update `references/EXAMPLE.md` (the validation report example) to include this check.

### Library sample generators (if any)

**Audit finding**: The library samples are *not* generated by `pm-skill-builder` or `pm-skill-iterate`. They appear to be hand-authored or generated by an external process not present in this repo. No script in `scripts/` produces sample files.

**Implication**: The schema and placement guidance must live in `SAMPLE_CREATION.md` (the human-readable contract) and be enforced by `lint-skills-frontmatter.sh` (the machine check). There is no generator skill to update for this file class.

---

## Implementation order

1. **Update generators and standards docs first** (lowest risk, source-of-truth fix):
   - `library/skill-output-samples/SAMPLE_CREATION.md` Section 5 rewrite
   - `skills/utility-pm-skill-builder/SKILL.md` Step 5 instruction
   - `skills/utility-pm-skill-iterate/SKILL.md` Step 5 byte-0 preservation note
   - `skills/utility-pm-skill-validate/SKILL.md` new Tier 1 check
2. **Sweep the 102 files** (mechanical, scripted):
   - 100 library samples
   - 2 skill OKR EXAMPLE.md files
   - Apply placement fix and (per Decision Brief 2 outcome) schema additions in the same script run
3. **Land the CI lint extension last** (guardrail):
   - Extend `scripts/lint-skills-frontmatter.sh` and `.ps1`
   - Verify it passes on the post-sweep tree
   - Verify it fails on a manually-broken test file before reverting

All three batches in one PR. Reviewer can verify each batch in isolation by reading the diff in order.

---

## Acceptance criteria

The work is complete when:

1. All 102 files have `---` at byte 0 with the attribution comment on the line immediately after the closing fence.
2. All 100 library samples have `title:` (and, if Decision Brief 2 ships the full schema, `description:`) populated.
3. `bash scripts/lint-skills-frontmatter.sh` exits 0 on a clean tree.
4. `bash scripts/lint-skills-frontmatter.sh` exits non-zero with a clear error message when one in-scope file is manually broken (test before revert).
5. `library/skill-output-samples/SAMPLE_CREATION.md` Section 5 documents the byte-0 placement rule with an in-line example.
6. `utility-pm-skill-builder`, `utility-pm-skill-iterate`, and `utility-pm-skill-validate` SKILL.md files reflect the byte-0 placement requirement in their respective output contracts.
7. Spot-check on github.com confirms metadata-table rendering for at least 6 representative library samples (2 per thread).
8. Spot-check on github.com confirms metadata-table rendering for both OKR-skill EXAMPLE.md files.
9. The Starlight spike caveat 1 ("title-frontmatter required (51/125 files)") is updated in the next spike-report revision to reflect that library samples now meet the requirement.

---

## Risks and mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Mechanical sweep introduces a typo in one of 102 files | Low | Use a deterministic script (no LLM-authored edits per file). Diff-review the full sweep before merge. |
| Adding `title:` requires hand-curated values; tedium leads to low-quality titles | Medium | Generate from `artifact + thread + context` as a starting point; review and refine per file. Budget ~1 hour for refinement across 100 files. |
| Schema additions break `pm-skill-validate` if it has hardcoded field expectations | Low | The validator only checks SKILL.md frontmatter today; library samples are out of its scope. Confirm during implementation. |
| MCP server has cached or embedded sample frontmatter that would drift | Low | Per existing project memory, MCP gap is frozen at 28 skills with no library samples embedded. No drift risk. |
| Starlight schema validation rejects a field we did not anticipate | Medium | Run `astro build` against the post-sweep tree as part of acceptance. Spike has already validated 5 caveats; this would be a 6th if found. |

---

## Open questions for maintainer

These are the same items in the Maintainer Slots above, consolidated here for sign-off in one place:

1. **Placement format**: comment on the line immediately after closing `---`, no blank line between them. Confirm this matches the format in `discovery/frontmatter-correction-example.md`.
2. **Schema scope**: bundle `title:` + `description:` together, or ship `title:` only and defer `description:` to a future cycle.
3. **`context:` field disposition**: keep alongside `description:` (default), rename to `scenario:`, or fold into `description:`.
4. **Skill EXAMPLE.md inclusion in schema enhancement**: do the 2 OKR-skill EXAMPLE.md files receive only the placement fix (smaller scope), or do they also receive `title:`/`description:` if the broader schema lands?
5. **PR boundaries**: bundle all three work items (generators + sweep + lint) into one PR (recommended), or split.

---

## References

- `discovery/frontmatter-correction-example.md` (the visual before/after example artifact)
- `plan_v2.14_starlight-spike-report_2026-05-06.md` (spike caveat 1 motivates the title-frontmatter angle)
- `library/skill-output-samples/SAMPLE_CREATION.md` (current authoring spec; Section 5 is the target of this work)
- `scripts/lint-skills-frontmatter.sh` (existing linter; lines 31-36 are the existing byte-0 check that this work generalizes)
- `skills/define-opportunity-tree/SKILL.md` (canonical example of correctly-placed frontmatter, lines 1-13)
