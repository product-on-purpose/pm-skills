// scripts/run-trigger-evals.mjs - trigger-accuracy eval harness (M-31, issue #200).
// Spec: docs/internal/release-plans/v2.27.0/spec_trigger-accuracy-evals.md (section 4).
//
// Runs each fixture query through headless Claude Code and detects whether the
// Skill tool fired for the target skill. 3 runs per query; trigger rate >= the
// fixture threshold counts as triggered; a query PASSES when observed behavior
// matches its `expect` label. Validation-set pass rate is the headline number.
//
// Modes:
//   --dry-run            print the run plan + invocation count, no API calls (default OFF locally, ON in CI lane)
//   --skills a,b,c       restrict to a subset
//   --collision          also test every should-trigger query against the skill's collision partners (false-fire sweep)
//   --probe <skill>      run ONE query once, dump every tool event seen, exit (verifies transcript shape cheaply
//                        before batch-running; see the spec risk note and the agentic-smoke-runbook environment pattern)
//   --report <path>      write the markdown report to <path> in addition to stdout
//
// Environment: requires the `claude` CLI on PATH with the pm-skills skills discoverable
// (install the plugin at user scope per the agentic-smoke-runbook). Extra CLI flags can be
// injected via TRIGGER_EVAL_CLAUDE_ARGS (space-separated) if the environment needs them.
import { readFileSync, writeFileSync, globSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, isAbsolute } from 'node:path';
import { spawnSync, spawn } from 'node:child_process';
import { partnersOf } from './check-trigger-fixtures.mjs';

const RUN_TIMEOUT_MS = 120_000;

// Named execution batches (M-31 Phase 1) sized for a Pro/Max subscription's
// 5-hour rolling rate window: run ONE batch per window, collision-critical first.
// Each batch = N skills x 20 queries x 3 runs = N*60 calls. The 10 batches cover
// all 31 roster skills exactly once and sum to 1,860 calls (roster grew 29 -> 31 in
// v2.30.0, WS-T10). The batches partition the roster from trigger-eval-roster.yaml;
// the run-trigger-evals.test.mjs "partition exactly once" test enforces it stays in
// sync. See the implementation plan's "Batched execution on a subscription" section.
export const BATCHES = {
  'collision-deliver': ['deliver-user-stories', 'deliver-acceptance-criteria', 'deliver-edge-cases'],
  'collision-define-measure': ['define-hypothesis', 'measure-experiment-design'],
  'collision-okr': ['foundation-okr-writer', 'measure-okr-grader'],
  'collision-research': ['discover-interview-synthesis', 'foundation-meeting-recap'],
  'collision-iterate': ['iterate-lessons-log', 'iterate-retrospective'],
  'rest-define-discover': ['define-jtbd-canvas', 'define-opportunity-tree', 'define-problem-statement', 'discover-competitive-analysis', 'discover-stakeholder-summary'],
  'rest-deliver': ['deliver-prd', 'deliver-launch-checklist', 'deliver-release-notes'],
  'develop': ['develop-adr', 'develop-design-rationale', 'develop-solution-brief', 'develop-spike-summary'],
  'rest-measure': ['measure-dashboard-requirements', 'measure-experiment-results', 'measure-instrumentation-spec'],
  'rest-iterate-foundation': ['iterate-pivot-decision', 'iterate-refinement-notes', 'foundation-persona', 'foundation-build-risk-review', 'foundation-stakeholder-briefings'],
};

/** Parse headless output (stream-json lines or a single JSON document) into events. */
export function parseEvents(stdout) {
  const events = [];
  for (const line of stdout.split(/\r?\n/)) {
    const t = line.trim();
    if (!t || !(t.startsWith('{') || t.startsWith('['))) continue;
    try { events.push(JSON.parse(t)); } catch { /* non-JSON noise line */ }
  }
  return events;
}

/** True when any tool_use event in the transcript invokes the Skill tool for `skill`.
 *  Tolerant matcher: walks every object, looks for {type:"tool_use", name:/skill/i}
 *  (any casing) whose input mentions the target skill name. */
