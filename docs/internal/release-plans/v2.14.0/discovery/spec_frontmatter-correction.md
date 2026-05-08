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

> **STATUS: EXECUTED 2026-05-08.** Maintainer signoff on Q1-Q5 received; sweep run on 102 files (100 broken library samples + 2 OKR EXAMPLE.md per Q4-C); generators + standards docs updated; CI lint extension landed. GitHub web-view rendering verified via Playwright before sweep. See migration plan change log for the full execution record.
>
> Owner of sign-off: jprisant. Drafted: 2026-05-06. Executed: 2026-05-08.

## What this spec needs from you (maintainer-action block)

Each open question now has its own Decision Brief in the body of this spec, following the 6-part convention (What it is / Why it matters / Desired outcomes / Potential solutions / Recommendation / Maintainer decision-feedback). Answer the question inside its Decision Brief by checking one of the Accept / Modify / Reject options and adding any Notes. This top block is navigation; the actual decision lives in each brief.

| Question | Subject | Brief | Recommended |
|---|---|---|---|
| Q1 | Placement format | [Decision Brief 1](#decision-brief-1-placement-format-q1) | Option A (no blank line between closing `---` and comment) |
| Q2 | Schema scope (title + description bundling) | [Decision Brief 2](#decision-brief-2-schema-scope---title-and-description-bundling-q2) | Option A (bundle both) |
| Q3 | `context:` field disposition | [Decision Brief 3](#decision-brief-3-context-field-disposition-q3) | Option A (keep both with distinct semantics) |
| Q4 | OKR-skill EXAMPLE.md schema scope | [Decision Brief 4](#decision-brief-4-okr-skill-examplemd-schema-scope-q4) | Conditional on Q2 (Option C if Q2-A; Option B if Q2-B) |
| Q5 | PR boundaries | [Decision Brief 5](#decision-brief-5-pr-boundaries-q5) | Option A (bundle in one PR) |

Once all 5 briefs have a maintainer decision recorded, this spec is unblocked and W3.5 in `plan_v2.14_starlight-migration.md` can proceed.

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

## Decision Brief 1: Placement format (Q1)

**What it is.** In all 102 affected files, the `<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->` attribution line is currently at line 1 (before the opening `---`), which causes GitHub and Starlight to ignore the YAML frontmatter. The decision is the exact target placement: immediately after the closing `---` fence with no blank line (matches `discovery/frontmatter-correction-example.md`), or with a blank line, or at end of file, or delete entirely.

**Why it matters.** GitHub's markdown renderer recognizes YAML frontmatter only when the file *begins* with `---\n`. Any preceding bytes (HTML comment, BOM, whitespace) cause the renderer to fall through to body-markdown mode. In body mode, the YAML block becomes a paragraph; markdown's soft-break rule joins single newlines with a space, collapsing the field list into a single run-on line. The same byte-0 requirement applies to Astro Starlight content collections (Zod schema validation), Jekyll, Hugo, and MkDocs Material's `meta` plugin.

The placement bug has two costs today:

1. **Now**: 100 sample pages on github.com show degraded rendering (no metadata table at top of page).
2. **At v2.14.0 cut**: Starlight will either reject these files (build failure) or strip them silently (missing pages).

**Desired outcomes.**

| Outcome                                                                                 | How verified                                                                                 |
| --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| All 102 files render their frontmatter as a metadata table on github.com                | Spot-check 6 files (2 per thread) on `main` after merge                                      |
| Starlight build succeeds with all 102 files indexed in their content collections        | `astro build` exits 0 with expected page count, and a sample URL renders as a Starlight page |
| Sample-creation guidance documents the correct pattern so future samples ship correctly | `SAMPLE_CREATION.md` Section 5 explicitly mandates byte-0 placement with an example          |

**Potential solutions.**

- **Option A: Comment immediately after closing `---` fence, no blank line between them.** Pros: matches `discovery/frontmatter-correction-example.md` (the existing reference); minimal motion; one-line placement; visually distinct from frontmatter; easy to script and lint. Cons: none identified.
- **Option B: Comment immediately after closing `---` fence, with one blank line between.** Pros: visually separates the comment from the frontmatter block. Cons: one extra blank line per file (102 across the repo, trivial); creates an editing trap (someone can collapse the blank line without realizing it changes nothing visible).
- **Option C: Move comment to end of file.** Pros: out of the way at top. Cons: unconventional; readers expect attribution at top of source files; fragile (easy to lose in edits that touch the bottom of the file).
- **Option D: Delete the attribution comment entirely; rely on repo LICENSE alone.** Pros: simplest. Cons: maintainer 2026-05-06 decision: keep per-file attribution because samples are often viewed in isolation outside the repo, where the LICENSE doesn't follow.

**Recommendation: Option A** (immediately after closing `---` fence, no blank line). Matches the existing `discovery/frontmatter-correction-example.md` reference; minimal motion; one-line placement; easy to script and lint. The other 26 skill `references/EXAMPLE.md` files (which already have correct byte-0 frontmatter) use this same pattern; choosing Option A keeps the repo's attribution placement uniform.

**Maintainer decision / feedback:**

- [x] Accept recommendation (Option A; no blank line between closing `---` and comment)
- [x] Modify: Use the structure that aligns with github's implementation of front matter. 
- [ ] Reject; alternative direction: 

- Notes: 

---

## Decision Brief 2: Schema scope - title and description bundling (Q2)

**What it is.** Library samples currently have an 8-field frontmatter schema (`artifact`, `version`, `repo_version`, `skill_version`, `created`, `status`, `thread`, `context`) but no `title:` or `description:` fields. The decision: bundle both additions in this PR (Option A), or ship `title:` only and defer `description:` to a future cycle (Option B), or bundle the additions but make `description:` optional rather than populated (Option C).

**Why it matters.** Astro Starlight requires `title:` on every collected page; this is non-negotiable for the v2.14 build to pass. `description:` is optional but high-value: it controls how each sample appears in Starlight's automatic listing pages, search results, and any social-card preview. Without `description:`, Starlight falls back to the first 160 characters of body text, which for samples means raw scenario prose without context. The Starlight spike report documents this as Caveat 1 ("title-frontmatter required") but the spike audited `docs/**/*.md` only; library samples were not in scope at spike time. With samples now Starlight-collected, the `title:` requirement applies repo-wide.

Bundling `title:` + `description:` in one mechanical sweep is cheaper than a second pass touching the same 100 files; the alternative requires two PRs, two reviews, and a merge-conflict surface on identical files.

**Desired outcomes.**

| Outcome                                                                              | How verified                                                          |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------- |
| Every library sample carries a `title:` derived from its skill, thread, and scenario | Linter passes; Starlight build succeeds                               |
| Each sample's listing-page excerpt is meaningful (1-2 sentences, not raw markdown)   | Spot-check 6 samples; confirm they read well as listing-page excerpts |
| Future samples ship with both fields populated                                       | `SAMPLE_CREATION.md` Section 5 mandates both fields with examples     |

**Potential solutions.**

- **Option A: Bundle `title:` + `description:` in this PR; populate both.** Pros: cheaper (one sweep, one review, one merge surface); higher quality search/listing experience from day one of the migration; contributors learn one schema, not two. Cons: more per-file authoring work to derive `description:` (mitigated by deriving from existing `context:` as a starting point).
- **Option B: Ship `title:` only in this PR; defer `description:` to v2.15+.** Pros: smaller scope; lower review surface area; faster to ship. Cons: requires a second mechanical pass touching the same 100 files later; samples have lower-quality listing previews until v2.15+.
- **Option C: Bundle both fields as schema, but make `description:` optional rather than populated.** Pros: schema is forward-compatible; no per-file authoring of descriptions. Cons: most samples ship without populated `description:`, defeating the listing-quality goal; just defers the per-file authoring work.
- **Option D: Defer all schema enhancements; ship placement fix only.** Pros: minimum scope. Cons: doesn't satisfy Starlight's `title:` requirement; the migration build will fail or strip pages silently.

**Recommendation: Option A** (bundle both, populate both). Touching 100 files twice is wasteful when one pass can land both. The `context:` field is already populated in every sample and provides a reasonable starting point for `description:` (refine where the derivation is awkward). Option D is rejected outright because it doesn't satisfy the Starlight requirement; Option C is rejected because empty `description:` defeats the field's purpose.

**Maintainer decision / feedback:**

- [x] Accept recommendation (Option A; bundle title + description, populate both)
- [ ] Modify: 
- [ ] Reject; alternative direction: 

- Notes: 

### Proposed final schema for library samples

If Option A is selected, the post-sweep schema looks like this:

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
context: Brainshelf consumer PKM app - opportunity tree for saved content re-engagement
---
```

Field ordering: Starlight conventions place `title:` and `description:` first because they are SEO-load-bearing. Existing fields follow. The closing `---` and the attribution comment then follow as specified in Decision Brief 1.

---

## Decision Brief 3: `context:` field disposition (Q3)

**What it is.** The existing library-sample schema includes a `context:` field that carries scenario-specific framing (e.g., "Brainshelf consumer PKM app - opportunity tree for saved content re-engagement"). Adding `description:` per Q2 creates partial overlap: both fields describe the sample. The decision: keep both with distinct semantics (Option A), rename `context:` to `scenario:` for clearer naming (Option B), or fold `context:` into `description:` and drop the separate field (Option C).

**Why it matters.** Two near-synonym fields in the same schema is a maintenance smell. If they coexist without crisp documented semantics, contributors must guess which to populate, leading to schema drift over time. If one is renamed, every existing 100-sample file needs the field renamed; that's the same mechanical cost as the placement fix and best done in the same PR. If they're merged, the existing `context:` content needs distillation to fit the SEO-grade 1-2 sentence description shape (potentially lossy).

**Desired outcomes.**

- Schema has either one description-class field, or two with crisp documented semantics.
- Contributors can tell which field to populate without reading mailing-list archives.
- `SAMPLE_CREATION.md` Section 5 documents the choice with examples.
- Existing `context:` content is preserved (not silently lost) regardless of decision.

**Potential solutions.**

- **Option A: Keep both with distinct semantics.** `description:` is SEO-load-bearing (1-2 sentences for listing pages and meta tags); `context:` is scenario-load-bearing (richer narrative; the why-this-sample framing). Document the distinction in `SAMPLE_CREATION.md`. Pros: zero rename motion; preserves existing `context:` content. Cons: two fields to populate; risk of drift over time if contributors don't read the docs.
- **Option B: Rename `context:` to `scenario:`.** Pros: more specific name; semantics clarified by name alone; `description:` SEO purpose is unambiguous. Cons: 100-file rename cost (mechanical, scriptable); any downstream tools that read `context:` need updating (audit needed).
- **Option C: Fold `context:` into `description:`.** Pros: simplest schema; one description-class field. Cons: existing `context:` content needs distillation into 1-2 sentences (lossy); narrative framing is lost; `description:` becomes overloaded.

**Recommendation: Option A** (keep both with distinct semantics). Lowest motion; preserves existing scenario content; the SEO field is purpose-built. Document in `SAMPLE_CREATION.md` that `description:` is for listing-page excerpts (1-2 sentences, SEO-grade) and `context:` is for scenario framing (richer narrative; why-this-sample-exists). Drift risk is bounded by the linter (which can validate both fields are populated and `description:` is short).

**Maintainer decision / feedback:**

- [x] Accept recommendation (Option A; keep both with distinct semantics, documented)
- [ ] Modify: 
- [ ] Reject; alternative direction: 

- Notes: 

---

## Decision Brief 4: OKR-skill EXAMPLE.md schema scope (Q4)

**What it is.** Two skill `references/EXAMPLE.md` files (`measure-okr-grader/references/EXAMPLE.md` and `foundation-okr-writer/references/EXAMPLE.md`) have the byte-0 placement bug. They use a smaller frontmatter shape (5 fields vs 8) and are NOT directly published as Starlight pages today (they live under `skills/*/` which Starlight's content collection does not index by default; per W2 mount config, only `docs/**` and library samples are collected). The decision: do these 2 files receive only the placement fix (Option A; smaller scope), the placement fix plus `title:` only (Option B; aligns if Q2 lands title-only), the full schema treatment matching the 100 library samples (Option C; aligns if Q2 lands the bundled schema), or defer entirely to v2.15+ (Option D).

**Why it matters.** EXAMPLE.md files are reference material for skill contributors, not user-facing pages. Adding `title:` to them is technically free (the file structure permits it; existing 26 other EXAMPLE.md files have varying schemas), but `description:` may not apply since they're not listing-page candidates. Decoupling these 2 files from the schema enhancement keeps the v2.14 PR boundaries cleaner; coupling them keeps schema treatment uniform across all 102 in-scope files.

**Desired outcomes.**

- The 2 OKR-skill EXAMPLE.md files are byte-0 compliant after this PR.
- The schema treatment is consistent with the broader Q2 outcome.
- The PR diff is reviewable as one focused change without ambiguity over which files got which treatment.

**Potential solutions.**

- **Option A: Placement fix only; no schema additions.** Pros: minimal scope on these 2 files. Cons: divergent treatment from the 100 library samples; if `title:` is added to samples (Q2 outcome), these 2 files have a different schema than their sibling sample files.
- **Option B: Placement fix + `title:` only.** Pros: aligns with Q2 if Q2 lands `title:` only; gives these 2 files Starlight-compatible structure even though they're not Starlight-collected today. Cons: requires deriving meaningful titles (cheap; can use skill name + " example" pattern).
- **Option C: Placement fix + full schema (Q2 bundled outcome).** Pros: maximum consistency; all 102 files in scope get uniform treatment. Cons: `description:` on EXAMPLE.md files may not be load-bearing today (these files aren't Starlight-collected as published pages).
- **Option D: Defer entirely to v2.15+.** Pros: smaller v2.14 PR; keeps EXAMPLE.md scope out of the migration. Cons: leaves the placement bug unfixed on 2 files; sibling 100 files get fixed; treats these 2 files as an exception without clear justification.

**Recommendation:** Option C if Q2 lands the bundled title + description schema (Q2 Option A); Option B if Q2 lands `title:` only (Q2 Option B). Either way, Option D is rejected (the placement bug is in scope and these 2 files belong with the rest of the sweep). Reasoning: the 2 OKR EXAMPLE.md files are part of the same defect class as the 100 library samples; excluding them from the schema treatment creates two divergent schema shapes for what's effectively one defect class.

**Maintainer decision / feedback:**

- [x] Accept recommendation as conditional on Q2 outcome (Option C if Q2-A; Option B if Q2-B)
- [ ] Modify: 
- [ ] Reject; alternative direction: 

- Notes: 

---

## Decision Brief 5: PR boundaries (Q5)

**What it is.** This spec covers three coupled work items: (1) generators and standards docs updates (`SAMPLE_CREATION.md`, `pm-skill-builder`, `pm-skill-iterate`, `pm-skill-validate` SKILL.md files), (2) the 102-file mechanical sweep (placement fix + Q2-outcome schema additions), (3) the CI lint extension (`lint-skills-frontmatter.sh` + `.ps1`). The decision: bundle all three in one PR (Option A), split into 3 PRs by work item (Option B), split into 2 PRs (Option C: generators + sweep, then lint), or some other split.

**Why it matters.** PR boundaries affect review ergonomics, revertability, and how the work appears in the cycle's commit history. Bundled means one review, one merge surface, one revert if needed. Split means smaller diffs but more coordination cost (the lint extension can't merge before the sweep, since the sweep makes the lint extension green; if lint lands first it would fail CI on the existing 102 broken files).

**Desired outcomes.**

- Reviewer can verify each batch in isolation by reading the diff in dependency order.
- The work appears as a coherent unit in the v2.14 cycle history (not scattered across the cycle).
- Revert path is clean if the sweep needs to be undone.
- CI stays green from PR open onward (no transient red states).

**Potential solutions.**

- **Option A: Bundle all three in one PR.** Pros: single review; coherent unit; sweeps + lint land together so CI passes from PR open; matches the repo's "no effort-doc bloat on refactor cycles" rule (one row in `plan_v2.14.0.md` = one commit in history). Cons: larger diff (~110 file changes); harder to revert one batch without reverting all (mitigated by the work being tightly coupled in scope).
- **Option B: Split into 3 PRs (generators, sweep, lint).** Pros: smaller diffs per PR; easier to revert one batch. Cons: 3x review overhead; ordering dependency (lint must merge after sweep or CI breaks); commits scattered across the cycle; coordination cost on which PR is in flight.
- **Option C: Split into 2 PRs (generators + sweep, then lint).** Pros: smaller per-PR diffs; the high-volume mechanical sweep is reviewed first; lint follows after sweep is verified clean. Cons: 2x review overhead; still has ordering dependency (lint can't land first).
- **Option D: Bundle generators + lint, sweep separately.** Pros: separates the mechanical (high-volume, low-decision) sweep from the deliberate (lower-volume, higher-decision) generators + lint changes. Cons: the lint can't enforce until the sweep lands; ordering dependency persists; lint PR has to ship as advisory until sweep merges.

**Recommendation: Option A** (bundle in one PR). The mechanical sweep is straightforward and deterministic (script-driven); the generators + lint changes are small-surface (4 SKILL.md files plus 1 linter pair). Bundling makes the PR self-contained and easy to verify by reading the diff in dependency order: generators first (the contracts), sweep second (the mechanical fix), lint third (the guardrail). The "no effort-doc bloat on refactor cycles" rule applies: this work is one row in `plan_v2.14.0.md`, so it should be one commit in history.

**Maintainer decision / feedback:**

- [x] Accept recommendation (Option A; bundle in one PR)
- [ ] Modify: 
- [ ] Reject; alternative direction: 

- Notes: 

---

## CI work item: extend `lint-skills-frontmatter.sh`

### What

The existing `scripts/lint-skills-frontmatter.sh` already enforces byte-0 `---` for files matching `skills/*/SKILL.md` (line 31-36). Two extensions:

1. **Broaden the byte-0 check** to additionally cover:

   - `skills/*/references/TEMPLATE.md` (currently ~40 files)
   - `skills/*/references/EXAMPLE.md` (currently ~40 files)
   - `library/skill-output-samples/**/*.md` (currently 102 files including README and standards docs that have no frontmatter; the check should skip files that have no `---` at all and only fail on files that have `---` somewhere but not at byte 0)
1. **Add a schema check** for library samples specifically:

   - Required fields: `title`, `description` (if Decision Brief 2 lands the full schema), `artifact`, `version`, `created`, `status`, `thread`, `context`
   - Per-field validation: `created` is ISO date; `thread` is one of the canonical thread enum values; `status` is `sample` or `legacy`.

The existing PowerShell counterpart `lint-skills-frontmatter.ps1` receives matching changes.

### Why

The bug shipped because the linter's byte-0 check was scoped to one file class (`skills/*/SKILL.md`). All other markdown file classes were unverified. Extending the existing check is cheaper than building a new linter and keeps the CI surface area consolidated.

### Desired outcomes

| Outcome                                                                                              | How verified                                                                                         |
| ---------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `bash scripts/lint-skills-frontmatter.sh` exits 0 across all in-scope file classes after the sweep   | Run locally on a clean tree                                                                          |
| Reintroducing the bug pattern in any in-scope file class causes CI to fail with a clear error message | Manual test: insert a comment before `---` in one sample file, run the linter, verify FAIL with file path and reason |
| Linter is idempotent and side-effect-free                                                            | No file mutations; exit code is the only signal                                                      |

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
1. **Sweep the 102 files** (mechanical, scripted):

   - 100 library samples
   - 2 skill OKR EXAMPLE.md files
   - Apply placement fix and (per Decision Brief 2 outcome) schema additions in the same script run
1. **Land the CI lint extension last** (guardrail):

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

| Risk                                                                              | Likelihood | Mitigation                                                                                           |
| --------------------------------------------------------------------------------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| Mechanical sweep introduces a typo in one of 102 files                            | Low        | Use a deterministic script (no LLM-authored edits per file). Diff-review the full sweep before merge. |
| Adding `title:` requires hand-curated values; tedium leads to low-quality titles  | Medium     | Generate from `artifact + thread + context` as a starting point; review and refine per file. Budget ~1 hour for refinement across 100 files. |
| Schema additions break `pm-skill-validate` if it has hardcoded field expectations | Low        | The validator only checks SKILL.md frontmatter today; library samples are out of its scope. Confirm during implementation. |
| MCP server has cached or embedded sample frontmatter that would drift             | Low        | Per existing project memory, MCP gap is frozen at 28 skills with no library samples embedded. No drift risk. |
| Starlight schema validation rejects a field we did not anticipate                 | Medium     | Run `astro build` against the post-sweep tree as part of acceptance. Spike has already validated 5 caveats; this would be a 6th if found. |

---

## Open questions for maintainer (navigation index)

The 5 questions are each their own Decision Brief above with the full 6-part structure (What it is / Why it matters / Desired outcomes / Potential solutions / Recommendation / Maintainer decision-feedback). This index is for quick navigation:

| Q   | Subject                                     | Brief                                                                                  | Status |
| --- | ------------------------------------------- | -------------------------------------------------------------------------------------- | ------ |
| Q1  | Placement format                            | [Decision Brief 1](#decision-brief-1-placement-format-q1)                              | Open   |
| Q2  | Schema scope (title + description bundling) | [Decision Brief 2](#decision-brief-2-schema-scope---title-and-description-bundling-q2) | Open   |
| Q3  | `context:` field disposition                | [Decision Brief 3](#decision-brief-3-context-field-disposition-q3)                     | Open   |
| Q4  | OKR-skill EXAMPLE.md schema scope           | [Decision Brief 4](#decision-brief-4-okr-skill-examplemd-schema-scope-q4)              | Open   |
| Q5  | PR boundaries                               | [Decision Brief 5](#decision-brief-5-pr-boundaries-q5)                                 | Open   |

Once all 5 briefs have a maintainer decision recorded, this spec is unblocked and W3.5 in `plan_v2.14_starlight-migration.md` can proceed.

---

## References

- `discovery/frontmatter-correction-example.md` (the visual before/after example artifact)
- `plan_v2.14_starlight-spike-report_2026-05-06.md` (spike caveat 1 motivates the title-frontmatter angle)
- `library/skill-output-samples/SAMPLE_CREATION.md` (current authoring spec; Section 5 is the target of this work)
- `scripts/lint-skills-frontmatter.sh` (existing linter; lines 31-36 are the existing byte-0 check that this work generalizes)
- `skills/define-opportunity-tree/SKILL.md` (canonical example of correctly-placed frontmatter, lines 1-13)