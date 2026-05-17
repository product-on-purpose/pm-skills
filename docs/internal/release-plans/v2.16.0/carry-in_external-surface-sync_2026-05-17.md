---
title: External-Surface Sync (carry-in context for v2.16.0)
description: Context document surfacing a structural gap not visible in any v2.16.0 plan: GitHub repo API state and external-service surfaces drift each release because they live outside `git`. Provides drop-in spec snippets the v2.16.0 author can absorb into `spec_pm-release-conductor.md` G4, `ci-plan.md`, and a new `.github/repo-metadata.yml` source-of-truth file.
type: carry-in / context (not a plan to execute)
created: 2026-05-17
source: v2.15.x trailing audit
status: ADVISORY (v2.16.0 author absorbs into existing plans)
---

# External-Surface Sync (carry-in context for v2.16.0)

**This is not a v2.16.0 plan.** It is context that the v2.16.0 author should absorb into existing v2.16.0 plans (specifically `spec_pm-release-conductor.md` G4, `ci-plan.md`, and possibly a new `.github/repo-metadata.yml` source-of-truth file). v2.16.0 plan structure, task numbering, and ratified decisions are NOT touched by this document.

## Why this exists

v2.15.x closed 18 audit findings + 4 new preventive CI validators. Every fix lived in a tracked file under `git`. Then on 2026-05-17, a screenshot of the GitHub mobile app revealed a surface my v2.15.x work never touched: the **GitHub repo "About" description** (visible on the github.com repo page and in mobile apps) was still showing pre-v2.15.0 narrative content ("55 skills across Triple Diamond phases plus foundation (...) and utility (...)" with no mention of the Tool classification, Foundation Sprint, or Design Sprint).

This surface lives in **GitHub API state**, not in any file under source control. No validator in pm-skills can detect drift here because validators only read files. The same pattern applies to several other external-state surfaces.

A trailing v2.15.x commit (HEAD post-`17db37c`) executed the immediate one-shot fix via `gh repo edit` and added Section 10.5 to `runbook_clean-worktree-cut-tag-publish.md` as a manual checklist. **The runbook step is sufficient for now**, but it's a "remember to do this" item, exactly the kind of thing the v2.16.0 sub-agent slate exists to mechanize.

## Surfaces NOT under source control (the gap)

