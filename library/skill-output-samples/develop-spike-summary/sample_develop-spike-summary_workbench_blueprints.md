---
title: "Develop Spike Summary: Workbench Blueprints"
description: "Workbench enterprise collaboration platform: CRDT library evaluation for Blueprint co-editing."
artifact: spike-summary
version: "1.0"
repo_version: "2.5.0"
skill_version: "2.0.0"
created: 2026-02-21
status: sample
thread: workbench
context: "Workbench enterprise collaboration platform: CRDT library evaluation for Blueprint co-editing"
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Workbench is a Series B enterprise collaboration platform (~200 employees, ~500 enterprise customers [fictional]) building Blueprints. Real-time co-editing is a requirement for enterprise document workflows, but the existing editor does not use CRDTs. Karen L. (Engineering Lead) assigned Nate P. (Backend Engineer) a 5-day spike to evaluate three CRDT libraries (Yjs, Automerge, and ShareDB) for integrating conflict-free real-time co-editing into the Blueprints authoring experience. The spike results will inform the architecture decision record. Because the Blueprints build timeline targets an April 2026 GA, Karen needed the spike completed before December planning so the team could lock in the collaboration architecture and estimate production integration effort for Sprint 1.

**Source Notes:**

- Yjs documentation (docs.yjs.dev) describes Yjs as a high-performance CRDT implementation supporting offline-first editing, sub-document syncing, and multiple network providers, with benchmarks showing sub-millisecond merge times for typical document operations.
- Automerge's GitHub repository (github.com/automerge/automerge) describes it as a JSON-like CRDT library designed for local-first software, with a Rust core and WebAssembly bindings for browser performance.
- ShareDB documentation (share.github.io/sharedb/) describes it as an Operational Transformation (OT) library, not strictly a CRDT, that requires a central server for conflict resolution and is used by several production collaborative editors.

---

## Prompt

```
/spike-summary

Spike: CRDT library evaluation for Blueprints real-time co-editing
Product: Workbench (enterprise collaboration platform)
Engineer: Nate P. (Backend Engineer)
Duration: 5 days (Dec 1-5, 2025)

Background:
- Blueprints requires real-time co-editing (20+ concurrent editors per document [fictional])
- Our editor is ProseMirror-based; no current collaboration layer
- Enterprise requirements: offline-first, conflict resolution, per-user audit trail
- Target: 20+ concurrent editors, <100ms merge latency [fictional]

Libraries evaluated:
1. Yjs (CRDT, MIT) -- y-prosemirror binding; offline-first; sub-document support
2. Automerge (CRDT, MIT) -- Rust/WASM; strong offline; no ProseMirror binding
3. ShareDB (OT, MIT) -- central server model; mature; no offline support

Findings from prototype:
- Yjs: integrated in 2 days; 45ms merge latency at 20 users [fictional]; +38KB gzipped [fictional]; offline works out of box
- Automerge: no ProseMirror binding (3-4 week custom build [fictional]); +120KB gzipped [fictional]; excellent offline
- ShareDB: integrated in 1.5 days; 62ms merge latency [fictional]; +22KB gzipped [fictional]; NO offline (disqualified)

Stakeholders: Karen L. (Eng Lead), James W. (VP Engineering)
```

---

## Output

# Spike Summary: CRDT Library Evaluation for Blueprints Co-Editing

## Overview

| Field | Value |
|-------|-------|
| **Spike Title** | CRDT Library Evaluation for Blueprints Real-Time Co-Editing |
| **Owner** | Nate P., Backend Engineer |
| **Duration** | 5 days (December 1-5, 2025) |
| **Status** | Complete |
| **Outcome** | Recommend Yjs |

## Background

