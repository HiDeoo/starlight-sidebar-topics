import type { Props } from '@astrojs/starlight/props'
import type { StarlightUserConfig } from '@astrojs/starlight/types'

import type { StarlightSidebarTopicsConfig, StarlightSidebarTopicsSharedConfig } from './config'

export function getSidebarUserConfig(config: StarlightSidebarTopicsConfig) {
  const sidebar: StarlightUserConfig['sidebar'] = []

  for (const [index, topic] of config.entries()) {
    if ('items' in topic) {
      sidebar.push({ label: String(index), items: topic.items })
    }
  }

  return sidebar
}

export function getCurrentTopic(
  config: StarlightSidebarTopicsSharedConfig,
  sidebar: SidebarEntry[],
): Topic | undefined {
  const currentSidebarTopic = getCurrentSidebarTopic(sidebar)

  if (!currentSidebarTopic) return

  const topicConfigIndex = Number.parseInt(currentSidebarTopic.label, 10)
  const topicConfig = config[topicConfigIndex]

  if (!topicConfig) return

  return {
    // TODO(HiDeoo) Do we really need the config? If not, maybe rename the function
    config: topicConfig,
    sidebar: currentSidebarTopic.entries,
  }
}

function getCurrentSidebarTopic(sidebar: SidebarEntry[]): SidebarTopic | undefined {
  let currentSidebarTopic: SidebarTopic | undefined

  for (const topic of sidebar) {
    if (topic.type === 'link') continue

    const currentSidebarEntry = getCurrentSidebarEntry(topic.entries)

    if (currentSidebarEntry) {
      currentSidebarTopic = topic
      break
    }
  }

  return currentSidebarTopic
}

function getCurrentSidebarEntry(sidebar: SidebarEntry[]): SidebarEntry | undefined {
  return sidebar.find((entry) => {
    if (entry.type === 'link') {
      return entry.isCurrent
    }

    return getCurrentSidebarEntry(entry.entries)
  })
}

type SidebarEntry = Props['sidebar'][number]

interface SidebarTopic {
  label: string
  entries: SidebarEntry[]
}

interface Topic {
  config: StarlightSidebarTopicsSharedConfig[number]
  sidebar: SidebarEntry[]
}
