# v2.22.0 Naming Impact Analysis - before/after, end-user impact, repo blast radius

> Companion to [`plan_v2.22.0.md`](plan_v2.22.0.md), [`command-skill-naming-standard.md`](command-skill-naming-standard.md), and [`naming-map.md`](naming-map.md).
> Drafted 2026-05-27. Purpose: give the maintainer (and the planned Codex adversarial pass) a single view of what the 63-skill rename actually changes - what a user types, who breaks and when, and which files churn.
> This doc does NOT re-open the locked phase-prefix decision (D-V31-1=A). It examined whether a **vendor** prefix (`pm-`) should be added to the bare flat names, in light of a verified cross-runtime collision fact. Conclusion (section 2): no - `pm-` is meaningful per skill, not a generic stamp; the bare content names stay and the Codex collision risk is accepted as a documented tradeoff.

---

## 0. The verified fact that reframes the collision question

The decision briefs assumed short flat names are safe because Anthropic's bundled skills (`pdf`, `docx`) use them. That precedent does not transfer, and the gap is now confirmed against the live docs.

**Verified 2026-05-27 (OpenAI Codex docs + corroborating field reports):**

- Codex skill invocation `$skill-name` is a **flat global namespace**. There is no source-, plugin-, or directory-based scoping in the typed invocation.
- If two installed skills share a `name`, **Codex does not merge or disambiguate them** - both appear in skill selectors, and for implicit (model-driven) invocation the agent may pick whichever was discovered first.
- Plugins themselves are disambiguated (`$PLUGIN_NAME@$MARKETPLACE`) and MCP tools are prefixed (`mcp__service__tool`), but **the skill `$name` surface a user types is scoped by neither.** The plugin is namespaced; the skill you invoke is not.

This is the opposite of Claude Code, where every plugin skill is forced into `/pm-skills:<name>` and cannot collide with another plugin. The collision protection the catalog relies on today exists **only** on Claude Code.

