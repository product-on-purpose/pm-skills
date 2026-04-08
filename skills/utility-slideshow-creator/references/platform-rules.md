# Platform Rules

pptxgenjs technical requirements and Google Slides compatibility constraints. Violating these rules produces corrupted files or broken rendering.

## pptxgenjs Rules (Mandatory)

1. **Never use `#` in hex colors.** Write `"2563EB"`, not `"#2563EB"`. The generation engine handles this internally, but raw pptxgenjs code with `#` causes silent corruption.

2. **Never encode opacity in hex strings.** Write `{ color: "000000", opacity: 0.12 }`, not `"00000020"`. Eight-character hex with alpha channel is not supported.

3. **Never reuse option objects across addShape/addText calls.** pptxgenjs mutates option objects internally. Always create fresh objects for each call.

4. **Use `bullet: true`** for bullet points. Never use unicode bullet characters like `\u2022` — that creates double bullets.

5. **Use `breakLine: true`** between items in text arrays to force line breaks between entries.

6. **Each presentation needs `new pptxgen()`.** Never reuse a presentation instance across files or generation runs.

## Google Slides Compatibility

The default theme deliberately avoids features that degrade in .pptx-to-Google-Slides conversion:

| Feature | Status | Why Avoided |
|---|---|---|
| Gradient fills | Avoided | Convert to solid blocks or disappear |
| Custom fonts (non-Google) | Avoided | Substituted with defaults, breaking layout |
| Overlapping semi-transparent shapes | Avoided | Transparency renders incorrectly |
| Embedded charts | Avoided | Convert to static images, lose interactivity |
| Complex shadow effects | Avoided | Render differently or disappear |
| SmartArt | Avoided | Converts to ungrouped shapes |

**What works reliably across platforms:**
- Solid color fills
- Google Fonts (the default theme uses Lexend Deca)
- Simple shapes (rectangles, circles, lines)
- Text boxes with formatting
- Tables with cell formatting
- Speaker notes

**Expected after conversion:** Minor 1-2 pixel spacing differences are normal and do not affect readability or layout integrity.

## Output Format

- **File format:** .pptx (Office Open XML Presentation)
- **Layout:** LAYOUT_16x9 (10" x 5.625")
- **Output directory:** `output-slideshow-creator/` by default (gitignored). Override with `--output <dir>`.
- **Naming:** From `outputFileName` in spec, or slugified `title`, or `deck.pptx`

## PDF Export (Optional)

PDF rendering uses Puppeteer (headless Chromium) with the theme font loaded from Google Fonts. It reads the same JSON spec as the .pptx engine, so both outputs match.

```bash
node scripts/export-pdf.mjs deck-spec.json output.pdf
```

If no output path is given, the PDF is written alongside the spec file. Puppeteer is an optional dependency — the .pptx generation works without it.

## Node.js Requirements

- **Minimum:** Node.js 18
- **Dependencies:** pptxgenjs (bundled or installed via npm)
- **Optional:** Puppeteer (for PDF export only)
- Run from any directory; output path is relative to CWD
