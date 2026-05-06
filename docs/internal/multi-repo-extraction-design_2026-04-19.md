---
title: Multi-Repo Skill Extraction Design. Splitting General-Business Skills from pm-skills
description: Design options for extracting general-purpose foundation and utility skills (meeting lifecycle family, mermaid-diagrams, slideshow-creator, persona, lean-canvas) from pm-skills into a sibling repo of general business tools. Covers repo-split strategies, tagging and taxonomy, automation and scaling approaches, contribution-flow models, recommended bundle, and migration path. Companion reference at multi-repo-patterns-reference_2026-04-19.md.
date: 2026-04-19
status: draft
audience: pm-skills maintainers, v2.12.0+ planners
---

# Multi-Repo Skill Extraction Design. Splitting General-Business Skills from pm-skills

**Date**: 2026-04-19
**Author**: Claude Opus 4.7 (design analysis, multi-option exploration)
**Status**: Draft for discussion
**Companion reference**: [`multi-repo-patterns-reference_2026-04-19.md`](multi-repo-patterns-reference_2026-04-19.md). industry best-practice synthesis (Nx, Turborepo, git subtree, Hugo taxonomy, Lerna) that contextualizes this recommendation.

## Table of Contents

1. [Executive summary](#executive-summary)
2. [Problem statement](#1-problem-statement)
   - 1.1 [Why consider splitting now](#11-why-consider-splitting-now)
   - 1.2 [What a sibling repo would enable](#12-what-a-sibling-repo-would-enable)
   - 1.3 [What could go wrong](#13-what-could-go-wrong)
3. [Candidate skills analysis](#2-candidate-skills-analysis)
   - 2.1 [Definitely general-business](#21-definitely-general-business)
   - 2.2 [Boundary cases](#22-boundary-cases)
   - 2.3 [Definitely pm-specific](#23-definitely-pm-specific)
   - 2.4 [Implications of the boundary](#24-implications-of-the-boundary)
4. [Option family A. Repo-splitting strategy](#3-option-family-a-repo-splitting-strategy)
   - A1. git subtree split (new repo with history)
   - A2. New repo via scripted extraction
   - A3. Mirrored downstream (continuous sync)
   - A4. No split. monorepo + multi-plugin marketplace
   - A5. Hybrid. monorepo now, split later
5. [Option family B. Tagging and taxonomy](#4-option-family-b-tagging-and-taxonomy)
   - B1. Single `audience:` tag with closed enum
   - B2. Multi-value `audience:` list
   - B3. Explicit include/exclude manifest per downstream
   - B4. Reuse `classification:` without a new field
6. [Option family C. Automation and scaling](#5-option-family-c-automation-and-scaling)
   - C1. Release-tag-driven extraction
   - C2. Continuous mirror on every main push
   - C3. Manual extraction on release cut
   - C4. GitHub Action with parametric repo list
7. [Option family D. Contribution flow](#6-option-family-d-contribution-flow)
   - D1. Upstream-only (sibling is read-only downstream)
   - D2. Bidirectional sync
   - D3. Sibling-authored skills only
8. [Interaction effects and option bundles](#7-interaction-effects-and-option-bundles)
9. [Recommendation](#8-recommendation)
10. [Migration path](#9-migration-path)
11. [Open questions](#10-open-questions)
12. [Appendix](#11-appendix)
    - 11.1 Audience enum proposal
    - 11.2 Extraction script shape
    - 11.3 Frontmatter schema proposal (v2)
    - 11.4 Sibling-repo README skeleton
    - 11.5 What this design does NOT address
13. [Related documents](#12-related-documents)
14. [Decision log](#13-decision-log-to-be-filled)

---

## Executive summary

pm-skills ships 38 skills today. Roughly 7-9 of its 13 foundation and utility skills are domain-neutral general business tools (meeting lifecycle, mermaid diagrams, slideshow creation, potentially persona and lean-canvas). These skills are indistinguishable in structure and quality from the PM-specific ones, but their audience is broader. general managers, operations leads, consultants, marketing teams, and designers can all benefit from them. Keeping them only in a PM-branded repo reduces reach.

This doc presents **4 option families** (splitting strategy, tagging taxonomy, automation, contribution flow), **15 discrete options** across them, and a **recommended bundle** that keeps pm-skills as canonical source, adds an `audience:` frontmatter tag, and uses a release-tag-driven extraction script to publish a sibling `business-skills` repo on every pm-skills release. The recommendation preserves single source of truth, supports one-to-many downstream repos, and incurs ~200 lines of new tooling.

```mermaid
graph LR
    A[pm-skills today<br/>38 skills, PM-branded]
    A --> B[Tag audience in frontmatter]
    B --> C[Release-tag-driven script<br/>extracts audience=general|cross]
    C --> D[business-skills sibling repo<br/>7-9 skills, business branding]

    A --> E[pm-skills unchanged<br/>still canonical]

    style A fill:#fff4e1
    style D fill:#c8e6c9
    style E fill:#e1f5fe
```

---

## 1. Problem statement

### 1.1 Why consider splitting now

**Reach mismatch**. The meeting-lifecycle family (agenda, brief, recap, synthesize, stakeholder-update) is useful in any meeting-heavy role. PM, engineering manager, operations lead, consultant, sales lead. Keeping these skills inside a repo called "pm-skills" limits discovery. Someone searching "Claude skills for meeting notes" is less likely to find a PM-branded repo.

**Brand clarity**. pm-skills builds credibility as "high-quality PM tooling for AI agents". Diluting it with generic business skills blurs that identity. A general business skills repo could build separate credibility with a different audience.

**Contribution friction**. A contributor proposing a general-purpose skill (say, `project-kickoff-checklist`) today has to decide whether it fits pm-skills. If the answer is "sort of, but it's more general", there is nowhere else to send them.

**Timing**. pm-skills just shipped v2.11.0 with the meeting-lifecycle family and its first cross-cutting contract pattern. Extraction is materially simpler now (13 foundation + utility skills) than it will be at 50. The organizational and tooling patterns (contracts, samples, validators) are fresh and can be ported cleanly.

### 1.2 What a sibling repo would enable

- **Distinct discovery path** for non-PM users who want meeting or diagram skills without adopting PM terminology.
- **Distinct brand and README**. landing page speaks to "business productivity" rather than "product management methodology".
- **Cross-pollination**. improvements to meeting-lifecycle skills benefit both audiences; regressions get caught by both communities.
- **Template for future splits**. design-skills, engineering-skills, research-skills could follow the same extraction pattern without re-deriving tooling.
- **Lower conceptual cost for users**. a marketing lead doesn't need to explain why they installed "pm-skills" on their laptop.

### 1.3 What could go wrong

- **Drift**. if the sibling repo is forked rather than derived, changes in one won't propagate. Manual merging is painful.
- **Brand confusion**. if the sibling's scope creeps, it starts overlapping with pm-skills. Users see two repos with unclear boundaries.
- **Duplicated maintenance**. CI, release processes, docs, mkdocs site, etc. all have to be mirrored. Cost scales linearly with repo count.
- **Contribution ambiguity**. if general-business skills can be contributed to either repo, authors don't know which to pick. If contributions are upstream-only, the sibling feels like a staging area rather than a real project.
- **Marketing overhead**. launching a second repo means a second GitHub page, second README, second submission to the Claude marketplace, second discoverability effort.

None of these are fatal, but each deserves a mitigation in the recommended bundle.

---

## 2. Candidate skills analysis

### 2.1 Definitely general-business

These skills have no PM-specific content, methodology references, or terminology. They are useful in any professional context.

| Skill | Why it's general | Current location |
|-------|------------------|------------------|
| `foundation-meeting-agenda` | Meeting prep is universal; skill frames by type (team-sync, decision, etc.) without PM-specific framing | `skills/foundation-meeting-agenda/` |
| `foundation-meeting-brief` | Strategic meeting prep for the user, not PM-role-specific | `skills/foundation-meeting-brief/` |
| `foundation-meeting-recap` | Post-meeting summary is role-agnostic | `skills/foundation-meeting-recap/` |
| `foundation-meeting-synthesize` | Cross-meeting archaeology applies anywhere | `skills/foundation-meeting-synthesize/` |
| `foundation-stakeholder-update` | Async stakeholder communication is role-agnostic | `skills/foundation-stakeholder-update/` |
| `utility-mermaid-diagrams` | Diagrams are universal | `skills/utility-mermaid-diagrams/` |
| `utility-slideshow-creator` | Slideshows are universal | `skills/utility-slideshow-creator/` |

**Count**: 7 skills (5 meeting + 2 utility).

### 2.2 Boundary cases

These skills could fit either repo. A decision is needed, with reasoning.

| Skill | Case for general | Case for pm-specific | Recommendation |
|-------|------------------|----------------------|----------------|
| `foundation-persona` | Useful in marketing, sales, UX, customer success; not PM-exclusive | Originated in PM context; archetypes reference PM use cases in current examples | **Dual-list with `audience: cross`**. content is role-agnostic; examples can add non-PM scenarios |
| `foundation-lean-canvas` | Useful to any entrepreneur or business strategist | Ash Maurya's canvas is startup-oriented; typical users are founders and PMs | **Dual-list with `audience: cross`**. concept is not PM-exclusive |

**Count**: 2 skills, both dual-listed.

### 2.3 Definitely pm-specific

| Category | Skills | Why pm-specific |
|----------|--------|-----------------|
| Discover phase | competitive-analysis, interview-synthesis, stakeholder-summary | Product-discovery methodology |
| Define phase | problem-statement, hypothesis, opportunity-tree, jtbd-canvas | Product-definition methodology |
| Develop phase | solution-brief, spike-summary, adr, design-rationale | Product-development methodology (ADRs could arguably be general, but they're embedded in a PM workflow context) |
| Deliver phase | prd, user-stories, acceptance-criteria, edge-cases, launch-checklist, release-notes | Product-delivery artifacts |
| Measure phase | experiment-design, instrumentation-spec, dashboard-requirements, experiment-results | Product-measurement methodology |
| Iterate phase | retrospective, lessons-log, refinement-notes, pivot-decision | Product-iteration methodology |
| PM-tooling utilities | pm-skill-builder, pm-skill-validate, pm-skill-iterate, update-pm-skills | Tooling about pm-skills itself |

**Count**: 29 skills stay exclusively in pm-skills (25 phase + 3 lifecycle + 1 repo-maintenance).

### 2.4 Implications of the boundary

- **Sibling repo starts at 7-9 skills** (7 exclusive + 2 dual-listed).
- **pm-skills retains 29-38 skills** depending on whether dual-listed ones appear in both or move.
- **Dual-listing is the cleanest approach** for persona and lean-canvas: both repos get the file at release time, both point to the same upstream edit surface, neither is a fork.
- **Future foundation skills** (e.g., hypothetical `foundation-project-kickoff-checklist`) can be classified at creation time and land in the right set automatically.

---

## 3. Option family A. Repo-splitting strategy

Goal: decide how the sibling repo relates to pm-skills mechanically.

### Option A1. git subtree split (new repo with history)

Use `git subtree split --prefix=skills/foundation-meeting-agenda --prefix=... refs/heads/main` to produce a new git history containing only the chosen subdirectories. Push that history to a new repo. Going forward, maintain independently.

**Pros**: preserves git history per skill; sibling repo is fully independent; contributors can PR to either repo naturally.

**Cons**: **drift**. any fix in one repo must be manually ported to the other. The existing `git subtree` workflow is not friendly for ongoing sync. After 6 months, the two repos diverge silently.

**Effort**: low to create; high to maintain.

**When it fits**: when the two repos will evolve independently and drift is acceptable (e.g., spinning off a dormant subset).

### Option A2. New repo via scripted extraction

A `scripts/extract-subset.sh` reads frontmatter tags in pm-skills, copies tagged files into a staging area, and force-pushes them to a sibling repo's `main` branch. The sibling's git history is only the extraction-script commits. No per-skill history in the sibling.

**Pros**: no drift by construction (pm-skills is always the authoritative source); scales to N downstream repos (same script with different filters); low cognitive load (the sibling is a derived artifact, not a parallel project).

**Cons**: sibling contributors can't PR to the sibling and have it stick. all changes must go through pm-skills. sibling git history is shallow and not educational.

**Effort**: medium. ~150 lines of shell, including frontmatter parse, file copy, git push.

**When it fits**: single source of truth is desired; sibling is a publication surface rather than a development surface.

### Option A3. Mirrored downstream (continuous sync)

Same as A2 but runs on every push to pm-skills `main`, not just release tags. Sibling is always-fresh.

**Pros**: sibling is always in sync with pm-skills; users of the sibling see changes immediately.

**Cons**: sibling commit history is noisy (one commit per upstream push); sibling releases are not visible as distinct events; CI cost scales with push frequency.

**Effort**: medium, plus ongoing CI cost.

**When it fits**: sibling users want the latest, not the stable release.

### Option A4. No split. monorepo + multi-plugin marketplace

Keep everything in pm-skills. Update `.claude-plugin/plugin.json` and `marketplace.json` to expose two plugin identities from the same source. A user installing "business-skills" gets only the tagged skills; "pm-skills" gets all.

**Pros**: zero new repos; zero new infrastructure; uses marketplace's existing capability for multi-plugin manifests.

**Cons**: no distinct GitHub URL or README for business-skills; no independent brand identity; marketplace listing still lives under the pm-skills org.

**Effort**: low. ~50 lines of manifest changes.

**When it fits**: the goal is distribution-channel diversity, not brand separation.

### Option A5. Hybrid. monorepo now, split later

Ship Option A4 (multi-plugin marketplace) immediately. If adoption signals justify it, add Option A2 (scripted extraction) in a later release.

**Pros**: low upfront cost; lets adoption data inform the split decision; creates an easy migration path.

**Cons**: if the business audience adopts A4 without complaint, the split never happens and the brand-separation opportunity is lost.

**Effort**: low now; medium later.

**When it fits**: uncertain demand for a standalone brand.

---

## 4. Option family B. Tagging and taxonomy

Goal: how to signal which skills belong in which repo, in a way that is machine-readable and future-proof.

### Option B1. Single `audience:` tag with closed enum

Add `audience:` to skill frontmatter with closed enum: `pm | general | cross`.

- `pm`: only appears in pm-skills.
- `general`: only appears in business-skills (sibling).
- `cross`: appears in both.

**Pros**: simple; closed enum is CI-validatable; one value per skill means no ambiguity.

**Cons**: "cross" means the skill is physically duplicated at extraction time. any edit must propagate. but this is by construction (extraction is idempotent).

**Effort**: low. one-line frontmatter addition, validator extension.

### Option B2. Multi-value `audience:` list

`audience: [pm, design, engineering]` as a list. Extraction scripts can filter by membership.

**Pros**: infinitely flexible; supports future repos (`design-skills`, `engineering-skills`) via additional tag values without schema change.

**Cons**: harder to reason about for humans; requires explicit list management.

**Effort**: low-medium.

### Option B3. Explicit include/exclude manifest per downstream

Each downstream repo has its own `manifest.yaml` listing exactly which skills to include. No audience tag on the skill itself.

**Pros**: no frontmatter change to pm-skills; per-downstream curation is explicit.

**Cons**: manifest must be kept in sync by hand; easy to forget to add a new skill; doesn't scale to many downstreams.

**Effort**: low, but recurring cost.

### Option B4. Reuse `classification:` without a new field

pm-skills already has `classification: foundation | utility | phase`. Use it: foundation and utility are candidates for the sibling; phase stays in pm-skills.

**Pros**: no schema change; uses existing data.

**Cons**: too coarse. Not every foundation or utility skill is general-business. `utility-pm-skill-builder` is foundation by responsibility but pm-specific by content. Conflates two orthogonal concerns.

**Effort**: zero, but semantically wrong.

**Recommend against**. `classification` is about skill role (foundation/utility/phase); audience is orthogonal.

---

## 5. Option family C. Automation and scaling

Goal: how does the extraction happen, how often, and who triggers it.

### Option C1. Release-tag-driven extraction

On every `git tag vX.Y.Z` in pm-skills, a GitHub Action runs the extraction script and pushes the result to the sibling repo. Sibling gets a matching tag (or its own release cadence).

**Pros**: sibling releases are observable events aligned with pm-skills stability; low CI cost (only on tag); natural cadence.

**Cons**: sibling lags pm-skills main between releases. Users of the sibling see changes only at release time.

**Effort**: medium. GitHub Action + extraction script.

### Option C2. Continuous mirror on every main push

Every merge to pm-skills `main` triggers an extraction + push to sibling.

**Pros**: sibling is always fresh.

**Cons**: noisy sibling history; release semantics are lost; CI cost scales with push frequency.

**Effort**: medium, higher ongoing cost.

### Option C3. Manual extraction on release cut

Maintainer runs `scripts/extract-subset.sh` manually as part of release. Sibling push is explicit.

**Pros**: zero CI infrastructure; maintainer has full control.

**Cons**: extraction step is skippable; sibling falls behind if forgotten.

**Effort**: low.

### Option C4. GitHub Action with parametric repo list

A single Action takes a list of downstream repos (`business-skills`, future `design-skills`, etc.) and their filter criteria. Runs one extraction pass per downstream on each pm-skills release tag.

**Pros**: scales to N downstream repos without per-repo Actions; single place to configure.

**Cons**: configuration logic is more complex; one failure can block others unless decoupled.

**Effort**: medium, but amortizes across any number of siblings.

---

## 6. Option family D. Contribution flow

Goal: where do contributors send PRs.

### Option D1. Upstream-only. sibling is read-only downstream

All contributions go to pm-skills. Sibling repo's README says "this is a derived artifact; contribute upstream at [pm-skills URL]". Sibling PRs are closed-with-redirect.

**Pros**: zero sync complexity; single source of truth enforced; maintainer workload concentrated in one place.

**Cons**: contributors who discover the sibling first have to context-switch to the upstream; sibling feels less like a "real" project.

**Effort**: low (policy + README language).

**When it fits**: the sibling's primary purpose is distribution, not development.

### Option D2. Bidirectional sync

Contributions can go to either repo. A nightly sync job reconciles changes (using labels like `upstream-only`, `sibling-only`, or path-scoped rules).

**Pros**: contributors use whichever repo they discovered.

**Cons**: conflict resolution is often manual and labor-intensive; risk of divergence is high; "which repo is canonical?" becomes unclear.

**Effort**: high, ongoing.

**When it fits**: mature projects with dedicated sync-maintainer capacity.

### Option D3. Sibling-authored skills only

Sibling repo accepts PRs only for skills that don't exist in pm-skills. Once a skill lives in pm-skills (via cross-listing or migration), further edits go upstream.

**Pros**: sibling is a staging ground for genuinely-general content; upstream is the graduation target.

**Cons**: graduation criteria are subjective; authors may be surprised when their skill gets "moved".

**Effort**: medium. needs documented graduation policy.

---

## 7. Interaction effects and option bundles

The four families compose. Certain bundles align; others conflict.

### Bundle 1. Clean single-source-of-truth (recommended)

**A2** (scripted extraction to sibling) **+ B1** (audience enum) **+ C1** (release-tag-driven) **+ D1** (upstream-only contributions).

Outcome: pm-skills is canonical; sibling is an automated publication; contributors always know where to go; drift is structurally impossible.

Cost: ~200 lines of extraction script + 1 GitHub Action + frontmatter sweep + sibling README.

### Bundle 2. Zero-new-repo minimalism

**A4** (multi-plugin marketplace) **+ B1** (audience enum for manifest filtering) **+ no C, no D applicable** (no sibling repo exists).

Outcome: pm-skills exposes two plugin identities from the same source. No GitHub URL change.

Cost: marketplace manifest changes + audience-tag sweep + testing. Much lower cost than Bundle 1.

### Bundle 3. Independent repos, accept drift

**A1** (subtree split) **+ no B needed** (files are already separated) **+ no C** (no sync) **+ D2** (bidirectional, de facto, because the repos are independent).

Outcome: two real repos, independent development, drift accepted as cost of independence.

Cost: low to start; high to maintain.

### Bundle 4. Monorepo now, split later

**A5** (hybrid, start at A4 then plan A2) **+ B1** (audience enum adopted now so A2 is ready) **+ C3** (manual later) **+ D1**.

Outcome: ship the multi-plugin approach first; watch adoption; split only if demand warrants.

Cost: Bundle 2's cost now; Bundle 1's cost deferred.

---

## 8. Recommendation

### Recommended bundle: **Bundle 1 (clean single-source-of-truth)** with an intermediate Bundle 4 on-ramp

**v2.12.0 scope (on-ramp, low-risk)**:

1. **Add `audience:` frontmatter tag (B1)**. Enum: `pm | general | cross`. Sweep all 38 skills, assigning values. Validator extension in `scripts/lint-skills-frontmatter.sh` enforces closed enum.

2. **Ship multi-plugin marketplace (A4)**. Add a second plugin identity (`business-skills`) in `marketplace.json` that filters to `audience in [general, cross]`. Tests the audience split without creating a new repo. Low-risk adoption signal.

3. **Do not yet create sibling repo**. Use Bundle 4's signal-gathering phase. If marketplace analytics (or anecdotal signal) show material demand for the business-skills plugin, proceed to v2.13.0 scope.

**v2.13.0 scope (full split, if signal positive)**:

4. **Create sibling repo** `business-skills` (or alternate name after brand check). Scaffold README, LICENSE (Apache 2.0, matching pm-skills), CONTRIBUTING, CI skeleton.

5. **Build extraction script** `scripts/extract-subset.sh`. Reads audience tags from pm-skills; copies tagged skill directories, matching commands, matching library samples, contract docs referenced by the skills (if any), to a staging area; force-pushes to sibling.

6. **Add GitHub Action (C1)**. Trigger: `push tags v*`. Runs extraction; pushes to sibling; creates matching sibling tag.

7. **Contribution policy (D1)**. Sibling README states upstream-only; issue template redirects; auto-close bot for PRs against sibling.

8. **Multi-downstream readiness (C4)**. Build the Action with parametric repo list so `design-skills`, `engineering-skills`, etc. can be added without Action changes.

**Deferred (evaluate after v2.13.0)**:

9. **Continuous mirror (C2)** if sibling users need fresh-from-main access.
10. **Graduation policy (D3)** if sibling-originating contributions emerge.

### Why this bundle

- **Signal before commitment**. Bundle 4's on-ramp (multi-plugin marketplace in v2.12.0) tests the audience split for a cost of ~50 lines of manifest changes. If nobody installs the business-skills plugin, no sibling repo is created.
- **Clean path if signal positive**. The audience tag shipped in v2.12.0 is already doing the filtering work. v2.13.0 adds the extraction + sibling repo, not the taxonomy.
- **Single source of truth**. No drift by construction. Every future downstream repo (design-skills, engineering-skills, research-skills) uses the same extraction pattern.
- **Contributor clarity**. Upstream-only policy removes ambiguity. The sibling is obviously a publication.
- **Aligns with industry best practice**. Bundle 1 matches the "monorepo with tooling-driven subset publication" pattern used by Nx, Turborepo, Go's stdlib, and Hugo's content taxonomy. See `multi-repo-patterns-reference_2026-04-19.md` §6 and §8 for the cross-pattern validation.

### Why not the other bundles

- **Bundle 2 alone** is the on-ramp; it's insufficient as the final state if brand separation matters.
- **Bundle 3** accepts drift, which undermines the value of sharing quality-enforced skills.
- **Bundle 4 stopped at A4** is fine if no demand materializes, but closes off the brand opportunity if it does.

---

## 9. Migration path

### Phase 1. v2.12.0 on-ramp (4-6 hour effort)

Prerequisite: agreement on audience enum values and sibling-repo naming.

1. Define `audience:` enum and write sweep script.
2. Sweep all 38 skills. assign `audience` value based on §2 table.
3. Extend `scripts/lint-skills-frontmatter.sh` to validate audience enum.
4. Update `marketplace.json` to expose the second plugin identity.
5. Document the multi-plugin install flow in README.
6. Monitor adoption for 4-8 weeks via marketplace analytics (if available) or user feedback.

Commits: 2-3 (audience sweep, validator, marketplace).

### Phase 2. v2.13.0 full split (if signal positive)

Prerequisite: demonstrated demand, sibling-repo name locked, org account access.

1. Create sibling GitHub repo.
2. Write `scripts/extract-subset.sh`. Test locally.
3. Write GitHub Action for release-tag-driven extraction.
4. Wire sibling CI (identical validator set, identical release workflow).
5. Sibling README, LICENSE, CONTRIBUTING, CODE_OF_CONDUCT (cloned from pm-skills).
6. Marketplace submission for sibling.
7. Announce on pm-skills README.

Commits: 3-4 in pm-skills (script, action, README, validator); initial commits in sibling (auto-generated).

### Phase 3. v2.14.0+ multi-downstream (if warranted)

1. Parametrize the GitHub Action to accept a list of downstream repos and filter rules.
2. Add `design-skills`, `engineering-skills`, etc. as demand surfaces.
3. Establish graduation policy (D3) if sibling-authored skills start appearing.

---

## 10. Open questions

1. **Sibling-repo name**. `business-skills`, `work-skills`, `office-skills`, `professional-skills`? `business-skills` feels cleanest but may be too broad. Recommend `business-skills` as working name; revisit at Phase 2 kickoff.

2. **Example scrubbing**. The persona and lean-canvas skills' current examples use PM scenarios. For `cross`-audience inclusion, do the examples need non-PM counterparts? Recommend adding a second example per cross-listed skill showing a non-PM use case; keep the PM example too.

3. **Meeting-skills family contract location**. The contract lives at `docs/reference/skill-families/meeting-skills-contract.md` in pm-skills. Sibling repo needs this contract too. Extract it as part of the extraction script? Or publish to a shared third location?

4. **Samples library**. pm-skills's `library/skill-output-samples/` includes meeting-skills samples. Extract those to sibling? The thread profiles (storevine, brainshelf, workbench) are generic. the samples should port cleanly.

5. **Versioning relationship**. Does sibling's v1.0.0 correspond to pm-skills's v2.13.0? Or does sibling have its own monotonic versioning? Recommend: sibling has independent semver starting at v1.0.0; tag mirrors are optional informational references.

6. **MCP frozen decision**. pm-skills-mcp was frozen in v2.11.0 (M-22). Does the sibling repo need its own MCP? If yes, that doubles the MCP-alignment decision. Recommend defer MCP for sibling until pm-skills-mcp unfreezes.

7. **License compatibility**. Both repos Apache 2.0. Attribution trail in headers stays intact through extraction. Confirm with a license pass in Phase 2.

8. **Brand cross-link**. pm-skills README mentions sibling; sibling README mentions pm-skills. One-way redirect vs. mutual link? Recommend mutual link for discoverability.

9. **Discovery of same-name skills**. If pm-skills has `foundation-persona` and sibling also has `foundation-persona` (via `cross`), does the user see two skills with the same name in a blended tool that installs both? Recommend: in sibling, rename to just `persona` (drop foundation prefix) to avoid collision; or both stay prefixed and dedup happens in the installer.

10. **Sunsetting plan**. If sibling fails to gain traction, how do we sunset cleanly? Recommend: sibling README states "this is a derived surface; sunset plan is to redirect to pm-skills directly".

---

## 11. Appendix

### 11.1 Audience enum proposal

| Value | Meaning | Where the skill appears |
|-------|---------|-------------------------|
| `pm` | Specific to Product Management methodology, role, or artifacts | pm-skills only |
| `general` | Generic business tool, no PM content | business-skills only |
| `cross` | Useful to PM and other roles; dual-listed | Both repos |

Future values (anticipated): `design`, `engineering`, `research` for future sibling repos. The enum should remain small and closed; each new value requires maintainer approval and ideally a new sibling repo to receive it.

### 11.2 Extraction script shape

Conceptual, not production:

```bash
#!/bin/bash
# scripts/extract-subset.sh
# Usage: extract-subset.sh <audience-filter> <target-dir>

AUDIENCE_FILTER="$1"  # e.g., "general|cross"
TARGET="$2"           # e.g., "../business-skills-staging"

# 1. Find skills matching the audience filter
find skills/ -name SKILL.md | while read -r f; do
  if grep -E "^audience: (${AUDIENCE_FILTER})$" "$f" > /dev/null; then
    skill_dir=$(dirname "$f")
    cp -r "$skill_dir" "$TARGET/$(basename "$skill_dir")"
  fi
done

# 2. Find matching commands (by skill name stem)
# ... command copy logic ...

# 3. Copy matching library samples
# ... sample copy logic ...

# 4. Copy shared contracts referenced by any included skill
# ... contract detection and copy ...

# 5. Copy top-level files (LICENSE, CONTRIBUTING template, CODE_OF_CONDUCT template)
# ... template copy ...

# 6. Write a manifest of what was extracted
echo "Extracted $(ls $TARGET/skills/ | wc -l) skills" > "$TARGET/EXTRACTED.md"
```

### 11.3 Frontmatter schema proposal (v2)

```yaml
---
name: foundation-meeting-agenda
description: ...
classification: foundation
audience: general             # NEW in v2.12.0: pm | general | cross
version: "1.1.0"
updated: 2026-04-19
license: Apache-2.0
metadata:
  category: meeting
  frameworks: [meeting-skills-family]
  author: product-on-purpose
---
```

Validator rules:
- `audience` required, must be in enum.
- `audience: pm` implies skill will only appear in pm-skills.
- `audience: cross` implies skill content must not reference PM-specific terminology in a way that alienates non-PM readers (validator advisory check; hard to automate).

### 11.4 Sibling-repo README skeleton

Not full text, but key sections:

1. Hero. "Claude skills for common business work. meeting prep, meeting recap, stakeholder updates, diagrams, slideshows"
2. What's included. list of 7-9 skills with one-line descriptions
3. Install. matches pm-skills install pattern
4. How this relates to pm-skills. short section explaining this is a derived subset; contributions go upstream; link back
5. License. Apache 2.0
6. Contributing. redirect to pm-skills CONTRIBUTING

### 11.5 What this design does NOT address

- **Skill-level forking**. this design assumes a skill either appears in the sibling unchanged or not at all. If the sibling needed a differently-tuned version of a skill, that is a separate concern (variant-per-audience) not covered here.
- **Cross-repo CI coordination**. if sibling ever has its own tests that conflict with upstream changes, handling is not specified.
- **Multi-language support**. if sibling audiences are non-English, translation workflow is not addressed.
- **Commercial licensing**. both repos are Apache 2.0. Mixed licensing is not considered.
- **User-facing install UX**. how a user who installs both repos experiences possible duplicate skills is called out in Open Question 9 but not solved.

---

## 12. Related documents

- `docs/internal/multi-repo-patterns-reference_2026-04-19.md`. **companion reference**. industry best-practice synthesis (Nx, Turborepo, git subtree, Hugo taxonomy, Lerna)
- `docs/internal/efforts/organization-design_2026-04-18.md`. sibling design doc for efforts folder organization
- `docs/internal/efforts/tracking-patterns-reference_2026-04-18.md`. sibling reference for effort-tracking patterns
- `docs/internal/agent-component-usage_2026-04-18.md`. sibling design doc for runtime leverage
- `docs/reference/skill-families/meeting-skills-contract.md`. contract that would be extracted alongside meeting skills
- `docs/internal/efforts/meeting-skills-family/plan_family-contract.md`. context for the biggest candidate cluster

---

## 13. Decision log (to be filled)

| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-04-19 | Draft authored | Surface extraction options for v2.12.0+ planning |
| TBD | Audience enum locked | Requires maintainer review |
| TBD | Sibling-repo name chosen | Brand / domain check |
| TBD | Phase 1 on-ramp (Bundle 2 marketplace) | Signal-gathering phase begins |
| TBD | Phase 2 full split or hold | Decision based on Phase 1 signal |
