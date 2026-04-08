# v2.10.0 Release Plan — Mermaid Diagrams + TBD

Status: Planning
Owner: Maintainers
Type: Feature release (minor)

## Release Theme

**Utility expansion** — add `utility-mermaid-diagrams` (a comprehensive diagramming skill for PMs) and additional efforts TBD.

---

## Context

The pm-skills library currently has 30 skills (25 phase skills across 6 Triple Diamond phases, 1 foundation skill, and 4 utility skills). Mermaid diagrams are already used extensively in workflows, documentation, and the MkDocs site, but no skill teaches PMs how to create them effectively. This release adds that capability as a utility skill — the first skill focused on a cross-cutting documentation technique rather than a PM deliverable.

v2.9.1 (D-05 workflows guide + M-20 docs count CI) ships first as a patch. v2.10.0 follows as the next minor release with new user-facing skill content.

---

## Efforts

| ID | Name | Type | Detailed Plan | Status |
|----|------|------|---------------|--------|
| **F-16** | [Mermaid Diagrams Utility Skill](../../efforts/F-16-mermaid-diagrams/F-16-mermaid-diagrams.md) | Feature | [execution-plan.md](../../efforts/F-16-mermaid-diagrams/execution-plan.md) | Active |
| TBD | *(additional efforts to be scoped)* | — | — | — |

---

## Decisions

| Decision | Answer | Rationale |
|----------|--------|-----------|
| **Version** | **v2.10.0** (minor) | New user-facing skill = new capability. Follows SemVer convention. |
| **Dependency on v2.9.1** | **Yes — v2.9.1 ships first** | D-05 (workflows guide) and M-20 (docs count CI) must land before v2.10.0. The new CI from M-20 will validate skill counts in this release. |
| **Skill classification** | **utility** (no phase) | Mermaid diagrams are cross-cutting — PMs use them at every phase. Not tied to a specific Triple Diamond stage. |
| **Skill count after release** | **28 skills** (27 + 1 new) | Pending confirmation of additional efforts. Update if more skills are added. |
| **MCP parity** | **TBD** | Determine whether pm-skills-mcp needs a corresponding `pm_mermaid_diagrams` tool. Likely deferred — this skill is instructional, not a generator. |
| **Additional efforts** | **TBD** | Release scope may expand. Candidates from backlog: F-14 (Workflow Builder), F-12 (Skill Quality Convergence), other new skills. To be decided before implementation begins. |

---

## Deliverables

### F-16: utility-mermaid-diagrams

#### New files to create

| File | Notes |
|------|-------|
| `skills/utility-mermaid-diagrams/SKILL.md` | Core skill — PM-facing mermaid diagram instruction |
| `skills/utility-mermaid-diagrams/references/TEMPLATE.md` | Diagram planning worksheet |
| `skills/utility-mermaid-diagrams/references/EXAMPLE.md` | Worked example: PM creating diagrams for product launch |
| `skills/utility-mermaid-diagrams/references/diagram-catalog.md` | All 16 diagram types with PM examples |
| `skills/utility-mermaid-diagrams/references/pm-use-cases.md` | PM task → diagram type mapping |
| `skills/utility-mermaid-diagrams/references/syntax-guide.md` | Cross-cutting syntax validity rules |
| `commands/mermaid-diagrams.md` | Slash command |

#### Cross-cutting updates

| File | What Changes |
|------|-------------|
| `AGENTS.md` | Add `utility-mermaid-diagrams` entry |
| `README.md` | Update skill count (27 → 28+), add to skill table, update What's New |
| `docs/getting-started.md` | Update skill count |
| `mkdocs.yml` | Add nav entry for generated skill docs page |
| `CHANGELOG.md` | v2.10.0 entry |

#### Generated files (via existing scripts)

| Script | Output |
|--------|--------|
| `scripts/generate-skill-pages.py` | `docs/skills/utility/utility-mermaid-diagrams.md` |

### TBD: Additional efforts

*(To be populated when additional efforts are scoped and assigned to this release.)*

---

## CI That Applies

| Workflow | Checks | Notes |
|----------|--------|-------|
| `lint-skills-frontmatter` | Frontmatter consistency for new skill | Must pass |
| `validate-commands` | Command file references valid skill | Must pass |
| `validate-agents-md` | AGENTS.md ↔ skill directory sync | Must pass |
| `check-mcp-impact` | Advisory — flags MCP-relevant changes | Advisory only |
| `docs-count-consistency` (M-20) | Skill counts match across README, getting-started, AGENTS.md | Must pass (ships in v2.9.1) |

---

## MCP Impact

| Question | Answer |
|----------|--------|
| User-facing API changes? | TBD — likely no. Skill is instructional, not a tool. |
| New MCP tools needed? | TBD — `pm_mermaid_diagrams` could expose skill content, but low priority. |
| Separate MCP release required? | TBD |

---

## Implementation Approach

### Prerequisites
- [ ] v2.9.1 tagged and pushed (D-05 + M-20)
- [ ] Additional v2.10.0 efforts scoped and assigned (or confirmed as F-16 only)
- [ ] GitHub issue created for F-16

### Commit strategy

| Commit | Scope |
|--------|-------|
| 1 | F-16 skill content: SKILL.md + 5 reference files + command file |
| 2 | F-16 cross-cutting: AGENTS.md, README, docs counts, mkdocs nav |
| *(3+)* | *(Additional effort commits TBD)* |
| Final | Release artifacts: CHANGELOG, release tag |

### Dependency diagram

```
v2.9.1 (D-05 + M-20)
    └── v2.10.0
          ├── F-16 Commit 1 (skill content)
          │     └── F-16 Commit 2 (cross-cutting)
          ├── TBD effort commits
          └── Release commit (CHANGELOG + tag)
```

---

## Verification Plan

### After F-16 commits

```powershell
# CI validation
scripts/lint-skills-frontmatter.ps1
scripts/validate-commands.ps1
scripts/validate-agents-md.ps1

# Docs build
mkdocs build --strict   # zero warnings

# Manual checks
mkdocs serve             # verify skill page renders, nav works
```

### Before tagging

- [ ] All CI checks pass
- [ ] `mkdocs build --strict` — zero warnings
- [ ] All mermaid examples in reference files validated (render in mermaid.live)
- [ ] Skill counts consistent across README, getting-started, AGENTS.md
- [ ] CHANGELOG entry written
- [ ] Additional efforts (if any) complete and verified
- [ ] No references to `docs/internal/` in shipped skill content

---

## Open Questions

1. **Additional efforts for v2.10.0** — Is F-16 the sole effort, or should other backlog items (F-14, F-12, M-21) be pulled in?
2. **MCP parity** — Does pm-skills-mcp need a tool for this skill, or is it instructional-only?
3. **Skill count** — Confirm 28 is correct (27 current + 1 new) or adjust if additional skill efforts are added.
