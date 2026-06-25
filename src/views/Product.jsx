import { useEffect } from 'react'
import ProductNav from '../components/product/ProductNav.jsx'
import ProductHero from '../components/product/ProductHero.jsx'
import GlassesShowcase from '../components/product/GlassesShowcase.jsx'
import GlassesCustomizer from '../components/product/GlassesCustomizer.jsx'
import SpecsGrid from '../components/product/SpecsGrid.jsx'
import ProductFooter from '../components/product/ProductFooter.jsx'
import RevealOnScroll from '../components/product/RevealOnScroll.jsx'
import { FEATURES, METRICS } from '../data/product'
import { applyMeta } from '../utils/meta'
import { siteDefaults } from '../data/site'
import './Product.css'

// deterministic pseudo-random bar height for the equalizer
function barH(n) {
  const v = Math.abs(Math.sin(n * 1.7) * 0.6 + Math.cos(n * 0.9) * 0.4)
  return 18 + v * 64 + '%'
}

export default function Product() {
  useEffect(() => {
    applyMeta({
      title: siteDefaults.title,
      description: siteDefaults.description,
      imagePath: siteDefaults.ogImagePath,
      url: typeof window !== 'undefined' ? window.location.href : undefined,
    })
  }, [])

  return (
    <div className="product">
      <ProductNav />
      <ProductHero />

      {/* Scroll-driven product film */}
      <GlassesShowcase />

      {/* Display */}
      <section id="display" className="feat feat--dark">
        <div className="feat__wrap">
          <RevealOnScroll tag="p" className="feat__eyebrow">{FEATURES[0].eyebrow}</RevealOnScroll>
          <RevealOnScroll tag="h2" delay={80} className="feat__title">{FEATURES[0].title}</RevealOnScroll>
          <RevealOnScroll tag="p" delay={160} className="feat__body">{FEATURES[0].body}</RevealOnScroll>
          <RevealOnScroll delay={220} className="feat__display-strip">
            <div className="strip">
              <span className="strip__num">4,000</span>
              <span className="strip__unit">nits peak brightness</span>
            </div>
            <div className="strip__bar"><i style={{ width: '100%' }} /></div>
            <div className="strip__scale"><span>Indoors</span><span>Direct sun</span></div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Spatial audio */}
      <section id="spatial" className="feat feat--light">
        <div className="feat__wrap">
          <RevealOnScroll tag="p" className="feat__eyebrow feat__eyebrow--rose">{FEATURES[1].eyebrow}</RevealOnScroll>
          <RevealOnScroll tag="h2" delay={80} className="feat__title feat__title--dark">{FEATURES[1].title}</RevealOnScroll>
          <RevealOnScroll tag="p" delay={160} className="feat__body feat__body--dark">{FEATURES[1].body}</RevealOnScroll>
          <RevealOnScroll delay={220} className="feat__eq">
            {Array.from({ length: 28 }, (_, i) => i + 1).map((n) => (
              <span key={n} className="eq__bar" style={{ animationDelay: n * 0.06 + 's', height: barH(n) }} />
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* Intelligence */}
      <section id="intelligence" className="feat feat--space">
        <div className="feat__wrap">
          <RevealOnScroll tag="p" className="feat__eyebrow feat__eyebrow--cyan">{FEATURES[2].eyebrow}</RevealOnScroll>
          <RevealOnScroll tag="h2" delay={80} className="feat__title">{FEATURES[2].title}</RevealOnScroll>
          <RevealOnScroll tag="p" delay={160} className="feat__body">{FEATURES[2].body}</RevealOnScroll>
          <div className="feat__metrics">
            {METRICS.map((m, i) => (
              <RevealOnScroll key={m.label} delay={200 + i * 90} className="metric">
                <span className="metric__v">{m.v}</span>
                <span className="metric__l">{m.label}</span>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Customize */}
      <section id="customize" className="feat feat--dark feat--customize">
        <div className="feat__wrap">
          <RevealOnScroll tag="p" className="feat__eyebrow">Design</RevealOnScroll>
          <RevealOnScroll tag="h2" delay={80} className="feat__title">{'Pick a frame.\nPick a tint.'}</RevealOnScroll>
          <RevealOnScroll delay={160}>
            <GlassesCustomizer />
          </RevealOnScroll>
        </div>
      </section>

      {/* Specs */}
      <section id="specs" className="feat feat--dark feat--specs">
        <div className="feat__wrap">
          <RevealOnScroll tag="p" className="feat__eyebrow">Tech Specs</RevealOnScroll>
          <RevealOnScroll tag="h2" delay={80} className="feat__title feat__title--center">{'Featherweight.\nSerious hardware.'}</RevealOnScroll>
          <SpecsGrid />
        </div>
      </section>

      {/* Buy */}
      <section id="buy" className="buy">
        <div className="buy__glow" aria-hidden="true" />
        <RevealOnScroll tag="p" className="buy__kicker">Apple Glass Aura</RevealOnScroll>
        <RevealOnScroll tag="h2" delay={80} className="buy__title">Put the world on.</RevealOnScroll>
        <RevealOnScroll tag="p" delay={140} className="buy__price">From $899 or $74.91/mo. for 12 months.</RevealOnScroll>
        <RevealOnScroll delay={200} className="buy__cta">
          <a className="buy__btn buy__btn--primary" href="#top">Buy now</a>
          <a className="buy__btn buy__btn--ghost" href="#customize">Customize yours</a>
        </RevealOnScroll>
      </section>

      <ProductFooter />
    </div>
  )
}
