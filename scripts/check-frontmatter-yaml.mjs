#!/usr/bin/env node
// Validates that each input file's YAML frontmatter parses with js-yaml.
// Reads file paths from argv. Files without frontmatter are skipped (not failed).
// This catches the unquoted-colon-in-value defect class that github's frontmatter
// renderer rejects (the byte-0 lint check is structural; this is parse-validity).
//
// Pass `--site-docs` to also scan the tracked hand-authored Astro doc bodies
// (`git ls-files site/src/content/docs`, .md/.mdx). Generated content is
// gitignored, so it is excluded automatically. This catches the same defect in
// site pages, which otherwise only surfaces as a cryptic Astro build crash.
import { readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import yaml from 'js-yaml';

const files = process.argv.slice(2).filter((a) => a !== '--site-docs');
if (process.argv.includes('--site-docs')) {
  try {
    const tracked = execSync('git ls-files site/src/content/docs', { encoding: 'utf8' })
      .split('\n')
      .filter((f) => /\.(md|mdx)$/i.test(f));
    files.push(...tracked);
  } catch (err) {
    console.log(`x --site-docs : could not list site docs - ${String(err.message || err).split('\n')[0]}`);
    process.exit(1);
  }
}
const failures = [];

for (const file of files) {
  let content;
  try {
    content = readFileSync(file, 'utf8');
  } catch (err) {
    failures.push(`${file} : cannot read - ${err.message}`);
    continue;
  }
  const m = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!m) continue;
  try {
    yaml.load(m[1]);
  } catch (err) {
    const msg = String(err.message || err).split('\n')[0];
    failures.push(`${file} : YAML parse error - ${msg}`);
  }
}

if (failures.length > 0) {
  for (const f of failures) console.log(`x ${f}`);
  process.exit(1);
}
process.exit(0);
