import type { StarlightUserConfig } from '@astrojs/starlight/types'
import type { AstroIntegrationLogger } from 'astro'
import { AstroError } from 'astro/errors'

export function throwPluginError(message: string, hint?: string): never {
  throw new AstroError(
    message,
    hint ??
      `See the error report above for more informations.\n\nIf you believe this is a bug, please file an issue at https://github.com/HiDeoo/starlight-sidebar-topics/issues/new/choose`,
  )
}

export function overrideStarlightComponent(
  components: StarlightUserConfig['components'],
  logger: AstroIntegrationLogger,
  component: keyof NonNullable<StarlightUserConfig['components']>,
) {
  if (components?.[component]) {
    logger.warn(`It looks like you already have a \`${component}\` component override in your Starlight configuration.`)
    logger.warn(
      `To use \`starlight-sidebar-topics\`, either remove your override or update it to render the content from \`starlight-sidebar-topics/components/${component}.astro\`.`,
    )

    return {}
  }

  return {
    [component]: `starlight-sidebar-topics/overrides/${component}.astro`,
  }
}
