---
title: "Foundation stakeholder update: Storevine Campaigns Slack Update To Support Team"
description: "Sample output for foundation-stakeholder-update skill applied to the storevine thread (campaigns-slack-support)."
artifact: foundation-stakeholder-update
version: 1.0
repo_version: 2.11.0
skill_version: 1.0.0
created: 2026-04-17
status: canonical
thread: storevine
context: campaigns-slack-support
---

# Sample: foundation-stakeholder-update. Storevine Campaigns Slack Update to Support Team

## Scenario

Storevine's PM jonathan needs to communicate outcomes from the 2026-04-24 Campaigns pricing decision meeting to the customer support team (who will field incoming questions once the pricing change goes live). Support team reads Slack primarily. CTA: ensure support playbook is ready by 2026-05-15.

Source Notes:
- Storevine is fictional
- All metrics `[fictional]`

## Prompt

```
/meeting-update @2026-04-24_13-00EST_campaigns-pricing-decision_recap.md --channel=slack --audience=customer-facing --cta="update support playbook with new pricing + grandfathering flow by 2026-05-15"
```

## Output

```markdown
---
artifact_type: stakeholder-update
version: 1.0
generated_at: 2026-04-25T09:00:00Z
generated_by_skill: foundation-stakeholder-update

meeting_title: "Campaigns Pricing Decision"
meeting_date: 2026-04-24

project: campaigns
topics:
  - pricing-decision

channel: slack
audience_variant: customer-facing
primary_cta: "update support playbook with new pricing + grandfathering flow by 2026-05-15"

thread_continuation_of: null

related_recap: 2026-04-24_13-00EST_campaigns-pricing-decision_recap.md

input_quality: high
confidence: high
visibility: team
status: draft
---

# Stakeholder update: Campaigns Pricing Committed

## Shareable update

> [v1.1.0: copy the section below into #campaigns-rollout Slack channel. Everything below the "End of Shareable update" marker is internal.]

---

**🎯 Campaigns pricing decided. support playbook needed by 2026-05-15**

**TL;DR**

- Two tiers: Campaigns Starter [fictional] $19/mo, Campaigns Pro $49/mo
- Beta users grandfathered at current $9/mo for 12 months
- Rollout 2026-06-10 (new customers); migration window runs through 2027-06-10

**Context**

Product team committed pricing after yesterday's decision meeting (full recap linked below). This affects every customer who asks Support about Campaigns pricing, billing questions, or migration timing. Wanted to get this in front of you early so the playbook is ready well before launch.

**What this means for Support**

- **New questions you'll get**: "when does my $9/mo end?" (answer: 12 months grandfathered from 2026-06-10); "what's the difference between Starter and Pro?" (answer: [fictional] tier-feature matrix coming by 2026-05-08); "can I switch tiers mid-migration?" (answer: yes, with pro-rated billing)
- **Playbook additions needed**: FAQ entries for each of the above; escalation path for edge cases (multi-location merchants, annual plans, custom billing)
- **Timing**: playbook needs to be live before the first customer migration email goes out (scheduled 2026-05-22)

**❗ What I need from you**

- Update support playbook by 2026-05-15 with pricing + grandfathering flow
- Flag any customer segments we missed in the FAQ
- Confirm escalation path for complex migration cases

More: [full recap](2026-04-24_13-00EST_campaigns-pricing-decision_recap.md) | [tier-feature matrix (draft)](https://notion.example/campaigns-tier-matrix) | [migration FAQ (stub)](https://notion.example/campaigns-migration-faq)

---

> [End of Shareable update section. Everything below is INTERNAL. do not copy into Slack.]

## Technical-to-business translation notes

**Translations applied**:

- "ARPU lift" from recap rephrased as "revenue per customer" (support audience)
- "Grandfathering" kept as-is (common term)
- "Pro-rated billing" kept as-is (support audience familiar)
- "Tier-feature matrix" link instead of inline table (support will have the matrix when it ships by 2026-05-08)

**Flagged but kept**:

- "Migration". customer-facing but ambiguous; support team has a different meaning for this internally. If playbook gets external-facing version, use "transition" instead.

---

## Sources & References

### Primary inputs

- Related recap: 2026-04-24_13-00EST_campaigns-pricing-decision_recap.md
- User-provided audience: customer-facing (support team)
- User-provided CTA: update support playbook by 2026-05-15

### Referenced artifacts

- Recap: 2026-04-24_13-00EST_campaigns-pricing-decision_recap.md

### External references

- [Tier-feature matrix draft](https://notion.example/campaigns-tier-matrix) [fictional]
- [Migration FAQ stub](https://notion.example/campaigns-migration-faq) [fictional]

### Generation context

- **Generated**: 2026-04-25T09:00:00Z
- **Skill version**: 1.0.0
- **Channel**: slack
- **Audience variant**: customer-facing
- **Thread continuation**: no (first Campaigns pricing update)
- **Input quality**: high
- **Known gaps**: Annual-plan and custom-billing edge cases flagged but not detailed. support to surface during playbook build
- **Translations applied**: 3 applied; 1 flagged for potential external-facing review
```
