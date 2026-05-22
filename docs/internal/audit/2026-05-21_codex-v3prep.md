# Codex Audit: v2.18.x to v3 Prep

**Date:** 2026-05-21  
**Auditor:** Codex  
**Repository:** `E:\Projects\product-on-purpose\pm-skills`  
**Scope:** Current working tree on `main` plus the planned v2.18.0 skill release and v3.0.0 marketplace transition planning artifacts.  
**Primary requested output:** Critical audit covering best-practice alignment, best-in-class standard, end-user value, CI usefulness, improvement opportunities, corrections, issues, and suggestions.

---

## Executive Summary

pm-skills is in a strong position for v2.18.x content expansion and a v3 marketplace transition. The repo has a mature taxonomy, high-quality release discipline, a real validator ecosystem, session logs that preserve decision context, and a differentiated PM skill library built around evidence discipline rather than generic template filling.

The biggest concern is not the baseline catalog. The biggest concern is the gap between "release process says this is covered" and "the actual local release bundle covers it." The PowerShell pre-tag bundle passes, the docs build passes, and several CI-only enforcing checks pass when run manually. But the pre-tag bundle documentation and release-runbook still claim it runs checks that it does not actually run, while CI has additional enforcing steps outside the local bundle. That gap can create false confidence during v2.18.0 and becomes more dangerous before v3, when plugin marketplace architecture changes will make install-path validation more important.

For v2.18.0, the four planned skills are directionally right, but the plan and the newer strategy briefs are not yet reconciled. The strategy briefs intentionally reframe several skills from single-method execution into higher-value analysis modes. Those decisions must be folded into the `spec_*.md` drafts before implementation. There are also concrete corrections: the v2.18.0 plan misstates Discover count math, references at least one unshipped skill as existing, and underestimates how much sample realism matters for market sizing, journey maps, and survey analysis.

For v3.0.0, the marketplace skeleton is a good starting architecture, but it does not yet match the stated direction of changing the marketplace to `agent-skills`. It currently proposes `product-on-purpose/plugins`, a `product-on-purpose` marketplace identity, an unpinned `pm-skills` entry, and a placeholder `thinking-tools` entry marked `strict: true`. Before v3, the repo needs a naming decision, a compatibility/migration story for existing `pm-skills-marketplace` installs, pinned production entries, and CI that validates the new registry independently from the pm-skills plugin.

Recommended release posture:

1. Ship v2.18.x only after reconciling the four strategy briefs into the skill specs and fixing the count/reference defects.
2. Add a v2.18.x hardening patch or pre-v3 hygiene pass focused on validator parity, `.sh` line-ending enforcement, stale advisory noise, and script companion docs.
3. Treat v3 as an install/distribution release, not merely a metadata rename. Validate fresh install, upgrade from the old marketplace, pinned registry install, and direct plugin install before tag.

---

## Evidence Base

### Files explicitly reviewed

- `docs/internal/release-plans/v2.18.0/plan_v2.18.0.md`
- `docs/internal/release-plans/v2.18.0/spec_discover-market-sizing.md`
- `docs/internal/release-plans/v2.18.0/spec_define-prioritization-framework.md`
- `docs/internal/release-plans/v2.18.0/spec_discover-journey-map.md`
- `docs/internal/release-plans/v2.18.0/spec_measure-survey-analysis.md`
- `docs/internal/release-plans/v3.0.0/marketplace-repo-skeleton/README.md`
- `docs/internal/release-plans/v3.0.0/marketplace-repo-skeleton/plugin-repo-checklist.md`
- `docs/internal/release-plans/v3.0.0/marketplace-repo-skeleton/marketplace.json`
- `_agent-context/SESSION-LOG/2026-05-20_20-15_claude_v2.17.0-ship-w2-w3-w4-fp201-release.md`
- `_agent-context/SESSION-LOG/2026-05-20_12-00_claude_v2.16.x-ship-v2.17-w1-hookfix-readme-w2-phase0.md`
- `docs/internal/skills-ideas/*/strategy-brief.md` for the four v2.18.0 skills
- `scripts/pre-tag-validate.ps1`
- `scripts/pre-tag-validate.sh`
- `.github/workflows/validation.yml`
- `docs/contributing/release-runbook.md`
- `docs/contributing/ci-overview.md`
- `agents/pm-skill-auditor.md`

### External reference check

This audit also checked current public references for the agent-skill format and Claude Code subagent guidance:

- Agent Skills spec: `https://agentskills.io/specification`
  - Confirms the minimal skill package is a directory with `SKILL.md`, required `name` and `description`, optional `license`, `compatibility`, `metadata`, and experimental `allowed-tools`.
  - Recommends progressive disclosure and keeping the main `SKILL.md` under 500 lines.
