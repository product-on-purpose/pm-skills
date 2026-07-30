import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

// Pattern S: rendered content lives in site/src/content/docs/ and is read by the
// stock Starlight docsLoader() (no arguments). Reference pages (skills, workflows,
// showcase, commands, the library samples) are emitted by scripts/gen-site.mjs into
// this tree and are gitignored-and-rebuilt; narrative pages are hand-authored here.
//
// The schema extends Starlight's docsSchema() with the optional pm-skills frontmatter
// fields the generator and the samples emit (all optional), so generated and
// hand-authored frontmatter validate identically.
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
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
        // `draft` is deliberately NOT listed here. Starlight's docsSchema() already
        // defines `draft: z.boolean().default(false)`, and re-declaring it in extend
        // as `.optional()` shadows that default. Starlight 0.41.4+ fixed extend
        // merging so the shadow actually wins: every page without explicit `draft:`
        // frontmatter then gets `undefined`, the production route filter
        // (`data.draft === false`) drops ALL entries, and the build dies on the
        // first sidebar slug lookup ("The slug `changelog` does not exist" with
        // routes.length=0). Do not re-declare built-in docsSchema fields in extend;
        // pages using `draft: true` (tags.md) validate against the built-in field.
        // Sample-specific fields
        artifact: z.string().optional(),
        repo_version: z.string().or(z.number()).optional(),
        skill_version: z.string().or(z.number()).optional(),
        created: z.string().or(z.date()).optional(),
        status: z.string().optional(),
        thread: z.string().optional(),
        context: z.string().optional(),
      }),
    }),
  }),
};
