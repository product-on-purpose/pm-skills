// hooks/lib/local-config.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  readLocalConfig, isGuardrailEnabled, enabledChecks, isPhaseRouterEnabled,
  memoryPhase, activeInitiative, isAutoAppendEnabled,
} from './local-config.mjs';

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

// --- Project memory (B1 / F-48) -------------------------------------------

test('memoryPhase reads a declared phase from project memory', () => {
  const root = projectWith('---\nschema: 1\nphase: measure\n---\n');
  assert.equal(memoryPhase(readLocalConfig(root)), 'measure');
  rmSync(root, { recursive: true, force: true });
});

test('memoryPhase is case-insensitive and trims', () => {
  const root = projectWith('---\nschema: 1\nphase:   Deliver  \n---\n');
  assert.equal(memoryPhase(readLocalConfig(root)), 'deliver');
  rmSync(root, { recursive: true, force: true });
});

test('memoryPhase rejects a value that is not a Triple Diamond phase', () => {
  // A typo must not make the router announce a phase that does not exist.
  const root = projectWith('---\nschema: 1\nphase: delivery\n---\n');
  assert.equal(memoryPhase(readLocalConfig(root)), null);
  rmSync(root, { recursive: true, force: true });
});

test('memoryPhase is null when the key is absent or the file is missing', () => {
  const withFile = projectWith('---\nschema: 1\n---\n');
  assert.equal(memoryPhase(readLocalConfig(withFile)), null);
  rmSync(withFile, { recursive: true, force: true });
  const noFile = projectWith(null);
  assert.equal(memoryPhase(readLocalConfig(noFile)), null);
  rmSync(noFile, { recursive: true, force: true });
});

test('activeInitiative reads a quoted initiative and collapses whitespace', () => {
  const root = projectWith('---\nschema: 1\nactive_initiative: "Self-serve onboarding"\n---\n');
  assert.equal(activeInitiative(readLocalConfig(root)), 'Self-serve onboarding');
  rmSync(root, { recursive: true, force: true });
});

test('activeInitiative treats the documented `null` literal as unset', () => {
  const root = projectWith('---\nschema: 1\nactive_initiative: null\n---\n');
  assert.equal(activeInitiative(readLocalConfig(root)), null);
  rmSync(root, { recursive: true, force: true });
});

test('activeInitiative caps a runaway value so it cannot bloat every session', () => {
  const root = projectWith('---\nschema: 1\nactive_initiative: "' + 'x'.repeat(400) + '"\n---\n');
  const got = activeInitiative(readLocalConfig(root));
  assert.equal(got.length, 120);
  assert.ok(got.endsWith('...'));
  rmSync(root, { recursive: true, force: true });
});

test('auto-append fails CLOSED: off unless explicitly true', () => {
  // Deliberate asymmetry with the router, which fails open. This one writes to
  // the user's project, so anything short of an explicit opt-in stays off.
  for (const val of ['false', 'yes', '1', 'TRUE', 'maybe']) {
    const root = projectWith('---\nschema: 1\nmemory_auto_append: ' + val + '\n---\n');
    assert.equal(isAutoAppendEnabled(readLocalConfig(root)), false, 'value: ' + val);
    rmSync(root, { recursive: true, force: true });
  }
  const unset = projectWith('---\nschema: 1\n---\n');
  assert.equal(isAutoAppendEnabled(readLocalConfig(unset)), false);
  rmSync(unset, { recursive: true, force: true });
});

test('auto-append turns on for exactly `true`', () => {
  const root = projectWith('---\nschema: 1\nmemory_auto_append: true\n---\n');
  assert.equal(isAutoAppendEnabled(readLocalConfig(root)), true);
  rmSync(root, { recursive: true, force: true });
});

test('memory keys do not disturb the shipped guardrail and router keys', () => {
  const root = projectWith(
    '---\nschema: 1\nphase: iterate\nmemory_auto_append: true\n' +
    'guardrails: true\nguardrail_checks: ["em-dash"]\nphase_router: off\n---\n'
  );
  const cfg = readLocalConfig(root);
  assert.equal(isGuardrailEnabled(cfg), true);
  assert.deepEqual(enabledChecks(cfg), ['em-dash']);
  assert.equal(isPhaseRouterEnabled(cfg), false);
  assert.equal(memoryPhase(cfg), 'iterate');
  rmSync(root, { recursive: true, force: true });
});
