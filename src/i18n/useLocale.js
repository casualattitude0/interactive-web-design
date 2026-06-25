import { useCallback, useMemo } from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import {
  supportedLocales,
  defaultLocale,
  translate,
  translateMessage,
} from './index'
import { localeFromPath, pathFromLocale, localePath } from '../router/paths'

/**
 * Locale helper hook — derives the active locale from the URL segment and
 * exposes translation helpers plus a locale switcher (mirrors the Vue composable).
 */
export function useLocale() {
  const navigate = useNavigate()
  const { locale: localeParam } = useParams()
  const location = useLocation()

  const locale = localeFromPath(localeParam)

  const t = useCallback(
    (key, params) => translate(locale, key, params),
    [locale]
  )
  const tm = useCallback((key) => translateMessage(locale, key), [locale])

  const setLocale = useCallback(
    (code) => {
      if (!supportedLocales.some((l) => l.code === code)) return
      const pathSeg = pathFromLocale(code)
      // Swap the first path segment (the locale) and keep the rest, search, hash.
      const segments = location.pathname.split('/').filter(Boolean)
      if (segments.length === 0) {
        navigate(localePath(code))
        return
      }
      segments[0] = pathSeg
      navigate(
        { pathname: '/' + segments.join('/'), search: location.search, hash: location.hash }
      )
    },
    [navigate, location]
  )

  return useMemo(
    () => ({ locale, t, tm, supportedLocales, defaultLocale, localePath, setLocale }),
    [locale, t, tm, setLocale]
  )
}
