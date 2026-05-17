# v2.17.0 Release Plan (Stub)

**Status:** STUB. Promoted to ACTIVE at end of v2.16.0 cycle.
**Owner:** Maintainers
**Type:** Minor release (theme TBD post-v2.16.0)
**Created:** 2026-05-17 (during v2.16.0 Phase 0 adversarial review; closes FN-06 finding on dangling link from docs/concepts/active-orchestration.md)
**Updated:** 2026-05-17

---

## Where We Are

This is a STUB for v2.17.0 capturing items carried forward from v2.16.0 deferrals. The plan promotes to ACTIVE after v2.16.0 tags and the maintainer scopes which items take priority for v2.17.

v2.16.0 deferred a coherent set of items across CI tooling, hygiene, and forward-roadmap candidates. v2.17.0 is the natural home for most of them.

---

## Carry-Forward Items from v2.16.0

### CI plan deferred validators (5 items)

Per `../v2.16.0/ci-plan.md` deferral list. v2.16.0 shipped only the validate-agents-md extension (D19); the remaining 5 validator items defer here:

1. **check-runtime-components-sync.{sh,ps1,md}** - verify each `subagents/*.md` entry has a corresponding row in `docs/reference/runtime-components.md`. Currently runtime-components.md table is maintained by hand; drift would surface via pm-skill-auditor cross-cutting checks but not block CI.
2. **check-sub-agent-command-pair.{sh,ps1,md}** - verify each sub-agent has a companion slash command per `subagents/_pairing.yaml`. Currently enforced by manual maintainer workflow + existing validate-commands check on the dispatch skill side.
3. **check-em-dashes.{sh,ps1,md}** canonical script per master plan D27. v2.16 used perl one-liners during authoring; canonical script is v2.17 deliverable.
4. **check-aggregate-counters** as extension of check-landing-page-counts (per v2.15.1 carry-in reconciliation). v2.16 left check-landing-page-counts covering landing-page surface only; extension to CONTEXT.md + AGENTS.md surfaces is v2.17 work.
5. **Chain-permitted allowlist enforcement** - parse `subagents/*.md` frontmatter; detect `Agent` in `tools:`; fail build if name not in `subagents/_chain-permitted.yaml` per D21 HARD FAIL. v2.16 left this as MANUAL MAINTAINER CHECK at pre-tag pass.

Plus:

6. **Validator regex anchoring** per Codex FN-04 finding from v2.16.0 G1 review. The validate-agents-md sub-agent name check uses substring matching; should anchor on canonical format like `- \`pm-critic\`` under `## Sub-Agents` heading.
7. **validation.yml integration** for the new v2.17 validators in CI5 order with synthetic-failure tests.
8. **docs/contributing/ci-conventions.md** documents the new validators (pairs with the v2.17 validator ships).

### Doc-stack modernization (deferred per maintainer scope decision in v2.16 session)

Per `../v2.16.0/doc-stack-modernization-plan.md`. The Astro 6 upgrade was deferred to a dedicated session per maintainer decision; v2.17 is the natural home:

- Astro 5.13.x to 6.x upgrade
- Node 22.12+ across 5 CI workflows
- astro-mermaid compatibility verification
- Custom CSS audit + port
- Closes 2 Dependabot alerts (CVE-2026-XXXX define:vars XSS; CVE-2026-YYYY server-island replay)

### Repo hygiene (deferred from v2.16 to pre-tag pass + v2.17)

Per `../v2.16.0/repo-hygiene-plan.md`. Some items pair with v2.16 pre-tag; some defer to v2.17:

- **Already completed in v2.16 pre-tag** (planned): CONTEXT.md refresh, `_working/` archive sweep, backlog refresh, v2.17.0 stub creation
- **Deferred to v2.17:** Design Sprint family validator metadata-shape promotion from advisory to strict; completed F-XX effort docs archive; TODO/FIXME inventory + disposition