- Anthropic Claude Code subagents: `https://docs.anthropic.com/en/docs/claude-code/sub-agents`
  - Confirms the core subagent model: focused responsibility, separate context, configurable tool access, and version-controlled project subagents.

The repo's v2.17.0 session logs add local plugin-runtime evidence not fully covered by those public pages: Claude Code scanned plugin-root `agents/*.md`, and a non-agent `agents/README.md` registered as a phantom subagent until removed.

### Validator and build evidence

Commands run from `E:\Projects\product-on-purpose\pm-skills`:

| Check | Result | Notes |
|---|---:|---|
| `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/pre-tag-validate.ps1` | PASS | 15 displayed checks passed. |
| `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-version-consistency.ps1` | PASS | Versions consistent at 2.17.0. |
| `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-plugin-install.ps1` | PASS | Current `pm-skills` plugin install path valid at 2.17.0. |
| `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-skill-family-registration.ps1` | PASS | Three registered families verified. |
| `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-references-cross-doc.ps1` | PASS | `docs/reference` cross-doc refs clean. |
| `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/check-mcp-impact.ps1` | PASS | No MCP-impacting additions or renames detected. |
| `npm run build` | PASS | Astro/Starlight built 346 pages; post-build stripped 935 links. One non-fatal `Entry docs -> 404 was not found` message appeared. |
| `node scripts/verify-edit-links.mjs dist .` | PASS | 345 edit-link targets resolve. |
| `dist` internal leakage check | PASS | No `internal` paths in build output. |
| `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/check-generated-freshness.ps1` | PASS | Generated workflow pages fresh. |
| `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/validate-script-docs.ps1` | FAIL | Missing companion docs for `validate-design-sprint-skills-family` and `validate-foundation-sprint-skills-family`. CI currently treats this as advisory. |
| `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/check-stale-bundle-refs.ps1` | WARN | 460 matches; advisory is noisy and includes legitimate historical references. |
| `powershell -NoProfile -ExecutionPolicy Bypass -File scripts/check-version-references.ps1` | WARN | 1153 version-reference drift matches in advisory mode; most appear to be provenance/history refs. |
| `bash scripts/pre-tag-validate.sh` from this Windows workspace | FAIL | Fails due WSL/node PATH and CRLF line endings in several `.sh` working-tree files. This is a local portability issue, not proof that GitHub Ubuntu CI is red. |

### Repo state at audit time

- Branch: `main...origin/main [ahead 1]`
- HEAD: `e0f59d3 docs(v2.18.0): add skill stubs + strategy briefs for W1-W4`
- Untracked: `docs/internal/audit/2026-05-20_hygiene-pruning.md`
- Ignored build outputs after audit verification: `.astro/`, `dist/`

Re-derived current counts:

| Surface | Count |
|---|---:|
| Skills | 59 |
| Phase skills | 26 |
| Discover skills | 3 |
| Define skills | 4 |
| Develop skills | 4 |
| Deliver skills | 6 |
| Measure skills | 5 |
| Iterate skills | 4 |
| Foundation skills | 8 |
| Utility skills | 10 |
| Tool skills | 15 |
| Commands | 66 |
| Subagents | 4 |
| Workflows | 12, excluding `_workflows/index.md` |
| Family contracts | 3 |

---

## Severity Model

- **P0:** Likely to block release or create broken installs/user-visible failure.
- **P1:** Fix before v2.18.x tag or before v3 if in the v3 path.
- **P2:** Important improvement; can ship with explicit deferral if visible and owned.
- **P3:** Polish, clarity, or signal-to-noise improvement.

---

## Findings

### P0 Findings

No current P0 was found in the working tree for the existing v2.17.0 catalog. The current plugin install validator passes, the PowerShell pre-tag bundle passes, the docs site builds, and the edit-link check passes.

This does not mean v2.18.0 or v3.0.0 is ready. The findings below are mostly P1/P2 because they are pre-release planning and validator-coverage issues rather than current shipped-user breakage.

### P1-01: The release runbook and auditor overstate what `pre-tag-validate` actually runs

**Location:** `docs/contributing/release-runbook.md:77`, `agents/pm-skill-auditor.md:43`, `scripts/pre-tag-validate.ps1:19-34`, `scripts/pre-tag-validate.sh:51-71`, `.github/workflows/validation.yml:128-303`

**Issue:** The runbook and auditor say the canonical pre-tag bundle runs the full enforcing validator inventory, including `validate-mcp-sync` / `check-mcp-impact`. The actual PowerShell bundle does not run several CI-enforcing checks. CI also enforces checks outside the local bundle, including:

- `validate-version-consistency`
- `validate-plugin-install`
- `validate-skill-family-registration`
- `validate-references-cross-doc`
- `npm run build`
- internal-path exclusion from `dist`
- `node scripts/verify-edit-links.mjs dist .`

