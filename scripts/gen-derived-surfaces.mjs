// scripts/gen-derived-surfaces.mjs - the zero-drift generator for the derived
// count surfaces on the front-door README and the three plugin manifests.
// WS-Z2 / M-36. Spec: docs/internal/release-plans/v2.31.0/spec_zero-drift-program.md
// (REQ-Z2.1 .. REQ-Z2.8). Companion to scripts/gen-skill-manifest.mjs, whose
// pattern this copies: single-source Node, a sibling .test.mjs, EOL-agnostic
// comparison, a --check tripwire that exits non-zero on drift, and loud marker
// refusal when a generated region's marker pair is missing.
//
// Modes:
//   node scripts/gen-derived-surfaces.mjs           rewrite every derived surface in place
//   node scripts/gen-derived-surfaces.mjs --check    exit non-zero if any surface is stale
//
// SOURCE OF TRUTH. Every count comes from skill-manifest.json (itself generated
// from skills/*/SKILL.md frontmatter by gen-skill-manifest.mjs and CI-gated).
// This generator never re-derives counts from disk; it reads the manifest catalog,
// so a count is wrong in exactly one place or nowhere.
//
// EMIT TARGETS (PR1 / this stage - README catalog + the 3 manifest descriptions):
//
//   README.md, between explicit HTML-comment markers (the AGENTS.md skills-catalog
//   precedent). Two catalog regions are owned:
//     <!-- pmskills:catalog-badges:start ... --> ... <!-- pmskills:catalog-badges:end -->
//         the four Skill Library count badges (phase / foundation / tool / utility).
//     <!-- pmskills:catalog-table:start  ... --> ... <!-- pmskills:catalog-table:end -->
//         the Classification | Count | What's in it summary table.
//   These are DISTINCT from the pre-existing count-exempt:start/end markers, which
//   only EXEMPT historical prose from the count gate; these GENERATE content.
//   The README version badge line and the "Current version" row are deliberately
//   left OUTSIDE any marker: release-please owns those via x-release-please-version
//   annotations (WS-Z1, a later stage), so the two systems never fight over a line.
//   ZD-2 = A (2026-07-04): the mega-README keeps its full length; only the
//   count-bearing catalog regions become generator-owned. No section is removed.
//
//   The three plugin manifest description headlines, via the pmskills:manifest-desc
//   ownership convention. A JSON string cannot carry an HTML-comment marker, so
//   ownership is by EXACT FIELD + a delimiter rule instead (REQ-Z2.5, spec OQ-3):
//     .claude-plugin/plugin.json      $.description
//     .claude-plugin/marketplace.json $.plugins[0].description
//     .codex-plugin/plugin.json       $.interface.longDescription
//   The generator owns the count-bearing HEADLINE only: everything before the first
//   vN.N.N version-narration token (the same boundary scripts/check-count-phrases.mjs
//   uses via manifestHeadline). The authored per-version narration tail after that
//   token - which carries the latest release's theme in full authored detail - stays
//   hand-maintained (ZD-2 = A / OQ-3 option A: keep the tail authored, do not retire
//   it here). --check compares the current headline against a freshly rendered one;
//   a hand-edited count in a headline fails CI exactly like a marker hand-edit.
//   The write path replaces only the headline substring, preserving the tail and all
//   other JSON formatting byte-for-byte (a targeted value-literal swap, not a
//   JSON re-serialization, so marketplace.json's compact single-line objects survive).
//
// PR2+PR3 (this stage, combined into one commit) extend this same generator with two
// more emit targets - do NOT create a second one:
//
//   The single-source quickstart (REQ-Z2.3). QUICKSTART.md and
//   site/src/content/docs/getting-started/quickstart.md both render their body from
//   ONE shared fragment (scripts/data/quickstart-fragment.md) inside
//   pmskills:quickstart:start/end markers, so the historical "67 vs 68" divergence
//   between the two copies is structurally impossible. Every count token in the
//   fragment is interpolated from the catalog; the only per-target difference is a
//   small link table (QUICKSTART_LINKS) for the handful of URLs that must legitimately
//   differ (absolute github.io links from the repo root vs Starlight-relative links
//   from inside the site) - never a second copy of the prose. Each surface keeps its
//   own frontmatter/H1 outside the marker.
//
//   The sub-agent compatibility matrix (REQ-Z2.4/REQ-Z2.7) at
//   site/src/content/docs/reference/sub-agent-compatibility.md, inside a
//   pmskills:compat-matrix:start/end marker. The sub-agent NAME list cannot come from
//   skill-manifest.json (catalog.sub_agents is a count, not a roster), so it is read
//   from agents/*.md and cross-joined against a small committed per-client status data
//   file (scripts/data/sub-agent-compat.json, seeded verbatim from the matrix it
//   replaces); a sub-agent present in one but not the other fails the run loudly
//   instead of silently drifting. The "as of vX.Y.Z" stamp is derived from
//   .claude-plugin/plugin.json's version, the same canonical source
//   scripts/validate-version-consistency.sh already treats as authoritative.
//
// Later stages still extend this same generator: PR4 the release-notes mirrors, and
// the release-please --about string.
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

