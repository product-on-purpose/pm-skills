// scripts/check-output-eval-assets.mjs - B-7 (output-eval asset gate, M-33).
//
// Closes the regression-protection hole the codex adversarial review flagged (2026-06-14, finding 4):
// "regression-trigger the rest" only protects a skill if its output-eval assets are well-formed and
// wired when its body changes. This is the deterministic ASSET-PRESENCE half (the output-eval analog of
// B-4 for trigger fixtures). For every skill that carries an `evals/output-scenarios/` directory, each
// scenario must have valid frontmatter (scenario / skill / family), name its own skill, map its family
// to an existing family rubric, and carry a non-trivial brief. Advisory in CI (M-30 enforcement ladder)
// until the output-eval roster is pinned, then enforcing like B-4.
//
// The body-change reminder half (flagging a PR that edits a roster skill's instructions/template without
// a recorded output-eval re-run) needs PR-diff context and is deferred, like B-5 for trigger evals.
//
// CI-only Node check (out of the shell-validator parity remit). Pure functions are exported and
// unit-tested; main() walks skills/<name>/evals/output-scenarios/.
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';

const REQUIRED_KEYS = ['scenario', 'skill', 'family'];

/** Parse a flat (key: value) frontmatter block. Pure. Returns null when absent/malformed. */
export function parseFrontmatter(md) {
  const m = md.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!m) return null;
  const fm = {};
  for (const line of m[1].split(/\r?\n/)) {
    const mm = line.match(/^([A-Za-z_][A-Za-z0-9_]*):\s*(.*)$/);
    if (mm) fm[mm[1]] = mm[2].trim();
  }
  return fm;
}

/** The brief body (everything after the frontmatter block). Pure. */
export function scenarioBody(md) {
  return md.replace(/^---\r?\n[\s\S]*?\r?\n---/, '').trim();
}

/**
 * Findings for one scenario file. Pure (filesystem facts injected).
 * @param rel display path
 * @param md file contents
 * @param ctx { skillDir, rubricExists(family)->bool }
 */
export function scenarioFindings(rel, md, ctx) {
  const findings = [];
  const fm = parseFrontmatter(md);
  if (!fm) return [`${rel}: missing or malformed frontmatter`];
  for (const k of REQUIRED_KEYS) if (!fm[k]) findings.push(`${rel}: frontmatter missing '${k}'`);
  if (fm.skill && fm.skill !== ctx.skillDir) {
    findings.push(`${rel}: frontmatter skill '${fm.skill}' does not match its directory '${ctx.skillDir}'`);
  }
  if (fm.family && !ctx.rubricExists(fm.family)) {
    findings.push(`${rel}: family '${fm.family}' has no rubric at docs/internal/eval-rubrics/${fm.family}.md`);
  }
  if (scenarioBody(md).length < 100) findings.push(`${rel}: scenario brief is too thin (< 100 chars of body)`);
  return findings;
}

function main() {
  const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
  const skillsRoot = join(repo, 'skills');
  const rubricExists = (family) => existsSync(join(repo, 'docs/internal/eval-rubrics', `${family}.md`));

  let total = 0;
  let scenarioCount = 0;
  const skillsCovered = new Set();
  for (const skillDir of readdirSync(skillsRoot)) {
    const scenDir = join(skillsRoot, skillDir, 'evals', 'output-scenarios');
    if (!existsSync(scenDir) || !statSync(scenDir).isDirectory()) continue;
    for (const f of readdirSync(scenDir)) {
      if (!f.endsWith('.md')) continue;
      scenarioCount += 1;
      skillsCovered.add(skillDir);
      const rel = `skills/${skillDir}/evals/output-scenarios/${f}`;
      const findings = scenarioFindings(rel, readFileSync(join(scenDir, f), 'utf8'), { skillDir, rubricExists });
      for (const x of findings) { console.log(`ASSET  ${x}`); total += 1; }
    }
  }
  console.log(
    total
      ? `\n${total} output-eval asset finding(s) across ${scenarioCount} scenario(s) in ${skillsCovered.size} skill(s).`
      : `no output-eval asset findings (${scenarioCount} scenarios across ${skillsCovered.size} skills checked).`,
  );
  process.exit(total ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
