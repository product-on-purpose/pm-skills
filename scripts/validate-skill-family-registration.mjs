#!/usr/bin/env node
// validate-skill-family-registration.mjs - Generic structural validator for skill families.
//
// Single-source Node port of the retired validate-skill-family-registration.sh + .ps1
// pair (v2.31.0 WS-Z4, the R-18 dual-shell port wave 1). The bash implementation used
// awk match() as a boolean rule condition (one of the awk-hazard-adjacent scripts named
// in the WS-T9 freeze); this port replaces both shells with one cross-OS Node checker
// that parses the registry with js-yaml (the repo's declared YAML dependency) instead of
// hand-rolled awk/regex, so the family structure is read the same way on every OS.
//
// Reads site/src/content/docs/reference/skill-families/_registry.yaml and verifies, for
// each family:
//   1. The family contract document exists at the declared path
//   2. All declared member skills exist as directories in skills/
//   3. Each member's SKILL.md references the family contract path
//
// Family-specific contract rules (template sections, artifact_type enums, filename
// conventions) are NOT enforced here; they live in family-specific validators.
//
// Exit codes:
//   0 - All families pass structural validation
//   1 - One or more families have structural integrity violations (or registry
//       missing / empty / unparseable)
//
// Usage:
//   node scripts/validate-skill-family-registration.mjs
//   node scripts/validate-skill-family-registration.mjs --root <dir>   # validate a
//                                                                       # different tree
import yaml from 'js-yaml';
import { readFileSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const SCRIPTS = dirname(fileURLToPath(import.meta.url));

const isDir = (p) => existsSync(p) && statSync(p).isDirectory();
const isFile = (p) => existsSync(p) && statSync(p).isFile();

/** Parse the registry YAML into an ordered [{ name, contract, members }]. js-yaml
 *  preserves mapping key order, so families keep their declaration order. */
export function parseRegistry(text) {
  const doc = yaml.load(text);
  const fams = (doc && doc.families) || {};
  const out = [];
  for (const [name, body] of Object.entries(fams)) {
    out.push({
      name,
      contract: body && typeof body.contract === 'string' ? body.contract.trim() : '',
      members: body && Array.isArray(body.members) ? body.members.map((m) => String(m).trim()) : [],
    });
  }
  return out;
}

/** Structural check for a parsed family list against ROOT. Returns { code, lines }.
 *  Pure w.r.t. process state; mirrors the retired shells' verdict exactly. */
export function validateFamilies(root, families) {
  const lines = [];
  let fail = false;

  for (const fam of families) {
    lines.push(`--- Family: ${fam.name} ---`);

    if (!fam.contract) {
      lines.push(`  FAIL: family '${fam.name}' has no contract: declared in registry`);
      fail = true;
      continue;
    }

    // The registry declares contract paths relative to the historical docs content
    // root, which moved to site/src/content/docs/ in the Pattern S migration.
    const contractFull = join(root, 'site/src/content', fam.contract);
    if (!isFile(contractFull)) {
      lines.push(`  FAIL: contract file does not exist at ${fam.contract}`);
      fail = true;
    } else {
      lines.push(`  PASS: contract present at ${fam.contract}`);
    }

    if (fam.members.length === 0) {
      lines.push(`  FAIL: family '${fam.name}' has no members declared in registry`);
      fail = true;
      continue;
    }

    for (const member of fam.members) {
      const memberDir = join(root, 'skills', member);
      const memberSkillMd = join(memberDir, 'SKILL.md');

      if (!isDir(memberDir)) {
        lines.push(`  FAIL: member '${member}' has no directory at skills/${member}`);
        fail = true;
        continue;
      }
      if (!isFile(memberSkillMd)) {
        lines.push(`  FAIL: member '${member}' has no SKILL.md`);
        fail = true;
        continue;
      }
      // Verify SKILL.md references the contract path (literal substring, matching the
      // shells' grep -qF / -notmatch [regex]::Escape()).
      const content = readFileSync(memberSkillMd, 'utf8');
      if (!content.includes(fam.contract)) {
        lines.push(`  FAIL: member '${member}' SKILL.md does not reference family contract path (${fam.contract})`);
        fail = true;
      } else {
        lines.push(`  PASS: member '${member}' references contract`);
      }
    }

    lines.push(`  (${fam.members.length} member(s) verified)`);
    lines.push('');
  }

  return { code: fail ? 1 : 0, lines };
}

/** Run the full validation against ROOT. Returns { code, lines, families }. */
export function runCheck(root) {
  const registry = join(root, 'site/src/content/docs/reference/skill-families/_registry.yaml');
  if (!isFile(registry)) {
    return { code: 1, lines: [`FAIL: registry not found at ${registry}`], families: [] };
  }
  let families;
  try {
    families = parseRegistry(readFileSync(registry, 'utf8'));
  } catch (e) {
    return { code: 1, lines: [`FAIL: registry does not parse (${e.message})`], families: [] };
  }
  if (families.length === 0) {
    return { code: 1, lines: ['FAIL: no families found in registry. Verify _registry.yaml structure.'], families: [] };
  }
  const { code, lines } = validateFamilies(root, families);
  return { code, lines, families };
}

function parseRoot(argv) {
  const i = argv.indexOf('--root');
  if (i >= 0 && argv[i + 1]) return argv[i + 1];
  return join(SCRIPTS, '..');
}

function main() {
  const root = parseRoot(process.argv.slice(2));
  console.log('=== Skill Family Registration Validation ===');
  console.log('');

  const result = runCheck(root);
  for (const l of result.lines) console.log(l);

  if (result.families.length > 0) {
    console.log(`Total families validated: ${result.families.length}`);
    console.log('');
  }

  if (result.code === 0) {
    console.log('PASS: all skill families have structural integrity.');
  } else {
    console.log('FAIL: one or more families have structural integrity violations.');
  }
  return result.code;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exit(main());
}
