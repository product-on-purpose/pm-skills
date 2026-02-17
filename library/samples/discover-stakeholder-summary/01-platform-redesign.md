---
artifact: stakeholder-summary
version: "1.0"
created: 2026-01-22
status: complete
context: B2B SaaS company undertaking a major platform redesign affecting all product lines
---

# Stakeholder Summary: Platform UI Redesign ("Project Horizon")

## Overview

**Project:** Redesign the core platform UI — navigation, design system, and interaction patterns — across all 4 product lines (CRM, Marketing, Support, Analytics)
**Purpose:** Identify and align stakeholders across a high-impact, cross-organizational redesign that touches every customer and every team
**Date:** January 2026
**Owner:** Maya Patel, Senior Product Manager, Platform Team

## Stakeholder Map

```
                    [High Interest]
                          |
        KEEP SATISFIED    |    MANAGE CLOSELY
         - CEO            |     - CPO (Laura)
         - CFO            |     - VP Design (Tomás)
                          |     - VP Engineering (Raj)
                          |     - CRM Product Lead (Sophie)
                          |     - Marketing Product Lead (Nate)
[Low Influence] ----------+---------- [High Influence]
                          |
        MONITOR           |    KEEP INFORMED
         - Recruiting     |     - Support Product Lead (Aisha)
         - Office Ops     |     - Analytics Product Lead (Derek)
                          |     - Customer Success VP (Brian)
                          |     - Sales VP (Christina)
                    [Low Interest]
```

### Quadrant Placement

**Manage Closely (High Influence, High Interest):**
- Laura Chen, CPO — Executive sponsor, owns product vision and cross-product consistency
- Tomás Rivera, VP Design — Design authority, owns design system and UX standards
- Raj Krishnamurthy, VP Engineering — Controls engineering resources across all product teams
- Sophie Wagner, CRM Product Lead — Largest product line, most customers affected
- Nate Park, Marketing Product Lead — Fastest-growing product, most active feature roadmap

**Keep Satisfied (High Influence, Low Interest):**
- David Kim, CEO — Board visibility, brand implications, but delegates to CPO
- Elena Marchetti, CFO — Budget authority for cross-product initiatives, cares about ROI not details

**Keep Informed (Low Influence, High Interest):**
- Aisha Johnson, Support Product Lead — Smaller team, fewer resources to contribute, but deeply affected
- Derek Hoffman, Analytics Product Lead — Newest product, still establishing its own patterns
- Brian O'Sullivan, VP Customer Success — Customer-facing impact, renewal risk concerns
- Christina Reyes, VP Sales — Demo experience impact, competitive positioning

**Monitor (Low Influence, Low Interest):**
- Recruiting Team — Employer brand implications from design quality, but minimal project involvement
- Office Operations — Training material updates needed post-launch

## Stakeholder Profiles

| Stakeholder | Role | Influence | Interest | Alignment | Key Need |
|-------------|------|-----------|----------|-----------|----------|
| Laura Chen | CPO | High | High | Supportive | Unified product experience, reduced design debt |
| Tomás Rivera | VP Design | High | High | Strongly Supportive | Design system authority, elevated craft quality |
| Raj Krishnamurthy | VP Engineering | High | High | Cautious | Clear scope, manageable timeline, no product velocity hit |
| Sophie Wagner | CRM Product Lead | High | High | Resistant | CRM roadmap protection, customer disruption minimized |
| Nate Park | Marketing Product Lead | Medium | High | Supportive | Modern UI attracts marketing buyers, willing to invest |
| Brian O'Sullivan | VP Customer Success | Medium | Medium | Concerned | Customer change management, renewal risk mitigation |
| Christina Reyes | VP Sales | Medium | Low | Neutral | Better demo experience, but skeptical of timeline claims |

## Detailed Stakeholder Analysis

### Laura Chen, CPO

**Role:** Chief Product Officer, Executive Sponsor
**Influence Level:** High — Final authority on product direction and cross-product decisions
**Interest Level:** High — This is her strategic initiative, tied to board-level OKR for platform unification
**Current Alignment:** Supportive

**Needs:**
- Unified experience that makes the multi-product suite feel like one platform
- Reduced customer complaints about inconsistency across products
- Visible progress to present to the board quarterly

**Concerns:**
- Project scope expanding beyond what's achievable in two quarters
- Product leads resisting changes that affect their individual roadmaps
- Customer backlash if the redesign feels like "change for change's sake"

**What Motivates Them:**
- Platform vision — building a best-in-class, cohesive product suite
- Customer satisfaction and NPS improvement
- Competitive positioning against point solutions

**Preferred Communication:**
- Channel: Weekly 1:1, Slack for quick decisions
- Frequency: Weekly check-in with cross-product rollup
- Style: Strategic narrative with customer impact data

---

### Tomás Rivera, VP Design

**Role:** VP of Design, Design System Owner, 18-person design org
**Influence Level:** High — Owns design decisions, his team executes the redesign
**Interest Level:** High — This project is the culmination of 2 years of design system investment
**Current Alignment:** Strongly Supportive — this was his proposal

