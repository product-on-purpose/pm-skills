---
title: "Deliver Launch Checklist: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - Campaigns v1 GA launch checklist."
artifact: launch-checklist
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . Campaigns v1 GA launch checklist
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Four weeks before the Campaigns GA date of April 28, 2026, Storevine's growth PM compiled the launch checklist to coordinate readiness across engineering, design, legal, merchant success, and marketing. The checklist reflects the unusual compliance complexity of a production email send feature . where legal sign-off is a hard blocker and DMARC/SPF/DKIM sender authentication is a technical prerequisite for inbox delivery, not a nice-to-have.

**Source Notes:**

- CAN-SPAM Act (FTC, ftc.gov) and GDPR Article 6 (gdpr.eu) . the legal requirements that make the Legal & Compliance section items non-negotiable blockers rather than optional pre-launch review steps; any production email send without Legal sign-off creates direct regulatory exposure.
- Google, "Email Sender Guidelines" (support.google.com/mail/answer/81126) and Yahoo's sender requirements (help.yahoo.com/kb/SLN27791) . the 2024 enforcement of DKIM, SPF, and DMARC authentication as prerequisites for inbox delivery to Gmail and Yahoo accounts, which represent the majority of merchant customer inboxes, making sender authentication a launch-gate infrastructure item.
- SendGrid, "IP Warm-Up Overview" (sendgrid.com/blog/warming-up-your-ip-address/) . documents the required gradual volume ramp for new dedicated sending IPs to establish sender reputation with inbox providers before full-volume merchant sends are enabled at GA.

---

## Prompt

```
deliver-launch-checklist

Feature: Campaigns v1.0 . native email marketing for Storevine merchants
Launch date: April 28, 2026
Launch type: Major Release
Launch owner: Growth PM

Key compliance and infrastructure requirements:
- Legal sign-off on CAN-SPAM + GDPR required before any production send
- DMARC/SPF/DKIM sender authentication required for Gmail/Yahoo inbox
  delivery (enforced by Google and Yahoo since 2024)
- SendGrid dedicated IP warm-up plan needed before full-volume sends
- Feature flag rollout: start at 10% of merchants [fictional], scale
  to 100% over 2 weeks based on send failure rates

Stakeholders:
- Engineering Lead (Platform Squad)
- Merchant Success (launch comms + support)
- Legal (CAN-SPAM/GDPR review)
- Storevine Marketing (announcement + dog-food)

Key risks from stakeholder summary:
- Legal review not started; hard gate on compliance sign-off
- Klaviyo partner team needs 48-hour advance notice before GA announcement
- Power-user merchant beta cohort expectations may exceed v1 scope

Need: full pre-launch checklist with go/no-go criteria, rollback plan,
and check-in schedule.
```

---

## Output

# Launch Checklist: Campaigns v1.0 GA

## Launch Overview

| Field | Value |
|-------|-------|
| What | Campaigns v1.0 . native email marketing built into the Storevine admin |
| Launch Date | April 28, 2026 |
| Launch Type | Major Release |
| Launch Owner | Growth PM |
| Go/No-Go Decision Maker | Head of Product |

### Key Stakeholders

| Role | Name | Contact |
|------|------|---------|
| Product | Growth PM | #campaigns-launch (Slack) |
| Engineering | Engineering Lead, Platform Squad | #campaigns-build (Slack) |
| Design | Design Lead | #campaigns-design (Slack) |
| Marketing | Storevine Marketing Lead | #marketing (Slack) |
| Support | Merchant Success Lead | #merchant-success (Slack) |

## Engineering Readiness

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Code complete and merged to main | Engineering Lead | Apr 21 | | All Campaigns v1 stories merged; no open PRs |
| [ ] Code review approved | Engineering Lead | Apr 21 | | All P0/P1 stories require two-reviewer approval |
| [ ] Feature flag configured (10% merchant rollout [fictional]) | Backend Engineer | Apr 23 | | Merchant-level flag; starts at 10%; escalation path to 100% or 0% defined |
| [ ] Database migrations ready (attribution_events table, consent records) | Backend Engineer | Apr 23 | | Reviewed and tested in staging; migration script ready for prod |
| [ ] API documentation updated (send API, webhook receiver spec) | Engineering Lead | Apr 25 | | Campaigns API endpoints documented in internal API reference |
| [ ] Performance benchmarks pass (P95 send latency <3s at 10k recipients [fictional]) | Platform Squad | Apr 25 | | Load test results from Apr 25 review attached |

