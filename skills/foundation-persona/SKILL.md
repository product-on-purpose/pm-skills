---
name: foundation-persona
description: Generates an evidence-calibrated product or marketing persona using the canonical v2.5 output contract. Use when shaping artifact perspective, stress-testing decisions, or framing product and GTM strategy.
classification: foundation
version: "2.5.0"
updated: 2026-03-02
license: Apache-2.0
metadata:
  category: research
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Persona Builder

This skill produces decision-usable personas from one canonical template pack.

## Supported Modes

- `product`
- `marketing`
- `buyer` as input alias for `marketing` (output remains labeled `Marketing`)

Generated `agent` mode is out of scope for `v2.5.0`.
If the user asks for `agent`, ask them to choose `product` or `marketing`.

## When to Use

- Before drafting PM or GTM artifacts that need a clear persona viewpoint
- When teams disagree on priorities and need behavior-grounded tradeoff framing
- When assumptions and confidence levels must be explicit for decision review
- When tailoring downstream work (PRD, stories, launch, messaging, enablement) to a specific user or buyer profile

## Instructions

When asked to generate a persona, follow these steps:

1. **Resolve mode and intent**
   Determine whether the request is `product` or `marketing` (`buyer` alias allowed).
   If mode is omitted, ask for mode selection.
   If execution must continue without reply, default to `product` and state that fallback explicitly.

2. **Collect context and evidence**
   Use user-provided context first (goals, audience, domain, constraints, sources).
   If evidence is thin, continue generation but mark gaps and calibrate confidence.

3. **Select exactly one template**
   Use `references/TEMPLATE.md` and choose exactly one of:
   - `Product Persona Template`
   - `Marketing Persona Template`

4. **Generate a complete artifact**
   Fill the selected template end-to-end:
   - header + one-sentence core-reality statement
   - metadata table
   - `Persona Card`
   - sections `1` through `11`
   - `Evidence & Confidence`

5. **Enforce mode boundaries**
   - Product mode: focus on workflow behavior, decision patterns, friction, quality bar, and product tradeoffs.
   - Marketing mode: focus on buying triggers, evaluation criteria, committee dynamics, objections, messaging, and GTM implications.

6. **Apply evidence and confidence policy**
   - Use `High|Medium|Low` confidence with rationale.
   - Distinguish validated evidence from assumptions.
   - State open questions and governance follow-up.

7. **Finalize for direct use**
   Remove template guidance blockquotes (`>` notes) from the final output.
   Ensure narrative entries are concrete and decision-changing, not placeholder bullets.

## Output Contract (v2.5.0)

- Use one mode only (`Product` or `Marketing`) per output.
- Keep section numbering and headings from the selected template.
- Preserve the evidence table plus validated/assumed/open-questions/governance blocks.

## Quality Checklist

Before finalizing, verify:

- [ ] Exactly one mode is used and clearly labeled
- [ ] `buyer` inputs are normalized to `Marketing`
- [ ] Header, core-reality statement, metadata table, and `Persona Card` are present
- [ ] All `1` through `11` sections from the selected template are present and complete
- [ ] Includes/not-valid boundaries are explicit in the metadata and narrative
- [ ] Evidence table is populated with concrete sources
- [ ] Confidence is `High`, `Medium`, or `Low` with rationale
- [ ] `Validated`, `Assumed`, `Open questions`, and `Governance` blocks are present
- [ ] Template authoring notes (`>` guidance lines) are removed from the completed output

## Examples

See `references/EXAMPLE.md` for a completed sample output.
