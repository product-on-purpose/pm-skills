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
const sourceMetadataFileName = "pm-skills-source.json";
const semverPattern = /^\d+\.\d+\.\d+$/;
const shaPattern = /^[0-9a-f]{7,40}$/i;

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

function readJsonFile(filePath, label) {
  if (!pathExists(filePath)) {
    throw new Error(`Missing ${label}: ${filePath}`);
  }
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Could not parse ${label} at ${filePath}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

function readLatestReleaseVersion(changelogPath) {
  if (!pathExists(changelogPath)) {
    throw new Error(`Missing CHANGELOG.md at ${changelogPath}`);
  }
  const lines = fs.readFileSync(changelogPath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const match = line.match(/^## \[(\d+\.\d+\.\d+)\] - \d{4}-\d{2}-\d{2}$/);
    if (match) {
      return match[1];
    }
  }
  throw new Error(`Could not find a released semver heading in ${changelogPath}`);
}

function validateSourceMetadata(sourceMetadata, latestReleaseVersion) {
  const issues = [];
  const warnings = [];

  if (typeof sourceMetadata !== "object" || sourceMetadata === null) {
    return {
      issues: ["Source metadata must be a JSON object."],
      warnings,
    };
  }

  const repository = typeof sourceMetadata.pmSkillsRepository === "string"
    ? sourceMetadata.pmSkillsRepository.trim()
    : "";
  const ref = typeof sourceMetadata.pmSkillsRef === "string"
    ? sourceMetadata.pmSkillsRef.trim()
    : "";
  const version = typeof sourceMetadata.pmSkillsVersion === "string"
    ? sourceMetadata.pmSkillsVersion.trim()
    : "";
  const outputContractVersion = typeof sourceMetadata.outputContractVersion === "string"
    ? sourceMetadata.outputContractVersion.trim()
    : "";
  const configContractVersion = typeof sourceMetadata.configContractVersion === "string"
    ? sourceMetadata.configContractVersion.trim()
    : "";

  if (!repository) {
    issues.push("pmSkillsRepository is required in pm-skills-source.json.");
  } else if (repository !== "product-on-purpose/pm-skills") {
    warnings.push(`pmSkillsRepository is '${repository}' (expected product-on-purpose/pm-skills).`);
  }

  if (!ref) {
    issues.push("pmSkillsRef is required in pm-skills-source.json.");
  }

  if (!version) {
    issues.push("pmSkillsVersion is required in pm-skills-source.json.");
  } else if (!semverPattern.test(version)) {
    issues.push(`pmSkillsVersion '${version}' must match X.Y.Z.`);
  }

  if (!outputContractVersion) {
    issues.push("outputContractVersion is required in pm-skills-source.json.");
  } else if (!semverPattern.test(outputContractVersion)) {
    issues.push(`outputContractVersion '${outputContractVersion}' must match X.Y.Z.`);
  }

  if (!configContractVersion) {
    issues.push("configContractVersion is required in pm-skills-source.json.");
  } else if (!semverPattern.test(configContractVersion)) {
    issues.push(`configContractVersion '${configContractVersion}' must match X.Y.Z.`);
  }

  if (version && outputContractVersion && version !== outputContractVersion) {
    issues.push(`outputContractVersion '${outputContractVersion}' must match pmSkillsVersion '${version}'.`);
  }

  if (version && configContractVersion && version !== configContractVersion) {
    issues.push(`configContractVersion '${configContractVersion}' must match pmSkillsVersion '${version}'.`);
  }

  if (ref && version && !shaPattern.test(ref) && ref !== `v${version}`) {
    issues.push(`pmSkillsRef '${ref}' must match 'v${version}' (or be a commit SHA).`);
  }

  if (latestReleaseVersion && version && version !== latestReleaseVersion) {
    issues.push(`pmSkillsVersion '${version}' does not match latest pm-skills release '${latestReleaseVersion}'.`);
  }

  return {
    issues,
    warnings,
    normalized: {
      repository,
      ref,
      version,
      outputContractVersion,
      configContractVersion,
    },
  };
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
  console.log("1) In pm-skills-mcp, update `pm-skills-source.json` with repo/ref/version and contract versions.");
  console.log("2) In pm-skills-mcp, run `npm run embed-skills`.");
  console.log("3) Update pm-skills-mcp docs/changelog for tool counts and compatibility notes.");
  console.log("4) Update pm-skills docs/changelog where MCP compatibility references changed.");
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
  const latestReleaseVersion = readLatestReleaseVersion(path.join(pmSkillsPath, "CHANGELOG.md"));
  const sourceMetadataPath = path.join(pmSkillsMcpPath, sourceMetadataFileName);
  const sourceMetadata = readJsonFile(sourceMetadataPath, "pm-skills-mcp source metadata");
  const sourceMetadataValidation = validateSourceMetadata(sourceMetadata, latestReleaseVersion);

  const skillDriftDetected = missingInMcp.length > 0 || extraInMcp.length > 0;
  const metadataMismatchDetected = sourceMetadataValidation.issues.length > 0;
  const mismatchDetected = skillDriftDetected || metadataMismatchDetected;

  console.log(`validate-mcp-sync mode: ${mode}`);
  console.log(`pm-skills root: ${pm.root}`);
  console.log(`pm-skills-mcp root: ${mcp.root}`);
  console.log(`skills in pm-skills: ${pmSkills.size}`);
  console.log(`skills in pm-skills-mcp: ${mcpSkills.size}`);
  console.log(`latest pm-skills release: ${latestReleaseVersion}`);
  console.log(`source metadata path: ${sourceMetadataPath}`);
  if (sourceMetadataValidation.normalized) {
    console.log(`pinned pm-skills repo: ${sourceMetadataValidation.normalized.repository || "(missing)"}`);
    console.log(`pinned pm-skills ref: ${sourceMetadataValidation.normalized.ref || "(missing)"}`);
    console.log(`pinned pm-skills version: ${sourceMetadataValidation.normalized.version || "(missing)"}`);
    console.log(`output contract version: ${sourceMetadataValidation.normalized.outputContractVersion || "(missing)"}`);
    console.log(`config contract version: ${sourceMetadataValidation.normalized.configContractVersion || "(missing)"}`);
  }
  if (sourceMetadataValidation.warnings.length > 0) {
    console.log("Pin/contract warnings:");
    console.log(formatList(sourceMetadataValidation.warnings));
  }

  if (!mismatchDetected) {
    console.log("MCP sync check passed: no skill drift and pin/contract metadata is aligned.");
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
        `- Latest pm-skills release: ${latestReleaseVersion}`,
        `- Source metadata issues: ${sourceMetadataValidation.issues.length}`,
      ].join("\n")
    );
    return;
  }

  console.log("MCP sync check detected drift.");
  if (skillDriftDetected) {
    console.log("Skills in pm-skills but missing in pm-skills-mcp:");
    console.log(formatList(missingInMcp));
    console.log("Skills in pm-skills-mcp but not in pm-skills:");
    console.log(formatList(extraInMcp));
  } else {
    console.log("Skill inventory drift: none.");
  }
  if (metadataMismatchDetected) {
    console.log("Pin/contract metadata issues:");
    console.log(formatList(sourceMetadataValidation.issues));
  }
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
      `- Pin/contract metadata issues: ${sourceMetadataValidation.issues.length}`,
      "",
      "### Missing in pm-skills-mcp",
      ...(missingInMcp.length > 0 ? missingInMcp.map((skill) => `- ${skill}`) : ["- (none)"]),
      "",
      "### Extra in pm-skills-mcp",
      ...(extraInMcp.length > 0 ? extraInMcp.map((skill) => `- ${skill}`) : ["- (none)"]),
      "",
      "### Pin/contract metadata issues",
      ...(sourceMetadataValidation.issues.length > 0
        ? sourceMetadataValidation.issues.map((issue) => `- ${issue}`)
        : ["- (none)"]),
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
