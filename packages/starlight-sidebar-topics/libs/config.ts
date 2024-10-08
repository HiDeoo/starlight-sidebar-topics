import type { StarlightUserConfig } from '@astrojs/starlight/types'
import { z } from 'astro/zod'

const sidebarTopicBaseSchema = z.object({
  // TODO(HiDeoo) comment
  label: z.string(),
})

const sidebarTopicLinkSchema = sidebarTopicBaseSchema.extend({
  // TODO(HiDeoo) comment
  link: z.string(),
})

const sidebarTopicGroupSchema = sidebarTopicBaseSchema.extend({
  // TODO(HiDeoo) comment
  items: z.any() as z.Schema<NonNullable<StarlightUserConfig['sidebar']>>,
  // TODO(HiDeoo) slug
  // TODO(HiDeoo) comment
})

export const StarlightSidebarTopicsConfigSchema = z.union([sidebarTopicLinkSchema, sidebarTopicGroupSchema]).array()

export type StarlightSidebarTopicsUserConfig = z.input<typeof StarlightSidebarTopicsConfigSchema>
export type StarlightSidebarTopicsConfig = z.output<typeof StarlightSidebarTopicsConfigSchema>

export type StarlightSidebarTopicsSharedConfig = (
  | z.output<typeof sidebarTopicLinkSchema>
  | Omit<z.output<typeof sidebarTopicGroupSchema>, 'items'>
)[]
