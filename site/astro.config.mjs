import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import mermaid from 'astro-mermaid';
import remarkResolveLinks from '../scripts/remark-resolve-links.mjs';
import { BASE } from '../scripts/site-base.mjs';

// The published base path (the GitHub Pages project subpath) is the single source
// of truth in scripts/site-base.mjs. Used here for `base`, the base-derived
// redirect destinations, and the remark link resolver; also imported by
// scripts/check-rendered-links.mjs so the build and the link check can never
// disagree. The base MUST NOT be hardcoded a second time anywhere (family Astro
// site standard 14.7).

export default defineConfig({
  site: 'https://product-on-purpose.github.io',
  base: BASE,

  // Resolve relative .md links to Starlight slug URLs at build time (an mdast
  // transform). Replaces the retired post-build HTML rewriter; it runs because the
  // stock docsLoader uses Astro's standard markdown pipeline (the previous custom
  // glob loader prevented remark plugins from firing). See
  // scripts/remark-resolve-links.mjs; scripts/check-rendered-links.mjs is the gate.
  markdown: {
    remarkPlugins: [[remarkResolveLinks, { base: BASE }]],
  },

  // Port of mkdocs.yml redirect_maps. Destinations include the base path because
  // Astro does NOT auto-prepend `base` to redirect destinations (verified in dist
  // output); without it the meta-refresh lands at the bare github.io domain, a
  // "Site not found". Sources stay base-relative (Astro's redirect-source side IS
  // base-aware). Destinations derive from BASE so the base stays single-sourced.
  redirects: {
    '/bundles/': `${BASE}/workflows/`,
    '/bundles/feature-kickoff/': `${BASE}/workflows/feature-kickoff/`,
    '/bundles/lean-startup/': `${BASE}/workflows/lean-startup/`,
    '/bundles/triple-diamond/': `${BASE}/workflows/triple-diamond/`,
    '/concepts/triple-diamond/': `${BASE}/concepts/triple-diamond-delivery-process/`,
    '/concepts/versioning/': `${BASE}/reference/pm-skill-versioning/`,
    '/concepts/comparisons/': `${BASE}/guides/pm-skill-comparisons/`,
    '/concepts/skill-anatomy/': `${BASE}/reference/pm-skill-anatomy/`,
    '/concepts/skill-lifecycle/': `${BASE}/guides/pm-skill-lifecycle/`,
    '/guides/creating-skills/': `${BASE}/guides/creating-pm-skills/`,
    '/guides/authoring-pm-skills/': `${BASE}/guides/creating-pm-skills/`,
    '/guides/mcp-setup/': `${BASE}/guides/mcp-integration/`,
  },
  integrations: [
    // astro-mermaid MUST come before starlight (integration-order rule). Client-side
    // render; only loads the mermaid bundle on pages that contain diagrams. autoTheme
    // follows Starlight light/dark. Brand line color #5C7CFA + system-ui font.
    mermaid({
      theme: 'default',
      autoTheme: true,
      mermaidConfig: {
        themeVariables: {
          lineColor: '#5C7CFA',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
          fontSize: '14px',
        },
      },
    }),
    starlight({
      title: 'pm-skills',
      description: 'PM skills for AI agents',
      editLink: {
        // Content lives at site/src/content/docs/. Starlight builds the edit URL as
        // baseUrl + the file path relative to the Astro project root (site/), so the
        // baseUrl carries the /site/ segment to reach the real repo path. Generated
        // pages (gitignored, rebuilt) point at their on-disk path; edit the source
        // (skills/, _workflows/, library/) and regenerate rather than the output.
        baseUrl: 'https://github.com/product-on-purpose/pm-skills/edit/main/site/',
      },
      customCss: ['./src/styles/custom.css'],
      // Manual top-level section ordering; autogenerate within each section. Directory
      // paths are plain content slugs (no 'docs/' prefix): the stock docsLoader mounts
      // site/src/content/docs/ directly (Pattern S). The 'tool' skill group renders
      // but is intentionally absent from the sidebar (preserved from prior behavior).
      sidebar: [
        { slug: 'changelog' },
        {
          label: 'Getting Started',
          items: [{ autogenerate: { directory: 'getting-started' } }],
        },
        {
          label: 'Skills',
          items: [
            'skills',
            { label: 'Discover', items: [{ autogenerate: { directory: 'skills/discover' } }] },
            { label: 'Define', items: [{ autogenerate: { directory: 'skills/define' } }] },
            { label: 'Develop', items: [{ autogenerate: { directory: 'skills/develop' } }] },
            { label: 'Deliver', items: [{ autogenerate: { directory: 'skills/deliver' } }] },
            { label: 'Measure', items: [{ autogenerate: { directory: 'skills/measure' } }] },
            { label: 'Iterate', items: [{ autogenerate: { directory: 'skills/iterate' } }] },
            { label: 'Foundation', items: [{ autogenerate: { directory: 'skills/foundation' } }] },
            { label: 'Utility', items: [{ autogenerate: { directory: 'skills/utility' } }] },
          ],
        },
        { label: 'Workflows', items: [{ autogenerate: { directory: 'workflows' } }] },
        { label: 'Guides', items: [{ autogenerate: { directory: 'guides' } }] },
        { label: 'Concepts', items: [{ autogenerate: { directory: 'concepts' } }] },
        { label: 'Showcase', items: [{ autogenerate: { directory: 'showcase' } }] },
        { label: 'Reference', items: [{ autogenerate: { directory: 'reference' } }] },
        { label: 'Contributing', items: [{ autogenerate: { directory: 'contributing' } }] },
        { label: 'Releases', items: [{ autogenerate: { directory: 'releases' } }] },
        {
          // Library samples mounted under /samples/. Collapsed by default (each sample
          // is a leaf within a per-skill subgroup). The samples/index.md overview is
          // the section root; the per-skill subdirs are generated.
          label: 'Samples',
          collapsed: true,
          items: [{ autogenerate: { directory: 'samples', collapsed: true } }],
        },
      ],
    }),
  ],
});
