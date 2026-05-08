---
title: "Develop ADR: Workbench Blueprints"
description: "Workbench enterprise collaboration platform: ADR for Yjs CRDTs for Blueprint co-editing."
artifact: adr
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-21
status: sample
thread: workbench
context: "Workbench enterprise collaboration platform: ADR for Yjs CRDTs for Blueprint co-editing"
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Workbench is a Series B enterprise collaboration platform (~200 employees, ~500 enterprise customers [fictional]) building Blueprints. Following a 5-day CRDT spike that evaluated Yjs, Automerge, and ShareDB, Karen L. (Engineering Lead) recorded this ADR to formalize the decision to adopt Yjs as the CRDT library for Blueprint real-time co-editing. The ADR captures the technical rationale and consequences for James W. (VP Engineering) and future engineers who will maintain the integration. Because the spike surfaced significant trade-offs in bundle size, ProseMirror binding maturity, and offline-first capability, Karen wanted the decision documented before Sprint 1 planning so the team could commit engineering resources with full visibility into the downstream implications.

**Source Notes:**

- Yjs documentation (docs.yjs.dev) describes the y-prosemirror binding as the recommended integration path for ProseMirror-based editors, with support for cursor awareness, undo management, and offline persistence.
- Michael Kleppmann's paper "A Conflict-Free Replicated JSON Datatype" (2017, University of Cambridge) provides the theoretical foundation for JSON CRDTs, which both Yjs and Automerge implement with different performance trade-offs.
- The ProseMirror project documentation (prosemirror.net) describes its collaborative editing architecture as transport-agnostic, supporting both OT and CRDT backends.

---

## Prompt

```
/adr

ADR: Use Yjs CRDTs for Blueprints real-time co-editing
Product: Workbench Blueprints
Stage: Post-CRDT spike; recording architecture decision

Context:
- Blueprints requires real-time co-editing (20+ concurrent editors [fictional])
- ProseMirror-based editor; no current collaboration layer
- Enterprise requirements: offline-first, conflict resolution, per-user audit trail
- Spike evaluated Yjs, Automerge, ShareDB

Decision: Yjs
- 2-day integration via y-prosemirror; 45ms merge latency at 20 users [fictional]; +38KB gzipped [fictional]; offline-first
- Automerge rejected: no ProseMirror binding (3-4 week custom build [fictional]); +120KB [fictional]
- ShareDB rejected: no offline support (disqualified)

Consequences:
- Positive: fast integration, offline-first, active community, sub-document support
- Negative: WebSocket provider TBD, audit trail requires custom middleware, binary document format
- Neutral: bundle size acceptable for enterprise

Stakeholders: James W. (VP Engineering), Karen L. (Eng Lead), Nate P. (Backend Engineer)
```

---

## Output

# ADR-012: Use Yjs CRDTs for Blueprints Real-Time Co-Editing

## Status

**Accepted**, December 8, 2025

Participants: Karen L. (Engineering Lead), Nate P. (Backend Engineer), James W. (VP Engineering, reviewer)

## Context

Blueprints requires real-time co-editing so that multiple enterprise authors can work simultaneously on the same document. The target performance requirement is 20+ concurrent editors per Blueprint with merge latency below 100ms [fictional]. Enterprise customers require offline-first capability (for field teams with unreliable connectivity), deterministic conflict resolution that preserves author intent, and per-user change attribution for audit trail compliance. These requirements reflect feedback from discovery interviews with six enterprise team leads (October 2025), where unreliable connectivity and compliance-driven change tracking emerged as non-negotiable constraints for any co-editing solution.

The current Workbench editor is built on ProseMirror with no collaboration layer. A 5-day CRDT spike (December 1-5, 2025) evaluated three libraries: Yjs, Automerge, and ShareDB. The spike produced functional prototypes for Yjs and ShareDB, and a partial prototype for Automerge (no ProseMirror binding available). Performance benchmarks were collected using a Playwright-based load test with 20 simulated concurrent editors. Nate P. led the spike and documented each prototype's integration steps, performance results, and qualitative assessment of developer ergonomics.

## Decision

Adopt **Yjs** (v13.6+, MIT license) as the CRDT library for Blueprints real-time co-editing. Use the `y-prosemirror` binding for ProseMirror integration. Deploy a WebSocket-based synchronization provider (specific provider to be determined in a follow-up decision). The production integration is estimated at 2 sprints, covering the WebSocket provider, persistence adapter, cursor awareness UI, and audit-trail middleware [fictional].

## Consequences

### Positive

