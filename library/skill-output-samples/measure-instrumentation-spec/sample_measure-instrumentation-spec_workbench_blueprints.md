---
title: "Measure Instrumentation Spec: Workbench Blueprints"
description: "Workbench enterprise collaboration platform: Blueprints v1 GA instrumentation spec."
artifact: instrumentation-spec
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-20
status: sample
thread: workbench
context: "Workbench enterprise collaboration platform: Blueprints v1 GA instrumentation spec"
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

With the ship decision confirmed (April 14, 2026), Leo M. is writing the instrumentation spec for Blueprints v1 GA. The spec defines every analytics event that the engineering team needs to implement before the April 28 launch. These events will power the post-launch dashboard, feed the audit log, and enable future experiment analysis. The spec also serves as the single source of truth for event naming, property definitions, and PII handling, ensuring consistency across engineering, data, and product.

Leo is working from the PRD's success metrics (time-to-approved, empty-section rate, approval cycle count, author adoption) and the experiment-results document's monitoring recommendations. Karen L.'s engineering team will implement the events using Workbench's existing analytics SDK, which sends events to the centralized data pipeline via a server-side collector. Nate P. will handle the backend event enrichment, while Aisha K. will integrate the client-side tracking calls into the Blueprints UI.

### Source Notes

- Event taxonomy and naming conventions: Segment Analytics Academy, "Tracking Plan Best Practices" (segment.com)
- Analytics event design patterns for SaaS products: Amplitude "Data Taxonomy Playbook" (amplitude.com)
- PII handling in analytics pipelines: GDPR Article 25, Data Protection by Design and by Default

## Prompt

```
/instrumentation-spec

I need the instrumentation spec for Blueprints v1 GA. Here are the events I've identified from the PRD and experiment results:

**Core lifecycle events:**
1. `blueprint_created` -- when an author creates a new Blueprint from a template
2. `section_completed` -- when a required section transitions from empty to non-empty
3. `section_cleared` -- when a required section transitions from non-empty to empty
4. `approval_requested` -- when an author submits a Blueprint for approval
5. `approval_granted` -- when an approver approves a Blueprint
6. `approval_rejected` -- when an approver rejects a Blueprint
7. `blueprint_published` -- when an approved Blueprint is published to the team workspace

**Key properties I need on each event:**
- Standard: account_id, user_id, blueprint_id, template_id, timestamp
- blueprint_created: creation_method (wizard/canvas), template_name, required_section_count, optional_section_count
- section_completed/cleared: section_id, section_name, is_required, word_count
- approval events: approval_chain_type (sequential/parallel), approver_position, approval_cycle_number
- blueprint_published: time_to_approved_hours, total_approval_cycles, co_editor_count

**PII concerns:**
- user_id is internal (UUID), not PII
- We must NOT capture section content in events -- only metadata
- Account names should not appear in event properties; use account_id only

**SDK:** Workbench Analytics SDK (server-side collector, JavaScript client)

Please generate the full instrumentation spec with testing checklist.
```


## Output

# Instrumentation Spec: Workbench Blueprints v1

## Overview

This spec defines the analytics events for the Blueprints v1 feature launching with Workbench 3.5 (target: April 28, 2026). Seven core lifecycle events capture the Blueprint journey from creation through publication. These events power the post-launch monitoring dashboard, feed the audit log, and provide the data foundation for future experiments.

All events use the Workbench Analytics SDK (JavaScript client, server-side collector). Events are sent server-side after client-initiated actions to ensure reliability and to prevent client-side ad blockers from dropping events. This architecture was validated during the A/B test phase, where event delivery reliability exceeded 99.5% [fictional].

**Naming convention:** `snake_case`, noun-verb pattern (`blueprint_created`, `approval_granted`). All events are prefixed implicitly by the Workbench product namespace in the data pipeline. This convention aligns with the broader Workbench analytics taxonomy, ensuring Blueprints events are discoverable alongside platform events.

## Event Inventory

### blueprint_created

Fired when an author creates a new Blueprint from a template in the template gallery.

| Property | Type | Required | Description |
|---|---|---|---|
| account_id | string (UUID) | yes | The account that owns the Blueprint |
| user_id | string (UUID) | yes | The author who created the Blueprint |
| blueprint_id | string (UUID) | yes | Unique identifier for the new Blueprint |
| template_id | string (UUID) | yes | The template used to create the Blueprint |
| template_name | string | yes | Human-readable template name (e.g., "Project Kickoff") |
| creation_method | enum: `wizard`, `canvas` | yes | Whether the author started in wizard or canvas mode |
| required_section_count | integer | yes | Number of sections marked required in the template |
| optional_section_count | integer | yes | Number of sections marked optional in the template |
| timestamp | ISO 8601 | yes | Server-side timestamp of creation |

