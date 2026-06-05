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