// ---- README generated-region markers -------------------------------------------------

const MARK = (name, instruction = 'edit skill frontmatter, not this block') =>
  `<!-- pmskills:${name}:start (generated by scripts/gen-derived-surfaces.mjs; ${instruction}) -->`;
const END = (name) => `<!-- pmskills:${name}:end -->`;

export const BADGES_START = MARK('catalog-badges');
export const BADGES_END = END('catalog-badges');
export const TABLE_START = MARK('catalog-table');
export const TABLE_END = END('catalog-table');

// CRLF -> LF so every --check comparison is line-ending agnostic (Windows CI checks
// out *.md as CRLF; the generated block is LF). Same as gen-skill-manifest.mjs.
export const normalizeEol = (s) => s.replace(/\r\n/g, '\n');

// The boundary between the generator-owned count headline and the authored
// version-narration tail of a manifest description: the first vN.N.N token.
const VERSION_TOKEN = /\bv\d+\.\d+\.\d+/;

function fail(msg) {
  throw new Error(msg);
}

// ---- catalog source ------------------------------------------------------------------

/** Parse skill-manifest.json text and return its catalog, failing loudly if the
 *  count keys this generator depends on are absent. Pure: takes the file text. */
export function loadCatalog(manifestText) {
  let obj;
  try {
    obj = JSON.parse(manifestText);
  } catch (e) {
    fail(`skill-manifest.json: invalid JSON (${e.message})`);
  }
  const c = obj && obj.catalog;
  if (!c || typeof c !== 'object') fail('skill-manifest.json: missing catalog object');
  for (const k of ['skills', 'phase', 'foundation', 'utility', 'tool', 'sub_agents']) {
    if (typeof c[k] !== 'number') fail(`skill-manifest.json: catalog.${k} missing or not a number`);
  }
  return c;
}

// ---- README renderers ----------------------------------------------------------------

/** The four Skill Library count badges. Every count is interpolated from the
 *  catalog; both the badge label and the alt text carry it. Trailing newline so
 *  the :end marker lands on its own line (the spliceAgents contract). */
export function renderCatalogBadges(c) {
  return [
    '<p>',
    `  <img src="https://img.shields.io/badge/Phase-${c.phase}_skills-7c3aed?style=for-the-badge" alt="Phase Skills: ${c.phase}">`,
    `  <img src="https://img.shields.io/badge/Foundation-${c.foundation}_skills-059669?style=for-the-badge" alt="Foundation Skills: ${c.foundation}">`,
    `  <img src="https://img.shields.io/badge/Tool_Families-${c.tool}_skills-0284c7?style=for-the-badge" alt="Tool Family Skills: ${c.tool}">`,
    `  <img src="https://img.shields.io/badge/Utility-${c.utility}_skills-ea580c?style=for-the-badge" alt="Utility Skills: ${c.utility}">`,
    '</p>',
    '',
  ].join('\n');
}

/** The Classification | Count | What's in it summary table. The Count column is
 *  generator-owned (from the catalog); the descriptive "What's in it" prose is
 *  authored structural text that lives inside this config, the single home for it
 *  (the FOUNDATION_NOTE / TOOL_INTRO precedent in gen-skill-manifest.mjs). The
 *  count values are two digits today, so the column padding is stable. */
