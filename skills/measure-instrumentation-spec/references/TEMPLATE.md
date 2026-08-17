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

### Model Trace Capture

<!-- OPTIONAL. Include only when the feature sends user input to a model and the exchange is
     captured for debugging or evaluation. Skip this subsection entirely otherwise.

     A trace is not an event. An event records that something happened, with properties you
     chose in advance. A trace records what the user typed and what the model wrote back: free
     text that can contain anything the user decided to put in it, including data no property
     schema anticipated. Treat it as the most sensitive thing the feature handles, not as one
     more property on one more event. -->

| Question | Decision |
|----------|----------|
| **What is captured** | [Prompt / completion / both / metadata only] |
| **Redaction before storage** | [What is stripped or masked, by what mechanism, and whether it runs before the trace leaves the process] |
| **Who can read a trace** | [Roles, and whether each read is itself logged] |
| **Retention** | [How long, what deletes it, and whether that differs from the event retention above] |
| **Sampling** | [What fraction of requests is captured and how the sample is chosen] |
| **User opt-out** | [Whether users can decline capture, and what the feature does when they do] |

<!-- On sampling: a uniform sample is the wrong instrument for finding rare failures, because the
     failures are rare. If the traces exist to diagnose bad output, oversample the cases a check
     already flagged and say so here, rather than recording a rate and hoping. -->

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
