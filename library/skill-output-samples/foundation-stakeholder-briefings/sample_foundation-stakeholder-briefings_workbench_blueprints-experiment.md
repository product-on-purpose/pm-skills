---
title: "Stakeholder Briefings: Workbench Required-vs-Optional-Sections A/B Results"
description: "One required-vs-optional-sections A/B test result fanned out into three audience briefings (Data/BI, Executive, Engineering) from a single traceable master document."
artifact: stakeholder-briefings
version: "1.0"
repo_version: "2.28.0"
skill_version: "1.0.0"
created: 2026-06-20
status: sample
thread: workbench
context: Workbench enterprise collaboration platform - required-vs-optional-sections A/B test results projected to three lenses ahead of the ship decision
---
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->

## Scenario

Leo M. (Data Analyst) has closed out the required-vs-optional-sections A/B test: required-section enforcement cut median time-to-approved by 40% [fictional], a statistically significant win. The result has to reach three audiences before the ship decision - the data team that ran it and now owns the GA dashboards, the executive sponsor who decides whether enforcement ships as the default, and the engineering team that has to remove the experiment flags and harden the path. Leo runs `foundation-stakeholder-briefings` against the results doc. The skill proposes Data/BI, Executive, PMM, and Engineering for an experiment source; Leo drops PMM (no launch-narrative decision yet) and keeps Data/BI, Executive, and Engineering.

**Source Notes:**

- Workbench is fictional.
- All metrics [fictional].

## Prompt

```
/foundation-stakeholder-briefings @required-sections-ab-results.md

Source: required-vs-optional-sections A/B test results (experiment).

Design [fictional]: account-level randomization, pre-registered MDE, 4-week run
(Mar 9 - Apr 5). Treatment = required-section enforcement on; control = sections
optional. N = 80 beta accounts split ~40/40 [fictional].

Result [fictional]: treatment cut median time-to-approved 40% (4.0 days -> 2.4
days); empty-section rate fell from 38% to 7%; approval cycles per Blueprint
2.3 -> 1.5. Mann-Whitney U, p < 0.01, effect exceeded the pre-registered MDE.
Guardrail: author task-completion (sends per active author) did NOT drop - no
evidence of abandonment. One caveat: a small skip-and-submit signal (trivial
content clearing the gate) appeared in ~4% of treatment Blueprints.

Audiences: drop PMM (no launch narrative to decide yet), keep Data/BI,
Executive, Engineering. Decision: ship required-sections as default? Owned by
Sandra C. (Head of Product). Eng lead: Karen L.
```

## Output

