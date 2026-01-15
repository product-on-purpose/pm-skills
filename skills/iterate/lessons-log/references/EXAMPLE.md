---
artifact: lessons-log
version: "1.0"
created: 2026-01-14
status: complete
context: Production incident during high-traffic event
---

# Load Testing with Production Traffic Replay Prevents Scale Failures

## Metadata

| Attribute | Value |
|-----------|-------|
| **Entry ID** | LL-2026-001 |
| **Date** | November 29, 2025 (Black Friday) |
| **Author** | David Park, Engineering Manager |
| **Project/Initiative** | Black Friday 2025 Preparedness |
| **Team** | Platform Engineering |
| **Lesson Type** | Failure Pattern |

---

## Summary

Our payment service experienced a 47-minute outage during Black Friday due to database connection pool exhaustion under 10x normal load. Despite running load tests, we didn't catch this because our synthetic load tests didn't replicate real traffic patterns—specifically the bursty, concentrated nature of flash sale traffic. Production traffic replay would have caught this.

---

## Context

### Background

Black Friday is our highest traffic day, typically 8-10x normal volume. The platform team conducted load testing in October, simulating 10x traffic with good results. We also completed a capacity review and provisioned additional infrastructure. Despite this preparation, our payment service failed at 9:03 AM EST when traffic spiked.

### Timeline

| Date | Event |
|------|-------|
| Oct 15 | Load testing complete—10x capacity validated |
| Oct 20 | Capacity review approved additional database instances |
| Nov 1 | Infrastructure scaling deployed |
| Nov 29 09:00 | Black Friday sale begins |
| Nov 29 09:03 | Payment service latency spikes |
| Nov 29 09:07 | First customer complaints |
| Nov 29 09:15 | Incident declared, war room assembled |
| Nov 29 09:35 | Root cause identified (connection pool exhaustion) |
| Nov 29 09:50 | Connection pool resized, service recovering |
| Nov 29 10:15 | Full service restoration |

### Team and Stakeholders

- Platform Engineering team (incident response)
- Payment team (service owners)
- Customer Support (user communication)
- Executive team (business impact)
- Affected: ~12,000 customers couldn't complete purchases during outage

### Constraints

- Black Friday is immovable—no option to delay or reschedule
- Payment service is critical path—no graceful degradation possible
- Real traffic replay wasn't available (privacy concerns, infrastructure gap)

---

## What Happened

### Sequence of Events

1. **Sale launch (09:00):** Traffic increased as expected. Systems initially handling load well.

2. **Flash sale spike (09:02):** A limited-quantity flash sale created concentrated traffic—5,000 users hitting checkout simultaneously rather than distributed load.

3. **Connection pool saturation (09:03):** Payment service database connections exhausted. Each flash sale request held connections longer due to inventory checks under contention.

4. **Cascade begins (09:05):** New requests queue, timeouts trigger retries, retries amplify load. Database CPU hits 100%.

5. **Service degradation (09:07):** Payment API latency exceeds 30 seconds. Frontend shows errors. Customers start contacting support.

6. **Incident response (09:15):** War room assembled. Initially suspected DDoS attack due to traffic pattern.

7. **Root cause identified (09:35):** Database team identified connection pool exhaustion. Pool sized for 10x sustained load, not 10x burst load with long-held connections.

8. **Remediation (09:50):** Connection pool increased from 100 to 500, connection timeout reduced. Service begins recovering.

9. **Resolution (10:15):** Service fully restored. Estimated $340,000 in lost revenue during outage.

### Key Decisions Made

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Load test at 10x sustained | Match expected average load | Didn't catch burst patterns |
| Use synthetic traffic | Easier to generate, more controllable | Didn't match real user behavior |
| Size connection pool for average | Based on sustained throughput | Failed under burst |
| No production traffic replay | Privacy concerns, infrastructure cost | Missed realistic patterns |

### Outcome

47-minute service outage during our highest-revenue hour. Estimated $340,000 direct revenue loss, unknown brand damage. Customer trust impacted—we received 400+ complaint tickets in the following week referencing the Black Friday experience.

---

## The Lesson

### What We Learned

**Primary Lesson:**
Synthetic load tests with evenly distributed traffic don't catch burst-pattern failures. Production traffic replay—using anonymized real traffic patterns—reveals timing, distribution, and correlation patterns that synthetic tests miss.

