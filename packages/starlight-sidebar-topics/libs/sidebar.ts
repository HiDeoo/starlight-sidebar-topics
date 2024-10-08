import type { Props } from '@astrojs/starlight/props'
import type { StarlightUserConfig } from '@astrojs/starlight/types'

import type { StarlightSidebarTopicsConfig, StarlightSidebarTopicsSharedConfig } from './config'
import { arePathnamesEqual } from './pathname'

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
  currentSlug: string,
): Topic | undefined {
  // Start by checking if the current page is a topic root.
  const topicFromSlug = getTopicFromSlug(config, sidebar, currentSlug)
  if (topicFromSlug) return topicFromSlug

  // Otherwise, find the current topic by looking for the current page in the sidebar.
  const currentSidebarTopic = getCurrentSidebarTopic(sidebar)
  if (!currentSidebarTopic) return

  const currentTopicConfig = config[Number.parseInt(currentSidebarTopic.label, 10)]
  if (!currentTopicConfig) return

  return { config: currentTopicConfig, sidebar: currentSidebarTopic.entries }
}

function getTopicFromSlug(
  config: StarlightSidebarTopicsSharedConfig,
  sidebar: SidebarEntry[],
  slug: string,
): Topic | undefined {
  let topicConfig: Topic['config'] | undefined
  let topicSidebar: Topic['sidebar'] | undefined

  // Start by checking if the current page is a topic homepage.
  let groupTopicIndex = -1

  for (const topic of config) {
    if (topic.type === 'group') groupTopicIndex++

    if (arePathnamesEqual(topic.link, slug) && groupTopicIndex !== -1) {
      const sidebarTopic = sidebar[groupTopicIndex]

      if (sidebarTopic?.type === 'group') {
        topicConfig = topic
        topicSidebar = sidebarTopic.entries
      }

      break
    }
  }

  if (!topicConfig || !topicSidebar) return

  return { config: topicConfig, sidebar: topicSidebar }
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
