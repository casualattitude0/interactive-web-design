import en from '../locales/en'
import zhTW from '../locales/zh-TW'

export const defaultLocale = 'en'

export const supportedLocales = [
  { code: 'en', name: 'English', abbr: 'EN' },
  { code: 'zh-TW', name: '繁體中文', abbr: '繁中' },
]

export const messages = {
  en,
  'zh-TW': zhTW,
}

/** Resolve a dotted key path (e.g. "nav.home") against a locale's messages. */
function resolve(locale, key) {
  const root = messages[locale] || messages[defaultLocale]
  const fallback = messages[defaultLocale]
  const dig = (obj) =>
    key.split('.').reduce((acc, part) => (acc == null ? acc : acc[part]), obj)
  const value = dig(root)
  return value === undefined ? dig(fallback) : value
}

/** Replace {name} tokens in a string with values from params. */
function interpolate(str, params) {
  if (typeof str !== 'string' || !params) return str
  return str.replace(/\{(\w+)\}/g, (m, k) => (k in params ? String(params[k]) : m))
}

/** String translation with interpolation (mirrors vue-i18n `t`). */
export function translate(locale, key, params) {
  const value = resolve(locale, key)
  if (typeof value !== 'string') return key
  return interpolate(value, params)
}

/** Message resolution that may return arrays/objects (mirrors vue-i18n `tm`). */
export function translateMessage(locale, key) {
  const value = resolve(locale, key)
  return value === undefined ? key : value
}
