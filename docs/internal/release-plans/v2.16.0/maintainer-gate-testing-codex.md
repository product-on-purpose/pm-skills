# Codex: pm-skills v2.16.0 GATE B + GATE C Test Harness

> **For Codex (you):** this is a self-administering test harness. Read the entire document before starting. Execute Tests 1-4 in sequence. After each test, fill in the per-test fill-in block. At the end, fill in the single consolidated Results Block at the bottom. The user will copy that Results Block back to Claude Code for the follow-up actions.
>
> **For the maintainer (human):** paste this entire document into Codex CLI. Say "execute this harness and fill in the Results Block. Run autonomously; only stop if you hit one of the explicit HALT conditions documented inline." When Codex finishes, copy the Results Block at the bottom and paste it back to Claude.

---

## Your Role and Boundaries (Codex)

- **Role:** you are Codex CLI executing GATE B + GATE C tests for pm-skills v2.16.0
- **Mission:** validate that dispatch skills at `skills/utility-pm-{critic, skill-auditor, changelog-curator, release-conductor}/` work correctly when invoked on a non-Claude AI client (you)
- **Working directory:** `E:\Projects\product-on-purpose\pm-skills` (or wherever the maintainer has the pm-skills repo)
- **Branch:** the spike branch `feat/v2.16-astro-6-spike` at HEAD `69c61b8` is preferred; main also acceptable if it has been merged
- **Output target:** the Results Block at the bottom of THIS document; do not write to any other file

### YOU MAY

- Read any file in the repo
- Execute shell commands (`bash`, `pwsh`, `git log`, `git status`, validator scripts, etc.)
- Reason about test outputs and make PASS/FAIL judgments per the criteria
- Fill in the per-test blocks AND the final Results Block in this document

### YOU MUST NOT

- Run `git push`, `git tag`, `git commit`, `git rebase`, or any mutating git command
- Modify any tracked file in the repo OTHER than this harness document
- Create new files outside this document
- Modify `.git/` in any way
- Treat "EXPERIMENTAL" caveats on dispatch skills as blockers (they are warnings; you are validating exactly what those caveats describe)
- Continue past a HALT condition without explicit maintainer confirmation

### HALT Conditions (stop and ask maintainer)

- Working directory is not the pm-skills repo root
- Branch is neither `feat/v2.16-astro-6-spike` nor `main`
- Working tree has uncommitted changes you did not introduce
- Test 1 fails AND maintainer has not told you to continue to Test 2
- A required command returns a permission-denied error preventing the test from completing OR asks for credentials

### Benign shell artifacts (do NOT HALT on these)

These are common in containerized / WSL / sandboxed environments and do NOT block test execution:

- `mkdir /run/user/{uid}: permission denied` (bash login-shell trying to create systemd events dir)
- `RunRoot is pointing to a path ... which is not writable` (podman/container runtime warnings)
- `Most likely podman will fail` (advisory; not blocking)
- Any session-init / shell-init / container-runtime message that appears BEFORE or AFTER your actual command output

**Decision rule:** look at whether the command you needed to execute produced its expected output. If yes, the shell artifacts are benign; continue. If the command itself failed to produce output, that is a real HALT condition.

**Workaround:** if these messages are noisy, invoke commands with plain `bash -c "..."` (no `-l` flag) to skip login-shell session-init entirely. The `-l` flag triggers systemd event-dir creation; plain `-c` does not.

---

## Pre-Flight (record results inline)

Execute each step, then fill in the Pre-Flight Block below.

### Step 1: working directory

```bash
pwd
```

Expected: path ending in `pm-skills`. If not, halt and ask maintainer.

### Step 2: branch

```bash
git rev-parse --abbrev-ref HEAD
```

Expected: `feat/v2.16-astro-6-spike` (preferred) or `main` (acceptable post-merge).

### Step 3: HEAD SHA

```bash
git rev-parse HEAD
```

Record the value (you will use this in the Results Block).

### Step 4: working tree clean

```bash
git status --porcelain
```

