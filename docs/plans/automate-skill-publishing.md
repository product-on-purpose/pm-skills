# Implementation Plan: Automated Skill Publishing

> Goal: Describe a skill via Claude Code → auto-commit to main with release tag, updated docs, CI validation → cross-publish to pm-skills-mcp

## Overview

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  1. SCAFFOLD    │────▶│  2. VALIDATE    │────▶│  3. RELEASE     │
│  Claude Code    │     │  PR + CI        │     │  Tag + Docs     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                                                        ▼
                                               ┌─────────────────┐
                                               │  4. CROSS-PUB   │
                                               │  pm-skills-mcp  │
                                               └─────────────────┘
```

---

## Phase 1: Skill Scaffolding

**Goal:** Claude Code can generate a complete, valid skill from a natural language description.

### Files to Create

#### `commands/new-skill.md`
```markdown
---
description: Scaffold a new PM skill from a description
---

Create a new PM skill based on the user's description.

## Instructions

1. Parse the skill description to extract:
   - Skill name (kebab-case)
   - Phase (discover/define/develop/deliver/measure/iterate)
   - Core purpose and when to use

2. Create the skill directory structure:
   ```
   skills/{phase}-{name}/
   ├── SKILL.md
   └── references/
       ├── TEMPLATE.md
       └── EXAMPLE.md
   ```

3. Generate SKILL.md using the frontmatter schema from `docs/reference/frontmatter-schema.yaml`

4. Generate TEMPLATE.md with appropriate sections for the artifact type

5. Generate EXAMPLE.md with a realistic, complete example

6. Create matching command file: `commands/{name}.md`

7. After creation, run validation: `bash scripts/validate-commands.sh`

Context from user: $ARGUMENTS
```

#### `scripts/scaffold-skill.sh`
```bash
#!/usr/bin/env bash
# Usage: ./scripts/scaffold-skill.sh <phase> <name>
# Creates skill directory structure with placeholder files

set -euo pipefail

PHASE="${1:?Usage: scaffold-skill.sh <phase> <name>}"
NAME="${2:?Usage: scaffold-skill.sh <phase> <name>}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

SKILL_DIR="$ROOT/skills/${PHASE}-${NAME}"

if [[ -d "$SKILL_DIR" ]]; then
  echo "Error: Skill directory already exists: $SKILL_DIR"
  exit 1
fi

# Validate phase
case "$PHASE" in
  discover|define|develop|deliver|measure|iterate) ;;
  *) echo "Error: Invalid phase. Must be: discover|define|develop|deliver|measure|iterate"; exit 1 ;;
esac

mkdir -p "$SKILL_DIR/references"

# Create SKILL.md placeholder
cat > "$SKILL_DIR/SKILL.md" << EOF
<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->
---
name: ${PHASE}-${NAME}
description: TODO - Add description
phase: ${PHASE}
version: "1.0.0"
updated: $(date +%Y-%m-%d)
license: Apache-2.0
metadata:
  category: TODO
  frameworks: [triple-diamond]
  author: product-on-purpose
---
# ${NAME^}

TODO: Add overview

## When to Use

- TODO

## Instructions

TODO

## Output Format

Use the template in \`references/TEMPLATE.md\` to structure the output.

## Quality Checklist

- [ ] TODO

## Examples

See \`references/EXAMPLE.md\` for a completed example.
EOF

# Create TEMPLATE.md placeholder
cat > "$SKILL_DIR/references/TEMPLATE.md" << EOF
# [Title]

## Overview

## Details

## Next Steps
EOF

# Create EXAMPLE.md placeholder
cat > "$SKILL_DIR/references/EXAMPLE.md" << EOF
# Example: [Title]

> This is an example output from the ${NAME} skill.

## Overview

## Details

## Next Steps
EOF

# Create command file
cat > "$ROOT/commands/${NAME}.md" << EOF
---
description: Create a ${NAME//-/ }
---

Use the \`${PHASE}-${NAME}\` skill to create a ${NAME//-/ }.

Read the skill instructions from \`skills/${PHASE}-${NAME}/SKILL.md\` and follow them.

Use \`skills/${PHASE}-${NAME}/references/TEMPLATE.md\` as the output format.

Context from user: \$ARGUMENTS
EOF

echo "✓ Created skill scaffold at $SKILL_DIR"
echo "✓ Created command at $ROOT/commands/${NAME}.md"
echo ""
echo "Next steps:"
echo "  1. Edit $SKILL_DIR/SKILL.md with full content"
echo "  2. Edit $SKILL_DIR/references/TEMPLATE.md"
echo "  3. Edit $SKILL_DIR/references/EXAMPLE.md"
echo "  4. Run: bash scripts/validate-commands.sh"
```