## QA & Testing

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Test plan executed (all P1 and P2 edge cases) | QA Lead | Apr 25 | | Edge cases document used as the QA test plan; all P1 scenarios required |
| [ ] Regression tests pass (Klaviyo integration unaffected, legacy email features intact) | QA Lead | Apr 25 | | Klaviyo API sync must remain functional; legacy email tool access unchanged |
| [ ] UAT complete with beta merchant cohort (5 discovery merchants [fictional]) | Merchant Success | Apr 24 | | Beta access provided T-4 weeks; no blocker-level feedback before go/no-go |
| [ ] Cross-browser testing (Chrome, Safari, Firefox . desktop) | QA Lead | Apr 24 | | Campaigns editor and send flow tested in all three |
| [ ] Mobile testing (iOS Safari, Android Chrome . Storevine admin responsive) | QA Lead | Apr 24 | | Admin is responsive; verify guided flow and audience selection on mobile viewports |
| [ ] Accessibility testing (WCAG 2.1 AA . keyboard navigation, screen reader) | Design Lead | Apr 24 | | Campaigns flow must meet AA; keyboard-navigable send flow required |
| [ ] Load testing complete (1,000 concurrent sends [fictional]) | Platform Squad | Apr 25 | | Stress test at 2× expected GA-day peak volume |
| [ ] Security review complete (unsubscribe token handling, GDPR consent data) | Engineering Lead | Apr 21 | | Unsubscribe token must be signed and single-use; consent data must be encrypted at rest |

## Design & UX

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Final designs approved (all Campaigns flows, empty states, error states) | Design Lead | Apr 18 | | Figma spec v4 approved by PM and Engineering Lead |
| [ ] Design QA complete (Figma spec vs. implementation review) | Design Lead | Apr 24 | | Component-level review; flag any pixel-level deviations from spec |
| [ ] Asset handoff complete (icons, illustrations for guided flow, email templates) | Design Lead | Apr 18 | | 8 pre-built email templates exported and loaded in staging |
| [ ] Copy/content finalized (onboarding, error messages, templates, compliance copy) | Growth PM + Design Lead | Apr 21 | | CAN-SPAM compliance copy in every template reviewed by Legal |
| [ ] Error states designed and implemented (per edge cases document) | Design Lead | Apr 18 | | All P1 error states have approved copy and implemented UI |
| [ ] Empty states designed and implemented (zero campaigns, zero opens, zero revenue) | Design Lead | Apr 18 | | Empty states are the first thing new merchants see; must be motivating, not blank |

