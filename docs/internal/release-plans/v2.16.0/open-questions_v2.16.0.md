# v2.16.0 Open Questions for Maintainer Review

**Status:** Awaiting maintainer review
**Created:** 2026-05-16
**Owner:** Maintainer (decides) + Claude (recommended)
**Convention:** Each question follows the Decision Brief pattern from `feedback_decision-brief-pattern.md`: context, why it matters, desired outcomes, potential solutions with outcomes, recommendation, and maintainer feedback slot.

---

## Summary Table

| # | Topic | Status | Recommendation | Maintainer Decision |
|---|---|---|---|---|
| Q1 | Slate cadence (one tag vs split) | **CONFIRMED 2026-05-16** | Ship all 4 in v2.16.0 (D3) | **Option A: one tag (confirmed)** |
| Q2 | Tier 2 deferrals to v2.17 | **CONFIRMED 2026-05-16** | Defer tags-as-feature, URL slug normalization, sync-agents-md rewrite (D17) | **Option A: defer all 3 (confirmed)** |
| Q3 | Chain depth enforcement strength | **CONFIRMED 2026-05-16** | Hard-fail Agent tool outside allowlist (D21) | **Option A: hard-fail with allowlist (confirmed after expanded walkthrough)** |
| Q4 | G2.5 commit gate addition | **CONFIRMED 2026-05-16** | Add as 6th gate; closes Codex R01 broken-tag class (D22) | **Option A: G2.5 as new gate (confirmed after end-user walkthrough)** |
| Q5 | `--skip-gates` removal | **CONFIRMED 2026-05-16** | Remove from v2.16; revisit in v2.17 (D24) | **Option A: no flag-based bypass (confirmed after scenarios walkthrough)** |
| Q6 | Chained handoff envelope format | **CONFIRMED 2026-05-16** | YAML Status block at end of auditor + curator output (D26) | **Option A: YAML in ## Status markdown section (confirmed)** |
| Q7 | Graceful degradation for non-Claude clients | **CONFIRMED 2026-05-16** | D-full with Phase 2 spike: dispatch skills for all 4 (revised through 4 iterations during walkthrough) | **Option D-full with Phase 2 spike (confirmed after extended walkthrough)** |

---

## Q1: Slate cadence (one tag vs split)

### Context

The original sub-agent strategy doc (2026-05-07) and implementation plan (2026-05-10) both recommended a 2-week observation gate between shipping `pm-critic` (v2.15.0 or v2.16.0) and shipping the utility trio `pm-release-conductor` + `pm-changelog-curator` + `pm-skill-auditor` (v2.15.1 or v2.16.1). The rationale: observe pm-critic's signal-to-noise ratio against real PM artifacts before committing 3 more sub-agents to the slate.

The current v2.16.0 master plan (D3) collapses both into a single tag, replacing the 2-week between-release observation with an in-cycle observation gate at subagent Phase 2 Task 9.

### Why it matters

Sub-agent proliferation is the #1 warned-against failure mode across all three planning sources (strategy, implementation, roadmap). Shipping 4 sub-agents in one release is exactly what those warnings target. If pm-critic surfaces design problems (e.g., proactive trigger noise, false-positive findings, system prompt drift), the other 3 sub-agents may inherit the same issues and ship with them baked in.

The trade-off is release coherence vs observation depth. A single tag gives a stronger release narrative ("first sub-agent slate") but compresses the feedback loop on pm-critic. A split gives more observation time but two smaller releases.

### Desired outcomes

- Pm-critic is exercised against real-world artifacts before the utility trio's system prompts are finalized
- Sub-agent proliferation risk is mitigated
- Release narrative is defensible (not "another assorted release")
- Maintainer time-to-ship is reasonable (avoids dragging the cycle for 3-4 extra weeks)
- The chain composition (conductor -> auditor + curator) gets validated as a whole, not incrementally

### Potential solutions

**Option A: One tag (current D3 ratification).** Ship all 4 in v2.16.0. In-cycle observation gate at subagent Phase 2 Task 9 between pm-critic ship and trio authoring.
- Outcome: Faster total ship time (1 cycle vs 2). Stronger narrative. In-cycle gate exists but is compressed (hours, not weeks). Slate-level risk if pm-critic's pattern is wrong.
- Estimated effort: 13-20 sessions total.

**Option B: Split into v2.16.0 (pm-critic only) + v2.16.1 (utility trio).** Original strategy doc recommendation. Maintains 2-week observation between releases.
- Outcome: Slower total ship time (2 cycles, ~6 weeks elapsed minimum). Maintains the proliferation discipline. Two smaller release narratives ("first sub-agent" then "release-cycle slate"). Lower per-cycle risk.
- Estimated effort: 8-12 sessions for v2.16.0; 6-10 sessions for v2.16.1.

**Option C: Hybrid (v2.16.0 = pm-critic + pm-skill-auditor; v2.16.1 = pm-changelog-curator + pm-release-conductor).** Auditor ships with critic because they share a similar audience (user + maintainer) and zero chain composition. Conductor + curator ship together because the conductor chains to the curator at G2.
- Outcome: Middle ground. Captures release coherence for the user-facing reviewer pair. Holds the maintainer-facing chain-composing pair for a second cycle where conductor + curator can be designed against observed auditor patterns.
- Estimated effort: 9-13 sessions for v2.16.0; 4-7 sessions for v2.16.1.

### Recommendation

**Option A (one tag, current D3).** The in-cycle observation gate is sufficient for the v2.16 scope. Three reasons:

