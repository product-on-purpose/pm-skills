# Example: Q3 Product Update Deck

This example walks through creating a 9-slide product update deck for an engineering all-hands meeting, demonstrating the spec-writing workflow from content brief to JSON output.

## Content Brief

The product team needs a deck for the Q3 engineering all-hands covering:
- Customer satisfaction hit a record high (94%)
- Three major features shipped (real-time analytics dashboard, API rate limiting, bulk data import)
- Revenue grew 18% quarter-over-quarter
- Roadmap preview for Q4 (3 milestones)
- Key insight: teams using the analytics dashboard have 2.4x faster incident response times

## Deck Planning

### Slide Type Selection

| # | Content | Type | Variant | Rationale |
|---|---------|------|---------|-----------|
| 1 | Opening | title_dark | dark | Bold external opener |
| 2 | Section: Metrics | section | dark | Topic transition |
| 3 | CSAT record | stat | light | Single metric spotlight |
| 4 | Revenue comparison | dual_stat | dark | Two numbers gain from comparison |
| 5 | Features shipped | bullets | light | 3-6 point list |
| 6 | Feature details | three_card | dark | Three parallel concepts |
| 7 | Key insight | highlight | light | Executive takeaway |
| 8 | Q4 roadmap | timeline | light | Chronological milestones |
| 9 | Close | closing | dark | Standard ending |

### Variant Check

Dark-light alternation: D, D, L, D, L, D, L, L, D -- slight imbalance at slides 7-8 (both light) but acceptable because highlight and timeline are visually distinct types.

## JSON Deck Specification

```json
{
  "title": "Q3 Product Update",
  "author": "Product Team",
  "footerText": "Internal -- Engineering All-Hands",
  "outputFileName": "q3-product-update.pptx",
  "slides": [
    {
      "type": "title_dark",
      "title": "Q3 Product\nUpdate",
      "subtitle": "Engineering All-Hands -- October 2026",
      "notes": "Welcome everyone. Quick overview of what shipped and what's ahead."
    },
    {
      "type": "section",
      "title": "Key\nMetrics",
      "variant": "dark",
      "notes": "Starting with our headline performance numbers."
    },
    {
      "type": "stat",
      "stat": "94%",
      "label": "Customer satisfaction -- highest score this year",
      "accentColor": "secondary",
      "variant": "light",
      "notes": "Up from 88% in Q2. Primary driver: faster support response times from the new dashboard."
    },
    {
      "type": "dual_stat",
      "title": "Revenue Growth",
      "leftStat": "$3.2M",
      "leftLabel": "Q2 recurring revenue",
      "leftColor": "muted",
      "rightStat": "$3.8M",
      "rightLabel": "Q3 recurring revenue",
      "rightColor": "accent",
      "variant": "dark",
      "notes": "18% QoQ growth. Bulk import feature drove 40% of new contract value."
    },
    {
      "type": "bullets",
      "title": "What Shipped in Q3",
      "bullets": [
        "Real-time analytics dashboard with customizable widgets",
        "API rate limiting with per-client quotas and alerting",
        "Bulk data import supporting CSV, JSON, and XML formats",
        "SSO integration for enterprise customers"
      ],
      "variant": "light",
      "notes": "Four major features. Each had full rollout with zero critical incidents."
    },
    {
      "type": "three_card",
      "title": "Feature Highlights",
      "cards": [
        {
          "title": "Analytics Dashboard",
          "bullets": ["Real-time metrics", "Custom widgets", "Export to PDF"],
          "color": "accent"
        },
        {
          "title": "API Rate Limiting",
          "bullets": ["Per-client quotas", "Automatic alerting", "Usage dashboard"],
          "color": "secondary"
        },
        {
          "title": "Bulk Import",
          "bullets": ["CSV, JSON, XML", "Validation preview", "Async processing"],
          "color": "tertiary"
        }
      ],
      "variant": "dark",
      "notes": "Deeper dive on the three headline features."
    },
    {
      "type": "highlight",
      "title": "Key Insight",
      "highlight": "Teams using the analytics dashboard resolve incidents 2.4x faster than teams using manual monitoring.",
      "context": "Based on analysis of 180 incidents across 45 teams during August-September. The effect is strongest for teams with 3+ custom dashboard widgets configured.",
      "accentColor": "accent",
      "variant": "light",
      "notes": "This is our strongest product-market signal this quarter."
    },
    {
      "type": "timeline",
      "title": "Q4 Roadmap",
      "milestones": [
        { "label": "OCT", "description": "Advanced filtering and saved views" },
        { "label": "NOV", "description": "Webhook integrations and event streaming" },
        { "label": "DEC", "description": "SOC 2 Type II certification complete" },
        { "label": "JAN", "description": "Public API v2 general availability" }
      ],
      "variant": "light",
      "notes": "Four milestones across the quarter. SOC 2 is the compliance gate for enterprise expansion."
    },
    {
      "type": "closing",
      "notes": "Thank you. Questions?"
    }
  ]
}
```

## What This Deck Demonstrates

- **Line break control:** Title slide uses `\n` to split "Q3 Product" and "Update" onto separate lines for deliberate text wrapping
- **Section dividers:** The section slide creates a clear visual break before the metrics block, signaling a topic change to the audience
- **Single vs comparative metrics:** `stat` spotlights one number (CSAT score) while `dual_stat` places two numbers side-by-side for direct comparison (Q2 vs Q3 revenue)
- **Parallel structure:** `three_card` gives equal visual weight to three shipped features, avoiding the implicit ranking that a bullet list creates
- **Highlight restraint:** `highlight` is used exactly once for the strongest finding -- overuse dilutes its impact
- **Chronological milestones:** `timeline` presents Q4 roadmap items in calendar order, making sequencing and dependencies visible
- **Speaker notes on every slide:** Notes provide presenter context without cluttering the slide surface -- especially useful for stakeholder decks that get forwarded without the presenter
- **Dark/light rhythm:** Variants alternate to maintain visual energy; the consecutive light slides (7-8) work because highlight and timeline have distinct visual structures
- **Character-limit compliance:** All content respects the limits defined in slide-types.md -- titles stay concise, bullets stay scannable, and the highlight sentence remains under the maximum length