export function skillFired(events, skill) {
  const stack = [...events];
  while (stack.length) {
    const node = stack.pop();
    if (!node || typeof node !== 'object') continue;
    if (Array.isArray(node)) { stack.push(...node); continue; }
    if (node.type === 'tool_use' && typeof node.name === 'string' && /skill/i.test(node.name)) {
      if (JSON.stringify(node.input ?? {}).includes(skill)) return true;
    }
    stack.push(...Object.values(node));
  }
  return false;
}

/** Pull the usage/cost block out of a headless transcript (the `result` event,
 *  or any event carrying a usage object). Returns null when absent. Used by --probe
 *  to report a REAL per-call token count you can multiply by the full run size. */
export function extractUsage(events) {
  const stack = [...events];
  let usage = null;
  let costUsd = null;
  while (stack.length) {
    const n = stack.pop();
    if (!n || typeof n !== 'object') continue;
    if (Array.isArray(n)) { stack.push(...n); continue; }
    if (typeof n.total_cost_usd === 'number') costUsd = n.total_cost_usd;
    if (n.usage && typeof n.usage === 'object' && ('input_tokens' in n.usage || 'output_tokens' in n.usage)) {
      usage = n.usage;
    }
    stack.push(...Object.values(n));
  }
  return usage ? { ...usage, total_cost_usd: costUsd } : null;
}

/** Returns the blocking status string if any rate_limit_event shows the window is
 *  NOT allowed (so we abort instead of recording rate-limited calls as false
 *  trigger-failures); null when clear. */
export function rateLimitBlocked(events) {
  for (const e of events) {
    if (e && e.type === 'rate_limit_event') {
      const s = e.rate_limit_info?.status;
      if (s && s !== 'allowed') return s;
    }
  }
  return null;
}

/** Returns an error reason if the transcript's result event is an API error
 *  (credit exhausted, 4xx/5xx, overloaded) so we ABORT instead of recording the
 *  failed call as a false trigger-miss; null when the call succeeded. */
export function apiError(events) {
  for (const e of events) {
    if (e && e.type === 'result' && e.is_error) {
      // error_max_turns carries its message in subtype/errors, NOT result - surface it so
      // classifyRun can recognize it instead of falling through to a generic "api error".
      const msg = e.result || (Array.isArray(e.errors) && e.errors[0]) || e.subtype || e.api_error_status || 'api error';
      return String(msg).slice(0, 120);
    }
  }
  return null;
}

// Errors that no retry can fix: stop the run, save partial, resume later.
const HARD_ERR = /credit balance|authentication|invalid x-api-key|permission|invalid_request/i;
// error_max_turns is NOT a throttle (it cost the M-31 session a false "sustained throttling"
// diagnosis): a SessionStart skill ate the single turn. Hard-stop with an actionable message.
const MAX_TURNS = /maximum number of turns|max.?turns|error_max_turns/i;
const MAX_TRIES = 6;

/** Classify a transcript: null = success; {hard} = abort now (credit/auth/5-hour
 *  usage cap - waiting will not help); {retry} = transient (server overloaded /
 *  temporarily limiting / rate limited) - back off and retry to ride it out. This
 *  is what lets a subscription run absorb transient throttles instead of aborting. */
export function classifyRun(events) {
  const rl = rateLimitBlocked(events);
  if (rl) return { hard: `usage-window:${rl}` };
  const e = apiError(events);
  if (!e) return null;
  if (MAX_TURNS.test(e)) return { hard: `max_turns (${e}); a SessionStart skill likely consumed the turn - raise --max-turns or disable interfering plugins. NOT a server throttle.` };
  if (HARD_ERR.test(e)) return { hard: e };
  return { retry: e };
}

/** Synchronous sleep (for the sequential runOnce retry backoff). */
function sleepSync(ms) { Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms); }
const backoffMs = (attempt) => Math.min(2000 * 2 ** (attempt - 1), 30_000);

class RateLimitAbort extends Error {
  constructor(status) { super(`run aborted: ${status}`); this.rateLimited = status; }
}

/** Aggregate one skill's per-query outcomes into split-level pass rates. */
export function aggregate(results) {
  const agg = { train: { pass: 0, total: 0 }, validation: { pass: 0, total: 0 } };
  for (const r of results) {
    agg[r.split].total += 1;
    if (r.pass) agg[r.split].pass += 1;
  }
  const rate = (s) => (s.total ? s.pass / s.total : null);
  return { ...agg, trainRate: rate(agg.train), validationRate: rate(agg.validation) };
}

