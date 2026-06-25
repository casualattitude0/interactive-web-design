import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { localePath } from './router/paths'
import { defaultLocale } from './i18n'

const Product = lazy(() => import('./views/Product.jsx'))
const NotebookPage = lazy(() => import('./views/NotebookPage.jsx'))

export default function App() {
  return (
    <div id="app" className="app">
      <a className="skip-link" href="#top">
        Skip to content
      </a>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Navigate to={localePath(defaultLocale)} replace />} />
          <Route path="/:locale" element={<Product />} />
          <Route path="/:locale/notebook" element={<NotebookPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}
