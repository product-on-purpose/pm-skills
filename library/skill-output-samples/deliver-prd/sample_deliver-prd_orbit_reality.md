---
artifact: prd
repo_version: "2.5.0"
skill_version: "2.0"
created: 2026-02-20
status: sample
thread: orbit
context: Orbit async workspace . Orbit Digest PRD (realistic-prompt variant)
---

# Sample: Orbit Digest . Product Requirements Document
*Skill:* `deliver-prd` | *Thread:* Orbit | *Prompt variant:* realistic input

> **About this file:** Same scenario and output as `sample-01.md`. The only difference
> is the prompt . this version shows what a PM would realistically type before a sprint
> planning meeting, rather than a fully pre-structured brief. The output quality is
> identical, which is the point.

---

## Scenario

Orbit is a B2B async workspace platform at Series B, scaling from SMB to mid-market enterprise. After a discovery sprint interviewing eight enterprise trial non-converters, the PM team found that fewer than 20% [fictional] of async video updates are watched by teammates within 48 hours of posting, starving pilots of the shared context needed to justify a paid seat. A follow-up hypothesis test with six enterprise pilot teams showed that surfacing a short AI-generated text summary before the video player loads increased update open rate from 17% to 23% [fictional]. This PRD formalizes Orbit Digest for engineering handoff ahead of the May 2026 enterprise summit.

### Source Notes
- Atlassian acquired Loom for $975M in October 2023, establishing the enterprise market for async video . Atlassian press release, Oct 2023: https://www.atlassian.com/company/news/press-releases/atlassian-acquires-loom
- Buffer's annual State of Remote Work consistently identifies async communication gaps as a leading collaboration challenge for distributed teams . Buffer, "State of Remote Work 2023": https://buffer.com/state-of-remote-work/2023
- GitLab's Remote Work Report identifies "information overload" as a top pain point even for async-first teams . GitLab, "Remote Work Report 2022": https://about.gitlab.com/company/culture/all-remote/remote-work-report/

---

## Prompt

```
/prd

Need to write the PRD for Orbit Digest. Sprint planning is Thursday so want to get
this to Maya's team before then.

Context: we've been losing enterprise trials because people post async updates and
nobody watches them. Discovered this in the non-converter interviews a few weeks back .
open rates are terrible, something like less than 20% in 48 hours [fictional]. We
tested showing a short AI-generated summary above the video player with a few pilot
teams and it moved open rates from ~17% to ~23% [fictional], so we're ready to build.

The feature: after someone posts an async video update, we generate a 3-5 sentence
summary from the transcript and show it above the video. Creator can edit or hide it
if it's wrong. Channel admins can toggle Digest on/off. Enterprise plan only to start
(cost reasons).

Technical stuff that's already decided:
- HLS for video delivery (Maya's team has the ADR)
- Whisper self-hosted for transcription . we ran the spike, ruled out Deepgram
  and AssemblyAI
- No confidence score shown to users, it actually made them trust it less

Goals: fix our enterprise trial-to-paid conversion (sitting at 19% [fictional]) by
making sure updates actually get seen. Targeting ~30% open rate and ~26% conversion
within 6 months [fictional]. Want most enterprise workspaces using it within the first
month [fictional].

Out of scope: retroactive summarization, anything for live meetings. Isabel (legal)
is still sorting out the AI content policy piece so that's a risk.

Key people: Maya Okonkwo (eng lead), Priya Nair (design), Diego Flores (sales),
Isabel Chen (legal). Hard deadline: GA by May 2 for the enterprise summit.
```

---

## Output

# PRD: Orbit Digest

## Overview

### Problem Statement

Enterprise teams at Orbit create async update channels to replace synchronous standups and
review cycles, but fewer than 20% [fictional] of video updates are watched by teammates
within 48 hours of posting. Without shared context before a video plays, recipients cannot
determine whether a 4-minute async update is relevant enough to open . so they defer,
forget, and eventually stop watching. This creates information silos that directly stall
Orbit's enterprise trial-to-paid conversion rate, currently at 19% [fictional].

### Solution Summary

Orbit Digest is an AI-generated text summary (3 - 5 sentences) surfaced inline above the
video player for each async update on Digest-enabled channels. The summary is generated
automatically from the video transcript as soon as processing completes, giving recipients
the shared context they need to decide whether to watch . without requiring creators to
write separate description text.

### Target Users

- **Primary:** Async update recipients . enterprise team members who receive updates in
  Orbit channels and must decide whether to watch them
- **Secondary:** Async update creators . team leads and PMs whose updates need to be seen;
  Digest lowers the "will anyone watch this?" anxiety by giving context before the play button
- **Admin:** Workspace and channel admins who configure Digest defaults for their teams

