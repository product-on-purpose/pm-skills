---
title: "Instrumentation Spec: Brainshelf Resurface Model Traces"
description: "A worked model trace privacy contract for a saved-content digest, with minimization boundaries, failure handling, and claim-level QA coverage."
artifact: instrumentation-spec
version: "1.0"
repo_version: "2.33.0"
skill_version: "3.0.0"
created: 2026-09-05
status: sample
thread: brainshelf
context: Brainshelf explores generated Resurface explanations; debugging retrieved saved text requires a trace contract even without a user chat input.
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

priya and alex are exploring a follow-on to Resurface: a model writes a short explanation of why a saved article belongs in the morning digest. There is no chat box. A background job retrieves saved excerpts and supplies them to the model, so traces could expose private reading material without anyone typing a prompt. chloe needs to diagnose unsupported explanations without turning the analytics platform into a second copy of users' libraries.

This is an authored fictional extension of the Brainshelf thread, not a report of a deployed feature or executed tests. All proposed retention periods and sampling rates are marked `[fictional]`. Ticket identifiers below are fictional planning references, not links to implemented suites.

## Prompt

```text
measure-instrumentation-spec

resurface follow-on: model explains why we're showing a saved article.
no user prompt, just retrieved excerpts from their library. chloe needs
to debug explanations that don't match the source. alex owns the worker.

need events + a real trace privacy contract. no saved text in amplitude.
capture only if the user enables diagnostics separately. keep the digest
working if capture fails. no raw trace retry queue hiding behind 'drop'.
use restricted traces for evaluation, and spell out what QA still has to
prove. priya owns the opt-in experience; chloe owns QA.
```

## Output

# Instrumentation Spec: Resurface Explanation Diagnostics

## Overview

**Feature:** Model-generated explanations for retrieved saved articles in Resurface.

**Analytics Goals:**

1. How often does the grounding check reject an explanation and use the existing digest without it?
2. Which model and prompt revisions correlate with rejected explanations?
3. Can consenting users' minimized traces explain failures without exporting their saved text?

**Analytics Platform:** Amplitude for schema-bound events; a separate restricted trace collector for evaluation. Trace bodies never become event properties.

**Naming Convention:** snake_case, with the `resurface_explanation_` prefix.

## Event Inventory

### resurface_explanation_resolved

| Field | Value |
|-------|-------|
| **Event Name** | `resurface_explanation_resolved` |
| **Trigger** | The worker commits its final explanation decision for an eligible digest item. |
| **Description** | Records the decision, not email delivery or a model invocation retry. Deduplicate by a random decision identifier. |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| decision_id | string | Yes | Opaque deduplication key; no user or article text encoded | `decision_demo` [fictional] |
| outcome | string | Yes | Allowed values: accepted, rejected, model_error | `rejected` [fictional] |
| model_revision | string | Yes | Internal deployment revision, not a raw provider response | `explain_candidate` [fictional] |
| prompt_revision | string | Yes | Versioned template identifier, never the rendered prompt | `grounded_candidate` [fictional] |

### resurface_explanation_trace_disposed

| Field | Value |
|-------|-------|
| **Event Name** | `resurface_explanation_trace_disposed` |
| **Trigger** | An eligible sampled trace reaches a terminal capture outcome. |
| **Description** | Collector acknowledgement means stored; filtering or transport failure means dropped. This event contains no trace body or exception text. |

**Properties:**

| Property | Type | Required | Description | Example |
|----------|------|----------|-------------|---------|
| capture_id | string | Yes | Random key assigned to the capture attempt, distinct from account identity | `capture_demo` [fictional] |
| disposition | string | Yes | Allowed values: stored, dropped | `dropped` [fictional] |
| reason | string | Yes | Allowlisted enum: stored, egress_filter, storage_filter, transport, consent_revoked | `egress_filter` [fictional] |

## User Properties

| Property | Type | Description | Set When | Example |
|----------|------|-------------|----------|---------|
| explanation_enabled | boolean | Product setting; independent of diagnostics | Feature setting changes, subject to analytics consent | `true` [fictional] |

Diagnostics consent stays in the first-party consent service. An analytics profile is never authoritative for permission to capture.

## PII & Privacy Considerations

### PII Properties

| Property | PII Type | Handling |
|----------|----------|----------|
| decision_id, capture_id | Pseudonymous activity identifiers | Random, purpose-limited keys; restrict access and do not encode account IDs. |
| Saved excerpts, generated explanation | Potential private or identifying free text | Excluded from events; only minimized derivatives may enter the trace path below. |

### Consent Requirements

- priya's proposed pilot requires separate opt-ins for generated explanations, product analytics, and diagnostic trace capture. Declining diagnostics preserves explanation behavior; declining explanations preserves the existing digest.
- The worker checks diagnostics consent before sampling, and the collector rechecks it before storage. Unknown consent is denial. This is a proposed product policy requiring review before rollout, not a legal determination.

