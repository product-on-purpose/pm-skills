# Codex Review Of `docs/internal/_working/distilled`

Date: 2026-03-21

Scope reviewed:

- `01_executive-brief.md`
- `02_action-plan.md`
- `03_notable-repos-and-tools.md`
- `04_next-efforts.md`

## Executive Summary

This folder is useful, readable, and strategically strong, but it is not yet a clean single source of truth.

The biggest issue is temporal drift inside the set:

- `01_executive-brief.md` and `02_action-plan.md` still assume pm-skills should grow into a workspace-style Layer 2 product.
- `04_next-efforts.md` explicitly removes that scope and moves it into Knowledge OS.

That means the folder currently mixes:

- a pre-separation strategic thesis
- an execution plan derived from that thesis
- a post-separation correction that partially supersedes both
- a research appendix

The result is high-value material with moderate execution risk. A careful reader can understand the intended direction, but a fast-moving contributor could still pick the wrong plan.

## Corpus Shape

The folder is compact and high-signal:

- 4 files
- 1,216 lines
- about 7,922 words

Each file plays a different role:

| File | Current value | Review |
| --- | --- | --- |
| `01_executive-brief.md` | Strategic compression | Strongest concise framing, but partially outdated |
| `02_action-plan.md` | Execution breakdown | Clear and agent-friendly, but carries pre-separation scope |
| `03_notable-repos-and-tools.md` | Reference appendix | Valuable research inventory, but less "distilled" than the others |
| `04_next-efforts.md` | Updated backlog | Most current operational document in the folder |

## What Is Strong

### 1. The strategic judgment is good

The strongest recurring insight across `01_executive-brief.md`, `02_action-plan.md`, and `04_next-efforts.md` is that pm-skills gets more leverage from infrastructure and meta-skills than from immediately adding more domain skills.

That prioritization is defensible:

- CI validation improves every future contribution.
- a skill-builder improves the system's ability to scale itself.
- release and contribution automation reduce maintainer drag.

The planning logic is coherent even where the specific scope later changed.

### 2. `04_next-efforts.md` is the best current operating document

This file does the important corrective work:

- it narrows pm-skills back to a skill-library mission
- it cleanly moves workspace, transcript, hook, and document-evolution concerns into Knowledge OS
- it turns the remaining work into a focused 8-effort backlog

If someone asked "what should pm-skills actually do next?", this is the document I would hand them first.

### 3. The work is unusually execution-oriented

The action-oriented docs do not stop at abstract priority lists. They include:

- explicit dependencies
- "done when" conditions
- agent-executable steps
- human decision gates

That makes the material materially more useful than a typical strategy memo.

### 4. The external benchmarking is broad enough to be useful

`03_notable-repos-and-tools.md` is not concise, but it is valuable. It covers:

- ecosystem analogs
- scaffolding tools
- plugin discovery channels
- standards references
- release automation options
- adjacent knowledge-management patterns

As a research appendix, it is strong.

## Main Problems

### 1. The folder contains an unresolved supersession problem

This is the primary issue.

`01_executive-brief.md` and `02_action-plan.md` still recommend work that `04_next-efforts.md` explicitly removes from pm-skills scope:

- multi-project workspace
- `/project` support
- hooks for context loading and auto-save
- transcript processing
- output styles
- document evolution / linking

That is not a small discrepancy. It changes what product pm-skills is supposed to become.

Current practical consequence:

- `04_next-efforts.md` behaves like the canonical plan
- `01_executive-brief.md` and `02_action-plan.md` still read like active guidance

Those two states should not coexist without an explicit note.

### 2. Naming decisions are not fully stabilized

The skill-builder naming remains muddy across the set.

Examples:

- `01_executive-brief.md` distinguishes `/pm-skill-builder` from `/skill-builder`
- `02_action-plan.md` uses `utility-pm-skill-builder` but pairs it with `commands/skill-builder.md`
- `04_next-efforts.md` still leaves the two-skill approach as a human decision

This is manageable, but it means the backlog is not yet naming-stable enough to hand directly to multiple contributors without coordination.

### 3. The backlog shifted but the older roadmap was not rewritten

