import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// W1 scaffold. Production configuration filled in across W2-W11:
//   W2: content collection loader pointing in-place at docs/
//   W4: sidebar (Option C hybrid: manual top-level, autogenerate within)
//   W5: customCss reference
//   W6: Mermaid integration (D4: lazy-load with code-split fallback)
//   W9: redirects: from mkdocs.yml redirect_maps
//   W11: site + base verified against gh-pages deploy

export default defineConfig({
  site: 'https://product-on-purpose.github.io',
  base: '/pm-skills',
  integrations: [
    starlight({
      title: 'pm-skills',
      description: 'PM skills for AI agents',
      editLink: {
        baseUrl: 'https://github.com/product-on-purpose/pm-skills/edit/main/',
      },
      sidebar: [],
    }),
  ],
});
