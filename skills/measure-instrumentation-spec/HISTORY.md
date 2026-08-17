# measure-instrumentation-spec - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 2.3.0 | 2026-08-16 | v2.33.0 | C-1 | minor | Privacy section extended with a conditional `Model Trace Capture` subsection: what is captured, redaction before storage, retention, sampling, who can read a trace, and user opt-out. Event Inventory untouched. |
| 2.2.0 | 2026-07-04 | v2.30.0 | M-35 | minor | Rewrote the frontmatter description: added the product-engineering contract framing and the sibling deflection to `measure-dashboard-requirements`, its collision-pair companion in this release's Batch 5. |
| 2.1.0 | 2026-06-10 | v2.26.0 | F-12-batch-4 | minor | Quality convergence: When NOT to Use + output-contract enumeration (F-12 Batch 4) |
| 2.0.0 | 2026-01-26 | - | - | baseline | Prior published version |

## 2.3.0 (2026-08-16)

AI-product family Track 1 (effort C-1), the `measure-instrumentation-spec` increment ruled in
[the C-3 spec](../../docs/internal/release-plans/v2.32.0/spec_c3-ai-product-family.md) section 2.2.
Extends the existing `PII & Privacy Considerations` section with a conditional `Model Trace Capture`
subsection. No new top-level section, so the Output Format enumeration is unchanged.

**Why privacy and not observability.** A trace is not an event. An event carries properties chosen
in advance; a trace carries what the user typed and what the model wrote back, which is free text
that can contain anything the user decided to put in it, including data no property schema
anticipated. That makes it a privacy decision before it is a telemetry decision, and it is why the
spec extends privacy rather than forking an observability skill: traces are a nested run topology
that the flat Event Inventory cannot serve, so the Event Inventory is deliberately left untouched.

The subsection fixes six decisions that otherwise get deferred until after the data is already being
collected: what is captured, what redaction runs before storage and whether it runs before the trace
leaves the process, who can read a trace and whether that read is logged, retention and what deletes
it, the sampling fraction and how the sample is chosen, and whether users can decline. It also
records that a uniform sample is the wrong instrument for finding rare failures, so traces kept for
diagnosing bad output should oversample the cases a check already flagged.

Minor rather than patch: the subsection asks for decisions the skill previously did not request, and
adds an optional block to the artifact, which is additive behavior under the versioning tie-breaker.

### Changes
- Added the conditional `Model Trace Capture` subsection under `PII & Privacy Considerations`.
- Instruction step 6 gained the conditional trace-capture guidance.
- Quality Checklist gained one conditional item.
- Event Inventory, User Properties, Implementation Notes, and Testing Checklist unchanged.

## 2.2.0 (2026-07-04)

Released in [v2.30.0](../../site/src/content/docs/releases/Release_v2.30.0.md). Effort: M-35 (trust repair sweep).

The 2026-07-04 deep audit named the catalog's ~8 weakest early-cohort descriptions for rewrite (Batch 5). This skill and its companion `measure-dashboard-requirements` were picked as a pair: both original descriptions used the near-identical template with no cross-reference between them, despite each already disclaiming the other in its own "When NOT to Use" section and trigger fixtures.

### Changes
- Rewrote the frontmatter description (Batch 5, WS-T8e) to frame the spec as a product-engineering contract and surface the `measure-dashboard-requirements` deflection already present in the body.

No change to the Instructions, Output Format, or Quality Checklist.

## 2.1.0 (2026-06-10)

Quality-convergence minor (F-12 Batch 4): added a "When NOT to Use" section with boundary pointers to neighboring skills, and the Output Format now enumerates the template sections a complete artifact fills. No template or example changes.

## 2.0.0 (2026-01-26)

Baseline row for the prior published version; see git history for its changes.
