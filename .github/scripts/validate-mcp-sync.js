#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const PHASES = new Set([
  "discover",
  "define",
  "develop",
  "deliver",
  "measure",
  "iterate",
  "foundation",
]);

const mode = (process.env.VALIDATE_MCP_SYNC_MODE || "observe").toLowerCase() === "block"
  ? "block"
  : "observe";

const pmSkillsPath = process.env.PM_SKILLS_PATH || ".";
const pmSkillsMcpPath = process.env.PM_SKILLS_MCP_PATH || "./pm-skills-mcp";
const stepSummaryPath = process.env.GITHUB_STEP_SUMMARY;

function pathExists(targetPath) {
  try {
    fs.accessSync(targetPath);
    return true;
  } catch {
    return false;
  }
}

function scanSkillDirs(rootPath, relativeDir = "") {
  const absolutePath = path.join(rootPath, relativeDir);
  const entries = fs.readdirSync(absolutePath, { withFileTypes: true });
  const result = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) {
      continue;
    }
    const nextRel = path.join(relativeDir, entry.name);
    const nextAbs = path.join(rootPath, nextRel);
    const skillFile = path.join(nextAbs, "SKILL.md");
    if (pathExists(skillFile)) {
      result.push(nextRel);
      continue;
    }
    result.push(...scanSkillDirs(rootPath, nextRel));
  }

  return result;
}

function normalizeSkillName(relativeSkillDir) {
  const parts = relativeSkillDir.split(path.sep).filter(Boolean);
  if (parts.length === 0) {
    return "";
  }
  if (parts.length === 1) {
    return parts[0];
  }
  if (parts.length === 2 && PHASES.has(parts[0])) {
    return parts[1].startsWith(`${parts[0]}-`) ? parts[1] : `${parts[0]}-${parts[1]}`;
  }
  return parts[parts.length - 1];
}

function readSkillNamesFromFirstExistingRoot(candidateRoots, label) {
  for (const root of candidateRoots) {
    if (!pathExists(root) || !fs.statSync(root).isDirectory()) {
      continue;
    }
    const dirs = scanSkillDirs(root);
    const names = new Set();
    for (const dir of dirs) {
      const normalized = normalizeSkillName(dir);
      if (normalized) {
        names.add(normalized);
      }
    }
    return { root, names };
  }

  throw new Error(`Could not find ${label} skills root. Checked: ${candidateRoots.join(", ")}`);
}

function toSortedArray(set) {
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function diffSet(leftSet, rightSet) {
  const result = [];
  for (const value of leftSet) {
    if (!rightSet.has(value)) {
      result.push(value);
    }
  }
  return result.sort((a, b) => a.localeCompare(b));
}

function commandNameFromSkill(skillName) {
  const phasePrefix = Array.from(PHASES).find((phase) => skillName.startsWith(`${phase}-`));
  if (!phasePrefix) {
    return skillName;
  }
  return skillName.slice(phasePrefix.length + 1);
}

function collectMissingCommands(pmSkillsRoot, pmSkillNames) {
  const commandsDir = path.join(pmSkillsRoot, "commands");
  if (!pathExists(commandsDir)) {
    return [];
  }
  const missing = [];
  for (const skill of pmSkillNames) {
    const commandName = commandNameFromSkill(skill);
    const commandPath = path.join(commandsDir, `${commandName}.md`);
    if (!pathExists(commandPath)) {
      missing.push(`${skill} -> commands/${commandName}.md`);
    }
  }
  return missing.sort((a, b) => a.localeCompare(b));
}

function formatList(items) {
  if (items.length === 0) {
    return "  - (none)";
  }
  return items.map((item) => `  - ${item}`).join("\n");
}

function appendStepSummary(markdown) {
  if (!stepSummaryPath) {
    return;
  }
  fs.appendFileSync(stepSummaryPath, `${markdown}\n`);
}

function printChecklist() {
  console.log("Manual sync checklist:");
  console.log("1) In pm-skills-mcp, run `npm run embed-skills`.");
  console.log("2) Update pm-skills-mcp/README.md skill tables and tool-count badge.");
  console.log("3) Update pm-skills-mcp/CHANGELOG.md under [Unreleased] -> Added.");
  console.log("4) Update pm-skills/README.md skill tables if needed.");
  console.log("5) Ensure command files exist for new skills in pm-skills/commands/.");
  console.log("6) Commit and push both repos.");
}

function main() {
  const pmSkillRoots = [path.join(pmSkillsPath, "skills")];
  const mcpSkillRoots = [
    path.join(pmSkillsMcpPath, "skills"),
    path.join(pmSkillsMcpPath, "package", "skills"),
  ];

  const pm = readSkillNamesFromFirstExistingRoot(pmSkillRoots, "pm-skills");
  const mcp = readSkillNamesFromFirstExistingRoot(mcpSkillRoots, "pm-skills-mcp");

  const pmSkills = pm.names;
  const mcpSkills = mcp.names;
  const missingInMcp = diffSet(pmSkills, mcpSkills);
  const extraInMcp = diffSet(mcpSkills, pmSkills);
  const missingCommands = collectMissingCommands(pmSkillsPath, pmSkills);

  const mismatchDetected = missingInMcp.length > 0 || extraInMcp.length > 0;

  console.log(`validate-mcp-sync mode: ${mode}`);
  console.log(`pm-skills root: ${pm.root}`);
  console.log(`pm-skills-mcp root: ${mcp.root}`);
  console.log(`skills in pm-skills: ${pmSkills.size}`);
  console.log(`skills in pm-skills-mcp: ${mcpSkills.size}`);

  if (!mismatchDetected) {
    console.log("MCP sync check passed: no skill drift detected.");
    if (missingCommands.length > 0) {
      console.log("Warning: missing command files detected:");
      console.log(formatList(missingCommands));
    }
    appendStepSummary(
      [
        "## validate-mcp-sync",
        "",
        "- Result: pass",
        `- Mode: ${mode}`,
        `- pm-skills skills: ${pmSkills.size}`,
        `- pm-skills-mcp skills: ${mcpSkills.size}`,
      ].join("\n")
    );
    return;
  }

  console.log("MCP sync check detected drift.");
  console.log("Skills in pm-skills but missing in pm-skills-mcp:");
  console.log(formatList(missingInMcp));
  console.log("Skills in pm-skills-mcp but not in pm-skills:");
  console.log(formatList(extraInMcp));
  if (missingCommands.length > 0) {
    console.log("Related warning: missing command files:");
    console.log(formatList(missingCommands));
  }
  printChecklist();

  appendStepSummary(
    [
      "## validate-mcp-sync",
      "",
      `- Result: ${mode === "block" ? "fail" : "observe-only mismatch"}`,
      `- Mode: ${mode}`,
      `- Missing in pm-skills-mcp: ${missingInMcp.length}`,
      `- Extra in pm-skills-mcp: ${extraInMcp.length}`,
      "",
      "### Missing in pm-skills-mcp",
      ...missingInMcp.map((skill) => `- ${skill}`),
      "",
      "### Extra in pm-skills-mcp",
      ...extraInMcp.map((skill) => `- ${skill}`),
    ].join("\n")
  );

  if (mode === "block") {
    process.exitCode = 1;
  } else {
    console.log("Observe-only mode active; not failing this run.");
  }
}

try {
  main();
} catch (error) {
  console.error("validate-mcp-sync execution error:");
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 2;
}
