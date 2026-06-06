# v2.10.0 Release Plan . Utility & Skill Expansion

Status: In Progress
Owner: Maintainers
Type: Feature release (minor)

## Release Theme

**Skill expansion + self-service** - new utility and domain skills expanding
the pm-skills library beyond 30 skills, plus a self-update skill that lets
users keep their installation current.

---

## Context

The pm-skills library currently has 31 skills (25 phase skills across 6
Triple Diamond phases, 1 foundation skill, and 5 utility skills). v2.10.0
adds new skills and capabilities, including the library's first meta-skill
(self-updater).

v2.9.1 shipped 2026-04-10 (D-05 workflows guide + M-20 docs count CI).
v2.10.0 scope: F-16 (shipped) + F-19 (shipped) + F-24 (ready for implementation).
F-17 (Meeting Synthesis) and F-18 (Meeting Prep) deferred to v2.11.0.

---

## Efforts

| ID | Name | Type | Detailed Plan | Status |
|----|------|------|---------------|--------|
| **F-16** | [Mermaid Diagrams Utility Skill](../../efforts/F-16-mermaid-diagrams/F-16-mermaid-diagrams.md) | Feature | [execution-plan.md](../../efforts/F-16-mermaid-diagrams/execution-plan.md) | **Merged to main** (2026-04-07) |
| **F-19** | [Slideshow Creator](../../efforts/F-19-slideshow-creator/F-19-slideshow-creator.md) | Feature | [specification.md](../../efforts/F-19-slideshow-creator/specification.md) | **Merged to main** (2026-04-08) |
| **F-24** | [PM Skills Self-Updater](../../efforts/F-24-update-pm-skills.md) | Feature | [plan](../../efforts/F-24-update-pm-skills/plan_update-pm-skills.md), [spec](../../efforts/F-24-update-pm-skills/specification.md) | Ready for Implementation |

---

## Decisions

| Decision | Answer | Rationale |
|----------|--------|-----------|
| **Version** | **v2.10.0** (minor) | New user-facing skills = new capability. Follows SemVer convention. |
| **Dependency on v2.9.1** | **Satisfied** - v2.9.1 shipped 2026-04-10 | D-05 (workflows guide) and M-20 (docs count CI) are in place. Count consistency CI now validates this release. |
| **F-16 skill classification** | **utility** (no phase) | Mermaid diagrams are cross-cutting - PMs use them at every phase. Not tied to a specific Triple Diamond stage. |
| **F-24 skill classification** | **utility** (no phase) | Self-update is cross-cutting infrastructure, not tied to a Triple Diamond stage. |
| **F-24 local state directory** | **`_pm-skills/`** (underscore prefix) | Visible on macOS/Windows (unlike dot-prefix). Consistent with `_workflows/`, `_NOTES/` conventions. Added to `.gitignore`. |
| **Skill count after all efforts** | **32 skills** | F-16 (shipped) + F-19 (shipped) + F-24 (ready) = 32. |
| **MCP parity** | **TBD** | Determine whether pm-skills-mcp needs corresponding tools for new skills. Note: F-24 (update skill) may not be suitable for MCP (requires network + file writes). |
| **F-17/F-18 deferred** | **Moved to v2.11.0** | Meeting Synthesis and Meeting Prep deferred to keep v2.10.0 scope tight. |

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

### F-19: utility-slideshow-creator (SHIPPED)

Merged to main on 2026-04-08. Skill content and cross-cutting updates applied.

### F-24: utility-update-pm-skills (READY FOR IMPLEMENTATION)

A utility skill enabling users to check for newer pm-skills releases,
preview what would change, and update local files with user confirmation.

