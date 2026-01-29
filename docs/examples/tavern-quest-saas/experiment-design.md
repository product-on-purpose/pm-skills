# Experiment Design: Last-Minute Hero

> Skill: [measure-experiment-design](/skills/measure-experiment-design/)

---

## Hypothesis

**We believe** adding a "Last-Minute Hero" feature (urgent party slot notifications)
**For** adventurers marked as "available now"
**Will** reduce quest cancellations due to last-minute dropouts
**Because** qualified replacements can be found within 2 hours instead of 2 days

### Key Assumptions

1. Adventurers are willing to accept same-day quests if the pay is right
2. Quest givers would rather find a replacement than cancel
3. Mobile (crystal ball) notifications will reach adventurers quickly enough

---

## Success Metrics

### Primary Metric

| Metric | Baseline | Target | Measurement |
|--------|----------|--------|-------------|
| Quest cancellation rate (dropout-related) | 12% | 6% | Quest status records |

### Secondary Metrics

| Metric | Baseline | Target | Measurement |
|--------|----------|--------|-------------|
| Time-to-replacement | 18 hours | 2 hours | Timestamp delta |
| Last-minute hero acceptance rate | N/A | 25% | Notification → acceptance |
| Quest success rate (w/ replacement) | N/A | 80% | Post-quest reports |

### Guardrail Metrics

| Metric | Threshold | Concern |
|--------|-----------|---------|
| Quest failure rate | +5% max | Rushed replacements may hurt quality |
| Adventurer burnout complaints | <10 | Notification fatigue |
| False "available" reports | <15% | Gaming the system for priority access |

---

## Experiment Design

### Type

A/B test with guild-level randomization

### Allocation

- **Control (50%):** Existing flow — party leader manually searches for replacement
- **Treatment (50%):** "Last-Minute Hero" — urgent notifications to available adventurers

### Population

- Guilds with 5+ active quests/month
- Quest types: Dungeon crawl, monster hunt, escort (excludes long expeditions)
- Regions: Waterdeep, Baldur's Gate, Neverwinter (sending stone coverage required)

### Duration

6 weeks (covers typical quest cycle variance)

### Sample Size

- Minimum: 200 quests per arm (400 total)
- Expected: ~600 quests based on current volume
- Power: 80% to detect 50% reduction in cancellation rate

---

## Test Mechanics

### Treatment Flow

1. Party member marks themselves as "dropping out" (illness, death, schedule conflict)
2. Party leader receives option: "Find Last-Minute Hero?"
3. If yes → System identifies adventurers who:
   - Are marked "Available Now"
   - Match required class/level range
   - Have 85%+ reliability rating
   - Are within 2-hour travel distance (teleportation circle or fast mount)
4. Matching adventurers receive urgent notification (priority sending stone ping)
5. First to accept joins party; others notified slot is filled
6. Expedited onboarding: party leader can share quest brief instantly

### Control Flow

1. Party member marks themselves as "dropping out"
2. Party leader manually searches Party Finder
3. Standard outreach and vetting process

---

## Data Collection

### Events to Log

| Event | Properties |
|-------|------------|
| `dropout_reported` | quest_id, member_id, reason, hours_before_start |
| `lmh_triggered` | quest_id, candidates_notified, required_class |
| `lmh_notification_sent` | adventurer_id, quest_id, timestamp |
| `lmh_notification_opened` | adventurer_id, latency_seconds |
| `lmh_accepted` | adventurer_id, quest_id, time_to_accept |
| `lmh_declined` | adventurer_id, quest_id, reason |
| `quest_cancelled` | quest_id, reason, arm |
| `quest_completed` | quest_id, success, party_composition, arm |

### Surveys

- **Post-quest (replacement):** "How well did your Last-Minute Hero integrate?"
- **Weekly (LMH adventurers):** "Notification volume acceptable?"

---

## Rollout Plan

| Phase | Duration | Scope | Exit Criteria |
|-------|----------|-------|---------------|
| Internal dogfood | 1 week | T&Q staff guilds only | No critical bugs |
| Limited beta | 2 weeks | 10% of eligible guilds | Guardrails hold |
| Full experiment | 6 weeks | 50/50 split | Statistical significance |
| Decision | 1 week | Analysis | Ship, iterate, or kill |

### Kill Criteria

Halt experiment immediately if:
- Quest failure rate increases >10% in treatment arm
- More than 3 "rushed replacement" complaints from quest givers
- Notification system causes sending stone network congestion

---

## Analysis Plan

### Primary Analysis

- Two-proportion z-test comparing cancellation rates
- Intent-to-treat: analyze by assigned arm regardless of feature usage

### Segmentation

- By quest difficulty (CR 1-5, 6-10, 11-15)
- By dropout timing (24+ hours vs. <24 hours before start)
- By replacement class (tank/healer shortage hypothesis)

### Confounds to Monitor

- Seasonal quest volume (festival season = more quests)
- Regional events (dragon attacks may spike urgency)
- Day-of-week effects (weekend warriors)

---

## Team & Timeline

| Milestone | Date | Owner |
|-----------|------|-------|
| Instrumentation complete | Week 1 | Artificer team |
| Internal dogfood | Week 2 | PM (Thrain) |
| Beta launch | Week 3 | Engineering |
| Full experiment start | Week 5 | PM |
| Experiment end | Week 11 | PM |
| Results readout | Week 12 | Data team |

---

## Open Questions

1. Should we offer premium pay to Last-Minute Heroes? (Risk: creates perverse incentives to cause dropouts)
2. How do we handle adventurers who accept but don't show up?
3. Should replacement adventurers see the dropout's ratings/reviews?
