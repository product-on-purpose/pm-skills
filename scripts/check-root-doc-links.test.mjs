// Unit tests for check-root-doc-links.mjs findBrokenLinks() + relativeTargetResolves().
import { test } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { findBrokenLinks, relativeTargetResolves } from './check-root-doc-links.mjs';

const routes = new Set(['/getting-started/index.html', '/index.html']);
const sitePrefix = 'https://product-on-purpose.github.io/pm-skills';
const exists = (rel) => ['skills/', 'LICENSE', 'docs/templates/skill-template/'].includes(rel);
const opts = { routes, sitePrefix, exists };

test('valid relative path and valid deployed-site URL pass', () => {
  const t = '[a](skills/) and [b](https://product-on-purpose.github.io/pm-skills/getting-started/)';
  assert.equal(findBrokenLinks(t, opts).length, 0);
});

test('site root URL maps to /index.html', () => {
  const t = '[home](https://product-on-purpose.github.io/pm-skills/)';
  assert.equal(findBrokenLinks(t, opts).length, 0);
});

test('broken relative link is flagged', () => {
  const t = '[x](docs/getting-started/index.md)';
  const p = findBrokenLinks(t, opts);
  assert.equal(p.length, 1);
  assert.match(p[0].reason, /relative path/);
});

test('deployed-site URL with no matching route is flagged', () => {
  const t = '[x](https://product-on-purpose.github.io/pm-skills/does-not-exist/)';
  const p = findBrokenLinks(t, opts);
  assert.equal(p.length, 1);
  assert.match(p[0].reason, /route not in manifest/);
});

test('external hosts, in-page anchors, and mailto are skipped', () => {
  const t = '[a](https://github.com/x/y) [b](#section) [c](mailto:a@b.co) [d](https://img.shields.io/badge/x)';
  assert.equal(findBrokenLinks(t, opts).length, 0);
});

test('anchors and query strings on internal links are stripped before resolving', () => {
  const t = '[a](skills/#top) [b](https://product-on-purpose.github.io/pm-skills/getting-started/#cursor)';
  assert.equal(findBrokenLinks(t, opts).length, 0);
});

test('links inside fenced code blocks are ignored', () => {
  const t = '```\n[x](docs/never-existed.md)\n```\nreal [y](LICENSE)';
  assert.equal(findBrokenLinks(t, opts).length, 0);
});

test('would have caught the Pattern S regression', () => {
  const t = '[Getting Started Guide](docs/getting-started/index.md)';
  assert.equal(findBrokenLinks(t, opts).length, 1);
});

test('a link-looking example inside an inline code span is not a link', () => {
  // CHANGELOG describes a past bug with a literal markdown example, escaped backticks and all.
  const t = 'Markdown links like `[\\`SKILL.md\\`](../SKILL.md)` broke under rewriting.';
  assert.equal(findBrokenLinks(t, opts).length, 0);
});

test('a real link whose text is a code span still gets validated', () => {
  // Key-paths-table shape: code-span text, real relative target outside the backticks.
  const okay = '[`skills/`](skills/)';
  const bad = '[`gone/`](gone/)';
  assert.equal(findBrokenLinks(okay, opts).length, 0);
  assert.equal(findBrokenLinks(bad, opts).length, 1);
});

test('template placeholders ({{path}}, {release-url}) are not treated as links', () => {
  // Skill TEMPLATE.md files use brace fill-in tokens; a real path never contains braces.
  const t = '[a]({{path}}) [b]({release-url}) and a real [c](skills/)';
  assert.equal(findBrokenLinks(t, opts).length, 0);
});

// --- relativeTargetResolves: per-file resolution + Pattern S relocation alias ---
const RR_ROOT = path.resolve('rr-root');
const RR_FILEDIR = path.join(RR_ROOT, 'skills', 'foo');
const rrExists = (list) => {
  const set = new Set(list);
  return (abs) => set.has(abs);
};

test('a real sibling link resolves from the file dir', () => {
  const sib = path.resolve(RR_FILEDIR, '../bar/SKILL.md');
  assert.equal(
    relativeTargetResolves('../bar/SKILL.md', { fileDir: RR_FILEDIR, root: RR_ROOT, fileExists: rrExists([sib]) }),
    true
  );
});

test('a retired docs/reference link resolves via the site relocation alias', () => {
  const sitePath = path.resolve(RR_ROOT, 'site', 'src', 'content', 'docs', 'reference', 'x.md');
  assert.equal(
    relativeTargetResolves('../../docs/reference/x.md', { fileDir: RR_FILEDIR, root: RR_ROOT, fileExists: rrExists([sitePath]) }),
    true
  );
});

test('a retired docs/releases link resolves via the site relocation alias', () => {
  const sitePath = path.resolve(RR_ROOT, 'site', 'src', 'content', 'docs', 'releases', 'Release_v2.24.0.md');
  assert.equal(
    relativeTargetResolves('../../docs/releases/Release_v2.24.0.md', { fileDir: RR_FILEDIR, root: RR_ROOT, fileExists: rrExists([sitePath]) }),
    true
  );
});

test('docs/internal (stayed at root) resolves at root, not via the alias', () => {
  const rootPath = path.resolve(RR_FILEDIR, '../../docs/internal/plan.md');
  assert.equal(
    relativeTargetResolves('../../docs/internal/plan.md', { fileDir: RR_FILEDIR, root: RR_ROOT, fileExists: rrExists([rootPath]) }),
    true
  );
});

test('a genuinely missing link resolves nowhere and fails', () => {
  assert.equal(
    relativeTargetResolves('../../docs/nope.md', { fileDir: RR_FILEDIR, root: RR_ROOT, fileExists: rrExists([]) }),
    false
  );
});
