import type { ViteUserConfig } from 'astro'

import type {
  StarlightSidebarTopicsConfig,
  StarlightSidebarTopicsOptions,
  StarlightSidebarTopicsSharedConfig,
} from './config'

export function vitePluginStarlightSidebarTopics(
  config: StarlightSidebarTopicsConfig,
  options: StarlightSidebarTopicsOptions,
): VitePlugin {
  const sharedConfig: StarlightSidebarTopicsSharedConfig = config.map((topic) => {
    if (!('items' in topic)) return { ...topic, type: 'link' }
    const { items, ...topicWithoutItems } = topic
    return { ...topicWithoutItems, type: 'group' }
  })

  const modules = {
    'virtual:starlight-sidebar-topics/config': `export default ${JSON.stringify(sharedConfig)}`,
    'virtual:starlight-sidebar-topics/options': `export default ${JSON.stringify(options)}`,
  }

  const moduleResolutionMap = Object.fromEntries(
    (Object.keys(modules) as (keyof typeof modules)[]).map((key) => [resolveVirtualModuleId(key), key]),
  )

  return {
    name: 'vite-plugin-starlight-sidebar-topics',
    load(id) {
      const moduleId = moduleResolutionMap[id]
      return moduleId ? modules[moduleId] : undefined
    },
    resolveId(id) {
      return id in modules ? resolveVirtualModuleId(id) : undefined
    },
  }
}

function resolveVirtualModuleId<TModuleId extends string>(id: TModuleId): `\0${TModuleId}` {
  return `\0${id}`
}

type VitePlugin = NonNullable<ViteUserConfig['plugins']>[number]