**Why it matters:** v2.15.x already codified the lesson that "green-ish local checks" are not enough. The current docs say the local bundle is equivalent to CI. It is not. For v3, where the marketplace registry becomes a distribution boundary, plugin install and registry validation need to be part of the local release gate or the runbook needs to clearly say "pre-tag bundle plus CI-only release checks."

**Recommendation:** Before v2.18.0 tag, either:

1. Expand `pre-tag-validate.{ps1,sh}` to run all CI-enforcing release checks, including docs build and edit-link verification, or
2. Rename the claim: "pre-tag bundle covers validator scripts; release gate additionally requires build, edit-link, plugin-install, and cross-doc checks."

Preferred path: create `scripts/release-validate.{ps1,sh}` as the true G0/G2.5 release gate and let `pre-tag-validate` remain the fast validator subset.

### P1-02: v2.18.0 count math is wrong in the plan

**Location:** `docs/internal/release-plans/v2.18.0/plan_v2.18.0.md:60`, `docs/internal/release-plans/v2.18.0/plan_v2.18.0.md:147`

**Issue:** The plan says v2.18.0 moves "26 to 28 in discover" and repeats "26 to 28 discover" in G0. Current filesystem counts are:

- Discover: 3 -> 5 after adding `discover-market-sizing` and `discover-journey-map`
- Define: 4 -> 5 after adding `define-prioritization-framework`
- Measure: 5 -> 6 after adding `measure-survey-analysis`
- Phase total: 26 -> 30
- Total skills: 59 -> 63

**Why it matters:** The repo has a long history of count-drift defects, and v2.18.0 changes the count surfaces again. Wrong planned counts will propagate into README, AGENTS.md, plugin descriptions, release notes, generated pages, and sample library claims.

**Recommendation:** Patch the plan before execution:

```text
Skill count delta: 59 -> 63 total; phase skills 26 -> 30; discover 3 -> 5; define 4 -> 5; measure 5 -> 6.
```

### P1-03: v2.18.0 specs and strategy briefs are not reconciled

**Location:** `docs/internal/skills-ideas/discover-market-sizing/strategy-brief.md`, `docs/internal/skills-ideas/define-prioritization-framework/strategy-brief.md`, `docs/internal/skills-ideas/discover-journey-map/strategy-brief.md`, `docs/internal/skills-ideas/measure-survey-analysis/strategy-brief.md`, paired with all four `docs/internal/release-plans/v2.18.0/spec_*.md`

**Issue:** The newly added strategy briefs make major product-quality decisions that are not yet reflected in the older spec drafts:

- `discover-market-sizing`: decided identity is multi-framework meta-analysis, external-market only, quick/rigorous modes, fetch-optional with source-calibrated confidence. The spec still leans single-method and includes an internal Workbench sizing sample.
- `define-prioritization-framework`: decided identity is multi-framework parallel analysis with a comparison table and synthesis. The spec still frames the skill as choosing one framework.
- `discover-journey-map`: decided scope includes journey/flow/funnel as UX lenses and excludes service blueprints; hypothesis mode is the adoption-preserving path. The spec still redirects "funnel" as if it is categorically not a journey artifact.
- `measure-survey-analysis`: decided raw rows are the primary input contract, but large-dataset fallback must be explicit. The spec leans summary-friendly and mentions confidence intervals in a way that could imply false statistical precision.

**Why it matters:** If implementation copies the `spec_*.md` drafts directly, it will ship a less differentiated slate than the strategy briefs describe. The briefs move the skills toward best-in-class behavior: triangulation, sensitivity, explicit confidence, and refusal with useful fallback.

**Recommendation:** Add a "Spec reconciliation complete" gate before authoring `SKILL.md` files. Do not start implementation until each `spec_*.md` has a short "Decisions applied from strategy brief" section or is rewritten to match the brief.

### P1-04: v3 marketplace skeleton conflicts with the stated `agent-skills` direction

**Location:** `docs/internal/release-plans/v3.0.0/marketplace-repo-skeleton/README.md:1-21`, `docs/internal/release-plans/v3.0.0/marketplace-repo-skeleton/marketplace.json:2-31`

**Issue:** The user-level direction says v3 changes "the marketplace to agent-skills." The current skeleton proposes:

- Repo path: `product-on-purpose/plugins`
- Marketplace identity: `product-on-purpose`
- Marketplace name in JSON: `product-on-purpose`
- Plugin entries: `pm-skills`, `thinking-tools`

There is no `agent-skills` naming in the skeleton.

**Why it matters:** Marketplace naming is install-path API. A late rename from `product-on-purpose/plugins` to `product-on-purpose/agent-skills` or from `@product-on-purpose` to `@agent-skills` would invalidate docs, examples, tests, and maybe cached marketplace identity behavior.

