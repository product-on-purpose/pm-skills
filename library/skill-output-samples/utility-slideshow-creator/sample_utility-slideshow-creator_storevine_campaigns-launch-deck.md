<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
artifact: slideshow-deck-spec
version: "1.0"
repo_version: "2.10.0"
skill_version: "1.0.0"
created: 2026-04-11
status: sample
thread: storevine
context: Storevine B2B ecommerce platform — stakeholder presentation for Campaigns feature launch
---

## Scenario

Storevine's growth PM is presenting the Campaigns feature to leadership and cross-functional partners at the quarterly product review. The deck needs to cover why Campaigns matters, what shipped, early adoption metrics, and the Q3 roadmap for Campaigns v2. The PM used the slideshow creator skill to generate a JSON deck specification for an 8-slide presentation.

---

## Prompt

```
/slideshow-creator

Create a stakeholder presentation for Storevine's Campaigns feature launch.

Context:
- Campaigns lets B2B merchants send branded marketing emails to their customer segments
- Shipped to 100% of merchants on 2026-03-15
- Early metrics: 340 merchants activated in first 2 weeks, 12% avg open rate, 2.8% click-through rate
- Key win: merchants who use Campaigns have 22% higher repeat purchase rate vs non-users
- Q3 roadmap: A/B testing, advanced segmentation, automated drip sequences
- Audience: VP Product, VP Engineering, Head of Merchant Success, Head of Marketing
```

---

## Output

## JSON Deck Specification

```json
{
  "title": "Campaigns Launch Review",
  "author": "Storevine Product Team",
  "footerText": "Internal -- Q2 Product Review",
  "outputFileName": "storevine-campaigns-launch-review.pptx",
  "slides": [
    {
      "type": "title_dark",
      "title": "Campaigns\nLaunch Review",
      "subtitle": "Q2 Product Review -- April 2026",
      "notes": "Opening for quarterly product review. Campaigns shipped March 15, this is our first full readout."
    },
    {
      "type": "stat",
      "stat": "340",
      "label": "Merchants activated in the first two weeks",
      "accentColor": "accent",
      "variant": "light"
    },
    {
      "type": "dual_stat",
      "title": "Early Performance",
      "leftStat": "12%",
      "leftLabel": "Average open rate across all campaigns",
      "leftColor": "secondary",
      "rightStat": "2.8%",
      "rightLabel": "Average click-through rate",
      "rightColor": "accent",
      "variant": "dark"
    },
    {
      "type": "highlight",
      "title": "Key Insight",
      "highlight": "Merchants who use Campaigns have a 22% higher repeat purchase rate compared to merchants who do not.",
      "context": "Based on cohort analysis of 340 activated merchants vs. matched control group over 14 days post-activation. Early signal -- needs 90-day confirmation. [fictional]",
      "accentColor": "accent",
      "variant": "light",
      "notes": "This is the strongest product-market signal. Caveat: early data, self-selection bias not fully controlled."
    },
    {
      "type": "three_card",
      "title": "What Shipped",
      "cards": [
        {
          "title": "Template Builder",
          "bullets": ["Drag-and-drop editor", "Mobile preview", "Reusable templates"],
          "color": "accent"
        },
        {
          "title": "Segment Targeting",
          "bullets": ["Order history filters", "Tag-based segments", "CSV import"],
          "color": "secondary"
        },
        {
          "title": "Send & Track",
          "bullets": ["Scheduled delivery", "Open and click tracking", "Unsubscribe management"],
          "color": "tertiary"
        }
      ],
      "variant": "dark"
    },
    {
      "type": "timeline",
      "title": "Q3 Campaigns Roadmap",
      "milestones": [
        { "label": "JUL", "description": "A/B testing for subject lines and send times" },
        { "label": "AUG", "description": "Advanced segmentation with behavioral triggers" },
        { "label": "SEP", "description": "Automated drip sequences for onboarding flows" }
      ],
      "variant": "light"
    },
    {
      "type": "closing",
      "tagline": "Campaigns v1 shipped. Now let's make it smarter.",
      "notes": "Thank you. Open for questions."
    }
  ]
}
```
