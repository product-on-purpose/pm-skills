# Technical Decisions

## 2026-01-14: Project Initialization

**Status:** Accepted

**Context:**
New project initialized with agentic coding structure.

**Decision:**
Initialize with standard project structure including README, CHANGELOG, LICENSE, and AGENTS context files.

**Alternatives Considered:**
- Minimal structure (README only) . Rejected, insufficient for AI continuity
- Full open-source structure (with CONTRIBUTING, CODE_OF_CONDUCT) . Deferred until needed

**Consequences:**
- Consistent structure across all projects
- AI sessions can resume with full context
- May have unused files for simple projects (acceptable tradeoff)

---

## 2026-01-14: Apache 2.0 License Selection

**Status:** Accepted

**Context:**
Need to select an open source license for the pm-skills repository.

**Decision:**
Use Apache License 2.0 for the project.

**Alternatives Considered:**
- MIT License . Simpler but lacks patent grant
- Apache 2.0 . Includes explicit patent grant, aligns with agent skills ecosystem

**Consequences:**
- Explicit patent protection for contributors and users
- Aligns with anthropics/skills, openskills, n-skills ecosystem
- Requires attribution and noting modifications in derivative works

---

## 2026-01-14: PLANNING Folder Convention

**Status:** Accepted

**Context:**
Need a location for collaboration artifacts like plan reviews, drafts, and analysis documents that are working products of AI-human collaboration.

**Decision:**
Add `PLANNING/` folder to `AGENTS/claude/` structure for storing collaboration artifacts.

**Alternatives Considered:**
- Put in `(internal-notes)/` alongside source docs . Mixes working artifacts with reference docs
- Put alongside source (e.g., `plan-v1-review.md` next to `plan-v1.md`) . Clutters source folders
- Put in `AGENTS/claude/PLANNING/` . Keeps session artifacts together

**Consequences:**
- Clear separation of working documents from source documents
- All session-related artifacts in one place (SESSION-LOG/, PLANNING/)
- Easy to find and reference previous reviews/analysis

---

## 2026-01-28: Gitignore .claude/ in pm-skills-mcp

**Status:** Accepted

**Context:**
The pm-skills-mcp repository had personal Claude Code settings and skills tracked in git. These included `.claude/settings.json`, `.claude/commands/`, and `.claude/skills/` containing personal skills like `init-project`, `mcp-builder`, and `wrap-session`.

**Decision:**
Add `.claude/` to .gitignore and remove from tracking. Only `.claude/settings.local.json` was previously ignored; now the entire directory is excluded.

**Alternatives Considered:**
- Keep tracking `.claude/settings.json` as project config . Rejected, it's personal
- Track `.claude/` but add to `.npmignore` . Rejected, doesn't belong in git history either

**Consequences:**
- Personal Claude Code settings no longer pollute the npm package
- Each developer can have their own local configuration
- 40 files (~5000 lines) removed from tracking

---

## 2026-01-29: MCP Sync Automation . Validation-Only Approach

**Status:** Accepted

**Context:**
When a new skill is added to pm-skills, 8 manual steps are required to sync it to pm-skills-mcp (embed files, update READMEs, CHANGELOGs, commands, AGENTS.md). This risks drift and inconsistent documentation.

**Decision:**
Implement Validation-Only approach: CI validates sync status and fails with actionable checklist. Human follows checklist (~5 min/skill). No full automation.

**Alternatives Considered:**
- **Full Automation (~17 hours, ~760 LOC):** Auto-generate PRs with README updates, CHANGELOG entries, command files. Rejected due to:
  - Requires GitHub PAT for cross-repo PRs
  - Fragile README table parsing
  - High maintenance burden
  - Infrequent skill additions don't justify complexity
- **No Automation:** Rely on memory. Rejected . drift risk too high.

**Consequences:**
- ~2 hours implementation, ~75 lines of code
- No GitHub secrets or cross-repo auth needed
- `/scripts/` remains user-focused; automation lives in `/.github/scripts/`
- Clear upgrade path to full automation if needed later
- Manual effort: ~5 min per new skill

**Upgrade Trigger:** If adding 5+ skills/quarter, revisit full automation.

---

## 2026-02-14: Close B-01 as aligned on pinned refs

**Status:** Accepted

**Context:**
B-01 required end-to-end verification that pm-skills and pm-skills-mcp were aligned for the v2.1 contract (loader behavior, URI contract, docs truth, and release-note truth).

**Decision:**
Record B-01 as `closed-aligned` based on pinned evidence artifacts and command validation results in local delivery docs.

**Alternatives Considered:**
- Close with gaps (`closed-with-gaps`) . Rejected because no remaining alignment failures were found on pinned refs.

**Consequences:**
- Baseline assumptions for B-02/B-03/B-05 are now valid.
- B-01 no longer blocks release progression.

---

## 2026-02-14: Make validate-mcp-sync blocking by default

**Status:** Accepted

**Context:**
Observe-mode validation detected drift risk but still allowed merges. After B-01 alignment closure, release guardrails needed enforcement.

**Decision:**
Set `.github/workflows/validate-mcp-sync.yml` to use `block` mode by default while retaining manual override via `workflow_dispatch`.

**Alternatives Considered:**
- Keep observe as default indefinitely . Rejected due to silent drift risk.
- Hard-remove observe mode entirely . Rejected to preserve debugging flexibility.

