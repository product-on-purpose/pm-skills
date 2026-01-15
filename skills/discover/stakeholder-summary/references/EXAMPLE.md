---
artifact: stakeholder-summary
version: "1.0"
created: 2026-01-14
status: complete
context: Enterprise platform migration affecting multiple departments
---

# Stakeholder Summary: Cloud Infrastructure Migration

## Overview

**Project:** Migrate core business applications from on-premise data center to AWS
**Purpose:** Identify and manage stakeholders to ensure smooth migration with organizational buy-in
**Date:** January 2026
**Owner:** Sarah Chen, Technical Program Manager

## Stakeholder Map

```
                    [High Interest]
                          |
        KEEP SATISFIED    |    MANAGE CLOSELY
         - CFO            |     - CTO (Marcus)
         - Legal          |     - VP Engineering (Diana)
                          |     - IT Director (James)
                          |     - Security Lead (Priya)
[Low Influence] ----------+---------- [High Influence]
                          |
        MONITOR           |    KEEP INFORMED
         - HR             |     - Engineering Leads
         - Marketing      |     - Customer Success
                          |     - Sales
                    [Low Interest]
```

### Quadrant Placement

**Manage Closely (High Influence, High Interest):**
- Marcus Wong, CTO — Executive sponsor, budget authority
- Diana Reyes, VP Engineering — Technical decision maker, team impact
- James Liu, IT Director — Infrastructure owner, operations impact
- Priya Sharma, Security Lead — Compliance gatekeeper

**Keep Satisfied (High Influence, Low Interest):**
- Michael Torres, CFO — Budget approval, cost concerns
- Jennifer Adams, Legal Counsel — Contract and compliance review

**Keep Informed (Low Influence, High Interest):**
- Engineering Team Leads — Affected by changes, need to plan
- Customer Success Team — Potential customer-facing impact
- Sales Team — Need confidence to reassure customers

**Monitor (Low Influence, Low Interest):**
- HR Department — Minor process updates needed
- Marketing Team — Minimal direct impact

## Stakeholder Profiles

| Stakeholder | Role | Influence | Interest | Alignment | Key Need |
|-------------|------|-----------|----------|-----------|----------|
| Marcus Wong | CTO | High | High | Supportive | Successful migration, modernization |
| Diana Reyes | VP Engineering | High | High | Supportive | Minimal team disruption, improved DX |
| James Liu | IT Director | High | High | Neutral | Clear transition plan, job security |
| Priya Sharma | Security Lead | High | High | Resistant | Zero security incidents, compliance |
| Michael Torres | CFO | High | Medium | Neutral | Cost predictability, ROI clarity |
| Jennifer Adams | Legal Counsel | Medium | Low | Neutral | Contract compliance, vendor terms |

## Detailed Stakeholder Analysis

### Marcus Wong, CTO

**Role:** Chief Technology Officer, Executive Sponsor
**Influence Level:** High — Budget authority, final technical decisions
**Interest Level:** High — Strategic initiative tied to his objectives
**Current Alignment:** Supportive

**Needs:**
- Successful migration that positions company for scale
- Clear progress visibility without micromanaging
- Minimal production incidents during transition

**Concerns:**
- Timeline slippage affecting other initiatives
- Hidden costs emerging mid-project
- Team burnout from concurrent projects

**What Motivates Them:**
- Technology leadership reputation in industry
- Enabling business growth through infrastructure
- Building a modern, attractive engineering organization

**Preferred Communication:**
- Channel: Weekly 1:1, Slack for urgent items
- Frequency: Weekly status, immediate escalation for blockers
- Style: Executive summary with key decisions needed

---

### Diana Reyes, VP Engineering

**Role:** VP Engineering, 60 engineers across 8 teams
**Influence Level:** High — Controls engineering resources and priorities
**Interest Level:** High — Her teams are directly affected
**Current Alignment:** Supportive

**Needs:**
- Minimal disruption to sprint commitments
- Clear ownership boundaries during transition
- Improved developer experience post-migration

**Concerns:**
- Engineers pulled from product work for migration tasks
- On-call burden increasing during transition
- Knowledge gaps on new cloud infrastructure

**What Motivates Them:**
- Team morale and retention
- Engineering velocity and productivity
- Technical excellence and best practices

**Preferred Communication:**
- Channel: Engineering leads meeting, Slack channel
- Frequency: Bi-weekly detailed review, weekly async update
- Style: Technical depth with impact on team metrics

---

### James Liu, IT Director

**Role:** IT Director, manages infrastructure and operations team of 12
**Influence Level:** High — Owns current infrastructure, critical for transition
**Interest Level:** High — Directly affects his team's role and processes
**Current Alignment:** Neutral (previously resistant)

**Needs:**
- Clear role for his team post-migration
- Training on AWS operations
- Recognition of his team's institutional knowledge

**Concerns:**
- Job security for himself and team members
- Being blamed if migration causes outages
- Loss of control and expertise relevance

**What Motivates Them:**
- Team stability and career growth paths
- Operational excellence and uptime metrics
- Being seen as enabler, not blocker