**Recommendation:** Make the naming decision before any v3 implementation:

| Decision | Option A | Option B | Audit recommendation |
|---|---|---|---|
| Registry repo | `product-on-purpose/plugins` | `product-on-purpose/agent-skills` | Use `agent-skills` if that is the strategic public category; otherwise remove the phrase from v3 scope. |
| Marketplace identity | `product-on-purpose` | `agent-skills` or `product-on-purpose-agent-skills` | Prefer stable org identity if multiple future marketplaces may exist; prefer `agent-skills` if this repo is meant to be the public category brand. |
| Existing path compatibility | Keep `pm-skills-marketplace` path working for one release | Break and document reinstall | Prefer compatibility window plus migration guide. |

### P1-05: v3 skeleton has unpinned and placeholder production-looking entries

**Location:** `docs/internal/release-plans/v3.0.0/marketplace-repo-skeleton/README.md:36`, `docs/internal/release-plans/v3.0.0/marketplace-repo-skeleton/plugin-repo-checklist.md:55-68`, `docs/internal/release-plans/v3.0.0/marketplace-repo-skeleton/marketplace.json:14-31`

**Issue:** The skeleton correctly says production entries should pin `sha`, but the draft `marketplace.json` omits `sha`. It also includes a placeholder `thinking-tools` entry with `strict: true`.

**Why it matters:** A v3 marketplace exists to distribute multiple independent plugins. That registry should be more conservative than a single-plugin repo manifest. Unpinned entries reduce release reproducibility. Placeholder strict entries train future maintainers to treat non-validated entries as validated.

**Recommendation:** Make the skeleton production-safe by default:

- Use an obviously non-production file name for examples, e.g. `marketplace.example.json`.
- In the real `marketplace.json`, require `sha` for every production plugin.
- Remove placeholder plugins from production JSON or set `strict: false` and `status: "placeholder"` only if the schema permits it.
- Add CI that fails if a marketplace entry has no `sha`, points to no tag, or uses `strict: true` without a passing install smoke test.

### P1-06: Bash validator portability is still fragile on Windows workspaces

**Location:** `git ls-files --eol scripts/*.sh`, `scripts/pre-tag-validate.sh`, no `.gitattributes`

**Issue:** `bash scripts/pre-tag-validate.sh` failed in this Windows workspace because:

- Several `.sh` files are LF in the index but CRLF in the working tree.
- The repo has no `.gitattributes`.
- `core.autocrlf` is `true`.
- WSL Bash could not find `node` in its PATH.

Files with `w/crlf` included `check-generated-content-untouched.sh`, `check-internal-link-validity.sh`, `validate-docs-frontmatter.sh`, `validate-references-cross-doc.sh`, `validate-skill-family-registration.sh`, `validate-skill-history.sh`, and `validate-skills-manifest.sh`.

**Why it matters:** v2.17.0 invested in bash-3.2 compatibility. That is valuable, but line-ending policy is a separate portability class. A Windows maintainer can still get a local Bash false-red or fail to reproduce Ubuntu CI.

**Recommendation:** Add `.gitattributes`:

```gitattributes
*.sh text eol=lf
*.ps1 text eol=crlf
*.md text
*.mjs text eol=lf
*.js text eol=lf
*.json text eol=lf
```

Then renormalize only the affected scripts in a dedicated hygiene commit. Also document the Windows Node PATH gotcha in `docs/contributing/ci-overview.md` or `scripts/pre-tag-validate.md`.

### P1-07: Missing script companion docs are already detectable but not enforced

**Location:** `scripts/validate-script-docs.ps1` output, `.github/workflows/validation.yml:156-162`

**Issue:** `validate-script-docs.ps1` fails because these script pairs lack companion `.md` docs:

- `scripts/validate-design-sprint-skills-family.md`
- `scripts/validate-foundation-sprint-skills-family.md`

CI runs the check with `continue-on-error: true`.

**Why it matters:** This repo explicitly uses script docs as part of validator discoverability and maintenance. The two missing docs are for family validators that matter to the highest-quality part of the catalog. Advisory-only means the defect can remain indefinitely.

**Recommendation:** Add both docs before v2.18.0. Then decide whether `validate-script-docs` should become enforcing. If advisory remains intentional, add a tracked allowlist so the advisory can be useful rather than permanently red.

### P2-01: v2.18.0 references unshipped skills as if they exist

**Location:** `docs/internal/release-plans/v2.18.0/plan_v2.18.0.md:221`, `docs/internal/release-plans/v2.18.0/spec_measure-survey-analysis.md:51`, `docs/internal/release-plans/v2.18.0/spec_measure-survey-analysis.md:210`, `docs/internal/release-plans/v2.18.0/spec_discover-journey-map.md:196`, `docs/internal/release-plans/v2.18.0/spec_discover-market-sizing.md:201`

