import { defineRouteMiddleware } from '@astrojs/starlight/route-data'
import config from 'virtual:starlight-sidebar-topics/config'

import { StarlightSidebarTopicsLocalsSymbol, type StarlightSidebarTopicsLocals } from './libs/locals'
import { throwPluginError } from './libs/plugin'
import { getCurrentTopic, isTopicFirstPage, isTopicLastPage } from './libs/sidebar'

export const onRequest = defineRouteMiddleware((context) => {
  const { starlightRoute } = context.locals
  const { entry, id, pagination, sidebar } = starlightRoute

  if (entry['data'].template !== 'splash') {
    const currentTopic = getCurrentTopic(config, sidebar, id, entry)

    if (!currentTopic)
      throwPluginError(
        `Failed to find the topic for the \`${id}\` page.`,
        `Either include this page in the sidebar configuration of the desired topic using the \`items\` property or to associate an unlisted page with a topic, use the \`topic\` frontmatter property and set it to the desired topic ID.

  Learn more about unlisted pages in the ["Unlisted pages"](https://starlight-sidebar-topics.netlify.app/docs/guides/unlisted-pages/) guide.`,
      )

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
