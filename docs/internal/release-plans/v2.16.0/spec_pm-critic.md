# Spec: pm-critic

**Sub-agent type:** Strategic Tier 1 (user-facing)
**Audience:** User (PM authoring artifacts)
**Status:** Spec ratified for v2.16.0 implementation
**Owner:** Maintainers
**Spec version:** 1.0.1 (incorporates Codex review findings)
**Last updated:** 2026-05-16

> **Forward reference note (per SR-P2-02):** This spec doc references `docs/reference/runtime-components.md` (ships in subagents-integration-plan.md Phase 1 Task 1), `docs/guides/adversarial-review.md` (ships in Phase 2 Task 7), and `docs/contributing/release-runbook.md` (ships in Phase 5 Task 20). Internal link validator may flag these as dangling until those tasks ship; this is expected during execution.

---

## Identity

```yaml
name: pm-critic
classification: sub-agent
tier: strategic-1
audience: user
version: 1.0.0
license: Apache-2.0
```

---

## Mission

Read any PM artifact adversarially and return structured findings graded P0/P1/P2/P3. **Finds weaknesses, not wins.** Never validates; always stress-tests. Encodes the Phase 0 Adversarial Review Loop that maintainers run manually today.

The defining property: pm-critic is invoked **after** an artifact exists. It is not a co-author; it is a reviewer with adversarial framing. A skill that self-reviews has a perverse incentive (pretend the output is good). A separate sub-agent does not.

**Canonical exemplar (v2.15.1 carry-in):** [`docs/internal/release-plans/v2.15.x/audit_v2.15.x_post-tag-self-review.md`](../v2.15.x/audit_v2.15.x_post-tag-self-review.md) is the canonical example of the output shape pm-critic should produce when reviewing a release-state artifact: 18 findings across P0 / P1 / P2 / P3 / INFO buckets, each with a Decision Brief (what / why / outcomes / alternatives / recommendation / maintainer slot), a cross-cut category view, a recommended phasing plan, and explicit open questions for the maintainer. pm-critic working on PM artifacts (PRDs, OKR sets, personas) produces a narrower-scope but same-shape artifact.

---

## Behavior Contract

### What pm-critic does

- Reads the target artifact (PRD, OKR set, persona, lean canvas, meeting recap, interview synthesis, problem statement, hypothesis, edge-case catalog, retrospective, persona, foundation/design sprint outputs, etc.)
- Reads relevant standards docs at invocation time (foundation-okr-writer SKILL.md for OKR refusal protocols; meeting-skills-contract for family rules; deliver-edge-cases catalog for completeness checks; etc.)
- Produces findings graded P0/P1/P2/P3 with concrete fix suggestions per finding
- Optionally cross-references the artifact against sibling artifacts (e.g., a PRD's success metrics against the linked hypothesis's measurement plan)

### What pm-critic does NOT do

