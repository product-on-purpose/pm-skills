---
artifact: instrumentation-spec
version: "1.0"
created: 2026-01-14
status: complete
context: User onboarding flow for SaaS product (5 steps)
---

# Instrumentation Spec: User Onboarding

## Overview

**Feature:** New user onboarding flow (5 steps: Welcome, Profile, Team, Integrations, Complete)

**Analytics Goals:**

1. What is the overall onboarding completion rate?
2. Where do users drop off in the onboarding flow?
3. How long does each step take, and what's the total onboarding time?
4. Which integrations are users connecting during onboarding?
5. Does skipping optional steps correlate with lower activation?

**Analytics Platform:** Amplitude

**Naming Convention:** snake_case, format: `onboarding_[action]`

## Event Inventory

### onboarding_started

| Field | Value |
|-------|-------|
| **Event Name** | `onboarding_started` |
| **Trigger** | When user lands on onboarding welcome screen for the first time |
| **Description** | Marks the beginning of a user's onboarding journey |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| source | string | Yes | How user arrived (signup, invite, sso) | "signup" |
| referrer | string | No | Marketing attribution source | "google_ads_q1" |
| device_type | string | Yes | User's device category | "mobile_web" |
| signup_date | string | Yes | ISO date of account creation | "2026-01-14" |

---

### onboarding_step_viewed

| Field | Value |
|-------|-------|
| **Event Name** | `onboarding_step_viewed` |
| **Trigger** | When user navigates to any onboarding step |
| **Description** | Tracks visibility of each onboarding step |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| step_number | number | Yes | Sequential step number (1-5) | 2 |
| step_name | string | Yes | Human-readable step name | "profile_setup" |
| is_return_visit | boolean | Yes | Whether user previously visited this step | false |
| time_since_start | number | No | Seconds since onboarding_started | 45 |

---

### onboarding_step_completed

| Field | Value |
|-------|-------|
| **Event Name** | `onboarding_step_completed` |
| **Trigger** | When user successfully completes a step (clicks Continue/Next) |
| **Description** | Tracks completion of individual onboarding steps |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| step_number | number | Yes | Sequential step number (1-5) | 2 |
| step_name | string | Yes | Human-readable step name | "profile_setup" |
| time_on_step | number | Yes | Seconds spent on this step | 32 |
| was_skipped | boolean | Yes | If user clicked Skip instead of completing | false |
| completion_method | string | Yes | How step was completed (manual, skip, auto) | "manual" |

---

### onboarding_step_skipped

| Field | Value |
|-------|-------|
| **Event Name** | `onboarding_step_skipped` |
| **Trigger** | When user clicks Skip on a skippable step |
| **Description** | Tracks when users choose to skip optional steps |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| step_number | number | Yes | Sequential step number | 4 |
| step_name | string | Yes | Human-readable step name | "integrations" |
| time_on_step | number | Yes | Seconds spent before skipping | 8 |

---

### onboarding_integration_connected

| Field | Value |
|-------|-------|
| **Event Name** | `onboarding_integration_connected` |
| **Trigger** | When user successfully connects an integration during Step 4 |
| **Description** | Tracks which integrations users connect during onboarding |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| integration_name | string | Yes | Name of the integration | "slack" |
| integration_category | string | Yes | Category of integration | "communication" |
| connection_time | number | Yes | Seconds to complete OAuth flow | 12 |
| is_first_integration | boolean | Yes | Whether this is user's first connected integration | true |

---

### onboarding_completed

| Field | Value |
|-------|-------|
| **Event Name** | `onboarding_completed` |
| **Trigger** | When user completes the final step and exits onboarding |
| **Description** | Marks successful completion of the onboarding flow |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| total_time | number | Yes | Total seconds from started to completed | 180 |
| steps_completed | number | Yes | Number of steps completed (not skipped) | 4 |
| steps_skipped | number | Yes | Number of steps skipped | 1 |
| integrations_count | number | Yes | Number of integrations connected | 2 |
| completion_path | string | Yes | Ordered list of step outcomes | "done,done,done,skip,done" |

