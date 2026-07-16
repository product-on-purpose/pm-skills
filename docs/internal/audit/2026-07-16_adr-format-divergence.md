# Audit: ADR format divergence (`develop-adr` vs the org's MADR v4 convention)

**Date:** 2026-07-16
**Scope:** `skills/develop-adr/references/TEMPLATE.md`, `docs/internal/audit/README.md` (future-directions section), and the org-wide decision-record convention.
**Origin:** External. Surfaced while building the `adr` bundle in [`product-lifecycle-templates`](https://github.com/product-on-purpose/product-lifecycle-templates), where it is tracked as finding **EC-1 (ADR format divergence)** in that repo's `STATE.md`.
**Status:** Reported, not patched. This audit recommends; it does not change the skill.

---

## 1. Why this is written down rather than fixed

The finding originates in a sibling repo. A template library that quietly edits its neighbors is
worse than one that reports, so this is filed where the subject lives and left for the pm-skills
maintainer to decide. Two of the three sub-findings are genuinely contested (section 5); one is not
(section 6).

## 2. The finding, stated plainly

`develop-adr` emits **Nygard-format** ADRs. The org's project scaffolder, `jp-init-project`, mandates
**MADR v4** decision records at `docs/internal/decisions/`. An agent that invokes `develop-adr` inside
an org repo therefore produces a record whose shape does not match the repo it lands in.

## 3. Evidence (each claim verified against the file, not asserted)

| # | Claim | Verified at |
|---|---|---|
| 1 | The skill's template is Nygard-shaped: `## Status`, `## Context`, `## Decision`, `## Consequences` (Positive / Negative / Neutral), `## Alternatives Considered`, `## References`. | `skills/develop-adr/references/TEMPLATE.md` |
| 2 | The org mandates MADR v4: "MADR v4 decision records". | `jp-init-project/SKILL.md`, line 8 |
| 3 | The org fixes the location: "Decisions live at `docs/internal/decisions/` - never at `docs/decisions/`, never at per-agent `DECISIONS.md`". | `jp-init-project/SKILL.md`, line 98 |
| 4 | A sibling org repo follows it: "following the [MADR v4] standard". | `agent-config-toolkit/docs/internal/decisions/README.md`, line 3 |
| 5 | **This repo's own audit README also plans Nygard**, for a folder that does not exist yet: "A future `docs/internal/decisions/` folder is intended to hold Architecture Decision Records (e.g., Nygard format ADRs)... **Status:** reserved space; design pending." | `docs/internal/audit/README.md`, "Future directions" |
| 6 | `docs/internal/decisions/` does **not** exist in pm-skills today. | `ls docs/internal/decisions/` returns nothing |

**What claim 5 adds.** The divergence is in two places, not one: the skill's output template *and*
this repo's documented intent for its own future decisions folder. The second is the cheaper and less
contested of the two (section 6).

**What claim 6 adds.** There is nothing to migrate. Whatever is decided costs less today than it will
after the first ADR is written into that folder.

## 4. What is actually harmed

Not much, yet, and it is worth being precise rather than alarming:

- No pm-skills ADR is currently mis-formatted, because pm-skills has no ADRs (claim 6).
- The live harm is narrow: an agent running `develop-adr` **inside an org repo scaffolded by
  `jp-init-project`** writes a Nygard record into a `docs/internal/decisions/` folder whose own README
  says MADR v4. The record is then inconsistent with its neighbors, and a human has to reconcile it.
- The latent harm is the audit README (claim 5): it will guide whoever eventually creates the folder
  toward the format the org forbids.

## 5. The contested part: the skill's output format

**This is a real decision, not an oversight, which is why this audit does not just fix it.**

`develop-adr` is a **public product**. Nygard is the most widely recognized ADR format and a defensible
default for a general-purpose skill used by people outside this org. The MADR v4 mandate governs *the
org's own internal decision records*. "The skill must emit MADR because the org uses MADR" conflates a
product decision with a house-style decision, and it is not obviously correct.

Options, with the trade-off named rather than hidden:

| Option | What it costs | What it buys | Cost to external users |
|---|---|---|---|
| **A. Convert the skill to MADR v4** | Template, `EXAMPLE.md`, 3 `library/skill-output-samples/`, 3 `site/` samples, 2 eval output-scenarios, `SKILL.md`, `HISTORY.md`. Evals may need re-baselining. | Org repos get conforming records by default. One format to maintain. | **Highest.** Silently changes the output shape for everyone who already relies on Nygard. |
| **B. Keep Nygard as default; add a MADR mode** | Moderate: a second reference template plus a format switch in `SKILL.md`, and eval coverage for both. | Serves both audiences honestly. The org gets conformance by opting in. | None. |
| **C. Keep Nygard; document the divergence** | Near zero. | Nothing breaks. The skill stays predictable. | None. |
| **D. Do nothing** | Zero. | Nothing. | None, but the latent harm in claim 5 stays. |

**Recommendation: B**, and it is a weak recommendation offered for argument, not a verdict. B is the
only option that treats the skill's external users and the org's internal convention as both
legitimate, which is what the evidence supports. A is the tempting option and is the one most likely
to be regretted, because it changes a public artifact's output to satisfy a private convention.

## 6. The uncontested part: this repo's own future decisions folder

Independent of the skill decision, **claim 5 should be corrected regardless of which option above is
chosen.** The reasoning does not depend on the contested question:

- pm-skills is an org repo. The org's mandate for a repo's own `docs/internal/decisions/` is MADR v4.
- The folder does not exist yet, so the correction costs one line of documentation and zero migration.
- Leaving it as-is guarantees that whoever creates the folder follows the wrong convention, and pays
  the migration cost then instead of nothing now.

**Suggested change:** in `docs/internal/audit/README.md`, "Future directions > Architecture Decision
Records", replace "e.g., Nygard format ADRs" with MADR v4 and cite `jp-init-project`. This says
nothing about what `develop-adr` emits; it only fixes what *this repo* plans for *its own* records.

One adjacent note, flagged and deliberately not pursued: the same section floats
`skills/<skill-name>/DECISIONS.md` as a possible per-skill decision-log design. `jp-init-project` line
98 forbids "per-agent `DECISIONS.md`". Whether a *per-skill* log is the same thing the mandate means
by *per-agent* is a genuine ambiguity, not a defect, and it is not resolved here.

## 7. What this audit does not claim

- It does not claim pm-skills is broken. It is not; it has no ADRs to be wrong.
- It does not claim the skill is wrong to ship Nygard. Section 5 argues the opposite is arguable.
- It does not claim org-wide MADR adoption is complete. It is not: `thinking-framework-skills` has no
  tracked `docs/internal/decisions/` and no MADR reference at all (checked 2026-07-16). Only
  `agent-config-toolkit` and `product-lifecycle-templates` were verified to follow it. The mandate is
  real; the adoption is partial.

## 8. Suggested disposition

1. **Cheap and uncontested:** correct the audit README's future-directions line (section 6).
2. **Needs a decision:** pick A / B / C / D for the skill (section 5). This is RFC-shaped work: a
   proposal circulated before a decision, with real alternatives. It is not an ADR until it is decided.
3. **Optional:** once decided, record it. If pm-skills adopts MADR v4 for its own records, that
   decision is itself the natural first entry in `docs/internal/decisions/`.

## 9. Provenance

Reported by the maintainer of `product-lifecycle-templates`, where this is finding EC-1 (ADR format
divergence). Every claim in section 3 was checked against the cited file on 2026-07-16 rather than
carried over from the originating repo's summary of it. That re-check is what surfaced claim 5 (the
audit README's Nygard plan), which the originating finding did not mention, and what corrected the
adoption claim in section 7.
