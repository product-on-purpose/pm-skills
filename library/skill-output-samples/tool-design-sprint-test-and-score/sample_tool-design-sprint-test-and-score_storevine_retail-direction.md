---
title: "Design Sprint Test and Score: Storevine Brief Interface Validation"
description: "Storevine Friday sprint-closing artifact: 5 merchandiser interviews with counterbalanced A+D rumble, scorecard validates Sprint Question 1 4-of-5 on Sketch D (5-min comprehension) vs 2-of-5 on Sketch A, Sketch D wins decisively, Mei Decider call SCALE to paid GA with Sketch D as the launch format."
artifact: design-sprint-test-and-score
version: "1.0"
repo_version: "2.15.0"
skill_version: "0.1.0"
created: 2026-05-16
status: sample
thread: storevine
context: "Storevine specialty-retail managed-intelligence service; Design Sprint week of 2026-07-13 testing Monday brief comprehension + actionability + trust after 4-week design-partner pilot"
---

<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Friday 2026-07-17. Trial run passed Thursday 17:00 PT. 5 merchandisers completed the full Five-Act with counterbalanced A/D presentation Friday 09:00-16:30 PT. The team invokes `tool-design-sprint-test-and-score` to capture observations, score the rumble result, and frame Mei's call.

## Per-Customer Interview Observation Notes

### Customer 1: Bayfront-Merch-A (09:00 slot; design partner; A first)

**Profile:** Outdoor retailer; 14 stores; merchandiser 6 years.

**Context:** Opens email Mon 07-09 AM; has ~5 min before ops fires. Pilot brief currently takes her ~8 min to digest.

**Task A:** Opened email, read subject "Monday: 3 actions..." Looked at email body for 12 sec; identified top action immediately ("restock SKU 4421"). Then opened PDF; spent 3 more min reading. Total comprehension: 3:20.

**Task D:** Opened email, read narrative "What changed" lead for 20 sec; then read action bullets for 30 sec. Total comprehension: 0:50.

**Debrief:** "D is faster. A's named-analyst thing is nice but I already know Carlos. The narrative lead in D gave me context I needed to trust the actions." Pricing: "$1k MRR is reasonable; I'd pay $1.2k if it consistently saved me 20 min on Mondays."

### Customer 2: West-Loop-Merch (10:30 slot; design partner; D first)

**Profile:** Home retailer; 22 stores; merchandiser 4 years.

**Task D:** 1:10 comprehension. "What changed paragraph gave me the why; bullets gave me the what."

**Task A:** 2:45 comprehension. "Subject line is clever but I don't trust unfamiliar analyst names."

**Debrief:** Strong preference for D. Pricing: "$1k yes; would pay more for sector benchmarks."

### Customer 3: Outdoor-Net-A (12:00 slot; A first)

**Profile:** Outdoor; 8 stores; merchandiser 3 years.

**Task A:** 4:10 comprehension. "Took me a while to see the analyst sidebar."

**Task D:** 1:30 comprehension. "This one I just got."

**Debrief:** D preferred. Pricing $800.

### Customer 4: Home-Net-B (14:00 slot; D first)

**Profile:** Home goods; 32 stores; merchandiser 8 years.

**Task D:** 0:45 comprehension. Fastest of all customers.

**Task A:** 2:20 comprehension. "Cluttered for me."

**Debrief:** D strongly preferred. Pricing $1.2k.

### Customer 5: Specialty-Food-Net (15:30 slot; A first)

**Profile:** Specialty food; 11 stores; merchandiser 5 years.

**Task A:** 3:50 comprehension.

**Task D:** 1:15 comprehension.

**Debrief:** D preferred. "The 'what changed' framing matches how I think." Pricing $1k.

## Best Quotes

1. "D is faster. The narrative lead gave me context I needed to trust the actions." - C1
2. "What changed paragraph gave me the why; bullets gave me the what." - C2
3. "This one I just got." - C3 (re Sketch D)
4. "I'd pay more for sector benchmarks." - C2
5. "Cluttered for me." - C4 (re Sketch A)
6. "Would pay $1.2k if it consistently saved me 20 min on Mondays." - C1
7. "The 'what changed' framing matches how I think." - C5
8. "I don't trust unfamiliar analyst names." - C2 (re Sketch A subject-line)

## Scorecard Grid

