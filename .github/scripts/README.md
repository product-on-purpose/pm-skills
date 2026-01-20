# GitHub Actions Scripts

This directory contains scripts used by GitHub Actions workflows.

## Files

### create-issues.js

Automated script for creating GitHub issues from markdown draft files.

**Purpose:** 
- Parses markdown files with YAML frontmatter from `.github/issues-drafts/`
- Creates GitHub issues via the GitHub API
- Tracks processed files to ensure idempotency
- Updates planning documentation with issue numbers
- Archives processed files

**Usage:**
```bash
# Dry run (preview only)
DRY_RUN=true GITHUB_TOKEN=xxx GITHUB_REPOSITORY=owner/repo node create-issues.js

# Live mode (actually create issues)
DRY_RUN=false GITHUB_TOKEN=xxx GITHUB_REPOSITORY=owner/repo node create-issues.js
```

**Environment Variables:**
- `GITHUB_TOKEN` - GitHub API token with issues:write and contents:write permissions
- `GITHUB_REPOSITORY` - Repository in format "owner/repo"
- `DRY_RUN` - Set to "true" for preview mode, "false" for actual execution

**Dependencies:**
- `@octokit/rest` - GitHub REST API client
- `gray-matter` - YAML frontmatter parser

**See also:** [Workflow Guide](../issues-drafts/WORKFLOW-GUIDE.md)

## Development

### Install dependencies
```bash
npm install
```

### Run tests
```bash
# Dry run test
DRY_RUN=true GITHUB_REPOSITORY=product-on-purpose/pm-skills node create-issues.js
```

### Update dependencies
```bash
npm update
npm audit
```
