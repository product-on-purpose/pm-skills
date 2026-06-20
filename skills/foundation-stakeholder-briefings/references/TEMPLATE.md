---
artifact_type: stakeholder-briefings
version: 1.0
generated_at: {{ISO 8601 timestamp}}
generated_by_skill: foundation-stakeholder-briefings

title: "{{Short title for the work being briefed}}"
source_type: {{spec | discovery | research | gtm | strategy | experiment | incident | compliance | raw}}
source_ref: {{filename or short description of the source artifact}}

audiences:
  - {{executive | board | engineering | ux | pmm | sales | cs | legal | data | custom:<name>}}

input_quality: {{high | medium | low}}
status: draft
---

# Stakeholder briefings: {{title}}

## Master document

> [The canonical, audience-neutral synthesis. Number every load-bearing claim M1, M2, ... Briefings reference these IDs. No audience-specific spin here.]

**What and why**

- {{M1: one-line claim}}
- {{M2: one-line claim}}

**Decisions**

- {{M3: decision}}

**Status**

- {{M4: where the work stands}}

**Risks and open questions**

- {{M5: risk or open question}}

**Asks**

- {{M6: what is needed, from whom}}

**Timeline**

- {{M7: key dates / sequence}}

---

## Briefings

> [One self-contained block per chosen audience. Each block: Draws on (master IDs), Primary ask (exactly one), headline, what-this-means-for-you, body. Every load-bearing line traces to a master claim. Copy a block out as-is to send it.]

--- BEGIN: {{lens, e.g. Executive}} ---

**Draws on:** {{M1, M3, M6}}
**Primary ask:** {{the single decision or action this audience owns}}

**{{Headline: one skimmable line for this audience}}**

**What this means for {{audience}}**

{{2-5 sentences re-pitched to this lens: the decision they own, what they care about, their vocabulary, at the right length and tone.}}

{{Body bullets as needed, all tracing to master claim IDs.}}

--- END ---

--- BEGIN: {{next lens}} ---

**Draws on:** {{IDs}}
**Primary ask:** {{single ask}}

**{{Headline}}**

**What this means for {{audience}}**

{{...}}

--- END ---

---

> [End of shareable briefings. Everything below is INTERNAL. Do not copy into an outgoing briefing.]

## Translations applied (internal)

> [Include when any technical-to-business or inferred re-pitch was made, so the user can verify it lands.]

- "{{technical term}}" -> "{{plain language}}" *(audience: {{lens}})*
- "{{acronym}}" -> "{{expansion}}"

**Flagged but kept** (may need review):

- "{{term}}" - {{why it was kept and where it might not land}}

## Sources and References

- Source artifact: {{source_ref}}
- {{Any external references cited in the master, public links only}}
- **Generated:** {{timestamp}} | **Skill version:** 1.0.0 | **Audiences:** {{list}} | **Input quality:** {{high|medium|low}} ({{rationale}})
- **Invariant self-check:** {{N briefings, all Draws-on IDs resolve; one Primary ask each; neutral-master reviewed}}
