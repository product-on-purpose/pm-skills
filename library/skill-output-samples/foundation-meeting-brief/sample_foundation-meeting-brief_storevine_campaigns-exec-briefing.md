---
title: "Foundation meeting brief: Storevine Campaigns Exec Briefing Prep"
description: "Sample output for foundation-meeting-brief skill applied to the storevine thread (campaigns-exec-briefing)."
artifact: foundation-meeting-brief
version: 1.0
repo_version: 2.11.0
skill_version: 1.0.0
created: 2026-04-17
status: canonical
thread: storevine
context: campaigns-exec-briefing
---

# Sample: foundation-meeting-brief. Storevine Campaigns Exec Briefing Prep

## Scenario

Storevine's PM jonathan has a 30-minute exec briefing tomorrow with CEO priya-ceo and VP Product rachel-vp. The topic: Q2 commitment for Campaigns launch after Q1 research overran budget by 18%. Priya-ceo is cost-sensitive; rachel-vp backs jonathan privately. He needs a brief that prepares him for priya's likely pushback on capacity and frames the customer-value story cleanly.

Source Notes:
- Storevine is fictional; scenario reflects typical early-stage capacity-discipline dynamics
- All metrics `[fictional]`

## Prompt

```
foundation-meeting-brief "Tomorrow 9am exec briefing, 30 min with priya-ceo and rachel-vp. Campaigns Q2 commitment. Priya pushed back on capacity in Q1 exec review (I have the recap). Rachel privately supports."
```

## Output