**Trigger:** Server receives the `POST /blueprints` request and the Blueprint is persisted.

**Notes:** This event fires once per Blueprint. If an author abandons the template selection dialog without creating a Blueprint, no event fires. The `creation_method` property is especially important for tracking the wizard-to-canvas ratio, which informs the configurable threshold feature planned for v1.1.

### section_completed

Fired when a required section transitions from empty (no non-whitespace content) to non-empty.

| Property | Type | Required | Description |
|---|---|---|---|
| account_id | string (UUID) | yes | The account that owns the Blueprint |
| user_id | string (UUID) | yes | The author whose edit triggered the transition |
| blueprint_id | string (UUID) | yes | The Blueprint containing the section |
| template_id | string (UUID) | yes | The template the Blueprint is based on |
| section_id | string (UUID) | yes | Unique identifier for the section |
| section_name | string | yes | Human-readable section name (e.g., "Executive Summary") |
| is_required | boolean | yes | Whether the section is marked required (always true for this event) |
| word_count | integer | yes | Word count of the section at the time of the transition |
| timestamp | ISO 8601 | yes | Server-side timestamp of the transition |

**Trigger:** The Yjs document state change handler detects that a required section has transitioned from empty to non-empty. Debounced by 2 seconds to avoid firing on rapid typing and deleting.

**Notes:** Fires only for required sections. Optional section completions are not tracked in v1 (can be added later if needed). In co-editing scenarios, the `user_id` is the author whose specific edit caused the transition, determined by the Yjs awareness protocol. The 2-second debounce window was chosen based on Nate P.'s analysis of typical typing patterns during the closed beta.

### section_cleared

Fired when a required section transitions from non-empty to empty (all content removed or reduced to whitespace only).

| Property | Type | Required | Description |
|---|---|---|---|
| account_id | string (UUID) | yes | The account that owns the Blueprint |
| user_id | string (UUID) | yes | The author whose edit triggered the transition |
| blueprint_id | string (UUID) | yes | The Blueprint containing the section |
| template_id | string (UUID) | yes | The template the Blueprint is based on |
| section_id | string (UUID) | yes | Unique identifier for the section |
| section_name | string | yes | Human-readable section name |
| is_required | boolean | yes | Whether the section is marked required (always true for this event) |
| timestamp | ISO 8601 | yes | Server-side timestamp of the transition |

**Trigger:** Same as `section_completed` but in the reverse direction. Debounced by 2 seconds.

**Notes:** This event is important for detecting workaround patterns where authors fill sections to enable submit, then clear them after submission. If `section_cleared` fires frequently after `approval_requested`, it may indicate gaming behavior. Leo M. plans to build an automated detection rule for this pattern in the post-launch dashboard.

### approval_requested

Fired when an author submits a Blueprint for approval.

| Property | Type | Required | Description |
|---|---|---|---|
| account_id | string (UUID) | yes | The account that owns the Blueprint |
| user_id | string (UUID) | yes | The author who submitted for approval |
| blueprint_id | string (UUID) | yes | The Blueprint being submitted |
| template_id | string (UUID) | yes | The template the Blueprint is based on |
| approval_chain_type | enum: `sequential`, `parallel` | yes | The type of approval chain configured for this template |
| approver_count | integer | yes | Total number of approvers in the chain |
| approval_cycle_number | integer | yes | Which submission cycle this is (1 = first submission, 2 = re-submission after rejection, etc.) |
| required_sections_complete | integer | yes | Number of required sections with content at submission time |
| required_sections_total | integer | yes | Total number of required sections in the template |
| co_editor_count | integer | yes | Number of distinct users who edited the Blueprint before submission |
| timestamp | ISO 8601 | yes | Server-side timestamp of submission |

**Trigger:** Server receives the `POST /blueprints/{id}/submit` request and the approval chain is initiated.

**Notes:** `approval_cycle_number` increments each time the same Blueprint is re-submitted after a rejection. This is the key property for calculating the approval cycle count metric. The difference between `required_sections_complete` and `required_sections_total` enables the empty-section submission rate metric, which is one of the primary post-launch indicators.

### approval_granted

Fired when an individual approver approves a Blueprint.

| Property | Type | Required | Description |
|---|---|---|---|
| account_id | string (UUID) | yes | The account that owns the Blueprint |
| user_id | string (UUID) | yes | The approver who granted approval |
| blueprint_id | string (UUID) | yes | The Blueprint being approved |
| template_id | string (UUID) | yes | The template the Blueprint is based on |
| approval_chain_type | enum: `sequential`, `parallel` | yes | The type of approval chain |
| approver_position | integer | yes | This approver's position in the chain (1-indexed) |
| is_final_approval | boolean | yes | Whether this approval completes the chain |
| time_to_decision_hours | number | yes | Hours between when this approver was notified and when they approved |
| approval_cycle_number | integer | yes | Which submission cycle this approval belongs to |
| timestamp | ISO 8601 | yes | Server-side timestamp of approval |