### Validation

Existing `scripts/validate-commands.sh` already validates the structure. No changes needed.

---

## Phase 2: Automated Documentation Updates

**Goal:** When skills change, README, AGENTS.md, and CHANGELOG update automatically.

### Files to Create/Modify

#### `.github/workflows/sync-docs.yml` (replaces sync-agents-md.yml)
```yaml
name: Sync Documentation

on:
  push:
    branches: [main]
    paths:
      - 'skills/**/*.md'
      - '_bundles/*.md'
      - 'commands/*.md'
  workflow_dispatch:

permissions:
  contents: write

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Generate AGENTS.md
        run: bash scripts/generate-agents-md.sh

      - name: Update README skill count
        run: bash scripts/update-readme-stats.sh

      - name: Check for changes
        id: git-check
        run: |
          git diff --exit-code AGENTS.md README.md || echo "changed=true" >> $GITHUB_OUTPUT

      - name: Commit changes
        if: steps.git-check.outputs.changed == 'true'
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add AGENTS.md README.md
          git commit -m "chore: sync docs with skills inventory"
          git push
```

#### `scripts/generate-agents-md.sh`
Extract the inline script from current `sync-agents-md.yml` into a standalone script for reuse.

#### `scripts/update-readme-stats.sh`
```bash
#!/usr/bin/env bash
# Updates skill count and command count in README.md

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

SKILL_COUNT=$(find "$ROOT/skills" -name "SKILL.md" | wc -l | tr -d ' ')
COMMAND_COUNT=$(find "$ROOT/commands" -name "*.md" | wc -l | tr -d ' ')

# Update stats in README (assumes badges or stats section exists)
sed -i "s/\*\*[0-9]* PM skills\*\*/**${SKILL_COUNT} PM skills**/" "$ROOT/README.md"
sed -i "s/\*\*[0-9]* commands\*\*/**${COMMAND_COUNT} commands**/" "$ROOT/README.md"

echo "✓ Updated README: $SKILL_COUNT skills, $COMMAND_COUNT commands"
```

---

## Phase 3: Automated Versioning and Release

**Goal:** Merge to main → auto-version bump → tag → release with updated CHANGELOG.

### Option A: Release Please (Recommended)

#### `.github/workflows/release-please.yml`
```yaml
name: Release Please

on:
  push:
    branches: [main]

permissions:
  contents: write
  pull-requests: write

jobs:
  release-please:
    runs-on: ubuntu-latest
    outputs:
      release_created: ${{ steps.release.outputs.release_created }}
      tag_name: ${{ steps.release.outputs.tag_name }}
    steps:
      - uses: googleapis/release-please-action@v4
        id: release
        with:
          release-type: simple
          package-name: pm-skills

  build-release:
    needs: release-please
    if: ${{ needs.release-please.outputs.release_created }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Build release artifact
        run: |
          VERSION="${{ needs.release-please.outputs.tag_name }}"
          VERSION="${VERSION#v}"
          ./scripts/build-release.sh "$VERSION"

      - name: Upload to release
        uses: softprops/action-gh-release@v2
        with:
          tag_name: ${{ needs.release-please.outputs.tag_name }}
          files: |
            dist/pm-skills-*.zip
            dist/pm-skills-*.zip.sha256
            dist/manifest.txt

  trigger-mcp-sync:
    needs: [release-please, build-release]
    if: ${{ needs.release-please.outputs.release_created }}
    runs-on: ubuntu-latest
    steps:
      - name: Trigger pm-skills-mcp sync
        uses: peter-evans/repository-dispatch@v3
        with:
          token: ${{ secrets.MCP_REPO_PAT }}
          repository: product-on-purpose/pm-skills-mcp
          event-type: upstream-release
          client-payload: '{"tag": "${{ needs.release-please.outputs.tag_name }}"}'
```

#### `release-please-config.json`
```json
{
  "packages": {
    ".": {
      "release-type": "simple",
      "bump-minor-pre-major": true,
      "bump-patch-for-minor-pre-major": true,
      "include-component-in-tag": false,
      "include-v-in-tag": true
    }
  },
  "changelog-sections": [
    {"type": "feat", "section": "Features"},
    {"type": "fix", "section": "Bug Fixes"},
    {"type": "skill", "section": "New Skills"},
    {"type": "chore", "section": "Maintenance", "hidden": true},
    {"type": "docs", "section": "Documentation"}
  ]
}
```

