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
