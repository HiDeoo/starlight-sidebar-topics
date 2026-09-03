import type { APIContext } from 'astro'
import { AstroError } from 'astro/errors'
import context from 'virtual:starlight-sidebar-topics/context'

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
  const baseSegment = slug.split('/')[0]
  return baseSegment && context.locales.includes(baseSegment) ? baseSegment : undefined
}

export function getTranslation(
  currentLocale: APIContext['currentLocale'],
  translations: Record<string, string>,
  link: string,
  description: string,
) {
  const defaultTranslation = translations[context.defaultLang]

  if (!defaultTranslation) {
    throw new AstroError(
      `The ${description} for "${link}" must have a key for the default language "${context.defaultLang}".`,
      'Update the Starlight config to include a topic label for the default language.',
    )
  }

  let translation = defaultTranslation

  if (currentLocale) {
    translation = translations[currentLocale] ?? defaultTranslation
  }

  return translation
}
