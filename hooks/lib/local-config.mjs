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
    // Project memory (B1 / F-48). Only the two keys the ROUTER needs are parsed here.
    // `artifacts[]` and `## Decisions` are deliberately NOT parsed: they are lists of
    // objects and prose sections, which this flat reader cannot express, and the spec's
    // contract is that the AGENT does that file I/O via Read, not the hook.
    const schema = getField(fm, 'schema');
    if (schema !== null) cfg.schema = schema;
    const phase = getField(fm, 'phase');
    if (phase !== null) cfg.phase = phase;
    const initiative = getField(fm, 'active_initiative');
    if (initiative !== null) cfg.active_initiative = initiative;
    const autoAppend = getField(fm, 'memory_auto_append');
    if (autoAppend !== null) cfg.memory_auto_append = autoAppend === 'true';
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

// The phase router is ON by default (documented schema: `phase_router: auto | off
// | verbose`). It is disabled ONLY by an explicit off-switch value; an unset key,
// `auto`, `verbose`, or any unrecognized value keeps it on, so a malformed config
// never silences the router (fail open to the default-on behavior).
const ROUTER_OFF = /^(off|false|no|0|disabled)$/i;

export function isPhaseRouterEnabled(config) {
  const v = config && config.phase_router;
  if (v === undefined || v === null) return true; // unset -> default on
  return !ROUTER_OFF.test(String(v).trim());
}

// ---------------------------------------------------------------------------
// Project memory (B1 / F-48)
//
// Note the deliberate asymmetry with the router above. The router fails OPEN
// (unset or malformed -> on) because it only ever ADDS a suggestion. Memory
// auto-append fails CLOSED (anything but an explicit `true` -> off) because it
// WRITES to the user's project. Assistance defaults on; writing is opt-in. That
// is the D3-C ruling (propose-then-confirm default) expressed in code.
// ---------------------------------------------------------------------------

const PHASES = new Set(['discover', 'define', 'develop', 'deliver', 'measure', 'iterate']);

/** The phase DECLARED in project memory, or null. An unrecognized value yields
 *  null rather than propagating: a typo must not make the router state a phase
 *  the Triple Diamond does not have. */
export function memoryPhase(config) {
  const v = config && config.phase;
  if (v === undefined || v === null) return null;
  const s = String(v).trim().toLowerCase();
  return PHASES.has(s) ? s : null;
}

/** The active initiative line, or null. The literal `null` and empty strings are
 *  treated as unset (the documented schema uses `null` for "unset"). Capped so a
 *  runaway value cannot bloat every SessionStart context injection. */
export function activeInitiative(config) {
  const v = config && config.active_initiative;
  if (v === undefined || v === null) return null;
  const s = String(v).replace(/\s+/g, ' ').trim();
  if (!s || s.toLowerCase() === 'null') return null;
  return s.length > 120 ? s.slice(0, 117) + '...' : s;
}

/** Whether memory writes may auto-append. OFF unless explicitly `true`. */
export function isAutoAppendEnabled(config) {
  return !!config && config.memory_auto_append === true;
}
