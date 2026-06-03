// hooks/lib/signals.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { branchPhase, artifactPhase, resolvePhase } from './signals.mjs';

test('branchPhase reads .git/HEAD prefix', () => {
  const root = mkdtempSync(join(tmpdir(), 'sig-'));
  mkdirSync(join(root, '.git'), { recursive: true });
  writeFileSync(join(root, '.git', 'HEAD'), 'ref: refs/heads/discover/users\n');
  assert.equal(branchPhase(root), 'discover');
  rmSync(root, { recursive: true, force: true });
});

test('branchPhase returns null for a non-phase branch', () => {
  const root = mkdtempSync(join(tmpdir(), 'sig-'));
  mkdirSync(join(root, '.git'), { recursive: true });
  writeFileSync(join(root, '.git', 'HEAD'), 'ref: refs/heads/main\n');
  assert.equal(branchPhase(root), null);
  rmSync(root, { recursive: true, force: true });
});

test('artifactPhase maps a PRD-like filename to deliver', () => {
  const root = mkdtempSync(join(tmpdir(), 'sig-'));
  writeFileSync(join(root, 'prd-checkout.md'), '# PRD');
  assert.equal(artifactPhase(root), 'deliver');
  rmSync(root, { recursive: true, force: true });
});

test('resolvePhase prefers a branch signal over artifact', () => {
  assert.equal(resolvePhase('discover', 'deliver'), 'discover');
  assert.equal(resolvePhase(null, 'deliver'), 'deliver');
  assert.equal(resolvePhase(null, null), null);
});
