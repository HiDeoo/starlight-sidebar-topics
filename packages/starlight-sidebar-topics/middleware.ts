import { defineRouteMiddleware } from '@astrojs/starlight/route-data'
import picomatch from 'picomatch'
import config from 'virtual:starlight-sidebar-topics/config'
import options from 'virtual:starlight-sidebar-topics/options'

import { StarlightSidebarTopicsLocalsSymbol, type StarlightSidebarTopicsLocals } from './libs/locals'
import { ensureLeadingSlash } from './libs/pathname'
import { throwPluginError } from './libs/plugin'
import { getCurrentTopic, getTopicById, isTopicFirstPage, isTopicLastPage } from './libs/sidebar'

export const onRequest = defineRouteMiddleware((context) => {
  const { starlightRoute } = context.locals
  const { entry, hasSidebar, id, pagination, sidebar } = starlightRoute

  if (hasSidebar) {
    let currentTopic = getCurrentTopic(config, sidebar, id, entry)

    if (!currentTopic) {
      const normalizedId = ensureLeadingSlash(id)

      for (const [topicId, patterns] of Object.entries(options.topics)) {
        if (!picomatch(patterns)(normalizedId)) continue
        currentTopic = getTopicById(config, sidebar, topicId)
        break
      }
    }

    if (!currentTopic) {
      if (picomatch(options.exclude)(ensureLeadingSlash(id))) return

      throwPluginError(
        `Failed to find the topic for the \`${id}\` page.`,
        `Either include this page in the sidebar configuration of the desired topic using the \`items\` property, associate an unlisted page with a topic using the \`topic\` frontmatter property or the \`topics\` option, or exclude this page from any topic using the \`exclude\` option.

Learn more in the following guides:

- [Unlisted pages](https://starlight-sidebar-topics.netlify.app/docs/guides/unlisted-pages/)
- [Excluded pages](https://starlight-sidebar-topics.netlify.app/docs/guides/excluded-pages/)`,
      )
    }

    starlightRoute.sidebar = currentTopic.sidebar
    // @ts-expect-error - See `libs/locals` for more information.
    context.locals[StarlightSidebarTopicsLocalsSymbol] = {
      config: currentTopic.config,
    } satisfies StarlightSidebarTopicsLocals

    if (isTopicFirstPage(sidebar, id)) {
      pagination.prev = undefined
    }

    if (isTopicLastPage(sidebar, id)) {
      pagination.next = undefined
    }
  }
})
