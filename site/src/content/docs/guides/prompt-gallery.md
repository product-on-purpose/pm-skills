---
title: Prompt Gallery
description: Real prompts from the PM Skills sample library . learn by example across three prompt styles.
tags:
  - Guides
  - Prompts
---

Learn how to write effective prompts by studying real examples from the [sample library](../showcase/). Three fictional companies demonstrate three different prompting styles . all produce equally thorough outputs.

## The Three Styles

| Style | Company | Who it's for |
|-------|---------|-------------|
| **Organized** | Storevine (B2B) | PMs who prepare structured notes and reference prior artifacts |
| **Casual** | Brainshelf (Consumer) | Lean teams moving fast . bullet points, shorthand, enough context to work |
| **Enterprise** | Workbench (Enterprise) | High-documentation environments with stakeholder scrutiny |

---

## PRD Prompts

### Organized (Storevine)

```
/pm-skills:deliver-prd

Feature: Campaigns . native email marketing for Storevine merchants

Context: Storevine all-in-one ecommerce + web builder, ~18k active merchants
[fictional]. See: competitive-analysis (filed last week), problem-statement
(approved), solution brief (approved), spike summary (SendGrid selected),
ADR (SendGrid for dedicated IP warm-up).

Scope for v1:
- Template-based email campaigns (no drag-and-drop builder)
- Audience segmentation by purchase history and tags
- CAN-SPAM and GDPR compliance built in
- Scheduled sends with merchant timezone support
```

### Casual (Brainshelf)

```
/pm-skills:deliver-prd

resurface prd for sprint 8. pulling everything together: solution brief,
adr (resend), design rationale (text layout), spike (tfidf).

building the daily email digest that surfaces 3-5 saved items matched
to reading patterns. 85k registered, 22k MAU [fictional].
```

### Enterprise (Workbench)

```
/pm-skills:deliver-prd

Here is the structured brief for the Blueprints v1 PRD.

**Product context:**
- Workbench collaboration platform, ~500 enterprise customers [fictional], Series B
- Competitors: Confluence (Atlassian), Notion, Coda, Monday.com
- Key stakeholders: VP Engineering, Head of Legal, IT Security Lead,
  3 department heads (Engineering, Ops, Marketing)

**Problem:** 60% of enterprise projects lack an approved kickoff doc at
handoff [fictional]. Teams use ad-hoc templates that miss required sections.

**Solution:** Blueprints . reusable document templates with required sections
and role-based approval gates.
```

---

## Hypothesis Prompts

### Organized (Storevine)

```
/pm-skills:define-hypothesis

Project: Campaigns . native email marketing for Storevine merchants
Stage: Post-discovery, pre-PRD finalization

Hypothesis I want to define:
- Non-adopter merchants (no active external email tool, <250 customers)
  are ~38% of our active base [fictional]
- If we offer pre-populated templates and a 3-step "send your first campaign"
  wizard, we can increase first-send rate from 12% to 30% [fictional]
```

### Casual (Brainshelf)

```
/pm-skills:define-hypothesis

trying to figure out if a morning digest email will actually get people to
re-read their saved stuff. context: brainshelf pkm app, 22k MAU [fictional].
users save ~47 items/month but revisit fewer than 9% within 30 days.
```

### Enterprise (Workbench)

```
/pm-skills:define-hypothesis

Blueprints required-section feature. We believe that enforcing required
sections in document templates will reduce time-to-approved-doc from
4 days average to 1 day [fictional] for enterprise teams.

Validation approach: A/B test, required vs. optional sections, 50/50
split across new Blueprint creations for 4 weeks.
```

---

## Competitive Analysis Prompts

### Organized (Storevine)

```
/pm-skills:discover-competitive-analysis

Scope: Email marketing tools available to ecommerce merchants . built-in
vs. third-party positioning. Informing Campaigns v1 scope and feature
prioritization.

Our product: Storevine . B2B all-in-one ecommerce + web platform, Series A,
~18k active merchants [fictional].
Competitors to evaluate: Shopify Email, Squarespace Email Campaigns,
Wix Ascend, Klaviyo, Mailchimp, Drip
```

### Casual (Brainshelf)

```
/pm-skills:discover-competitive-analysis

read-later / pkm space, focusing on who does resurfacing or spaced
repetition. readwise is the main one. also raindrop, omnivore,
instapaper, pocket. we're brainshelf, 22k MAU consumer pkm app.
```

---

## Experiment Design Prompts

### Organized (Storevine)

```
/pm-skills:measure-experiment-design

Project: Campaigns guided first-campaign flow
Experiment: Does the guided flow increase first-send rate for non-adopter
merchants?

Hypothesis: Pre-populated templates for non-adopter merchants (<250
customers, no external email tool) will drive first-send rate from
12% to 30% within 14 days of account creation [fictional].
```

---

## Key Takeaway

All three prompt styles produce equally thorough, complete artifacts. The difference is in **how much context you provide up front**:

- **Organized:** References prior work, provides structured context, names specific numbers. Less back-and-forth with the skill.
- **Casual:** Gives enough context to produce a good artifact but skips polish. The skill fills in structure and completeness.
- **Enterprise:** Full stakeholder lists, quantified baselines, explicit metric definitions. Every artifact can withstand scrutiny.

**The best prompt is the one you'll actually write.** If you're moving fast, a Brainshelf-style prompt works. If you're presenting to the board, a Workbench-style prompt gives you more control over the output.

See the full outputs for all prompts in the [Showcase](../showcase/).
