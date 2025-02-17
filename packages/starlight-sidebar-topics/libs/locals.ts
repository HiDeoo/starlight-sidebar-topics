import type { StarlightSidebarTopicsSharedConfig } from './config'

/**
 * We keep track of the current topic configuration using a variable stored using `Astro.locals` which will be reset for
 * each new page. The value is tracked using an untyped symbol on purpose to avoid users to get autocomplete for it and
 * avoid potential clashes with user-defined variables.
 */
export const StarlightSidebarTopicsLocalsSymbol = Symbol.for('starlight-sidebar-topics:locals')

export interface StarlightSidebarTopicsLocals {
  config: StarlightSidebarTopicsSharedConfig[number]
}
