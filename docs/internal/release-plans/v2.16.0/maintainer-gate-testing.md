# v2.16.0 Maintainer Gate Testing Handoff

**Status:** READY FOR MAINTAINER (created 2026-05-17 post-Phase-0 review closure at commit 9cb81af).
**Audience:** Maintainer who needs to validate GATE B + GATE C before v2.16.0 tag.
**Scope:** Cross-client dispatch skill testing. Tests cannot be performed from inside Claude Code; require a non-Claude AI client.

This document consolidates the maintainer-test protocols that were previously scattered across `subagents-integration-plan.md`, `plan_v2.16.0.md` D30, and `skills/utility-pm-release-conductor/SKILL.md`. Run the tests in this order.

---

## Background

Per master plan D11 (amended) + D30, v2.16.0 ships sub-agents as a Claude Code plugin feature plus **dispatch skills** at `skills/utility-pm-{role}/` for cross-client compatibility. The dispatch skills use a "runtime detection + execute inline" pattern:

- On Claude Code: dispatch to native `@agent-pm-{role}` sub-agent
- On non-Claude clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI): read `subagents/pm-{role}.md` and execute the system prompt body inline

The dispatch mechanism is **assumed** but not **validated**. Phase 2 Task 9 of `subagents-integration-plan.md` defines three gates the maintainer must close:

- **GATE A** (pm-critic behavior validation): PARTIAL closed via Brainshelf PRD sample + storevine OKR sample + workbench meeting recap sample. No further testing needed unless you want to manually exercise pm-critic against your own real artifacts.
- **GATE B** (dispatch skill reliability on at least one non-Claude client): PENDING.
- **GATE C** (conductor dispatch sub-spike: chain composition via "reference + execute inline" pattern): PENDING.

If both gates fail, the v2.16.0 ship slate has fallback paths documented per D30 (Option F: clean Claude-Code-only labeling; D-revised: 3 dispatch skills ship + conductor stays Claude-Code-only).

---

## GATE B: Dispatch Skill Reliability

**Goal:** validate that the dispatch skill mechanism (read `subagents/pm-{role}.md` and execute inline) works reliably on at least one non-Claude AI client.

**Estimated effort:** 30-45 minutes (3 dispatch skills tested on 1-2 clients each).

### Prerequisites

- Non-Claude AI client installed and configured. Recommended order: Codex CLI (closest to Claude Code; same plugin ecosystem) > Cursor > Windsurf > Copilot CLI > Gemini CLI. Test on at least ONE; ideally test on TWO for cross-client coverage.
- pm-skills repo cloned or accessible to the client. Some clients (Cursor, Windsurf) read the repo as a workspace; some (Codex CLI, Copilot CLI) work from current working directory.
- A real PM artifact to review. Use `library/skill-output-samples/deliver-prd/sample_deliver-prd_brainshelf_resurface.md` for repeatability with the canonical sample.

### Test 1: `utility-pm-critic` dispatch

On a non-Claude client:

```
/utility-pm-critic library/skill-output-samples/deliver-prd/sample_deliver-prd_brainshelf_resurface.md
```

OR (if the client does not support slash commands):

```
Use the utility-pm-critic skill from pm-skills to review the Brainshelf PRD sample at library/skill-output-samples/deliver-prd/sample_deliver-prd_brainshelf_resurface.md
```

**Pass criteria:**

1. The AI detects it is NOT running in Claude Code with the pm-skills plugin (runtime detection works)
2. The AI reads `subagents/pm-critic.md` and treats the system prompt body as its operating instructions
3. The AI reads the target PRD
4. The AI consults the canonical contract docs cited in the system prompt (at minimum: `skills/deliver-prd/SKILL.md`)
5. Output includes the three-section layered envelope per D26:
   - Section 1: full findings with P0/P1/P2/P3 grading and concrete fix suggestions
   - Section 2: `## Status Summary` prose section
   - Section 3: `## Status` YAML block with machine-parseable fields
6. Findings are STRUCTURALLY similar to the canonical sample at `library/sub-agent-samples/pm-critic/sample_pm-critic_brainshelf_prd-review.md` (some variation is expected; identical findings is NOT a pass criterion)

**Fail signals:**

- AI ignores `subagents/pm-critic.md` and produces a generic review without the layered envelope
- AI hallucinates standards docs that don't exist
- AI refuses entirely with "I cannot run sub-agents"
- Output is wildly inconsistent with the canonical sample (e.g., reports zero findings on an artifact known to have multiple)
- Context budget exhausts before producing complete output

### Test 2: `utility-pm-skill-auditor` dispatch