#### `.release-please-manifest.json`
```json
{
  ".": "2.1.0"
}
```

### Commit Convention

For release-please to work, use conventional commits:

| Commit prefix | Version bump | Example |
|---------------|--------------|---------|
| `feat:` | Minor | `feat: add market-sizing skill` |
| `feat!:` | Major | `feat!: restructure skill format` |
| `fix:` | Patch | `fix: correct template typo` |
| `skill:` | Minor | `skill: add competitive-analysis` |
| `docs:` | None | `docs: update README` |
| `chore:` | None | `chore: update CI` |

---

## Phase 4: Cross-Repository Publishing to pm-skills-mcp

**Goal:** Release in pm-skills triggers automated PR in pm-skills-mcp with transformed skills.

### Files to Create

#### In pm-skills: `scripts/export-mcp-tools.sh`
```bash
#!/usr/bin/env bash
# Exports skills as MCP tool definitions
# Output: JSON array of MCP tool schemas

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "["

first=true
for skill_md in "$ROOT"/skills/*/SKILL.md; do
  skill_dir=$(dirname "$skill_md")
  skill_name=$(basename "$skill_dir")

  # Extract frontmatter
  description=$(sed -n 's/^description: //p' "$skill_md" | head -1)
  phase=$(sed -n 's/^phase: //p' "$skill_md" | head -1)

  # Extract command name (remove phase prefix)
  cmd_name="${skill_name#*-}"

  if [ "$first" = true ]; then
    first=false
  else
    echo ","
  fi

  cat << EOF
  {
    "name": "$cmd_name",
    "description": "$description",
    "source_skill": "$skill_name",
    "phase": "$phase",
    "inputSchema": {
      "type": "object",
      "properties": {
        "context": {
          "type": "string",
          "description": "Context and requirements for the ${cmd_name//-/ }"
        }
      },
      "required": ["context"]
    }
  }
EOF
done

echo "]"
```

#### In pm-skills-mcp: `.github/workflows/sync-upstream.yml`
```yaml
name: Sync from pm-skills

on:
  repository_dispatch:
    types: [upstream-release]
  workflow_dispatch:
    inputs:
      tag:
        description: 'pm-skills release tag to sync'
        required: true
        default: 'latest'

permissions:
  contents: write
  pull-requests: write

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout pm-skills-mcp
        uses: actions/checkout@v4

      - name: Checkout pm-skills
        uses: actions/checkout@v4
        with:
          repository: product-on-purpose/pm-skills
          ref: ${{ github.event.client_payload.tag || inputs.tag }}
          path: upstream

      - name: Transform skills to MCP format
        run: |
          # Run the transformation script
          bash upstream/scripts/export-mcp-tools.sh > src/tools/pm-skills.json

          # Generate TypeScript types if needed
          node scripts/generate-tool-types.js

      - name: Update version reference
        run: |
          TAG="${{ github.event.client_payload.tag || inputs.tag }}"
          echo "PM_SKILLS_VERSION=$TAG" > .pm-skills-version

          # Update package.json if it tracks upstream version
          if [ -f package.json ]; then
            jq --arg v "$TAG" '.pmSkillsVersion = $v' package.json > tmp.json
            mv tmp.json package.json
          fi

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v6
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          commit-message: "feat: sync pm-skills ${{ github.event.client_payload.tag || inputs.tag }}"
          title: "Sync pm-skills ${{ github.event.client_payload.tag || inputs.tag }}"
          body: |
            ## Automated sync from pm-skills

            **Upstream release:** ${{ github.event.client_payload.tag || inputs.tag }}
            **Source:** https://github.com/product-on-purpose/pm-skills/releases/tag/${{ github.event.client_payload.tag || inputs.tag }}

            ### Changes
            - Updated MCP tool definitions from upstream skills
            - Regenerated TypeScript types

            ### Checklist
            - [ ] Review transformed tool schemas
            - [ ] Run tests locally
            - [ ] Verify MCP server starts correctly
          branch: sync/pm-skills-${{ github.event.client_payload.tag || inputs.tag }}
          labels: |
            automated
            sync
```

### Required Secrets

| Secret | Repository | Purpose |
|--------|------------|---------|
| `MCP_REPO_PAT` | pm-skills | Personal Access Token with `repo` scope for pm-skills-mcp |

