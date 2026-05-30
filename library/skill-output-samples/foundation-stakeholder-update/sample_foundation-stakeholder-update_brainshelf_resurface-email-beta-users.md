---
title: "Foundation stakeholder update: Brainshelf Resurface Email To Beta Users"
description: "Sample output for foundation-stakeholder-update skill applied to the brainshelf thread (resurface-email-beta-users)."
artifact: foundation-stakeholder-update
version: 1.0
repo_version: 2.11.0
skill_version: 1.0.0
created: 2026-04-17
status: canonical
thread: brainshelf
context: resurface-email-beta-users
---

# Sample: foundation-stakeholder-update. Brainshelf Resurface Email to Beta Users

## Scenario

Brainshelf's PM priya-pm sends an email to ~500 Resurface beta users announcing a meaningful upgrade (algo v1) based on their feedback. This is an external-facing update (not internal stakeholder), using the stakeholder-update skill's email + customer-facing variant. FYI-only. no user action required, but the PM wants to signal gratitude for feedback.

Source Notes:
- Brainshelf is fictional
- All metrics `[fictional]`

## Prompt

```
foundation-stakeholder-update @2026-03-17_11-00PST_resurface-algo-v1_recap.md --channel=email --audience=customer-facing --cta="FYI-only" "email to ~500 beta users, thank them for feedback, signal shipment of algo v1 improvements"
```

## Output

```markdown
---
artifact_type: stakeholder-update
version: 1.0
generated_at: 2026-03-18T09:00:00Z
generated_by_skill: foundation-stakeholder-update

meeting_title: "Resurface Algorithm v1"
meeting_date: 2026-03-17

project: resurface
topics:
  - algorithm-v1

channel: email
audience_variant: customer-facing
primary_cta: "FYI-only"

thread_continuation_of: null

related_recap: 2026-03-17_11-00PST_resurface-algo-v1_recap.md

input_quality: high
confidence: high
visibility: public
status: draft
---

# Stakeholder update: Resurface v1 Shipped. Thank You for the Feedback

## Shareable update

> [v1.1.0: copy the section below into email to beta-users list. Everything below the "End of Shareable update" marker is internal.]

---

**Subject**: Resurface got better. thanks to your feedback

Hi Brainshelf beta users,

Quick one to say: Resurface just got a meaningful upgrade, and your feedback drove most of the changes.

**What changed**

- The algorithm now weights recency more heavily. you'll see fresh saves surface faster
- Notification copy is shorter and more direct (we heard "too much text" loud and clear)
- A handful of UX refinements to cut friction between opening the email and saving your next item

**What you'll notice**

- Morning digests should feel more "what I cared about this week" and less "a random resurface"
- Fewer clicks to engage with each item
- Open rates climbing across the beta group (thanks for engaging)

**No action needed**

This is FYI. the changes are already live. If you want to send more feedback, reply to this email or ping us in the Brainshelf community Slack. We read everything.

Thanks for being part of the beta. your feedback shaped the v1 you're now using.

- priya and the Resurface team

---

> [End of Shareable update section. Everything below is INTERNAL. do not copy into email.]

## Technical-to-business translation notes

**Translations applied**:

- "Recency-weighted algorithm" → "algorithm now weights recency more heavily" (plain-language for consumer audience)
- "Topic-clustering deferred" → omitted entirely (too internal; no user-facing implication yet)
- "22% open rate lifted to 31%" → "open rates climbing across the beta group" (qualitative for public audience; specific metrics avoided in consumer email)
- "<5 sec friction threshold" → "cut friction between opening the email and saving your next item" (concrete outcome, not internal metric)

**Flagged but kept**:

- "Beta". acceptable for this audience (they know they're beta users); would need rephrasing if update went to general users

---

## Sources & References

### Primary inputs

- Related recap: 2026-03-17_11-00PST_resurface-algo-v1_recap.md
- User-provided audience: customer-facing (beta users, ~500)
- User-provided CTA: FYI-only

### Referenced artifacts

- Recap: 2026-03-17_11-00PST_resurface-algo-v1_recap.md

### External references

- None (update is self-contained; no public links for a consumer email)

### Generation context

- **Generated**: 2026-03-18T09:00:00Z
- **Skill version**: 1.0.0
- **Channel**: email
- **Audience variant**: customer-facing
- **Thread continuation**: no (first communication on v1)
- **Input quality**: high
- **Known gaps**: None. FYI-only with no pending asks
- **Translations applied**: 4 applied; 1 flagged for potential wider-audience future use
```
