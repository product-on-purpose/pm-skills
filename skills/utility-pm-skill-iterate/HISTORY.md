# utility-pm-skill-iterate - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.1.0 | 2026-10-16 | v2.34.0 | - | minor | Step 7 now offers to create a missing HISTORY.md for any skill at 1.0.0 or later, whether or not the change bumps it, instead of treating the file as premature before a second version. A 0.x skill still gets no offer until its first bump. Aligns with `docs/internal/skill-versioning.md` as revised on 2026-10-15. |
| 1.0.0 | 2026-04-03 | v2.8.0 | F-11 | baseline | Initial release: applies targeted improvements to an existing skill from feedback, a validation report, or a convention change, previews them, writes on confirmation, and suggests a version bump. |

## 1.1.0 (2026-10-16)

Planned for v2.34.0, under ruling R1 (re-scope the release around the deliver-prd increment) in its release plan.

On 2026-10-15 the repo retired the per-release `skills-manifest.yaml` and made HISTORY.md required from a skill's first 1.0.0 release. This skill still called the file premature until a skill's second version, which contradicted that rule. Aligning it was a v2.34.0 plan item.

### Changes
- Step 7's two "HISTORY.md does not exist" branches are replaced. For a skill at 1.0.0 or later, the iterator offers to create the file, with a baseline row for the shipped version and a row for the new version when the change bumps it. For a 0.x skill, it offers only when the change bumps it, and does not backfill the 0.x version.
- `references/EXAMPLE.md` states the new reason for the offer. Its outcome is unchanged: a skill at 2.0.0 with no HISTORY.md, bumped to 2.0.1, gets the file with rows for both versions.

## 1.0.0 (2026-04-03)

Released in [v2.8.0](../../site/src/content/docs/releases/Release_v2.8.0.md). Effort: F-11 (#122).

Initial release, completing the skill lifecycle of create (`utility-pm-skill-builder`), validate (`utility-pm-skill-validate`) and iterate. Given an existing skill and a source of change, it reads the skill's current files, previews each proposed edit, and writes only on confirmation. It closes by suggesting a patch, minor or major bump under the versioning tie-breaker, and offers to create or update this file.

This file was added on 2026-10-15, when the per-release `skills-manifest.yaml` was retired. Until then, the v2.8.0 manifest was the only record of this version outside the CHANGELOG.

### Contract established
- Inputs: an existing skill plus feedback, a validation report, or a convention change
- Preview before write: every proposed change is shown first and applied only on confirmation
- Closes with a suggested version bump class and an offer to update `version`, `updated` and HISTORY.md
