// scripts/shell-parity-smoke.mjs - the WS-T9 dual-shell behavioral-equivalence smoke.
//
// WHY THIS EXISTS
// check-count-consistency ships as a bash script AND a PowerShell script (one of the
// frozen dual-shell pairs, see the freeze note in validation-manifest.yaml). The parity
// referee (check-validator-parity.mjs) proves the two shells run the same INVENTORY, but
// nothing proves they compute the same VERDICT. This smoke closes that gap: it runs BOTH
// shells against a committed fixture mini-repo with deliberately stale counts and asserts
// each shell's normalized verdict matches a committed golden (scripts/fixtures/shell-parity/
// expected-verdict.txt). Because both shells compare to the SAME golden, a divergence
// between them fails at least one leg - no cross-job artifact passing needed. On the ubuntu
// leg (where both bash and pwsh are present) this is a direct cross-shell diff; on windows
// it is pwsh-vs-golden. Advisory in validation.yml (M-30 ladder) until the v2.31.0 Node
// ports (WS-Z4) shrink the dual-shell surface enough that any divergence is always a bug.
//
// This harness is itself single-source Node (honoring the WS-T9 freeze: no new .sh/.ps1
// validator pair). It shells out to whatever count-consistency implementations are present.
//
// Usage:
//   node scripts/shell-parity-smoke.mjs            # compare each available shell to the golden
//   node scripts/shell-parity-smoke.mjs --update   # regenerate the golden (all shells must agree first)
import { spawnSync } from 'node:child_process';
import { mkdirSync, copyFileSync, rmSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const SCRIPTS = dirname(fileURLToPath(import.meta.url));
const REPO = join(SCRIPTS, '..');
const FIXTURE_DIR = join(SCRIPTS, 'fixtures', 'shell-parity');
const FIXTURE_REPO = join(FIXTURE_DIR, 'repo');
const GOLDEN = join(FIXTURE_DIR, 'expected-verdict.txt');
const COPY_DIR = join(FIXTURE_REPO, 'scripts'); // runtime-only; gitignored

// The two shells and how to (a) probe for availability and (b) run the fixture.
const SHELLS = [
  {
    name: 'bash',
    source: join(REPO, 'scripts', 'check-count-consistency.sh'),
    copyName: 'check-count-consistency.sh',
    probe: ['bash', ['--version']],
    run: (copyPath) => ['bash', [copyPath]],
  },
  {
    name: 'pwsh',
    source: join(REPO, 'scripts', 'check-count-consistency.ps1'),
    copyName: 'check-count-consistency.ps1',
    probe: ['pwsh', ['-NoProfile', '-Command', '$PSVersionTable.PSVersion.ToString()']],
    run: (copyPath) => ['pwsh', ['-NoProfile', '-File', copyPath]],
  },
];

/** Reduce a check-count-consistency run to a stable, order- AND serialization-
 *  independent verdict: the sorted SET of findings plus the exit code. Each finding
 *  is "<file>:<line>: found <desc> (actual: <n>)". The two shells serialize multiple
 *  findings differently - pwsh one per line, bash concatenated on a single line
 *  (command-substitution strips the inter-group newline) - so we extract findings by
 *  a global regex rather than by whole lines. CR is stripped for CRLF/LF parity.
 *  This compares COUNT LOGIC, not cosmetic formatting; a real divergence is a
 *  different finding SET, which this still catches. Pure. */
export function normalizeVerdict(stdout, exitCode) {
  const text = (stdout || '').replace(/\r/g, '');
  const re = /(\S+):(\d+): found (.+?) \(actual: (-?\d+)\)/g;
  const findings = [];
  let m;
  while ((m = re.exec(text)) !== null) {
    findings.push(`${m[1]}:${m[2]}: found ${m[3]} (actual: ${m[4]})`);
  }
  findings.sort();
  return [...findings, `EXIT ${exitCode}`].join('\n') + '\n';
}

function shellAvailable(probe) {
  const [cmd, args] = probe;
  const r = spawnSync(cmd, args, { encoding: 'utf8' });
  return !r.error && r.status === 0;
}

/** Copy a shell's real check-count-consistency into the fixture mini-repo (so it
 *  resolves ROOT to the fixture, not the real repo), run it, and normalize. */
function runShellAgainstFixture(shell) {
  mkdirSync(COPY_DIR, { recursive: true });
  const copyPath = join(COPY_DIR, shell.copyName);
  copyFileSync(shell.source, copyPath);
  const [cmd, args] = shell.run(copyPath);
  const r = spawnSync(cmd, args, { encoding: 'utf8' });
  if (r.error) throw new Error(`${shell.name}: failed to run (${r.error.message})`);
  // exit code null (killed) is a real problem; treat as -1 so it never matches a golden.
  return { raw: r.stdout || '', verdict: normalizeVerdict(r.stdout, r.status == null ? -1 : r.status) };
}

function cleanup() {
  rmSync(COPY_DIR, { recursive: true, force: true });
}

function main() {
  const update = process.argv.includes('--update');
  cleanup(); // clear any copies left by a prior crashed run

  const available = SHELLS.filter((s) => shellAvailable(s.probe));
  const skipped = SHELLS.filter((s) => !available.includes(s)).map((s) => s.name);
  if (skipped.length) console.log(`[NOTICE] shell(s) not available on this leg, skipped: ${skipped.join(', ')}`);
  if (!available.length) {
    console.log('[NOTICE] no supported shell found (neither bash nor pwsh); nothing to smoke. Skipping.');
    return 0;
  }

  const results = [];
  try {
    for (const shell of available) {
      const { verdict } = runShellAgainstFixture(shell);
      results.push({ name: shell.name, verdict });
      console.log(`--- ${shell.name} verdict ---\n${verdict}`);
    }
  } finally {
    cleanup();
  }

  // --update: require every available shell to AGREE, then write the golden. Refuse to
  // bake a golden that would mask a real divergence.
  if (update) {
    const distinct = [...new Set(results.map((r) => r.verdict))];
    if (distinct.length > 1) {
      console.error('REFUSING --update: the available shells disagree, so there is no single golden to write:');
      for (const r of results) console.error(`\n[${r.name}]\n${r.verdict}`);
      return 1;
    }
    writeFileSync(GOLDEN, distinct[0]);
    console.log(`Wrote golden from ${results.map((r) => r.name).join(' + ')} agreement: ${GOLDEN}`);
    return 0;
  }

  if (!existsSync(GOLDEN)) {
    console.error(`FAIL: golden verdict missing (${GOLDEN}). Run: node scripts/shell-parity-smoke.mjs --update`);
    return 1;
  }
  const golden = readFileSync(GOLDEN, 'utf8').replace(/\r\n/g, '\n');
  let mismatches = 0;
  for (const r of results) {
    if (r.verdict === golden) {
      console.log(`PASS: ${r.name} matches the committed golden.`);
    } else {
      mismatches++;
      console.error(`FAIL: ${r.name} diverges from the committed golden.`);
      console.error(`--- golden ---\n${golden}--- ${r.name} ---\n${r.verdict}`);
    }
  }
  if (mismatches) {
    console.error(`\nFAIL: ${mismatches} shell(s) diverged from the golden. The bash and PowerShell count-consistency implementations are not behaviorally equivalent on the fixture (WS-T9). If this is an intended count-logic change, run --update after fixing BOTH shells.`);
    return 1;
  }
  console.log(`\nPASS: ${results.length} shell(s) produce the identical count-consistency verdict on the fixture.`);
  return 0;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exit(main());
}
