import { Link } from 'react-router-dom'
import { useLocale } from '../i18n/useLocale'
import { supportedLocales } from '../i18n'
import { pathFromLocale } from '../router/paths'
import './PageSiteNav.css'

export default function PageSiteNav() {
  const { locale, t, setLocale } = useLocale()

  // Home link for the current locale (Product route).
  const homeTo = `/${pathFromLocale(locale)}`

  const otherLocale =
    (locale === 'zh-TW'
      ? supportedLocales.find((l) => l.code === 'en')
      : supportedLocales.find((l) => l.code === 'zh-TW')) ?? supportedLocales[0]

  return (
    <header className="page-site-nav" role="navigation" aria-label={t('nav.mainNav')}>
      <Link className="page-site-nav__back" to={homeTo}>
        ← {t('nav.home')}
      </Link>
      <button
        type="button"
        className="page-site-nav__lang"
        aria-label={t('langSwitcher.aria', { lang: otherLocale.name })}
        onClick={() => setLocale(otherLocale.code)}
      >
        {otherLocale.abbr}
      </button>
    </header>
  )
}
