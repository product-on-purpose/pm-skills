---
title: "Deliver Edge Cases: Storevine Campaigns"
description: "Storevine B2B ecommerce platform - Campaigns campaign send flow edge cases."
artifact: edge-cases
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: storevine
context: Storevine B2B ecommerce platform . Campaigns campaign send flow edge cases
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Before the Campaigns build sprint begins, Storevine's growth PM and the Engineering Lead worked through the edge cases for the campaign creation and send flow to ensure QA has a complete test surface and engineering has clear behavior specifications for error states. The edge cases document is part of the engineering handoff package alongside the user stories and Figma specs.

**Source Notes:**

- CAN-SPAM Act (FTC, ftc.gov) . mandatory commercial email requirements (one-click unsubscribe, physical sender address, honest subject line) that make certain input validation edge cases P1 blockers . any campaign that bypasses these checks creates direct legal exposure for Storevine as the platform enabling the send.
- SendGrid API documentation (sendgrid.com/docs/api-reference/mail-send/mail-send/) . public API reference documenting error response codes (429 rate limit, 500 service error, 422 validation error) used to define the expected system behavior for integration failure scenarios.
- Nielsen Norman Group, "Error Message Guidelines" (nngroup.com/articles/error-message-guidelines/) . establishes best practices for user-facing error copy: state what happened, explain why if relevant, and tell the user what to do next . the principles applied in the Error Messages and Recovery Paths sections.

---

## Prompt

```
deliver-edge-cases

Feature: Campaigns . campaign creation and send flow
Sprint: Q2 2026 Campaigns build (GA Apr 28, 2026)

Key edge cases I want to cover:
- Input validation: subject line, email body, audience size, physical
  sender address (CAN-SPAM requirement)
- Boundary conditions: free tier send volume limit, min/max audience size
- Error states: network failure during send, SendGrid API errors
- Concurrency: double-click send, merchant edits in two browser tabs
- Integration failures: SendGrid unavailable, attribution webhook down

Related docs:
- User story US-CAM-001 (guided first-campaign flow)
- Spike summary: SendGrid attribution webhook confirmed
- Edge cases will be used for QA test plan and engineering handoff

Need: full edge cases document with error messages, recovery paths, and
QA test scenarios (P1/P2/P3).
```

---

## Output

# Edge Cases: Campaigns Campaign Send Flow

## Feature Overview

The Campaigns campaign send flow covers the full creation and send path: audience selection, template editing, subject line entry, pre-send compliance validation, and the send action that submits the campaign to SendGrid. Revenue attribution event recording (via SendGrid webhook) is a downstream step that is decoupled from the send action itself.

**Related Documents:**
- User Story US-CAM-001: Guided first-campaign flow for non-adopter merchants
- Spike Summary: Revenue attribution via SendGrid Event Webhooks (Feb 18, 2026)
- Design Rationale: Campaigns audience selection UX (Feb 14, 2026)

## Edge Case Categories

### Input Validation

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| Subject line is empty | Block send; show inline error "Add a subject line . recipients see this first" | P1 | Required by CAN-SPAM (honest subject line mandate) |
| Subject line contains only whitespace | Treat as empty; block send with same error as empty | P2 | Whitespace-only values must not bypass the empty check |
| Subject line exceeds 150 characters | Show character count warning at 100 characters; block save at 151 | P2 | Most email clients display 60 - 70 characters; 150 is the Campaigns max |
| Email body is blank | Block send; show inline error "Add content to your campaign before sending" | P1 | Empty HTML template is not a valid send |
| Email body contains only whitespace or empty HTML tags | Treat as empty; block send with same error as blank body | P2 | Strip whitespace before validation |
| Recipient audience has zero matching customers | Block send; show error "Your audience has no recipients. Choose a different segment." | P1 | Occurs when a named segment or custom filter matches no current customers |
| Physical sender address not configured in merchant account settings | Block send; show error "Add your business address in Account Settings to comply with CAN-SPAM requirements" with a direct link to settings | P1 | CAN-SPAM requires a physical address in every commercial email; Storevine provides it automatically if configured |

