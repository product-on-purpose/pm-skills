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
