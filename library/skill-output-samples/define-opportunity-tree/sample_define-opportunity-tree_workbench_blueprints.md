---
title: "Define Opportunity Tree: Workbench Blueprints"
description: "Workbench enterprise collaboration platform: enterprise expansion via governance, SSO, and Confluence migration."
artifact: opportunity-tree
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-21
status: sample
thread: workbench
context: "Workbench enterprise collaboration platform: enterprise expansion via governance, SSO, and Confluence migration"
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Workbench is a Series B enterprise collaboration platform (~200 employees, ~500 enterprise customers [fictional]) preparing to build Blueprints. Rachel V. (Technical PM) created an opportunity solution tree to map the path from the desired business outcome (enterprise customer expansion) through the customer opportunities identified in discovery research, down to testable solutions. The tree anchors the Blueprints feature scope and prioritization decisions for the upcoming Develop and Deliver phases. It also serves as the shared reference for Sandra C. (Head of Product), Karen L. (Eng Lead), and Mei-Lin T. (Enterprise Sales Lead) to evaluate trade-offs between scope breadth and delivery speed.

**Source Notes:**

- Teresa Torres's "Continuous Discovery Habits" (2021) provides the opportunity solution tree framework used in this artifact, distinguishing outcomes, opportunities, and solutions as separate layers of product thinking.
- Atlassian's FY2024 Annual Report reported approximately $4.35 billion in total revenue, with Confluence as the enterprise documentation market leader, establishing the competitive incumbent that the Confluence migration opportunity targets.
- Microsoft's Work Trend Index 2023 reported that knowledge workers spend 8.8 hours per week searching for or recreating documents, quantifying the cost baseline for the documentation governance opportunity.

---

## Prompt

```
/opportunity-tree

Product: Workbench Blueprints (enterprise doc templates with required sections and approval gates)
Stage: Define phase, post-discovery and problem statement

Desired outcome: Expand Workbench enterprise customer base from 500 to 650 accounts within 12 months [fictional]
Current state: 500 enterprise customers [fictional]; enterprise churn in compliance segments is 18% annual [fictional]; 8 pipeline deals ($1.8M ARR) stalled on governance gaps [fictional]
Timeframe: 12 months from GA launch
Owner: Sandra C. (Head of Product)

Opportunities identified from discovery research:
1. Documentation governance gap -- no enterprise doc tool enforces template completion; 38% of docs reach approval incomplete [fictional]; enterprise teams need "templates with teeth"
2. SSO and security parity gap -- enterprise IT blocks deployment of tools without SSO/SAML, audit logs, and SOC 2; this is a pre-qualification filter, not a differentiator, but it is a hard gate
3. Confluence migration friction -- 4 of 6 interview participants had Confluence experience; all described migration as expensive and risky; Blueprints must offer a capability Confluence cannot provide to justify the migration cost

Solutions to explore per opportunity:
- Governance: required-section enforcement, native approval gates, template admin controls
- SSO/security: SAML integration, audit log export, SOC 2 Type II, data residency options
- Migration: Confluence template import, guided manual migration, migration support program

Prioritization: Governance is highest impact and highest confidence. SSO is table stakes (must-have, not differentiator). Migration is medium confidence (we believe it drives adoption but have not tested).

Stakeholders: Sandra C. (Head of Product), Karen L. (Eng Lead), Mei-Lin T. (Enterprise Sales Lead)
```

---

## Output

# Opportunity Solution Tree: Enterprise Customer Expansion via Blueprints

## Desired Outcome

**Outcome Statement:** Expand Workbench enterprise customer base from 500 to 650 accounts within 12 months of Blueprints GA launch [fictional]
**Current State:** 500 enterprise customers; 18% annual churn in compliance-heavy segments; 8 pipeline deals ($1.8M combined ARR [fictional]) stalled on governance gaps
**Target State:** 650 enterprise customers (net +150, accounting for churn replacement) [fictional]
**Timeframe:** 12 months from Blueprints GA launch (target: Q2 2026 GA, outcome measured by Q2 2027)
**Owner:** Sandra C., Head of Product

