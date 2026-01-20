#!/usr/bin/env node

import { Octokit } from '@octokit/rest';
import matter from 'gray-matter';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const REPO_ROOT = path.resolve(__dirname, '../..');
const DRAFTS_DIR = path.join(REPO_ROOT, '.github/issues-drafts');
const ARCHIVE_DIR = path.join(REPO_ROOT, '.github/issues-archive');
const TRACKING_FILE = path.join(REPO_ROOT, '.github/.created-issues.json');
const PLANNING_DOC = path.join(REPO_ROOT, 'docs/internal/awesome-lists-submission-package_planning.md');
const EXCLUDED_FILES = ['README.md', 'TRACKER.md', 'QUICK-REFERENCE.md', 'WORKFLOW-GUIDE.md'];
const DEFAULT_ASSIGNEE = 'jprisant';

// Environment variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const DRY_RUN = process.env.DRY_RUN === 'true';
const [owner, repo] = process.env.GITHUB_REPOSITORY?.split('/') || ['product-on-purpose', 'pm-skills'];

// Initialize Octokit
const octokit = new Octokit({ auth: GITHUB_TOKEN });

/**
 * Load existing tracking data
 */
async function loadTracking() {
  try {
    const data = await fs.readFile(TRACKING_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    }
    throw error;
  }
}

/**
 * Save tracking data
 */
async function saveTracking(data) {
  await fs.writeFile(TRACKING_FILE, JSON.stringify(data, null, 2));
}

/**
 * Get all markdown files from drafts directory
 */
async function getDraftFiles() {
  const files = await fs.readdir(DRAFTS_DIR);
  return files.filter(file => 
    file.endsWith('.md') && !EXCLUDED_FILES.includes(file)
  );
}

/**
 * Parse labels from frontmatter
 */
function parseLabels(labelsData) {
  if (!labelsData) return [];
  if (Array.isArray(labelsData)) return labelsData;
  return labelsData.split(',').map(l => l.trim());
}

/**
 * Parse assignees from frontmatter
 */
function parseAssignees(assigneesData) {
  let assignees = [DEFAULT_ASSIGNEE];
  
  if (assigneesData) {
    if (Array.isArray(assigneesData)) {
      assignees = assigneesData.filter(a => a && a.trim());
    } else if (typeof assigneesData === 'string' && assigneesData.trim()) {
      assignees = assigneesData.split(',').map(a => a.trim()).filter(a => a);
    }
  }
  
  // Ensure we always have at least one assignee
  if (assignees.length === 0) {
    assignees = [DEFAULT_ASSIGNEE];
  }
  
  return assignees;
}

/**
 * Parse markdown file with frontmatter
 */
async function parseMarkdownFile(filePath) {
  const content = await fs.readFile(filePath, 'utf-8');
  const { data, content: body } = matter(content);
  
  return {
    title: data.title || data.name || 'Untitled Issue',
    labels: parseLabels(data.labels),
    assignees: parseAssignees(data.assignees),
    body: body.trim()
  };
}

/**
 * Create a GitHub issue
 */
async function createIssue(issueData) {
  const response = await octokit.issues.create({
    owner,
    repo,
    title: issueData.title,
    body: issueData.body,
    labels: issueData.labels,
    assignees: issueData.assignees
  });
  
  return {
    number: response.data.number,
    url: response.data.html_url
  };
}

/**
 * Extract repository name from filename (e.g., "01-travisvn-awesome-claude-skills.md" -> "travisvn/awesome-claude-skills")
 */
function extractRepoNameFromFilename(filename) {
  // Remove number prefix and .md extension
  const match = filename.match(/^\d+-(.+)\.md$/);
  if (!match) return null;
  
  const parts = match[1].split('-');
  if (parts.length < 2) return null;
  
  // First part is the owner, rest is the repo name
  const owner = parts[0];
  const repoName = parts.slice(1).join('-');
  
  return `${owner}/${repoName}`;
}

/**
 * Update planning document with issue numbers
 */
async function updatePlanningDoc(filename, issueNumber, issueUrl) {
  try {
    let content = await fs.readFile(PLANNING_DOC, 'utf-8');
    
    // Extract repo info from filename to find the matching section
    const repoInfo = extractRepoNameFromFilename(filename);
    if (!repoInfo) {
      console.warn(`Could not extract repo info from filename: ${filename}`);
      return;
    }
    
    // Get the number prefix (e.g., "01" from "01-travisvn-awesome-claude-skills.md")
    const numberPrefix = filename.match(/^(\d+)-/)?.[1];
    if (!numberPrefix) {
      console.warn(`Could not extract number prefix from filename: ${filename}`);
      return;
    }
    
    // Find the section header (e.g., "- [ ] **01 - travisvn/awesome-claude-skills**")
    // Match the section and the "GitHub Issue: _Create issue here_" line
    const sectionPattern = new RegExp(
      `(- \\[ \\] \\*\\*${numberPrefix} - [^*]+\\*\\*[\\s\\S]*?)(\\*\\*GitHub Issue:\\*\\* _Create issue here_)`,
      'i'
    );
    
    const match = content.match(sectionPattern);
    if (match) {
      const replacement = `**GitHub Issue:** #${issueNumber}`;
      content = content.replace(sectionPattern, `$1${replacement}`);
      
      await fs.writeFile(PLANNING_DOC, content);
      console.log(`✓ Updated planning doc for ${filename} with issue #${issueNumber}`);
    } else {
      console.warn(`⚠ Could not find matching section in planning doc for: ${filename} (prefix: ${numberPrefix})`);
    }
  } catch (error) {
    console.error(`Error updating planning doc for ${filename}:`, error.message);
  }
}