### Data Retention

- Analytics events expire after 30 days [fictional], owned by chloe. They are not a long-term trace index.

### Model Trace Capture

Capture is triggered by retrieved content and model output, even though the user types nothing. This contract governs the diagnostic copy; it does not authorize the separate model-inference data flow, which must be reviewed before the pilot.

| Question | Decision |
|----------|----------|
| **Data classes captured** | Minimized retrieved excerpts and minimized generated explanations only. No direct user text, system prompt body, tool arguments/results, uploaded files, URLs, titles, account IDs, or embeddings are permitted. This worker has no tools or uploads. |
| **What is captured** | Both retrieved input and completion, transformed into sequences of approved topic labels and structural separators. All other spans become a fixed masked token. The system prompt is represented only by its revision ID. This supports topic-mismatch diagnosis, not verbatim reconstruction or a claim that the explanation is factually correct. |
| **Minimization before egress** | alex owns an in-process projector that emits only a fixed schema: random capture ID, model/prompt revision IDs, accepted/rejected check outcome, and projected input/output. Text projection permits only labels from a reviewed public topic vocabulary. Reject unknown fields; never pass through unrecognized text. No raw request/response logging in the worker or transport. |
| **If egress minimization fails** | Drop the diagnostic trace; continue the digest with the already-decided explanation outcome. Emit only the schema-bound egress_filter disposition if analytics consent permits. |
| **Minimization before storage** | alex owns an independent collector validator enforcing the same field and value allowlists before the durable writer. It rejects unapproved tokens and metadata values rather than trusting the worker's projection. |
| **If storage minimization fails** | Do not write the trace. Discard the collector payload and report storage_filter through the schema-bound disposition path; digest delivery is unaffected. |
| **Terminal disposition of a failed trace** | Destroy transient buffers after rejection. No payload retry, spool, dead-letter queue, access-log body, crash dump, or backup copy. Transport errors also drop the trace; only content-free disposition events may use the analytics queue. Recovery never replays failed payloads. |
| **Who can read a trace** | Only alex and chloe through a role-gated viewer. Identity lifecycle changes revoke the grant and active sessions. Other staff and analytics consumers cannot read traces. |
| **Whether a read is logged** | Every successful viewer read requires a durable audit entry before content is returned. Each entry identifies the authenticated reader, capture ID, and read time, without the body. Audit failure or missing reader identity denies the read. Audit entries expire after 30 days [fictional]. |
| **Retention** | Traces expire after 7 days [fictional] by a collector TTL job, with no backup or export path. The viewer also denies expired records; an overdue deletion alert pauses capture until deletion is confirmed. This is shorter than event retention. |
| **Sampling** | For consenting users, capture all grounding-check rejections and a random 5% [fictional] of accepted explanations. Model errors without usable output have no trace. chloe compares capture attempts with eligible decisions by stratum; a stuck or unavailable sampler disables capture and alerts instead of silently changing the rate. No population-quality estimate from the biased trace corpus. |
| **User opt-out** | Revocation stops new capture; collector consent recheck rejects in-flight traces. A restricted consent-service mapping locates existing traces for deletion on revocation, and expires with them. Revoked or unknown consent denies capture and reads; deletion failures raise a cleanup alert and retry deletion without copying trace payloads. The digest continues; diagnostics never gates the product feature. |

## Implementation Notes

### SDK/Integration

- **Platform:** Backend digest worker and restricted collector/viewer.
- **SDK:** Existing analytics adapter for events; a separate schema-checked trace transport, with body logging and automatic retries disabled. No new SDK is selected by this spec.
- **Initialization:** Load approved schema/vocabulary and current consent before capture. If either is unavailable, leave diagnostics disabled. Trace access is through the viewer only, without direct analyst database grants.

### Event Timing

- Record the resolved decision after commit; retain its key across job retries. Capture uses a bounded asynchronous path and must not delay digest delivery.
- Record stored disposition only after durable acknowledgement. A lost acknowledgement may leave a stored trace reported as transport-dropped; TTL and consent deletion still cover it. Do not retry the payload to reconcile counts.

## Testing Checklist

### Event Validation

- [ ] chloe verifies accepted, rejected, and model_error outcomes emit the resolved event, while job retries do not duplicate it.
- [ ] chloe verifies stored disposition requires durable acknowledgement and filter errors produce only the allowlisted drop reason.

### Property Validation

- [ ] chloe checks enum and boolean types, random identifier generation, and rejection of arbitrary exception text or undeclared properties.
- [ ] chloe verifies neither event accepts saved content, URLs, prompts, completions, or trace bodies.

