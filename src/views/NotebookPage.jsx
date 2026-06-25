import { useCallback, useEffect, useRef, useState } from 'react'
import PageSiteNav from '../components/PageSiteNav.jsx'
import { useLocale } from '../i18n/useLocale'
import { applyMeta } from '../utils/meta'
import { siteDefaults } from '../data/site'
import bookHeaderUrl from '../assets/images/bookheader.png'
import './NotebookPage.css'

/** Scrapbook layout: left street, top-right rain, bottom-center swing; captions beside each. */
const NOTEBOOK_ITEMS = [
  {
    id: 'nb-street',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=520&q=80',
    x: 20,
    y: 92,
    w: 228,
    h: 156,
  },
  {
    id: 'nb-rain',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&w=520&q=80',
    x: 568,
    y: 22,
    w: 196,
    h: 132,
  },
  {
    id: 'nb-swing',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?auto=format&fit=crop&w=520&q=80',
    x: 276,
    y: 296,
    w: 236,
    h: 158,
  },
  { id: 'cap-street', type: 'text', i18nKey: 'notebookPage.captionStreet', x: 258, y: 124, w: 176, h: 64 },
  { id: 'cap-rain', type: 'text', i18nKey: 'notebookPage.captionRain', x: 312, y: 48, w: 220, h: 56 },
  { id: 'cap-swing', type: 'text', i18nKey: 'notebookPage.captionSwing', x: 524, y: 340, w: 168, h: 64 },
]

function itemHeight(item) {
  return item.type === 'text' ? item.h : item.h || Math.round(item.w * 0.72)
}

export default function NotebookPage() {
  const { locale, t, tm } = useLocale()

  const surfaceRef = useRef(null)
  const [items, setItems] = useState(() => NOTEBOOK_ITEMS.map((row) => ({ ...row })))
  const [draggingId, setDraggingId] = useState(null)
  const drag = useRef(null) // { id, pointerId, startX, startY, itemX, itemY, el }

  const paragraphs = (() => {
    const raw = tm('notebookPage.paragraphs')
    return Array.isArray(raw) ? raw : []
  })()
  const surfaceLines = (() => {
    const raw = tm('notebookPage.surfaceLines')
    return Array.isArray(raw) ? raw : []
  })()

  // Document title per locale (mirrors the Vue router afterEach hook).
  useEffect(() => {
    applyMeta({
      title: `${t('notebookPage.title')} — Apple Watch Aura`,
      description: siteDefaults.description,
      imagePath: siteDefaults.ogImagePath,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    })
  }, [t])

  const syncSurfaceSize = useCallback(() => {
    const el = surfaceRef.current
    if (!el) return
    const w = el.clientWidth
    const h = el.clientHeight
    setItems((prev) =>
      prev.map((item) => {
        const ih = itemHeight(item)
        const maxX = Math.max(0, w - item.w)
        const maxY = Math.max(0, h - ih)
        return {
          ...item,
          x: Math.max(0, Math.min(maxX, item.x)),
          y: Math.max(0, Math.min(maxY, item.y)),
        }
      })
    )
  }, [])

  // ResizeObserver to clamp items within the surface.
  useEffect(() => {
    const el = surfaceRef.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(() => syncSurfaceSize())
    ro.observe(el)
    syncSurfaceSize()
    return () => ro.disconnect()
  }, [syncSurfaceSize])

  // Global pointer handlers for dragging.
  useEffect(() => {
    const onMove = (e) => {
      const d = drag.current
      if (!d || e.pointerId !== d.pointerId) return
      const surface = surfaceRef.current
      if (!surface) return
      const dx = e.clientX - d.startX
      const dy = e.clientY - d.startY
      setItems((prev) =>
        prev.map((item) => {
          if (item.id !== d.id) return item
          const ih = itemHeight(item)
          const maxX = Math.max(0, surface.clientWidth - item.w)
          const maxY = Math.max(0, surface.clientHeight - ih)
          return {
            ...item,
            x: Math.max(0, Math.min(maxX, d.itemX + dx)),
            y: Math.max(0, Math.min(maxY, d.itemY + dy)),
          }
        })
      )
    }
    const onUp = (e) => {
      const d = drag.current
      if (!d || e.pointerId !== d.pointerId) return
      const el = d.el
      if (el && el.releasePointerCapture) {
        try {
          el.releasePointerCapture(e.pointerId)
        } catch (_) {
          /* ignore */
        }
      }
      drag.current = null
      setDraggingId(null)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [])

  const onFloatPointerDown = (e, item) => {
    if (e.button !== 0) return
    e.preventDefault()
    const el = e.currentTarget
    if (el.setPointerCapture) el.setPointerCapture(e.pointerId)
    drag.current = {
      id: item.id,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      itemX: item.x,
      itemY: item.y,
      el,
    }
    setDraggingId(item.id)
  }

  const onFloatImgLoad = (e, item) => {
    if (item.type !== 'image') return
    const img = e.target
    if (!img.naturalWidth) return
    const ratio = img.naturalHeight / img.naturalWidth
    const h = Math.max(1, Math.round(item.w * ratio))
    setItems((prev) => prev.map((it) => (it.id === item.id ? { ...it, h } : it)))
  }

  const floatClass = (item) =>
    [
      'notebook-page__float',
      draggingId === item.id ? 'notebook-page__float--dragging' : '',
      item.type === 'text' ? 'notebook-page__float--text' : '',
      item.type === 'image' ? 'notebook-page__float--image' : '',
    ]
      .filter(Boolean)
      .join(' ')

  return (
    <main className="page notebook-page">
      <PageSiteNav />
      <div className="notebook-page__content">
        <div
          className="notebook-page__binding"
          style={{ backgroundImage: `url(${bookHeaderUrl})` }}
          aria-hidden="true"
        />
        <div className="notebook-page__paper">
          <header className="notebook-page__header">
            <h1 className="notebook-page__title">{t('notebookPage.title')}</h1>
            <p className="notebook-page__lead">{t('notebookPage.lead')}</p>
          </header>

          <div className="notebook-page__body">
            {paragraphs.map((para, i) => (
              <p key={i} className="notebook-page__para">
                {para}
              </p>
            ))}
          </div>

          <div
            ref={surfaceRef}
            className="notebook-page__surface"
            aria-label={t('notebookPage.surfaceAria')}
          >
            <div className="notebook-page__surface-note" aria-hidden="true">
              {surfaceLines.map((line, i) => (
                <p key={i} className="notebook-page__surface-line">
                  {line}
                </p>
              ))}
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className={floatClass(item)}
                style={{ transform: `translate(${item.x}px, ${item.y}px)`, width: `${item.w}px` }}
                onPointerDown={(e) => onFloatPointerDown(e, item)}
              >
                {item.type === 'image' ? (
                  <img
                    className="notebook-page__float-img"
                    src={item.src}
                    alt=""
                    draggable="false"
                    onLoad={(e) => onFloatImgLoad(e, item)}
                  />
                ) : (
                  <p className="notebook-page__float-text">{t(item.i18nKey)}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
