---
title: skills.sh Distribution Guide
status: Active
owner: jprisant
created: 2026-04-23
last_verified: 2026-04-23
related:
  - docs/internal/distribution/2026-04-22_skills-sh.md
  - README.md
  - scripts/lint-skills-frontmatter.md
  - docs/releases/Release_v2.11.1.md
---

# skills.sh Distribution Guide

Canonical reference for how pm-skills is distributed through the open skills.sh ecosystem. Covers the mechanics, requirements, release lifecycle, current status, CI coverage, adjacent channels, common pitfalls, and escape hatches. Companion to the dated execution plan at [`2026-04-22_skills-sh.md`](2026-04-22_skills-sh.md) which captured the submission effort phase-by-phase; this doc is the long-lived reference.

---

## TL;DR

- **What it is**: [skills.sh](https://skills.sh) is a directory of reusable AI-agent skills, auto-populated from install telemetry. The install engine is the open [`skills` CLI](https://github.com/vercel-labs/skills) invoked as `npx skills add <owner>/<repo>`.
- **How we're listed**: by keeping the repo public on GitHub and passing the CLI's SKILL.md contract. There is no formal submission form.
- **Hard requirements**: public repo, Apache-2.0 (or other OSI) license, `SKILL.md` with `name` + `description` frontmatter at line 1 (no preamble), and skills under a scanned path like `skills/`.
- **Install command**: `npx skills add product-on-purpose/pm-skills`
- **Current status**: v2.11.1 fully compatible, 38 skills discoverable end-to-end, leaderboard presence waits on install-count telemetry from Phase 5 soft-launch.
- **Protecting against regression**: `scripts/lint-skills-frontmatter.sh/.ps1` enforces the two frontmatter gotchas that tripped us in v2.11.0.

---

## What is skills.sh

skills.sh is a publicly-browsable web directory of "agent skills" (reusable procedural knowledge files that LLM agents can load on demand). Per its own tagline, it is "The Open Agent Skills Ecosystem." Maintained by Vercel Labs as the public face of the `vercel-labs/skills` CLI they also ship.

Each directory entry is a skill or a repo of skills. Entries include metadata (install count, source owner/repo, GitHub stars, first-seen date, security-audit badges, and per-agent install counts). The leaderboard ranks by weekly installs across the full install telemetry graph. Top entries cross 1M installs; niche entries in the hundreds to thousands.

Crucially: **skills.sh does not host skills**. It indexes and ranks them. The source of truth is always a public Git repo (GitHub, GitLab, or any Git URL). When a user runs `npx skills add <owner>/<repo>`, the CLI clones the repo fresh, scans for SKILL.md files, and installs them into the user's agent. The directory learns about new repos the moment the first installer points at one.

---

## How the ecosystem works

### The `skills` CLI

- **Package**: [`vercel-labs/skills`](https://github.com/vercel-labs/skills)
- **Entry points**: `npx skills <command>`. Common commands:
  - `add <package>`: clone a repo and install its skills. Also supports URLs, local paths.
  - `list` / `ls`: list installed skills
  - `remove`: remove installed skills
  - `update`: update skills to latest versions
  - `find`: interactive skill search
- **Install shorthand for us**: `npx skills add product-on-purpose/pm-skills`
- **Useful flag for dry-runs**: `-l` / `--list` lists discoverable skills without installing. This is the canonical validation we run before any release.
- **Scope flags**: `-g` (global, user-level) vs project-level (default in a project directory)
- **Agent targeting**: `-a <agent>` installs to a specific agent; `-a '*'` installs to all supported agents.

### Discovery paths the CLI scans

When the CLI clones a repo, it looks for SKILL.md files in this order:

1. Repo root (if the root has a SKILL.md, the whole repo is treated as a single skill)
2. `skills/`, `skills/.curated/`, `skills/.experimental/`, `skills/.system/`
3. Agent-specific paths: `.agents/skills/`, `.claude/skills/`, `.cursor/skills/`, and other per-agent conventions
4. `.claude-plugin/marketplace.json` or `.claude-plugin/plugin.json` (plugin manifest path)
5. Recursive fallback across the whole repo if nothing is found in the standard locations

**For pm-skills**: the scanner finds everything under `skills/` (standard path) and reports one entry per skill directory. Nothing ends up in the root SKILL.md trap or the plugin-manifest trap unless we explicitly opt in.

### SKILL.md frontmatter contract

Two required fields:

```yaml
---
name: lowercase-hyphen-name
description: One or more sentences describing what this skill does. Triggers agent matching.
---
```

Additional fields are allowed and ignored by the CLI (pm-skills adds `phase`, `classification`, `version`, `updated`, `license`, `metadata.category`, `metadata.frameworks`, `metadata.author`). They do not break the contract; they just do not influence skills.sh discovery or ranking.

One opt-out:

```yaml
metadata:
  internal: true
```

Marks a skill internal. The CLI hides it from discovery unless the user sets `INSTALL_INTERNAL_SKILLS=1`. Not in use in pm-skills today.

### Ranking and leaderboard mechanics

Entirely install-count-driven. The CLI ships anonymous telemetry pings on `skills add` invocations; those pings aggregate into weekly install counts per skill and per repo. The directory ranks by weekly installs.

Telemetry is disabled automatically when:

- `DISABLE_TELEMETRY=1` is set
- `DO_NOT_TRACK=1` is set
- The CLI detects a CI environment (standard CI env var heuristics)

This means **PMs who install pm-skills in CI contexts do not count toward the leaderboard**. Only interactive installs from personal machines register.

### What shows on a skills.sh detail page

Based on inspection of `https://skills.sh/vercel-labs/skills/find-skills` and sibling entries, per-skill pages show:

- Name + description (pulled from SKILL.md frontmatter)
- Weekly install count and total install count
- Owner/repo attribution (linked)
- GitHub stars (pulled from GitHub API)
- First-seen date
- Security-audit badges (Socket, Snyk, Gen Agent Trust Hub)
- Per-agent install breakdown (Claude Code, Cursor, Copilot, Cline, etc.)

Per-repo pages show the aggregate of all skills in the repo plus the same owner/repo metadata.

---

## Requirements to be listed

### Hard requirements (must-have)

1. **Public Git repo**. GitHub (most common), GitLab, or any publicly-cloneable Git URL. pm-skills lives at [`product-on-purpose/pm-skills`](https://github.com/product-on-purpose/pm-skills).
2. **Valid SKILL.md at line 1**. Line 1 must be `---` (YAML frontmatter delimiter). No HTML comments, attribution headers, or other content above it. The CLI's YAML parser rejects any file that does not open cleanly.
3. **Required frontmatter fields**. `name` (lowercase, hyphens allowed; must match the directory name by convention) and `description` (non-empty, 20 to 100 words in our lint).
4. **No YAML-ambiguous characters in unquoted values**. Specifically, unquoted `description` must not contain an inline `": "` (colon-space), which strict YAML interprets as a nested key-value separator. If a colon is unavoidable, wrap the full value in double quotes.
5. **Skills under a scanned path**. `skills/{skill-name}/SKILL.md` works (our convention).

### Soft requirements (should-have for discoverability)

1. **OSI-approved license** (ideally Apache-2.0 or MIT). pm-skills is Apache-2.0. GitHub's license auto-detection should recognize the LICENSE file and render a license badge. Our LICENSE is boilerplate Apache 2.0 at repo root; auto-detection works.
2. **Root README with install instructions prominently placed**. skills.sh doesn't pull content from the README directly, but installers land on the GitHub repo page after seeing a skills.sh entry, and the README is what sells the skill to a new user. Ours leads with the `npx skills add` command above the fold.
3. **README badges signaling trust**. License, version, install count, spec-compliance. We carry all four including a `skills.sh install` shield.
4. **Versioned releases with tags**. skills.sh does not require tags, but tagged releases provide assets (ZIPs, manifests) and a cleaner attribution surface on GitHub.
5. **CHANGELOG following Keep-A-Changelog**. Helps readers understand what they're installing.

### Frontmatter gotchas we hit (documented as hard-won lessons)

Two bug classes caught us during v2.11.0 and fixed in v2.11.1. Both are now enforced by `scripts/lint-skills-frontmatter.sh/.ps1` (see [CI section](#ci-and-validation)).

**Gotcha 1: pre-frontmatter HTML comment**

Shipping a SKILL.md that looks like this silently drops the skill from CLI discovery:

```markdown
<!-- Attribution header -->
---
name: foo
description: ...
---
```

The CLI's YAML parser expects `---` at line 1. Anything above it breaks parsing. v2.11.0 shipped 6 foundation skills with this mistake; v2.11.1 fixed them all and added the lint rule "first line must be `---`".

**Gotcha 2: inline colon-space in unquoted description**

Shipping a description like:

```yaml
description: Some text. and then a colon: ambiguous stuff follows.
```

Strict YAML interprets `colon: ambiguous` as a nested key-value pair, truncating the description value. The v2.11.0 `foundation-meeting-synthesize` description had this exact issue; v2.11.1 reworded it and added the lint rule "unquoted description must not contain inline `': '`".

Escape hatch: wrap the full description in double quotes if a colon is required.

---

## Release lifecycle with skills.sh

### What `npx skills add` actually does

On every invocation:

1. Resolves `<owner>/<repo>` to a Git URL
2. Clones the repo at **default branch HEAD** (not at a tag) into a temp directory
3. Scans for SKILL.md per the [discovery paths](#discovery-paths-the-cli-scans)
4. Parses frontmatter; skips any SKILL.md that fails parsing (silently; this is the gotcha)
5. Copies or symlinks (per flag) valid skills into the user's agent skills directory
6. Emits a telemetry ping (unless disabled)
7. Deletes the temp clone

Key implication: **the CLI tracks `main`, not tags**. If you want a "frozen" snapshot to be what users install, that snapshot has to be what's on `main`. Tags matter for GitHub Releases (assets, release notes) but not for the CLI install path.

### What users get on install

Whatever is on `main` at the moment of invocation. If a polish commit lands after a tag, users who install after that commit get the polish. Users who install before the commit got the tagged state. There is no version negotiation.

### Re-install / update semantics

`npx skills update` reinstalls skills at their current `main` HEAD. It does not pin to a version. Users cannot pin to a tag today. This means:

- We should never ship content on `main` that is worse than the last tagged state
- Breaking changes must be communicated in CHANGELOG and release notes; the CLI does not enforce semver
- Users who want version pinning should clone the repo at a tag and point their agent at the local path, bypassing the CLI

### Tag vs `main` discipline

Our convention as established through v2.11.1:

- **Tag** = the frozen snapshot announced as version X.Y.Z. Points at a specific commit. Never moved once pushed.
- **`main`** = latest published state. Moves forward as polish, docs updates, and non-release work land.
- **Post-tag polish** (mkdocs updates, docs site catch-up, effort stubs) lands on `main` as follow-up commits. These are included in the next tag but not retroactively in the previous one.

### Withdrawal path

If we ever need to de-list a skill:

1. Remove the skill directory (`git rm -r skills/problem-skill/`)
2. Commit and push to `main`
3. Future `npx skills add` invocations will not include the removed skill
4. Users who already installed it keep their local copy; they can run `npx skills remove <skill-name>` manually

skills.sh directory entries do not auto-remove. We may need to contact Vercel Labs or wait for their indexer to refresh. Not tested in practice yet.

To de-list the whole repo: make the repo private or delete it. The CLI fails cleanly when it cannot clone.

---

## Current status of pm-skills

### Technical compatibility (as of 2026-04-23)

- **Shipped**: v2.11.1, tagged 2026-04-22, pushed to origin
- **Install command**: `npx skills add product-on-purpose/pm-skills`
- **Skills discovered**: 38 of 38 (verified end-to-end against GitHub `main` from a clean directory on 2026-04-22)
- **Foundation skills previously broken by YAML preamble**: all 6 fixed in v2.11.1 (lean-canvas, meeting-agenda, meeting-brief, meeting-recap, meeting-synthesize, stakeholder-update)
- **Stale `.claude/skills/` phantoms removed**: 3 tracked directories (`init-project`, `init-project-jpkb`, `wrap-session`) that were bleeding into installs as bonus skills
- **Lint protection in place**: two new rules prevent regression of the v2.11.0 bugs

### Leaderboard / directory status

- **skills.sh detail page**: `https://skills.sh/product-on-purpose/pm-skills` URL resolution status unverified. Expected to populate once the first installer's telemetry ping is indexed. Worth checking manually after Phase 5 kickoff.
- **Weekly installs**: 0 as of 2026-04-23 (no distribution push started)
- **Leaderboard rank**: not on it (requires install-count > 0)

### Distribution plan phase tracker

Detail in [`2026-04-22_skills-sh.md`](2026-04-22_skills-sh.md).

- Phase 0 Prerequisites: done
- Phase 1 Structural validation + lint enforcement: done
- Phase 2 README install surface: done
- Phase 3 Dry-run against live CLI: done (38 of 38)
- Phase 4 `.claude-plugin/marketplace.json`: deferred
- Phase 5 Soft launch: not started (your workstream)
- Phase 6 Monitor + retro: not started

---

## CI and validation

### Current (enforcing, in CI on every PR)

**`scripts/lint-skills-frontmatter.sh/.ps1`** validates every `skills/*/SKILL.md`:

- SKILL.md exists
- **First line is `---`** (added in v2.11.1; prevents the pre-frontmatter comment bug)
- YAML frontmatter is present (delimited by `---`)
- `name` field matches directory name
- `description` field is 20 to 100 words
- **Description does not contain unquoted inline `': '`** (added in v2.11.1; prevents the YAML parse-truncation bug)
- `version`, `updated`, `license` fields present
- `phase` is valid for classification
- `metadata.version` does not exist (only root `version` allowed)
- References (`TEMPLATE.md`, `EXAMPLE.md`) exist and have at least 3 `##` headers

This script is the primary safeguard against ever shipping a skills.sh-incompatible state. It runs in `.github/workflows/validation.yml` on every PR.

**`scripts/validate-agents-md.sh/.ps1`** ensures `AGENTS.md` lists every skill directory. Not skills.sh-specific, but guarantees any new skill is discoverable by agent context-matchers.

**`scripts/check-count-consistency.sh/.ps1`** (advisory) detects stale hardcoded counts. Flags current-state claims; does not flag historical references.

### Needed but not yet built

**`scripts/validate-skills-sh-dry-run.sh`** (proposed): run `npx skills add <local> -l` as part of CI, confirm skill count matches expected. Would have caught the v2.11.0 bug automatically if it had existed. Medium-priority add to the CI surface. Candidate for F-38 scope or a standalone effort.

**Rationale for adding**: our existing lint enforces the contract *as we understand it*. The live CLI is the actual consumer. A CI step that runs the live CLI against the repo closes the gap between our understanding and reality. Without it, a future CLI version change could silently break our install path.

### Dry-run validation pattern (manual today, recommended before every release)

Minimum command:

```bash
mkdir -p /tmp/pm-skills-dryrun-$$ && cd /tmp/pm-skills-dryrun-$$
npx --yes skills add product-on-purpose/pm-skills -l 2>&1 | tee listing.log
```

Expected output: all 38 skills listed with descriptions, exit code 0.

Richer diff against source:

```bash
sed 's/\x1b\[[0-9;]*m//g' listing.log | grep -E '^\s*│\s+[a-z]' | awk '{print $2}' | sort -u > discovered.txt
diff <(ls /path/to/pm-skills/skills/ | sort) discovered.txt
```

Expected: empty diff.

This is what `/release verify` in F-38 should automate.

---

## Adjacent distribution channels

pm-skills ships through multiple channels. skills.sh is one of them, not the only one. Understanding how they relate prevents cross-channel confusion.

### Git clone (legacy / primary)

- **Command**: `git clone https://github.com/product-on-purpose/pm-skills.git`
- **Best for**: developers who want the full repo including commands, workflows, library samples, internal docs
- **Covers**: everything that is not gitignored
- **Does not cover**: skills.sh telemetry (no ping fires on `git clone`)

### ZIP download via GitHub Releases

- **Command**: download from https://github.com/product-on-purpose/pm-skills/releases
- **Best for**: Claude.ai and Claude Desktop users who upload ZIPs
- **Auto-generated by the release workflow** on tag push; see v2.11.1 release assets for the pattern
- **Does not cover**: telemetry or leaderboard signal

### skills CLI via skills.sh ecosystem (primary external channel)

- **Command**: `npx skills add product-on-purpose/pm-skills`
- **Best for**: broad agent compatibility (Claude Code, Cursor, Copilot, Cline), fast install, telemetry-driven discoverability
- **Added as the recommended first option in v2.11.1**

### MCP server (`pm-skills-mcp`)

- **Command**: `npx pm-skills-mcp`
- **Best for**: MCP-compatible clients (Claude Desktop, some Cursor setups)
- **Separate repo**: [`pm-skills-mcp`](https://github.com/product-on-purpose/pm-skills-mcp); currently frozen at 28 of 38 skills per M-22 decision (2026-04-17)
- **Does not cover**: skills.sh telemetry

### Claude Code plugin marketplace (optional, deferred)

- **Path**: `.claude-plugin/marketplace.json` at repo root
- **Status**: deferred per Phase 4 of the distribution plan
- **Would enable**: native Claude Code plugin-browser discovery
- **Does not affect**: skills.sh rank or discovery

---

## Common pitfalls and debugging

### "My skill is not showing up on install"

Most likely causes in order of frequency:

1. **Pre-frontmatter content in SKILL.md**. Check line 1; must be `---`.
2. **Inline `': '` in unquoted description**. Check YAML parse-ability.
3. **Invalid `name` (uppercase, spaces, underscores)**. Must match `^[a-z][a-z0-9-]*$`.
4. **Directory name does not match `name`**. Our lint catches this, but worth knowing.
5. **Skill is under an ignored path**. `.gitignore` entries mean the file is not pushed to GitHub, so the CLI cannot clone it.
6. **`metadata.internal: true`** is set. Intentional hide; unset or use `INSTALL_INTERNAL_SKILLS=1`.

Debugging recipe:

```bash
# Dry-run the install against the live repo, with list mode
npx --yes skills add product-on-purpose/pm-skills -l 2>&1 | tee /tmp/cli.log

# Parse discovered skill names from the log
sed 's/\x1b\[[0-9;]*m//g' /tmp/cli.log | grep -E '^\s*│\s+[a-z]' | awk '{print $2}' | sort -u

# Compare against the skills/ directory
diff <(ls skills/ | sort) <(parsed-list)
```

### "The install worked but I see phantom skills I didn't ask for"

Most likely cause: stale `.claude/skills/` (or similar agent-local path) contains tracked SKILL.md files that predate the gitignore rule. Happened to us with `init-project`, `init-project-jpkb`, and `wrap-session`. Detection:

```bash
git ls-files .claude/skills/ | grep "SKILL.md$"
```

Remediation: `git rm -r .claude/skills/` (or remove specific paths). Commit and push.

### "Install count is stuck at 0 even though I ran `npx skills add`"

Likely causes:

1. **Telemetry is disabled in your environment**. Check `DISABLE_TELEMETRY`, `DO_NOT_TRACK`, CI env vars.
2. **skills.sh indexer has not polled yet**. First install usually takes hours to days to appear.
3. **The install actually failed silently**. Re-run with `-l` to confirm skills were discovered; if discovery is empty, telemetry will not fire.

### "Counting drift between sources and generated docs"

We hit this with stale `"27 skills"` references. The generator `scripts/generate-skill-pages.py` computes counts dynamically, so regenerating docs/ after skill changes fixes drift. Manual edits to generated files get overwritten on next regenerate; always update the source SKILL.md / EXAMPLE.md.

---

## Escape hatches

### Description must contain a colon

Wrap the full description value in double quotes:

```yaml
description: "Produces X by doing Y: specifically, it does A, B, and C."
```

The lint accepts quoted descriptions without the inline-colon check.

### You want to hide a skill from discovery temporarily

Set `metadata.internal: true` in the frontmatter. Re-enable discovery by removing the flag or setting `INSTALL_INTERNAL_SKILLS=1` in the CLI environment.

### You want to pin installers to a specific version

The CLI does not support tag-pinning as of 2026-04-23. Closest available:

1. Tell users to `git clone --branch v2.11.1 https://github.com/product-on-purpose/pm-skills.git` and point their agent at the local path
2. Upload the ZIP from the GitHub Release and distribute that URL
3. Wait for a CLI feature that supports `<owner>/<repo>@<tag>` syntax (not shipped today)

### You need to force-update a user's installed skills

Users should run `npx skills update` which re-clones and re-installs. There is no push-update mechanism we can trigger from our side.

---

## Security and privacy considerations

### What gets shared on install

- User agent metadata (which agent they are installing into)
- Anonymous install count
- Timestamp

What is NOT shared:

- User identity
- Repo contents beyond what was downloaded
- User files

### What we can see about installers

Nothing at the individual level. skills.sh shows aggregate install counts per skill and per repo. There is no per-user telemetry available to repo maintainers.

### Trust signals we surface

- Apache-2.0 license (GitHub auto-detected)
- `agentskills.io` specification compliance badge in README
- Security audits on skills.sh detail page (Socket, Snyk, Gen Agent Trust Hub) once the page resolves

### Known supply-chain risks

- `npx skills` is a Vercel Labs tool; it has its own supply chain. Users trusting pm-skills via this channel are also trusting the CLI.
- Skills run as context loaded into an agent. Malicious skill content could attempt prompt injection. pm-skills ships no executable code, only markdown, which narrows but does not eliminate this vector.

---

## Process for ongoing releases

Full checklist for any future release that touches SKILL.md or skills.sh compatibility surface.

### Before tagging

1. Run `scripts/lint-skills-frontmatter.sh` (enforces the 2 skills.sh-specific rules)
2. Run the dry-run validation pattern above (`npx skills add <local> -l`)
3. Confirm skill count matches expected
4. Confirm no em-dashes, no stale counts via `scripts/check-count-consistency.sh`

### During release (after tag, before announce)

5. Verify GitHub Release was auto-created by the release workflow
6. Update the Release body if it was auto-generated with generic notes: `gh release edit <tag> --notes-file <stripped-body>` (remember to strip markdown frontmatter)
7. Check `https://skills.sh/product-on-purpose/pm-skills` resolves (may take hours)

### After release

8. Run the live CLI dry-run from a clean directory (cloning fresh, not pointing at local)
9. Confirm all skills discovered from the published state
10. Monitor skills.sh install count for the first 72 hours

This pattern will be codified as F-38 `/release` utility skill.

---

## References

### Internal

- [Dated execution plan](2026-04-22_skills-sh.md) for the v2.11.1 submission effort
- [v2.11.1 release plan](../release-plans/v2.11.1/plan_v2.11.1.md)
- [v2.11.1 release notes](../../releases/Release_v2.11.1.md)
- [Lint script documentation](../../../scripts/lint-skills-frontmatter.md)
- [F-38 `/release` utility skill effort brief](../efforts/F-38-release-skill.md)

### External

- [skills.sh directory](https://skills.sh)
- [vercel-labs/skills CLI on GitHub](https://github.com/vercel-labs/skills)
- [Vercel KB: Agent Skills creating, installing, sharing](https://vercel.com/kb/guide/agent-skills-creating-installing-and-sharing-reusable-agent-context)
- [agentskills.io specification](https://agentskills.io/specification)
- [find-skills example entry on skills.sh](https://skills.sh/vercel-labs/skills/find-skills)

---

## Maintenance log

- **2026-04-23**: Initial guide authored after v2.11.1 ship. Captures everything learned through the submission effort and codifies ongoing-release discipline.
- **Next update trigger**: any CLI behavior change, any new gotcha discovered, or any structural change to pm-skills that affects skills.sh compatibility.
