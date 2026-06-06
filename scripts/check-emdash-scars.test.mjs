// scripts/check-emdash-scars.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findScars } from './check-emdash-scars.mjs';

test('findScars flags a spaced-period scar in prose', () => {
  const hits = findScars('Discover . 3 skills in this phase');
  assert.equal(hits.length, 1);
  assert.equal(hits[0].line, 1);
});

test('findScars ignores normal sentence periods (no leading space)', () => {
  assert.equal(findScars('A sentence. Another one. Done.').length, 0);
});

test('findScars ignores ellipsis', () => {
  assert.equal(findScars('wait ... then continue').length, 0);
});

test('findScars skips fenced code blocks (legitimate periods)', () => {
  const md = ['prose is fine here', '```bash', 'cp -r src/* . # copy to cwd', 'find . -type f', '```', 'more prose'].join('\n');
  assert.equal(findScars(md).length, 0);
});

test('findScars catches a scar outside a fence but not inside', () => {
  const md = ['intro . scarred', '```', 'code . not flagged', '```'].join('\n');
  const hits = findScars(md);
  assert.equal(hits.length, 1);
  assert.equal(hits[0].line, 1);
});