| Surface | Where it lives | Caught by current pm-skills CI? |
|---|---|---|
| GitHub repo "About" description | GitHub API state | NO |
| GitHub repo "Topics" | GitHub API state | NO |
| GitHub repo "Homepage URL" | GitHub API state | NO |
| Docs site `<meta property="og:description">` | Astro build output (derived from frontmatter; verify per release) | NO (build is verified; runtime emission isn't) |
| `pm-skills-mcp/README.md` cross-repo description | Separate repo | NO (different repo) |
| `pm-skills-mcp/pm-skills-source.json` metadata | Separate repo | NO |
| skills.sh directory listing at https://skills.sh/product-on-purpose/pm-skills | External service cache | NO |
| GitHub social preview image (if set) | GitHub state | NO |

Of these, the **GitHub About description + Topics + Homepage** are highest leverage (most visible per click; appear in search results, mobile, and link previews). The others are nice-to-have refresh targets.

## Recommended absorb pattern (NOT a v2.16.0 plan addition; a context overlay)

Three places where v2.16.0 work can absorb this. Order shows defense in depth:

### Layer 1: Source-of-truth file (`.github/repo-metadata.yml`)

Single canonical file containing every external-state value that must match a tracked surface. Proposed shape:

```yaml
# .github/repo-metadata.yml
# Source of truth for GitHub repo API state and other external-surface values.
# Synced to the GitHub repo via scripts/sync-repo-metadata.{sh,ps1}.
# Verified by pre-tag-validate.{sh,ps1} via a new check-repo-metadata-sync validator.

# GitHub repo "About" description (max 350 chars per GitHub limit)
description: |
  55 plug-and-play PM skills for AI agents: 26 Triple Diamond phase + 8 foundation (persona, OKR writer, meeting family, lean canvas) + 6 utility (skill lifecycle) + 15 tool implementing canonical Foundation Sprint + Design Sprint methodologies. Templates, workflows, samples, CI-enforced family contracts. Apache 2.0.

# GitHub repo "Homepage URL"
homepage: https://product-on-purpose.github.io/pm-skills/

# GitHub repo "Topics" (full set; sync script applies add + remove deltas)
topics:
  - product-management
  - triple-diamond
  - agent-skills
  - ai-skills
  - claude-code
  - claude-desktop
  - openskills
  - skill-families
  - foundation-sprint
  - design-sprint

# Sync targets - parallel external surfaces that should be verified after sync
sync_targets:
  - name: pm-skills-mcp cross-repo
    files:
      - ../pm-skills-mcp/README.md
      - ../pm-skills-mcp/pm-skills-source.json
    note: "Manual cross-repo refresh; mirrors v2.14.2 pattern. Required when catalog narrative changes."
  - name: skills.sh directory
    url: https://skills.sh/product-on-purpose/pm-skills
    note: "Auto-scraped from README; verify within 24h of release."
  - name: docs site og:description
    url: https://product-on-purpose.github.io/pm-skills/
    selector: 'meta[property="og:description"]'
    note: "Auto-derived from docs/index.mdx frontmatter; verify build emission."
```

**Why YAML in `.github/`**: parallels `.github/dependabot.yml`, `.github/CODEOWNERS`, etc. - the convention is "GitHub-specific metadata lives in `.github/`." Plus, the `.github/` prefix signals "tooling, not application code."

### Layer 2: Sync script (`scripts/sync-repo-metadata.{sh,ps1,md}`)

Triplet following the established convention. Reads `.github/repo-metadata.yml`, calls `gh repo edit` with the appropriate flags, verifies the API now returns the expected values, exits non-zero if any sync failed.

Proposed sketch:

```bash
#!/usr/bin/env bash
# sync-repo-metadata.sh - Push .github/repo-metadata.yml values to the GitHub repo API.
#
# Reads description, homepage, topics from .github/repo-metadata.yml.
# Calls gh repo edit to PATCH the repo via the GitHub API.
# Verifies post-sync via gh api GET.
# Exit 0 on full sync; 1 on any sync failure.

set -euo pipefail
# ... (Python or yq to parse YAML, then gh repo edit, then verify)
```

The script invocation is manual at first (Section 10.5 of runbook calls it explicitly). When the sub-agent slate ships, the conductor invokes it from G4.

### Layer 3: CI validator (`scripts/check-repo-metadata-sync.{sh,ps1,md}`)

NEW preventive validator that asserts the YAML file's `description:` is ≤350 chars (GitHub limit), the `description:` content matches the README.md `<h4>` byline modulo length-fit, all topics are valid GitHub topic strings (lowercase, hyphenated, ≤50 chars, ≤20 topics total), and the homepage URL is a valid URL.

This validator does NOT call GitHub API at CI time (avoids needing GH_TOKEN for read-only PR checks). It validates the source-of-truth file itself. The actual sync to GitHub API is a release-time concern, not a per-PR concern.

Add to pre-tag-validate.sh `VALIDATORS` array. Add to validation.yml as enforcing step.

### Layer 4: spec_pm-release-conductor.md G4 absorption

This is the durable enforcement mechanism. Add a sub-check to G4 (Post-tag hygiene):

> **G4.N: External-surface sync via `.github/repo-metadata.yml`**. After the tag is pushed, the conductor invokes `scripts/sync-repo-metadata.{sh,ps1}`. The script reads the YAML source-of-truth, PATCHes the GitHub repo API via `gh repo edit`, and verifies post-sync. If the sync fails (rate limit, auth error, GitHub API down), the conductor surfaces the failure but does NOT roll back the tag (the tag itself is correct; the external surface is just out of sync). Conductor marks the release "complete with external-surface sync pending" and the maintainer resolves manually.

This is the v2.17 fallback if the surface sync fails post-tag. The release itself is correct; only the API state is briefly stale.

## What the v2.16.0 author should do

Concrete asks, in priority order:

1. **Decide whether `.github/repo-metadata.yml` source-of-truth is in scope for v2.16.0.** If yes, add it to `ci-plan.md` as a NEW task in Phase 2 (or v2.17 cleanup if scope is constrained). If no, stay with the runbook Section 10.5 manual approach until v2.17.

2. **If `.github/repo-metadata.yml` is in scope**, then add:
   - One new task in `ci-plan.md` Phase 2 (script + validator triplet authoring)
   - One new sub-check in `spec_pm-release-conductor.md` G4 (or G2.5 if pre-tag)
   - One new prereq in `subagents-integration-plan.md` (sync script must exist before conductor's G4 sub-check works)

3. **If staying manual**, then absorb the runbook Section 10.5 reference into `spec_pm-release-conductor.md` G4 as a "verify maintainer ran Section 10.5 of runbook" attestation gate (analogous to G1 adversarial-review-status attestation).

4. **Either way**: the spec_pm-skill-auditor.md cross-cutting check catalog could add a new check entry:

   > **GitHub repo metadata drift**: `.github/repo-metadata.yml` (if present) declares description / topics / homepage values; auditor verifies these match the current GitHub API state via `gh api repos/.../pm-skills`. P0 finding if any drift detected during a release-prep audit run.

   This requires the auditor to have network access during invocation, which is a constraint worth surfacing in `spec_pm-skill-auditor.md` "What pm-skill-auditor does NOT do" section if you choose NOT to add this check.

## What this document does NOT do

- Does NOT modify v2.16.0 task counts, phasing, or ratified decisions
- Does NOT change spec docs directly
- Does NOT add a new v2.16.0 plan file
- Does NOT block v2.16.0 execution

The v2.16.0 author absorbs these recommendations at their discretion. If the absorption is scoped out, the runbook Section 10.5 manual checklist (added 2026-05-17 to `runbook_clean-worktree-cut-tag-publish.md`) is the existing fallback.

## Reference state at time of authoring

| Surface | State (2026-05-17 evening) |
|---|---|
| GitHub repo About description | UPDATED to v2.15.0 narrative ("55 plug-and-play PM skills ... 15 tool implementing canonical Foundation Sprint + Design Sprint methodologies. ... Apache 2.0.") |
| GitHub repo Topics | UPDATED (added `foundation-sprint`, `design-sprint`) |
| GitHub repo Homepage | unchanged: `https://product-on-purpose.github.io/pm-skills/` |
| runbook Section 10.5 | NEW; added to `runbook_clean-worktree-cut-tag-publish.md` |
| pm-skills-mcp cross-repo references | LAST refreshed in v2.14.2 (2026-05-10); will need v2.16.0-or-later refresh when catalog narrative changes |
| skills.sh listing | not verified at time of authoring; expected to auto-refresh |
| docs site og:description | not verified at time of authoring; expected to derive from `docs/index.mdx` frontmatter |

## Cross-references

- Source audit conversation: 2026-05-17 evening session (post-v2.15.2 closeout + carry-in hygiene at `17db37c`)
- Runbook: [`../runbook_clean-worktree-cut-tag-publish.md`](../runbook_clean-worktree-cut-tag-publish.md) Section 10.5 (added 2026-05-17)
- Related v2.16.0 plans (NOT modified by this doc):
  - [`plan_v2.16.0.md`](./plan_v2.16.0.md)
  - [`spec_pm-release-conductor.md`](./spec_pm-release-conductor.md)
  - [`spec_pm-skill-auditor.md`](./spec_pm-skill-auditor.md)
  - [`ci-plan.md`](./ci-plan.md)
  - [`subagents-integration-plan.md`](./subagents-integration-plan.md)
