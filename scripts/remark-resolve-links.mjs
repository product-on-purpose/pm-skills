// remark-resolve-links.mjs - resolve relative Markdown links to Starlight slug URLs
// at build time (mdast transform), replacing the old post-build HTML rewriter
// (scripts/post-build-strip-md-links.mjs).
//
// Why this exists: Astro + Starlight do NOT auto-rewrite relative `.md` links to
// their final slug URLs (Starlight's recommended pattern is correct links + a
// link checker). Under the previous custom glob loader a remark plugin would not
// fire; under the stock docsLoader the standard Astro markdown pipeline runs, so
// this plugin can do the job idiomatically, pre-render, for both generated and
// hand-authored content.
//
// It reproduces the three behaviors of the retired rewriter:
//   1. strip .md/.mdx and emit the Starlight slug URL (base-absolute, so there is
//      no trailing-slash off-by-one to correct);
//   2. (subsumed by base-absolute output);
//   3. re-target cross-repo links (skills/<dir>/SKILL.md, _workflows/<n>.md,
//      library/skill-output-samples/<...>) to their in-site slug, or to a GitHub
//      blob/tree URL when the target is a repo file the site never publishes.
//
// Links that already resolve (a real in-site page) become base-absolute slugs;
// external/anchor/site-absolute links are left untouched. scripts/check-rendered-links.mjs
// is the regression gate that proves the output has zero browser-broken links.
//
// Zero dependencies: a hand-rolled mdast walker (no unist-util-visit).

import { existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_ROOT = resolve(REPO_ROOT, 'site', 'src', 'content', 'docs');
const GH = 'https://github.com/product-on-purpose/pm-skills';
const PHASE_PREFIXES = [
  'discover', 'define', 'develop', 'deliver', 'measure', 'iterate', 'foundation', 'utility',
];

const SKIP = /^(?:[a-z][a-z0-9+.-]*:|#|\/)/i; // scheme, anchor, or site-absolute
const POSIX = (p) => p.split(/[\\/]+/).filter((s) => s !== '.').join('/');

function normalizePosix(p) {
  const out = [];
  for (const seg of p.split('/')) {
    if (seg === '' || seg === '.') continue;
    if (seg === '..') {
      if (out.length && out[out.length - 1] !== '..') out.pop();
      else out.push('..');
    } else {
      out.push(seg);
    }
  }
  return (p.startsWith('/') ? '/' : '') + out.join('/');
}

function toSlug(rel) {
  let s = rel.replace(/\/$/, '').replace(/\.(md|mdx)$/i, '');
  if (s.endsWith('/index')) s = s.slice(0, -'/index'.length);
  if (s === 'index') s = '';
  return s;
}
function slugIsRealPage(slug) {
  const cands = [
    `${slug}.md`, `${slug}.mdx`, `${slug}/index.md`, `${slug}/index.mdx`,
  ];
  return cands.some((c) => existsSync(resolve(CONTENT_ROOT, c)));
}
function extractPhase(skillDir) {
  for (const p of PHASE_PREFIXES) {
    if (skillDir.startsWith(p + '-') || skillDir === p) return p;
  }
  return skillDir.split('-')[0];
}
function repoKind(rel) {
  const full = resolve(REPO_ROOT, rel);
  if (!existsSync(full)) return null;
  return statSync(full).isDirectory() ? 'dir' : 'file';
}

// Map a repo-ish target tail (leading ../ stripped) to an in-site slug URL or a
// GitHub source URL. Mirrors the retired rewriter's mapCrossTarget.
function mapCrossTarget(base, tail) {
  let m;
  if ((m = tail.match(/^_workflows\/([^/]+?)(?:\.md)?$/))) {
    const slug = `workflows/${m[1]}`;
    if (slugIsRealPage(slug)) return `${base}/${slug}/`;
  }
  if ((m = tail.match(/^skills\/([^/]+?)(?:\/SKILL)?(?:\.md)?$/))) {
    const slug = `skills/${extractPhase(m[1])}/${m[1]}`;
    if (slugIsRealPage(slug)) return `${base}/${slug}/`;
  }
  if ((m = tail.match(/^library\/skill-output-samples\/(.+?)(?:\.md)?$/))) {
    const slug = `samples/${m[1]}`;
    if (slugIsRealPage(slug)) return `${base}/${slug}/`;
  }
  if ((m = tail.match(/^docs\/(.+?)(?:\.md)?$/))) {
    const slug = m[1];
    if (slugIsRealPage(slug)) return `${base}/${slug}/`;
  }
  // GitHub source fallback (target not published as a site page). Find the target
  // wherever it lives in the repo and link to its GitHub source: at the repo root,
  // under the repo-root docs/ (internal, templates, which stayed at the root), or
  // in the site content tree (non-page assets like frontmatter-schema.yaml that sit
  // beside docs content but are not built as pages).
  const PREFIXES = ['', 'docs/', 'site/src/content/docs/'];
  for (const pre of PREFIXES) {
    for (const cand of [`${pre}${tail}`, `${pre}${tail}.md`, `${pre}${tail}.mdx`]) {
      if (repoKind(cand) === 'file') return `${GH}/blob/main/${cand}`;
    }
  }
  for (const pre of PREFIXES) {
    if (repoKind(`${pre}${tail}`) === 'dir') return `${GH}/tree/main/${pre}${tail}/`;
  }
  return null;
}

function resolveUrl(base, fileDirRel, url) {
  const hashIdx = url.indexOf('#');
  const clean = hashIdx === -1 ? url : url.slice(0, hashIdx);
  const frag = hashIdx === -1 ? '' : url.slice(hashIdx);
  if (!clean || SKIP.test(clean)) return null;

  // Resolve relative to the current file's content-root-relative directory.
  const targetRel = normalizePosix(`${fileDirRel}/${clean}`);

  // Intra-content: stays under content root and resolves to a real page.
  if (!targetRel.startsWith('..')) {
    const slug = toSlug(targetRel);
    if (slugIsRealPage(slug)) {
      return `${base}/${slug}/`.replace(/\/+$/, '/') + frag;
    }
    // A non-page file that lives in the content tree (e.g. a referenced
    // frontmatter-schema.yaml) is not built as a page, so link to its GitHub
    // source. Use the fully-resolved path so same-directory ./ links keep their
    // directory context (the stripped cross-target tail would lose it).
    if (repoKind(`site/src/content/docs/${targetRel}`) === 'file') {
      return `${GH}/blob/main/site/src/content/docs/${targetRel}${frag}`;
    }
  }

  // Cross-target: strip leading ../ and ./ and pattern-map the tail.
  const tail = clean.replace(/^(?:\.\.?\/)+/, '').replace(/\/$/, '');
  const mapped = mapCrossTarget(base, tail);
  if (mapped) return mapped + frag;

  return null; // leave as-authored
}

export default function remarkResolveLinks(options = {}) {
  const base = (options.base || '').replace(/\/$/, '');
  return function transformer(tree, file) {
    const filePath = file && (file.path || (file.history && file.history[0]));
    if (!filePath) return;
    const fileRel = POSIX(resolve(filePath).slice(CONTENT_ROOT.length + 1));
    const fileDirRel = fileRel.includes('/') ? fileRel.slice(0, fileRel.lastIndexOf('/')) : '';

    const visit = (node) => {
      if (!node || typeof node !== 'object') return;
      if ((node.type === 'link' || node.type === 'definition') && typeof node.url === 'string') {
        const next = resolveUrl(base, fileDirRel, node.url);
        if (next) node.url = next;
      }
      if (Array.isArray(node.children)) for (const c of node.children) visit(c);
    };
    visit(tree);
  };
}
