import type { StarlightRouteData } from '@astrojs/starlight/route-data'

import type { TopicFrontmatterSchema } from '../schema'

export function isStarlightEntryWithTopic(entry: StarlightEntry): entry is StarlightEntryWithTopic {
  return (
    'data' in entry &&
    'topic' in (entry as StarlightEntryWithTopic).data &&
    typeof (entry as StarlightEntryWithTopic).data.topic === 'string'
  )
}

export type StarlightEntry = StarlightRouteData['entry']
export type StarlightEntryWithTopic = StarlightEntry & { data: TopicFrontmatterSchema }
