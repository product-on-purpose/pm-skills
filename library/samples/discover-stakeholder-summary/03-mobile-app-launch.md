---
artifact: stakeholder-summary
version: "1.0"
created: 2026-01-30
status: complete
context: B2B SaaS company launching its first native mobile app after years as web-only
---

# Stakeholder Summary: First Mobile App Launch ("Project Pocket")

## Overview

**Project:** Design, build, and launch the company's first native mobile app (iOS and Android), targeting field sales reps and on-the-go managers who need CRM access outside the office
**Purpose:** Align stakeholders across product, engineering, sales, and executive teams for a high-visibility launch that establishes mobile as a strategic platform
**Date:** January 2026
**Owner:** Jordan Lee, Product Manager, Mobile

## Stakeholder Map

```
                    [High Interest]
                          |
        KEEP SATISFIED    |    MANAGE CLOSELY
         - CEO (Avery)    |     - CTO (Miguel)
         - CFO            |     - VP Product (Rachel)
                          |     - Mobile Eng Lead (Tanya)
                          |     - Head of Design (Kevin)
                          |     - VP Sales (David)
[Low Influence] ----------+---------- [High Influence]
                          |
        MONITOR           |    KEEP INFORMED
         - HR / Recruiting|     - VP Marketing (Priya)
         - Legal          |     - VP Customer Success (Fiona)
                          |     - Solutions Engineering (Leo)
                          |     - Web Platform PM (Sam)
                    [Low Interest]
```

### Quadrant Placement

**Manage Closely (High Influence, High Interest):**
- Miguel Torres, CTO — Technical authority, owns build-vs-buy and platform decisions
- Rachel Goldstein, VP Product — Product strategy, defines what "v1" means, owns go/no-go
- Tanya Okonkwo, Mobile Engineering Lead — Hands-on technical execution, team capacity owner
- Kevin Walsh, Head of Design — Mobile UX quality bar, app design direction
- David Park, VP Sales — Primary customer advocate, his reps are the target users

**Keep Satisfied (High Influence, Low Interest):**
- Avery Thompson, CEO — Board-level commitment to mobile, but delegates to CTO/VP Product
- CFO — Budget approved, monitors spend against forecast, no operational involvement

**Keep Informed (Low Influence, High Interest):**
- Priya Mehta, VP Marketing — App Store presence, launch campaign, competitive messaging
- Fiona O'Brien, VP Customer Success — Customer rollout, training, support readiness
- Leo Hernandez, Solutions Engineering Lead — Demo capability, technical customer questions
- Sam Reeves, Web Platform PM — Feature parity decisions, shared API dependencies

**Monitor (Low Influence, Low Interest):**
- HR / Recruiting — Mobile engineer hiring pipeline
- Legal — App Store terms, data privacy for mobile-specific features (location, camera)

## Stakeholder Profiles

| Stakeholder | Role | Influence | Interest | Alignment | Key Need |
|-------------|------|-----------|----------|-----------|----------|
| Miguel Torres | CTO | High | High | Supportive | Solid technical foundation, not a throwaway MVP |
| Rachel Goldstein | VP Product | High | High | Supportive | Focused v1 scope that ships on time and validates mobile value |
| Tanya Okonkwo | Mobile Eng Lead | High | High | Cautiously Supportive | Realistic scope, quality engineering time, no "just ship it" pressure |
| Kevin Walsh | Head of Design | High | High | Enthusiastic | Showcase for mobile-first design, raise the company's UX bar |
| David Park | VP Sales | High | High | Strongly Supportive | His reps get mobile CRM access, competitive gap closed |
| Sam Reeves | Web Platform PM | Low | Medium | Concerned | Mobile doesn't break web API stability or hijack shared resources |

## Detailed Stakeholder Analysis

### Miguel Torres, CTO

**Role:** Chief Technology Officer, 90-person engineering organization
**Influence Level:** High — Owns technology decisions including platform choices, architecture, and team structure
**Interest Level:** High — Mobile is a new technical platform with long-term architectural implications
**Current Alignment:** Supportive

**Needs:**
- Architecture that supports mobile long-term (shared API layer, not mobile-specific hacks)
- Cross-platform strategy decision (native iOS + Android, React Native, or Flutter) made with rigor
- Mobile codebase that's maintainable by the team without becoming a separate silo
- Security architecture appropriate for mobile (offline data, device management, biometric auth)

**Concerns:**
- Building throwaway mobile code under launch pressure that becomes permanent technical debt
- Mobile team becoming isolated from platform team, creating divergent architectures
- Underestimating mobile-specific complexity (offline sync, push notifications, OS fragmentation)
- App Store review process adding unpredictable delays to release schedule