// One headless claude -p invocation. Prompt on STDIN, never a positional arg: on
// Windows spawnSync needs shell:true (claude is a .cmd shim) and does NOT quote
// array args, so a multi-word query passed positionally is split by the shell and
// the real prompt never reaches the model (a false 0% rate).
const CLAUDE_ARGS = () => ['-p', '--output-format', 'stream-json', '--verbose', '--max-turns', '1',
  ...(process.env.TRIGGER_EVAL_CLAUDE_ARGS ?? '').split(' ').filter(Boolean)];

function spawnOnce(query) {
  const res = spawnSync('claude', CLAUDE_ARGS(), { encoding: 'utf8', timeout: RUN_TIMEOUT_MS, shell: process.platform === 'win32', input: query });
  if (res.error) throw new Error(`claude CLI failed: ${res.error.message}`);
  return parseEvents(`${res.stdout ?? ''}\n${res.stderr ?? ''}`);
}

function spawnOnceAsync(query) {
  return new Promise((resolve) => {
    const child = spawn('claude', CLAUDE_ARGS(), { shell: process.platform === 'win32' });
    let out = ''; let err = '';
    const timer = setTimeout(() => child.kill(), RUN_TIMEOUT_MS);
    child.stdout.on('data', (d) => { out += d; });
    child.stderr.on('data', (d) => { err += d; });
    child.on('close', () => { clearTimeout(timer); resolve(parseEvents(`${out}\n${err}`)); });
    child.on('error', () => { clearTimeout(timer); resolve(parseEvents(err)); });
    child.stdin.on('error', () => {});
    child.stdin.write(query); child.stdin.end();
  });
}

/** runOnce + retry: rides out transient throttles (server overload / rate limited)
 *  with exponential backoff; throws RateLimitAbort only on a hard stop (credit/auth/
 *  usage cap) or when retries are exhausted. Returns a successful transcript. */
function runOnce(query) {
  for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
    const events = spawnOnce(query);
    const c = classifyRun(events);
    if (!c) return events;
    if (c.hard) throw new RateLimitAbort(c.hard);
    if (attempt === MAX_TRIES) throw new RateLimitAbort(`retries exhausted: ${c.retry}`);
    console.log(`  transient throttle (${c.retry}); retry ${attempt}/${MAX_TRIES - 1} after ${backoffMs(attempt) / 1000}s`);
    sleepSync(backoffMs(attempt));
  }
}

async function runOnceAsync(query) {
  for (let attempt = 1; attempt <= MAX_TRIES; attempt++) {
    const events = await spawnOnceAsync(query);
    const c = classifyRun(events);
    if (!c) return events;
    if (c.hard) throw new RateLimitAbort(c.hard);
    if (attempt === MAX_TRIES) throw new RateLimitAbort(`retries exhausted: ${c.retry}`);
    await new Promise((r) => setTimeout(r, backoffMs(attempt)));
  }
}

/** Run fn over items with at most `n` concurrent. Order-preserving results. */
export async function mapPool(items, n, fn) {
  const results = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const idx = next++;
      results[idx] = await fn(items[idx], idx);
    }
  };
  await Promise.all(Array.from({ length: Math.min(Math.max(1, n), items.length || 1) }, worker));
  return results;
}

/** Concurrent evaluation: same per-query math as evalSkill, dispatched via a pool.
 *  No --collision partner sweep (near-miss negatives in the fixtures still test
 *  collisions). Aborts new work on a rate-limit block, keeping completed results. */
async function evalConcurrent(fixtures, concurrency) {
  const tasks = [];
  for (const f of fixtures) for (const q of f.queries) tasks.push({ f, q });
  let aborted = null;
  let done = 0;
  const total = tasks.length;
  const perTask = await mapPool(tasks, concurrency, async ({ f, q }) => {
    if (aborted) return null;
    let fired = 0;
    try {
      for (let i = 0; i < f.runs_per_query; i++) {
        if (skillFired(await runOnceAsync(q.q), f.skill)) fired += 1;
      }
    } catch (e) {
      if (e.rateLimited) { aborted = aborted ?? e.rateLimited; return null; }
      throw e;
    }
    done += 1;
    if (done % 20 === 0 || done === total) console.log(`  progress: ${done}/${total} queries`);
    const triggered = fired / f.runs_per_query >= f.trigger_threshold;
    return { skill: f.skill, q: q.q, expect: q.expect, split: q.split, fired, triggered, pass: triggered === (q.expect === 'trigger') };
  });
  const evaluated = fixtures.map((f) => {
    const results = perTask.filter((r) => r && r.skill === f.skill).map(({ skill, ...rest }) => rest);
    return { skill: f.skill, results, agg: aggregate(results), falseFires: [] };
  }).filter((e) => e.results.length === fixtures.find((f) => f.skill === e.skill).queries.length);
  return { evaluated, aborted };
}

