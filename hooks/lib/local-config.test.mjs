// hooks/lib/local-config.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readLocalConfig, isGuardrailEnabled, enabledChecks, isPhaseRouterEnabled } from './local-config.mjs';

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

test('phase router is on by default (unset key)', () => {
  assert.equal(isPhaseRouterEnabled({}), true);
  const root = projectWith('---\nguardrails: true\n---\n'); // no phase_router key
  assert.equal(isPhaseRouterEnabled(readLocalConfig(root)), true);
  rmSync(root, { recursive: true, force: true });
});

test('phase router is disabled by an explicit off-switch value', () => {
  const off = projectWith('---\nphase_router: off\n---\n');
  assert.equal(isPhaseRouterEnabled(readLocalConfig(off)), false);
  rmSync(off, { recursive: true, force: true });
  for (const v of ['off', 'false', 'no', '0', 'disabled', 'OFF', 'False']) {
    assert.equal(isPhaseRouterEnabled({ phase_router: v }), false, v + ' should disable');
  }
});

test('phase router stays on for auto / verbose / unrecognized values', () => {
  for (const v of ['auto', 'verbose', 'on', 'true', 'yes', 'whatever']) {
    assert.equal(isPhaseRouterEnabled({ phase_router: v }), true, v + ' should keep it on');
  }
  const auto = projectWith('---\nphase_router: auto\n---\n');
  assert.equal(isPhaseRouterEnabled(readLocalConfig(auto)), true);
  rmSync(auto, { recursive: true, force: true });
});

test('isPhaseRouterEnabled fails open on a missing config object', () => {
  assert.equal(isPhaseRouterEnabled(undefined), true);
  assert.equal(isPhaseRouterEnabled(null), true);
});
