import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// W2 (D2 Option B): in-place mount of the existing docs/ tree at repo root.
// Contributors keep editing docs/ directly; no file copying.
//
// W7 (Library samples mount): library/skill-output-samples/sample_*.md files
// added to the same docs collection. Legacy/orbit thread samples (26 files
// missing title/description from W3.5 sweep) excluded via filename pattern
// per maintainer Path B decision 2026-05-09.
//
// Exclusions:
//   - internal/**: gitignored release-plans, working notes, audits (production exemption)
//   - templates/**: skill-template SKILL.md uses `<placeholder>` syntax that YAML-parses as a nested mapping (per spike Caveat 3)
//   - workflows/README.md: contributor-facing meta-doc for the _workflows/ source folder (the canonical user-facing page is workflows/index.md, generated from the same source); previously excluded via mkdocs.yml exclude_docs (W4 surfaced; was missing from W2)
//   - reference/README.md: short GitHub-directory landing page for docs/reference/; the canonical user-facing page is reference/index.md (W13 B2.5 fix; resolves /reference/ 404 from W13 visual smoke)
//   - sample_*_legacy_*.md and sample_*_orbit_*.md: 26 W3.5-excluded library samples missing schema fields (per Path B decision)
//
// Schema extends Starlight's docsSchema() with pm-skills custom frontmatter fields
// for both docs/ and library samples (all optional). Pattern 5C `generated:` and
// `source:` fields are preserved through the generator output untouched.

export const collections = {
  docs: defineCollection({
    loader: glob({
      pattern: [
        'docs/**/*.{md,mdx}',
        '!docs/internal/**',
        '!docs/templates/**',
        '!docs/workflows/README.md',
        '!docs/reference/README.md',
        'library/skill-output-samples/**/sample_*.md',
        '!library/skill-output-samples/**/sample_*_legacy_*.md',
        '!library/skill-output-samples/**/sample_*_orbit_*.md',
      ],
      base: '.',
      // W7: strip path prefixes so slugs are clean.
      // - docs/foo/bar.md becomes slug 'foo/bar'
      // - docs/skills/index.md becomes slug 'skills' (index files become section root)
      // - library/skill-output-samples/define-hypothesis/sample_X.md becomes slug 'samples/define-hypothesis/sample_X'
      generateId: ({ entry }) => {
        let noExt = entry.replace(/\.(md|mdx)$/, '');
        if (noExt.startsWith('docs/')) noExt = noExt.slice('docs/'.length);
        else if (noExt.startsWith('library/skill-output-samples/')) {
          noExt = 'samples/' + noExt.slice('library/skill-output-samples/'.length);
        }
        // Convert nested index files to their directory's slug (Astro convention).
        // Root 'index' kept as-is (Starlight maps slug 'index' to / homepage).
        if (noExt.endsWith('/index')) return noExt.slice(0, -'/index'.length);
        // Astro's default behavior lowercases README to readme; mirror that
        // for consistency (avoids case-conflict with directory/index pages).
        if (noExt.endsWith('/README')) noExt = noExt.slice(0, -'/README'.length) + '/readme';
        return noExt;
      },
    }),
    schema: docsSchema({
      extend: z.object({
        // Common pm-skills fields (used by docs and samples)
        generated: z.boolean().optional(),
        source: z.string().optional(),
        phase: z.string().optional(),
        classification: z.string().optional(),
        // YAML parses bare semver-like values (1.0, 2.11.0) as numbers; accept both
        version: z.string().or(z.number()).optional(),
        // YAML may parse date-like values as Date objects; accept both
        updated: z.string().or(z.date()).optional(),
        license: z.string().optional(),
        metadata: z.record(z.unknown()).optional(),
        tags: z.array(z.string()).optional(),
        date: z.string().or(z.date()).optional(),
        draft: z.boolean().optional(),
        // Sample-specific fields (W7)
        artifact: z.string().optional(),
        repo_version: z.string().or(z.number()).optional(),
        skill_version: z.string().or(z.number()).optional(),
        // YAML parses 2026-02-20 as Date; accept both string and Date
        created: z.string().or(z.date()).optional(),
        status: z.string().optional(),
        thread: z.string().optional(),
        context: z.string().optional(),
      }),
    }),
  }),
};
