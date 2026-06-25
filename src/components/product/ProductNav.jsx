import { useEffect, useState } from 'react'
import './ProductNav.css'

const links = [
  { label: 'Overview', href: '#top' },
  { label: 'Display', href: '#display' },
  { label: 'Spatial', href: '#spatial' },
  { label: 'Design', href: '#customize' },
  { label: 'Tech Specs', href: '#specs' },
]

export default function ProductNav() {
  const [solid, setSolid] = useState(false)

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`pnav${solid ? ' pnav--solid' : ''}`}>
      <nav className="pnav__inner" aria-label="Apple Watch Aura">
        <a className="pnav__logo" href="#top" aria-label="Apple">
          <svg viewBox="0 0 14 17" width="15" height="18" aria-hidden="true">
            <path
              fill="currentColor"
              d="M11.6 9c0-1.6.8-2.5 1.6-3.1-.9-1.3-2.3-1.5-2.8-1.5-1.2-.1-2.3.7-2.9.7-.6 0-1.5-.7-2.5-.7C3.1 4.5 1.9 5.2 1.2 6.4-.2 8.8.8 12.4 2.2 14.4c.7 1 1.5 2.1 2.5 2.1 1 0 1.4-.6 2.6-.6 1.2 0 1.5.6 2.6.6 1.1 0 1.8-1 2.4-2 .8-1.1 1.1-2.2 1.1-2.3-.1 0-2.1-.8-2.1-3.2zM9.7 3.2c.5-.7.9-1.6.8-2.6-.8 0-1.8.6-2.4 1.2-.5.6-1 1.5-.9 2.4.9.1 1.9-.4 2.5-1z"
            />
          </svg>
        </a>
        <span className="pnav__title">Glass Aura</span>
        <ul className="pnav__links">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
        <a className="pnav__buy" href="#buy">Buy</a>
      </nav>
    </header>
  )
}
