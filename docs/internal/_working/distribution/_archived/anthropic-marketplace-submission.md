# Anthropic Marketplace Submission Guide

> **Status:** Ready to execute
> **Backlog ref:** Priority 0 in `docs/internal/backlog-canonical.md`
> **Owner:** Human (with Claude support for manifest updates)
> **Last updated:** 2026-03-22

---

## Important: Three Things Called "Marketplace"

There are three distinct things in the Anthropic ecosystem. Only the first is relevant to pm-skills.

| What | Status | Relevant? |
|------|--------|-----------|
| **Claude Code Plugin Directory** | Live, accepting submissions | **Yes** |
| Claude Marketplace (Enterprise) | Limited preview (B2B procurement platform) | No |
| Community/third-party marketplaces | Anyone can create | Optional (parallel path) |

**Target: The Claude Code Plugin Directory** . the curated directory at [claude.com/plugins](https://claude.com/plugins), accessible via `/plugin > Discover` in Claude Code. Currently lists ~30 plugins with install counts in the hundreds of thousands.

---

## Pre-Submission Checklist

### 1. Update `.claude-plugin/plugin.json`

The current manifest is **stale** (v2.6.1, says 25 skills). Update before submitting:

```json
{
  "name": "pm-skills",
  "version": "2.7.0",
  "description": "27 product management skills for AI agents, covering the full product lifecycle from discovery through iteration. Includes structured templates, real-world examples, workflows, and an interactive skill builder. Follows the agentskills.io specification.",
  "homepage": "https://github.com/product-on-purpose/pm-skills",
  "repository": "https://github.com/product-on-purpose/pm-skills",
  "license": "Apache-2.0",
  "author": {
    "name": "product-on-purpose",
    "url": "https://github.com/product-on-purpose"
  },
  "keywords": [
    "product-management",
    "pm",
    "prd",
    "user-stories",
    "acceptance-criteria",
    "triple-diamond",
    "lean-startup",
    "design-thinking",
    "agent-skills",
    "agentskills-io"
  ],
  "category": "productivity"
}
```

**Changes from current:**
- `version`: 2.6.1 → 2.7.0
- `description`: 25 → 27 skills, mentions skill builder and agentskills.io
- `keywords`: added `acceptance-criteria`, `agent-skills`, `agentskills-io`
- `category`: added (new field)

### 2. Verify Plugin Structure

The repo already has the correct structure for a Claude Code plugin:

```
pm-skills/
├── .claude-plugin/
│   └── plugin.json          ✅ exists (needs version bump)
├── skills/                  ✅ 27 skills with SKILL.md + references/
├── commands/                ✅ 28 command markdown files
├── AGENTS.md                ✅ discovery file
├── README.md                ✅ comprehensive
├── LICENSE                  ✅ Apache-2.0
└── CONTRIBUTING.md          ✅ contribution guidelines
```

### 3. Verify Skill Quality

Run all validators to confirm everything passes:

```bash
bash scripts/lint-skills-frontmatter.sh      # 27 skills, 0 failures
bash scripts/validate-agents-md.sh           # 27 paths sync
bash scripts/validate-commands.sh            # 28 commands valid
```

### 4. Verify README Quality

The README is the primary thing reviewers will see. It should clearly communicate:
- [x] What pm-skills is (27 PM skills for AI agents)
- [x] How to install (git clone, ZIP, or MCP)
- [x] What skills are available (full table with commands)
- [x] License (Apache 2.0)
- [x] Active maintenance (recent commits, changelog)

---

## Submission Steps

### Step 1: Submit via the Form

Go to one of:
- **[claude.ai/settings/plugins/submit](https://claude.ai/settings/plugins/submit)**
- **[platform.claude.com/plugins/submit](https://platform.claude.com/plugins/submit)**
- **[clau.de/plugin-directory-submission](https://clau.de/plugin-directory-submission)**

You'll provide:
- Repository URL: `https://github.com/product-on-purpose/pm-skills`
- Plugin name: `pm-skills`
- Description (from plugin.json)
- Category

### Step 2: Automated Review

Anthropic runs an automated review checking:
- Valid `plugin.json` manifest
- Repository structure
- Basic security/quality checks

### Step 3: Wait for Acceptance

If accepted, the plugin appears in:
- `/external_plugins/` in the `anthropics/claude-plugins-official` repo
- The `/plugin > Discover` browser in Claude Code (v1.0.33+)
- [claude.com/plugins](https://claude.com/plugins) web directory

### Step 4: Potential "Anthropic Verified" Badge

Plugins that pass additional manual quality/safety review receive an "Anthropic Verified" badge. This is a separate, deeper review . not guaranteed on initial submission.

---

## Parallel Path: Self-Hosted Marketplace

You don't need to wait for official acceptance. You can self-host a marketplace immediately:

### Option A: Add marketplace.json to pm-skills

Create a `marketplace.json` in the repo root:

```json
{
  "name": "pm-skills-marketplace",
  "description": "Product Management skills for AI agents",
  "plugins": [
    {
      "name": "pm-skills",
      "description": "27 PM skills covering the full product lifecycle",
      "version": "2.7.0",
      "source": ".",
      "author": "product-on-purpose",
      "license": "Apache-2.0",
      "keywords": ["product-management", "pm", "agent-skills"]
    }
  ]
}
```

Users install with:
```
/plugin marketplace add product-on-purpose/pm-skills
/plugin install pm-skills
```

### Option B: Submit to Community Marketplaces

- [claudemarketplaces.com](https://claudemarketplaces.com/)
- [buildwithclaude.com/marketplaces](https://www.buildwithclaude.com/marketplaces)

---

## Risks and Considerations

### Likelihood of Acceptance

| Factor | Assessment |
|--------|-----------|
| License | **Strong** . Apache 2.0 is permissive and widely accepted |
| Quality | **Strong** . 27 skills with templates, examples, CI validation |
| Uniqueness | **Strong** . no existing PM-focused skill pack in the directory |
| Maintenance | **Strong** . active development, recent v2.7.0 release |
| Spec compliance | **Strong** . follows agentskills.io specification |
| Size/scope | **Moderate risk** . 27 skills is large; reviewers may flag install footprint |
| MCP companion | **Differentiator** . pm-skills-mcp shows ecosystem maturity |

**Overall assessment:** High likelihood of acceptance. pm-skills is well-maintained, uniquely positioned (no competing PM skill packs), follows the official spec, and has professional documentation.

### Risks

1. **Review timeline is unknown.** Anthropic doesn't publish SLAs for plugin review. Could be days or weeks.

2. **Scope concerns.** At 27 skills with templates and examples, the install footprint is larger than typical plugins (which tend to be single-purpose tools). Reviewers might ask if it should be split into smaller packages. Counter-argument: the skills are a coherent collection organized by the Triple Diamond framework.

3. **Plugin.json version drift.** The manifest version needs to stay in sync with releases. Consider adding version parity checks to the release workflow (similar to `validate-plugin.yml` which already exists).

4. **Naming.** The name `pm-skills` is descriptive but generic. If another PM skill pack submits first with a similar name, there could be confusion. The `product-on-purpose` author field differentiates.

5. **No npm package for the skill library.** The MCP server is on npm, but the skill library itself is git-clone/ZIP only. This is fine for the plugin directory (which uses git repos), but limits discoverability outside the Claude ecosystem.

6. **Utility skill in plugin context.** `pm-skill-builder` writes to `_staging/` . this works in Claude Code but the behavior in other plugin contexts (if plugins expand beyond Claude Code) is undefined. Not a blocker for submission.

### What Reviewers Probably Look For

Based on the existing accepted plugins:

- **Does it work?** Can a user install and immediately use `/prd`, `/hypothesis`, etc.?
- **Is it safe?** No credential harvesting, no data exfiltration, no destructive operations.
- **Is it maintained?** Recent commits, responsive issues, clear changelog.
- **Is it documented?** README explains what it does and how to use it.
- **Does it add value?** Unique capability not already in the directory.

pm-skills passes all of these.

---

## Post-Acceptance Tasks

1. **Update README** with install badge/instructions for plugin directory
2. **Update backlog** . mark Effort 0 as complete
3. **Announce** . GitHub release note, any community channels
4. **Monitor** install counts and user feedback via GitHub issues
5. **Keep plugin.json in sync** . add version bump to release checklist

---

## Quick Reference

| Item | Value |
|------|-------|
| Submission form | [clau.de/plugin-directory-submission](https://clau.de/plugin-directory-submission) |
| Plugin name | `pm-skills` |
| Repository | `https://github.com/product-on-purpose/pm-skills` |
| Manifest | `.claude-plugin/plugin.json` |
| Current manifest version | 2.6.1 (**update to 2.7.0 before submitting**) |
| License | Apache-2.0 |
| Skills | 27 (25 domain + 1 foundation + 1 utility) |
| Commands | 28 (27 skill + 1 workflow) |
| Existing validation workflow | `.github/workflows/validate-plugin.yml` |