**Supporting Observations:**
- Our load test sent 100 requests/second evenly distributed. Real traffic came in bursts of 5,000 in 10 seconds.
- Synthetic tests didn't simulate correlated requests (many users hitting the same flash sale item).
- Connection pool math was correct for throughput but wrong for concurrency under burst.
- The failure mode was predictable in retrospect—database contention under burst is a known pattern.

### Why This Matters

Load testing is expensive and time-consuming. If we're going to invest in it, we need it to actually predict production behavior. Synthetic tests gave us false confidence. Production traffic replay is the only way to truly simulate real-world patterns, especially for events with unusual traffic characteristics.

### Root Cause Analysis

- **Immediate cause:** Connection pool exhaustion under burst load
- **Contributing cause:** Load test didn't simulate burst patterns
- **Root cause:** No mechanism to replay real traffic patterns in test environments
- **Systemic cause:** Load testing treated as checkbox, not continuous practice

---

## Recommendations

### Do This

1. **Implement production traffic replay capability.** Capture and anonymize real traffic patterns. Replay them in staging environments before major events. Investment pays off on the first prevented outage.

2. **Test for burst patterns specifically.** Design load tests that include concentrated spikes, not just sustained throughput. Model flash sale dynamics, viral traffic patterns, and marketing campaign spikes.

3. **Size for concurrency, not just throughput.** When capacity planning, consider maximum concurrent connections, not just requests per second. These require different calculations.

4. **Do chaos engineering for resource exhaustion.** Regularly test what happens when connection pools, thread pools, and memory approach limits. Don't wait for production to discover failure modes.

### Avoid This

1. **Don't assume synthetic load tests prove production readiness.** Synthetic tests prove a specific pattern works—they don't prove all patterns work. Know what you haven't tested.

2. **Don't treat load testing as a one-time checkbox.** Traffic patterns change. Run load tests regularly, especially before major events or after significant changes.

3. **Don't dismiss production traffic replay due to privacy concerns.** Traffic patterns can be anonymized and replayed without exposing user data. The technique is well-established.

### Questions to Ask

- What are the busiest patterns in our real traffic, not just the average?
- Have we tested what happens when N requests hit the same resource simultaneously?
- What's our failure mode when [resource] is exhausted? Do we fail gracefully?
- When was the last time we load tested with realistic patterns?

---

## Applicability

### When This Applies

- Preparing for known high-traffic events (sales, launches, campaigns)
- Operating services with shared resources (connection pools, caches)
- Running systems where traffic is bursty, not steady
- After scaling capacity based on throughput calculations

### When This May Not Apply

- Services with naturally even traffic distribution
- Systems designed for graceful degradation (non-critical paths)
- Very early-stage products where traffic is low and predictable

### Related Situations

- Marketing campaign launches with concentrated traffic spikes
- Product launches with viral potential
- Any "thundering herd" scenario (cache expiration, failover recovery)
- Services downstream of rate-limiters that can "dam break"

---

## Supporting Evidence

### Metrics/Data

| Metric | Load Test | Black Friday Reality |
|--------|-----------|---------------------|
| Peak RPS | 1,000 | 1,200 |
| Peak concurrent connections | 80 | 450+ |
| Request distribution | Even over time | 80% in first 30 seconds of flash sale |
| Connection hold time | 50ms average | 800ms under contention |

### Quotes

> "The load test results looked great. We hit 10x traffic with no issues. What we didn't realize is that we were testing a fantasy version of 10x traffic." — Sarah Chen, Platform Engineering

> "In retrospect, of course flash sales create burst patterns. We just didn't think to simulate it." — Mike Johnson, Payment Service Owner

### Artifacts

- [Black Friday Incident Postmortem](link)
- [Load Testing Report - October 2025](link)
- [Production Traffic Replay RFC](link)

---

## Tags and Categories

**Primary Category:** Infrastructure

**Tags:** #load-testing #scale-failure #connection-pools #traffic-patterns #black-friday #incident #database #capacity-planning

**Related Lessons:** LL-2024-008 (Cache thundering herd), LL-2025-003 (Database connection limits)

---

## Review and Updates

| Date | Reviewer | Update |
|------|----------|--------|
| 2025-12-05 | David Park | Initial entry from postmortem |
| 2026-01-14 | Sarah Chen | Added production traffic replay RFC link |

---

*This lesson was captured to help future teams avoid repeating our mistakes and build on our successes.*