---

## Implementation Checklist

### Phase 1: Scaffolding (Day 1)
- [ ] Create `commands/new-skill.md`
- [ ] Create `scripts/scaffold-skill.sh`
- [ ] Test with Claude Code: `/new-skill "market sizing skill for the define phase"`

### Phase 2: Doc Automation (Day 1)
- [ ] Extract `scripts/generate-agents-md.sh` from workflow
- [ ] Create `scripts/update-readme-stats.sh`
- [ ] Update `.github/workflows/sync-docs.yml`
- [ ] Test: add dummy skill, merge, verify docs update

### Phase 3: Release Automation (Day 2)
- [ ] Add `release-please-config.json`
- [ ] Add `.release-please-manifest.json`
- [ ] Create `.github/workflows/release-please.yml`
- [ ] Remove or modify existing `release.yml` to avoid conflicts
- [ ] Test: merge with `feat:` commit, verify release PR created

### Phase 4: Cross-Publish (Day 2-3)
- [ ] Create `scripts/export-mcp-tools.sh`
- [ ] Create GitHub App or PAT for cross-repo access
- [ ] Add `MCP_REPO_PAT` secret to pm-skills
- [ ] Create `.github/workflows/sync-upstream.yml` in pm-skills-mcp
- [ ] Test: trigger release, verify PR in pm-skills-mcp

---

## End-to-End Flow

```
You: "Create a market sizing skill for the define phase that helps
      PMs estimate TAM/SAM/SOM for new product opportunities"
                    │
                    ▼
┌──────────────────────────────────────────────────────────────────┐
│ Claude Code                                                       │
│ 1. Runs /new-skill or scaffold script                            │
│ 2. Generates SKILL.md, TEMPLATE.md, EXAMPLE.md                   │
│ 3. Creates command file                                          │
│ 4. Runs validation                                               │
│ 5. Commits with "feat: add market-sizing skill"                  │
│ 6. Opens PR                                                      │
└──────────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────────────┐
│ CI: Validation Workflow                                           │
│ • Validates command references                                   │
│ • Lints frontmatter                                              │
│ • ✓ All checks pass                                              │
└──────────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────────────┐
│ You: Review & Approve PR                                          │
│ (Human gate - the one manual step)                               │
└──────────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────────────┐
│ CI: Release Please                                                │
│ 1. Detects "feat:" commit                                        │
│ 2. Bumps minor version (2.1.0 → 2.2.0)                          │
│ 3. Updates CHANGELOG.md                                          │
│ 4. Creates release PR                                            │
└──────────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────────────┐
│ CI: Sync Docs                                                     │
│ • Regenerates AGENTS.md                                          │
│ • Updates README stats                                           │
│ • Auto-commits                                                   │
└──────────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────────────┐
│ You: Merge Release PR                                             │
│ (Or auto-merge if configured)                                    │
└──────────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────────────┐
│ CI: Build & Publish Release                                       │
│ 1. Creates git tag v2.2.0                                        │
│ 2. Builds release zip                                            │
│ 3. Publishes GitHub Release                                      │
│ 4. Dispatches event to pm-skills-mcp                             │
└──────────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────────────┐
│ CI: pm-skills-mcp Sync                                            │
│ 1. Receives dispatch event                                       │
│ 2. Checks out pm-skills@v2.2.0                                   │
│ 3. Transforms skills → MCP tool schemas                          │
│ 4. Opens PR in pm-skills-mcp                                     │
└──────────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌──────────────────────────────────────────────────────────────────┐
│ You: Review & Merge MCP PR                                        │
│ (Or auto-merge if tests pass)                                    │
└──────────────────────────────────────────────────────────────────┘
```

---

## Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Bad skill merged to main | CI validation + required PR review |
| Release-please creates bad version | Release PR requires approval before merge |
| Cross-repo sync breaks MCP | MCP repo has its own CI; sync creates PR, not direct push |
| PAT expires/revoked | Use GitHub App instead of PAT for longer-term solution |
| Conventional commit not followed | Add commitlint to PR checks |

---

## Future Enhancements

1. **Auto-merge release PRs** — If all checks pass, merge without human intervention
2. **Skill quality scoring** — CI rates skill completeness (has example? template? etc.)
3. **Preview environments** — PR creates preview of skill in action
4. **Slack/Discord notifications** — Alert on new skill releases
5. **npm/PyPI publish** — Publish MCP server package automatically