1. The strategy doc's 2-week gate was sized for cross-release feedback (PMs use pm-critic in real work; reports come back; trio authoring incorporates). The same feedback can happen inside one cycle if Phase 2 Task 9 deliberately exercises pm-critic against >= 3 real artifacts and the gate is honored (amend before Phase 3 if signal is bad).
2. The 4 sub-agents are NOT independent. The conductor chains to the auditor + curator. Designing them as a coherent set lets the chain composition be validated end-to-end during the cycle. A split releases the chained-children before the parent exists.
3. Release narrative matters for adoption. "First sub-agent slate" is more defensible than two smaller releases each shipping one or two.

Mitigation: if pm-critic Phase 2 Task 9 surfaces design issues, the integration plan explicitly allows amending the trio's specs before authoring. The gate is real, not theatrical.

### Maintainer feedback / decision

**CONFIRMED 2026-05-16: Option A (one tag).** All 4 sub-agents ship in v2.16.0 together. D3 stands. In-cycle observation gate at subagent integration plan Phase 2 Task 9 is the safety mechanism (exercise pm-critic against >=3 real artifacts; amend trio specs before Phase 3 authoring if signal is poor).

---

## Q2: Tier 2 deferrals to v2.17

### Context

The v2.16.0 stub (pre-promotion) listed several "Tier 2 deferrals" carried from v2.14.x: tags-as-feature (DI1), URL slug normalization (DI2), sync-agents-md.yml full rewrite (DI4). The current master plan (D17) defers all three to v2.17.0 to keep v2.16 scope manageable.

Other potential v2.17 candidates surfaced in the 2026-05-14 roadmap: AI-Native PM Pack (4 skills), content gaps (4 skills), pm-workflow-orchestrator sub-agent, marketplace follow-through, skill proposal funnel.

### Why it matters

v2.16 already runs 5 sub-plans (subagents, docs, CI, doc-stack, hygiene) with 66 tasks and 13-20 estimated sessions. Adding any of the Tier 2 items extends the cycle. Conversely, deferring them means more v2.17 scope to absorb.

The maintainer's preference shapes whether v2.16 ships in ~3 weeks or ~5 weeks of elapsed time.

### Desired outcomes

- v2.16 cycle stays manageable (single coherent ship)
- v2.17 has clear scope when it begins
- No carried items rot indefinitely (each Tier 2 item has a target release)
- Items with strong dependency relationships ship together
- Maintainer doesn't feel obligated to overcommit

### Potential solutions

**Option A: D17 as ratified (defer all 3 Tier 2 items to v2.17).** Plus the roadmap's other v2.17 candidates.
- Outcome: v2.16 stays focused on sub-agents + Astro 6 + hygiene. v2.17 inherits 3 doc-stack hygiene items + AI-Native Pack + content gaps + workflow orchestrator. v2.17 becomes large but the focus is clearly "AI-Native + workflow orchestration."

**Option B: Pull one Tier 2 item into v2.16.** Most candidate: tags-as-feature (DI1) since taxonomy decisions intersect with the new sub-agent + agent-skill categories.
- Outcome: Slightly larger v2.16 (+1-2 sessions). v2.17 has cleaner scope. Risk: scope creep precedent.

**Option C: Pull all 3 Tier 2 items into v2.16.** Original v2.16 stub was framed around these items.
- Outcome: v2.16 becomes "Active Orchestration + Doc-Stack Modernization + Doc-Stack Feature Completion." Adds 3-5 sessions. Risk: scope creep.

### Recommendation

**Option A (defer all 3 per D17).** Two reasons:

1. tags-as-feature, URL slug normalization, and sync-agents-md rewrite are all FEATURE work, not infrastructure debt. They can wait without blocking anything.
2. v2.16 already has the doc-stack track via Astro 6 upgrade. Pulling additional doc-stack items risks confusing the release narrative ("partial doc-stack feature work").

Mitigation: v2.17 stub at end of v2.16 cycle captures these items with explicit priority labels so they don't rot.

### Maintainer feedback / decision

**CONFIRMED 2026-05-16: Option A (defer all 3).** D17 stands. tags-as-feature, URL slug normalization, and sync-agents-md.yml rewrite all stay deferred to v2.17. v2.16 focuses on subagents + Astro 6 + hygiene.

---

## Q3: Chain depth enforcement strength

### Context

D14 in the master plan + D21 (added from Codex review R03) define chain depth limit at 2 levels: pm-release-conductor invokes pm-skill-auditor (G0) and pm-changelog-curator (G2); neither child chains further. The original ci-plan Phase 2 Task 2 had this as "informational; not failure" - a warning if a sub-agent had `Agent` in its tools. Codex flagged this as a P1 (R03): the CI claimed enforcing, but the validator only warned.

The current fix (D21) hard-fails any agent that has `Agent` in `tools:` AND is not in `subagents/_chain-permitted.yaml` (which contains only `pm-release-conductor` in v2.16).

### Why it matters

Chain depth violations have two real costs:

1. **Token budget compound.** Pattern 6 chains run in fresh contexts; each level multiplies cost. A 4-level chain (parent -> child -> grandchild -> great-grandchild) is unmanageable for both cost and debuggability per Insight 9 from the strategy doc.
2. **Cascade failure surface.** A failed chain depth-3 invocation propagates up through 2 parents. Debugging becomes a multi-context exercise.

Conversely, a hard-fail is restrictive. If a legitimate use case emerges in v2.17+ (e.g., pm-workflow-orchestrator chains to pm-critic which chains to a hypothetical pm-cite-checker), the allowlist needs to be updated by hand.

### Desired outcomes

- Chain depth limit is structurally enforceable (CI catches violations)
- Legitimate v2.17+ chain composition can be allowed via explicit allowlist update
- No accidental cascades from utility agents gaining Agent tool
- Hard-fail behavior is documented so contributors aren't surprised

### Potential solutions