**Trigger:** Server processes the `POST /blueprints/{id}/approve` request.

**Notes:** For parallel chains, multiple `approval_granted` events fire independently. `is_final_approval` is true only for the event that completes the chain (all required approvers have approved). `time_to_decision_hours` measures approver responsiveness and feeds the approval-cycle-time dashboard metric. This property is particularly useful for identifying bottleneck approvers in sequential chains.

### approval_rejected

Fired when an approver rejects a Blueprint or requests changes.

| Property | Type | Required | Description |
|---|---|---|---|
| account_id | string (UUID) | yes | The account that owns the Blueprint |
| user_id | string (UUID) | yes | The approver who rejected |
| blueprint_id | string (UUID) | yes | The Blueprint being rejected |
| template_id | string (UUID) | yes | The template the Blueprint is based on |
| approval_chain_type | enum: `sequential`, `parallel` | yes | The type of approval chain |
| approver_position | integer | yes | This approver's position in the chain |
| rejection_reason_length | integer | yes | Character count of the rejection comment (not the comment itself) |
| approval_cycle_number | integer | yes | Which submission cycle this rejection belongs to |
| timestamp | ISO 8601 | yes | Server-side timestamp of rejection |

**Trigger:** Server processes the `POST /blueprints/{id}/reject` request.

**Notes:** The rejection comment text is NOT included in the event due to PII risk; the comment may contain employee names, project details, or other sensitive information. Only the character count is captured to assess whether approvers are providing substantive feedback. A rejection with a very short comment (fewer than 20 characters) may indicate a cursory rejection, which could be worth surfacing in the dashboard.

### blueprint_published

Fired when an approved Blueprint is published to the team workspace.

| Property | Type | Required | Description |
|---|---|---|---|
| account_id | string (UUID) | yes | The account that owns the Blueprint |
| user_id | string (UUID) | yes | The user who triggered publication |
| blueprint_id | string (UUID) | yes | The Blueprint being published |
| template_id | string (UUID) | yes | The template the Blueprint is based on |
| time_to_approved_hours | number | yes | Hours from `blueprint_created` to final `approval_granted` |
| total_approval_cycles | integer | yes | Total number of submission cycles before final approval |
| co_editor_count | integer | yes | Number of distinct users who edited the Blueprint |
| total_word_count | integer | yes | Total word count across all sections at publication time |
| required_sections_count | integer | yes | Number of required sections in the published Blueprint |
| timestamp | ISO 8601 | yes | Server-side timestamp of publication |

**Trigger:** Server processes the `POST /blueprints/{id}/publish` request.

**Notes:** `time_to_approved_hours` is the primary success metric. It is calculated server-side as the difference between the `blueprint_created` timestamp and the final `approval_granted` timestamp (where `is_final_approval` = true). This property is denormalized onto the publish event for dashboard convenience, avoiding the need for a multi-event join in Looker queries.

## User Properties

The following user-level properties are maintained in the analytics user profile and attached to all events automatically by the SDK:

| Property | Type | Description |
|---|---|---|
| account_id | string (UUID) | The user's organization |
| user_role | enum: `admin`, `template_admin`, `author`, `approver`, `viewer` | The user's Workbench role |
| blueprints_created_lifetime | integer | Total Blueprints created by this user (all time) |
| blueprints_approved_lifetime | integer | Total Blueprints approved by this user as an approver (all time) |
| first_blueprint_date | ISO 8601 | Date the user created their first Blueprint |
| creation_method_preference | enum: `wizard`, `canvas`, `mixed` | The user's most-used creation method |

## PII & Privacy Considerations

### PII Properties

| Property | PII classification | Handling |
|---|---|---|
| user_id | Pseudonymous (UUID) | Not PII: internal identifier with no direct mapping to personal data in the analytics pipeline |
| account_id | Pseudonymous (UUID) | Not PII: internal identifier |
| template_name | Non-PII | Organization-defined label; may contain project names but not personal data |
| section_name | Non-PII | Template-defined label; controlled by template admins |
| Account name | PII | NOT captured in any event; use account_id only |
| User name / email | PII | NOT captured in any event; use user_id only |
| Section content / text | Sensitive | NOT captured in any event; only metadata (word count, character count) |
| Rejection comment text | Sensitive (may contain names) | NOT captured; only rejection_reason_length |

### Consent Requirements

