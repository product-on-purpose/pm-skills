---
name: utility-slideshow-creator
description: Generates professional presentations from a JSON deck specification using 18 slide types with dark/light variants, content-to-layout decision logic, and calibrated character limits. Ships with a default professional theme and supports custom themes via utility-slideshow-themer.
version: "1.0.0"
updated: 2026-04-08
license: Apache-2.0
classification: utility
metadata:
  category: communication
  frameworks:
    - pptxgenjs
  author: product-on-purpose
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

# Slideshow Creator

Generate professional presentations (.pptx and .pdf) from a JSON deck specification. Zero design decisions at generation time — Claude selects slide types and fills content slots; all visual properties are pre-decided by the theme.

## When to Use

- Creating slide decks for stakeholder updates, product reviews, team presentations
- Generating professional .pptx files from content briefs
- Producing consistent presentations without manual formatting
- Exporting presentations to PDF for sharing or archiving

## When NOT to Use

- Creating complex data visualizations (use dedicated charting tools)
- Building interactive web presentations (this produces .pptx, not HTML)
- Editing existing PowerPoint files (this creates new decks from scratch)

## How It Works

**Two-phase architecture:**

1. **Spec phase (Claude)** — Read the content brief, select slide types using decision logic, write a JSON deck specification. Content slots have character limits calibrated to prevent overflow. This is the only phase that costs tokens.
2. **Generation phase (Local script)** — Run `node scripts/generate-deck.js deck-spec.json` to produce .pptx. Optionally run `node scripts/export-pdf.mjs deck-spec.json` for PDF. Deterministic rendering, zero token cost.

Both outputs come from the same JSON spec, so .pptx and .pdf always match.

## 18 Slide Types

| # | Type Key | Purpose | Default Variant |
|---|----------|---------|-----------------|
| 1 | `title_dark` | Opening slide (bold) | dark only |
| 2 | `title_light` | Opening slide (internal/lighter) | light only |
| 3 | `section` | Section divider | dark |
| 4 | `content` | Paragraph explanation | light |
| 5 | `bullets` | 3-6 key points | light |
| 6 | `two_col` | Side-by-side comparison | light |
| 7 | `stat` | Single key metric | light |
| 8 | `dual_stat` | Two metrics compared | dark |
| 9 | `quote` | Testimonial or pull quote | dark |
| 10 | `three_card` | Three parallel concepts | dark |
| 11 | `four_grid` | Four concepts in 2x2 grid | dark |
| 12 | `timeline` | Dates or milestones (max 6) | light |
| 13 | `process_flow` | Sequential workflow (max 5) | light |
| 14 | `agenda` | Meeting agenda (max 7) | light |
| 15 | `highlight` | Key finding or executive summary | light |
| 16 | `table` | Tabular data | light |
| 17 | `icon_rows` | Feature list with markers (max 4) | light |
| 18 | `closing` | End slide | dark only |

Full slot definitions and character limits: `references/slide-types.md`

## Decision Logic (Quick Reference)

| Content Pattern | Use |
|---|---|
| Opening the deck (bold) | `title_dark` |
| Opening the deck (internal) | `title_light` |
| Transitioning between topics | `section` |
| Paragraph explanation | `content` |
| List of 3-6 points | `bullets` |
| Side-by-side comparison | `two_col` |
| Single key metric | `stat` |
| Two metrics compared | `dual_stat` |
| Testimonial or pull quote | `quote` |
| Three parallel concepts | `three_card` |
| Four concepts in a grid | `four_grid` |
| Dates or milestones | `timeline` |
| Sequential workflow | `process_flow` |
| Meeting agenda | `agenda` |
| Key finding or summary | `highlight` |
| Tabular data | `table` |
| Feature list with markers | `icon_rows` |
| Ending the deck | `closing` |

Full decision logic with variant strategy: `references/decision-logic.md`

## JSON Deck Spec Format

```json
{
  "title": "Q3 Product Update",
  "author": "Product Team",
  "footerText": "Internal — Q3 Review",
  "slides": [
    { "type": "title_dark", "title": "Q3 Product Update", "subtitle": "October 2026" },
    { "type": "stat", "stat": "94%", "label": "Customer satisfaction score", "accentColor": "secondary" },
    { "type": "bullets", "title": "What Shipped", "bullets": ["Feature A", "Feature B", "Feature C"] },
    { "type": "closing" }
  ]
}
```

Colors accept theme token names (`"accent"`, `"secondary"`, `"tertiary"`, `"warm"`) or 6-character hex strings (`"2563EB"`).

Full schema and workflow: `references/TEMPLATE.md` and `references/platform-rules.md`

## Instructions

1. **Read the content brief** — Understand topic, audience, length, specific requirements
2. **Plan the deck** — Select slide types using the decision logic table. Assign dark/light variants for visual rhythm (alternate to avoid monotony).
3. **Write the JSON deck specification** — Fill content slots, respecting character limits from `references/slide-types.md`
4. **Run the generation script** — `node scripts/generate-deck.js deck-spec.json`
5. **Optionally export PDF** — `node scripts/export-pdf.mjs deck-spec.json output.pdf`
6. **Report the output** — Tell the user where the file(s) are

## Output Contract

- **Planning artifact**: JSON deck specification (the file Claude writes)
- **Final output**: .pptx file (+ optional .pdf), generated locally from the spec
- **Quality gate**: All items in the quality checklist pass

## Quality Checklist

- [ ] Every slide has a valid type key (one of the 18 defined types)
- [ ] All content slots respect character limits from `references/slide-types.md`
- [ ] Dark/light variants alternate for visual rhythm (no 3+ consecutive same-variant slides)
- [ ] Deck has a title slide (first) and a closing slide (last)
- [ ] Section dividers separate distinct topics in decks > 6 slides
- [ ] Speaker notes included for key slides (stats, highlights, transitions)
- [ ] JSON is valid (no trailing commas, proper quoting, correct nesting)
- [ ] Color values are valid theme tokens or 6-character hex strings (no `#` prefix)

## References

| File | Purpose |
|------|---------|
| `references/TEMPLATE.md` | JSON deck specification template with field documentation |
| `references/EXAMPLE.md` | Worked example: Q3 Product Update deck (9 slides) |
| `references/slide-types.md` | All 18 slide types: content slots, character limits, variants |
| `references/decision-logic.md` | Content pattern → slide type mapping, variant strategy, deck sizing |
| `references/platform-rules.md` | pptxgenjs requirements, Google Slides compatibility, output format |
