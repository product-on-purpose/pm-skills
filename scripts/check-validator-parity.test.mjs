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

const CI_FIXTURE = `
      - name: Lint skills front matter (bash)
        if: matrix.os == 'ubuntu-latest'
        run: bash scripts/lint-skills-frontmatter.sh
      - name: Validate docs frontmatter (bash, enforcing)
        run: bash scripts/validate-docs-frontmatter.sh --strict
      - name: Check CONTEXT.md currency (bash)
        run: bash scripts/check-context-currency.sh
        continue-on-error: true
      - name: Check version references (bash)
        run: bash scripts/check-version-references.sh
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

// --- parseBashBundle ---

test('parseBashBundle extracts ids per tier from the script path', () => {
  const b = parseBashBundle(BASH_FIXTURE);
  assert.deepEqual(b.required.map((e) => e.id), ['lint-skills-frontmatter', 'validate-docs-frontmatter']);
  assert.deepEqual(b.optional.map((e) => e.id), ['check-context-currency']);
  assert.deepEqual(b.advisory.map((e) => e.id), ['check-version-references']);
});

test('parseBashBundle captures trailing flags as args', () => {
  const b = parseBashBundle(BASH_FIXTURE);
  const strict = b.required.find((e) => e.id === 'validate-docs-frontmatter');
  assert.deepEqual(strict.args, ['--strict']);
  const plain = b.required.find((e) => e.id === 'lint-skills-frontmatter');
  assert.deepEqual(plain.args, []);
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
  const strict = p.required.find((e) => e.id === 'validate-docs-frontmatter');
  assert.deepEqual(strict.args, ['-Strict']);
});

// --- parseCiWorkflow ---

test('parseCiWorkflow lists shell validators and ignores node steps', () => {
  const ci = parseCiWorkflow(CI_FIXTURE);
  const ids = ci.map((e) => e.id).sort();
  assert.deepEqual(ids, [
    'check-context-currency',
    'check-version-references',
    'lint-skills-frontmatter',
    'validate-docs-frontmatter',
  ]);
});

test('parseCiWorkflow marks continue-on-error steps as advisory', () => {
  const ci = parseCiWorkflow(CI_FIXTURE);
  assert.equal(ci.find((e) => e.id === 'check-context-currency').enforcing, false);
  assert.equal(ci.find((e) => e.id === 'lint-skills-frontmatter').enforcing, true);
});

// --- computeParity: the referee verdict ---

test('computeParity returns no findings when all three inventories match the manifest', () => {
  const findings = computeParity({
    manifest: MANIFEST_FIXTURE,
    bash: parseBashBundle(BASH_FIXTURE),
    pwsh: parsePwshBundle(PWSH_FIXTURE),
    ci: parseCiWorkflow(CI_FIXTURE),
  });
  assert.deepEqual(findings, []);
});

test('computeParity flags a manifest required validator missing from the bash bundle', () => {
  const bash = parseBashBundle(BASH_FIXTURE);
  bash.required = bash.required.filter((e) => e.id !== 'validate-docs-frontmatter');
  const findings = computeParity({
    manifest: MANIFEST_FIXTURE,
    bash,
    pwsh: parsePwshBundle(PWSH_FIXTURE),
    ci: parseCiWorkflow(CI_FIXTURE),
  });
  assert.ok(findings.some((f) => /validate-docs-frontmatter/.test(f) && /bash/.test(f)));
});

test('computeParity flags a CI shell validator absent from the manifest', () => {
  const ci = parseCiWorkflow(CI_FIXTURE);
  ci.push({ id: 'rogue-validator', enforcing: true });
  const findings = computeParity({
    manifest: MANIFEST_FIXTURE,
    bash: parseBashBundle(BASH_FIXTURE),
    pwsh: parsePwshBundle(PWSH_FIXTURE),
    ci,
  });
  assert.ok(findings.some((f) => /rogue-validator/.test(f) && /manifest/i.test(f)));
});

test('computeParity flags a flag/arg drift between a bundle and the manifest', () => {
  const bash = parseBashBundle(BASH_FIXTURE);
  bash.required.find((e) => e.id === 'validate-docs-frontmatter').args = []; // dropped --strict
  const findings = computeParity({
    manifest: MANIFEST_FIXTURE,
    bash,
    pwsh: parsePwshBundle(PWSH_FIXTURE),
    ci: parseCiWorkflow(CI_FIXTURE),
  });
  assert.ok(findings.some((f) => /validate-docs-frontmatter/.test(f) && /arg/i.test(f)));
});

test('computeParity flags a CI enforcing-level mismatch against the manifest', () => {
  const ci = parseCiWorkflow(CI_FIXTURE);
  ci.find((e) => e.id === 'check-context-currency').enforcing = true; // manifest says advisory
  const findings = computeParity({
    manifest: MANIFEST_FIXTURE,
    bash: parseBashBundle(BASH_FIXTURE),
    pwsh: parsePwshBundle(PWSH_FIXTURE),
    ci,
  });
  assert.ok(findings.some((f) => /check-context-currency/.test(f) && /enforc/i.test(f)));
});
