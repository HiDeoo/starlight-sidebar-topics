import { z } from 'astro/zod'

export const topicSchema = z.object({
  /**
   * ID of the topic to associate with the current page if the page is not listed in any topic sidebar configuration.
   *
   * @see https://starlight-sidebar-topics.netlify.app/docs/guides/unlisted-pages/
   */
  topic: z.string().optional(),
})

export type TopicFrontmatterSchema = z.input<typeof topicSchema>
