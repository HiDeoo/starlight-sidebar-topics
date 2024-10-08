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
            label: 'test 0',
            link: '',
          },
          {
            label: 'test 1',
            items: [{ slug: '', label: 'test 1 link' }],
          },
          {
            label: 'test 2',
            items: [{ link: '#', label: 'test 2 link' }],
          },
        ]),
      ],
      // // FIXME(HiDeoo)
      // TODO(HiDeoo) use `slug`s
      // sidebar: [
      //   {
      //     label: 'Start Here',
      //     items: [
      //       { label: 'Getting Started', link: '/getting-started/' },
      //       { label: 'Configuration', link: '/configuration/' },
      //     ],
      //   },
      //   {
      //     label: 'Guides',
      //     items: [
      //       { label: 'Frontmatter', link: '/guides/frontmatter/' },
      //       { label: 'Authors', link: '/guides/authors/' },
      //       { label: 'RSS', link: '/guides/rss/' },
      //     ],
      //   },
      //   {
      //     label: 'Resources',
      //     items: [
      //       { label: 'Showcase', link: '/resources/showcase/' },
      //       { label: 'Plugins and Tools', link: '/resources/starlight/' },
      //     ],
      //   },
      //   { label: 'Demo', link: '/blog/' },
      // ],
      social: {
        github: 'https://github.com/HiDeoo/starlight-sidebar-topics',
      },
      title: 'Starlight Sidebar Topics',
    }),
  ],
  site: 'https://starlight-sidebar-topics.vercel.app',
})