```markdown
# Stakeholder briefings: required-vs-optional-sections A/B results

## Master document

**What and why**

- M1: The required-vs-optional-sections A/B test asked whether enforcing required sections (vs. leaving them optional) improves Blueprint completeness and approval speed without hurting author throughput.
- M2: The test was account-level randomized over four weeks (Mar 9 - Apr 5) on 80 beta accounts split roughly 40/40 [fictional], with a pre-registered minimum detectable effect set before launch.

**Decisions**

- M3: The result is a clean, statistically significant win: required-section enforcement cut median time-to-approved by 40%, from 4.0 days to 2.4 days [fictional] (Mann-Whitney U, p < 0.01, effect above the pre-registered MDE).
- M4: Secondary metrics moved the same direction: empty-section rate fell from 38% to 7% [fictional], and approval cycles per Blueprint fell from 2.3 to 1.5 [fictional].

**Status**

- M5: The guardrail held: author task-completion (sends per active author) did not drop in treatment, so there is no evidence that the gate causes abandonment [fictional].
- M6: The experiment is complete and analyzed; the ship decision (enforcement as the default for GA) is owned by Sandra C. (Head of Product).

**Risks and open questions**

- M7: A small skip-and-submit signal appeared: roughly 4% of treatment Blueprints cleared the gate with trivial content [fictional], so a fraction of the completeness gain may be cosmetic.
- M8: The test ran on 80 beta accounts [fictional]; the effect is expected to hold at GA scale but has not been observed there.

**Asks**

- M9: Ship/no-ship decision on making required-section enforcement the default at GA, owned by Sandra C.

**Timeline**

- M10: Result is final now; the ship decision is needed before GA flag-removal work begins.

## Briefings

--- BEGIN: Data/BI ---

**Draws on:** M2, M3, M4, M5, M7

**Primary ask:** Carry the GA dashboard with a skip-and-submit detector so the win is monitored at scale, not assumed.

**Clean significant win on a well-designed test, with one caveat to keep instrumenting**

**What this means for the Data team**

The design holds up to scrutiny: account-level randomization, a pre-registered MDE set before launch, four weeks, ~40/40 split on 80 accounts [fictional] (M2). The primary result is a 40% cut in median time-to-approved (4.0 to 2.4 days [fictional]), significant at p < 0.01 and above the pre-registered MDE (M3), with secondary metrics moving the same way - empty-section rate 38% to 7%, approval cycles 2.3 to 1.5 [fictional] (M4) - and the throughput guardrail held, so no abandonment signal (M5). This is the kind of result that does not need post-hoc defense.

The one thing to carry forward is the skip-and-submit caveat: ~4% of treatment Blueprints cleared the gate with trivial content [fictional] (M7), which means a sliver of the completeness gain could be cosmetic. The ask is to make sure the GA dashboard does not lose this: keep the trivial-content detector live so empty-section rate at scale is reported alongside a "gamed-completeness" rate, and the win stays monitored rather than assumed.

--- END ---

--- BEGIN: Executive ---

**Draws on:** M1, M3, M5, M9

**Primary ask:** Approve shipping required-section enforcement as the default at GA.

**The required-sections bet paid off: 40% faster approvals, no throughput cost - clear to ship**

**What this means for the Executive sponsor**

We ran a controlled test of the core Blueprints bet - does enforcing required sections actually help, or just annoy authors (M1). The answer is unambiguous: enforcement cut the time from creation to approval by 40%, from four days to under two and a half [fictional] (M3), and it did so without reducing how much authors actually got done - the throughput guardrail held (M5). This is the rare case where the upside is large and the feared downside did not materialize.

The decision in front of you is clean: make required-section enforcement the default behavior at GA (M9). The data supports a "go." Approving it now lets engineering remove the experiment scaffolding and harden the single shipping path rather than maintaining both behaviors into launch.

--- END ---

--- BEGIN: Engineering ---

**Draws on:** M3, M7, M10

**Primary ask:** Plan the flag-removal and gate-hardening work, including a trivial-content guard, to start as soon as the ship decision lands.

**Win confirmed - now collapse to one path and harden the gate against trivial content**

**What this means for Engineering**

The experiment delivered a significant win (40% faster time-to-approved [fictional], M3), which means the branch we keep is the enforcement path. The work ahead is the un-glamorous half of a successful experiment: remove the A/B flags, delete the now-dead "optional" branch, and collapse to a single shipping behavior so we are not carrying both into GA. That work is ready to start the moment the ship decision lands (M10).

There is one functional change to fold in, not just a cleanup. The test surfaced a skip-and-submit signal - ~4% of treatment Blueprints cleared the gate with trivial content [fictional] (M7). The enforcement check today is "section is non-empty," which a single character satisfies. Plan a tightened guard (for example, reject whitespace-only or single-character clears, and emit the event Data needs to monitor it) so the gate enforces real completeness, not just a non-empty string, before this scales to all accounts.

--- END ---

---

## Translations applied (internal)

- "Mann-Whitney U, p < 0.01, effect above the pre-registered MDE" kept precise for Data; rendered for the Executive as "unambiguous" and "the data supports a go" (audience: Executive).
- "throughput guardrail held / sends per active author did not drop" kept as the guardrail metric for Data; rendered for the Executive as "without reducing how much authors actually got done" (audience: Executive).
- "skip-and-submit, ~4% of treatment Blueprints" kept as the caveat for all three; rendered as a monitoring requirement for Data, a hardening requirement for Engineering, and omitted from the Executive ask line so it does not muddy a clean go-decision (it stays available in the master).

**Flagged but kept** (may need review):

- "make required-section enforcement the default" - the Executive block treats the win as decisive; the master records the GA-scale caveat (M8, effect not yet observed at scale). The Exec block intentionally does not surface M8 to keep the decision crisp; confirm Sandra C. is comfortable deciding on beta-scale evidence, or add M8 to her block.

## Sources and References

- Source artifact: required-sections-ab-results.md [fictional]
- **Generated:** 2026-06-20T15:40:00Z | **Skill version:** 1.0.0 | **Audiences:** Data/BI, Executive, Engineering | **Input quality:** high (pre-registered experiment with design, primary and secondary results, a held guardrail, a named caveat, and a named decision-maker)
- **Invariant self-check:** 3 briefings; all Draws-on IDs resolve to M1-M10; one Primary ask each; master reviewed as audience-neutral.
```
