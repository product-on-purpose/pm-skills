# pm-skills v2.16.0 Release Plan (Stub)

**Status:** Stub. Created 2026-05-11 to anchor structural items deferred from v2.14.x and v2.15.0 cycles. Promote to active planning when the v2.15.0 cycle closes.

**Theme (provisional):** Infrastructure and feature work that was held out of v2.15.0 to keep the sprint-skills release tight. The candidate theme is "Doc-Stack Modernization + Feature Polish": Astro 6 + Node 22.12+ upgrade as the backbone, with tags-as-feature, URL slug normalization, and the sync-agents-md.yml rewrite layered on top. Theme will be finalized when scoping starts.

---

## Carried-Forward Deferrals

These items were explicitly deferred to v2.16+ during the v2.14.x cycle close-out and reaffirmed during v2.15.0 scoping on 2026-05-11. Source: `AGENTS/SESSION-LOG/2026-05-10_07-00_claude_v2.14.0-tag-ship-and-post-tag-followups.md` (post-v2.14.2 deferral list) plus the 2026-05-11 sprint-skills scoping session.

### DI1: Tags-as-feature (sidebar facets + tag landing pages)

**Origin:** v2.14.2 close-out deferral list.

**What:** Activate Starlight's tag system so sidebar filters and tag landing pages are user-discoverable. Frontmatter `tags:` arrays already exist on many docs but are inert.

**Why deferred:** Feature work, not v2.14.x cleanup. Would have expanded v2.15.0 scope beyond sprint skills.

**Estimated effort:** 1 to 2 sessions. Depends on tag taxonomy decisions (which tags are user-visible vs. internal-only).

**Open questions:**
- Tag taxonomy: derive from existing frontmatter or curate a smaller user-visible set?
- Tag landing page layout: list of pages, grouped by section, or auto-generated index?

### DI2: URL slug normalization (release notes + legacy mixed-case URLs)

**Origin:** v2.14.2 close-out deferral list; W13 B2 F4 finding.

**What:** Normalize slugs for release-notes pages and any other legacy mixed-case URLs. Pattern is to move from `Release_v2.14.0.md` style URLs to lowercase-and-hyphenated slugs, with redirect entries in `astro.config.mjs` preserving inbound links.

**Why deferred:** Touches the redirect map (already large at 12+ entries from v2.14.0); requires careful Pagefind reindex; out of v2.14.x small-hygiene scope.

**Estimated effort:** 4 to 8 hours. Most of it is enumerating affected URLs and authoring the redirect entries.

**Risk:** Inbound external links to current Release_vX.Y.Z URLs would 404 if redirects are incomplete. Mitigation: comprehensive redirect coverage before slug rename, then production-URL audit.

### DI3: Astro 6 + Node 22.12+ upgrade

**Origin:** Decision 11 in v2.14 cycle plan; v2.14.2 close-out deferral list.

**What:** Bump Astro from 5.13.x (pinned during v2.14.0 spike) to 6.x. Astro 6 requires Node 22.12+, so all CI workflows and dev environments need to move together.

**Why deferred:** Major version upgrade with build-system blast radius. The v2.14.0 spike explicitly pinned Astro at 5.13.x because Astro 6's Node 22.12+ requirement was out of v2.14.x scope. Bundling this with sprint skills (v2.15.0) would have compounded scope risk: every sprint-skill page would have to be re-verified against the new build pipeline.

**Estimated effort:** 1 to 2 sessions. Spike pattern: prove Astro 6 builds on a feature branch before merging.

**Sequencing dependency:** v2.15.0's `v2.14.x-deferrals-cleanup-plan.md` Task 1 bumps three workflows to Node 22. v2.16.0 will need to bump all five workflows from Node 22 to Node 22.12+ (or Node 24).

