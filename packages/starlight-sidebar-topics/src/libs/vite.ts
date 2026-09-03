import type { AstroConfig, ViteUserConfig } from 'astro'

import type {
  StarlightSidebarTopicsConfig,
  StarlightSidebarTopicsOptions,
  StarlightSidebarTopicsSharedConfig,
} from './config'

export function vitePluginStarlightSidebarTopics(
  config: StarlightSidebarTopicsConfig,
  options: StarlightSidebarTopicsOptions,
  i18nConfig: AstroConfig['i18n'],
): VitePlugin {
  const sharedConfig: StarlightSidebarTopicsSharedConfig = config.map((topic) => {
    if (!('items' in topic)) return { ...topic, type: 'link' }
    const { items, ...topicWithoutItems } = topic
    return { ...topicWithoutItems, type: 'group' }
  })

  const context = getContext(i18nConfig)

  const modules = {
    'virtual:starlight-sidebar-topics/config': `export default ${JSON.stringify(sharedConfig)}`,
    'virtual:starlight-sidebar-topics/context': `export default ${JSON.stringify(context)}`,
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

function getContext(i18nConfig: AstroConfig['i18n']): StarlightSidebarTopicsContext {
  if (!i18nConfig) return { defaultLang: 'en', locales: [] }

  const defaultLocale = i18nConfig.locales.find(
    (locale) => (typeof locale === 'string' ? locale : locale.path) === i18nConfig.defaultLocale,
  )
  const prefixDefaultLocale = i18nConfig.routing !== 'manual' && i18nConfig.routing.prefixDefaultLocale

  return {
    defaultLang:
      typeof defaultLocale === 'string' ? defaultLocale : (defaultLocale?.codes[0] ?? i18nConfig.defaultLocale),
    locales: i18nConfig.locales
      .map((locale) => (typeof locale === 'string' ? locale : locale.path))
      .filter((locale) => prefixDefaultLocale || locale !== i18nConfig.defaultLocale),
  }
}

function resolveVirtualModuleId<TModuleId extends string>(id: TModuleId): `\0${TModuleId}` {
  return `\0${id}`
}

export interface StarlightSidebarTopicsContext {
  defaultLang: string
  locales: string[]
}

type VitePlugin = NonNullable<ViteUserConfig['plugins']>[number]
