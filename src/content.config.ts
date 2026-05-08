import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// W2 (D2 Option B): in-place mount of the existing docs/ tree at repo root.
// Contributors keep editing docs/ directly; no file copying.
//
// Exclusions:
//   - internal/**: gitignored release-plans, working notes, audits (production exemption)
//   - templates/**: skill-template SKILL.md uses `<placeholder>` syntax that YAML-parses as a nested mapping (per spike Caveat 3)
//
// The schema extends Starlight's docsSchema() with pm-skills custom frontmatter fields,
// all optional. Pattern 5C `generated:` and `source:` fields are preserved through the
// generator output untouched.

export const collections = {
  docs: defineCollection({
    loader: glob({
      pattern: ['**/*.{md,mdx}', '!internal/**', '!templates/**'],
      base: './docs',
    }),
    schema: docsSchema({
      extend: z.object({
        generated: z.boolean().optional(),
        source: z.string().optional(),
        phase: z.string().optional(),
        classification: z.string().optional(),
        version: z.string().optional(),
        updated: z.string().optional(),
        license: z.string().optional(),
        metadata: z.record(z.unknown()).optional(),
        tags: z.array(z.string()).optional(),
        date: z.string().optional(),
        draft: z.boolean().optional(),
      }),
    }),
  }),
};
