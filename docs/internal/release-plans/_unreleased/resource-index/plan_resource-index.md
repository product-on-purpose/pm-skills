# Resource Index Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a generated, CI-gated `docs/RESOURCES.md` catalog that links every project resource to both its published page and its source-of-truth file in the repo, plus a hand-authored `docs/README.md` front door, so the docs are browsable on GitHub at a stable path and can never silently go stale.

**Architecture:** A zero-config Node script (`scripts/gen-resource-index.mjs`) joins two committed sources of truth: the filesystem (repo sources under `skills/`, `library/skill-output-samples/`, `_workflows/`, `site/src/content/docs/`) and `scripts/route-manifest.txt` (the committed published-route baseline). It renders a Markdown catalog. A `--check` mode regenerates and byte-compares (line endings normalized) against the committed file, failing CI on drift. The generator never reads gitignored generated content, so every repo link targets a tracked file.

**Tech Stack:** Node 24 (ESM, `node:fs`/`node:path`/`node:url`), `js-yaml` (already a root devDependency) for frontmatter, `node --test` for unit tests, GitHub Actions (`validation.yml`).

**Spec:** `docs/internal/release-plans/_unreleased/resource-index/spec_resource-index.md`

---

## Refinement from spec

The spec originally listed `.sh`/`.ps1` CI wrappers. A cross-platform Node script does not need them: CI invokes `node scripts/gen-resource-index.mjs --check` directly on both OS legs, exactly as `validation.yml` already does for `node scripts/gen-site.mjs` and `node --test scripts/check-rendered-links.test.mjs`. The spec deliverables table has been updated to match.

## File structure

| File | Responsibility | Action |
|---|---|---|
| `scripts/gen-resource-index.mjs` | Enumerate resources, render Markdown, write or `--check`. Exports pure functions; CLI guarded at the bottom. | Create |
| `scripts/gen-resource-index.test.mjs` | `node --test` unit + invariant tests against pure exports and the real tree. | Create |
| `docs/RESOURCES.md` | Generated catalog (committed). | Create (by running the script) |
| `docs/README.md` | Hand-authored `docs/` folder front door; links to `RESOURCES.md`. | Create |
| `README.md` | Add one key-paths row pointing at `docs/RESOURCES.md`; fix two broken external links. | Modify |
| `.github/workflows/validation.yml` | Run `--check` and the unit test on both OS legs. | Modify |
| `CHANGELOG.md` | `[Unreleased]` entry (Added + Fixed). | Modify |

Module shape mirrors `scripts/check-rendered-links.mjs`: a testable pure core plus a guarded CLI entry (`if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)`), which avoids the `pathToFileURL(undefined)` crash class seen previously in this repo.

---

## Task 1: Generator skeleton + manifest and frontmatter parsing

**Files:**
- Create: `scripts/gen-resource-index.mjs`
- Test: `scripts/gen-resource-index.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/gen-resource-index.test.mjs`
Expected: FAIL with "Cannot find module './gen-resource-index.mjs'" (or export-not-found).

- [ ] **Step 3: Create the module with helpers and exports**