`02_action-plan.md` still contains items that no longer fit the reduced pm-skills charter, including:

- project manager
- doc updater
- hooks
- transcript processing
- output styles

It also names `define-value-proposition` as a later domain skill, while `04_next-efforts.md` narrows the visible follow-on domain work to `discover-market-sizing` and `measure-survey-analysis`.

This makes `02_action-plan.md` valuable as historical reasoning, but weaker as live planning.

### 4. `03_notable-repos-and-tools.md` is reference-heavy rather than distilled

This is not a quality problem, but it is a packaging problem.

The first, second, and fourth documents are decision artifacts.
The third is a catalog.

That means the folder currently mixes:

- strategic synthesis
- execution guidance
- external research inventory

without a top-level explanation of which document is for decision-making versus background reading.

### 5. There is no top-level "read this first" file

The folder would be easier to use if it declared:

- which document is canonical now
- which documents are historical but still informative
- the intended reading order

Right now that logic has to be inferred.

## File-By-File Assessment

### `01_executive-brief.md`

Best at:

- compressing the thesis
- identifying leverage points
- making strong strategic calls quickly

Weakest point:

- it is now partially invalidated by the later pm-skills / Knowledge OS split

Verdict:

- keep it, but mark it as pre-separation strategy unless it is revised

### `02_action-plan.md`

Best at:

- sequencing
- dependencies
- handoff readiness

Weakest point:

- too much of the plan belongs to Knowledge OS after the scope correction

Verdict:

- useful source material, but not safe as the current execution plan without revision

### `03_notable-repos-and-tools.md`

Best at:

- ecosystem coverage
- benchmarking
- future research reuse

Weakest point:

- low prioritization; it says what exists, but not which 5-10 references matter most

Verdict:

- keep it as an appendix or move it into a `references/` or `research/` location

### `04_next-efforts.md`

Best at:

- scoping discipline
- operational clarity
- reducing pm-skills to the right near-term problem

Weakest point:

- it implicitly supersedes earlier docs but does not formally declare itself canonical

Verdict:

- strongest document in the folder for immediate execution

## Recommended Actions

### Priority 1: fix canonical status

Do one of these immediately:

1. Add a note at the top of `01_executive-brief.md` and `02_action-plan.md` stating that Knowledge OS-related scope has moved out and `04_next-efforts.md` is the current backlog.
2. Or rewrite `01_executive-brief.md` and `02_action-plan.md` so they reflect the new separation directly.

Until that happens, the folder is not execution-safe for readers who were not in the original conversation.

### Priority 2: add a folder index

Create a short `00_README.md` or similar that states:

- purpose of the folder
- current canonical doc
- read order
- what is historical versus active

### Priority 3: resolve the skill-builder naming stack

Freeze:

- directory name
- slash command names
- whether the utility and foundation versions are separate launches or staged evolution

This decision is currently present, but not settled.

### Priority 4: separate synthesis from appendix material

Consider moving `03_notable-repos-and-tools.md` out of the distilled folder, or at least marking it as a supporting appendix rather than a core decision doc.

## Overall Verdict

This is a strong strategic package with good judgment and unusually actionable planning. The problem is not low quality. The problem is document-state management.

The folder now contains both:

- the earlier expanded pm-skills thesis
- the later narrowed pm-skills thesis

Because the later thesis is the better one, the next step is not more ideation. It is consolidation.

If consolidated, this folder becomes a reliable planning packet.
As it stands, it is a very good packet with one major source-of-truth defect.

---

## Claude Opus 4.6 Review of This Review

**Date**: 2026-03-22
**Reviewer**: Claude Opus 4.6 (1M context)
**Context**: After creating v2 revisions of files 01-03 to resolve the issues identified here

### Overall Assessment

This is a strong review. The diagnosis is correct, the recommendations are actionable, and the priority ordering is right. The "supersession problem" framing is exactly the right way to describe what happened — it's not that the earlier docs are *wrong*, it's that they were written before a scope-altering decision and never updated.

### What the Review Gets Right

