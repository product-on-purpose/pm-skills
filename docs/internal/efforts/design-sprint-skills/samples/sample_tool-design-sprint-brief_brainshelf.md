---
skill: tool-design-sprint-brief
thread: brainshelf_book-catalog
scenario: Pre-sprint brief for the Brainshelf Design Sprint
status: spec-validation draft
purpose: Sample output for design validation; not a library sample
spec_section: design-sprint-design-spec.md section 2
prerequisite_artifact: sample_tool-design-sprint-readiness_brainshelf.md
---

# Design Sprint Brief: Brainshelf

## Challenge Title and Why Now

**Challenge:** Test whether the books-as-memory reader will adopt sub-3-second camera-first capture into a private library.

**Why now:** Brainshelf's pre-seed friends-and-family raise is targeted for Q3 2026. Founders need an evidence-backed product direction before committing capital to a 6-week MVP build. The Foundation Sprint produced a Founding Hypothesis but identified A1 (switchable-from-do-nothing) as the highest-risk assumption. The Design Sprint tests A1 directly.

## Sprint Questions

Each question maps to one or more rows in the Foundation Sprint assumption scorecard:

1. **Will target customers attempt camera-first capture in the first session?** (A1)
2. **Does camera capture feel intuitive at first try, or does it require explanation?** (A1)
3. **Does the OCR + cover-recognition resolution feel fast and accurate enough?** (A2)
4. **Does the recall flow (browsing past captures) feel useful when prompted by a recall scenario?** (A3, A6)
5. **Does the "private by default, no feed" framing get a positive reaction or feel like a missing feature?** (Day 1 Differentiation principle)
6. **Does the pricing concept (free tier with limit + paid sync) feel reasonable to the target customer?** (A5)

## Decider's Required Attendance Windows

| Day | Window | Reason |
|---|---|---|
| Monday | Full day | Map + Target selection |
| Tuesday | 10:00-11:00 | Sketches review checkpoint |
| Wednesday | 14:00-17:00 | Supervote + Storyboard ratification |
| Thursday | 15:00-16:00 | Prototype trial run review |
| Friday | Full day | Observation + scorecard + Decider call |

Alex has delegated authority for non-strategic calls on Tuesday afternoon and Thursday morning.

## Team Roster with Role Assignments

| Attendee | Sprint role |
|---|---|
| Jamie | Decider, Product context, post-sprint owner |
| Alex | Sketch lead, Storyboard lead, Prototype Maker (UI), Friday observer |
| Sam | Sketch participant, Prototype Maker (OCR API + capture flow), Friday observer |
| Riley | Customer context, Recruiter, Friday Interviewer, Post-interview synthesizer |

## Customer Recruiting Plan

| Element | Value |
|---|---|
| Target profile | Reads 25+ books/year; has tried at least one tracking tool and abandoned it; treats library as memory; age 28-58 |
| Source | Riley's book-blogger Discord and 1-degree referrals |
| Count | 5 participants (canonical Sprint count) |
| Compensation | $50 gift card per 60-minute interview |
| Screening | 5-question form (books/year, tools tried, why abandoned, format mix, willingness to be on Zoom) |
| Backup pool | 3 additional candidates in case of last-minute drops |
| Confirmed by | Thursday May 22 noon |

## Prototype Medium Decision

**Medium:** Clickable Figma prototype with iOS device tethering.

**Why:** Camera capture is the core flow; a clickable prototype with a real camera triggering scripted OCR mock is high-realism enough to test capture experience without requiring a working ML pipeline. Sam will integrate the actual Apple Vision OCR API into the prototype as a stretch goal to test recognition accuracy live.

**Why not:** Slideware (too static for capture flow); paper prototype (loses the tap-and-go feel); full coded prototype (Thursday is too short).

## Interview Format

**Format:** Remote, moderated, 1:1 video call.

**Why:** Riley's recruiting pool is geographically distributed (Discord-sourced). Remote is the natural setup. Moderation matters because the prototype needs guided handoff (here's a phone, try capturing a book in your home). Asynchronous testing is not viable for this challenge.

## Logistics Plan

| Element | Value |
|---|---|
| Working hours | 09:00 to 17:00 each day |
| Daily standup | 09:00 (15 min) |
| Lunch | 12:30 (45 min) |
| Day-end review | 16:45 |
| Team location | Hybrid (Jamie + Sam in-person at Seattle co-working; Alex + Riley remote on Zoom + Miro) |
| Friday interview location | Each customer joins from home; Brainshelf team observes from one shared Miro board |

## Success Criteria

The Design Sprint is successful if Friday produces clear evidence (Yes / No / Mixed) on each sprint question. Specifically:

- **Strong Go signal:** 4 of 5 customers attempt capture unaided, recall flow lands, pricing reasonable. Path forward: 6-week MVP build.
- **Strong Stop / Reframe signal:** 1 or 2 of 5 customers attempt capture; recall flow misses. Path forward: pivot to Red Bookstore Mode backup.
- **Mixed signal:** 3 of 5 customers, recall partial. Path forward: refine prototype, run a follow-up sprint week of June 9.

The Design Sprint is unsuccessful if Friday fails to produce a Decider call (build / iterate / re-sprint / stop / reframe). Adjourning without a call invalidates the week.

## Decider Checkpoint

**Decider sign-off required before Monday begins.**

- [x] Jamie confirms challenge scope and the 6 sprint questions.
- [x] Jamie confirms attendance windows and delegations.
- [x] Jamie confirms prototype medium (clickable Figma + iOS).
- [x] Jamie confirms customer recruiting profile and Thursday noon cutoff.
- [x] Jamie commits to a Decider call by 16:30 Friday.

**Signed:** Jamie (founder, PM), 2026-05-25 17:00 PT

---

*This sample represents the output a single invocation of `/tool-design-sprint-brief` would produce. Spec section: `design-sprint-design-spec.md` section 2.*