**Option A: D21 as ratified (hard-fail with allowlist).** `Agent` tool in `tools:` is a CI failure unless the agent is in `subagents/_chain-permitted.yaml`.
- Outcome: Structurally enforced. Allowlist update requires a deliberate PR. Contributors authoring new chain-capable sub-agents update the allowlist.

**Option B: Warning only.** Original "informational; not failure" framing. CI warns but doesn't block.
- Outcome: Looser enforcement. Risk that warnings become invisible (warnings tend to). Codex's R03 critique was that this contradicted CI3's "enforcing from day one" rule.

**Option C: Hard-fail without allowlist; permit chain only via dedicated `chains:` field in frontmatter.** Different mechanism: every chaining sub-agent declares its chain targets explicitly.
- Outcome: Most explicit. Highest authorship cost. May be premature for v2.16's 1 chaining agent.

### Expanded breakdown (added during 2026-05-16 walkthrough)

**How chain composition actually works in v2.16.** Only `pm-release-conductor` has the `Agent` tool. It chains to `pm-skill-auditor` (at G0) and `pm-changelog-curator` (at G2). That's a 2-level chain. The children must NOT have `Agent` in their tools, or it becomes a 3-level chain (violates D14, compounds token cost, harder to debug).

**The risk we're guarding against:** in v2.17+, a contributor accidentally adds `Agent` to pm-skill-auditor's tools (maybe to chain to a new validator agent). Now `pm-release-conductor -> pm-skill-auditor -> ??? = 3 levels`. The depth limit is violated silently.

**Option A: Hard-fail with allowlist (chosen)**

How it works:
- One file: `subagents/_chain-permitted.yaml` containing the list of agents allowed to have `Agent` in tools
- v2.16 contents: just `pm-release-conductor`
- CI script: for every `subagents/*.md`, if `Agent` is in tools AND name not in allowlist, build fails

Day-to-day:
- Author a new non-chaining agent (most agents): zero impact
- Accidentally add `Agent` to wrong agent's tools: CI fails immediately with clear message
- Intentionally add a new chaining agent in v2.17: edit one line of YAML to add the name

Real v2.17 example: pm-workflow-orchestrator chains to pm-critic. Steps:
1. Author `subagents/pm-workflow-orchestrator.md` with `tools: Read, Write, Agent`
2. Edit `subagents/_chain-permitted.yaml` to add one line: `- pm-workflow-orchestrator`
3. Done. PR review notices the allowlist change as a "security-relevant change requiring review" (D21 wording).

**Option B: Warning only**

How it works:
- CI script warns when an agent has `Agent` in tools
- Build still passes regardless

Day-to-day:
- Same authoring experience as Option A but no allowlist file
- Accidentally add `Agent` to wrong agent: yellow warning in CI logs, PR can still merge
- New chaining agent in v2.17: zero CI ceremony

