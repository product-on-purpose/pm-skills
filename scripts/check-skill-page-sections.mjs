// scripts/check-skill-page-sections.mjs - v2.29.1: completeness guard for generated skill pages.
//
// The docs-site generator (scripts/gen-site.mjs) builds each skill page from its SKILL.md. It used
// to render only a FIXED allow-list of H2 section names and silently drop the rest - which shipped
// ~27 hollow pages (their method content gone) before v2.29.1, including foundation-build-risk-review.
// gen-site now renders every section verbatim (the renderSkillPage catch-all). This gate keeps it
// that way: it renders each skill page and FAILS if any SKILL.md H2 section is missing from it.
//
// Output-based by design: it imports the real renderSkillPage and inspects its output, so it cannot
// drift from the generator the way a hardcoded section list would.
import { readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { renderSkillPage } from './gen-site.mjs';

const repo = join(dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS = join(repo, 'skills');

/** Lowercased H2 heading names present in rendered page markdown. Pure. */
export function renderedHeadings(markdown) {
  return new Set(
    (markdown.match(/^##\s+(.+)$/gm) || []).map((h) => h.replace(/^##\s+/, '').trim().toLowerCase()),
  );
}

/** SKILL.md section names that are absent from the rendered page (case-insensitive). Pure. */
export function missingSections(sourceSections, markdown) {
  const headings = renderedHeadings(markdown);
  return sourceSections.filter((s) => !headings.has(s.toLowerCase()));
}

function main() {
  const findings = [];
  for (const dir of readdirSync(SKILLS)) {
    const rendered = renderSkillPage(dir);
    if (!rendered) continue;
    for (const s of missingSections(rendered.sourceSections, rendered.markdown)) {
      findings.push(`${dir}: SKILL.md section "## ${s}" is MISSING from the generated page`);
    }
  }
  if (findings.length) {
    for (const f of findings) console.log(`SKILL-PAGE  ${f}`);
    console.log(
      `\n${findings.length} dropped-section finding(s). Every SKILL.md H2 section must render on its ` +
        `page; the renderSkillPage catch-all in scripts/gen-site.mjs guarantees this - if this fails, ` +
        `that catch-all was narrowed or bypassed.`,
    );
    process.exit(1);
  }
  console.log('skill-page completeness OK (every SKILL.md section renders on its generated page).');
  process.exit(0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main();
