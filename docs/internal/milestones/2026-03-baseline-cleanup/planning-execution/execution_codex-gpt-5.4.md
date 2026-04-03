# Execution Plan — Codex GPT-5.4
## pm-skills Repo Hygiene Baseline

**Agent:** Codex GPT-5.4  
**Repo:** `E:\Projects\product-on-purpose\pm-skills`  
**Baseline source:** `_NOTES/baseline-standards/plan_codex/plan_codex-gpt-5.4.md`  
**Shared coordinator:** `_NOTES/baseline-standards/execution_shared-claude-codex.md`  
**Created:** 2026-03-15  
**Status:** Execution complete (`C-1` through `C-6` complete; baseline cleanup lane closed)

---

## How To Use This Document

This is the Codex-owned execution plan. Use it when the baseline decisions are already accepted and the task is to land the tracked repo changes.

At the start of a session:

1. Check the `Status Tracker`.
2. Open the shared coordinator doc to confirm dependencies with Claude work.
3. Start with the first unchecked Codex task.
4. Update this file after the task lands.

This document intentionally does **not** duplicate Claude's detailed tasks. It only covers Codex-owned work.

---

## Status Tracker

| ID | Task | Status | Notes |
| --- | --- | --- | --- |
| C-1 | Rewrite active policy docs to reflect accepted canonical homes | [x] | completed 2026-03-15 |
| C-2 | Consolidate release governance and normalize effort entry points | [x] | completed 2026-03-16 |
| C-3 | Refresh Codex continuity and shared decision capture | [x] | completed 2026-03-17 |
| C-4 | Align contributor schema and authoring docs | [x] | completed 2026-03-19 |
| C-5 | Align public/reference docs and remove speculative surfaces | [x] | completed 2026-03-19 |
| C-6 | Clean remaining active release/sample docs and hand back to coordinator | [x] | completed 2026-03-19 |

**Suggested order:** `C-1 → C-2 → C-3 → C-4 → C-5 → C-6`

**Recommended session batches:**

- **Batch 1:** `C-1`, `C-2`
- **Batch 2:** `C-3`
- **Batch 3:** `C-4`, `C-5`
- **Batch 4:** `C-6`

**Operational note (2026-03-18):** The active Codex lane was refreshed onto worktree branch `codex-baseline-refresh` after Claude `A-11`, then landed back onto `main` as commit `ad6deb8` after Claude `A-8` landed. Preserve Claude's `A-11` versions of `docs/internal/efforts/README.md` and `docs/internal/efforts/M-10-skill-sample-outputs-library.md` as the base truth for any later `C-6` edits.

---

## Why These Tasks Exist

The repo now has a decision-complete baseline, but the tracked files still teach the older model.

The main remaining gaps are:

1. tracked policy files still point to `_NOTES/**` or split tracked release homes
2. `AGENTS/codex/CONTEXT.md` and `AGENTS/DECISIONS.md` are behind the live repo
3. contributor and reference docs still teach stale schema, counts, or helper surfaces
4. a few active tracked docs still carry stale release-truth or `_NOTES` references

Claude already landed the first cleanup batch (`A-1` through `A-4`). Codex now needs to clean the tracked baseline so the remaining Claude-safe tasks can run against a stable structure.

---

## Task Definitions

---

### C-1 — Rewrite active policy docs to reflect accepted canonical homes

**Why:** The policy layer still teaches the wrong tracked-vs-local model. Everything else inherits from these files.  
**Effort:** 20-30 min  
**Risk:** Low  
**Depends on:** Nothing

**Files touched:**

- `docs/internal/planning-persistence-policy.md`
- `docs/internal/planning-artifact-tier-map.md`

**What to change:**

1. define `docs/internal/release-plans/**` as the tracked home for internal release governance
2. define `docs/internal/efforts/**` as the tracked home for durable effort briefs
3. keep `_NOTES/**` local-only
4. stop naming `docs/internal/release-planning/**` and `docs/internal/delivery-plan/**` as canonical tracked homes
5. keep the policy concise and operational

**Definition of done:**

- both policy docs reflect the accepted baseline model
- neither file treats `_NOTES/**` as canonical
- neither file treats the old split release trees as the current canonical model

**Prompt to give Codex:**