**Needs:**
- Authority to enforce design system adoption across all product teams
- Engineering partnership to build reusable component library
- Time to do the work properly — no cutting corners on craft

**Concerns:**
- Product teams forking the design system or requesting excessive exceptions
- Engineering treating design system components as "nice to have" instead of "must use"
- Timeline pressure compromising design quality
- His team being spread too thin across 4 product lines simultaneously

**What Motivates Them:**
- Design craft excellence and industry recognition
- Building a world-class design system that ships, not just documents
- Elevating design's influence in the organization

**Preferred Communication:**
- Channel: Design reviews (in-person/video), Figma comments for async
- Frequency: Bi-weekly design reviews, daily async in Figma
- Style: Visual, show-don't-tell, prototype-driven

---

### Raj Krishnamurthy, VP Engineering

**Role:** VP Engineering, 120 engineers across all product lines
**Influence Level:** High — Controls engineering allocation and technical architecture decisions
**Interest Level:** High — Massive engineering investment required, technical debt implications
**Current Alignment:** Cautious

**Needs:**
- Clear, bounded scope that doesn't balloon mid-project
- Migration path that doesn't require rewriting existing features
- Component library that actually reduces engineering effort over time
- Parallel workstreams so product teams can continue shipping features

**Concerns:**
- Engineering teams pulled from feature work for "UI polish" (perceived as low value by engineers)
- Technical approach requiring migration of 200+ existing pages/views
- Design system components that are rigid and don't cover edge cases, creating more work not less
- Performance regression from new component library (heavier bundle, slower renders)

**What Motivates Them:**
- Engineering velocity and developer experience
- Technical architecture quality and long-term maintainability
- Team morale — engineers want to build features, not rewrite UIs

**Preferred Communication:**
- Channel: Architecture reviews, Slack #platform-eng channel
- Frequency: Bi-weekly technical review, weekly async status
- Style: Technical depth, performance data, migration complexity analysis

---

### Sophie Wagner, CRM Product Lead

**Role:** Product Lead for CRM, company's flagship product (60% of revenue)
**Influence Level:** High — CRM is the largest product, her voice carries significant weight
**Interest Level:** High — Every CRM customer will be affected by the redesign
**Current Alignment:** Resistant

**Needs:**
- Zero negative impact on CRM metrics (activation, retention, feature adoption)
- Opt-in migration for enterprise customers who've customized their workflows
- CRM team's feature roadmap protected — no more than 20% capacity allocated to redesign
- Customer communication plan that positions change positively

**Concerns:**
- Enterprise customers who've built workflows around current UI will be disrupted
- CRM team losing 2-3 months of feature velocity during migration
- Design system constraints limiting CRM-specific UI patterns that customers depend on
- Being forced to adopt patterns designed for simpler products that don't work for CRM complexity

**What Motivates Them:**
- CRM revenue growth and retention metrics
- Enterprise customer satisfaction and expansion
- Her team's autonomy and roadmap ownership

**Preferred Communication:**
- Channel: Direct 1:1 meetings, detailed written proposals she can review async
- Frequency: Weekly during active phases, bi-weekly otherwise
- Style: Data-driven, customer impact analysis, specific migration plans

---

### Nate Park, Marketing Product Lead

**Role:** Product Lead for Marketing automation product, fastest-growing line
**Influence Level:** Medium — Growing product but still 15% of revenue
**Interest Level:** High — Sees redesign as competitive advantage for marketing buyers
**Current Alignment:** Supportive

**Needs:**
- Modern, visually appealing UI that helps win deals against competitors (HubSpot, Mailchimp)
- Marketing product prioritized early in rollout for competitive advantage
- Design patterns that support data visualization and campaign workflows

**Concerns:**
- Marketing product being deprioritized in rollout sequence behind CRM
- Design system being too "enterprise-boring" — marketing buyers expect visual flair
- Timeline slipping and his competitive window closing

**What Motivates Them:**
- Product-led growth and market share gains
- Visual differentiation from competitors
- Fast execution and market responsiveness

**Preferred Communication:**
- Channel: Slack, quick syncs, shared Figma files
- Frequency: Weekly async update, ad-hoc design reviews
- Style: Visual mockups, competitive comparisons, customer quotes

## Key Relationships

### Dependencies
| From | To | Dependency Type |
|------|-----|-----------------|
| All Product Teams | Tomás (Design) | Design system components and patterns |
| All Product Teams | Raj (Engineering) | Shared component library and migration tooling |
| Maya (PM) | Laura (CPO) | Executive sponsorship and cross-team authority |
| Maya (PM) | Sophie (CRM) | CRM team capacity allocation and migration planning |
| Brian (CS) | Sophie (CRM) | Customer communication plan for CRM enterprise accounts |
| Christina (Sales) | Nate (Marketing) | Demo environment and competitive positioning updates |

