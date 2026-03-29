import type { ContentNavigationItem } from '@nuxt/content'

export function transformNavigation(
  data: ContentNavigationItem[],
  isI18nEnabled: boolean,
  locale?: string,
): ContentNavigationItem[] {
  if (isI18nEnabled && locale) {
    const localeResult = data.find(item => item.path === `/${locale}`)?.children || data
    return localeResult.find(item => item.path === `/${locale}/docs`)?.children || localeResult
  }

  return data.find(item => item.path === '/docs')?.children || data
}