- All analytics events are covered by Workbench's existing data processing agreement (DPA) and terms of service, which include analytics data collection.
- Enterprise accounts in the EU are covered by the GDPR-compliant DPA. No additional consent mechanism is required for these events because they contain no PII.
- If a user exercises their right to data deletion (GDPR Article 17), their `user_id` is removed from all events via the existing anonymization pipeline. Events are retained with `user_id` set to `null`.
- The legal team reviewed the event schema on April 10, 2026, and confirmed compliance with both GDPR and SOC 2 requirements.

### Data Retention

- Analytics events: 24 months in the primary warehouse, then archived to cold storage for an additional 36 months (total 5 years).
- Audit log events (same data, separate table): 12-month minimum retention per SOC 2 requirements. Actual retention: 24 months to match the analytics pipeline.
- User properties: retained as long as the user account is active. Deleted 30 days after account deletion.

## Implementation Notes

### SDK/Integration

- **Client SDK:** Workbench Analytics SDK (JavaScript). The client calls `analytics.track(eventName, properties)` on user actions.
- **Server-side enrichment:** The client sends a minimal event (event name, blueprint_id, user action). The server enriches the event with computed properties (time_to_approved_hours, approval_cycle_number, co_editor_count) before forwarding to the data pipeline. This separation keeps the client lightweight and ensures computed properties are consistent.
- **Transport:** Events are batched client-side (max 10 events or 5-second interval) and sent via HTTPS POST to the server-side collector. The collector validates the schema and forwards to the data pipeline.
- **Fallback:** If the client cannot reach the collector (offline, network error), events are queued in localStorage (max 100 events) and flushed on the next successful connection. This is particularly important for the Blueprints offline-first editing experience, where authors may work without connectivity for extended periods.

### Event Timing

| Event | Timing | Notes |
|---|---|---|
| blueprint_created | Synchronous with API response | Fires after the Blueprint is persisted |
| section_completed | Debounced, 2-second delay | Prevents rapid fire during active editing |
| section_cleared | Debounced, 2-second delay | Same debounce as section_completed |
| approval_requested | Synchronous with API response | Fires after the approval chain is initiated |
| approval_granted | Synchronous with API response | Fires after the approval is recorded |
| approval_rejected | Synchronous with API response | Fires after the rejection is recorded |
| blueprint_published | Synchronous with API response | Fires after publication is confirmed |

## Testing Checklist

### Event Validation

- [ ] `blueprint_created` fires exactly once per Blueprint creation, with correct `creation_method` (wizard vs. canvas)
- [ ] `section_completed` fires when a required section transitions from empty to non-empty; does not fire for optional sections
- [ ] `section_cleared` fires when a required section transitions from non-empty to empty
- [ ] `approval_requested` fires on submit with correct `approval_cycle_number` (1 for first submission, 2+ for re-submissions)
- [ ] `approval_granted` fires per approver; `is_final_approval` is true only on the chain-completing approval
- [ ] `approval_rejected` fires on rejection with correct `rejection_reason_length`; rejection comment text is NOT in the event
- [ ] `blueprint_published` fires on publication with correct `time_to_approved_hours` and `total_approval_cycles`

### Property Validation

- [ ] All events include `account_id`, `user_id`, `blueprint_id`, `template_id`, and `timestamp`
- [ ] `timestamp` is server-side (not client-side) and in ISO 8601 format
- [ ] `user_id` is a UUID, not an email or username
- [ ] `account_id` is a UUID, not an account name
- [ ] `word_count` on `section_completed` matches actual section word count (plus or minus 5 words for whitespace edge cases)
- [ ] `time_to_approved_hours` on `blueprint_published` is calculated correctly (difference between creation and final approval timestamps)
- [ ] `co_editor_count` counts distinct users, not editing sessions

### Edge Cases

- [ ] `section_completed` does not fire when a section contains only whitespace or zero-width characters
- [ ] `section_completed` fires correctly during co-editing (attributed to the user whose edit triggered the transition)
- [ ] `approval_requested` does not fire if the submit button is clicked but the request fails (e.g., required section emptied by a co-editor between click and server receipt)
- [ ] `approval_cycle_number` increments correctly when a Blueprint is rejected and re-submitted (does not reset to 1)
- [ ] Events are queued correctly during offline editing and flushed on reconnect without duplication
- [ ] Rapid section edits (type-delete-type within 2 seconds) produce at most one `section_completed` event, not multiple
- [ ] Co-editing with three or more simultaneous users produces correct `user_id` attribution on `section_completed` events

### Debug Tools

- [ ] Analytics debug mode (`?analytics_debug=true` URL parameter) logs all events to the browser console with full property payloads
- [ ] Server-side collector returns event validation errors in the API response during development mode
- [ ] The analytics warehouse has a `blueprints_events_staging` table for QA verification before production deployment
- [ ] Leo M. has a pre-built SQL query set for validating event counts and property distributions against expected patterns