**Issue:** The plan says "`discover-research-plan` (existing)" feeds into survey analysis. No such skill exists in `skills/`. The specs also reference `develop-product-vision` and `deliver-roadmap`, which are not in the current catalog.

**Why it matters:** Forward references are useful, but "existing" references create user confusion and can break link checks if converted into links. They also overstate composability in release notes.

**Recommendation:** Use explicit status labels:

- `discover-research-plan` -> `planned / unshipped`
- `develop-product-vision` -> `planned / unshipped`
- `deliver-roadmap` -> `planned / unshipped`

For v2.18.0 user-facing docs, only list existing downstream skills as available and put planned skills in a "future composition" subsection.

### P2-02: The four v2.18 skills are high-value, but the release needs mode design before content writing

**Location:** all v2.18 `spec_*.md` and `docs/internal/skills-ideas/*/strategy-brief.md`

**Issue:** The highest-value behavior for each planned skill is mode-dependent:

- Market sizing: quick estimate vs rigorous sourced analysis.
- Prioritization: estimation scaffold vs scored comparison.
- Journey mapping: evidence-grounded map vs hypothesis mode.
- Survey analysis: raw-row analysis vs summarized input fallback.

**Why it matters:** Without explicit mode design, users will either be blocked too often or receive overconfident artifacts. The best-in-class standard is not "refuse more"; it is "refuse false certainty and route the user into a bounded artifact that is still useful."

**Recommendation:** Each v2.18 `SKILL.md` should include a short "Modes" section, a default mode, and a "when inputs are insufficient" behavior. Make the mode visible in the output header.

### P2-03: Sample realism is the dominant quality risk for v2.18.0

**Location:** `docs/internal/release-plans/v2.18.0/plan_v2.18.0.md:231`, all four sample inventory sections

**Issue:** The plan correctly flags sample fabrication risk. The risk is higher than normal because these artifacts deal with numbers, survey responses, market figures, emotions, and prioritization scores.

**Why it matters:** The sample library is how users learn what "good" looks like. If samples quietly invent data, users will copy the wrong behavior. If samples are clearly illustrative, with assumptions and confidence labels, they become teaching assets.

**Recommendation:** For every v2.18 sample:

- Add a "Sample data status" line: `Illustrative`, `Synthetic`, or `Provided source`.
- Add an "Assumptions used" table.
- For quotes, state whether quotes are synthetic or provided.
- For market figures, cite sources or label as assumptions.
- For survey counts, include N and response basis.
- For journey emotions, label evidence vs hypothesis per row.

### P2-04: CI has too many noisy advisories to be decision-useful

**Location:** `.github/workflows/validation.yml`, `scripts/check-stale-bundle-refs.ps1`, `scripts/check-version-references.ps1`

**Issue:** Advisory checks currently produce large noisy outputs:

- `check-stale-bundle-refs`: 460 matches, many historical or legitimate.
- `check-version-references`: 1153 matches, mostly provenance/history references.
- `validate-script-docs`: known failure but non-blocking.

**Why it matters:** Noisy advisory checks teach maintainers to ignore warnings. That makes future real warnings less likely to be acted on.

**Recommendation:** Create explicit allowlist / provenance marker patterns and make advisory outputs trend-based:

- New unexpected matches: visible and actionable.
- Known historical matches: suppressed or summarized.
- Strict mode: enforce only current-state claims, not historical release notes.

### P2-05: `pm-skill-auditor` promises cross-cutting checks that are not automated enough

**Location:** `agents/pm-skill-auditor.md:43-96`, `skills/utility-pm-skill-auditor/SKILL.md`

**Issue:** The auditor prompt says it runs cross-cutting checks such as skill-without-command, sample gaps, description collision, counter consistency, family orphans, and sub-agent integrity. Some of that is script-backed; some is still manual prompt behavior.

**Why it matters:** Manual prompt checks are useful for a deep audit, but release gates should prefer deterministic scripts for known defect classes. As the repo grows to 63 skills and multiple marketplace plugins, cross-cutting prompt-only governance will get less reliable.

**Recommendation:** Convert the most stable cross-cutting checks into scripts before v3:

- `check-skill-command-symmetry`
- `check-sample-thread-balance`
- `check-agent-nonagent-md`
- `check-marketplace-pinned-sources`
- `check-forward-skill-references`

Then let `pm-skill-auditor` aggregate script outputs and add judgment, rather than be the only implementation.

### P2-06: v3 needs upgrade tests, not only fresh-install tests

**Location:** `docs/internal/release-plans/v3.0.0/marketplace-repo-skeleton/*`, current `.claude-plugin/marketplace.json`

**Issue:** The v3 skeleton describes a new multi-plugin registry, but does not yet define migration verification from the current install commands:

```text
/plugin marketplace add product-on-purpose/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```

to the future registry path and identity.

**Why it matters:** Existing users are more valuable than hypothetical new users. A fresh install can pass while upgrade users get duplicate marketplaces, stale cached identity, or an old plugin source.

**Recommendation:** Add a v3 G4 smoke-test matrix:

| Scenario | Expected result |
|---|---|
| Fresh install from new marketplace | `pm-skills` installs at v3.0.0. |
| Update existing v2.18.x install from old marketplace | User gets clear migration instructions or a working update path. |
| Remove old marketplace then add new marketplace | No duplicate commands or stale plugin cache. |
| Install direct from `product-on-purpose/pm-skills` | Still works as fallback. |
| Install pinned marketplace entry | Installed commit matches registry `sha`. |

### P2-07: The docs build passes but has one unexplained post-build message

**Location:** `npm run build` output

**Issue:** The build exited 0 and produced 346 pages, but emitted:

```text
Entry docs -> 404 was not found.
```

**Why it matters:** This is not currently a blocker, but unexplained build messages tend to become normalized. If it indicates a stale sidebar/edit-link/base-path assumption, it could hide a future docs regression.

**Recommendation:** Investigate after v2.18.0 content work, unless it grows or becomes user-visible. If benign, change the script to label it as a warning with context.

### P3-01: Workflows count is easy to miscount because `_workflows/index.md` lives beside real workflows

**Location:** `_workflows/`

**Issue:** A raw file count gives 13 workflow files, but the real workflow count is 12 excluding `index.md`.

**Why it matters:** This is minor, but count drift is a recurring repo issue. Any new count script should explicitly exclude index files.

**Recommendation:** Centralize count derivation in one script or JSON output and reuse it in release notes, README updates, and plugin descriptions.

### P3-02: v2.18.0 plan still has unresolved open decisions despite later strategy briefs recording decisions

**Location:** `docs/internal/release-plans/v2.18.0/plan_v2.18.0.md:239-245`, `docs/internal/skills-ideas/*/strategy-brief.md`

**Issue:** The parent plan still asks open decisions that the strategy briefs partially resolve.

**Why it matters:** Future agents may re-litigate decisions already made or implement the parent plan as stale.

**Recommendation:** Add a parent-plan addendum:

```text
2026-05-21 strategy-brief decisions recorded. See docs/internal/skills-ideas/*/strategy-brief.md. Specs must be reconciled before implementation.
```

---

## Best-Practice Alignment

### What is already strong

1. **Specification alignment:** v2.17.0 migrated skill-specific fields under `metadata`, matching the Agent Skills spec's minimal top-level field model.
2. **Progressive disclosure:** Most skills use `SKILL.md` with optional templates, examples, and references. This aligns with the spec's progressive-loading model.
3. **Evidence discipline:** Many planned v2.18 skills explicitly refuse fabricated market numbers, emotional states, scores, and survey significance.
4. **Release discipline:** The six-gate runbook, G2.5 tag-SHA invariant, and session logs are above typical open-source release hygiene for a skill library.
5. **User-facing coherence:** Triple Diamond taxonomy plus foundation/tool/utility classification gives users a navigable mental model.
6. **Cross-client reality:** The dispatch-skill pattern is pragmatic: Claude Code can use native subagents; non-Claude clients can execute inline.
7. **Docs verification:** Astro build, internal exclusion check, and edit-link verification provide real user-facing docs confidence.

### Where "best-in-class" requires more

1. **Deterministic validation over prompt-only governance:** Any defect class found twice should become a script, not just an auditor instruction.
2. **Install-path contract tests:** v3 must validate marketplace behavior as a product API.
3. **Trust and provenance:** Agent-skill ecosystems now need stronger trust posture: pinned registry entries, source provenance, tool permissions, and clear strict-mode meaning.
4. **Mode clarity:** PM artifacts under uncertainty need visible modes and confidence labels, not only refusal text.
5. **Sample honesty:** Synthetic PM samples should label what is invented, assumed, or sourced.
6. **Signal hygiene in CI:** Advisory checks should be actionable, not giant expected-warning dumps.

---

## End-User Value Audit

### Current catalog

The current 59-skill catalog is valuable because it covers real PM workflows rather than toy prompts: PRDs, hypotheses, acceptance criteria, OKRs, meeting artifacts, sprint methods, release notes, instrumentation specs, and adversarial review. The strongest user value is consistency: a PM can ask for the same kind of artifact repeatedly and get a standard structure with assumptions and evidence.

The risk is surface-area overload. At 63 skills after v2.18.0, discovery and command selection become harder unless docs, commands, and workflows help users route themselves. The v2.18.0 skills should therefore include composition guidance and "use this when / use another skill when" boundaries.

### v2.18.0 slate value

