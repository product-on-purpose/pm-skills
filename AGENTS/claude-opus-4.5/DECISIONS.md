# Technical Decisions

## 2026-01-14: Project Initialization

**Status:** Accepted

**Context:**
New project initialized with agentic coding structure.

**Decision:**
Initialize with standard project structure including README, CHANGELOG, LICENSE, and AGENTS context files.

**Alternatives Considered:**
- Minimal structure (README only) — Rejected, insufficient for AI continuity
- Full open-source structure (with CONTRIBUTING, CODE_OF_CONDUCT) — Deferred until needed

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
- MIT License — Simpler but lacks patent grant
- Apache 2.0 — Includes explicit patent grant, aligns with agent skills ecosystem

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
Add `PLANNING/` folder to `AGENTS/claude-opus-4.5/` structure for storing collaboration artifacts.

**Alternatives Considered:**
- Put in `(internal-notes)/` alongside source docs — Mixes working artifacts with reference docs
- Put alongside source (e.g., `plan-v1-review.md` next to `plan-v1.md`) — Clutters source folders
- Put in `AGENTS/claude-opus-4.5/PLANNING/` — Keeps session artifacts together

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
- Keep tracking `.claude/settings.json` as project config — Rejected, it's personal
- Track `.claude/` but add to `.npmignore` — Rejected, doesn't belong in git history either

**Consequences:**
- Personal Claude Code settings no longer pollute the npm package
- Each developer can have their own local configuration
- 40 files (~5000 lines) removed from tracking

---

## 2026-01-29: MCP Sync Automation — Validation-Only Approach

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
- **No Automation:** Rely on memory. Rejected — drift risk too high.

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
- Close with gaps (`closed-with-gaps`) — Rejected because no remaining alignment failures were found on pinned refs.

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
- Keep observe as default indefinitely — Rejected due to silent drift risk.
- Hard-remove observe mode entirely — Rejected to preserve debugging flexibility.

**Consequences:**
- Pull requests can be blocked when pm-skills and pm-skills-mcp diverge.
- Release integrity improves with low operational overhead.

---

*Add new decisions above this line*