### Alliances
- **Executive alignment:** Laura and Tomás are strongly aligned — she championed his design system investment and this project is the payoff. Laura can influence Raj on resource allocation
- **Growth coalition:** Nate and Christina are natural allies — both want a modern UI to win deals. Nate's enthusiasm can be leveraged to build momentum
- **Operational concern:** Sophie and Brian share customer disruption concerns. Addressing Sophie's migration plan satisfies Brian's renewal risk worries simultaneously
- **Technical partnership:** Raj and Tomás need to build trust — historically, engineering has felt design delivers "pixel-perfect mockups that ignore technical constraints." Early technical collaboration is critical

### Potential Conflicts
| Parties | Conflict Area | Risk Level |
|---------|---------------|------------|
| Sophie vs. Tomás | Design system flexibility vs. consistency — CRM needs custom patterns that Tomás may view as exceptions undermining the system | High |
| Raj vs. Laura | Timeline and scope — Raj wants bounded, phased migration while Laura wants visible cross-product progress for board | High |
| Nate vs. Sophie | Rollout priority — both want their product migrated first for different reasons | Medium |
| Tomás vs. Raj | Component implementation quality — design wants pixel-perfect, engineering wants "good enough" to ship faster | Medium |

## Communication Plan

| Stakeholder | Frequency | Channel | Content | Owner |
|-------------|-----------|---------|---------|-------|
| Laura Chen | Weekly | 1:1 meeting | Cross-product progress, decisions needed, risk escalation | Maya |
| Tomás Rivera | Bi-weekly | Design review | Component progress, pattern decisions, exceptions review | Maya + Design Lead |
| Raj Krishnamurthy | Bi-weekly | Technical review | Architecture decisions, migration progress, performance data | Maya + Tech Lead |
| Sophie Wagner | Weekly | Private 1:1 | CRM migration plan, capacity impact, customer concerns | Maya |
| Nate Park | Bi-weekly | Slack + async | Marketing rollout timeline, design direction, competitive wins | Maya |
| Brian O'Sullivan | Monthly | CS leadership sync | Customer communication plan, risk mitigation, training timeline | Maya + Sophie |
| Christina Reyes | Monthly | Sales enablement sync | Demo environment updates, competitive messaging, timeline | Maya + Nate |
| All stakeholders | Monthly | Platform Horizon All-Hands | Progress demo, upcoming milestones, open Q&A | Maya + Tomás |

## Risk Mitigation

### Resistant Stakeholders

| Stakeholder | Concern | Mitigation Strategy | Owner |
|-------------|---------|---------------------|-------|
| Sophie Wagner | CRM roadmap disruption and enterprise customer backlash | Propose phased CRM migration with enterprise opt-in period; cap CRM team allocation at 20%; co-create customer communication plan; give Sophie veto on CRM-specific timeline | Maya + Sophie |
| Raj Krishnamurthy | Unbounded scope and engineering velocity impact | Define scope as component library + 3 core surfaces (nav, settings, dashboards) for Phase 1; provide migration tooling (codemod scripts) to reduce manual effort; track and publish velocity impact data transparently | Maya + Tech Lead |

### Political Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Sophie escalates to CEO, framing redesign as threat to flagship product | Project paused or CRM exempted, undermining unified vision | Proactive relationship building with Sophie; ensure CRM team has genuine input on design patterns; Laura privately aligns with CEO before any escalation could occur |
| Raj's teams deprioritize component adoption, shipping with old patterns | Inconsistent UI persists, project fails to deliver value | Build migration into sprint planning with engineering leads; automated linting that flags old component usage; celebrate teams that adopt early |
| Tomás blocks CRM exceptions, creating adversarial relationship with Sophie | Design-product friction slows the entire project | Establish "exception review" process with clear criteria; Tomás and Sophie meet weekly to resolve pattern conflicts collaboratively; Laura mediates if needed |
| Board asks for faster progress, Laura pressures for scope expansion | Quality suffers, team burns out, timeline still slips | Laura presents phased roadmap to board upfront with clear Phase 1 scope; Maya provides monthly board update showing focused progress over breadth |

## Action Items

- [ ] Schedule private 1:1 with Sophie to co-design CRM migration approach and hear concerns without audience (Maya, this week)
- [ ] Organize design-engineering kickoff workshop with Tomás and Raj's leads to align on component architecture and build trust (Maya, next week)
- [ ] Draft CRM enterprise customer communication plan with Sophie and Brian for Laura's review (Maya + Sophie, by end of month)
- [ ] Create "Phase 1 Scope" document with explicit boundaries for Laura and Raj to approve (Maya, this week)
- [ ] Set up monthly demo cadence for all stakeholders showing live progress (Maya + Tomás, starting next month)
- [ ] Prepare competitive analysis showing UI modernization impact on win rates for Christina and Nate to build buy-in (Maya + Nate, next two weeks)

## Document History

| Date | Change | Author |
|------|--------|--------|
| 2026-01-22 | Initial creation | Maya Patel |
| 2026-01-22 | Added political risks section after CPO feedback | Maya Patel |

---

*Review and update this document when stakeholder dynamics change or at major project milestones. Scheduled review: before Phase 1 kickoff and at each phase gate.*
