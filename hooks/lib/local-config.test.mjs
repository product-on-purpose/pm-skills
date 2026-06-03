// hooks/lib/local-config.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readLocalConfig, isGuardrailEnabled, enabledChecks } from './local-config.mjs';

function projectWith(localMd) {
  const root = mkdtempSync(join(tmpdir(), 'pmcfg-'));
  if (localMd !== null) {
    mkdirSync(join(root, '.claude'), { recursive: true });
    writeFileSync(join(root, '.claude', 'pm-skills.local.md'), localMd, 'utf8');
  }
  return root;
}

test('absent file returns {}', () => {
  const root = projectWith(null);
  assert.deepEqual(readLocalConfig(root), {});
  rmSync(root, { recursive: true, force: true });
});

test('malformed file returns {} (no throw)', () => {
  const root = projectWith('not even frontmatter');
  assert.deepEqual(readLocalConfig(root), {});
  rmSync(root, { recursive: true, force: true });
});

test('guardrails true is read', () => {
  const root = projectWith('---\nguardrails: true\n---\n');
  const cfg = readLocalConfig(root);
  assert.equal(isGuardrailEnabled(cfg), true);
  rmSync(root, { recursive: true, force: true });
});

test('enabledChecks defaults to [em-dash] when guardrails on and no list', () => {
  const root = projectWith('---\nguardrails: true\n---\n');
  assert.deepEqual(enabledChecks(readLocalConfig(root)), ['em-dash']);
  rmSync(root, { recursive: true, force: true });
});

test('enabledChecks honors an explicit list', () => {
  const root = projectWith('---\nguardrails: true\nguardrail_checks: [em-dash, placeholder]\n---\n');
  assert.deepEqual(enabledChecks(readLocalConfig(root)), ['em-dash', 'placeholder']);
  rmSync(root, { recursive: true, force: true });
});
