# GitHub Issues Creation Workflow Guide

This guide explains how to use the automated workflow that creates GitHub issues from markdown drafts.

## Overview

The workflow automates the process of:
1. Creating GitHub issues from markdown files in `.github/issues-drafts/`
2. Tracking which drafts have been processed in `.github/.created-issues.json`
3. Updating the planning document with issue numbers and links
4. Archiving processed draft files to `.github/issues-archive/`

## Quick Start

### Running the Workflow

1. **Navigate to Actions:** Go to https://github.com/product-on-purpose/pm-skills/actions
2. **Select workflow:** Click "Create Issues from Drafts"
3. **Run workflow:** Click "Run workflow" button
4. **Choose mode:**
   - **Dry Run (default):** Preview what would happen without creating issues
   - **Live Mode:** Uncheck "Dry run mode" to actually create issues

### First-Time Setup

No setup required! The workflow will automatically:
- Create the `.github/.created-issues.json` tracking file if it doesn't exist
- Create the `.github/issues-archive/` directory if needed
- Install necessary Node.js dependencies

## How It Works

### 1. Draft File Format

Each draft file must be a markdown file with YAML frontmatter:

\`\`\`markdown
---
title: 'Your Issue Title'
labels: label1, label2, label3
assignees: username
---

## Your Issue Body

Content goes here in markdown format.
\`\`\`

**Frontmatter Fields:**
- \`title:\` (required) - The GitHub issue title
- \`labels:\` (optional) - Comma-separated labels or array
- \`assignees:\` (optional) - Comma-separated usernames or array (defaults to 'jprisant')

**Alternative Frontmatter Fields:**
- \`name:\` can be used instead of \`title:\`
- If no \`title:\` or \`name:\` is provided, defaults to "Untitled Issue"

### 2. File Naming Convention

Draft files should follow this pattern:
\`\`\`
[number]-[owner]-[repo-name].md
\`\`\`

Examples:
- \`01-travisvn-awesome-claude-skills.md\` → travisvn/awesome-claude-skills
- \`05-prakashsellathurai-awesome-product-management.md\` → prakashsellathurai/Awesome-Product-Management

The number prefix helps match the file to the correct section in the planning document.

### 3. Excluded Files

The following files are automatically excluded from processing:
- \`README.md\`
- \`TRACKER.md\`
- \`QUICK-REFERENCE.md\`
- \`WORKFLOW-GUIDE.md\`

### 4. State Tracking

The workflow maintains state in \`.github/.created-issues.json\`:

\`\`\`json
{
  "01-travisvn-awesome-claude-skills.md": {
    "issueNumber": 42,
    "issueUrl": "https://github.com/product-on-purpose/pm-skills/issues/42",
    "createdAt": "2026-01-20T12:34:56.789Z"
  }
}
\`\`\`

This ensures **idempotency** - files are only processed once, even if you run the workflow multiple times.

### 5. Planning Document Updates

The workflow automatically updates \`docs/internal/awesome-lists-submission-package_planning.md\`:

**Before:**
\`\`\`markdown
- [ ] **01 - travisvn/awesome-claude-skills**
  ...
  **GitHub Issue:** _Create issue here_
\`\`\`

**After:**
\`\`\`markdown
- [ ] **01 - travisvn/awesome-claude-skills**
  ...
  **GitHub Issue:** #42
\`\`\`

### 6. File Archival

After successful issue creation, draft files are moved to \`.github/issues-archive/\`, keeping the drafts directory clean for future batches.

## Adding New Issue Drafts

To create new issue drafts for future batches:

1. **Create a markdown file** in \`.github/issues-drafts/\`
2. **Follow the naming convention:** \`[number]-[owner]-[repo].md\`
3. **Add YAML frontmatter** with title, labels, and assignees
4. **Write the issue body** in markdown below the frontmatter
5. **Run the workflow** to create the issue

### Example Draft File

\`\`\`markdown
---
title: 'Submit to example-org/awesome-list'
labels: distribution, awesome-list
assignees: jprisant
---

## Repository Information

**Repository:** example-org/awesome-list
**URL:** https://github.com/example-org/awesome-list
**Category/Focus:** Description of the list

## Submission Details

### Target Audience
Who uses this list?

### Positioning/Pitch
How should pm-skills be positioned for this audience?

### Relevant Section
Where should it be added in their list?

## Checklist

- [ ] Research repository
- [ ] Submit PR
- [ ] Track status
\`\`\`

## Workflow Modes

### Dry Run Mode (Default)

Safe preview mode that shows what would happen:
- ✓ Parses all draft files
- ✓ Validates frontmatter
- ✓ Shows what issues would be created
- ✗ Does NOT create actual issues
- ✗ Does NOT update tracking file
- ✗ Does NOT update planning document
- ✗ Does NOT archive files

**Use for:**
- Testing new draft files
- Validating frontmatter format
- Previewing before committing

### Live Mode

Actually creates issues and processes files:
- ✓ Creates GitHub issues
- ✓ Updates tracking file
- ✓ Updates planning document
- ✓ Archives processed files
- ✓ Commits changes back to repository

**Use for:**
- Processing actual batches
- Production issue creation

## Workflow Outputs

The workflow provides detailed console output:

\`\`\`
==========================================================
GitHub Issues Creation from Drafts
==========================================================
Mode: DRY RUN (preview only)
Repository: product-on-purpose/pm-skills
==========================================================

Loaded tracking data: 0 files already processed

Found 18 draft files to process

Files to process (excluding already tracked): 18

Processing: 01-travisvn-awesome-claude-skills.md
------------------------------------------------------------
  Title: Submit to travisvn/awesome-claude-skills
  Labels: distribution, awesome-list, claude-skills
  Assignees: jprisant
  Body length: 2847 characters
  [DRY RUN] Would create issue and archive file

...

==========================================================
SUMMARY
==========================================================
Total files processed: 18
Successful: 18
Failed: 0
==========================================================
✓ Process completed successfully
==========================================================
\`\`\`

## Troubleshooting

### Issue: "File already processed"

**Cause:** File exists in \`.github/.created-issues.json\`

**Solutions:**
- If the issue wasn't actually created, manually edit \`.created-issues.json\` to remove the entry
- If you want to recreate the issue, remove it from GitHub first, then remove from tracking file

### Issue: "Could not find matching section in planning doc"

**Cause:** File naming doesn't match planning document structure

**Solutions:**
- Check that the number prefix matches the section number in the planning doc
- Verify the repository name extraction is correct
- Manually update the planning doc if the automatic matching fails

### Issue: "Invalid YAML frontmatter"

**Cause:** Frontmatter is malformed

**Solutions:**
- Ensure frontmatter starts and ends with \`---\`
- Check YAML syntax (proper spacing, quotes, etc.)
- Use a YAML validator to check format

### Issue: "GitHub API rate limit"

**Cause:** Too many API calls in a short time

**Solutions:**
- Wait for the rate limit to reset (typically 1 hour)
- Process files in smaller batches

## Security & Permissions

The workflow requires:
- \`contents: write\` - To commit tracking file and archive changes
- \`issues: write\` - To create GitHub issues

The workflow uses \`GITHUB_TOKEN\` which is automatically provided by GitHub Actions.

## Best Practices

1. **Always test in dry-run mode first** before live processing
2. **Review frontmatter carefully** to ensure proper labels and assignees
3. **Use meaningful issue titles** that clearly describe the submission
4. **Keep draft files organized** with consistent naming
5. **Monitor the workflow runs** to catch any errors early
6. **Update planning doc manually** if automatic updates fail

## Future Enhancements

Potential improvements:
- Trigger on push to \`issues-drafts/\` directory
- Add validation for required frontmatter fields
- Support for issue templates
- Batch processing limits
- Custom assignee defaults per file pattern

## Questions?

For issues or questions:
1. Check the workflow run logs in GitHub Actions
2. Review this guide for troubleshooting tips
3. Open a discussion in the repository
4. Contact the maintainer

---

**Last Updated:** 2026-01-20
