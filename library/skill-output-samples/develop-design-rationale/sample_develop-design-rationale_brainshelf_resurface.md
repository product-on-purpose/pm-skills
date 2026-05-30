---
title: "Develop Design Rationale: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - digest email layout design decision for the Resurface feature."
artifact: design-rationale
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . digest email layout design decision for the Resurface feature
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Before Sprint 8 began, Dan K. presented three layout directions for the Resurface digest email to Priya M. and Jordan L. The core tension was between visual richness (which could drive click-through) and deliverability risk (image-heavy emails are more likely to land in the promotions tab or be clipped by Gmail). Dan designed a quick unmoderated preference test with 12 users from the January interview pool to validate the direction before committing to a template build. The team selected Option B (structured text with metadata) after the preference test showed that 9 of 12 participants preferred the text-forward layout, citing speed and trust as their primary reasons.

**Source Notes:**

- Nielsen Norman Group, "Email Newsletter Usability" (nngroup.com/articles/email-newsletters/) . the email UX research that informed the evaluation criteria; NN/g's findings that users scan email in an F-pattern and make open/click decisions within 3 - 5 seconds directly shaped the "scannability" criterion.
- Litmus, "2024 Ultimate Guide to Email Design" (litmus.com/resources/ultimate-guide-to-email-design) . the rendering compatibility data used to assess image-heavy layouts; Litmus reports that 43% of email opens occur with images blocked by default, which informed the deliverability risk assessment for Option A.
- Jason Rodriguez, "Modern HTML Email" (modernhtmlemail.com) . the email development reference used by Dan K. when evaluating template complexity; Rodriguez's guidance on progressive enhancement and dark mode support influenced the technical feasibility ratings.

---

## Prompt

```
develop-design-rationale

digest email layout for resurface. dan showed three options:

option A: rich cards . article thumbnail, title, excerpt, topic tag
for each item. looks great in figma but heavy on images and might
trigger promotions tab.

option B: structured text . article title (linked), source domain,
topic tag, estimated read time. no images. clean, editorial feel.
fast to scan.

option C: minimal plain text . just titles and links, no styling.
maximum deliverability but looks like a system notification, not a
product experience.

we did a quick preference test with 12 users. 9 preferred option B.
reasons: "fast," "doesn't look like spam," "I'd actually read this."

going with B. need the rationale written up.
```

---

## Output

# Design Rationale: Resurface Digest Email Layout

## Decision Summary

**Decision:** Use a structured text layout with article metadata (title, source, topic tag, read time) and no embedded images for the Resurface daily digest email.
**Date:** 2026-01-30
**Decision Makers:** Dan K. (Design Lead), Priya M. (Product Manager), Jordan L. (Growth PM)
**Status:** Accepted

---

## Context

### Problem Statement

The Resurface feature delivers a daily email digest containing 3 - 5 saved items matched to the user's recent reading interests. The email layout must accomplish two things simultaneously: it must be visually compelling enough to earn a click (the primary experiment metric is click-through rate), and it must be simple enough to avoid email client rendering issues, promotions tab classification, and the visual pattern of marketing spam that users have learned to ignore.

### User Need

Users described their ideal resurfacing experience as feeling like a "personal recommendation from a friend" rather than a "marketing blast" (interview synthesis, January 2026). The emotional framing matters: the digest must feel like a curated gift, not a reminder of the guilt pile. Five of seven interview participants said they immediately archive or delete emails that "look like a newsletter" . meaning image-heavy layouts with promotional design patterns (large hero images, colored CTA buttons, multi-column grids) are likely to be ignored regardless of content quality.

### Constraints

