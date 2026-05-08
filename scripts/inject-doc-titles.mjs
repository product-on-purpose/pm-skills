#!/usr/bin/env node
// W3: Inject `title:` frontmatter into docs/**/*.md files that lack it.
//
// Parser-aware: handles both files with existing FM block (no title) and files without
// FM at all. Avoids the spike's regex bug where `(?ms)^---\r?\n` matched both opening
// AND closing frontmatter fences.
//
// Title derivation strategy (per W3 plan):
//   1. README.md or index.md -> derive from parent directory name
//   2. Release_v<version>.md -> "v<version>"
//   3. Other -> Title Case from kebab-case filename, with acronym table
//
// Acronym table is intentionally narrow: only 4-letter-or-shorter acronyms that are
// universally recognized in pm-skills context. Edge cases get a manual pass after
// the script run.

import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, basename, dirname, extname } from 'node:path';

// W3 scope: docs/ (excluding internal/ + templates/) is the primary target.
// W3 sub-fix: _workflows/ sources also need title: so the workflow generator
// preserves title in its output (docs/workflows/*.md is otherwise overwritten
// on regen since the generator is content-source-of-truth).
const ROOTS = [
  { path: './docs', excludeDirs: new Set(['internal', 'templates']) },
  { path: './_workflows', excludeDirs: new Set() },
];

// Acronyms that should stay all-caps (context: pm-skills domain)
const ACRONYMS = new Set([
  'pm', 'mcp', 'jtbd', 'okr', 'okrs', 'kr', 'krs', 'adr', 'rfc', 'prd',
  'ai', 'api', 'cli', 'ci', 'cd', 'ux', 'ui', 'kpi', 'kpis', 'roi', 'jp',
]);

// Words to keep lowercase in middle of title
const LOWERCASE_WORDS = new Set([
  'a', 'an', 'and', 'as', 'at', 'but', 'by', 'for', 'in', 'of', 'on',
  'or', 'the', 'to', 'vs', 'via', 'with',
]);

function walkMarkdown(dir, excludeDirs) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (excludeDirs.has(entry.name)) continue;
      out.push(...walkMarkdown(full, excludeDirs));
    } else if (entry.isFile() && extname(entry.name) === '.md') {
      out.push(full);
    }
  }
  return out;
}

function analyzeFrontmatter(content) {
  const lines = content.split(/\r?\n/);
  if (lines[0] !== '---') {
    return { hasFM: false, hasTitle: false };
  }
  let closingIdx = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') {
      closingIdx = i;
      break;
    }
  }
  if (closingIdx === -1) {
    return { hasFM: false, hasTitle: false };
  }
  const fmLines = lines.slice(1, closingIdx);
  const hasTitle = fmLines.some((line) => /^title\s*:/.test(line));
  return { hasFM: true, hasTitle };
}

function smartTitleCase(s) {
  const words = s.replace(/[-_]/g, ' ').split(/\s+/).filter(Boolean);
  return words
    .map((word, i) => {
      const lower = word.toLowerCase();
      if (ACRONYMS.has(lower)) return lower.toUpperCase();
      if (i > 0 && i < words.length - 1 && LOWERCASE_WORDS.has(lower)) return lower;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

function deriveTitle(filePath) {
  const name = basename(filePath, '.md');
  const parent = basename(dirname(filePath));

  if (name === 'README' || name === 'index') {
    if (parent === 'docs') return 'pm-skills';
    return smartTitleCase(parent);
  }

  const releaseMatch = name.match(/^Release_v([0-9].*)$/);
  if (releaseMatch) {
    return 'v' + releaseMatch[1];
  }

  if (name === 'changelog' || name === 'CHANGELOG') return 'Changelog';

  return smartTitleCase(name);
}

function detectLineEnding(content) {
  return content.includes('\r\n') ? '\r\n' : '\n';
}

function injectTitleIntoFM(content, title) {
  const eol = detectLineEnding(content);
  const lines = content.split(/\r?\n/);
  lines.splice(1, 0, `title: ${title}`);
  return lines.join(eol);
}

function addFMBlock(content, title) {
  const eol = detectLineEnding(content);
  return `---${eol}title: ${title}${eol}---${eol}${eol}${content}`;
}

function main() {
  const log = [];

  for (const root of ROOTS) {
    const files = walkMarkdown(root.path, root.excludeDirs);
    for (const file of files) {
      const content = readFileSync(file, 'utf8');
      const { hasFM, hasTitle } = analyzeFrontmatter(content);
      if (hasTitle) continue;

      const title = deriveTitle(file);
      const newContent = hasFM
        ? injectTitleIntoFM(content, title)
        : addFMBlock(content, title);

      writeFileSync(file, newContent, 'utf8');
      log.push({ file, title, mode: hasFM ? 'inject' : 'add' });
    }
  }

  console.log(`Modified ${log.length} files:\n`);
  for (const entry of log) {
    console.log(`  [${entry.mode}] ${entry.file} -> "${entry.title}"`);
  }

  if (log.length === 0) {
    console.log('All in-scope files already have title: frontmatter.');
  }
}

main();
