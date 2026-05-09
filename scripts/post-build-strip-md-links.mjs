// Codex P0 fix (post-Phase 2 review): strip .md/.mdx extensions from intra-doc
// link hrefs in built HTML so navigation resolves to Starlight slug URLs.
//
// Repo-root meta files (README, CHANGELOG, CONTRIBUTING, LICENSE, AGENTS)
// preserved (intentional GitHub source references).
//
// Why post-build script: Astro's markdown.remarkPlugins config didn't pick
// up our custom plugin in the Starlight + custom-glob-loader setup. This
// post-processor runs on dist HTML directly. Reliable, no plugin needed.

import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const PRESERVE_RE = /(?:^|\/)(?:README|CHANGELOG|CONTRIBUTING|LICENSE|AGENTS)\.md(?:#|$)/;

let totalStripped = 0;
let filesUpdated = 0;

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) processFile(full);
  }
}

function processFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf8');
  let count = 0;
  content = content.replace(/href="([^"]*\.(?:md|mdx))(#[^"]*)?"/g, (match, url, frag) => {
    if (/^https?:|^mailto:|^tel:/.test(url)) return match;
    if (PRESERVE_RE.test(url)) return match;
    count++;
    const stripped = url.replace(/\.(md|mdx)$/, '');
    const newUrl = stripped.endsWith('/') ? stripped : stripped + '/';
    return `href="${newUrl}${frag || ''}"`;
  });
  if (count > 0) {
    fs.writeFileSync(filepath, content);
    totalStripped += count;
    filesUpdated++;
  }
}

if (!fs.existsSync(DIST)) {
  console.error('dist/ not found; run `npm run build` first');
  process.exit(1);
}

walk(DIST);
console.log(`[strip-md-links] stripped ${totalStripped} link(s) across ${filesUpdated} file(s)`);