| Constraint Type | Description |
|-----------------|-------------|
| Technical | Gmail clips emails larger than 102 KB; image-heavy layouts risk clipping, especially with 5 items. Resend's React Email templates render server-side, so dynamic image loading adds complexity to the send pipeline |
| Business | The A/B experiment's primary metric is click-through rate; the layout must maximize CTR without inflating unsubscribe rate (guardrail: ≤2% per week). The experiment has a 4-week window . there is no time for a layout iteration mid-test |
| Timeline | Template must be built and QA'd within Sprint 8 (Feb 3 - 16, 2026). Dan K. has 3 design days allocated; Sam W. has 1.5 days for React Email template implementation |
| Resources | No dedicated email developer on the team; Sam W. (frontend) will build the template using React Email, which he has not used before |
| Brand/Platform | Brainshelf has no established email brand identity; this is the first email the product has ever sent. The layout will define the email brand going forward |

### Design Principles Applied

- **Earn trust before asking for engagement:** The first email Brainshelf sends must feel personal and trustworthy, not promotional. Users are giving the product permission to enter their inbox . the layout must respect that permission by prioritizing clarity over visual impact.
- **Optimize for the scan, not the read:** Users decide whether to click within 3 - 5 seconds of opening. The layout must communicate "here are 3 - 5 things worth your time" in a single visual scan, not require reading paragraphs of copy to find the value.
- **Degrade gracefully:** The email must look good with images off, in dark mode, and on mobile. Any element that depends on image rendering for comprehension is a single point of failure for the user experience.

---

## Options Considered

### Option A: Rich Cards with Thumbnails

**Description:** Each saved item is displayed as a card with the article's Open Graph thumbnail image, title, a two-line excerpt, topic tag, and estimated read time. Cards are stacked vertically with a subtle divider. The layout resembles a social media feed or a curated content newsletter like The Browser.

**Visual/Wireframe:** Figma . Resurface Email v1 / Option A (internal link)

**Pros:**
- Visually engaging; thumbnails create a content-rich feel that differentiates the digest from system notifications
- Excerpts give users additional context to decide whether to click, potentially increasing CTR on high-relevance items
- Aligns with the design patterns of successful content newsletters (Morning Brew, The Browser) that users already engage with

**Cons:**
- Image-heavy emails are more likely to be classified as promotions by Gmail's tab algorithm; Litmus data shows that 43% of email opens occur with images blocked by default, meaning nearly half of users would see broken image placeholders
- Open Graph images vary wildly in quality, aspect ratio, and relevance . some articles have no OG image, others use generic stock photos; inconsistent image quality would undermine the curated feel
- Template complexity is high: responsive image scaling, alt text fallbacks, dark mode image handling, and Gmail's 102 KB clip threshold all add implementation risk within the Sprint 8 timeline

---

### Option B: Structured Text with Metadata (Selected)

**Description:** Each saved item is displayed as a text block with four elements: article title (hyperlinked), source domain, topic tag (inline), and estimated read time. No images. Items are separated by a horizontal rule. The overall visual style is editorial . think plain-text newsletter with light typographic structure, similar to the format used by Matt Levine's Money Stuff or Benedict Evans's weekly newsletter.

**Visual/Wireframe:** Figma . Resurface Email v1 / Option B (internal link)

**Pros:**
- Fast to scan; a user can evaluate all 3 - 5 items in under 5 seconds without scrolling on mobile
- No dependency on external images eliminates rendering inconsistencies, dark mode issues, and Gmail clip risk; the email is lightweight (<20 KB [fictional]) and renders identically across all clients
- The text-forward aesthetic signals "personal" rather than "promotional," directly addressing the interview insight that users ignore emails that "look like a newsletter"
- Template implementation is straightforward; Sam W. estimated 1 day of React Email work versus 3 days for Option A

**Cons:**
- Less visually distinctive; without images, the digest may not stand out in a crowded inbox preview pane
- No excerpt text means users decide to click based on title and source alone, which may reduce CTR on items with ambiguous or jargon-heavy titles
- The editorial aesthetic may feel too plain for users who associate product quality with visual polish; a subset of users may perceive the layout as "cheap" rather than "curated"

---

### Option C: Minimal Plain Text

**Description:** A plain-text email with article titles as hyperlinks and no additional metadata, styling, or structure beyond line breaks between items. No HTML formatting, no topic tags, no read time estimates. The email looks like it was written by hand.

**Visual/Wireframe:** Text mock-up . Resurface Email v1 / Option C (internal link)

