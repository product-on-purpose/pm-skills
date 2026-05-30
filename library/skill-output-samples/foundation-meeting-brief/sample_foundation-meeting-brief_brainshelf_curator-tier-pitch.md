---
title: "Foundation meeting brief: Brainshelf Curator Tier Founder Pitch"
description: "Sample output for foundation-meeting-brief skill applied to the brainshelf thread (curator-tier-pitch)."
artifact: foundation-meeting-brief
version: 1.0
repo_version: 2.11.0
skill_version: 1.0.0
created: 2026-04-17
status: canonical
thread: brainshelf
context: curator-tier-pitch
---

# Sample: foundation-meeting-brief. Brainshelf Curator Tier Founder Pitch

## Scenario

Brainshelf's PM priya-pm is pitching a new Curator subscription tier to the two co-founders (leo-cofounder-1 and noor-cofounder-2). Leo has been skeptical of subscription expansion; noor is open. Priya has 30 minutes at the weekly product meeting. Brainshelf is scrappy. no formal meeting templates, prompts are casual.

Source Notes:
- Brainshelf is fictional; scenario reflects post-seed consumer-PKM dynamics
- All metrics `[fictional]`

## Prompt

```
foundation-meeting-brief "weekly product mtg tomorrow, pitching curator tier to leo and noor, leo prob skeptical noor open, 30 min"
```

## Output

