# v2.18.0 Release Plan: Highest-Consensus PM Skill Gaps

**Status:** ACTIVE - v2.17.0 SHIPPED 2026-05-20; entrance criteria met; strategy briefs complete 2026-05-21; execution ready
**Owner:** Maintainers
**Type:** Minor release
**Theme:** Close the four highest-consensus PM-skill gaps surfaced across the 2026-05-08 backlog aggregations (Codex + Claude Sonnet) and the 2026-05-14 web research synthesis. Ship 4 content skills as a coherent slate.
**Created:** 2026-05-19
**Updated:** 2026-05-19

---

## Where We Are

The 2026-05-14 strategic roadmap identified four skills with **three-source consensus** (Codex backlog + Claude Sonnet backlog + web research):

1. **`discover-market-sizing`** (TAM/SAM/SOM) - R-06 P0
2. **`define-prioritization-framework`** (RICE/ICE/MoSCoW/Weighted Scoring/Kano) - R-07 P0
3. **`discover-journey-map`** (Customer journey with touchpoints + emotional curve) - R-10 P1
4. **`measure-survey-analysis`** (Survey results analysis + persona segmentation) - R-11 P1

Per the 2026-05-19 maintainer directive following v2.16.1 ship: v2.18.0 ships these 4 skills before opening any new strategic initiatives. Specifically: no AI-Native Pack (R-01/R-02/R-03), no paired-reviewer pattern pilot (R-19), no hook infrastructure expansion (R-24/R-65), no workflow orchestration (R-42/R-43). Just these 4 skills.

**See companion docs:**

- Strategic context: [`../../_working/roadmap_opus-4.7-max_2026-05-14.md`](../../_working/roadmap_opus-4.7-max_2026-05-14.md) Section 5 (R-06, R-07) + Section 6 (R-10, R-11)
- Roadmap delta: [`../../_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md`](../../_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md) Section 4.2 (v2.18.0 lock rationale)
- Predecessor plan: [`../v2.17.0/plan_v2.17.0.md`](../v2.17.0/plan_v2.17.0.md)
- Skill drafts: `spec_discover-market-sizing.md`, `spec_define-prioritization-framework.md`, `spec_discover-journey-map.md`, `spec_measure-survey-analysis.md`

---

## Scope

### Primary work items (committed to v2.18.0)

| ID | Item | Type | Classification | Phase | Effort | Spec |
|---|---|---|---|---|---|---|
| W1 | `discover-market-sizing` | NEW SKILL | phase | discover | 2-3 d | [`spec_discover-market-sizing.md`](spec_discover-market-sizing.md) |
| W2 | `define-prioritization-framework` | NEW SKILL | phase | define | 2-3 d | [`spec_define-prioritization-framework.md`](spec_define-prioritization-framework.md) |
| W3 | `discover-journey-map` | NEW SKILL | phase | discover | 2-3 d | [`spec_discover-journey-map.md`](spec_discover-journey-map.md) |
| W4 | `measure-survey-analysis` | NEW SKILL | phase | measure | 2-3 d | [`spec_measure-survey-analysis.md`](spec_measure-survey-analysis.md) |

**Total v2.18.0 effort: 8-12 effort-days.**

Each skill is independent (no shared infrastructure, no cross-skill dependencies). Can be parallelized across multiple authoring sessions or sequenced.

### Each skill ships with

- `skills/{phase}-{name}/SKILL.md` (canonical prompt + frontmatter; uses post-v2.17.0 metadata-nested structure per spec compliance)
- `skills/{phase}-{name}/TEMPLATE.md` (output template)
- `skills/{phase}-{name}/EXAMPLE.md` (worked example)
- `commands/{phase}-{name}.md` (companion slash command per pairing convention)
- 3 thread-aligned samples in `library/skill-output-samples/{phase}-{name}/`:
  - Brainshelf thread (B2C marketplace product)
  - Storevine thread (B2B platform/marketplace)
  - Workbench thread (internal-tools / dev-experience)

**Sample count per skill = 3** (per the family precedent established with Meeting Skills Family in v2.11.0 + Sprint Skills in v2.15.0).

