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

// --- Project memory precedence (B1 / F-48) ---------------------------------

// A root that has a CONFLICTING branch signal (define) plus a project-memory file.
// Any Deliver result therefore proves the declaration beat the heuristic.
function rootWithDefineBranchAnd(localMd) {
  const root = mkdtempSync(join(tmpdir(), 'route-mem-'));
  mkdirSync(join(root, '.git'), { recursive: true });
  writeFileSync(join(root, '.git', 'HEAD'), 'ref: refs/heads/define\n');
  if (localMd !== null) {
    mkdirSync(join(root, '.claude'), { recursive: true });
    writeFileSync(join(root, '.claude', 'pm-skills.local.md'), localMd, 'utf8');
  }
  return root;
}

test('a declared phase outranks a conflicting branch signal', () => {
  const root = rootWithDefineBranchAnd('---\nschema: 1\nphase: deliver\n---\n');
  const ctx = route(root, FIX_SKILLS).hookSpecificOutput.additionalContext;
  assert.match(ctx, /Deliver phase/);
  assert.match(ctx, /deliver-y/);
  assert.doesNotMatch(ctx, /Define phase/);
  rmSync(root, { recursive: true, force: true });
});

test('a declared phase is stated, not hedged, and names the active initiative', () => {
  const root = rootWithDefineBranchAnd(
    '---\nschema: 1\nphase: deliver\nactive_initiative: "Self-serve onboarding"\n---\n'
  );
  const ctx = route(root, FIX_SKILLS).hookSpecificOutput.additionalContext;
  assert.match(ctx, /Project memory records the Deliver phase/);
  assert.match(ctx, /Self-serve onboarding/);
  // "you appear to be" is an inference claim; a written-down phase is not inferred.
  assert.doesNotMatch(ctx, /appear to be/);
  rmSync(root, { recursive: true, force: true });
});

test('an inferred phase keeps its hedged phrasing and claims no initiative', () => {
  const root = rootWithDefineBranchAnd(null);
  const ctx = route(root, FIX_SKILLS).hookSpecificOutput.additionalContext;
  assert.match(ctx, /You appear to be in the Define phase/);
  assert.doesNotMatch(ctx, /Project memory records/);
  rmSync(root, { recursive: true, force: true });
});

test('an unrecognized declared phase falls back to the heuristic rather than failing', () => {
  const root = rootWithDefineBranchAnd('---\nschema: 1\nphase: delivery\n---\n');
  const ctx = route(root, FIX_SKILLS).hookSpecificOutput.additionalContext;
  assert.match(ctx, /You appear to be in the Define phase/);
  rmSync(root, { recursive: true, force: true });
});

test('an initiative without a declared phase is NOT surfaced on an inferred nudge', () => {
  // The initiative describes what memory says you are working on. Attaching it to a
  // guessed phase would dress an inference up as a record.
  const root = rootWithDefineBranchAnd('---\nschema: 1\nactive_initiative: "Billing rewrite"\n---\n');
  const ctx = route(root, FIX_SKILLS).hookSpecificOutput.additionalContext;
  assert.match(ctx, /You appear to be in the Define phase/);
  assert.doesNotMatch(ctx, /Billing rewrite/);
  rmSync(root, { recursive: true, force: true });
});

test('memory is inert when the file is absent: behavior is unchanged from pre-B1', () => {
  // The load-bearing trust property. No file -> the router does exactly what it did
  // before project memory existed, including staying silent with no signal at all.
  const noSignal = mkdtempSync(join(tmpdir(), 'route-mem-'));
  assert.equal(route(noSignal, FIX_SKILLS), null);
  rmSync(noSignal, { recursive: true, force: true });

  const withSignal = rootWithDefineBranchAnd(null);
  assert.match(route(withSignal, FIX_SKILLS).hookSpecificOutput.additionalContext, /Define phase/);
  rmSync(withSignal, { recursive: true, force: true });
});

test('the router opt-out still wins over a declared phase', () => {
  const root = rootWithDefineBranchAnd('---\nschema: 1\nphase: deliver\nphase_router: off\n---\n');
  assert.equal(route(root, FIX_SKILLS), null);
  rmSync(root, { recursive: true, force: true });
});
