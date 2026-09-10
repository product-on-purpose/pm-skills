// scripts/check-delivery-pin.mjs - C1 (docs/internal/doc-currency-program.md): does the
// marketplace users actually install from serve the tag we just pushed?
//
// The defect it catches: on 2026-09-01 v2.33.0 was tagged, released, CI-green and
// validator-green while reaching NOBODY for roughly eight hours. pm-skills ships through
// TWO repositories. Users install from the `product-on-purpose` marketplace, which lives
// in the `agent-plugins` repo, and that registry pins members by commit SHA independently
// of anything here. It still pinned the v2.32.0 commit, so `claude plugin update` returned
// 2.32.0 on every machine. A stale SHA pin resolves perfectly to real, working, older
// code, so nothing errors and no existing check has an opinion. It was found by a
// maintainer noticing an update not moving on another machine.
//
// WHERE THIS RUNS, and why not anywhere else:
//   - NOT in the pre-tag bundle (pre-tag-validate.sh/.ps1). The tag does not exist yet at
//     that point, so the question is unanswerable rather than merely unanswered.
//   - NOT in .github/workflows/validation.yml. That workflow triggers on push to main and
//     on pull_request, where there is no new tag to ask about; and immediately after a
//     real tag it would fail for hours by design, since the re-pin is a separate
//     cross-repo PR in another repository.
//   - YES as a re-runnable G4 sub-check, invoked by the maintainer or the release
//     conductor after the tag is pushed, and RE-INVOKED until it passes.
//
// It is deliberately NOT a same-sitting blocking gate. The real v2.33.0 tag-to-repin gap
// was about eight hours (tag 2026-09-01T16:42 local, agent-plugins PR #96 merged
// 2026-09-02T00:56Z). A gate that must go green inside one G4 walkthrough would be routed
// around on its first use, and a gate that is routinely bypassed is worse than none. The
// honest shape is a cheap, idempotent question you can ask repeatedly: "is it delivered
// yet?" G4 stays open until the answer is yes.
//
// This is the first network-calling script in scripts/. That is contained here rather
// than spread into the bundle or CI, and it counts as a G4 sub-check alongside the other
// post-tag verifications, NOT toward the enforcing-validator ceiling in
// doc-currency-program.md (the G4 sub-checks have never been counted in that figure).
//
// Usage: node scripts/check-delivery-pin.mjs [--version X.Y.Z] [--sha <40-hex>] [--json]
//   exit 0  delivered: registry version AND source.sha both match the tag
//   exit 1  NOT delivered: registry disagrees with the tag (the v2.33.0 failure)
//   exit 2  unverifiable: fetch failed, entry absent, or the local tag is missing.
//           NEVER prints the success line on exit 2. An unanswered delivery question
//           blocks "Release complete" exactly as a failed one does; the whole point of
//           this check is that silence was previously read as success.
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const repo = join(dirname(fileURLToPath(import.meta.url)), '..');

// Primary is the raw file, matching the mechanism this check was specified with in
// docs/internal/release-plans/v2.34.0/plan_v2.34.0.md section C2 ("one unauthenticated
// fetch of a public raw file"). The contents API is the fallback: it is unaffected by
// raw-CDN caching, which can lag a few minutes behind a just-merged re-pin.
export const REGISTRY_RAW = 'https://raw.githubusercontent.com/product-on-purpose/agent-plugins/main/.claude-plugin/marketplace.json';
export const REGISTRY_API = 'https://api.github.com/repos/product-on-purpose/agent-plugins/contents/.claude-plugin/marketplace.json';

/**
 * The delivery verdict for one registry entry against one expected tag. Pure, so the
 * fixture can prove every branch without a network or a repo. Both fields are compared:
 * version alone would pass a registry that moved the label but not the pin.
 */
