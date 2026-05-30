---
name: foundation-meeting-synthesize
description: Cross-meeting archaeology skill. Consumes multiple meeting recaps (or raw notes) over a period and surfaces patterns invisible in any single meeting. Shows how decisions evolved, who has been saying what, where threads are stalling, and where contradictions have emerged. Produces a plain-text timeline, themes with confidence markers, stakeholder position tracking, consolidated decision list, contradiction flags, open items, narrative summary, and prioritized follow-ups.
license: Apache-2.0
metadata:
  classification: foundation
  version: "1.0.1"
  updated: 2026-04-22
  category: meeting
  frameworks: [meeting-skills-family]
  author: product-on-purpose
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
# Meeting Synthesize

Meeting synthesis is the archaeology skill for multi-meeting initiatives. It consumes a set of meeting recaps (and optionally raw notes) over a period, and surfaces patterns that no single meeting reveals: how decisions evolved, how stakeholder positions shifted, where threads are stalling, where contradictions have emerged.

Distinct from `/discover-interview-synthesis`: that skill works on user-research conversations with research-specific frameworks (jobs-to-be-done, buying insights). This skill works on internal org meetings with org-specific patterns (stakeholder alignment, decision evolution, project history).

This skill belongs to the Meeting Skills Family. It conforms to the [Meeting Skills Family Contract](../../docs/reference/skill-families/meeting-skills-contract.md).

## When to Use

- Board prep or exec-brief preparation across a meeting sequence
- Onboarding a new team member into the history of an initiative
- Project retrospective input (the story of how we got here)
- Investigating why a multi-meeting initiative has stalled
- Quarterly review of a topic that has crossed many meetings
- Surfacing contradictions that no single-meeting reviewer caught

## When NOT to Use

- Single-meeting summary. Use `foundation-meeting-recap` instead.
- Communicating outcomes outward. Use `foundation-stakeholder-update`.
- User research conversation synthesis. Use `/discover-interview-synthesis`.

## Zero-friction execution

Per the family contract, this skill never blocks on interrogation. Default flow:

1. Load all provided source files (recaps preferred, raw notes accepted with lower input-quality flag)
2. Apply any filters (time range, topic, stakeholder)
3. Run inference on themes, stakeholder evolution, contradictions
4. Present a brief inference summary (meeting count after filter, time range detected, per-source input quality, scope filter applied)
5. Accept `go` or corrections
6. Produce the synthesis

If invoked with `--go`, skip the inference summary. Format hints (`board-prep`, `onboarding`, `retro-input`, `exec-brief`) control output presentation without changing the underlying process.

## Instructions

When asked to create a meeting synthesis, follow these steps:

1. **Load sources**
   Read all provided recap filenames or note files. Parse frontmatter to extract meeting metadata. Note per-source input quality (recap frontmatter's `input_quality` if available; otherwise assess from content).

   **Metadata source tracking** (v1.1.0): for each recap, also note the `meeting_type_source` field (`explicit | inferred | null`). When synthesizing across mixed sources, the synthesis must document the mix explicitly in the Scope section: "meeting_type values: N explicit, M inferred, K null." This prevents non-reproducible results when filtering by meeting_type across a mix of confidence levels. If filtering by `meeting_type`, state whether the filter includes inferred values and how null values are handled.

2. **Apply filters**
   If time range, topic, or stakeholder filter provided, narrow the source set before proceeding. Record the filter applied in frontmatter `scope_filter`.

3. **Present go-mode inference summary**
   Meeting count after filter, time range detected from source metadata, per-source input quality levels, scope filter description.

4. **Build the plain-text timeline**
   Chronological order by `meeting_date`. Each entry shows date, meeting name, key decision or shift, and confidence or contradiction flag if applicable. Render as markdown (no binary images. must render everywhere).

5. **Extract themes**
   Cluster recurring topics across sources. For each theme, record description, sources where it appeared, and confidence marker tied to frequency ("appears in 5/5 meetings" → high; "appears in 2/5 meetings" → medium; "mentioned in 1 meeting" → low).

6. **Track stakeholder positions**
   For each named stakeholder across sources, record initial position → current position, alignment state (aligned / divergent / shifting), and key statements with dates. Flag confidence on each position based on whether it was direct-quoted or paraphrased.

7. **Consolidate decisions**
   Cross-meeting, sorted chronologically. Table format: Date | Decision | Context | Meeting | Confidence.

8. **Separate decision evolution from unresolved contradictions** (v1.1.0)
   Two distinct outputs, not one combined "contradictions" section:
   - **Decision evolution** (resolved): earlier decision → later decision on the same topic, where the later one supersedes. This is historical context, not a red flag. No `⚠` emphasis.
   - **Unresolved contradictions**: decisions or positions currently in conflict that need reconciliation. Use `⚠` visual emphasis. For each:
     - Earlier reference (meeting + date + decision)
     - Later reference (meeting + date + decision that conflicts)
     - Status: unresolved / needs reconciliation
   
   The distinction matters because v1.0.0 conflated them, creating false-positive "contradictions" in exec contexts where the "contradiction" was actually intentional scope evolution.

9. **Identify open items and stalled threads**
   Topics surfacing 2+ times without resolution. When they last appeared.

10. **Draft narrative summary**
    2-3 paragraphs: what happened, what changed, where we are, what is at stake. The "story" of the meeting set.

11. **Prioritize follow-up suggestions**
    - High: unblocking now; suggested owner or forum
    - Medium: important but not blocking
    - Low: monitor
    Each with rationale.

12. **Apply format hint** (if provided)
    One process generates the full synthesis data. The hint controls section ordering and truncation for the specific use case:
    - `board-prep`: lead with narrative + contradictions + prioritized follow-ups; shorter timeline
    - `onboarding`: lead with narrative + stakeholder tracking; full timeline
    - `retro-input`: lead with themes + stalled threads + meeting-quality aggregate
    - `exec-brief`: TL;DR + top 3 items only

13. **Render TEMPLATE.md and validate**
    - `source_meetings` list is non-empty
    - `time_range.start` ≤ `time_range.end`
    - Every theme has a confidence marker
    - Every contradiction has before/after source citations
    - At least 1 prioritized follow-up

## Quality checklist

- [ ] Source meetings listed with filename + date + per-source input quality
- [ ] Time range populated and sensible
- [ ] Scope filter described (or "none applied")
- [ ] Timeline is plain-text markdown (no binary images)
- [ ] Themes include confidence markers tied to frequency
- [ ] Stakeholder position tracking shows evolution (initial → current), not just snapshot
- [ ] Consolidated decision list is chronological with source citations
- [ ] Contradictions are flagged in their own first-class section (not buried)
- [ ] Narrative summary is 2-3 paragraphs, not bullets
- [ ] Follow-ups are prioritized (High / Medium / Low) with rationale
- [ ] Frontmatter omits single-meeting fields (meeting_title, meeting_date, etc.)
- [ ] Sources and References weights input quality across sources

## See also

- [Meeting Skills Family Contract](../../docs/reference/skill-families/meeting-skills-contract.md)
- [`foundation-meeting-recap`](../foundation-meeting-recap/SKILL.md). upstream: primary input source
- [`/discover-interview-synthesis`](../discover-interview-synthesis/SKILL.md). sibling pattern for user-research conversations (different domain)
