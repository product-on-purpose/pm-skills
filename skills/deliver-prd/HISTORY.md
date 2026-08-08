# deliver-prd - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 2.2.0 | 2026-08-08 | v2.32.0 | F-54 | minor | Project Memory Contract: reads prior interpretation artifacts, writes the PRD as a decision artifact. |
| 2.1.0 | 2026-06-10 | v2.26.0 | F-12-batch-1 | minor | Quality convergence: When NOT to Use + output-contract enumeration (F-12 Batch 1) |
| 2.0.0 | 2026-01-26 | - | - | baseline | Prior published version |


## 2.2.0 (2026-08-08)

Released in v2.32.0. Effort: F-54 (memory-aware cohort, B2).

Adds a `## Project Memory Contract` section declaring what this skill reads from and appends to
`.claude/pm-skills.local.md`. Additive and inert: with no memory file the skill behaves exactly as
before. Writes are proposed for confirmation unless `memory_auto_append: true` is set.

### Changes
- Declared the project-memory read/write contract.
## 2.1.0 (2026-06-10)

Quality-convergence minor (F-12 Batch 1): added a "When NOT to Use" section with boundary pointers to neighboring skills, and the Output Format now enumerates the template sections a complete artifact fills. No template or example changes.

## 2.0.0 (2026-01-26)

Baseline row for the prior published version; see git history for its changes.
