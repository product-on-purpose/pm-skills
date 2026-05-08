#!/usr/bin/env node
// W3.5 sweep: byte-0 frontmatter placement + title/description schema enhancement.
//
// Scope per spec_frontmatter-correction.md and Q1-Q5 outcomes:
//   - 100 broken library samples in library/skill-output-samples/**/sample_*.md
//     (line 1 = HTML comment, line 2 = ---; the bug pattern from v2.13.1 audit)
//   - 2 OKR EXAMPLE.md files (Q4 Option C: full schema treatment per Q2 Option A)
//
// Q1 Option A: comment immediately after closing --- fence, no blank line.
// Q2 Option A: bundle title + description; populate both.
// Q3 Option A: keep context: alongside description: with distinct semantics.
//
// Idempotent: re-running on already-correct files is a no-op.
// Deterministic: no LLM-authored per-file edits; all transforms are mechanical.

import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const ATTRIBUTION = '<!-- PM-Skills | https://github.com/product-on-purpose/pm-skills | Apache 2.0 -->';

function findMarkdown(dir, predicate) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...findMarkdown(full, predicate));
    } else if (entry.isFile() && predicate(full)) {
      out.push(full);
    }
  }
  return out;
}

function detectLineEnding(content) {
  return content.includes('\r\n') ? '\r\n' : '\n';
}

// Acronyms that should stay all-caps in derived titles. Narrow set: only
// 4-letter-or-shorter strings that are universally recognized in pm-skills
// domain. Adding more risks false positives on regular words.
const ACRONYMS = new Set([
  'pm', 'mcp', 'jtbd', 'okr', 'kr', 'adr', 'rfc', 'prd',
  'ai', 'api', 'cli', 'ci', 'cd', 'ux', 'ui', 'kpi', 'roi',
]);

function titleCase(s) {
  return s
    .replace(/[-_]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => {
      const lower = w.toLowerCase();
      if (ACRONYMS.has(lower)) return lower.toUpperCase();
      return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase();
    })
    .join(' ');
}

