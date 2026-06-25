import './ProductFooter.css'

const cols = [
  { title: 'Watch Aura', links: ['Overview', 'Display', 'Health', 'Tech Specs', 'Compare'] },
  { title: 'Shop', links: ['Buy Watch Aura', 'Bands', 'Accessories', 'Trade In', 'Financing'] },
  { title: 'Support', links: ['Setup', 'AuraCare+', 'Watch Support', 'Contact', 'Community'] },
]

export default function ProductFooter() {
  return (
    <footer className="pfoot">
      <div className="pfoot__inner">
        <p className="pfoot__disclaimer">
          This is a fictional product page built as a front-end engineering showcase. Apple, Apple Watch,
          and related marks are trademarks of Apple Inc. Not affiliated with or endorsed by Apple.
        </p>
        <div className="pfoot__cols">
          {cols.map((col) => (
            <div key={col.title}>
              <h4>{col.title}</h4>
              <ul>
                {col.links.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pfoot__bar">
          <span>Crafted with React, SVG &amp; CSS — no images, no UI libraries.</span>
          <span>© 2026 Watch Aura concept.</span>
        </div>
      </div>
    </footer>
  )
}
