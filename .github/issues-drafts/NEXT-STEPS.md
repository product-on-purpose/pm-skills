# Next Steps: Execute the Issue Creation Workflow

## Context

PR #66 has been successfully merged, which created an automated GitHub Actions workflow for creating issues from the 18 markdown draft files in this directory.

## Current State

- ✅ Workflow created: `.github/workflows/create-issues-from-drafts.yml`
- ✅ Script ready: `.github/scripts/create-issues.js`
- ✅ 18 draft files ready to process
- ⏳ **Workflow has not been run yet** - issues not created

## What Needs to Happen Next

### Step 1: Run Workflow in Dry-Run Mode (Recommended First)

1. Navigate to: https://github.com/product-on-purpose/pm-skills/actions
2. Click on "Create Issues from Drafts" workflow
3. Click "Run workflow" button
4. **Leave "Dry run mode" checked** (this is the default)
5. Click the green "Run workflow" button
6. Wait for the workflow to complete
7. Review the workflow logs to verify everything looks correct

**What dry-run does:**
- ✓ Parses all 18 draft files
- ✓ Validates frontmatter
- ✓ Shows what issues would be created
- ✗ Does NOT create actual issues
- ✗ Does NOT update tracking file
- ✗ Does NOT update planning document
- ✗ Does NOT archive files

### Step 2: Run Workflow in Live Mode

Once you've confirmed the dry-run looks good:

1. Navigate to: https://github.com/product-on-purpose/pm-skills/actions
2. Click on "Create Issues from Drafts" workflow
3. Click "Run workflow" button
4. **Uncheck "Dry run mode"**
5. Click the green "Run workflow" button
6. Wait for the workflow to complete (may take 1-2 minutes)

**What live mode does:**
- ✓ Creates 18 GitHub issues (one per draft file)
- ✓ Updates `.github/.created-issues.json` tracking file
- ✓ Updates `docs/internal/awesome-lists-submission-package_planning.md` with issue numbers
- ✓ Archives all 18 draft files to `.github/issues-archive/`
- ✓ Commits changes back to the repository

### Step 3: Verify Results

After the workflow completes, verify:

1. **18 new issues created** in https://github.com/product-on-purpose/pm-skills/issues
   - Each should have appropriate labels (distribution, awesome-list, etc.)
   - Each should be assigned to jprisant
   - Each should have the correct title and body content

2. **Tracking file created**: `.github/.created-issues.json`
   - Should contain 18 entries mapping filenames to issue numbers

3. **Planning document updated**: `docs/internal/awesome-lists-submission-package_planning.md`
   - All sections should now have `**GitHub Issue:** #XX` instead of `_Create issue here_`

4. **Draft files archived**: `.github/issues-archive/`
   - Should contain all 18 `.md` files
   - `.github/issues-drafts/` should only have documentation files (README, TRACKER, QUICK-REFERENCE, WORKFLOW-GUIDE, and this NEXT-STEPS file)

## Expected Issues to be Created

The workflow will create issues for submissions to these awesome lists:

### Claude Skills Lists (4)
1. travisvn/awesome-claude-skills
2. BehiSecc/awesome-claude-skills
3. VoltAgent/awesome-claude-skills
4. karanb192/awesome-claude-skills

### Product Management Lists (4)
5. prakashsellathurai/Awesome-Product-Management
6. hugo53/awesome-ProductManager
7. yuhenobi/awesome-product-manager
8. rajavijayach/awesome-product-management

### AI Agents Lists (5)
9. kyrolabs/awesome-agents
10. e2b-dev/awesome-ai-agents
11. Shubhamsaboo/awesome-llm-apps
12. jamesmurdza/awesome-ai-devtools
13. tensorchord/Awesome-LLMOps

### Prompting Lists (2)
14. f/awesome-chatgpt-prompts
15. Hannibal046/Awesome-LLM

### Work Methods Lists (3)
16. domenicosolazzo/awesome-okr
17. eivindml/awesome-productivity
18. GetStream/awesome-saas-services

## Troubleshooting

If you encounter issues:

1. **Check the workflow logs** in GitHub Actions for error messages
2. **Review the WORKFLOW-GUIDE.md** for detailed troubleshooting
3. **Verify permissions**: The workflow needs `contents: write` and `issues: write`
4. **Check rate limits**: If you hit GitHub API rate limits, wait an hour and try again

## Why I Couldn't Run This Automatically

The GitHub Copilot coding agent environment has security restrictions that prevent direct API calls to GitHub. The workflow must be triggered by a human user through the GitHub Actions UI.

## Questions?

See `.github/issues-drafts/WORKFLOW-GUIDE.md` for complete documentation.

---

**Created:** 2026-01-20  
**Status:** Awaiting workflow execution
