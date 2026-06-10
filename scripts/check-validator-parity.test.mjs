// Unit tests for check-validator-parity.mjs - the validator-inventory drift referee.
//
// These tests exercise the pure functions only (parsers + computeParity); the CLI
// shell (file reads, process.exit) is intentionally untested, matching the repo's
// convention (see check-root-doc-links.test.mjs). Fixtures are minimal inline
// strings shaped like the real pre-tag-validate.{sh,ps1} arrays and validation.yml
// steps, so a parser regression is caught without depending on the live files.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  parseBashBundle,
  parsePwshBundle,
  parseCiWorkflow,
  computeParity,
} from './check-validator-parity.mjs';

// --- fixtures: tiny stand-ins for the three real inventories ---

const BASH_FIXTURE = `
VALIDATORS=(
  "lint-skills-frontmatter|bash $ROOT/scripts/lint-skills-frontmatter.sh"
  "validate-docs-frontmatter --strict|bash $ROOT/scripts/validate-docs-frontmatter.sh --strict"
)
OPTIONAL_VALIDATORS=(
  "check-context-currency|bash $ROOT/scripts/check-context-currency.sh"
)
ADVISORY_VALIDATORS=(
  "check-version-references (advisory)|bash $ROOT/scripts/check-version-references.sh"
)
`;

const PWSH_FIXTURE = `
$Validators = @(
  @{ Name = 'lint-skills-frontmatter';          Script = 'lint-skills-frontmatter.ps1';  Args = @() }
  @{ Name = 'validate-docs-frontmatter -Strict'; Script = 'validate-docs-frontmatter.ps1'; Args = @('-Strict') }
)
$OptionalValidators = @(
  @{ Name = 'check-context-currency';           Script = 'check-context-currency.ps1';   Args = @() }
)
$AdvisoryValidators = @(
  @{ Name = 'check-version-references (advisory)'; Script = 'check-version-references.ps1'; Args = @() }
)
`;

// Each shell validator runs as a per-OS leg (bash on ubuntu, pwsh on windows),
// matching the real validation.yml matrix shape. The referee must compare each leg
// independently (args + enforcing), so the fixture carries both legs.
const CI_FIXTURE = `
      - name: Lint skills front matter (bash)
        if: matrix.os == 'ubuntu-latest'
        run: bash scripts/lint-skills-frontmatter.sh
      - name: Lint skills front matter (pwsh)
        if: matrix.os == 'windows-latest'
        run: pwsh -File scripts/lint-skills-frontmatter.ps1
      - name: Validate docs frontmatter (bash, enforcing)
        if: matrix.os == 'ubuntu-latest'
        run: bash scripts/validate-docs-frontmatter.sh --strict
      - name: Validate docs frontmatter (pwsh, enforcing)
        if: matrix.os == 'windows-latest'
        run: pwsh -File scripts/validate-docs-frontmatter.ps1 -Strict
      - name: Check CONTEXT.md currency (bash)
        if: matrix.os == 'ubuntu-latest'
        run: bash scripts/check-context-currency.sh
        continue-on-error: true
      - name: Check CONTEXT.md currency (pwsh)
        if: matrix.os == 'windows-latest'
        run: pwsh -File scripts/check-context-currency.ps1
        continue-on-error: true
      - name: Check version references (bash)
        if: matrix.os == 'ubuntu-latest'
        run: bash scripts/check-version-references.sh
        continue-on-error: true
      - name: Check version references (pwsh)
        if: matrix.os == 'windows-latest'
        run: pwsh -File scripts/check-version-references.ps1
        continue-on-error: true
      - name: Generate site content
        run: node scripts/gen-site.mjs
`;

// A manifest object as js-yaml would parse it.
const MANIFEST_FIXTURE = [
  { id: 'lint-skills-frontmatter', bash: { args: [] }, pwsh: { args: [] }, pre_tag: 'required', ci: 'enforcing' },
  { id: 'validate-docs-frontmatter', bash: { args: ['--strict'] }, pwsh: { args: ['-Strict'] }, pre_tag: 'required', ci: 'enforcing' },
  { id: 'check-context-currency', bash: { args: [] }, pwsh: { args: [] }, pre_tag: 'optional', ci: 'advisory' },
  { id: 'check-version-references', bash: { args: [] }, pwsh: { args: [] }, pre_tag: 'advisory', ci: 'advisory' },
];

const leg = (ci, id, shell) => ci.find((l) => l.id === id && l.shell === shell);

// --- parseBashBundle ---

test('parseBashBundle extracts ids per tier from the script path', () => {
  const b = parseBashBundle(BASH_FIXTURE);
  assert.deepEqual(b.required.map((e) => e.id), ['lint-skills-frontmatter', 'validate-docs-frontmatter']);
  assert.deepEqual(b.optional.map((e) => e.id), ['check-context-currency']);
  assert.deepEqual(b.advisory.map((e) => e.id), ['check-version-references']);
});

test('parseBashBundle captures trailing flags as args', () => {
  const b = parseBashBundle(BASH_FIXTURE);
  assert.deepEqual(b.required.find((e) => e.id === 'validate-docs-frontmatter').args, ['--strict']);
  assert.deepEqual(b.required.find((e) => e.id === 'lint-skills-frontmatter').args, []);
});

// --- parsePwshBundle ---

