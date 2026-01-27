---
artifact: instrumentation-spec
version: "1.0"
created: <YYYY-MM-DD>
status: draft
---

# Instrumentation Spec: [Feature Name]

## Overview

**Feature:** [Feature being instrumented]

**Analytics Goals:**
<!-- What questions will this data help answer? -->

1. [Question 1]
2. [Question 2]
3. [Question 3]

**Analytics Platform:** [e.g., Amplitude, Mixpanel, Segment, custom]

**Naming Convention:** [e.g., snake_case: feature_action]

## Event Inventory

### [Event Name]

| Field | Value |
|-------|-------|
| **Event Name** | `[event_name]` |
| **Trigger** | [Exact condition when event fires] |
| **Description** | [What this event represents] |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| [property_1] | string | Yes | [Description] | [Example value] |
| [property_2] | number | No | [Description] | [Example value] |
| [property_3] | boolean | Yes | [Description] | [Example value] |

---

### [Event Name]

| Field | Value |
|-------|-------|
| **Event Name** | `[event_name]` |
| **Trigger** | [Exact condition when event fires] |
| **Description** | [What this event represents] |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| [property_1] | string | Yes | [Description] | [Example value] |
| [property_2] | number | No | [Description] | [Example value] |

---

## User Properties

<!-- Persistent properties associated with the user, included with all events -->

| Property | Type | Description | Set When | Example |
|----------|------|-------------|----------|---------|
| [user_property_1] | string | [Description] | [When this is set/updated] | [Example] |
| [user_property_2] | string | [Description] | [When this is set/updated] | [Example] |

## PII & Privacy Considerations

<!-- Flag and document handling of sensitive data -->

### PII Properties

| Property | PII Type | Handling |
|----------|----------|----------|
| [property] | [email/phone/name/etc.] | [Hash before sending / Do not send / Encrypt] |

### Consent Requirements

- [Consent requirement 1]
- [Consent requirement 2]

### Data Retention

- [Retention policy for this data]

## Implementation Notes

<!-- Technical details for engineering -->

### SDK/Integration

- **Platform:** [Web, iOS, Android, Backend]
- **SDK:** [SDK name and version]
- **Initialization:** [Any special setup required]

### Event Timing

- [Note about when events should be sent relative to user actions]
- [Batching or real-time requirements]

## Testing Checklist

<!-- How QA verifies correct implementation -->

### Event Validation

- [ ] **[event_name]:** Navigate to [location], perform [action], verify event fires with properties: [list key properties to check]
- [ ] **[event_name]:** Navigate to [location], perform [action], verify event fires with properties: [list key properties to check]

### Property Validation

- [ ] Verify [property] is [string/number/boolean] type
- [ ] Verify [property] is present when [condition]
- [ ] Verify [property] value is within expected range [range]

### Edge Cases

- [ ] Verify events fire correctly on [slow network]
- [ ] Verify events fire correctly after [session timeout]
- [ ] Verify events do not fire when [condition that should prevent firing]

### Debug Tools

- [How to access event stream in debug mode]
- [How to validate in analytics dashboard]