export function renderCatalogTable(c) {
  return [
    "| Classification                       | Count | What's in it                                                                                         |",
    '| ------------------------------------ | ----: | ---------------------------------------------------------------------------------------------------- |',
    `| **Phase** (Triple Diamond)           | ${c.phase}    | One skill per major PM activity across Discover, Define, Develop, Deliver, Measure, and Iterate      |`,
    `| **Foundation** (cross-cutting)       | ${c.foundation}    | Persona, lean canvas, OKRs, prioritized action plan, stakeholder briefings, and the full meeting skills family |`,
    `| **Utility** (meta-tooling)           | ${c.utility}    | pm-skill-builder, pm-skill-validate, pm-skill-iterate, pm-workflow-builder, pm-workflow-orchestrator, mermaid-diagrams, slideshow-creator, update-pm-skills, and helpers |`,
    `| **Tool Families** (workshop methods) | ${c.tool}    | Foundation Sprint family (7) + Design Sprint family (7) + note-and-vote (1)                          |`,
    '',
  ].join('\n');
}

/** Splice a generated block between its markers. Refuses (loudly) unless both
 *  markers are present in order - the spliceAgents contract, so a hand edit that
 *  drops a marker fails the run instead of writing into the wrong place. */
export function splice(text, startMarker, endMarker, block) {
  const s = text.indexOf(startMarker);
  const e = text.indexOf(endMarker);
  if (s === -1 || e === -1 || e < s) {
    fail(`README.md: marker pair not found (${startMarker} / ${endMarker}); refusing to write`);
  }
  return `${text.slice(0, s + startMarker.length)}\n${block}${text.slice(e)}`;
}

export const README_REGIONS = [
  { start: BADGES_START, end: BADGES_END, render: renderCatalogBadges },
  { start: TABLE_START, end: TABLE_END, render: renderCatalogTable },
];

// ---- manifest description headlines --------------------------------------------------

/** The generator-owned count HEADLINE of a manifest description: everything before
 *  the first vN.N.N version token. Matches check-count-phrases.mjs manifestHeadline. */
export function descriptionHeadline(desc) {
  const m = desc.match(VERSION_TOKEN);
  return m ? desc.slice(0, m.index) : desc;
}

/** The authored version-narration tail: from the first vN.N.N token onward. */
export function descriptionTail(desc) {
  const m = desc.match(VERSION_TOKEN);
  return m ? desc.slice(m.index) : '';
}

// Per-manifest count-headline templates. Each reproduces the current authored
// wording verbatim with the counts (and sub-agent count) interpolated from the
// catalog, ending with the trailing space that precedes the version tail. The
// sub-agent NAME roster is authored literal text: the count is drift-gated (by
// this generator and by check-count-phrases), a name-list change is a deliberate
// release edit here.
const SUBAGENTS = 'pm-critic, pm-skill-auditor, pm-changelog-curator, pm-release-conductor, pm-workflow-orchestrator, pm-skill-router';

export function renderManifestHeadline(id, c) {
  switch (id) {
    case 'plugin':
      return `${c.skills} product management skills (${c.phase} phase + ${c.foundation} foundation + ${c.utility} utility + ${c.tool} tool) plus ${c.sub_agents} sub-agents (${SUBAGENTS}) for AI agents covering the full product lifecycle from discovery through iteration. `;
    case 'marketplace':
      return `${c.skills} PM skills (${c.phase} phase + ${c.foundation} foundation + ${c.utility} utility + ${c.tool} tool) plus ${c.sub_agents} sub-agents (${SUBAGENTS}) covering the full product lifecycle. `;
    case 'codex':
      return `${c.skills} product management skills across the full product lifecycle, including PRDs, user stories, acceptance criteria, OKRs, lean canvas, personas, meeting artifacts, discovery synthesis, measurement planning, release notes, workshop tools, workflow authoring and ad-hoc chaining, and pm-skills lifecycle utilities. `;
    default:
      return fail(`renderManifestHeadline: unknown manifest id "${id}"`);
  }
}

