import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';

// W1 scaffold. Production configuration filled in across W2-W11:
//   W2: content collection loader pointing in-place at docs/
//   W4: sidebar (Option C hybrid: manual top-level, autogenerate within)
//   W5: customCss reference
//   W6: Mermaid integration (D4: lazy-load with code-split fallback) - DONE
//   W9: redirects: from mkdocs.yml redirect_maps
//   W11: site + base verified against gh-pages deploy

export default defineConfig({
  site: 'https://product-on-purpose.github.io',
  base: '/pm-skills',
  integrations: [
    // W6 (D4): astro-mermaid renders client-side per-page (only loads the
    // mermaid bundle on pages that contain code blocks). MUST come BEFORE
    // starlight per the integration-order rule in astro-mermaid README.
    // autoTheme follows site theme (Starlight light/dark).
    mermaid({
      theme: 'default',
      autoTheme: true,
    }),
    starlight({
      title: 'pm-skills',
      description: 'PM skills for AI agents',
      editLink: {
        baseUrl: 'https://github.com/product-on-purpose/pm-skills/edit/main/',
      },
      // W5 (Custom CSS port): minimal port; only .mermaid keeps. See
      // src/styles/custom.css for rationale + retired-selector inventory.
      customCss: ['./src/styles/custom.css'],
      // W4 (D3 Option C): manual top-level section ordering and labels;
      // autogenerate within sections. Order mirrors mkdocs.yml nav top level.
      // Per-section label drift handled via frontmatter sidebar.label overrides
      // (see docs/reference/README.md for the canonical example).
      // Per Q1-A: Changelog and Tags are top-level sidebar entries (Starlight
      // convention), not nested under a Home group. Homepage reachable via logo.
      //
      // IMPORTANT: autogenerate directory paths are PREFIXED WITH 'docs/'.
      // This is a D2-Option-B consequence: our custom glob loader (src/content.config.ts)
      // mounts ./docs in-place; entry.filePath retains the 'docs/' prefix.
      // Starlight's autogenerate logic in node_modules/@astrojs/starlight/utils/navigation.ts
      // tries to strip the path src/content/docs/ from filePaths to compute "directory"
      // matches, but for our entries the strip is a no-op. So we match on the actual
      // filePath structure: docs/<section>. Do not "fix" these prefixes.
      // Tracked at collection.ts: "We still rely on the content collection folder
      // structure to be fixed for now" (Starlight upstream limitation).
      sidebar: [
        { slug: 'changelog' },
        { slug: 'tags' },
        {
          label: 'Getting Started',
          autogenerate: { directory: 'docs/getting-started' },
        },
        {
          // Skills section: manual phase ordering (Triple Diamond) and
          // capitalized labels. Phase index.md files are generator output
          // (scripts/generate-skill-pages.py) so adding sidebar frontmatter
          // there would be overwritten on regen. Within each phase,
          // autogenerate handles the skill leaves.
          label: 'Skills',
          items: [
            // Skills section overview (slug refs use post-base path; no 'docs/' prefix here)
            'skills',
            {
              label: 'Discover',
              autogenerate: { directory: 'docs/skills/discover' },
            },
            {
              label: 'Define',
              autogenerate: { directory: 'docs/skills/define' },
            },
            {
              label: 'Develop',
              autogenerate: { directory: 'docs/skills/develop' },
            },
            {
              label: 'Deliver',
              autogenerate: { directory: 'docs/skills/deliver' },
            },
            {
              label: 'Measure',
              autogenerate: { directory: 'docs/skills/measure' },
            },
            {
              label: 'Iterate',
              autogenerate: { directory: 'docs/skills/iterate' },
            },
            {
              label: 'Foundation',
              autogenerate: { directory: 'docs/skills/foundation' },
            },
            {
              label: 'Utility',
              autogenerate: { directory: 'docs/skills/utility' },
            },
          ],
        },
        {
          label: 'Workflows',
          autogenerate: { directory: 'docs/workflows' },
        },
        {
          label: 'Guides',
          autogenerate: { directory: 'docs/guides' },
        },
        {
          label: 'Concepts',
          autogenerate: { directory: 'docs/concepts' },
        },
        {
          label: 'Showcase',
          autogenerate: { directory: 'docs/showcase' },
        },
        {
          label: 'Reference',
          autogenerate: { directory: 'docs/reference' },
        },
        {
          label: 'Contributing',
          autogenerate: { directory: 'docs/contributing' },
        },
        {
          label: 'Releases',
          autogenerate: { directory: 'docs/releases' },
        },
      ],
    }),
  ],
});