Blueprints requires real-time co-editing so that multiple enterprise authors can work on the same document simultaneously. The current Workbench editor is built on ProseMirror with no collaboration layer. Enterprise customers have three requirements that constrain the solution space: (1) offline-first capability for field teams and employees with unreliable connectivity, (2) conflict resolution that preserves author intent when two users edit the same section, and (3) per-user change attribution for audit trail compliance. These three constraints emerged consistently across all six enterprise team-lead interviews conducted in October 2025, making them non-negotiable for any library selection.

The performance target is 20+ concurrent editors per Blueprint with merge latency below 100ms [fictional]. This is based on the largest customer account's typical document workflow, where a cross-functional team of 15-25 people may edit a project kickoff Blueprint during a planning session [fictional]. While most day-to-day editing involves 2-5 concurrent authors, the spike benchmarked against the peak scenario to ensure headroom under load.

## Approach

### What We Tried

Built a minimal prototype for each library: a ProseMirror editor with 6 rich-text sections (mimicking a Blueprint template), connected to a collaboration backend, tested with simulated concurrent editors. Each prototype was evaluated against five criteria: ProseMirror integration effort, offline-first support, concurrent editor performance, bundle size impact, and community maturity.

Prototypes were tested locally and on a staging server (single-region, us-east-1) with synthetic load generated by a custom Playwright script that simulated 20 concurrent editors making randomized edits at 2-second intervals for 10 minutes [fictional]. The Playwright script used realistic edit patterns, including paragraph-level insertions, section reordering, and inline formatting, to approximate real authoring behavior rather than random character insertion.

### Technologies/Tools Evaluated

| Library | Type | License | Version Tested |
|---------|------|---------|---------------|
| Yjs | CRDT | MIT | v13.6 |
| Automerge | CRDT | MIT | v2.2 |
| ShareDB | OT (Operational Transformation) | MIT | v4.1 |

## Findings

### Finding 1: Yjs Integrates with ProseMirror in 2 Days and Meets All Performance Targets

Yjs has a first-party ProseMirror binding (`y-prosemirror`) that handles cursor awareness, undo/redo per user, and document synchronization. Integration took 2 days: 1 day for basic editing sync, 1 day for cursor presence and offline queue. The 20-user concurrent editing test recorded a median merge latency of 45ms [fictional], well within the 100ms target. The 95th percentile latency was 72ms [fictional], confirming comfortable margin even under burst conditions.

Offline-first support works out of the box. Edits made while disconnected are queued locally using Yjs's built-in persistence layer and merged automatically on reconnect. Conflict resolution preserves both edits (CRDT guarantee) without data loss. Sub-document support allows Blueprints to sync individual sections independently, which reduces the merge payload for large documents. In the prototype, sub-document sync cut the average merge payload by roughly 60% compared to whole-document sync for a 6-section Blueprint [fictional].

Bundle size impact: +38KB gzipped (+12KB for y-prosemirror, +26KB for yjs core) [fictional]. Acceptable for enterprise use where load time sensitivity is lower than consumer apps.

Community: Yjs has 15K+ GitHub stars, active maintenance (weekly commits as of December 2025), and is used in production by Liveblocks, BlockSuite, and several other ProseMirror-based editors.

### Finding 2: Automerge Has the Strongest Offline Story but Requires a Custom ProseMirror Binding

Automerge's Rust core with WASM bindings delivers excellent offline-first performance and a theoretically cleaner CRDT model (JSON-like document structure). However, Automerge has no first-party ProseMirror binding. Building a custom binding would require mapping ProseMirror's node-based document model to Automerge's JSON-like structure, handling cursor awareness, and implementing undo/redo integration. Estimated effort: 3-4 weeks of dedicated engineering time [fictional]. The estimate accounts for both the initial build and the testing effort needed to handle ProseMirror's complex transaction model.

The WASM binary adds +120KB gzipped to the bundle [fictional], which is 3x the Yjs footprint. For enterprise customers with strict Content Security Policy (CSP) configurations, WASM loading may require additional CSP header modifications and customer-side IT approval, introducing a deployment friction point.

