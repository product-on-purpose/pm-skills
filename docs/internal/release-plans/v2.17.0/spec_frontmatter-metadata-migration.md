# Spec: Frontmatter Metadata Migration (W1)

**Status:** READY FOR EXECUTION (revised 2026-05-19 after spec verification + consumer mapping)
**Parent plan:** [`plan_v2.17.0.md`](plan_v2.17.0.md)
**Work item ID:** W1
**Effort estimate:** 2-3 effort-days (REVISED UP from 1-2; blast radius is ~10 consumer scripts + cross-repo MCP, not just 59 files + 1 validator)
**Source:** Strategic roadmap R-05

> **VERIFICATION NOTE (2026-05-19):** This spec was rewritten after fetching the actual agentskills.io specification and mapping all downstream consumers. The original draft had three errors: (1) proposed a `compatibility:` list (spec says it's a STRING and "most skills do not need it"); (2) assumed nested `metadata.tool.*` structure (actual is flat `metadata.tool` + `metadata.move`); (3) underestimated blast radius (claimed 59 files + 1 validator; reality is ~10 consumer scripts + cross-repo pm-skills-mcp). All three corrected below.

---

## 1. Verified target (from agentskills.io specification)

The agentskills.io spec (fetched 2026-05-19 from https://agentskills.io/specification) defines exactly these frontmatter fields:

| Field | Required | Spec constraint |
|---|---|---|
| `name` | Yes | Max 64 chars; lowercase + hyphens; matches dir name |
| `description` | Yes | Max 1024 chars; non-empty |
| `license` | No | License name or reference |
| `compatibility` | No | **STRING** max 500 chars; "Most skills do not need this field" |
| `metadata` | No | "Arbitrary key-value mapping for additional metadata" / "store additional properties not defined by the spec" |
| `allowed-tools` | No | Space-separated string; experimental |

The spec's own `metadata` example places `version` UNDER metadata:

```yaml
metadata:
  author: example-org
  version: "1.0"
```

**Conclusion:** `phase`, `classification`, `version`, `updated` are ALL proprietary fields not defined by the spec. Per spec intent, they belong under `metadata:`. The migration is spec-aligned.

**Compatibility decision (RESOLVED):** Do NOT add a `compatibility:` field. The spec says it is a string (not a list), it is optional, and "most skills do not need it." pm-skills' skills are portable markdown prompts with no special environment requirements. Adding unverified per-platform claims would violate the no-fabrication principle the skills themselves enforce.

---

## 2. Target schema (post-v2.17.0)

### Top-level (spec-recognized only)

| Field | Required | Notes |
|---|---|---|
| `name` | Yes | Unchanged; matches dir |
| `description` | Yes | Unchanged; 20-100 words per pm-skills convention (stricter than spec's 1024 chars) |
| `license` | Yes (pm-skills convention) | Unchanged; `Apache-2.0` |

### Under `metadata:` (proprietary)

| Field | Required | Notes |
|---|---|---|
| `metadata.version` | Yes | MOVED from top-level |
| `metadata.updated` | Yes | MOVED from top-level |
| `metadata.phase` | When phase skill | MOVED from top-level; one of discover/define/develop/deliver/measure/iterate |
| `metadata.classification` | When foundation/utility/tool | MOVED from top-level; one of foundation/utility/tool |
| `metadata.*` (existing) | preserved | category, frameworks, author, tool, move, family, timebox_minutes, roles, prerequisites, inputs, outputs, etc. - all preserved as-is |

### The phase-vs-classification asymmetry is PRESERVED

The current contract (verified in lint-skills-frontmatter.sh): phase skills carry `phase:` and NO `classification:`; foundation/utility/tool skills carry `classification:` and NO `phase:`. The migration preserves this exactly, just relocated under metadata. It does NOT normalize to "every skill has metadata.classification" (that would be a separate, larger change touching the validator's enum and all consumers; out of scope for W1).

### Before / after (phase skill - deliver-prd)

**BEFORE:**
```yaml
---
name: deliver-prd
description: Creates a comprehensive Product Requirements Document ...
phase: deliver
version: "2.0.0"
updated: 2026-01-26
license: Apache-2.0
metadata:
  category: specification
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
```

**AFTER:**
```yaml
---
name: deliver-prd
description: Creates a comprehensive Product Requirements Document ...
license: Apache-2.0
metadata:
  phase: deliver
  version: "2.0.0"
  updated: 2026-01-26
  category: specification
  frameworks: [triple-diamond, lean-startup, design-thinking]
  author: product-on-purpose
---
```

### Before / after (tool skill - flat structure preserved)

**BEFORE:**
```yaml
---
name: tool-foundation-sprint-basics
description: ...
classification: tool
version: "0.1.0"
updated: 2026-05-14
license: Apache-2.0
metadata:
  tool: foundation-sprint
  move: basics
  category: problem-framing
  frameworks: [foundation-sprint, click, character-note-and-vote]
  timebox_minutes: 105
  roles: [facilitator, decider, pm, customer-expert]
  prerequisites: [tool-foundation-sprint-brief]
  inputs: [...]
  outputs: [...]
  author: product-on-purpose
---
```

**AFTER:**
```yaml
---
name: tool-foundation-sprint-basics
description: ...
license: Apache-2.0
metadata:
  classification: tool
  version: "0.1.0"
  updated: 2026-05-14
  tool: foundation-sprint
  move: basics
  category: problem-framing
  frameworks: [foundation-sprint, click, character-note-and-vote]
  timebox_minutes: 105
  roles: [facilitator, decider, pm, customer-expert]
  prerequisites: [tool-foundation-sprint-brief]
  inputs: [...]
  outputs: [...]
  author: product-on-purpose
---
```

Note: `metadata.tool` and `metadata.move` are FLAT string values (not nested objects). Preserved as-is.

---

## 3. Current-state survey (verified 2026-05-19)

All 59 skills:
- 59 have top-level `version`, `updated`, `name`, `metadata`, `license`, `description`
- 33 have top-level `classification` (foundation 8 + utility 10 + tool 15)
- 26 have top-level `phase` (no classification)

So the migration touches all 59 files; the field set moved differs by skill type (phase skills move `phase`; others move `classification`; all move `version` + `updated`).

---

## 4. Consumer map (what reads top-level fields; what breaks)

### SAFE (structure-agnostic; no change needed)

| Consumer | Why safe |
|---|---|
| `scripts/check-frontmatter-yaml.mjs` | Only runs `yaml.load()` for parse-validity; field-agnostic |
| `scripts/check-no-body-h1.{sh,ps1}` | Reads title vs body-H1; doesn't read version/phase/classification |
| `scripts/check-internal-link-validity.{sh,ps1}` | Link checking; field-agnostic |

### BREAKS - must update to read `metadata.*`

| Consumer | Current read | Fix |
|---|---|---|
| `scripts/lint-skills-frontmatter.{sh,ps1}` | requires top-level version/updated/license; FORBIDS metadata.version; reads top-level phase/classification | Flip: require metadata.version/updated; require metadata.phase OR metadata.classification; keep top-level name/description/license; remove top-level version/phase/classification expectations |
| `scripts/generate-skill-pages.py` | `classify_skill()` reads `metadata["phase"]` (top-level via flattened parser) | Read nested `metadata["metadata"]["phase"]` and `["classification"]` |
| `scripts/generate-showcase.py` | likely reads phase/classification | Audit + update to nested |
| `scripts/build-release.{sh,ps1}` | reads top-level version | Read metadata.version |
| `scripts/validate-skills-manifest.{sh,ps1}` | skills-manifest.yaml version cross-check | Read metadata.version |
| `scripts/validate-skill-history.{sh,ps1}` | HISTORY.md version tooling | Read metadata.version |
| `scripts/validate-meeting-skills-family.{sh,ps1}` | reads classification/version | Read metadata.classification/version |
| `scripts/validate-foundation-sprint-skills-family.{sh,ps1}` | reads classification/version | Same |
| `scripts/validate-design-sprint-skills-family.{sh,ps1}` | reads classification/version | Same |
| `scripts/check-version-references.{sh,ps1}` | reads version | Read metadata.version |
| `scripts/inject-doc-titles.mjs` | reads frontmatter | Audit + update if reads moved fields |
| `pm-skills-mcp/scripts/embed-skills.js` (CROSS-REPO) | `frontmatter.phase`, `frontmatter.classification`, `frontmatter.version` (lines 126-129) | Read `frontmatter.metadata.phase/classification/version`; coordinate cross-repo per M-22 |

**~10 logical consumers (counting .sh+.ps1 pairs as one) + 1 cross-repo consumer.**

---

## 5. Execution plan (revised)

### Phase 1: Update lint-skills-frontmatter validator (0.5 day)

Add a migration-aware mode so the validator can verify BOTH old + new during transition:

1. Rewrite `lint-skills-frontmatter.sh` + `.ps1`:
   - Require top-level: `name`, `description`, `license`
   - Require `metadata.version` (currently FORBIDDEN; flip it)
   - Require `metadata.updated`
   - Require `metadata.phase` (one of 6 phases) OR `metadata.classification` (one of foundation/utility/tool), not both
   - Remove top-level version/updated/phase/classification expectations
   - Keep: name matches dir, description 20-100 words, description colon-quoting, TEMPLATE.md 3+ headers, references byte-0 checks, YAML parse-validity
2. Update `lint-skills-frontmatter.md` doc
3. Hand-craft 2 test skills in new structure; verify validator PASSES new + FAILS old

### Phase 2: Update all consumer scripts (1 day)

Update each BREAKS consumer (Section 4) to read `metadata.*`. Order:

1. Python generators (generate-skill-pages.py, generate-showcase.py) - update `classify_skill` + any version reads
2. Bash/pwsh validators (validate-skills-manifest, validate-skill-history, 3 family validators, check-version-references)
3. build-release.{sh,ps1}
4. inject-doc-titles.mjs (audit first)

After each, do NOT run against skills yet (skills still old-structure). Just verify the script's parse logic targets metadata.*.

### Phase 3: Migration script + sweep (0.5 day)

1. Write `scripts/migrate-skills-frontmatter.mjs` modeled on `sweep-frontmatter.mjs` (reuse: CRLF detection, fence detection, idempotency, deterministic transforms):
   - Parse frontmatter; detect top-level phase/classification/version/updated
   - Move them under metadata (insert at TOP of metadata block, before existing metadata keys)
   - Preserve all existing metadata sub-structure verbatim
   - Idempotent: skip if already migrated (no top-level version)
   - Log per-file
2. Preview on 2 skills (1 phase + 1 tool); manually verify
3. Run on all 59; spot-check 5-10 across classifications
4. Run `lint-skills-frontmatter` (new) - should PASS all 59
5. Run `check-frontmatter-yaml.mjs` - YAML parse-validity PASS

### Phase 4: Regenerate generated docs (0.5 day)

1. Run generate-skill-pages.py (now reading metadata.*) - regenerate docs/skills/
2. Run generate-showcase.py if applicable
3. Verify check-generated-content-untouched PASSES (or re-baseline if generated output legitimately changed)
4. Astro build locally - verify doc-stack builds

### Phase 5: pm-skills-mcp cross-repo update (parallel; 1-2 hours)

1. Update `pm-skills-mcp/scripts/embed-skills.js` lines 126-129 to read `frontmatter.metadata.phase/classification/version`
2. Add backward-compat: read metadata.* with fallback to top-level (handles transition window)
3. Schedule merge same-day as pm-skills v2.17.0 G3 tag (M-22 maintenance mode = flexible timing)

### Phase 6: Pre-tag validator bundle (0.5 day)

1. Run full `pre-tag-validate.{sh,ps1}` (with --skip check-count-consistency if README WIP still present, OR clean if README landed)
2. All validators PASS against new structure
3. Em-dash sweep, aggregate counters, cross-cutting audit

---

## 6. Acceptance criteria

### Functional
- [ ] All 59 SKILL.md files: top-level limited to name/description/license; version/updated/phase/classification under metadata
- [ ] lint-skills-frontmatter (new) PASSES all 59; REJECTS a hand-crafted old-structure skill
- [ ] All ~10 consumer scripts read metadata.* correctly
- [ ] generate-skill-pages.py produces correct phase-grouped pages from metadata.phase
- [ ] check-frontmatter-yaml.mjs PASSES (YAML parse-validity)
- [ ] Astro doc-stack builds cleanly
- [ ] check-internal-link-validity --strict PASSES
- [ ] pm-skills-mcp embed-skills.js reads new structure (cross-repo PR drafted)

### Spec compliance
- [ ] Top-level fields limited to spec-recognized: name, description, license (+ optional compatibility which we omit)
- [ ] All proprietary fields under metadata
- [ ] No compatibility: field added (per spec "most skills do not need it")
- [ ] Optionally: run `skills-ref validate` on a sample skill to confirm agentskills.io conformance

### No regression
- [ ] Aggregate counters unchanged (59 skills)
- [ ] All family contracts still validate
- [ ] skills-manifest.yaml still cross-checks

---

## 7. Risks (revised)

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| A consumer script missed in the map breaks silently | Medium | High | Section 4 map is from a grep sweep; G1 adversarial review re-greps; CI catches most |
| pm-skills-mcp breaks until cross-repo PR merges | High | Medium | Add top-level fallback in embed-skills.js for transition window; M-22 flexible timing |
| generate-skill-pages.py regeneration changes generated output, tripping check-generated-content-untouched | High | Medium | Expected; re-baseline the generated fingerprint as part of W1 (the generated CONTENT shouldn't change, only the source-read path) |
| Migration script malforms YAML on edge-case skill | Medium | High | Model on proven sweep-frontmatter.mjs; preview on 2; lint + yaml-parse catches; spot-check 5-10 |
| skills-ref validate still rejects something we missed | Low | Medium | Run skills-ref on a sample post-migration to confirm |
| README WIP check-count-consistency still failing during W1 dev | High | Low | --skip documented (same as v2.16.2); resolves when README lands |

---

## 8. Rollback

Migration script is idempotent + reversible. Write `--reverse` mode that moves metadata.version/updated/phase/classification back to top-level. If a critical consumer breaks post-tag, ship v2.17.1 with reversed migration + consumer fix.

---

## 9. Cross-references

- Parent plan: [`plan_v2.17.0.md`](plan_v2.17.0.md)
- Companion spec (W2): [`spec_agents-directory-rename.md`](spec_agents-directory-rename.md)
- agentskills.io spec (verified 2026-05-19): https://agentskills.io/specification
- Migration script model: `scripts/sweep-frontmatter.mjs` (W3.5 byte-0 sweep; reuse fence/CRLF/idempotency patterns)
- Memory rule: `feedback_yaml-parse-validity-in-sweeps` (parse-validity checks must accompany structural placement checks)
- Cross-repo consumer: `pm-skills-mcp/scripts/embed-skills.js` (M-22 maintenance mode; coordinate timing)

---

## 10. Change log

| Date | Author | Change |
|---|---|---|
| 2026-05-19 (initial) | claude-opus-4.7 | Initial spec from roadmap R-05 |
| 2026-05-19 (revised) | claude-opus-4.7 | Rewrote after agentskills.io spec fetch + consumer mapping. Corrected: compatibility (string not list; omit entirely); tool metadata (flat not nested); blast radius (~10 consumers + cross-repo MCP, not 59 files + 1 validator); effort (2-3 days not 1-2). Added verified consumer map (SAFE vs BREAKS), 6-phase execution plan, per-consumer fix table. |