> Provenance note: the exact Codex doc wording was retrieved via an AI-summarized fetch; the load-bearing conclusion (flat namespace, real collisions, no source scoping on `$name`) is independently corroborated by community write-ups. Re-confirm the precise quote at execution if a normative citation is needed (this is OQ-2's sibling and should be promoted to its own open question).

**Consequence:** generic single-token names are a genuine collision liability on Codex and any other flat-namespace runtime. The highest-risk names in `naming-map.md` are the ones a general-purpose or competing PM skill would plausibly also use:

`prd`, `persona`, `hypothesis`, `retrospective`, `edge-cases`, `journey-map`, `lean-canvas`, `user-stories`, `release-notes`, `acceptance-criteria`, `problem-statement`, `market-sizing`.

---

## 1. Before / after invocation, per runtime

Using `foundation-okr-writer` as the worked example.

| Surface | Today (v2.21.0) | After v2.22.0 (short name + alias) | After v3.0.0 (alias removed) |
|---|---|---|---|
| Claude Code `/` menu | `/pm-skills:foundation-okr-writer` **and** `/okr-writer` (command wrapper) | `/pm-skills:okr-writer` (+ `/pm-skills:foundation-okr-writer` alias, deprecated) | `/pm-skills:okr-writer` only |
| Claude Code palette rows | ~2 per capability (~136 total for 63) | ~2 per capability during alias window (skill + deprecated alias) | ~1 per capability (~63) |
| Codex typed | `$foundation-okr-writer` | `$okr-writer` (+ `$foundation-okr-writer` alias) | `$okr-writer` only |
| Codex implicit (description) | unchanged | unchanged | unchanged |
| Marketplace listing | the skill | the skill (short name) | the skill (short name) |

Key reads:
- The **command wrapper** (`/okr-writer` with no namespace) disappears entirely - it was Claude-Code-only legacy. Its short-name ergonomics move onto the skill `name`.
- On Claude Code the user always had a namespace; the rename only shortens the tail.
- On Codex the user gains a shorter handle but **loses the implicit disambiguation a longer name gave** (a long name is less likely to collide than a short one). This is the tension this doc exists to surface.

---

## 2. The `pm-` prefix: meaningful per-skill, never a generic stamp

An earlier draft of this doc treated the `pm-` on the utility skills as an inconsistently-applied vendor prefix and recommended adding it to all 63. **That was wrong, corrected 2026-05-27** after reading the actual skill descriptions. The `pm-` is meaningful in every skill that carries it, for one of three distinct reasons:

| Skill(s) | Why `pm-` belongs | Reason type |
|---|---|---|
| `pm-skill-builder`, `pm-skill-validate`, `pm-skill-iterate`, `pm-skill-auditor`, `pm-release-conductor`, `update-pm-skills` | the skill operates on the pm-skills library itself | system-tooling |
| `pm-critic` | reviews a **PM artifact**; `pm` names the subject, and bare `critic` would be hopelessly generic | domain word |
| `pm-changelog-curator` | matches the `@agent-pm-changelog-curator` sub-agent it dispatches to | sub-agent alignment |

There is no single tidy rule ("`pm-` = meta-tooling" does not hold: `pm-critic` is a domain word, `pm-changelog-curator` is branding alignment). The durable guidance is a **don't**, decided per skill:

> Keep `pm-` only where it carries real meaning in that specific name - the skill acts on the pm-skills library, the word "PM" names what the skill acts on, or the name must match a sub-agent it dispatches to. Never add `pm-` as a generic vendor stamp, and never strip it where it is meaningful. Decide per skill, not by blanket rule.

So the two general-purpose utilities correctly drop it (`mermaid-diagrams`, `slideshow-creator`), the eight meaningful ones keep it, and the 53 content skills get bare short names. **The locked `naming-map.md` already reflects this; it is principled, not inconsistent.**

### What about the Codex collision exposure on the bare content names?

That risk (section 0) is real and is **accepted as a documented tradeoff**, not solved with a blanket prefix - because a universal `pm-` would overload the meaningful `pm-` (making `pm-prd` read like a library-tool) and there is no clean alternative prefix worth the ergonomic cost. The exposure is paid down the way the plan already intends:

- The **description** is the primary cross-runtime interface (most invocation is natural-language, not typed `$name`); D-V31-5 holds it to a bar. This is the real mitigation.
- **Claude Code** namespaces every plugin skill (`/pm-skills:<name>`), so the exposure is Codex-and-similar only.
- The residual (a user typing `$prd` on Codex with a same-named third-party skill installed) is a known, low-frequency risk, recorded here so it is a choice rather than a surprise.

---

## 3. End-user impact - who breaks, where, when

| User / surface | v2.22.0 (this release) | v3.0.0 (convergence) |
|---|---|---|
| Claude Code user typing the short command wrapper (`/okr-writer`) | **Breaks now.** The un-namespaced wrapper is deleted this release. Mitigation: the namespaced skill `/pm-skills:okr-writer` is the replacement; the old prefixed name resolves as a deprecated alias. | n/a (already gone) |
| Claude Code user typing the namespaced prefixed skill (`/pm-skills:foundation-okr-writer`) | Still works (deprecated alias). | **Breaks** - alias removed. Must switch to short name. |
| Codex user typing `$foundation-okr-writer` | Still works (deprecated alias). | **Breaks** - alias removed. Must switch to `$<short>`. |
| Codex user relying on implicit (description) invocation | No change at any version (descriptions are held to a higher bar, not renamed). | No change. |
| Marketplace install (pinned to v2.21.0 commit `1065c3e`) | **No effect** - the pin is a SHA; the rename lands in a later tag. (OQ-3.) | No effect on the pin; new installs get short names. |
| New user discovering via description / `/skills` browse | Improved (cleaner names, enforced description floor). | Improved. |

Headline: **nothing a user invokes silently misbehaves in v2.22.0** except the deleted Claude command wrapper, which has a same-release namespaced replacement. The genuine breaking moment is v3.0.0 (alias removal), and it is signposted a full release ahead. This is what keeps v2.22.0 an additive minor.

The one residual cross-runtime risk the alias window does **not** cover: on Codex a short name could collide with a *different vendor's* skill the moment it ships (not a deprecation issue, a namespace-sharing issue). That risk is **accepted as a documented tradeoff** (section 2): there is no clean prefix that mitigates it without overloading the meaningful `pm-`, so it is paid down through the description bar rather than the name.

---

## 4. Repo blast radius

Live inventory (2026-05-27): a reference scan for phase-prefixed skill tokens found **1,457 occurrences across 250 files**. That raw number overstates the rewrite: it must be split into churn classes, because some of those files must NOT be touched.

| Class | Approx files | Action | Notes |
|---|---|---|---|
| Skill directories + `name:` fields | 63 dirs | **Rename** (dir + frontmatter `name`), verify `metadata.classification` present | The core mechanical change |
| Deprecated alias skills | +63 new | **Create** | Each: stub resolving to canonical, `metadata.deprecated: true`, one-line note |
| Command wrappers `commands/*.md` | 63 of 73 | **Delete** | Keep the 10 `workflow-*` |
| `workflow-*` command bodies | 10 | **Rewrite** internal skill references to short names | Kept, but they name the skills they orchestrate |
| Workflow docs (`_workflows/` + mirror `docs/workflows/`) | ~13 x2 | **Rewrite** skill references | High-density refs (e.g. `triple-diamond.md` 24, `lean-startup.md` 26) |
| `AGENTS.md` | 1 | **Rewrite** | Densest single file (76 occurrences) |
| Current-state docs (`docs/guides/`, `docs/getting-started/`, `docs/index.mdx`, `docs/changelog.md`) | ~25 | **Rewrite** current references; add a deprecation/rename note | |
| Agent context (`_agent-context/*/CONTEXT.md`) | ~2 active | **Rewrite** | Archived context: leave |
| Tooling (`.github/workflows/validation.yml`, `src/content.config.ts`, plugin/marketplace JSON) | ~4 | **Audit** - confirm nothing keys off the prefixed name | Risk of silent breakage if a glob/path assumes the prefix |
| **Historical release notes** (`docs/releases/Release_v2.x.md`, `docs/changelog.md` past entries) | ~12 | **DO NOT rewrite** | Frozen record; rewriting would falsify what shipped under the old names |
| **Library sample directories** (`library/skill-output-samples/<skill>/`, `library/sub-agent-samples/<skill>/`) | ~120 files | **Separate decision** | Dir names mirror skill names. Renaming is cosmetic and high-volume; recommend a follow-up, not gating v2.22.0. The sample *content* references old names as historical artifacts. |

`★ Takeaway:` the **must-rewrite-or-break** set is far smaller than 250 - it is roughly the 63 renames + 63 new aliases + 63 wrapper deletes + ~50 cross-reference files (workflows, AGENTS.md, current docs, tooling audit). The ~130 frozen/sample files are explicitly out of the gating rewrite. **The exact enumerated checklist now exists** as [`implementation-plan.md`](implementation-plan.md) (created 2026-05-27); this section is the sizing rationale, the impl-plan is the executor's checklist.

Two hazards this size implies, both already known from v2.21.0:
1. **Echo-miss drift** (fix doc A, miss its mirror in doc B): `_workflows/` and `docs/workflows/` are parallel copies - any rewrite must hit both. This is exactly the failure mode that needed 6 Codex passes on v2.21.0.
2. **Count breakdowns**: every per-classification count in current-state docs churns. Harden `check-count-consistency` to sub-counts (the v2.21.0 backlog item) *before* this rename so the breakdowns are guarded, not just the totals.

---

## 5. What this means for the plan

- The locked decisions (drop wrappers, deprecated aliases, validator-only, additive minor) are unaffected and sound. This analysis does not reopen them.
- **The `pm-` question is settled (section 2):** keep the locked map's names - bare for content skills, `pm-` retained only where meaningful per skill, no universal prefix. The Codex collision exposure on bare names is an accepted, documented tradeoff mitigated by the description bar. The per-skill rule is codified in the naming standard (R-A6).
- **Two open questions should be promoted/added:**
  - Promote the Codex flat-namespace fact from a buried assumption to an explicit, citation-backed open item (sibling of OQ-2).
  - Add the library-sample-directory rename as a non-gating follow-up decision.
- **Sequencing nudge:** land the `check-count-consistency` sub-count hardening *before* the rename, so the breakdown churn is CI-guarded during the highest-churn release in the line.

---

## 6. Sources

Cross-runtime invocation behavior verified 2026-05-27:
- Agent Skills - Codex (OpenAI Developers): https://developers.openai.com/codex/skills
- Codex CLI plugin/skill namespacing and collision discussion (community): https://codex.danielvaughan.com/2026/03/30/codex-cli-plugin-system/
- Managing skills across Claude Code, Codex, and `.agents` (community, collision field report): https://dev.to/bso_ba7259e2ef221ebb7166a/how-i-manage-40-skills-across-claude-code-codex-and-agents-folders-1aal

Internal:
- [`plan_v2.22.0.md`](plan_v2.22.0.md), [`command-skill-naming-standard.md`](command-skill-naming-standard.md), [`naming-map.md`](naming-map.md)
- Live repo scan 2026-05-27: 73 commands (10 `workflow-*`), 63 skill dirs; 1,457 prefixed-token occurrences across 250 files.