The real risk: warnings are famously ignored. If pm-skill-auditor gets `Agent` accidentally (e.g., from a code review where the reviewer doesn't notice), nothing blocks it from landing on main. By v2.18 you might have unintended 3-level chains and not realize until someone hits the token budget ceiling.

**Option C: Hard-fail + dedicated `chains:` frontmatter field**

How it works: every chain-capable agent declares its chain targets in its own frontmatter:

```yaml
---
name: pm-release-conductor
tools: Bash, Read, Edit, Grep, Glob, Agent
chains:
  - pm-skill-auditor
  - pm-changelog-curator
---
```

CI validates: (a) `Agent` in tools requires `chains:` field present; (b) chain targets exist as agent files; (c) targets do NOT themselves have `Agent` in tools (CI walks the graph)

Day-to-day:
- Authoring a chaining agent: write the `chains:` field listing targets
- Authoring a non-chaining agent: no `chains:` field needed
- CI mechanically enforces 2-level limit by walking the graph
- No central allowlist file; the constraint lives in each agent's own file

Why this is more powerful but probably overkill for v2.16:
- The agent file is self-documenting (you read pm-release-conductor.md and see exactly what it chains to)
- Recursive depth violations caught automatically
- But: introduces a new frontmatter field convention; only 1 agent in v2.16 would use it

**Concrete cost comparison:**

| Option | New files | Author cost (per new agent) | Enforcement strength |
|---|---|---|---|
| A | 1 (allowlist) | 0 for non-chaining; 1 line YAML edit for chaining | HARD FAIL |
| B | 0 | 0 | WARN ONLY |
| C | 0 | 0 for non-chaining; 1 frontmatter field for chaining | HARD FAIL + recursive check |

### Recommendation

**Option A (hard-fail with allowlist per D21).** The allowlist is a single 4-line YAML file with one entry. Updating it for a new chain-capable agent is trivial. The structural enforcement matches the strength CI3 promised. Option B leaves a real hole - the cost of structural enforcement is so low that warning-only doesn't make sense. Option C is over-engineering for one chaining agent.

If Option C becomes appealing in v2.17 (3+ chain-capable agents), promote the allowlist file to a `chains:` frontmatter field. v2.16 doesn't need that complexity.

### Maintainer feedback / decision

**CONFIRMED 2026-05-16 (after expanded walkthrough): Option A (hard-fail with allowlist).** D21 stands. `subagents/_chain-permitted.yaml` ships in subagents Phase 1 Task 1 containing one entry (`pm-release-conductor`). CI plan Task 2 hard-fails any agent with `Agent` in tools and name not in allowlist.

---

## Q4: G2.5 commit gate addition (Codex R01)

### Context

Codex review R01 (P0): the original 5-gate release flow had a critical gap. G2 edited release-prep files (plugin.json, marketplace manifest, CHANGELOG, docs mirror, README, release plan status, release notes) WITHOUT committing them. G3 then tagged "HEAD of the release branch." If the edits weren't committed, the tag would point at a commit that did NOT contain the release metadata - producing a broken tag.

D22 added G2.5 between G2 and G3 to commit the release-prep edits, verify clean working tree, re-run G0 sub-checks against the new HEAD, and push to trigger CI before G3 tags the new commit.

### Why it matters

Broken release tags are a class of bug that's hard to recover from. The release artifact is on a commit that doesn't match the declared version. Users installing from the tag get inconsistent state. Even fast-following with a v{patch} doesn't fully recover (the bad tag still exists in history).

The fix (G2.5) is structural: the conductor refuses to advance to G3 unless the working tree is clean AND CI is green on the new commit. This makes the broken-tag class of bug impossible.

The cost: one additional gate (6 vs 5), one additional confirmation pause, slightly longer release flow.

### Desired outcomes

- Broken release tags structurally impossible
- Maintainer has confidence the tag points at intended state
- Gate flow remains tractable (not a 10-step procedure)
- The chain to pm-skill-auditor at G2.5 doesn't double the audit cost beyond reasonable

### Potential solutions

**Option A: D22 as ratified (G2.5 as new 6th gate).** Conductor pauses at G2.5 for commit + re-verify before G3.
- Outcome: Structural fix. 6 gates total. Re-running G0 sub-checks at G2.5 doubles the auditor invocation cost on each release. Acceptable trade.

**Option B: Fold G2.5 into G2.** G2 commits as a final sub-check after editing. No separate gate.
- Outcome: Same protection, less ceremony. Risk: G2 sub-checks become long (8+ items) and maintainer fatigue increases. Less explicit pause point.

**Option C: No commit gate; rely on maintainer discipline.** Document the commit step in the runbook; trust maintainer to commit before G3.
- Outcome: Original behavior. Codex R01 risk persists. Not recommended.

### Expanded breakdown (added during 2026-05-16 walkthrough)

**End-user impact of NOT having this gate (Option C scenario):**

Concrete failure walkthrough:
1. Maintainer types `/pm-release v2.16.0`
2. Conductor walks G0-G2. G2 edits `plugin.json` (2.15.0 -> 2.16.0), CHANGELOG, etc. All in working tree, NOT committed.
3. Maintainer says "yes proceed" at G2 prompt.
4. G3 runs `git tag -a v2.16.0 -m "..." HEAD`. HEAD is still the pre-G2 commit.
5. Tag pushed to origin. CI runs on the tagged commit. **plugin.json still says 2.15.0.**
6. Astro deploy publishes docs site referencing v2.16.0 URL but rendering v2.15.0 content.
7. Community installs the plugin from the v2.16.0 tag. They get version 2.15.0 in manifest. The 4 new sub-agents (in uncommitted files) are missing.
8. `/pm-critic` doesn't exist. CHANGELOG entry missing. **Release is broken downstream.**

The tag is on git history forever. Recovery: tag deletion (destructive, controversial) or fast-follow v2.16.1.

**Maintainer experience flow comparison:**

Option A (G2.5 explicit):
```
[G0 audit] -> [G1 review confirmed] -> [G2 edits applied]
[G2.5: commit edits -> verify clean -> re-run audit -> push -> wait CI green -> capture SHA]
[G3 tag the captured SHA] -> [G4 post-tag]
Total: 6 gate prompts. Explicit "we committed at G2.5" audit trail.
```

Option B (folded into G2):
```
[G0 audit] -> [G1 review confirmed]
[G2 sub-checks 1-6: file edits; sub-checks 7-10: commit, verify, audit, push]
[G3 tag the captured SHA] -> [G4 post-tag]
Total: 5 gate prompts. G2 has 10 sub-checks. Less explicit pause.
```

Option C (no gate):
```
[G0 audit] -> [G1 review confirmed] -> [G2 edits applied but NOT committed]
[G3 tag HEAD = pre-G2 commit; BROKEN RELEASE] -> [G4 post-tag reminders fire on broken tag]
Total: 5 gate prompts but real downstream risk.
```

**End-user-facing impact comparison:**

| Aspect | Option A | Option B | Option C |
|---|---|---|---|
| End user installs broken release? | NO | NO | YES |
| Maintainer confirmation prompts | 6 | 5 | 5 |
| Release flow elapsed time | ~30-40 min | ~30-40 min | ~25-30 min |
| Incident response if bug surfaces | Doesn't happen | Doesn't happen | Tag deletion or fast-follow patch |
| Audit trail clarity | "We committed at G2.5" explicit | "Sub-check 7 committed" buried | "Hope we remembered" |

### Recommendation

**Option A (G2.5 as new gate per D22).** Two reasons after the end-user walkthrough:

1. **Explicit pause has signal value during high-stakes operations.** Releases are rare. The maintainer is making consequential decisions at every gate. A separate G2.5 pause forces deliberate review of "yes, the edits are now committed" before advancing. With Option B, this is buried inside G2 sub-checks 7-10, easier to skim through.

2. **Audit trail for future incident response.** If a future release goes wrong, forensic review benefits from clear gate boundaries. "We failed at G2.5" is a more actionable failure signal than "we failed somewhere in G2's 10 sub-checks."

The cost is one additional gate prompt. The end-user protection is identical to Option B but the maintainer ergonomics are slightly more deliberate.

The doubled auditor cost at G2.5 is real but the chain composition runs in fresh contexts. Token budget impact is bounded by the auditor's `--scope changed` argument, which limits to v{previous}..HEAD diff.

### Maintainer feedback / decision

**CONFIRMED 2026-05-16 (after end-user walkthrough): Option A (G2.5 as new gate).** D22 stands. spec_pm-release-conductor.md ships with 6 gates (G0, G1, G2, G2.5, G3, G4). G2.5 sub-checks: commit, verify clean tree, re-run G0 audit chain, push, wait for CI green, capture target SHA. G3 refuses to tag any SHA other than the one G2.5 captured.

---

## Q5: `--skip-gates` removal (Codex R05)

### Context

The original pm-release-conductor spec proposed `--skip-gates <list>` as an "advanced; explicit gate skip with documentation requirement; logs a warning" argument. Codex R05 flagged this (P1): it contradicted the conductor's no-bypass safety contract documented in the same spec.

D24 removed `--skip-gates` from v2.16. Maintainers who need to bypass a gate (e.g., G1 for a hotfix patch) must run that gate's verification manually and confirm at the gate prompt. The argument may be reintroduced in v2.17+ restricted to non-release dry-run mode.

### Why it matters

Release-time bypass mechanisms tend to weaponize themselves. The "advanced; with warning logs" framing is exactly what a stressed maintainer at 11 PM ignores. The conductor's value is its no-bypass property; an escape hatch undermines that property.

Conversely, real hotfix scenarios sometimes need bypass. If a critical security patch must ship in 30 minutes and G1 (Phase 0 adversarial review) takes 2 hours, the maintainer needs an option.

### Desired outcomes

- Conductor's no-bypass safety contract is enforced
- Real hotfix scenarios are not blocked by ceremony
- Bypass paths, if any, require explicit deliberate action (not a flag)
- v2.17+ has clear scope for restricted bypass if real demand emerges

### Potential solutions

**Option A: D24 as ratified (remove --skip-gates from v2.16).** Maintainer who needs to bypass G1 for a hotfix runs Phase 0 review by hand or explicitly skips it via manual confirmation at the gate prompt with a documented rationale captured in the release log.
- Outcome: Cleanest contract. Real bypass possible but requires deliberate action. Documented rationale forces maintainer to articulate why.

**Option B: Keep --skip-gates restricted to specific gates.** E.g., `--skip-gates G4` is allowed (post-tag hygiene reminders); `--skip-gates G0` is forbidden. Allowlist of skippable gates.
- Outcome: Middle ground. Some flexibility. Risk: which gates are skippable becomes a design question.

**Option C: Keep --skip-gates with stronger warning.** "Type 'I-UNDERSTAND-THE-RISKS' to confirm" before bypass. Audit log appended on every use.
- Outcome: Friction is the protection. Better than warning logs but still an escape hatch.

### Expanded breakdown (added during 2026-05-16 walkthrough)

**Real-world scenarios where no-bypass might bite, evaluated against pm-skills history:**

1. **CVE-driven emergency security patch.** Frequency in pm-skills history: zero. No CVE-driven emergency releases in 17+ tagged releases. Standard flow (30-45 min) is fast enough.

2. **External dependency vulnerability requiring immediate patch.** Frequency: pm-skills has shipped multiple Dependabot-driven Astro patch versions in 2026-05. All flowed through standard process without gate bypass.

3. **Doc fix urgent for misleading customer-facing SKILL.md.** Frequency: rare; 30-60 min through standard process achievable. Conductor flow optimizes for this.

4. **CI infrastructure broken; can't run audit chain.** Frequency: hasn't happened. Resolution: fix validator first, OR manually confirm G0 with rationale.

5. **Hotfix v{patch} after recent v{minor}.** Frequency: v2.14.0, v2.14.1, v2.14.2 all same day. G1 confirmed by reference to prior review. Standard confirmation, not bypass.

6. **Truly novel emergency.** Resolution: manual confirmation at gate prompt with rationale.

**Key insight: "no bypass" is not actually "no bypass."** The conductor IS bypassable at the gate prompts via manual confirmation with rationale:

Standard flow:
```
Conductor: G1 sub-check 1: Phase 0 review complete?
Maintainer: yes, completed and documented at _NOTES/v2.16.0-review/
Conductor: G1 PASS. Proceed to G2?
```

Emergency-style manual bypass (already in D24 scope):
```
Conductor: G1 sub-check 1: Phase 0 review complete?
Maintainer: no, deferred due to emergency hotfix scope.
Conductor: G1 sub-check 1 NOT COMPLETE. Proceed anyway (require rationale)?
Maintainer: yes, rationale: security patch for CVE-XXXX-YYYY; audit deferred to v2.16.2.
Conductor: G1 manually bypassed; rationale logged. Proceed to G2?
```

Flag-based vs manual-confirmation comparison:

| Property | Flag-based bypass | Manual confirmation path |
|---|---|---|
| Bypass capability | Yes (any allowed gate) | Yes (any gate with rationale) |
| Friction level | One keystroke | Type WHY |
| Audit log clarity | "--skip-gates G1" appears each time | "Manually confirmed with rationale X" |
| Normalization risk | High (each use makes next easier) | Low (rationale forces deliberation) |
| Trust in release process | Erodes over time | Maintained |

**End-user trust comparison:**

| Property | No bypass (D24) | Restricted bypass | Friction bypass |
|---|---|---|---|
| End-user audit guarantee | Strong: every release explicit gate path | Medium: some gates flagged-skipped | Strong if friction holds; weakens over time |
| Normalization risk | Lowest | Medium | Medium-low |
| Recovery from real emergency | Manual confirmation | Restricted flag | Friction flag |
| Audit log clarity | "Manual confirmation" | "Skipped per allowlist" | "Skipped with friction" |

### Recommendation

**Option A (remove per D24).** Three reasons after the scenarios walkthrough:

1. **pm-skills has zero historical emergency releases.** The hypothetical CVE scenario isn't a real failure mode in this repo's history. Designing for it adds complexity for a phantom problem.

2. **The manual confirmation path provides identical bypass capability with better friction.** A real emergency maintainer can still advance any gate by confirming at the prompt with rationale. The flag adds convenience, not capability.

3. **The conductor's no-bypass property is its core value proposition.** Users trust that every release went through audit + Phase 0 review (or was deliberately bypassed with rationale). A `--skip-gates` flag normalizes bypass over time. The first use is "emergency"; the fifth is "habit."

If a real emergency scenario emerges in v2.17+ that the manual confirmation path can't handle, revisit with concrete evidence.

### Maintainer feedback / decision

**CONFIRMED 2026-05-16 (after real-world scenarios walkthrough): Option A (no flag-based bypass).** D24 stands. `--skip-gates` REMOVED from v2.16. Manual confirmation at gate prompt with documented rationale is the only bypass path. The conductor's no-bypass property is preserved.

---

## Q6: Chained handoff envelope format (Codex R08)

### Context

D26 (from Codex R08) requires pm-skill-auditor and pm-changelog-curator to end their output with a machine-readable Status block that pm-release-conductor parses. Format chosen: YAML inside a `## Status` markdown section.

```yaml
status: pass | fail | refused
p0_count: 0
...
```

### Why it matters

The conductor parses child output to make advancement decisions at gate boundaries. If the format is ambiguous, the conductor can misread a child refusal as success (specifically the case Codex flagged: empty findings could be interpreted as "passed clean" when the actual cause was "refused due to ambiguous repo state").

Format choice impacts parser robustness, authoring cost (children write the format), and human readability (maintainer still sees the output and benefits from clarity).

### Desired outcomes

- Conductor cannot misread refusal as success
- Format is deterministically parseable
- Children's output remains human-readable (maintainer reviews it too)
- Format conventions are established for future sub-agent chained children (v2.17+ orchestrator will chain to pm-critic; same envelope pattern applies)
- Format is consistent across all chained child sub-agents

### Potential solutions

**Option A: YAML block inside markdown (D26 as ratified).** `## Status` section with YAML body.
- Outcome: Human-readable + machine-parseable. YAML is forgiving; Claude can author it reliably. Conductor uses a simple YAML parser or regex.

**Option B: JSON block inside markdown.** Same pattern with `## Status` section containing JSON.
- Outcome: Stricter format, less forgiving. Easier for the conductor's parser (no YAML edge cases). Less human-readable.

**Option C: Markdown table at end of output.** `| field | value |` rows.
- Outcome: Maximally human-readable. Parsing is slightly harder (table parsing); fields must be in canonical order.

**Option D: Tool-output convention** (e.g., `<status>...</status>` XML-like tags). Used in some agent frameworks.
- Outcome: Distinctive; easy to grep. Less natural for markdown-first sub-agent output.

### Recommendation

**Option A (YAML per D26).** Three reasons:

1. YAML is forgiving for LLM authoring. Both auditor and curator are Claude-authored; YAML is one of the formats Claude reliably emits without escaping issues.
2. Human readers can scan a YAML block without parsing in their head. JSON's quoting and brackets are noisier.
3. The conductor's parser is straightforward: extract the YAML block (find `## Status` heading, take subsequent fenced YAML), pass to a YAML parser.

The trade-off is YAML's forgiveness has edge cases (boolean coercion, etc.). The shape Codex proposed is simple key:value scalars only, avoiding most edge cases.

### Maintainer feedback / decision

**CONFIRMED 2026-05-16: Option A (YAML in `## Status` markdown section).** D26 stands. Auditor and curator outputs end with `## Status` heading + fenced YAML containing key:value scalars (status, p0_count, refusal_reason, scope, etc.). Conductor parses the YAML block at G0 and G2 boundaries.

---

## Q7: Graceful degradation for non-Claude clients (NEW)

### Context

User raised the question: do we need to plan for graceful degradation of sub-agent functionality for non-Claude models to maintain compatibility? What does agentskills.io specs have to say?

**Findings from Context7 lookup on `/practicalswan/agent-skills`** (closest agentskills.io specification corpus):

1. **agentskills.io spec is skill-centric, not sub-agent-centric.** The cross-client portability story documents how to sync SKILL folders into per-client home directories (`.claude/skills/`, `.codex/skills/`, `.agents/skills/`). The spec does not define sub-agents as a portable concept.

2. **Sub-agents are a Claude Code plugin feature.** The closest cross-client analogue is per-client wrapper conventions (e.g., Gemini CLI uses `/commands reload`; Codex syncs to `$CODEX_HOME/skills/`). None of these provide native sub-agent equivalents.

3. **The pattern other repos use is "intent-layer parity"** (matches what the pm-skills strategy doc Section 3 + Insight 3 + D11 already proposed). Ship the Claude-native sub-agent for Claude Code users. Ship the same intent as a Codex prompt template / Gemini command / Copilot project instruction. Cross-client consumers get the same outcome via different mechanisms.

4. **There is no agentskills.io "graceful degradation" specification.** The spec governs what counts as portable; sub-agents aren't claimed to be portable in the first place. So there's nothing to degrade FROM in the spec sense.

### Why it matters

pm-skills' stated audience includes non-Claude-Code users (the marketplace submissions doc lists 15 channels, multiple for Cursor / Windsurf / Codex). If sub-agent functionality is invisible or broken on those clients, those users get a worse experience than current state.

Specifically:

- A Codex user who installs pm-skills v2.16 plugin sees `subagents/*.md` files but Codex doesn't load them as sub-agents. They become inert files in a directory.
- A Cursor or Windsurf user with AGENTS.md parsing may see the new "Sub-Agents" section. If their parser doesn't understand the component class, it may produce confusing UX.
- The slash commands (`/pm-critic`, `/pm-audit-repo`, `/pm-draft-changelog`, `/pm-release`) are Claude Code-specific. Codex commands look different.

The strategy doc's D11 (Codex parity via codex-rescue prompt templates) addresses #1 partially. Nothing explicit addresses #2 or #3.

### Desired outcomes

- Non-Claude users get a meaningful "this is Claude-Code-only" signal rather than confusion
- Codex users can invoke the intent via documented prompt templates (D11 path)
- AGENTS.md remains parseable by Cursor / Windsurf / similar tools without breaking
- The runtime-components.md catalog is honest about Claude Code specificity
- Future v2.17+ work has a clear pattern if more cross-client adapters are needed

### Potential solutions

**Option A: Intent-layer parity only (current D11 + spec doc state).** Every sub-agent ships with a documented codex:codex-rescue prompt template in its spec doc + in `docs/guides/adversarial-review.md` (for pm-critic) + in `docs/contributing/release-runbook.md` (for pm-release-conductor). No new artifacts.
- Outcome: Codex users have a documented path. Cursor / Windsurf / others rely on AGENTS.md being neutral (a "Sub-Agents" section listing Claude-Code components; they ignore it). Minimal additional effort.

**Option B: Option A + explicit "non-Claude clients" section in runtime-components.md.** Adds a `## Cross-Client Compatibility` section to runtime-components.md documenting: (a) which clients support sub-agents natively (Claude Code only as of v2.16); (b) the codex-rescue prompt template paths; (c) recommendations for Gemini / Cursor / Windsurf / Copilot users.
- Outcome: Explicit signal in the canonical catalog. Increased docs surface (~1 section).
- Estimated effort: +0.5 hours.

**Option C: Option B + AGENTS.md graceful-degradation notes.** Add a one-line "Sub-agents are Claude Code-specific; other clients see this as informational" tag to the AGENTS.md Sub-Agents section. Avoids parsing surprises for Cursor / Windsurf agents that may try to invoke listed components.
- Outcome: Friendlier signal across multiple consumer surfaces. Slight additional text.
- Estimated effort: +0.25 hours on top of Option B.

**Option D: Option C + per-agent skill wrappers for non-Claude clients.** Ship 4 stub skill files (e.g., `skills/utility-pm-critic-stub/SKILL.md`) that Codex / Gemini users can invoke as skills. The stub references the canonical sub-agent doc and contains the codex-rescue prompt template inline.
- Outcome: Maximum cross-client coverage. Codex users get a `pm-critic` skill they invoke directly without needing to know the codex-rescue indirection. Increased file count + ongoing maintenance burden.
- Estimated effort: +2-3 hours; recurring maintenance with every sub-agent change.

**Option E: Option C + skill wrappers BUT only for the maintainer-facing trio (pm-release-conductor, pm-changelog-curator, pm-skill-auditor).** Skip pm-critic since its proactive value is Claude-specific.
- Outcome: Targeted coverage for the highest-value non-Claude use cases (audit, CHANGELOG, release). Maintenance burden is 3 stubs not 4.
- Estimated effort: +1.5-2 hours; recurring maintenance.

### Expanded breakdown (added during 2026-05-16 walkthrough; this was the longest discussion of any open question)

The walkthrough went through 4 iterations as the maintainer surfaced flaws in successive recommendations. Each iteration is captured for the record because the framing evolution itself is instructive.

**Iteration 1: Initial Option C recommendation.** Intent-layer parity + runtime-components.md cross-client section + AGENTS.md graceful-degradation note. Assumed codex-rescue parity path was sufficient.

**Iteration 2: Maintainer pushback.** "Every skill or some agent cannot ship with codex:rescue requirement or stop gate. Users may not subscribe to codex at all, and they also likely do not have the plug-in installed that empowers the codex rescue review."

Realization: D11's "Codex parity via codex-rescue" assumes the user has Codex CLI AND the codex-rescue plugin. Neither is universal. Cursor, Windsurf, Copilot, Gemini CLI users have neither.

**Iteration 3: Revised to Option E (universal prompt templates).** Layer 1 (universal copy-paste prompt) + Layer 2 (Codex shortcut for users with codex-rescue) + Layer 3 (Claude Code native sub-agent). Codex-rescue demoted to "one shortcut, not the parity mechanism."

**Iteration 4: Maintainer pushback.** "I think the general assumption is they will use one or the other [tool], so the sub-agent functionality should not assume they are using both at the same time. codex rescue is 100% a secondary quality specific plug-in for using codex."

Realization: codex-rescue is a Claude-Code-side plugin that delegates to Codex. It requires BOTH tools. Single-tool users (the common case) don't have it. The framing of "Codex parity" was wrong on multiple levels.

**Iteration 5: Revised to Option F (clean Claude-Code-only labeling).** Drop cross-client parity claims. Sub-agents are Claude Code only. Skills remain portable. Honest scope statement.

**Iteration 6: Maintainer asked about runtime detection.** "Can you detect if the user is using Claude Code and then deliver a specific experience for that, and then do specifically tailored experiences for codex and Gemini?"

Realization: Yes, runtime detection IS possible at the AI-instruction level. A skill with conditional logic can dispatch based on the AI's runtime. This unlocks **Option D-revised** (dispatch skills for 3 simpler agents) and **Option D-full** (dispatch skills for all 4 including the conductor, with the conductor inlining auditor + curator behavior via "read and execute inline" pattern).

**Iteration 7: Maintainer asked why D-revised over D-full.** Honest answer: I was risk-averse about the conductor's chain composition complexity. D-full is doable via the "reference + execute inline" pattern but adds spike risk.

**Final decision: Option D-full with Phase 2 spike.** Ship dispatch skills for all 4 sub-agents, with the conductor's dispatch using "read and execute inline" pattern to inline the auditor + curator behaviors. Phase 2 spike validates the dispatch pattern with pm-critic; if reliable, ship the other 3; if not, fall back to Option F.

### How dispatch skills work (the mechanism)

The AI assistant reading a SKILL.md knows what client it's running in. A skill with conditional logic dispatches correctly:

```markdown
---
name: utility-pm-critic
description: Run adversarial review on a PM artifact
---

## Instructions

**If you are running in Claude Code with the pm-skills plugin:**
Invoke `@agent-pm-critic` on the target artifact. Pass the artifact path
as argument. Return the findings to the user.

**If you are running in any other client** (Codex CLI, Cursor, Windsurf,
Gemini CLI, Copilot, ChatGPT, etc.):
Read the canonical agent definition at `subagents/pm-critic.md`. Execute the
system prompt body in that file as your operating instructions for this
turn. Read the target artifact. Return findings graded P0/P1/P2/P3 with
concrete fix suggestions, formatted per the guide at
`docs/guides/adversarial-review.md`.
```

The AI reads this, identifies its runtime, takes the right path. No manual user action.

### What ships in v2.16 if D-full + spike succeeds

**4 new dispatch skills** (one per sub-agent):
- `skills/utility-pm-critic/SKILL.md` + references/ + samples
- `skills/utility-pm-skill-auditor/SKILL.md` + references/ + samples
- `skills/utility-pm-changelog-curator/SKILL.md` + references/ + samples
- `skills/utility-pm-release-conductor/SKILL.md` + references/ + samples (with "reference + execute inline" pattern for chain composition on non-Claude)

Each dispatch skill is thin (~50 lines). References the canonical `subagents/{name}.md` for the system prompt body (no duplication, no drift risk).

**Phase 2 spike protocol** (added to subagents-integration-plan.md):
1. Ship pm-critic dispatch skill alongside pm-critic agent
2. Test on Claude Code (verify @agent-pm-critic invocation works)
3. Test on Codex CLI or Cursor (verify "read subagents/pm-critic.md and execute" pattern works reliably)
4. If reliable, ship dispatch skills for pm-skill-auditor, pm-changelog-curator, pm-release-conductor in Phases 3-5
5. Sub-spike for conductor: test "reference + execute inline" pattern with pm-critic delegating to itself (simpler version of conductor's chain)
6. If conductor sub-spike fails: ship D-revised (3 dispatch skills; conductor stays Claude-only)
7. If pm-critic spike fails entirely: ship Option F (clean labeling only)

**Master plan amendments needed:**
- **D11 amendment**: Original "Codex-side parity via codex-rescue prompt templates" was based on flawed cross-tool assumption. AMEND to "Sub-agents are a Claude Code plugin feature. Non-Claude clients can access sub-agent functionality via dispatch skills (utility-pm-{role}) that detect runtime and dispatch appropriately. Dispatch skills ship per Phase 2 spike result."
- **D30 added** (new): "Single-tool user assumption: users pick one primary AI tool. pm-skills delivers the skill catalog to all clients via agentskills.io portability. Sub-agent functionality is delivered to Claude Code users natively and to other clients via dispatch skills that inline the agent system prompt."

**Effort estimate**: ~75 min if spike succeeds (4 dispatch skills + master plan amendments). Fallback to ~30 min Option F if spike fails. Phase 2 spike adds ~30 min to that phase.

### Recommendation

**Option D-full with Phase 2 spike (confirmed by maintainer).** This addresses the cross-client gap honestly:
- pm-skills' skill catalog remains fully portable across all clients (agentskills.io spec)
- Sub-agent functionality is additionally available to all clients via dispatch skills (runtime detection)
- The dispatch mechanism doesn't assume any specific tool plugin (no codex-rescue requirement)
- The Phase 2 spike is the gate that decides whether dispatch reliability is good enough; fallback paths exist if not

### Maintainer feedback / decision

**CONFIRMED 2026-05-16 (after 7-iteration walkthrough): Option D-full with Phase 2 spike.** Subagents Phase 2 ships pm-critic with a dispatch skill as a spike. If reliable on non-Claude clients, ship dispatch skills for the other 3 in Phases 3-5. If unreliable, fall back to Option F. D11 amended; D30 added to capture the single-tool user assumption + dispatch skill strategy.

---

## What happens after maintainer review

For each question, the maintainer fills in the feedback / decision slot. Disposition:

- **Confirm recommendation:** the ratified decision (D3, D17, D21, D22, D24, D26, or D-new for Q7) stays. No plan changes required.
- **Amend:** the relevant decision gets explicitly amended in `plan_v2.16.0.md` and propagated to affected sub-plans. The decision history is preserved (original + amendment).
- **Reject:** the original framing is wrong and needs re-design. Triggers a planning sub-cycle.

Open questions close when all 7 have a recorded maintainer decision. Q1-Q6 unblock execution; Q7 unblocks Option C docs-plan additions if chosen.

---

## Cross-References

- Master plan: [`plan_v2.16.0.md`](./plan_v2.16.0.md) (Ratified Decisions table D1-D29)
- Review findings: [`review-findings_v2.16.0.md`](./review-findings_v2.16.0.md) (self-review + Codex adversarial review catalog)
- Sub-plans: [`subagents-integration-plan.md`](./subagents-integration-plan.md), [`docs-plan.md`](./docs-plan.md), [`ci-plan.md`](./ci-plan.md), [`doc-stack-modernization-plan.md`](./doc-stack-modernization-plan.md), [`repo-hygiene-plan.md`](./repo-hygiene-plan.md)
- Decision Brief pattern: `feedback_decision-brief-pattern.md` (in memory)
- Strategy doc (sub-agent design source): [`../../_working/subagents/subagent-strategy_2026-05-07.md`](../../_working/subagents/subagent-strategy_2026-05-07.md)
- agentskills.io findings source: Context7 query on `/practicalswan/agent-skills` (2026-05-16); skill-centric spec; sub-agents not part of portable contract
