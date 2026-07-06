# utility-mermaid-diagrams - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.1.0 | 2026-07-05 | v2.31.0 | WS-Z5 | minor | Reciprocal When NOT to Use pointer to `discover-journey-map`; collision pair declared with new trigger fixtures. |
| 1.0.0 | 2026-04-07 | v2.10.0 | F-16 | baseline | Prior published version: teaches PMs to create syntactically valid mermaid diagrams across all 15 diagram types with a dual-lens navigation system. |

## 1.1.0 (2026-07-05)

Released in [v2.31.0](../../site/src/content/docs/releases/Release_v2.31.0.md). Effort: WS-Z5 (eval backfill wave 1, R-16).

The WS-Z5 fixture backfill declared `discover-journey-map` as a new collision pair for this skill in `scripts/trigger-eval-roster.yaml`, but the reciprocal "When NOT to Use" pointer was never added. The enforcing `check-reciprocal-boundary-pointers` gate caught the gap. Adds one bullet pointing to `discover-journey-map` for requests that want the full customer-journey artifact rather than standalone diagram help. No other content change.

## 1.0.0 (2026-04-07)

Released in [v2.10.0](../../site/src/content/docs/releases/Release_v2.10.0.md). Effort: F-16.

Initial release: teaches PMs to create syntactically valid mermaid diagrams by selecting the right diagram type for their communication need, following syntax validity rules, and validating before shipping. Covers all 15 mermaid diagram types with PM-relevant examples and a dual-lens navigation system (type catalog and PM use-case guide).

### Contract established
- Cardinal rule: do not diagram what a list can say
- Diagram selection guide across 15 types with a syntax validity reference
- Output: a planning worksheet plus a validated mermaid code block embedded in the target document
