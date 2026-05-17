---
title: "pm-release-conductor sample: chained dry-run for v2.16.0 (Workbench thread)"
description: "pm-release-conductor dry-run walking all 6 gates (G0 Pre-tag readiness, G1 Adversarial review, G2 Version bump + CHANGELOG prep, G2.5 Commit + re-verify, G3 Tag + push, G4 Post-tag hygiene) with chain composition to pm-skill-auditor at G0 + G2.5 and pm-changelog-curator at G2. Sample artifact demonstrating the 2-level chain depth (D14), G2.5 commit gate (D22), G4 P0 blocking power (D23), and the layered Status envelope handoff (D26)."
artifact: pm-release-conductor-run
version: "1.0"
repo_version: "2.16.0-dev"
agent_version: "1.0.0"
created: 2026-05-17
status: sample
thread: workbench
context: pm-release-conductor walking the 6-gate flow in --dry-run mode for v2.16.0 pre-flight rehearsal
---

## Scenario

Priya M. is preparing to ship v2.16.0. Before the live release, she runs `/release v2.16.0 --dry-run` to rehearse the full 6-gate flow with chain composition. The dry-run walks all gates but skips the actual `git tag` and `git push` operations at G3, emitting "NOT RELEASABLE - dry run" instead of "Release complete."

The dry-run confirms: validators are green, the Phase 0 review is logged, the CHANGELOG curator produces a clean draft, G2.5 commit gate works correctly, and G4 post-tag sub-checks identify expected reminders. Priya gains confidence that the live release on the next invocation will pass cleanly.

## Output

# pm-release-conductor: v2.16.0 (--dry-run)

**Target:** v2.16.0 (semver valid)
**Branch:** main (default)
**Mode:** DRY-RUN (skips actual tag + push at G3)
**Master plan:** `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md` (found; status READY)

---

## Gate G0: Pre-Tag Readiness

**Sub-checks:**

1. **Working tree clean:** PASS (`git status --porcelain` empty)
2. **Pre-tag validator bundle green:** PASS (`bash scripts/pre-tag-validate.sh` exit 0; 16 validators PASS)
3. **Em-dash sweep clean:** PASS (`scripts/check-em-dashes` exit 0; 0 hits outside allowlist)
4. **Aggregate counters match declared:** PASS (declared counts in CONTEXT.md / AGENTS.md / README.md reconciled to filesystem-derived counts as part of pre-tag artifact pass)
5. **Cross-cutting audit clean:** PASS (chained to `pm-skill-auditor`; see chained output below)
6. **Required files exist:** PASS (master plan + release notes draft present)

### Chained: pm-skill-auditor at G0 (Status YAML excerpt)

```yaml
status: pass
p0_count: 0
p1_count: 0
p2_count: 1
p3_count: 0
counters_match: true
validators_pass: true
scope: full
refusal_reason: null
```

P2 finding from auditor: cosmetic description overlap between dispatch skills (acknowledged; v2.17 cleanup). Surfaced to maintainer but does not block G0.

**Gate status:** PASS

Proceed to G1? Confirm with "yes" or address findings.

> User: yes

---

## Gate G1: Adversarial Review Status

**Sub-checks:**

1. **Phase 0 review complete:** WAITING-FOR-CONFIRMATION (maintainer attestation required)
2. **Findings dispositioned:** WAITING-FOR-CONFIRMATION
3. **Review artifact:** found at `docs/internal/release-plans/v2.16.0/review/codex_2026-05-16.md` (informational; 14 findings; 11 closed, 3 deferred to v2.17 with rationale)

Maintainer confirmation required: was the Phase 0 Adversarial Review run against the current release-prep state, and are all P0 findings closed?

> User: yes; all P0 closed; 3 P1 deferred to v2.17 with rationale documented in the review artifact

**Gate status:** PASS

Proceed to G2? Confirm with "yes" or address findings.

> User: yes

---

## Gate G2: Version Bump + CHANGELOG Prep

**Sub-checks (each edit proposed; maintainer confirms):**

