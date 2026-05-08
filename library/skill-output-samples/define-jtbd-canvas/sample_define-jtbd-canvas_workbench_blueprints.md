---
title: "Define JTBD Canvas: Workbench Blueprints"
description: "Workbench enterprise collaboration platform: Blueprints JTBD for ops managers enforcing documentation standards."
artifact: jtbd-canvas
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-21
status: sample
thread: workbench
context: "Workbench enterprise collaboration platform: Blueprints JTBD for ops managers enforcing documentation standards"
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Workbench is a Series B enterprise collaboration platform (~200 employees, ~500 enterprise customers [fictional]). After discovery interviews revealed that middle managers spend approximately 3 hours per week manually reviewing documents for completeness before formal submission [fictional], Rachel V. (Technical PM) created a JTBD canvas to articulate the core job that operations managers and team leads are hiring a documentation tool to perform. The canvas captures why current tools (Confluence, Notion, Coda) are being "fired" and what hiring criteria would drive adoption of Blueprints. Tomas G. (Design Lead) used the emotional and social job dimensions to inform the hybrid wizard/canvas UI direction for the Blueprint creation flow.

**Source Notes:**

- Clayton Christensen's Jobs to be Done framework (hbs.edu) provides the theoretical foundation for this canvas, distinguishing functional, emotional, and social dimensions of the job a product is hired to perform.
- Microsoft's Work Trend Index 2023 reported that knowledge workers spend 8.8 hours per week searching for or recreating documents, quantifying the functional cost of documentation inconsistency.
- G2's Enterprise Collaboration category reviews (g2.com) consistently cite "documents created but not maintained" as the top Confluence complaint in enterprise reviews, validating the "docs graveyard" trigger for this job.

---

## Prompt

```
/jtbd-canvas

Product: Workbench Blueprints (enterprise doc templates with required sections and approval gates)
Stage: Define phase, post-discovery interviews

Job performer: Operations managers and team leads at enterprise companies (500-10,000 employees) who are responsible for ensuring documentation standards are followed across their teams. They are not the approvers (those are department heads) -- they are the middle layer who currently enforce standards manually.

Circumstance: When a new project kicks off, a compliance review is due, or a vendor onboarding begins, these managers need to ensure the team produces a complete, approved document before work proceeds. Currently they manually review documents for completeness -- a shadow approval role that takes ~3 hours/week [fictional].

Core job: Enforce documentation standards across the team without becoming the "docs police" -- without spending their time checking whether other people filled in every section.

Current solutions they "hire":
- Confluence templates (direct competitor) -- has templates but no enforcement; "docs graveyard" problem
- Notion (direct competitor) -- beautiful UX, zero governance; "flexibility over standards" philosophy
- SharePoint + email approval chains (indirect) -- separate tools stitched together; works but is slow and fragile
- Manual review by the manager themselves (non-consumption) -- the current workaround; reliable but time-consuming and resented

Key interview quotes to incorporate:
- P6: "I don't want to be the docs police. I want the tool to be the docs police." [fictional]
- P1: "Templates without enforcement are just suggestions with formatting." [fictional]
- P4: "If one tool did both -- the doc and the approval -- we'd move tomorrow." [fictional]

Stakeholders: Sandra C. (Head of Product), Tomás G. (Design Lead)
```

---

## Output

# Jobs to be Done Canvas: Enforce Documentation Standards Without Manual Policing

## Job Overview

**Job Title:** Enforce documentation standards without manual policing
**Date:** November 2025
**Author:** Rachel V., Technical PM, Blueprints
**Research Basis:** 6 semi-structured discovery interviews with enterprise team leads (October 2025); closed-beta telemetry (80 enterprise accounts [fictional])

---

## Job Performer

**Who:** Operations managers and team leads at enterprise companies (500-10,000 employees) who are responsible for ensuring their teams produce complete, standards-compliant documentation before work proceeds. They sit between the document authors (project leads, individual contributors) and the formal approvers (department heads, compliance leads). Their organizational position makes them uniquely exposed to the documentation completeness problem because they bear the consequences of both incomplete submissions (from below) and rejected documents (from above).

**Key Characteristics:**
- Manages 8-40 direct or indirect reports who produce documentation as part of their workflow [fictional]
- Accountable for team output quality but does not personally author most documents
- Spends approximately 3 hours per week reviewing documents for completeness before they reach the formal approver [fictional]
- Values process efficiency; views manual document review as low-value overhead that detracts from strategic work
- Typically has 3-8 years of experience in the organization and deep institutional knowledge of which sections matter and which are routinely skipped [fictional]

**Not Defined By:**
- Industry vertical (the job exists in healthcare, financial services, government, manufacturing, and technology)
- Technical proficiency (the job performer may or may not be technical; the documentation review task is non-technical)
- Company size within the enterprise band (the job is consistent from 500 to 10,000 employees)

---