## Goals & Success Metrics

### Goals

1. Increase async update open rate within enterprise workspaces, reducing the information
   silo that stalls enterprise trial-to-paid conversion
2. Drive Digest adoption as a default async workflow pattern, not an opt-in edge case
3. Improve enterprise trial-to-paid conversion by eliminating the context gap that causes
   pilot teams to disengage before value realization

### Success Metrics

| Metric | Current Baseline | Target | Timeline |
|--------|-----------------|--------|----------|
| Async update open rate (enterprise workspaces) | 17% [fictional] | 30% [fictional] | 90 days post-GA |
| Enterprise trial-to-paid conversion | 19% [fictional] | 26% [fictional] | 6 months post-GA |
| Digest adoption (enterprise workspaces with Digest on ≥1 channel) | 0% | 60% [fictional] | 30 days post-GA |
| Creator satisfaction score (post-launch NPS survey) | N/A | ≥45 [fictional] | 60 days post-GA |

### Non-Goals

- Retroactive summarization of existing video libraries (deferred . privacy review and
  cost modeling required for recordings made before Digest existed)
- Live session transcription and summary (different use case; scoped separately)
- Summaries on public or externally shared channel links (legal review required; deferred
  to v1.1)
- AI confidence score displayed on any user-facing surface (explicitly excluded per
  solution brief; confidence indicators were found to reduce trust rather than build it)
- Global search indexing of summary text (future capability; instrumentation will capture
  data to inform feasibility in v1.1 planning)

## User Stories

| ID | User Story | Priority |
|----|-----------|----------|
| US-1 | As an async update recipient, I want to see a 3 - 5 sentence summary before the video loads so that I can decide whether the update is relevant to act on now | P0 |
| US-2 | As an async update creator, I want my update's summary to generate automatically so that I don't have to write a description manually | P0 |
| US-3 | As a creator, I want to edit or regenerate the summary if it's inaccurate so that I'm in control of what teammates see | P0 |
| US-4 | As a channel admin, I want to enable or disable Digest as the default for new updates in my channel so that I can control the experience for my team | P1 |
| US-5 | As a creator, I want to hide the summary on a specific update so that I can preserve deliberate ambiguity (e.g., a team recognition surprise) | P1 |
| US-6 | As a workspace admin, I want to set a workspace-level Digest default so that new channels inherit my team's preferred behavior | P1 |

