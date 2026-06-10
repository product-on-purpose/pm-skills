#!/usr/bin/env node
// check-validator-parity.mjs - the validator-inventory drift referee.
//
// WHY THIS EXISTS
// The release gate has three hand-maintained validator inventories that must
// agree about which shell validators run and how:
//   1. scripts/pre-tag-validate.sh   (bash local pre-tag bundle)
//   2. scripts/pre-tag-validate.ps1  (PowerShell local pre-tag bundle)
//   3. .github/workflows/validation.yml  (CI)
// They drifted before: P0-01 (pre-tag-validate.ps1 listed two retired validators
// and omitted check-skill-sample-coverage) and P0-02 (the three inventories ran
// materially different sets). PR #174 reconciled bash<->ps1 by hand, but nothing
// binds them to each other or to CI, so they can silently drift again.
//
// WHAT IT DOES
// scripts/validation-manifest.yaml is the single source of truth: it declares
// every release-gate shell validator (.sh/.ps1) once, with its local pre-tag tier
// (required|optional|advisory), its per-shell flags, and its CI level
// (enforcing|advisory). This referee parses the manifest plus the three consumers
// and FAILS if any consumer drifts from the manifest:
//   - a pre-tag bundle omits/adds a validator vs the manifest's pre_tag set
//   - a pre-tag bundle invokes a validator with different flags than declared
//   - a manifest ci: entry has no matching step in validation.yml (or vice-versa)
//   - a validator's CI enforcing-level disagrees with the manifest
// So "CI cannot add a required validator without updating the manifest", and the
// bash and PowerShell bundles cannot list different sets, by construction.
//
// SCOPE: shell validators only (scripts/*.sh + scripts/*.ps1). Node (.mjs) checks,
// the site build, and unit-test steps are CI-orchestration concerns that run once
// cross-platform (no two-shell duplication), so they are out of the manifest's
// two-shell-parity remit by design. See validation-manifest.yaml header.
//
// Pure node builtins (+ js-yaml, a declared root devDependency) so it runs on both
// OS legs. The parsers + computeParity are exported and unit-tested in
// check-validator-parity.test.mjs; the CLI shell below is intentionally untested,
// matching check-root-doc-links.mjs.

import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';

const TIERS = ['required', 'optional', 'advisory'];

// --- parsers -------------------------------------------------------------

// Capture the body between `NAME=(` and the next line that is just `)`. Anchored
// to a line start so VALIDATORS does not match inside OPTIONAL_VALIDATORS.
function bashArrayBody(text, name) {
  const re = new RegExp('(?:^|\\n)' + name + '=\\(([\\s\\S]*?)\\n\\)', 'm');
  const m = text.match(re);
  return m ? m[1] : '';
}