## The Circumstance

**When does this job arise?**

When a new project kicks off, a compliance review is initiated, a vendor onboarding begins, or any process-gated workflow requires a completed and approved document before the next phase can start. The trigger is always the same: "a document must be produced, completed, and approved before work can proceed." The job also arises retroactively when an audit or review reveals that an approved document was actually incomplete, forcing the manager to initiate a correction cycle.

**Where does this happen?**

In the enterprise collaboration tool (Confluence, Notion, Coda, SharePoint) and in adjacent communication channels (Slack, email) where the manager follows up on incomplete documents and coordinates with approvers. The work spans multiple tools because no single tool handles both the document and the approval, which is itself a source of friction.

**Frequency:**

Weekly. The median job performer encounters 3-5 documents per week that require completeness review before formal submission [fictional].

**Urgency:**

Moderate to high. Incomplete documents block downstream work (project kickoffs, vendor contracts, compliance certifications). The urgency is not immediate (it is not a real-time crisis) but it compounds: each day a document sits incomplete, the project timeline slips. In compliance-heavy segments, the urgency is higher because incomplete documentation can trigger audit findings with financial and reputational consequences.

---

## Job Statement

> **"When** a team member needs to submit a document for approval, **I want to** ensure it is complete and standards-compliant without personally reviewing every section, **so I can** keep projects on schedule and spend my time on higher-value work instead of policing documentation."

---

## Functional Job

**What is the practical task to accomplish?**

Ensure that every document submitted for formal approval is complete (all required sections filled in), structurally compliant with the organization's template standard, and ready for a substantive approval decision rather than a completeness check.

**Definition of "Done":**

- Every document that reaches the formal approver has all required sections completed
- The manager does not need to personally review documents for completeness before submission
- Approval turnaround time decreases because approvers make substantive decisions on the first review rather than sending documents back for missing content
- The team perceives the standard as fair and tool-enforced rather than manager-enforced

**Key Steps in the Job:**

1. Define which document sections are required for each template type (kickoff, compliance review, vendor onboarding, etc.)
2. Communicate the standard to the team (which sections must be completed, in what level of detail)
3. Monitor compliance (currently manual; ideally automated)
4. Intervene when documents are incomplete (currently: send the document back to the author with feedback)
5. Submit the completed document to the formal approver (or confirm it has been submitted)

**Functional Pains:**

- Manual completeness review consumes approximately 3 hours per week per manager [fictional], time that could be spent on strategic planning, team coaching, or cross-functional coordination
- No current tool distinguishes between "required" and "optional" sections in a template, so enforcement is entirely human
- When the manager is unavailable (vacation, sick leave), the shadow approval layer disappears and incomplete documents reach the formal approver unchecked, often resulting in a spike of rejections

---

## Emotional Job

**How do they want to feel?**

| Desired Feeling | Why It Matters |
|-----------------|----------------|
| Confident | They want to trust that documents reaching the approver are complete without having to verify personally |
| Respected | They want to be seen as a strategic operator, not a document checker; manual policing undermines their professional identity |
| In control | They want visibility into documentation compliance across their team without needing to inspect every document |

**How do they want to avoid feeling?**

| Feeling to Avoid | Current Trigger |
|------------------|-----------------|
| Resentful | Spending 3 hours/week on completeness reviews that feel like low-value overhead [fictional] |
| Anxious | Worrying that incomplete documents will reach the approver while the manager is unavailable, creating compliance risk |
| Adversarial | Being perceived by their team as the "docs police" who blocks submissions and creates friction |

**Emotional Pains:**

- The role of "docs police" is self-imposed and socially costly; managers dislike being the enforcer but feel they have no alternative because no tool performs this function
- When an incomplete document reaches the formal approver and is rejected, the manager feels responsible for the quality gap even though no tool supports them
- The emotional burden increases over time as managers realize that their manual enforcement is not scalable and will break if they are promoted, transferred, or leave the organization

---

## Social Job

**How do they want to be perceived?**

| Desired Perception | By Whom |
|--------------------|---------|
| Efficient and organized | Their direct reports (team members who author documents) |
| Reliable and thorough | The formal approvers (department heads, compliance leads) who receive documents from their team |
| Strategic and high-impact | Their own manager and peers; they want documentation quality to be a system property, not a personal burden |

**What perception do they want to avoid?**

| Perception to Avoid | By Whom |
|---------------------|---------|
| Nitpicking or micromanaging | Their direct reports, who may resent being sent back to complete missing sections |
| Unreliable | Formal approvers, who lose confidence in the manager's team when incomplete documents reach the approval queue |

**Social Context:**

- Document quality reflects on the manager's team, not the individual author; the manager bears reputational risk for team-level documentation failures
- Approvers (department heads) are typically one or two levels above the manager; social dynamics make it uncomfortable to consistently submit incomplete work upward
- In organizations where multiple teams share the same approver, the manager's team is compared to peer teams on documentation quality, creating a competitive dynamic that the manager wants to win without manual effort

