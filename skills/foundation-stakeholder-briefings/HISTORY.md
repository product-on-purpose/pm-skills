# foundation-stakeholder-briefings - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.0.1 | 2026-07-04 | v2.30.0 | M-35 | patch | Heading normalized to the skeleton-canon spelling: bare "Output" to "Output Format", "Quality checklist" to "Quality Checklist". |
| 1.0.0 | 2026-06-20 | v2.28.0 | F-55 | baseline | Prior published version: turns any source artifact into one canonical master document plus audience-tailored briefings, each a traceable projection of the master. |

## 1.0.1 (2026-07-04)

Released in [v2.30.0](../../site/src/content/docs/releases/Release_v2.30.0.md). Effort: M-35 (trust repair sweep).

Heading-normalization sweep (WS-T8b): the 2026-07-04 deep audit found this skill's bare "Output" heading as one of the catalog's six drifted output-section heading names, plus a lowercase "Quality checklist" instance. Both renamed to the canon spelling. No content or behavior change.

## 1.0.0 (2026-06-20)

Released in [v2.28.0](../../site/src/content/docs/releases/Release_v2.28.0.md). Effort: F-55 (#209).

Initial release: takes any source artifact (a spec, discovery synthesis, research report, GTM plan, experiment results, or a retro) and produces one canonical master document plus a set of audience-tailored briefings, one per stakeholder lens.

### Contract established
- Nine first-class lenses (executive, board, engineering, UX, PMM, sales, CS, legal, data) plus a Custom slot
- Every briefing is a traceable projection: `Draws on:` IDs must resolve to a real master claim, and each block carries exactly one `Primary ask:`
- Output: a single artifact (master plus delimited briefing blocks, a boundary marker, and a translations-applied log)