### Boundary Conditions

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| Audience size is 1 customer | Allow send; no minimum recipient count enforced in v1 | P2 | Confirm no bulk-send rate restrictions apply at this volume |
| Free tier monthly send limit exactly reached (10,000 sends used [fictional]) | Block send; show pre-send error "You've reached your 10,000 free sends for this month [fictional]. Upgrade to continue sending." | P1 | Block must fire before the SendGrid API call is made |
| Campaign audience exceeds remaining free tier sends (e.g., 200 recipients remaining, audience of 500) | Block send; show error with remaining count "You have 200 [fictional] free sends remaining this month . this campaign would send to 500. Reduce your audience or upgrade your plan." | P1 | Partial sends are not permitted; the entire campaign must be within the available send quota |
| Subject line is exactly 150 characters | Allow send; display character count warning but do not block | P2 | Warning copy: "Your subject line is at the 150-character limit. Most email clients show 60 - 70 characters." |
| Campaign is scheduled at exactly midnight on the first day of a new billing month | Campaign should use the send quota for the month in which it is sent, not the month in which it was scheduled | P2 | Edge case for scheduled send (future feature); document for when scheduling ships |

### Error States

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| Network failure during campaign send | Show toast error "Your campaign didn't send . check your connection and try again"; campaign draft is preserved; send button re-enables after 5 seconds | P1 | No automatic retry; user initiates retry manually |
| SendGrid API returns 429 (rate limit) | Queue the send and retry automatically after 60 seconds; show in-progress indicator "Your campaign is queued . we'll send it shortly" | P1 | SendGrid rate limits apply per sender per day; retry once; escalate to error state if retry also fails |
| SendGrid API returns 500 or 503 | Show error "Something went wrong on our end . your campaign is saved. Try again in a few minutes."; do not retry automatically | P1 | Log the error with campaign ID and merchant ID for support |
| SendGrid API returns 422 (validation error) | Show error "There's a problem with your campaign content . review your template and try again"; log the specific validation error for engineering review | P1 | 422 typically indicates a malformed payload; this should not occur if pre-send validation passes |
| Recipient list changes between audience preview and send confirmation | Recalculate audience count at the confirmation step; display updated count with note "Audience updated . X recipients will receive this campaign" | P2 | Race condition when segment data changes while merchant is in the send flow |
| Session expires while merchant is drafting a campaign | Prompt to re-authenticate; campaign draft state is preserved in the browser session and re-loaded after login | P2 | Draft is not submitted; no send has occurred; data is not lost |

### Concurrency

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| Merchant double-clicks the Send button | Disable the send button immediately on the first click; show a spinner; submit exactly one API call to SendGrid | P1 | Duplicate sends would result in two emails to the same audience and two attribution event sets |
| Merchant opens the same campaign draft in two browser tabs and edits both | Last write wins; the tab that saves second overwrites the first; show a warning "Another session modified this campaign" on the first tab after the conflict is detected | P2 | Draft state conflict resolution; acceptable for v1 |
| Merchant changes the audience selection after initiating the send confirmation step | Reload the audience count with the new selection; require re-confirmation before send is enabled | P1 | Do not allow send to proceed with a stale audience count after the merchant has made a change |

### Integration Failures

| Scenario | Expected Behavior | Priority | Notes |
|----------|------------------|----------|-------|
| SendGrid service is fully unavailable (no response) | Queue the campaign send; display in-app banner "Email sends are temporarily delayed . we'll send your campaign when the service is restored"; notify merchant via email if the delay exceeds 30 minutes [fictional] | P1 | Queued campaigns must be drained in order; no partial or reordered sends |
| Attribution webhook receiver is down at send time | Campaign send completes normally; attribution events for this send are missed but recoverable from the SendGrid event log; log the gap for manual reprocessing | P2 | Attribution is decoupled from the send action and must never block it |
| Storevine order database write fails for an attribution event | Log the failure silently; do not surface an error to the merchant; do not fail or retry the send | P3 | Attribution event writes are best-effort; a missed attribution event is a measurement gap, not a product failure |
| Attribution webhook receives a duplicate event (SendGrid retry) | The webhook receiver must be idempotent; deduplicate by `sg_event_id` before writing to the attribution events table | P2 | SendGrid guarantees at-least-once delivery; duplicate events are expected |

## Error Messages

| Error State | User Message | Additional Action |
|-------------|--------------|-------------------|
| Subject line empty | "Add a subject line . recipients see this first" | . |
| Email body empty | "Add content to your campaign before sending" | . |
| Audience has zero recipients | "Your audience has no recipients. Choose a different segment." | "Choose audience" button |
| Physical address missing | "Add your business address in Account Settings to comply with CAN-SPAM requirements." | "Go to Account Settings" link |
| Free tier send limit reached | "You've reached your 10,000 free sends for this month [fictional]. Upgrade to continue sending." | "Upgrade plan" link |
| Campaign audience exceeds remaining sends | "You have [X] free sends remaining this month. Reduce your audience or upgrade your plan." | "Upgrade plan" link |
| Network failure during send | "Your campaign didn't send . check your connection and try again." | "Try again" button |
| SendGrid service unavailable | "Email sends are temporarily delayed . we'll send your campaign when the service is restored." | "View Storevine Status" link |
| SendGrid validation error (422) | "There's a problem with your campaign content . review your template and try again." | . |

