# JSON Deck Specification Template

<!-- Use this template as a starting point for your deck specification. Fill in the content fields, respecting the character limits documented in slide-types.md. -->

## Deck Metadata

```json
{
  "title": "",
  "author": "",
  "footerText": "",
  "outputFileName": "",
  "slides": []
}
```

### Field Reference

| Field | Type | Required | Notes |
|---|---|---|---|
| title | string | yes | Presentation title, used as .pptx metadata |
| author | string | no | Author name for .pptx metadata |
| footerText | string | no | Default footer text for all slides |
| outputFileName | string | no | Output filename. Default: title slugified + .pptx |
| slides | array | yes | Array of slide objects |

## Slide Object Structure

Every slide object has `type` (required) plus content slots defined in `slide-types.md`.

### Common Optional Fields

| Field | Type | Notes |
|---|---|---|
| variant | string | "dark" or "light" -- see defaults per type in slide-types.md |
| notes | string | Speaker notes for presenter view (no character limit) |
| footer | string | Override deck-level footerText for this slide |
| slideNum | string | Override auto-incremented slide number |

### Color Values

Color fields (`accentColor`, `leftColor`, `rightColor`, card/item `color`) accept:
- **Theme token names:** `"accent"`, `"secondary"`, `"tertiary"`, `"warm"`, `"primary"`, `"primaryDark"`, `"muted"`
- **6-character hex strings:** `"2563EB"`, `"0891B2"` (no `#` prefix)

## Slide Type Quick Reference

| Type Key | Required Slots | Optional Slots |
|---|---|---|
| title_dark | title | subtitle |
| title_light | title | subtitle |
| section | title | variant |
| content | title, body | variant |
| bullets | title, bullets[] | variant |
| two_col | title, leftTitle, leftItems[], rightTitle, rightItems[] | variant |
| stat | stat, label | accentColor, variant |
| dual_stat | leftStat, leftLabel, rightStat, rightLabel | title, leftColor, rightColor, variant |
| quote | quote | attribution, variant |
| three_card | cards[3] | title, variant |
| four_grid | cards[4] | title, variant |
| timeline | title, milestones[] | variant |
| process_flow | title, steps[] | variant |
| agenda | items[] | title, intro, variant |
| highlight | title, highlight | context, accentColor, variant |
| table | title, headers[], rows[][] | variant |
| icon_rows | title, items[] | variant |
| closing | (none) | tagline, url |

See `slide-types.md` for character limits and detailed slot definitions.
