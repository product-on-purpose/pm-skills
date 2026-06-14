// scripts/check-new-skill-collision.mjs - B-3 new-skill collision merge gate (M-31).
//
// When a new skill is added, this probe asks the controlled router (the trustworthy
// instrument from run-router-evals.mjs) whether the new skill's description collides with
// its neighbors. It runs the router with the new skill IN the catalog and asserts:
//   - recall:    the new skill's should-trigger queries route to the new skill;
//   - no-theft:  no neighbor's should-trigger query is stolen by the new skill;
//   - precision: the new skill does not fire on near-miss queries that belong to a neighbor.
//
// Neighbors are derived empirically from fixture `near_miss_of` declarations in BOTH
// directions (queries the new skill points at, and queries that point at the new skill),
// unioned with any curated COLLISION_PAIRS partner - so the gate works for a brand-new
// skill that is not in the curated pair list yet.
//
// Engine: the Messages API (reuses run-router-evals.mjs). Pure functions are exported and
// unit-tested with no API; the live run is dispatch-gated (cost), never enforcing CI.
//
// Usage:
//   node scripts/check-new-skill-collision.mjs --skill=deliver-acceptance-criteria --dry-run
//   node scripts/check-new-skill-collision.mjs --skill=<new-skill> --model=claude-haiku-4-5
import { readFileSync, globSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { route, majority, buildCatalog, systemPrompt, mapPool, CALIBRATION } from './run-router-evals.mjs';
import { partnersOf } from './check-trigger-fixtures.mjs';

/** Neighbors of `newSkill`: skills its no-trigger queries point at (forward), skills whose
 *  no-trigger queries point at it (backward), plus `extra` (e.g. curated partners). Pure. */
export function derivePartners(newSkill, fixturesBySkill, extra = []) {
  const out = new Set(extra);
  const own = fixturesBySkill[newSkill];
  if (own) for (const q of own.queries) if (q.expect === 'no-trigger' && q.near_miss_of) out.add(q.near_miss_of);
  for (const [name, fx] of Object.entries(fixturesBySkill)) {
    if (name === newSkill) continue;
    if (fx.queries.some((q) => q.expect === 'no-trigger' && q.near_miss_of === newSkill)) out.add(name);
  }
  out.delete(newSkill);
  return [...out].sort();
}

/** Build the probe task list for `newSkill` against `partners`. Each task carries the
 *  assertion it must satisfy once routed. Pure (no API). */
export function collisionTasks(newSkill, fixturesBySkill, partners) {
  const tasks = [];
  const own = fixturesBySkill[newSkill];
  if (own) {
    for (const q of own.queries) {
      if (q.expect === 'trigger') tasks.push({ kind: 'recall', q: q.q, owner: newSkill, mustPick: newSkill });
      else if (q.near_miss_of) tasks.push({ kind: 'precision', q: q.q, owner: newSkill, mustNotPick: newSkill, expectPick: q.near_miss_of });
    }
  }
  for (const p of partners) {
    const pf = fixturesBySkill[p];
    if (!pf) continue;
    for (const q of pf.queries) {
      if (q.expect === 'trigger') tasks.push({ kind: 'no-theft', q: q.q, owner: p, mustNotPick: newSkill, expectPick: p });
      // A neighbor's no-trigger query that points AT the new skill belongs to the new
      // skill (it is the evidence that derived this neighbor). With the new skill in the
      // catalog it must route to the new skill, else the new skill's description is too
      // weak to claim its own domain (a backward-recall miss).
      else if (q.near_miss_of === newSkill) tasks.push({ kind: 'back-recall', q: q.q, owner: p, mustPick: newSkill });
    }
  }
  return tasks;
}

/** Classify scored tasks (each task plus a `.pick`) into failure buckets. Pure. */
export function collisionVerdict(scored, newSkill) {
  const recallFails = scored.filter((t) => t.kind === 'recall' && t.pick !== newSkill);
  const backRecallFails = scored.filter((t) => t.kind === 'back-recall' && t.pick !== newSkill);
  const precisionFails = scored.filter((t) => t.kind === 'precision' && t.pick === newSkill);
  const theftFails = scored.filter((t) => t.kind === 'no-theft' && t.pick === newSkill);
  return {
    recallFails,
    backRecallFails,
    precisionFails,
    theftFails,
    pass: !recallFails.length && !backRecallFails.length && !precisionFails.length && !theftFails.length,
  };
}

function loadFixtures(repo) {
  const files = globSync('skills/*/evals/trigger-fixtures.json', { cwd: repo });
  const map = {};
  for (const f of files) { const fx = JSON.parse(readFileSync(join(repo, f), 'utf8')); map[fx.skill] = fx; }
  return map;
}

async function main() {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  const argv = process.argv.slice(2);
  const arg = (k, d) => { const a = argv.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
  const flag = (k) => argv.includes('--' + k);
  const newSkill = arg('skill', '');
  const model = arg('model', 'claude-haiku-4-5');
  const runs = parseInt(arg('runs', '3'), 10);
  const conc = parseInt(arg('concurrency', '8'), 10);
  if (!newSkill) { console.error('ERROR: --skill=<name> is required'); process.exit(1); }
  // Defense-in-depth allowlist (the CI job also passes this via a quoted env var): a skill
  // name is a lowercase slug. Rejects anything that could carry shell metacharacters.
  if (!/^[a-z0-9-]+$/.test(newSkill)) { console.error(`ERROR: --skill must be a lowercase slug [a-z0-9-]; got ${JSON.stringify(newSkill)}`); process.exit(1); }

  const manifest = JSON.parse(readFileSync(join(repo, 'skill-manifest.json'), 'utf8'));
  const names = manifest.entries.map((e) => e.name.toLowerCase());
  if (!names.includes(newSkill.toLowerCase())) { console.error(`ERROR: "${newSkill}" is not in skill-manifest.json (regenerate it after adding the skill)`); process.exit(1); }
  const system = systemPrompt(buildCatalog(manifest.entries.map((e) => ({ n: e.name, d: e.description }))));

  const fixturesBySkill = loadFixtures(repo);
  if (!fixturesBySkill[newSkill]) { console.error(`ERROR: skills/${newSkill}/evals/trigger-fixtures.json not found (a new skill needs fixtures: see B-4 / C-1)`); process.exit(1); }

  const partners = derivePartners(newSkill, fixturesBySkill, partnersOf(newSkill));
  const tasks = collisionTasks(newSkill, fixturesBySkill, partners);
  // Fail closed: a fixture with no usable queries would make collisionVerdict([]) pass
  // vacuously (no tasks = no failures). Because the enforcing fixture validator is
  // roster-scoped, a brand-new non-roster skill could ship an empty/thin fixture, so the
  // gate must refuse to certify when there is nothing (or no recall coverage) to probe.
  const recallCount = tasks.filter((t) => t.kind === 'recall').length;
  if (!tasks.length || !recallCount) {
    console.error(`ERROR: ${newSkill} has no usable probe coverage (recall ${recallCount}, total ${tasks.length}). A new skill needs trigger fixtures before the collision gate can certify it (see B-4 / C-1). Failing closed.`);
    process.exit(1);
  }
  const calls = (CALIBRATION.length + tasks.length) * runs;
  console.log(`collision probe: ${newSkill} vs [${partners.join(', ') || 'no declared neighbors'}]`);
  console.log(`plan: ${tasks.length} probe queries + ${CALIBRATION.length} calibration, ${calls} API calls (model ${model}, runs ${runs})`);
  if (flag('dry-run')) { console.log('dry-run: no API calls.'); return; }

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) { console.error('ERROR: ANTHROPIC_API_KEY not set (use --dry-run to plan without a key)'); process.exit(1); }
  const usage = { in: 0, out: 0, cw: 0, cr: 0, calls: 0, fails: 0 };
  const routeFn = (q) => route(system, names, q, { key, model, usage });

  const cal = await mapPool(CALIBRATION, conc, async (c) => { const r = await majority(c.q, 1, routeFn); return { ...c, ok: r.pick === c.expect, hard: r.hard }; });
  if (cal.stopped) { console.error('HARD STOP during calibration (key/credit/auth). Aborting.'); process.exit(2); }
  const calPass = cal.out.filter((c) => c.ok).length;
  console.log(`calibration: ${calPass}/${CALIBRATION.length}`);
  if (calPass < CALIBRATION.length - 1) { console.error('CALIBRATION FAILED (instrument not discriminating). Aborting.'); process.exit(3); }

  const { out: scored, stopped } = await mapPool(tasks, conc, async (t) => { const r = await majority(t.q, runs, routeFn); return { ...t, pick: r.pick, hard: r.hard }; });
  if (stopped) { console.error('HARD STOP mid-probe (key/credit). Aborting; verdict would be partial.'); process.exit(2); }

  const v = collisionVerdict(scored, newSkill);
  const show = (label, fails, fmt) => { if (fails.length) { console.error(`\n${label} (${fails.length}):`); for (const f of fails) console.error('  ' + fmt(f)); } };
  show('THEFT - a neighbor query routed to the new skill', v.theftFails, (f) => `${f.owner} query stolen by ${newSkill}: "${f.q}"`);
  show('RECALL - the new skill missed its own query', v.recallFails, (f) => `routed to ${f.pick}: "${f.q}"`);
  show('BACK-RECALL - a query a neighbor disclaimed to the new skill did not route to it', v.backRecallFails, (f) => `from ${f.owner}, routed to ${f.pick}: "${f.q}"`);
  show('PRECISION - the new skill fired on a neighbor query', v.precisionFails, (f) => `belongs to ${f.expectPick}: "${f.q}"`);

  if (v.pass) { console.log(`\nPASS: no collision. ${newSkill} recalls its queries (incl. ${tasks.filter((t) => t.kind === 'back-recall').length} disclaimed by neighbors), steals none from [${partners.join(', ')}], and respects neighbor boundaries.`); process.exit(0); }
  console.error(`\nFAIL: collision detected for ${newSkill} (theft ${v.theftFails.length}, recall ${v.recallFails.length}, back-recall ${v.backRecallFails.length}, precision ${v.precisionFails.length}).`);
  process.exit(5);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