**Dependabot closure bonus:** This upgrade also closes the 2 Dependabot alerts that v2.15.0's Task 3 left deferred: alert #10 (Astro: XSS in `define:vars` via incomplete `</script>` tag sanitization; patch 6.1.6) and alert #16 (Astro: server-island encrypted parameters vulnerable to cross-component replay; patch 6.1.10). Note: alert #15 was a package.json-manifest duplicate of #16 and was auto-deduped by Dependabot when the v2.15.0 Task 3 lock file landed. Net Dependabot alert count after this upgrade lands: 0.

**Open questions:**
- Plain Node 22.12+ jump or commit to Node 24 LTS?
- Does astro-mermaid 2.0.1 support Astro 6, or does it require its own upgrade?
- Do the existing custom CSS classes survive Astro 6's default styles?

### DI4: sync-agents-md.yml full rewrite

**Origin:** V7 in v2.14.0 cycle was tactical (disabled auto-trigger). v2.14.2 (d) added defense-in-depth (workflow_dispatch input gate + read-only token gate). v2.14.2 close-out: workflow's generation step still walks a stale glob.

**What:** Rewrite the workflow's generation step to walk the flat `skills/{phase-name}-{skill-name}/` structure correctly, then re-enable auto-trigger on push.

**Why deferred:** Currently defended by two safety layers (workflow input gate + read-only token gate). Not actively breaking. AGENTS.md is hand-authored canonical content while this workflow is dormant; the manual `update-agents-md` script is the working path.

**Estimated effort:** 2 to 4 hours.

**Risk:** Re-enabling auto-write to AGENTS.md without thorough testing could overwrite hand-edited canonical content. Mitigation: dry-run mode added before auto-trigger is re-enabled.

---

## Other Candidate Scope (Not Committed)

These items are not yet committed to v2.16.0 but are surfaced for scoping consideration.

- **JS theme-listener for true dark-mode-adaptive Mermaid** (V1 deferred from v2.14.0; solid-pastel palette is the accepted v2.14 posture per `docs/reference/mermaid-style-guide.md`).
- **Library samples scope expansion in link validator** (V6 partial; samples are excluded from validate-docs-frontmatter and check-internal-link-validity; full scope expansion would add ~115 files to those validators).
- **validate-mcp-sync.js maintenance flag awareness** (V9 was a workflow-default flip; cleaner solution is the validator reads `maintenance: true` from `pm-skills-mcp/pm-skills-source.json`).
- **Working-tree gitignore for sprint-skills-design swept files** (10 untracked working/ files swept into V15 commit per v2.14.2 close-out; partially resolved by 2026-05-11 sprint-skills reorganization; assess if anything remains).

---

## Out of Scope for v2.16.0

These are tracked elsewhere or explicitly held for later:

- pm-skills-mcp catalog unfreeze: blocked on M-22 decision; revisit when team adoption demand justifies.
- Knowledge OS workspace features: separate initiative since 2026-03-21.
- Any new skill family or new classification: v2.16.0 is an infrastructure release; net-new skills should be a v2.17.0+ topic.

---

## Cross-References

- v2.15.0 cleanup plan (closes the small-hygiene items): `docs/internal/release-plans/v2.15.0/v2.14.x-deferrals-cleanup-plan.md`
- v2.14.x close-out (authoritative deferral list): `AGENTS/SESSION-LOG/2026-05-10_07-00_claude_v2.14.0-tag-ship-and-post-tag-followups.md`
- Astro Starlight migration plan (Astro 5.13.x pin rationale): `docs/internal/release-plans/v2.14.0/plan_v2.14_starlight-migration.md`
- Backlog: `docs/internal/backlog-canonical.md` (refresh priority order when this stub promotes to active planning)

---

## Promotion Criteria

Promote this stub to a full v2.16.0 plan when:

1. v2.15.0 has tagged and shipped (both sprint-skills tracks released, cleanup plan tasks complete)
2. A theme decision is recorded (Astro 6 backbone vs. feature-only release vs. mixed)
3. Per-item open questions above have proposed answers (even if not yet ratified)

Until then, this file is a holding pen for in-flight scope conversations.
