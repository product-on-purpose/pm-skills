---
title: "Foundation Persona: Storevine Product Detailed Campaigns"
description: "Storevine Campaigns product persona for multi-location merchant campaign management and audience segmentation."
artifact: persona
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.5.0"
created: 2026-03-02
status: sample
thread: storevine
context: Storevine Campaigns product persona for multi-location merchant campaign management and audience segmentation
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Storevine's Campaigns feature is gaining traction with single-store merchants, but the product team is now scoping v1.1 to address multi-location merchants who manage separate storefronts, inventories, and customer lists from a single Storevine account. These merchants represent 11% [fictional] of total merchants but generate 38% [fictional] of platform GMV. Their campaign needs are structurally different: they require audience segmentation by location, brand-consistent templates across storefronts, and reporting that separates per-store performance. The PM needs a detailed product persona to ground PRD requirements, cross-store edge cases, and dashboard instrumentation decisions.

**Source Notes:**

- Shopify Markets documentation describes multi-storefront management as a distinct user segment with unique workflows around localized content and audience management.
- Klaviyo segmentation best practices emphasize location-based audience filters and multi-list management as core requirements for multi-location retail operators.
- Baymard Institute checkout and commerce UX research highlights the operational complexity penalty when multi-location workflows inherit single-store assumptions.

---

## Prompt

```text
/persona product detailed

Build a detailed product persona for Storevine Campaigns multi-location merchant workflows.

Context:
- Product: Storevine (B2B ecommerce platform)
- Feature: Campaigns v1.1 multi-location support
- Merchant segment: multi-location operators (11% of merchants, 38% of GMV) [fictional]
- Key challenges: cross-store audience segmentation, template consistency, per-store reporting
- Prior work: competitive analysis identified Shopify Markets and Klaviyo multi-list as key benchmarks
- Target artifacts: PRD requirements, edge-case coverage, dashboard instrumentation

Output requirements:
- Narrative-first, decision-usable
- Explicit tradeoffs and decision moments
- Cross-store workflow friction and collaboration patterns
- Scenario tailoring for PRD, edge cases, instrumentation spec, dashboard requirements
- Assumptions/confidence/evidence trail
```

---

## Output

# Persona Dossier: Carlos Medina, The Multi-Store Operator Who Runs Marketing from a Spreadsheet (Product)

## Layer 1: Narrative Persona Dossier

## Executive summary
- Carlos manages four storefront brands from one Storevine account and cannot afford campaign mistakes that cross-contaminate audiences.
- He thinks in storefronts, not in campaigns. Every feature that assumes a single default audience breaks his workflow.
- Audience segmentation by location is not a power-user feature for him; it is a baseline requirement for correctness.
- He uses spreadsheets to reconcile what the platform should handle natively because cross-store reporting does not exist yet.
- Template consistency across storefronts matters because his brand guidelines vary by location and a wrong logo or color scheme damages customer trust.
- He delegates campaign execution to store managers but retains approval authority on anything that touches the full customer list.
- He evaluates new features by asking whether they reduce his reconciliation workload or add to it.
- "Send to all" is a dangerous default in his world because "all" means four different customer bases with four different expectations.
- He is the highest-value merchant segment by revenue contribution but the most underserved by current campaign tooling.
- His loyalty to Storevine depends on whether the platform grows with his operations or forces him to add external tools.

### 1) Opening scene
Carlos opens Storevine on a Tuesday morning to set up a seasonal promotion for his downtown flagship store. He navigates to Campaigns, picks a template, and immediately hits the first friction point: the audience selector shows his entire customer list across all four locations, with no way to filter by storefront. He has 11,200 customers [fictional] total, but only 3,100 [fictional] belong to the downtown store.

He exports the full list to a spreadsheet, manually filters by purchase-location tags he created himself, re-imports the segment, and then discovers the template he chose uses his wholesale storefront's header logo instead of the flagship brand.

Thirty minutes into what should have been a ten-minute task, he has not sent anything.

### 2) Who this person is when work gets real
Carlos owns a regional home-goods brand with four Storevine storefronts: a downtown flagship, two suburban locations, and a wholesale channel. He started with one store five years ago and expanded using Storevine because the platform promised unified management. He has a small team of store managers who handle day-to-day operations, but marketing decisions and customer communication remain his responsibility.

He is not a marketer by training. He is an operator who learned marketing by necessity and evaluates every tool through an operational efficiency lens.