function loadFixtures(repo, filter) {
  const files = globSync('skills/*/evals/trigger-fixtures.json', { cwd: repo });
  return files.map((f) => JSON.parse(readFileSync(join(repo, f), 'utf8')))
    .filter((fx) => !filter.length || filter.includes(fx.skill))
    .sort((a, b) => a.skill.localeCompare(b.skill));
}

function evalSkill(fixture, { collision }) {
  const results = [];
  for (const q of fixture.queries) {
    let fired = 0;
    for (let i = 0; i < fixture.runs_per_query; i++) {
      // runOnce retries transient throttles; throws RateLimitAbort only on hard stop
      if (skillFired(runOnce(q.q), fixture.skill)) fired += 1;
    }
    const triggered = fired / fixture.runs_per_query >= fixture.trigger_threshold;
    results.push({ q: q.q, expect: q.expect, split: q.split, fired, triggered, pass: triggered === (q.expect === 'trigger') });
  }
  const falseFires = [];
  if (collision) {
    for (const partner of partnersOf(fixture.skill)) {
      for (const q of fixture.queries.filter((x) => x.expect === 'trigger')) {
        if (skillFired(runOnce(q.q), partner)) falseFires.push({ q: q.q, partner });
      }
    }
  }
  return { skill: fixture.skill, results, agg: aggregate(results), falseFires };
}

export function renderReport(evaluated) {
  const pct = (r) => (r === null ? 'n/a' : `${Math.round(r * 100)}%`);
  const lines = ['# Trigger-eval report', '', '| Skill | Train pass | Validation pass | Failing queries |', '|---|---|---|---|'];
  for (const e of evaluated) {
    const failing = e.results.filter((r) => !r.pass).length;
    lines.push(`| ${e.skill} | ${pct(e.agg.trainRate)} | ${pct(e.agg.validationRate)} | ${failing} |`);
  }
  lines.push('', '## Failures', '');
  let any = false;
  for (const e of evaluated) {
    for (const r of e.results.filter((x) => !x.pass)) {
      any = true;
      lines.push(`- ${e.skill} [${r.split}] expected ${r.expect}, fired ${r.fired}x: "${r.q}"`);
    }
    for (const f of e.falseFires) {
      any = true;
      lines.push(`- ${e.skill} COLLISION false-fire on ${f.partner}: "${f.q}"`);
    }
  }
  if (!any) lines.push('- none');
  return `${lines.join('\n')}\n`;
}

