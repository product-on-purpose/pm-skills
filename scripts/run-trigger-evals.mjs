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
import { dirname, join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { partnersOf } from './check-trigger-fixtures.mjs';

const RUN_TIMEOUT_MS = 120_000;

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

function runOnce(query) {
  const extra = (process.env.TRIGGER_EVAL_CLAUDE_ARGS ?? '').split(' ').filter(Boolean);
  const args = ['-p', query, '--output-format', 'stream-json', '--verbose', '--max-turns', '1', ...extra];
  const res = spawnSync('claude', args, { encoding: 'utf8', timeout: RUN_TIMEOUT_MS, shell: process.platform === 'win32' });
  if (res.error) throw new Error(`claude CLI failed: ${res.error.message}`);
  return parseEvents(`${res.stdout ?? ''}\n${res.stderr ?? ''}`);
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

function main() {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  const args = process.argv.slice(2);
  const flag = (name) => args.includes(name);
  const value = (name) => { const i = args.indexOf(name); return i === -1 ? null : args[i + 1]; };
  const filter = (value('--skills') ?? '').split(',').map((s) => s.trim()).filter(Boolean);
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
    return;
  }

  const queries = fixtures.reduce((n, f) => n + f.queries.length, 0);
  const invocations = fixtures.reduce((n, f) => n + f.queries.length * f.runs_per_query, 0)
    + (flag('--collision') ? fixtures.reduce((n, f) => n + partnersOf(f.skill).length * f.queries.filter((q) => q.expect === 'trigger').length, 0) : 0);
  console.log(`plan: ${fixtures.length} skill(s), ${queries} queries, ${invocations} claude invocations${flag('--collision') ? ' (incl. collision sweep)' : ''}`);
  if (flag('--dry-run')) return;

  const evaluated = fixtures.map((f) => {
    console.log(`running ${f.skill} ...`);
    return evalSkill(f, { collision: flag('--collision') });
  });
  const report = renderReport(evaluated);
  console.log(`\n${report}`);
  const out = value('--report');
  if (out) { writeFileSync(join(repo, out), report); console.log(`report written: ${out}`); }
  const failures = evaluated.some((e) => e.results.some((r) => !r.pass) || e.falseFires.length);
  process.exit(failures ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