On the same non-Claude client:

```
/utility-pm-skill-auditor --scope full
```

**Pass criteria:**

1. The AI runs `bash scripts/pre-tag-validate.sh` (or `pwsh scripts/pre-tag-validate.ps1` on Windows) successfully
2. Captures validator output
3. Runs cross-cutting checks from the catalog at `docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md#cross-cutting-check-catalog`
4. Re-derives aggregate counters from filesystem
5. Compares to declared values in CONTEXT.md, AGENTS.md, README.md
6. Returns layered output (Section 1 audit report + Section 2 Status Summary + Section 3 Status YAML)

**Fail signals:**

- AI cannot execute Bash (fails Step 1)
- AI skips Step 5 counter re-derivation
- Status YAML field structure diverges from the canonical EXAMPLE.md at `skills/utility-pm-skill-auditor/references/EXAMPLE.md`

### Test 3: `utility-pm-changelog-curator` dispatch

On the same non-Claude client:

```
/utility-pm-changelog-curator --since-tag v2.15.0 --target-version v2.16.0
```

**Pass criteria:**

1. The AI runs `git log v2.15.0..HEAD --pretty=format:'%h %s' --name-only`
2. Reads `CLAUDE.md` for hygiene rules
3. Classifies each commit per the rules table in `subagents/pm-changelog-curator.md`
4. Groups into Keep-a-Changelog sections (Added, Changed, Fixed, Removed, Deprecated, Security)
5. Applies hygiene rewrites (no em-dashes; no internal-notes references; no Claude attribution trailers; public-path framing)
6. Returns layered output

**Fail signals:**

- Output contains em-dashes or "Co-Authored-By: Claude" trailers
- Output references `_NOTES/` or `docs/internal/efforts/` paths
- Refusal on dirty tree fires when working tree is clean

### Recording GATE B outcomes

Update `subagents-integration-plan.md` Status block with the results. Format:

```markdown
### GATE B test results (recorded YYYY-MM-DD)

| Client | utility-pm-critic | utility-pm-skill-auditor | utility-pm-changelog-curator | Overall |
|---|---|---|---|---|
| Codex CLI | PASS / FAIL / N/A | PASS / FAIL / N/A | PASS / FAIL / N/A | PASS / PARTIAL / FAIL |
| Cursor | ... | ... | ... | ... |
| (additional clients) | ... | ... | ... | ... |

**GATE B status:** PASS (any client passes all 3) / PARTIAL (mixed) / FAIL (no client passes any)
```

**Decision rules:**

- **GATE B PASS:** all 3 dispatch skills (pm-critic, pm-skill-auditor, pm-changelog-curator) RATIFIED in v2.16.0. Update master plan D30 status. Remove EXPERIMENTAL caveats from SKILL.md files (the conductor stays EXPERIMENTAL pending GATE C).
- **GATE B PARTIAL:** keep EXPERIMENTAL caveat on the failing dispatch skills; specifically document which clients are unsupported in `runtime-components.md` Cross-Client section.
- **GATE B FAIL on all clients:** Option F fallback per D30. Remove all 4 dispatch skills from v2.16.0 ship slate. Skills directory has 4 utility-pm-* skills to delete via `git rm -r skills/utility-pm-{critic,skill-auditor,changelog-curator,release-conductor}/`. Update AGENTS.md to remove dispatch-skill entries. Update runtime-components.md Cross-Client section to say "Claude Code only for v2.16; v2.17 will revisit." Update CHANGELOG draft to remove dispatch-skill bullets.

---

## GATE C: Conductor Dispatch Sub-Spike

**Goal:** validate that the `pm-release-conductor` dispatch skill's "reference + execute inline" pattern for chain composition works on a non-Claude client. This is the most complex dispatch case: the conductor must inline both auditor (at G0 + G2.5) and curator (at G2) behaviors WITHIN its own context window because non-Claude clients cannot natively chain to other sub-agents.

**Estimated effort:** 30-45 minutes (dry-run walk-through against a real release-like scenario).

**Prerequisites:**

