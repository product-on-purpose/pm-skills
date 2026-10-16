---
artifact_type: meeting-brief
version: 1.0
generated_at: 2026-04-17T09:00:00Z
generated_by_skill: foundation-meeting-brief

meeting_title: "Q2 Roadmap Commitment with CFO"
meeting_date: 2026-04-18
meeting_start_time: "15:00 EST"
meeting_type: exec-briefing

project: q2-roadmap
topics:
  - commitments
  - capacity

attendees:
  - name: jonathan
    role: decision-maker
  - name: priya-cfo
    role: decision-maker
  - name: maria-cpo
    role: contributor

stakeholders:
  - name: priya-cfo
    position: "wants to hold line on eng capacity; skeptical of scope creep"
  - name: maria-cpo
    position: "supports v2 ship; wants search feature in Q2"

primary_ask: "CFO signoff on eng capacity for search feature in Q2 despite Q1 overrun"

related_agenda: null

input_quality: high
confidence: medium
visibility: private
status: draft
---

# Meeting brief: Q2 Roadmap Commitment with CFO

## Shareable summary

**Q2 Roadmap Commitment with CFO** | 2026-04-18
**Purpose**: Secure CFO signoff on engineering capacity allocation for search feature in Q2
**Top goals**:
1. CFO verbal yes on search feature capacity allocation
2. Agreement on how Q1 overrun gets absorbed without cutting Q2 scope
3. Clear check-in cadence for Q2 (monthly review vs. ad-hoc)
**Key risk**: CFO uses Q1 overrun to impose capacity cap that would force scope cut
**Primary ask**: CFO signoff on eng capacity for search feature in Q2 despite Q1 overrun

---

## Full brief

### Context

- **Meeting**: Q2 Roadmap Commitment, 2026-04-18, 45 min
- **Format**: In-person (CFO office)
- **Attendees and roles**: jonathan (decision-maker, running this), priya-cfo (decision-maker), maria-cpo (contributor, supporting)
- **Chair or facilitator**: jonathan

### Background

- Q1 search feature work overran by 15% [fictional] on eng hours; scope held but deadline slipped 2 weeks [fictional]
- CFO has been vocal in leadership about "disciplined capacity" this year; Q1 overrun landed during her messaging
- Maria (CPO) already signaled private support for search in Q2; this is a two-on-one dynamic
- Prior exec review on 2026-03-20 flagged Q1 overrun [fictional] but did not set a capacity policy [fictional]; this meeting may be where that policy lands

### Stakeholder reads

**priya-cfo** (CFO)

- **Position on topic**: wants to hold line on eng capacity; skeptical of scope creep on search after Q1 overrun [confidence: high, from prior exec review comments]
- **Stakes**: accountability for delivering financial discipline messaging; a Q2 overrun would damage that narrative
- **Likely concerns**: "why should I trust Q2 commitments after Q1 slipped?"; "what stops this from happening again?"; "what's the cost if we cut scope instead?"
- **Relationship state**: neutral; worked together for 2 years [fictional]; she's direct but fair; respects data, impatient with handwaving
- **Tactical notes**: lead with data on Q1 root cause (not excuses); offer specific capacity discipline mechanism (monthly review); have a pre-committed scope-cut fallback ready to show you thought about it

**maria-cpo** (CPO)

- **Position on topic**: supports v2 ship; wants search feature in Q2 [confidence: high, confirmed in 1:1 yesterday]
- **Stakes**: her product strategy relies on search shipping Q2; any cut affects broader product narrative
- **Likely concerns**: if CFO pushes for scope cut, she wants to back the PM's specific proposal rather than improvise
- **Relationship state**: strong; aligned on substance
- **Tactical notes**: prep her before the meeting on the specific asks so she reinforces rather than improvising; have her in supporting-speaker role, not co-presenter (keeps dynamic focused)

### Desired outcomes (ranked)

