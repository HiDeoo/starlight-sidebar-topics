import type { Icon } from '@astrojs/starlight/components'
import type { ComponentProps } from 'astro/types'

import type { SidebarTopicBadge } from './libs/config'

export interface StarlightSidebarTopicsRouteData {
  /**
   * Indicates if the current page is associated with a topic or not.
   */
  isPageWithTopic: boolean
  /**
   * A list of all configured topics.
   */
  topics: {
    /**
     * The optional badge associated with the topic.
     */
    badge?: {
      text: string
      variant: SidebarTopicBadge['variant']
    }
    /**
     * The name of an optional icon associated with the topic set to one of Starlight’s built-in icons.
     */
    icon?: ComponentProps<typeof Icon>['name']
    /**
     * Indicates if the current page is part of the topic.
     */
    isCurrent: boolean
    /**
     * The label of the topic.
     */
    label: string
    /**
     * The link to the topic’s content.
     */
    link: string
  }[]
}