| Skill | User value | Main risk | Best-in-class requirement |
|---|---|---|---|
| `discover-market-sizing` | High. Helps investment cases, strategy, prioritization, and board narratives. | Fabricated market numbers and false precision. | Multi-method triangulation, source quality labels, quick vs rigorous mode, no internal-tool dilution. |
| `define-prioritization-framework` | High. Prioritization is frequent and painful. | Cargo-cult framework execution. | Multi-framework comparison and divergence analysis, not just RICE. |
| `discover-journey-map` | High. Makes research usable and product opportunities visible. | Invented emotional curves. | Hypothesis mode with structural labels; evidence-grounded mode when data exists. |
| `measure-survey-analysis` | Medium-high. Complements interview synthesis and measurement skills. | Overstated statistical claims. | Methodology audit, qualitative confidence labels, no fake significance testing, raw-data limits. |

The slate is coherent if positioned as "analysis under uncertainty." That message is stronger than "four highest-consensus PM gaps." It also differentiates pm-skills from generic prompt packs.

### v3 marketplace value

The v3 direction has real user value if it lets users install only the collections they need. A multi-plugin marketplace can support:

- `pm-skills` for product management artifacts.
- `thinking-tools` for reasoning frameworks.
- Future specialist plugins without bloating pm-skills.

But users will only experience that value if install commands are stable, the marketplace identity is clear, and plugin entries are trustworthy. A v3 marketplace that changes names without a migration path will feel like packaging churn.

---

## CI Usefulness Audit

### Useful and worth keeping

- Cross-platform validation on Ubuntu and Windows.
- `validate-plugin-install` as an enforcing check.
- Docs build plus internal-path leakage check.
- Edit-link verification after build.
- Count consistency and landing-page count checks.
- Family validators for Meeting, Foundation Sprint, and Design Sprint skills.
- Generated-content untouched and generated-freshness checks.

### Weak spots

1. **Local release gate mismatch:** The local pre-tag bundle does not cover the full CI-enforcing surface.
2. **Advisory noise:** Some advisory checks are permanently noisy and therefore easy to ignore.
3. **Line-ending fragility:** No `.gitattributes` means Windows worktrees can mutate `.sh` execution semantics.
4. **Script docs not enforced:** Known missing docs stay unresolved.
5. **CI overview drift:** `docs/contributing/ci-overview.md` says pre-tag runs the same enforcing set; that statement needs tightening or the script needs expansion.

### Recommended CI roadmap

| Timing | Change |
|---|---|
| Before v2.18.0 | Fix count math, missing script docs, and spec reconciliation. |
| v2.18.0 G0 | Run PowerShell pre-tag, CI-only enforcing checks manually, docs build, edit-link verification. |
| v2.18.x fast-follow | Add `.gitattributes`; normalize `.sh`; make `validate-script-docs` clean. |
| Before v3 | Add marketplace registry validation with pinned SHA checks. |
| v3 G4 | Add install/upgrade smoke tests for old and new marketplace paths. |

---

## v2.18.x Release Audit

### What to keep

- Keep the four-skill scope. It is coherent and manageable.
- Keep the three thread-aligned samples per skill.
- Keep the explicit deferral of AI-native skills if the maintainer wants v2.18.x to stay content-focused.
- Keep no new family contract. The four skills share a philosophy but not a common output contract.
- Keep adversarial review as a G1 requirement.

### What to correct before implementation

1. Fix count math in `plan_v2.18.0.md`.
2. Reconcile `spec_*.md` with strategy briefs.
3. Replace "existing" references to unshipped skills.
4. Add mode sections to all four skill drafts.
5. Add sample-data provenance conventions.
6. Update G0 to require the CI-only release checks that pre-tag does not run.
7. Add an explicit "no fabricated sample data without label" acceptance criterion.

### Skill-specific recommendations

#### `discover-market-sizing`

Current direction should change from "select one method" to "triangulate multiple methods." This skill should be strict because market sizing errors are high-impact. It should support quick estimates but loudly label them as low confidence and assumption-driven.

Add output sections:

- `Mode`
- `Source inventory`
- `Method 1: top-down`
- `Method 2: bottom-up`
- `Method 3: analogous/comparable`
- `Convergence / divergence`
- `Sensitivity`
- `What would improve confidence`

Remove or re-thread the internal Workbench sample. Internal investment sizing is useful, but it is not market sizing. It deserves either a separate future skill or an explicitly out-of-scope note.

#### `define-prioritization-framework`

The strategy brief is right: the value is framework comparison. Users do not need another RICE calculator. The skill should show how the decision changes when the method changes.

Add output sections:

- `Applicable frameworks`
- `Excluded frameworks and why`
- `Scoring inputs / estimation scaffold`
- `Framework comparison table`
- `Ranking convergence`
- `Ranking divergence`
- `Recommendation`