**Pros:**
- Maximum deliverability; plain-text emails are virtually never classified as promotions or spam
- Zero implementation complexity; can be sent as a raw text email with no template infrastructure
- The hand-written feel maximizes the "personal recommendation" emotional tone

**Cons:**
- No metadata (topic tag, read time) removes the contextual cues that help users evaluate items without clicking; the user must click to learn anything about the item, which adds friction
- The lack of any visual structure makes it hard to distinguish 5 items at a glance; the email looks like a list of URLs, not a curated selection
- No branding, no footer, no unsubscribe link styling; the email does not look like a product experience and may confuse users who expect Brainshelf branding

---

## Evaluation

### Criteria

| Criterion | Weight | Description |
|-----------|--------|-------------|
| Scannability | High | Can the user evaluate all items within 5 seconds of opening? |
| Deliverability | High | Will the email consistently reach the primary inbox (not promotions or spam)? |
| Trust signal | High | Does the layout feel personal and curated rather than promotional? |
| Implementation effort | Medium | Can the template be built and QA'd within Sprint 8's 1.5-day frontend allocation? |
| Brand quality | Medium | Does the layout reflect the product quality Brainshelf wants to convey? |

### Comparison Matrix

| Criterion | Option A: Rich Cards | Option B: Structured Text | Option C: Plain Text |
|-----------|---------------------|--------------------------|---------------------|
| Scannability | Medium . images add visual weight but slow scanning | High . text-only layout enables rapid evaluation | Medium . no metadata reduces evaluation speed |
| Deliverability | Low . image-heavy, promotions tab risk | High . text-only, lightweight, no rendering issues | Highest . plain text is never flagged |
| Trust signal | Low . looks like a marketing newsletter | High . editorial feel, personal tone | High . feels hand-written but lacks product identity |
| Implementation effort | High . 3+ days, responsive images, dark mode | Low . 1 day, text components only | Lowest . no template needed |
| Brand quality | High . visually polished | Medium . clean but minimal | Low . no branding, no structure |

### User Research Input

- Preference test (n=12, unmoderated, January 29, 2026): participants were shown static screenshots of all three options and asked "Which of these would you be most likely to open and click?" Nine of twelve selected Option B. Stated reasons included "fast," "doesn't look like spam," "I'd actually read this," and "the read time estimate is really useful" [fictional].
- Two participants preferred Option A, citing the thumbnails as "more interesting to look at." One participant preferred Option C, saying "I trust plain text more than anything styled" [fictional].
- No participant raised concerns about Option B looking "too plain" or "low quality," despite the design team's initial concern about this perception [fictional].

---

## Decision Rationale

### Why Option B?

Option B scored highest on the three high-weight criteria (scannability, deliverability, trust signal) and was the clear user preference in the preference test (9/12 [fictional]). The structured text layout directly addresses the core design challenge: it must feel like a personal recommendation, not a marketing email. The editorial aesthetic . titles, sources, topic tags, read times, no images . is the visual language of trusted content curation (e.g., Matt Levine, Benedict Evans), and it is the layout most likely to earn habitual engagement rather than a one-time click driven by visual novelty. The implementation effort is also the lowest of the styled options, which matters given Sprint 8's tight timeline and Sam W.'s unfamiliarity with React Email.

### Key Differentiators

The deciding factor was the deliverability-trust combination. Option A's visual richness came at the cost of promotions tab risk . and an email that lands in the promotions tab is an email that never gets opened, making all other design considerations irrelevant. Option C solved deliverability but sacrificed the metadata that helps users evaluate items (especially the read time estimate, which 4 of 12 preference test participants cited as a reason for choosing Option B [fictional]). Option B is the only layout that provides decision-useful metadata while maintaining the text-forward profile that avoids promotions classification.

### Dissenting Opinions

Jordan L. (Growth) initially advocated for Option A, arguing that the visual richness would drive higher initial CTR and that promotions tab risk could be mitigated with careful sender reputation management. After seeing the preference test results, Jordan agreed that Option B was the right choice for the first version but requested that Option A be revisited for a potential v2 iteration if the experiment succeeds and the team invests in a dedicated email deliverability setup (custom IP, domain warm-up).

