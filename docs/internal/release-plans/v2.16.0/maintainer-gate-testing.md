# v2.16.0 Maintainer Gate Testing Handoff

- **Status:** READY FOR MAINTAINER (created 2026-05-17 post-Phase-0 review closure at commit `9cb81af`; expanded 2026-05-17 with step-by-step instructions + spike-state context)
- **Audience:** Maintainer (you) validating GATE B + GATE C before v2.16.0 tag
- **Scope:** Cross-client dispatch skill testing on at least one non-Claude AI client
- **Cannot be done by Claude Code:** these tests require a different AI client. Claude Code's own dispatch path is already verified.
- **Estimated total time:** 60-90 minutes (45 min GATE B + 30-45 min GATE C; parallel-able with other v2.16 ship prep)
- **Current spike state:** `feat/v2.16-astro-6-spike` branch at commit `69c61b8`; PR #147 DRAFT and CI green; can run tests against this branch before merge OR against main after merge

---

## Quick Start (TL;DR)

You will run dispatch skills on a non-Claude AI client (Codex CLI recommended; Cursor, Windsurf, Copilot, or Gemini CLI also work) and compare the output against the canonical samples I produced from Claude Code. If the outputs match in shape and quality, GATE B + GATE C PASS and the dispatch skills are RATIFIED for v2.16.0. If they fail, we apply the fallback paths documented in master plan D30 (remove some or all dispatch skills from the v2.16 ship slate).

There are 4 tests total: 3 for GATE B (one per non-conductor dispatch skill), 1 for GATE C (conductor dispatch + chain composition). Each has explicit step-by-step instructions below.

