# F-16 Execution Plan: utility-mermaid-diagrams

Status: Planning
Parent effort: [F-16-mermaid-diagrams.md](./F-16-mermaid-diagrams.md)
Design reference: [specification.md](./specification.md)

---

## Pre-Implementation Reading

Before writing any files, read these to absorb conventions:

| File | Why |
|------|-----|
| `skills/utility-pm-skill-builder/SKILL.md` | Utility skill frontmatter + section pattern |
| `skills/utility-pm-skill-validate/SKILL.md` | Second utility skill for cross-reference |
| `skills/utility-pm-skill-iterate/SKILL.md` | Third utility skill — verify consistency |
| `commands/pm-skill-builder.md` | Command file format |
| `AGENTS.md` | Entry format for new skills |
| `docs/getting-started.md` | Skill count to update |
| `README.md` | Skill count + What's New section |

---

## Task Breakdown

### Task 1: Create skill directory and SKILL.md

**Action:** Create `skills/utility-mermaid-diagrams/SKILL.md`

- Start from `draft-SKILL.md` in this effort directory
- Verify frontmatter matches utility skill conventions (name, description, version, updated, license, classification, metadata)
- Run linter: `scripts/lint-skills-frontmatter.ps1`
- Ensure description is 20-100 words, single line

**Files:**
| Action | File |
|--------|------|
| Create | `skills/utility-mermaid-diagrams/SKILL.md` |

**Validation:**
```powershell
scripts/lint-skills-frontmatter.ps1
```

---

### Task 2: Write references/syntax-guide.md

**Action:** Write the cross-cutting syntax validity reference (~300-400 lines)

This is the highest-value reference file — it's the primary differentiator and the foundation that all other reference files depend on. Write it first so diagram-catalog.md can cross-reference it.

**Sections:**
1. Label quoting rules (when, how, examples of failures)
2. Special character escaping (mermaid-conflicting + markdown-conflicting)
3. Node declaration order
4. Direction and layout (TD/LR/BT/RL, ELK, edge crossing troubleshooting)
5. Styling and accessibility (semantic palette, WCAG AA, class-based styling per type)
6. Comments (`%%` syntax, categories)
7. Configuration blocks (themes, per-diagram config)
8. Node/participant limits (per-type table)
9. Pre-commit validation checklist
10. Common rendering failures (symptom → cause → fix table)

**Files:**
| Action | File |
|--------|------|
| Create | `skills/utility-mermaid-diagrams/references/syntax-guide.md` |

---

### Task 3: Write references/diagram-catalog.md

**Action:** Write the comprehensive 15-type reference (~1,200-1,500 lines)

Each type follows a consistent structure:
1. One-line description
2. Use for (3-4 PM scenarios)
3. Don't use for (2-3 anti-patterns → redirect)
4. Syntax (minimal PM-relevant example)
5. Key elements (shapes, edges, constructs)
6. Limits (nodes, nesting, rendering)
7. PM Example (5-15 lines, realistic scenario)
8. Common Pitfalls (2-3 mistakes with fixes)
9. See Also (cross-reference to related types)

**Type order (grouped by category with TOC):**

| Category | Types |
|----------|-------|
| Process & Flow | Flowchart, Sequence, State, Kanban |
| Planning & Time | Gantt, Timeline, Quadrant, Pie |
| Structure & Relationships | Mindmap, Class, ER, Architecture |
| Data & Proportions | Sankey, Treemap, XY-Chart |

Mark experimental types (Architecture, Sankey, Treemap, XY-Chart) with stability note and mermaid version.

**Files:**
| Action | File |
|--------|------|
| Create | `skills/utility-mermaid-diagrams/references/diagram-catalog.md` |

---

### Task 4: Write references/pm-use-cases.md

**Action:** Write the PM task → diagram type mapping (~400-600 lines)

15 use cases, each with:
1. Task description (what the PM is communicating)
2. Recommended type(s) with trade-off notes
3. Mini worked example (10-20 lines of mermaid)
4. Cross-reference to diagram-catalog.md section

**Files:**
| Action | File |
|--------|------|
| Create | `skills/utility-mermaid-diagrams/references/pm-use-cases.md` |

---

### Task 5: Write references/TEMPLATE.md and references/EXAMPLE.md

**Action:** Write the planning worksheet and worked example

**TEMPLATE.md** (~40-60 lines):
- Diagram Purpose
- Cardinal Rule Check
- Diagram Type Selection + rationale
- Node Inventory
- Draft Mermaid Code (placeholder)
- Validation Checklist (abbreviated)

**EXAMPLE.md** (~200-300 lines):
- PM preparing diagrams for a product launch
- 4 diagrams: Flowchart (approval workflow), Gantt (launch timeline), Sequence (API spec), Quadrant (backlog prioritization)
- Each walks: filled worksheet → mermaid code → what it communicates

**Files:**
| Action | File |
|--------|------|
| Create | `skills/utility-mermaid-diagrams/references/TEMPLATE.md` |
| Create | `skills/utility-mermaid-diagrams/references/EXAMPLE.md` |

---

### Task 6: Create command file

**Action:** Create the slash command

**Files:**
| Action | File |
|--------|------|
| Create | `commands/mermaid-diagrams.md` |

**Validation:**
```powershell
scripts/validate-commands.ps1
```

---

### Task 7: Cross-cutting updates

**Action:** Update all files that reference skill counts, skill lists, or navigation

| Action | File | What Changes |
|--------|------|-------------|
| Modify | `AGENTS.md` | Add `utility-mermaid-diagrams` entry |
| Modify | `README.md` | Update skill count, add to skill table |
| Modify | `docs/getting-started.md` | Update skill count |
| Modify | `mkdocs.yml` | Add nav entry for skill docs page |

**Validation:**
```powershell
scripts/validate-agents-md.ps1
scripts/validate-commands.ps1
scripts/lint-skills-frontmatter.ps1
```

---

### Task 8: Effort brief reconciliation

**Action:** Update F-16 effort brief status and artifacts list. Verify draft-SKILL.md divergence from shipped SKILL.md is documented (or remove draft if identical).

---

## Commit Strategy

| Commit | Scope | Contents |
|--------|-------|----------|
| 1 | Skill core | SKILL.md + all 5 reference files + command file |
| 2 | Cross-cutting | AGENTS.md, README, docs counts, mkdocs nav |
| 3 | Release artifacts | CHANGELOG, release notes (done at release time) |

Commits 1 and 2 can be combined into a single commit if review confirms no issues.

---

## Validation Checklist (post-implementation)

- [ ] `scripts/lint-skills-frontmatter.ps1` — passes
- [ ] `scripts/validate-commands.ps1` — passes
- [ ] `scripts/validate-agents-md.ps1` — passes
- [ ] `mkdocs build --strict` — zero warnings
- [ ] `mkdocs serve` — skill page renders, navigation works
- [ ] All mermaid examples in reference files render in mermaid.live
- [ ] SKILL.md quality checklist items are all testable (no vague language)
- [ ] TEMPLATE.md has ≥3 sections
- [ ] EXAMPLE.md demonstrates all TEMPLATE sections filled
- [ ] No references to internal effort files in shipped skill content