// Field locators. `get` reads the owned description string from a parsed manifest.
export const MANIFEST_SPECS = [
  { id: 'plugin', file: '.claude-plugin/plugin.json', get: (o) => o.description },
  { id: 'marketplace', file: '.claude-plugin/marketplace.json', get: (o) => o.plugins[0].description },
  { id: 'codex', file: '.codex-plugin/plugin.json', get: (o) => o.interface.longDescription },
];

/** The stale/current verdict for one manifest description, plus the new value to
 *  write if stale. Pure: takes the current description string and the catalog. */
export function evalManifest(id, currentValue, c) {
  const expected = renderManifestHeadline(id, c);
  const current = descriptionHeadline(currentValue);
  const stale = normalizeEol(current) !== normalizeEol(expected);
  return { stale, newValue: expected + descriptionTail(currentValue) };
}

// ---- shared quickstart fragment (QUICKSTART.md + the site quickstart) ----------------

export const QUICKSTART_START = MARK('quickstart', 'edit scripts/data/quickstart-fragment.md, not this block');
export const QUICKSTART_END = END('quickstart');

// The only legitimate per-target difference: a handful of links that must be absolute
// (QUICKSTART.md is read raw off GitHub, with no site routing under it) on the root
// surface and Starlight-relative on the site surface. Every word of prose and every
// count comes from the ONE fragment file, so the two surfaces can never diverge on
// anything but these looked-up strings.
export const QUICKSTART_LINKS = {
  root: {
    PLATFORMS_LINK: 'https://product-on-purpose.github.io/pm-skills/getting-started/platforms/',
    WALKTHROUGH_LINK: 'https://product-on-purpose.github.io/pm-skills/getting-started/',
    LIFECYCLE_GUIDE_LINK: 'https://product-on-purpose.github.io/pm-skills/guides/pm-skill-lifecycle/',
    LEARN_MORE_LINKS: [
      '- Full documentation: https://product-on-purpose.github.io/pm-skills/',
      '- GitHub repository: https://github.com/product-on-purpose/pm-skills',
      '- Skill specification: https://agentskills.io/specification',
    ].join('\n'),
  },
  site: {
    PLATFORMS_LINK: 'platforms.md',
    WALKTHROUGH_LINK: 'index.md',
    LIFECYCLE_GUIDE_LINK: '../guides/pm-skill-lifecycle.md',
    LEARN_MORE_LINKS: [
      '- Full documentation: [pm-skills docs home](../)',
      '- Skill specification: https://agentskills.io/specification',
    ].join('\n'),
  },
};

/** Render the shared quickstart body for one target ('root' | 'site'): every
 *  {{COUNT_TOKEN}} is interpolated from the catalog (so a catalog change can never
 *  leave one surface behind), every {{LINK_TOKEN}} from QUICKSTART_LINKS[target].
 *  Fails loudly on an unknown target or an unresolved token, so a typo'd token cannot
 *  silently ship as literal "{{...}}" text on the rendered page. */
export function renderQuickstartBody(fragmentText, c, target) {
  const links = QUICKSTART_LINKS[target];
  if (!links) fail(`renderQuickstartBody: unknown target "${target}"`);
  const tokens = {
    SKILLS: c.skills,
    PHASE: c.phase,
    FOUNDATION: c.foundation,
    UTILITY: c.utility,
    TOOL: c.tool,
    COMMANDS: c.commands,
    WORKFLOW_COMMANDS: c.commands - 1,
    WORKFLOWS: c.workflows,
    WORKFLOWS_MINUS_3: c.workflows - 3,
    ...links,
  };
  return fragmentText.replace(/\{\{(\w+)\}\}/g, (m, name) => {
    if (!(name in tokens)) fail(`renderQuickstartBody: unresolved token {{${name}}}`);
    return String(tokens[name]);
  });
}

// The two rendered surfaces, repo-root-relative. Same fragment, same catalog, one
// target string apiece; this is the whole list a future third quickstart copy would
// join, not a second source of truth.
export const QUICKSTART_TARGETS = [
  { rel: 'QUICKSTART.md', target: 'root', label: 'QUICKSTART.md' },
  { rel: 'site/src/content/docs/getting-started/quickstart.md', target: 'site', label: 'site quickstart' },
];

// ---- sub-agent compatibility matrix ---------------------------------------------------