- **2-day integration baseline:** The `y-prosemirror` binding provides cursor awareness, undo/redo per user, and document synchronization out of the box, reducing initial integration effort to an estimated 2 sprints for production-grade deployment [fictional]. This fast prototyping cycle also means the team can iterate on the collaboration UX without building foundational plumbing from scratch.
- **Offline-first by default:** Yjs queues edits locally when disconnected and merges them automatically on reconnect, satisfying the enterprise offline-first requirement without additional engineering work. This is particularly important for field teams at customers like those in the logistics and healthcare verticals, where connectivity gaps are common.
- **Sub-document support:** Yjs allows independent synchronization of document sections, reducing merge payloads for large Blueprints and enabling section-level lazy loading. For Blueprints with 10+ sections, this keeps merge payloads proportional to the section being edited rather than the full document.
- **Active community:** 15K+ GitHub stars, weekly maintenance commits, and production adoption by Liveblocks, BlockSuite, and other ProseMirror-based editors. The `y-prosemirror` binding is maintained by the Yjs author.
- **Performance within target:** 45ms median merge latency at 20 concurrent editors [fictional], well within the 100ms requirement. The 95th percentile latency measured during the spike was 72ms [fictional], still comfortably under the threshold.

### Negative

- **WebSocket provider decision deferred:** Yjs is transport-agnostic. The team must separately evaluate y-websocket (reference implementation), Hocuspocus (Tiptap's managed Yjs server), or a custom WebSocket provider on existing infrastructure. This affects deployment architecture, operational cost, and scaling. Until the provider is selected, the team cannot finalize the production infrastructure topology.
- **Per-user audit trail requires custom middleware:** Yjs tracks user awareness (cursor position, identity) but does not natively produce a per-edit attribution log. Building audit trail compliance requires a custom middleware layer that intercepts Yjs updates and records author identity per change. Nate P. estimated this middleware at approximately 1 week of engineering effort [fictional].
- **Opaque document format:** Yjs documents are stored as binary (Uint8Array), not human-readable JSON. Debugging document state, running database queries against document content, or migrating to a different CRDT library will require conversion tooling. This also means that data export features must decode Yjs state into a readable format before serving it to customers.
- **Vendor concentration risk:** The `y-prosemirror` binding is maintained by a single author (Kevin Jahns). If the maintainer reduces involvement, Workbench would need to fork and maintain the binding. To mitigate this, the team will pin the binding version and maintain a shallow fork for critical patches.

### Neutral

- **Bundle size (+38KB gzipped [fictional])** is acceptable for enterprise web applications where load time sensitivity is lower than consumer apps. The combined bundle (Yjs core + y-prosemirror) brings the total client payload to approximately 458KB gzipped [fictional], which remains within the 500KB performance budget. May need revisiting for a future mobile authoring experience.
- **CRDT merge semantics differ from OT.** Team members familiar with OT-based editors (Google Docs, ShareDB) will need to adjust mental models. CRDTs guarantee eventual consistency without a central authority, which means conflict resolution is deterministic but may produce unexpected merges when two users restructure the same section simultaneously. Karen L. plans a 1-hour internal workshop to align the team on CRDT fundamentals before Sprint 1.

## Alternatives Considered

### Automerge

Automerge offers a theoretically cleaner CRDT model (JSON-like document structure) and the strongest offline-first story via its Rust core with WASM bindings. However, Automerge has no first-party ProseMirror binding. Building a custom binding was estimated at 3-4 weeks of dedicated engineering effort [fictional], and the WASM binary adds +120KB gzipped to the bundle [fictional] (3x the Yjs footprint). Enterprise CSP configurations may require additional IT approval for WASM loading, which introduces a deployment friction point for security-conscious customers.

**Rejected:** Integration cost (3-4 weeks custom binding + ongoing maintenance) exceeds the benefit. The team would carry first-mover maintenance risk without proportional advantage. If Automerge releases a first-party ProseMirror binding in the future, the team may revisit this decision.

### ShareDB

ShareDB is an OT-based library that integrated with ProseMirror in 1.5 days (fastest of the three). Performance was acceptable (62ms merge latency at 20 concurrent editors [fictional]) and bundle size was the smallest (+22KB gzipped [fictional]).

**Rejected:** ShareDB requires a central server for conflict resolution and has no offline support. Edits made while disconnected are lost. This is a hard failure against the enterprise offline-first requirement and introduces a single point of failure. Even if offline support were not required, the central-server dependency means that a server outage would freeze all active editing sessions, an unacceptable risk for enterprise reliability expectations.

## References

- [Spike Summary: CRDT Library Evaluation for Blueprints Co-Editing](#), December 5, 2025
- [Yjs documentation](https://docs.yjs.dev)
- [y-prosemirror binding](https://github.com/yjs/y-prosemirror)
- Kleppmann, M. "A Conflict-Free Replicated JSON Datatype" (2017)
- [ProseMirror Collaborative Editing Guide](https://prosemirror.net/docs/guide/#collab)
