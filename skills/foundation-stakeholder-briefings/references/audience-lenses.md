<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Audience lenses

Each lens is defined by the **one decision it owns**. That is the axis that keeps lenses distinct: if two briefings cannot be told apart by the decision they drive, they should merge. Nine lenses are first-class; a tenth Custom slot is inferred per request.

## The nine first-class lenses

| Lens | Decision it owns | Cares about | Jargon posture | Length / tone |
|---|---|---|---|---|
| **Executive / Leadership** | fund / kill / reprioritize this work | outcome, cost, risk, timing | translate all tech to business | short (~5 lines), asks up front, formal |
| **Board / Investors** | back the strategy / capital allocation | growth, the metrics that matter, capital efficiency, thesis fit | zero internal jargon | high-altitude, narrative |
| **Engineering** | feasibility, sequencing, technical risk | constraints, dependencies, edge cases | keep precise technical terms | as long as needed, concrete |
| **UX / Design** | design direction, user impact | flows, research implications, design debt | user-centered language | concrete, user-framed |
| **PMM (Product Marketing)** | positioning, messaging, launch narrative | differentiation, competitive framing, the story | market language | crisp, benefit-led |
| **Sales** | what is sellable now, the talk track | deal/pipeline impact, objections, timing | customer-facing language | punchy, objection-aware |
| **CS / Support** | customer change, enablement | migration, known issues, account talking points | plain customer language | practical, step-oriented |
| **Legal / Compliance / Privacy** | obligations, approvals, exposure | data handling, regulatory exposure, terms | precise legal terms | careful, risk-framed |
| **Data / Analytics / BI** | what to measure, how we know it worked | instrumentation, metric definitions, reporting impact, data quality | precise data terms | specific, metric-framed |

## "Not this lens when..."

- **Executive** - not when the decision is the company-level strategy/capital story (that is Board) or an operational build detail (that is Engineering).
- **Board / Investors** - not when the decision is operational or internal; only when it feeds the company thesis or capital allocation.
- **Engineering** - not when the decision is what to measure (that is Data) or user-flow design (that is UX).
- **UX / Design** - not when the decision is build feasibility (Engineering) or positioning (PMM).
- **PMM** - not when the decision is a specific deal/pipeline action (that is Sales) or demand-gen channel spend (Marketing/Growth, optional).
- **Sales** - not when there is no deal or pipeline action, only narrative (that is PMM).
- **CS / Support** - not when the audience is the customer themselves (that is release notes / a customer briefing), only the internal team that serves them.
- **Legal / Compliance / Privacy** - not when there is no regulatory, contractual, or data-handling surface.
- **Data / Analytics / BI** - not when there is no measurement decision; producing the measurement artifact itself is the `measure-*` skills, not this lens.

## Overlap matrix (the close pairs)

The lenses are not perfectly orthogonal. Disambiguate the known overlaps by the decision owned:

| Close pair | The split |
|---|---|
| **Executive vs Board** | Exec = internal fund/kill/reprioritize of *this* work. Board = the company-level strategy/capital narrative this work feeds. |
| **PMM vs Sales** | PMM = positioning/messaging/launch narrative. Sales = what is sellable *now* + the talk track + objection handling. |
| **Engineering vs Data/BI** | Eng = can we build it (feasibility/sequencing/risk). Data = what we will measure and how we know it worked (instrumentation/metric defs/reporting). |
| **Legal vs Executive** | Legal = obligations/approvals/exposure. Exec = the go/no-go that weighs that exposure. |

When two close lenses are both selected, each briefing must lead with its own decision; if they end up near-identical, one of them did not belong.

## Custom lenses (the "other" slot)

For an audience outside the nine (for example "Agency partners", "IT/Security admins", "Field enablement"), infer a lens by the same five attributes (decision owned, cares-about, jargon posture, length, tone) from the audience name and the source, then **show the inferred lens for confirmation** before generating the briefing. A Custom lens follows the same projection rule and block contract as a first-class lens.

## Optional, not first-class

- **Marketing / Growth** (demand gen, channels, campaigns) is intentionally not first-class: its primary decision overlaps PMM. Offer it only on explicit request, with the split "PMM owns the narrative; Marketing owns channel/demand execution."