### Tier 2 deferrals from v2.16.0 stub (per master plan D17)

- Tags-as-feature doc-stack support (skills surface tags as sidebar facets)
- URL slug normalization across docs site (301 redirects for deprecated paths)
- sync-agents-md.yml workflow rewrite (two-layer defense + apply:true input gate)

### v2.17.0 candidate sub-agent + content additions (per master plan D18)

- **pm-workflow-orchestrator** sub-agent (Feature Kickoff scope; coordinates multi-skill workflows with quality-gate steps)
- **pm-frontmatter-doctor** sub-agent (opportunistic; the remediator pair to pm-skill-auditor)
- **AI-Native PM Pack** (4 new utility skills): eval-suite-spec, prompt-spec, model-card, ai-failure-mode-catalog
- **Content gap skills:** discover-market-sizing, define-prioritization-framework, discover-journey-map, discover-survey-analysis
- **Hook infrastructure (Tier 2 candidate):** R-24 PostToolUse frontmatter hook; R-65 hook-triggered sub-agent invocation (depends on v2.16 sub-agents shipping cleanly first)
- **User-settings infrastructure:** `.claude/pm-skills.local.md` parser per master plan D10 deferral (configurable pm-critic severity floor, auto-invoke behavior, skip-artifact-types per project)

### v2.16.0 GATE B + GATE C outcomes determine dispatch skill scope

Per `../v2.16.0/subagents-integration-plan.md` GATE B + GATE C status:

- **If GATE B passes** for pm-critic + auditor + curator dispatch skills: those skills are RATIFIED in v2.17 (move from EXPERIMENTAL to GA)
- **If GATE C passes** for conductor dispatch: that skill is RATIFIED in v2.17
- **If GATE C fails** (D-revised fallback): conductor dispatch skill removed from v2.17 catalog; conductor stays Claude-Code-only

v2.17 release plan should capture the GATE B + GATE C results in its Where We Are section once recorded.

---

## Out of Scope for v2.17.0 (Pre-Capture)

These items belong to v2.18+ per the v2.16 strategic arc:

- **PM Voice output style** (R-45 from roadmap)
- **Multi-reviewer critique board** (R-58; 3 critics with consensus filtering)
- **Family-steward sub-agent design** (master plan D8 defer; revisits when a third skill family ships and cross-family logic diverges)
- **pm-skills-mcp catalog unfreeze** (blocked on M-22 decision)

---

## Cross-References

- v2.16.0 master plan (predecessor): [`../v2.16.0/plan_v2.16.0.md`](../v2.16.0/plan_v2.16.0.md)
- v2.16.0 ci-plan deferred items: [`../v2.16.0/ci-plan.md`](../v2.16.0/ci-plan.md)
- v2.16.0 doc-stack-modernization-plan (deferred to dedicated session): [`../v2.16.0/doc-stack-modernization-plan.md`](../v2.16.0/doc-stack-modernization-plan.md)
- v2.16.0 hygiene plan: [`../v2.16.0/repo-hygiene-plan.md`](../v2.16.0/repo-hygiene-plan.md)
- Strategic roadmap (source for v2.17 candidates): [`../../_working/roadmap_opus-4.7-max_2026-05-14.md`](../../_working/roadmap_opus-4.7-max_2026-05-14.md)
- v2.17.0 dispatch skill GA criteria (GATE B + GATE C): records added in v2.16.0 post-tag pass + carried forward here when v2.17.0 promotes from STUB to ACTIVE

---

## Promotion to ACTIVE

Promote this stub to ACTIVE at end of v2.16.0 cycle by:

1. Updating Status block to ACTIVE
2. Picking a theme from the carry-forward items (likely CI hardening + Astro 6 + first pm-workflow-orchestrator sub-agent)
3. Scoping into 2-4 sub-plans following the v2.16.0 pattern
4. Identifying decision questions for maintainer review
5. Authoring spec docs for any new sub-agents in scope
