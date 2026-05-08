---
title: "Define JTBD Canvas: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - JTBD canvas for saved content re-engagement."
artifact: jtbd-canvas
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . JTBD canvas for saved content re-engagement
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

During the Define phase for the Resurface feature, Brainshelf's PM created a Jobs to be Done canvas to articulate the core job users are trying to accomplish when they save content . and to expose the gap between the stated job ("save to read later") and the actual behavior (saving satisfies the intent to read, so reading never happens). The canvas draws directly from the January 2026 interview synthesis (n=7) and maps the functional, emotional, and social dimensions of the job, revealing that the functional job ("rediscover relevant saved content") is currently unserved by any solution the user has hired, while the emotional job ("feel that my saving effort was worthwhile") is actively undermined by the guilt pile.

**Source Notes:**

- Clayton Christensen, "Competing Against Luck" (Harvard Business Review Press, 2016) . the JTBD theory applied in this canvas; Christensen's framework distinguishes the functional job (revisit relevant content), the emotional job (feel productive, not guilty), and the social job (appear well-read) as separate dimensions requiring separate product responses.
- Alan Klement, "When Coffee and Kale Compete" (whencoffeeandkalecompete.com) . the demand-side innovation perspective used to analyze competing solutions and switch triggers; Klement's emphasis on "progress-making forces" informed the hiring criteria and the analysis of why users stay with the guilt pile rather than switching to Readwise.
- Bob Moesta, "Demand-Side Sales 101" (demandsidesales.com) . the four forces of progress framework applied in the Competing Solutions section to understand the push/pull dynamics of switching from doing nothing (guilt pile tolerance) to hiring a resurfacing tool.

---

## Prompt

```
/jtbd-canvas

the core job for the resurface feature. users save stuff to brainshelf
with the intent to read it later, but the act of saving satisfies the
intent . they never actually come back. so the real job isn't "save to
read later" (that job is already done by the save action), the real job
is "rediscover the things I saved that are still worth my time."

based on 7 user interviews (jan 2026). guilt pile is the emotional
dimension. social dimension: people want to seem well-read but their
library proves they're not.

competing solutions: readwise (expensive), browser bookmarks (no resurface),
doing nothing (guilt pile grows), raindrop.io (organize but no resurface).
```

---

## Output

# Jobs to be Done Canvas: Rediscover Saved Content Worth My Time

## Job Overview

**Job Title:** Rediscover saved content that is still relevant and worth reading
**Date:** January 2026
**Author:** Priya M., Product Manager
**Research Basis:** 7 semi-structured user interviews (January 2026); behavioral data analysis (save/revisit rates); competitive analysis (November 2025)

---

## Job Performer

**Who:** An information-curious person who regularly saves web articles, blog posts, and reference material to a read-later or bookmarking tool, but does not have a consistent habit of returning to read what they saved.

**Key Characteristics:**
- Saves content 3–5 times per week or more (the act of saving is habitual; the act of reading saved content is not)
- Works in a knowledge-intensive role or has knowledge-intensive interests (tech, design, research, journalism, academia)
- Experiences information overload as a daily condition, not an occasional event . there is always more to save than time to read