export function compareDelivery({ entry, expectedVersion, expectedSha }) {
  if (!entry) {
    return { status: 'unverified', findings: ['pm-skills entry not found in the registry plugins[] array'] };
  }
  const findings = [];
  if (entry.version !== expectedVersion) {
    findings.push(`registry serves version ${entry.version}, tag is v${expectedVersion}`);
  }
  const sha = (entry.source && entry.source.sha) || '';
  if (sha.toLowerCase() !== String(expectedSha).toLowerCase()) {
    findings.push(`registry pins ${sha || '(no sha)'}, tag is ${expectedSha}`);
  }
  return { status: findings.length ? 'mismatch' : 'match', findings };
}

/** Find the pm-skills entry in a parsed marketplace.json. Pure, tolerant of shape drift. */
export function findEntry(registry) {
  return (registry && Array.isArray(registry.plugins) ? registry.plugins : []).find((p) => p && p.name === 'pm-skills') || null;
}

/**
 * What the registry SHOULD be serving: the version in plugin.json and the commit the
 * matching tag dereferences to. `run` and `readPlugin` are injected for the fixture.
 */
export function resolveExpected({ version, sha } = {}, run, readPlugin) {
  const _run = run || ((args) => execFileSync('git', args, { cwd: repo, encoding: 'utf8' }).trim());
  const _readPlugin = readPlugin || (() => JSON.parse(readFileSync(join(repo, '.claude-plugin/plugin.json'), 'utf8')));
  const v = version || _readPlugin().version;
  if (sha) return { version: v, sha };
  try {
    // ^{commit} dereferences an annotated tag to the commit it points at.
    return { version: v, sha: _run(['rev-parse', `refs/tags/v${v}^{commit}`]) };
  } catch {
    return { version: v, sha: null, error: `no local tag v${v}. C1 runs after G3 pushes the tag; run "git fetch --tags" if the tag is on origin only` };
  }
}

async function fetchRegistry(fetchImpl = fetch) {
  const attempts = [
    { url: REGISTRY_RAW, headers: { 'User-Agent': 'pm-skills-check-delivery-pin' } },
    { url: REGISTRY_API, headers: { Accept: 'application/vnd.github.raw+json', 'User-Agent': 'pm-skills-check-delivery-pin' } },
  ];
  let last;
  for (const a of attempts) {
    try {
      const res = await fetchImpl(a.url, { headers: a.headers, signal: AbortSignal.timeout(15000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return JSON.parse(await res.text());
    } catch (e) { last = e; }
  }
  throw last;
}

async function main() {
  const argv = process.argv.slice(2);
  const opt = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--version') opt.version = argv[++i];
    else if (argv[i] === '--sha') opt.sha = argv[++i];
    else if (argv[i] === '--json') opt.json = true;
  }
  const say = (m) => console.log(`DELIVERY  ${m}`);

  const expected = resolveExpected(opt);
  if (expected.error) {
    say(expected.error);
    say('unverified. Not asserting delivery.');
    process.exit(2);
  }

  let registry;
  try {
    registry = await fetchRegistry();
  } catch (e) {
    say(`could not read the agent-plugins registry (${e.message})`);
    say('unverified. Not asserting delivery: treat this as NOT delivered until it reads clean.');
    process.exit(2);
  }

  const { status, findings } = compareDelivery({
    entry: findEntry(registry), expectedVersion: expected.version, expectedSha: expected.sha,
  });
  if (opt.json) console.log(JSON.stringify({ status, findings, expected }, null, 2));

  if (status === 'unverified') {
    for (const f of findings) say(f);
    say('unverified. Not asserting delivery.');
    process.exit(2);
  }
  if (status === 'mismatch') {
    for (const f of findings) say(f);
    say(`v${expected.version} is TAGGED but NOT DELIVERED. Users still receive the pinned commit.`);
    say('Fix: re-pin pm-skills in the agent-plugins marketplace, then re-run this check.');
    say('A re-pin merged in the last few minutes can lag the raw CDN; re-run before treating it as real.');
    process.exit(1);
  }
  say(`delivered. Registry serves v${expected.version} at ${expected.sha}.`);
  process.exit(0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