/**
 * Move file to archive
 */
async function archiveFile(filename) {
  const sourcePath = path.join(DRAFTS_DIR, filename);
  const destPath = path.join(ARCHIVE_DIR, filename);
  
  // Ensure archive directory exists
  await fs.mkdir(ARCHIVE_DIR, { recursive: true });
  
  // Move file
  await fs.rename(sourcePath, destPath);
}

/**
 * Main execution
 */
async function main() {
  console.log('='.repeat(60));
  console.log('GitHub Issues Creation from Drafts');
  console.log('='.repeat(60));
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (preview only)' : 'LIVE (will create issues)'}`);
  console.log(`Repository: ${owner}/${repo}`);
  console.log('='.repeat(60));
  console.log();
  
  try {
    // Load existing tracking data
    const tracking = await loadTracking();
    console.log(`Loaded tracking data: ${Object.keys(tracking).length} files already processed`);
    console.log();
    
    // Get draft files
    const draftFiles = await getDraftFiles();
    console.log(`Found ${draftFiles.length} draft files to process`);
    console.log();
    
    // Filter out already processed files
    const filesToProcess = draftFiles.filter(file => !tracking[file]);
    console.log(`Files to process (excluding already tracked): ${filesToProcess.length}`);
    console.log();
    
    if (filesToProcess.length === 0) {
      console.log('✓ No new files to process. All drafts have already been converted to issues.');
      return;
    }
    
    // Process each file
    const results = [];
    for (const filename of filesToProcess) {
      console.log(`Processing: ${filename}`);
      console.log('-'.repeat(60));
      
      try {
        const filePath = path.join(DRAFTS_DIR, filename);
        const issueData = await parseMarkdownFile(filePath);
        
        console.log(`  Title: ${issueData.title}`);
        console.log(`  Labels: ${issueData.labels.join(', ') || 'none'}`);
        console.log(`  Assignees: ${issueData.assignees.join(', ') || 'jprisant (default)'}`);
        console.log(`  Body length: ${issueData.body.length} characters`);
        
        if (!DRY_RUN) {
          // Create the issue
          const { number, url } = await createIssue(issueData);
          console.log(`  ✓ Created issue #${number}: ${url}`);
          
          // Update tracking
          tracking[filename] = {
            issueNumber: number,
            issueUrl: url,
            createdAt: new Date().toISOString()
          };
          
          // Update planning document
          await updatePlanningDoc(filename, number, url);
          
          // Archive the file
          await archiveFile(filename);
          console.log(`  ✓ Archived ${filename}`);
          
          results.push({
            filename,
            success: true,
            issueNumber: number,
            issueUrl: url
          });
        } else {
          console.log(`  [DRY RUN] Would create issue and archive file`);
          results.push({
            filename,
            success: true,
            dryRun: true
          });
        }
        
        console.log();
      } catch (error) {
        console.error(`  ✗ Error processing ${filename}:`, error.message);
        results.push({
          filename,
          success: false,
          error: error.message
        });
        console.log();
      }
    }
    
    // Save tracking data
    if (!DRY_RUN) {
      await saveTracking(tracking);
      console.log('✓ Saved tracking data');
      console.log();
    }
    
    // Summary
    console.log('='.repeat(60));
    console.log('SUMMARY');
    console.log('='.repeat(60));
    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    console.log(`Total files processed: ${results.length}`);
    console.log(`Successful: ${successful}`);
    console.log(`Failed: ${failed}`);
    
    if (!DRY_RUN && successful > 0) {
      console.log();
      console.log('Created Issues:');
      results.filter(r => r.success && !r.dryRun).forEach(r => {
        console.log(`  - ${r.filename} → Issue #${r.issueNumber} (${r.issueUrl})`);
      });
    }
    
    if (failed > 0) {
      console.log();
      console.log('Failed:');
      results.filter(r => !r.success).forEach(r => {
        console.log(`  - ${r.filename}: ${r.error}`);
      });
      process.exit(1);
    }
    
    console.log();
    console.log('='.repeat(60));
    console.log('✓ Process completed successfully');
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

// Run the script
main();
