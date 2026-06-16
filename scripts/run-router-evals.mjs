// scripts/run-router-evals.mjs - controlled trigger-router eval (M-31, the trustworthy
// instrument that replaced the environment-confounded headless harness).
//
// Shows the model a catalog of skill descriptions + one user query and asks which single
// skill fits (or none). No plugins, no SessionStart nudge, no extended thinking, no turn
// budget: it isolates the description text. Runs each fixture query against the current
// catalog and scores recall (trigger queries should pick the skill) + precision (no-trigger
// queries should NOT pick it). Always runs a built-in CALIBRATION set first as the
// self-validation gate (the instrument must ace obvious cases before its numbers count).
//
// Engine: the Anthropic Messages API (cheap, cacheable, parallel). Reads ANTHROPIC_API_KEY.
// Pure functions are exported and unit-tested on canned data (no API in CI); the live run is
// a recorded/dispatch gate, never enforcing CI.
//
// Usage:
//   node scripts/run-router-evals.mjs --dry-run                 # plan only, no API calls
//   node scripts/run-router-evals.mjs --model=claude-haiku-4-5  # full roster
//   node scripts/run-router-evals.mjs --skills=deliver-prd,deliver-edge-cases
//   node scripts/run-router-evals.mjs --baseline=path.json      # diff vs a committed baseline, fail on regression
import { readFileSync, writeFileSync, globSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, isAbsolute } from 'node:path';

export const PRICING = {
  'claude-haiku-4-5': { in: 1.0, out: 5.0, cw: 1.25, cr: 0.10 },
  'claude-sonnet-4-6': { in: 3.0, out: 15.0, cw: 3.75, cr: 0.30 },
};

// Built-in self-validation set: obvious queries with known answers. If the router cannot
// ace these, the instrument is broken - stop before trusting any roster number.
export const CALIBRATION = [
  { q: 'Write a PRD for the new self-serve onboarding flow', expect: 'deliver-prd' },
  { q: 'List everything that can go wrong in the checkout flow, with a recovery path for each', expect: 'deliver-edge-cases' },
  { q: 'Write Given/When/Then acceptance criteria for the password reset story', expect: 'deliver-acceptance-criteria' },
  { q: 'Create a competitive analysis comparing our top three competitors', expect: 'discover-competitive-analysis' },
  { q: 'Write a SQL query that finds orders with negative totals', expect: 'none' },
  { q: 'Suggest a birthday gift for my eight year old nephew', expect: 'none' },
];

/** Parse a model reply to a catalog name or 'none'. `names` is the lowercased name list. */
export function parsePick(text, names) {
  const t = (text || '').toLowerCase().replace(/[^a-z0-9 -]/g, ' ').trim();
  if (!t || t === 'none') return 'none';
  if (names.includes(t)) return t;
  const contained = names.filter((n) => t.includes(n));
  if (contained.length) return contained.sort((a, b) => b.length - a.length)[0];
  return 'none';
}

/** pass = trigger query picked the skill, or no-trigger query did NOT pick it. */
export function scorePass(pick, skill, expect) {
  return expect === 'trigger' ? pick === skill : pick !== skill;
}

/** Per-skill recall/precision over scored query results (each {expect, split, pass, pick}). */
export function aggregateSkill(skill, results) {
  const trig = results.filter((r) => r.expect === 'trigger');
  const notrig = results.filter((r) => r.expect === 'no-trigger');
  const tv = trig.filter((r) => r.split === 'validation');
  const nv = notrig.filter((r) => r.split === 'validation');
  const pct = (a, b) => (b ? Math.round((100 * a) / b) : null);
  return {
    skill,
    valRecall: pct(tv.filter((r) => r.pass).length, tv.length),
    valPrec: pct(nv.filter((r) => r.pass).length, nv.length),
    allRecall: pct(trig.filter((r) => r.pass).length, trig.length),
    allPrec: pct(notrig.filter((r) => r.pass).length, notrig.length),
    misses: trig.filter((r) => !r.pass),
    falseFires: notrig.filter((r) => !r.pass),
  };
}