```js
// scripts/gen-resource-index.mjs
#!/usr/bin/env node
// Generates docs/RESOURCES.md: a catalog linking each project resource to its
// published page (validated against scripts/route-manifest.txt) and its
// source-of-truth file in this repo. Spec:
// docs/internal/release-plans/_unreleased/resource-index/spec_resource-index.md
//
// Two committed sources are joined: the filesystem (repo sources) and the route
// manifest (published routes). Generated/gitignored site content is never read,
// so every repo link targets a tracked file.
import { readFileSync, readdirSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname, resolve, relative } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import yaml from 'js-yaml';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
export const SITE = 'https://product-on-purpose.github.io/pm-skills';
export const OUT_REL = 'docs/RESOURCES.md';

// Parse the route manifest into a Set of routes ("/guides/prompt-gallery/").
export function parseManifest(text) {
  const routes = new Set();
  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    routes.add(line.replace(/index\.html$/, ''));
  }
  return routes;
}

// Map a path relative to site/src/content/docs to its published route.
export function toRoute(relFromDocs) {
  let p = relFromDocs.replace(/\\/g, '/').replace(/\.(md|mdx)$/i, '');
  p = p.replace(/(^|\/)index$/i, '$1').replace(/\/$/, '');
  return p ? `/${p}/` : '/';
}

// "sample_deliver-prd_storevine_campaigns" -> "storevine / campaigns".
export function scenarioLabel(stem, skill) {
  return stem.replace(new RegExp(`^sample_${skill}_`), '').replace(/_/g, ' / ');
}

// Markdown table cell: collapse newlines, escape pipes.
export function cell(s) {
  return String(s ?? '').replace(/\r?\n/g, ' ').replace(/\|/g, '\\|').trim();
}

// Relative link from docs/RESOURCES.md (which lives in docs/) to a repo path.
export function repoLink(repoRelPath) {
  return `../${repoRelPath.replace(/\\/g, '/')}`;
}

// Read frontmatter, tolerant of a leading HTML comment. Returns {} on any failure.
export function readMeta(filePath) {
  let text;
  try {
    text = readFileSync(filePath, 'utf8');
  } catch {
    return {};
  }
  text = text.replace(/^﻿/, '').replace(/^\s+/, '');
  if (text.startsWith('<!--')) {
    const end = text.indexOf('-->');
    if (end !== -1) text = text.slice(end + 3).replace(/^\s+/, '');
  }
  const m = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return {};
  try {
    const meta = yaml.load(m[1]);
    return meta && typeof meta === 'object' ? meta : {};
  } catch {
    return {};
  }
}

function listDirs(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

function walkMd(dir) {
  const out = [];
  if (!existsSync(dir)) return out;
  for (const e of readdirSync(dir, { withFileTypes: true }).sort((a, b) => a.name.localeCompare(b.name))) {
    const full = join(dir, e.name);
    if (e.isDirectory()) out.push(...walkMd(full));
    else if (/\.(md|mdx)$/i.test(e.name)) out.push(full);
  }
  return out;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/gen-resource-index.test.mjs`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add scripts/gen-resource-index.mjs scripts/gen-resource-index.test.mjs
git commit -m "feat(scripts): resource-index generator skeleton + parsing helpers"
```

---

## Task 2: Enumerate docs, skills, workflows, samples, showcase

**Files:**
- Modify: `scripts/gen-resource-index.mjs`
- Test: `scripts/gen-resource-index.test.mjs`

- [ ] **Step 1: Write the failing test (invariants against the real tree)**

Add to `scripts/gen-resource-index.test.mjs`:

```js
import { buildModel, collectSources, ROOT } from './gen-resource-index.mjs';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

test('buildModel: every live route exists in the manifest', () => {
  const model = buildModel(ROOT);
  const allRows = [
    ...model.docs.flatMap((s) => s.rows),
    ...model.skills.flatMap((g) => g.rows),
    ...model.workflows,
    ...model.samples.flatMap((s) => s.rows),
    ...model.showcase,
  ];
  assert.ok(allRows.length > 50, `expected many rows, got ${allRows.length}`);
  for (const r of allRows) assert.ok(model.routes.has(r.route), `route missing from manifest: ${r.route}`);
});

test('buildModel: every repo source is a tracked file that exists on disk', () => {
  const model = buildModel(ROOT);
  for (const src of collectSources(model)) {
    assert.ok(existsSync(join(ROOT, src)), `repo source missing on disk: ${src}`);
    assert.ok(!src.startsWith('site/src/content/docs/samples/'), `must not link gitignored mirror: ${src}`);
    assert.ok(!src.startsWith('site/src/content/docs/skills/'), `must not link gitignored mirror: ${src}`);
  }
});