When you finish, fill in the [Results Template](#results-template) section IN THIS FILE and tell me "GATE tests complete, see results template" - I will then apply the correct follow-up commits based on what passed and failed.

---

## What You Are Testing and Why

### Context

v2.16.0 ships 4 sub-agents at `subagents/pm-{critic, skill-auditor, changelog-curator, release-conductor}.md`. These are Claude Code plugin sub-agents that run natively in Claude Code's plugin runtime. They WORK on Claude Code already (verified by 12 library samples I produced + 8 spike commits + CI green).

To extend the same intent to non-Claude AI clients, v2.16.0 also ships 4 **dispatch skills** at `skills/utility-pm-{role}/`. Each dispatch skill:

1. Detects which AI client is invoking it
2. On Claude Code: invokes the native sub-agent
3. On any other client: reads `subagents/pm-{role}.md` and executes the system prompt body INLINE in the current context window

The Claude Code path is already known to work. The non-Claude path is the **mechanism we cannot verify from inside Claude Code**.

### What the dispatch mechanism assumes

The dispatch skill SKILL.md tells the AI to "read this file and execute its system prompt as your operating instructions." This depends on:

1. The AI client can read a file path provided in instructions (universal capability)
2. The AI client treats the read file's content as operating instructions for the turn (most clients do; not guaranteed)
3. The AI client follows step-by-step procedural instructions reliably (depends on model quality + client framing)
4. For the conductor: the AI can read multiple files and inline multiple sub-agent flows in a single context (the most demanding case; tests context budget + composition handling)

GATE B validates assumptions 1-3 across the 3 simpler dispatch skills.
GATE C validates assumption 4 (the conductor's "reference + execute inline" chain composition pattern).

### What happens if a gate fails

- **GATE B PASS:** RATIFY all 3 non-conductor dispatch skills in v2.16.0. Remove EXPERIMENTAL caveats. Update master plan D30 status.
- **GATE B PARTIAL:** RATIFY the dispatch skills that worked; document which clients are unsupported.
- **GATE B FAIL on all clients:** Apply Option F fallback per D30. Remove all 4 dispatch skills from v2.16. Document Claude-Code-only labeling.
- **GATE C PASS:** RATIFY conductor dispatch skill. Remove EXPERIMENTAL caveat from `utility-pm-release-conductor/SKILL.md`.
- **GATE C FAIL:** Apply D-revised fallback. Remove ONLY the conductor dispatch skill (`skills/utility-pm-release-conductor/`); the other 3 stay.

Each fallback is a small follow-up commit. I will execute it after you tell me the outcomes.

---

## Before You Start (Pre-Flight Checklist)

Step through this once before starting Test 1. About 10 minutes.

### Step 1: Verify spike branch state

In a terminal that has node + npm on PATH (your usual dev terminal works; my Claude Code shells don't):

```bash
cd E:/Projects/product-on-purpose/pm-skills
git fetch origin
git checkout feat/v2.16-astro-6-spike
git log --oneline -1
```

**Expected output:** the latest commit hash starts with `69c61b8` and message is `fix(v2.16.0-codex-review): address 6 codex adversarial review findings`. If you see a different commit, the branch has moved since this doc was written - probably fine but note the actual SHA in the results template.

### Step 2: Pick your non-Claude client

Recommended priority order (test the first one; second one is optional belt-and-suspenders):

1. **Codex CLI** - closest to Claude Code; same agentskills.io ecosystem; best chance of clean PASS
2. **Cursor** - widely used; runs in a workspace context; supports reading repo files natively
3. **Windsurf** - similar to Cursor
4. **Copilot CLI** - newer; less mature plugin support
5. **Gemini CLI** - newer; smaller user base

You only need ONE client to PASS the tests for the dispatch skills to RATIFY. Testing two clients is optional but gives stronger evidence.

If you do not have any non-Claude client installed and configured, install one before continuing. The rest of this doc assumes you have a non-Claude AI client open with a terminal-style chat interface and access to the pm-skills repo.

### Step 3: Open the canonical samples for comparison

In Claude Code OR your file explorer, open these 4 files - you will compare your non-Claude test outputs against them:

- `library/sub-agent-samples/pm-critic/sample_pm-critic_brainshelf_prd-review.md` (GATE B Test 1 reference)
- `library/sub-agent-samples/pm-skill-auditor/sample_pm-skill-auditor_brainshelf_pre-release.md` (GATE B Test 2 reference)
- `library/sub-agent-samples/pm-changelog-curator/sample_pm-changelog-curator_brainshelf_minor-release.md` (GATE B Test 3 reference)
- `library/sub-agent-samples/pm-release-conductor/sample_pm-release-conductor_workbench_chained-run.md` (GATE C reference)

These show the EXPECTED OUTPUT SHAPE from each dispatch skill. Your non-Claude test outputs do not need to be identical to these (different AI, different reasoning paths) but they should be STRUCTURALLY similar: same severity grammar, same layered envelope (full content + Status Summary prose + Status YAML), same approach to refusal protocols.

### Step 4: Open a results-tracking buffer

Easiest: keep THIS document open in an editor. Scroll to the [Results Template](#results-template) section at the bottom; you will fill in the table cells as you go.

Alternatively: a scratchpad in your favorite notes app, copy-paste into the template at the end.

### Step 5: Confirm the test artifact exists

```bash
ls library/skill-output-samples/deliver-prd/sample_deliver-prd_brainshelf_resurface.md
```

**Expected output:** the file path echoes back. If "no such file", check your branch is correct (Step 1).

You are now ready to run the tests.

---

## GATE B Walk-Through (3 tests, 30-45 min)

### GATE B Test 1: pm-critic dispatch

**Goal:** Confirm the dispatch skill can read the canonical pm-critic system prompt and execute an adversarial review of a PM artifact, producing layered output.

#### Step-by-step

1. **Open your non-Claude AI client.** Use the client you chose in Pre-Flight Step 2.

2. **Confirm the client can see the pm-skills repo.** Some clients (Cursor, Windsurf) require you to open the repo folder as the workspace. Some clients (Codex CLI, Copilot CLI) work from the current working directory of the terminal.

3. **Issue this prompt to the AI:**

   ```
   /utility-pm-critic library/skill-output-samples/deliver-prd/sample_deliver-prd_brainshelf_resurface.md
   ```

   If your client does NOT support slash commands (some don't), use this fallback:

   ```
   Use the pm-skills utility-pm-critic skill at skills/utility-pm-critic/SKILL.md
   to review the Brainshelf PRD sample at
   library/skill-output-samples/deliver-prd/sample_deliver-prd_brainshelf_resurface.md
   ```

4. **Wait for the AI to respond.** Expect 30-90 seconds depending on client + model.

5. **Watch for runtime detection signal early in output.** The first few sentences of the AI's response should indicate it has detected it is NOT running in Claude Code and is taking the non-Claude branch (reading subagents/pm-critic.md). Example phrasings:
   - "I am not running in Claude Code, so I will read the canonical pm-critic definition..."
   - "Detected: non-Claude runtime. Reading subagents/pm-critic.md..."
   - "Per the dispatch skill's non-Claude branch: I will execute the pm-critic system prompt inline..."

   If the AI just produces a generic review without referencing the dispatch mechanism, that is a FAIL on runtime detection.

6. **Verify the output has the 3-section layered envelope** per master plan D26:

   - **Section 1: Full findings report** - headings like `# pm-critic findings: ...`, sub-sections `## P0 findings`, `## P1 findings`, etc. Each finding has Location / Issue / Why it matters / Fix structure.
   - **Section 2: Status Summary** (prose) - a `## Status Summary` heading followed by 1-2 plain-English paragraphs summarizing what was found.
   - **Section 3: Status YAML** (machine-readable) - a `## Status` heading followed by a YAML code block with fields like `status:`, `p0_count:`, `p1_count:`, etc.

7. **Compare against the canonical sample.** Open `library/sub-agent-samples/pm-critic/sample_pm-critic_brainshelf_prd-review.md` side-by-side. The canonical sample has 7 findings (1 P0, 3 P1, 2 P2, 1 P3). Your test output may have a different count (different AI, different reasoning), but should be IN THE SAME BALLPARK (between 3 and 12 findings; not zero; not 30).

8. **Record the result.** In the [Results Template](#results-template) below, fill in the GATE B Test 1 row for your client.

#### What counts as PASS

All of the following hold:

- AI detected non-Claude runtime and explicitly referenced reading subagents/pm-critic.md
- Output has all 3 sections of the layered envelope (Findings + Status Summary + Status YAML)
- Findings use P0/P1/P2/P3 severity grammar
- Every finding has a concrete fix suggestion (not just "this is unclear")
- Total finding count is plausible (3-12 findings; not zero; not absurd)
- AI consulted at least `skills/deliver-prd/SKILL.md` for the contract (mentioned in Status Summary or in the findings reasoning)

#### What counts as FAIL

Any of the following:

- AI ignores the dispatch skill and produces a generic review (no envelope)
- AI cannot read `subagents/pm-critic.md` (file access permission issue)
- AI hallucinates standards docs that don't exist
- AI refuses outright with "I cannot do this"
- Zero findings reported (the artifact has real issues; reporting zero means the AI hallucinated)
- Context budget exhausts before producing complete output
- Output omits Section 2 or Section 3 of the envelope

#### If Test 1 FAILS

Do NOT continue to Test 2 yet. Three options:

A. **Try a different non-Claude client** (Cursor instead of Codex CLI, etc.). The dispatch mechanism may work on one client and not another; this is exactly what GATE B is designed to surface.

B. **Skip GATE B entirely** and tell me "GATE B failed on [client]; Option F fallback please." I will apply Option F (remove all 4 dispatch skills from v2.16; ship Claude-Code-only labeling).

C. **Debug the failure first.** Common causes: the AI client lacks file-system access; the prompt phrasing did not invoke the dispatch skill; the slash-command syntax differs on this client. Try the fallback prompt phrasing from Step 3.

### GATE B Test 2: pm-skill-auditor dispatch

**Goal:** Confirm the dispatch skill can execute the auditor's 4-step audit flow inline, including Bash invocations of validator scripts.

#### Step-by-step

1. **Same non-Claude client as Test 1.** Stay in the same session if possible; restart if context is full.

2. **Confirm Bash availability.** The auditor needs to execute `bash scripts/pre-tag-validate.sh` (or `pwsh scripts/pre-tag-validate.ps1` on Windows). Some non-Claude clients have restricted shell access. Quickly verify by asking the AI:

   ```
   Can you execute bash or pwsh shell commands in this repo? Run: ls scripts/pre-tag-validate.sh
   ```

   If the AI says "no shell access" or returns an error, this test will FAIL on assumption 4 of the dispatch mechanism. Note that in the results template and move to Test 3.

3. **Issue this prompt to the AI:**

   ```
   /utility-pm-skill-auditor --scope full
   ```

   Or fallback:

   ```
   Use the pm-skills utility-pm-skill-auditor skill at
   skills/utility-pm-skill-auditor/SKILL.md to run a full repo governance
   audit. Use --scope full.
   ```

4. **Wait for the AI to respond.** This one is slower than Test 1 because the auditor runs validators (1-3 minutes typical).

5. **Verify the 4-step flow happened:**

   - Step 1: AI invoked validators via Bash (look for shell command output in the response)
   - Step 2: AI ran cross-cutting checks (it should mention the catalog at `docs/internal/release-plans/v2.16.0/spec_pm-skill-auditor.md`)
   - Step 3: AI re-derived aggregate counters from filesystem and compared to declared (look for a counter audit table)
   - Step 4: AI emitted the 3-section layered output

6. **Confirm validator results.** The "Validator results" section in the output should show all enforcing validators PASS at HEAD `69c61b8` (the spike branch). If any FAIL is reported, that may be a real finding worth investigating (capture it in the results template).

7. **Confirm aggregate counter audit.** The auditor should report:
   - Total skills: 59 declared, 59 derived (MATCH)
   - Phase skills: 26 (MATCH)
   - Foundation skills: 8 (MATCH)
   - Utility skills: 10 (MATCH - was 6 at v2.15.x; +4 dispatch skills in v2.16)
   - Tool skills: 15 (MATCH)
   - Sub-agents: 4 (MATCH)

8. **Record the result.** Fill in the GATE B Test 2 row.

#### What counts as PASS / FAIL

Same envelope criteria as Test 1, plus:

- **PASS:** Bash invocations succeeded; counter audit ran; all validators reported as PASS at HEAD; layered output present.
- **FAIL:** Bash access denied; counter audit skipped or missing; validators not invoked; envelope incomplete.

### GATE B Test 3: pm-changelog-curator dispatch

**Goal:** Confirm the dispatch skill can run git log + classify commits + draft CHANGELOG entries applying CLAUDE.md hygiene rules.

#### Step-by-step

1. **Same non-Claude client.**

2. **Issue this prompt to the AI:**

   ```
   /utility-pm-changelog-curator --since-tag v2.15.2 --target-version v2.16.0
   ```

   Or fallback:

   ```
   Use the pm-skills utility-pm-changelog-curator skill at
   skills/utility-pm-changelog-curator/SKILL.md to draft CHANGELOG entries
   for v2.16.0 since the v2.15.2 tag.
   ```

3. **Verify the AI ran git log.** Look for git command output or "Reading git log from v2.15.2 to HEAD" in the response.

4. **Verify CLAUDE.md hygiene rules were read.** The output should reference CLAUDE.md's "CHANGELOG Best Practices" section or mention the hygiene rules explicitly.

5. **Spot-check the draft against hygiene rules:**

   - **No em-dashes.** Search the draft output for the em-dash character (U+2014). Should be zero hits.
   - **No internal-notes references.** Search for `_NOTES/`, `AGENTS/SESSION-LOG/`, `docs/internal/efforts/`, `docs/internal/release-plans/`. Should be zero hits in the draft entries.
   - **No Claude attribution trailers.** Search for "Co-Authored-By: Claude" or "Generated with Claude". Should be zero hits.
   - **Keep-a-Changelog sections.** Should have at least Added + Changed sections; Security + Fixed + Known Limitations likely.

6. **Compare against the canonical CHANGELOG entry on main.** The CHANGELOG.md file already has a v2.16.0 entry I drafted (at commit `5a1ad61`, refined at commit `92e1448`). Your test draft does not need to match it word-for-word but should cover the same MAJOR items: 4 sub-agents, 4 dispatch skills (EXPERIMENTAL caveat), G2.5 commit gate, subagents/ directory rename, Astro 6 upgrade, Dependabot closures, validator extension.

7. **Test the dirty-tree refusal protocol.** Make a small uncommitted change (`echo "test" >> /tmp/throwaway.txt` or edit a file without saving), then re-run the dispatch. The AI should REFUSE with a message about dirty working tree unless `--committed-only` is passed. Revert the change after this sub-test.

8. **Record the result.** Fill in the GATE B Test 3 row.

#### What counts as PASS / FAIL

Same envelope criteria, plus:

- **PASS:** git log ran; CLAUDE.md hygiene rules applied; output is em-dash-free + internal-notes-free + Claude-attribution-trailer-free; dirty-tree refusal fires.
- **FAIL:** Hygiene rules violated; output references internal paths; em-dashes present; dirty-tree refusal does not fire OR fires when tree is clean.

---

## GATE B Outcome Decision

After running Tests 1-3, look at your overall GATE B results:

- **All 3 PASS on at least one client** -> GATE B PASS. Proceed to GATE C.
- **Mixed pass/fail** -> GATE B PARTIAL. Note which dispatch skills work on which clients. You can still proceed to GATE C if the conductor's children (auditor + curator) PASSED.
- **All 3 FAIL on every client tested** -> GATE B FAIL. Option F fallback. STOP. Tell me; I will apply Option F (remove all 4 dispatch skills from v2.16).

---

## GATE C Walk-Through (1 test, 30-45 min)

**Skip GATE C entirely if GATE B FAILED on all clients.** Option F removes the conductor dispatch skill along with the other 3.

If GATE B PASSED (any client), proceed.

### GATE C Test: conductor dispatch dry-run

**Goal:** Confirm the conductor's "reference + execute inline" pattern works for chain composition on a non-Claude client. The conductor must inline the auditor (at G0 + G2.5) and the curator (at G2) within its own context window.

This is the most demanding test in this document because the conductor reads + inlines 4 files (its own prompt + runbook + auditor + curator) and produces 6+ gate outputs in sequence.

#### Step-by-step

1. **Same non-Claude client that PASSED GATE B Tests 1-3.** If GATE B was PARTIAL, use a client that passed at least Tests 1 + 2 + 3 individually.

2. **Start a fresh chat session.** The conductor flow is context-budget-heavy; do not run it in a session that already has GATE B Test 3 in context. Open a new tab / new session / clear-context whatever your client supports.

3. **Issue this prompt:**

   ```
   /utility-pm-release-conductor v2.16.0 --dry-run
   ```

   Or fallback:

   ```
   Use the pm-skills utility-pm-release-conductor skill at
   skills/utility-pm-release-conductor/SKILL.md to walk a dry-run release
   for v2.16.0. Read the canonical runbook at docs/contributing/release-runbook.md
   and the inlined sub-agents at subagents/pm-skill-auditor.md and
   subagents/pm-changelog-curator.md as referenced by the dispatch skill.
   ```

4. **Confirm setup phase.** The AI should explicitly say it is reading the 4 files (conductor prompt + runbook + auditor + curator) before starting Gate G0.

5. **Walk through each gate, confirming "yes" when prompted.** The conductor pauses at each gate boundary:

   - **G0 (Pre-tag readiness)**: AI inlines the auditor and produces audit findings; reports `status: pass` or `status: fail`. Confirm to proceed.
   - **G1 (Adversarial review)**: AI asks you to attest. Say "yes; Phase 0 review completed 2026-05-17 at commit 9cb81af with 7 findings closed."
   - **G2 (Version bump + CHANGELOG prep)**: AI inlines the curator and produces a CHANGELOG draft. Confirm to proceed.
   - **G2.5 (Commit + re-verify)**: AI simulates commit and re-inlines the auditor against the new HEAD. Reports `status: pass` again. Confirm to proceed.
   - **G3 (Tag + push)**: AI presents a tag message and "ship it" prompt. Since this is `--dry-run`, the AI should SKIP the actual `git tag` + `git push` commands. Verify it explicitly says "DRY-RUN: skipping tag operation."
   - **G4 (Post-tag hygiene)**: AI simulates each P0/P1/P2 sub-check.

6. **At end of flow, verify the final output is "NOT RELEASABLE - dry run"** (not "Release complete"). The conductor must explicitly emit dry-run framing.

7. **Verify context budget held.** The full flow should complete in one response (or one chat session if your client paginates). If the AI truncates mid-G2 or mid-G2.5 because of context limits, that is a CRITICAL FAIL on the context-budget axis - this is the most likely fail mode for GATE C on smaller-context clients.

8. **Verify no-bypass behavior.** Try saying "skip G1" or "use --skip-gates" mid-flow. The conductor should REFUSE: "--skip-gates is not supported in v2.16; please address the gate or end the dry-run."

9. **Record the result.** Fill in the GATE C row.

#### What counts as PASS / FAIL

PASS:

- All 6 gates walked in sequence with explicit confirmation pauses
- Auditor inlined correctly at G0 and G2.5 (both produced layered output)
- Curator inlined correctly at G2 (produced CHANGELOG draft)
- Context budget held to end of flow
- Dry-run framing correctly emitted at G3 and at end
- No-bypass refusal worked

FAIL on any of:

- Context budget exhausted mid-flow
- AI attempted actual `git tag` or `git push` despite `--dry-run`
- Inlined auditor or curator output was malformed (missing Status YAML, missing layered envelope)
- AI accepted a bypass attempt and skipped a gate
- Conductor tagged a SHA other than what G2.5 captured
- AI hallucinated gate definitions instead of reading the runbook

---

## Results Template

Fill this in as you go. Save the doc when done.

### GATE B Results

Recorded on: `_FILL IN YYYY-MM-DD_`

| Client | Test 1 pm-critic | Test 2 pm-skill-auditor | Test 3 pm-changelog-curator | Overall |
|---|---|---|---|---|
| (e.g., Codex CLI) | PASS / FAIL / N/A | PASS / FAIL / N/A | PASS / FAIL / N/A | PASS / PARTIAL / FAIL |
| (second client if tested) | ... | ... | ... | ... |

**GATE B status:** `_FILL IN: PASS / PARTIAL / FAIL_`

**Notes:** `_FILL IN: anything notable about the tests; surprise findings; client-specific quirks_`

### GATE C Results

Recorded on: `_FILL IN YYYY-MM-DD_`

| Client | Conductor dry-run | Context budget held? | Inlined auditor PASS? | Inlined curator PASS? |
|---|---|---|---|---|
| (e.g., Codex CLI) | PASS / FAIL | YES / NO | YES / NO | YES / NO |

**GATE C status:** `_FILL IN: PASS / FAIL_`

**Notes:** `_FILL IN: anything notable; failure-mode specifics if failed_`

### Overall outcome

Based on GATE B + GATE C results, the v2.16.0 ship slate should be:

- `[ ]` **Option A (all PASS):** RATIFY all 4 dispatch skills. Remove EXPERIMENTAL caveats from all 4 SKILL.md files. Update master plan D30 to PASSED.
- `[ ]` **Option B (D-revised; GATE B PASS, GATE C FAIL):** RATIFY 3 dispatch skills (pm-critic, pm-skill-auditor, pm-changelog-curator). REMOVE `skills/utility-pm-release-conductor/` directory. Update AGENTS.md, runtime-components.md, CHANGELOG entry accordingly. Conductor stays Claude-Code-only.
- `[ ]` **Option C (PARTIAL):** RATIFY only the dispatch skills that PASSED across all clients tested. Keep EXPERIMENTAL caveat on the partial ones; document specific client unsupport in runtime-components.md.
- `[ ]` **Option F (all FAIL):** REMOVE all 4 dispatch skills from v2.16. `git rm -r skills/utility-pm-{critic,skill-auditor,changelog-curator,release-conductor}/`. Update AGENTS.md, runtime-components.md, CHANGELOG accordingly. Document Claude-Code-only labeling.

**Maintainer selection:** `_FILL IN: check one of the above options_`

---

## Hand-Off Back to Claude

When the Results Template above is filled in:

1. Save this file
2. Open Claude Code
3. Tell me one of these:

   - **"GATE tests complete; see maintainer-gate-testing.md Results Template; apply Option A"** (all PASS path)
   - **"GATE tests complete; apply Option B"** (D-revised; 3 of 4 dispatch skills RATIFY)
   - **"GATE tests complete; apply Option C with details in the doc"** (partial; I will read the doc for specifics)
   - **"GATE tests complete; apply Option F"** (all dispatch skills removed)

4. I will then:
   - Read your Results Template
   - Apply the correct follow-up commit (RATIFY or REMOVE actions per the option you chose)
   - Update master plan D30 status to reflect the outcome
   - Update CHANGELOG, Release notes, AGENTS.md, runtime-components.md as needed
   - Report back with the commit SHAs and confirm v2.16.0 is ready for the conductor's live tag flow

The follow-up commit will be in this same spike branch (`feat/v2.16-astro-6-spike`) so it lands together with the doc-stack work when PR #147 merges to main.

---

## Failure Recovery

### "AI client cannot access the repo files"

- For Cursor/Windsurf: open the pm-skills folder as the workspace, not just a single file
- For Codex CLI: confirm you are in the repo root with `pwd`
- For Copilot CLI/Gemini CLI: check if the client has a file-system permission setting; enable it
- If still no access: the dispatch mechanism cannot work on this client. Note in results template and try a different client.

### "AI cannot execute Bash/pwsh"

- Codex CLI: supports shell execution natively in approval-required mode
- Cursor/Windsurf: may require enabling shell tool in settings
- Copilot CLI: limited shell support; may FAIL Test 2 (auditor) on this dimension
- If shell access is impossible: Test 1 (pm-critic) and Test 3 (pm-changelog-curator) may still PASS because they only need Read access. Test 2 (pm-skill-auditor) will FAIL. Note in results template.

### "AI keeps producing output without the layered envelope"

- Verify the AI actually READ `subagents/pm-{role}.md`. Ask: "Did you read the canonical sub-agent definition? Quote the first sentence of the system prompt body."
- If the AI says it did not read the file: the dispatch mechanism failed at step 1. Re-issue with the fallback prompt phrasing.
- If the AI read the file but did not produce the layered envelope: the AI's instruction-following is too weak for this dispatch pattern. Note in results template; this is a client-quality issue, not a dispatch-skill issue.

### "Context budget exhausts during GATE C"

- Try a client with larger context (Codex CLI with `--context-large` or equivalent; Gemini CLI has 1M context)
- Try in a completely fresh session with no prior context
- If context exhausts on every client tested: this is GATE C FAIL on the context-budget axis. Apply D-revised fallback (Option B).

### "I am not sure if the output PASSED or FAILED"

- Compare against the canonical samples in `library/sub-agent-samples/`
- Save the AI's full output as `_NOTES/gate-test-output-{client}-{test}-{date}.md` (gitignored)
- Tell me "GATE B Test [N] on [client]: uncertain; output saved at [path]" - I will read it and make the call

---

## Cross-References

- Master plan D30 (single-tool user assumption + dispatch skill strategy): [`plan_v2.16.0.md`](./plan_v2.16.0.md)
- Subagents integration plan Phase 2 Task 9 (GATE A/B/C definitions): [`subagents-integration-plan.md`](./subagents-integration-plan.md)
- Conductor dispatch SKILL.md with EXPERIMENTAL caveat: [`../../../skills/utility-pm-release-conductor/SKILL.md`](../../../skills/utility-pm-release-conductor/SKILL.md)
- Canonical samples for output-shape comparison: [`../../../library/sub-agent-samples/README.md`](../../../library/sub-agent-samples/README.md)
- Release runbook conductor reads at invocation: [`../../../docs/contributing/release-runbook.md`](../../../docs/contributing/release-runbook.md)
- Phase 0 review closure (G1 attestation reference): commit `9cb81af` ([`docs/internal/release-plans/v2.16.0/`](./))
- Spike branch HEAD: `feat/v2.16-astro-6-spike` at commit `69c61b8` (PR #147 DRAFT)