## Marketing & Communications

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Launch announcement drafted and approved (in-app banner + merchant email) | Storevine Marketing | Apr 25 | | Merchant email sends on GA day to all active merchants |
| [ ] Blog post ready (Storevine Campaigns . your store's built-in email tool) | Storevine Marketing | Apr 25 | | Published at GA; no embargo leak before Apr 28 announcement |
| [ ] Social media content prepared (LinkedIn, X . merchant testimonial from beta) | Storevine Marketing | Apr 26 | | At least one beta merchant testimonial confirmed and approved for use |
| [ ] Email campaign to all active merchants scheduled (GA day, morning send) | Storevine Marketing | Apr 26 | | Reviewed and approved by Growth PM; uses the legacy Storevine email tool (ironic, noted) |
| [ ] Website landing page updated (Campaigns feature page live at GA) | Storevine Marketing | Apr 25 | | Page live in staging; DNS switch to prod on GA day |
| [ ] Demo video of guided first-campaign flow created | Storevine Marketing | Apr 22 | | 90-second screen recording showing new-merchant first-send experience |

## Customer Support

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Support documentation published (Campaigns help articles, setup guide) | Merchant Success | Apr 24 | | Minimum: getting started guide, how to send first campaign, how to read attribution results |
| [ ] FAQ created (top 10 merchant questions from beta) | Merchant Success | Apr 24 | | Beta access produced 23 support questions [fictional]; top 10 documented as FAQ |
| [ ] Support team trained (hands-on beta access + training session) | Merchant Success | Apr 22 | | Training session scheduled Apr 22; all support team members complete hands-on send before GA |
| [ ] Canned responses prepared (common questions, error situations, EU access question) | Merchant Success | Apr 24 | | Include canned response for "Why can't EU merchants use Campaigns yet?" |
| [ ] Escalation path defined (Campaigns bugs → Engineering Lead via #campaigns-support) | Merchant Success | Apr 21 | | Defined and communicated to full support team |
| [ ] Support staffing confirmed for GA week | Merchant Success | Apr 21 | | 2 additional support agents rostered for GA week [fictional] |

## Legal & Compliance

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] CAN-SPAM compliance architecture sign-off | Legal | Apr 14 | | **Hard blocker:** one-click unsubscribe, physical address, honest subject line enforcement . all must be confirmed by Legal before any production send capability is enabled |
| [ ] GDPR compliance reviewed (EU merchant access scoped to v1.1) | Legal | Apr 14 | | v1 GA is US merchants only; EU access requires separate Legal sign-off on consent data model (v1.1) |
| [ ] Terms of service updated (email marketing section, subscriber data handling) | Legal | Apr 14 | | Updated ToS must be live before GA; existing merchants are notified via in-app |
| [ ] Privacy policy updated (subscriber data collection, 7-day attribution window retention language) | Legal | Apr 14 | | Privacy policy must reflect the new attribution events data collected for each send |
| [ ] SendGrid data processing agreement reviewed (merchant subscriber data handled by SendGrid) | Legal | Apr 14 | | Storevine routes merchant subscriber data through SendGrid; DPA must be in place |

## Operations & Infrastructure

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] SendGrid dedicated IP provisioned and warm-up plan active | Platform Squad | Apr 14 | | IP warm-up must begin 2 weeks before GA to establish sender reputation before full-volume sends |
| [ ] DMARC, SPF, and DKIM configured for Campaigns sending domain | Platform Squad | Apr 21 | | **Launch gate:** Gmail and Yahoo require authentication for bulk senders; unconfigured sending domain results in deliverability failures |
| [ ] SSL certificates valid for Campaigns sending domain | Platform Squad | Apr 21 | | Verify certificate expiry dates; renew if expiring within 60 days |
| [ ] Attribution events table included in daily backup | Platform Squad | Apr 25 | | New table must be added to the backup job before GA |
| [ ] Incident response runbook created (Campaigns-specific: send failures, attribution backlog) | Engineering Lead | Apr 25 | | Runbook covers: how to check send queue depth, how to drain attribution event backlog, how to set feature flag to 0% |
| [ ] On-call rotation confirmed for GA week | Engineering Lead | Apr 25 | | Platform Squad on-call for the full GA week; escalation path to Engineering Lead confirmed |

## Analytics & Monitoring

| Item | Owner | Due | Status | Notes |
|------|-------|-----|--------|-------|
| [ ] Analytics events instrumented (campaign_created, campaign_sent, first_send, attribution_recorded) | Backend Engineer | Apr 25 | | All events from instrumentation spec implemented and firing in staging |
| [ ] Campaigns adoption dashboard created (first-send rate, send volume, attribution revenue) | Growth PM | Apr 25 | | Dashboard needed for the T+1 day review and ongoing hypothesis tracking |
| [ ] Send failure rate alert configured (trigger at >2% failure rate [fictional]) | Platform Squad | Apr 25 | | Alert routes to #campaigns-build Slack; threshold: 2% [fictional] of sends failing over any 15-minute window |
| [ ] Attribution event backlog alert configured (trigger at >500 unprocessed events [fictional]) | Platform Squad | Apr 25 | | Indicates webhook receiver is behind; alert routes to on-call engineer |
| [ ] Success metrics baselined (first-send rate, external email tool count, churn rate) | Growth PM | Apr 14 | | Pre-GA baseline locked 2 weeks before launch; post-GA metrics compared against this baseline |
| [ ] SendGrid event delivery logging active (open, click, unsubscribe, spam complaint) | Backend Engineer | Apr 25 | | Events logged to the attribution events table and to a Campaigns event log for debugging |

