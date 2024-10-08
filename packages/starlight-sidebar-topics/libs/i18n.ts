import starlightConfig from 'virtual:starlight/user-config'

import { stripTrailingSlash } from './pathname'

export function getLocalizedSlug(slug: string, locale: string | undefined): string {
  const slugLocale = getLocaleFromSlug(slug)
  if (slugLocale === locale) return slug
  locale ??= ''
  if (slugLocale === slug) return locale

  if (slugLocale) {
    return stripTrailingSlash(slug.replace(`${slugLocale}/`, locale ? `${locale}/` : ''))
  }

  return slug ? `${locale}/${slug}` : locale
}

export function getLocaleFromSlug(slug: string): string | undefined {
  const locales = Object.keys(starlightConfig.locales ?? {})
  const baseSegment = slug.split('/')[0]
  return baseSegment && locales.includes(baseSegment) ? baseSegment : undefined
}
