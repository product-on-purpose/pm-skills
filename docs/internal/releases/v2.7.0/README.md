# v2.7.0 Internal Release Governance

Status: In progress
Owner: Maintainers
Last updated: 2026-03-22

This directory is the tracked internal release-governance home for the `v2.7.0` release: CI enhancement, release packaging hygiene, a new skill, and PM Skill Builder.

## Release Contents

| Effort | Type | Description | Agent | Status | Issue |
|--------|------|-------------|-------|--------|-------|
| M-12 | Infrastructure | CI validation enhancement — extended linter, AGENTS.md sync validator, MCP impact check | Codex | **Committed** | [#112](https://github.com/product-on-purpose/pm-skills/issues/112) |
| F-06 | New skill | `deliver-acceptance-criteria` — Given/When/Then acceptance criteria skill | Codex | **Committed** | [#114](https://github.com/product-on-purpose/pm-skills/issues/114) |
| M-16 | Infrastructure | Exclude `docs/internal/**` from the published ZIP while keeping internal governance docs tracked in-repo | Codex | Implemented locally, awaiting commit | [#123](https://github.com/product-on-purpose/pm-skills/issues/123) |
| F-05 | New skill | PM Skill Builder (`/pm-skill-builder`) — interactive utility skill for creating new PM skills | Claude | Implementation plan reviewed, ready to execute | [#113](https://github.com/product-on-purpose/pm-skills/issues/113) |
| D-01 | Documentation | Create `docs/pm-skill-anatomy.md` — architecture and anatomy of a pm-skills skill (extends agentskills.io spec) | Claude | Planned | — |
| D-02 | Documentation | Review and update public-facing docs for v2.7.0 accuracy | Codex | Planned | — |

## Release Theme

Infrastructure hardening (M-12) + release packaging hygiene (M-16) + first new skill since v2.6 (F-06) + meta-tooling for skill creation (F-05) + documentation refresh (D-01, D-02). This release makes the repo easier to extend, keeps internal governance docs out of user-facing ZIPs, adds a practical Deliver-phase skill, and ensures public docs reflect the current state.

## Gating Criteria

- [x] M-12 committed and CI green
- [x] F-06 committed and CI green (must pass M-12's enhanced validation)
- [ ] M-16 committed and release ZIP excludes `docs/internal/**` while preserving public docs
- [ ] F-05 design approved and implemented
- [ ] F-05 committed and CI green
- [ ] D-01: `docs/skill-anatomy.md` created
- [ ] D-02: Public-facing docs reviewed and updated for v2.7.0 accuracy
- [ ] CHANGELOG.md updated with v2.7.0 section
- [ ] All 27+ skills pass enhanced CI validation
- [ ] Tag `v2.7.0` pushed → release.yml fires → ZIP published

## Commit Order

1. ~~M-12 + F-06 combined commit~~ **Done** (2026-03-22, `8d2a418`)
2. M-16 packaging fix commit (Codex — implemented, awaiting commit)
3. F-05 implementation commit(s) (after Codex review of implementation plan)
4. D-01 + D-02 documentation commits
5. Release prep commit (CHANGELOG, version bumps if needed)
6. Tag and release

## Canonical Artifacts

1. `docs/internal/releases/v2.7.0/README.md` (this file)
2. `docs/releases/Release_v2.7.0.md` (public release notes — create at tag time)
3. Effort briefs: `M-12`, `M-16`, `F-05`, `F-06` in `docs/internal/efforts/`

## Documentation Tasks (D-01, D-02)

### D-01: Skill Anatomy Document

Create `docs/skill-anatomy.md` — a public-facing guide explaining the architecture and anatomy of a pm-skills skill. Should cover:
- Directory structure (`skills/{phase}-{name}/SKILL.md` + `references/`)
- Frontmatter schema and field meanings
- SKILL.md section structure (Instructions, Output Contract, Quality Checklist)
- TEMPLATE.md and EXAMPLE.md roles
- Classification types (domain, foundation, utility)
- How skills relate to commands, bundles, and AGENTS.md
- The Triple Diamond phase model

This document supports F-05 (the builder references skill anatomy concepts) and helps new contributors understand what they're building.

### D-02: Public Docs Review

Review and update these files for v2.7.0 accuracy:

| File | Review focus |
|------|-------------|
| `docs/guides/*` | Do guides reflect current skill count (27), new CI scripts, utility skills? |
| `docs/reference/*` | Are reference docs current with frontmatter schema, classification types? |
| `docs/templates/skill-template/*` | Does the skill template match what the builder produces? |
| `docs/agent-skill-anatomy.md` | Is this the file D-01 should replace/extend? Check for overlap |
| `docs/getting-started.md` | Does it mention the builder? Updated skill count? |
| `scripts/README_SCRIPTS.md` | Does it document the 3 new M-12 scripts? |
| `QUICKSTART.md` | Updated for 27 skills, new commands? |
| `CHANGELOG.md` | v2.7.0 section needed at tag time |

## Notes

1. M-12 and F-06 were built by Codex 5.4, reviewed by Claude Opus 4.6.
2. F-05 design was reviewed by Codex, fixes applied by Claude. Implementation is Claude-assigned.
3. One workflow fix applied during review: duplicate steps removed from `validation.yml`.
4. M-16 was created from the F-05 staging/release-packaging review and should land before the final `v2.7.0` cut.
5. M-16 is implemented locally and verified on both bash and PowerShell release packagers; commit still pending.
