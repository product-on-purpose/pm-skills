# foundation-build-risk-review - Version History

| Version | Date | Release | Effort | Type | Summary |
|---------|------|---------|--------|------|---------|
| 1.1.0 | 2026-08-16 | v2.33.0 | C-14 | minor | Verdict routing gains a not-installed fallback: name the gap and inline the minimum for each routed skill, so a review never ships a next step the user cannot execute (#253). |
| 1.0.1 | 2026-07-04 | v2.30.0 | M-35 | patch | Heading normalized to the skeleton-canon spelling: "When to use" to "When to Use", "When NOT to use" to "When NOT to Use", bare "Output" to "Output Format", "Quality checklist" to "Quality Checklist". |
| 1.0.0 | 2026-06-22 | v2.29.0 | F-56 | baseline | Prior published version: fast pre-build risk review naming the single assumption most likely to make a product idea or scope change fail, with a verdict and a no-code validation step. |

## 1.1.0 (2026-08-16)

Field-reported ([#253](https://github.com/product-on-purpose/pm-skills/issues/253)). This skill was the reporter's exact reproduction: they installed a subset of the library, ran the review to a "Validate first" verdict, and the artifact shipped mandating `define-hypothesis` then `measure-experiment-design`, neither of which existed in their environment.

The library is routinely installed in part rather than whole, and the install CLI copies only the skill directories it is asked for, so a routed skill may simply not be there. Until now the routing table assumed the full catalog.

Verdict routing now carries a not-installed fallback: when the routed skill cannot be confirmed available, say so plainly and inline the minimum version of its output, with a per-skill table giving that minimum (a hypothesis in believe/for/will/as-measured-by form, a three-line experiment sketch, a two-sentence problem frame, the three riskiest lean-canvas boxes, or a single ranked list). The governing line is that a verdict whose next step the user cannot execute is not a finished review.

Minor rather than patch: the skill now handles a scenario it previously could not, and the output gains an optional section, which is additive under the versioning tie-breaker.

## 1.0.1 (2026-07-04)

Released in [v2.30.0](../../site/src/content/docs/releases/Release_v2.30.0.md). Effort: M-35 (trust repair sweep).

Heading-normalization sweep (WS-T8b): the 2026-07-04 deep audit named this skill's own case-drifted headings ("When to use", "When NOT to use", both lowercase) as the informal fourth dialect that emerged from mirroring an already-drifted exemplar, plus a bare "Output" (one of six drifted output-section heading names catalog-wide) and a lowercase "Quality checklist". All four renamed to the canon spelling from the new Skeleton Canon doc (see `utility-pm-skill-builder` and `utility-pm-skill-validate`). No change to the review contract, verdict logic, or routing. This skill's broader heading set (`Modes`, `The review (the contract)`, `Verdict routing`) does not cleanly match one of the three sanctioned dialects; a full skeleton retrofit is out of scope for v2.30.0 and deferred to the v2.31.0 full-catalog normalization pass.

## 1.0.0 (2026-06-22)

Released in [v2.29.0](../../site/src/content/docs/releases/Release_v2.29.0.md). Effort: F-56 (#149).

Initial release: a fast, pre-commitment gate for product decisions. Given an idea, a feature request, or a scope change, returns a Build Risk Review - the single biggest risk, the evidence behind it, a verdict, and a concrete no-code validation step - then routes to the skill that does the next piece of work.

### Contract established
- Two modes: pre-build (a new idea or MVP) and feature-change (a request or scope expansion on an in-progress product)
- Exactly one of four verdicts: Build small / Validate first / Pivot first / Don't build yet
- Output: a single Build Risk Review artifact built from `references/TEMPLATE.md`