---

## Trade-offs Accepted

### What We Gave Up

| Trade-off | Impact | Why Acceptable |
|-----------|--------|----------------|
| No article thumbnails | The digest is less visually distinctive in the inbox preview; may reduce open rate relative to a thumbnail-rich design | Open rate is a secondary metric (and unreliable due to Apple Mail Privacy Protection); the primary metric is CTR, which depends on the user opening and scanning the email, not on inbox preview appeal |
| No excerpt text | Users must decide to click based on title and source alone; ambiguous titles may reduce CTR on individual items | The topic tag and read time provide enough context for most items; adding excerpts would increase email length and potentially push the layout past the scan-in-5-seconds threshold |
| Minimal branding | The first Brainshelf email has no hero image, no brand color, no logo . just a plain-text header and a small footer | The lack of branding is intentional for the A/B test: the email should feel like a tool, not a brand touchpoint. Branding can be added in a future iteration once the core value (resurfacing) is validated |

### Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| Option B's CTR is lower than Option A would have been because the layout lacks visual engagement | Medium | The preference test (n=12) showed clear user preference for Option B, which is a directional signal; if CTR is below the 8pp MDE threshold, the team can test Option A in a follow-up experiment |
| Users perceive the plain layout as "cheap" and associate it with product quality concerns | Low | No preference test participant raised this concern; monitor qualitative feedback from the post-experiment survey for signals |
| The read time estimate is inaccurate for some content types (e.g., video pages, interactive articles) and erodes trust in the digest's accuracy | Medium | Calculate read time using word count only; exclude pages with <200 words (likely non-article content) from the digest. Add a fallback label ("Quick read" / "Long read") for items where word count extraction fails |

---

## Reversibility

**Is this decision reversible?** Yes, easily

**Cost to reverse:** Replacing the email template requires updating the React Email component and re-deploying the send pipeline. No data model changes, no API changes, no user-facing migration. Estimated effort: 2 - 3 days of design and frontend work.

**Conditions that would warrant reverting:**
- CTR in the A/B test is below the 8pp MDE threshold and qualitative feedback suggests the layout is not engaging enough
- Post-experiment user survey reveals that a significant proportion of users perceived the digest as "low quality" or "not worth opening"

---

## Follow-up Considerations

### Metrics to Monitor

- Email CTR (primary experiment metric): direct measure of whether the layout drives engagement
- Email unsubscribe rate (guardrail): ≤2% per week; a rising unsubscribe rate may indicate layout fatigue or perceived low quality
- Heatmap click distribution across the 3 - 5 items: if clicks are concentrated on item 1, the layout may not be scannable enough to drive engagement with lower-ranked items

### Future Decisions Required

- Whether to add article thumbnails in a v2 email template if the A/B test succeeds and the team invests in email deliverability infrastructure (custom sending IP, domain warm-up)
- Whether to introduce a digest frequency setting (daily, 3x/week, weekly) that may require layout adjustments for different item counts

### Revisit Triggers

- A/B test results show CTR below the 8pp MDE threshold, suggesting the layout needs to be reconsidered
- Gmail updates its promotions tab algorithm in a way that reduces deliverability risk for image-rich emails, removing Option B's primary advantage over Option A

---

## Supporting Materials

- Figma designs: Resurface Email v1 . Options A, B, C (internal Figma link)
- Preference test results: Resurface Email Layout Test, January 29, 2026 (internal Google Sheet)
- Resurface hypothesis document (Define phase)
- Interview synthesis: January 2026 user interviews (Discover phase)

---

## Decision History

| Date | Change | Author |
|------|--------|--------|
| Jan 30, 2026 | Initial decision . selected Option B (structured text with metadata) | Dan K. |
| Jan 31, 2026 | Added preference test results and dissenting opinion from Jordan L. | Priya M. |

---

*This rationale documents the reasoning at the time of decision. Context may change.*
