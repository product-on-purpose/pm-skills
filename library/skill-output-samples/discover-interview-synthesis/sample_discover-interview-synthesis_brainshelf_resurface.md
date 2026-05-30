---
title: "Discover Interview Synthesis: Brainshelf Resurface"
description: "Brainshelf consumer PKM app - user interviews on saved content re-engagement."
artifact: interview-synthesis
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app . user interviews on saved content re-engagement
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

In January 2026, Brainshelf's PM conducted 7 semi-structured user interviews over two weeks to understand why users save content to Brainshelf but rarely return to read it. Participants included heavy savers, occasional users, and one recently churned user. Three primary themes emerged: the "guilt pile" effect (5 of 7 described their saved library in negative terms), the absence of a natural return trigger (all 7 relied entirely on self-motivation to revisit saved items), and a previously unrecognized distinction between "saving to read" and "saving to have" that users themselves did not articulate until prompted. The findings directly informed the Resurface hypothesis and provided the qualitative evidence base for the morning email digest experiment design.

**Source Notes:**

- Steve Portigal, "Interviewing Users" (portigal.com/books) . the semi-structured interview methodology used in this research; Portigal's approach to rapport-based, open-ended interviews informed the question structure and the deliberate avoidance of leading language about guilt or failure.
- Indi Young, "Mental Models: Aligning Design Strategy with Human Behavior" (rosenfeldmedia.com) . mental model mapping was applied during synthesis to distinguish saving behavior from reading behavior as separate task flows with separate motivations, revealing the gap between users' stated intent ("I'll read this later") and their actual behavior (saving is the completion event, not the start of a reading journey).
- Soman, D. (2001), "The Mental Accounting of Sunk Time Costs," Journal of Behavioral Decision Making . the behavioral economics research supporting the observation that accumulated, unvisited saved items create a sunk-cost guilt response that reduces rather than increases the likelihood of re-engagement; the guilt pile is not just an aesthetic complaint but a behavioral trap.

---

## Prompt

```
discover-interview-synthesis

ran 7 user interviews over the past 2 weeks about why people save stuff
to brainshelf but never go back to read it. need to synthesize the findings.

interviews were video calls, 30-45 min each. mix of heavy savers,
occasional users, and one churned user.

main findings:
- 5/7 described their library negatively ("guilt pile", "overwhelming", etc)
- nobody has a natural trigger to go back and read saved stuff
- there's a weird split between "saving to read later" and "saving to have"
  that people don't realize until you ask them

some great quotes. need this formatted for the team before we start
building the hypothesis doc for resurface.
```

---

## Output

# Interview Synthesis: Why Users Save but Don't Return

## Research Overview

### Objective

Understand why Brainshelf users save content at a high rate (~47 items/month average [fictional]) but revisit fewer than 9% of saved items within 30 days [fictional], and identify what . if anything . would create a natural trigger for re-engagement with saved content.

### Methodology

- **Format:** Video call (Zoom)
- **Duration:** 30 - 45 minutes per interview
- **Interviewer(s):** Priya M. (PM)
- **Date Range:** January 6 to January 17, 2026

### Participant Summary

| ID | Role/Segment | Tenure | Interview Date | Notes |
|----|--------------|--------|----------------|-------|
| P1 | Heavy saver, software engineer | 18 months [fictional] | Jan 6 | 200+ saved items; revisits ~5/month [fictional] |
| P2 | Casual saver, grad student | 6 months [fictional] | Jan 7 | Saves research papers and blog posts; using Brainshelf for thesis |
| P3 | Power user, journalist | 24 months [fictional] | Jan 8 | Uses Brainshelf as a clipping archive for source material |
| P4 | Occasional user, designer | 12 months [fictional] | Jan 10 | Saves design inspiration; rarely reads full articles |
| P5 | Heavy saver, researcher | 14 months [fictional] | Jan 13 | 400+ saved items; self-described "information hoarder" [fictional] |
| P6 | Casual saver, marketing manager | 8 months [fictional] | Jan 15 | Saves industry articles for reference; reads fewer than 10% [fictional] |
| P7 | Churned user, freelance writer | Was active for 9 months [fictional] | Jan 17 | Stopped using Brainshelf 3 months ago; switched to browser bookmarks |

## Key Themes

### Theme 1: The Guilt Pile