test('buildModel: skills are grouped and deliver-prd resolves to its nested route', () => {
  const model = buildModel(ROOT);
  const deliver = model.skills.find((g) => g.group === 'deliver');
  assert.ok(deliver, 'deliver group present');
  const prd = deliver.rows.find((r) => r.name === 'deliver-prd');
  assert.ok(prd, 'deliver-prd present');
  assert.equal(prd.route, '/skills/deliver/deliver-prd/');
  assert.equal(prd.source, 'skills/deliver-prd/SKILL.md');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/gen-resource-index.test.mjs`
Expected: FAIL ("buildModel is not exported" / not a function).

- [ ] **Step 3: Add enumeration + model builder to the module**

Append to `scripts/gen-resource-index.mjs`:

```js
// Hand-authored doc categories, in reading order.
const DOC_CATEGORIES = [
  ['getting-started', 'Getting Started'],
  ['concepts', 'Concepts'],
  ['guides', 'Guides'],
  ['reference', 'Reference'],
  ['contributing', 'Contributing'],
];

// Skill group order (lifecycle) + display names. Groups come from the manifest
// route segment, which gen-site derives from each SKILL.md phase/classification.
const GROUP_ORDER = [
  ['foundation', 'Foundation'],
  ['discover', 'Discover'],
  ['define', 'Define'],
  ['develop', 'Develop'],
  ['deliver', 'Deliver'],
  ['measure', 'Measure'],
  ['iterate', 'Iterate'],
  ['tool', 'Tool families'],
  ['utility', 'Utility'],
];

export function enumerateDocs(root, routes) {
  const DOCS = join(root, 'site', 'src', 'content', 'docs');
  const out = [];
  for (const [cat, label] of DOC_CATEGORIES) {
    const dir = join(DOCS, cat);
    if (!existsSync(dir)) continue;
    const rows = [];
    for (const file of walkMd(dir)) {
      const relFromDocs = relative(DOCS, file).replace(/\\/g, '/');
      const route = toRoute(relFromDocs);
      if (!routes.has(route)) continue;
      const meta = readMeta(file);
      rows.push({
        name: meta.title || relFromDocs.replace(/\.(md|mdx)$/i, '').split('/').pop(),
        description: meta.description || '',
        route,
        source: `site/src/content/docs/${relFromDocs}`,
      });
    }
    rows.sort((a, b) => a.route.localeCompare(b.route));
    if (rows.length) out.push({ label, rows });
  }
  return out;
}

export function enumerateSkills(root, routes) {
  const SKILLS = join(root, 'skills');
  const byName = {};
  for (const r of routes) {
    const m = r.match(/^\/skills\/([^/]+)\/([^/]+)\/$/);
    if (m) byName[m[2]] = { group: m[1], route: r };
  }
  const groups = {};
  for (const dir of listDirs(SKILLS)) {
    const skillMd = join(SKILLS, dir, 'SKILL.md');
    if (!existsSync(skillMd)) continue;
    const info = byName[dir];
    if (!info) continue;
    const meta = readMeta(skillMd);
    (groups[info.group] ||= []).push({
      name: dir,
      description: meta.description || '',
      route: info.route,
      source: `skills/${dir}/SKILL.md`,
    });
  }
  const ordered = [];
  for (const [group, label] of GROUP_ORDER) {
    if (!groups[group]) continue;
    groups[group].sort((a, b) => a.name.localeCompare(b.name));
    ordered.push({ group, label, rows: groups[group] });
  }
  // Any unexpected group not in GROUP_ORDER, appended alphabetically.
  for (const group of Object.keys(groups).sort()) {
    if (GROUP_ORDER.some(([g]) => g === group)) continue;
    groups[group].sort((a, b) => a.name.localeCompare(b.name));
    ordered.push({ group, label: group, rows: groups[group] });
  }
  return ordered;
}

export function enumerateWorkflows(root, routes) {
  const WF = join(root, '_workflows');
  const rows = [];
  if (!existsSync(WF)) return rows;
  for (const f of readdirSync(WF).filter((f) => f.endsWith('.md') && f !== 'README.md').sort()) {
    const name = f.replace(/\.md$/, '');
    const route = `/workflows/${name}/`;
    if (!routes.has(route)) continue;
    const meta = readMeta(join(WF, f));
    rows.push({ name, description: meta.description || meta.title || '', route, source: `_workflows/${f}` });
  }
  return rows;
}

export function enumerateSamples(root, routes) {
  const SAMPLES = join(root, 'library', 'skill-output-samples');
  const out = [];
  for (const skill of listDirs(SAMPLES)) {
    const dir = join(SAMPLES, skill);
    const rows = [];
    for (const f of readdirSync(dir).filter((f) => f.startsWith('sample_') && f.endsWith('.md')).sort()) {
      const stem = f.replace(/\.md$/, '');
      const route = `/samples/${skill}/${stem}/`;
      if (!routes.has(route)) continue;
      rows.push({ scenario: scenarioLabel(stem, skill), route, source: `library/skill-output-samples/${skill}/${f}` });
    }
    if (rows.length) out.push({ skill, sourceDir: `library/skill-output-samples/${skill}/`, rows });
  }
  return out;
}

export function enumerateShowcase(root, routes) {
  const rows = [];
  for (const r of [...routes].sort()) {
    const m = r.match(/^\/showcase\/([^/]+)\/$/);
    if (m) rows.push({ thread: m[1], route: r });
  }
  return rows;
}

export function buildModel(root) {
  const routes = parseManifest(readFileSync(join(root, 'scripts', 'route-manifest.txt'), 'utf8'));
  return {
    routes,
    docs: enumerateDocs(root, routes),
    skills: enumerateSkills(root, routes),
    workflows: enumerateWorkflows(root, routes),
    samples: enumerateSamples(root, routes),
    showcase: enumerateShowcase(root, routes),
  };
}

// Every repo source path the index links (used by the disk-existence guard).
export function collectSources(model) {
  const out = [];
  for (const s of model.docs) for (const r of s.rows) out.push(r.source);
  for (const g of model.skills) for (const r of g.rows) out.push(r.source);
  for (const r of model.workflows) out.push(r.source);
  for (const s of model.samples) { out.push(s.sourceDir.replace(/\/$/, '')); for (const r of s.rows) out.push(r.source); }
  return out;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/gen-resource-index.test.mjs`
Expected: PASS (8 tests). Note: requires root deps. If `js-yaml` is not installed, run `npm ci` at the repo root first.

- [ ] **Step 5: Commit**

```bash
git add scripts/gen-resource-index.mjs scripts/gen-resource-index.test.mjs
git commit -m "feat(scripts): resource-index enumeration + model builder"
```

---

## Task 3: Render the Markdown catalog

**Files:**
- Modify: `scripts/gen-resource-index.mjs`
- Test: `scripts/gen-resource-index.test.mjs`

- [ ] **Step 1: Write the failing test**

Add to `scripts/gen-resource-index.test.mjs`:

```js
import { renderIndex } from './gen-resource-index.mjs';

test('renderIndex emits banner, sections, and correct link columns', () => {
  const model = {
    routes: new Set(),
    docs: [{ label: 'Guides', rows: [{ name: 'Prompt Gallery', description: 'Real prompts', route: '/guides/prompt-gallery/', source: 'site/src/content/docs/guides/prompt-gallery.md' }] }],
    skills: [{ group: 'deliver', label: 'Deliver', rows: [{ name: 'deliver-prd', description: 'PRD skill', route: '/skills/deliver/deliver-prd/', source: 'skills/deliver-prd/SKILL.md' }] }],
    workflows: [{ name: 'feature-kickoff', description: 'Kickoff', route: '/workflows/feature-kickoff/', source: '_workflows/feature-kickoff.md' }],
    samples: [{ skill: 'deliver-prd', sourceDir: 'library/skill-output-samples/deliver-prd/', rows: [{ scenario: 'storevine / campaigns', route: '/samples/deliver-prd/sample_deliver-prd_storevine_campaigns/', source: 'library/skill-output-samples/deliver-prd/sample_deliver-prd_storevine_campaigns.md' }] }],
    showcase: [{ thread: 'storevine', route: '/showcase/storevine/' }],
  };
  const md = renderIndex(model);
  assert.match(md, /^# PM Skills - Resource Index/);
  assert.match(md, /<!-- GENERATED by scripts\/gen-resource-index\.mjs/);
  assert.match(md, /\[page\]\(https:\/\/product-on-purpose\.github\.io\/pm-skills\/guides\/prompt-gallery\/\)/);
  assert.match(md, /\[SKILL\.md\]\(\.\.\/skills\/deliver-prd\/SKILL\.md\)/);
  assert.match(md, /\.\.\/library\/skill-output-samples\/deliver-prd\/sample_deliver-prd_storevine_campaigns\.md/);
  assert.ok(md.endsWith('\n'));
  const EMDASH = String.fromCharCode(0x2014);
  assert.equal(md.includes(EMDASH), false, 'renderer emits no em-dashes');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/gen-resource-index.test.mjs`
Expected: FAIL ("renderIndex is not exported").

- [ ] **Step 3: Add the renderer**

Append to `scripts/gen-resource-index.mjs`:

```js
function srcLabel(source) {
  return source.split('/').pop();
}

export function renderIndex(model) {
  const L = [];
  L.push('# PM Skills - Resource Index');
  L.push('<!-- GENERATED by scripts/gen-resource-index.mjs - do not edit by hand. -->');
  L.push('<!-- Regenerate with: node scripts/gen-resource-index.mjs -->');
  L.push('');
  L.push('Every entry links the published page on the docs site and the file in this repo it comes from (the page source for hand-authored docs, the generator input for generated pages). The published site lives in [../site/](../site/).');
  L.push('');

  for (const sec of model.docs) {
    L.push(`## ${sec.label}`, '');
    L.push('| Resource | Description | Live page | Repo source |', '|---|---|---|---|');
    for (const r of sec.rows) {
      L.push(`| ${cell(r.name)} | ${cell(r.description)} | [page](${SITE}${r.route}) | [${srcLabel(r.source)}](${repoLink(r.source)}) |`);
    }
    L.push('');
  }

  L.push('## Skills', '');
  for (const g of model.skills) {
    L.push(`### ${g.label}`, '');
    L.push('| Skill | Description | Live page | SKILL.md |', '|---|---|---|---|');
    for (const r of g.rows) {
      L.push(`| ${cell(r.name)} | ${cell(r.description)} | [page](${SITE}${r.route}) | [SKILL.md](${repoLink(r.source)}) |`);
    }
    L.push('');
  }

  if (model.workflows.length) {
    L.push('## Workflows', '');
    L.push('| Workflow | Description | Live page | Repo source |', '|---|---|---|---|');
    for (const r of model.workflows) {
      L.push(`| ${cell(r.name)} | ${cell(r.description)} | [page](${SITE}${r.route}) | [${srcLabel(r.source)}](${repoLink(r.source)}) |`);
    }
    L.push('');
  }

  L.push('## Samples', '');
  L.push('Grouped by skill. Source library: [library/skill-output-samples/](../library/skill-output-samples/)', '');
  for (const s of model.samples) {
    L.push(`### ${s.skill}  (source: [${s.sourceDir}](${repoLink(s.sourceDir)}))`, '');
    L.push('| Scenario | Live page | Repo .md |', '|---|---|---|');
    for (const r of s.rows) {
      L.push(`| ${cell(r.scenario)} | [page](${SITE}${r.route}) | [.md](${repoLink(r.source)}) |`);
    }
    L.push('');
  }

  if (model.showcase.length) {
    L.push('## Showcase', '');
    L.push('Cross-cutting worked examples by scenario thread, generated from the sample library ([library/skill-output-samples/](../library/skill-output-samples/)).', '');
    L.push('| Thread | Live page |', '|---|---|');
    for (const r of model.showcase) {
      L.push(`| ${cell(r.thread)} | [page](${SITE}${r.route}) |`);
    }
    L.push('');
  }

  return L.join('\n').replace(/\n+$/, '\n');
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test scripts/gen-resource-index.test.mjs`
Expected: PASS (9 tests).

- [ ] **Step 5: Commit**

```bash
git add scripts/gen-resource-index.mjs scripts/gen-resource-index.test.mjs
git commit -m "feat(scripts): resource-index Markdown renderer"
```

---

## Task 4: CLI (write + --check) with line-ending normalization and source guard

**Files:**
- Modify: `scripts/gen-resource-index.mjs`
- Test: `scripts/gen-resource-index.test.mjs`

- [ ] **Step 1: Write the failing test**

Add to `scripts/gen-resource-index.test.mjs`:

```js
import { normalizeEol } from './gen-resource-index.mjs';

test('normalizeEol converts CRLF to LF', () => {
  assert.equal(normalizeEol('a\r\nb\r\n'), 'a\nb\n');
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/gen-resource-index.test.mjs`
Expected: FAIL ("normalizeEol is not exported").

- [ ] **Step 3: Add CLI + normalizeEol + guarded entry**

Append to `scripts/gen-resource-index.mjs`:

```js
export function normalizeEol(s) {
  return s.replace(/\r\n/g, '\n');
}

function runCli(argv) {
  const check = argv.includes('--check');
  const model = buildModel(ROOT);

  const missing = collectSources(model).filter((p) => !existsSync(join(ROOT, p)));
  if (missing.length) {
    console.error('gen-resource-index: repo sources missing on disk:\n  ' + missing.join('\n  '));
    process.exit(1);
  }

  const rendered = renderIndex(model);
  const outPath = join(ROOT, OUT_REL);

  if (check) {
    const current = existsSync(outPath) ? normalizeEol(readFileSync(outPath, 'utf8')) : '';
    if (normalizeEol(rendered) !== current) {
      console.error(
        'gen-resource-index: docs/RESOURCES.md is out of date.\n' +
        'Run `node scripts/gen-resource-index.mjs` and commit the result.',
      );
      process.exit(1);
    }
    console.log('gen-resource-index: docs/RESOURCES.md is current.');
    return;
  }

  writeFileSync(outPath, rendered, 'utf8');
  const counts = {
    docs: model.docs.reduce((n, s) => n + s.rows.length, 0),
    skills: model.skills.reduce((n, g) => n + g.rows.length, 0),
    workflows: model.workflows.length,
    samples: model.samples.reduce((n, s) => n + s.rows.length, 0),
    showcase: model.showcase.length,
  };
  console.log(
    `gen-resource-index: wrote ${OUT_REL} ` +
    `(${counts.docs} docs, ${counts.skills} skills, ${counts.workflows} workflows, ` +
    `${counts.samples} samples, ${counts.showcase} showcase).`,
  );
}

// CLI guard: only run when executed directly, never when imported by the test.
// process.argv[1] presence is checked to avoid pathToFileURL(undefined).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  runCli(process.argv.slice(2));
}
```

- [ ] **Step 4: Run test + a manual smoke to verify**

Run: `node --test scripts/gen-resource-index.test.mjs`
Expected: PASS (10 tests).

Run: `node scripts/gen-resource-index.mjs && node scripts/gen-resource-index.mjs --check`
Expected: first prints "wrote docs/RESOURCES.md (...)"; second prints "docs/RESOURCES.md is current." (idempotent).

- [ ] **Step 5: Commit (script only; the generated file is committed in Task 6)**

```bash
git add scripts/gen-resource-index.mjs scripts/gen-resource-index.test.mjs
git commit -m "feat(scripts): resource-index CLI with --check drift gate"
```

---

## Task 5: Wire the gate into CI

**Files:**
- Modify: `.github/workflows/validation.yml` (after the "Generate site content" step, around line 40)

- [ ] **Step 1: Add the two CI steps**

Insert immediately after the existing `Generate site content` step (the `run: node scripts/gen-site.mjs` block):

```yaml
      - name: Check resource index is current
        # docs/RESOURCES.md is generated by scripts/gen-resource-index.mjs and
        # committed. This fails the build if a resource was added/removed without
        # regenerating the index, or if any live route / repo source link is dead.
        # Cross-platform Node script: runs on both OS legs (also exercises CRLF/LF).
        run: node scripts/gen-resource-index.mjs --check

      - name: Run resource-index unit tests
        run: node --test scripts/gen-resource-index.test.mjs
```

- [ ] **Step 2: Verify YAML validity locally**

Run: `node -e "const y=require('js-yaml');y.load(require('fs').readFileSync('.github/workflows/validation.yml','utf8'));console.log('yaml ok')"`
Expected: prints `yaml ok`.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/validation.yml
git commit -m "ci: gate docs/RESOURCES.md freshness + resource-index unit tests"
```

---

## Task 6: Generate the catalog and write the front door

**Files:**
- Create: `docs/RESOURCES.md` (by running the script)
- Create: `docs/README.md`
- Modify: `README.md` (key-paths table)

- [ ] **Step 1: Generate the catalog**

Run: `node scripts/gen-resource-index.mjs`
Expected: writes `docs/RESOURCES.md`. Open it and sanity-check that Guides, Skills (grouped), Workflows, Samples (grouped by skill), and Showcase sections are present and that a few links look right.

- [ ] **Step 2: Verify the gate now passes and is idempotent**

Run: `node scripts/gen-resource-index.mjs --check`
Expected: "docs/RESOURCES.md is current."

- [ ] **Step 3: Write the hand-authored front door**

Create `docs/README.md` (do NOT generate this one; it is the low-churn human intro):

```markdown
# docs/

Documentation for the PM Skills project.

- **[RESOURCES.md](RESOURCES.md)** - the resource index: every published page and the repo file it comes from. Generated by `scripts/gen-resource-index.mjs`; do not edit it by hand.
- **`internal/`** - governance, audits, release plans, and working notes. Not part of the published site.
- **`templates/`** - reusable templates (for example the skill template).

The published documentation site lives in [`../site/`](../site/) and is served at
<https://product-on-purpose.github.io/pm-skills/>.
```

- [ ] **Step 4: Add the root README key-paths pointer**

In `README.md`, insert a new table row immediately after the `site/src/content/docs/reference/` row (currently line 1088):

```markdown
| [`docs/RESOURCES.md`](docs/RESOURCES.md)                         | Browsable index of every resource, linking each live page to its repo source          |
```

- [ ] **Step 5: Commit**

```bash
git add docs/RESOURCES.md docs/README.md README.md
git commit -m "docs: add generated resource index + docs/ front door + README pointer"
```

---

## Task 7: Fix the two broken README external links

**Files:**
- Modify: `README.md` (lines 406 and 407)

- [ ] **Step 1: Fix the JTBD link**

Replace `](https://jtbd.info/)` with `](https://strategyn.com/jobs-to-be-done/)` on the "Jobs to be Done Framework" line (README.md:406). The original `jtbd.info` URL serves an invalid TLS certificate.

- [ ] **Step 2: Fix the Foundation Sprint link**

Replace `](https://www.jakeknapp.com/foundation-sprint)` with `](https://thefoundationsprint.com/)` on the "Foundation Sprint" line (README.md:407). The original path returns 404.

- [ ] **Step 3: Verify both replacements resolve**

Run: `for u in https://strategyn.com/jobs-to-be-done/ https://thefoundationsprint.com/; do echo "$u -> $(curl -sS -o /dev/null -w '%{http_code}' -L --max-time 15 "$u")"; done`
Expected: both print `200`.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: fix two broken external links in README (jtbd, foundation sprint)"
```

---

## Task 8: CHANGELOG [Unreleased] entry

**Files:**
- Modify: `CHANGELOG.md` (the `[Unreleased]` section)

- [ ] **Step 1: Add Added/Fixed bullets under `## [Unreleased]`**

Within the existing `## [Unreleased]` section, add (creating `### Added` / `### Fixed` subsections, or extending the existing ones if the Pattern S entry already provides them):

```markdown
### Added

- `docs/RESOURCES.md`: a generated, CI-gated resource index linking every published page to its source-of-truth file in the repo (skills to SKILL.md, samples to the library sources, workflows to `_workflows/`, hand-authored docs to their page source). Generated by `scripts/gen-resource-index.mjs`; freshness enforced in CI so it cannot silently go stale.
- `docs/README.md`: a hand-authored front door for the `docs/` folder pointing to the resource index.

### Fixed

- README external links: the Jobs to be Done reference (invalid TLS certificate) now points to `https://strategyn.com/jobs-to-be-done/`, and the Foundation Sprint reference (404) now points to `https://thefoundationsprint.com/`.
```

This is an untagged maintenance change (no skill behavior change, catalog stays 65); it stays in `[Unreleased]` until banked into a future tag.

- [ ] **Step 2: Commit**

```bash
git add CHANGELOG.md
git commit -m "docs(changelog): note resource index + README link fixes (Unreleased)"
```

---

## Final verification

- [ ] **Run the full local check sequence**

```bash
npm ci
node scripts/gen-resource-index.mjs --check
node --test scripts/gen-resource-index.test.mjs
```
Expected: "docs/RESOURCES.md is current." and all unit tests pass.

- [ ] **Confirm no gitignored mirror links leaked into the catalog**

Run: `grep -n "site/src/content/docs/\(samples\|skills\|workflows\|showcase\)/" docs/RESOURCES.md || echo "clean"`
Expected: `clean` (the catalog must link only tracked sources).

---

## Self-review notes (author)

- Spec coverage: generated catalog (Tasks 1-4, 6); CI gate with all three failure conditions, namely staleness (Task 4 `--check`), dead live link (enumeration filters on manifest membership, invariant test Task 2), and dead repo source (Task 4 source guard); two-file split (Task 6); README pointer (Task 6); link fixes (Task 7); CHANGELOG (Task 8); tests (Tasks 1-4); release classification (Task 8 wording). All spec sections map to a task.
- Type/name consistency: `buildModel`, `renderIndex`, `collectSources`, `normalizeEol`, `parseManifest`, `toRoute`, `scenarioLabel`, `cell`, `repoLink`, `readMeta` are defined once and referenced consistently across tasks and tests. Model shape (`docs[].rows`, `skills[].rows`, `workflows[]`, `samples[].rows`, `showcase[]`) is identical in enumeration, render, collectSources, and tests.
- No placeholders: every code step contains complete code; every run step states the expected output.
- Known acceptable behavior: the invariant test asserts `> 50` rows rather than exact counts, so adding skills/samples does not break the test (the `--check` gate handles exactness against the committed file).