| | C1 | C2 | C3 | C4 | C5 | Day-end |
|---|---|---|---|---|---|---|
| Q1 Sketch A: Top-3 in <5 min | partial (3:20) | partial (2:45) | partial (4:10) | partial (2:20) | partial (3:50) | **Partial-Validated for A (5-of-5 under 5 min but median 3:20 above 30-sec scan goal)** |
| Q1 Sketch D: Top-3 in <5 min | Y (0:50) | Y (1:10) | Y (1:30) | Y (0:45) | Y (1:15) | **Validated 5-of-5 for D (median 1:10)** |
| Q2 Sketch A: analyst credibility | Y | N (unfamiliar names distrusted) | Y | Y | partial | **Mixed for A (3-of-5 Y)** |
| Q2 Sketch D: analyst credibility | Y (narrative carries trust) | Y | Y | Y | Y | **Validated 5-of-5 for D** |
| Q3: 2+ actions actionable (D preferred) | Y | Y | Y | Y | Y | **Validated 5-of-5** |
| Q4: web companion adds value vs fragments | PDF-primary; web drill-down 2-of-5 | (same) | (same) | (same) | (same) | **PDF-primary validated; web marginal** |
| Q5: top-priority in first 30 sec | Y D / partial A | (same) | (same) | (same) | (same) | **Validated for D 5-of-5; partial for A 3-of-5** |

**Decider override:** None needed; D wins decisively.

## Observed Patterns

### Worked (D)

- **"What changed" narrative-lead** (5-of-5): customers consistently described the lead paragraph as the context that made the actions trustable.
- **Sub-90-sec comprehension** (5-of-5; median 1:10): well below 5-min target.
- **Action bullets with SKU + store + qty specificity** (5-of-5): self-described all 3 as actionable.

### Hesitated (A)

- **Named-analyst subject-line** (3-of-5): customers either didn't know Carlos personally (C2, C3) or found the subject-line cleverness manipulative (C4).
- **Email-body-as-deck** (4-of-5): A's email body tries to do too much; customers tap to PDF anyway.

### Broke trust

- None observed.

### Unexpected

- **Sector benchmark request** (3-of-5 unprompted; C1, C2, C5): customers self-described wanting "how my numbers compare to similar retailers."
- **D's narrative lead was the credibility carrier**, not analyst attribution. Trust comes from narrative voice, not named person.

## Hot Takes

### Mei

D wins. Rumble was the right call; we got 5-on-5 validation on D that we wouldn't have if we'd shipped A. Going paid GA with D as launch format. Sector benchmark ask is v0.2 pull and changes long-term roadmap.

### Tasha

Narrative lead is the design win. We should make narrative-writing a core analyst skill. PDF-primary + web-drill-down split is also confirmed.

### Devon

Data pipeline can produce "what changed" delta calculations reliably; this is buildable. Sector benchmarks need cross-customer data which raises privacy/aggregation questions for v0.2.

### Carlos

The merchandisers got D in under 90 seconds. That's not just better than A; that's better than anything I built at REI. This is the right format for the segment.

## Decider Summary

**The call:** Scale to paid GA with Sketch D as the launch format.

**Rationale:** D validated 5-of-5 on Sprint Question 1 (median comprehension 1:10 vs A's 3:20), 5-of-5 on Q2 trust signals, 5-of-5 on Q3 actionability, and 5-of-5 on Q5 first-30-sec scan. A's named-analyst attribution did not scale across customers (3-of-5). Pilot's 78% open-rate + 3.6 actionability gap is closed by D; pre-test commits met. Sector-benchmark ask is next-version, not blocking v0.1 launch.

**Highest-confidence learning:** Narrative-led briefs with specific SKU + store + qty action bullets are read in under 90 seconds and produce actionable Monday decisions for specialty-retail merchandisers.

**Most important revision:** Scope sector benchmarks into v0.2 roadmap (currently not planned).

**Next artifact:** PRD for paid-GA launch using Sketch D format; produced via `deliver-prd` within 5 business days (target: 2026-07-24).

## Decider Checkpoint

- [x] Mei confirms scorecard
- [x] Mei commits to scale-call with Sketch D
- [x] Mei names highest-confidence learning
- [x] Mei names revision: scope sector benchmarks into v0.2
- [x] Mei names next artifact: PRD by 2026-07-24
- [x] Mei acknowledges Monday handoff: pilot retention conversations resume 2026-07-21

**Signed:** Mei (founder, PM/CEO), 2026-07-17 17:25 PT.

**Sprint closed. Foundation Sprint + 4-week pilot + Design Sprint arc complete; Scale authorized; PRD work begins Monday 2026-07-20.**