#!/usr/bin/env node
// Validates that each input file's YAML frontmatter parses with js-yaml.
// Reads file paths from argv. Files without frontmatter are skipped (not failed).
// This catches the unquoted-colon-in-value defect class that github's frontmatter
// renderer rejects (the byte-0 lint check is structural; this is parse-validity).
import { readFileSync } from 'node:fs';
import yaml from 'js-yaml';

const files = process.argv.slice(2);
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
