import RevealOnScroll from './RevealOnScroll.jsx'
import { SPECS } from '../../data/product'
import './SpecsGrid.css'

export default function SpecsGrid() {
  return (
    <ul className="specs">
      {SPECS.map((s, i) => (
        <RevealOnScroll key={s.k} tag="li" delay={i * 70} className="specs__item">
          <span className="specs__k">{s.k}</span>
          <span className="specs__v">{s.v}</span>
          <span className="specs__sub">{s.sub}</span>
        </RevealOnScroll>
      ))}
    </ul>
  )
}