**Prevalence:** 5 of 7 participants

**Summary:** Five participants independently described their saved library in negative emotional terms . "guilt pile," "graveyard," "overwhelming," "anxiety-inducing." The saved library, rather than being a resource that users feel good about, has become a source of guilt. Users feel they should be reading what they saved, and the growing backlog makes them feel worse the longer it grows. The library is experienced as a record of failed intentions rather than a useful collection.

**Evidence:**
- P1: "Honestly I try not to open the library tab anymore. It just makes me feel bad about all the things I said I'd read and didn't." [fictional]
- P5: "I call it my guilt pile. I have over 400 things saved. I haven't read most of them. At this point it's more like an archive of my good intentions." [fictional]
- P7: "That's actually why I stopped using Brainshelf. The library got so big it felt pointless. I'd open it, scroll for a minute, feel overwhelmed, and close it. Eventually I just stopped opening it." [fictional]

### Theme 2: No Natural Return Trigger

**Prevalence:** 7 of 7 participants

**Summary:** Every participant described their revisit behavior as entirely self-initiated. There is no external cue . no notification, no email, no habit tied to a daily routine . that prompts them to return to their saved library. When asked "What makes you go back to read something you saved?", the most common answer was a variant of "I just remember it exists" or "I'm bored and think of it." Revisiting is accidental, not habitual. Several participants described specific moments where they needed a saved article and couldn't find it because they had forgotten they saved it.

**Evidence:**
- P2: "Nothing reminds me. I save something, close the tab, and it's just... gone from my brain. The only time I go back is when I'm actively looking for something specific." [fictional]
- P3: "I've been using Brainshelf for two years. I have never once thought 'oh it's morning, let me check my saved articles.' That thought does not occur." [fictional]
- P6: "Sometimes I'll be in a meeting and remember I saved an article about exactly this topic like three months ago, and I'll dig through my library trying to find it. But I never would have gone back to it on my own." [fictional]

### Theme 3: Saving to Read vs. Saving to Have

**Prevalence:** 4 of 7 participants (explicitly; 2 more showed the pattern without naming it)

**Summary:** When prompted to reflect on their saving intent, four participants recognized a distinction they hadn't previously articulated: not every save is a "read later" save. Some items are saved as reference material ("I might need this someday"), some as aspirational markers ("I want to be the kind of person who reads this"), and some as genuinely intended reading. The problem is that Brainshelf treats all saves identically . there is no mechanism to distinguish intent at save time or to filter the library by intent type later. This makes the library feel undifferentiated and overwhelming.

**Evidence:**
- P4: "Half the things I save are design inspiration . I don't want to read those, I want to look at them when I need ideas. But they're mixed in with the articles I actually wanted to read." [fictional]
- P5: "You know what, now that you ask . a lot of what I save is aspirational. Like, I save long academic papers because I want to read them. But I know I probably won't. Saving them feels like a commitment that I never follow through on." [fictional]
- P1: "There's definitely stuff in my library that I saved because I thought I'd need it for work. That's different from the articles I saved because they looked interesting. But Brainshelf doesn't know the difference." [fictional]

## Notable Quotes

> "I try not to open the library tab anymore. It just makes me feel bad about all the things I said I'd read and didn't."
> . P1, software engineer, 18 months on Brainshelf [fictional]

> "Nothing reminds me. I save something, close the tab, and it's just... gone from my brain."
> . P2, grad student, 6 months on Brainshelf [fictional]

> "I call it my guilt pile. I have over 400 things saved. I haven't read most of them. At this point it's more like an archive of my good intentions."
> . P5, researcher, 14 months on Brainshelf [fictional]

> "That's actually why I stopped using Brainshelf. The library got so big it felt pointless."
> . P7, churned freelance writer, former user [fictional]

> "Sometimes I'll be in a meeting and remember I saved an article about exactly this topic like three months ago, and I'll dig through my library trying to find it. But I never would have gone back to it on my own."
> . P6, marketing manager, 8 months on Brainshelf [fictional]

## Insights

### Insight 1: Saving Satisfies the Intent to Read

The act of saving an article to Brainshelf provides the same psychological closure as actually reading it. The save action resolves the tension of "I should read this" without requiring the effort of actually reading. For most users, the save is not the beginning of a reading journey . it is the end. This means that increasing the quality or ease of the saving experience will not drive re-engagement; the saving experience is already satisfying enough.

