import type { StarlightUserConfig } from '@astrojs/starlight/types'
import { z } from 'astro/zod'

const sidebarTopicBadgeSchema = z.object({
  text: z.union([z.string(), z.record(z.string())]),
  variant: z.enum(['note', 'danger', 'success', 'caution', 'tip', 'default']).default('default'),
})

const sidebarTopicBaseSchema = z.object({
  /**
   * An optional badge to display next to the topic label.
   *
   * This option accepts the same configuration as the Starlight badge sidebar item configuration.
   * @see https://starlight.astro.build/guides/sidebar/#badges
   */
  badge: z
    .union([z.string(), sidebarTopicBadgeSchema])
    .transform((badge) => (typeof badge === 'string' ? { variant: 'default' as const, text: badge } : badge))
    .optional(),
  /**
   * The name of an optional icon to display before the topic label set to one of Starlight’s built-in icons.
   * @see https://starlight.astro.build/reference/icons/#all-icons
   */
  icon: z.string().optional(),
  /**
   * The topic label visible at the top of the sidebar.
   *
   * The value can be a string, or for multilingual sites, an object with values for each different locale. When using
   * the object form, the keys must be BCP-47 tags (e.g. en, fr, or zh-CN).
   */
  label: z.union([z.string(), z.record(z.string())]),
  /**
   * The link to the topic’s content which an be a relative link to local files or the full URL of an external page.
   *
   * For internal links, the link can either be a page included in the items array or a different page acting as the
   * topic’s landing page.
   */
  link: z.string(),
})

const sidebarTopicLinkSchema = sidebarTopicBaseSchema

const sidebarTopicGroupSchema = sidebarTopicBaseSchema.extend({
  /**
   * The sidebar items (links and subcategories) to display for this topic.
   *
   * The topic’s sidebar navigation items. This represents the sidebar displayed when the topic `link` page or any of
   * the pages configured in the `items` array is the current page.
   */
  items: z.any().array() as z.Schema<NonNullable<StarlightUserConfig['sidebar']>>,
})

export const StarlightSidebarTopicsConfigSchema = z.union([sidebarTopicGroupSchema, sidebarTopicLinkSchema]).array()

export type StarlightSidebarTopicsUserConfig = z.input<typeof StarlightSidebarTopicsConfigSchema>
export type StarlightSidebarTopicsConfig = z.output<typeof StarlightSidebarTopicsConfigSchema>

export type StarlightSidebarTopicsSharedConfig = (
  | (z.output<typeof sidebarTopicLinkSchema> & { type: 'link' })
  | (Omit<z.output<typeof sidebarTopicGroupSchema>, 'items'> & { type: 'group' })
)[]