**Skill count delta:** 59 to 63 (4 new phase skills; 26 to 28 in `discover`, no change in other classifications; phase total 26 to 30).

### Out of scope for v2.18.0 (explicit deferrals)

Per the maintainer directive "before opening any new strategic initiatives":

- AI-Native Pack (R-01 `measure-eval-suite-spec`, R-02 `develop-prompt-spec`, R-03 `develop-model-card`, R-14 `develop-ai-failure-mode-catalog`) - DEFERRED to v2.20+ pending competitive-risk reassessment per roadmap delta Section 4.10
- Paired-reviewer pattern (R-19) - DEFERRED pending 30-day pm-critic adoption signal
- Hook infrastructure expansion (R-24, R-65) - DEFERRED to v2.17.1 fast-follow OR v2.20+
- Workflow YAML promotion + workflow-orchestrator (R-42, R-43) - DEFERRED to v2.20+
- Curriculum MVP (R-39) - DEFERRED
- Public GOVERNANCE.md + ROADMAP.md (R-40) - DEFERRED
- Other content skills from roadmap P1-P3 (R-12, R-13, R-15, R-20, R-21, R-22, R-23, etc.) - DEFERRED
- Marketplace identity rename (v3.0.0) - separate release track

---

## Decisions

| # | Decision | Answer | Rationale |
|---|---|---|---|
| D1 | Release type | v2.18.0 (minor) | 4 new skills are additive. No breaking changes. SemVer minor. |
| D2 | Co-ship vs. stagger | Co-ship all 4 in v2.18.0 | Coherent "highest-consensus PM gaps" release narrative. Each skill is independent; staggering would create 4 small releases with diminishing narrative value. |
| D3 | Skill structure target | post-v2.17.0 metadata-nested frontmatter (per W1 spec) | v2.18.0 ships AFTER v2.17.0 per maintainer directive. New skills should use the new structure to avoid contributing to migration debt. |
| D4 | Sample count per skill | 3 thread-aligned samples (brainshelf + storevine + workbench) | Matches Meeting Skills Family + Sprint Skills precedent. Below 3 is inadequate per `feedback_pre-tag-validator-bundle` thread-balance expectation. |
| D5 | TEMPLATE.md + EXAMPLE.md per skill | Both required for each of the 4 | Standard phase-skill structure. TEMPLATE is the output scaffold; EXAMPLE is the worked walkthrough. |
| D6 | Slash command naming | `/discover-market-sizing`, `/define-prioritization-framework`, `/discover-journey-map`, `/measure-survey-analysis` | Matches phase-skill pairing convention. No abbreviation. Searchable; consistent. |
| D7 | Workflow integration | NO new workflow in v2.18.0; check whether existing workflows reference these skills naturally (e.g., `customer-discovery.md` workflow should mention `discover-journey-map`; `feature-kickoff.md` should mention `define-prioritization-framework`) | Per maintainer directive "before opening any new strategic initiatives." Updates to existing workflows = enhancements, not new initiatives. |
| D8 | Family contract | NO new family contract in v2.18.0 (these 4 are independent phase skills, not a family) | Family pattern is for skills that share output contracts. These 4 don't. |
| D9 | Validator strategy | Full pre-tag-validate bundle + post-v2.17 metadata structure validator | Per `feedback_pre-tag-validator-bundle`. v2.17.0's lint-skills-frontmatter (post-sweep version) validates the new structure. |
| D10 | Adversarial review | Run claude-opus-4.7 G1 review pre-tag (per Phase 0 Adversarial Review Loop). Codex review optional. | Each skill draft is a content artifact; pm-critic's adversarial frame is appropriate. |
| D11 | v2.18.0 entrance criteria | v2.17.0 must be tagged + shipped with G4 P0 attestation PASSING before v2.18.0 execution starts | v2.18.0 skills use the post-v2.17 frontmatter structure; v2.17 must ship first. |
| D12 | Promotion of R-01 (eval-suite-spec) into v2.18.0 | NO. v2.18.0 holds at exactly 4 skills | Per maintainer directive. Competitive-risk concern noted in roadmap delta Section 4.10; addressed separately in v2.20+ scoping. |
| D13 | Library sample thread coverage | brainshelf + storevine + workbench (same as established threads) | Reusing established threads keeps the sample library coherent. Each skill's sample tells a story in one thread; the 4 samples per thread cover different skills. |
| D14 | Tag SHA discipline | Per D22 (codified in v2.16.x): tag points at G2.5-captured SHA only | Honor the load-bearing invariant. |