Full design: [plan](../../efforts/F-24-update-pm-skills/plan_update-pm-skills.md)
| [specification](../../efforts/F-24-update-pm-skills/specification.md)
| [15 acceptance criteria](../../efforts/F-24-update-pm-skills/plan_update-pm-skills.md#7-acceptance-criteria)

#### Skill files

| File | Purpose | Status |
|------|---------|--------|
| `skills/utility-update-pm-skills/SKILL.md` | 6-step flow + FAQ + quality checklist + degraded mode | Draft complete |
| `skills/utility-update-pm-skills/references/TEMPLATE.md` | Two-mode report template with value-delta emphasis | Draft complete |
| `skills/utility-update-pm-skills/references/EXAMPLE.md` | Worked example: v2.9.0 → v2.10.0 (completion + report-only) | Draft complete |
| `commands/update-pm-skills.md` | Slash command with `--report-only` and `--status` | Draft complete |
| `docs/guides/updating-pm-skills.md` | User-facing guide for the mkdocs site | Not started |

Drafts at: `docs/internal/efforts/F-24-update-pm-skills/drafts/`

#### Key capabilities (v1)

- Pre-flight checklist (network, version detection)
- `--status` flag (lightweight version check)
- `--report-only` flag (preview without writing)
- Full update with confirmation + optional backup
- Atomic update (download to temp → validate → copy)
- Major version warning with extra confirmation
- Post-update smoke test (version consistency, file integrity, skill count)
- Value-delta report (what's new, what it enables, opportunities)
- Quality checklist (internal, 12 items)
- Degraded mode (no network → manual instructions)
- MCP advisory (sibling repo detection)
- Error recovery guidance
- Summary line after completion
- FAQ section for common questions

#### Cross-cutting updates needed

| File | What Changes |
|------|-------------|
| `AGENTS.md` | Add `utility-update-pm-skills` entry |
| `.gitignore` | Add `_pm-skills/` |
| `README.md` | Skill count increment, utility count, skill table entry |
| `docs/getting-started.md` + `index.md` | Skill/command counts, `/update-pm-skills` in command table |
| `QUICKSTART.md` + `docs/getting-started/quickstart.md` | Skill/command counts |
| `mkdocs.yml` | Nav entries (skill + guide page) |
| `docs/reference/commands.md` | `/update-pm-skills` row + count |
| `docs/reference/ecosystem.md` | Command count |
| `docs/reference/project-structure.md` | Command count + `_pm-skills/` entry |
| `docs/guides/mcp-setup.md` + `mcp-integration.md` | Skill tool counts |
| `docs/skills/index.md` | Skill count |
| `AGENTS/claude/CONTEXT.md` | Count updates |

#### Prerequisites

| # | Task | Status |
|---|------|--------|
| P1 | Fix `plugin.json` vs `marketplace.json` version mismatch | Not started |
| P2 | Add `_pm-skills/` to `.gitignore` | Not started |

#### New CI for F-24

| Script | Purpose | Mode |
|--------|---------|------|
| `scripts/validate-gitignore-pm-skills.sh` + `.ps1` | Ensure `_pm-skills/` stays in `.gitignore` | Advisory initially |
| `scripts/validate-update-report-template.sh` + `.ps1` | Validate TEMPLATE.md has required sections | Advisory initially |

### Remaining docs hygiene (at release time)

- [ ] CHANGELOG.md v2.10.0 entry (F-16 + F-19 + F-24 + any others)
- [ ] `docs/concepts/versioning.md` utility skill count (historical context)
- [ ] Internal mkdocs planning docs (stale counts, non-public)
- [ ] Generate skill pages via `scripts/generate-skill-pages.py`
- [ ] skills-manifest.yaml for v2.10.0

---

## CI That Applies

| Workflow | Checks | Notes |
|----------|--------|-------|
| `lint-skills-frontmatter` | Frontmatter consistency for new skills | Must pass |
| `validate-commands` | Command file references valid skill | Must pass |
| `validate-agents-md` | AGENTS.md ↔ skill directory sync | Must pass |
| `check-mcp-impact` | Advisory - flags MCP-relevant changes | Advisory only |
| `docs-count-consistency` (M-20) | Skill counts match across README, getting-started, AGENTS.md | Must pass (ships in v2.9.1) |
| `validate-version-consistency` (new, F-24) | `plugin.json` and `marketplace.json` versions match | Must pass |
| `validate-gitignore-pm-skills` (new, F-24) | `_pm-skills/` in `.gitignore` | Advisory initially |

---

## MCP Impact

| Question | Answer |
|----------|--------|
| User-facing API changes? | **Yes** - 2-3 new MCP tools from shipped/ready skills |
| New MCP tools needed? | **Yes** - `pm_mermaid_diagrams` (F-16), `pm_slideshow_creator` (F-19). F-24 (`pm_update_pm_skills`) TBD - may not be suitable for MCP (requires network + file writes). |
| Separate MCP release required? | **Yes** - pm-skills-mcp needs embed + build + publish |
| Code changes needed? | **Minimal** - update `src/config.ts` description count only. Skill loading, tool registration, and resource URIs are all auto-discovered. |

### MCP Alignment Steps (future session)

1. Run `npm run embed-skills` in pm-skills-mcp to copy new skills from pm-skills repo
2. Update `src/config.ts` description: skill count 27 → current total
3. Decide whether to include `utility-update-pm-skills` in MCP embed (may exclude - requires network + file writes)
4. `npm run build` and verify new tools appear
5. Version bump pm-skills-mcp package.json
6. Publish / deploy

**Current gap:** pm-skills-mcp has 28 embedded skills; pm-skills repo has 31+. The MCP server is multiple skills behind.

---

## Implementation Approach

### Prerequisites
- [x] v2.9.1 tagged and pushed (2026-04-10)
- [x] F-16 merged to main (2026-04-07)
- [x] F-19 merged to main (2026-04-08)
- [ ] F-24 prerequisites (P1 version mismatch fix, P2 gitignore)
- [ ] F-24 skill files promoted to canonical locations
- [ ] F-24 cross-cutting updates applied
- [ ] Additional v2.10.0 efforts built and merged (if any)
- [ ] MCP alignment: embed new skills, build, publish pm-skills-mcp
- [ ] GitHub issues created for efforts

### Commit history

| Commit | Scope | Status |
|--------|-------|--------|
| `06af8fb` | F-16 skill content + cross-cutting updates | Merged (2026-04-07) |
| `9dcd8f2` | F-16 audit fixes + F-17/F-18 effort briefs | Merged (2026-04-07) |
| `a14510a` | F-19–F-23 effort briefs + backlog update | Merged (2026-04-08) |
| `363b5eb` | F-19 specification | Merged (2026-04-08) |
| `eabd78d` | F-19 skill content + cross-cutting updates | Merged (2026-04-08) |
| *(TBD)* | F-24 prerequisites (version mismatch + gitignore) | - |
| *(TBD)* | F-24 skill content (SKILL.md, TEMPLATE.md, EXAMPLE.md, command, guide) | - |
| *(TBD)* | F-24 cross-cutting (AGENTS.md, README, docs counts, mkdocs) | - |
| *(TBD)* | F-24 CI (gitignore validation + report template validation) | - |
| *(TBD)* | Additional effort commits | - |
| *(TBD)* | MCP alignment (embed + build + publish) | - |
| Final | Release artifacts: CHANGELOG, skills-manifest, release tag | - |

---

## Verification Plan

### F-16 verification (complete)

```powershell
# All passed on 2026-04-07
scripts/validate-commands.ps1          # 37/37 OK
scripts/validate-agents-md.ps1         # 30 paths matched
```

### F-19 verification (complete)

```powershell
# All passed on 2026-04-08
scripts/validate-commands.ps1          # 38/38 OK
scripts/validate-agents-md.ps1         # 31 paths matched
```

### F-24 verification (pending)

```powershell
# Run after promoting drafts to canonical locations
scripts/lint-skills-frontmatter.ps1    # utility-update-pm-skills frontmatter
scripts/validate-commands.ps1          # update-pm-skills.md references valid skill
scripts/validate-agents-md.ps1         # AGENTS.md includes new entry
scripts/validate-gitignore-pm-skills.ps1  # _pm-skills/ in .gitignore (new)
```

### Before tagging

- [ ] All CI checks pass
- [ ] `mkdocs build --strict` - zero warnings
- [ ] Skill counts consistent across all files
- [ ] CHANGELOG entry written
- [ ] `_pm-skills/` in `.gitignore`
- [ ] `plugin.json` and `marketplace.json` versions match
- [ ] No references to `docs/internal/` in shipped skill content
- [ ] F-24 acceptance criteria spot-checked (run `/update-pm-skills --report-only` manually)

---

## Open Questions

1. ~~Additional efforts~~ - **Resolved**: F-17/F-18 deferred to v2.11.0. v2.10.0 scope is F-16 + F-19 + F-24.
2. **MCP for F-24** - Does `pm_update_pm_skills` make sense as an MCP tool? Requires network + file writes which MCP may not support. May need to be excluded from embed.
3. **User-facing guide** - Should `docs/guides/updating-pm-skills.md` ship with the skill or be deferred?
4. **Final skill count** - Depends on which additional efforts land.
