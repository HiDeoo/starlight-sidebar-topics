declare namespace App {
  type StarlightLocals = import('@astrojs/starlight').StarlightLocals
  interface Locals extends StarlightLocals {
    /**
     * Starlight Sidebar Topics data.
     *
     * @see https://starlight-sidebar-topics.netlify.app/docs/guides/custom-topic-list/
     */
    starlightSidebarTopics: import('./data').StarlightSidebarTopicsRouteData
  }
}
