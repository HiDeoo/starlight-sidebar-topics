import type { StarlightSidebarTopicsRouteData } from './data'

declare global {
  namespace App {
    interface Locals {
      /**
       * Starlight Sidebar Topics data.
       *
       * @see https://starlight-sidebar-topics.netlify.app/docs/guides/custom-topic-list/
       */
      starlightSidebarTopics: StarlightSidebarTopicsRouteData
    }
  }
}