**Preferred Communication:**
- Channel: Direct 1:1 meetings, private Slack
- Frequency: Weekly check-in, daily during critical phases
- Style: Collaborative, acknowledging his expertise

---

### Priya Sharma, Security Lead

**Role:** Head of Information Security, compliance owner
**Influence Level:** High — Can block migration with security concerns
**Interest Level:** High — Major changes to security perimeter
**Current Alignment:** Resistant

**Needs:**
- Zero security incidents during and after migration
- Compliance documentation for auditors
- Security controls equal or better than current state

**Concerns:**
- Expanded attack surface with cloud exposure
- Team lacks cloud security expertise
- Rushed timeline compromising security reviews

**What Motivates Them:**
- Zero breach track record
- Regulatory compliance (SOC 2, GDPR)
- Security team recognition and resources

**Preferred Communication:**
- Channel: Security review meetings, documented decisions
- Frequency: Bi-weekly security review, ad-hoc for findings
- Style: Risk-focused, evidence-based, documented

---

### Michael Torres, CFO

**Role:** Chief Financial Officer, budget authority
**Influence Level:** High — Controls funding approval
**Interest Level:** Medium — Cares about cost, not technical details
**Current Alignment:** Neutral

**Needs:**
- Predictable costs with clear ROI
- No budget surprises or overruns
- Business continuity during transition

**Concerns:**
- Cloud costs spiraling out of control
- Hidden costs not in original estimate
- Productivity loss during migration

**What Motivates Them:**
- Financial predictability and control
- Operational efficiency
- Risk management

**Preferred Communication:**
- Channel: Monthly finance review, email for budget items
- Frequency: Monthly, plus any budget change requests
- Style: Numbers-focused, ROI-driven, concise

## Key Relationships

### Dependencies
| From | To | Dependency Type |
|------|-----|-----------------|
| Project Team | Marcus Wong | Budget approval, executive air cover |
| Project Team | Priya Sharma | Security sign-off for each phase |
| James Liu | Diana Reyes | Knowledge transfer on current systems |
| Diana Reyes | Engineering Leads | Resource allocation for migration work |

### Alliances
- **Executive alignment:** Marcus and Michael are aligned on cloud strategy; Marcus can influence Michael on budget concerns
- **Technical block:** Diana and James share operational concerns; addressing James's concerns helps with Diana
- **Security partnership:** Priya has CFO's ear on risk; getting her support removes a major blocker

### Potential Conflicts
| Parties | Conflict Area | Risk Level |
|---------|---------------|------------|
| James Liu vs. Diana Reyes | Ownership of cloud operations post-migration | Medium |
| Priya Sharma vs. Project Team | Security review timeline vs. project schedule | High |
| Engineering Leads vs. Project Team | Resource allocation between product and migration | Medium |

## Communication Plan

| Stakeholder | Frequency | Channel | Content | Owner |
|-------------|-----------|---------|---------|-------|
| Marcus Wong | Weekly | 1:1 meeting | Status, risks, decisions needed | Sarah (PM) |
| Diana Reyes | Bi-weekly | Eng leads sync | Team impact, timeline, asks | Sarah (PM) |
| James Liu | Weekly | Private 1:1 | Transition planning, concerns | Sarah (PM) |
| Priya Sharma | Bi-weekly | Security review | Security status, findings, mitigations | Sarah + Tech Lead |
| Michael Torres | Monthly | Finance review | Budget status, forecast, variances | Sarah + Marcus |
| Engineering Leads | Bi-weekly | Slack + meeting | Technical updates, timeline | Tech Lead |
| Broader org | Monthly | All-hands update | High-level progress, what's changing | Marcus |

## Risk Mitigation

### Resistant Stakeholders

| Stakeholder | Concern | Mitigation Strategy | Owner |
|-------------|---------|---------------------|-------|
| Priya Sharma | Security controls inadequate | Engage her team early in architecture; hire cloud security consultant; extra review time | Sarah + CTO |
| James Liu | Team relevance post-migration | Create explicit "Cloud Operations" role; AWS training budget; acknowledge expertise | Sarah + Diana |

### Political Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| James blocks knowledge transfer | Migration delayed, critical gaps | Private relationship building; involve in architecture decisions; protect his team |
| Priya escalates to board | Project paused for extended security review | Proactive security partnership; over-communicate; no surprises |
| CFO cuts budget mid-project | Scope reduced, value compromised | Regular cost updates; contingency in budget; ROI documentation |

## Action Items

- [ ] Schedule private lunch with James Liu to discuss team transition plan (Sarah, this week)
- [ ] Invite Priya to architecture review as co-owner, not reviewer (Tech Lead, next sprint)
- [ ] Prepare "IT Team Cloud Evolution" proposal for Diana's approval (Sarah, next week)
- [ ] Create CFO dashboard showing migration costs vs. budget (Sarah, before next finance review)
- [ ] Draft security partnership proposal for Priya with dedicated review slots (Sarah + Tech Lead)

## Document History

| Date | Change | Author |
|------|--------|--------|
| 2026-01-14 | Initial creation | Sarah Chen |
| 2026-01-14 | Added communication plan | Sarah Chen |

---

*Review and update this document when stakeholder dynamics change or at major project milestones.*
