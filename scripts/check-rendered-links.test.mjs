// check-rendered-links.test.mjs - prove the rendered-link check genuinely
// consumes the base path (family Astro site standard 14.7 acceptance).
//
// The risk the single-source fix guards against: a base that disagrees between
// the build and the validator passes the check while the live site 404s. This
// test builds one fixture dist whose only internal link is base-absolute
// (`${BASE}/foo/`) and runs the core resolver against it:
//   - with the correct base (the single source) -> the link resolves -> PASS
//   - with a deliberately wrong base -> the link is now host-root and resolves
//     outside the base -> FAIL
// If the checker ignored its base, the wrong-base run would still pass; the FAIL
// is what proves it reads the base it is given. A third run with NO base argument
// proves the default wires through to the single source (scripts/site-base.mjs).
//
// The base value is NOT re-hardcoded here: the fixture and the PASS case derive
// from the imported BASE, so scripts/site-base.mjs stays the one place the literal
// lives (14.7). One explicit assertion pins the expected value of that source.
//
// Run:  node --test scripts/check-rendered-links.test.mjs   (Node >= 22.12)

import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { checkRenderedLinks } from './check-rendered-links.mjs';
import { BASE } from './site-base.mjs';

// Run a function with console output suppressed (the checker prints a human
// report; tests only care about the returned exit code).
function silent(fn) {
  const log = console.log;
  const error = console.error;
  console.log = () => {};
  console.error = () => {};
  try { return fn(); } finally { console.log = log; console.error = error; }
}

// Build a minimal fixture dist: a home page linking to `${base}/foo/`, and the
// target page so the link resolves under that base.
function makeFixture(base) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rendered-links-'));
  fs.writeFileSync(
    path.join(dir, 'index.html'),
    `<!doctype html><html><body><a href="${base}/foo/">foo</a></body></html>`,
    'utf8',
  );
  fs.mkdirSync(path.join(dir, 'foo'), { recursive: true });
  fs.writeFileSync(
    path.join(dir, 'foo', 'index.html'),
    '<!doctype html><html><body><h1>foo</h1></body></html>',
    'utf8',
  );
  return dir;
}

// Load-bearing: tests 2-4 derive their fixture and base from the imported BASE, so
// they pass for any internally-consistent value (they prove the checker CONSUMES the
// base it is given, not that the source holds the right value). This assertion is the
// one place the expected value itself is checked - do not remove it.
test('the single source pins the expected base value', () => {
  assert.equal(BASE, '/pm-skills', 'scripts/site-base.mjs must export the GitHub Pages project subpath');
});

test('correct base: the base-absolute link resolves (PASS)', () => {
  const dir = makeFixture(BASE);
  try {
    const code = silent(() => checkRenderedLinks(dir, BASE, { strictAnchors: false }));
    assert.equal(code, 0, 'expected exit 0 when the base matches the built links');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('wrong base: the same link is now broken (FAIL) - proves the check reads the base', () => {
  const dir = makeFixture(BASE);
  try {
    const code = silent(() => checkRenderedLinks(dir, '/wrong-base', { strictAnchors: false }));
    assert.equal(code, 1, 'expected exit 1 when the base is wrong (a wrong base must not pass silently)');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('default base: omitting the argument wires through to scripts/site-base.mjs (PASS)', () => {
  const dir = makeFixture(BASE);
  try {
    const code = silent(() => checkRenderedLinks(dir, undefined, { strictAnchors: false }));
    assert.equal(code, 0, 'expected exit 0: the default base must equal the single source');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test('empty-but-existing dist hard-fails (standard 14.11 robustness)', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rendered-links-empty-'));
  try {
    const code = silent(() => checkRenderedLinks(dir, BASE, { strictAnchors: false }));
    assert.equal(code, 1, 'an existing-but-empty dist must fail loudly, not pass silently');
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
