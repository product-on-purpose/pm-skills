# check-skill-cross-references

Flags backtick-wrapped, classification-prefixed skill references in `skills/*/SKILL.md` that do not resolve to a real `skills/<name>/` directory.

## What it catches

References to non-existent skills, written as backtick-wrapped, classification-prefixed tokens (for example, a reference to `define-edge-cases` when the real skill is `deliver-edge-cases`). This is the v2.18.0 defect class: SKILL.md files referenced `define-edge-cases`, `develop-product-vision`, and `discover-research-plan` (none of which exist). Those broken references passed every automated gate and were caught only by a manual name-vs-directory diff.

A "skill reference" is defined narrowly to keep the signal high (D-FU2, option A): a backtick-wrapped token whose first segment is a known classification prefix (`discover`, `define`, `develop`, `deliver`, `measure`, `iterate`, `foundation`, `utility`, `tool`) followed by `-` and a lowercase slug. Each such token must match an actual directory under `skills/`.

## What it does NOT catch (by design)

- Bare command forms (`/prd`) or unprefixed names; only classification-prefixed directory-name tokens are checked.
- Skill references in `commands/`, `AGENTS.md`, `docs/`, the root README, or other prose; the scope is `skills/*/SKILL.md` only. Prose surfaces are covered by the PR-2 manual sweep, not by this validator.
- Tokens that are not wrapped in backticks (plain prose mentions).

## Intentional non-resolving tokens (allowlist)

Some non-resolving tokens are legitimate and are listed in the script's `ALLOWLIST`:

- `deliver-roadmap` - forward-reference to a planned-but-unshipped skill ("when shipped").
- `deliver-change-communication` - an illustrative naming example in `utility-pm-skill-builder`, not a real skill.
- `foundation-sprint-skills` - a skill-family identifier (resolves to `docs/reference/skill-families/foundation-sprint-skills-contract.md`), not a skill directory.

Add a token to the allowlist only when it is an intentional reference, not a typo. The `.sh` and `.ps1` allowlists must stay in sync.

## Why this validator exists

The v2.18.0 release passed every automated gate and still shipped (then fixed) references to three non-existent skills. Per the repo principle that any defect class a human or LLM catches that a script could have caught should become a script, this validator closes that gap. Decision brief D-FU2 in `docs/internal/release-plans/v2.19.0/plan_v2.19.0.md` records the scope choice.

## Usage

```bash
bash scripts/check-skill-cross-references.sh
```

```powershell
pwsh scripts/check-skill-cross-references.ps1
```

Both exit `0` when every reference resolves (or is allowlisted) and `1` on the first broken reference.

## CI wiring

Part of the pre-tag validator bundle (`scripts/pre-tag-validate.sh`) and the enforcing validator set in `.github/workflows/validation.yml` (Ubuntu + Windows matrix).

## Cross-references

- Decision brief: `docs/internal/release-plans/v2.19.0/plan_v2.19.0.md` (D-FU2)
- Memory: `feedback_pre-tag-validator-bundle.md`
