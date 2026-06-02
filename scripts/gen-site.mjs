#!/usr/bin/env node
// gen-site.mjs - generate the Astro Starlight site content from the repo source of truth.
//
// Replaces the three Python generators (generate-skill-pages.py,
// generate-workflow-pages.py, generate-showcase.py) AND the in-place library-sample
// mount with one zero-dependency Node ESM generator. It reads:
//   - skills/<dir>/SKILL.md (+ references/TEMPLATE.md, references/EXAMPLE.md)
//   - commands/*.md
//   - _workflows/*.md
//   - library/skill-output-samples/<skill>/sample_*.md
// and emits Starlight content under site/src/content/docs/:
//   skills/<group>/<name>.md         (one per skill)         [generated, gitignored]
//   skills/<group>/index.md          (one per group)         [generated, gitignored]
//   reference/commands.md            (commands reference)    [generated, gitignored single file]
//   workflows/<name>.md + index.md   (per-workflow + index)  [generated, gitignored]
//   showcase/index.mdx + <thread>.md (showcase journeys)     [generated, gitignored]
//   samples/<skill>/<file>.md        (178 library samples)   [generated, gitignored]
//
// Links are emitted as relative .md links (the same forms the Python generators
// produced); a build-time remark plugin (scripts/remark-resolve-links.mjs) resolves
// them to Starlight slug URLs, replacing the old post-build HTML rewriter.
//
// Run via `npm run gen` (and automatically before `astro build`). The hand-authored
// overview pages skills/index.md and samples/index.md are NOT generated; this script
// only removes the generated SUBDIRECTORIES under skills/ and samples/, never those files.
//
// No dependencies. UTF-8 in/out (Windows cp1252 would corrupt otherwise).

import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  rmSync,
  existsSync,
  readdirSync,
  statSync,
} from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SKILLS_DIR = join(ROOT, 'skills');
const COMMANDS_DIR = join(ROOT, 'commands');
const WORKFLOWS_SRC = join(ROOT, '_workflows');
const SAMPLES_DIR = join(ROOT, 'library', 'skill-output-samples');
const DOCS = join(ROOT, 'site', 'src', 'content', 'docs');
const GITHUB_BASE = 'https://github.com/product-on-purpose/pm-skills/blob/main';
// Per-page editUrl base: generated pages point "Edit this page" at their real
// editable SOURCE (the SKILL.md / _workflows file / library sample), not at the
// gitignored generated output. Starts with edit/main/ so verify-edit-links.mjs
// validates the target exists. Aggregate pages (indices, showcase, commands) set
// editUrl: false since they have no single source.
const GH_EDIT = 'https://github.com/product-on-purpose/pm-skills/edit/main';

// --- phase / classification metadata (ported from generate-skill-pages.py) ---
const PHASE_ORDER = [
  'discover', 'define', 'develop', 'deliver', 'measure', 'iterate', 'foundation', 'utility',
];
const PHASE_DISPLAY = {
  discover: 'Discover', define: 'Define', develop: 'Develop', deliver: 'Deliver',
  measure: 'Measure', iterate: 'Iterate', foundation: 'Foundation', utility: 'Utility',
};
const NAMESPACE_PREFIXES = [
  'discover', 'define', 'develop', 'deliver', 'measure', 'iterate', 'foundation', 'utility',
];

// --- generic helpers --------------------------------------------------------
function read(path) {
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}
function writeOut(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content, 'utf8');
}
function fresh(dir) {
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
}
// Remove only the immediate SUBDIRECTORIES of dir, preserving files (e.g. a
// hand-authored index.md). Used for skills/ and samples/ which keep a tracked
// overview page at their root with generated content in subdirs.
function removeSubdirs(dir) {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
    return;
  }
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) rmSync(join(dir, entry.name), { recursive: true, force: true });
  }
}
function listDirs(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();
}