## Go/No-Go Criteria

### Must Have (Blockers)

- [ ] Legal sign-off on CAN-SPAM compliance architecture . no production email send capability enabled without this
- [ ] DMARC, SPF, and DKIM configured and verified for the Campaigns sending domain
- [ ] All P1 edge cases passing in QA (per edge cases document)
- [ ] Merchant Success training complete and canned responses approved
- [ ] Feature flag configured for 10% [fictional] gradual rollout with confirmed path to 100% or 0%

### Should Have

- [ ] Beta merchant UAT complete with no blocker-level feedback from the 5-merchant discovery cohort [fictional]
- [ ] Klaviyo partner notice email sent 48 hours before GA announcement (April 26, 2026)
- [ ] Demo video of guided first-campaign flow published on GA day

### Nice to Have

- [ ] P2 edge cases passing in QA
- [ ] EU merchant GDPR consent data model complete (deferred to v1.1 if not ready)
- [ ] Merchant testimonial in GA social media content

## Rollback Plan

### Trigger Conditions

- Send failure rate exceeds 5% [fictional] over any 60-minute window after GA
- A CAN-SPAM violation is reported (unsubscribe link absent or non-functional in a sent campaign)
- Attribution webhook receiver failure causes more than 1,000 unprocessed events to accumulate [fictional]
- A merchant data breach or unauthorized access to the subscriber data pipeline is detected

### Rollback Steps

1. Set the Campaigns feature flag to 0% . disables the Campaigns admin entry point for all merchants within 2 minutes of the flag change; in-flight sends already submitted to SendGrid are not recalled
2. Post a Storevine status page update: "Campaigns is temporarily unavailable . we're addressing an issue and will restore access shortly"
3. Verify that no campaigns remain queued in the SendGrid pipeline that have not yet been submitted; drain the queue or cancel pending sends as appropriate
4. Page the Engineering Lead and Platform Squad on-call for root cause analysis
5. Do not re-enable the feature flag until root cause is identified and resolved; do not set flag above 0% without Head of Product approval

### Rollback Owner

Engineering Lead . reachable via on-call PagerDuty [fictional]

### Rollback Time Estimate

Under 5 minutes (feature flag toggle to 0% takes effect within 2 minutes of change)

## Check-in Schedule

| Checkpoint | Date | Attendees |
|------------|------|-----------|
| T-7 days readiness review | April 21, 2026 | Growth PM, Engineering Lead, Design Lead, Merchant Success Lead |
| T-2 days go/no-go decision | April 26, 2026 | Growth PM, Engineering Lead, Head of Product |
| GA day launch sync | April 28, 2026, 9:00 AM | Growth PM, Engineering Lead, Merchant Success Lead |
| T+1 day review | April 29, 2026 | Growth PM, Engineering Lead, Head of Product |

## Open Issues

| Issue | Owner | Status | Impact |
|-------|-------|--------|--------|
| EU merchant GDPR consent data model | Legal | In progress | Risk: if Legal review is not complete by Apr 14, EU merchant access is confirmed as v1.1; not a blocker for US GA |
| Klaviyo partner notice email | Growth PM | Scheduled for Apr 26 | Risk: if not sent 48 hours before GA announcement, Klaviyo partnership team learns about Campaigns from a press release . medium partnership friction risk |
| Power-user merchant beta expectations | Merchant Success | Managed | Risk: discovery cohort participants have expectations from Jan interviews; Merchant Success will brief them on v1 scope at beta access (T-4 weeks) before GA |