async function main() {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  const args = process.argv.slice(2);
  const flag = (name) => args.includes(name);
  const value = (name) => { const i = args.indexOf(name); return i === -1 ? null : args[i + 1]; };

  if (flag('--list-batches')) {
    for (const [name, skills] of Object.entries(BATCHES)) {
      console.log(`${name.padEnd(24)} ${skills.length} skills, ${skills.length * 60} calls : ${skills.join(', ')}`);
    }
    return;
  }

  const batchName = value('--batch');
  if (batchName && !BATCHES[batchName]) {
    console.error(`unknown batch "${batchName}". Known: ${Object.keys(BATCHES).join(', ')}`);
    process.exit(1);
  }
  const filter = batchName
    ? BATCHES[batchName]
    : (value('--skills') ?? '').split(',').map((s) => s.trim()).filter(Boolean);
  const fixtures = loadFixtures(repo, filter);
  if (!fixtures.length) { console.error('no fixtures matched'); process.exit(1); }

  if (flag('--probe')) {
    const target = value('--probe');
    const fx = fixtures.find((f) => f.skill === target) ?? fixtures[0];
    const q = fx.queries.find((x) => x.expect === 'trigger');
    console.log(`PROBE  skill=${fx.skill}  query="${q.q}"`);
    const events = runOnce(q.q);
    const tools = [];
    const stack = [...events];
    while (stack.length) {
      const n = stack.pop();
      if (!n || typeof n !== 'object') continue;
      if (Array.isArray(n)) { stack.push(...n); continue; }
      if (n.type === 'tool_use') tools.push({ name: n.name, input: n.input });
      stack.push(...Object.values(n));
    }
    console.log(`events parsed: ${events.length}; tool_use blocks: ${JSON.stringify(tools, null, 2)}`);
    console.log(`skillFired(${fx.skill}) = ${skillFired(events, fx.skill)}`);
    const usage = extractUsage(events);
    if (usage) {
      const inTok = (usage.input_tokens ?? 0) + (usage.cache_read_input_tokens ?? 0) + (usage.cache_creation_input_tokens ?? 0);
      console.log(`USAGE  per-call input ~${inTok} tokens (uncached ${usage.input_tokens ?? 0}, cache-read ${usage.cache_read_input_tokens ?? 0}, cache-write ${usage.cache_creation_input_tokens ?? 0}), output ${usage.output_tokens ?? 0}${usage.total_cost_usd != null ? `, reported cost $${usage.total_cost_usd}` : ''}`);
      console.log(`ESTIMATE  full roster = this x 1860 runs (31 skills x 20 queries x 3); collision batch = this x ~600`);
    } else {
      console.log('USAGE  no usage block found in transcript (check --output-format; the harness sends stream-json)');
    }
    return;
  }

  const queries = fixtures.reduce((n, f) => n + f.queries.length, 0);
  const invocations = fixtures.reduce((n, f) => n + f.queries.length * f.runs_per_query, 0)
    + (flag('--collision') ? fixtures.reduce((n, f) => n + partnersOf(f.skill).length * f.queries.filter((q) => q.expect === 'trigger').length, 0) : 0);
  console.log(`plan: ${fixtures.length} skill(s), ${queries} queries, ${invocations} claude invocations${flag('--collision') ? ' (incl. collision sweep)' : ''}`);
  if (flag('--dry-run')) return;

  const concurrency = Math.max(1, parseInt(value('--concurrency') ?? '1', 10) || 1);
  const evaluated = [];
  let aborted = null;
  if (concurrency > 1) {
    const t0 = Date.now();
    console.log(`running ${fixtures.length} skills at concurrency ${concurrency} ...`);
    const res = await evalConcurrent(fixtures, concurrency);
    evaluated.push(...res.evaluated);
    aborted = res.aborted;
    const secs = Math.round((Date.now() - t0) / 1000);
    console.log(`  done: ${secs}s / ${invocations} calls (${(secs / invocations).toFixed(1)}s/call wall, ${concurrency}x)`);
  } else {
    for (const f of fixtures) {
      const t0 = Date.now();
      console.log(`running ${f.skill} ...`);
      try {
        const r = evalSkill(f, { collision: flag('--collision') });
        const secs = Math.round((Date.now() - t0) / 1000);
        const calls = f.queries.length * f.runs_per_query;
        console.log(`  ${f.skill} done: ${secs}s / ${calls} calls (${(secs / calls).toFixed(1)}s/call)`);
        evaluated.push(r);
      } catch (e) {
        if (e.rateLimited) { aborted = e.rateLimited; break; }
        throw e;
      }
    }
  }
  const report = renderReport(evaluated)
    + (aborted ? `\n> ABORTED on rate limit (${aborted}) after ${evaluated.length}/${fixtures.length} skills. Partial results above; resume the rest in a fresh 5-hour window.\n` : '');
  console.log(`\n${report}`);
  const out = value('--report');
  if (out) { const target = isAbsolute(out) ? out : join(repo, out); writeFileSync(target, report); console.log(`report written: ${target}`); }
  if (aborted) { console.error(`RATE LIMITED (${aborted}); partial results saved (${evaluated.length}/${fixtures.length} skills).`); process.exit(2); }
  const failures = evaluated.some((e) => e.results.some((r) => !r.pass) || e.falseFires.length);
  process.exit(failures ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => { console.error(e); process.exit(1); });
}