```text
Execute C-1 from _NOTES/baseline-standards/plan_codex/execution_codex-gpt-5.4.md.

Rewrite these tracked policy files to match the accepted baseline:
- docs/internal/planning-persistence-policy.md
- docs/internal/planning-artifact-tier-map.md

Requirements:
1. docs/internal/release-plans/** is the tracked home for internal release governance.
2. docs/internal/efforts/** is the tracked home for durable effort briefs.
3. _NOTES/** remains local-only working space.
4. Do not describe docs/internal/release-planning/** or docs/internal/delivery-plan/** as the current canonical homes.
5. Keep the wording narrow and operational.

Show the diff before concluding.
```

---

### C-2 — Consolidate release governance and normalize effort entry points

**Why:** The repo still has two tracked release-governance trees and no tracked README that explains the accepted effort model.  
**Effort:** 45-75 min  
**Risk:** Medium  
**Depends on:** `C-1`

**Files touched:**

- create `docs/internal/release-plans/README.md`
- add versioned files under `docs/internal/release-plans/`
- create `docs/internal/efforts/README.md`
- rewrite `docs/internal/backlog-canonical.md`
- update `docs/internal/release-planning/README.md`
- update `docs/internal/delivery-plan/README.md`
- update `docs/internal/efforts/M-10-skill-sample-outputs-library.md`

**What to change:**

1. create the tracked `docs/internal/release-plans/` home
2. move or re-home active release-governance artifacts into versioned release folders
3. rewrite `docs/internal/backlog-canonical.md` as a short policy/index file:
   - backlog state lives in GitHub issues
   - durable effort context lives in `docs/internal/efforts/**`
   - `_NOTES/**` is local scratch
4. add `docs/internal/efforts/README.md` describing the tracked brief model
5. update the existing `M-10` brief so its canonical links point at tracked release-governance artifacts, not `_NOTES/**` or the old split release trees
6. leave older history alone unless it is still part of active navigation

**Definition of done:**

- `docs/internal/release-plans/README.md` exists
- tracked docs now explain one release-governance home
- `docs/internal/backlog-canonical.md` no longer points to a gitignored canonical backlog file
- `docs/internal/efforts/README.md` exists
- `M-10` no longer relies on `_NOTES/**` as canonical

**Prompt to give Codex:**

```text
Execute C-2 from _NOTES/baseline-standards/plan_codex/execution_codex-gpt-5.4.md.

Goal: establish docs/internal/release-plans/** as the single tracked release-governance home and normalize the effort/backlog entry points.

Work in these files:
- create docs/internal/release-plans/README.md
- create the needed docs/internal/release-plans/vX.Y.Z/** structure for active tracked release artifacts
- create docs/internal/efforts/README.md
- rewrite docs/internal/backlog-canonical.md as a short policy/index note
- update docs/internal/release-planning/README.md and docs/internal/delivery-plan/README.md so they read as legacy/redirect surfaces if they remain
- update docs/internal/efforts/M-10-skill-sample-outputs-library.md to point only at tracked canonical references

Constraints:
1. Prefer the narrow migration. Move or rewrite only active artifacts needed for the new baseline.
2. Do not turn this into archive cleanup.
3. Do not describe _NOTES/** as canonical anywhere.

Show the planned file moves and diffs before concluding.
```

---

### C-3 — Refresh Codex continuity and shared decision capture

**Why:** The tracked Codex continuity layer is stale, and the shared decision log is too thin to support reliable agent work.  
**Effort:** 30-45 min  
**Risk:** Low  
**Depends on:** `C-2` preferred, but can start once the baseline model is stable

**Files touched:**

- `AGENTS/codex/CONTEXT.md`
- `AGENTS/DECISIONS.md`
- optional new tracked guidance doc, e.g. `AGENTS/DECISIONS_GUIDE.md`

**What to change:**

1. update `AGENTS/codex/CONTEXT.md` to the current `v2.6.1` repo baseline
2. remove references to deleted `.claude/settings.json`
3. rewrite the immediate-next-step section around the baseline cleanup actually in flight now
4. backfill `AGENTS/DECISIONS.md` with concise cross-agent decisions that should survive beyond one session
5. add a short guidance file for what belongs in `DECISIONS.md` if that improves future consistency
6. include a short note in that guidance about later wrap-session integration, but do not redesign wrap-session here

**Definition of done:**

