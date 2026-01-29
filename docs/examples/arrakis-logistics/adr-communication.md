# ADR-007: Storm-Resilient Communication Protocol

> Skill: [develop-adr](/skills/develop-adr/)

---

## Status

**Accepted** — Approved by Thufir Hawat, Mentat Strategist (10191 AG)

---

## Context

Arrakis Logistics requires reliable communication between harvesters, carryalls, and command during sandstorm conditions. Current radio systems experience 30% blackout rates during storms, leading to:

- Missed carryall pickup windows
- Crew evacuations without command visibility
- Post-storm search and rescue operations
- CHOAM audit failures (incomplete operation logs)

The Wormsign 2.0 system intensifies this need: predictive alerts are useless if they can't reach crews during adverse conditions.

---

## Decision Drivers

1. **Reliability** — Messages must arrive during Coriolis storms
2. **Latency** — Wormsign alerts require <30 second delivery
3. **Security** — House Harkonnen intercept capability is confirmed
4. **Bandwidth** — Must support telemetry streams, not just text
5. **Autonomy** — Must function if central command is unreachable

---

## Options Considered

### Option 1: Enhanced Radio with Relay Towers

**Description:** Upgrade existing radio infrastructure with storm-hardened relay stations.

**Pros:**
- Builds on existing systems
- Crew already trained
- Lower upfront cost

**Cons:**
- Relay towers are primary targets for sabotage
- Still fails in worst storms (signal absorption)
- Towers require constant maintenance (sand abrasion)

**Assessment:** Incremental improvement; doesn't solve fundamental physics problem.

---

### Option 2: Low-Orbit Satellite Mesh

**Description:** Deploy constellation of small satellites for beyond-line-of-sight communication.

**Pros:**
- Storm-independent (signals above weather)
- Planet-wide coverage
- High bandwidth capacity

**Cons:**
- Extreme cost (500,000+ solaris)
- 18-month deployment timeline
- Guild may object to orbital infrastructure
- Single points of failure if satellites lost

**Assessment:** Best long-term solution but not viable for current timeline/budget.

---

### Option 3: Hybrid Mesh Network with Store-and-Forward

**Description:** Combine short-range mesh radios with intelligent message queuing. Harvesters, carryalls, and ground vehicles form an ad-hoc network. Messages route through any available path and queue when no path exists.

**Pros:**
- No single point of failure
- Degrades gracefully (messages delayed, not lost)
- Lower infrastructure cost than satellites
- Each vehicle extends the network

**Cons:**
- Message latency during full blackouts
- Requires protocol changes for all vehicles
- Complex routing logic

**Assessment:** Best balance of reliability, cost, and timeline.

---

### Option 4: Fremen Messenger Network

**Description:** Use Fremen runners with memorized messages for critical communications.

**Pros:**
- Works in any conditions
- Untraceable by Harkonnen
- Builds Fremen alliance

**Cons:**
- Slow (hours, not seconds)
- Doesn't scale
- Can't transmit telemetry data

**Assessment:** Valuable backup for command-level messages; not suitable for real-time operations.

---

## Decision

**Adopt Option 3 (Hybrid Mesh Network) as primary system, with Option 4 (Fremen Messengers) as fallback for strategic communications.**

---

## Architecture

### Network Topology

```
                    ┌─────────────────┐
                    │ Arrakeen Command│
                    │   (always on)   │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
         ┌────▼────┐   ┌─────▼─────┐   ┌────▼────┐
         │ Relay   │   │  Relay    │   │ Relay   │
         │ Tower A │   │  Tower B  │   │ Tower C │
         └────┬────┘   └─────┬─────┘   └────┬────┘
              │              │              │
    ══════════╪══════════════╪══════════════╪══════════
              │     STORM BOUNDARY          │
    ══════════╪══════════════════════════════════════
              │
         ┌────▼────┐         ┌──────────┐
         │Carryall │◄───────►│Harvester │
         │   01    │   mesh  │   Alpha  │
         └────┬────┘         └────┬─────┘
              │                   │
              │              ┌────▼─────┐
              └─────────────►│Harvester │
                    mesh     │   Beta   │
                             └──────────┘

Legend:
  ─── : Reliable link
  ◄─► : Mesh radio (ad-hoc, store-forward)
```

### Message Priority Tiers

| Tier | Type | Max Latency | Retry Policy |
|------|------|-------------|--------------|
| P0 | Wormsign Alert | 30 sec | Continuous until ACK |
| P1 | Evacuation Order | 60 sec | 10 retries, then Fremen fallback |
| P2 | Carryall Dispatch | 5 min | Queue until delivery |
| P3 | Telemetry Stream | 15 min | Best effort; batch if needed |
| P4 | Administrative | 1 hour | Queue; deliver on reconnect |

### Store-and-Forward Logic

1. **Send attempt:** Try direct route to destination
2. **Route discovery:** If no path, broadcast route request
3. **Opportunistic forward:** Any vehicle heading toward destination carries message
4. **Guaranteed store:** All P0-P2 messages persist until confirmed delivery
5. **Expiration:** P3-P4 messages expire after defined TTL

---

## Security Considerations

| Threat | Mitigation |
|--------|------------|
| Harkonnen interception | End-to-end encryption (Ixian ciphers) |
| Message forgery | Digital signatures; command authentication |
| Replay attacks | Timestamp + nonce in all messages |
| Traffic analysis | Dummy traffic during quiet periods |
| Compromised vehicle | Per-device keys; remote revocation |

---

## Consequences

### Positive

- **Improved reliability:** Expected 95%+ message delivery even in storms
- **Graceful degradation:** Partial network still functions
- **Scalability:** Adding vehicles extends coverage automatically
- **Auditability:** All messages logged for CHOAM compliance

### Negative

- **Latency variance:** P3-P4 messages may be delayed significantly
- **Complexity:** Debugging mesh issues requires specialized training
- **Battery impact:** Mesh radios increase vehicle power consumption 8%
- **Training:** All crews need protocol certification (2-day course)

### Neutral

- **Fremen integration:** System neither helps nor hinders Fremen relations
- **Equipment cost:** Offsets relay tower maintenance savings

---

## Implementation Plan

| Phase | Deliverable | Timeline |
|-------|-------------|----------|
| 1 | Protocol specification | 2 weeks |
| 2 | Mesh radio procurement (Ixian) | 4 weeks |
| 3 | Harvester fleet retrofit | 6 weeks |
| 4 | Carryall fleet retrofit | 4 weeks |
| 5 | Command integration | 2 weeks |
| 6 | Crew training | 3 weeks (rolling) |
| 7 | Full deployment | Week 16 |

---

## Review Triggers

Revisit this decision if:

- Storm communication success rate falls below 90%
- Satellite costs drop below 200,000 solaris
- Guild approves orbital infrastructure
- Harkonnen demonstrates successful message interception

---

## Related Decisions

- ADR-003: Encryption Standards (referenced for cipher selection)
- ADR-005: Vehicle Telemetry Format (defines P3 message structure)
- ADR-009: Fremen Integration Protocols (pending; will define messenger handoff)
