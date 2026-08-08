// hooks/phase-router.mjs - SessionStart phase router. ON by default, silent
// unless a strong signal resolves a phase. Opt out with `phase_router: off` in
// .claude/pm-skills.local.md (unset stays on). Dependency-free.
//
// Phase precedence (B1 / F-48 project memory):
//   1. `phase:` declared in .claude/pm-skills.local.md   <- a statement of fact
//   2. branch name        (branchPhase)                  <- heuristic
//   3. artifact filenames (artifactPhase)                <- heuristic
// The file is opt-in and absent by default, so with no file the router behaves
// exactly as it did before B1: infer, or stay silent.
import { pathToFileURL, fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { branchPhase, artifactPhase, resolvePhase } from './lib/signals.mjs';
import { buildPhaseMap, skillsForPhase } from './lib/phase-map.mjs';
import { readLocalConfig, isPhaseRouterEnabled, memoryPhase, activeInitiative } from './lib/local-config.mjs';

const SELF_DIR = dirname(fileURLToPath(import.meta.url));
const DEFAULT_SKILLS_DIR = join(SELF_DIR, '..', 'skills');
const TITLE = { discover: 'Discover', define: 'Define', develop: 'Develop', deliver: 'Deliver', measure: 'Measure', iterate: 'Iterate' };

/** Router. Returns a SessionStart hook-output object, or null to stay silent.
 *  `config` defaults to the project's .local.md; pass it explicitly in tests.
 *  A `phase_router: off` opt-out short-circuits to silence before any signal work. */
export function route(cwd, skillsDir = DEFAULT_SKILLS_DIR, config = readLocalConfig(cwd)) {
  if (!isPhaseRouterEnabled(config)) return null; // opt-out honored -> silent
  let phase;
  let declared = false;
  try {
    // Project memory (B1) is a DECLARATION and outranks both heuristics. The branch
    // and artifact signals exist because the router had no way to be told; when it
    // has been told, guessing over the top of that would be strictly worse.
    const fromMemory = memoryPhase(config);
    if (fromMemory) {
      phase = fromMemory;
      declared = true;
    } else {
      phase = resolvePhase(branchPhase(cwd), artifactPhase(cwd));
    }
  } catch {
    return null; // any signal error -> silent (fail safe)
  }
  if (!phase) return null;
  const skills = skillsForPhase(buildPhaseMap(skillsDir), phase).slice(0, 4);
  if (!skills.length) return null;
  // Hedged phrasing is correct for an inference and wrong for a declaration. Saying
  // "you appear to be" about a phase the user wrote down themselves reads as the hook
  // not having read it.
  const initiative = declared ? activeInitiative(config) : null;
  const lead = declared
    ? 'Project memory records the ' + TITLE[phase] + ' phase of the Triple Diamond' +
      (initiative ? ', active initiative: ' + initiative : '') + '. '
    : 'You appear to be in the ' + TITLE[phase] + ' phase of the Triple Diamond. ';
  const context = lead + 'Relevant pm-skills: ' + skills.join(', ') + '. Invoke the one that fits the task.';
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