- `AGENTS/codex/CONTEXT.md` is current
- `AGENTS/DECISIONS.md` reflects the major cross-agent operating decisions
- any new decision-guide doc is short, practical, and clearly separate from wrap-session redesign

**Prompt to give Codex:**

```text
Execute C-3 from _NOTES/baseline-standards/plan_codex/execution_codex-gpt-5.4.md.

Update the tracked continuity layer:
- AGENTS/codex/CONTEXT.md
- AGENTS/DECISIONS.md

Optional if it materially helps: add a short tracked guide for DECISIONS.md best practices.

Requirements:
1. Bring Codex CONTEXT.md to the current v2.6.1 repo state.
2. Remove deleted or stale .claude settings references.
3. Reflect the accepted baseline model and current cleanup priorities.
4. Backfill the shared decision log with concise entries that belong at the cross-agent level.
5. If you add a DECISIONS guide, keep it short and include only practical capture rules plus a note that wrap-session should later point to it.

Show the diff before concluding.
```

---

### C-4 — Align contributor schema and authoring docs

**Why:** The repo shipped the newer frontmatter model, but the contributor docs still teach the old one.  
**Effort:** 30-45 min  
**Risk:** Low  
**Depends on:** Nothing

**Files touched:**

- `docs/reference/frontmatter-schema.yaml`
- `docs/guides/authoring-pm-skills.md`
- `docs/agent-skill-anatomy.md`
- `docs/templates/skill-template/SKILL.md`

**What to change:**

1. stop teaching `metadata.version` as canonical
2. document root `version`
3. document `classification` and how it differs from `phase`
4. update examples so `foundation-persona` style skills are represented correctly
5. keep the guidance repo-native and specific to the current shipped model

**Definition of done:**

- no tracked contributor doc teaches `metadata.version` as canonical
- `classification` guidance exists in all primary authoring references
- the skill template matches the shipped schema

**Prompt to give Codex:**

```text
Execute C-4 from _NOTES/baseline-standards/plan_codex/execution_codex-gpt-5.4.md.

Align the contributor and schema docs to the current shipped skill model:
- docs/reference/frontmatter-schema.yaml
- docs/guides/authoring-pm-skills.md
- docs/agent-skill-anatomy.md
- docs/templates/skill-template/SKILL.md

Requirements:
1. Root version is canonical.
2. classification is documented alongside phase.
3. phase and classification are clearly explained as mutually exclusive where appropriate.
4. Examples should reflect the current repo, including the foundation persona skill.

Show the diffs before concluding.
```

---

### C-5 — Align public/reference docs and remove speculative surfaces

**Why:** Several tracked docs still advertise the wrong inventory or helper surfaces.  
**Effort:** 30-45 min  
**Risk:** Low  
**Depends on:** `C-4` preferred

**Files touched:**

- `README.md`
- `QUICKSTART.md`
- `docs/reference/project-structure.md`
- `docs/reference/ecosystem.md`
- `docs/guides/mcp-integration.md`
- `docs/guides/using-skills.md`
- `_bundles/triple-diamond.md`

**What to change:**

1. fix repo-local counts and inventory language
2. remove or rewrite references to `/common`, `/update-doc`, and `/link-docs`
3. stop hard-coding stale pm-skills-mcp counts where a narrow, repo-local phrasing is safer
4. make the docs describe the shipped repo surface, not older planning debates

**Definition of done:**

- no active public/reference doc advertises non-existent helper surfaces
- no active public/reference doc still says `24 skills` for this repo
- cross-repo references use narrower language when exact external counts are not needed

**Prompt to give Codex:**

```text
Execute C-5 from _NOTES/baseline-standards/plan_codex/execution_codex-gpt-5.4.md.

Clean the public/reference doc layer:
- README.md
- QUICKSTART.md
- docs/reference/project-structure.md
- docs/reference/ecosystem.md
- docs/guides/mcp-integration.md
- docs/guides/using-skills.md
- _bundles/triple-diamond.md

Requirements:
1. Reflect the current pm-skills repo surface.
2. Remove or rewrite /common, /update-doc, and /link-docs references.
3. Do not add new helper surfaces.
4. Use narrower wording for pm-skills-mcp where hard-coded external counts are not necessary.

Show the diffs before concluding.
```

---

### C-6 — Clean remaining active release/sample docs and hand back to coordinator