## Recovery Paths

### Empty Subject Line or Body

**User sees:** Inline error message below the affected field; the Send button is disabled.

**Recovery options:**
1. Edit the affected field; the error clears on the first valid character input.
2. Campaign draft is auto-saved; the merchant can exit and return without losing content.

**Data preservation:** All campaign draft content is preserved; no data is lost.

### Free Tier Send Limit Reached

**User sees:** Pre-send error modal before the SendGrid API call is made; the campaign is not submitted.

**Recovery options:**
1. Upgrade to a paid Campaigns send tier (link provided in the error modal).
2. Reduce the audience size to fit within the remaining monthly send quota.
3. Wait until the first of the next calendar month, when the free tier resets.

**Data preservation:** Campaign draft is preserved; the merchant can send next month without rebuilding the campaign.

### Network Failure During Send

**User sees:** Toast error "Your campaign didn't send . check your connection and try again"; the send button re-enables after 5 seconds.

**Recovery options:**
1. Click "Try again" . the same campaign draft is submitted again; no duplicate send risk because the send button was disabled during the first attempt.
2. Exit and return later; the draft is preserved.

**Data preservation:** Campaign draft is preserved; no partial send has occurred; recipient list is intact.

### SendGrid Service Unavailable

**User sees:** In-app banner "Email sends are temporarily delayed . we'll send your campaign when the service is restored."

**Recovery options:**
1. Wait . the campaign is queued automatically and will send when the service recovers.
2. Cancel the queued send from the Campaigns dashboard if the merchant no longer wants to send.

**Data preservation:** Campaign draft and queue position are preserved; the send will complete when the service is restored unless canceled by the merchant.

## Test Scenarios

### Must Test (P1)

- [ ] **Empty subject line:** Attempt to send a campaign with a blank subject line; verify send is blocked and inline error "Add a subject line . recipients see this first" appears below the subject field
- [ ] **Empty body:** Attempt to send a campaign with a blank email body; verify send is blocked and inline error appears
- [ ] **Physical address missing:** Attempt to send a campaign when the merchant account has no physical sender address configured; verify send is blocked and the link to Account Settings is present in the error message
- [ ] **Zero-recipient audience:** Create a custom filter that matches no customers; verify send is blocked and "Your audience has no recipients" error appears
- [ ] **Double-click send:** Rapidly click the Send button twice; verify that exactly one API call is made to SendGrid and the button is disabled after the first click
- [ ] **Free tier limit block:** Set the mock monthly send count to 10,000 [fictional]; attempt to send any campaign; verify the send is blocked before the API call and the upgrade prompt appears
- [ ] **Network failure:** Simulate a network timeout during send; verify draft is preserved, send button re-enables after 5 seconds, and "check your connection" error message appears
- [ ] **Audience change after confirmation:** Change the audience selection during the confirmation step; verify the recipient count updates and send is not enabled until re-confirmed

### Should Test (P2)

- [ ] **Whitespace-only subject line:** Enter only spaces in the subject line field; verify it is treated as empty and blocked
- [ ] **Subject line at 150 characters:** Enter exactly 150 characters in the subject line; verify the character count warning appears but the send is not blocked
- [ ] **Session expiry during draft:** Expire the session while a campaign is in draft; verify re-authentication prompt appears and the draft is restored after login
- [ ] **Attribution webhook deduplication:** Submit two identical attribution events with the same `sg_event_id`; verify only one event is written to the attribution events table
- [ ] **SendGrid 429 retry:** Simulate a 429 response from the SendGrid API; verify the campaign is queued and retried after 60 seconds with an in-progress indicator shown

### Nice to Test (P3)

- [ ] **Attribution database write failure:** Simulate an order database write failure for an attribution event; verify the send completes normally, no error is surfaced to the merchant, and the failure is logged
- [ ] **Concurrent tab editing:** Open the same campaign draft in two browser tabs; edit and save in both; verify the "Another session modified this campaign" warning appears in the first tab