---

## Deliverables

### Skill files (per skill x 4 = up to 16-20 files)

| Per-skill file | Notes |
|---|---|
| `skills/discover-market-sizing/SKILL.md` | Canonical prompt; full draft in `spec_discover-market-sizing.md` |
| `skills/discover-market-sizing/TEMPLATE.md` | Output scaffold |
| `skills/discover-market-sizing/EXAMPLE.md` | Worked example |
| `commands/discover-market-sizing.md` | Companion slash command |
| `library/skill-output-samples/discover-market-sizing/brainshelf.md` | Brainshelf thread sample |
| `library/skill-output-samples/discover-market-sizing/storevine.md` | Storevine thread sample |
| `library/skill-output-samples/discover-market-sizing/workbench.md` | Workbench thread sample |
| `library/skill-output-samples/discover-market-sizing/README.md` | Sample index |

(Same pattern repeated for the other 3 skills.)

### Documentation

| File | Change |
|---|---|
| `AGENTS.md` (singular file at repo root) | Add 4 new skill rows; update aggregate counts |
| `CHANGELOG.md` | v2.18.0 entry: 4 new skills + commands + samples |
| `docs/skills/index.md` (generated) | Re-generated to include 4 new skills |
| `docs/skills/{phase}/index.md` (generated; specifically discover/, define/, measure/) | Re-generated |
| `docs/releases/Release_v2.18.0.md` | Release notes (target ~200-300 lines: 4 skill summaries + use cases + cross-skill composition guidance) |
| `_workflows/customer-discovery.md` (if applicable) | Mention `discover-journey-map` if it fits the workflow |
| `_workflows/feature-kickoff.md` (if applicable) | Mention `define-prioritization-framework` if it fits |

### Release artifacts

| File | Change |
|---|---|
| `.claude-plugin/plugin.json` | Bump version to 2.18.0; refresh description with new skill count (59 to 63) |
| `.claude-plugin/marketplace.json` | Bump plugin version + description refresh |
| `CHANGELOG.md` | New `## [2.18.0]` entry |
| `docs/internal/release-plans/v2.19.0/plan_v2.19.0.md` | NEW stub for next-cycle deferral capture (created during v2.18.0 G4 P2) |

---

## Pre-release checklist (6-gate runbook)

Walk the 6-gate runbook codified in `docs/contributing/release-runbook.md` via `/pm-release v2.18.0`.

### G0: Pre-tag readiness

- [ ] Working tree clean
- [ ] `scripts/pre-tag-validate.{sh,ps1}` PASS (full bundle, --strict)
- [ ] Em-dash sweep PASS
- [ ] Aggregate counters updated for new skills (59 to 63 total skills; 26 to 28 discover; 4 to 5 define; 5 to 6 measure)
- [ ] All 4 new SKILL.md files use post-v2.17 metadata-nested frontmatter structure
- [ ] All 4 new skills have TEMPLATE.md + EXAMPLE.md + companion command + 3 thread-aligned samples
- [ ] Cross-cutting audit via pm-skill-auditor (chain or @-mention if native registration works post-v2.17)
- [ ] Master plan READY TO TAG state
- [ ] Release notes drafted
- [ ] v2.17.0 SHIPPED with G4 P0 attestation CONFIRMED PASSING (entrance criteria per D11)

### G1: Adversarial review

- [ ] claude-opus-4.7 G1 review run via `/pm-critic` on each of the 4 SKILL.md drafts
- [ ] All P0 findings closed; P1 findings closed or explicitly deferred
- [ ] Adversarial review specifically checks: (a) refusal protocols are present, (b) success criteria are testable, (c) sources are credibly cited where claims are made, (d) samples are realistic (not fabricated)