Kano should require customer research. Weighted scoring should label default weights as a choice, not a fact.

#### `discover-journey-map`

This is the highest fabrication-risk skill. Hypothesis mode is the right adoption compromise, but it must be structural. Every emotional and pain-point row should have `Evidence status` and `Confidence`.

Update scope:

- In scope: journey maps, UX flows, funnel-as-user-experience-lens.
- Out of scope: service blueprints, operational process maps, system architecture diagrams.

Mermaid should be helpful but not load-bearing. The table artifact must stand on its own.

#### `measure-survey-analysis`

This skill should avoid pretending to be a statistics package. It should use qualitative confidence labels, sample-size heuristics, and explicit limitations. If raw rows are primary, it needs a context-limit behavior:

- If raw rows fit: analyze and cross-tabulate.
- If raw rows do not fit: request aggregate table or representative sample.
- Never silently truncate.

Open-text quotes must come only from provided excerpts. Counts should be labeled approximate unless computed from structured data.

---

## v3 Marketplace / Agent-Skills Transition Audit

### Current v3 skeleton strengths

- One registry repo, multiple independent plugin repos is the right architecture.
- One-way marketplace-to-plugin association is a good rule.
- Per-plugin SemVer is correct.
- Pinning guidance is correct, even though the sample JSON does not yet follow it.
- The checklist recognizes skills, commands, agents, hooks, MCP, and workflows as possible plugin components.

### Required decisions before implementation

1. **Marketplace name:** Is the public marketplace `product-on-purpose`, `plugins`, or `agent-skills`?
2. **Repo path:** Is the future repo `product-on-purpose/plugins` or `product-on-purpose/agent-skills`?
3. **Compatibility:** Does `product-on-purpose/pm-skills` remain a marketplace entry by itself?
4. **Identity migration:** What happens to users who installed `pm-skills@pm-skills-marketplace`?
5. **Pinning:** Are registry entries pinned to tag SHAs for production?
6. **Strict semantics:** What must pass before an entry can be `strict: true`?
7. **Placeholder policy:** Are placeholders allowed in production registry JSON? Recommendation: no.

### Recommended v3 acceptance criteria

- New marketplace repo exists and contains only registry/docs files.
- `pm-skills` remains independently installable from its repo.
- New registry entry for `pm-skills` is pinned to the v3 tag SHA.
- Fresh install from new registry works.
- Existing install from old registry has documented migration path.
- No placeholder plugin appears in production marketplace JSON.
- Registry CI validates JSON schema, required fields, pinned SHA, tag existence, and installability.
- pm-skills release notes explain the marketplace change as a distribution change, not a skill behavior change.

---

## Suggested Work Plan

### Phase A: Immediate v2.18.0 corrections

1. Patch count math in `plan_v2.18.0.md`.
2. Add a plan addendum pointing to the four strategy briefs.
3. Reconcile each spec with its strategy brief.
4. Replace unshipped-skill references with "planned/unshipped" labels.
5. Add sample provenance rules to the v2.18.0 plan.

### Phase B: v2.18.0 implementation quality gates

1. Author SKILL.md, TEMPLATE.md, EXAMPLE.md, command, and samples per skill.
2. Run `pm-critic` or equivalent adversarial review on each skill and at least one sample per skill.
3. Run full PowerShell pre-tag bundle.
4. Run CI-only release checks locally: version consistency, plugin install, skill family registration, cross-doc refs, build, internal leakage, edit links.
5. Verify generated docs and counts.

### Phase C: Pre-v3 hardening

1. Add `.gitattributes` and normalize shell scripts.
2. Add missing script docs and clean `validate-script-docs`.
3. Reduce stale-bundle and version-reference advisory noise with allowlists or smarter current-claim heuristics.
4. Decide whether to create `scripts/release-validate.{ps1,sh}`.
5. Add deterministic cross-cutting checks currently handled manually by `pm-skill-auditor`.

### Phase D: v3 marketplace execution

1. Make the `agent-skills` vs `plugins` naming decision.
2. Create the marketplace repo skeleton with production-safe JSON.
3. Add registry validation scripts.
4. Add install/upgrade smoke-test runbook.
5. Cut v3 only after install paths are tested from clean state and existing-user migration state.

---

## Bottom Line

The repo is not in crisis. It is better governed than most skill libraries. The main issue is that the release system's claims are now slightly ahead of its executable guarantees, and v3 will punish that mismatch if it is not tightened.

For v2.18.x, the content bet is sound, but the specs need to absorb the strategy briefs before implementation. For v3, treat marketplace renaming as an API migration with tests, not a docs rename. The strongest next move is a focused hygiene pass that aligns the release gate, fixes count/reference defects, and turns the new v2.18 strategy decisions into the actual skill contracts.