test('parsePwshBundle extracts ids per tier from the Script field', () => {
  const p = parsePwshBundle(PWSH_FIXTURE);
  assert.deepEqual(p.required.map((e) => e.id), ['lint-skills-frontmatter', 'validate-docs-frontmatter']);
  assert.deepEqual(p.optional.map((e) => e.id), ['check-context-currency']);
  assert.deepEqual(p.advisory.map((e) => e.id), ['check-version-references']);
});

test('parsePwshBundle captures the PowerShell Args array', () => {
  const p = parsePwshBundle(PWSH_FIXTURE);
  assert.deepEqual(p.required.find((e) => e.id === 'validate-docs-frontmatter').args, ['-Strict']);
});

// --- parseCiWorkflow (per-leg) ---

test('parseCiWorkflow returns one record per OS leg and ignores node steps', () => {
  const ci = parseCiWorkflow(CI_FIXTURE);
  assert.equal(ci.length, 8); // 4 validators x 2 legs; the node step is ignored
  assert.deepEqual(
    [...new Set(ci.map((l) => l.id))].sort(),
    ['check-context-currency', 'check-version-references', 'lint-skills-frontmatter', 'validate-docs-frontmatter']
  );
});

test('parseCiWorkflow captures per-leg args (bash --strict vs pwsh -Strict)', () => {
  const ci = parseCiWorkflow(CI_FIXTURE);
  assert.deepEqual(leg(ci, 'validate-docs-frontmatter', 'bash').args, ['--strict']);
  assert.deepEqual(leg(ci, 'validate-docs-frontmatter', 'pwsh').args, ['-Strict']);
});

test('parseCiWorkflow marks continue-on-error legs as advisory, per leg', () => {
  const ci = parseCiWorkflow(CI_FIXTURE);
  assert.equal(leg(ci, 'check-context-currency', 'bash').enforcing, false);
  assert.equal(leg(ci, 'lint-skills-frontmatter', 'pwsh').enforcing, true);
});

// --- computeParity: the referee verdict ---

const parityArgs = (overrides = {}) => ({
  manifest: MANIFEST_FIXTURE,
  bash: parseBashBundle(BASH_FIXTURE),
  pwsh: parsePwshBundle(PWSH_FIXTURE),
  ci: parseCiWorkflow(CI_FIXTURE),
  ...overrides,
});

test('computeParity returns no findings when all three inventories match the manifest', () => {
  assert.deepEqual(computeParity(parityArgs()), []);
});

test('computeParity flags a manifest required validator missing from the bash bundle', () => {
  const bash = parseBashBundle(BASH_FIXTURE);
  bash.required = bash.required.filter((e) => e.id !== 'validate-docs-frontmatter');
  const findings = computeParity(parityArgs({ bash }));
  assert.ok(findings.some((f) => /validate-docs-frontmatter/.test(f) && /bash/.test(f)));
});

test('computeParity flags a CI shell validator absent from the manifest', () => {
  const ci = parseCiWorkflow(CI_FIXTURE);
  ci.push({ id: 'rogue-validator', shell: 'bash', args: [], enforcing: true });
  const findings = computeParity(parityArgs({ ci }));
  assert.ok(findings.some((f) => /rogue-validator/.test(f) && /manifest/i.test(f)));
});

test('computeParity flags a flag/arg drift between a bundle and the manifest', () => {
  const bash = parseBashBundle(BASH_FIXTURE);
  bash.required.find((e) => e.id === 'validate-docs-frontmatter').args = []; // dropped --strict locally
  const findings = computeParity(parityArgs({ bash }));
  assert.ok(findings.some((f) => /validate-docs-frontmatter/.test(f) && /arg/i.test(f)));
});

// --- P1 regression: CI per-leg coverage (args + per-OS enforcement) ---

test('computeParity flags CI arg drift when a flag is dropped from one CI leg', () => {
  const ci = parseCiWorkflow(CI_FIXTURE);
  leg(ci, 'validate-docs-frontmatter', 'bash').args = []; // CI silently dropped --strict
  const findings = computeParity(parityArgs({ ci }));
  assert.ok(findings.some((f) => /validate-docs-frontmatter/.test(f) && /bash/.test(f) && /CI arg drift/.test(f)));
});

test('computeParity flags per-OS CI enforcement asymmetry (one leg made advisory)', () => {
  const ci = parseCiWorkflow(CI_FIXTURE);
  leg(ci, 'validate-docs-frontmatter', 'pwsh').enforcing = false; // windows leg -> continue-on-error
  const findings = computeParity(parityArgs({ ci }));
  assert.ok(findings.some((f) => /validate-docs-frontmatter/.test(f) && /pwsh/.test(f) && /enforc/i.test(f)));
});

test('computeParity flags a manifest CI validator whose OS leg is missing entirely', () => {
  const ci = parseCiWorkflow(CI_FIXTURE).filter((l) => !(l.id === 'validate-docs-frontmatter' && l.shell === 'pwsh'));
  const findings = computeParity(parityArgs({ ci }));
  assert.ok(findings.some((f) => /validate-docs-frontmatter/.test(f) && /pwsh/.test(f)));
});

test('computeParity flags a CI leg whose enforcing level disagrees with the manifest', () => {
  const ci = parseCiWorkflow(CI_FIXTURE);
  leg(ci, 'check-context-currency', 'bash').enforcing = true; // manifest says advisory
  const findings = computeParity(parityArgs({ ci }));
  assert.ok(findings.some((f) => /check-context-currency/.test(f) && /bash/.test(f) && /enforc/i.test(f)));
});
