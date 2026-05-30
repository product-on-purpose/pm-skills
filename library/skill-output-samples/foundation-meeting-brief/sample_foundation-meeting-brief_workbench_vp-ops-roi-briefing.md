---
title: "Foundation meeting brief: Workbench VP Ops ROI Briefing Prep"
description: "Sample output for foundation-meeting-brief skill applied to the workbench thread (vp-ops-roi-briefing)."
artifact: foundation-meeting-brief
version: 1.0
repo_version: 2.11.0
skill_version: 1.0.0
created: 2026-04-17
status: canonical
thread: workbench
context: vp-ops-roi-briefing
---

# Sample: foundation-meeting-brief. Workbench VP Ops ROI Briefing Prep

## Scenario

Workbench's PM david-pm prepares to brief VP Ops carlos-vp-ops on the ROI case for Blueprints enterprise expansion. Carlos is an operational-cost hawk who pushed back on Blueprints' Q1 investment. Three weeks of customer interviews (6 healthcare customers) just landed with strong positive signal. David has 45 minutes with carlos, followed by a shared decision meeting with the CEO the next day. This is enterprise-style prep: thorough prompt with full context.

Source Notes:
- Workbench is fictional; scenario reflects typical enterprise-SaaS VP-Ops dynamics
- All metrics `[fictional]`

## Prompt

```
foundation-meeting-brief "VP Ops briefing Monday 2pm EST 45 min, david-pm briefing carlos-vp-ops on Blueprints ROI case. Carlos pushed back on Blueprints Q1 investment (see 2026-02-05_14-00EST_q1-investment-review_recap.md). New evidence just landed: 6 healthcare customer interviews with strong positive signal (@customer-interview-synthesis.md). Goal: get carlos behind the Blueprints expansion case ahead of Tuesday CEO review. Include 2026-03-15_14-00EST_compliance-investment-case_recap.md as prior context."
```

## Output

