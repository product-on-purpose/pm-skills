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