function bashEntries(body) {
  const entries = [];
  for (const line of body.split('\n')) {
    // Each entry is "<display>|<cmd>"; derive the id from the script path so the
    // "(advisory)" display suffix and the leading $ROOT/ are ignored.
    const m = line.match(/scripts\/([\w-]+)\.sh([^"]*)/);
    if (!m) continue;
    const id = m[1];
    const args = m[2].trim().split(/\s+/).filter(Boolean);
    entries.push({ id, args });
  }
  return entries;
}

export function parseBashBundle(text) {
  return {
    required: bashEntries(bashArrayBody(text, 'VALIDATORS')),
    optional: bashEntries(bashArrayBody(text, 'OPTIONAL_VALIDATORS')),
    advisory: bashEntries(bashArrayBody(text, 'ADVISORY_VALIDATORS')),
  };
}

// `$Validators` does not match inside `$OptionalValidators` because the `$` must
// sit immediately before the name.
function pwshArrayBody(text, name) {
  const re = new RegExp('\\$' + name + '\\s*=\\s*@\\(([\\s\\S]*?)\\n\\)', 'm');
  const m = text.match(re);
  return m ? m[1] : '';
}

function pwshEntries(body) {
  const entries = [];
  for (const line of body.split('\n')) {
    const sm = line.match(/Script\s*=\s*'([\w-]+)\.ps1'/);
    if (!sm) continue;
    const id = sm[1];
    const am = line.match(/Args\s*=\s*@\(([^)]*)\)/);
    const args = am ? (am[1].match(/'([^']*)'/g) || []).map((q) => q.slice(1, -1)) : [];
    entries.push({ id, args });
  }
  return entries;
}

export function parsePwshBundle(text) {
  return {
    required: pwshEntries(pwshArrayBody(text, 'Validators')),
    optional: pwshEntries(pwshArrayBody(text, 'OptionalValidators')),
    advisory: pwshEntries(pwshArrayBody(text, 'AdvisoryValidators')),
  };
}

// Split validation.yml into `- name:` step blocks and return ONE record per OS leg
// (a validator runs as a bash step on ubuntu and a pwsh step on windows). Each leg
// captures its shell, its args, and whether it enforces (a step carrying
// `continue-on-error: true` is advisory). Per-leg granularity is required so the
// referee catches CI drift the bundles cannot have: a flag dropped from one leg, or
// one OS leg silently made advisory while the other still enforces.
export function parseCiWorkflow(text) {
  const blocks = text.split(/\n[ \t]*- name:/).slice(1);
  const legs = [];
  for (const block of blocks) {
    const enforcing = !/continue-on-error:\s*true/.test(block);
    for (const raw of block.split('\n')) {
      const line = raw.trim();
      if (line.startsWith('#')) continue; // skip comments referencing script paths
      let m = line.match(/\bbash\s+scripts\/([\w-]+)\.sh\b(.*)$/);
      if (m) { legs.push({ id: m[1], shell: 'bash', args: tokenizeArgs(m[2]), enforcing }); continue; }
      m = line.match(/\bpwsh\s+-File\s+scripts\/([\w-]+)\.ps1\b(.*)$/);
      if (m) { legs.push({ id: m[1], shell: 'pwsh', args: tokenizeArgs(m[2]), enforcing }); }
    }
  }
  return legs;
}

function tokenizeArgs(s) {
  return s.trim().split(/\s+/).filter(Boolean);
}

// --- the verdict ---------------------------------------------------------

export function computeParity({ manifest, bash, pwsh, ci }) {
  const findings = [];
  const mById = new Map(manifest.map((e) => [e.id, e]));

  const manifestPreTag = { required: [], optional: [], advisory: [] };
  for (const e of manifest) {
    if (e.pre_tag) manifestPreTag[e.pre_tag].push(e.id);
  }

  for (const [shell, bundle, argKey] of [
    ['bash', bash, 'bash'],
    ['pwsh', pwsh, 'pwsh'],
  ]) {
    for (const tier of TIERS) {
      const bundleIds = new Set(bundle[tier].map((e) => e.id));
      const manifestIds = new Set(manifestPreTag[tier]);
      for (const id of manifestIds) {
        if (!bundleIds.has(id)) {
          findings.push(`${shell} bundle is missing ${tier} validator "${id}" declared in the manifest`);
        }
      }
      for (const id of bundleIds) {
        if (!manifestIds.has(id)) {
          findings.push(`${shell} bundle lists "${id}" in ${tier} but the manifest does not declare it pre_tag: ${tier}`);
        }
      }
      for (const entry of bundle[tier]) {
        const m = mById.get(entry.id);
        if (!m) continue;
        const expected = (m[argKey] && m[argKey].args) || [];
        if (JSON.stringify(expected) !== JSON.stringify(entry.args)) {
          findings.push(
            `${shell} bundle invokes "${entry.id}" with args [${entry.args.join(' ')}] but the manifest declares [${expected.join(' ')}] (arg drift)`
          );
        }
      }
    }
  }

  // CI: per-leg parity. Each manifest entry with a ci level must have BOTH OS legs in
  // validation.yml, and each leg's args + enforcing must match the manifest (the bash
  // leg vs manifest.bash.args, the pwsh leg vs manifest.pwsh.args). This closes the
  // gap where CI could drop a flag from one leg, or make a single OS leg advisory,
  // and still pass.
  const ciByKey = new Map(ci.map((l) => [`${l.id}:${l.shell}`, l]));
  for (const e of manifest) {
    if (!e.ci) continue;
    for (const shell of ['bash', 'pwsh']) {
      const l = ciByKey.get(`${e.id}:${shell}`);
      if (!l) {
        findings.push(`manifest declares ci: ${e.ci} for "${e.id}" but no ${shell} step exists in validation.yml`);
        continue;
      }
      const expectedArgs = (e[shell] && e[shell].args) || [];
      if (JSON.stringify(expectedArgs) !== JSON.stringify(l.args)) {
        findings.push(`validation.yml ${shell} step for "${e.id}" runs args [${l.args.join(' ')}] but the manifest declares [${expectedArgs.join(' ')}] (CI arg drift)`);
      }
      const actual = l.enforcing ? 'enforcing' : 'advisory';
      if (actual !== e.ci) {
        findings.push(`validation.yml ${shell} step for "${e.id}" is ${actual} but the manifest declares ci: ${e.ci} (CI enforcing-level drift)`);
      }
    }
  }
  for (const l of ci) {
    const m = mById.get(l.id);
    if (!m || !m.ci) {
      findings.push(`validation.yml runs the ${l.shell} shell validator "${l.id}" but it is not declared (with a ci: level) in the manifest`);
    }
  }

  return findings;
}

// --- CLI shell (untested; reads the live files) --------------------------

function main() {
  // Lazy-require js-yaml so importing the pure functions in tests never needs it.
  return import('js-yaml').then((yamlMod) => {
    const yaml = yamlMod.default;
    const root = path.resolve(url.fileURLToPath(new URL('.', import.meta.url)), '..');
    const read = (rel) => fs.readFileSync(path.join(root, rel), 'utf8');

    const manifest = yaml.load(read('scripts/validation-manifest.yaml'));
    const bash = parseBashBundle(read('scripts/pre-tag-validate.sh'));
    const pwsh = parsePwshBundle(read('scripts/pre-tag-validate.ps1'));
    const ci = parseCiWorkflow(read('.github/workflows/validation.yml'));

    const findings = computeParity({ manifest, bash, pwsh, ci });

    if (findings.length === 0) {
      console.log('PASS: validator inventories (bash, pwsh, CI) match scripts/validation-manifest.yaml');
      process.exit(0);
    }
    console.error(`FAIL: ${findings.length} validator-inventory drift(s) vs scripts/validation-manifest.yaml:\n`);
    for (const f of findings) console.error(`  - ${f}`);
    console.error('\nFix: update scripts/validation-manifest.yaml and the drifted inventory so they agree.');
    process.exit(1);
  });
}

// Run only when invoked directly, not when imported by the test.
if (process.argv[1] && url.pathToFileURL(process.argv[1]).href === import.meta.url) {
  main();
}