**Not Defined By:**
- Age, gender, or geography . the pattern (save but don't return) is consistent across all demographic segments in the interview sample
- Technical sophistication . both power users and casual users exhibit the same save-but-don't-read behavior; the distinction is frequency of saving, not propensity to return

---

## The Circumstance

**When does this job arise?**

The job arises when the user encounters a moment of idle time or curiosity (morning coffee, commute, waiting room, end of workday) and thinks "I should read something useful" . but does not have a specific article in mind. The saved library contains relevant material, but the user does not spontaneously think to open it because there is no trigger connecting the moment of availability to the library's contents. The job also arises when a topic comes up in conversation or a meeting and the user remembers "I saved something about this" but cannot recall what or where.

**Where does this happen?**

Mobile (commute, waiting) and desktop (work breaks, evening browsing). The reading context is personal . not shared or collaborative.

**Frequency:**

The moment of availability arises daily. The act of successfully connecting that moment to a relevant saved item occurs fewer than once per week for most users [fictional].

**Urgency:**

Low urgency in the moment . the user will simply open Twitter, Reddit, or a news site instead. But the cumulative effect of never returning to saved content creates a slow-building dissatisfaction that eventually erodes the perceived value of the product.

---

## Job Statement

> **"When** I have a few minutes of free time and want to read something worthwhile, **I want to** be reminded of the best things I've already saved, **so I can** actually read them instead of saving more new things I'll never get to.**"**

---

## Functional Job

**What is the practical task to accomplish?**

Surface 3–5 saved items that are (1) still relevant to the user's current interests, (2) high enough quality to justify reading time, and (3) presented in a context that makes starting easy (not buried in a 400-item undifferentiated list).

**Definition of "Done":**

- The user opens a saved item they would not have returned to on their own
- The user spends meaningful time reading (≥60 seconds on the content)
- The user does not feel the resurfaced items were irrelevant or annoying

**Key Steps in the Job:**

1. Encounter a moment of availability (time + attention + interest)
2. Receive or discover a prompt pointing to specific saved content
3. Evaluate whether the suggested item is worth reading right now
4. Open and read (or skim) the item
5. Feel satisfied that the time was well spent

**Functional Pains:**

- No external trigger connects moments of availability to the saved library; the user must self-generate the motivation to open the library, which rarely happens
- The saved library is an undifferentiated list sorted by date; there is no mechanism to surface the most relevant or timely items from a collection of hundreds
- Saved items lose timeliness . a news article saved 3 months ago may be outdated; a research paper may still be relevant but the user has no way to distinguish freshness without manually reviewing each item

---

## Emotional Job

**How do they want to feel?**

| Desired Feeling | Why It Matters |
|-----------------|----------------|
| Productive and satisfied | Reading a saved item delivers on the promise implicit in saving it; the user wants to feel that their saving effort was worthwhile, not wasted |
| In control of their information diet | The user wants to feel that they are managing information intentionally, not drowning in it |
| Pleasantly surprised | Rediscovering a saved item they had forgotten is a serendipity moment . a positive emotional peak that reinforces the value of the tool |

**How do they want to avoid feeling?**

| Feeling to Avoid | Current Trigger |
|------------------|-----------------|
| Guilt | Opening the library tab and seeing hundreds of unread items . a visible record of failed intentions |
| Overwhelm | Scrolling through the library and not knowing where to start; the volume makes every individual item feel less worth reading |
| Shame | Realizing that the "read later" intention was, in most cases, never fulfilled . the library is aspirational, not functional |

**Emotional Pains:**

- The saved library has become a negative emotional space rather than a positive one; users actively avoid opening it because it reminds them of all the things they said they would read and didn't
- Each new save adds to the guilt pile without resolving it; the product's core action (saving) is creating the product's core emotional problem (guilt)

---

## Social Job

**How do they want to be perceived?**

| Desired Perception | By Whom |
|--------------------|---------|
| Well-read and intellectually curious | Peers, colleagues, social media audience |
| Someone who uses their tools effectively | Other knowledge workers and "tools for thought" community members |

**What perception do they want to avoid?**

| Perception to Avoid | By Whom |
|---------------------|---------|
| Someone who hoards information but doesn't actually engage with it | Themselves (internal self-perception is the strongest social force here) |
| A passive consumer rather than an active learner | Peers in their professional or intellectual community |

**Social Context:**

- The social dimension is primarily internal (self-perception) rather than public . users do not share their reading stats, but they carry an internal narrative about whether they are "good readers" or "just collectors"
- PKM and "tools for thought" communities on Twitter/X and Reddit create an ambient social norm of productive reading habits; users who participate in these communities feel additional pressure to demonstrate that they use their tools well

---

## Competing Solutions

**What do customers currently "hire" for this job?**

| Solution Type | Solution | Strengths | Weaknesses |
|---------------|----------|-----------|------------|
| Direct Competitor | Readwise (daily review email + spaced repetition) | Proven resurfacing mechanic; creates a daily habit of revisiting highlights; strong community reputation | Expensive (~$8–10/month, no free tier); requires highlighting before content can be resurfaced; not a good fit for users who save but don't annotate |
| Indirect Alternative | Browser bookmarks + manual browsing | Free; no new tool to learn; bookmarks are always accessible in the browser toolbar | No resurfacing, no organization, no trigger to return; bookmarks accumulate and become as overwhelming as the Brainshelf library |
| Non-consumption | Doing nothing (accepting the guilt pile) | Zero effort; no cost; no new email to manage | The guilt pile grows; retention declines; the user eventually churns when the negative emotion exceeds the perceived value of saving |
| DIY/Manual | Setting a daily reminder (phone alarm, calendar event) to "check my saved articles" | User-controlled cadence; no dependency on product features | Requires sustained willpower; reminder fatigue sets in within 1–2 weeks [fictional]; the reminder is generic ("check your library") without pointing to specific relevant items |

**Why Do They Switch?**

- A moment of acute guilt (e.g., opening the library and realizing they haven't read anything in months) can trigger a search for a solution . this is the moment where Readwise acquisitions happen
- Recommendation from a peer in the PKM community who describes a daily review habit creates aspiration and a concrete action path

**Why Do They Stay?**

- Switching cost: migrating saved content between tools is effortful and uncertain; users have sunk cost in their existing library
- Readwise's price is a barrier for casual users who are not sure resurfacing will work for them
- Inertia: the guilt pile is uncomfortable but familiar; the discomfort is chronic, not acute, so it rarely crosses the threshold to trigger action

---

## Hiring Criteria

**Must-Have (Table Stakes):**

- Resurfacing must happen outside the app . the user must be reached where they already are (inbox, phone notification), not required to self-initiate an app visit
- Surfaced items must be relevant to the user's current interests, not random; irrelevant suggestions will be ignored and increase unsubscribe risk
- The experience must be effortless . one click from the trigger (email, notification) to reading the saved item, not a multi-step navigation

**Differentiators (Decision Drivers):**

- Resurfacing without annotation lock-in . unlike Readwise, the tool should surface saved articles based on topic relevance, not just highlighted passages; this makes resurfacing accessible to users who save but don't highlight
- Accessible pricing . freemium or significantly lower cost than Readwise; the user is not yet sure resurfacing will work for them and needs a low-risk entry point
- Emotional framing . the resurface experience should feel like a gift ("here's something interesting you saved") not a reminder of failure ("you have 400 unread items")

**Nice-to-Have:**

- Customizable frequency (daily, 3x/week, weekly) so users can control their exposure
- Ability to mark resurfaced items as "not interested" to improve future relevance without navigating to the full library

---

## Insights and Implications

**Key Insight 1:** The act of saving satisfies the intent to read . saving IS the psychological completion, not the beginning of a reading journey.
- Product Implication: Resurface must create a new completion event (reading the resurfaced item) that is separate from and independent of the save event; the product cannot rely on the save action to motivate future reading.

**Key Insight 2:** The saved library has become a negative emotional space . users avoid opening it because it represents accumulated failure.
- Product Implication: The resurface mechanism must bypass the library entirely; it should deliver individual items directly (via email or notification) without requiring the user to encounter the full library. The experience must feel like serendipity, not obligation.

**Key Insight 3:** Readwise owns the power-user end of the resurfacing spectrum but is inaccessible to the majority of read-later users due to price and annotation requirements.
- Product Implication: Brainshelf can differentiate by offering resurfacing that works without annotations (using topic-matching and recency instead) at a lower price point or on the free tier. The target is the 80%+ of save-for-later users who never highlight . the majority that Readwise cannot serve.

---

## Supporting Quotes

> "I call it my guilt pile. I have over 400 things saved. I haven't read most of them." . P5, researcher, 14 months on Brainshelf [fictional]

> "Nothing reminds me. I save something, close the tab, and it's just... gone from my brain." . P2, grad student, 6 months on Brainshelf [fictional]

> "That's actually why I stopped using Brainshelf. The library got so big it felt pointless." . P7, churned freelance writer [fictional]

---

## Questions for Further Research

- How many of the 9,800 eligible users [fictional] would opt in to a daily email digest? If opt-in is below 10%, is the experiment viable within a 4-week window, or should a push notification variant be tested in parallel?
- Does the "save to have" vs. "save to read" distinction (from Theme 3 of the interview synthesis) affect which items should be prioritized for resurfacing? Should reference-intent saves be excluded from the digest?
- What is the right cadence for resurfacing? Daily is the Readwise model and maximizes surface area for habit formation, but daily email in a consumer product risks inbox fatigue. Should weekly be tested as a fallback variant?

---

*This canvas should be validated and updated as you learn more about customers.*
