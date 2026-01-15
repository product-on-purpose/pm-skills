---
artifact: interview-synthesis
version: "1.0"
created: 2026-01-14
status: complete
context: B2B SaaS company researching onboarding experience for new users
---

# Interview Synthesis: New User Onboarding Experience

## Research Overview

### Objective

Understand why only 34% of new users complete onboarding and identify friction points preventing users from reaching their "aha moment" within the first 7 days.

### Methodology

- **Format:** Video calls via Zoom
- **Duration:** 45 minutes average
- **Interviewer(s):** Sarah Chen (Product), Marcus Williams (UX Research)
- **Date Range:** January 2 to January 10, 2026

### Participant Summary

| ID | Role/Segment | Tenure | Interview Date | Notes |
|----|--------------|--------|----------------|-------|
| P1 | Marketing Manager | New user (Day 3) | Jan 2 | First-time project management tool user |
| P2 | Project Lead | Churned after 14 days | Jan 3 | Previously used Asana |
| P3 | Team Admin | Completed onboarding | Jan 5 | Tech-savvy, evaluated 3 competitors |
| P4 | Operations Director | New user (Day 5) | Jan 7 | Managing team of 12 |
| P5 | Product Manager | Churned after 7 days | Jan 9 | Power user of similar tools |

## Key Themes

### Theme 1: Overwhelming Initial Setup

**Prevalence:** 5 of 5 participants

**Summary:** Every participant described feeling overwhelmed when first logging in. The dashboard presented too many options without clear guidance on where to start. Users who successfully onboarded found their own path through trial and error, while churned users gave up when they couldn't figure out the first step.

**Evidence:**
- P1: "I logged in and just stared at the screen. There were like fifteen buttons and I had no idea which one to click first."
- P2: "I spent 20 minutes trying to figure out how to create my first project. In Asana, it was obvious. Here, I felt lost."
- P5: "I'm pretty tech-savvy and even I was confused. If I can't figure it out quickly, my team definitely won't."

### Theme 2: Missing Context for Features

**Prevalence:** 4 of 5 participants

**Summary:** Users didn't understand why they should use specific features or how they fit into their workflow. Features were explained in terms of what they do, not why they matter. Users skipped important setup steps because they didn't understand the value.

**Evidence:**
- P3: "I eventually figured out the workspace settings, but I almost skipped it. Nothing told me why I should care about configuring those options."
- P4: "There's a tutorial that shows you where to click, but not why. I need to know if this will save me time before I invest effort setting it up."

### Theme 3: Desire for Quick Wins

**Prevalence:** 4 of 5 participants

**Summary:** Users wanted to accomplish something meaningful within the first 10 minutes. Those who could create a simple project and invite a colleague felt confident about continuing. Those who got stuck in setup without visible progress abandoned the product.

**Evidence:**
- P1: "I just wanted to get one thing done to see if this tool works for me. But I couldn't even figure out how to add a simple task."
- P3: "What kept me going was when I finally created a project and invited my teammate. That 5-minute demo with her sold me on the tool."
- P5: "I have 30 tools fighting for my attention. If I can't see value in 10 minutes, I'm moving on."

### Theme 4: Team Invitation Friction

**Prevalence:** 3 of 5 participants

**Summary:** Users who wanted to evaluate the tool with their team encountered friction when inviting colleagues. The invitation flow required too much information upfront and didn't provide sample content for the team to explore together.

**Evidence:**
- P2: "I wanted to show my team, but the invite form asked for everyone's job title and department. That felt like too much work for a trial."
- P4: "I invited my team but they logged into an empty workspace. I had to walk them through everything on a call because there was nothing to explore."

## Notable Quotes

> "I logged in and just stared at the screen. There were like fifteen buttons and I had no idea which one to click first."
> — P1, Marketing Manager, Day 3 of trial

> "If I can't see value in 10 minutes, I'm moving on. I have 30 tools fighting for my attention."
> — P5, Product Manager who churned

> "What kept me going was when I finally created a project and invited my teammate. That 5-minute demo with her sold me on the tool."
> — P3, Team Admin who completed onboarding

> "There's a tutorial that shows you where to click, but not why. I need to know if this will save me time before I invest effort setting it up."
> — P4, Operations Director

> "I'm pretty tech-savvy and even I was confused. If I can't figure it out quickly, my team definitely won't."
> — P5, Product Manager who churned

## Insights

### Insight 1: Users need guided first steps, not feature tours

Users don't want to learn about all features — they want to accomplish their first goal. The current onboarding treats all features equally, overwhelming users with options. Successful users found their path by ignoring most of the interface and focusing on one task. We need to guide users to that first success rather than showing them everything.

**Implication:** Replace the current feature tour with a goal-oriented wizard that asks users what they want to accomplish and guides them to that specific outcome.

### Insight 2: Value demonstration must precede feature explanation

Users skip features when they don't understand the benefit. Current tooltips explain mechanics ("Click here to set due dates") but not value ("Never miss a deadline again"). Users who completed onboarding discovered value through experimentation; we shouldn't require that effort.

**Implication:** Reframe all onboarding copy to lead with benefits. Use social proof ("Teams using this feature complete projects 20% faster") to motivate feature adoption.

### Insight 3: Collaborative trial experiences drive conversion

Users who invited teammates and had a shared experience were significantly more likely to continue. Individual evaluation feels like work; collaborative exploration feels like progress. The current invitation flow adds friction instead of facilitating team discovery.

**Implication:** Optimize the invite flow to be frictionless (email-only) and pre-populate shared workspaces with sample content that teams can explore together.

## Recommendations

| Priority | Recommendation | Related Insight | Confidence |
|----------|---------------|-----------------|------------|
| 1 | Implement guided first-project wizard | Insight 1 | High |
| 2 | Add sample project for team exploration | Insight 3 | High |
| 3 | Rewrite onboarding copy to lead with benefits | Insight 2 | Medium |
| 4 | Simplify team invitation to email-only | Insight 3 | Medium |

### Recommendation Details

**1. Implement Guided First-Project Wizard**

Replace the current dashboard landing with a 3-step wizard that asks users to: (1) name their first project, (2) add 2-3 sample tasks, and (3) set a due date. This creates an immediate quick win and teaches core functionality through doing rather than watching.

**Next steps:** Design sprint with UX team, prototype by end of month, A/B test against current onboarding.

**2. Add Sample Project for Team Exploration**

When a user invites teammates, automatically create a sample project called "Getting Started Together" with pre-populated tasks that demonstrate collaboration features. Include tasks like "Comment on this task" and "Assign yourself something."

**Next steps:** Define sample project content with Customer Success team who knows what drives adoption, implement as part of invitation flow enhancement.

## Appendix

### Methodology Notes

Participants were recruited from users who signed up in the last 30 days. We intentionally included both completed onboarding and churned segments to understand both success and failure paths. Interviews were semi-structured with core questions about first impressions, confusion points, and decision factors.

### Limitations

- Sample skewed toward individual contributors and managers; no C-level executives interviewed
- All participants were from companies with 10-50 employees; enterprise experience may differ
- Did not include users who never logged in after signup (a significant segment)
- Self-reported friction may differ from actual behavior; recommend supplementing with session recordings

### Raw Notes

Detailed interview transcripts stored in Notion: [Research Repository / 2026-Q1 / Onboarding Study]
