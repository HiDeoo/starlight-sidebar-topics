import type { StarlightUserConfig } from '@astrojs/starlight/types'
import { z } from 'astro/zod'

const sidebarTopicBaseSchema = z.object({
  // TODO(HiDeoo) comment
  label: z.string(),
  // TODO(HiDeoo) comment
  link: z.string(),
})

const sidebarTopicLinkSchema = sidebarTopicBaseSchema

const sidebarTopicGroupSchema = sidebarTopicBaseSchema.extend({
  // TODO(HiDeoo) comment
  items: z.any().array() as z.Schema<NonNullable<StarlightUserConfig['sidebar']>>,
})

export const StarlightSidebarTopicsConfigSchema = z.union([sidebarTopicGroupSchema, sidebarTopicLinkSchema]).array()

export type StarlightSidebarTopicsUserConfig = z.input<typeof StarlightSidebarTopicsConfigSchema>
export type StarlightSidebarTopicsConfig = z.output<typeof StarlightSidebarTopicsConfigSchema>

export type StarlightSidebarTopicsSharedConfig = (
  | (z.output<typeof sidebarTopicLinkSchema> & { type: 'link' })
  | (Omit<z.output<typeof sidebarTopicGroupSchema>, 'items'> & { type: 'group' })
)[]
