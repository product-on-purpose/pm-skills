---
title: "Stakeholder Briefings: Brainshelf Resurface PRD"
description: "One Resurface PRD (Apple Mail Privacy handling) fanned out into Engineering, UX/Design, Data/BI, and Legal briefings for the Brainshelf consumer PKM app."
artifact: stakeholder-briefings
version: "1.0"
repo_version: "2.28.0"
skill_version: "1.0.0"
created: 2026-06-20
status: sample
thread: brainshelf
context: Brainshelf consumer PKM app - the Resurface morning-digest PRD projected to four stakeholder lenses ahead of the Sprint 8 build, with Apple Mail Privacy Protection as the cross-functional wrinkle
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Priya wrote the Resurface PRD (a daily morning email digest of saved items) and needs it to reach four teams at once before the Sprint 8 build kicks off: engineering needs the build shape, design needs the email layout direction, data needs the instrumentation, and legal needs to weigh in on email opt-in handling. The wrinkle that touches everyone is Apple Mail Privacy Protection (MPP), which pre-fetches images and inflates open rates, so the skill builds one neutral master and projects four briefings that each handle MPP in their own vocabulary without the versions disagreeing.

**Source Notes:**

- Brainshelf is fictional.
- All metrics [fictional].

## Prompt

```
/foundation-stakeholder-briefings @resurface-prd.md

sending the resurface prd around before sprint 8. need eng + design + data
+ legal versions. heads up: apple mail privacy is the thing that bites all
of them differently (open rates junk, image prefetch, etc). go
```

## Output

