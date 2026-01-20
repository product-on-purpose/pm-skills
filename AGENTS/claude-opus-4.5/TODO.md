# Project Tasks

## In Progress

### v1.2.0 Security Follow-up (Manual GitHub Settings)
- [ ] Enable secret scanning (Settings → Code security)
- [ ] Enable secret scanning push protection
- [ ] Create tag ruleset for `v*` releases (protect release tags)
- [ ] Verify Dependabot alerts are enabled

## To Do

### Open-Skills Follow-up
- [x] Submit PR to awesome-claude-skills ✅ [PR #62](https://github.com/ComposioHQ/awesome-claude-skills/pull/62)
- [x] Submit to n-skills marketplace ✅ [Issue #6](https://github.com/numman-ali/n-skills/issues/6)
- [x] Monitor [openskills#48](https://github.com/numman-ali/openskills/issues/48) for bug fix ✅ Fixed in v1.3.1
- [ ] Add awesome-claude-skills badge to README after PR merges
- [x] Update README installation instructions when openskills is fixed ✅
- [ ] Note: openskills CLI discovers skills in `.claude/skills/` but not `skills/phase/skill-name/` (depth limitation)

### v1.3.0 Candidates
- [ ] Validation CI workflow — [#86](https://github.com/product-on-purpose/pm-skills/issues/86)
- [ ] Auto-generated AGENTS.md header — [#87](https://github.com/product-on-purpose/pm-skills/issues/87)
- [ ] CODEOWNERS file for reviewer auto-assignment
- [ ] MCP server package (pm-skills-mcp)

### Post-Release
- [ ] Announce on Twitter/LinkedIn
- [ ] Submit to Product Hunt
- [ ] Claude Code marketplace submission (when available)

## Completed

### v1.2.0 Release (2026-01-20) ✅ SHIPPED
- [x] Created SECURITY.md with vulnerability reporting guidelines
- [x] Added CodeQL code scanning workflow
- [x] Added Dependabot configuration
- [x] Created issue templates (bug_report.yml, feature_request.yml, config.yml)
- [x] Created pull request template
- [x] Fixed codeql.yml typo (`lname:` → `name:`)
- [x] Fixed dependabot.yml location (moved to `.github/`)
- [x] Updated CHANGELOG.md and README.md for v1.2.0
- [x] Created tag and pushed to remote

### v1.0.0 Release (2026-01-15) ✅ SHIPPED
- [x] Create v1.0.0 git tag
- [x] Create GitHub release with release notes
- [x] Verify release-zips.yml workflow (31 ZIPs uploaded)
- [x] Polish README (exciting, dynamic content)
- [x] Merge to main branch
- [x] Delete feature branch
- [x] Respond to Codex v1 repo review

### Phase 3: P2 Skills (Issues #26-36) ✅ COMPLETE
- [x] #26: `competitive-analysis` — Discover phase (2026-01-14)
- [x] #27: `stakeholder-summary` — Discover phase (2026-01-14)
- [x] #28: `opportunity-tree` — Define phase (2026-01-14)
- [x] #29: `jtbd-canvas` — Define phase (2026-01-14)
- [x] #30: `design-rationale` — Develop phase (2026-01-14)
- [x] #31: `dashboard-requirements` — Measure phase (2026-01-14)
- [x] #32: `experiment-results` — Measure phase (2026-01-14)
- [x] #33: `retrospective` — Iterate phase (2026-01-14)
- [x] #34: `lessons-log` — Iterate phase (2026-01-14)
- [x] #35: `refinement-notes` — Iterate phase (2026-01-14)
- [x] #36: `pivot-decision` — Iterate phase (2026-01-14)

### Documentation Expansion (2026-01-16) ✅ COMPLETE
- [x] Deep verification of categories.md and frontmatter-schema.yaml (all 24 skills)
- [x] Reorganized `/docs` folder with new taxonomy
- [x] Expanded `docs/reference/categories.md` (54 → 420+ lines)
- [x] Expanded `docs/reference/frontmatter-schema.yaml` (91 → 600 lines)
- [x] Created `docs/reference/getting-started.md` (~600 lines)
- [x] Created `docs/guides/using-skills.md` (~750 lines)
- [x] Created `docs/guides/authoring-pm-skills.md` (~850 lines)
- [x] Verified framework claims in README are accurate

### Open-Skills Integration (2026-01-15) ✅ CONTENT READY
- [x] Created detailed execution plan (`plan-open-skills_detailed.md`)
- [x] Tested openskills CLI compatibility — found bug
- [x] Filed [openskills#48](https://github.com/numman-ali/openskills/issues/48) for nested path issue
- [x] Updated README.md with accurate installation instructions
- [x] Added "See It In Action" section to README.md
- [x] Created GitHub release workflow (`.github/workflows/release.yml`)
- [x] Prepared awesome-claude-skills PR content
- [x] Prepared n-skills submission content
- [x] Created manual steps guide

### v1.0.1: All Slash Commands (Issues #43-62) ✅ COMPLETE
- [x] Created 20 missing slash commands (2026-01-15)
- [x] #43-62: All skill commands now exist in `commands/` directory
- [x] Updated README.md with full command list (collapsible sections)
- [x] Updated AGENTS.md with full command list (by phase)
- [x] Updated CHANGELOG.md with v1.0.1 entry
- [x] Updated plan-open-skills.md compatibility table

### Phase 3: Infrastructure ✅ COMPLETE
- [x] Bundle: `_bundles/triple-diamond.md` (2026-01-14)
- [x] Bundle: `_bundles/lean-startup.md` (2026-01-14)
- [x] Bundle: `_bundles/feature-kickoff.md` (2026-01-14)
- [x] Slash Commands: 25 commands in `commands/` (2026-01-15)
- [x] AGENTS.md: Universal agent discovery (2026-01-14)
- [x] GitHub Actions: sync-agents-md.yml, release-zips.yml (2026-01-14)

### Phase 2: P1 Skills (Issues #18-25) ✅ COMPLETE
- [x] #18: `interview-synthesis` — Discover phase (2026-01-14)
- [x] #19: `solution-brief` — Develop phase (2026-01-14)
- [x] #20: `spike-summary` — Develop phase (2026-01-14)
- [x] #21: `adr` — Develop phase (2026-01-14)
- [x] #22: `edge-cases` — Deliver phase (2026-01-14)
- [x] #23: `release-notes` — Deliver phase (2026-01-14)
- [x] #24: `experiment-design` — Measure phase (2026-01-14)
- [x] #25: `instrumentation-spec` — Measure phase (2026-01-14)

### Phase 1: P0 Core Skills (Issues #10-14) ✅ COMPLETE
- [x] #10: `problem-statement` — Define phase (2026-01-14)
- [x] #11: `hypothesis` — Define phase (2026-01-14)
- [x] #12: `prd` — Deliver phase (2026-01-14)
- [x] #13: `user-stories` — Deliver phase (2026-01-14)
- [x] #14: `launch-checklist` — Deliver phase (2026-01-14)

### Phase 0: Foundation (Issues #1-9) ✅ COMPLETE
- [x] #1: Repository Bootstrap — CONTRIBUTING.md, directory structure (2026-01-14)
- [x] #2: Schema Documentation — `docs/frontmatter-schema.yaml` (2026-01-14)
- [x] #3: Category Reference — `docs/categories.md` (2026-01-14)
- [x] #4: Skill Template Structure — `templates/skill-template/` (2026-01-14)
- [x] #5: VISION.md Integration — verified at `_NOTES/VISION.md` (2026-01-14)
- [x] Issues #6-9: Plan improvements and fixes (2026-01-14)

## Blocked

*No blocked items.*

---

*Last updated: 2026-01-20 (v1.2.0 release)*
