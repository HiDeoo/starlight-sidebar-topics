declare module 'virtual:starlight-sidebar-topics/config' {
  const StarlightSidebarTopicsConfig: import('./src/libs/config').StarlightSidebarTopicsSharedConfig

  export default StarlightSidebarTopicsConfig
}

declare module 'virtual:starlight-sidebar-topics/context' {
  const StarlightSidebarTopicsContext: import('./src/libs/vite').StarlightSidebarTopicsContext

  export default StarlightSidebarTopicsContext
}

declare module 'virtual:starlight-sidebar-topics/options' {
  const StarlightSidebarTopicsOptions: import('./src/libs/config').StarlightSidebarTopicsSharedOptions

  export default StarlightSidebarTopicsOptions
}