```markdown
# Stakeholder briefings: Resurface morning digest (PRD)

## Master document

**What and why**

- M1: Resurface is a daily morning email digest that delivers 3-5 saved items matched to the user's recent reading, creating the external trigger Brainshelf currently lacks.
- M2: The problem: users save ~47 items/month [fictional] but revisit fewer than 9% within 30 days [fictional]; the saved library is a guilt pile, not a reading resource.
- M3: Target segment is active savers (10+ items, active in last 30 days), ~9,800 users [fictional].

**Decisions**

- M4: v1 is email-only (no push, no in-app card), opt-in required, default send 7:30 AM local time, daily or 3x/week cadence.
- M5: Topic matching uses TF-IDF cosine similarity over the prior 7 days of activity; article text comes from Mercury Parser, with Open Graph title/description as fallback for the ~11% of URLs [fictional] where extraction fails.
- M6: Apple Mail Privacy Protection (MPP) pre-fetches and proxies tracking pixels, so email opens are inflated and unreliable; click-through, not open rate, is the primary behavioral metric.

**Status**

- M7: PRD approved; Sprint 8 build (Feb 3-16) not yet started; no email infrastructure exists, so domain auth (SPF/DKIM/DMARC) is week-1 critical path.
- M13: Success is measured by click-through rate and 7-day return rate, not open rate; the MPP-aware metric definition is that opens are never reported as a success signal.
- M14: Measurability needs campaign-event instrumentation (opt_in, email_sent, item_clicked, unsubscribe, plus the downstream return-visit) and a click-and-retention dashboard live before the A/B test; Mercury Parser extraction-failure rate and send/bounce counts serve as a delivery sanity check, not opens.

**Risks and open questions**

- M8: Deliverability on a cold sending domain is the top technical risk; digests could land in Promotions or spam without warm-up and proper auth.
- M9: MPP makes open rate uninterpretable, so any success read must lean on clicks; this changes both instrumentation and the layout (no open-pixel-dependent logic).
- M10: Email opt-in, one-click unsubscribe, and consent records carry CAN-SPAM and GDPR obligations that need legal sign-off before the digest sends to real users.

**Asks**

- M11: Lock the Sprint 8 scope and the MPP-aware metric definition so the build, the design, and the dashboard are consistent.

**Timeline**

- M12: Sprint 8 build Feb 3-16; setup/opt-in enrollment Mar 2-8; A/B test Mar 9 - Apr 5; decision Apr 11.

## Briefings

--- BEGIN: Engineering ---

**Draws on:** M4, M5, M6, M7, M8

**Primary ask:** Confirm domain auth (SPF/DKIM/DMARC) lands in Sprint 8 week 1 and that no send logic depends on the open event.

**Email-only v1; deliverability auth is week-1 critical path, and opens are not trustworthy**

**What this means for Engineering**

v1 is email-only, opt-in, 7:30 AM local, daily or 3x/week. The digest selects 3-5 items via TF-IDF cosine similarity over the last 7 days of activity; pull article text with Mercury Parser and fall back to Open Graph title/description for the ~11% of URLs [fictional] where extraction fails. We have no email infra today, so SPF, DKIM, and DMARC on the sending domain are the week-1 critical path: nothing sends cleanly until that is in place, and a cold domain risks Promotions/spam without it. One hard constraint from Apple Mail Privacy Protection: it pre-fetches and proxies the tracking pixel, so the open event is inflated and unreliable. Do not gate any logic (retries, "did they see it," follow-ups) on opens; instrument clicks as the real signal. Build the pipeline, opt-in backend, and matcher within the Sprint 8 window (Feb 3-16).

--- END ---

--- BEGIN: UX/Design ---

**Draws on:** M1, M4, M5, M6, M9

**Primary ask:** Approve a click-first, text-forward email layout that does not rely on images or the open event to deliver value.

**Design the email around the click, not the open: text-forward, image-light**

**What this means for UX/Design**

Resurface is the morning nudge that gets people back to the things they saved (and never returned to). The email shows 3-5 items matched to what they have been reading: title, source, topic tag, read time, each a direct link to the saved article. Two design constraints come straight from how email actually behaves. First, Apple Mail Privacy Protection pre-fetches images and proxies the pixel, so we cannot tell who opened, and image-heavy layouts can be stripped or delayed; the value has to land in scannable text and obvious links. Second, the success behavior we are designing for is the click through to read, not the open, so the layout should make "tap an item and start reading" the single most obvious action. Lean text-forward and image-light: it survives MPP, loads fast, and keeps the click front and center.

--- END ---

--- BEGIN: Data/BI ---

**Draws on:** M3, M6, M9, M11, M12, M13, M14

**Primary ask:** Stand up a click-and-retention dashboard (not open-rate-based) before the Mar 9 A/B test, with the MPP-aware metric definition locked.

**Open rate is dead on arrival; instrument clicks and retention for the A/B test**

**What this means for the Data team**

The eligible base is ~9,800 active savers [fictional], and the experiment runs Mar 9 - Apr 5 against control. The single most important thing to internalize: Apple Mail Privacy Protection inflates and proxies email opens, so open rate is not a usable metric for this feature. Build the success read on click-through rate and 7-day return rate, not opens. Instrument these events: opt_in, email_sent, item_clicked, unsubscribe, plus the downstream return-visit. The dashboard needs to be live before the test starts on Mar 9 or v1 ships blind, and the metric definitions (especially "we do not report opens as a success signal") need to be locked alongside the build and design so all three are consistent. If we want a delivery sanity check, use Mercury Parser extraction-failure rate and send/bounce counts, not opens.

--- END ---

--- BEGIN: Legal ---

**Draws on:** M4, M6, M10, M12

**Primary ask:** Sign off on the email opt-in, one-click unsubscribe, and consent-record handling before the first real-user send in the Mar 2-8 enrollment window.

**Commercial email means consent, unsubscribe, and a record we can stand behind**

**What this means for Legal**

Resurface sends recurring commercial email, which brings CAN-SPAM and GDPR obligations: explicit opt-in before any send, a working one-click unsubscribe in every message, and a durable record of when and how each user consented. The feature is opt-in by design and includes unsubscribe in the footer, so the structure is built to meet this, but it needs your sign-off before the first send to real users, which happens in the Mar 2-8 enrollment window. One privacy detail worth flagging for completeness: Apple Mail Privacy Protection proxies the tracking pixel, which actually reduces the open-tracking surface, and we have decided not to rely on opens at all, so the data we retain is consent state, unsubscribe events, and click events tied to the user's own account. Please confirm the opt-in language and unsubscribe handling are sufficient before enrollment begins.

--- END ---

---

## Translations applied (internal)

- "Apple Mail Privacy Protection (MPP) pre-fetches/proxies the tracking pixel" kept precise for Engineering and Data; rendered as "we cannot tell who opened, design around the click" for UX/Design and as "reduced open-tracking surface" for Legal *(audience: UX/Design, Legal)*.
- "TF-IDF cosine similarity" kept as-is for Engineering and Data; collapsed to "items matched to what they have been reading" for UX/Design.
- "SPF/DKIM/DMARC domain auth" kept precise for Engineering; not surfaced to UX/Design or Legal (not their decision).

**Flagged but kept** (may need review):

- "open rate is dead on arrival" - vivid shorthand for the Data block; precise but informal, confirm it reads right for an analyst audience.

## Sources and References

- Source artifact: resurface-prd.md [fictional]
- **Generated:** 2026-06-20T16:00:00Z | **Skill version:** 1.0.0 | **Audiences:** Engineering, UX/Design, Data/BI, Legal | **Input quality:** high
- **Invariant self-check:** 4 briefings; all Draws-on IDs resolve to M1-M14; one Primary ask each; master reviewed as audience-neutral.
```