### Why This Outcome Matters

Enterprise customer expansion is the primary growth lever for Workbench's Series C fundraise (planned late 2026). The current product serves enterprise collaboration needs but lacks the governance and compliance features that unlock the largest enterprise segments: healthcare, financial services, and government. Blueprints is designed to fill this gap. Without enterprise expansion, the Series C narrative weakens and the company's trajectory shifts from growth-stage to efficiency-stage earlier than planned [fictional]. The net +150 target accounts for an estimated 90 accounts lost to churn (18% of 500) plus 240 new acquisitions, meaning the gross acquisition target is substantially higher than the net figure suggests [fictional].

---

## Visual Tree

```
                         [OUTCOME]
              Expand enterprise base
                  500 → 650 accounts
                         |
         ┌───────────────┼───────────────┐
         |               |               |
    [Opp 1]          [Opp 2]         [Opp 3]
    Documentation     SSO/Security    Confluence
    Governance Gap    Parity Gate     Migration Path
         |               |               |
     ┌───┴───┐       ┌───┴───┐       ┌───┴───┐
     |       |       |       |       |       |
  [1A]    [1B]    [2A]    [2B]    [3A]    [3B]
Required  Native  SAML    SOC 2   Template Guided
Sections  Approval + Audit  Type II Import  Migration
     |       |       |       |       |       |
  [Test]  [Test]  [Test]  [Test]  [Test]  [Test]
  A/B     Beta    IT      Audit   Prototype Migration
  test    pilot   review  prep    test      pilot
```

---

## Opportunity Branches

### Opportunity 1: Documentation Governance Gap

**Description:** Enterprise teams use document templates but no tool enforces template completion before a document enters an approval workflow. 38% of Blueprints in closed beta reach approval with at least one empty required section [fictional], inflating median approval time to 4.0 days [fictional]. Enterprise buyers in compliance-heavy segments (healthcare, financial services, government) have explicitly identified governance enforcement as the capability that would justify tool migration. This opportunity is unique because it targets a structural gap that no competitor has addressed, rather than competing on incremental feature improvements.
**Impact Potential:** High
**Confidence:** High

**Evidence:**
- Discovery interviews (Oct 2025): "Templates without enforcement are just suggestions with formatting." P1, VP Ops [fictional]
- Closed-beta telemetry: 38% incomplete submission rate [fictional]; median time to first approval 4.0 days [fictional]
- Competitive analysis (Feb 2026): No doc-first competitor offers section enforcement; this is the only unoccupied white space in the governance dimension

#### Solutions

**Solution 1A: Required-Section Enforcement**
- Description: Template admins designate sections as required. The Submit for Approval button is disabled until all required sections are completed. Inline validation highlights incomplete sections with clear guidance on what is needed.
- Effort: M (core feature; requires enforcement gate in submission flow, template admin UI, inline validation)
- Riskiest Assumption: Authors will complete missing sections rather than abandoning Blueprints when enforcement blocks submission
- Assumption Test: A/B test in closed beta (80 accounts [fictional]); primary metric: median time-to-approval; guardrail: author abandonment rate. Leo M. (Data Analyst) will design the instrumentation and monitor daily metrics.

**Solution 1B: Native Approval Gates**
- Description: Built-in approval workflow within the Blueprint document. Authors submit for approval; designated approvers review and approve/reject inline. Approval status tracked on the document with full audit trail.
- Effort: L (approval workflow system; role-based access control; notification system; approval audit trail)
- Riskiest Assumption: Enterprise teams will adopt a single-tool approval workflow and retire their current SharePoint/email-based approval chains
- Assumption Test: Closed-beta pilot with 10 accounts [fictional]; measure adoption rate of native approval vs. continued use of external approval tools after 30 days

---

### Opportunity 2: SSO and Security Parity Gate

