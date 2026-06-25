import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AuraGlasses from './AuraGlasses.jsx'
import { FINISHES, TINTS, SHOWCASE } from '../../data/product'
import './GlassesShowcase.css'

gsap.registerPlugin(ScrollTrigger)

/** Piecewise-linear interpolation over [[pos, value], ...] (pos ascending). */
function kf(t, pts) {
  if (t <= pts[0][0]) return pts[0][1]
  const last = pts[pts.length - 1]
  if (t >= last[0]) return last[1]
  for (let i = 1; i < pts.length; i++) {
    const [p1, v1] = pts[i]
    if (t <= p1) {
      const [p0, v0] = pts[i - 1]
      const f = (t - p0) / (p1 - p0)
      return v0 + (v1 - v0) * f
    }
  }
  return last[1]
}

const finish = FINISHES[0]
const tint = TINTS[0]

export default function GlassesShowcase() {
  const rootRef = useRef(null)
  const stageRef = useRef(null)
  const [p, setP] = useState(0)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const isReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isReduced) {
      setReduced(true)
      setP(1)
      return
    }
    const st = ScrollTrigger.create({
      trigger: rootRef.current,
      start: 'top top',
      end: '+=2800',
      pin: stageRef.current,
      scrub: 0.6,
      onUpdate: (self) => setP(self.progress),
    })
    // ensure correct measurement once mounted into the page
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh())
    return () => {
      cancelAnimationFrame(raf)
      st.kill()
    }
  }, [])

  const scale = kf(p, [[0, 0.6], [0.14, 1], [0.5, 1], [0.66, 2.15], [0.78, 2.15], [0.95, 1.12], [1, 1.12]])
  const rotateY = kf(p, [[0, 22], [0.14, 22], [0.32, -26], [0.5, -7], [0.62, 0], [1, 0]])
  const rotateZ = kf(p, [[0, -6], [0.14, 0], [1, 0]])
  const shiftX = kf(p, [[0.5, 0], [0.66, -16], [0.78, -16], [0.92, 0], [1, 0]])
  const shiftY = kf(p, [[0.5, 0], [0.66, 6], [0.78, 6], [0.92, 0]])
  const glow = kf(p, [[0, 0], [0.36, 0], [0.52, 1], [1, 1]])
  const hud = kf(p, [[0, 0], [0.58, 0], [0.72, 1], [1, 1]])

  const deviceStyle = {
    transform: `translate(${shiftX}%, ${shiftY}%) scale(${scale}) rotateX(8deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`,
  }

  const auraBg = `radial-gradient(circle at 50% 50%, ${finish.accent}, ${finish.accent}55 30%, transparent 65%)`

  /** Bell-curve opacity so each caption peaks at its scroll position. */
  const captionOpacity = (at) => {
    if (reduced) return 1
    const win = 0.11
    const d = Math.abs(p - at)
    return Math.max(0, 1 - d / win)
  }

  return (
    <section
      id="film"
      ref={rootRef}
      className={`gs${reduced ? ' gs--reduced' : ''}`}
      aria-label="Apple Glass Aura — scroll to explore"
    >
      <div ref={stageRef} className="gs__stage">
        {/* ambient light that ignites with the lenses */}
        <div
          className="gs__aura"
          style={{ opacity: 0.15 + glow * 0.85, transform: `scale(${0.8 + glow * 0.5})`, background: auraBg }}
          aria-hidden="true"
        />

        <div className="gs__device" style={deviceStyle}>
          <AuraGlasses finish={finish} lensTint={tint} glow={glow} hud={hud} size={560} />
        </div>

        {/* cross-fading captions */}
        <div className="gs__captions" aria-hidden="true">
          {SHOWCASE.map((s, i) => (
            <div
              key={i}
              className="gs__caption"
              style={{
                opacity: captionOpacity(s.at),
                transform: `translateY(${(1 - captionOpacity(s.at)) * 14}px)`,
              }}
            >
              <h2 className="gs__caption-title">{s.title}</h2>
              <p className="gs__caption-sub">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* progress rail */}
        <div className="gs__rail" aria-hidden="true">
          <span className="gs__rail-fill" style={{ height: p * 100 + '%' }} />
        </div>
      </div>

      {/* Static fallback list for reduced motion */}
      {reduced && (
        <ul className="gs__static">
          {SHOWCASE.map((s, i) => (
            <li key={i}>
              <strong>{s.title}</strong>
              <span>{s.sub}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