- GATE B PASS on at least one client (specifically: the same client you plan to use for GATE C). If GATE B failed on all clients, skip GATE C and apply D-revised fallback.
- Same non-Claude client as GATE B
- A test target version (use `v2.16.0` for the rehearsal; the conductor's `--dry-run` flag skips actual tag + push)

### Test: conductor dry-run

On the non-Claude client:

```
/utility-pm-release-conductor v2.16.0 --dry-run
```

**Pass criteria (all must hold):**

1. **Setup phase:** the AI reads `subagents/pm-release-conductor.md` + `docs/contributing/release-runbook.md` + `subagents/pm-skill-auditor.md` + `subagents/pm-changelog-curator.md` as setup. Returns target-version validation + branch check + master-plan-existence check.

2. **G0 (Pre-tag readiness):** runs validators via Bash; inlines auditor's 4-step audit flow; returns layered output. Confirms with maintainer to proceed.

3. **G1 (Adversarial review):** prompts maintainer for attestation. NOT auto-detected.

4. **G2 (Version bump + CHANGELOG prep):** proposes edits to plugin.json + marketplace.json + CHANGELOG.md + docs/changelog mirror + README badges + plan status + release notes; inlines curator's 8-step drafting flow; surfaces the draft to maintainer.

5. **G2.5 (Commit + re-verify):** in dry-run mode, simulates commit; re-inlines auditor against the new HEAD; simulates push + CI green.

6. **G3 (Tag + push):** in dry-run mode, presents tag message; "ship it" prompt; **DOES NOT** execute `git tag` or `git push`. Emits explicit "NOT RELEASABLE - dry run" output.

7. **G4 (Post-tag hygiene):** in dry-run mode, simulates each sub-check; emits reminders.

8. **Context budget:** the full flow completes without the AI hitting context limits. If it gets to G2 then truncates, GATE C fails on the context-budget axis.

9. **Refusal cascade:** when the inlined auditor or curator refuses (e.g., simulate by passing `--scope unspecified` to force refusal), the conductor surfaces the refusal narrative and pauses the gate. The conductor does NOT treat refusal as PASS.

**Fail signals:**

- Context budget exhausts before G2.5
- Inlined auditor/curator produces output that the conductor cannot parse (Status YAML missing or malformed)
- Conductor advances past G0 with `p0_count > 0` from the inlined auditor
- Conductor attempts to tag a SHA other than the G2.5-captured one
- Conductor offers a `--skip-gates` option (removed per D24)

### Recording GATE C outcomes

Update `subagents-integration-plan.md` Status block with results. Format:

```markdown
### GATE C test results (recorded YYYY-MM-DD)

| Client | Conductor dispatch (--dry-run) | Pass criteria 1-9 |
|---|---|---|
| {client name} | PASS / FAIL | {note on which sub-criteria}: |

**GATE C status:** PASS (conductor dispatch RATIFIED) / FAIL (D-revised fallback)
```

**Decision rules:**

- **GATE C PASS:** conductor dispatch skill RATIFIED. Update master plan D30 status. Remove EXPERIMENTAL caveat from `skills/utility-pm-release-conductor/SKILL.md`. Document the validated client(s) in runtime-components.md Cross-Client section.
- **GATE C FAIL:** apply D-revised fallback. Remove `skills/utility-pm-release-conductor/` directory via `git rm -r`. Update AGENTS.md to remove that one dispatch-skill entry. Update runtime-components.md Cross-Client section to say "conductor is Claude-Code-only; use the runbook at docs/contributing/release-runbook.md as a manual reference on non-Claude clients." Update CHANGELOG draft if applicable.

---

## After Both Gates Resolved

Proceed to **pre-tag artifact pass** (the work I deferred when wrapping the autonomous-execution session):

1. CHANGELOG v2.16.0 entries (the pm-changelog-curator can draft these for you on Claude Code, or you author manually)
2. `docs/releases/Release_v2.16.0.md` (long-form release notes)
3. `plugin.json` version bump from 2.15.2 to 2.16.0
4. `.claude-plugin/marketplace.json` version bump to match
5. README.md badge updates
6. `plan_v2.16.0.md` status block update to SHIPPED 2026-05-17 (or actual ship date)

Then `/release v2.16.0 --dry-run` for final rehearsal, then `/release v2.16.0` for live tag.

---

## Cross-References

- Master plan with D30 dispatch-skill decision: [`plan_v2.16.0.md`](./plan_v2.16.0.md)
- Subagents integration plan with Phase 2 Task 9 GATE definitions: [`subagents-integration-plan.md`](./subagents-integration-plan.md)
- Conductor dispatch SKILL.md with EXPERIMENTAL caveat: [`../../../skills/utility-pm-release-conductor/SKILL.md`](../../../skills/utility-pm-release-conductor/SKILL.md)
- Canonical samples for output-shape comparison: [`../../../library/sub-agent-samples/README.md`](../../../library/sub-agent-samples/README.md)
- Release runbook conductor reads at invocation: [`../../../docs/contributing/release-runbook.md`](../../../docs/contributing/release-runbook.md)