### G2: Version bump + CHANGELOG prep

- [ ] plugin.json version 2.17.0 to 2.18.0
- [ ] marketplace.json version + description refresh
- [ ] CHANGELOG.md v2.18.0 entry (Added section listing 4 skills + commands + samples + workflow updates)
- [ ] Release notes complete at docs/releases/Release_v2.18.0.md
- [ ] Hidden-comment leak check

### G2.5: Commit release-prep + re-verify

- [ ] Stage release-prep files (likely separate from skill-content commits which happened during execution)
- [ ] Commit with `chore(v2.18.0): release-prep edits`
- [ ] Re-run G0 validator bundle against new HEAD
- [ ] Push to origin/main
- [ ] Verify CI green on new commit
- [ ] Capture commit SHA

### G3: Tag + push

- [ ] Per D22, verify tag target SHA = G2.5 captured SHA
- [ ] Annotated tag message drafted
- [ ] `git tag -a v2.18.0 -m <message> <G2.5-SHA>`
- [ ] `git push origin v2.18.0` after explicit ship-it confirmation

### G4: Post-tag hygiene

- [ ] Plugin install path smoke test on Claude Code (P0): `/plugin update pm-skills` reports v2.18.0; all 4 new slash commands resolve
- [ ] Verify pm-critic auto-fires on a v2.18.0 skill output (verifies v2.17.0 native registration carries forward correctly)
- [ ] GitHub Release UI body authored with rich content from Release_v2.18.0.md (P2)
- [ ] v2.19.0 plan stub created with deferred items captured (P2)
- [ ] Memory snapshot refresh: 63 skills + post-v2.17 frontmatter structure
- [ ] Library sample thread-balance audit (each of 3 threads should have similar skill coverage; v2.18.0 adds 4 skills x 3 threads = 12 new samples)

---

## Migration guide outline

Per Release_v2.18.0.md (will be authored during G2):

### For users

```
# Update path
/plugin marketplace update
/plugin update pm-skills

# After update, pm-skills version reports 2.18.0
# Try the new skills:
/discover-market-sizing "AI-powered product analytics for B2B SaaS"
/define-prioritization-framework "Q3 roadmap candidates"
/discover-journey-map "First-time SaaS user activation"
/measure-survey-analysis "Q2 NPS survey results, 800 responses"
```

### Cross-skill composition guidance

The 4 new skills compose naturally with existing ones:

- `discover-market-sizing` feeds into `develop-solution-brief` then `deliver-prd` (sizing informs scope)
- `discover-journey-map` feeds into `define-problem-statement` then `define-hypothesis` (journey reveals pain points)
- `discover-research-plan` (existing) feeds into `measure-survey-analysis` (research, then analyze)
- `define-prioritization-framework` feeds into `deliver-roadmap` (rank, then sequence) when `deliver-roadmap` ships in v2.20+

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Skill drafts in spec files require significant rewriting at execution | Medium | Low | Treat drafts as starting points; G1 adversarial review will surface issues |
| Sample fabrication: writing 12 samples without real PM context produces low-quality outputs | High | Medium | Use established thread profiles (Brainshelf, Storevine, Workbench) consistently; have pm-critic adversarially review sample quality |
| Aggregate counter drift (e.g., AGENTS.md not updated when skill count changes 59 to 63) | Medium | Medium | check-aggregate-counters validator (currently advisory; may promote to strict in v2.17.x); pm-skill-auditor cross-cutting audit |
| v2.17 sweep introduced a frontmatter requirement we don't satisfy | Low | High | Validate each draft against post-v2.17 lint-skills-frontmatter BEFORE merging |
| Workflow updates (mentioning new skills in customer-discovery / feature-kickoff) create scope creep | Medium | Low | Hard-cap: at most 2 workflow files touched; each gets 1-line skill mention |
| Skill descriptions overlap with existing skills | Medium | Low | Description-collision check in pm-skill-auditor; refine wording to disambiguate |
| Competitive risk: AI-Native Pack remains deferred while v2.18.0 ships content gaps | Medium | Medium (long-term) | Acknowledged in roadmap delta Section 4.10; not blocking v2.18.0; address in v2.20+ scoping |

