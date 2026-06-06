# v2.25.0 Activation and Trust Layer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the plugin's first hooks (opt-in write-time guardrails F-43, confident-only session-time phase router F-44) plus an advisory CI-time output-quality eval tier (M-30), without adding any skill or changing catalog counts.

**Architecture:** Three components on one Node `.mjs` runtime. The two hooks are dependency-free (an installed plugin's hooks run via `node ${CLAUDE_PLUGIN_ROOT}/...` with no `node_modules`, so they parse the few flat frontmatter keys they need with a minimal hand-rolled reader). The eval validators run in repo/CI context and may use `js-yaml`. Each hook keeps its side effects (stdin read, stdout print, `process.exit`) in a thin `main()` and exports a pure function the tests drive.

**Tech Stack:** Node ES modules (`.mjs`), Node built-in test runner (`node --test`, Node >= 22.12), plugin `hooks/hooks.json`, `${CLAUDE_PLUGIN_ROOT}`. No new dependencies for the hooks.

**Confirmed wiring (from working examples, see spec section 0.4):**
- Plugin hook registration: top-level `{"hooks": {"<Event>": [{"matcher": "...", "hooks": [{"type": "command", "command": "node \"${CLAUDE_PLUGIN_ROOT}/hooks/X.mjs\"", "timeout": 10}]}]}}`.
- PreToolUse deny: print `{"hookSpecificOutput": {"hookEventName": "PreToolUse", "permissionDecision": "deny", "permissionDecisionReason": "<reason>"}}` then exit 0 (confirmed by `~/.claude/hooks/no-em-dashes.py`, live this session).
- PreToolUse non-blocking note: print `{"hookSpecificOutput": {"hookEventName": "PreToolUse", "additionalContext": "<note>"}}` then exit 0.
- SessionStart context: print `{"hookSpecificOutput": {"hookEventName": "SessionStart", "additionalContext": "<text>"}}` then exit 0 (confirmed by memsearch `session-start.sh`). Silent path: print nothing, exit 0.
- Hook stdin payload is UTF-8 JSON with `tool_input` (PreToolUse) and `cwd`. Read stdin via `process.stdin` and decode UTF-8 explicitly (Windows cp1252 mis-decodes multibyte glyphs - the cp1252 phantom-em-dash bug the personal hook documents).

**Banned-character discipline (load-bearing):** the guardrail hook and its tests must build the em-dash (U+2014) and en-dash (U+2013) via `String.fromCharCode(0x2014)` / `String.fromCharCode(0x2013)`, NEVER as literal glyphs in source. This is mandatory: a literal in `guardrails.mjs` would make the hook deny every edit to its own source (and, as the authoring of this very plan proved, blocks the file from being written at all by the no-em-dashes PreToolUse hook). At runtime `String.fromCharCode` yields the real character, so `text.includes(EM)` still detects literal em-dashes in a payload.

**Reference docs:** spec `spec_v2.25.0.md` (ACs), plan `plan_v2.25.0.md` (full hygiene surface - Phase D references it rather than duplicating, per DRY).

---

## File structure

```
hooks/
  hooks.json                 # registers PreToolUse (F-43) + SessionStart (F-44)
  lib/
    frontmatter.mjs          # minimal dependency-free frontmatter field reader (shared)
    frontmatter.test.mjs
    local-config.mjs         # reads .claude/pm-skills.local.md (F-43; F-44 override later)
    local-config.test.mjs
    phase-map.mjs            # builds phase -> skills[] from skills/*/SKILL.md (F-44)
    phase-map.test.mjs
    signals.mjs              # detects phase from cwd: branch + artifact (F-44)
    signals.test.mjs
  guardrails.mjs             # F-43 PreToolUse hook (thin main + pure evaluateGuardrail)
  guardrails.test.mjs
  phase-router.mjs           # F-44 SessionStart hook (thin main + pure route)
  phase-router.test.mjs
  fixtures/                  # test fixtures (sample payloads, a tiny skills/ tree, .git/HEAD)
scripts/
  check-sample-no-placeholders.mjs        # M-30
  check-sample-no-placeholders.test.mjs
  check-sample-exact-quote-sourcing.mjs   # M-30
  check-sample-exact-quote-sourcing.test.mjs
  check-sample-no-fabricated-metrics.mjs  # M-30
  check-sample-no-fabricated-metrics.test.mjs
```

---

## Phase A - F-43 guardrails + shared lib

### Task A1: Minimal frontmatter reader (`hooks/lib/frontmatter.mjs`)

**Files:**
- Create: `hooks/lib/frontmatter.mjs`
- Test: `hooks/lib/frontmatter.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
// hooks/lib/frontmatter.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { splitFrontmatter, getField, getList } from './frontmatter.mjs';

test('splitFrontmatter returns the block between leading --- fences', () => {
  const body = '---\nname: foo\nphase: deliver\n---\n# Heading\n';
  assert.equal(splitFrontmatter(body), 'name: foo\nphase: deliver');
});

test('splitFrontmatter returns empty string when no frontmatter', () => {
  assert.equal(splitFrontmatter('# no frontmatter\n'), '');
});

test('getField reads a scalar', () => {
  assert.equal(getField('name: foo\nphase: deliver', 'phase'), 'deliver');
});

test('getField returns null when absent', () => {
  assert.equal(getField('name: foo', 'phase'), null);
});

test('getField strips surrounding quotes', () => {
  assert.equal(getField('version: "1.0.0"', 'version'), '1.0.0');
});

test('getList parses an inline array', () => {
  assert.deepEqual(getList('guardrail_checks: [em-dash, placeholder]', 'guardrail_checks'), ['em-dash', 'placeholder']);
});

test('getList returns [] when absent', () => {
  assert.deepEqual(getList('guardrails: true', 'guardrail_checks'), []);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test hooks/lib/frontmatter.test.mjs`
Expected: FAIL with "Cannot find module './frontmatter.mjs'".

- [ ] **Step 3: Write minimal implementation**

```js
// hooks/lib/frontmatter.mjs - dependency-free reader for a handful of flat keys.
// NOT a YAML parser: an installed plugin's hooks have no node_modules, so they
// cannot import js-yaml. Handles scalar, quoted scalar, and inline-array values.

/** Return the text between the leading `---` fences, or '' if none. */
export function splitFrontmatter(fileText) {
  const m = /^---\r?\n([\s\S]*?)\r?\n---/.exec(fileText);
  return m ? m[1].trim() : '';
}

/** Read a scalar field; strip matching surrounding quotes. null if absent. */
export function getField(frontmatter, key) {
  const re = new RegExp('^\\s*' + key + ':\\s*(.+?)\\s*$', 'm');
  const m = re.exec(frontmatter);
  if (!m) return null;
  let v = m[1].trim();
  if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
    v = v.slice(1, -1);
  }
  return v;
}

/** Read an inline array field `key: [a, b]`. [] if absent or not an array. */
export function getList(frontmatter, key) {
  const raw = getField(frontmatter, key);
  if (!raw || !raw.startsWith('[') || !raw.endsWith(']')) return [];
  return raw.slice(1, -1).split(',').map((s) => s.trim()).filter(Boolean);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test hooks/lib/frontmatter.test.mjs`
Expected: PASS (7 tests).

- [ ] **Step 5: Commit**

```bash
git add hooks/lib/frontmatter.mjs hooks/lib/frontmatter.test.mjs
git commit -m "feat(hooks): minimal dependency-free frontmatter reader (F-43/F-44 shared lib)"
```

### Task A2: Local config reader (`hooks/lib/local-config.mjs`)

**Files:**
- Create: `hooks/lib/local-config.mjs`
- Test: `hooks/lib/local-config.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
// hooks/lib/local-config.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { readLocalConfig, isGuardrailEnabled, enabledChecks } from './local-config.mjs';

function projectWith(localMd) {
  const root = mkdtempSync(join(tmpdir(), 'pmcfg-'));
  if (localMd !== null) {
    mkdirSync(join(root, '.claude'), { recursive: true });
    writeFileSync(join(root, '.claude', 'pm-skills.local.md'), localMd, 'utf8');
  }
  return root;
}

test('absent file returns {}', () => {
  const root = projectWith(null);
  assert.deepEqual(readLocalConfig(root), {});
  rmSync(root, { recursive: true, force: true });
});

test('malformed file returns {} (no throw)', () => {
  const root = projectWith('not even frontmatter');
  assert.deepEqual(readLocalConfig(root), {});
  rmSync(root, { recursive: true, force: true });
});

test('guardrails true is read', () => {
  const root = projectWith('---\nguardrails: true\n---\n');
  const cfg = readLocalConfig(root);
  assert.equal(isGuardrailEnabled(cfg), true);
  rmSync(root, { recursive: true, force: true });
});

test('enabledChecks defaults to [em-dash] when guardrails on and no list', () => {
  const root = projectWith('---\nguardrails: true\n---\n');
  assert.deepEqual(enabledChecks(readLocalConfig(root)), ['em-dash']);
  rmSync(root, { recursive: true, force: true });
});

test('enabledChecks honors an explicit list', () => {
  const root = projectWith('---\nguardrails: true\nguardrail_checks: [em-dash, placeholder]\n---\n');
  assert.deepEqual(enabledChecks(readLocalConfig(root)), ['em-dash', 'placeholder']);
  rmSync(root, { recursive: true, force: true });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test hooks/lib/local-config.test.mjs`
Expected: FAIL with "Cannot find module './local-config.mjs'".

- [ ] **Step 3: Write minimal implementation**

```js
// hooks/lib/local-config.mjs - read .claude/pm-skills.local.md. Never throws.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { splitFrontmatter, getField, getList } from './frontmatter.mjs';

export function readLocalConfig(projectRoot) {
  try {
    const text = readFileSync(join(projectRoot, '.claude', 'pm-skills.local.md'), 'utf8');
    const fm = splitFrontmatter(text);
    if (!fm) return {};
    const cfg = {};
    const guardrails = getField(fm, 'guardrails');
    if (guardrails !== null) cfg.guardrails = guardrails === 'true';
    const checks = getList(fm, 'guardrail_checks');
    if (checks.length) cfg.guardrail_checks = checks;
    const router = getField(fm, 'phase_router');
    if (router !== null) cfg.phase_router = router;
    return cfg;
  } catch {
    return {}; // absent or unreadable -> fail open
  }
}

export function isGuardrailEnabled(config) {
  return config.guardrails === true;
}

export function enabledChecks(config) {
  if (!isGuardrailEnabled(config)) return [];
  return config.guardrail_checks && config.guardrail_checks.length
    ? config.guardrail_checks
    : ['em-dash'];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test hooks/lib/local-config.test.mjs`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add hooks/lib/local-config.mjs hooks/lib/local-config.test.mjs
git commit -m "feat(hooks): .local.md config reader with fail-open semantics (F-43)"
```

### Task A3: Guardrail hook (`hooks/guardrails.mjs`)

**Files:**
- Create: `hooks/guardrails.mjs`
- Test: `hooks/guardrails.test.mjs`

- [ ] **Step 1: Write the failing test** (EM built via String.fromCharCode, never a literal glyph)

```js
// hooks/guardrails.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { evaluateGuardrail } from './guardrails.mjs';

const EM = String.fromCharCode(0x2014); // em-dash, built so this file never self-blocks
const payload = (input) => JSON.stringify({ tool_input: input });

test('inert by default: em-dash allowed when config empty', () => {
  const d = evaluateGuardrail(payload({ content: 'a' + EM + 'b' }), {});
  assert.equal(d, null); // null = allow, no output
});

test('em-dash denied when guardrails on', () => {
  const d = evaluateGuardrail(payload({ content: 'a' + EM + 'b' }), { guardrails: true });
  assert.equal(d.hookSpecificOutput.permissionDecision, 'deny');
  assert.match(d.hookSpecificOutput.permissionDecisionReason, /em-dash/);
});

test('placeholder not blocked when only em-dash enabled', () => {
  const d = evaluateGuardrail(payload({ content: 'TODO later' }), { guardrails: true, guardrail_checks: ['em-dash'] });
  assert.equal(d, null);
});

test('placeholder warns (not denies) when enabled', () => {
  const d = evaluateGuardrail(payload({ content: 'TODO later' }), { guardrails: true, guardrail_checks: ['em-dash', 'placeholder'] });
  assert.equal(d.hookSpecificOutput.permissionDecision, undefined);
  assert.match(d.hookSpecificOutput.additionalContext, /placeholder/i);
});

test('malformed payload fails open (allow)', () => {
  assert.equal(evaluateGuardrail('not json', { guardrails: true }), null);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test hooks/guardrails.test.mjs`
Expected: FAIL with "Cannot find module './guardrails.mjs'".

- [ ] **Step 3: Write minimal implementation** (EM/EN built via String.fromCharCode, never literal glyphs)

```js
// hooks/guardrails.mjs - PreToolUse(Write|Edit|NotebookEdit) house-rule guardrail.
// Opt-in via .claude/pm-skills.local.md. em-dash/en-dash BLOCKS; placeholder and
// fabricated-metric WARN. Fail-open on every error path. Dependency-free.
// The banned chars are built with String.fromCharCode so this file does not deny
// edits to itself (and so it can be written past the no-em-dashes hook).
import { pathToFileURL } from 'node:url';
import { readLocalConfig, enabledChecks } from './lib/local-config.mjs';

const EM = String.fromCharCode(0x2014); // em-dash
const EN = String.fromCharCode(0x2013); // en-dash

const PLACEHOLDERS = [/\[Placeholder\]/i, /\[Feature Name\]/i, /\bTODO\b/, /<\.\.\.>/];

/**
 * Pure evaluator. Returns a hook-output object to print, or null to allow silently.
 * config: a parsed .local.md config object ({} = not opted in).
 */
export function evaluateGuardrail(payloadText, config) {
  let text;
  try {
    const payload = JSON.parse(payloadText);
    const ti = payload.tool_input || {};
    text = [ti.new_string, ti.content, ti.new_source].filter((s) => typeof s === 'string').join('');
  } catch {
    return null; // malformed payload -> fail open
  }
  const checks = enabledChecks(config || {});
  if (!checks.length) return null; // not opted in -> inert

  if (checks.includes('em-dash')) {
    const found = [];
    if (text.includes(EM)) found.push('em-dash (U+2014)');
    if (text.includes(EN)) found.push('en-dash (U+2013)');
    if (found.length) {
      return {
        hookSpecificOutput: {
          hookEventName: 'PreToolUse',
          permissionDecision: 'deny',
          permissionDecisionReason:
            'Blocked: would write ' + found.join(' and ') +
            ". Replace with ' - ' or restructure with a comma / colon / sentence break.",
        },
      };
    }
  }

  const notes = [];
  if (checks.includes('placeholder') && PLACEHOLDERS.some((re) => re.test(text))) {
    notes.push('Advisory: unfilled placeholder (e.g. TODO / [Placeholder]) detected.');
  }
  if (checks.includes('fabricated-metric') && /\b\d+(\.\d+)?%?/.test(text) && !/\[fictional\]/i.test(text)) {
    notes.push('Advisory: a numeric metric was written; confirm it is sourced or marked [fictional].');
  }
  if (notes.length) {
    return { hookSpecificOutput: { hookEventName: 'PreToolUse', additionalContext: notes.join(' ') } };
  }
  return null;
}

async function main() {
  const chunks = [];
  try {
    for await (const chunk of process.stdin) chunks.push(chunk);
    const payloadText = Buffer.concat(chunks).toString('utf8'); // explicit UTF-8 (cp1252 guard)
    const cwd = (JSON.parse(payloadText).cwd) || process.cwd();
    const decision = evaluateGuardrail(payloadText, readLocalConfig(cwd));
    if (decision) process.stdout.write(JSON.stringify(decision));
  } catch {
    // fail open: emit nothing, allow the write
  }
  process.exit(0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test hooks/guardrails.test.mjs`
Expected: PASS (5 tests).

- [ ] **Step 5: Commit**

```bash
git add hooks/guardrails.mjs hooks/guardrails.test.mjs
git commit -m "feat(hooks): F-43 opt-in PreToolUse house-rule guardrail (em-dash blocks; advisory checks warn)"
```

### Task A4: Register the PreToolUse hook (`hooks/hooks.json`)

**Files:**
- Create: `hooks/hooks.json`

- [ ] **Step 1: Write the file**

```json
{
  "description": "pm-skills hooks: opt-in house-rule guardrails (PreToolUse) + confident-only phase router (SessionStart)",
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit|NotebookEdit",
        "hooks": [
          { "type": "command", "command": "node \"${CLAUDE_PLUGIN_ROOT}/hooks/guardrails.mjs\"", "timeout": 10 }
        ]
      }
    ]
  }
}
```

- [ ] **Step 2: Validate plugin install**

Run: `bash scripts/validate-plugin-install.sh`
Expected: PASS (the new `hooks/` directory does not break install).

- [ ] **Step 3: Commit**

```bash
git add hooks/hooks.json
git commit -m "feat(hooks): register F-43 PreToolUse guardrail in hooks.json"
```

---

## Phase B - F-44 phase router

### Task B1: Phase map (`hooks/lib/phase-map.mjs`)

**Files:**
- Create: `hooks/lib/phase-map.mjs`, `hooks/fixtures/skills/<two tiny SKILL.md>`
- Test: `hooks/lib/phase-map.test.mjs`

- [ ] **Step 1: Create fixtures**

```
hooks/fixtures/skills/define-x/SKILL.md:
---
name: define-x
phase: define
---
# Define X

hooks/fixtures/skills/deliver-y/SKILL.md:
---
name: deliver-y
phase: deliver
---
# Deliver Y
```

- [ ] **Step 2: Write the failing test**

```js
// hooks/lib/phase-map.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { join } from 'node:path';
import { buildPhaseMap, skillsForPhase } from './phase-map.mjs';

const FIX = join(import.meta.dirname, '..', 'fixtures', 'skills');

test('buildPhaseMap groups skills by phase', () => {
  const map = buildPhaseMap(FIX);
  assert.deepEqual(map.define, ['define-x']);
  assert.deepEqual(map.deliver, ['deliver-y']);
});

test('skillsForPhase returns [] for an unknown phase', () => {
  assert.deepEqual(skillsForPhase(buildPhaseMap(FIX), 'measure'), []);
});

test('buildPhaseMap returns {} for a missing dir (fail safe)', () => {
  assert.deepEqual(buildPhaseMap('/no/such/dir'), {});
});
```

- [ ] **Step 3: Write minimal implementation**

```js
// hooks/lib/phase-map.mjs - build {phase: [skillName,...]} from skills/*/SKILL.md.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { splitFrontmatter, getField } from './frontmatter.mjs';

const PHASES = new Set(['discover', 'define', 'develop', 'deliver', 'measure', 'iterate']);

export function buildPhaseMap(skillsDir) {
  const map = {};
  let entries;
  try {
    entries = readdirSync(skillsDir, { withFileTypes: true });
  } catch {
    return {}; // missing dir -> empty map (fail safe)
  }
  for (const e of entries) {
    if (!e.isDirectory()) continue;
    try {
      const fm = splitFrontmatter(readFileSync(join(skillsDir, e.name, 'SKILL.md'), 'utf8'));
      const phase = getField(fm, 'phase');
      const name = getField(fm, 'name') || e.name;
      if (phase && PHASES.has(phase)) (map[phase] ||= []).push(name);
    } catch {
      // skip unparseable skill
    }
  }
  return map;
}

export function skillsForPhase(map, phase) {
  return map[phase] || [];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test hooks/lib/phase-map.test.mjs`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add hooks/lib/phase-map.mjs hooks/lib/phase-map.test.mjs hooks/fixtures/skills
git commit -m "feat(hooks): phase-map from SKILL.md frontmatter (F-44)"
```

### Task B2: Signal detection (`hooks/lib/signals.mjs`)

**Files:**
- Create: `hooks/lib/signals.mjs`
- Test: `hooks/lib/signals.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
// hooks/lib/signals.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { branchPhase, artifactPhase, resolvePhase } from './signals.mjs';

test('branchPhase reads .git/HEAD prefix', () => {
  const root = mkdtempSync(join(tmpdir(), 'sig-'));
  mkdirSync(join(root, '.git'), { recursive: true });
  writeFileSync(join(root, '.git', 'HEAD'), 'ref: refs/heads/discover/users\n');
  assert.equal(branchPhase(root), 'discover');
  rmSync(root, { recursive: true, force: true });
});

test('branchPhase returns null for a non-phase branch', () => {
  const root = mkdtempSync(join(tmpdir(), 'sig-'));
  mkdirSync(join(root, '.git'), { recursive: true });
  writeFileSync(join(root, '.git', 'HEAD'), 'ref: refs/heads/main\n');
  assert.equal(branchPhase(root), null);
  rmSync(root, { recursive: true, force: true });
});

test('artifactPhase maps a PRD-like filename to deliver', () => {
  const root = mkdtempSync(join(tmpdir(), 'sig-'));
  writeFileSync(join(root, 'prd-checkout.md'), '# PRD');
  assert.equal(artifactPhase(root), 'deliver');
  rmSync(root, { recursive: true, force: true });
});

test('resolvePhase prefers a branch signal over artifact', () => {
  assert.equal(resolvePhase('discover', 'deliver'), 'discover');
  assert.equal(resolvePhase(null, 'deliver'), 'deliver');
  assert.equal(resolvePhase(null, null), null);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test hooks/lib/signals.test.mjs`
Expected: FAIL with "Cannot find module './signals.mjs'".

- [ ] **Step 3: Write minimal implementation**

```js
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test hooks/lib/signals.test.mjs`
Expected: PASS (4 tests).

- [ ] **Step 5: Commit**

```bash
git add hooks/lib/signals.mjs hooks/lib/signals.test.mjs
git commit -m "feat(hooks): phase signal detection (branch + artifact) for F-44"
```

### Task B3: Router hook (`hooks/phase-router.mjs`)

**Files:**
- Create: `hooks/phase-router.mjs`
- Test: `hooks/phase-router.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
// hooks/phase-router.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { route } from './phase-router.mjs';

const FIX_SKILLS = join(import.meta.dirname, 'fixtures', 'skills');

test('confident branch signal injects a phase nudge naming a real skill', () => {
  const root = mkdtempSync(join(tmpdir(), 'route-'));
  mkdirSync(join(root, '.git'), { recursive: true });
  writeFileSync(join(root, '.git', 'HEAD'), 'ref: refs/heads/define/x\n');
  const out = route(root, FIX_SKILLS);
  assert.equal(out.hookSpecificOutput.hookEventName, 'SessionStart');
  assert.match(out.hookSpecificOutput.additionalContext, /Define phase/);
  assert.match(out.hookSpecificOutput.additionalContext, /define-x/);
  rmSync(root, { recursive: true, force: true });
});

test('no signal returns null (silent path)', () => {
  const root = mkdtempSync(join(tmpdir(), 'route-'));
  assert.equal(route(root, FIX_SKILLS), null);
  rmSync(root, { recursive: true, force: true });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test hooks/phase-router.test.mjs`
Expected: FAIL with "Cannot find module './phase-router.mjs'".

- [ ] **Step 3: Write minimal implementation**

```js
// hooks/phase-router.mjs - SessionStart phase router. ON by default, silent
// unless a strong signal resolves a phase. Dependency-free.
import { pathToFileURL, fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { branchPhase, artifactPhase, resolvePhase } from './lib/signals.mjs';
import { buildPhaseMap, skillsForPhase } from './lib/phase-map.mjs';

const SELF_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_SKILLS_DIR = join(SELF_DIR, '..', 'skills');
const TITLE = { discover: 'Discover', define: 'Define', develop: 'Develop', deliver: 'Deliver', measure: 'Measure', iterate: 'Iterate' };

/** Pure router. Returns a SessionStart hook-output object, or null to stay silent. */
export function route(cwd, skillsDir = DEFAULT_SKILLS_DIR) {
  let phase;
  try {
    phase = resolvePhase(branchPhase(cwd), artifactPhase(cwd));
  } catch {
    return null; // any signal error -> silent (fail safe)
  }
  if (!phase) return null;
  const skills = skillsForPhase(buildPhaseMap(skillsDir), phase).slice(0, 4);
  if (!skills.length) return null;
  const context =
    'You appear to be in the ' + TITLE[phase] + ' phase of the Triple Diamond. ' +
    'Relevant pm-skills: ' + skills.join(', ') + '. Invoke the one that fits the task.';
  return { hookSpecificOutput: { hookEventName: 'SessionStart', additionalContext: context } };
}

async function main() {
  const chunks = [];
  try {
    for await (const chunk of process.stdin) chunks.push(chunk);
    const raw = Buffer.concat(chunks).toString('utf8') || '{}';
    const cwd = (JSON.parse(raw).cwd) || process.cwd();
    const out = route(cwd);
    if (out) process.stdout.write(JSON.stringify(out));
  } catch {
    // silent on any error
  }
  process.exit(0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test hooks/phase-router.test.mjs`
Expected: PASS (2 tests).

- [ ] **Step 5: Commit**

```bash
git add hooks/phase-router.mjs hooks/phase-router.test.mjs
git commit -m "feat(hooks): F-44 confident-only SessionStart phase router"
```

### Task B4: Register the SessionStart hook

**Files:**
- Modify: `hooks/hooks.json`

- [ ] **Step 1: Add the SessionStart block** alongside `PreToolUse`

```json
    "SessionStart": [
      {
        "matcher": "startup|resume|clear|compact",
        "hooks": [
          { "type": "command", "command": "node \"${CLAUDE_PLUGIN_ROOT}/hooks/phase-router.mjs\"", "timeout": 10 }
        ]
      }
    ]
```

- [ ] **Step 2: Validate JSON + plugin install**

Run: `node -e "JSON.parse(require('fs').readFileSync('hooks/hooks.json','utf8')); console.log('ok')"` then `bash scripts/validate-plugin-install.sh`
Expected: `ok` then PASS.

- [ ] **Step 3: Commit**

```bash
git add hooks/hooks.json
git commit -m "feat(hooks): register F-44 SessionStart phase router in hooks.json"
```

---

## Phase C - M-30 eval harness Phase 1 (advisory)

These run in repo/CI context (root `node_modules` available); `js-yaml` is permitted here. Each validator scans `library/skill-output-samples/`, prints a per-finding report, and exits non-zero if any finding (so CI can surface it), but is wired ADVISORY (`continue-on-error`) so it never blocks.

### Task C1: no-placeholders validator

**Files:**
- Create: `scripts/check-sample-no-placeholders.mjs`, `scripts/check-sample-no-placeholders.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
// scripts/check-sample-no-placeholders.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findPlaceholders } from './check-sample-no-placeholders.mjs';

test('flags TODO and bracket placeholders', () => {
  const hits = findPlaceholders('Body with TODO and [Placeholder] and <...> here');
  assert.ok(hits.length >= 3);
});

test('clean text yields no hits', () => {
  assert.deepEqual(findPlaceholders('A complete sentence with no placeholders.'), []);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/check-sample-no-placeholders.test.mjs`
Expected: FAIL "Cannot find module".

- [ ] **Step 3: Write minimal implementation**

```js
// scripts/check-sample-no-placeholders.mjs - advisory invariant over recorded samples.
import { readFileSync, globSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const PATTERNS = [/\[Placeholder\]/gi, /\[Feature Name\]/gi, /\bTODO\b/g, /<\.\.\.>/g, /\[[A-Z][a-z]+ [A-Z][a-z]+\]/g];

export function findPlaceholders(text) {
  const hits = [];
  for (const re of PATTERNS) {
    for (const m of text.matchAll(re)) hits.push(m[0]);
  }
  return hits;
}

function main() {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  const files = globSync('library/skill-output-samples/**/*.md', { cwd: repo }).map((f) => join(repo, f));
  let findings = 0;
  for (const f of files) {
    const hits = findPlaceholders(readFileSync(f, 'utf8'));
    if (hits.length) {
      findings += hits.length;
      console.log(`PLACEHOLDER  ${f}: ${[...new Set(hits)].join(', ')}`);
    }
  }
  console.log(findings ? `\n${findings} placeholder finding(s) across samples (advisory).` : 'no placeholder findings.');
  process.exit(findings ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
```

- [ ] **Step 4: Run test, then run over the corpus**

Run: `node --test scripts/check-sample-no-placeholders.test.mjs` (Expected: PASS)
Run: `node scripts/check-sample-no-placeholders.mjs` (Expected: a report; triage any real findings - fix the sample or add a documented exempt marker. The glob is limited to `library/skill-output-samples/`.)

- [ ] **Step 5: Commit**

```bash
git add scripts/check-sample-no-placeholders.mjs scripts/check-sample-no-placeholders.test.mjs
git commit -m "feat(eval): M-30 no-placeholders invariant (advisory)"
```

### Task C2: exact-quote-sourcing validator

**Files:**
- Create: `scripts/check-sample-exact-quote-sourcing.mjs`, `scripts/check-sample-exact-quote-sourcing.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
// scripts/check-sample-exact-quote-sourcing.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { unsourcedQuotes } from './check-sample-exact-quote-sourcing.mjs';

const input = 'User said: "the checkout is too slow" during the call.';

test('exact substring quote passes', () => {
  assert.deepEqual(unsourcedQuotes('Source: "the checkout is too slow"', input), []);
});

test('non-substring quote is flagged', () => {
  assert.deepEqual(unsourcedQuotes('Source: "checkout was painfully slow"', input), ['checkout was painfully slow']);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/check-sample-exact-quote-sourcing.test.mjs`
Expected: FAIL "Cannot find module".

- [ ] **Step 3: Write minimal implementation**

```js
// scripts/check-sample-exact-quote-sourcing.mjs - every Source: "quote" must be an
// exact substring of the sample's Prompt/input block. Scoped to evidence-citing
// skills (start: foundation-prioritized-action-plan). Promotes the v2.23.0 hand-check.
import { readFileSync, globSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const SCOPE = ['foundation-prioritized-action-plan'];

/** Return the list of Source: quotes not found verbatim in `input`. */
export function unsourcedQuotes(sampleText, input) {
  const out = [];
  for (const m of sampleText.matchAll(/Source:\s*"([^"]+)"/g)) {
    if (!input.includes(m[1])) out.push(m[1]);
  }
  return out;
}

/** Split a sample into its Prompt/input region (everything the model was given). */
export function inputRegion(sampleText) {
  // Heuristic: text under a "## Prompt" / "## Input" / "Scenario" heading up to "## Output".
  const m = /(##\s*(Prompt|Input|Scenario)[\s\S]*?)(?:\n##\s*Output|\n#\s|$)/i.exec(sampleText);
  return m ? m[1] : sampleText;
}

function main() {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  const files = SCOPE.flatMap((s) => globSync(`library/skill-output-samples/${s}/**/*.md`, { cwd: repo })).map((f) => join(repo, f));
  let findings = 0;
  for (const f of files) {
    const text = readFileSync(f, 'utf8');
    const bad = unsourcedQuotes(text, inputRegion(text));
    if (bad.length) {
      findings += bad.length;
      console.log(`UNSOURCED  ${f}: ${bad.map((q) => `"${q}"`).join(', ')}`);
    }
  }
  console.log(findings ? `\n${findings} unsourced-quote finding(s) (advisory).` : 'no unsourced-quote findings.');
  process.exit(findings ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
```

- [ ] **Step 4: Run test, then run over the scoped corpus**

Run: `node --test scripts/check-sample-exact-quote-sourcing.test.mjs` (Expected: PASS)
Run: `node scripts/check-sample-exact-quote-sourcing.mjs` (Expected: clean, since the scoped corpus is known-clean as of v2.23.0; triage if not.)

- [ ] **Step 5: Commit**

```bash
git add scripts/check-sample-exact-quote-sourcing.mjs scripts/check-sample-exact-quote-sourcing.test.mjs
git commit -m "feat(eval): M-30 exact-quote-sourcing invariant (advisory, scoped)"
```

### Task C3: no-fabricated-metrics validator

**Files:**
- Create: `scripts/check-sample-no-fabricated-metrics.mjs`, `scripts/check-sample-no-fabricated-metrics.test.mjs`

- [ ] **Step 1: Write the failing test**

```js
// scripts/check-sample-no-fabricated-metrics.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fabricatedMetrics } from './check-sample-no-fabricated-metrics.mjs';

test('number absent from input and not [fictional] is flagged', () => {
  assert.ok(fabricatedMetrics('Revenue grew 47% last quarter.', 'Revenue grew last quarter.').includes('47%'));
});

test('number present in input passes', () => {
  assert.deepEqual(fabricatedMetrics('Revenue grew 47% last quarter.', 'Prompt: we saw 47% growth'), []);
});

test('[fictional]-marked number passes', () => {
  assert.deepEqual(fabricatedMetrics('Revenue grew 47% [fictional].', 'no number here'), []);
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test scripts/check-sample-no-fabricated-metrics.test.mjs`
Expected: FAIL "Cannot find module".

- [ ] **Step 3: Write minimal implementation**

```js
// scripts/check-sample-no-fabricated-metrics.mjs - advisory heuristic: a number/percent
// in the output not present in the input and not marked [fictional] is flagged.
import { readFileSync, globSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { inputRegion } from './check-sample-exact-quote-sourcing.mjs';

const NUM = /\b\d+(?:\.\d+)?%?/g;

/** Numbers in `output` not in `input` and not within a [fictional] marker window. */
export function fabricatedMetrics(output, input) {
  const out = [];
  for (const m of output.matchAll(NUM)) {
    const n = m[0];
    if (input.includes(n)) continue;
    const window = output.slice(Math.max(0, m.index - 40), m.index + n.length + 40);
    if (/\[fictional\]/i.test(window)) continue;
    out.push(n);
  }
  return out;
}

function main() {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  const files = globSync('library/skill-output-samples/**/*.md', { cwd: repo }).map((f) => join(repo, f));
  let findings = 0;
  for (const f of files) {
    const text = readFileSync(f, 'utf8');
    if (/eval-exempt:\s*fabricated-metric/i.test(text)) continue; // per-sample exempt marker
    const bad = fabricatedMetrics(text, inputRegion(text));
    if (bad.length) {
      findings += bad.length;
      console.log(`METRIC?  ${f}: ${[...new Set(bad)].join(', ')}`);
    }
  }
  console.log(findings ? `\n${findings} possible-unsourced-metric finding(s) (advisory, heuristic).` : 'no metric findings.');
  process.exit(findings ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
```

- [ ] **Step 4: Run test, then run over the corpus (expect findings; do NOT mass-fix samples)**

Run: `node --test scripts/check-sample-no-fabricated-metrics.test.mjs` (Expected: PASS)
Run: `node scripts/check-sample-no-fabricated-metrics.mjs` (Expected: likely many heuristic findings; this is ADVISORY. Record the count in the release notes; the `[fictional]` allowlist + `eval-exempt` marker handle legitimate cases as they are triaged.)

- [ ] **Step 5: Commit**

```bash
git add scripts/check-sample-no-fabricated-metrics.mjs scripts/check-sample-no-fabricated-metrics.test.mjs
git commit -m "feat(eval): M-30 no-fabricated-metrics invariant (advisory, heuristic)"
```

### Task C4: Wire the three validators advisory into CI

**Files:**
- Modify: `.github/workflows/validation.yml`

- [ ] **Step 1: Add three advisory steps + a unit-test step** after the existing node-test step (near line 309), matching the file's existing step style

```yaml
      - name: Eval - no placeholders in samples (advisory)
        continue-on-error: true
        run: node scripts/check-sample-no-placeholders.mjs

      - name: Eval - exact-quote sourcing (advisory)
        continue-on-error: true
        run: node scripts/check-sample-exact-quote-sourcing.mjs

      - name: Eval - no fabricated metrics (advisory)
        continue-on-error: true
        run: node scripts/check-sample-no-fabricated-metrics.mjs

      - name: Eval - run hook + validator unit tests
        run: |
          node --test hooks/lib/frontmatter.test.mjs hooks/lib/local-config.test.mjs hooks/lib/phase-map.test.mjs hooks/lib/signals.test.mjs hooks/guardrails.test.mjs hooks/phase-router.test.mjs
          node --test scripts/check-sample-no-placeholders.test.mjs scripts/check-sample-exact-quote-sourcing.test.mjs scripts/check-sample-no-fabricated-metrics.test.mjs
```

- [ ] **Step 2: Confirm `validate-script-docs` scope**

Run: `bash scripts/validate-script-docs.sh`
Expected: PASS. If it requires a `.md` companion for the new `.mjs` files, add minimal companion docs and re-run.

- [ ] **Step 3: Commit**

```bash
git add .github/workflows/validation.yml
git commit -m "ci(eval): wire M-30 invariants advisory + run hook/validator unit tests"
```

---

## Phase D - hygiene, docs, integration, ship-prep

The exact surface is enumerated in `plan_v2.25.0.md` (Hygiene and registration surface). Do NOT duplicate it here; follow that list. The task-level checklist:

### Task D1: Version bump 2.24.0 -> 2.25.0

- [ ] Bump the `version` field in `.claude-plugin/plugin.json`, `.claude-plugin/marketplace.json`, `.codex-plugin/plugin.json`, and the `README.md` badge + At-a-Glance row. Do NOT touch `package.json` / `site/package.json`.
- [ ] Confirm counts UNCHANGED (65 skills / 5 sub-agents); do not edit any breakdown.
- [ ] Run: `bash scripts/validate-version-consistency.sh --strict` and `bash scripts/check-count-consistency.sh` and `bash scripts/check-landing-page-counts.sh --strict`. Expected: PASS.
- [ ] Commit: `chore(v2.25.0): bump version to 2.25.0 across manifests`.

### Task D2: Reference docs (with mermaid) + CHANGELOG + release notes

- [ ] Create three user-facing reference pages under the rendered docs tree (valid `title` + `description` frontmatter), each embedding its mermaid diagram from `spec_v2.25.0.md` (guardrails decision flow + `.local.md` schema; phase-router confidence flow + mapping; eval three-tier model). Document the `.claude/pm-skills.local.md` schema.
- [ ] Root `CHANGELOG.md` `## [2.25.0]` under Added; `docs/changelog.md` mirror; `docs/releases/Release_v2.25.0.md` (with `slug:` frontmatter); `docs/releases/index.md` new top row; `README.md` What's New + history row.
- [ ] Regenerate any generated indexes via the site generators (do NOT hand-edit generated pages).
- [ ] Run: `bash scripts/validate-docs-frontmatter.sh --strict`; build the site (`cd site && npm ci && npm run build`); `bash scripts/check-generated-content-untouched.sh`. Expected: PASS.
- [ ] Commit: `docs(v2.25.0): reference pages (mermaid) + changelog + release notes`.

### Task D3: Integration smoke + pre-tag bundle

- [ ] Manual integration smoke (the true end-to-end gate unit tests cannot prove): enable the plugin locally; in a scratch repo with `.claude/pm-skills.local.md` `guardrails: true`, confirm Claude's Write of an em-dash is DENIED and, with no `.local.md`, ALLOWED; on a `discover/x` branch confirm a Discover nudge appears at session start, and on `main` with no artifact confirm silence. Record the result in a short `smoke-test-record.md` in this directory.
- [ ] Run the full pre-tag bundle: `bash scripts/pre-tag-validate.sh --strict`. Expected: PASS.
- [ ] Em-dash / en-dash sweep over all new files (`hooks/**`, `scripts/check-sample-*`); the `no-em-dashes` hook is the safety net.
- [ ] Commit: `test(v2.25.0): record hook integration smoke`.

### Task D4: Finish the branch

- [ ] Use superpowers:requesting-code-review on the branch diff.
- [ ] Open a PR (squash-merge target `main`, linear history - never a merge commit). Update this plan + the three effort briefs to SHIPPED on tag; bump `_agent-context/{claude,codex}/CONTEXT.md` to v2.25.0; flip roadmap 3.4/3.6 and the eval idea doc to "shipped v2.25.0".

---

## Self-review (against the spec)

- **Spec coverage:** F-43 -> Tasks A1-A4 (lib + hook + register); F-44 -> Tasks B1-B4; M-30 -> Tasks C1-C4; cross-component ACs (version, counts, docs, tests) -> Phase D. Every spec AC maps to a task or its test.
- **Placeholder scan:** no "TBD"/"implement later" in code steps; each code step is complete and runnable. `validate-script-docs` confirmation and the exact reference-doc content are deferred to Phase D by design (they depend on the build), not as placeholders.
- **Type consistency:** exported names are consistent across tasks - `splitFrontmatter`/`getField`/`getList` (A1) imported in A2/B1; `enabledChecks`/`readLocalConfig` (A2) in A3; `branchPhase`/`artifactPhase`/`resolvePhase` (B2) in B3; `buildPhaseMap`/`skillsForPhase` (B1) in B3; `inputRegion` (C2) reused in C3.
- **Banned-character discipline:** every em-dash / en-dash in the hook code and tests is built via `String.fromCharCode(0x2014)` / `String.fromCharCode(0x2013)`, never a literal glyph - mandatory so `guardrails.mjs` does not deny edits to itself (proven necessary when the no-em-dashes hook blocked this very plan's first drafts).
- **Known follow-up flagged, not a placeholder:** the C3 corpus run is expected to surface many advisory findings - that is the intent of advisory-first (recorded, not mass-fixed). The `fabricated-metric` advisory in the F-43 hook only ever WARNS, so a heuristic false positive is harmless.
```
