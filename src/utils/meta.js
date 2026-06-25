import { siteDefaults } from '../data/site'

function ensureMeta(attr, key, value) {
  if (!value) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

function ensureLinkRel(rel, href) {
  if (!href) return
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

/**
 * @param {object} opts
 * @param {string} [opts.title]
 * @param {string} [opts.description]
 * @param {string} [opts.imagePath] Absolute path e.g. /og-image.png
 * @param {string} [opts.url] Canonical full URL
 */
export function applyMeta(opts = {}) {
  if (typeof document === 'undefined') return
  const base = typeof window !== 'undefined' ? window.location.origin : ''
  const title = opts.title || siteDefaults.title
  const description = opts.description || siteDefaults.description
  const imagePath = opts.imagePath ?? siteDefaults.ogImagePath
  const imageUrl =
    imagePath && (imagePath.startsWith('http') ? imagePath : `${base}${imagePath}`)
  const url =
    opts.url || (typeof window !== 'undefined' ? window.location.href : '')

  document.title = title
  ensureMeta('name', 'description', description)
  ensureMeta('property', 'og:title', title)
  ensureMeta('property', 'og:description', description)
  ensureMeta('property', 'og:type', 'website')
  if (url) ensureMeta('property', 'og:url', url)
  if (imageUrl) ensureMeta('property', 'og:image', imageUrl)
  ensureMeta('name', 'twitter:card', 'summary_large_image')
  ensureMeta('name', 'twitter:title', title)
  ensureMeta('name', 'twitter:description', description)
  if (imageUrl) ensureMeta('name', 'twitter:image', imageUrl)
  if (url) ensureLinkRel('canonical', url)
}

export function applyDefaultSiteMeta() {
  applyMeta({})
}
