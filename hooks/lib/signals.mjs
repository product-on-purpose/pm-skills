// hooks/lib/signals.mjs - detect a Triple Diamond phase from cheap cwd signals.
// Dependency-free: reads .git/HEAD directly (no git binary) and lists the cwd.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

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
    // In a worktree, .git is a FILE containing `gitdir: <path>`, not a directory.
    let gitDir = join(cwd, '.git');
    if (statSync(gitDir).isFile()) {
      const m = /gitdir:\s*(.+)/.exec(readFileSync(gitDir, 'utf8'));
      gitDir = m ? resolve(cwd, m[1].trim()) : gitDir;
    }
    const head = readFileSync(join(gitDir, 'HEAD'), 'utf8').trim();
    const m = /ref:\s*refs\/heads\/([^/\s]+)/.exec(head);
    if (m && PHASES.includes(m[1])) return m[1];
  } catch {
    /* no .git, detached HEAD, or unreadable -> no branch signal */
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
    if (!name.toLowerCase().endsWith('.md')) continue; // artifacts are .md docs; skip source dirs
    for (const [re, phase] of ARTIFACT_KEYWORDS) {
      if (re.test(name)) return phase;
    }
  }
  return null;
}

export function resolvePhase(branch, artifact) {
  return branch || artifact || null;
}
