# [F-39] find-skills Empirical Discoverability Test

Status: Backlog
Milestone: v2.12.0 (candidate)
Issue: TBD
Agent: Claude Opus 4.7 (with human verification of agent outputs)

## Scope

Run a controlled test of how often pm-skills surfaces when end users ask a skills-loaded agent for help with common PM tasks. The agent of record is one with the `find-skills` skill active (which is the default-installed meta-skill for most skills CLI users). Output: a baseline report of which pm-skills surface, for which queries, at which ranking position, against which competing skills.

Surfaced during 2026-04-23 skills.sh investigation which discovered:
- pm-skills is already on skills.sh with 1.2K installs (documented in `docs/internal/distribution/skills-sh/current-status_2026-04-23.md`)
- `find-skills` (the meta-skill recommending other skills to agents) is the critical path between user intent and skill install
- find-skills has specific trust thresholds and hardcoded category keywords, none of which include Product Management
- pm-skills' SKILL.md descriptions have never been audited for query-intent keyword density

F-39 is the diagnostic effort. F-40 (skill description discoverability audit) is the remediation effort that follows.

## Problem

We do not know, empirically, whether pm-skills surfaces when PMs ask their agents for help. We have install counts (1.2K) that tell us someone has been installing us, but we do not know:

1. Which queries trigger pm-skills to appear in find-skills recommendations
2. Which queries should trigger pm-skills but don't
3. What pm-skills' ranking position is relative to competing skills for each query
4. Whether find-skills' hardcoded category list (no PM category) excludes us from entire classes of queries regardless of description quality

Without this data, any attempt to optimize pm-skills for discoverability (see F-40) is guessing at which descriptions need attention.

## Test design

### Inputs: query battery

A representative set of queries a PM might realistically type into their agent, organized by the skill domain they should trigger. Starting set (expand during test authoring):

**Discovery phase queries**:
- "find a skill for running user interviews"
- "help me synthesize user research"
- "how do I analyze competitors"
- "I need to write a stakeholder summary"

**Define phase queries**:
- "help me frame a problem statement"
- "write a jobs-to-be-done canvas"
- "find a skill for generating hypotheses"
- "create an opportunity solution tree"

**Develop phase queries**:
- "help me write an ADR"
- "create a solution brief"
- "document a technical spike"
- "explain my design decisions"

**Deliver phase queries**:
- "write a PRD for this feature"
- "draft user stories with acceptance criteria"
- "create a pre-launch checklist"
- "generate release notes"
- "document edge cases for this feature"

**Measure phase queries**:
- "design an A/B test"
- "write experiment results"
- "specify event tracking for this feature"
- "spec out a dashboard"

**Iterate phase queries**:
- "run a retrospective"
- "document a pivot decision"
- "capture refinement notes"
- "log lessons learned"

**Foundation queries**:
- "build a persona"
- "create a lean canvas"
- "write a meeting agenda"
- "prep for an important meeting"
- "summarize what happened in this meeting"
- "find patterns across multiple meetings"
- "draft a stakeholder update"

**Utility queries**:
- "create a mermaid diagram"
- "generate a presentation"
- "create a new pm skill"
- "validate my skill against conventions"
- "update pm-skills to the latest version"

**Near-miss queries** (should not surface pm-skills but instructive to confirm):
- "help me write a bash script" (should not recommend any pm-skill)
- "deploy a next.js app" (should not recommend; tests that find-skills is discriminating)

Total expected: roughly 40 to 45 queries.

### Environment

- Fresh project directory with no prior skill install state
- Install via `npx skills add vercel-labs/skills` to get `find-skills` (the target of our test)
- Also install reference competing skills if applicable (e.g., any popular generalist skill that might compete for the same intents)
- Do NOT install pm-skills locally for this test; we want to simulate the experience of a user who does not yet have pm-skills and is asking "is there a skill for X"

### Execution

For each query in the battery:

