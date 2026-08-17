# develop-adr - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 2.2.0 | 2026-08-16 | v2.33.0 | C-1 | minor | Conditional `Model Choice` subsection inside Consequences: build vs buy vs prompt, what is coupled to the choice, operating cost accepted, reversal cost, and the observation that would reopen the ADR. The six Nygard headings are untouched. |
| 2.1.0 | 2026-06-10 | v2.26.0 | F-12-batch-2 | minor | Quality convergence: When NOT to Use + output-contract enumeration (F-12 Batch 2) |
| 2.0.0 | 2026-01-26 | - | - | baseline | Prior published version |

## 2.2.0 (2026-08-16)

AI-product family Track 1 (effort C-1), the `develop-adr` increment ruled in
[the C-3 spec](../../docs/internal/release-plans/v2.32.0/spec_c3-ai-product-family.md) section 2.2.
Adds a conditional `Model Choice` subsection **inside** `Consequences`, alongside Positive, Negative
and Neutral. The six Nygard headings (Status, Context, Decision, Consequences, Alternatives
Considered, References) are untouched, so the Output Format enumeration is unchanged and an ADR about
anything other than a model reads exactly as before.

**Why it belongs under Consequences and not under Decision.** A model choice differs from an ordinary
dependency choice in one way that matters for a record meant to be read years later: the thing you
evaluated will be replaced, often inside the life of the decision. Which model won is the least
durable part of the record. What the choice costs to undo is the part a future reader actually needs,
and that is a consequence. The subsection therefore asks for build-versus-buy-versus-prompt and what
ruled the others out, what is now coupled to the choice (prompts, evaluation sets, output schemas,
latency budgets), the operating cost accepted and the volume at which it stops being acceptable, the
real reversal cost given that coupling, and the observation that would reopen the ADR, stated as a
trigger rather than a review date.

**Timing.** This increment was deliberately held until after the C-2 weak-model re-test was run and
recorded ([`output-eval-weak-model-20260816.md`](../../docs/internal/release-plans/v2.33.0/records/output-eval-weak-model-20260816.md)),
because `develop-adr` is one of that experiment's four eval pairs and editing its body mid-run would
have confounded the generation model with a body change, exactly as had already happened to
`foundation-okr-writer`. The re-test returned VOID, and its pre-registered consequence is that
increments must be structure-bearing rather than prose exhortation. This one is a five-row table a
reader fills.

Minor rather than patch: the subsection asks for decisions the skill did not previously request and
adds an optional block to the artifact, which is additive behavior under the versioning tie-breaker.

### Changes
- Added the conditional `Model Choice` subsection under `Consequences`.
- Instructions gained a sixth, conditional step.
- Quality Checklist gained one conditional item.
- Status, Context, Decision, Alternatives Considered and References unchanged; no change to the
  Output Format section enumeration.

## 2.1.0 (2026-06-10)

Quality-convergence minor (F-12 Batch 2): added a "When NOT to Use" section with boundary pointers to neighboring skills, and the Output Format now enumerates the template sections a complete artifact fills. No template or example changes.

## 2.0.0 (2026-01-26)

Baseline row for the prior published version; see git history for its changes.