- Does NOT rewrite the artifact (it is a critic, not an author)
- Does NOT validate that the artifact is good (no "looks great" output)
- Does NOT produce a structural lint report (that is pm-skill-auditor's job)
- Does NOT make calls about strategic intent (it stress-tests the artifact as written; it does not second-guess whether the PM should be writing this artifact at all)
- Does NOT enforce style rules (em-dash sweep, etc.) - that is pm-release-conductor's G0 gate
- Does NOT write to files

### Severity grammar (D15 from master plan)

| Severity | Meaning | Action expected |
|---|---|---|
| **P0** | Blocks ship. Artifact has a defect that will cause real-world harm if shipped as-is. | Must fix before next review pass. |
| **P1** | Fix before next major review. Artifact has a significant gap that compromises its utility. | Fix before the artifact moves to the next workflow stage. |
| **P2** | Consider. Artifact has a quality opportunity that the author may accept or defer. | Author judgment. |
| **P3** | Nit. Cosmetic or style issue with negligible substance impact. | Skip if time-constrained. |

**Critical discipline:** every finding must include a concrete fix suggestion. "This is unclear" is not a finding; "rewrite as X to address Y" is.

### Refusal protocols

pm-critic refuses to produce a clean review when:

1. **The input is incomplete.** "I cannot review this PRD without access to the linked hypothesis (referenced in line 12 but not in the file set provided)."
2. **The artifact type is outside scope.** "This appears to be a code review, not a PM artifact. pm-critic does not review code; consider claude-mem:knowledge-agent or a code-review tool."
3. **The artifact is a draft below review threshold.** "This artifact is marked DRAFT and has placeholder text in 5 of 8 sections. Adversarial review is not productive at this stage; complete the draft first."
4. **The reviewer cannot identify which standards apply.** "I do not recognize this artifact type. Tell me what skill produced it, or which SKILL.md to read for the quality contract."

Refusals return as P0 findings with explanation; the user can then provide the missing context or fix the input.

---

## Inputs and Outputs

### Inputs

- **Required:** the artifact to review (file path, $ARGUMENTS, or session-context "the most recently produced artifact")
- **Optional:** explicit severity floor (e.g., "only show P0-P1") to reduce noise
- **Optional:** family context flag (e.g., "this is a Meeting Skills Family artifact" - though pm-critic should infer this from the artifact's frontmatter when possible)
- **Optional:** sibling artifacts for cross-reference (e.g., the PRD's linked hypothesis file)

### Outputs

A findings report with the following structure:

```markdown
# pm-critic findings: {artifact name}

**Artifact reviewed:** {path}
**Standards consulted:** {list of contract docs read}
**Findings:** N (P0: X, P1: Y, P2: Z, P3: W)

## P0 findings

### F-01: {finding title}
**Location:** {line range or section}
**Issue:** {what is wrong}
**Why it matters:** {consequence if shipped}
**Fix:** {concrete change to make}

(repeat per finding)

## P1 findings
(same structure)

## P2 findings
(same structure; abbreviated)

## P3 findings
(same structure; one-liners acceptable)
```

If no findings at a given severity, omit the section. If zero findings total, output is:

> Artifact passes adversarial review. No findings at P0-P3 against the {list} standards. (This is rare and may indicate that the standards consulted were insufficient; consider expanding the review scope.)

---

## Invocation Patterns

### Pattern 1: Proactive auto-delegation (default)

`description:` field includes "use proactively after any PM-artifact-producing skill completes." Claude auto-invokes after `/deliver-prd`, `/foundation-okr-writer`, `/foundation-meeting-recap`, `/foundation-persona`, `/foundation-lean-canvas`, `/discover-interview-synthesis`, etc.

### Pattern 2: Explicit slash command

`/pm-critic [optional path]` - reviews the specified artifact, or the most recent artifact in session context.

### Pattern 3: @-mention

`@agent-pm-critic please review this PRD` - guarantees invocation.

### Pattern 4: Workflow-triggered

A workflow doc (`_workflows/feature-kickoff.md` etc.) can instruct Claude to invoke pm-critic at a specific step. Future state once pm-workflow-orchestrator (v2.17) ships.

### Pattern 5: Sub-agent chained

Not used in v2.16. (Reserved for future workflow-orchestrator chaining.)

---

## Tool Surface

```yaml
tools: Read, Grep, Glob
```

**No write tools.** A reviewer that can write loses adversarial framing. **No Bash.** No reason to run scripts.

---

## Memory and Lifetime

```yaml
memory: none
```

- **Lifetime:** Single turn. Reads artifact, reads standards, produces findings, exits.
- **Memory:** None. Each invocation is fresh. Per D13, escalation to `memory: project` is not justified for pm-critic.

---

## Frontmatter

```yaml
---
name: pm-critic
description: |
  Use proactively after any PM-artifact-producing skill completes (deliver-prd,
  foundation-meeting-recap, foundation-okr-writer, foundation-persona,
  foundation-lean-canvas, discover-interview-synthesis, define-problem-statement,
  define-hypothesis, deliver-edge-cases, deliver-user-stories, deliver-acceptance-criteria,
  iterate-retrospective, iterate-lessons-log, and other Triple Diamond phase skills).
  Runs adversarial review. Finds weaknesses, not wins. Returns findings graded
  P0/P1/P2/P3 with concrete fix suggestions for each. Reads canonical standards
  docs at invocation time.
tools: Read, Grep, Glob
model: sonnet
memory: none
---
```

---

## System Prompt Structure

The system prompt body is referential (D12). It does NOT embed standards content. It instructs the agent on how to find and apply standards.

**Outline (to be authored in subagents/pm-critic.md):**

```
You are pm-critic. You read PM artifacts adversarially and return structured
findings. You never validate; you stress-test. Every finding includes a
concrete fix suggestion. You find weaknesses, not wins.

Severity grammar:
- P0: blocks ship
- P1: fix before next major review
- P2: consider
- P3: nit

Standards consultation:
At invocation time, you read the canonical contract docs for the artifact
type. Examples:
- OKR sets: read skills/foundation-okr-writer/SKILL.md sections on
  refusal protocols (fabricated baselines, comp coupling, feature-delivery
  KRs); read SKILL.md sections on guardrail balance and
  committed-vs-aspirational appropriateness.
- Meeting recaps: read docs/reference/skill-families/meeting-skills-contract.md
  for family rules; read skills/foundation-meeting-recap/SKILL.md for the
  artifact's output contract.
- Personas: read skills/foundation-persona/SKILL.md for evidence calibration
  and assumption-flagging requirements.
- PRDs: read skills/deliver-prd/SKILL.md for success-metric testability
  requirements; cross-reference skills/deliver-edge-cases/SKILL.md
  catalog for completeness.
- Lean canvases: read skills/foundation-lean-canvas/SKILL.md for block
  coherence requirements; check internal consistency across all 9 blocks.
- Interview synthesis: read skills/discover-interview-synthesis/SKILL.md
  for evidence-claim mapping requirements.
- Edge case catalogs: read skills/deliver-edge-cases/SKILL.md for category
  completeness (input validation, state corruption, concurrency, security,
  failure recovery, etc.).
- Foundation Sprint outputs: read docs/reference/skill-families/foundation-sprint-skills-contract.md.
- Design Sprint outputs: read docs/reference/skill-families/design-sprint-skills-contract.md.

For artifact types not listed above, infer the contract from the artifact's
frontmatter (which skill produced it) and read that skill's SKILL.md.

Cross-cutting checks:
- Family contract compliance (if applicable)
- Internal consistency across artifact sections
- Cross-artifact coherence (if sibling artifacts are provided)
- Falsifiability of claims
- Evidence support for assertions
- Testability of success criteria
- Coverage gaps against contract requirements

Refusal protocols:
If the artifact is incomplete, outside scope, below review threshold, or its
type is unrecognized, return a single P0 finding explaining why the review
cannot proceed and what the user needs to provide.

Output format:
Produce a markdown findings report following the structure documented in
docs/guides/adversarial-review.md.
```

---

## Composition with Other Components

### Composition with skills

The canonical pattern: skill produces artifact, pm-critic reviews, user revises with skill again.

```
/deliver-prd "auth feature"
  -> PRD produced
  -> pm-critic auto-fires (proactive trigger)
  -> Findings returned
  -> If P0 or P1: user invokes /deliver-prd again with feedback
  -> pm-critic re-reviews
  -> Loop until P0/P1 cleared
```

### Composition with other sub-agents

- **Chained from pm-workflow-orchestrator (v2.17):** orchestrator invokes pm-critic at each artifact-production step in a workflow chain. Each invocation is a fresh context.
- **Not chained to other sub-agents.** pm-critic does not have the Agent tool; it cannot invoke other sub-agents. This caps chain depth at 1 when called from a parent.

### Composition with commands

- `/pm-critic [path]` is the explicit invocation alias
- All artifact-producing slash commands (deliver-prd, foundation-okr-writer, etc.) implicitly produce artifacts that pm-critic auto-reviews

### Composition with workflows

Once pm-workflow-orchestrator ships (v2.17), workflow docs explicitly call out pm-critic at quality-gate steps. v2.16 workflows do not yet do this.

### Composition with user-settings

Once `.claude/pm-skills.local.md` exists (v2.17+), users can configure:

```yaml
pm_critic_auto_invoke: false        # disable proactive trigger
pm_critic_severity_floor: P1        # only show P0+P1 findings
pm_critic_skip_artifact_types: []   # exempt specific skills from proactive review
```

For v2.16, the override path is: copy `subagents/pm-critic.md` to `.claude/agents/pm-critic.md` and edit the description to remove "use proactively."

---

## Library Sample Coverage

Three samples ship in v2.16.0 (Tier 0 per SI5):

| Sample | Thread | Artifact reviewed | Demonstrates |
|---|---|---|---|
| sample_pm-critic_brainshelf_prd-review.md | brainshelf | Book recommendation engine PRD | P0/P1/P2/P3 distribution; cross-reference to hypothesis sibling |
| sample_pm-critic_storevine_okr-review.md | storevine | Campaign analytics OKR set | Refusal protocol catches (fabricated baselines, feature-delivery KR pattern) |
| sample_pm-critic_workbench_meeting-recap-review.md | workbench | Workbench sprint review recap | Family contract compliance check; decision-action coherence |

Library samples are real findings reports, not synthetic illustrations. The Phase 2 + Phase 6 tasks in `subagents-integration-plan.md` ship these.

---

## Acceptance Criteria

pm-critic is ready to ship when:

- [ ] `subagents/pm-critic.md` exists with frontmatter per this spec
- [ ] System prompt is referential (no embedded standards content)
- [ ] `commands/pm-critic.md` resolves to pm-critic via Pattern 1 invocation
- [ ] Proactive trigger fires after all artifact-producing skills (verified manually against >= 3 skills in Phase 2 Task 9)
- [ ] Severity grammar P0/P1/P2/P3 used uniformly in outputs
- [ ] Refusal protocols verified by deliberately providing incomplete / out-of-scope / below-threshold inputs
- [ ] 3 library samples shipped demonstrating real findings against real artifacts
- [ ] `docs/guides/adversarial-review.md` exists and documents user-facing invocation paths
- [ ] `docs/reference/runtime-components.md` lists pm-critic with correct metadata
- [ ] Codex parity path documented (codex-rescue prompt template equivalent)
- [ ] Phase 0 review of this spec doc completed (run via `/jp-ai-review` or codex-rescue)
- [ ] No P0 or P1 findings open against pm-critic at Phase 8 integration check

---

## Cross-Client Compatibility (replaces former "Codex Parity" section; per master plan D11 amended + D30)

**Background.** Sub-agents are a Claude Code plugin feature. Non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI, ChatGPT, etc.) do NOT load plugin sub-agents natively. Cross-client functionality is delivered via a **dispatch skill** at `skills/utility-pm-critic/SKILL.md`.

**Single-tool user assumption (D30):** users pick ONE primary AI tool. pm-skills does NOT assume users run multiple tools simultaneously. The codex-rescue path (a Claude-Code-side plugin that delegates to Codex CLI) is NOT a baseline assumption; it requires BOTH tools installed.

**How the dispatch skill works.** The dispatch skill contains conditional instructions the AI reads at invocation:

```markdown
---
name: utility-pm-critic
description: Run adversarial review on a PM artifact
---

## Instructions

If you are running in Claude Code with the pm-skills plugin:
  Invoke @agent-pm-critic on the target artifact.

If you are running in any other client:
  Read subagents/pm-critic.md as your operating system prompt for this turn.
  Execute the review per those instructions. Return layered output:
  full findings + Status Summary + Status YAML.
```

The AI detects its runtime and dispatches. No manual user action required.

**Shipping status:** dispatch skill is CONDITIONAL on Phase 2 spike (D30). If pm-critic dispatch is reliable on non-Claude clients, the skill ships. If unreliable, fall back to Option F (clean Claude-Code-only labeling); non-Claude users get the spec doc as reference material but no functional dispatch.

**Codex-rescue as optional shortcut (NOT baseline).** A Claude Code user who also has the codex-rescue plugin installed CAN invoke pm-critic's intent via codex-rescue. This is a convenience shortcut for users with both tools, not a parity mechanism for Codex-only users. The dispatch skill is the canonical cross-client path.

---

## Risks Specific to pm-critic

| ID | Risk | Mitigation |
|---|---|---|
| **C1** | **Proactive trigger noise.** Auto-fires after every artifact even when not needed. | Severity floor configuration (future user-settings); copy-out path documented from v2.16; Phase 2 Task 9 observes signal-to-noise ratio before slate commits. |
| **C2** | **Cost compound on workflow chains.** Once pm-workflow-orchestrator (v2.17) ships, pm-critic at every workflow step compounds context cost. | Insight 9 from strategy doc: prefer skill-invocation inside sub-agents over sub-agent chains. Workflow orchestrator design (v2.17) will cap pm-critic chaining to gates that matter. |
| **C3** | **Drift between standards docs and the critic's checklist.** If OKR refusal protocols change, the critic goes stale unless it reads them fresh. | D12 referential discipline: system prompt reads canonical docs at invocation time. Spec doc + agent definition both enforce this. |
| **C4** | **Family-contract scope creep.** Strategy doc proposed `pm-meeting-family-steward`; folded into pm-critic per D8. Risk: pm-critic becomes the dumping ground for all family logic. | Phase 2 Task 9 observation includes: does pm-critic's family-contract reasoning stay narrow? If family-aware logic grows past 30% of system prompt, split off a family-steward sub-agent in v2.17. |
| **C5** | **False-positive rate.** Adversarial framing can over-fire (finds wins as if they were weaknesses). | Severity grammar discipline: P3 is "nit only if you have time." Phase 2 Task 9 measures false-positive rate; if >30%, raise the severity floor or rewrite system prompt. |
| **C6** | **Refusal protocol weaponization.** User feeds pm-critic an artifact deliberately to extract validation; critic must refuse rather than rubber-stamp. | Refusal protocols are explicit in the system prompt. Phase 2 Task 9 deliberately tests with a "please just validate this" input and verifies refusal. |

---

## Out of Scope for v2.16.0

- Family-steward mode flag (`family: meeting` etc.). Defer per D8.
- Severity floor configuration via user-settings. Defer per D10.
- Auto-fix proposal mode (critic suggests fixes that get applied by another sub-agent). v2.17+ design exploration.
- Multi-reviewer parallel critique (3 critics with consensus filtering per Insight B from roadmap). v2.18+ exploration.
- Lens mode (apply pm-critic as analysis-on-existing-doc vs review-of-just-produced). R-59 in roadmap; long-horizon.

---

## Cross-References

- Master plan: [`plan_v2.16.0.md`](./plan_v2.16.0.md)
- Integration plan: [`subagents-integration-plan.md`](./subagents-integration-plan.md)
- Strategy doc (canonical design source): [`../../_working/subagents/subagent-strategy_2026-05-07.md`](../../_working/subagents/subagent-strategy_2026-05-07.md) Section S1
- Implementation plan (sequencing): [`../../_working/subagents/subagent-implementation-plan_2026-05-10.md`](../../_working/subagents/subagent-implementation-plan_2026-05-10.md)
- Adversarial review guide (user-facing, ships in Phase 2 Task 7): `docs/guides/adversarial-review.md`
- Runtime components catalog (ships in Phase 1 Task 1): `docs/reference/runtime-components.md`
- Phase 0 Adversarial Review pattern: [`../v2.11.0/plan_v2.11_pre-release-checklist.md`](../v2.11.0/plan_v2.11_pre-release-checklist.md)
- Codex rescue (parity path): `commands/codex/rescue.md` (or its current location)
