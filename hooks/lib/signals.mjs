// hooks/lib/signals.mjs - detect a Triple Diamond phase from cheap cwd signals.
// Dependency-free: reads .git/HEAD directly (no git binary) and lists the cwd.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const PHASES = ['discover', 'define', 'develop', 'deliver', 'measure', 'iterate'];

// filename keyword -> phase (artifact-presence heuristic; advisory only)
const ARTIFACT_KEYWORDS = [
  [/\bprd\b|acceptance-criteria|user-stor/i, 'deliver'],
  [/\bokr\b|dashboard|instrumentation/i, 'measure'],
  [/persona|problem-statement|jtbd/i, 'define'],
  [/journey-map|interview|competitive/i, 'discover'],
  [/retro|pivot|lessons/i, 'iterate'],
  [/adr|solution-brief|spike/i, 'develop'],
];

export function branchPhase(cwd) {
  try {
    const head = readFileSync(join(cwd, '.git', 'HEAD'), 'utf8').trim();
    const m = /ref:\s*refs\/heads\/([^/\s]+)/.exec(head);
    if (m && PHASES.includes(m[1])) return m[1];
  } catch {
    /* no .git or unreadable -> no branch signal */
  }
  return null;
}

export function artifactPhase(cwd) {
  let names;
  try {
    names = readdirSync(cwd);
  } catch {
    return null;
  }
  for (const name of names) {
    for (const [re, phase] of ARTIFACT_KEYWORDS) {
      if (re.test(name)) return phase;
    }
  }
  return null;
}

export function resolvePhase(branch, artifact) {
  return branch || artifact || null;
}
