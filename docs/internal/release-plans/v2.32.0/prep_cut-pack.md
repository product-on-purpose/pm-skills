# v2.32.0 cut pack: everything G2 through G4 needs, prepared before the cut

**Purpose.** Convert the release-cut gates from research tasks into yes/no approvals. Every gate in
the 6-gate runbook still pauses for confirmation and none is removed by this document. What changes
is what the maintainer is confirming: approved copy rather than copy written mid-tag, an observation
sheet rather than a recollection, an enumerated surface list rather than a re-derived one.

**Created:** 2026-08-13, after WS-5 closed and before WS-8 opens.
**Companion:** [the v2.32.0 release plan](./plan_v2.32.0.md) stays authoritative for scope. This
document is execution material only and rules nothing.

**Why the drafts in sections 2 and 3 live here and not in their final locations.**
`gen-derived-surfaces.mjs` derives the site's `releases/index.md` rows from each release page's own
frontmatter and the changelog mirrors from `CHANGELOG.md`. Writing either draft into its final
location before G2 would make those generated surfaces stale and fail `--check` on every subsequent
push. They are staged here and copied into place at G2, which is where the version bump makes them
consistent again.

---

## 1. The four human moments

Everything else between these is agent-executable with a written failure criterion.

| Moment | Gate | What is being decided |
|---|---|---|
| Approve the public copy | G2 | Section 2 and 3 drafts: headline framing, claims, tone |
| Attest the adversarial review happened | G1 | Maintainer-only by design; the conductor cannot self-attest |
| Authorize the tag | G3 | Irreversible. Tags only the SHA captured at G2.5 |
| Clear any post-tag P0 | G4 | A broken plugin install path blocks "release complete" until resolved or logged as a carried regression |

Known hazards with written handling, so they are not decisions:

- **Squash-merge fails with a base-branch-policy error.** That message masks a missing `workflow`
  token scope, which applies here because the branch adds `.github/workflows/release-please-regen.yml`.
  Use the REST merge endpoint.
- **A phantom MINOR shadow proposal appears during the tag window.** Expected once the manifest
  advances ahead of the tag. Runbook Section 8.5 governs; do not chase it.
- **`release-please-regen.yml` fires for the first time.** Pre-enrichment it should exit neutral
  with a notice, because the release page does not exist yet. That is the designed path. Any other
  failure is real and stops the gate.

## 2. Draft CHANGELOG entry (paste at G2, set the date)

> Copy the block below into `CHANGELOG.md` replacing the `## [Unreleased]` heading, then set the
> release date. The `[Unreleased]` manifest-trim entry already present is folded in under Changed.

### `## [2.32.0] - YYYY-MM-DD`

**Project memory: the catalog stops asking you to repeat yourself.** Every previous release added
capability you invoke. This one adds capability that accumulates. Record your Triple Diamond phase
and current initiative once, in the gitignored `.claude/pm-skills.local.md` file the guardrails and
phase router already read, and eight skills begin reading it too. The concrete moment: synthesize
your research with `discover-interview-synthesis`, then run `deliver-prd` and it uses the personas
you already produced instead of asking you to paste them again. Nothing happens until you opt in:
with no file present, every skill and both hooks behave exactly as they did in v2.31.1, and writes
are proposed for your confirmation rather than applied. Alongside it, trigger-eval coverage closes
as an accounting rather than a percentage: 53 skills measured and 15 excluded by design, covering
all 68 with nothing unclassified, asserted in test so it cannot drift. Release automation gains the
three mechanisms its cutover was missing. No new skills; catalog stays 68 skills (30 phase + 11
foundation + 12 utility + 15 tool), 6 sub-agents unchanged. Additive MINOR.

**Added**

- **Project memory (opt-in).** A `schema: 1` state file at `.claude/pm-skills.local.md` carrying
  `phase`, `active_initiative`, an `artifacts[]` ledger, and a `## Decisions` section, under a
  four-tag provenance model. The SessionStart phase router reads a declared phase; `memory_auto_append`
  is an opt-in flag that fails closed. Documented in `concepts/hooks.md`.
- **`## Project Memory Contract` on eight skills:** `discover-interview-synthesis`, `deliver-prd`,
  `foundation-okr-writer`, `iterate-retrospective`, and all four `foundation-meeting-*` skills. Two
  meeting skills are pure readers by design, since that family already chains artifacts by filename
  and memory carries durable context instead. Each skill takes a MINOR bump with a HISTORY row.
