# Decision Logic

How to select slide types for content and when to use dark vs. light variants.

## Content Pattern to Slide Type

| Content Pattern | Slide Type | Why This Type |
|---|---|---|
| Opening the deck (bold, external) | `title_dark` | Sets authoritative tone with dark impact |
| Opening the deck (internal, lighter) | `title_light` | Softer opener for team and internal decks |
| Transitioning between major topics | `section` | Clear visual break, resets audience focus |
| Explaining something in paragraphs | `content` | Title + body text, no bullet overhead |
| List of 3-6 key points | `bullets` | Clean bullet rendering with colored markers |
| Side-by-side comparison | `two_col` | Vertical divider makes contrast obvious |
| Single key metric | `stat` | Large number on colored card draws attention |
| Two metrics that gain meaning from comparison | `dual_stat` | Side-by-side cards invite comparison |
| Testimonial or pull quote | `quote` | Large quote marks and attribution styling |
| Three parallel concepts or pillars | `three_card` | Colored cards with equal visual weight |
| Four concepts in a grid | `four_grid` | 2x2 layout for balanced coverage |
| Dates or milestones over time | `timeline` | Horizontal dots with chronological flow |
| Sequential workflow or process | `process_flow` | Numbered circles show action sequence |
| Meeting agenda or event schedule | `agenda` | Time-topic pairs with optional intro |
| Key finding or executive summary | `highlight` | Prominent colored box demands attention |
| Tabular data or comparison matrix | `table` | Styled header row, clean grid |
| Feature list with visual markers | `icon_rows` | Colored circles give each point identity |
| Ending the deck | `closing` | Clean ending with optional tagline and URL |

## When Two Types Could Work

- **Single metric with context:** Use `stat` if the number is the star. Use `highlight` if the insight matters more than the number.
- **List of items:** Use `bullets` for 3-6 plain points. Use `icon_rows` when each item deserves its own visual identity (max 4). Use `three_card` when items have sub-bullets (exactly 3).
- **Sequential information:** Use `timeline` for dates and milestones (chronological). Use `process_flow` for workflows (action-oriented).
- **Two things compared:** Use `two_col` for lists. Use `dual_stat` for numbers.

## Dark/Light Variant Strategy

Alternate variants for visual rhythm. A monotone deck causes slide fatigue.

**General rules:**
- Section dividers and quotes default dark
- Content, data, tables, and highlights default light
- Alternate within a section to prevent visual monotony
- Title and closing are always dark (or title_light for internal decks)

**Suggested rhythm pattern:**
```
TITLE (dark) > SECTION (dark) > CONTENT (light) > STAT (light) >
BULLETS (dark) > HIGHLIGHT (light) > CLOSING (dark)
```

**Override the defaults when:**
- Two consecutive slides would have the same variant — flip one
- A stat or highlight needs extra emphasis — use the non-default variant
- The deck is short (< 6 slides) — defaults are usually fine as-is

## Deck Length Guidelines

| Deck Size | Typical Structure |
|---|---|
| 3-5 slides | Title + 2-3 content slides + Closing |
| 6-10 slides | Title + Section + mixed content + Closing |
| 11-20 slides | Title + 2-3 sections with 3-5 slides each + Closing |
| 20+ slides | Consider splitting into two decks |

Always include a title slide and a closing slide. Use section dividers when the deck has distinct topics.