### 3) Core tension and decision model
Carlos needs per-store precision with cross-store visibility. He wants to run location-specific campaigns without losing the ability to see aggregate performance across all storefronts. His decision model weighs correctness over speed: sending a campaign to the wrong audience is worse than sending it a day late.

Every campaign decision passes through a three-part filter: Is the audience correct? Does the template match the brand? Can I see the results by store?

### 4) Decision moments that define behavior
- Decision moment A: if audience segmentation requires manual export and re-import, delay the campaign and add it to the reconciliation spreadsheet.
- Decision moment B: if a template's branding defaults to the wrong storefront, spend time fixing it manually rather than risk sending a misbranded email.
- Decision moment C: if per-store results are not visible in the dashboard, pull raw data into a spreadsheet and build the view himself.
- Decision moment D: if a new feature adds cross-store risk without cross-store guardrails, decline to use it until guardrails exist.

### 5) What they say vs what they mean
| What they say | What they mean | Product implication |
|---|---|---|
| "I need to know which store this goes to." | The platform conflates audiences across storefronts and he cannot trust the default. | Make storefront the primary audience filter, not a secondary tag. |
| "My store managers should not touch the master list." | Delegation works only with location-scoped permissions. | Add storefront-level campaign permissions with approval workflows. |
| "I built this in a spreadsheet." | A core workflow gap exists that the platform has not addressed. | Investigate every reconciliation spreadsheet as a missing product feature. |
| "Send to all is dangerous." | Cross-store audience blending creates brand and compliance risk. | Require explicit storefront selection before campaign creation. |
| "I can't tell which store drove the revenue." | Aggregate reporting hides per-store attribution. | Default campaign dashboards to storefront-level breakdowns. |

### 6) Operating modes
- Normal mode: plan campaigns per storefront with dedicated templates and audience segments; review results weekly by location.
- Scaling mode: test new promotions at one location before rolling to others; needs A/B comparison by storefront.
- Reconciliation mode: manually rebuild what the platform should report natively; extract data, filter in spreadsheets, assemble cross-store views.

### 7) Product strategy implications
Priority stack:
- Storefront-scoped audience segments as first-class objects (not tag-based workarounds)
- Template assignment by storefront with brand-asset isolation
- Per-store campaign performance dashboards with aggregate roll-up option
- Storefront-level campaign permissions for store managers with owner approval gates
- Cross-store send prevention (require explicit confirmation when audience spans multiple storefronts)

Anti-patterns to avoid:
- Single-audience default that merges all storefronts into one list
- Template library without storefront association metadata
- Campaign reporting that only shows aggregate metrics without location drill-down
- Permission models that give store managers access to other locations' customer data

### 8) Design principles this persona forces
- Treat storefront as the primary organizational unit for campaigns, not the account.
- Never merge audiences across storefronts without explicit confirmation.
- Make per-store reporting the default view, not a drill-down option.
- Separate delegation from control: store managers execute, operators approve.
- Every reconciliation spreadsheet a multi-store merchant maintains is a feature gap.

### 9) If this persona wins, what changes?
Storevine Campaigns becomes the platform that grows with multi-location merchants instead of forcing them to outgrow it. Cross-store campaign management moves from spreadsheet workarounds to native workflow, and the highest-GMV merchant segment stops evaluating external tools.

---

## Layer 2: Operational Appendix

### A) Request Context
- **Mode:** product
- **Mode alias used:** none
- **Detail profile:** detailed
- **Artifact or task context:** Campaigns v1.1 multi-location merchant workflow design
- **Domain context:** B2B ecommerce platform with multi-storefront merchant segment

### B) Depth Guidance
- **Product detailed:** ~350-900 lines (soft target)
- **Marketing detailed:** ~340-850 lines (soft target)
- **Brief profile (either mode):** ~170-360 lines (soft target)
- **Brief profile:** prioritize decision snapshot and immediate actions
- **Detailed profile:** include richer tradeoffs, constraints, and edge conditions
- **If user asks comprehensive/best-in-class:** target upper half of selected range

### C) Completeness Floors (Soft)
- **Product detailed:** 8+ substantive sections, 2+ tables/matrices, 5+ scenario-tailoring entries
- **Marketing detailed:** 8+ substantive sections, 2+ tables/matrices, 4+ scenario-tailoring entries
- **Brief profile:** 6-10 executive-summary bullets and 3+ scenario-tailoring entries
- **All outputs:** sections must be decision-usable; do not ship placeholder-level bullets