- **Trigger-eval fixture packs for the 10 remaining `utility-*` skills**, 20 queries each.
- **`excluded:` in `trigger-eval-roster.yaml`** plus an `EXCLUDED` loader export, recording the
  decision to rule the 15 `tool-*` sprint steps out of the roster by design, as data, with its
  counter-argument and reversal path written alongside it.
- **`scripts/check-memory-contracts.mjs`** (advisory): structural validation of the memory
  declaration, clean at 8 of 8.
- **Internal-doc link scanning** via `check-root-doc-links.mjs --include-internal` (advisory).
- **Regen-on-release-PR** (`.github/workflows/release-please-regen.yml`): a push-triggered workflow
  on release-please's own branch that regenerates every derived surface and commits the mirrors,
  closing the stale-surfaces failure that sank the bot's PR #229 and readying the shadow-to-authoritative
  cutover (S2 checklist items 4 and 6).
- **`gen-derived-surfaces --about`**: the GitHub About string becomes generator-derived, making the
  post-tag About-sync step safe on its first fire and reducing the runbook's manual About step to a
  one-liner that cannot drift from it.
- **X-2 (artifact schemas) filed as a tracking issue** ([#258](https://github.com/product-on-purpose/pm-skills/issues/258))
  with a thin effort brief. Nothing is built, but the staged typed-handoff envelope
  ([#224](https://github.com/product-on-purpose/pm-skills/issues/224)) stops being trigger-unreachable.
- **A tracked Phase-0 scope spec for the AI-product skill family**, replacing a maintainer-local
  five-name sketch no external reader could see. Names, phases, what is deliberately out and why,
  and a new build gate: a proposed skill must beat a no-skill control arm before it is built, not
  after. Nothing is built in this release.

**Changed**

- The SessionStart phase router prefers a declared phase over its branch-name and artifact
  heuristics, and states a declared phase rather than hedging it.
- Three collision pairs declared (22 to 25), with reciprocal boundary pointers on
  `utility-pm-workflow-orchestrator`, `utility-pm-skill-validate`, and `utility-pm-skill-auditor`.
- Trigger-eval execution batches extended with three wave-2 batches, collision-critical first.
- **Plugin manifest descriptions trimmed to a current-version summary
  ([#265](https://github.com/product-on-purpose/pm-skills/pull/265)).** The three generator-tracked
  description fields render as marketplace tile copy in every directory that lists pm-skills, and
  had accumulated the narration of 19 consecutive releases reaching back to v2.17.0, so a directory
  visitor read about SIGPIPE races and Starlight draft-field shadowing instead of what the plugin
  does. Each field now carries its headline plus one sentence on the current version and links to
  this file for the rest: `$.description` 9,382 to 606 characters,
  `$.plugins[0].description` 7,518 to 543, and `$.interface.longDescription` 1,534 to 620. This does
  not reverse v2.31.0's ruling that the narration tail stays hand-maintained; the tail is still
  authored by hand, now from a one-sentence base rather than an append-only one. The generator-owned
  count headlines are byte-identical, so no count-bearing text moved.

**Fixed**

- **The marketplace release pin.** `plugins[0].version` and `plugins[0].source.ref` now advance with
  the version (v-prefixed) without re-serializing `marketplace.json`, replacing the release-please
  jsonpath entry that corrupted the file's formatting and could not write the ref at all (S2
  checklist item 2). The README-badge precedent applied to the same failure class.
- Two broken relative links in `docs/internal` that no guard could see, one long-standing.
- The HISTORY.md header template in `docs/internal/skill-versioning.md` carried an em-dash scar that
  every real HISTORY file had already moved past, so the template was manufacturing the defect it
  documented.
- A pre-existing one-sided boundary pointer between `utility-pm-workflow-builder` and
  `utility-pm-workflow-orchestrator`.
- `foundation-okr-writer` gained the HISTORY.md its version bump requires, with its 1.0.0 row
  backfilled.
- **Two published reference pages that stated this release's own facts wrong.** The evals page
  carried "43 of 68 (about 63%)" for trigger coverage, the number this release replaces, and now
  states the accounting (53 measured + 15 excluded by design = 68) with a section on why coverage
  here is a closed accounting rather than a percentage climbing toward 100. The runtime-components
  page described `.claude/pm-skills.local.md` as "deferred to v2.17+", a file live since v2.25.0 and
  now the project-memory substrate; it is rewritten around the portability split that section is
  actually about.
- **Two contributor conventions that existed only in enforcement.** CONTRIBUTING now states the
  roster rule (a new skill is rostered or `excluded:` with a rationale, in the merge that adds it,
  with neither state failing CI) and documents the `## Project Memory Contract`, whose shape an
  advisory CI validator had been checking without the contributor guide ever mentioning it.

**Security**

- Dependency alert queue drained to zero, twice in one cycle: the standing six moderate and low
  alerts, then four highs published hours later. `@astrojs/starlight`, `github/codeql-action`,
  `mermaid`, `dompurify`, and `js-yaml` bumps (#254, #255, #256, #259, #260, #261), plus an authored
  lockfile-only fix for `js-yaml` 3.15.1 in `.github/scripts` and `nanoid` 3.3.18 in the site (#262)
  for which no Dependabot PR existed. Ten alerts closed; queue verified at zero via the API.

> **G2 note:** if PRs #263 (codeql-action) and #264 (site-dependencies) merge before the cut, add
> them to the Security list. If they do not, they carry to v2.32.1 or v2.33.0 and no edit is needed.

## 3. Draft release notes (write to `site/src/content/docs/releases/Release_v2.32.0.md` at G2)

```
---
slug: releases/Release_v2.32.0
title: Release v2.32.0
description: Project memory lands as an opt-in state file eight skills read, trigger-eval coverage closes as a 53-plus-15-equals-68 accounting, release automation gains the three mechanisms its cutover was missing, and the AI-product skill family gets a tracked scope spec with a control-arm build gate.
---
```

**Released YYYY-MM-DD.** Additive MINOR. No new skills; catalog stays 68 skills (30 phase + 11
foundation + 12 utility + 15 tool), 6 sub-agents unchanged.

### The short version

Every release before this one added capability you invoke. This one adds capability that
accumulates. A skill invocation has always started from zero: you paste the same personas, restate
the same initiative, re-explain which phase you are in. v2.32.0 introduces an opt-in state file that
eight skills read, so the second skill in a session knows what the first one produced. Alongside it,
trigger-eval coverage stops being a percentage and becomes an accounting, and the release-automation
cutover gets the three mechanisms it was missing.

### What changed

#### Project memory

Create `.claude/pm-skills.local.md` in your project, declare your Triple Diamond phase and current
initiative, and two things happen. The SessionStart phase router stops guessing from your branch
name and artifact layout and uses what you declared. And eight skills read the file as context:
`discover-interview-synthesis`, `deliver-prd`, `foundation-okr-writer`, `iterate-retrospective`, and
the four `foundation-meeting-*` skills.

The concrete moment: synthesize your research, then run the PRD skill. It uses the personas you
already produced instead of asking you to paste them again.

The posture is opt-in throughout and deliberately so. With no file, every skill and both hooks
behave exactly as they did in v2.31.1. Writes are proposed for your confirmation rather than applied,
with an opt-in flag if you want them automatic, and that flag fails closed. This repo has spent two
releases earning trust ground and is not spending it on a skill that writes to your project without
asking.

Two of the eight are pure readers by design. The meeting family already chains its artifacts by
filename, so memory carries durable context there rather than duplicating a mechanism that works.

#### Trigger-eval coverage closes

Ten more skills gain fixture packs at 20 queries each. The number that matters is not a coverage
percentage: **53 skills are measured and 15 are excluded by design, which accounts for all 68 with
nothing unclassified.** The 15 are the sprint-family steps, which are entered through a family
workflow rather than by typing, and that exclusion is now recorded as data in the roster with its
counter-argument and reversal path written alongside it. The 53 + 15 = 68 equation is asserted in a
test, so it cannot quietly drift.

Three collision pairs were declared along the way, taking the registered total from 22 to 25, and
the reciprocal-pointer requirement forced shut a pre-existing one-sided edge.

#### Release automation gets its missing mechanisms

release-please has been running in shadow since v2.31.0: it proposes a release, the proposal is
compared against the manual cut, and it is never merged. Three defects kept blocking the cutover and
all three now have mechanisms.

The Release PR branch never ran the generators, so its own diff always failed validation on stale
files. A new workflow now regenerates every derived surface on that branch and commits the mirrors,
push-triggered so both the bot's force-push and a maintainer's enrichment push re-run it.

The marketplace release pin could not be written at all by the automation's jsonpath updater, which
also reformatted the JSON as a side effect. The pin is now generator-owned with a targeted value
swap that preserves formatting byte-for-byte.

And the GitHub About string is now generator-derived, so the post-tag sync step is safe on its first
run and the manual path in the runbook uses the identical string.

#### A tracked spec for the AI-product family

The scope for a future AI-product skill family existed only as five names in a maintainer-local file
no external reader could see. It is now a tracked spec: four proposed skills with their phases, four
increments to skills that already exist, seven things deliberately excluded with reasons, and the
constraints any build inherits.

It also adds a build gate the repo did not have. A proposed skill must beat a no-skill control arm
before it is built, not after. The method comes from an experiment run in August 2026 that killed a
different proposed skill outright: a treatment arm with the framework against an equally capable
control arm with none, same scenarios, then independent judges each instructed to default to "the
framework added nothing." Zero of three found a difference. One afternoon of work avoided a large
build. **Nothing in this family is built by this release.**

### What this means for you

- **If you use the skills:** nothing changes unless you opt in. Create the memory file if you want
  the eight skills to read it; skip it and everything behaves as before.
- **If you watch the repo's automation:** the shadow Release PR now regenerates its own derived
  surfaces. It is still observed, not authoritative.
- **If you contribute:** a new skill joins the trigger-eval roster in the same merge that adds it,
  or is recorded as excluded with a rationale. There is no third state.

### Upgrade

```
# Update path
/plugin marketplace update
/plugin install pm-skills@product-on-purpose

# Or re-download the release ZIP if you installed that way.
```

No action required beyond updating. The catalog remains 68 skills and 6 sub-agents.

### What does NOT change in v2.32.0

- Skill catalog (68), slash commands (11), and workflows (12) are unchanged.
- With no memory file present, every skill and both hooks behave exactly as in v2.31.1.
- The manual 6-gate runbook cuts this release, as it has cut every release before it. release-please
  remains observed, not authoritative.

### Affected areas

| Area | Change |
|---|---|
| `skills/` | Eight skills gain a Project Memory Contract and a MINOR bump; ten gain trigger fixtures; three gain reciprocal boundary pointers. Catalog unchanged at 68 |
| `scripts/` | `check-memory-contracts.mjs` added; `gen-derived-surfaces.mjs` gains `--about` and the marketplace pin; `trigger-eval-roster.yaml` gains `excluded:` |
| `.github/workflows/` | `release-please-regen.yml` added; `release-please.yml` edited |
| Hooks | The SessionStart phase router reads a declared phase |
| `docs/internal/` | AI-product family spec; ledger delta spec; runbook Section 8.5 |

## 4. External-surface checklist (G4)

Runbook Section 10.5 covers the in-repo surfaces. This section enumerates them with the cross-repo
ones named, because those are the ones that get missed.

**In-repo, agent-executable:**

- [ ] GitHub About description synced. Source of truth: `node scripts/gen-derived-surfaces.mjs --about`.
      First cut where this is generator-derived rather than hand-typed.
- [ ] GitHub repo Topics current (Section 10.5.2)
- [ ] GitHub Pages homepage URL current (Section 10.5.3)
- [ ] Open Graph metadata on the deployed site reflects the current description (Section 10.5.4)
- [ ] Pages rebuild completed and the site serves the new release page
- [ ] Plugin install path verified (G4 P0: a failure here blocks "release complete")
- [ ] Marketplace registration reflects v2.32.0

**Cross-repo, needs a decision or an external PR:**

- [ ] **`agent-plugins` re-pin to v2.32.0.** v2.31.1 shipped this as its own PR in that repo
      ([agent-plugins#62](https://github.com/product-on-purpose/agent-plugins/pull/62); registry
      1.47.0). A minor release needs the same. That repo's convention adds a registry CHANGELOG
      entry with the re-pin. **No workstream row in this plan carries it**, which is why it is
      listed here.
- [ ] **`pm-skills-mcp` mirror (runbook Section 10.5.5).** The MCP is in maintenance mode
      (security fixes only), and v2.30.0 shipped the honest freeze note. **Ruling needed at G4:**
      whether an additive MINOR that ships no MCP-facing change requires the cross-repo mirror at
      all. Recommendation: skip it for this release and record the reason, since nothing in v2.32.0
      changes an MCP surface. Reverse if any MCP-facing content moved.
- [ ] **skills.sh directory listing cache** (Section 10.5.6), if that listing is still live.

## 5. S2 ratification observation sheet

Checklist item 7 (maintainer ratification of the shadow-to-authoritative cutover) waits on one
release cycle where every criterion holds **simultaneously**. This cut is that cycle. Items 1, 3,
and 5 are already demonstrated from prior cycles; items 2, 4, and 6 shipped engineering in WS-6 and
need this cycle as their evidence. **Record each observation as it happens, not afterward.**

| # | Criterion | Prior state | What to observe in this cut | Observed |
|---|---|---|---|---|
| 1 | Shadow's version bump and notes match the manual cut | DEMONSTRATED at v2.31.1 (version + date matched) | Does the shadow Release PR propose 2.32.0 with a matching date at the G2 window? | |
| 2 | Zero hand-fixes to the shadow diff | ENGINEERING SHIPPED (generator-owned marketplace pin) | Does `marketplace.json` show `plugins[0].version` and a v-prefixed `source.ref` advanced, with no reformatting? Any hand-fix at all fails this item | |
| 3 | Token triggers CI on the Release PR | DONE (PR #229) | Confirm still true | |
| 4 | Clean version-only branch diff | ENGINEERING SHIPPED (regen workflow) | Does the Release PR branch pass `validate` without stale generated files? This is the exact failure PR #229 hit | |
| 5 | PR-title lint active | DONE (advisory) | Confirm still true. Promotion to required is decision D8, relocated per section 6 | |
| 6 | Generator run + regenerated mirrors committed on the branch | ENGINEERING SHIPPED (same workflow) | Did `release-please-regen.yml` actually fire, and did it commit mirrors when they changed? **This workflow has never run.** Pre-enrichment, a neutral exit with a notice is the designed path, not a failure | |
| 7 | Maintainer ratification | OPEN, maintainer-only | Only after 1-6 are all observed green in this one cycle. No agent may self-promote this | |

If any of 1, 2, 4, or 6 fails, the correct outcome is to record the failure on
[#136](https://github.com/product-on-purpose/pm-skills/issues/136) and keep the cutover open. A
failed observation is a successful test, not a release defect.

## 6. Decision D8 (PR-title lint promotion): revisit relocated to v2.33.0 planning

The plan ruled D8 = B (hold advisory one more cycle) and scheduled the revisit "at the v2.32.0 cut."
That places an open decision inside the tag window with no decision rule attached, which is the one
gate shape guaranteed to stall an unattended run.

**Relocated: the revisit moves to v2.33.0 scope planning.** This does not overturn D8 = B, which
stands. Only the timing of the revisit moves, from mid-cut to the next planning session, where the
evidence can be read without a tag waiting on it.

**Evidence to carry into that revisit** (collect during this cycle, decide later):

- The human-authored PR-title sample this cycle generates, which is the leg the original promotion
  criterion lacked.
- `31f38ed4` on main, "Fix HTML tags in README formatting": a human-authored, non-conventional title
  pushed **directly to main**. This is the class a PR-title lint structurally cannot see, and it is
  the strongest single argument that promotion alone does not close the gap.
- Whether any title this cycle needed a manual nudge, since the workflow's own promotion criterion
  is "a full shadow cycle shows clean titles land without a manual nudge."

## 7. Post-cut actions

- [ ] Create the v2.33.0 stub (already seeded at `../v2.33.0/plan_v2.33.0.md`) and move the carried
      items into it
- [ ] Author the GitHub Release UI body
- [ ] Record the S2 observation sheet results on [#136](https://github.com/product-on-purpose/pm-skills/issues/136)
- [ ] Close or re-target [#223](https://github.com/product-on-purpose/pm-skills/issues/223) (memory
      artifact ledger) against what actually shipped