```markdown
---
artifact_type: meeting-brief
version: 1.0
generated_at: 2026-04-27T09:00:00Z
generated_by_skill: foundation-meeting-brief

meeting_title: "Blueprints ROI Case VP Ops Briefing"
meeting_date: 2026-04-28
meeting_start_time: "14:00 EST"
meeting_type: stakeholder-review

project: blueprints
topics:
  - roi-case
  - q1-concerns
  - pre-ceo-alignment

attendees:
  - name: david-pm
    role: contributor
  - name: carlos-vp-ops
    role: decision-maker

stakeholders:
  - name: carlos-vp-ops
    position: "pushed back on Blueprints Q1 investment; cost-discipline focus; evidence-driven"

primary_ask: "Carlos verbal support for Blueprints expansion case ahead of Tuesday CEO review"

related_agenda: null

input_quality: high
confidence: high
visibility: private
status: draft
---

# Meeting brief: Blueprints ROI Case VP Ops Briefing

## Shareable summary

**Blueprints ROI Case VP Ops Briefing** | 2026-04-28
**Purpose**: Align VP Ops behind Blueprints expansion case before CEO review
**Top goals**:
1. Carlos verbal support ahead of Tuesday CEO review
2. Carlos names any unresolved concerns so we address them before CEO review
3. Agreement on ROI measurement approach (which metric, what cadence)
**Key risk**: Carlos blocks CEO review by raising unresolved concerns in CEO meeting rather than today
**Primary ask**: Carlos verbal support for Blueprints expansion case

---

## Full brief

### Context

- **Meeting**: VP Ops briefing, 2026-04-28 at 14:00 EST, 45 min
- **Format**: In-person (Carlos's office)
- **Attendees**: david-pm (presenting), carlos-vp-ops (decision-maker)
- **Follow-on**: Tuesday 2026-04-29 CEO review (where Carlos will either back or block)

### Background

- Carlos pushed back on Blueprints Q1 investment (2026-02-05_14-00EST_q1-investment-review_recap.md): concerns centered on ROI speculation vs. customer evidence
- Compliance investment case approved 2026-03-15 (2026-03-15_14-00EST_compliance-investment-case_recap.md), contingent on Q1 customer evidence
- Q1 customer evidence just landed: 6 healthcare customer interviews (customer-interview-synthesis.md); 5 of 6 indicate strong willingness-to-pay and specific workflow requirements
- Tuesday's CEO review will decide whether to fund Blueprints expansion for Q2/Q3

### Stakeholder reads

**carlos-vp-ops** (VP Ops)

- **Position on topic**: pushed back on Q1 investment on ROI-speculation grounds; cost-discipline focused; evidence-driven [confidence: high, from Feb 5 recap]
- **Stakes**: Carlos owns the cost-discipline narrative; a visible ROI miss damages it; he also owns operational-excellence narrative that Blueprints aligns with
- **Likely concerns**: "are 6 interviews sufficient evidence?"; "what's the sales-cycle assumption?"; "how does this affect Q2 capacity?"; "what does kill-criteria look like?"
- **Relationship state**: neutral; direct, data-first; will say no if data is thin; will champion if data is strong
- **Tactical notes**: lead with the customer-evidence specifics (5 of 6 willing-to-pay, specific workflow detail); frame Q2 investment with explicit ROI measurement and kill criteria; have the Tuesday-CEO-review deck ready to show so Carlos sees full argument

### Desired outcomes (ranked)

1. **Must achieve**: Carlos verbal support ahead of Tuesday CEO review (even "I won't block, but have these concerns" is acceptable)
2. **Should achieve**: Unresolved concerns surfaced today (not Tuesday) so we address them before CEO
3. **Nice to achieve**: Agreement on ROI measurement framework (specific metric, cadence, kill criteria)

### Key messages

1. "Customer evidence is specific and consistent: 5 of 6 healthcare customers expressed willingness-to-pay; all 6 described the same workflow requirement. This isn't 'we think customers want this'. it's 'we heard them say it.'"
2. "Q2 investment is $[fictional] 480K for a 6-month expansion pilot with explicit kill criteria at 3-month checkpoint."
3. "ROI measurement approach: 3 named healthcare customers signed for pilot by end Q3 at target ACV. If <2 of 3 by Q3-end, we reduce investment."

### Anticipated questions and responses

| Question | Prepared response |
|----------|-------------------|
| "Are 6 interviews enough evidence?" | Small sample with strong consistency beats large sample with weak signal. 5 of 6 = 83% same-direction signal. Willing to add 4 more interviews in Q2 as validation. |
| "What if healthcare customers don't convert to paid?" | Kill criteria addresses this: <2 of 3 named customers sign by end Q3 → investment reduces. Measurable checkpoint. |
| "How does Blueprints affect Q2 platform capacity?" | Separate conversation; platform team has already committed Q2 capacity (per 2026-03-15 recap). Blueprints doesn't consume that capacity. |
| "Why not wait for more evidence?" | Signal decay: healthcare buyers move on 6-month cycles; missing this window means waiting 6+ months for re-engagement. |

### Risks and tensions

- **Carlos blocks CEO review by raising new concerns Tuesday**: Mitigation. explicit ask today: "what concerns would you raise in front of CEO that you want to raise with me first?"
- **Meeting drifts to broader cost-discipline discussion**: Mitigation. upfront framing: "I have one specific ask today: your read on Tuesday's CEO review."

### Asks

- **From carlos-vp-ops**: verbal support for Tuesday CEO review, OR explicit concerns to address before Tuesday

### Success signals

- Carlos asks substantive customer-evidence questions (not just "I need more data")
- Carlos proposes additional kill-criteria or ROI-measurement specifics (indicates problem-solving)
- Carlos commits to Tuesday CEO review position before meeting ends

---

## Sources & References

### Primary inputs

- User-provided context: thorough prompt with pre-read references and stakeholder dynamics
- 2026-02-05_14-00EST_q1-investment-review_recap.md (Carlos Q1 pushback context)
- 2026-03-15_14-00EST_compliance-investment-case_recap.md (compliance approval, Q1 evidence contingency)
- customer-interview-synthesis.md (6 healthcare customer interviews)

### Referenced artifacts

- Agenda: none (bilateral prep meeting)
- Prior recaps on this topic: 2026-02-05_14-00EST_q1-investment-review_recap.md, 2026-03-15_14-00EST_compliance-investment-case_recap.md

### External references

- [Customer interview synthesis](https://notion.example/blueprints-customer-interviews) [fictional]
- [Tuesday CEO review deck](https://slides.example/blueprints-ceo-review) [fictional]

### Generation context

- **Generated**: 2026-04-27T09:00:00Z
- **Skill version**: 1.0.0
- **Input quality**: high. enterprise-style prompt with full context, pre-reads, prior-recap references
- **Overall confidence**: high. Carlos position directly attested in prior recap; anticipated questions inferred from typical VP-Ops patterns
- **Known gaps**: None identified
- **Inferences applied**: Carlos's likely concerns inferred from prior recap + VP-Ops role pattern [confidence: high]
- **Anti-meeting check**: Ran. synchronous value: relationship-building (pre-CEO alignment) + conflict-resolution (Carlos's Q1 concerns); sync format essential
```