1. **Must achieve**: CFO verbal yes on search feature capacity in Q2
2. **Should achieve**: Agreement on how Q1 overrun is absorbed without Q2 scope cut
3. **Nice to achieve**: Monthly Q2 review cadence agreed (creates accountability mechanism CFO can trust)

### Key messages

1. "Q1 overrun had a specific identifiable cause (design handoff delay); we've added a handoff checkpoint to prevent recurrence. Root cause is addressed, not excused."
2. "Search feature in Q2 has a specific capacity ask: 8 eng-weeks. Here's the tradeoff map if any cut is needed."
3. "I'd like to propose a monthly Q2 review so you have a formal mechanism to catch issues early, not post-hoc."

### Anticipated questions and responses

| Question | Prepared response |
|----------|-------------------|
| "Why should I trust Q2 after Q1 slipped?" | Q1 root cause was design handoff delay (specific, now addressed via checkpoint). Not a capacity estimation issue. Happy to walk through the root-cause analysis. |
| "What if we cut scope instead?" | Here's the tradeoff map (show prepared doc). Cutting autocomplete saves 3 eng-weeks but removes the headline value prop; cutting filters saves 2 eng-weeks but strands existing users who asked for it. Specific impact per cut. |
| "What's the mechanism to prevent another overrun?" | Monthly Q2 review with explicit hours-burned and scope-remaining report. I'd welcome that cadence. |

### Risks and tensions

- **CFO uses Q1 overrun to impose a capacity cap that forces scope cut**: Mitigation. have the tradeoff map ready to make the cost of cutting visible, not abstract. Don't let "just cut scope" be a costless answer.
- **Meeting drifts to broader capacity policy discussion, postponing search decision**: Mitigation. explicit ask upfront: "I have 3 things I need today; happy to schedule a separate capacity-policy conversation."

### Asks

- **From priya-cfo**: verbal yes on search feature eng capacity for Q2 (8 eng-weeks)
- **From priya-cfo**: agreement on absorbing Q1 overrun from Q2 slack rather than cutting Q2 scope
- **From maria-cpo**: reinforce the scope rationale if priya pushes on cuts; do not co-present the ask (keeps the dynamic clean)

### Success signals

- priya-cfo engages with the tradeoff map (asks specific questions) rather than dismissing with generic capacity concerns
- priya-cfo proposes her own cadence mechanism, indicating she's problem-solving with us rather than gatekeeping
- maria-cpo stays in supporting role, not improvising new asks

---

## Sources & References

### Primary inputs

- User-provided context: "Brief me for CFO meeting tomorrow on Q2 roadmap"
- Yesterday's 1:1 with maria-cpo (verbally confirmed support)

### Referenced artifacts

- Agenda: none (no shared agenda; brief for jonathan's prep only)
- Prior recaps on this topic: 2026-03-20_15-00EST_exec-review_recap.md (referenced for Q1 overrun context)
- Related stakeholder summaries: stakeholder_priya-cfo.md (loaded)

### External references

- [Q2 capacity model](https://sheets.example/q2-capacity)
- [Search feature scope tradeoff map](https://notion.example/search-scope-tradeoffs)

### Generation context

- **Generated**: 2026-04-17T09:00:00Z
- **Skill version**: 1.0.0
- **Input quality**: high. user provided meeting context, stakeholder summary existed, prior recap referenced Q1 overrun dynamics
- **Overall confidence**: medium. stakeholder positions are high-confidence; anticipated questions are medium-confidence (inferred from typical CFO objections + priya's known style)
- **Known gaps**: Do not know if priya-cfo has spoken to maria-cpo 1:1 about this; if yes, she may already have a position shaped by those conversations
- **Inferences applied**: priya's likely concerns inferred from prior exec review + style [confidence: medium]; anticipated questions inferred from CFO-role patterns [confidence: medium]
- **Anti-meeting check**: Ran. override accepted (exec decision with relationship dynamic warrants sync conversation; async would risk misinterpretation of capacity commitment)
