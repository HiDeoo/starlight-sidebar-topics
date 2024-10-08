import type { StarlightUserConfig } from '@astrojs/starlight/types'
import { z } from 'astro/zod'

const sidebarTopicBadgeSchema = z.object({
  text: z.union([z.string(), z.record(z.string())]),
  variant: z.enum(['note', 'danger', 'success', 'caution', 'tip', 'default']).default('default'),
})

const sidebarTopicBaseSchema = z.object({
  // TODO(HiDeoo) comment
  badge: z
    .union([z.string(), sidebarTopicBadgeSchema])
    .transform((badge) => (typeof badge === 'string' ? { variant: 'default' as const, text: badge } : badge))
    .optional(),
  // TODO(HiDeoo) comment
  icon: z.string().optional(),
  // TODO(HiDeoo) comment
  label: z.union([z.string(), z.record(z.string())]),
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
