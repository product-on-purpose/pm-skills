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

// Helper: a project root that DOES resolve a phase (define branch), so a null
// result can only come from the opt-out, not from a missing signal.
function rootWithDefineSignal(localMd) {
  const root = mkdtempSync(join(tmpdir(), 'route-'));
  mkdirSync(join(root, '.git'), { recursive: true });
  writeFileSync(join(root, '.git', 'HEAD'), 'ref: refs/heads/define/x\n');
  if (localMd !== null) {
    mkdirSync(join(root, '.claude'), { recursive: true });
    writeFileSync(join(root, '.claude', 'pm-skills.local.md'), localMd, 'utf8');
  }
  return root;
}

test('phase_router: off silences the router even with a resolving signal', () => {
  const root = rootWithDefineSignal('---\nphase_router: off\n---\n');
  assert.equal(route(root, FIX_SKILLS), null);
  rmSync(root, { recursive: true, force: true });
});

test('an injected off config short-circuits before any signal work', () => {
  const root = rootWithDefineSignal(null); // signal present, no .local.md on disk
  assert.equal(route(root, FIX_SKILLS, { phase_router: 'off' }), null);
  rmSync(root, { recursive: true, force: true });
});

test('unset opt-out leaves the router on (default behavior unchanged)', () => {
  const root = rootWithDefineSignal(null);
  const out = route(root, FIX_SKILLS); // config unset -> reads {} -> on
  assert.equal(out.hookSpecificOutput.hookEventName, 'SessionStart');
  assert.match(out.hookSpecificOutput.additionalContext, /define-x/);
  rmSync(root, { recursive: true, force: true });
});

test('phase_router: auto keeps the router on', () => {
  const root = rootWithDefineSignal('---\nphase_router: auto\n---\n');
  const out = route(root, FIX_SKILLS);
  assert.match(out.hookSpecificOutput.additionalContext, /Define phase/);
  rmSync(root, { recursive: true, force: true });
});
