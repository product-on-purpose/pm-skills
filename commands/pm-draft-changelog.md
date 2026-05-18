---
description: Draft CHANGELOG entries from git log via the pm-changelog-curator sub-agent
argument-hint: "[--since-tag vX.Y.Z] [--target-version vA.B.C] [--committed-only]"
---

Draft CHANGELOG entries from git log applying pm-skills hygiene rules from CLAUDE.md.

**On Claude Code with the pm-skills plugin:** invoke the `pm-changelog-curator` sub-agent (definition at `subagents/pm-changelog-curator.md`). The sub-agent runs `git log` between the since-tag and HEAD, classifies each commit (user-facing vs internal-only vs mixed), groups by Keep-a-Changelog section (Added / Changed / Fixed / Removed / Deprecated / Security), applies CLAUDE.md hygiene rewrites (no internal-notes refs, no em-dashes, no Claude attribution trailers, public paths only), and returns a draft with hidden justification comments for maintainer audit.

**On other AI clients (Codex CLI, Cursor, Windsurf, Copilot, Gemini CLI):** invoke the dispatch skill at `skills/utility-pm-changelog-curator/SKILL.md`. The dispatch skill reads the canonical sub-agent definition inline and produces an equivalent draft.

If working tree has uncommitted changes, the curator refuses unless `--committed-only` is passed (acknowledges that uncommitted release-prep changes will be silently omitted). This protects against accidentally drafting against a dirty tree mid-release-prep.

Output follows the layered Status envelope per master plan D26 (full CHANGELOG draft + Status Summary prose + Status YAML block).

Reference v2.15.1 + v2.15.2 CHANGELOG entries in root `CHANGELOG.md` for the canonical structure the curator produces.

Context from user: $ARGUMENTS