**Why:** A small set of active tracked docs still carries stale release truth or `_NOTES` references even after the broader structure is fixed.  
**Effort:** 20-30 min  
**Risk:** Low  
**Depends on:** `C-2`, `C-5`

**Files touched:**

- `.claude-plugin/plugin.json`
- `docs/releases/Release_v2.6.1.md`
- `library/skill-output-samples/SAMPLE_CREATION.md`
- `docs/internal/efforts/M-10-skill-sample-outputs-library.md`

**What to change:**

1. align `.claude-plugin/plugin.json` with the intended current release truth
2. update `docs/releases/Release_v2.6.1.md` so its status matches the tagged repo state
3. replace `_NOTES/**` release-manifest references in `SAMPLE_CREATION.md` with the new tracked internal release-governance home
4. make sure the active `M-10` brief points only at tracked canonical artifacts
5. update the shared coordinator doc with what this unblocks for Claude

**Definition of done:**

- active release/sample docs no longer point to `_NOTES/**` as canonical
- plugin manifest and `v2.6.1` release-note status are aligned
- the shared coordinator clearly states whether Claude should proceed with `A-8`, `A-9`, and `A-11`

**Prompt to give Codex:**

```text
Execute C-6 from _NOTES/baseline-standards/plan_codex/execution_codex-gpt-5.4.md.

Clean the remaining active release/sample docs:
- .claude-plugin/plugin.json
- docs/releases/Release_v2.6.1.md
- library/skill-output-samples/SAMPLE_CREATION.md
- docs/internal/efforts/M-10-skill-sample-outputs-library.md

Requirements:
1. Align the docs to the tracked release-governance home created earlier.
2. Do not point to _NOTES/** as canonical.
3. Make the release-note status and plugin manifest version consistent with the repo's intended release truth.
4. Update the shared coordinator with what this now unblocks.

Show the diffs before concluding.
```

---

## Session Resume Prompts

**To start Codex execution:**

```text
Resume Codex execution for the pm-skills baseline cleanup.
Reference:
- _NOTES/baseline-standards/plan_codex/execution_codex-gpt-5.4.md
- _NOTES/baseline-standards/execution_shared-claude-codex.md

Start with C-1.
```

**To resume after the first structural batch:**

```text
Resume Codex execution for the pm-skills baseline cleanup.
Reference:
- _NOTES/baseline-standards/plan_codex/execution_codex-gpt-5.4.md
- _NOTES/baseline-standards/execution_shared-claude-codex.md

C-1 and C-2 are done. Start with C-3.
```

---

## Notes and Blockers

| Date | Item | Note |
| --- | --- | --- |
| 2026-03-15 | Plan creation | This execution plan reflects the final Codex baseline decisions, not the earlier open-question worksheet. |
| 2026-03-15 | C-1 complete | `docs/internal/planning-persistence-policy.md` and `docs/internal/planning-artifact-tier-map.md` now point to `docs/internal/efforts/**` and `docs/internal/release-plans/**` as the canonical tracked homes. |
| 2026-03-16 | C-2 complete | `docs/internal/release-plans/**` now exists as the canonical tracked release-governance home; backlog and effort entry-point docs were rewritten to point at `docs/internal/efforts/**`, GitHub issues, and the new release tree. |
| 2026-03-17 | C-3 complete | `AGENTS/codex/CONTEXT.md` and `AGENTS/DECISIONS.md` now reflect the `v2.6.1` repo baseline, the accepted baseline model, and Claude `A-11` completion. |
| 2026-03-15 | Claude dependency | `A-5` remains deferred until a later wrap-session effort. |
| 2026-03-17 | Claude dependency | `A-8` and `A-9` are now unblocked because `C-3` refreshed the Codex continuity layer to the current baseline. |
| 2026-03-16 | Claude dependency | `A-11` is now unblocked because `C-2` established the tracked `docs/internal/release-plans/**` structure and updated the effort/backlog entry points. |
| 2026-03-17 | Claude A-11 complete | Claude landed effort tracking: `docs/internal/efforts/README.md`, `F-02-persona-skill.md`, `F-03-persona-library-tier0.md` created; `M-10-skill-sample-outputs-library.md` rewritten to standardized template. GitHub issues #108/#109/#110, label `effort`, milestone `v2.7.0`. C-6 should re-read M-10 brief before editing — format has changed. |