**What Motivates Them:**
- Technical excellence and long-term platform health
- Building the engineering organization's mobile capability as a strategic asset
- Shipping products that are technically sound, not just feature-complete

**Preferred Communication:**
- Channel: Architecture review meetings, Slack #mobile-eng for daily decisions
- Frequency: Weekly technical sync, bi-weekly architecture review
- Style: Technical depth, ADR format for decisions, data-backed trade-off analysis

---

### Rachel Goldstein, VP Product

**Role:** VP Product, owns product strategy and roadmap across web and (now) mobile
**Influence Level:** High — Defines v1 scope, owns launch go/no-go decision
**Interest Level:** High — Mobile launch is a company-level strategic initiative on her OKRs
**Current Alignment:** Supportive

**Needs:**
- Disciplined v1 scope that ships in Q2 — not a feature-crammed v1 that slips to Q4
- Clear success metrics defined before launch (adoption, engagement, feature usage)
- Customer validation of mobile use cases before committing to feature set
- Coordinated launch across product, marketing, sales, and customer success

**Concerns:**
- Scope creep from sales ("customers need X, Y, Z on mobile") turning v1 into a two-year project
- Launching a mediocre app that damages brand perception (can't un-launch a bad app)
- Mobile becoming a "mini web app" instead of a thoughtfully designed mobile experience
- Success metrics being set retroactively to justify whatever ships

**What Motivates Them:**
- Delivering products that customers love and that move business metrics
- Strategic clarity — mobile should serve a specific user need, not be "web on a phone"
- Cross-functional execution excellence on high-visibility launches

**Preferred Communication:**
- Channel: Weekly product review, Slack for async decisions
- Frequency: Weekly during build phase, daily during launch week
- Style: Customer-centric, metrics-focused, crisp scope decisions with rationale

---

### Tanya Okonkwo, Mobile Engineering Lead

**Role:** Lead Mobile Engineer, managing 4-person mobile team (2 iOS, 2 Android)
**Influence Level:** High — Technical feasibility and timeline depend entirely on her team
**Interest Level:** High — This is her team's defining project
**Current Alignment:** Cautiously Supportive

**Needs:**
- Realistic scope matched to 4-person team capacity over one quarter
- Early API stability from the web platform team — can't build mobile on shifting foundations
- Testing infrastructure (device lab, CI/CD for mobile, beta distribution)
- Design specs delivered 2+ sprints ahead of engineering to avoid blocking

**Concerns:**
- v1 scope being defined by non-technical stakeholders with unrealistic expectations
- Web platform API changing under her team without notice, breaking mobile builds
- Being held to a launch date that was set before scope and architecture were defined
- Her team's quality standards being overridden by "just ship it" pressure from sales

**What Motivates Them:**
- Building a mobile app she's proud to put on her resume and in the App Store
- Growing the mobile team and establishing mobile as a respected engineering discipline
- Technical craft — clean architecture, comprehensive testing, smooth CI/CD

**Preferred Communication:**
- Channel: Daily standup (team), weekly 1:1 with Jordan, Slack #mobile-eng
- Frequency: Daily for team coordination, weekly for roadmap alignment
- Style: Specific and concrete — user stories with acceptance criteria, not vague feature descriptions

---

### David Park, VP Sales

**Role:** VP Sales, 45-person sales org including 20 field reps
**Influence Level:** High — Sales revenue justifies mobile investment; his team's adoption determines success
**Interest Level:** High — Field reps have been requesting mobile access for 2+ years
**Current Alignment:** Strongly Supportive

**Needs:**
- Core CRM features accessible on mobile: view accounts, log activities, check pipeline, see contact details
- Offline access for reps in areas with poor connectivity (hospitals, manufacturing floors, rural areas)
- Push notifications for deal updates, new leads, and task reminders
- App ready to demo to prospects as competitive differentiator

**Concerns:**
- v1 being too limited to be useful ("if my reps can't log a call from the app, they won't use it")
- Launch delayed past Q2 — he's already promised customers mobile access in sales cycles
- App UX so different from web that reps need extensive retraining
- No offline mode making the app useless in exactly the situations where mobile matters most

**What Motivates Them:**
- Sales productivity — anything that helps reps close deals faster
- Competitive wins against vendors who already have mobile apps
- Happy sales team with modern tools (retention and recruiting advantage)

**Preferred Communication:**
- Channel: Bi-weekly sales-product sync, Slack for urgent customer requests
- Frequency: Bi-weekly, with monthly demo of progress
- Style: Feature-focused, real customer scenarios, "what can my reps do with this?"

---

### Kevin Walsh, Head of Design

**Role:** Head of Design, 10-person design team, first time designing a native mobile product
**Influence Level:** High — Mobile UX quality is make-or-break for app perception and adoption
**Interest Level:** High — Sees mobile as opportunity to establish world-class design practice
**Current Alignment:** Enthusiastic

**Needs:**
- Time to do proper mobile UX research (field studies with sales reps) before committing to designs
- Mobile design system that establishes patterns for future mobile expansion
- Close collaboration with Tanya's engineering team on native platform capabilities
- Design review authority before any feature ships in the app

**Concerns:**
- Being asked to "just make the web design smaller" instead of designing for mobile context
- Engineering implementing designs without design review under time pressure
- No mobile design experience on the team — learning curve risk
- Design system being skipped in v1 "to save time" and creating inconsistency debt

**What Motivates Them:**
- Design craft excellence and portfolio-worthy mobile work
- Establishing mobile design standards that scale beyond v1
- User research-driven design decisions, not assumption-driven

**Preferred Communication:**
- Channel: Design critiques (bi-weekly), Figma for async, Slack for daily
- Frequency: Bi-weekly design review, continuous async in Figma
- Style: Visual — prototypes, user flow diagrams, before/after comparisons

---

### Sam Reeves, Web Platform PM

**Role:** Product Manager for Web Platform, owns the APIs that mobile will depend on
**Influence Level:** Low — Doesn't control mobile decisions, but controls a critical dependency
**Interest Level:** Medium — Directly impacted by mobile API requirements but not leading the initiative
**Current Alignment:** Concerned

**Needs:**
- Advance notice of API requirements so his team can plan capacity
- Mobile team contributing to shared API, not requesting custom endpoints
- No regression to web platform stability from mobile-driven API changes
- Shared API versioning strategy that serves both platforms

**Concerns:**
- Mobile team requesting API changes that break web clients
- His team being pulled into mobile support work without capacity planning
- Mobile launching with a "good enough" API contract that becomes permanent
- Being blamed for mobile delays caused by API dependencies

**What Motivates Them:**
- Platform stability and developer experience for all API consumers
- Clean API design that serves multiple clients well
- His team's roadmap and priorities being respected

**Preferred Communication:**
- Channel: API planning meetings, Slack #platform-api channel
- Frequency: Weekly API sync during active development, bi-weekly otherwise
- Style: Technical, API spec driven, PRD format for new endpoint requests

## Key Relationships

### Dependencies
| From | To | Dependency Type |
|------|-----|-----------------|
| Tanya (Mobile Eng) | Sam (Web Platform) | API endpoints and data contracts for all mobile features |
| Kevin (Design) | Tanya (Mobile Eng) | Design specs delivered ahead of engineering sprints |
| Jordan (Mobile PM) | Rachel (VP Product) | Scope approval and go/no-go authority |
| Priya (Marketing) | Rachel (VP Product) | Launch messaging and timing coordination |
| Fiona (CS) | David (Sales) | Customer rollout plan and training coordination |
| Jordan (Mobile PM) | David (Sales) | User feedback and use case validation from field reps |

### Alliances
- **Executive sponsorship:** Miguel and Rachel are aligned on mobile as strategic investment. Miguel can influence technical decisions, Rachel can protect scope. Their alignment is the project's foundation
- **Customer validation:** David and Kevin are natural collaborators — David provides access to field reps for user research, Kevin uses research to drive design decisions. Connecting them early ensures designs serve real users
- **Technical partnership:** Tanya and Sam need a strong working relationship — mobile's success depends on API stability. Early joint planning prevents adversarial dynamics later
- **Launch coordination:** Priya, Fiona, and Leo form the go-to-market triad. Coordinating their efforts through a shared launch plan prevents fragmented customer communication

### Potential Conflicts
| Parties | Conflict Area | Risk Level |
|---------|---------------|------------|
| David (Sales) vs. Rachel (Product) | v1 scope — David wants comprehensive feature set, Rachel wants focused MVP | High |
| Kevin (Design) vs. Tanya (Engineering) | Timeline — Kevin wants research time, Tanya needs specs early, both constrained by Q2 deadline | High |
| Tanya (Mobile) vs. Sam (Web Platform) | API priority — mobile needs API changes, web platform has its own roadmap | Medium |
| Kevin (Design) vs. David (Sales) | Mobile UX approach — Kevin wants mobile-native innovation, David wants web-familiar patterns for easier rep adoption | Medium |

## Communication Plan

| Stakeholder | Frequency | Channel | Content | Owner |
|-------------|-----------|---------|---------|-------|
| Miguel Torres | Bi-weekly | Architecture review | Technical decisions, platform strategy, hiring needs | Jordan + Tanya |
| Rachel Goldstein | Weekly | Product review | Scope status, timeline, metrics definition, risks | Jordan |
| Tanya Okonkwo | Daily | Standup + weekly 1:1 | Sprint progress, blockers, API dependencies | Jordan |
| Kevin Walsh | Bi-weekly | Design review | Design progress, user research findings, pattern decisions | Jordan + Kevin's designer |
| David Park | Bi-weekly | Sales-product sync | Feature progress, beta access, customer feedback loop | Jordan |
| Sam Reeves | Weekly | API sync | Endpoint requirements, timeline, breaking changes | Tanya + Jordan |
| Priya Mehta | Monthly (bi-weekly near launch) | Launch planning | App Store assets, messaging, launch timeline | Jordan |
| Fiona O'Brien | Monthly (weekly near launch) | CS readiness | Training content, support playbook, rollout plan | Jordan + Fiona's lead |
| All stakeholders | Bi-weekly | Project Pocket All-Hands | Demo of latest build, milestone progress, open discussion | Jordan |

## Risk Mitigation

### Resistant Stakeholders

| Stakeholder | Concern | Mitigation Strategy | Owner |
|-------------|---------|---------------------|-------|
| David Park | v1 too limited for field reps to actually use | Run 2-week field study with 5 reps to identify true must-haves vs. nice-to-haves; co-prioritize v1 scope with David based on observed (not reported) behavior; guarantee v1.1 roadmap with top 3 features cut from v1 | Jordan + David |
| Sam Reeves | Mobile disrupting web platform stability | Establish shared API contract with versioning; mobile team contributes PRs to shared API (not separate endpoints); include Sam in bi-weekly architecture review; commit to no breaking changes to existing web endpoints | Tanya + Sam |

### Political Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| David promises mobile features to close deals before v1 scope is finalized | Scope locked by external commitments, team can't push back | Rachel communicates scope to David formally after finalization; sales enablement on what's in v1 vs. roadmap; Jordan attends sales standup monthly to catch early |
| CEO mentions mobile at conference with specific date that's earlier than internal timeline | External deadline pressure overrides quality standards | Miguel and Rachel align CEO on realistic timeline before any public communication; prepare "early access" option if CEO needs to show progress before full launch |
| Kevin's mobile design research delays engineering start, compressing build timeline | Engineers rush to build, quality suffers, launch at risk | Overlap research and engineering: Kevin starts research immediately while Tanya's team builds infrastructure (CI/CD, auth, offline framework); first design specs delivered 3 weeks into research, not after research completes |
| App Store rejection delays launch by 2-4 weeks | Marketing and sales plans disrupted, customer commitments missed | Submit "minimal viable app" for review 6 weeks before planned launch to surface rejection issues early; engage Apple developer relations proactively; build 2-week buffer into public launch date |

## Action Items

- [ ] Schedule field study with 5 of David's reps to observe mobile CRM usage in natural context (Jordan + Kevin, this week)
- [ ] Facilitate architecture decision meeting between Miguel, Tanya, and Sam on cross-platform approach and API strategy (Jordan, next week)
- [ ] Co-create v1 feature prioritization framework with Rachel and David — must-have, should-have, could-have, won't-have (Jordan, this week)
- [ ] Set up mobile CI/CD pipeline and beta distribution with Tanya's team (Tanya, first two weeks)
- [ ] Draft shared API contract with Sam's team covering v1 mobile data requirements (Tanya + Sam, by end of month)
- [ ] Submit skeleton app to App Store for initial review to surface any account/process issues early (Tanya, next two weeks)
- [ ] Create launch plan draft coordinating Priya (marketing), Fiona (CS), Leo (SE), and David (sales) timelines (Jordan, by end of month)

## Document History

| Date | Change | Author |
|------|--------|--------|
| 2026-01-30 | Initial creation | Jordan Lee |
| 2026-01-30 | Added Sam Reeves (Web Platform PM) as stakeholder after architecture discussion revealed API dependency risk | Jordan Lee |

---

*Review and update this document at each sprint review and when new stakeholders are identified. Critical review points: after field study (scope finalization), at alpha build (go/no-go checkpoint), and 4 weeks before launch (readiness assessment).*