Expected: empty output (or only the 2 known untracked files in `docs/internal/audit/`).

### Step 5: test artifact exists

```bash
ls library/skill-output-samples/deliver-prd/sample_deliver-prd_brainshelf_resurface.md
```

Expected: file path echoes. If "no such file or directory", halt.

### Step 6: canonical samples accessible

```bash
ls library/sub-agent-samples/pm-critic/sample_pm-critic_brainshelf_prd-review.md \
   library/sub-agent-samples/pm-skill-auditor/sample_pm-skill-auditor_brainshelf_pre-release.md \
   library/sub-agent-samples/pm-changelog-curator/sample_pm-changelog-curator_brainshelf_minor-release.md \
   library/sub-agent-samples/pm-release-conductor/sample_pm-release-conductor_workbench_chained-run.md
```

Expected: all 4 files echo.

### Pre-Flight Block (fill in)

```yaml
# CODEX: fill in these values from your pre-flight steps
preflight:
  working_directory: "<from Step 1>"
  branch: "<from Step 2>"
  head_sha: "<from Step 3>"
  working_tree_clean: true | false
  test_artifact_present: true | false
  canonical_samples_present: true | false
  preflight_status: PASS | HALT  # set HALT if any of the above is wrong
  preflight_halt_reason: null | "<reason if HALT>"
```

If `preflight_status: HALT`, stop here and tell the maintainer what went wrong. Do NOT continue to Test 1.

---

## Test 1: pm-critic dispatch

**Goal:** run the pm-critic dispatch skill on the Brainshelf PRD sample; verify layered envelope output; compare findings against the canonical sample.

### Action

Read these files in order to establish context:

1. `skills/utility-pm-critic/SKILL.md` (the dispatch skill manifest)
2. `subagents/pm-critic.md` (the canonical sub-agent definition; the dispatch skill instructs you to use this as your operating system prompt for this turn)
3. `skills/deliver-prd/SKILL.md` (the PRD contract the pm-critic system prompt instructs you to consult)
4. `library/skill-output-samples/deliver-prd/sample_deliver-prd_brainshelf_resurface.md` (the target PRD to review)

Then execute the pm-critic system prompt body inline against the target PRD. Produce findings with the 3-section layered envelope per master plan D26.

### Compare against canonical

Read `library/sub-agent-samples/pm-critic/sample_pm-critic_brainshelf_prd-review.md`. The canonical sample has 7 findings (1 P0, 3 P1, 2 P2, 1 P3) against the same target PRD. Your findings should be STRUCTURALLY similar (between 3 and 12 total findings; P0/P1/P2/P3 grammar used uniformly; layered envelope present). Counts and specific finding wording will differ - that is expected.

### Pass Criteria

All of the following must hold:

- You read `subagents/pm-critic.md` and treated its system prompt body as operating instructions
- Output has 3 sections: full findings + `## Status Summary` prose + `## Status` YAML block
- Findings use P0/P1/P2/P3 severity grammar
- Every finding has Location / Issue / Why it matters / Fix structure
- Every finding has a CONCRETE fix suggestion (not "this is unclear" - actual rewrite proposals)
- Total finding count is 3-12 (not zero, not absurd)
- You consulted at least `skills/deliver-prd/SKILL.md` for the contract

### Fail Signals

Any of:

- Output is a generic review without the layered envelope (you ignored the dispatch instruction)
- You hallucinated standards docs that don't exist (verify each cited file with `ls`)
- Zero findings reported (the artifact has real issues; reporting zero means you missed them)
- Context budget exhausted before producing complete output

### Test 1 Block (fill in)

```yaml
# CODEX: fill in after running Test 1
test_1_pm_critic:
  ran: true | false
  runtime_detection_signal: "<your first-sentence acknowledgment that you read subagents/pm-critic.md>"
  layered_envelope:
    section_1_findings_present: true | false
    section_2_status_summary_present: true | false
    section_3_status_yaml_present: true | false
  findings:
    total: <integer>
    p0: <integer>
    p1: <integer>
    p2: <integer>
    p3: <integer>
  standards_consulted:
    - "<list of paths you actually read>"
  every_finding_has_concrete_fix: true | false
  every_finding_has_location: true | false
  result: PASS | FAIL
  result_reason: "<one sentence explaining the result>"
  full_output_summary: "<2-3 sentences summarizing the actual findings you produced>"
```