---

### onboarding_abandoned

| Field | Value |
|-------|-------|
| **Event Name** | `onboarding_abandoned` |
| **Trigger** | When user navigates away from onboarding without completing (30 min session timeout) |
| **Description** | Tracks when users leave onboarding incomplete |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| last_step_viewed | number | Yes | Last step number user saw | 3 |
| last_step_name | string | Yes | Name of last step viewed | "team_invite" |
| time_in_onboarding | number | Yes | Total seconds in onboarding before abandoning | 95 |
| steps_completed | number | Yes | Steps completed before abandoning | 2 |

---

## User Properties

| Property | Type | Description | Set When | Example |
|----------|------|-------------|----------|---------|
| onboarding_status | string | Current onboarding state | Updated on each step completion | "completed" |
| onboarding_completed_date | string | ISO date of completion | Set on onboarding_completed | "2026-01-14" |
| signup_source | string | Attribution for user signup | Set on onboarding_started | "organic" |
| connected_integrations | array | List of connected integrations | Updated on each connection | ["slack", "jira"] |
| account_type | string | Plan type at signup | Set on account creation | "trial" |

## PII & Privacy Considerations

### PII Properties

| Property | PII Type | Handling |
|----------|----------|----------|
| email | Email address | Hash (SHA-256) before sending to analytics |
| team_member_emails | Email addresses | Do not send to analytics; count only |
| full_name | Name | Do not send to analytics |

### Consent Requirements

- Analytics events only sent if user has accepted analytics cookies (GDPR)
- `onboarding_started` includes consent check; if denied, no events fire
- Users can opt out via Settings > Privacy, which sets `analytics_opt_out` user property

### Data Retention

- Event data retained for 24 months
- User properties retained for account lifetime
- PII hashes cannot be reversed; original values stored only in primary database

## Implementation Notes

### SDK/Integration

- **Platform:** Web (React)
- **SDK:** Amplitude JavaScript SDK v8.21.0
- **Initialization:** Initialize on app load, identify user after authentication

### Event Timing

- Events should fire immediately on trigger, not batched
- If offline, queue events and send on reconnection
- Time properties (time_on_step) calculated client-side using performance.now()

### Code Reference

```javascript
// Example event call
amplitude.track('onboarding_step_completed', {
  step_number: 2,
  step_name: 'profile_setup',
  time_on_step: calculateTimeOnStep(),
  was_skipped: false,
  completion_method: 'manual'
});
```

## Testing Checklist

### Event Validation

- [ ] **onboarding_started:** Create new account, verify event fires on welcome screen with correct source
- [ ] **onboarding_step_viewed:** Navigate through each step, verify event fires for each with correct step_number
- [ ] **onboarding_step_completed:** Complete profile step, verify event fires with time_on_step > 0
- [ ] **onboarding_step_skipped:** Skip integrations step, verify event fires with step_name = "integrations"
- [ ] **onboarding_integration_connected:** Connect Slack, verify event fires with integration_name = "slack"
- [ ] **onboarding_completed:** Complete full flow, verify event fires with accurate total_time
- [ ] **onboarding_abandoned:** Start onboarding, close browser, verify event fires after 30 min timeout

### Property Validation

- [ ] Verify step_number is integer 1-5, never 0 or > 5
- [ ] Verify time_on_step is positive number, never negative
- [ ] Verify completion_path format matches "done|skip" comma-separated pattern
- [ ] Verify is_return_visit correctly detects revisiting completed steps

### Edge Cases

- [ ] Verify events fire correctly after page refresh mid-onboarding
- [ ] Verify events fire correctly after session timeout and re-login
- [ ] Verify events do not duplicate if user navigates back and forward
- [ ] Verify onboarding_abandoned does not fire if user completes

### Debug Tools

- Access Amplitude debug panel: append `?amplitude_debug=true` to URL
- View events in browser console: `amplitude.getInstance().logLevel = 'DEBUG'`
- Validate in Amplitude: User Lookup > search by user_id > Event Stream