See [Orbit Digest User Stories](#) for full acceptance criteria.

## Scope

### In Scope

- Automatic summary generation for all new async video updates posted to Digest-enabled
  channels
- Inline summary display in thread view, above the video player, below creator name and
  timestamp
- Creator controls: regenerate summary, edit summary inline, hide summary for this update
- Channel-level Digest toggle (admin and creator roles): on/off for new updates in this
  channel
- Workspace-level Digest default (workspace admin role): on for Enterprise plan, off for
  Starter/Free
- Summary visibility state stored per update: `generating` / `ready` / `hidden` /
  `custom_edited`
- Failed transcription handling: graceful "Summary unavailable" fallback with no broken UI

### Out of Scope

- Retroactive summarization of videos posted before Digest release date
- Live session transcription and summary
- Summaries for public or externally shared channel links
- AI confidence score on any user-facing surface
- Translation of summaries (transcript language detected; summary generated in the same
  language . multi-language parity is a v1.2 R&D track)
- Summary search indexing in global search
- Summary export or API access

### Future Considerations

- **Retroactive summarization (v1.1):** High value for existing video libraries; blocked
  by cost modeling and privacy review for pre-Digest recordings . targeting Q3 2026
- **External channel summaries (v1.1):** Legal has open questions on data handling for
  guest-accessible content; will resolve during v1 legal review
- **Multi-language support (v1.2):** Auto-detect transcript language and generate summary
  in the same language . dependent on Whisper multilingual benchmark results
- **Summary API (future):** Expose summaries via Orbit's developer API for third-party
  integrations . deferred until adoption data validates demand

## Solution Design

### Functional Requirements

#### Summary Generation

- FR-1: When a video update is posted to a Digest-enabled channel, the system initiates
  transcription via the self-hosted Whisper pipeline within 60 seconds of upload completion
- FR-2: Once transcription completes, the summarization service generates a 3 - 5 sentence
  summary from the transcript text
- FR-3: Updates shorter than 60 seconds do not generate a Digest; the Digest area is
  hidden for those updates with no indicator shown
- FR-4: If transcription fails (network error, unsupported audio format, empty transcript),
  the Digest area displays "Summary unavailable" with a creator-only retry link
- FR-5: Summary generation runs asynchronously; the video update is accessible and
  watchable before the Digest is ready

#### Digest Display

- FR-6: In thread view, the Digest summary appears between the creator metadata row and
  the video player; summaries exceeding 120 characters in the collapsed state truncate
  with a "Show more" toggle
- FR-7: Recipients who have already watched the video see the Digest summary in a visually
  distinct "seen" state (muted text color) to reduce redundancy
- FR-8: Hidden summaries (creator-suppressed) show no Digest area and no indication that a
  summary exists
- FR-9: Custom-edited summaries display identically to auto-generated summaries; no
  "edited" indicator is shown to recipients

#### Creator Controls

- FR-10: Creators see a Digest action menu on their own updates (Digest icon or three-dot
  menu): Regenerate, Edit, Hide
- FR-11: "Regenerate" triggers a new summarization pass from the existing transcript;
  replaces the current summary on completion
- FR-12: "Edit" opens an inline text editor pre-populated with the current summary; saves
  on blur or explicit "Save" action; stored as `custom_edited` state
- FR-13: "Hide" removes the summary from recipient view immediately and stores the
  `hidden` state; reversible via "Show summary" in the same menu

#### Channel and Workspace Settings

- FR-14: Channel admins access Digest settings from the channel settings panel: toggle
  Digest on/off for new updates in this channel
- FR-15: Workspace admins set the Digest default for new channels (default: on for
  Enterprise plan, off for Starter/Free)
- FR-16: Changing channel Digest settings does not retroactively affect already-posted
  updates

### User Experience

**Recipient flow (core case):**
1. Recipient opens Orbit thread containing a new async update
2. Digest summary loads inline above video player (Orbit Digest icon + 3 - 5 sentence text)
3. Recipient reads summary, decides to watch → clicks play on the video below
4. On return visit, summary displays in "seen" muted state

**Creator flow (post-posting):**
1. Creator posts update to a Digest-enabled channel
2. Update appears immediately with a "Digest generating…" placeholder
3. Within approximately 2 minutes [fictional], the placeholder is replaced by the generated
   summary
4. Creator reviews summary → edits one sentence → saves → summary updates for all
   recipients immediately

**Admin setup flow:**
1. Channel admin opens Channel Settings → Digest tab
2. Toggles Digest on for this channel
3. All future updates in this channel auto-generate Digest summaries

See [Orbit Digest Design Specs . Figma](#) for full mockups, error states, mobile
layouts, and animation specs.

### Edge Cases

| Scenario | Expected Behavior |
|----------|------------------|
| Video shorter than 60 seconds | No Digest generated; Digest area hidden entirely |
| Silent video or screen recording with no speech | Digest area shows "Summary unavailable" with creator retry link |
| Creator deletes video update after Digest generated | Summary soft-deleted with the parent update; no orphaned records |
| Creator re-uploads or trims the video | Existing summary persists; creator prompted: "Your video changed . regenerate summary?" |
| Non-English transcript detected | Summary generated in the detected language; Digest label updated (e.g., "Digest . Français") |
| Whisper pipeline backlog exceeds 5 minutes | "Digest generating…" placeholder remains; creator notified in-product when Digest is ready |
| Workspace downgrades from Enterprise to Starter | Digest toggle disabled for new updates; existing summaries remain visible |

## Technical Considerations

### Constraints

- Summary generation must not block video upload or playback . runs fully asynchronously
  and independently of the video delivery pipeline
- Self-hosted Whisper pipeline introduces per-video compute cost; Digest is gated to
  Enterprise plan at launch to maintain unit economics within the target threshold of
  less than $0.04 [fictional] per video processed at expected enterprise volume
- Summaries for confidential channels must be encrypted at rest (same classification as
  the channel's video content)
- The 60-second minimum video length threshold is a product decision to manage compute
  cost, not a Whisper technical constraint; revisit in v1.1 data review

### Integration Points

- **Transcription pipeline (Whisper, self-hosted):** Receives video ID and storage URL on
  upload completion; returns transcript JSON; confidence metadata captured but not surfaced
  in UI
- **Summarization service (internal LLM inference):** Consumes transcript JSON; returns
  summary string; 30-second request timeout with graceful retry
- **Notification service:** Sends in-product notification to creator when Digest completes
  for jobs delayed beyond 5 minutes in queue
- **Channel settings API:** Exposes Digest toggle state per channel; consumed by mobile and
  desktop clients
- **Audit log:** Digest creation, edit, and hide events logged for enterprise audit
  compliance

### Data Requirements

- Summary stored as a field on the existing `video_update` record; no new table required
- Summary state machine: `generating` → `ready` | `failed`; from `ready` → `hidden` |
  `custom_edited`
- Soft-delete: summary inherits the deletion behavior of its parent `video_update` record
- Retention: summary text subject to workspace data retention policy (treated as derived
  metadata, same as video metadata)
- Privacy: summary excluded from data exports that exclude video content

## Dependencies & Risks

### Dependencies

| Dependency | Owner | Status | Impact if Delayed |
|------------|-------|--------|-------------------|
| Whisper self-hosted pipeline (capacity sizing for enterprise volume) | Platform Team | In review | Blocks FR-1 through FR-5; no Digest without transcription |
| Summarization LLM service (internal inference endpoint) | AI Platform Team | In development | Blocks summary generation; extractive fallback possible but degraded quality |
| Channel settings API v2 | Core API Team | Planned, Q1 2026 | Blocks FR-14 and FR-15; Digest toggle unavailable |
| Figma design handoff (Digest component library) | Priya Nair (Design) | In review | Delays frontend kick-off by 1 sprint |
| Legal sign-off on AI-generated content policy | Isabel Chen (Legal/Privacy) | In progress | Blocks GA; must resolve before launch |

### Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Transcription accuracy below threshold for domain vocabulary (product jargon, engineering terms) | Medium | High | Add domain vocabulary tuning list to Whisper config; ship with "report inaccurate summary" creator feedback link |
| Summary quality insufficient for enterprise pilot users | Medium | High | Pre-GA review with 3 enterprise pilot accounts; iterate on summarization prompt template before GA |
| Compute cost exceeds unit economics threshold at scale | Low | High | Gate to Enterprise plan only; instrument per-video cost in first 30 days post-GA; revisit Starter inclusion in v1.1 |
| Legal review delays GA past May 2 enterprise summit | Medium | High | Start legal review in parallel with engineering this week; prepare "soft launch" plan scoped to non-enterprise workspaces as contingency |
| Creator confusion between "Edit" and "Regenerate" actions | Low | Low | Distinct UX copy and tooltips; monitor "edit then immediately regenerate" behavioral signal post-launch |

## Timeline & Milestones

| Milestone | Description | Target Date |
|-----------|-------------|-------------|
| Engineering kick-off | PRD handoff; sprint planning with Maya's team | Mar 3, 2026 |
| Backend complete | Transcription pipeline integration; summarization API; channel settings API v2 | Mar 28, 2026 |
| Frontend complete | Digest display component; creator controls; admin settings; error states | Apr 11, 2026 |
| Legal sign-off | AI content policy and privacy review complete | Apr 14, 2026 |
| Closed beta | Digest enabled for 50 [fictional] enterprise pilot workspaces; structured feedback collection | Apr 18, 2026 |
| Beta review | PM + Design review of pilot feedback; bug fixes only, no new features | Apr 25, 2026 |
| GA launch | Full rollout to all Enterprise plan workspaces (~15,000 [fictional] teams) | May 2, 2026 |

## Open Questions

- [ ] **Minimum video length threshold** . Is 60 seconds the right cutoff, or should
  engineering expose this as a configurable constant for faster post-launch iteration?
  Owner: Marcus Webb (PM)
- [ ] **Summary regeneration limit** . Should we cap regenerations per update to prevent
  compute abuse? (Proposed: 3 regenerations per update.) Owner: Maya Okonkwo (Engineering)
- [ ] **External channel Digest (v1.1 scope)** . If legal review resolves before GA, can
  we include external channel support in v1 without scope risk? Owner: Isabel Chen
  (Legal/Privacy)
- [ ] **Extractive fallback** . If the LLM summarization service is unavailable, should we
  fall back to an extractive summary (first 3 transcript sentences) or show "Summary
  unavailable"? Owner: AI Platform Team

## Appendix

### Related Documents

- [Problem Statement: Enterprise Async Engagement Gap](#)
- [Interview Synthesis: Enterprise Trial Non-Converters . 8 Interviews](#)
- [Hypothesis: Orbit Digest . AI Summaries Before Video](#)
- [Solution Brief: Orbit Digest](#)
- [ADR-2026-03: HLS vs. WebRTC for Async Video Delivery](#)
- [Spike: Transcription Vendor Evaluation (Whisper / Deepgram / AssemblyAI)](#)
- [Figma: Orbit Digest Design Specs](#)

### Revision History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | Feb 10, 2026 | Marcus Webb | Initial draft . problem, goals, user stories |
| 0.2 | Feb 14, 2026 | Marcus Webb | Added technical constraints; updated scope after ADR-2026-03 and spike results |
| 0.3 | Feb 17, 2026 | Marcus Webb | Incorporated Priya's UX flow review; added edge cases table; refined Non-Goals |
| 1.0 | Feb 20, 2026 | Marcus Webb | Final review complete; approved by Maya Okonkwo, Priya Nair, Diego Flores; Isabel Chen approval pending legal |
