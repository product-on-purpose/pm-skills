# M1 install-path repoint - apply-ready spec (Phase 5)

> **Held until Phase 5.** These edits must NOT land on `main` until the `product-on-purpose/agent-plugins` registry is public (right after smoke S8 passes), or visitors would be sent to a private registry. This doc is the reviewable, apply-verbatim spec; it is an internal planning file, not the live install instructions, so committing *it* is safe. See the M1 sequencing guard in `plan_v2.21.0.md`.

## Scope (verified by full-repo scrape 2026-05-26)

Exactly **4 live install-command blocks** across **2 user-facing files** switch from the old self-hosted path to the new marketplace. The swap is the same each time:

- `/plugin marketplace add product-on-purpose/pm-skills` -> `/plugin marketplace add product-on-purpose/agent-plugins`
- `/plugin install pm-skills@pm-skills-marketplace` -> `/plugin install pm-skills@product-on-purpose`

The two "recommended" blocks also gain an "old way still works" pointer.

**Explicitly NOT changed:** `platforms.md` local-dev block (local clone legitimately uses `pm-skills-marketplace`); all historical release notes / CHANGELOG / `docs/changelog.md` entries describing the v2.13.1 fix; `scripts/validate-plugin-install.md` (validates the self-hosted path, which stays alive); all `docs/internal/**`. Evergreen `npx skills add` and `git clone` lines are untouched.

## Edit 1 - README.md Quick Start (around line 119-122)

**Before:**
```bash
/plugin marketplace add product-on-purpose/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```
**After:**
```bash
/plugin marketplace add product-on-purpose/agent-plugins
/plugin install pm-skills@product-on-purpose
```
**Add immediately after the closing fence:**
```markdown
> Already installed via the old `pm-skills-marketplace`? It keeps working - no action needed. To move to the new home, see [Already installed the old way?](docs/releases/Release_v2.21.0.md#already-installed-the-old-way).
```

## Edit 2 - README.md Featured Install Paths (around line 409-412)

Same command swap as Edit 1. Add the same pointer after the block (repo-root-relative link `docs/releases/Release_v2.21.0.md#already-installed-the-old-way`).

## Edit 3 - docs/getting-started/platforms.md "Modern Claude Code" (around line 32-35)

Same command swap. Add the pointer (path relative to this file): `[Already installed the old way?](../releases/Release_v2.21.0.md#already-installed-the-old-way)`.

**Preserve unchanged** the local-working-copy block immediately below (lines ~41-44):
```
/plugin marketplace add /path/to/your/local/pm-skills
/plugin install pm-skills@pm-skills-marketplace
```
This is correct for a local clone (its `marketplace.json` is named `pm-skills-marketplace`).

## Edit 4 - docs/getting-started/platforms.md troubleshooting (around line 262-265)

Same command swap. No pointer needed (it is a troubleshooting "pull the latest" block).

## Apply-time acceptance

- All 4 blocks lead with the new path; the two recommended blocks carry the "old way works" pointer.
- The local-dev block and all evergreen/historical references are unchanged.
- The enforcing internal-link/anchor checker stays green (verify the `#already-installed-the-old-way` anchor resolves in `Release_v2.21.0.md`, and that the relative path differs correctly between README root and `docs/getting-started/`).
- Lands as a single dedicated Phase 5 commit on `main` after the public flip.
