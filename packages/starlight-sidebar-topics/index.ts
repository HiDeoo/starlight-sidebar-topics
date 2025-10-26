/// <reference path="./locals.d.ts" />

import type { StarlightPlugin, StarlightUserConfig } from '@astrojs/starlight/types'

import {
  StarlightSidebarTopicsConfigSchema,
  StarlightSidebarTopicsOptionsSchema,
  type StarlightSidebarTopicsUserConfig,
  type StarlightSidebarTopicsUserOptions,
} from './libs/config'
import { throwPluginError } from './libs/plugin'
import { vitePluginStarlightSidebarTopics } from './libs/vite'

// Process topic items to handle auto-sidebar
async function processTopicItems(items: any[]): Promise<any[]> {
  const processedItems: any[] = []
  
  for (const item of items) {
    if (typeof item === 'object' && 'autogenerate' in item) {
      // Keep autogenerate structure for validation and allow middleware to process it
      processedItems.push(item)
    } else {
      processedItems.push(item)
    }
  }
  
  return processedItems
}

export type {
  StarlightSidebarTopicsConfig,
  StarlightSidebarTopicsUserConfig,
  StarlightSidebarTopicsOptions,
  StarlightSidebarTopicsUserOptions,
} from './libs/config'

export default function starlightSidebarTopicsPlugin(
  userConfig: StarlightSidebarTopicsUserConfig,
  userOptions?: StarlightSidebarTopicsUserOptions,
): StarlightPlugin {
  const parsedConfig = StarlightSidebarTopicsConfigSchema.safeParse(userConfig)

  if (!parsedConfig.success) {
    throwPluginError(
      `The provided plugin configuration is invalid.\n${parsedConfig.error.issues.map((issue) => issue.message).join('\n')}`,
    )
  }

  const parsedOptions = StarlightSidebarTopicsOptionsSchema.safeParse(userOptions)

  if (!parsedOptions.success) {
    throwPluginError(
      `The provided plugin options are invalid.\n${parsedOptions.error.issues.map((issue) => issue.message).join('\n')}`,
    )
  }

  const config = parsedConfig.data
  const options = parsedOptions.data

  return {
    name: 'starlight-sidebar-topics',
    hooks: {
      'config:setup': async ({ addIntegration, addRouteMiddleware, command, config: starlightConfig, updateConfig }) => {
        if (command !== 'dev' && command !== 'build') return

        if (starlightConfig.sidebar) {
          throwPluginError(
            'It looks like you have a `sidebar` configured in your Starlight configuration. To use `starlight-sidebar-topics`, create a new topic with your sidebar items.',
            'Learn more about topic configuration at https://starlight-sidebar-topics.netlify.app/docs/configuration/',
          )
        }
        
        // Use middleware to handle auto-sidebar functionality
        addRouteMiddleware({ entrypoint: 'starlight-sidebar-topics/libs/middlewareAutoSidebar', order: 'pre' })

        const sidebar: StarlightUserConfig['sidebar'] = []

        for (const [index, topic] of config.entries()) {
          if ('items' in topic) {
            // Process auto-sidebar items
            const processedItems = await processTopicItems(topic.items)
            sidebar.push({ label: String(index), items: processedItems })
          }
        }
        updateConfig({
          components: {
            Sidebar: `starlight-sidebar-topics/overrides/Sidebar.astro`,
            ...starlightConfig.components,
          },
          sidebar,
        })

        addIntegration({
          name: 'starlight-sidebar-topics-integration',
          hooks: {
            'astro:config:setup': ({ updateConfig }) => {
              updateConfig({ vite: { plugins: [vitePluginStarlightSidebarTopics(config, options)] } })
            },
          },
        })
      },
    },
  }
}
