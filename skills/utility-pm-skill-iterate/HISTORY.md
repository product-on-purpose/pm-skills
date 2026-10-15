# utility-pm-skill-iterate - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.0.0 | 2026-04-03 | v2.8.0 | F-11 | baseline | Initial release: applies targeted improvements to an existing skill from feedback, a validation report, or a convention change, previews them, writes on confirmation, and suggests a version bump. |

## 1.0.0 (2026-04-03)

Released in [v2.8.0](../../site/src/content/docs/releases/Release_v2.8.0.md). Effort: F-11 (#122).

Initial release, completing the skill lifecycle of create (`utility-pm-skill-builder`), validate (`utility-pm-skill-validate`) and iterate. Given an existing skill and a source of change, it reads the skill's current files, previews each proposed edit, and writes only on confirmation. It closes by suggesting a patch, minor or major bump under the versioning tie-breaker, and offers to create or update this file.

This file was added on 2026-10-15, when the per-release `skills-manifest.yaml` was retired. Until then, the v2.8.0 manifest was the only record of this version outside the CHANGELOG.

### Contract established
- Inputs: an existing skill plus feedback, a validation report, or a convention change
- Preview before write: every proposed change is shown first and applied only on confirmation
- Closes with a suggested version bump class and an offer to update `version`, `updated` and HISTORY.md
