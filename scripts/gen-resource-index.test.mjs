// scripts/gen-resource-index.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { parseManifest, toRoute, scenarioLabel, cell, repoLink } from './gen-resource-index.mjs';

test('parseManifest strips index.html and keeps trailing slash', () => {
  const routes = parseManifest('/index.html\n/guides/prompt-gallery/index.html\n/404.html\n\n');
  assert.ok(routes.has('/'));
  assert.ok(routes.has('/guides/prompt-gallery/'));
  assert.ok(routes.has('/404.html'));
  assert.equal(routes.has('/guides/prompt-gallery/index.html'), false);
});

test('toRoute maps doc-relative paths to site routes', () => {
  assert.equal(toRoute('guides/prompt-gallery.md'), '/guides/prompt-gallery/');
  assert.equal(toRoute('guides/index.md'), '/guides/');
  assert.equal(toRoute('index.mdx'), '/');
  assert.equal(toRoute('reference/skill-families/index.md'), '/reference/skill-families/');
});

test('scenarioLabel strips the sample_<skill>_ prefix and humanizes', () => {
  assert.equal(
    scenarioLabel('sample_deliver-prd_storevine_campaigns', 'deliver-prd'),
    'storevine / campaigns',
  );
});

test('cell escapes pipes and collapses newlines', () => {
  assert.equal(cell('a | b\nc'), 'a \\| b c');
});

test('repoLink prefixes ../ and normalizes separators', () => {
  assert.equal(repoLink('skills/deliver-prd/SKILL.md'), '../skills/deliver-prd/SKILL.md');
});