```markdown
---
artifact_type: meeting-brief
version: 1.0
generated_at: 2026-04-19T18:00:00Z
generated_by_skill: foundation-meeting-brief

meeting_title: "Curator Tier Pitch at Weekly Product Meeting"
meeting_date: 2026-04-20
meeting_start_time: "10:00 PT"
meeting_type: stakeholder-review

project: curator-tier
topics:
  - tier-pitch
  - concerns
  - decision-or-defer

attendees:
  - name: priya-pm
    role: contributor
  - name: leo-cofounder-1
    role: decision-maker
  - name: noor-cofounder-2
    role: decision-maker

stakeholders:
  - name: leo-cofounder-1
    position: "⚠ likely skeptical of subscription expansion [inferred: medium]"
  - name: noor-cofounder-2
    position: "⚠ open-but-not-committed [inferred: medium]"

primary_ask: "greenlight for a 4-week Curator tier experiment with explicit kill criteria"

related_agenda: null

input_quality: low
confidence: medium
visibility: private
status: draft
---

# Meeting brief: Curator Tier Pitch at Weekly Product Meeting

## Shareable summary

**Curator Tier Pitch** | 2026-04-20
**Purpose**: Greenlight a 4-week Curator tier experiment
**Top goals**:
1. Greenlight for 4-week experiment with explicit kill criteria
2. Agreement on which metric matters (retention vs. revenue)
3. Clear "what would change your mind" from leo if he says no
**Key risk**: Leo anchors meeting to subscription skepticism; noor doesn't push; defer result
**Primary ask**: greenlight for 4-week Curator tier experiment with kill criteria

---

## Full brief

### Context

- **Meeting**: Weekly product meeting slot, 2026-04-20 at 10:00 PT, 30 min
- **Format**: Remote (Zoom)
- **Attendees**: priya-pm (pitching), leo-cofounder-1 (decision-maker), noor-cofounder-2 (decision-maker)

### Background

- Curator tier concept has been on priya's roadmap for 6 weeks; first formal pitch
- Prior conversations have been informal; no written record of cofounder positions
- Brainshelf currently has a single paid tier (Pro at $8/mo [fictional]); Curator would add a premium tier at ~$16/mo [fictional] targeting power users who curate for others
- [fictional] User-research round (2026-03-18) identified 12% of Pro users who explicitly asked about "sharing curated sets". signal supporting the pitch

### Stakeholder reads

**leo-cofounder-1**

- **Position on topic**: ⚠ likely skeptical of subscription expansion [confidence: medium. inferred from user's offhand characterization, no direct quote]
- **Stakes**: leo owns the pricing-strategy narrative with investors; adding a tier is a visible story change
- **Likely concerns**: "does Pro conversion suffer if Curator exists?"; "are we solving a real problem or assuming demand?"
- **Relationship state**: neutral; direct, data-first
- **Tactical notes**: lead with the user-research signal (12% explicit ask); frame as experiment with kill criteria, not a tier launch; bring specific economics not a concept

**noor-cofounder-2**

- **Position on topic**: ⚠ open-but-not-committed [confidence: medium. inferred]
- **Tactical notes**: noor will go with the data; if leo resists, noor won't push back hard alone. Give noor the ammo to back the experiment (specific research citation, specific kill criteria) so she's positioned to reinforce.

**⚠ Stakeholder positions inferred at medium confidence. Verify in meeting or adjust tactical-notes guidance accordingly.**

### Desired outcomes (ranked)

1. **Must achieve**: greenlight for 4-week experiment OR specific "what would change your mind" signal from leo
2. **Should achieve**: agreement on which metric matters (retention lift vs. revenue lift)
3. **Nice to achieve**: commitment to revisit in 5 weeks regardless of leo's initial position

### Key messages

1. "12% of Pro users explicitly asked for curated-sharing in user research (data citation). This isn't an assumption. it's a signal."
2. "I'm asking for a 4-week experiment with kill criteria, not a tier launch. If we hit <2% conversion or <10% retention lift, we kill it."
3. "Cost of the experiment: [fictional] ~3 eng-days + $300 in tools. Cost of doing nothing: we keep guessing about this segment."

### Anticipated questions and responses

| Question | Prepared response |
|----------|-------------------|
| "Does Pro conversion suffer if Curator exists?" | Honest answer: unknown; experiment designs around this (we'll watch Pro-conversion rate in parallel). If we see > 10% drop, we kill the experiment. |
| "Is this just feature-creep?" | It's a pricing experiment, not a feature build. The feature (shared curation) already works; the experiment tests whether we can charge for it. |
| "Why now?" | User-research signal is fresh (Mar 18); signal decays. Running the experiment in the next 4 weeks captures the current demand intensity. |

### Risks and tensions

- **Leo anchors meeting to subscription skepticism; noor doesn't push; meeting ends with defer**: Mitigation. explicitly ask leo "what would change your mind" if he says no; defer isn't acceptable. need a signal.

### Asks

- **From leo-cofounder-1**: greenlight for 4-week experiment, OR specific objection we can address
- **From noor-cofounder-2**: reinforce the experiment framing if leo pushes; name a metric she cares about

### Success signals

- Leo asks substantive experiment-design questions (not just "I don't like subscription tiers")
- Noor names a metric she'd watch (indicates engagement with the idea)
- Meeting ends with a concrete signal (yes / no with reasoning / specific condition for yes)

---

## Sources & References

### Primary inputs

- User-provided context: casual one-liner; stakeholder positions characterized in prompt
- User research round 2026-03-18 (referenced from priya's prior notes)

### Referenced artifacts

- Agenda: none (weekly product meeting; no dedicated agenda)
- Prior recaps on this topic: none formal

### External references

- [User research synthesis 2026-03-18](https://notion.example/brainshelf-research-mar-18) [fictional]

### Generation context

- **Generated**: 2026-04-19T18:00:00Z
- **Skill version**: 1.0.0
- **Input quality**: low. casual one-liner; stakeholder positions characterized but not verified; no prior recap loaded
- **Overall confidence**: medium. brief structure is solid; stakeholder reads are inferences from the user's characterization
- **Known gaps**: no direct-quote evidence for leo's or noor's positions; confidence markers attached
- **Inferences applied**: leo's likely concerns inferred from his role pattern [confidence: medium]; noor's positioning [confidence: medium, inferred from "open" cue]
- **Anti-meeting check**: Ran. synchronous value: conflict-resolution (leo's skepticism) + decision-making (greenlight); sync format appropriate for a pitch needing real-time reaction
```