function escapeForYamlDoubleQuote(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function deriveTitle(filePath) {
  const norm = filePath.replace(/\\/g, '/');

  // Library sample: library/skill-output-samples/<skill>/sample_<skill>_<thread>_<scenario>.md
  const libMatch = norm.match(/library\/skill-output-samples\/([^/]+)\/sample_(.+)\.md$/);
  if (libMatch) {
    const skillDir = libMatch[1];
    const fileBase = libMatch[2];
    // Strip the skill-dir prefix from the filename's middle part
    const stripped = fileBase.startsWith(skillDir + '_')
      ? fileBase.slice(skillDir.length + 1)
      : fileBase;
    const parts = stripped.split('_');
    const thread = parts[0] || 'general';
    const scenarioParts = parts.slice(1);
    const scenario = scenarioParts.length ? scenarioParts.join('-') : 'sample';
    return `${titleCase(skillDir)}: ${titleCase(thread)} ${titleCase(scenario)}`;
  }

  // OKR EXAMPLE.md: skills/<skill>/references/EXAMPLE.md
  const exMatch = norm.match(/skills\/([^/]+)\/references\/EXAMPLE\.md$/);
  if (exMatch) {
    return `${titleCase(exMatch[1])}: Canonical Example`;
  }

  return titleCase(basename(filePath, '.md'));
}

function deriveDescription(contextValue) {
  if (!contextValue) return null;
  let desc = contextValue.trim();
  // Strip surrounding quotes if any
  desc = desc.replace(/^["']|["']$/g, '');
  // Replace " . " separator (some samples use period as separator) with " - "
  desc = desc.replace(/\s+\.\s+/g, ' - ');
  // Capitalize first letter
  desc = desc.charAt(0).toUpperCase() + desc.slice(1);
  // Ensure ending punctuation
  if (!/[.!?]$/.test(desc)) desc += '.';
  return desc;
}

function processFile(filePath) {
  const content = readFileSync(filePath, 'utf8');
  const eol = detectLineEnding(content);
  const lines = content.split(/\r?\n/);

  let fmStartIdx, fmEndIdx;
  let hadComment;

  // Detect bug pattern: HTML comment on line 1, --- on line 2
  if (
    lines[0] &&
    lines[0].trimStart().startsWith('<!--') &&
    lines[0].trimEnd().endsWith('-->') &&
    lines[1] !== undefined &&
    lines[1].trim() === '---'
  ) {
    hadComment = true;
    fmStartIdx = 1;
  } else if (lines[0] !== undefined && lines[0].trim() === '---') {
    hadComment = false;
    fmStartIdx = 0;
  } else {
    return { skipped: true, reason: 'unknown frontmatter pattern', file: filePath };
  }

  // Find closing --- fence
  fmEndIdx = -1;
  for (let i = fmStartIdx + 1; i < lines.length; i++) {
    if (lines[i].trim() === '---') {
      fmEndIdx = i;
      break;
    }
  }
  if (fmEndIdx === -1) {
    return { skipped: true, reason: 'no closing --- fence', file: filePath };
  }

  const fmLines = lines.slice(fmStartIdx + 1, fmEndIdx);
  const hasTitle = fmLines.some((l) => /^title\s*:/.test(l));
  const hasDesc = fmLines.some((l) => /^description\s*:/.test(l));

  // Idempotent: if already byte-0 correct AND has both schema fields, no-op
  if (!hadComment && hasTitle && hasDesc) {
    return { skipped: true, reason: 'already correct', file: filePath };
  }

  // Extract context: value for description derivation
  let contextValue = null;
  for (const fmLine of fmLines) {
    const m = fmLine.match(/^context\s*:\s*(.*)$/);
    if (m) {
      contextValue = m[1];
      break;
    }
  }

  // Build new FM body: prepend title + description (if missing) before existing fields
  const newFmLines = [];
  if (!hasTitle) {
    const title = deriveTitle(filePath);
    newFmLines.push(`title: "${escapeForYamlDoubleQuote(title)}"`);
  }
  if (!hasDesc) {
    const desc = deriveDescription(contextValue);
    if (desc) {
      newFmLines.push(`description: "${escapeForYamlDoubleQuote(desc)}"`);
    }
  }
  newFmLines.push(...fmLines);

  // Body content (everything after closing --- fence)
  const bodyLines = lines.slice(fmEndIdx + 1);

  // Strip a leading blank line in body content if present (the attribution comment
  // immediately after closing --- pushes the body down by one line; we don't want
  // a duplicate blank line introduced)
  if (bodyLines[0] === '') {
    bodyLines.shift();
  }

  // Compose new file: opening ---, FM body, closing ---, attribution, body
  const newContent = [
    '---',
    ...newFmLines,
    '---',
    ATTRIBUTION,
    '',
    ...bodyLines,
  ].join(eol);

  writeFileSync(filePath, newContent, 'utf8');
  return {
    changed: true,
    addedTitle: !hasTitle,
    addedDesc: !hasDesc,
    fixedPlacement: hadComment,
    file: filePath,
  };
}

function main() {
  // Library samples: filter to broken-only (line 1 = HTML comment)
  const allSamples = findMarkdown(
    'library/skill-output-samples',
    (f) => f.endsWith('.md') && basename(f).startsWith('sample_'),
  );
  const brokenSamples = allSamples.filter((f) => {
    const first = readFileSync(f, 'utf8').split(/\r?\n/)[0] || '';
    return first.trimStart().startsWith('<!--');
  });

  // 2 OKR EXAMPLE.md files (Q4 Option C: full schema treatment)
  const okrExamples = [
    'skills/measure-okr-grader/references/EXAMPLE.md',
    'skills/foundation-okr-writer/references/EXAMPLE.md',
  ];

  const targets = [...brokenSamples, ...okrExamples];

  console.log(`Sweep scope: ${targets.length} files`);
  console.log(`  Broken library samples: ${brokenSamples.length}`);
  console.log(`  OKR EXAMPLE.md files: ${okrExamples.length}`);
  console.log(`  (${allSamples.length - brokenSamples.length} byte-0-correct samples skipped per spec scope)`);
  console.log('');

  let changed = 0;
  let skipped = 0;
  const log = [];

  for (const file of targets) {
    const result = processFile(file);
    if (result.skipped) {
      skipped++;
      log.push(`  SKIP ${result.file}: ${result.reason}`);
    } else if (result.changed) {
      changed++;
      log.push(
        `  FIX  ${result.file} (placement=${result.fixedPlacement}, title+=${result.addedTitle}, desc+=${result.addedDesc})`,
      );
    }
  }

  console.log(log.join('\n'));
  console.log('');
  console.log(`Results: ${changed} changed, ${skipped} skipped, ${targets.length} total processed`);
}

main();
