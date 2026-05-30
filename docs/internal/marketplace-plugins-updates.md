# Marketplace updates when an individual plugin changes

How a pm-skills release propagates to the two places users install it from, what
you must update by hand, and how plugin / registry versioning is supposed to
work. Written from the **pm-skills maintainer's** point of view. For the
registry-side operations (add/remove a plugin, the CI contract internals,
go-public, rollback) see the companion ops doc in the registry repo:
`product-on-purpose/agent-plugins/docs/internal/registry-maintenance.md`.

> Scope note: pm-skills ships to users as a **Claude Code plugin** (the
> `.claude-plugin/` + `.codex-plugin/` manifests plus `skills/`, `commands/`,
> `agents/`). The Astro documentation site (GitHub Pages) is a separate artifact
> and is **not** part of plugin distribution. Doc-site, build-script, and CI
> changes do not change what either marketplace serves. See
> "When the marketplace does NOT need touching" below.

---

## 1. The dual-home model

pm-skills is installable from two homes, and they pin the repo differently. This
difference is the whole point of the doc, so internalize it first.

| | Self-hosted marketplace | Registry marketplace |
|---|---|---|
| **File** | `pm-skills/.claude-plugin/marketplace.json` | `agent-plugins/.claude-plugin/marketplace.json` |
| **Marketplace name** | `pm-skills-marketplace` | `product-on-purpose` |
| **User adds** | `/plugin marketplace add /path/to/pm-skills` (local) or the repo | `/plugin marketplace add product-on-purpose/agent-plugins` |
| **Installs** | `pm-skills@pm-skills-marketplace` | `pm-skills@product-on-purpose` |
| **Pin** | `source.ref: "main"` (rolling) | `source.sha: "<40-char>"` (immutable) |
| **What a user gets on `/plugin update`** | whatever is on `main` HEAD right now | exactly the pinned commit |
| **Maintenance per release** | none required (auto-tracks main); bump the display `version` for accuracy | **manual**: re-pin `sha`, bump entry `version` |
| **Safety** | a bad commit on `main` reaches users immediately | protected: only a sha that is on a release tag can be pinned |
| **Status** | legacy path, kept working indefinitely | recommended home going forward |

The two homes are intentional (this is the `v2.21.0` additive marketplace
launch): the registry is the new recommended home, and the self-hosted path
keeps working so no existing user has to act.

### Why `ref: main` vs `sha`

- **`ref: "main"` (self-hosted)** is zero-maintenance: every push to `main`
  becomes the served version. The cost is that it serves **unreleased** commits.
  Right now `main` is ahead of the `v2.22.0` tag (it carries doc-site and CI
  commits), so a self-hosted user on `/plugin update` gets those too. That is
  harmless here only because none of them change `skills/` or `commands/`.
- **`sha` (registry)** is release-disciplined: it serves one frozen commit, and
  the registry CI refuses any sha that is not the target of a release tag
  (`validate-registry.mjs` check 5). A broken or mid-flight `main` cannot leak to
  registry users. The cost is that someone must re-pin on each release.

> Recommendation: keep the registry on `sha` pins (it is the safer, auditable
> path). The self-hosted `ref: main` is acceptable for the legacy path because
> plugin content only changes through reviewed, tagged releases in practice; if
> you ever want the self-hosted path to carry the same release discipline, switch
> its `source` to `ref: "v<X.Y.Z>"` and bump it per release like the registry.

---

## 2. The pm-skills version surfaces

A pm-skills release touches **four** in-repo version surfaces, all kept equal by
`validate-version-consistency` (enforcing in CI):

1. `.claude-plugin/plugin.json` -> `version`
2. `.claude-plugin/marketplace.json` -> `plugins[0].version` (display value)
3. `.codex-plugin/plugin.json` -> `version`
4. `README.md` version badge (`img.shields.io/badge/version-X.Y.Z`)

The registry entry's `version` in `agent-plugins` is a **fifth** mirror, but it
lives in the other repo and is checked by the registry CI, not by pm-skills CI.

---

## 3. Release procedure: shipping pm-skills `vX.Y.Z`

Order matters. The registry CI requires the tag to exist before it will accept a
pin to that tag's commit, so **tag pm-skills first, re-pin the registry second.**

### Step A - in pm-skills (the plugin repo)

1. Bump all four version surfaces to `X.Y.Z` (section 2). Run the pre-tag
   validator bundle (`scripts/pre-tag-validate.sh`, `ALLOW_BASH3=1`) plus
   `npm run build`; everything green.
2. Update `CHANGELOG.md` (and the docs-site mirror `docs/changelog.md`),
   `README.md` "What's New", and `docs/releases/Release_vX.Y.Z.md`.
3. Commit, push to `main`, let CI go green.
4. Create and push the annotated tag `vX.Y.Z` at the release commit. Capture the
   commit sha: `git rev-parse vX.Y.Z^{commit}`.
5. Publish the GitHub Release for `vX.Y.Z`.

At this point the **self-hosted** marketplace already serves the new content
(it tracks `main`). Bump its `plugins[0].version` to `X.Y.Z` in the same release
commit so the displayed value is accurate, even though `ref: main` is what
actually serves.

### Step B - in agent-plugins (the registry repo)

Do this **after** the tag is pushed (so check 5 passes). Full detail in
`registry-maintenance.md`; the essentials:

1. In `.claude-plugin/marketplace.json`, set the pm-skills entry's
   `source.sha` to the `vX.Y.Z` commit sha from Step A.4, and set its `version`
   to `X.Y.Z`.