// --- frontmatter parsing (ported from the Python parse_frontmatter) ---------
// Handles: a leading HTML comment, top-level "key: value", a nested block
// "key:" then indented "  subkey: value", inline lists "[a, b]", and a leading
// HTML comment in the body. Sufficient for the SKILL.md / sample frontmatter
// shapes in this repo (not a general YAML parser).
function parseFrontmatter(content) {
  let text = content.replace(/^﻿/, '').replace(/^\s+/, '');
  if (text.startsWith('<!--')) {
    const end = text.indexOf('-->');
    if (end !== -1) text = text.slice(end + 3).replace(/^\s+/, '');
  }
  const m = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: content };
  const fmText = m[1];
  let body = m[2];

  // Strip a leading HTML comment from the body (post-frontmatter convention).
  const bodyStripped = body.replace(/^\s+/, '');
  if (bodyStripped.startsWith('<!--')) {
    const end = bodyStripped.indexOf('-->');
    if (end !== -1) body = bodyStripped.slice(end + 3).replace(/^\s+/, '');
  }

  const meta = {};
  let inBlock = false;
  let blockKey = null;
  const unquote = (v) => v.replace(/^["']/, '').replace(/["']$/, '').trim();
  const parseVal = (v) => {
    v = unquote(v);
    if (v.startsWith('[') && v.endsWith(']')) {
      return v.slice(1, -1).split(',').map((x) => unquote(x.trim())).filter(Boolean);
    }
    return v;
  };

  for (const rawLine of fmText.split('\n')) {
    const stripped = rawLine.replace(/\s+$/, '');
    if (!stripped.trim()) continue;
    // Nested block opener: "key:" with no value at column 0.
    if (/^[\w][\w-]*:\s*$/.test(stripped)) {
      blockKey = stripped.replace(/:\s*$/, '').trim();
      meta[blockKey] = {};
      inBlock = true;
      continue;
    }
    if (inBlock && /^\s/.test(rawLine)) {
      const nm = stripped.match(/^\s+([\w-]+):\s*(.+)$/);
      if (nm) meta[blockKey][nm[1]] = parseVal(nm[2]);
      continue;
    }
    inBlock = false;
    const kv = stripped.match(/^([\w-]+):\s*(.+)$/);
    if (kv) meta[kv[1]] = parseVal(kv[2]);
  }
  return { meta, body };
}

function stripFrontmatter(content) {
  let text = content.replace(/^\s+/, '');
  if (text.startsWith('<!--')) {
    const end = text.indexOf('-->');
    if (end !== -1) text = text.slice(end + 3).replace(/^\s+/, '');
  }
  const m = text.match(/^---\s*\n[\s\S]*?\n---\s*\n?([\s\S]*)$/);
  return m ? m[1] : content;
}

// Split markdown body by ## headings; also capture "_intro" (before first ##).
function extractSections(body) {
  const sections = {};
  let heading = null;
  let lines = [];
  for (const line of body.split('\n')) {
    const hm = line.match(/^##\s+(.+)/);
    if (hm) {
      if (heading !== null) sections[heading] = lines.join('\n').trim();
      heading = hm[1].trim();
      lines = [];
    } else {
      lines.push(line);
    }
  }
  if (heading !== null) sections[heading] = lines.join('\n').trim();
  const intro = [];
  for (const line of body.split('\n')) {
    if (/^##\s+/.test(line)) break;
    intro.push(line);
  }
  sections._intro = intro.join('\n').trim();
  return sections;
}

// metadata.phase || metadata.classification || dir-prefix || 'other'
function classifySkill(meta, dirname) {
  const m = meta && typeof meta.metadata === 'object' ? meta.metadata : {};
  const phase = m.phase || meta.phase;
  const classification = m.classification || meta.classification;
  if (phase) return [phase, PHASE_DISPLAY[phase] || phase];
  if (classification) return [classification, PHASE_DISPLAY[classification] || classification];
  for (const p of NAMESPACE_PREFIXES) {
    if (dirname.startsWith(`${p}-`)) return [p, PHASE_DISPLAY[p] || p];
  }
  return ['other', 'Other'];
}
function deriveCommandName(dirname) {
  for (const p of NAMESPACE_PREFIXES) {
    if (dirname.startsWith(`${p}-`)) return dirname.slice(p.length + 1);
  }
  return dirname;
}
// Source SKILL.md uses "](../../docs/X" which resolves from skills/<dir>/; once
// copied into docs/skills/<group>/ the docs/ segment must drop so the link
// resolves inside the docs tree.
function rewriteInternalPaths(text) {
  return text.replace(/\]\(\.\.\/\.\.\/docs\//g, '](../../');
}

// --- sample parsing (ported from the Python generators) ---------------------
const THREAD_DISPLAY = {
  storevine: 'Storevine (B2B)',
  brainshelf: 'Brainshelf (Consumer)',
  workbench: 'Workbench (Enterprise)',
};
function parseSampleSections(filepath) {
  const content = readFileSync(filepath, 'utf8');
  let text = content.replace(/^\s+/, '');
  if (text.startsWith('<!--')) {
    const end = text.indexOf('-->');
    if (end !== -1) text = text.slice(end + 3).replace(/^\s+/, '');
  }
  const m = text.match(/^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/);
  const fmText = m ? m[1] : '';
  const body = m ? m[2] : text;
  let context = '';
  let thread = '';
  for (const line of fmText.split('\n')) {
    if (line.startsWith('context:')) context = line.slice('context:'.length).trim();
    if (line.startsWith('thread:')) thread = line.slice('thread:'.length).trim();
  }
  const sections = {};
  let cur = null;
  let lines = [];
  for (const line of body.split('\n')) {
    const hm = line.match(/^##\s+(.+)/);
    if (hm) {
      if (cur) sections[cur] = lines.join('\n').trim();
      cur = hm[1].trim();
      lines = [];
    } else {
      lines.push(line);
    }
  }
  if (cur) sections[cur] = lines.join('\n').trim();
  return {
    context,
    thread,
    scenario: sections.Scenario || '',
    prompt: sections.Prompt || '',
    output: sections.Output || '',
  };
}
function loadSkillSamples(skillName) {
  const dir = join(SAMPLES_DIR, skillName);
  if (!existsSync(dir)) return [];
  const all = readdirSync(dir).filter((f) => f.endsWith('.md')).sort();
  const results = [];
  for (const thread of ['storevine', 'brainshelf', 'workbench']) {
    const match = all.find((f) => f.startsWith(`sample_${skillName}_${thread}_`));
    if (match) {
      const parsed = parseSampleSections(join(dir, match));
      parsed.thread_display = THREAD_DISPLAY[thread] || thread;
      if (parsed.output) results.push(parsed);
    }
  }
  return results;
}

// --- emit: skill pages ------------------------------------------------------
function generateSkillPage(skillDirName) {
  const skillDir = join(SKILLS_DIR, skillDirName);
  const skillFile = join(skillDir, 'SKILL.md');
  if (!existsSync(skillFile)) return null;

  const { meta, body: rawBody } = parseFrontmatter(readFileSync(skillFile, 'utf8'));
  const body = rewriteInternalPaths(rawBody);
  const sections = extractSections(body);

  const [group, groupDisplay] = classifySkill(meta, skillDirName);
  const commandName = deriveCommandName(skillDirName);
  const cmd = existsSync(join(COMMANDS_DIR, `${commandName}.md`)) ? commandName : null;
  const name = meta.name || skillDirName;
  const description = meta.description || '';
  const m = meta && typeof meta.metadata === 'object' ? meta.metadata : {};
  const version = m.version || meta.version || '1.0.0';
  const category = m.category || '';

  let pageTitle = (sections._intro || '').split('\n')[0].replace(/^#+\s*/, '').trim();
  if (!pageTitle) pageTitle = name;

  const out = [];
  out.push('---');
  out.push(`title: "${pageTitle}"`);
  out.push(`description: "${description}"`);
  out.push('generated: true');
  out.push('source: scripts/gen-site.mjs');
  out.push(`editUrl: ${GH_EDIT}/skills/${skillDirName}/SKILL.md`);
  out.push('tags:');
  out.push(`  - ${groupDisplay}`);
  if (category) out.push(`  - ${category}`);
  out.push('---');
  out.push('');

  out.push(':::note[Quick facts]');
  const phaseLabel = PHASE_ORDER.slice(0, 6).includes(group)
    ? `**Phase:** ${groupDisplay}`
    : `**Classification:** ${groupDisplay}`;
  out.push(`${phaseLabel} | **Version:** ${version} | **Category:** ${category} | **License:** Apache-2.0`);
  out.push(':::');
  out.push('');

  out.push(`**Try it:** \`/pm-skills:${name} "Your context here"\``);
  out.push('');

  const introLines = (sections._intro || '').split('\n');
  const introText = introLines.slice(1).join('\n').trim();
  if (introText) {
    out.push(introText);
    out.push('');
  }

  if (sections['When to Use']) {
    out.push('## When to Use', '', sections['When to Use'], '');
  }
  if (sections['When NOT to Use']) {
    out.push('## When NOT to Use', '', sections['When NOT to Use'], '');
  }

  out.push('## How to Use', '');
  out.push(`Invoke the skill by name (\`/pm-skills:${name}\` on Claude Code, \`$${name}\` on Codex):`, '');
  out.push('```');
  out.push(`/pm-skills:${name} "Your context here"`);
  out.push('```', '');
  out.push(`Or reference the skill file directly: \`skills/${skillDirName}/SKILL.md\``, '');

  if (sections.Instructions) {
    out.push('## Instructions', '', sections.Instructions, '');
  }

  const template = read(join(skillDir, 'references', 'TEMPLATE.md'));
  if (template) {
    out.push('## Output Template', '');
    out.push(rewriteInternalPaths(stripFrontmatter(template)).trim(), '');
  }

  const example = read(join(skillDir, 'references', 'EXAMPLE.md'));
  if (example) {
    const exBody = rewriteInternalPaths(stripFrontmatter(example));
    let exTitle = exBody.split('\n')[0].replace(/^#+\s*/, '').trim();
    if (!exTitle) exTitle = 'Complete example';
    out.push('## Example Output', '');
    out.push('<details>', `<summary>${exTitle}</summary>`, '');
    out.push(exBody.trim(), '');
    out.push('</details>', '');
  }

  const samples = loadSkillSamples(skillDirName);
  if (samples.length) {
    out.push('## Real-World Examples', '');
    out.push('See this skill applied to three different product contexts:', '');
    for (const s of samples) {
      const ctxLabel = s.context || s.thread_display;
      out.push('<details>', `<summary>${s.thread_display}: ${ctxLabel}</summary>`, '');
      if (s.prompt) out.push(`**Prompt:**\n\n${s.prompt}`, '');
      out.push(`**Output:**\n\n${s.output}`, '');
      out.push('</details>', '');
    }
  }

  const qc = sections['Quality Checklist'] || sections['Quality checklist'];
  if (qc) out.push('## Quality Checklist', '', qc, '');

  for (const key of ['Output Format', 'Output Contract']) {
    if (sections[key]) {
      out.push(`## ${key}`, '', sections[key], '');
      break;
    }
  }

  writeOut(join(DOCS, 'skills', group, `${name}.md`), out.join('\n'));
  return { name, dirname: skillDirName, group, group_display: groupDisplay, description, version, category, command: cmd };
}

// --- emit: phase index pages ------------------------------------------------
const PHASE_FLOWS = {
  discover: '```mermaid\nflowchart LR\n    A["/competitive-analysis"] --> D["/problem-statement"]\n    B["/interview-synthesis"] --> D\n    C["/stakeholder-summary"] --> D\n```',
  define: '```mermaid\nflowchart LR\n    A["/problem-statement"] --> B["/hypothesis"]\n    A --> C["/jtbd-canvas"]\n    C --> D["/opportunity-tree"]\n    D --> B\n```',
  develop: '```mermaid\nflowchart LR\n    A["/solution-brief"] --> B["/spike-summary"]\n    B --> C["/adr"]\n    A --> D["/design-rationale"]\n    C --> E["/prd"]\n    D --> E\n```',
  deliver: '```mermaid\nflowchart LR\n    A["/prd"] --> B["/user-stories"]\n    B --> C["/acceptance-criteria"]\n    A --> D["/edge-cases"]\n    C --> E["/launch-checklist"]\n    E --> F["/release-notes"]\n```',
  measure: '```mermaid\nflowchart LR\n    A["/experiment-design"] --> B["/instrumentation-spec"]\n    B --> C["/dashboard-requirements"]\n    B --> D["/experiment-results"]\n```',
  iterate: '```mermaid\nflowchart LR\n    A["/retrospective"] --> B["/lessons-log"]\n    B --> C["/refinement-notes"]\n    A --> D["/pivot-decision"]\n```',
};
function generatePhaseIndex(group, skills) {
  const display = PHASE_DISPLAY[group] || (group.charAt(0).toUpperCase() + group.slice(1));
  const out = [];
  out.push('---');
  out.push(`title: "${display} Skills"`);
  out.push(`description: "PM skills in the ${display} phase."`);
  out.push('generated: true');
  out.push('source: scripts/gen-site.mjs');
  out.push('editUrl: false');
  out.push('tags:');
  out.push(`  - ${display}`);
  out.push('---');
  out.push('');
  if (PHASE_FLOWS[group]) {
    out.push('## How these skills connect', '', PHASE_FLOWS[group], '');
  }
  out.push('## Skills in this phase', '');
  out.push('| Skill | Description | Command |');
  out.push('|-------|-------------|---------|');
  for (const s of [...skills].sort((a, b) => a.name.localeCompare(b.name))) {
    const cmdStr = s.command ? `\`/${s.command}\`` : '.';
    const desc = s.description.length > 80 ? s.description.slice(0, 80) + '...' : s.description;
    out.push(`| [${s.name}](${s.name}.md) | ${desc} | ${cmdStr} |`);
  }
  out.push('');
  writeOut(join(DOCS, 'skills', group, 'index.md'), out.join('\n'));
}

// --- emit: commands reference ----------------------------------------------
const WORKFLOW_COMMAND_ROWS = [
  ['workflow-customer-discovery', 'Customer Discovery', 'customer-discovery', 'Run the Customer Discovery workflow'],
  ['workflow-feature-kickoff', 'Feature Kickoff', 'feature-kickoff', 'Run the Feature Kickoff workflow'],
  ['workflow-post-launch-learning', 'Post-Launch Learning', 'post-launch-learning', 'Run the Post-Launch Learning workflow'],
  ['workflow-product-strategy', 'Product Strategy', 'product-strategy', 'Run the Product Strategy workflow'],
  ['workflow-sprint-planning', 'Sprint Planning', 'sprint-planning', 'Run the Sprint Planning workflow'],
  ['workflow-stakeholder-alignment', 'Stakeholder Alignment', 'stakeholder-alignment', 'Run the Stakeholder Alignment workflow'],
  ['workflow-technical-discovery', 'Technical Discovery', 'technical-discovery', 'Run the Technical Discovery workflow'],
  ['workflow-foundation-sprint', 'Foundation Sprint', 'foundation-sprint', 'Run the Foundation Sprint workflow'],
  ['workflow-design-sprint', 'Design Sprint', 'design-sprint', 'Run the Design Sprint workflow'],
  ['workflow-foundation-to-design', 'Foundation to Design', 'foundation-to-design', 'Run the Foundation Sprint to Design Sprint workflow'],
];
function listCommandFiles() {
  if (!existsSync(COMMANDS_DIR)) return [];
  return readdirSync(COMMANDS_DIR).filter((f) => f.endsWith('.md')).sort();
}
function generateCommandsReference(allSkills) {
  const cmdFiles = listCommandFiles();
  const totalCmd = cmdFiles.length;
  const skillCmd = allSkills.filter((s) => s.command).length;
  const workflowCmd = cmdFiles.filter((f) => f.startsWith('workflow-')).length;
  const otherCmd = totalCmd - skillCmd - workflowCmd;
  if (otherCmd < 0) {
    throw new Error(`other_cmd_count=${otherCmd} is negative; total=${totalCmd}, skill=${skillCmd}, workflow=${workflowCmd}.`);
  }

  const out = [];
  out.push('---');
  out.push('title: "Commands Reference"');
  out.push('description: "All slash commands available in PM Skills."');
  out.push('generated: true');
  out.push('source: scripts/gen-site.mjs');
  out.push('editUrl: false');
  out.push('---');
  out.push('');
  if (otherCmd > 0) {
    out.push(`PM Skills ships ${totalCmd} slash commands: ${skillCmd} skill commands, ${workflowCmd} workflow commands, and ${otherCmd} sub-agent companion commands.`);
  } else if (skillCmd > 0) {
    out.push(`PM Skills ships ${totalCmd} slash commands: ${skillCmd} skill commands plus ${workflowCmd} workflow commands.`);
  } else {
    out.push(`PM Skills ships ${totalCmd} slash commands: the ${workflowCmd} \`/workflow-*\` orchestrator commands. Every skill is invoked directly by name (\`/pm-skills:<skill-name>\` on Claude Code, \`$<skill-name>\` on Codex).`);
  }
  out.push('');
  out.push('| Command | Skill | Phase | Description |');
  out.push('|---------|-------|-------|-------------|');
  for (const s of [...allSkills].sort((a, b) => (a.command || '').localeCompare(b.command || ''))) {
    if (s.command) {
      const desc = s.description.length > 60 ? s.description.slice(0, 60) + '...' : s.description;
      out.push(`| \`/${s.command}\` | [${s.name}](../skills/${s.group}/${s.name}.md) | ${s.group_display} | ${desc} |`);
    }
  }
  for (const [cmd, label, slug, desc] of WORKFLOW_COMMAND_ROWS) {
    out.push(`| \`/${cmd}\` | [${label}](../workflows/${slug}.md) | Workflow | ${desc} |`);
  }
  if (otherCmd > 0) {
    const skillCmdNames = new Set(allSkills.filter((s) => s.command).map((s) => s.command));
    const workflowCmdNames = new Set(cmdFiles.filter((f) => f.startsWith('workflow-')).map((f) => f.replace(/\.md$/, '')));
    for (const f of cmdFiles) {
      const cmdName = f.replace(/\.md$/, '');
      if (skillCmdNames.has(cmdName) || workflowCmdNames.has(cmdName)) continue;
      const { meta } = parseFrontmatter(readFileSync(join(COMMANDS_DIR, f), 'utf8'));
      let cmdDesc = meta.description || '';
      if (cmdDesc.length > 60) cmdDesc = cmdDesc.slice(0, 60) + '...';
      out.push(`| \`/${cmdName}\` | _([sub-agent companion](sub-agent-compatibility.md))_ | Utility | ${cmdDesc} |`);
    }
  }
  out.push('');
  writeOut(join(DOCS, 'reference', 'commands.md'), out.join('\n'));
}

// --- emit: workflow pages (ported from generate-workflow-pages.py) ----------
const WF_PHASE_PREFIXES = NAMESPACE_PREFIXES;
function extractPhase(skillDir) {
  for (const p of WF_PHASE_PREFIXES) {
    if (skillDir.startsWith(p + '-') || skillDir === p) return p;
  }
  return skillDir.split('-')[0];
}
function rewriteWorkflowLinks(content) {
  content = content.replace(
    /(\]\()\.\.\/skills\/([a-z][a-z0-9-]+)\/SKILL\.md(\))/g,
    (_, pre, skillDir, post) => `${pre}../skills/${extractPhase(skillDir)}/${skillDir}.md${post}`,
  );
  content = content.replaceAll('](../README.md)', `](${GITHUB_BASE}/README.md)`);
  content = content.replace(/(\]\()\.\.\/docs\//g, '$1../');
  return content;
}
function injectGeneratedMarker(content, srcName) {
  if (content.includes('generated: true')) return content;
  const generator = 'scripts/gen-site.mjs';
  const editUrl = `${GH_EDIT}/_workflows/${srcName}`;
  let newFm;
  let rest;
  const fm = content.match(/^(---\s*\n)([\s\S]*?)(\n---\s*\n)/);
  if (fm) {
    newFm = fm[1] + fm[2] + `\ngenerated: true\nsource: ${generator}\neditUrl: ${editUrl}` + fm[3];
    rest = content.slice(fm[0].length);
  } else {
    newFm = `---\ngenerated: true\nsource: ${generator}\neditUrl: ${editUrl}\n---\n\n`;
    rest = content;
  }
  // Strip the leading body H1 (Starlight renders the frontmatter title). The m
  // flag matches the first H1 line even when a blank line follows the frontmatter;
  // the (\r?\n+|$) tail also covers an H1 on the final line with no trailing newline.
  rest = rest.replace(/^#[ \t]+.+(?:\r?\n+|$)/m, '');
  return newFm + rest;
}
const WORKFLOW_INFO = {
  'feature-kickoff': { skills: 'Problem Statement -> Hypothesis -> PRD -> User Stories', use_when: 'Starting a new feature from scratch' },
  'lean-startup': { skills: 'Hypothesis -> Experiment Design -> Experiment Results -> Pivot Decision', use_when: 'Running a build-measure-learn cycle' },
  'triple-diamond': { skills: 'Full Discover -> Define -> Develop -> Deliver -> Measure -> Iterate flow', use_when: 'End-to-end product development' },
  'customer-discovery': { skills: 'Interview Synthesis -> JTBD Canvas -> Opportunity Tree -> Problem Statement', use_when: 'Transforming raw research into a validated problem' },
  'product-strategy': { skills: 'Competitive Analysis -> Stakeholder Summary -> Opportunity Tree -> Solution Brief -> ADR', use_when: 'Framing a major strategic initiative' },
  'post-launch-learning': { skills: 'Instrumentation Spec -> Dashboard Requirements -> Experiment Results -> Retrospective -> Lessons Log', use_when: 'Setting up measurement and capturing learnings after launch' },
  'stakeholder-alignment': { skills: 'Stakeholder Summary -> Problem Statement -> Solution Brief -> Launch Checklist', use_when: 'Getting leadership buy-in before committing resources' },
  'technical-discovery': { skills: 'Spike Summary -> ADR -> Design Rationale', use_when: 'Evaluating technical feasibility and architecture decisions' },
  'foundation-sprint': { display: 'Foundation Sprint', skills: '7 `tool-foundation-sprint-*` skills (readiness -> brief -> basics -> differentiation -> approach-options -> magic-lenses -> founding-hypothesis)', use_when: '2-day strategic-alignment workshop producing a testable Founding Hypothesis' },
  'design-sprint': { display: 'Design Sprint', skills: '7 `tool-design-sprint-*` skills (readiness -> brief -> map-and-target -> sketch -> decide-and-storyboard -> prototype-plan -> test-and-score)', use_when: '5-day prototype-and-test workshop producing a Decider\'s build / iterate / pivot / stop call' },
  'foundation-to-design': { display: 'Foundation to Design', skills: 'Foundation Sprint family (7) -> narrative handoff conversation -> Design Sprint family (7)', use_when: 'End-to-end FS + DS arc (7-8 working days across 2-3 calendar weeks)' },
  'sprint-planning': { display: 'Sprint Planning (agile)', skills: 'Refinement Notes -> User Stories -> Edge Cases', use_when: 'Preparing agile sprint-ready stories from a backlog (distinct from Foundation Sprint and Design Sprint)' },
};
const WORKFLOW_ORDER = [
  'feature-kickoff', 'lean-startup', 'triple-diamond',
  'customer-discovery', 'sprint-planning', 'product-strategy',
  'post-launch-learning', 'stakeholder-alignment', 'technical-discovery',
  'foundation-sprint', 'design-sprint', 'foundation-to-design',
];
function generateWorkflowIndex(sourceStems) {
  const curated = new Set(Object.keys(WORKFLOW_INFO));
  const missingFromCurated = sourceStems.filter((s) => !curated.has(s));
  if (missingFromCurated.length) {
    throw new Error(`workflow source files lack WORKFLOW_INFO entries: ${missingFromCurated.sort().join(', ')}`);
  }
  const missingFromOrder = [...curated].filter((s) => !WORKFLOW_ORDER.includes(s));
  if (missingFromOrder.length) {
    throw new Error(`WORKFLOW_INFO entries not in WORKFLOW_ORDER: ${missingFromOrder.sort().join(', ')}`);
  }
  const out = [
    '---',
    'title: Workflows',
    'description: Multi-skill workflows that chain PM skills together for common product management processes.',
    'generated: true',
    'source: scripts/gen-site.mjs',
    'editUrl: false',
    '---',
    '',
    'Workflows chain multiple skills into end-to-end sequences. Each workflow defines a sequence of skills to run in order.',
    '',
    '> **Need help choosing?** See the [Using Workflows Guide](../guides/using-workflows.md) for a decision tree, comparison matrix, and customization patterns.',
    '',
    '| Workflow | Skills chained | Use when |',
    '|----------|---------------|----------|',
  ];
  for (const name of WORKFLOW_ORDER) {
    const info = WORKFLOW_INFO[name] || {};
    const display = info.display || name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
    out.push(`| [${display}](${name}.md) | ${info.skills || ''} | ${info.use_when || ''} |`);
  }
  out.push(
    '',
    '## How to use a workflow',
    '',
    '```',
    '/workflow-feature-kickoff "Feature name or description"',
    '```',
    '',
    'Each workflow has a corresponding `/workflow-{name}` slash command. You can also reference the workflow file directly.',
    '',
  );
  return out.join('\n') + '\n';
}
function generateWorkflows() {
  fresh(join(DOCS, 'workflows'));
  const srcFiles = existsSync(WORKFLOWS_SRC)
    ? readdirSync(WORKFLOWS_SRC).filter((f) => f.endsWith('.md') && f !== 'README.md' && f !== '.gitkeep').sort()
    : [];
  for (const f of srcFiles) {
    const content = readFileSync(join(WORKFLOWS_SRC, f), 'utf8');
    const marked = injectGeneratedMarker(rewriteWorkflowLinks(content), f);
    writeOut(join(DOCS, 'workflows', f), marked);
  }
  const stems = srcFiles.map((f) => f.replace(/\.md$/, ''));
  writeOut(join(DOCS, 'workflows', 'index.md'), generateWorkflowIndex(stems));
  return srcFiles.length;
}

// --- emit: showcase (ported from generate-showcase.py) ----------------------
const SHOWCASE_THREADS = {
  storevine: { display: 'Storevine', subtitle: 'B2B Ecommerce Platform', icon: 'bars', description: 'Series A, ~70 employees, ~15,000 merchants. Building **Campaigns**: native email marketing.', prompt_style: 'Organized: structured context, references prior work, clear scope boundaries.' },
  brainshelf: { display: 'Brainshelf', subtitle: 'Consumer PKM App', icon: 'open-book', description: 'Post-seed, ~20 employees, ~22,000 MAU. Building **Resurface**: contextual morning email digest.', prompt_style: 'Casual: rough, fast, enough context to work. Bullet points and shorthand.' },
  workbench: { display: 'Workbench', subtitle: 'Enterprise Collaboration', icon: 'laptop', description: 'Series B, ~200 employees, ~500 enterprise customers. Building **Blueprints**: document templates with approval gates.', prompt_style: 'Enterprise: full stakeholder lists, quantified baselines, explicit metrics.' },
};
const SHOWCASE_PHASES = [
  ['foundation', 'Foundation'], ['discover', 'Discover'], ['define', 'Define'],
  ['develop', 'Develop'], ['deliver', 'Deliver'], ['measure', 'Measure'], ['iterate', 'Iterate'],
];
const SHOWCASE_PHASE_SKILLS = {
  foundation: ['foundation-persona'],
  discover: ['discover-competitive-analysis', 'discover-interview-synthesis', 'discover-stakeholder-summary'],
  define: ['define-problem-statement', 'define-hypothesis', 'define-opportunity-tree', 'define-jtbd-canvas'],
  develop: ['develop-solution-brief', 'develop-spike-summary', 'develop-adr', 'develop-design-rationale'],
  deliver: ['deliver-prd', 'deliver-user-stories', 'deliver-edge-cases', 'deliver-launch-checklist', 'deliver-release-notes'],
  measure: ['measure-experiment-design', 'measure-instrumentation-spec', 'measure-dashboard-requirements', 'measure-experiment-results'],
  iterate: ['iterate-retrospective', 'iterate-lessons-log', 'iterate-refinement-notes', 'iterate-pivot-decision'],
};
const SHOWCASE_SKILL_DISPLAY = {
  'foundation-persona': 'Persona',
  'discover-competitive-analysis': 'Competitive Analysis', 'discover-interview-synthesis': 'Interview Synthesis', 'discover-stakeholder-summary': 'Stakeholder Summary',
  'define-problem-statement': 'Problem Statement', 'define-hypothesis': 'Hypothesis', 'define-opportunity-tree': 'Opportunity Tree', 'define-jtbd-canvas': 'JTBD Canvas',
  'develop-solution-brief': 'Solution Brief', 'develop-spike-summary': 'Spike Summary', 'develop-adr': 'Architecture Decision Record', 'develop-design-rationale': 'Design Rationale',
  'deliver-prd': 'PRD', 'deliver-user-stories': 'User Stories', 'deliver-edge-cases': 'Edge Cases', 'deliver-launch-checklist': 'Launch Checklist', 'deliver-release-notes': 'Release Notes',
  'measure-experiment-design': 'Experiment Design', 'measure-instrumentation-spec': 'Instrumentation Spec', 'measure-dashboard-requirements': 'Dashboard Requirements', 'measure-experiment-results': 'Experiment Results',
  'iterate-retrospective': 'Retrospective', 'iterate-lessons-log': 'Lessons Log', 'iterate-refinement-notes': 'Refinement Notes', 'iterate-pivot-decision': 'Pivot Decision',
};
function findAllSamplesForSkill(skill, thread) {
  const dir = join(SAMPLES_DIR, skill);
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.startsWith(`sample_${skill}_${thread}_`) && f.endsWith('.md')).sort();
}
function generateShowcaseThread(threadKey) {
  const thread = SHOWCASE_THREADS[threadKey];
  const out = [];
  out.push('---');
  out.push(`title: "${thread.display}: Follow the Product"`);
  out.push(`description: "Follow ${thread.display} through the complete PM lifecycle, from discovery to pivot decision."`);
  out.push('generated: true');
  out.push('source: scripts/gen-site.mjs');
  out.push('editUrl: false');
  out.push('tags:');
  out.push('  - Showcase');
  out.push(`  - ${thread.display}`);
  out.push('---');
  out.push('');
  out.push(`> ${thread.description}`);
  out.push('>');
  out.push(`> **Prompt style:** ${thread.prompt_style}`);
  out.push('');
  let sampleCount = 0;
  for (const [phaseKey, phaseDisplay] of SHOWCASE_PHASES) {
    const skills = SHOWCASE_PHASE_SKILLS[phaseKey] || [];
    if (!skills.length) continue;
    let hasContent = false;
    const phaseLines = [`## Phase: ${phaseDisplay}`, ''];
    for (const skill of skills) {
      for (const sampleFile of findAllSamplesForSkill(skill, threadKey)) {
        const parsed = parseSampleSections(join(SAMPLES_DIR, skill, sampleFile));
        if (!parsed.output) continue;
        hasContent = true;
        sampleCount++;
        const skillDisplay = SHOWCASE_SKILL_DISPLAY[skill] || skill;
        let variant = '';
        const fname = sampleFile.replace(/\.md$/, '');
        if (fname.includes('product-brief')) variant = ' (Product Brief)';
        else if (fname.includes('product-detailed')) variant = ' (Product Detailed)';
        else if (fname.includes('marketing-brief')) variant = ' (Marketing Brief)';
        else if (fname.includes('marketing-detailed')) variant = ' (Marketing Detailed)';
        phaseLines.push(`### ${skillDisplay}${variant}`, '');
        if (parsed.scenario) {
          phaseLines.push(parsed.context ? `*${parsed.context}*` : '');
          phaseLines.push('');
        }
        if (parsed.prompt) {
          phaseLines.push(':::note[Prompt]', parsed.prompt, ':::', '');
        }
        phaseLines.push('<details>', `<summary>Full output: ${skillDisplay}${variant}</summary>`, '');
        phaseLines.push(parsed.output, '');
        phaseLines.push('</details>', '', '---', '');
      }
    }
    if (hasContent) out.push(...phaseLines);
  }
  out.push(`*${sampleCount} artifacts generated across the full PM lifecycle.*`, '');
  out.push('---', '');
  out.push('**Explore other journeys:**', '');
  for (const [otherKey, other] of Object.entries(SHOWCASE_THREADS)) {
    if (otherKey !== threadKey) out.push(`- [${other.display} (${other.subtitle})](${otherKey}.md)`);
  }
  out.push('');
  writeOut(join(DOCS, 'showcase', `${threadKey}.md`), out.join('\n'));
}
function generateShowcaseIndex() {
  const out = [];
  out.push('---');
  out.push('title: "Showcase: Follow the Product"');
  out.push('description: "See PM Skills in action: follow three fictional companies through the complete product lifecycle."');
  out.push('generated: true');
  out.push('source: scripts/gen-site.mjs');
  out.push('editUrl: false');
  out.push('tags:');
  out.push('  - Showcase');
  out.push('---');
  out.push('');
  out.push("import { Card, CardGrid } from '@astrojs/starlight/components';");
  out.push('');
  out.push('See every PM skill in action. Three fictional companies, three different prompt styles,');
  out.push('one complete lifecycle each, from discovery research through pivot decisions.');
  out.push('');
  out.push('Each journey demonstrates **25+ real artifacts** produced by pm-skills slash commands,');
  out.push('including the full prompt that generated each one.');
  out.push('');
  out.push('<CardGrid>');
  for (const [key, thread] of Object.entries(SHOWCASE_THREADS)) {
    out.push(`  <Card title="${thread.display} - ${thread.subtitle}" icon="${thread.icon}">`);
    out.push(`    ${thread.description}`);
    out.push('');
    out.push(`    **Prompt style:** ${thread.prompt_style}`);
    out.push('');
    out.push(`    [Follow the journey](${key}.md)`);
    out.push('  </Card>');
    out.push('');
  }
  out.push('</CardGrid>');
  out.push('');
  out.push('## How the samples work', '');
  out.push('Every sample follows a consistent three-part structure:', '');
  out.push('1. **Scenario**: the company, team, and specific PM problem');
  out.push('2. **Prompt**: the exact slash command the PM typed');
  out.push('3. **Output**: the complete artifact, following every template section', '');
  out.push('Fictional metrics are marked with `[fictional]`. Competitor names are real.');
  out.push('Only the three companies (Storevine, Brainshelf, Workbench) are fictional.', '');
  out.push('## Three prompt styles, same quality output', '');
  out.push('| Style | Company | Description |');
  out.push('|-------|---------|-------------|');
  out.push('| **Organized** | Storevine | Structured notes, references prior artifacts, clear scope |');
  out.push('| **Casual** | Brainshelf | Bullet points, shorthand, enough context to work |');
  out.push('| **Enterprise** | Workbench | Full stakeholder lists, quantified baselines, explicit metrics |');
  out.push('');
  out.push('See the [Prompt Gallery](../guides/prompt-gallery.md) for a deeper comparison.');
  writeOut(join(DOCS, 'showcase', 'index.mdx'), out.join('\n'));
}
function generateShowcase() {
  fresh(join(DOCS, 'showcase'));
  generateShowcaseIndex();
  for (const key of Object.keys(SHOWCASE_THREADS)) generateShowcaseThread(key);
}

// --- emit: library samples (the 178 in-place pages, now generated) ----------
const SAMPLE_EXCLUDE = [/_legacy_/, /_orbit_/];
function generateSamples() {
  removeSubdirs(join(DOCS, 'samples'));
  let count = 0;
  if (!existsSync(SAMPLES_DIR)) return count;
  for (const skill of listDirs(SAMPLES_DIR)) {
    const dir = join(SAMPLES_DIR, skill);
    for (const f of readdirSync(dir).filter((x) => /^sample_.*\.md$/.test(x)).sort()) {
      if (SAMPLE_EXCLUDE.some((re) => re.test(f))) continue;
      const content = readFileSync(join(dir, f), 'utf8');
      // Point "Edit this page" at the library source (the sample is verbatim from
      // there). Insert editUrl after the frontmatter opener (which may follow a
      // leading HTML comment). No-op if a sample somehow lacks frontmatter.
      const withEdit = content.replace(
        /^((?:\s*<!--[\s\S]*?-->\s*)?---\r?\n)/,
        `$1editUrl: ${GH_EDIT}/library/skill-output-samples/${skill}/${f}\n`,
      );
      writeOut(join(DOCS, 'samples', skill, f), withEdit);
      count++;
    }
  }
  return count;
}

// --- main -------------------------------------------------------------------
function main() {
  if (!existsSync(SKILLS_DIR)) {
    console.error(`Error: skills directory not found at ${SKILLS_DIR}`);
    process.exit(1);
  }

  // skills/ keeps a hand-authored index.md at its root; clear only the
  // generated group subdirectories.
  removeSubdirs(join(DOCS, 'skills'));

  const allSkills = [];
  const groups = {};
  for (const dir of listDirs(SKILLS_DIR)) {
    const info = generateSkillPage(dir);
    if (info) {
      allSkills.push(info);
      (groups[info.group] ||= []).push(info);
    }
  }
  for (const [group, skills] of Object.entries(groups)) generatePhaseIndex(group, skills);
  generateCommandsReference(allSkills);
  const workflowCount = generateWorkflows();
  generateShowcase();
  const sampleCount = generateSamples();

  const phaseIndexCount = Object.keys(groups).length;
  console.log(
    `gen-site: ${allSkills.length} skills + ${phaseIndexCount} phase indices, ` +
    `${workflowCount} workflows + index, 4 showcase, commands reference, ` +
    `${sampleCount} samples -> ${DOCS}`,
  );
}

main();
