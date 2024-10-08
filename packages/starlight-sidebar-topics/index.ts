import type { StarlightPlugin, StarlightUserConfig } from '@astrojs/starlight/types'

import { StarlightSidebarTopicsConfigSchema, type StarlightSidebarTopicsUserConfig } from './libs/config'
import { overrideStarlightComponent, throwPluginError } from './libs/plugin'
import { vitePluginStarlightSidebarTopics } from './libs/vite'

export type { StarlightSidebarTopicsConfig, StarlightSidebarTopicsUserConfig } from './libs/config'

export default function starlightSidebarTopicsPlugin(userConfig: StarlightSidebarTopicsUserConfig): StarlightPlugin {
  const parsedConfig = StarlightSidebarTopicsConfigSchema.safeParse(userConfig)

  if (!parsedConfig.success) {
    throwPluginError(
      `The provided plugin configuration is invalid.\n${parsedConfig.error.issues.map((issue) => issue.message).join('\n')}`,
    )
  }

  const config = parsedConfig.data

  return {
    name: 'starlight-sidebar-topics-plugin',
    hooks: {
      setup({ addIntegration, command, config: starlightConfig, logger, updateConfig }) {
        if (command !== 'dev' && command !== 'build') return

        if (starlightConfig.sidebar) {
          // TODO(HiDeoo)
          throwPluginError(`Move sidebar config`)
        }

        const sidebar: StarlightUserConfig['sidebar'] = []

        for (const [index, topic] of config.entries()) {
          if ('items' in topic) {
            sidebar.push({ label: String(index), items: topic.items })
          }
        }
        updateConfig({
          components: {
            ...starlightConfig.components,
            ...overrideStarlightComponent(starlightConfig.components, logger, 'Sidebar'),
            ...overrideStarlightComponent(starlightConfig.components, logger, 'Pagination'),
          },
          sidebar,
        })

        addIntegration({
          name: 'starlight-sidebar-topics-integration',
          hooks: {
            'astro:config:setup': ({ updateConfig }) => {
              updateConfig({ vite: { plugins: [vitePluginStarlightSidebarTopics(config)] } })
            },
          },
        })
      },
    },
  }
}
