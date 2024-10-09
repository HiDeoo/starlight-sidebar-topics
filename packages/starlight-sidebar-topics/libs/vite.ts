import type { ViteUserConfig } from 'astro'

import type { StarlightSidebarTopicsConfig, StarlightSidebarTopicsSharedConfig } from './config'

const moduleId = 'virtual:starlight-sidebar-topics/config'

export function vitePluginStarlightSidebarTopics(config: StarlightSidebarTopicsConfig): VitePlugin {
  const resolvedModuleId = `\0${moduleId}`

  const sharedConfig: StarlightSidebarTopicsSharedConfig = config.map((topic) => {
    if (!('items' in topic)) return { ...topic, type: 'link' }
    const { items, ...topicWithoutItems } = topic
    return { ...topicWithoutItems, type: 'group' }
  })

  const moduleContent = `export default ${JSON.stringify(sharedConfig)}`

  return {
    name: 'vite-plugin-starlight-sidebar-topics',
    load(id) {
      return id === resolvedModuleId ? moduleContent : undefined
    },
    resolveId(id) {
      return id === moduleId ? resolvedModuleId : undefined
    },
  }
}

type VitePlugin = NonNullable<ViteUserConfig['plugins']>[number]