export const COMPAT_START = MARK('compat-matrix', 'edit scripts/data/sub-agent-compat.json, not this block');
export const COMPAT_END = END('compat-matrix');

/** The current release version, read from .claude-plugin/plugin.json - the same file
 *  scripts/validate-version-consistency.sh already treats as the one canonical version
 *  source the other manifests + the README badge/row are checked against. Used to
 *  derive the compat-matrix "as of" stamp so it moves with a real version bump instead
 *  of needing its own hand-edit. */
export function currentVersion(pluginJsonText) {
  const v = JSON.parse(pluginJsonText).version;
  if (typeof v !== 'string' || !v) fail('.claude-plugin/plugin.json: version missing or not a string');
  return v;
}

/** Sub-agent ids: one per agents/*.md file (excluding a README), mirroring
 *  check-count-phrases.mjs's deriveAgents. skill-manifest.json's catalog.sub_agents is
 *  a COUNT only, not a roster, so the matrix's row list has to come from the real
 *  files; the count is still cross-checked below so a mismatch cannot pass silently. */
export function discoverAgentIds(agentsDir) {
  return readdirSync(agentsDir)
    .filter((f) => f.endsWith('.md') && f.toLowerCase() !== 'readme.md')
    .map((f) => f.slice(0, -3))
    .sort();
}

/** Cross-join the real agent-file ids against the status data file's rows, returning
 *  the rows in the data file's own declared display order. Fails loudly - the same
 *  posture as gen-skill-manifest.mjs's "unknown tool family" guard - on a sub-agent
 *  added but not documented, a status row for a sub-agent that no longer exists, or a
 *  catalog.sub_agents count that disagrees with the real agents/ file count. */
export function crossJoinSubAgents(agentIds, data, catalogSubAgents) {
  const dataIds = data.sub_agents.map((a) => a.id);
  const missing = agentIds.filter((id) => !dataIds.includes(id));
  const orphaned = dataIds.filter((id) => !agentIds.includes(id));
  if (missing.length) fail(`sub-agent-compat.json: no status row for ${missing.join(', ')} (present in agents/, missing from the data file)`);
  if (orphaned.length) fail(`sub-agent-compat.json: orphan status row for ${orphaned.join(', ')} (in the data file, no matching agents/*.md)`);
  if (catalogSubAgents !== agentIds.length) fail(`skill-manifest.json catalog.sub_agents (${catalogSubAgents}) does not match the agents/ file count (${agentIds.length})`);
  return data.sub_agents;
}

/** The "## Cross-Client Status" heading + intro + table, reproducing the hand-authored
 *  block it replaces (content-equivalent by construction): the version and the
 *  sub-agent count are derived, the per-row cells and the intro's authored tail come
 *  from the status data file (REQ-Z2.4/REQ-Z2.7). */
export function renderCompatMatrixBlock(data, rows, catalogSubAgents, version) {
  const header = `| Sub-agent | Dispatch skill | ${data.clients.join(' | ')} |`;
  const sep = `|${'---|'.repeat(data.clients.length + 2)}`;
  return [
    `## Cross-Client Status (as of v${version})`,
    '',
    `This matrix now covers all ${catalogSubAgents} ${data.intro_tail}`,
    '',
    header,
    sep,
    ...rows.map((r) => `| ${r.label} | ${r.dispatch} | ${r.cells.join(' | ')} |`),
    '',
  ].join('\n');
}

// ---- CLI -----------------------------------------------------------------------------

