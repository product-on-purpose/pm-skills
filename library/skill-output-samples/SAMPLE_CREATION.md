# Sample Creation Standards

This document defines the canonical standards for adding or updating sample outputs in `library/skill-output-samples/`.

## 1) Scope

Applies to all sample markdown files under:

- `library/skill-output-samples/<skill-name>/`

This excludes:

- `README_SAMPLES.md` (navigation doc)
- tracked release-governance artifacts under `docs/internal/releases/`

## 2) Canonical Naming

Use this exact pattern for every sample output file:

- `sample_skill_thread_<additional-helpful-context>.md`

Rules:

1. `skill` must match the folder/skill id (for example `define-hypothesis`, `deliver-prd`, `foundation-persona`).
2. `thread` should be one of:
   - `storevine`
   - `brainshelf`
   - `workbench`
   - `orbit` (legacy PRD calibration samples)
   - `legacy` (older non-thread baseline examples)
3. `<additional-helpful-context>` should be short and hyphenated (`[a-z0-9-]` only).
4. Use lowercase only.
5. Do not use spaces.

Examples:

- `sample_define-hypothesis_storevine_campaigns.md`
- `sample_deliver-prd_orbit_ideal.md`
- `sample_foundation-persona_workbench_marketing-detailed-blueprints.md`
- `sample_discover-competitive-analysis_legacy_ecommerce-platform.md`

## 3) Folder Structure

1. Keep one folder per skill:
   - `library/skill-output-samples/<skill-name>/`
2. Do not mix skill outputs across folders.
3. Keep legacy samples in their original skill folder, using `thread=legacy` in filename.

## 4) Required Content Structure

Every sample should keep this section order:

1. `Scenario`
2. `Prompt`
3. `Output`

Additional requirements:

1. Output must follow the corresponding skill `references/TEMPLATE.md` section order.
2. No unresolved placeholders (`TBD`, `TODO`, `<...>` placeholder text).
3. Any invented metric/value should include `[fictional]` marker.
4. If real public claims are used, include `Source Notes` with public references.

## 5) Frontmatter Standards

For modern thread samples (`storevine`, `brainshelf`, `workbench`), include frontmatter keys consistent with current corpus patterns:

1. `artifact`
2. `version`
3. `repo_version`
4. `skill_version`
5. `created`
6. `status`
7. `thread`
8. `context`

Legacy files may not have full modern frontmatter; avoid back-editing legacy unless there is a correctness issue.

## 6) Release-Coverage Metadata

Release-coverage manifest is maintained as a tracked internal release-governance artifact (not in this folder):

- `docs/internal/releases/v2.6.1/skill-output-samples_manifest.v2.6.1.json`

When sample files are added/renamed/removed, update that tracked manifest in the same change set.

## 7) README_SAMPLES Update Workflow

When adding or renaming files, update `library/skill-output-samples/README_SAMPLES.md` in the same pass.

Required updates:

1. **Browse by Skill** table links must point to new filenames.
2. **Browse by Company** section links must point to new filenames.
3. Any descriptive text referencing old scenario/file names should be updated.

Do not leave stale links.

## 8) Validation Checklist

Before considering sample updates complete:

1. All markdown links in `README_SAMPLES.md` resolve to existing files.
2. Filenames conform to `sample_skill_thread_<additional-helpful-context>.md`.
3. Section order and completeness checks pass (`Scenario`, `Prompt`, `Output`).
4. Release-coverage manifest entries match actual filenames for expected samples.

## 9) Practical Policy Notes

1. Keep canonical coverage deterministic (currently 84 core samples).
2. Additional legacy files are allowed but should be explicitly treated as legacy in naming.
3. Avoid ad-hoc naming exceptions; update this document first if policy changes.
