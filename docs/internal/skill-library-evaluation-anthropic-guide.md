# Skill Library Evaluation (Anthropic Skill Best-Practice Lens)

Date: 2026-02-13  
Repository: `pm-skills`

## Scope and method

This assessment evaluates the PM-Skills library against common Anthropic skill-authoring best practices (clear triggerability, progressive disclosure, explicit output contracts, quality gates, composability, and operational validation).

I used:

- Structural checks already in the repo (`lint-skills-frontmatter`, `validate-commands`)
- Manual review of repository standards and templates
- Spot checks of skill anatomy and authoring docs

> Note: The linked PDF could not be fetched from this environment (HTTP 403 via `curl`). Recommendations below are therefore grounded in the repository's own Anthropic/agent-skills-aligned documentation and standard skill design practices.

---

## Executive summary

PM-Skills is **strongly aligned** with modern skill-library conventions and appears production-ready:

- 24/24 skills pass metadata + structure linting
- Command-to-skill mapping is complete and validated
- Skill files consistently use a three-layer model (instructions + template + example)
- Authoring guidance is mature and explicit

Primary improvement opportunities are now in **operability and quality depth**, not basic structure:

1. Add richer validation for checklist quality (not just section existence)
2. Introduce a lightweight skill test harness with golden snapshots
3. Improve cross-skill orchestration guidance and dependency mapping
4. Add an explicit “failure modes / ambiguity handling” block to each skill
5. Track quality telemetry over time (completeness, edit distance, user rework)

---

## Scorecard

| Dimension | Rating | Evidence | Recommendation |
|---|---:|---|---|
| Skill discoverability | 5/5 | Clear `AGENTS.md` catalog + command inventory + phase naming | Add tags/aliases for synonym discovery |
| Structural consistency | 5/5 | All skills pass frontmatter + required reference checks | Keep gate in CI and add semantic checks |
| Output contract clarity | 4/5 | Template + example pattern is consistent | Add explicit section-level acceptance criteria |
| Progressive disclosure | 4/5 | Anatomy docs define SKILL/TEMPLATE/EXAMPLE layering | Add optional “minimum viable output” mode |
| Composability/workflows | 4/5 | Bundles and kickoff workflow exist | Add explicit skill I/O contracts and handoff fields |
| Reliability/quality gates | 4/5 | Existing lint and command validation scripts | Add regression suite using sample prompts + expected skeletons |
| Maintainability/governance | 4/5 | Strong guides, schemas, and contributor docs | Introduce versioned changelog per skill + deprecation policy |

Overall: **4.3 / 5 (Excellent foundation, ready for advanced quality ops)**

---

## Detailed findings

## 1) Library architecture and standards are robust

What is working well:

- Flat, phase-prefixed skill structure scales cleanly and is easy to navigate.
- Every skill follows the expected three-file pattern with references.
- Authoring docs include category taxonomy, naming constraints, and contribution flow.

Why this matters:

- Reduces variance between artifacts
- Improves portability across agent runtimes
- Lowers contributor onboarding time

### 2) Validation is strong but mostly syntactic

What is working well:

- Current scripts catch missing frontmatter and command mapping drift.
- This prevents common operational breakages.

Gap:

- Checks currently verify “presence and linkage,” not whether instructions are actually actionable, unambiguous, and quality-enforcing.

Recommendation:

- Add semantic checks such as:
  - minimum instruction step count
  - mandatory prompt-for-missing-context behavior
  - required rubric completeness (measurable criteria, not generic language)

### 3) Templates/examples are present, but quality calibration can be more explicit

What is working well:

- TEMPLATE.md and EXAMPLE.md are consistently available and modeled in docs.

Gap:

- Quality expectations can still vary across skills (e.g., depth, quantification, evidence usage).

Recommendation:

- Standardize a cross-library “definition of done” block in SKILL.md, e.g.:
  - quantified claims where possible
  - explicit assumptions
  - unresolved questions section
  - risk/edge-case section

### 4) Workflow composition exists but could be more machine-readable

What is working well:

- Triple-diamond and Lean Startup bundles communicate process intent.

Gap:

- Skill chaining is described conceptually; handoff contracts are not consistently formalized.

Recommendation:

- Add optional frontmatter fields:
  - `inputs_expected`
  - `outputs_produced`
  - `next_recommended_skills`

This would improve orchestrators' ability to auto-chain workflows.

### 5) Governance maturity can be pushed further

What is working well:

- Core governance docs and contributor workflow are strong.

Gap:

- No clear per-skill lifecycle markers (incubating/stable/deprecated), and limited evidence-based quality monitoring.

Recommendation:

- Add lifecycle status and maintenance owner metadata.
- Run quarterly quality audits using representative prompt sets.

---

## Priority recommendations

## P0 (next release)

1. **Add semantic linting** to complement structural lint.
2. **Enforce stronger quality checklist language** (measurable outcomes).
3. **Add “missing context protocol”** section to all skills (what to ask before drafting).

## P1 (1-2 releases)

4. **Introduce skill regression tests** with golden outputs/skeleton checks.
5. **Define machine-readable handoff metadata** for skill chaining.
6. **Standardize risk/assumption/open-questions sections** in templates.

## P2 (quarterly)

7. **Create score-based skill health dashboard** (lint pass, regression pass, stale age).
8. **Track real-world output quality feedback loop** (human edits, acceptance rate).
9. **Publish a deprecation and versioning policy per skill**.

---

## Suggested implementation plan

### Milestone 1: Quality hardening

- Extend `scripts/lint-skills-frontmatter.sh` with semantic checks
- Add a `scripts/test-skills.sh` harness for representative dry runs
- Normalize checklist phrasing in all `SKILL.md` files

### Milestone 2: Orchestration readiness

- Add `inputs_expected/outputs_produced/next_recommended_skills` metadata
- Update bundle docs to reference explicit handoff fields
- Add CI check that bundle-linked skills exist and are non-deprecated

### Milestone 3: Continuous improvement loop

- Introduce `skill-health.md` report generated in CI
- Add contributor guidance for collecting and incorporating quality feedback

---

## Bottom line

PM-Skills already demonstrates a high-quality skill-library baseline with excellent structure and documentation discipline. The next phase should focus on **semantic quality assurance, workflow interoperability, and measurable quality operations** to move from “well-structured” to “self-improving at scale.”