/** Diff a fresh roster (rows) against a committed baseline; returns regressions. */
export function diffBaseline(rows, baselineRows) {
  const base = new Map(baselineRows.map((r) => [r.skill, r]));
  const regressions = [];
  for (const r of rows) {
    const b = base.get(r.skill);
    if (!b) continue;
    if (r.valRecall != null && b.valRecall != null && r.valRecall < b.valRecall) regressions.push({ skill: r.skill, kind: 'recall', was: b.valRecall, now: r.valRecall });
    if (r.valPrec != null && b.valPrec != null && r.valPrec < b.valPrec) regressions.push({ skill: r.skill, kind: 'precision', was: b.valPrec, now: r.valPrec });
  }
  return regressions;
}

// A baseline skill absent from the current rows was NOT evaluated this run (e.g., a mid-roster hard
// stop dropped it). diffBaseline only iterates the current rows, so a missing skill is silently skipped
// and the gate could print "no regressions" on incomplete coverage. This treats a missing in-scope
// baseline skill as a gate failure (fail closed). A deliberate --skills filter narrows the expected set.
export function missingBaselineRows(rows, baselineRows, filter = []) {
  const present = new Set(rows.map((r) => r.skill));
  const inScope = (s) => !filter.length || filter.includes(s);
  return baselineRows.map((r) => r.skill).filter((s) => inScope(s) && !present.has(s));
}

export const buildCatalog = (entries) => entries.map((s) => '- ' + s.n + ': ' + s.d).join('\n');
export const systemPrompt = (catalogStr) => [
  'You are a precise classifier that routes a user request to the single best-matching option.',
  'Below is a CATALOG of options, one per line, formatted "name: description".',
  'Judge ONLY by the descriptions. Choose the SINGLE option whose description best matches the',
  'intent of the user request. If no option clearly matches, answer with the literal word none.',
  '', 'CATALOG:', catalogStr,
].join('\n');
const userPrompt = (q) => 'USER REQUEST: "' + q + '"\n\nReply with ONLY the chosen option name exactly as written in the catalog, or the word none. No other text.';

const sleepReal = (ms) => new Promise((r) => setTimeout(r, ms));

/** One API call with retry/backoff. deps = { key, model, fetchImpl, sleep, usage }. Returns
 *  { pick } on success, { hard } on a non-retryable key/credit error. Testable via fetchImpl. */
export async function route(systemText, names, q, deps) {
  const { key, model, fetchImpl = fetch, sleep = sleepReal, usage } = deps;
  for (let attempt = 1; attempt <= 7; attempt++) {
    let res;
    try {
      res = await fetchImpl('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
        body: JSON.stringify({ model, max_tokens: 24, system: [{ type: 'text', text: systemText, cache_control: { type: 'ephemeral' } }], messages: [{ role: 'user', content: userPrompt(q) }] }),
      });
    } catch { if (attempt === 7) { if (usage) usage.fails++; return { pick: 'none', error: 'net' }; } await sleep(Math.min(1500 * 2 ** (attempt - 1), 30000)); continue; }
    if (res.status === 429 || res.status === 529 || res.status >= 500) { if (attempt === 7) { if (usage) usage.fails++; return { pick: 'none', error: 'http ' + res.status }; } await sleep(Math.min(1500 * 2 ** (attempt - 1), 30000)); continue; }
    const j = await res.json();
    if (j.error) { const m = j.error.message || ''; if (/credit balance|authentication|invalid x-api-key|permission/i.test(m)) { if (usage) usage.fails++; return { pick: 'none', hard: m }; } if (attempt === 7) { if (usage) usage.fails++; return { pick: 'none', error: m }; } await sleep(Math.min(1500 * 2 ** (attempt - 1), 30000)); continue; }
    if (usage && j.usage) { usage.in += j.usage.input_tokens || 0; usage.out += j.usage.output_tokens || 0; usage.cw += j.usage.cache_creation_input_tokens || 0; usage.cr += j.usage.cache_read_input_tokens || 0; usage.calls++; }
    return { pick: parsePick((j.content || []).map((b) => b.text || '').join(''), names) };
  }
  if (usage) usage.fails++; return { pick: 'none', error: 'exhausted' };
}