2. Bump the registry's own `metadata.version` (section 4) and add a
   `CHANGELOG.md` entry describing the re-pin.
3. Commit and push to the registry `main`. `validate-registry` runs the seven
   checks (section 5); it must be green.

### Sanity smoke

`/plugin marketplace add product-on-purpose/agent-plugins` then
`/plugin install pm-skills@product-on-purpose` on a clean client; confirm the
catalog resolves and a skill (e.g. `/pm-skills:deliver-prd`) runs.

---

## 4. Versioning best practices

### Plugin version (pm-skills) is SemVer of the plugin

Use [SemVer](https://semver.org): `MAJOR.MINOR.PATCH`.

- **SemVer encodes compatibility, not significance.** An additive launch (e.g.
  the marketplace launch) is a **minor**, not a marketing-driven major, because
  nothing a user relies on was removed. A removal that does not break documented
  usage (e.g. deleting redundant command wrappers while keeping every skill name)
  is also a **minor**. Reserve **major** for a genuine breaking change to a
  surface users depend on (the planned `v3.0.0` retires the old marketplace
  path - the one breaking migration).
- **patch** = fixes/hardening with no catalog or interface change.
- The catalog count (skills) and the command set are interface; changing them is
  at least a minor.

### The registry has its own, independent version line

`metadata.version` in the registry is the **registry's** version, not any
plugin's. It tracks changes to the registry composition: adding/removing a
plugin, or re-pinning an existing one. It is maintained in the registry's own
`CHANGELOG.md` and follows SemVer for the registry-as-a-product (e.g. `1.0.0`
was the public-launch configuration). Bump it on every change to the registry
file; a re-pin is at least a patch/minor of the registry even though it changes
no registry schema.

### Git tags and the sha-on-tag invariant

- pm-skills tags releases as `vX.Y.Z` (annotated). The tag is the unit the
  registry pins.
- The registry pins the **commit sha** that the release tag points to, never a
  branch and never an arbitrary commit. The CI (check 5) enforces "this sha is a
  release-tag target." This makes the registry pin immutable and auditable: the
  weekly drift cron re-checks that the pinned tag has not been moved or deleted
  in pm-skills.
- The registry entry's `version` field should mirror the pinned tag's version,
  so the listing's displayed version matches what installs.

### Quick "what do I bump" matrix

| Change in pm-skills | plugin version surfaces | tag | self-hosted entry | registry sha + entry version | registry metadata.version |
|---|---|---|---|---|---|
| New/changed skill, command, or sub-agent | yes (X.Y.Z) | yes | bump display version | re-pin + bump | bump |
| Plugin manifest / packaging fix users need | yes | yes | bump display version | re-pin + bump | bump |
| Docs-site / build-script / CI only (no `skills/` or `commands/` change) | no | no | no | no | no |
| New plugin added to, or removed from, the registry | n/a | n/a | n/a | n/a | yes |

---

## 5. The registry CI contract (what blocks a bad listing)

`agent-plugins/scripts/validate-registry.mjs` (wired in
`validate-registry.yml`, run on push/PR to the registry `main` and on a weekly
drift cron) enforces:

1. **JSON parse** - the registry file is valid JSON.
2. **Schema** - top-level required fields and types.
3. **Per-entry required fields** - each plugin entry is complete.
4. **Source shape + pinned sha** - the source is a valid `url`/`github` shape and
   carries a 40-char sha (registry entries must be pinned, not floating).
5. **Sha is a release-tag target** - the pinned sha is the commit a `vX.Y.Z` tag
   points to in the plugin repo. (This is why you tag first.)
6. **No placeholder in production** - `strict` entries must point at a real
   pinned plugin, not a stub.
7. **Installability smoke** - the pinned commit's `plugin.json` parses and has the
   required fields, i.e. the thing you pinned is actually installable.

A `github` shorthand source clones over SSH and fails for users without an
authorized SSH key; use an explicit `url` (https) source. (Both are accepted by
the validator, but https is the working choice.)

---

## 6. When the marketplace does NOT need touching

If a change does not alter what the plugin **serves** (the `skills/`,
`commands/`, `agents/`, and the `.claude-plugin` / `.codex-plugin` manifests),
neither home needs an update:

- The registry pins a frozen release sha; later non-plugin commits on `main` are
  simply not served by it.
- The self-hosted `ref: main` will serve the new commits, but if `skills/` and
  `commands/` are unchanged the installed plugin is byte-identical in practice.

Worked example: the **2026-05-30 docs-site link sweep** (Astro content refresh +
the build-layer link fix in `post-build-strip-md-links.mjs` + the new
`check-rendered-links.mjs` CI guard) changed only `docs/`, `scripts/`, and
`.github/`. No version bump, no tag, and no registry re-pin were required, and
none were made. The deployed documentation site updated via the normal Pages
deploy; plugin distribution was untouched.

---

## 7. Cross-references

- `agent-plugins/docs/internal/registry-maintenance.md` - registry operations
  (add/bump a plugin, the CI contract in depth, go-public checklist, rollback).
- `agent-plugins/CHANGELOG.md` - the registry's own version history.
- `docs/internal/skill-versioning.md` - per-skill version governance inside
  pm-skills (manifest, HISTORY.md, tie-breaker rule).
- Release plans: `docs/internal/release-plans/v2.21.0/` (marketplace launch),
  `v2.22.0/` (wrapper deletion + Codex manifest), `v3.0.0/` (the breaking
  old-path retirement).
