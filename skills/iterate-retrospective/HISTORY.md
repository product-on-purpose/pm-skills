# iterate-retrospective - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 2.2.0 | 2026-08-08 | v2.32.0 | F-54 | minor | Project Memory Contract: reads recent artifacts, writes lessons as an interpretation artifact. |
| 2.1.0 | 2026-06-10 | v2.26.0 | F-12-batch-3 | minor | Quality convergence: When NOT to Use + output-contract enumeration (F-12 Batch 3) |
| 2.0.1 | 2026-06-10 | v2.26.0 | F-12-batch-0 | patch | Description rewrite for trigger accuracy (boundary disambiguation; 2026-06-09 audit, v2.26.0 Batch 0) |
| 2.0.0 | 2026-01-26 | - | - | baseline | Prior published version |


## 2.2.0 (2026-08-08)

Released in v2.32.0. Effort: F-54 (memory-aware cohort, B2).

Adds a `## Project Memory Contract` section declaring what this skill reads from and appends to
`.claude/pm-skills.local.md`. Additive and inert: with no memory file the skill behaves exactly as
before. Writes are proposed for confirmation unless `memory_auto_append: true` is set.

### Changes
- Declared the project-memory read/write contract.
## 2.1.0 (2026-06-10)

Quality-convergence minor (F-12 Batch 3): added a "When NOT to Use" section with boundary pointers to neighboring skills, and the Output Format now enumerates the template sections a complete artifact fills. No template or example changes.

## 2.0.1 (2026-06-10)

Description-only patch (F-12 Batch 0, from the 2026-06-09 repo audit): the trigger-surface description was rewritten to disambiguate collision pairs with an explicit boundary pointer to the sibling skill. No body, template, or behavior changes.

## 2.0.0 (2026-01-26)

Baseline row for the prior published version; see git history for its changes.