---

## Competing Solutions

**What do customers currently "hire" for this job?**

| Solution Type | Solution | Strengths | Weaknesses |
|---------------|----------|-----------|------------|
| Direct Competitor | Confluence templates | Ubiquitous in enterprise; IT-approved; Jira integration | No section enforcement; templates are suggestions; "docs graveyard" reputation |
| Direct Competitor | Notion | Excellent authoring UX; fast adoption; flexible block-based structure | Zero governance features; flexibility is philosophically opposed to enforcement |
| Indirect Alternative | SharePoint + email approval chains | Familiar to IT; approval workflow exists | Document authoring is poor; two tools stitched together; slow and fragile |
| Non-consumption | Manual review by the manager | Reliable when the manager is available; no tool dependency | 3 hours/week [fictional]; not scalable; disappears during PTO; socially costly |

**Why Do They Switch?**

- A capability gap that the current tool structurally cannot fill (e.g., Confluence cannot enforce section completion; this is not a feature on the roadmap)
- A compliance incident caused by an incomplete document reaching production (a forcing event that justifies migration cost)
- A leadership mandate to consolidate tools (reducing the number of collaboration tools from 3-4 to 1-2)

**Why Do They Stay?**

- Migration cost is high: document history, permissions, integrations, and team training must all be replicated
- IT has already approved the current tool; switching requires a new security review
- "Good enough" inertia: the manual review workaround is painful but functional, and the manager has already developed habits and shortcuts for performing it

---

## Hiring Criteria

**Must-Have (Table Stakes):**

- Document templates with configurable sections
- SSO/SAML integration (IT deployment gate)
- Audit logs and version history (compliance requirement)
- Real-time co-editing (authors collaborate on documents simultaneously; Yjs CRDT enables this in Workbench)

**Differentiators (Decision Drivers):**

- Required-section enforcement (the only capability that eliminates the manual completeness check; no competitor offers this)
- Native approval workflow (document and approval in one tool; eliminates SharePoint + email stitching)
- Template admin controls (org-level template management with required/optional section designation)

**Nice-to-Have:**

- AI-assisted drafting (section-aware content suggestions)
- Confluence template import (reduces migration friction)
- Analytics dashboard (adoption and approval cycle metrics per department)

---

## Insights and Implications

**Key Insight 1:** The job is about enforcement, not authoring. Current tools excel at making documents easy to write (Notion) or deeply integrated (Confluence), but no tool makes documents mandatory to complete. The unmet need is structural enforcement, not better UX. This distinction is critical because it means Blueprints competes on a different axis than existing tools, avoiding head-to-head feature comparisons where Workbench would lose.
- Product Implication: Blueprints must lead with required-section enforcement as the P0 feature. Authoring UX improvements are secondary to the enforcement mechanism.

**Key Insight 2:** The manager is the champion, not the end user. The person who most benefits from Blueprints enforcement is the middle manager who currently acts as the "docs police." The document author may perceive enforcement as friction initially. Adoption strategy must target the manager as the internal champion and address author friction through good UX, specifically through the hybrid wizard/canvas UI that Tomas G. is designing to guide authors through required sections without making the experience feel restrictive.
- Product Implication: Onboarding and sales messaging should target middle managers (ops leads, team leads, program managers) as the primary champion persona. Author-facing UX (inline validation, save-as-draft, progress indicators) must minimize perceived friction.

**Key Insight 3:** Migration from Confluence requires a capability justification, not a UX justification. Enterprises will not switch documentation tools for a better editing experience. They will switch for a capability their current tool structurally cannot provide. Required-section enforcement is that capability. Discovery interviews confirmed this pattern across all four participants with Confluence experience.
- Product Implication: Positioning should lead with "templates with teeth" and the governance gap. Do not compete with Confluence on ecosystem depth or Notion on flexibility.

---

## Supporting Quotes

> "I don't want to be the docs police. I want the tool to be the docs police." P6, Operations Lead [fictional]

> "Templates without enforcement are just suggestions with formatting." P1, VP Ops [fictional]

> "If one tool did both, the doc and the approval, we'd move tomorrow." P4, Engineering Manager [fictional]

> "The actual approval decision takes 10 minutes. The other 3 days are the document sitting in someone's queue because it's not ready to approve." P1, VP Ops [fictional]

---

## Questions for Further Research

- What percentage of template sections do authors perceive as "never relevant to my use case," and should those sections be conditionally shown rather than universally required?
- How do managers in organizations with multi-stage approval chains (e.g., manager review then compliance review then department head sign-off) experience the enforcement need differently?
- Would a "compliance score" (percentage of required sections completed) be a useful intermediate metric for managers who want visibility without binary enforcement?

---

*This canvas should be validated and updated as you learn more about customers.*
