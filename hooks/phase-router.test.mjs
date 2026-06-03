// hooks/phase-router.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { route } from './phase-router.mjs';

const FIX_SKILLS = join(import.meta.dirname, 'fixtures', 'skills');

test('confident branch signal injects a phase nudge naming a real skill', () => {
  const root = mkdtempSync(join(tmpdir(), 'route-'));
  mkdirSync(join(root, '.git'), { recursive: true });
  writeFileSync(join(root, '.git', 'HEAD'), 'ref: refs/heads/define/x\n');
  const out = route(root, FIX_SKILLS);
  assert.equal(out.hookSpecificOutput.hookEventName, 'SessionStart');
  assert.match(out.hookSpecificOutput.additionalContext, /Define phase/);
  assert.match(out.hookSpecificOutput.additionalContext, /define-x/);
  rmSync(root, { recursive: true, force: true });
});

test('no signal returns null (silent path)', () => {
  const root = mkdtempSync(join(tmpdir(), 'route-'));
  assert.equal(route(root, FIX_SKILLS), null);
  rmSync(root, { recursive: true, force: true });
});
