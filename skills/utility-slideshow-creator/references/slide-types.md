# Slide Types

All 18 slide types with content slots, character limits, and variant support. Each type maps to a JSON `type` key used in the deck spec.

## Variant Support

15 types support `variant: "dark"` and `variant: "light"`. 3 types are fixed: `title_dark` (dark only), `title_light` (light only), `closing` (dark only).

## Type Reference

### 1. title_dark
Opening slide with dark background and large white title text.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| title | string | ~50 | yes | Supports `\n` for line breaks |
| subtitle | string | ~80 | no | |

Variant: dark only.

### 2. title_light
Opening slide with light background for a softer tone.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| title | string | ~50 | yes | Supports `\n` for line breaks |
| subtitle | string | ~80 | no | |

Variant: light only. Use for internal decks or lighter tone.

### 3. section
Section divider between major topics. Dark uses two-tone split; light uses clean background.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| title | string | ~30 | yes | Supports `\n` for line breaks |
| variant | string | -- | no | |

Variant: "dark" (default) or "light".

### 4. content
Paragraph content slide for detailed explanations.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| title | string | ~60 | yes | |
| body | string | ~400 | yes | |
| variant | string | -- | no | |

Variant: "light" (default) or "dark".

### 5. bullets
Bullet list slide for key points.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| title | string | ~60 | yes | |
| bullets | string[] | ~120 each | yes | 3-6 items |
| variant | string | -- | no | |

Variant: "light" (default) or "dark".

### 6. two_col
Two-column comparison layout with vertical divider.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| title | string | ~60 | yes | |
| leftTitle | string | ~25 | yes | |
| leftItems | string[] | ~80 each | yes | |
| rightTitle | string | ~25 | yes | |
| rightItems | string[] | ~80 each | yes | |
| variant | string | -- | no | |

Variant: "light" (default) or "dark".

### 7. stat
Single statistic displayed on a colored card.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| stat | string | ~8 | yes | e.g. "87%", "$2.6M" |
| label | string | ~60 | yes | |
| accentColor | string | -- | no | Theme token or hex; default: secondary |
| variant | string | -- | no | |

Variant: "light" (default) or "dark".

### 8. dual_stat
Two stat cards side by side for comparative metrics.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| title | string | ~50 | no | |
| leftStat | string | ~8 | yes | |
| leftLabel | string | ~60 | yes | |
| leftColor | string | -- | no | Default: secondary |
| rightStat | string | ~8 | yes | |
| rightLabel | string | ~60 | yes | |
| rightColor | string | -- | no | Default: accent |
| variant | string | -- | no | |

Variant: "dark" (default) or "light".

Use instead of `stat` when two metrics gain meaning from comparison.

### 9. quote
Testimonial slide with decorative quote marks and attribution line.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| quote | string | ~200 | yes | |
| attribution | string | ~60 | no | |
| variant | string | -- | no | |

Variant: "dark" (default) or "light".

### 10. three_card
Three colored cards, each with a title and bullet list.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| title | string | ~50 | no | |
| cards | array | -- | yes | Exactly 3 items |
| cards[].title | string | ~25 | yes | |
| cards[].bullets | string[] | ~50 each | yes | |
| cards[].color | string | -- | no | Defaults: secondary, accent, tertiary |
| variant | string | -- | no | |

Variant: "dark" (default) or "light".

### 11. four_grid
2x2 grid of colored cards, each with a title and body paragraph.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| title | string | ~50 | no | |
| cards | array | -- | yes | Exactly 4 items |
| cards[].title | string | ~25 | yes | |
| cards[].body | string | ~120 | yes | |
| cards[].color | string | -- | no | Defaults: accent, secondary, tertiary, warm |
| variant | string | -- | no | |

Variant: "dark" (default) or "light".

### 12. timeline
Horizontal timeline with dots and labels for milestones.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| title | string | ~50 | yes | |
| milestones | array | -- | yes | Max 6 items |
| milestones[].label | string | ~10 | yes | e.g. "JAN", "Phase 1" |
| milestones[].description | string | ~80 | yes | |
| variant | string | -- | no | |

Variant: "light" (default) or "dark".

### 13. process_flow
Numbered circles connected by lines showing a sequential workflow.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| title | string | ~50 | yes | |
| steps | array | -- | yes | Max 5 items |
| steps[].label | string | ~15 | yes | |
| steps[].description | string | ~80 | yes | |
| variant | string | -- | no | |

Variant: "light" (default) or "dark".

Use instead of `timeline` when content is a workflow (action-oriented) rather than dates.

### 14. agenda
Meeting agenda with a timeline panel on the right side.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| title | string | ~30 | no | Default: "Agenda" |
| intro | string | ~200 | no | Left-side paragraph |
| items | array | -- | yes | Max 7 items |
| items[].time | string | ~10 | yes | e.g. "10:00 AM" |
| items[].topic | string | ~30 | yes | |
| variant | string | -- | no | |

Variant: "light" (default) or "dark".

### 15. highlight
Key takeaway displayed in a prominent colored box with supporting context below.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| title | string | ~50 | yes | |
| highlight | string | ~150 | yes | The key message in the box |
| context | string | ~300 | no | Supporting detail below |
| accentColor | string | -- | no | Default: accent |
| variant | string | -- | no | |

Variant: "light" (default) or "dark".

Use sparingly -- 1-2 per deck for impact.

### 16. table
Styled data table with colored header row.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| title | string | ~50 | yes | |
| headers | string[] | ~20 each | yes | |
| rows | string[][] | ~20 each cell | yes | |
| variant | string | -- | no | |

Variant: "light" (default) or "dark".

Best practice: 3-6 columns, 4-8 rows.

### 17. icon_rows
Feature rows with colored circle markers for visual distinction.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| title | string | ~50 | yes | |
| items | array | -- | yes | Max 4 items |
| items[].label | string | ~25 | yes | |
| items[].description | string | ~100 | yes | |
| items[].color | string | -- | no | Defaults: accent, secondary, tertiary, warm |
| variant | string | -- | no | |

Variant: "light" (default) or "dark".

Use instead of `bullets` when each point deserves its own visual identity.

### 18. closing
End slide with dark background.

| Slot | Type | Max Chars | Required | Notes |
|---|---|---|---|---|
| tagline | string | ~50 | no | Empty by default |
| url | string | -- | no | |

Variant: dark only.

## Common Fields

All slide types accept these optional fields:
- `variant` -- "dark" or "light" (see defaults above)
- `notes` -- Speaker notes for presenter view (string, no character limit)
- `footer` -- Override the deck-level footer text for this slide
- `slideNum` -- Override the auto-incremented slide number

## Color Values

Color fields (`accentColor`, `leftColor`, `rightColor`, card/item `color`) accept:
- Theme token names: `"accent"`, `"secondary"`, `"tertiary"`, `"warm"`, `"primary"`, `"primaryDark"`, `"muted"`
- 6-character hex strings: `"2563EB"`, `"0891B2"` (no `#` prefix -- pptxgenjs requirement)