### D) Includes / Excludes
- **Includes:** multi-store workflow friction, audience segmentation by storefront, cross-store permission models, template brand isolation, per-store reporting requirements
- **Excludes:** single-store onboarding flows, paid channel acquisition strategy, platform-level pricing architecture

### E) Scenario tailoring
- For `prd`: require storefront-scoped audience segments, template-storefront association, per-store dashboards, and cross-store send confirmation as v1.1 scope items.
- For `edge-cases`: cover customer who exists in multiple storefront audiences, store manager sending to wrong storefront, template with mismatched brand assets, and campaign targeting a storefront with zero subscribers.
- For `instrumentation-spec`: instrument storefront selection events, cross-store audience overlap detection, template-brand mismatch warnings, and per-store campaign performance tracking.
- For `dashboard-requirements`: default to storefront-level campaign metrics with aggregate roll-up toggle, including per-store open rate, click rate, revenue attribution, and audience growth.
- For `user-stories`: encode storefront-scoped campaign creation, store-manager delegation with approval gates, and cross-store audience merge confirmation.

### F) When not to use this persona
- Consumer product onboarding with single-user context
- Enterprise committee buying and procurement decisions
- Brand marketing campaigns with no storefront-level segmentation

### G) Assumptions and Confidence
- **Key assumptions:**
  - Multi-location merchants are the highest-value segment and their retention depends on native multi-store tooling.
  - Current workarounds (spreadsheet reconciliation, manual audience filtering) are unsustainable as merchant store count grows.
  - Storefront-level audience segmentation is a correctness requirement, not a convenience feature.
  - Store managers need scoped access, not full-account campaign permissions.
- **Confidence:** Medium
- **Confidence rationale:** Revenue-contribution data and competitive benchmarks support the strategic importance of this segment, but store-manager delegation patterns and cross-store send frequency have not been validated with telemetry.

## Evidence Trail

### User-provided inputs
| ID | Resource | Type | Used for | Notes |
|---|---|---|---|---|
| U1 | Storevine multi-location merchant segment data | user prompt | segment sizing and GMV contribution | metrics marked `[fictional]` |
| U2 | Competitive analysis findings on Shopify Markets and Klaviyo | user prompt | benchmark framing and gap identification | prior research referenced |
| U3 | Request for detailed product persona with cross-store focus | user prompt | depth profile and multi-store scenario tailoring | explicit emphasis on edge cases and instrumentation |

### LLM-discovered references
| ID | Resource | Type | Access method | Used for | Reliability notes |
|---|---|---|---|---|---|
| L1 | Shopify Markets multi-storefront documentation | product docs | browse/search | multi-store management benchmark | strong primary source |
| L2 | Klaviyo segmentation and multi-list best practices | product docs | browse/search | audience segmentation requirements | relevant to email campaign workflows |
| L3 | Baymard Institute commerce UX research | research report | browse/search | operational complexity penalty framing | rigorous UX research |

### Evidence gaps and follow-up questions
| Gap ID | Missing support | Impacted claims/sections | Confidence impact | Follow-up question |
|---|---|---|---|---|
| G1 | Cross-store send frequency and audience overlap rates | audience segmentation prioritization | Medium | How often do multi-location merchants intend to send campaigns across storefronts vs. within a single storefront? |
| G2 | Store-manager campaign permission usage patterns | delegation model design | Medium | What campaign actions do store managers currently perform vs. what do operators reserve for themselves? |
| G3 | Reconciliation spreadsheet prevalence and structure | missing-feature prioritization | Medium | What percentage of multi-store merchants maintain manual reconciliation spreadsheets for campaign data? |

### Claim mapping
| Claim ID | Claim summary | Evidence IDs | Confidence | Assumptions |
|---|---|---|---|---|
| C1 | Storefront-scoped audiences are a correctness requirement for multi-store merchants | U1, U2, L1, L2 | Medium | current merged-list behavior causes cross-store send errors |
| C2 | Template brand isolation prevents brand-trust damage across storefronts | U1, L1, L3 | Medium | multi-brand merchants have distinct visual identity per storefront |
| C3 | Per-store reporting is the default view expectation for this segment | U1, U2, L1 | Medium | aggregate-only dashboards force spreadsheet reconciliation |
| C4 | Delegation with approval gates matches real operator-manager dynamics | U1, L3 | Medium | store managers handle execution but operators retain approval authority |
