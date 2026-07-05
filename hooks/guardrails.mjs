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

// Fabricated-metric heuristic. A number ALONE is not a metric: a date (2026-07-04),
// a version (1.2.3), or a count ("3 skills") must NOT trip the check. Fire only when
// a number shares its LINE with metric context: a percentage, a currency symbol, or a
// metric keyword. Kept advisory - a false positive here is a nudge to cite a source,
// never a block. Currency glyphs are built from code points so this source stays ASCII
// (the file's existing convention, mirroring the EM / EN escapes above).
const CURRENCY = '$' + String.fromCharCode(0x00a3, 0x20ac, 0x00a5); // $ GBP EUR JPY
const METRIC_PERCENT = /\d\s*%/; // 40%  or  40 %
const METRIC_CURRENCY = new RegExp('[' + CURRENCY + ']\\s*\\d'); // symbol then a number
const METRIC_WORD =
  /\b(?:users?|revenue|conversions?|growth|retention|churn|signups?|subscribers?|engagement|MRR|ARR|ROI|CTR|DAU|MAU|NPS|LTV|CAC)\b/i;

function hasMetricContext(text) {
  for (const line of text.split('\n')) {
    if (METRIC_PERCENT.test(line) || METRIC_CURRENCY.test(line)) return true;
    if (/\d/.test(line) && METRIC_WORD.test(line)) return true;
  }
  return false;
}

/**
 * Pure evaluator. Returns a hook-output object to print, or null to allow silently.
 * config: a parsed .local.md config object ({} = not opted in).
 */
export function evaluateGuardrail(payloadText, config) {
  let text;
  try {
    const payload = JSON.parse(payloadText);
    const ti = payload.tool_input || {};
    const parts = [ti.new_string, ti.content, ti.new_source, ti.plan]; // ti.plan = ExitPlanMode
    if (Array.isArray(ti.edits)) for (const e of ti.edits) parts.push(e && e.new_string); // MultiEdit
    text = parts.filter((s) => typeof s === 'string').join('\n');
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
  if (checks.includes('fabricated-metric') && hasMetricContext(text) && !/\[fictional\]/i.test(text)) {
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