**Description:** Enterprise IT security teams use SSO/SAML, audit logs, and SOC 2 Type II certification as pre-qualification filters when evaluating collaboration tools. These are not differentiators; they are hard gates. Without them, Workbench is disqualified from enterprise procurement before the product is evaluated. Currently, Workbench supports SSO but lacks SAML federation, audit log export, and SOC 2 Type II certification [fictional]. This opportunity is categorized as "must-do" regardless of its impact score because it is a prerequisite for enterprise deployment rather than a competitive advantage.
**Impact Potential:** High (gate, not differentiator)
**Confidence:** High

**Evidence:**
- Discovery interviews (Oct 2025): "IT security will block deployment if the tool doesn't have SAML and audit logs. It's not a discussion." P2, Director of Compliance [fictional]
- Stakeholder analysis (Oct 2025): IT Security Leads are a neutral-but-blocking stakeholder; they gate deployment regardless of end-user enthusiasm
- Competitive analysis (Feb 2026): Confluence, Notion, Coda, and Monday.com all offer SSO and SAML; this is table stakes

#### Solutions

**Solution 2A: SAML Integration and Audit Log Export**
- Description: Add SAML 2.0 federation for enterprise SSO providers (Okta, Azure AD, OneLogin). Add audit log export (CSV/JSON) for compliance teams. Add SCIM provisioning for automated user lifecycle management.
- Effort: M (SAML is well-documented; audit log export is straightforward; SCIM adds complexity)
- Riskiest Assumption: Workbench's existing authentication architecture supports SAML federation without a major refactor
- Assumption Test: Engineering spike (1 week) to validate SAML integration path with the existing auth system. Karen L. will assign this to Nate P. (Backend Eng) as part of the December 2025 CRDT spike sprint.

**Solution 2B: SOC 2 Type II Certification**
- Description: Complete SOC 2 Type II audit (6-12 month observation period). Produce compliance report available to enterprise prospects during procurement.
- Effort: XL (organizational process; not a feature build; requires cross-functional coordination with legal, security, and engineering)
- Riskiest Assumption: Workbench's current infrastructure and processes meet SOC 2 control requirements without significant remediation
- Assumption Test: SOC 2 readiness assessment with external auditor (2-week engagement) to identify gaps before committing to the full audit

---

### Opportunity 3: Confluence Migration Path

**Description:** Confluence is the installed base for the target enterprise segment. Discovery interviews revealed that UX improvements alone (Notion, Coda) are insufficient to justify migration cost. Enterprise teams will migrate when a new tool offers a capability Confluence structurally cannot provide. Blueprints governance enforcement is that capability, but migration still requires a smooth transition path for existing Confluence content and workflows. The 15 Confluence-migrant accounts in the closed beta [fictional] represent a natural test population for migration tooling.
**Impact Potential:** Medium
**Confidence:** Medium

**Evidence:**
- Discovery interviews (Oct 2025): "We've evaluated Notion twice. Both times the answer was 'it's nicer but it doesn't solve our approval problem.' That's not enough to justify migrating 400 people." P1, VP Ops [fictional]
- Stakeholder analysis: Estimated 15 of 80 closed-beta accounts [fictional] are actively migrating from Confluence
- Competitive analysis: Confluence has 3,000+ Marketplace apps and deep Jira integration; Workbench cannot compete on ecosystem depth

#### Solutions

**Solution 3A: Confluence Template Import**
- Description: Automated import tool that reads Confluence page templates and recreates them as Workbench Blueprints, preserving section structure, headings, and placeholder text. Does not import page content or history. The tool would use the Confluence REST API to extract template definitions programmatically.
- Effort: M (Confluence REST API is well-documented; template structure mapping is moderate complexity)
- Riskiest Assumption: Confluence template structures are consistent enough to map programmatically to Blueprints sections (they may use arbitrary HTML rather than structured sections)
- Assumption Test: Prototype import tool tested against 5 real Confluence template exports from closed-beta migrant accounts [fictional]