**1. The primary diagnosis is accurate and well-prioritized.**
The supersession problem IS the #1 issue. The review correctly identifies that `04_next-efforts.md` implicitly supersedes `01` and `02` without declaring itself canonical. This is the single most dangerous state for a planning packet — ambiguity about which document is authoritative.

**2. The file-by-file assessment is fair.**
Each file's strengths and weaknesses are accurately characterized. The verdict on `04_next-efforts.md` as "strongest document for immediate execution" is correct — it was written last, with the benefit of the scope separation decision.

**3. The "keep it, but mark it" recommendation for 01 is practical.**
The review doesn't recommend deleting the pre-separation docs. That's the right call — they contain valuable strategic reasoning that informed the separation. The reasoning about *why* multi-project workspace was considered is itself informative context.

**4. The observation about 03 being a catalog, not a distillation, is precise.**
The folder mixes decision artifacts (01, 02, 04) with a reference catalog (03). The review correctly identifies this as a packaging issue rather than a quality issue.

### What the Review Misses or Underweights

**1. No evaluation of whether the strategic decisions themselves are sound.**
The review is focused on document-state management (which docs are current, how they relate) rather than strategic substance. It doesn't assess whether the CI-first priority is correct, whether the two-skill-builder approach is justified, or whether the marketplace submission timing is right. This is understandable — the review was scoped to the *documents*, not the *strategy* — but a note acknowledging this boundary would help the reader know what the review doesn't cover.

**2. The review doesn't examine whether `04_next-efforts.md` itself has issues.**
It calls 04 the "strongest document" but doesn't audit it the way it audits 01-03. Some things worth noting about 04:
- The execution timeline (Week 1-4) is aspirational and doesn't account for the fact that this is a side project with variable time allocation
- The Knowledge OS "parallel track" section at the end slightly contradicts the separation — if Knowledge OS is truly separate, it shouldn't appear in pm-skills planning docs at all
- Some effort estimates may be optimistic (e.g., "Convention alignment: 1-2 days" when touching 25 skills)

**3. The naming stabilization recommendation lacks a suggested resolution.**
The review correctly identifies that naming is unstable across the document set, but doesn't suggest which naming to freeze. This would have been more actionable as: "Freeze `utility-pm-skill-builder` for the directory and `/skill-builder` for the command, with the foundation version as a future decision."

**4. No assessment of whether the research catalog entries are still live.**
`03_notable-repos-and-tools.md` contains 50 references. The review notes it lacks prioritization (correct), but doesn't flag that some URLs may have gone stale, some repos may have been archived, or some tools may have evolved significantly since discovery. For a "distilled" folder, the catalog should annotate relevance, not just existence.

**5. The folder index recommendation (Priority 2) should arguably be Priority 1.**
Creating a `00_README.md` that declares canonical status solves the supersession problem and the reading-order problem simultaneously. It's faster than rewriting 01 and 02, and provides immediate value. The review puts it second; I'd argue it should be first (or at least done in parallel).

### How the v2 Revisions Address the Review's Recommendations

| Codex Recommendation | Status in v2 |
|---------------------|--------------|
| Priority 1: Fix canonical status | **Done** — 01_v2 and 02_v2 rewritten to reflect separation. Each opens with "Supersedes" header and "What Changed" table. |
| Priority 2: Add folder index | **Not done** — worth creating as `00_README.md` |
| Priority 3: Resolve naming | **Partially addressed** — v2 files use consistent naming but still mark it as a human decision |
| Priority 4: Separate synthesis from appendix | **Addressed in 03_v2** — added "Top References" prioritization and scope annotations, plus a note on §10 being Knowledge OS material |

### Suggested Next Steps

1. **Create `00_README.md`** — 10 lines declaring: purpose, canonical doc, read order, which files are historical. This remains the quickest way to make the folder safe for new readers.
2. **Have Codex review the v2 files** — the v2 revisions are the response to this review's recommendations. A follow-up review would close the loop and verify the supersession problem is actually resolved.
3. **Archive or clearly label the v1 files** — once v2 is reviewed, the v1 files should be either moved to a `_v1/` subfolder or given a clear "SUPERSEDED" header. Two versions of the same filename in the same folder is its own source-of-truth risk.
