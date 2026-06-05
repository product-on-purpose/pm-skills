# Spec: Generated resource index at a stable `docs/` path

Status: spec approved (user, 2026-06-05); writing implementation plan
Date: 2026-06-05
Owner: claude (implementation), human (review)

## Problem

After the Pattern S Astro convergence (PR #154, `12f23f8`), the entire public docs
tree moved from `docs/` into `site/src/content/docs/`, and the generated pages
(skills, samples, workflows, showcase) became gitignored-and-rebuilt. Two gaps
remain:

1. There is no single, GitHub-browsable entry point that catalogs the project's
   resources and ties each one to both its published page and its source-of-truth
   file in the repo. Readers who browse the repo on GitHub (not the published site)
   have no map.
2. The natural fix - a hand-written index - would itself rot: it becomes a third
   place that must be manually kept in sync with the site and the repo.

A prior "keep a copy in both places" design was considered during the site
relocation effort and deferred; the version that shipped (Pattern S) collapsed
everything into one source tree. This spec does not reintroduce duplicate content.
It adds a generated, gate-checked index whose only job is navigation.

## Key reframe: samples already have a single source

Samples are not duplicated and cannot drift today. Their canonical source is
`library/skill-output-samples/` (192 tracked files). That directory is both:

- browsable on GitHub at a stable repo path, and
- the input to `scripts/gen-site.mjs`, which emits the site's sample pages
  (gitignored, rebuilt every build).

Because the site copy is generated and never hand-edited, it is structurally
incapable of drifting from the repo copy. So the requested property ("the two
mirror each other and one does not go stale") is already satisfied for samples.
The missing piece is discoverability, which this index provides.

## Decision summary

| Decision | Choice |
|---|---|
| Sync model | Generated + CI gate (chosen over hand-authored and hybrid) |
| Granularity | Grouped: doc pages per-page; skills per-skill; samples grouped by skill with per-file rows |
| Index location | `docs/RESOURCES.md` (generated catalog) |
| Folder front door | `docs/README.md` (hand-authored intro; renders on folder browse; points to `RESOURCES.md`) |
| JTBD link fix | `https://strategyn.com/jobs-to-be-done/` |
| Foundation Sprint link fix | `https://thefoundationsprint.com/` |
| Release classification | Untagged maintenance change; CHANGELOG `[Unreleased]`; no version tag |

## Design rules (consequences of "generated + CI gate")

1. The catalog (`docs/RESOURCES.md`) is generated, never hand-edited. It carries a
   `<!-- GENERATED -->` banner; changes happen in the generator, not the file. The
   separate `docs/README.md` front door is hand-authored and is the only file in
   this effort a human edits (see "Two files" below).
2. "Repo source" links always target the tracked source of truth, never the
   gitignored site mirror:
   - hand-authored docs -> `site/src/content/docs/<...>.md`
   - skills -> `skills/<skill>/SKILL.md`
   - samples -> `library/skill-output-samples/<skill>/sample_*.md`
   - workflows -> `_workflows/<name>.md`
   A link into `site/src/content/docs/samples|skills|workflows|showcase/` would
   404 on GitHub because those paths are gitignored.
3. The generator reuses `gen-site.mjs`'s enumeration (`SKILLS_DIR`, `SAMPLES_DIR`,
   `WORKFLOWS_SRC`, `DOCS`) so the index and the site walk the same source of truth
   and cannot disagree about what exists. Skill-to-phase-group mapping is derived
   the same way `gen-site.mjs` derives it (from each SKILL.md `phase` / `classification`
   frontmatter field).
4. The index file is committed (unlike `gen-site.mjs` output) because GitHub cannot
   render gitignored files; the CI gate substitutes for the gitignore that would
   otherwise prevent drift.

## Two files: front door vs catalog

The `docs/` folder gets two distinct files with separate jobs, so the generated
catalog never has to double as a human-written folder intro:

- `docs/README.md` (hand-authored, low-churn): the front door. GitHub renders it
  when anyone browses into the `docs/` folder. It briefly explains what `docs/`
  holds (`RESOURCES.md` = the resource catalog, `internal/` = governance and
  working docs, `templates/`) and links prominently to `RESOURCES.md`. It does not
  enumerate resources, so it does not rot the way a hand-written catalog would; the
  only thing it must keep correct is a single link to `RESOURCES.md`.
- `docs/RESOURCES.md` (generated, gate-checked): the catalog. Everything in the
  rest of this spec refers to this file.

The root `README.md` pointer links directly to `docs/RESOURCES.md` (the valuable
destination); the `docs/README.md` front door also links to it.

## Deliverables

| Artifact | Path | Tracked |
|---|---|---|
| Generated catalog | `docs/RESOURCES.md` | yes (committed) |
| Folder front door | `docs/README.md` (hand-authored) | yes |
| Generator | `scripts/gen-resource-index.mjs` | yes |
| CI checker | `node scripts/gen-resource-index.mjs --check` (run directly on both CI OS legs; a cross-platform Node script needs no `.sh` / `.ps1` wrapper, matching `gen-site.mjs`) | n/a |
| Unit test | `scripts/gen-resource-index.test.mjs` | yes |
| Root README pointer | one line in `README.md` -> `docs/RESOURCES.md` | edit |
| README link fixes | lines 406 (jtbd) and 407 (foundation sprint) | edit |

## The index file: structure

A generated Markdown file. "Thoughtful" structure is encoded in the generator:
lifecycle-ordered sections, per-item descriptions pulled from frontmatter, and a
short intro explaining the site-to-repo mapping. All repo links are relative
(`../`) so they resolve when browsing `docs/RESOURCES.md` on GitHub.

Route shapes (confirmed against `scripts/route-manifest.txt`):

- hand-authored docs: `/<category>/<page>/` (e.g. `/guides/prompt-gallery/`)
- skills: `/skills/<group>/<skill>/` plus group index `/skills/<group>/` and
  catalog `/skills/`
- samples: `/samples/<skill>/<sample-stem>/` plus overview `/samples/`
- workflows: `/workflows/<name>/`
- showcase: `/showcase/<thread>/` plus overview `/showcase/`

Categories covered: Getting Started, Concepts, Guides, Reference, Contributing
(per page); Skills (65, grouped by phase/family, per-skill row); Samples (grouped
by skill, per-file rows); Workflows (per file); Showcase (per thread).

Showcase rows link to the live thread page and note they are generated from the
sample library (no single source file); the repo link points at
`library/skill-output-samples/`.

Illustrative shape (real paths):

```markdown
# PM Skills - Resource Index
<!-- GENERATED by scripts/gen-resource-index.mjs - do not edit by hand. -->
<!-- Each row links the published page and its source-of-truth file in this repo. -->

## Guides
| Resource | Description | Live page | Repo source |
|---|---|---|---|
| Prompt Gallery | Real prompts across three styles | [site](https://product-on-purpose.github.io/pm-skills/guides/prompt-gallery/) | [.md](../site/src/content/docs/guides/prompt-gallery.md) |

## Skills - Deliver
| Skill | Description | Live page | SKILL.md |
|---|---|---|---|
| deliver-prd | Comprehensive PRD ... | [site](https://product-on-purpose.github.io/pm-skills/skills/deliver/deliver-prd/) | [SKILL.md](../skills/deliver-prd/SKILL.md) |

## Samples - deliver-prd  (source: [library/skill-output-samples/deliver-prd/](../library/skill-output-samples/deliver-prd/))
| Scenario | Live page | Repo .md |
|---|---|---|
| storevine / campaigns | [site](https://product-on-purpose.github.io/pm-skills/samples/deliver-prd/sample_deliver-prd_storevine_campaigns/) | [.md](../library/skill-output-samples/deliver-prd/sample_deliver-prd_storevine_campaigns.md) |
```

## The generator

`scripts/gen-resource-index.mjs`, dependency-free Node, consistent with existing
repo scripts. Responsibilities:

- Enumerate every resource using the same walk as `gen-site.mjs` (refactor the
  shared enumeration into a small importable module if that keeps `gen-site.mjs`
  clean; otherwise mirror its logic with a test that asserts parity).
- For each resource emit two links: the live route and the tracked repo source.
- Pull descriptions from frontmatter where available.
- Write `docs/RESOURCES.md` (default) or compare against it (`--check`).

## CI gate: the anti-staleness guarantee

`gen-resource-index.mjs --check` runs in `.github/workflows/validation.yml`
alongside the existing `node scripts/gen-site.mjs` step. It fails the build on any
of three conditions:

1. Stale or incomplete: regenerated output does not byte-match the committed
   `docs/RESOURCES.md` (catches any added or removed resource that was not re-indexed).
   This is the core "cannot go stale" mechanism.
2. Dead live link: any live route in the index is absent from
   `scripts/route-manifest.txt`.
3. Dead repo link: any repo source path does not exist on disk.

The gate is fully offline and deterministic (no network, no live-site dependency),
reusing `route-manifest.txt` and the `gen-site.mjs` walk - the same baselines the
site itself is validated against. CI invokes `node scripts/gen-resource-index.mjs
--check` directly on both OS legs (Node is cross-platform), which also exercises
CRLF-vs-LF handling for free.

## README link fixes (from the URL sweep)

The full README sweep (2026-06-05) found all repo-relative paths, all 34
published-site routes, and all 30 in-page anchors resolving. Two external links
were broken and are fixed here:

- `README.md:407` `https://www.jakeknapp.com/foundation-sprint` (404) ->
  `https://thefoundationsprint.com/`
- `README.md:406` `https://jtbd.info/` (invalid TLS certificate) ->
  `https://strategyn.com/jobs-to-be-done/`

## Out of scope (YAGNI)

- No new site page for the index; the site already has navigation. This artifact's
  job is GitHub-browsability.
- No per-file rows for the hand-authored doc categories.
- No change to how samples (or any generated content) are produced; the
  single-source model already works.

## Testing

- `scripts/gen-resource-index.test.mjs`: given a small fixture tree, assert correct
  rows and that repo links target tracked sources, not the gitignored mirror.
- Idempotence: running the generator twice produces no diff (`--check` passes
  immediately after a generate).
- Staleness detection: `--check` exits non-zero when the committed
  `docs/RESOURCES.md` differs from a fresh regen (line endings normalized first).

## Release classification

Untagged maintenance change. No skill behavior change, no new/changed skills
(catalog stays 65), no plugin-manifest change, no published-URL change. Per the
repo's locked SemVer rule (versions track compatibility, not significance) and the
Pattern S precedent recorded in CHANGELOG `[Unreleased]`, this class of change is
not given its own version tag. It lands on `main` via squash-merge with a CHANGELOG
`[Unreleased]` entry (Added: `docs/RESOURCES.md`, `docs/README.md`,
`scripts/gen-resource-index.mjs`, the CI gate; Fixed: the two README links) and
deploys. It is banked into the next tagged release's notes when the consumable
surface next changes. Cutting a patch tag to bank accumulated maintenance is a
legitimate alternative but is not required by this change.

## Open questions

None blocking. File-naming (two files), spec-location, link choices, and release
classification are all settled.
