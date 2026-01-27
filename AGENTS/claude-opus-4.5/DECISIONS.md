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

*Add new decisions above this line*