**Solution 3B: Guided Manual Migration Program**
- Description: Step-by-step migration guide (documentation plus video walkthrough) for enterprise teams to manually recreate their Confluence templates as Workbench Blueprints. Includes a dedicated Customer Success manager for the first 30 days.
- Effort: S (content creation; no engineering work)
- Riskiest Assumption: Enterprise teams are willing to invest 2-4 hours manually recreating templates rather than requiring automated import
- Assumption Test: Offer guided migration to 5 closed-beta migrant accounts [fictional]; measure completion rate and satisfaction (NPS survey at day 30)

---

## Prioritization

### Current Focus

**Priority Opportunity:** Opportunity 1, Documentation Governance Gap
**Priority Solution:** Solution 1A, Required-Section Enforcement
**Rationale:** Highest impact, highest confidence, and the only capability that is both (a) unmatched by any competitor and (b) sufficient to justify Confluence migration. Required-section enforcement is the foundation of the Blueprints value proposition; all other features build on it. Karen L. has confirmed that the enforcement gate is architecturally straightforward to implement, with the primary complexity residing in edge cases around concurrent editing via the Yjs CRDT layer.

### Opportunity Ranking

| Rank | Opportunity | Impact | Confidence | Effort | Score |
|------|-------------|--------|------------|--------|-------|
| 1 | Documentation Governance Gap | High | High | M | 9/10 |
| 2 | SSO and Security Parity Gate | High | High | M-XL | 7/10 (gate; must-do regardless of score) |
| 3 | Confluence Migration Path | Medium | Medium | S-M | 5/10 |

### Parking Lot

- **AI-assisted section drafting:** Section-aware AI that suggests content for required sections based on organizational context. High potential but requires significant ML investment; deferred to post-GA roadmap.
- **Multi-stage approval chains:** Support for sequential approval workflows (manager review, then compliance review, then department head sign-off). Requested by P5 (government contractor); deferred to v1.1 based on demand signal from GA customers.
- **Blueprint analytics dashboard:** Adoption and approval-cycle metrics per department. Useful for customer success and expansion conversations; deferred to post-experiment (need data from the A/B test first).

---

## Experiments Backlog

| Solution | Assumption | Test Method | Success Criteria | Status |
|----------|------------|-------------|------------------|--------|
| 1A: Required-Section Enforcement | Authors complete sections rather than abandoning | A/B test (closed beta, 4 weeks) | Median time-to-approval decreases by >=1.0 day; abandonment <+10pp | Planned (Mar 2026) |
| 1B: Native Approval Gates | Enterprise teams adopt single-tool approval | Closed-beta pilot (10 accounts, 30 days) | >=60% of pilot accounts use native approval within 30 days [fictional] | Planned (post-1A) |
| 2A: SAML Integration | Auth architecture supports SAML without refactor | Engineering spike (1 week) | Clean integration path identified; no major refactor required | Planned (Dec 2025) |
| 3A: Confluence Template Import | Template structures are mappable programmatically | Prototype import against 5 real exports | >=80% of templates import with correct section structure [fictional] | Planned (Q1 2026) |
| 3B: Guided Manual Migration | Teams will manually recreate templates | Offer to 5 migrant accounts; measure completion | >=4 of 5 accounts complete migration within 2 weeks [fictional] | Planned (Q1 2026) |

---

## Learning Log

| Date | Experiment | Result | Learning | Impact on Tree |
|------|------------|--------|----------|----------------|
| (none) | No experiments completed yet | (none) | (none) | (none) |

---

## Next Steps

- [ ] Finalize CRDT spike (December 2025) to validate co-editing architecture before committing to Blueprints build timeline
- [ ] Record ADR for CRDT library selection (Yjs vs. Automerge vs. ShareDB) based on spike findings
- [ ] Begin design rationale for Blueprint creation flow (guided wizard vs. blank canvas); Tomas G. leading
- [ ] Confirm A/B test instrumentation requirements with Leo M. (Data Analyst) for required-section experiment
- [ ] Schedule SOC 2 readiness assessment with external auditor (Solution 2B prerequisite)

---

*This is a living document. Update as you learn from experiments and customer feedback.*
