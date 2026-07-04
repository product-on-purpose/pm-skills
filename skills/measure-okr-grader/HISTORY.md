# measure-okr-grader - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.0.1 | 2026-07-04 | v2.30.0 | M-35 | patch | Deduped the scoring conventions: Instructions Step 3 now points at the Scoring Rules section instead of restating it (2026-07-04 deep audit, ~15 redundant lines). No change to the scoring conventions themselves. |
| 1.0.0 | 2026-05-01 | v2.12.0 | - | baseline | Prior published version: scores completed OKR sets at cycle close per the canonical five-value OKR type enum, with indicator-class rules, not-yet-observable / not-yet-fully-observable special states, and MUST/MUST NOT constraint rules guarding against retroactive target changes, scope shrinkage, and effort-equals-impact framing. |

## 1.0.1 (2026-07-04)

Released in [v2.30.0](../../site/src/content/docs/releases/Release_v2.30.0.md). Effort: M-35 (trust repair sweep).

The 2026-07-04 deep audit found the Instructions section restated the per-OKR-type scoring conventions that the dedicated Scoring Rules section already states in full, roughly 15 redundant lines carrying the same rule in two places.

### Changes
- Instructions Step 3 ("Score each KR") now points to the Scoring Rules section for the per-type convention table and the guardrail indicator-class rule, instead of restating both inline.
- No change to the scoring conventions, the Constraint Rules, or the Output Contract; this is a documentation-consistency fix, not a behavior change.

## 1.0.0 (2026-05-01)

Released in [v2.12.0](../../site/src/content/docs/releases/Release_v2.12.0.md).

Initial release: scores completed OKR sets at cycle close per the canonical OKR type enum (committed | aspirational | learning | operational_health | compliance_or_safety), with KR-level scoring, committed-vs-aspirational interpretation, evidence quality assessment, learning synthesis, and next-cycle recommendations.

### Contract established
- OKR type enum: committed | aspirational | learning | operational_health | compliance_or_safety, each with its own scoring convention
- Indicator class `guardrail` is independent of OKR type; never averaged into the primary objective score
- Refuses retroactive target changes, retroactive scope shrinkage on committed / compliance_or_safety KRs, and using scores as individual performance ratings
