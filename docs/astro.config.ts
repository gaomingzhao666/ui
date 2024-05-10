import starlight from '@astrojs/starlight'
import fullui from '@fullui/ui/integration'
// @ts-ignore
import liveCode from 'astro-live-code'
import { defineConfig } from 'astro/config'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
  site: 'https://fullui.dev',
  integrations: [
    starlight({
      title: 'Fullui',
      // logo: {
      //   src: './src/assets/logo.png',
      //   alt: 'Logo Fullui',
      //   replacesTitle: true,
      // },
      social: {
        github: 'https://github.com/fullui/ui',
        linkedin: 'https://www.linkedin.com/in/silveltman/',
      },
      favicon: './favicon.png',
      customCss: ['./src/css/custom.css', '@fullui/ui/css'],
      components: {
        // Relative path to the custom component.
        Head: './src/components/Head.astro',
        // Header: './src/components/Header.astro',
      },
      sidebar: [
        {
          label: 'Overview',
          autogenerate: {
            directory: 'overview',
          },
        },
        {
          label: 'Theme',
          autogenerate: {
            directory: 'theme',
          },
        },
        {
          label: 'Base',
          autogenerate: {
            directory: 'base',
          },
        },
        {
          label: 'Typography',
          autogenerate: {
            directory: 'typography',
          },
        },
        {
          label: 'Layout',
          autogenerate: {
            directory: 'layout',
          },
        },
        {
          label: 'Utility',
          autogenerate: {
            directory: 'utility',
          },
        },
      ],
    }),
    fullui({
      color: {
        base: 'slate',
        accent: 'indigo',
      },
      font: {
        heading: 'IMB Plex Sans:700',
        subheading: 'IMB Plex Sans:700',
        text: 'IMB Plex Sans:400',
        tagline: 'IMB Plex Sans:400',
        button: 'IMB Plex Sans:500',
      },
    }),
    liveCode({
      layout: '/src/components/LiveCodeLayout.astro',
    }),
    sitemap(),
  ],
  redirects: {
    '/': '/',
  },
})
