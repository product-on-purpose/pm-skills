#!/usr/bin/env node
// scripts/gen-resource-index.mjs
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
  p = p.replace(/\/index$/i, '').replace(/^index$/i, '').replace(/\/$/, '');
  return p ? `/${p}/` : '/';
}

// "sample_deliver-prd_storevine_campaigns" -> "storevine / campaigns".
// The skill name is escaped before being placed in a RegExp so a name containing
// a regex metacharacter cannot corrupt the match.
export function scenarioLabel(stem, skill) {
  const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return stem.replace(new RegExp(`^sample_${escaped}_`), '').replace(/_/g, ' / ');
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
    .sort((a, b) => a.localeCompare(b));
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
  for (const s of model.samples) {
    out.push(s.sourceDir.replace(/\/$/, ''));
    for (const r of s.rows) out.push(r.source);
  }
  return out;
}

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