**Implication:** Any re-engagement intervention must create a new touchpoint after the save event, not improve the save event itself. The save is the completion; re-engagement requires a separate trigger.

### Insight 2: Users Need an External Trigger . They Cannot Self-Generate Return Visits

Not a single participant described a self-sustaining habit of returning to their saved library. Return visits are accidental, situational, or prompted by an unrelated external need (like a meeting topic). The absence of any natural trigger means that Brainshelf is entirely dependent on user self-motivation for engagement beyond the save event . and self-motivation is failing at scale (9% revisit rate [fictional]).

**Implication:** An external trigger mechanism (email, push notification, in-app card) is required to create a return visit habit. Email is the most promising first test because it reaches users outside the app and does not require them to have push notifications enabled.

### Insight 3: Not All Saves Are Created Equal

Users save content with at least three different intents . "to read later," "to reference when needed," and "to aspirationally have" . but Brainshelf treats all saves as a flat, undifferentiated list. This makes the library feel overwhelming because every item appears to demand the same attention, even though the user's relationship to each item is different. A library of 400 items feels more manageable if the user can distinguish the 50 they actually want to read from the 350 they want to reference or keep.

**Implication:** Resurface (the email digest) should not attempt to surface the entire library equally. It should prioritize items where the user's likely intent was "to read later" . recent saves of articles and blog posts, not design screenshots or reference links saved months ago. Longer term, offering intent categorization at save time (or inferred from content type) would reduce guilt pile anxiety by making the library feel curated rather than accumulated.

## Recommendations

| Priority | Recommendation | Related Insight | Confidence |
|----------|---------------|-----------------|------------|
| 1 | Build an external re-engagement trigger (email digest) that surfaces saved content the user is likely to find relevant | Insights 1, 2 | High |
| 2 | Prioritize recent, article-type saves in the resurface algorithm over old or non-article saves | Insight 3 | Medium |
| 3 | Explore intent-tagging at save time in a future release (read later / reference / inspiration) | Insight 3 | Medium |

### Recommendation Details

**1. Build an External Re-Engagement Trigger (Resurface Email Digest)**

Every participant lacked a natural trigger to return to their saved library. An email digest surfacing 3 - 5 saved items matched to the user's recent reading topics would create the missing touchpoint. Email is preferred over push notification because Brainshelf's push notification opt-in rate is low [fictional] and email reaches users regardless of app install state. The Readwise model (daily review email) provides market validation that this mechanic can drive habitual re-engagement in PKM tools. This recommendation directly leads to the Resurface hypothesis and A/B experiment design.

**2. Prioritize Recent, Article-Type Saves in the Resurface Algorithm**

The interview finding that users save with different intents (read vs. reference vs. aspirational) means a naive resurface algorithm that treats all saves equally will surface irrelevant content . design screenshots, old reference links, aspirational papers the user will never read. The resurface algorithm should weight recently saved articles and blog posts higher than old or non-article content types. Content type can be inferred from URL structure, metadata, and save recency without requiring the user to manually tag intent.

## Appendix

### Methodology Notes

Interviews followed a semi-structured format with open-ended questions designed to avoid leading language. The interview guide covered five areas: (1) how and when users save content, (2) what happens after they save, (3) how they describe their saved library, (4) what prompts them to return to saved items, and (5) what would make them return more often. Participants were recruited from Brainshelf's active user base via an in-app survey prompt; P7 (churned user) was recruited through a follow-up email to users who had not logged in for 60+ days [fictional].

### Limitations

- Small sample size (n=7) means findings are directional, not statistically representative; the themes should be validated with quantitative behavioral data before committing to major product investment.
- Participant recruitment was opt-in, which may overrepresent users who feel strongly about their saving behavior (either positively or negatively); the "guilt pile" theme may be amplified by self-selection.
- No participants from non-English-speaking markets were included; cultural differences in information management behavior may exist but were not captured.
- The churned user (P7) was the only non-active participant; the churned perspective is valuable but underrepresented . a follow-up study focused on churned users would strengthen the churn-related findings.

### Raw Notes

Interview transcripts and raw notes are stored in the Brainshelf research repository (internal). Summary cards for each participant are available in the team's Notion workspace.
