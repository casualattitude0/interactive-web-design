import { useEffect, useRef, useState } from 'react'
import AuraGlasses from './AuraGlasses.jsx'
import { FINISHES, TINTS } from '../../data/product'
import './GlassesCustomizer.css'

export default function GlassesCustomizer() {
  const [finish, setFinish] = useState(FINISHES[0])
  const [tint, setTint] = useState(TINTS[0])

  // Mirror Vue's <Transition mode="out-in">: leave the old, then enter the new.
  const [displayed, setDisplayed] = useState({ finish: FINISHES[0], tint: TINTS[0] })
  const [phase, setPhase] = useState('') // '' | 'leave' | 'enter'
  const timers = useRef([])

  useEffect(() => {
    if (finish.id === displayed.finish.id && tint.id === displayed.tint.id) return
    timers.current.forEach(clearTimeout)
    timers.current = []
    setPhase('leave')
    timers.current.push(
      setTimeout(() => {
        setDisplayed({ finish, tint })
        setPhase('enter')
        timers.current.push(setTimeout(() => setPhase(''), 300))
      }, 300)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [finish, tint])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const haloGradient = `radial-gradient(circle at 50% 50%, ${finish.accent}55, transparent 65%)`

  return (
    <div className="cz">
      <div className="cz__stage">
        <div className="cz__halo" style={{ background: haloGradient }} aria-hidden="true" />
        <div
          key={displayed.finish.id + displayed.tint.id}
          className={`cz__swap${phase ? ' cz__swap--' + phase : ''}`}
        >
          <AuraGlasses
            finish={displayed.finish}
            lensTint={displayed.tint}
            glow={0.7}
            hud={0.85}
            size={380}
          />
        </div>
      </div>

      <div className="cz__panel">
        <p className="cz__kicker">Make it yours</p>
        <h3 className="cz__name">{finish.name}</h3>

        <p className="cz__group-label">Frame finish</p>
        <div className="cz__swatches" role="radiogroup" aria-label="Frame finish">
          {FINISHES.map((f) => (
            <button
              key={f.id}
              className={`cz__swatch${f.id === finish.id ? ' cz__swatch--active' : ''}`}
              role="radio"
              aria-checked={f.id === finish.id}
              aria-label={f.name}
              style={{ '--sw': f.frame, '--swEdge': f.frameEdge }}
              onClick={() => setFinish(f)}
            >
              <span className="cz__swatch-dot" />
            </button>
          ))}
        </div>

        <p className="cz__group-label">Lens tint</p>
        <div className="cz__faces" role="radiogroup" aria-label="Lens tint">
          {TINTS.map((t) => (
            <button
              key={t.id}
              className={`cz__face${t.id === tint.id ? ' cz__face--active' : ''}`}
              role="radio"
              aria-checked={t.id === tint.id}
              onClick={() => setTint(t)}
            >
              <span className="cz__face-dot" style={{ background: t.color, opacity: 0.4 + t.opacity }} />
              {t.name}
            </button>
          ))}
        </div>

        <p className="cz__note">Mix and match in real time — every change re-renders the live glasses.</p>
      </div>
    </div>
  )
}
