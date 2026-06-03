// hooks/lib/frontmatter.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitFrontmatter, getField, getList } from './frontmatter.mjs';

test('splitFrontmatter returns the block between leading --- fences', () => {
  const body = '---\nname: foo\nphase: deliver\n---\n# Heading\n';
  assert.equal(splitFrontmatter(body), 'name: foo\nphase: deliver');
});

test('splitFrontmatter returns empty string when no frontmatter', () => {
  assert.equal(splitFrontmatter('# no frontmatter\n'), '');
});

test('getField reads a scalar', () => {
  assert.equal(getField('name: foo\nphase: deliver', 'phase'), 'deliver');
});

test('getField returns null when absent', () => {
  assert.equal(getField('name: foo', 'phase'), null);
});

test('getField strips surrounding quotes', () => {
  assert.equal(getField('version: "1.0.0"', 'version'), '1.0.0');
});

test('getList parses an inline array', () => {
  assert.deepEqual(getList('guardrail_checks: [em-dash, placeholder]', 'guardrail_checks'), ['em-dash', 'placeholder']);
});

test('getList returns [] when absent', () => {
  assert.deepEqual(getList('guardrails: true', 'guardrail_checks'), []);
});

test('getList strips quotes on items (quoted-array YAML style)', () => {
  assert.deepEqual(getList('guardrail_checks: ["em-dash", "placeholder"]', 'guardrail_checks'), ['em-dash', 'placeholder']);
  assert.deepEqual(getList("guardrail_checks: ['em-dash']", 'guardrail_checks'), ['em-dash']);
});