**Consequences:**
- Pull requests can be blocked when pm-skills and pm-skills-mcp diverge.
- Release integrity improves with low operational overhead.

---

## 2026-05-03: Phase 0 release-state confirmation loop (extending v2.11.0 per-skill loop)

**Status:** Accepted and codified. Demonstrated in v2.12.0 release; codified in v2.13.0's `docs/internal/release-plans/v2.13.0/plan_v2.13_pre-release-checklist.md` (Phase 0 section explicitly enumerates per-strand AND release-state Phase 0 loops with convergence rules). Re-applied during v2.13.0 tag prep with PR.1 (per-strand) + PR.2 (release-state) + their resolution rounds.

**Context:**
The v2.11.0 cycle codified the Phase 0 Adversarial Review Loop for *per-skill* review: Codex adversarial review then resolution then re-run until findings stabilize below IMPORTANT severity. The v2.12.0 cycle exposed a gap in that codification. After both OKR skills (writer + grader) had passed their per-skill loops with convergence, the broader release state still contained drift that mechanical CI could not detect: untracked files with stale counts that were not yet wired into mkdocs nav; rendered-doc prose forms saying "38 AI agent skills" that fell outside the count-CI regex shape; per-phase counts in mermaid diagrams below the script's 10 min-threshold; version data accuracy in concept docs that required reading current SKILL.md frontmatter rather than writing from memory.

**Decision:**
pm-skills releases run TWO Phase 0 loops, not one. The per-skill loop on each new or modified skill remains the v2.11.0 codification. A second release-state loop runs on the FULL release stack (working tree) after the per-skill loops converge and before the tag. The release-state loop terminates per the same rule (findings stabilize below IMPORTANT severity).

**Alternatives Considered:**
- Single per-skill loop only . Rejected because it provably misses release-state defects (v2.12.0 release-state loop caught 9 distinct MEDIUM defects across 4 rounds that the per-skill loops did not surface).
- Skip release-state review for "small" releases . Rejected because v2.12.0's release-state defects were not small in aggregate impact; the homepage hero saying "38 skills" on a 40-skill landing page is a first-impression contradiction. There is no reliable in-advance signal for "this release is small enough to skip review."
- Make the count-CI script smarter to subsume the release-state loop's role . Partial answer; will be pursued in v2.13 CI refactoring. But adversarial review catches taxonomy and audit-trail issues that pattern-matching CI cannot. The two layers are complementary, not redundant.

**Consequences:**
- Release prep adds ~12 minutes of Codex compute (3-4 release-state rounds at ~3 min each). Bounded cost.
- Release-state defects that would otherwise ship are caught and fixed pre-tag. v2.12.0 caught 9 such defects.
- The release notes' Validation section now includes the release-state loop as a concrete artifact (per-round finding counts, resolution commit hashes, termination rationale).
- Codified in v2.13.0 at `docs/internal/release-plans/v2.13.0/plan_v2.13_pre-release-checklist.md`. The Phase 0 section explicitly enumerates per-strand AND release-state loops with convergence rules. Used in v2.13.0 tag prep as PR.1 (per-strand) + PR.2 (release-state).

---

## 2026-05-03: /ultrareview calibration for pm-skills releases

**Status:** Accepted (per user direction in v2.12.0 cycle).

**Context:**
v2.12.0 release prep planning included a `/ultrareview` step (multi-agent cloud review of the current branch). After running 4 rounds of release-state Codex adversarial review with convergence, the user observed that `/ultrareview` would be overkill for v2.12.0 specifically: the release was bounded doc reconciliation + count consistency, not a design-decision release where the chosen approach itself might be wrong.

**Decision:**
`/ultrareview` is appropriate for design-decision releases where the chosen approach itself might be wrong. It is overkill for doc-heavy release prep where the Phase 0 Codex loop and mechanical CI guards already cover the surface. Default suggestion behavior in pm-skills release planning: do not propose `/ultrareview` for releases whose theme is doc reconciliation, CI cleanup, count refresh, or other mechanically-verifiable bounded scope. Do propose `/ultrareview` for releases whose theme is new feature design where the design space is open and multi-perspective synthesis would change the outcome.

**Alternatives Considered:**
- Always run `/ultrareview` as belt-and-suspenders . Rejected. /ultrareview is billed cloud compute; running it on every release without a clear value hypothesis is paying for what cheap automation already proved. Past the v2.12.0 Phase 0 loop convergence, marginal additional review on bounded doc work has diminishing returns.
- Never run `/ultrareview` . Rejected. Design-decision releases (where multiple LLM perspectives could change the design) genuinely benefit from multi-agent synthesis.
- Decide case-by-case at release time without a default . Rejected because absence of default biases toward "always run for diligence" which the user explicitly does not want for the doc-heavy case.

**Consequences:**
- Release planning documents (`plan_vX.Y.Z.md` Status Snapshot) should mark `/ultrareview` as N/A by default for doc-heavy releases, with a one-sentence rationale that points back to this decision.
- Future feature-cycle releases (e.g., a v2.X.0 that adds a new skill family with open design questions) should explicitly include `/ultrareview` in the pre-release checklist.
- Codified in v2.12.0 plan_v2.12.0.md Status Snapshot row "/ultrareview on full release: N/A".

---

*Add new decisions above this line*
