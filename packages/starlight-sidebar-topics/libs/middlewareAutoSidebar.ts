import { defineRouteMiddleware } from '@astrojs/starlight/route-data'
import type { APIContext } from 'astro'
import { getCollection } from 'astro:content'
import picomatch from 'picomatch'
import config from 'virtual:starlight-sidebar-topics/config'
import options from 'virtual:starlight-sidebar-topics/options'

import type { StarlightSidebarTopicsRouteData } from '../data'
import { getTranslation } from './i18n'
import { metadataManager } from './metadata-manager'
import { ensureLeadingSlash } from './pathname'
import { throwPluginError } from './plugin'
import { getCurrentTopic, getTopicById, isTopicFirstPage, isTopicLastPage, type Topic } from './sidebar'

// Enable logging
const ENABLE_LOGGING = false

// Helper for logging
function log(...args: any[]) {
  if (ENABLE_LOGGING) {
    console.log(...args)
  }
}

// Check if starlight-auto-sidebar is active
async function isAutoSidebarActive(): Promise<boolean> {
  try {
    const collection = await getCollection('autoSidebar')
    log('autoSidebar collection found with', collection.length, 'entries')
    return collection.length > 0
  } catch (error) {
    log('autoSidebar collection not found or not configured')
    return false
  }
}

log('AUTO-SIDEBAR MIDDLEWARE MODULE LOADED')

export const onRequest = defineRouteMiddleware(async (context) => {
  log('AUTO-SIDEBAR MIDDLEWARE CALLED for:', context.url.pathname)

  const autoSidebarIsActive = await isAutoSidebarActive()
  log(autoSidebarIsActive ? 'autoSidebar is active, processing with metadata support' : 'autoSidebar not active, processing without metadata')

  const { starlightRoute } = context.locals
  const { entry, hasSidebar, id, pagination, sidebar } = starlightRoute

  let currentTopic: Topic | undefined

  if (hasSidebar) {
    currentTopic = getCurrentTopic(config, sidebar, id, entry)

    if (!currentTopic) {
      const normalizedId = ensureLeadingSlash(id)

      for (const [topicId, patterns] of Object.entries(options.topics)) {
        if (!picomatch(patterns)(normalizedId)) continue
        currentTopic = getTopicById(config, sidebar, topicId)
        break
      }
    }

    if (!currentTopic) {
      if (picomatch(options.exclude)(ensureLeadingSlash(id))) {
        attachRouteData(context, currentTopic)
        return
      }

      throwPluginError(
        `Failed to find the topic for the \`${id}\` page.`,
        `Either include this page in the sidebar configuration of the desired topic using the \`items\` property, associate an unlisted page with a topic using the \`topic\` frontmatter property or the \`topics\` option, or exclude this page from any topic using the \`exclude\` option.

Learn more in the following guides:

- [Unlisted pages](https://starlight-sidebar-topics.netlify.app/docs/guides/unlisted-pages/)
- [Excluded pages](https://starlight-sidebar-topics.netlify.app/docs/guides/excluded-pages/)`,
      )
    }

    // Process the topic sidebar
    let processedSidebar = currentTopic.sidebar

    if (autoSidebarIsActive) {
      const needsMetadataProcessing = currentTopic.sidebar.some(item =>
        typeof item === 'object' && item.type === 'group' && item.label
      )

      log('Needs metadata processing:', needsMetadataProcessing)

      if (needsMetadataProcessing) {
        log('Processing metadata for groups with auto-sidebar system...')
        processedSidebar = await processSidebarMetadata(
          currentTopic.sidebar,
          starlightRoute.locale,
          id // Pass current page context for better lookups
        )

        log('Processed sidebar with auto-sidebar metadata:', JSON.stringify(processedSidebar, null, 2))
      }
    }

    starlightRoute.sidebar = processedSidebar

    if (isTopicFirstPage(sidebar, id)) {
      pagination.prev = undefined
    }

    if (isTopicLastPage(sidebar, id)) {
      pagination.next = undefined
    }
  }

  attachRouteData(context, currentTopic)
})

function attachRouteData(context: APIContext, currentTopic: Topic | undefined) {
  context.locals.starlightSidebarTopics = getRouteData(context.currentLocale, currentTopic)
}

function getRouteData(
  currentLocale: APIContext['currentLocale'],
  currentTopic: Topic | undefined,
): StarlightSidebarTopicsRouteData {
  return {
    isPageWithTopic: currentTopic !== undefined,
    topics: config.map((topic) => {
      const isLinkTopic = topic.type === 'link'

      const topicRouteData: StarlightSidebarTopicsRouteData['topics'][number] = {
        isCurrent:
          isLinkTopic || !currentTopic
            ? false
            : topic.label === currentTopic.config.label && topic.link === currentTopic.config.link,
        label:
          typeof topic.label === 'string'
            ? topic.label
            : getTranslation(currentLocale, topic.label, topic.link, 'topic label'),
        link: !isLinkTopic && currentLocale ? topic.link : topic.link,
      }

      if (topic.badge) {
        topicRouteData.badge = {
          text:
            typeof topic.badge.text === 'string'
              ? topic.badge.text
              : getTranslation(currentLocale, topic.badge.text, topic.link, 'topic badge text'),
          variant: topic.badge.variant,
        }
      }

      if (topic.icon) {
        topicRouteData.icon = topic.icon
      }

      return topicRouteData
    }),
  }
}

// Process sidebar metadata
async function processSidebarMetadata(
  sidebar: any[],
  locale: string,
  currentPageId: string
): Promise<any[]> {
  log('Processing sidebar metadata with improved system')

  const processedSidebar: any[] = []

  for (const item of sidebar) {
    if (typeof item === 'object' && item.type === 'group') {
      const processedItem = await processGroupWithImprovedMetadata(item, locale, currentPageId)
      processedSidebar.push(processedItem)
    } else {
      processedSidebar.push(item)
    }
  }

  return processedSidebar
}

// Process a group
async function processGroupWithImprovedMetadata(
  group: any,
  locale: string,
  currentPageId: string
): Promise<any> {
  log('Processing group with improved system:', group.label)

  const metadata = await metadataManager.findGroupMetadata(group.label, currentPageId)

  let processedGroup = { ...group }

  if (metadata) {
    log('Found metadata for group:', group.label, metadata)
    processedGroup = {
      ...group,
      label: metadata.label || group.label,
      collapsed: metadata.collapsed !== undefined ? metadata.collapsed : group.collapsed
    }

    if (metadata.badge) {
      processedGroup.badge = metadata.badge
    }
  }

  if (processedGroup.entries) {
    const processedEntries: any[] = []
    for (const entry of processedGroup.entries) {
      if (typeof entry === 'object' && entry.type === 'group') {
        const processedEntry = await processGroupWithImprovedMetadata(entry, locale, currentPageId)
        processedEntries.push(processedEntry)
      } else {
        processedEntries.push(entry)
      }
    }
    processedGroup.entries = processedEntries
  }

  return processedGroup
}