// scripts/trigger-eval-roster.mjs - loads the M-31 trigger-eval roster + collision
// pairs from trigger-eval-roster.yaml (the single source of truth, WS-T10 / v2.30.0).
//
// Extracted from in-code literals in check-trigger-fixtures.mjs so the three eval
// consumers (check-trigger-fixtures.mjs, run-router-evals.mjs, check-new-skill-collision.mjs)
// read ONE data file instead of hand-synced arrays. The in-code roster had drifted
// to 29 vs 31 fixture sets on disk (audit P1-5); the data file closes that gap.
//
// js-yaml is the declared root devDependency (package.json), installed in CI before
// the unit-test step (npm ci). Loaded synchronously at module init so ROSTER and
// COLLISION_PAIRS are plain top-level exports, mirroring the previous in-code shape.
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import yaml from 'js-yaml';

const ROSTER_PATH = join(dirname(fileURLToPath(import.meta.url)), 'trigger-eval-roster.yaml');

const data = yaml.load(readFileSync(ROSTER_PATH, 'utf8')) || {};

if (!Array.isArray(data.roster) || !data.roster.every((s) => typeof s === 'string')) {
  throw new Error(`trigger-eval-roster.yaml: "roster" must be a list of skill-name strings (got ${JSON.stringify(data.roster)})`);
}
if (!Array.isArray(data.collision_pairs) || !data.collision_pairs.every((p) => Array.isArray(p) && p.length === 2)) {
  throw new Error(`trigger-eval-roster.yaml: "collision_pairs" must be a list of [a, b] pairs (got ${JSON.stringify(data.collision_pairs)})`);
}

/** The trigger-eval roster: every skill that must ship evals/trigger-fixtures.json. */
export const ROSTER = data.roster;

/** Curated near-duplicate pairs; each member must carry near-miss negatives at the other. */
export const COLLISION_PAIRS = data.collision_pairs;

/** The absolute path to the roster data file (for tooling that wants to point at it). */
export const ROSTER_FILE = ROSTER_PATH;

/** Curated collision partners of `skill` (both directions across COLLISION_PAIRS). Pure. */
export function partnersOf(skill) {
  const out = [];
  for (const [a, b] of COLLISION_PAIRS) {
    if (a === skill) out.push(b);
    if (b === skill) out.push(a);
  }
  return out;
}
