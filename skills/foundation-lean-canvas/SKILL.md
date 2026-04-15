<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
name: foundation-lean-canvas
description: Produces a one-page lean canvas across nine interlocking blocks (problem, customer, UVP, solution, channels, revenue, cost, metrics, unfair advantage) with optional inline HTML and SVG visual rendering. Use when framing a new product thesis, stress-testing an existing strategy, comparing strategic options side-by-side, or aligning a team on business-model assumptions. Works as a strategic hub that cross-links to deeper PM skills without duplicating them.
classification: foundation
version: "1.0.0"
updated: 2026-04-15
license: Apache-2.0
metadata:
  category: problem-framing
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Lean Canvas

A lean canvas is a one-page business thesis that makes your assumptions about problem, customer, solution, and viability explicit and testable. Developed by Ash Maurya from Alex Osterwalder's Business Model Canvas, it is specifically adapted for startups and product teams operating under uncertainty. Nine interlocking blocks force you to articulate the whole picture at once so that changing one block's assumptions surfaces the ripple effect on the others.

This skill is a strategic hub, not a specialist tool. It produces the integrated one-page artifact and cross-links to deeper PM skills (`/problem-statement`, `/persona`, `/jtbd-canvas`, `/solution-brief`, `/competitive-analysis`, `/experiment-design`) for single-block depth when needed.

## Supported Modes

- `content` (default) produces the nine-block canvas as structured markdown.
- `visual` produces the markdown canvas AND writes a self-contained, attractive `.html` file to disk using `references/html-template.html` as the layout scaffold. The HTML renders the canonical Maurya nine-block layout with polished typography, subtle per-column color accents, confidence badges per block, and print-ready A3 landscape styling. No external assets or CDN dependencies: the file opens correctly in a browser with no network access.

If mode is omitted, default to `content` and state that fallback explicitly.

## When to Use

- Framing a new product, feature, or business thesis on one page
- Stress-testing an existing business by making implicit assumptions explicit
- Comparing two or more strategic options side-by-side (run the skill once per option, then diff)
- Onboarding new team members into the strategic thesis in a single artifact
- Mid-phase reality check: does the thesis still hold given what we have learned?
- Pairing with `/experiment-design` to prioritize which block assumptions to test first

## When NOT to Use

- You need deep research on a single block (persona detail, problem framing, competitive landscape). Use the specialist skill (`/persona`, `/problem-statement`, `/competitive-analysis`) instead.
- You are drafting a PRD, user stories, or acceptance criteria. Use `/prd`, `/user-stories`, `/acceptance-criteria`; lean canvas is strategy, not specification.
- You want to brainstorm solutions without a customer-problem anchor. Start with `/problem-statement` or `/jtbd-canvas` and return to lean canvas once the problem is framed.
- You need a Business Model Canvas for an established enterprise with known customers and channels. Maurya designed lean canvas specifically for high-uncertainty early-stage ventures; a BMC is a better fit for steady-state analysis.

## Instructions

When asked to create a lean canvas, follow these steps:

1. **Resolve mode and intent**
   Determine whether the request is `content` or `visual`. If mode is omitted, default to `content` and state the fallback.
   Clarify the target: new product thesis, existing-business stress test, or side-by-side comparison of options. If unclear, ask once before proceeding.

2. **Collect context and evidence**
   Use user-provided context first: product name, market, target customer, any research already done, existing alternatives users are hiring today, known constraints.
   If evidence is thin, continue generation but mark gaps in the Evidence & Confidence section and calibrate per-block confidence accordingly.
   For existing businesses, distinguish current assumptions from validated data explicitly.

3. **Fill the nine blocks in recommended order**
   Fill in this order because each block's answer constrains the next. Do not skip ahead.

   a. **Problem** — Top 3 problems, ranked by pain intensity and frequency. Include Existing Alternatives (what customers do today, including workarounds and non-consumption, not just direct competitors).
   b. **Customer Segments** — Who has these problems most acutely? Name Early Adopters as a distinct subset you will reach first. Early Adopters are more painful, more reachable, and more willing to try a new solution than the broader segment.
   c. **Unique Value Proposition (UVP)** — One sentence that makes a clear, testable promise. Include a High-Level Concept ("X for Y" analogy) that accelerates understanding for busy readers.
   d. **Solution** — Top 3 features that address the top 3 problems. Map 1:1 to the Problem block. Keep it concrete but do not over-engineer; this is a hypothesis, not a spec.
   e. **Channels** — Free and paid paths to your early adopters. Distinguish compounding channels (content, SEO, community) from traction-demonstrating channels (outbound, paid ads).
   f. **Revenue Streams** — Model (subscription, transaction, freemium, services), price point, expected volume, and LTV. Show the math so the revenue thesis is inspectable.
   g. **Cost Structure** — CAC, fixed vs variable, and the cost driver that shapes the growth curve.
   h. **Key Metrics** — The 3 to 5 leading indicators that signal whether the model is working. AARRR (Acquisition, Activation, Retention, Revenue, Referral) is a useful default frame.
   i. **Unfair Advantage** — What cannot be easily copied or bought. Empty is acceptable if framed as an open question; never fabricate a moat.

4. **Apply evidence and confidence policy**
   Tag each block with `High`, `Medium`, or `Low` confidence plus a one-line rationale.
   Populate the Evidence & Confidence section: `Validated` (assumptions with named sources), `Assumed` (no data yet), `Open Questions` (what you would need to learn to raise confidence), `Governance` (who owns the canvas and when it is revisited).
   A block marked "High" must name a specific evidence source, not a generic claim.