1. **plugin.json version field:** PROPOSED `.claude-plugin/plugin.json` `"version": "2.15.2"` -> `"2.16.0"`. Confirm? Yes. Applied.
2. **Marketplace manifest version:** PROPOSED `.claude-plugin/marketplace.json` `"version": "2.15.2"` -> `"2.16.0"`. Confirm? Yes. Applied.
3. **CHANGELOG.md header:** CHAINING to `pm-changelog-curator` for draft. See chained output below. Maintainer reviews + edits + applies.
4. **docs/changelog mirror:** PROPOSED update to match. Confirm? Yes. Applied.
5. **README badges:** PROPOSED version badges in `README.md` updated to v2.16.0. Confirm? Yes. Applied.
6. **Release plan status:** PROPOSED `plan_v2.16.0.md` status block -> `SHIPPED 2026-MM-DD`. Confirm? Yes. Applied (date placeholder until G3 actual tag).
7. **Release notes quality check:** READ `docs/releases/Release_v2.16.0.md`. Maintainer confirms quality? Yes.
8. **Hidden-comment leak check:** PASS (grep for `<!-- justification:` in CHANGELOG.md returns 0 hits; curator's debug comments stripped during maintainer edit)

### Chained: pm-changelog-curator at G2 (Status YAML excerpt)

```yaml
status: draft
target_version: v2.16.0
since_tag: v2.15.2
commits_processed: 50
entries_added: 5
entries_changed: 2
entries_fixed: 1
entries_security: 2
dirty_tree_warning: false
refusal_reason: null
```

Maintainer received the curator's full draft, edited the framing of the "Known Limitations" section (GATE B pending wording), stripped justification comments, and applied to CHANGELOG.md.

**Gate status:** PASS

Proceed to G2.5? Confirm with "yes" or address findings.

> User: yes

---

## Gate G2.5: Commit Release-Prep + Re-Verify

**Sub-checks:**

1. **Working tree contains G2 edits:** PASS (`.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `CHANGELOG.md`, `docs/changelog.md`, `README.md`, `docs/internal/release-plans/v2.16.0/plan_v2.16.0.md`, `docs/releases/Release_v2.16.0.md`)
2. **Stage G2 edits:** PASS (`git add` the 7 specific files; staged contents match expected)
3. **Commit with release-prep message:** PROPOSED `chore(v2.16.0): release-prep edits for v2.16.0`. Confirm? Yes. Committed.
4. **Working tree clean post-commit:** PASS (`git status --porcelain` empty)
5. **Re-run G0 sub-checks against new HEAD:** CHAINING to pm-skill-auditor again (re-verification chain). All sub-checks PASS on new HEAD. p0_count: 0.
6. **CI green on new HEAD:** DRY-RUN SKIP - in live mode, `git push origin main` + wait for CI; in dry-run, simulated PASS.
7. **Cross-reference commit SHA captured:** `{new-sha}` (simulated; in live mode this is the actual commit SHA from sub-check 3)

**Gate status:** PASS

Proceed to G3? Confirm with "yes" or address findings.

> User: yes

---

## Gate G3: Tag + Push

**Sub-checks:**

1. **Tag target SHA confirmed:** `{g2.5-captured-sha}` (the commit containing release-prep edits)
2. **Tag message authored:** PROPOSED multi-paragraph annotated message (title + summary + headline changes; em-dash-free; no Claude attribution trailer). Conductor presents draft.
3. **Maintainer approves message:** Yes (after minor wording edit on Headline Changes section).
4. **Tag created:** DRY-RUN SKIP - in live mode, `git tag -a v2.16.0 -m '<message>' {sha}`; in dry-run, simulated.
5. **Push tag:** DRY-RUN SKIP - in live mode, `git push origin v2.16.0` with maintainer "ship it" confirmation; in dry-run, simulated.
6. **CI re-runs on tag:** DRY-RUN SKIP.

**Gate status:** PASS (dry-run simulated)

Proceed to G4? Confirm with "yes" or address findings.

> User: yes

---

## Gate G4: Post-Tag Hygiene (DRY-RUN simulated)

**Sub-checks (each produces a P0/P1/P2 incident on failure per D23):**

1. **Plugin install path check (P0 on fail):** DRY-RUN SIMULATED PASS - in live mode, smoke-test plugin install from the new tag
2. **Marketplace registration (P1 on fail):** DRY-RUN SIMULATED PASS - in live mode, confirm marketplace listing resolves
3. **GitHub Pages rebuild (P1 on fail):** DRY-RUN SIMULATED PASS - in live mode, confirm doc-stack rebuild triggered
4. **GitHub Release UI body (P2 reminder):** REMINDER ISSUED - "After live tag, author the GitHub Release UI body at https://github.com/product-on-purpose/pm-skills/releases/tag/v2.16.0/edit. Suggested source: `docs/releases/Release_v2.16.0.md`."
5. **Next-cycle stub (P2 reminder):** REMINDER ISSUED - "Create `docs/internal/release-plans/v2.17.0/plan_v2.17.0.md` stub at the end of v2.16.0 cycle."
6. **Post-tag follow-up tasks logged (P2 reminder):** REMINDER ISSUED - "GATE B dispatch skill verification for non-Claude clients; capture results in v2.17 stub."

**Gate status:** PASS (no P0 incidents; all P0 sub-checks would-PASS in live mode based on dry-run simulation)

---

## NOT RELEASABLE - dry run: v2.16.0

This was a dry-run. No tag was created. No commits were pushed. No changes are live.

**Dry-run rehearsal result:** all 6 gates would PASS in live mode based on current state. No P0 blockers detected. 3 P2 reminders surfaced for post-tag follow-up.

**Recommended next step:** invoke `/release v2.16.0` (without `--dry-run`) when ready to ship live. The conductor walks the same flow and performs the actual tag + push at G3.

---

## Notes on This Sample

This sample demonstrates several discipline points:

1. **6 gates with explicit confirmation pauses.** Each gate ends with "Proceed to G{N+1}? Confirm with yes" prompting maintainer interaction.
2. **Chain composition at G0 and G2.** The conductor invokes `pm-skill-auditor` at G0 (Pre-tag readiness sub-check 5) and again at G2.5 (Re-verify sub-check 5). It invokes `pm-changelog-curator` at G2 (CHANGELOG prep sub-check 3). Both children return layered output per D26; the conductor parses the Status YAML for advancement decisions.
3. **G2.5 commit gate (D22).** Without G2.5, G3 could tag a HEAD that does NOT contain release-prep edits (the v2.13.1 broken-tag class of bug). G2.5 commits the G2 edits, re-runs G0, pushes for CI, and captures the SHA. G3 tags ONLY that SHA.
4. **G4 P0 blocking power (D23).** P0 sub-check failure (plugin install path broken) blocks the "Release complete" output. The dry-run simulates PASS but the real release would catch real P0 incidents.
5. **--dry-run mode** walks the full flow with explicit "NOT RELEASABLE" output and skipped tag + push operations at G3 + skipped live G4 sub-checks at G4.
6. **No bypass possible.** The conductor refused any prompt to skip a gate; the example above shows the maintainer answering "yes" at each gate prompt, but answering "no" would pause the conductor at that gate.

For the sample's role in v2.16.0: this is 1 of 3 thread-aligned samples for pm-release-conductor. The other 2 ship in Phase 6 Task 26 (brainshelf clean-run; storevine gate-failure with G0 aggregate-counter drift and maintainer recovery).
