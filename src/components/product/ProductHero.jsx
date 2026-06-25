import AuraGlasses from './AuraGlasses.jsx'
import { HERO, FINISHES, TINTS } from '../../data/product'
import './ProductHero.css'

const finish = FINISHES[3]
const tint = TINTS[0]

export default function ProductHero() {
  return (
    <section id="top" className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__copy">
        <p className="hero__eyebrow">
          <span className="hero__badge">{HERO.badge}</span>
          {HERO.product}
        </p>
        <h1 className="hero__title">{HERO.model}</h1>
        <p className="hero__tagline">{HERO.tagline}</p>
        <p className="hero__sub">{HERO.sub}</p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#buy">{HERO.ctaPrimary}</a>
          <a className="btn btn--ghost" href="#display">
            {HERO.ctaSecondary}
            <svg viewBox="0 0 11 11" width="9" height="9" aria-hidden="true">
              <path d="M2 1l5 4.5L2 10" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
        <p className="hero__price">{HERO.priceLine}</p>
      </div>

      <div className="hero__stage">
        <div className="hero__watch">
          <AuraGlasses finish={finish} lensTint={tint} glow={0.85} hud={0.9} size={440} />
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="hero__scroll-line" />
      </div>
    </section>
  )
}