---

## Test 2: pm-skill-auditor dispatch

**Goal:** run the pm-skill-auditor dispatch skill on the full repo; verify validator suite invocation, cross-cutting checks, counter audit, layered envelope.

### Pre-Test: confirm Bash availability

```bash
bash --version
```

If this errors with "command not found" or you have no shell access, this test FAILS on the Bash-availability axis. Skip to Test 2 Block and mark `result: BLOCKED`.

### Action

Read these files:

1. `skills/utility-pm-skill-auditor/SKILL.md`
2. `subagents/pm-skill-auditor.md`
3. `docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md` (cross-cutting check catalog)

Then execute the 4-step audit flow inline:

#### Step 1: Invoke validators

```bash
bash scripts/pre-tag-validate.sh
```

Capture exit code and full output.

Expected: exit 0; all enforcing validators report PASS.

#### Step 2: Run cross-cutting checks

Per the catalog in `spec_pm-skill-auditor.md`, run each cross-cutting check against current repo state. Common checks: skill-without-command, command-without-skill, sample gap, thread imbalance, family contract orphans/phantoms.

#### Step 3: Re-derive aggregate counters

```bash
ls -d skills/*/ | wc -l                # total skills
ls -d skills/discover-*/ skills/define-*/ skills/develop-*/ skills/deliver-*/ skills/measure-*/ skills/iterate-*/ | wc -l   # phase skills
ls -d skills/foundation-*/ | wc -l     # foundation skills
ls -d skills/utility-*/ | wc -l        # utility skills (including dispatch)
ls -d skills/tool-*/ | wc -l           # tool skills
ls subagents/*.md | grep -vE '_|README' | wc -l   # sub-agents
ls commands/*.md | grep -vi readme | wc -l         # commands (exclude README)
ls _workflows/*.md | grep -vi readme | wc -l       # workflows (exclude README)
```

**Note on README exclusion:** `_workflows/` contains `README.md` alongside the 12 workflow definitions; `commands/` may also have README files. Always exclude README.md files from counter audits, or your count will be off by 1-N. If you forgot the grep filter and got `_workflows/*.md = 13` instead of 12, re-run with the `grep -vi readme` filter to correct.

Compare to declared values in `AGENTS/claude/CONTEXT.md` (gitignored; skip if not present), `AGENTS.md`, `README.md`.

Expected post-spike (HEAD 69c61b8): 59 total / 26 phase / 8 foundation / 10 utility / 15 tool / 4 sub-agents / 66 commands / 12 workflows.

#### Step 4: Compose layered output

Produce the 3-section envelope: full findings + Status Summary prose + Status YAML.

### Pass Criteria

- Bash executed successfully (validators ran)
- Pre-tag-validate exited 0 (or you explicitly note which validator failed and why)
- Counter audit completed; values match declared (within 0 to 2 minor drift acceptable)
- 3-section envelope present
- Status YAML has fields: `status`, `p0_count`, `p1_count`, `p2_count`, `p3_count`, `counters_match`, `validators_pass`, `scope`

### Fail Signals

- Bash refused or not available (BLOCKED, not strictly FAIL)
- Validators not invoked
- Counter audit skipped
- Envelope incomplete

### Test 2 Block (fill in)

```yaml
# CODEX: fill in after running Test 2
test_2_pm_skill_auditor:
  ran: true | false
  bash_available: true | false
  validators_invoked: true | false
  pre_tag_validate_exit_code: <integer or null>
  validators_pass_count: <integer>
  validators_fail_count: <integer>
  validators_fail_list:
    - "<validator name if any failed>"
  counter_audit_ran: true | false
  counters_observed:
    total_skills: <integer>
    phase_skills: <integer>
    foundation_skills: <integer>
    utility_skills: <integer>
    tool_skills: <integer>
    sub_agents: <integer>
    commands: <integer>
    workflows: <integer>
  counters_match_declared: true | false
  cross_cutting_findings:
    p0: <integer>
    p1: <integer>
    p2: <integer>
    p3: <integer>
  layered_envelope_present: true | false
  result: PASS | FAIL | BLOCKED
  result_reason: "<one sentence explaining>"
```