### Trace Capture Validation

All coverage below is **planned and unexecuted**. `TRACE-*` names are fictional QA tickets owned by chloe; they do not assert that an implementation exists. Each ticket must prove a live permitted capture reached the intended boundary and durable writer, then exercise the stated degraded path. Fault tests must assert the named disposition and inspect recovery for delayed replay. alex supplies testability hooks; chloe owns acceptance. Capture stays disabled until this evidence exists.

| Claim under test | Normal-path test | Failure or degraded-path test | QA owner |
|---|---|---|---|
| Only permitted data classes enter traces | TRACE-CLASSES: inspect a captured input/output pair | Supply forbidden classes and verify rejection | chloe |
| Projection retains only approved labels and separators | TRACE-PROJECTION: compare stored sequences with expected projection | Private and unknown spans become masked tokens; malformed output drops capture | chloe |
| Prompt body is replaced by revision ID | TRACE-PROMPT: inspect captured metadata | Inject a prompt body or unknown revision; reject it | chloe |
| Egress projector enforces field and value allowlists | TRACE-EGRESS: inspect permitted bytes at the process boundary | Unknown fields/values cannot cross the boundary | chloe |
| Egress faults drop capture and preserve the digest | TRACE-EGRESS-FAULT: capture alongside normal digest completion | Projector exception yields egress_filter; digest still completes | chloe |
| Collector independently validates before writing | TRACE-STORAGE: prove permitted durable write | Bypass worker with disallowed values; writer must reject | chloe |
| Storage filter failure prevents writes without blocking delivery | TRACE-STORAGE-FAULT: normal write and delivery | Disable validator; assert storage_filter and continued delivery | chloe |
| Failed payloads have no secondary sink or replay | TRACE-DISPOSITION: inspect permitted capture path and configured sinks | Egress, storage, and transport faults leave no payload in queues, logs, dumps, or backups, including after recovery | chloe |
| Only named roles can read | TRACE-ACCESS: alex and chloe can view permitted records | Other roles and direct database access are denied | chloe |
| Lifecycle changes revoke grants and sessions | TRACE-REVOCATION: current grants work | Move reader off team; existing session and new login cannot read | chloe |
| Every successful read has a durable audit record | TRACE-AUDIT: reconcile reads with entries | Audit sink outage denies reads | chloe |
| Audit records identify the authenticated reader | TRACE-PRINCIPAL: verify principal, capture ID, and time | Missing or spoofed principal cannot produce an anonymous successful read | chloe |
| Audit entries exclude bodies | TRACE-AUDIT-DATA: inspect schema | Inject body field; reject it | chloe |
| Audit entries expire on schedule | TRACE-AUDIT-TTL: verify expiry | Disable expiry job; detect overdue audit records | chloe |
| Trace TTL deletes records without backup/export copies | TRACE-TTL: prove stored record expires everywhere | Stop deletion job; overdue alert pauses capture until cleanup is verified | chloe |
| Viewer denies expired records | TRACE-EXPIRY: unexpired permitted record is readable | Overdue stored record cannot be viewed while TTL job is down | chloe |
| Sampling favors rejections and samples accepted outputs | TRACE-SAMPLING: verify strata and configured random rate | Force sampler stuck on or off; detect mismatch, alert, and disable capture | chloe |
| Model errors without output are excluded | TRACE-MODEL-ERROR: usable accepted/rejected outputs qualify | Empty/error response produces no trace even when selected by sampler | chloe |
| No capture or reads with unknown consent | TRACE-CONSENT: authorized capture and read succeed | Consent-service outage denies both | chloe |
| Revocation rejects in-flight capture and deletes existing traces | TRACE-OPT-OUT: consent mapping locates a stored trace | Revoke during capture; collector rejects; deletion failure keeps reads denied and raises a cleanup alert | chloe |
| Consent mapping expires with traces | TRACE-MAPPING: locate an unexpired consenting trace | Expire or revoke trace; verify mapping removed, including cleanup retry after outage | chloe |
| Declining diagnostics preserves product behavior | TRACE-PRODUCT: compare digest with diagnostics enabled/disabled | Capture outage and opt-out do not suppress the digest or change explanation decision | chloe |

### Edge Cases

- [ ] Analytics opt-out suppresses events without granting or revoking separate diagnostics permission.
- [ ] Disabling explanations leaves the existing digest intact and emits no explanation events or traces.
- [ ] A lost collector acknowledgement does not trigger a payload retry; any stored record still expires and honors revocation.

### Debug Tools

- chloe uses synthetic accounts to inspect the event stream and verify the absence of free text.
- alex and chloe use the restricted viewer for permitted traces and its separate audit view to reconcile reads. These are proposed pilot tools, not tools shipped by pm-skills.
