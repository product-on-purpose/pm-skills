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

*Add new decisions above this line*