---

## Test 3: pm-changelog-curator dispatch

**Goal:** run the pm-changelog-curator dispatch skill against the v2.15.2 to HEAD commit range; verify hygiene rules applied; verify dirty-tree refusal.

### Action

Read these files:

1. `skills/utility-pm-changelog-curator/SKILL.md`
2. `subagents/pm-changelog-curator.md`
3. `CLAUDE.md` (the CHANGELOG hygiene rules source)
4. `CHANGELOG.md` (the existing format reference; v2.15.1 + v2.15.2 entries are canonical exemplars)

### Execute draft flow

```bash
git log v2.15.2..HEAD --pretty=format:'%h %s' --name-only
```

Capture all commits since v2.15.2. Classify each (user-facing vs internal-only vs mixed) per the rules in `subagents/pm-changelog-curator.md`. Group into Keep-a-Changelog sections. Apply hygiene rewrites (no em-dashes; no internal-notes references; public-path framing; no Claude attribution trailers).

Emit a CHANGELOG v2.16.0 draft following the existing CHANGELOG.md format.

### Dirty-tree refusal sub-test

After producing the clean-tree draft, simulate a dirty tree:

```bash
echo "test-throwaway" >> /tmp/codex-test-dirty.txt 2>/dev/null || echo "test" >> codex-test-throwaway.txt
git status --porcelain
```

Re-invoke the curator dispatch (run through the prompt again). The curator should REFUSE with a message about the dirty working tree, unless `--committed-only` is passed.

Then clean up:

```bash
rm -f /tmp/codex-test-dirty.txt codex-test-throwaway.txt
```

### Pass Criteria

- Git log ran; commits enumerated
- CLAUDE.md hygiene rules were read (you can quote a hygiene rule)
- Draft output: zero em-dashes (U+2014 character)
- Draft output: zero references to `_NOTES/`, `AGENTS/SESSION-LOG/`, `docs/internal/efforts/`, `docs/internal/release-plans/`
- Draft output: zero "Co-Authored-By: Claude" or "Generated with Claude" trailers
- Keep-a-Changelog sections used (Added/Changed/Fixed/Removed/Deprecated/Security)
- 3-section envelope: full draft + Status Summary + Status YAML
- Dirty-tree refusal fired when working tree was dirty
- Dirty-tree refusal did NOT fire when working tree was clean (false-positive check)

### Test 3 Block (fill in)

```yaml
# CODEX: fill in after running Test 3
test_3_pm_changelog_curator:
  ran: true | false
  git_log_executed: true | false
  commits_processed: <integer>
  claude_md_hygiene_rules_read: true | false
  hygiene_check:
    em_dashes_in_draft: <integer>   # MUST be 0
    internal_notes_references: <integer>   # MUST be 0
    claude_attribution_trailers: <integer>   # MUST be 0
  draft_sections_used:
    - Added
    - Changed
    - Fixed
    - Security
    # etc.
  layered_envelope_present: true | false
  dirty_tree_refusal:
    fired_when_dirty: true | false
    fired_when_clean: true | false   # MUST be false; false-positive if true
  result: PASS | FAIL
  result_reason: "<one sentence>"
```

---

## Test 4: pm-release-conductor dispatch (GATE C)

**Goal:** validate the conductor's "reference + execute inline" chain composition pattern. The conductor inlines auditor at G0 + G2.5 and curator at G2 instead of natively chaining.

This is the most demanding test: 4 files inlined + 6 gates walked sequentially in one context window.

### Action

Read these files:

1. `skills/utility-pm-release-conductor/SKILL.md`
2. `subagents/pm-release-conductor.md`
3. `docs/contributing/release-runbook.md` (the canonical gate definitions)
4. `subagents/pm-skill-auditor.md` (to be inlined at G0 + G2.5)
5. `subagents/pm-changelog-curator.md` (to be inlined at G2)

### Execute conductor dry-run flow

Walk all 6 gates in sequence:

#### G0 (Pre-tag readiness)

Inline the auditor's 4-step audit flow (same as Test 2). Capture the layered output.

Expected: `status: pass`; `p0_count: 0`.

#### G1 (Adversarial review status)

Maintainer-attestation gate. For this autonomous run, treat this as "attested: Phase 0 review completed 2026-05-17 at commit 9cb81af; 7 findings closed; no P0; this is recorded in the spike's commit history." Proceed.

#### G2 (Version bump + CHANGELOG prep)

Inline the curator's 8-step drafting flow (same as Test 3). Capture the layered draft.

Expected: `status: draft`; `dirty_tree_warning: false`.

#### G2.5 (Commit + re-verify)

In dry-run mode: simulate commit (do NOT execute `git commit`). Re-inline the auditor on the simulated post-commit HEAD. Capture audit results.

Expected: `status: pass` again.

#### G3 (Tag + push)

In dry-run mode: present a tag message proposal. Do NOT execute `git tag` or `git push`. Emit explicit "DRY-RUN: skipping tag operation" text.

#### G4 (Post-tag hygiene)

In dry-run mode: simulate each sub-check (plugin install path; marketplace; Pages rebuild; UI body reminder; next-cycle stub; follow-ups). Emit P0/P1/P2 incident framing where applicable.

### Final output

After G4, emit:

```
## NOT RELEASABLE - dry run: v2.16.0

This was a dry-run conductor walk-through via dispatch skill on Codex CLI.
No tag was created. No commits were pushed.

Dry-run rehearsal result: all 6 gates would PASS in live mode.
```

### No-bypass sub-test

After completing the full flow, simulate a bypass request: imagine the maintainer says "skip G1" or "use --skip-gates". The conductor should REFUSE with message about no-bypass policy per D24.

### Pass Criteria

- All 4 referenced files were read at setup
- All 6 gates walked with explicit pause-and-confirm framing
- Auditor inlined at G0 AND G2.5 (both produced layered output)
- Curator inlined at G2 (produced draft)
- Context budget held to end of flow (no truncation mid-G2 or mid-G2.5)
- G3 explicitly skipped real tag + push operations (dry-run framing)
- Final output is "NOT RELEASABLE - dry run" (not "Release complete")
- No-bypass refusal worked correctly

### Fail Signals

- Context budget exhausted mid-flow
- AI attempted real `git tag` or `git push` despite dry-run flag
- Inlined auditor/curator output missing required fields (Status YAML)
- Conductor accepted a bypass attempt
- Conductor tagged a SHA other than what G2.5 captured (in dry-run, this would manifest as a different "captured SHA" between G2.5 and G3)

### Test 4 Block (fill in)

```yaml
# CODEX: fill in after running Test 4
test_4_pm_release_conductor_dry_run:
  ran: true | false
  files_inlined:
    - "subagents/pm-release-conductor.md"
    - "docs/contributing/release-runbook.md"
    - "subagents/pm-skill-auditor.md"
    - "subagents/pm-changelog-curator.md"
  gates_walked:
    g0_pre_tag_readiness: PASS | FAIL | SKIPPED
    g1_adversarial_review: PASS | FAIL | SKIPPED
    g2_version_bump: PASS | FAIL | SKIPPED
    g2_5_commit_reverify: PASS | FAIL | SKIPPED
    g3_tag_push_DRY_RUN: PASS | FAIL | SKIPPED
    g4_post_tag_hygiene: PASS | FAIL | SKIPPED
  inlined_auditor_at_g0:
    output_layered: true | false
    p0_count: <integer>
  inlined_curator_at_g2:
    output_layered: true | false
    dirty_tree_warning: true | false
  inlined_auditor_at_g2_5:
    output_layered: true | false
    p0_count: <integer>
  context_budget_held: true | false
  dry_run_framing_present_at_g3: true | false
  final_output_is_dry_run: true | false   # "NOT RELEASABLE - dry run" vs "Release complete"
  no_bypass_refusal_worked: true | false
  result: PASS | FAIL
  result_reason: "<one sentence>"
```