/** Majority vote over `runs` calls. routeFn(q) -> { pick, hard }. Testable with a fake routeFn. */
export async function majority(q, runs, routeFn) {
  const picks = []; let hard = null;
  for (let i = 0; i < runs; i++) { const r = await routeFn(q); if (r.hard) hard = r.hard; picks.push(r.pick); }
  const c = {}; for (const p of picks) c[p] = (c[p] || 0) + 1;
  return { pick: Object.entries(c).sort((a, b) => b[1] - a[1])[0][0], hard };
}

export async function mapPool(items, n, fn) {
  const out = new Array(items.length); let i = 0; let stop = false;
  const worker = async () => { while (i < items.length && !stop) { const idx = i++; out[idx] = await fn(items[idx]); if (out[idx] && out[idx].hard) stop = true; } };
  await Promise.all(Array.from({ length: Math.min(n, items.length || 1) }, worker));
  return { out, stopped: stop };
}

async function main() {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  const args = process.argv.slice(2);
  const arg = (k, d) => { const a = args.find((x) => x.startsWith('--' + k + '=')); return a ? a.split('=').slice(1).join('=') : d; };
  const flag = (k) => args.includes('--' + k);
  const model = arg('model', 'claude-haiku-4-5');
  const runs = parseInt(arg('runs', '3'), 10);
  const conc = parseInt(arg('concurrency', '8'), 10);
  const filter = (arg('skills', '') || '').split(',').map((s) => s.trim()).filter(Boolean);

  const manifest = JSON.parse(readFileSync(join(repo, 'skill-manifest.json'), 'utf8'));
  const entries = manifest.entries.map((e) => ({ n: e.name, d: e.description }));
  const names = entries.map((e) => e.n.toLowerCase());
  const catalogStr = buildCatalog(entries);
  const system = systemPrompt(catalogStr);

  const files = globSync('skills/*/evals/trigger-fixtures.json', { cwd: repo });
  const fixtures = files.map((f) => JSON.parse(readFileSync(join(repo, f), 'utf8')))
    .filter((fx) => !filter.length || filter.includes(fx.skill)).sort((a, b) => a.skill.localeCompare(b.skill));
  const queryCount = fixtures.reduce((n, fx) => n + fx.queries.length, 0);
  const calls = (CALIBRATION.length + queryCount) * runs;
  console.log(`plan: ${fixtures.length} skills, ${queryCount} queries + ${CALIBRATION.length} calibration, ${calls} API calls (model ${model}, runs ${runs})`);
  if (flag('dry-run')) return;

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) { console.error('ERROR: ANTHROPIC_API_KEY not set (use --dry-run to plan without a key)'); process.exit(1); }
  const usage = { in: 0, out: 0, cw: 0, cr: 0, calls: 0, fails: 0 };
  const routeFn = (q) => route(system, names, q, { key, model, usage });

  // Calibration gate
  const cal = await mapPool(CALIBRATION, conc, async (c) => { const r = await majority(c.q, 1, routeFn); return { ...c, got: r.pick, ok: r.pick === c.expect, hard: r.hard }; });
  if (cal.stopped) { console.error('HARD STOP during calibration (key/credit/auth). Aborting.'); process.exit(2); }
  const calPass = cal.out.filter((c) => c.ok).length;
  console.log(`calibration: ${calPass}/${CALIBRATION.length}`);
  if (calPass < CALIBRATION.length - 1) { console.error('CALIBRATION FAILED (instrument not discriminating). Aborting before roster.'); process.exit(3); }

  // Roster
  const tasks = [];
  for (const fx of fixtures) for (const q of fx.queries) tasks.push({ skill: fx.skill, q: q.q, expect: q.expect, split: q.split, near: q.near_miss_of || null });
  const { out: scored, stopped } = await mapPool(tasks, conc, async (t) => { const r = await majority(t.q, runs, routeFn); return { ...t, pick: r.pick, pass: scorePass(r.pick, t.skill, t.expect), hard: r.hard }; });
  if (stopped) console.error('HARD STOP mid-roster (key/credit) - results are PARTIAL');

  const bySkill = {};
  for (const s of scored) { if (!s) continue; (bySkill[s.skill] = bySkill[s.skill] || []).push(s); }
  const rows = Object.entries(bySkill).map(([skill, rs]) => aggregateSkill(skill, rs)).sort((a, b) => (a.valRecall ?? 999) - (b.valRecall ?? 999));

  const cost = (() => { const p = PRICING[model]; return p ? (usage.in * p.in + usage.out * p.out + usage.cw * p.cw + usage.cr * p.cr) / 1e6 : null; })();
  const md = ['# Roster router-eval (' + model + ', majority of ' + runs + ')', '', '| Skill | Val recall | Val precision | All recall | All precision |', '|---|---|---|---|---|'];
  for (const r of rows) md.push(`| ${r.skill} | ${r.valRecall}% | ${r.valPrec}% | ${r.allRecall}% | ${r.allPrec}% |`);
  md.push('', '## Misroutes', ...(rows.flatMap((r) => r.misses.map((m) => `- ${r.skill} [${m.split}] -> ${m.pick}: "${m.q}"`)) || []));
  md.push('', '## Collisions (no-trigger wrongly picked the skill)', ...(rows.flatMap((r) => r.falseFires.map((f) => `- ${f.skill} [${f.split}] (partner ${f.near || 'n/a'}): "${f.q}"`))));
  md.push('', `Usage: ${usage.calls} calls, ${usage.fails} fails, calibration ${calPass}/${CALIBRATION.length}, est $${cost != null ? cost.toFixed(4) : 'n/a'}`);
  const report = md.join('\n') + '\n';
  console.log('\n' + report);
  const out = arg('report', '');
  if (out) writeFileSync(isAbsolute(out) ? out : join(repo, out), report);

  // Optional drift gate vs a committed baseline
  const baselinePath = arg('baseline', '');
  if (baselinePath) {
    const bp = isAbsolute(baselinePath) ? baselinePath : join(repo, baselinePath);
    if (!existsSync(bp)) { console.error(`baseline not found: ${bp}`); process.exit(1); }
    const baselineRows = JSON.parse(readFileSync(bp, 'utf8')).rows || [];
    const regressions = diffBaseline(rows, baselineRows);
    const missing = missingBaselineRows(rows, baselineRows, filter);
    if (regressions.length || missing.length) {
      if (regressions.length) { console.error('DRIFT REGRESSIONS:'); for (const r of regressions) console.error(`  ${r.skill} ${r.kind}: ${r.was}% -> ${r.now}%`); }
      if (missing.length) console.error(`MISSING BASELINE SKILLS (not evaluated this run; incomplete coverage, fail closed): ${missing.join(', ')}`);
      process.exit(4);
    }
    console.log('no regressions vs baseline.');
  }
  writeFileSync(join(repo, arg('json', 'router-eval-result.json')), JSON.stringify({ model, runs, calibration: calPass, rows, usage: { ...usage, estCostUSD: cost }, stopped }, null, 2));
  // Fail closed on a partial run: a mid-roster hard stop (key/credit/auth) means the full roster was
  // not evaluated, so the run cannot certify routing health even if the completed rows showed no
  // regression. This must be the LAST check so the report + json are written for diagnosis first.
  if (stopped) { console.error('PARTIAL RUN: hard stop mid-roster; the full roster was not evaluated, so this run cannot certify. Failing closed.'); process.exit(2); }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
