// scripts/check-trigger-fixtures.mjs - deterministic structure validator for the
// M-31 trigger-eval fixtures (skills/<name>/evals/trigger-fixtures.json).
// Spec: docs/internal/release-plans/v2.27.0/spec_trigger-accuracy-evals.md (section 3).
// CI-only Node check (out of the shell parity remit). Promoted to ENFORCING in
// validation.yml on 2026-06-14 (B-4) now that the roster corpus is stable (31 fixture
// sets as of v2.30.0); a malformed fixture or a roster skill missing its fixture file
// fails CI. Roster + collision pairs load from trigger-eval-roster.yaml (WS-T10).
import { readFileSync, globSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

// The Phase 1 roster + curated collision pairs moved to trigger-eval-roster.yaml
// (WS-T10 / v2.30.0): the in-code ROSTER had drifted to 29 vs 31 fixture sets on
// disk (audit P1-5). They load via ./trigger-eval-roster.mjs. Imported here for
// this script's own use (missingRosterFixtures, partnersOf) and re-exported so
// check-trigger-fixtures.test.mjs keeps its existing import surface.
import { ROSTER, partnersOf } from './trigger-eval-roster.mjs';
export { ROSTER, COLLISION_PAIRS, partnersOf } from './trigger-eval-roster.mjs';

// Phase 1 fixed constants (spec T-D): present in each file, but not yet variable.
const RUNS_PER_QUERY = 3;
const TRIGGER_THRESHOLD = 0.5;
const MIN_TOTAL = 16;
const MIN_PER_CLASS = 8;
const SPLIT_TRAIN_FRACTION = 0.6;
const SPLIT_TOLERANCE = 1;
const MIN_NEAR_MISSES = 2;

/** Validate one parsed fixture object. Pure: filesystem facts arrive via opts.
 *  opts = { dirName, skillExists(name) -> bool, collisionPartners: [names] }.
 *  Returns an array of finding strings (empty = valid). */
export function validateFixture(fixture, opts) {
  const f = [];
  const { dirName, skillExists, collisionPartners } = opts;

  if (fixture.schema !== 1) f.push(`schema must be 1 (got ${JSON.stringify(fixture.schema)})`);
  if (fixture.skill !== dirName) f.push(`skill "${fixture.skill}" does not match directory "${dirName}"`);
  if (fixture.runs_per_query !== RUNS_PER_QUERY) f.push(`runs_per_query must be ${RUNS_PER_QUERY} in Phase 1`);
  if (fixture.trigger_threshold !== TRIGGER_THRESHOLD) f.push(`trigger_threshold must be ${TRIGGER_THRESHOLD} in Phase 1`);
  if (!Array.isArray(fixture.queries)) {
    f.push('queries must be an array');
    return f; // nothing below is checkable
  }

  const seen = new Set();
  const counts = { trigger: { train: 0, validation: 0 }, 'no-trigger': { train: 0, validation: 0 } };
  let nearMisses = 0;
  const nearMissTargets = new Set();

  fixture.queries.forEach((q, i) => {
    const at = `queries[${i}]`;
    if (typeof q.q !== 'string' || q.q.trim() === '') f.push(`${at}: q must be a non-empty string`);
    else if (seen.has(q.q)) f.push(`${at}: duplicate query "${q.q}"`);
    else seen.add(q.q);

    if (q.expect !== 'trigger' && q.expect !== 'no-trigger') f.push(`${at}: expect must be "trigger" or "no-trigger"`);
    if (q.split !== 'train' && q.split !== 'validation') f.push(`${at}: split must be "train" or "validation"`);
    if (counts[q.expect] && (q.split === 'train' || q.split === 'validation')) counts[q.expect][q.split] += 1;

    if (q.near_miss_of !== undefined) {
      if (q.expect !== 'no-trigger') f.push(`${at}: near_miss_of is only valid on a no-trigger query`);
      if (typeof q.near_miss_of !== 'string' || !skillExists(q.near_miss_of)) {
        f.push(`${at}: near_miss_of "${q.near_miss_of}" is not an existing skill`);
      } else {
        nearMisses += 1;
        nearMissTargets.add(q.near_miss_of);
      }
    }
  });

  const total = fixture.queries.length;
  const perClass = {
    trigger: counts.trigger.train + counts.trigger.validation,
    'no-trigger': counts['no-trigger'].train + counts['no-trigger'].validation,
  };
  if (total < MIN_TOTAL) f.push(`needs at least ${MIN_TOTAL} queries (got ${total})`);
  for (const cls of ['trigger', 'no-trigger']) {
    if (perClass[cls] < MIN_PER_CLASS) f.push(`needs at least ${MIN_PER_CLASS} "${cls}" queries (got ${perClass[cls]})`);
    const expectedTrain = Math.round(perClass[cls] * SPLIT_TRAIN_FRACTION);
    if (perClass[cls] >= MIN_PER_CLASS && Math.abs(counts[cls].train - expectedTrain) > SPLIT_TOLERANCE) {
      f.push(`"${cls}" split is ${counts[cls].train} train / ${counts[cls][`validation`]} validation; expected ~${expectedTrain} train (60/40, tolerance ${SPLIT_TOLERANCE})`);
    }
  }

  if (collisionPartners.length > 0) {
    if (nearMisses < MIN_NEAR_MISSES) {
      f.push(`collision-pair skill needs at least ${MIN_NEAR_MISSES} near-miss negatives (got ${nearMisses})`);
    }
    if (![...nearMissTargets].some((t) => collisionPartners.includes(t))) {
      f.push(`near-miss targets [${[...nearMissTargets].join(', ')}] include no declared collision partner of "${dirName}" (${collisionPartners.join(', ')})`);
    }
  }

  return f;
}

/** Roster names missing a fixture file, given the set of skill names that have one. */
export function missingRosterFixtures(namesWithFixtures) {
  return ROSTER.filter((name) => !namesWithFixtures.has(name));
}

function main() {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  const files = globSync('skills/*/evals/trigger-fixtures.json', { cwd: repo }).map((f) => join(repo, f));
  const skillExists = (name) => existsSync(join(repo, 'skills', name, 'SKILL.md'));
  let findings = 0;
  const present = new Set();

  for (const file of files) {
    const dirName = file.replace(/\\/g, '/').match(/skills\/([^/]+)\/evals\//)[1];
    present.add(dirName);
    let fixture;
    try {
      fixture = JSON.parse(readFileSync(file, 'utf8'));
    } catch (e) {
      findings += 1;
      console.log(`INVALID-JSON  ${file}: ${e.message}`);
      continue;
    }
    const bad = validateFixture(fixture, { dirName, skillExists, collisionPartners: partnersOf(dirName) });
    if (bad.length) {
      findings += bad.length;
      for (const b of bad) console.log(`FIXTURE  ${file}: ${b}`);
    }
  }

  for (const name of missingRosterFixtures(present)) {
    findings += 1;
    console.log(`MISSING  skills/${name}/evals/trigger-fixtures.json (Phase 1 roster, spec T-C)`);
  }

  console.log(findings ? `\n${findings} trigger-fixture finding(s) (enforcing).` : `no trigger-fixture findings (${files.length} fixture file(s) checked).`);
  process.exit(findings ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