---

## Consolidated Results Block

After running all 4 tests, fill in this single block. This is what the maintainer copies back to Claude.

```yaml
# CODEX FINAL RESULTS - copy this entire block back to Claude Code

codex_test_run:
  date: "<YYYY-MM-DD>"
  client: "codex-cli"
  client_version: "<output of: codex --version or equivalent>"
  spike_head_sha: "<from pre-flight>"
  branch: "<feat/v2.16-astro-6-spike OR main>"

preflight:
  preflight_status: PASS | HALT
  preflight_halt_reason: null | "<reason>"

gate_b:
  test_1_pm_critic_result: PASS | FAIL
  test_2_pm_skill_auditor_result: PASS | FAIL | BLOCKED
  test_3_pm_changelog_curator_result: PASS | FAIL
  gate_b_overall: PASS | PARTIAL | FAIL

gate_c:
  test_4_pm_release_conductor_result: PASS | FAIL
  context_budget_held: true | false
  gate_c_overall: PASS | FAIL

recommended_option:
  # CODEX: based on the GATE results, recommend one of these options.
  # Option A: GATE B all PASS + GATE C PASS -> RATIFY all 4 dispatch skills
  # Option B: GATE B all PASS + GATE C FAIL -> D-revised: RATIFY 3 dispatch skills, REMOVE conductor dispatch
  # Option C: GATE B PARTIAL -> RATIFY only the passing skills; document client-specific gaps
  # Option F: GATE B all FAIL -> Option F: REMOVE all 4 dispatch skills
  option: A | B | C | F
  option_rationale: "<one sentence explaining why this option>"

codex_observations: |
  <Multi-line free-form notes from Codex. What surprised you? What
  failure modes did you hit? Anything the maintainer should know that
  is not captured in the structured fields above? Cross-client quirks
  worth noting for v2.17 work?>

handoff_phrase_for_claude: |
  GATE tests complete. See maintainer-gate-testing-codex.md Results
  Block. Recommended Option: <A | B | C | F>. Apply the follow-up
  commit per docs/internal/release-plans/v2.16.0/maintainer-gate-testing.md
  Hand-Off Back to Claude section.
```

---

## When You Are Done (Codex)

1. Save this document with all blocks filled in (the maintainer's editor handles the save)
2. Print the "Consolidated Results Block" to the chat output for visibility
3. Print this exact phrase:

   ```
   GATE testing complete. Maintainer: copy the Consolidated Results Block
   from maintainer-gate-testing-codex.md and paste it back to Claude Code.
   Recommended Option: <A | B | C | F>.
   ```

4. Do NOT run any follow-up actions (no commits; no rebase; no merge). Hand off to Claude.

---

## Cross-References

- Human-runnable companion: [`maintainer-gate-testing.md`](./maintainer-gate-testing.md) (use that if you prefer human-driven step-by-step)
- Master plan D30 (single-tool user assumption + dispatch skill strategy): [`plan_v2.16.0.md`](./plan_v2.16.0.md)
- Subagents integration plan Phase 2 Task 9 (GATE definitions): [`subagents-integration-plan.md`](./subagents-integration-plan.md)
- Canonical samples for output-shape comparison: [`../../../library/sub-agent-samples/README.md`](../../../library/sub-agent-samples/README.md)
- Release runbook conductor reads at invocation: [`../../../docs/contributing/release-runbook.md`](../../../docs/contributing/release-runbook.md)
- Phase 0 review closure (G1 attestation reference): commit `9cb81af`
- Spike branch HEAD: `feat/v2.16-astro-6-spike` at commit `69c61b8` (PR #147 DRAFT)
