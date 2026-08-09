# foundation-okr-writer - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.1.0 | 2026-08-08 | v2.32.0 | F-54 | minor | Project Memory Contract: reads phase, active_initiative and prior decisions; writes the OKR set as a decision artifact. |
| 1.0.0 | 2026-04-30 | v2.12.0 | F-40 | added | Initial release: outcome-based OKR drafting, review, rewrite and coaching across five entry modes. |

## 1.1.0 (2026-08-08)

Released in v2.32.0. Effort: F-54 (memory-aware cohort, B2).

Adds a `## Project Memory Contract` section declaring what this skill reads from and appends to
`.claude/pm-skills.local.md`. Additive and inert: with no memory file the skill behaves exactly as
before. Writes are proposed for confirmation unless `memory_auto_append: true` is set.

### Changes
- Declared the project-memory read/write contract.

## 1.0.0 (2026-04-30)

Initial release. Outcome-based OKR drafting, review, rewrite, and coaching across five entry
modes (Guided, One-Shot, Sustained Coach, Audit Only, Rewrite), with constraint rules that
refuse to fabricate baselines or targets and reframe feature-delivery key results as outcomes.