```markdown
---
artifact_type: meeting-brief
version: 1.0
generated_at: 2026-04-16T17:00:00Z
generated_by_skill: foundation-meeting-brief

meeting_title: "Campaigns Q2 Exec Briefing"
meeting_date: 2026-04-17
meeting_start_time: "09:00 EST"
meeting_type: exec-briefing

project: campaigns
topics:
  - q2-commitment
  - capacity-context

attendees:
  - name: jonathan-pm
    role: contributor
  - name: priya-ceo
    role: decision-maker
  - name: rachel-vp
    role: contributor

stakeholders:
  - name: priya-ceo
    position: "cost-sensitive; pushed back on Q1 capacity; wants to hold line on Q2"
  - name: rachel-vp
    position: "private supporter; wants Campaigns in Q2; will back scope discipline"

primary_ask: "CEO greenlight for Campaigns Q2 launch with explicit capacity discipline mechanism"

related_agenda: null

input_quality: high
confidence: medium
visibility: private
status: draft
---

# Meeting brief: Campaigns Q2 Exec Briefing

## Shareable summary

**Campaigns Q2 Exec Briefing** | 2026-04-17
**Purpose**: Secure CEO greenlight for Campaigns Q2 launch given Q1 capacity overrun context
**Top goals**:
1. Priya verbal yes on Q2 Campaigns commitment
2. Agreement on a capacity-discipline mechanism (monthly review, sprint-week cap)
3. Clear signal on what "success" looks like for Q2 (numeric)
**Key risk**: Priya uses Q1 overrun to impose scope cap that forces feature deferrals
**Primary ask**: CEO greenlight for Campaigns Q2 launch + capacity discipline mechanism

---

## Full brief

### Context

- **Meeting**: Exec briefing, 2026-04-17 at 09:00 EST, 30 min
- **Format**: In-person (Priya's office)
- **Attendees**: jonathan-pm (presenting), priya-ceo (decision-maker), rachel-vp (contributor, private supporter)

### Background

- Q1 Campaigns research overran by 18% [fictional] due to a user-research round triggered by unexpected customer interview findings
- Priya-ceo was vocal in Q1 exec review (2026-03-20 recap) that "we need capacity discipline". her phrase
- Q1 overrun absorbed without slipping Q1 deliverables; but the overrun is the lens priya will view Q2 through
- Rachel-vp aligned with campaigns Q2 in 1:1 yesterday (2026-04-15); she'll speak if asked, won't co-present

### Stakeholder reads

**priya-ceo** (CEO)

- **Position on topic**: cost-sensitive; wants capacity discipline; skeptical of Q2 overrun risk [confidence: high. direct Q1 exec-review statements]
- **Stakes**: capacity-discipline messaging is one of her 2026 priorities; a visible capacity-failure undermines it
- **Likely concerns**: "how do we prevent another overrun?"; "what's the cost of cutting scope instead?"; "why Q2, not Q3 after we've settled capacity?"
- **Relationship state**: neutral; direct, data-driven, impatient with hedging
- **Tactical notes**: lead with Q1 root cause (specific, addressable), not excuses. Offer a named capacity-discipline mechanism. Have a scope-cut fallback ready to show you considered it.

**rachel-vp** (VP Product)

- **Position on topic**: private supporter; wants Q2 [confidence: high. 1:1 confirmation yesterday]
- **Relationship state**: strong
- **Tactical notes**: she's in supporting role; if priya asks for her view, she'll reinforce. Don't ask her to co-present. keeps the dynamic clean.

### Desired outcomes (ranked)

1. **Must achieve**: Priya verbal yes on Q2 Campaigns
2. **Should achieve**: Capacity-discipline mechanism agreed (monthly review or sprint-week cap)
3. **Nice to achieve**: Numeric success criterion for Q2 (conversion lift %, MAU delta, etc.)

### Key messages

1. "Q1 overrun had a specific cause: customer interviews surfaced a problem reframe we couldn't ignore. We've added a 'research-triggered scope review' checkpoint to prevent recurrence."
2. "Campaigns Q2 commitment is 8 sprint-weeks [fictional]. Here's the scope-cut map if you want to lock a tighter cap."
3. "I'd welcome a monthly Q2 review so you have a formal mechanism to catch issues early."

### Anticipated questions and responses

| Question | Prepared response |
|----------|-------------------|
| "Why should I trust Q2 after Q1?" | Q1 root cause was research-triggered scope change (specific, now addressed via checkpoint). Not capacity estimation. Walk-through ready. |
| "What if we cut scope?" | Scope-cut map prepared (show doc). Cutting SMS saves 3 sprint-weeks but cuts the headline value prop. Cutting segmentation saves 2 but leaves Campaigns under-differentiated. |
| "What does Q2 success look like?" | [fictional] 15% lift in repeat-merchant campaign engagement + 5% increase in campaign-sourced GMV. Monthly milestones available. |

### Risks and tensions

- **Priya uses Q1 overrun to cap Q2 capacity, forcing scope cuts**: Mitigation. scope-cut map makes cost visible; don't let "just cut scope" be costless.
- **Meeting drifts to broader capacity-policy discussion**: Mitigation. upfront ask: "I have one specific ask today; happy to schedule a separate capacity-policy conversation."

### Asks

- **From priya-ceo**: verbal yes on Q2 Campaigns (8 sprint-weeks, monthly review cadence)
- **From rachel-vp**: reinforce if priya asks for VP view; do not co-present

### Success signals

- Priya engages with scope-cut map (specific questions) vs. dismissing with generic capacity concerns
- Priya proposes her own cadence mechanism (indicates problem-solving with us, not gatekeeping)
- Rachel stays in supporting role

---

## Sources & References

### Primary inputs

- User-provided context: meeting request with stakeholder dynamics context
- 1:1 notes with rachel-vp on 2026-04-15

### Referenced artifacts

- Agenda: none (no shared agenda; this is jonathan's prep)
- Prior recaps on this topic: 2026-03-20_15-00EST_exec-review_recap.md (Q1 overrun context)

### External references

- [Q2 capacity model](https://sheets.example/q2-capacity) [fictional]
- [Campaigns scope-cut map](https://notion.example/campaigns-scope-cut) [fictional]

### Generation context

- **Generated**: 2026-04-16T17:00:00Z
- **Skill version**: 1.0.0
- **Input quality**: high. user provided context, history, stakeholder-1-position confirmed
- **Overall confidence**: medium. priya's position high-confidence; anticipated questions inferred from typical CEO patterns
- **Known gaps**: Numeric Q2 success target still aspirational
- **Inferences applied**: priya's likely concerns inferred from prior exec-review comments [confidence: high]; rachel's supporting-role positioning inferred from 1:1 signal [confidence: high]
- **Anti-meeting check**: Ran. synchronous value: relationship-building (exec trust) + conflict-resolution (capacity concern); sync format essential
```