1. Open a fresh agent session
2. Type the query as a human would
3. Observe find-skills' recommendations
4. Record:
   - Did a pm-skills/* skill appear?
   - If yes, what rank?
   - Who was ranked above pm-skills if not #1?
   - What was the recommendation text?
   - Did find-skills mention the install command?

Repeat across at least 3 sessions to smooth out randomness if present.

### Output artifact

A markdown table per query, plus aggregate statistics:

- Total queries: N
- Queries where pm-skills surfaced in top 3: N (%)
- Queries where pm-skills surfaced at all: N (%)
- Queries where pm-skills should have surfaced but did not (failure cases): N
- Top competing skills observed: list
- Description gaps identified: list of skills that fail on their expected-match query

## Deliverables

- `docs/internal/efforts/F-39-find-skills-empirical-test/test-plan.md` (detailed methodology)
- `docs/internal/efforts/F-39-find-skills-empirical-test/query-battery.md` (full list of test queries, rationale for each)
- `docs/internal/efforts/F-39-find-skills-empirical-test/baseline-report_YYYY-MM-DD.md` (findings from baseline run)
- `docs/internal/efforts/F-39-find-skills-empirical-test/gap-analysis.md` (feeds directly into F-40 scope)
- `docs/internal/distribution/skills-sh/find-skills-test-log.md` (index of test runs for future re-runs)

## Validation

The test is successful if:

- Every pm-skills skill is tested against at least one query it should match
- Every finding is reproducible (same query yields same ranking at least 2 of 3 times)
- Gap-analysis output produces concrete, specific description-improvement recommendations (not vague ones)
- Post-F-40 re-run shows measurable lift

## Open Questions

- **Which agent environment to use as the reference**: Claude Code is our primary target but the skills CLI supports many agents. Initial decision: Claude Code as reference; note findings are Claude-specific and may not generalize to Cursor / Copilot / Cline behavior.
- **How to control for find-skills internal randomness**: is the skill deterministic given the same query? Probably not (LLM-based). Proposal: run each query 3 times and report ranking-set rather than a single rank number.
- **What about installs as an influence on ranking?** find-skills ranks by install count. If an underinstalled pm-skills skill gets 0 recommendations today, the fix is both description improvement AND install growth. Record both as covariates.
- **Should we also test `npx skills find [keyword]` directly?** Yes, in addition to find-skills-mediated queries. Tests the underlying search layer separately from the agent's natural-language parsing.
- **How to handle queries where pm-skills has no relevant skill?** Record as "no match expected" outcomes; confirm find-skills does not spuriously recommend pm-skills content for off-topic queries.

## Dependencies

- None strictly blocking
- Benefits from having `find-skills` installed in a reference test environment; not something we need to build
- Complements (does not replace) install-count telemetry monitoring described in the skills.sh distribution plan

## Inspiration / Evidence

The find-skills discoverability layer was identified during the 2026-04-23 skills.sh investigation. See `docs/internal/distribution/skills-sh.md` (Discoverability layer section) for the full analysis. Key evidence:

- find-skills has 1.2M weekly installs, making it the critical recommendation path
- Its hardcoded category list does not include Product Management
- pm-skills' 1.2K install base suggests organic discovery is happening somewhere, but we have no visibility into which queries drive it
- Zero systematic testing of description-to-query matching exists in the repo history

## Status Transitions

- **Backlog** (current, 2026-04-23)
- **In Progress** when test-plan authoring begins
- **Shipped** when baseline report + gap-analysis are committed; enables F-40

## Relationship to F-40

F-39 produces the GAP data; F-40 consumes it to drive audits. Running F-40 without F-39 means guessing at which descriptions need work; running F-39 without F-40 produces a report that changes nothing. They should be scheduled as a pair within the same milestone.

## Detailed specification

Deferred to `F-39-find-skills-empirical-test/test-plan.md` during authoring pass.