Community: Automerge has 12K+ GitHub stars and active maintenance, but the ProseMirror ecosystem integration is less mature than Yjs.

### Finding 3: ShareDB Is the Fastest to Integrate but Fails the Offline-First Requirement

ShareDB integrated with ProseMirror in 1.5 days using the `ot-json1` type, making it the fastest library to prototype. The 20-user concurrent editing test recorded a median merge latency of 62ms [fictional], within the 100ms target.

However, ShareDB uses Operational Transformation (OT), which requires a central server to resolve conflicts. Edits made while disconnected are lost. ShareDB has no local persistence layer and no offline queue. For enterprise customers with field teams, unreliable connectivity, or VPN interruptions, this is a hard failure. The offline-first requirement eliminates ShareDB from consideration regardless of its other strengths.

Additional concern: OT's central-server dependency introduces a single point of failure. If the OT server goes down, all active editing sessions freeze. CRDT-based solutions degrade gracefully because each client holds the full document state. For an enterprise product serving 500 accounts, this reliability difference is significant: even brief server outages during business hours could affect dozens of active editing sessions simultaneously.

## Recommendation

### If Proceeding

**Recommend Yjs.** It is the only library that satisfies all five evaluation criteria: 2-day ProseMirror integration, offline-first out of the box, 45ms merge latency at 20 concurrent editors [fictional], acceptable bundle size (+38KB gzipped [fictional]), and the strongest community support in the ProseMirror ecosystem. Yjs also provides the clearest path to production because the y-prosemirror binding handles the most complex integration challenges (cursor awareness, undo management, document sync) without custom engineering.

**Next step:** Record an ADR for the Yjs decision. Plan production integration for Sprint 1 of the Blueprints build (estimated 2 sprints for production-grade integration, including WebSocket provider, persistence adapter, and cursor awareness UI) [fictional].

### If Not Proceeding

If real-time co-editing is descoped from Blueprints v1, no CRDT library is needed. The ProseMirror editor would remain single-user with document locking (check-out/check-in model). This would reduce Sprint 1 scope by approximately 2 weeks [fictional] but would remove a key enterprise differentiator. Mei-Lin T. (Enterprise Sales Lead) has noted that co-editing is a top-3 feature request in active enterprise sales conversations, so descoping carries pipeline risk.

## Artifacts

- Yjs prototype: `spikes/crdt-evaluation/yjs-prosemirror-prototype/`
- Automerge prototype: `spikes/crdt-evaluation/automerge-prototype/` (partial; no ProseMirror binding)
- ShareDB prototype: `spikes/crdt-evaluation/sharedb-prosemirror-prototype/`
- Playwright load test script: `spikes/crdt-evaluation/load-test/`
- Performance benchmark results: `spikes/crdt-evaluation/benchmarks.csv`

## Open Questions

- What WebSocket provider should Yjs use in production? Options include y-websocket (reference implementation), Hocuspocus (Tiptap's hosted Yjs server), or a custom WebSocket server on existing infrastructure. Each option has different cost, latency, and SOC 2 compliance characteristics.
- How should per-user change attribution be implemented for audit trail compliance? Yjs tracks awareness but does not natively produce a per-edit attribution log. Nate P. estimates approximately 1 week of engineering effort for a custom middleware solution [fictional].
- What is the persistence strategy for Yjs documents? Options: y-indexeddb for client-side, y-leveldb or y-mongodb for server-side. The choice affects backup frequency, disaster recovery, and data export capabilities.

## Follow-up Items

- [ ] Record ADR for Yjs selection (Karen L., December 2025)
- [ ] Evaluate WebSocket provider options for production (Nate P., Sprint 1)
- [ ] Design per-user change attribution middleware for audit trail (Nate P. + Aisha K., Sprint 1)
- [ ] Estimate production integration effort for sprint planning (Karen L., pre-Sprint 1)
- [ ] Test Yjs performance at 50 concurrent editors to understand scaling headroom [fictional] (Nate P., Sprint 1)
