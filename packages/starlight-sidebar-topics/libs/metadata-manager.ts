import { getCollection } from 'astro:content'

// Enable logging
const ENABLE_LOGGING = false

// Helper for logging
function log(...args: any[]) {
  if (ENABLE_LOGGING) {
    console.log(...args)
  }
}

/**
 * Manages metadata entries and provides efficient lookup mechanisms
 */
export class MetadataManager {
  private metadataEntries: any[] | undefined
  private directoryMapping: Map<string, any> | undefined

  /**
   * Get all metadata entries from the collection
   */
  async getMetadataEntries(): Promise<any[]> {
    if (!this.metadataEntries) {
      this.metadataEntries = await getCollection('autoSidebar')
    }
    return this.metadataEntries
  }

  /**
   * Build a mapping from directory paths to metadata entries
   */
  async buildDirectoryMapping(): Promise<Map<string, any>> {
    if (this.directoryMapping) {
      return this.directoryMapping
    }

    const entries = await this.getMetadataEntries()
    this.directoryMapping = new Map()

    for (const entry of entries) {
      // Extract directory path from entry ID (remove /_meta suffix)
      const directoryPath = entry.id.replace('/_meta', '')

      // Create multiple lookup keys to handle different path patterns
      const lookupKeys = this.generateLookupKeys(directoryPath)

      for (const key of lookupKeys) {
        this.directoryMapping.set(key, entry.data)
      }
    }

    return this.directoryMapping
  }

  /**
   * Generate multiple lookup keys for a directory path to handle various scenarios
   */
  private generateLookupKeys(directoryPath: string): string[] {
    const keys: string[] = []

    // Original full path
    keys.push(directoryPath)

    // Path segments for hierarchical lookups
    const segments = directoryPath.split('/').filter(Boolean)

    // Add the last segment for simple lookups
    if (segments.length > 0) {
      const lastSegment = segments[segments.length - 1]
      keys.push(lastSegment)
      keys.push(lastSegment.toLowerCase())
    }

    // Add nested path combinations
    if (segments.length > 1) {
      for (let i = 1; i < segments.length; i++) {
        keys.push(segments.slice(i).join('/'))
      }
    }

    return keys
  }

  /**
   * Find metadata for a group using intelligent lookup
   */
  async findGroupMetadata(groupLabel: string, currentPath?: string): Promise<any | null> {
    const directoryMapping = await this.buildDirectoryMapping()

    // Generate potential lookup keys for this group
    const lookupKeys = this.generateGroupLookupKeys(groupLabel, currentPath)

    // Try each lookup key until we find a match
    for (const key of lookupKeys) {
      const metadata = directoryMapping.get(key)
      if (metadata) {
        log('Found metadata for group:', groupLabel, 'using key:', key, 'metadata:', metadata)
        return metadata
      }
    }

    log('No metadata found for group:', groupLabel, 'tried keys:', lookupKeys)
    return null
  }

  /**
   * Generate lookup keys for a specific group based on its label and context
   */
  private generateGroupLookupKeys(groupLabel: string, currentPath?: string): string[] {
    const keys: string[] = []
    const normalizedLabel = groupLabel.toLowerCase()

    // Direct label lookups
    keys.push(normalizedLabel)
    keys.push(groupLabel)

    // If we have context from the current path, use it to build better keys
    if (currentPath) {
      const pathSegments = currentPath.split('/').filter(Boolean)

      // Build hierarchical paths with the group label
      for (let i = 0; i < pathSegments.length; i++) {
        const basePath = pathSegments.slice(0, i + 1).join('/')
        keys.push(`${basePath}/${normalizedLabel}`)
        keys.push(`${basePath}/${groupLabel}`)
      }
    }

    // Common path patterns
    const commonPrefixes = ['docs', 'content/docs', 'documentation', 'pages']
    for (const prefix of commonPrefixes) {
      keys.push(`${prefix}/${normalizedLabel}`)
      keys.push(`${prefix}/${groupLabel}`)
    }

    return keys
  }

  /**
   * Clear cached data
   */
  clearCache(): void {
    this.metadataEntries = undefined
    this.directoryMapping = undefined
  }
}

// Export a singleton instance
export const metadataManager = new MetadataManager()