# Release hygiene checklist (standing source)

**Status:** Active. Created 2026-08-16 (v2.33.0 WS-6, [#269](https://github.com/product-on-purpose/pm-skills/issues/269)).
**Last exercised:** not yet. Stamp this line at the end of every cut with the version and what the run changed.
**How to use it:** copy the sections below into the release plan as `## Release hygiene checklist` at scope-ruling time, then fill it in as the cycle runs. Do not link to this file from the plan and leave the plan empty; the point is that each release carries its own filled copy.

---

## Why this exists, stated so the next maintainer does not delete it as ceremony

Before this file, every cut rebuilt its checklist from the release runbook. That inherits whatever the runbook has accumulated, and the runbook is where staleness collects because nothing re-derives it.

Two observed consequences, both from the v2.32.0 cycle:

1. The runbook still carries a full parallel `pm-skills-mcp` release track. The MCP has been frozen at v2.9.3 since 2026-05-05, the day after maintenance mode. Every release since has silently skipped a track the runbook mandates, and it reached the maintainer as an open decision mid-cut because the cut pack was derived from the runbook.
2. `docs/internal/release-plans/README.md`, the entry point to release governance, still said "Latest shipped: v2.31.1" and listed v2.32.0 as a STUB **two days after v2.32.0 shipped and was tagged**. The v2.32.0 cut pack had rows for the GitHub Release body and the About string but none for this file, because the runbook does not mention it either.

A checklist that lives in the release plan is re-derived per release. That is the entire mechanism.

## How this gates the tag

It gates through existing plan-status semantics; **no runbook edit is required or wanted.**

The canonical runbook's G0 sub-check 6 requires the master plan to exist and be "marked READY TO TAG (or equivalent status)", and "any sub-check failure pauses G0". So:

> **The release plan may not be marked READY TO TAG while any row below marked GATE is unchecked.**

That satisfies both constraints in play: [#269](https://github.com/product-on-purpose/pm-skills/issues/269) says the checklist belongs in the plan "not in the runbook, so it is re-derived per release rather than inherited", and the v2.33.0 plan's WS-6 exit criteria says it gates the tag. Both hold at once.

---

## Section A. Quantitative claim verification (GATE)

**The rule.** For every quantitative claim in release copy, name the artifact that would fail if the claim were false. If the answer is "none", either build the artifact or soften the claim to what is actually enforced.

Release copy means the CHANGELOG entry, the release-notes page, the GitHub Release body, and any count or coverage figure in README, QUICKSTART, or a site reference page.

| Claim in this release's copy | Artifact that goes red if it is false | Verified |
|---|---|---|
| | | |

**Why this rule exists.** Two claims in v2.32.0 failed this test and both were caught late by adversarial review rather than by a gate:

- **"53 + 15 = 68, asserted in test so it cannot drift."** The suite asserted a hardcoded `ROSTER.length === 53`, the accounting lived in a code comment, `EXCLUDED` was exported but imported nowhere, and `skill-manifest.json` was never consulted. A 69th skill added to neither list would have left CI green while the published claim quietly became false.
- **"53 skills measured."** Carrying a fixture pack means the pack's structure is enforced. The lane that actually scores routing is `workflow_dispatch` with `dry_run` defaulting true, and its committed baseline covers 29 of the 53, so nothing measures the other 24.

Both were published before they were true. The rule is cheap: read each number and answer "which test, gate, or generated file goes red if this is wrong?"

## Section B. Gate-owned checks (pointer only, never restate)

The 6 gates and their sub-checks are owned by `site/src/content/docs/contributing/release-runbook.md`. **Do not copy them here.** Restating them creates a second authority that drifts from the first, which is the failure this file exists to prevent.

- [ ] G0 through G4 run per the canonical runbook, with the plan marked READY TO TAG only after every GATE row here is checked.

## Section C. External and cross-repo surfaces (GATE)

These live outside the repo or outside CI, so nothing fails when they are missed.

| Surface | Action | Condition | Done |
|---|---|---|---|
| GitHub About description | Sync from `node scripts/gen-derived-surfaces.mjs --about` | Every release. Compare before editing; it is often already correct | |
| GitHub Release body | Author it; the tag-triggered workflow ships a generic template | Every release | |
| `agent-plugins` marketplace re-pin | Open a PR in that repo: pm-skills `version` and `source.sha`, registry `metadata.version` bump, registry CHANGELOG entry. Complete that repo's Section 7 re-pin checklist in the PR body | Every release. **No workstream row has ever carried this**; it was missed until it was written down here | |
| `docs/internal/release-plans/README.md` | Update "Latest shipped" and the version's own entry | Every release. Missed at v2.32.0 | |
| `pm-skills-mcp` cross-repo surfaces | Refresh `README.md` and `pm-skills-source.json` | Condition copied verbatim from internal runbook 10.5.5: "For major / minor pm-skills releases that change the catalog narrative or skill counts". **Do not send readers to that section**: its surrounding paragraph asserts the MCP is "frozen at v2.9.2", which is wrong (v2.9.3). Record N/A with the reason when the condition is unmet | |
| Repo topics, Pages URL, Open Graph | Verify current | Every release | |
| skills.sh directory listing | Verify the listing reflects the new version after a delay | Every release, advisory | |

## Section D. Decisions carried out of this cycle

Every decision ruled during the cycle that does not ship as code, and every finding routed to an issue rather than fixed.

| Decision or finding | Where it landed | Carried to |
|---|---|---|
| | | |

## Section E. Documentation consistency sweep

- [ ] Version-bearing surfaces agree: `plugin.json`, `marketplace.json`, `.codex-plugin/plugin.json`, the tag, and the CHANGELOG top entry.
- [ ] No `[Unreleased]` section orphaned below the new release heading. release-please inserts its heading **above** `[Unreleased]` rather than consuming it, which would strand entries that genuinely shipped.
- [ ] Any doc this release made stale is updated: contributor guides describing changed conventions, reference pages carrying counts, and the CI overview if a workflow was added or a dependency took a major bump.
- [ ] New conventions enforced by CI are also written where humans read them. A validator that checks a convention the contributor guide never mentions will fail someone who was never told.

**Measurement warning, learned the hard way.** Before reporting a count from a grep, check what the pattern actually matched. Four confident measurements in the v2.32.0 and v2.33.0 cycles were wrong on first pass: a `| head`-truncated grep that reported zero mentions, a regex-escaped pattern passed to a literal-match flag, a substring match on `docs/releases/` that returned roughly 400 hits because the legitimate site path `site/src/content/docs/releases/` contains the string, and a verb-proximity regex that counted "shared with" and "produced by" as handoffs. Exclude the legitimate case, then count. Spot-check any surprising number, especially a zero, against a real file before building on it.

## Section F. Shadow-automation observation (when release-please is still in shadow)

Copy the S2 criteria table from [#136](https://github.com/product-on-purpose/pm-skills/issues/136) and fill it **as the cut happens, not afterward**. The v2.32.0 sheet was left blank while the release notes asserted its result.

A failed observation is a successful test, not a release defect. Record it on #136 and keep the cutover open.

---

## Meta-rules for this file

1. **Stamp "Last exercised" at the end of every cut**, with the version and what that run changed here. A checklist with a stale stamp is the thing this file was built to catch.
2. **Write gaps back in the same commit that finds them.** A gap noticed during a cut and recorded elsewhere is a gap that gets re-found.
3. **Every fact-bearing row points at the document that owns the fact.** Rows here carry conditions and actions, never restated facts, because a restated fact is a second copy that drifts.
4. **A row unexercised for three consecutive releases is a removal candidate.** Either it guards something real and should have fired, or it is ceremony. Decide rather than letting it accumulate.
5. **This file is not canonical for anything.** It is a re-derivation aid. The runbook owns the gates, `#136` owns the S2 criteria, and the plan owns scope.
