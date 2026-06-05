# Plan: CHANGELOG (and doc-body) em-dash-sweep scar cleanup

Status: deferred / backlog (not started)
Tracking issue: #167 (canonical backlog entry; this doc is the scope artifact)
Date: 2026-06-05
Trigger: surfaced during the resource-index work (PRs #164/#165)

## Background

An earlier em-dash sweep replaced em-dash characters with `" . "` (space, period,
space) in places where the original punctuation was a dash. The result is a
"scar": a lone spaced period used as a separator or appositive dash, which is
grammatically wrong even though it contains no em-dash character (so the
no-em-dashes hook does not catch it - the hook blocks U+2014/U+2013, not their
swept-to-period residue).

A repo-wide scan on 2026-06-05 found:

- 2 scars in guide frontmatter descriptions (`prompt-gallery.md`, `skill-finder.md`)
  plus 6 more in those two files' bodies. ALL FIXED in PR #165 (commit `9fd2323`).
- ~300+ occurrences in `CHANGELOG.md`, where the scar is used as the separator
  between a bolded changelog item and its description. Example (the marker
  `[scar]` stands for the literal spaced period to be replaced):

  ```
  **F-26: foundation-lean-canvas** (/lean-canvas) [scar] one-page business thesis ...
  ```

  These are cosmetic only: the CHANGELOG is historical and is not reproduced in
  the resource index or anywhere user-facing on the site.
- Possibly a handful more in other hand-authored doc bodies (the 2026-06-05 scan
  was scoped to descriptions for #165; a full body scan is part of this plan).

This work was deferred from #165 because it is large (300+ edits), purely
cosmetic, and unrelated to the resource-index change.

## Scope

In scope (tracked, hand-authored prose):
- `CHANGELOG.md` (the bulk of the work).
- `README.md`, `CONTRIBUTING.md`, and any other root-level tracked prose.
- `site/src/content/docs/**` hand-authored bodies (concepts, guides, reference,
  getting-started, contributing). The two guides fixed in #165 are already clean.
- `docs/internal/**` is optional (internal notes); fix opportunistically, not required.

Out of scope:
- `library/skill-output-samples/**` (sample artifacts; their catalog labels come
  from filenames, and descriptions are not catalog-shown).
- Generated content under `site/src/content/docs/{skills,samples,workflows,showcase}/`
  (gitignored, rebuilt from sources; fixing sources is what matters).
- This plan file itself (it intentionally contains the pattern as documentation;
  exclude it from the acceptance scan).

## Decisions needed

- D1 - Replacement punctuation. Default to `" - "` (space-hyphen-space), the
  closest direct replacement per the global writing rule. Use a sentence break
  (`. ` + capitalized next word) only where the scar actually joined two complete
  sentences. For the dominant CHANGELOG case (bold item name, then separator, then
  description), `" - "` reads correctly; `": "` is an acceptable alternative if
  preferred for that specific separator. Pick one and apply consistently.
- D2 - Restyle vs. minimal. Recommend MINIMAL: fix only the dash scars; do not
  restructure or restyle historical entries.

## Approach

1. Inventory: `git grep -nE " \. [A-Za-z]" -- CHANGELOG.md README.md CONTRIBUTING.md "site/src/content/docs"`
   then filter the allow-list of legitimate spaced-period cases: `e.g.`, `i.e.`,
   `etc.`, `vs.`, ellipses, and any genuine `Initial . Word` abbreviations.
2. Categorize the hits:
   - (a) item/description separator after a bold lead (the dominant CHANGELOG case) -> `" - "`.
   - (b) mid-sentence appositive dash -> `" - "`.
   - (c) genuine sentence break mistakenly spaced -> `". "` and capitalize the next word.
   Expect the vast majority to be (a).
3. Bulk edit with review: given the volume, a scripted replace of the dominant
   separator patterns (for example, `) . ` and `** . ` after a bold item) is
   acceptable, followed by a full `git diff` review. Edit ambiguous singletons by hand.
   Do NOT blind-replace every `" . "` - the allow-list cases must survive.
4. Verify (acceptance below).
5. Optional follow-up: an advisory CI check that flags NEW spaced-period scars in
   tracked prose. Low priority - the no-em-dashes hook already prevents the root
   cause (em-dashes) at authoring time, so new scars should not appear; this would
   only catch pasted/legacy content.

## Acceptance

- `git grep -nE " \. [A-Za-z]"` over in-scope tracked prose (excluding this plan
  file and the abbreviation allow-list) returns nothing.
- No U+2014 / U+2013 characters introduced (dash-scan clean).
- `CHANGELOG.md` renders correctly: spot-check ~10 entries across different versions.
- CI (`validation.yml`) green on both OS legs.

## Execution notes

- Untagged maintenance change (no skill/behavior/version impact); land via the
  normal branch -> PR -> squash-merge flow whenever convenient.
- Good fit for a script-assisted bulk pass (sed/Node) with a human diff review, or
  a Codex pass; the risk is entirely in the allow-list discrimination, not in the
  mechanical replace.
- Related prior fix: PR #165 (`9fd2323`) cleaned the two guide files; use its diff
  as the pattern reference for `" . " -> " - "`.
