# v2.10.0 Release Plan — Utility & Skill Expansion

Status: In Progress
Owner: Maintainers
Type: Feature release (minor)

## Release Theme

**Skill expansion** — new utility and domain skills expanding the pm-skills library beyond 30 skills.

---

## Context

The pm-skills library currently has 30 skills (25 phase skills across 6 Triple Diamond phases, 1 foundation skill, and 4 utility skills). v2.10.0 adds new skills and capabilities.

v2.9.1 (D-05 workflows guide + M-20 docs count CI) ships first as a patch. v2.10.0 follows as the next minor release with new user-facing skill content.

---

## Efforts

| ID | Name | Type | Detailed Plan | Status |
|----|------|------|---------------|--------|
| **F-16** | [Mermaid Diagrams Utility Skill](../../efforts/F-16-mermaid-diagrams/F-16-mermaid-diagrams.md) | Feature | [execution-plan.md](../../efforts/F-16-mermaid-diagrams/execution-plan.md) | **Merged to main** (2026-04-07) |
| **F-17** | [Meeting Synthesis](../../efforts/F-17-meeting-synthesis.md) | Feature | TBD | Backlog |
| **F-18** | [Meeting Prep](../../efforts/F-18-meeting-prep.md) | Feature | TBD | Backlog |
| TBD | *(additional efforts possible)* | — | — | — |

---

## Decisions

| Decision | Answer | Rationale |
|----------|--------|-----------|
| **Version** | **v2.10.0** (minor) | New user-facing skills = new capability. Follows SemVer convention. |
| **Dependency on v2.9.1** | **Yes — v2.9.1 ships first** | D-05 (workflows guide) and M-20 (docs count CI) must land before v2.10.0. The new CI from M-20 will validate skill counts in this release. |
| **F-16 skill classification** | **utility** (no phase) | Mermaid diagrams are cross-cutting — PMs use them at every phase. Not tied to a specific Triple Diamond stage. |
| **Skill count after F-16** | **30 skills** (post-F-16 merge: 25 phase + 1 foundation + 4 utility) | F-17 and F-18 would bring total to 32 if both ship in this release. |
| **MCP parity** | **TBD** | Determine whether pm-skills-mcp needs corresponding tools for new skills. |
| **Additional efforts** | **TBD** | Release scope may expand. Candidates from backlog: F-14 (Workflow Builder), F-12 (Skill Quality Convergence), new domain skills. |

---

## Deliverables

### F-16: utility-mermaid-diagrams (SHIPPED)

Merged to main on 2026-04-07. All files created, cross-cutting updates applied, CI passing.

#### Files shipped

| File | Lines | Status |
|------|-------|--------|
| `skills/utility-mermaid-diagrams/SKILL.md` | 120 | Shipped |
| `skills/utility-mermaid-diagrams/references/diagram-catalog.md` | 1,231 | Shipped |
| `skills/utility-mermaid-diagrams/references/pm-use-cases.md` | 563 | Shipped |
| `skills/utility-mermaid-diagrams/references/syntax-guide.md` | 399 | Shipped |
| `skills/utility-mermaid-diagrams/references/EXAMPLE.md` | 273 | Shipped |
| `skills/utility-mermaid-diagrams/references/TEMPLATE.md` | 59 | Shipped |
| `commands/mermaid-diagrams.md` | 15 | Shipped |

#### Cross-cutting updates shipped

| File | What Changed |
|------|-------------|
| `AGENTS.md` | Added `utility-mermaid-diagrams` entry (30 paths) |
| `README.md` | Skill count 29→30, utility 3→4, badge, skill table, 5 additional count refs |
| `docs/getting-started.md` + `index.md` | Skill/command counts, `/mermaid-diagrams` in command table |
| `QUICKSTART.md` + `docs/getting-started/quickstart.md` | Skill/command counts |
| `mkdocs.yml` | Nav entry + site_description count |
| `docs/reference/commands.md` | `/mermaid-diagrams` row + count |
| `docs/reference/ecosystem.md` | Command count |
| `docs/reference/project-structure.md` | Command count + `/mermaid-diagrams` row |
| `docs/guides/mcp-setup.md` + `mcp-integration.md` | Skill tool counts |
| `docs/skills/index.md` | Skill count |
| `AGENTS/claude/CONTEXT.md` | Multiple count updates |

#### Remaining docs hygiene (at release time)

- [ ] CHANGELOG.md v2.10.0 entry
- [ ] `docs/concepts/versioning.md` utility skill count (historical context)
- [ ] Internal mkdocs planning docs (stale counts, non-public)
- [ ] Generate skill page via `scripts/generate-skill-pages.py`

### TBD: Additional efforts

*(To be populated when additional efforts are scoped and assigned to this release.)*

---

## CI That Applies

| Workflow | Checks | Notes |
|----------|--------|-------|
| `lint-skills-frontmatter` | Frontmatter consistency for new skills | Must pass |
| `validate-commands` | Command file references valid skill | Must pass |
| `validate-agents-md` | AGENTS.md ↔ skill directory sync | Must pass |
| `check-mcp-impact` | Advisory — flags MCP-relevant changes | Advisory only |
| `docs-count-consistency` (M-20) | Skill counts match across README, getting-started, AGENTS.md | Must pass (ships in v2.9.1) |

---

## MCP Impact

| Question | Answer |
|----------|--------|
| User-facing API changes? | TBD — depends on additional efforts. |
| New MCP tools needed? | TBD — `pm_mermaid_diagrams` could expose skill content, but low priority. |
| Separate MCP release required? | TBD |

---

## Implementation Approach

### Prerequisites
- [ ] v2.9.1 tagged and pushed (D-05 + M-20)
- [x] F-16 merged to main (2026-04-07)
- [ ] Additional v2.10.0 efforts scoped and assigned
- [ ] GitHub issues created for additional efforts

### Commit history

| Commit | Scope | Status |
|--------|-------|--------|
| `06af8fb` | F-16 skill content + cross-cutting updates | Merged |
| *(TBD)* | Additional effort commits | — |
| Final | Release artifacts: CHANGELOG, release tag | — |

---

## Verification Plan

### F-16 verification (complete)

```powershell
# All passed on 2026-04-07
scripts/lint-skills-frontmatter.ps1    # pre-existing failures only
scripts/validate-commands.ps1          # 37/37 OK
scripts/validate-agents-md.ps1         # 30 paths matched
```

### Before tagging

- [ ] All CI checks pass
- [ ] `mkdocs build --strict` — zero warnings
- [ ] Skill counts consistent across all files
- [ ] CHANGELOG entry written
- [ ] Additional efforts (if any) complete and verified
- [ ] No references to `docs/internal/` in shipped skill content

---

## Open Questions

1. **Additional efforts for v2.10.0** — Which backlog items should be pulled in?
2. **MCP parity** — Does pm-skills-mcp need tools for new skills?
3. **Final skill count** — Will depend on which additional efforts land.