---

## Open decisions for maintainer

1. **AI-Native Pack timing.** Confirm v2.18.0 ships exactly these 4 skills and not R-01. Or, alternatively, promote R-01 alongside the 4 to make v2.18.0 a 5-skill release. Trade-off: holding the line vs. closing the competitive-risk window.
2. **`develop-pre-mortem` (R-12) or `develop-product-vision` (R-13) addition.** Both have multi-source consensus (not three-source like the 4 selected). Promote either or hold? Maintainer judgment.
3. **Workflow updates scope.** Mention `discover-journey-map` in `customer-discovery.md` workflow? Mention `define-prioritization-framework` in `feature-kickoff.md`? At most 2 workflow files touched in v2.18.0.
4. **Sample content depth.** Each sample is ~100-200 lines following thread profile. Confirm this level of investment per skill x 3 threads x 4 skills = 12 samples is the right depth (vs. less).
5. **v2.18.0 timeline.** If v2.17.0 ships within a week, can v2.18.0 follow within 2-3 weeks? Or is there a deliberate gap (e.g., 30-day pm-critic burn-in before more skills add)?

---

## Status block

- **Status:** SHIPPED 2026-05-22 (annotated tag v2.18.0 -> daf720e; GitHub Release Latest; tag CI green)
- **Entrance criteria:** v2.17.0 SHIPPED with G4 P0 attestation PASS - CONFIRMED 2026-05-20
- **Strategy briefs:** complete 2026-05-21; all 16 decisions locked (see `docs/internal/skills-ideas/*/strategy-brief.md`)
- **G2.5 commit SHA:** daf720e (final, after G1 pm-critic + 4 Codex adversarial passes + deep internal verification; ~26 findings resolved across c763ba3..daf720e)
- **Tag SHA:** daf720e (per D22; tag = the CI-verified SHA)

---

## Cross-references

- v2.17.0 plan (predecessor): [`../v2.17.0/plan_v2.17.0.md`](../v2.17.0/plan_v2.17.0.md)
- Strategic roadmap: [`../../_working/roadmap_opus-4.7-max_2026-05-14.md`](../../_working/roadmap_opus-4.7-max_2026-05-14.md)
- Roadmap delta: [`../../_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md`](../../_working/roadmap_opus-4.7-max_2026-05-14_issues-conflicts.md) Section 4.2
- Skill drafts (spec files):
  - [`spec_discover-market-sizing.md`](spec_discover-market-sizing.md) - W1
  - [`spec_define-prioritization-framework.md`](spec_define-prioritization-framework.md) - W2
  - [`spec_discover-journey-map.md`](spec_discover-journey-map.md) - W3
  - [`spec_measure-survey-analysis.md`](spec_measure-survey-analysis.md) - W4
- Release runbook (load-bearing artifact; G3 procedure): [`../../../contributing/release-runbook.md`](../../../contributing/release-runbook.md)

---

## Change log

| Date | Author | Change |
|---|---|---|
| 2026-05-19 | claude-opus-4.7 (v2.17/v2.18 scoping session) | Initial v2.18.0 plan created per maintainer 2026-05-19 directive. 4 highest-consensus skills locked: discover-market-sizing, define-prioritization-framework, discover-journey-map, measure-survey-analysis. AI-Native Pack and other strategic initiatives explicitly deferred to v2.20+. |
| 2026-05-21 | claude-sonnet-4.6 (v2.18.0 planning session) | Strategy briefs complete for all 4 skills; all 16 decisions locked. Specs reconciled: W1+W2 reframed as multi-framework meta-analysis (not single-method/single-framework selection); W3 scope corrected (funnel-as-UX-lens in scope; mermaid master+sectional); W4 raw-rows primary contract + qualitative-labels-only for stats. Entrance criteria confirmed met (v2.17.0 shipped 2026-05-20). |
