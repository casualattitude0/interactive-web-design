import { defaultLocale } from '../i18n'

const pathToLocale = { en: 'en', tw: 'zh-TW' }
const localeToPath = { en: 'en', 'zh-TW': 'tw' }

export function localeFromPath(pathSegment) {
  return pathToLocale[pathSegment] || defaultLocale
}

export function pathFromLocale(localeCode) {
  return localeToPath[localeCode] ?? 'en'
}

export function localePath(localeCode) {
  const path = pathFromLocale(localeCode)
  return path === 'en' ? '/en' : `/${path}`
}
