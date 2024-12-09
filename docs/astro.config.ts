// @ts-check
import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import starlightSidebarTopics from 'starlight-sidebar-topics'

export default defineConfig({
  integrations: [
    starlight({
      customCss: ['./src/styles/custom.css'],
      editLink: {
        baseUrl: 'https://github.com/HiDeoo/starlight-sidebar-topics/edit/main/docs/',
      },
      plugins: [
        starlightSidebarTopics([
          {
            label: 'Documentation',
            link: '/docs/getting-started/',
            icon: 'open-book',
            items: [
              { label: 'Start Here', items: ['docs/getting-started', 'docs/configuration'] },
              { label: 'Guides', autogenerate: { directory: 'docs/guides' } },
              { label: 'Resources', items: ['docs/resources/starlight'] },
            ],
          },
          {
            id: 'demo',
            label: {
              en: 'Demo',
              fr: 'Démo',
            },
            link: '/demo/',
            icon: 'puzzle',
            items: [
              { label: 'API', autogenerate: { directory: 'demo/api' } },
              { label: 'Components', autogenerate: { directory: 'demo/components' } },
              { label: 'Commands', autogenerate: { directory: 'demo/commands' }, collapsed: true },
            ],
            badge: {
              text: {
                en: 'Stub',
                fr: 'Ébauche',
              },
              variant: 'caution',
            },
          },
          {
            label: 'Starlight Docs',
            link: 'https://starlight.astro.build/',
            icon: 'starlight',
          },
        ]),
      ],
      social: {
        blueSky: 'https://bsky.app/profile/hideoo.dev',
        github: 'https://github.com/HiDeoo/starlight-sidebar-topics',
      },
      title: 'Starlight Sidebar Topics',
      locales:
        process.env['NODE_ENV'] === 'test'
          ? {
              root: { label: 'English', lang: 'en' },
              fr: { label: 'Français', lang: 'fr' },
            }
          : undefined,
    }),
  ],
  site: 'https://starlight-sidebar-topics.netlify.app',
})