function main() {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  const check = process.argv.slice(2).includes('--check');
  const manifestPath = join(repo, 'skill-manifest.json');
  if (!existsSync(manifestPath)) fail('skill-manifest.json not found; run: node scripts/gen-skill-manifest.mjs');
  const catalog = loadCatalog(readFileSync(manifestPath, 'utf8'));

  let stale = 0;

  // Shared "splice a region, report, count staleness" step for every surface added
  // this stage (the README catalog regions above keep their own inline form; this is
  // new code serving new call sites, not a retrofit of already-shipped logic).
  const emit = (label, path, current, next) => {
    if (normalizeEol(current) === normalizeEol(next)) {
      if (!check) console.log(`${label} is current.`);
      return;
    }
    if (check) {
      console.error(`STALE  ${label} does not match its source. Run: node scripts/gen-derived-surfaces.mjs`);
      stale++;
      return;
    }
    writeFileSync(path, next);
    console.log(`${label} rewritten.`);
  };

  // README catalog regions.
  const readmePath = join(repo, 'README.md');
  const readmeText = readFileSync(readmePath, 'utf8');
  let next = readmeText;
  for (const r of README_REGIONS) next = splice(next, r.start, r.end, r.render(catalog));
  if (normalizeEol(readmeText) !== normalizeEol(next)) {
    if (check) {
      console.error('STALE  README.md catalog blocks do not match the manifest. Run: node scripts/gen-derived-surfaces.mjs');
      stale++;
    } else {
      writeFileSync(readmePath, next);
      console.log('README.md catalog blocks rewritten.');
    }
  } else if (!check) {
    console.log('README.md catalog blocks are current.');
  }

  // Shared quickstart fragment: QUICKSTART.md + the site quickstart (REQ-Z2.3). One
  // fragment, one catalog, one loop over the two targets - never a second fragment.
  const fragmentPath = join(repo, 'scripts', 'data', 'quickstart-fragment.md');
  const fragmentText = readFileSync(fragmentPath, 'utf8');
  for (const t of QUICKSTART_TARGETS) {
    const p = join(repo, t.rel);
    const current = readFileSync(p, 'utf8');
    const block = renderQuickstartBody(fragmentText, catalog, t.target);
    const nextText = splice(current, QUICKSTART_START, QUICKSTART_END, block);
    emit(t.label, p, current, nextText);
  }

  // Sub-agent compatibility matrix (REQ-Z2.4/REQ-Z2.7): agents/*.md is the name
  // roster (skill-manifest.json only carries the count), cross-joined against the
  // per-client status data file; catalog.sub_agents is the redundant drift check.
  const compatPath = join(repo, 'site/src/content/docs/reference/sub-agent-compatibility.md');
  const compatDataPath = join(repo, 'scripts', 'data', 'sub-agent-compat.json');
  const compatData = JSON.parse(readFileSync(compatDataPath, 'utf8'));
  const agentIds = discoverAgentIds(join(repo, 'agents'));
  const compatRows = crossJoinSubAgents(agentIds, compatData, catalog.sub_agents);
  const version = currentVersion(readFileSync(join(repo, '.claude-plugin/plugin.json'), 'utf8'));
  const compatCurrent = readFileSync(compatPath, 'utf8');
  const compatBlock = renderCompatMatrixBlock(compatData, compatRows, catalog.sub_agents, version);
  const compatNext = splice(compatCurrent, COMPAT_START, COMPAT_END, compatBlock);
  emit('sub-agent-compatibility.md', compatPath, compatCurrent, compatNext);

  // Manifest description headlines.
  for (const spec of MANIFEST_SPECS) {
    const p = join(repo, spec.file);
    const raw = readFileSync(p, 'utf8');
    const value = spec.get(JSON.parse(raw));
    if (typeof value !== 'string') fail(`${spec.file}: owned description field is missing or not a string`);
    const { stale: isStale, newValue } = evalManifest(spec.id, value, catalog);
    if (!isStale) {
      if (!check) console.log(`${spec.file} description headline is current.`);
      continue;
    }
    if (check) {
      console.error(`STALE  ${spec.file} description headline does not match the manifest counts. Run: node scripts/gen-derived-surfaces.mjs`);
      stale++;
      continue;
    }
    const oldLit = JSON.stringify(value);
    const newLit = JSON.stringify(newValue);
    if (raw.split(oldLit).length - 1 !== 1) {
      fail(`${spec.file}: description value literal not found exactly once; refusing to write`);
    }
    writeFileSync(p, raw.replace(oldLit, newLit));
    console.log(`${spec.file} description headline rewritten.`);
  }

  if (check) {
    if (stale) {
      console.error(`\ngen-derived-surfaces: ${stale} stale surface(s).`);
      process.exit(1);
    }
    console.log('gen-derived-surfaces: all derived surfaces are current.');
  }
}

// CLI guard: only run when executed directly, never when imported by the test.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