5. **Render and write the visual file (visual mode only)**
   Read `references/html-template.html`. It is a complete, self-contained HTML5 document using CSS Grid to express the canonical Maurya nine-block layout, with per-column color accents, confidence badges, and A3 landscape print styling.
   Fill every `{{PLACEHOLDER}}` token in the template with content from the markdown canvas:
   - `{{PRODUCT_NAME}}`, `{{CREATED_DATE}}`, `{{PURPOSE}}`, `{{OVERALL_CONFIDENCE}}` from the canvas header.
   - `{{PROBLEM_CONTENT}}`, `{{EXISTING_ALTERNATIVES}}`, `{{SOLUTION_CONTENT}}`, `{{UVP_CONTENT}}`, `{{HIGH_LEVEL_CONCEPT}}`, `{{ADVANTAGE_CONTENT}}`, `{{CUSTOMER_CONTENT}}`, `{{EARLY_ADOPTERS}}`, `{{METRICS_CONTENT}}`, `{{CHANNELS_CONTENT}}`, `{{COST_CONTENT}}`, `{{REVENUE_CONTENT}}` from the respective blocks. Use a `<ul><li>` list for multi-item blocks; keep cell content concise (one-line summaries, not the full markdown detail) so the visual stays scannable.
   - `{{CONF_PROBLEM}}`, `{{CONF_SOLUTION}}`, `{{CONF_UVP}}`, `{{CONF_ADVANTAGE}}`, `{{CONF_CUSTOMER}}`, `{{CONF_METRICS}}`, `{{CONF_CHANNELS}}`, `{{CONF_COST}}`, `{{CONF_REVENUE}}` with the single letter `H`, `M`, or `L` matching each block's confidence tag. Each appears twice in the template (once in the class attribute for styling, once as visible text).
   - `{{VALIDATED_COUNT}}`, `{{ASSUMED_COUNT}}`, `{{OPEN_QUESTIONS_COUNT}}`, `{{OWNER}}`, `{{NEXT_REVIEW}}` in the footer evidence strip.
   Write the filled document to disk at a user-specified path, or default to `./lean-canvas-{slug}.html` in the current working directory (where `{slug}` is the product name lowercased with non-alphanumeric characters replaced by hyphens).
   Do not introduce external font or CSS links; the template is intentionally self-contained.
   In content mode, skip this step entirely.

6. **Finalize for direct use**
   Remove all template guidance blockquotes (`>` notes) from the final artifact.
   Verify UVP is decision-changing and testable, not marketing fluff.
   Confirm Early Adopters is a distinct subset (not a restatement of Customer Segments).
   Confirm Solution block items map 1:1 to Problem block items.

## Output Contract (v1.0.0)

- All nine blocks present in the canonical order (Problem, Customer Segments, UVP, Solution, Channels, Revenue Streams, Cost Structure, Key Metrics, Unfair Advantage)
- Each block contains content, a confidence tag (`High|Medium|Low`), and a one-line rationale
- Evidence & Confidence section present with `Validated`, `Assumed`, `Open Questions`, and `Governance` subsections populated (even if a subsection is intentionally empty, mark it "None" rather than removing it)
- Content mode: the markdown canvas is the single output.
- Visual mode: in addition to the markdown canvas, a self-contained HTML file is written to disk at `./lean-canvas-{slug}.html` (or a user-specified path). The HTML is derived from `references/html-template.html` with every placeholder filled and no external dependencies. After writing, report the file path to the user.
- Foundation classification: no `phase:` field in frontmatter; uses `classification: foundation`

## Quality Checklist

Before finalizing, verify:

- [ ] All nine blocks are present and ordered correctly (Problem, Customer Segments, UVP, Solution, Channels, Revenue Streams, Cost Structure, Key Metrics, Unfair Advantage)
- [ ] Problem lists the top 3 problems AND includes an Existing Alternatives subsection
- [ ] Customer Segments names Early Adopters as a distinct subset, not a restatement
- [ ] UVP is one sentence AND includes a High-Level Concept analogy ("X for Y")
- [ ] Solution maps 1:1 to the Problem block (top 3 features for top 3 problems)
- [ ] Channels distinguishes compounding from traction-demonstrating paths
- [ ] Revenue Streams shows the math (model, price, volume, LTV)
- [ ] Cost Structure names CAC and identifies the cost driver
- [ ] Key Metrics lists 3 to 5 leading indicators
- [ ] Unfair Advantage is either specific OR explicitly flagged as an open question
- [ ] Each block has a confidence tag (`High|Medium|Low`) with a one-line rationale
- [ ] Evidence & Confidence section has all four subsections populated
- [ ] Template guidance blockquotes are removed from the final artifact
- [ ] Visual mode: the generated `.html` file opens successfully in a browser with no network access; every `{{PLACEHOLDER}}` has been replaced; confidence badges render with correct color; the canonical Maurya nine-block arrangement is visible; print-preview at A3 landscape fits the canvas on one page; `role="img"` and `aria-label` are present; the file path is reported back to the user
- [ ] Content mode: no `.html` file is written and no visual section appears in the markdown

## Examples

See `references/EXAMPLE.md` for a completed lean canvas in content mode with a realistic B2B SaaS scenario. The HTML template scaffold for visual mode lives at `references/html-template.html`.
