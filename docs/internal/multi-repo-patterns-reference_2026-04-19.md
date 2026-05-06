---
title: Multi-Repo Publication Patterns. Industry Reference for Skill Extraction
description: Reference analysis of how adjacent systems solve the "one content source, multiple published surfaces" problem. Covers Nx (monorepo with publishable libraries), Turborepo + changesets, git subtree split (Go stdlib, Apache libraries), Hugo/MkDocs content taxonomy with build-time filtering, and Lerna-style independent versioning. Distills convergent best-practice principles and maps them to the pm-skills extraction question. Companion to multi-repo-extraction-design_2026-04-19.md.
date: 2026-04-19
status: reference
audience: pm-skills maintainers, contributors
---

# Multi-Repo Publication Patterns. Industry Reference for Skill Extraction

**Date**: 2026-04-19
**Author**: Claude Opus 4.7 (research synthesis)
**Status**: Reference (companion to `multi-repo-extraction-design_2026-04-19.md`)

## Table of Contents

1. [Purpose and scope](#1-purpose-and-scope)
2. [The five reference patterns](#2-the-five-reference-patterns)
   - 2.1 [Nx. monorepo with publishable libraries](#21-nx-monorepo-with-publishable-libraries)
   - 2.2 [Turborepo + changesets](#22-turborepo--changesets)
   - 2.3 [git subtree split (Go stdlib, Apache libraries)](#23-git-subtree-split-go-stdlib-apache-libraries)
   - 2.4 [Hugo/MkDocs content taxonomy with build-time filtering](#24-hugomkdocs-content-taxonomy-with-build-time-filtering)
   - 2.5 [Lerna / independent versioning in a monorepo](#25-lerna--independent-versioning-in-a-monorepo)
3. [Side-by-side comparison](#3-side-by-side-comparison)
4. [Convergent principles](#4-convergent-principles)
5. [Divergent choices and when each is right](#5-divergent-choices-and-when-each-is-right)
6. [Best-practice synthesis](#6-best-practice-synthesis)
7. [How pm-skills maps to each pattern](#7-how-pm-skills-maps-to-each-pattern)
8. [How the design doc aligns with best practice](#8-how-the-design-doc-aligns-with-best-practice)
9. [When to reach outside these five](#9-when-to-reach-outside-these-five)
10. [Reading list](#10-reading-list)
11. [Appendix. Scale and audience considerations](#11-appendix-scale-and-audience-considerations)

---

## 1. Purpose and scope

### 1.1 Why this doc exists

The companion design doc (`multi-repo-extraction-design_2026-04-19.md`) presents 15 options for splitting pm-skills into a pm-skills + business-skills pair. Before committing, the same question applies as with the efforts-organization pair: **has this problem already been solved elsewhere?** The answer is yes. Several adjacent ecosystems have matured patterns for publishing multiple surfaces from a single source. This doc distills their experience.

### 1.2 What "multi-repo publication" means here

The problem shape: **a single source of content produces multiple published artifacts, each with its own audience, brand, or distribution channel**. Variants of this problem appear in:

- **JavaScript packages**: one monorepo produces many npm packages (Nx, Turborepo, Lerna).
- **Language stdlib**: one large codebase produces standalone libraries (Go's golang.org/x/... pattern).
- **Docs**: one content directory renders multiple sites with different filters (Hugo, MkDocs).
- **Systems packages**: one source tarball produces multiple Linux distro packages (Debian source packages).
- **Developer tools**: one CLI produces role-specific subcommands (kubectl's plugin model).

pm-skills's situation maps most closely to JavaScript monorepos and docs-content-taxonomy. Less closely to systems packaging and language stdlib. The five patterns chosen here cover the closest-fit subset.

### 1.3 What this doc is not

- Not a prescription. pm-skills does not have to adopt any specific pattern wholesale.
- Not exhaustive. Other patterns exist (Rush, Bazel, pants, Go workspace). The five below are the closest-fit for a small-team OSS skill library.
- Not a decision doc. Decisions belong in `multi-repo-extraction-design_2026-04-19.md`.

---

## 2. The five reference patterns

### 2.1 Nx. monorepo with publishable libraries

**Canonical doc**: [nx.dev](https://nx.dev), especially the "publishable libraries" and "buildable libraries" docs.

**What it is**: Nx is a build system and monorepo manager originally built around Angular, now language-agnostic. It popularized the pattern of "one repo, many publishable artifacts" for JS/TS.

**Source layout**:
```
my-monorepo/
  libs/
    shared-ui/         # publishable to npm
    shared-utils/      # publishable to npm
    internal-helpers/  # NOT publishable, only used internally
  apps/
    web/
    mobile/
```

**Publication model**: each library's `project.json` declares whether it is publishable. A `nx release` command publishes tagged libraries to npm. One git repo; many published artifacts.

**Dependency management**: internal libraries reference each other by path alias. On publish, the path alias resolves to the published package name. No need for multiple repos.

**Versioning**: per-library independent semver OR repo-wide synchronized versioning. Configurable.

**Contribution flow**: all contributors work in the monorepo; publishing is an artifact of release tooling, not a place contributors go.

**When it fits**: medium-to-large teams publishing multiple related packages with shared code; JS/TS ecosystem.

**Key lessons for pm-skills**:
- The "one repo, many published artifacts" model is the cleanest way to handle skill-subset publication. pm-skills could expose multiple "plugins" from one source.
- Publishing as a derived artifact (not a parallel project) means zero sync cost.
- Nx's approach to publishable-vs-internal is exactly analogous to the proposed `audience:` tag: some skills are "publishable to business-skills", others are not.

### 2.2 Turborepo + changesets

**Canonical doc**: [turbo.build](https://turbo.build/repo), [github.com/changesets/changesets](https://github.com/changesets/changesets).

**What it is**: Vercel's monorepo tool (Turborepo) paired with a semi-independent release-management tool (changesets). Popular in the React/Next.js ecosystem.

**Source layout**: similar to Nx:
```
my-monorepo/
  packages/
    ui/
    icons/
    config/
  apps/
    docs/
    web/
```

**Publication model**: changesets tracks version-bumping intents as markdown files in a `.changeset/` directory. On release, changesets consumes all pending intents, bumps versions, publishes to npm. Each package is a separately-published artifact.

**Dependency management**: workspaces (yarn/pnpm/npm workspaces) handle internal linking. Packages reference each other by package name; at install time, resolves to local copies.

**Versioning**: independent semver per package. No forced repo-wide version. This is a deliberate design choice contrasting with Lerna's traditional sync-all model.

**Contribution flow**: all PRs include a `.changeset/` markdown file describing the version impact. Bot comments on PRs without changesets. Human-friendly; low ceremony.

**When it fits**: small-to-medium teams publishing multiple independently-versioned packages with a light release process.

**Key lessons for pm-skills**:
- Changesets' PR-attached release-intent file is a pattern worth considering for skill-level versioning (each PR that changes a skill adds a changeset describing whether it's a patch, minor, or major bump).
- Independent versioning is the right default when packages have distinct lifecycles. pm-skills already treats skill version and repo version independently (per `skill-versioning.md`).
- Light tooling beats heavy tooling at this scale.

### 2.3 git subtree split (Go stdlib, Apache libraries)

**Canonical doc**: [git-subtree(1)](https://www.kernel.org/pub/software/scm/git/docs/howto/using-merge-subtree.html), [Go's golang.org/x/ repos](https://pkg.go.dev/golang.org/x).

**What it is**: a technique for splitting a subdirectory of a repo into its own repo, preserving history. Used by Go (many `golang.org/x/` packages started as subdirectories of the main Go repo) and Apache (libraries occasionally spun off from larger projects).

**Source layout**: pre-split, one repo with nested directories. Post-split, two independent repos; the original either keeps or removes the split subdirectory.

**Publication model**: the split creates a separate git history. After split, each repo is independent. No ongoing sync mechanism in the base pattern (though `git subtree push` can push to the subrepo over time).

**Dependency management**: post-split, the original repo may still reference the split as an external dependency. In Go's case, the main Go repo depends on `golang.org/x/...` as external modules.

**Versioning**: post-split, each repo has its own tags and release cadence.

**Contribution flow**: contributors choose which repo based on what their change affects. Initial churn while the community adapts.

**When it fits**: one-time extraction of a well-bounded subset that will evolve independently. Not suited for ongoing sync.

**Key lessons for pm-skills**:
- Useful if the goal is "spin off and let it live on its own", not "keep publishing from a single source".
- Preserves git history for the split portion, which matters for blame and archaeology but not for end-user consumption.
- After a few months, the two repos diverge silently. Manual sync is the only remedy, and it's painful.
- Recommend against if continuous publication is desired. Recommend for one-time spin-outs.

### 2.4 Hugo/MkDocs content taxonomy with build-time filtering

**Canonical doc**: [gohugo.io/content-management/taxonomies](https://gohugo.io/content-management/taxonomies), [MkDocs Material's Tags plugin](https://squidfunk.github.io/mkdocs-material/plugins/tags/).

**What it is**: static-site-generator pattern where content files are tagged with metadata, and build-time filters produce different rendered sites from the same source. Common in docs-as-code and personal wiki setups.

**Source layout**:
```
content/
  post-1.md  # tags: [go, web, tutorial]
  post-2.md  # tags: [rust, systems]
  post-3.md  # tags: [go, tutorial]
```

**Publication model**: multiple builds from the same source. A build config specifies which tags to include. Each build produces a separate site.

**Taxonomy**: tags, categories, custom taxonomies. Closed enums or free-form, configurable.

**Versioning**: sites are typically published from `main` rather than tagged releases.

**Contribution flow**: all contributors work on the single content directory. Tags determine where a piece appears.

**When it fits**: content publishing with multiple audiences; single source of truth; build tooling does the filtering.

**Key lessons for pm-skills**:
- Skills-as-content maps directly: tag each skill with `audience:`, filter at build time, produce two plugin manifests from one source.
- No second repo needed to get audience separation. This is exactly what Option A4 (multi-plugin marketplace) does.
- If the second audience justifies a separate brand/URL, extraction to a sibling repo becomes additive on top of the taxonomy foundation.

### 2.5 Lerna / independent versioning in a monorepo

**Canonical doc**: [lerna.js.org](https://lerna.js.org).

**What it is**: the original JS monorepo tool, now community-maintained under Nx. Pioneered the "multiple independently-versioned packages in one repo" pattern before Turborepo existed.

**Source layout**: classic monorepo:
```
my-monorepo/
  packages/
    lib-a/
    lib-b/
  lerna.json
```

**Publication model**: `lerna publish` walks packages, determines version bumps from commit history or changesets, publishes each package independently.

**Versioning**: two modes:
- **Fixed mode**: all packages share one version. Any change in any package bumps all.
- **Independent mode**: each package has its own version. Unchanged packages stay at their existing version.

Independent mode is now the default and the better choice for most cases.

**Contribution flow**: similar to Nx and Turborepo. monorepo PRs; tooling handles publication.

**When it fits**: mature multi-package projects with independent release cadences. Classic JS stack.

**Key lessons for pm-skills**:
- The independent-versioning mode is what pm-skills already practices for skills (each skill has its own version; repo version is distinct).
- The tooling ecosystem (lerna, changesets, Nx) has converged on this pattern because forcing sync-all versioning doesn't reflect how multi-package projects actually evolve.
- pm-skills's `skill-versioning.md` governance aligns with this.

---

## 3. Side-by-side comparison

| Dimension | Nx | Turborepo + changesets | git subtree split | Hugo/MkDocs taxonomy | Lerna |
|-----------|-----|------------------------|-------------------|----------------------|-------|
| **Source model** | Monorepo | Monorepo | Split into separate repos | Monorepo | Monorepo |
| **Output model** | N publishable packages | N publishable packages | Fully independent repos | N filtered sites | N publishable packages |
| **Sync mechanism** | Tooling derives | Tooling derives | None (one-time) | Tooling derives | Tooling derives |
| **Versioning** | Per-pkg or repo-wide | Per-pkg (via changesets) | Per-repo (independent) | Per-site (usually undated) | Per-pkg or fixed |
| **Dependency handling** | Path aliases | Workspaces | Standard external deps | N/A | Workspaces |
| **Contribution flow** | Monorepo | Monorepo | Per-repo after split | Monorepo | Monorepo |
| **Drift risk** | Zero (derived) | Zero (derived) | High | Zero (derived) | Zero (derived) |
| **Best for** | Medium-large JS/TS | Small-medium JS/TS | One-time extraction | Content publishing | Legacy JS/TS |
| **Ongoing cost** | Medium (build system) | Low (changesets) | High (manual sync) | Low (build config) | Medium-low |
| **Scale proven at** | 100k+ files, Fortune 500 | Large React/Next projects | Go stdlib, Apache | Large docs sites | Many mature JS libs |

---

## 4. Convergent principles

These recur across all five patterns. They are the closest thing to universal best practice for multi-repo publication.

### 4.1 Single source of truth. derivation over duplication

- Nx: monorepo is source; packages are derived publications.
- Turborepo: same.
- Hugo: content directory is source; sites are derived.
- Lerna: monorepo is source; npm packages are derived.
- Only **git subtree split** breaks this convergence, and it is widely known to cause drift pain.

**For pm-skills**: keep pm-skills as canonical source; publish sibling repo as a derived artifact. Option A2 (scripted extraction) matches this principle directly.

### 4.2 Tagging / taxonomy for audience separation

- Nx: `project.json` declares publishability.
- Turborepo: `package.json` + changesets declare scope.
- Hugo: frontmatter tags.
- Lerna: package boundaries in directory structure.

All five use machine-readable metadata on each unit (package, doc, skill) to control what gets published where.

**For pm-skills**: the proposed `audience:` frontmatter field is the standard approach. Option B1.

### 4.3 Automated publication tooling

- Nx: `nx release`.
- Turborepo: `changeset publish`.
- Hugo: `hugo --config` variants.
- Lerna: `lerna publish`.

Nobody publishes by hand at scale. Tooling reads the taxonomy, applies the filter, produces the artifact.

**For pm-skills**: `scripts/extract-subset.sh` + GitHub Action (Options C1/C4). Matches directly.

### 4.4 Versioning is per-unit, not per-repo

- Nx: library-level semver.
- Turborepo + changesets: package-level semver.
- Lerna: package-level semver (independent mode).
- Hugo: less relevant (sites, not packages).
- Only **subtree split** escapes this because the split repo has its own identity.

**For pm-skills**: already practiced (per skill-versioning.md). No change needed.

### 4.5 Upstream-only contribution for derived artifacts

- Nx, Turborepo, Lerna: users contribute to the monorepo, not to published packages on npm.
- Hugo: contributors edit content files, not generated sites.
- Subtree split: diverges after split, contribution flow unclear.

When the output is a derived artifact, contributions go to the source.

**For pm-skills**: Option D1 (upstream-only). Matches 4 of 5 patterns.

### 4.6 Dependency management via package names, not file paths

- Nx: path aliases resolve to package names on publish.
- Turborepo: workspace protocol.
- Lerna: workspace linking.

Published packages reference each other as external packages, not by internal file paths.

**For pm-skills**: if a skill in the sibling depends on a reference doc or contract also in the sibling, internal references should use relative paths that survive extraction. If a dependency is pm-skills-specific, the skill should not be cross-listed.

---

## 5. Divergent choices and when each is right

### 5.1 Heavy tooling vs. light tooling

- **Heavy (Nx)**: right at medium-large scale where the build graph is complex and caching matters.
- **Light (changesets, Hugo frontmatter filtering)**: right at small-medium scale; no build graph complexity.

**pm-skills today**: small scale. light tooling is the right choice. Bundle 1 in the design doc is light-tooling flavor.

### 5.2 Per-package vs. per-repo identity

- **Per-package (Nx, Turborepo, Lerna)**: output is N packages in one registry (npm), distinguished by name.
- **Per-repo (subtree split)**: output is distinct GitHub URLs, each with its own community.

**pm-skills**: the business-skills use case wants distinct URL and brand, which pushes toward per-repo. But per-repo without drift requires the derivation pattern (A2), not actual separation (A1).

### 5.3 Fixed vs. independent versioning

- **Fixed (old Lerna mode, some monorepos)**: all packages share one version. Right when packages always ship together.
- **Independent (everywhere else)**: each package evolves on its own cadence. Right when packages have distinct lifecycles.

**pm-skills**: independent already practiced; no change.

### 5.4 Build-time filter vs. extract-then-publish

- **Build-time filter (Hugo, marketplace manifest)**: single source produces many outputs at each build. No separate artifact repo.
- **Extract-then-publish (Nx to npm, scripted extraction to sibling repo)**: single source produces derived artifact that has its own location.

**pm-skills**: Bundle 2 (marketplace multi-plugin) is build-time filter. Bundle 1 (sibling repo via extraction) is extract-then-publish. The design doc recommends starting with the former and potentially adding the latter.

---

## 6. Best-practice synthesis

Combining the six convergent principles (§4) with scale considerations (§5), the defensible best practice for a small-team OSS skill library with multi-audience content is approximately:

1. **Monorepo as source of truth**. Never split into independent repos with manual sync; drift always wins.
2. **Frontmatter taxonomy** (audience, tags, classification) on each unit.
3. **Automated publication** driven by taxonomy filters.
4. **Per-unit independent versioning** for units that ship independently.
5. **Upstream-only contributions** for derived artifacts.
6. **Build-time filter for distribution channels** (multiple plugins or sites from same source).
7. **Separate repo only when brand/URL separation is strategically justified**, and only via derivation (not subtree split).

This composite is essentially **"Nx-style monorepo with Hugo-style content taxonomy and optional downstream mirroring"**. It matches Bundle 1 of the design doc (with Bundle 4's on-ramp sequencing).

---

## 7. How pm-skills maps to each pattern

| Pattern | Applicability | Fit quality |
|---------|---------------|-------------|
| **Nx** | pm-skills is a small mono-content-repo; skills are analogous to publishable libraries | Strong conceptual fit; JS-ecosystem tooling doesn't apply directly but the mental model does |
| **Turborepo + changesets** | Light tooling for PR-driven versioning; changesets pattern could inform pm-skills release flow | Strong fit for the release-intent capture idea; less relevant for the repo-split question |
| **git subtree split** | Would work for a one-time spin-out of business-skills, but drift is the known failure mode | Poor fit as a long-term strategy; occasionally useful for archive cut-offs |
| **Hugo/MkDocs taxonomy** | Direct analog: skill frontmatter + build filter = multi-plugin marketplace | Perfect fit for Bundle 2 (on-ramp); Option A4 is essentially this |
| **Lerna independent versioning** | pm-skills already practices this at the skill level | Pattern already adopted; no change needed |

**Net**: pm-skills has already absorbed several of these patterns (Lerna-style versioning, Hugo-style frontmatter). The open gap is taxonomy-driven publication. Bundle 1 closes that gap.

---

## 8. How the design doc aligns with best practice

The design doc's Bundle 1 (with Bundle 4 on-ramp) was written before this reference. It maps cleanly to the convergent best practice:

| Best-practice principle | Design doc option | Matching pattern |
|-------------------------|-------------------|------------------|
| Monorepo source of truth | A2 (scripted extraction) | Nx, Turborepo, Hugo, Lerna |
| Frontmatter taxonomy | B1 (audience enum) | Nx project.json, Hugo tags |
| Automated publication | C1 + C4 (release-triggered, parametric) | `nx release`, `changeset publish` |
| Per-unit versioning | Already in place | Lerna independent mode |
| Upstream-only contributions | D1 | All monorepo patterns |
| Build-time filter (on-ramp) | A4 + B1 (multi-plugin marketplace) | Hugo, MkDocs Material tags |
| Separate repo via derivation | A2 + C1 (NOT A1 subtree split) | Nx publish to npm, analogous |

**Deviations from pure best practice**: none of substance. The design doc explicitly recommends AGAINST Option A1 (subtree split) for the same reasons §5.2 cites. It recommends the multi-plugin marketplace on-ramp (A4) as a signal-gathering phase before committing to a sibling repo, which matches the "start with build-time filter, escalate to separate artifact only if warranted" industry pattern.

**Confidence**: high that Bundle 1 is within the zone of defensible best practice for multi-audience content publication at pm-skills's scale.

---

## 9. When to reach outside these five

The five patterns cover most pm-skills-adjacent cases. Other options to know about if a more unusual need surfaces:

- **Bazel** (Google's build system; used for language-agnostic monorepos at massive scale). Overkill for pm-skills.
- **pants** (similar to Bazel, more accessible). Still overkill.
- **Rush** (Microsoft's JS monorepo tool). A Lerna alternative; similar outcomes.
- **Go workspaces** (`go.work` multi-module layouts). Relevant if pm-skills grew to include Go-based tooling.
- **Debian source packages** (one source tarball produces many binary packages). Conceptually similar; tooling is distro-specific.
- **npm scoped packages** (`@scope/package-name`). Useful for brand-namespacing if pm-skills adopted npm-style distribution.

---

## 10. Reading list

**Primary sources**:
- [Nx docs. Publishable libraries](https://nx.dev/concepts/more-concepts/buildable-and-publishable-libraries)
- [Turborepo docs](https://turbo.build/repo/docs)
- [Changesets README](https://github.com/changesets/changesets#readme)
- [git-subtree(1) man page](https://www.kernel.org/pub/software/scm/git/docs/git-subtree.html)
- [Hugo taxonomies docs](https://gohugo.io/content-management/taxonomies/)
- [MkDocs Material Tags plugin](https://squidfunk.github.io/mkdocs-material/plugins/tags/)
- [Lerna docs. Independent versioning](https://lerna.js.org/docs/features/version-and-publish#independent)

**Secondary** (context and lessons-learned):
- [Brandon Williams (Vercel) on monorepos](https://vercel.com/blog/monorepos-are-a-pandoras-box). perspective on tradeoffs
- [Nx blog. Why monorepos?](https://nx.dev/blog). several posts on scaling
- [Babel's journey to monorepo with Lerna (2016 era)](https://babeljs.io/blog/2016/09/02/babel-6-2). historical context
- [GitHub docs on repository mirroring](https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository). for Option A3 (continuous mirror)

**Meta** (about architecture decisions):
- [Martin Fowler on monoliths vs. microservices](https://martinfowler.com/articles/microservices.html). general axis that applies to repo structure
- [Dan Luu on monorepos](https://danluu.com/monorepo/). detailed analysis of tradeoffs at Google/Facebook scale

---

## 11. Appendix. Scale and audience considerations

### 11.1 Small team, single audience (1-5 people, single product)

- Single repo, no extraction. Even a multi-audience codebase is fine when the maintainer pool is tiny.
- pm-skills was here through v2.10.x.

### 11.2 Small team, multi-audience (pm-skills today)

- Bundle 1 (monorepo with taxonomy-driven publication) is the right scale.
- Start with Bundle 2 (build-time filter via marketplace manifest) as on-ramp.
- Escalate to Bundle 1 only if demand justifies the sibling repo's maintenance cost.

### 11.3 Medium team, multi-audience (10-50 people, 3+ downstream artifacts)

- Full Bundle 1 scale. Parametric extraction across multiple sibling repos.
- Consider dedicated tooling (Nx or Turborepo) if the codebase grows to polyglot or build-graph-complex.

### 11.4 Large organization, many audiences (50+ people)

- Monorepo is usually the right answer, contrary to intuition.
- Google, Facebook, Twitter all converged on monorepo + heavy tooling (Bazel, Piper).
- Subtree split for one-off archive cuts; never for ongoing sync.

### 11.5 pm-skills-specific notes

- pm-skills is firmly in 11.2 scale today.
- The meeting-lifecycle family's existence proves that cross-cutting concerns emerge; taxonomy lets them be handled.
- Resist the instinct to spin off aggressively. drift is the enemy, and tooling-driven extraction is cheap.
- Do not adopt 11.4 patterns. process and infrastructure cost exceeds team capacity.

---

## 12. Related documents

- `docs/internal/multi-repo-extraction-design_2026-04-19.md`. decision-layer proposal
- `docs/internal/efforts/tracking-patterns-reference_2026-04-18.md`. sibling reference doc for effort-tracking patterns
- `docs/internal/efforts/organization-design_2026-04-18.md`. sibling design doc for efforts folder
- `docs/internal/agent-component-usage_2026-04-18.md`. sibling design doc for runtime leverage
- `docs/internal/skill-versioning.md`. existing pm-skills versioning governance (matches independent-versioning pattern)
