import { useRef } from 'react'
import './AuraGlasses.css'

let _seq = 0

const VB_W = 360
const VB_H = 200
const LX = 116
const RX = 244

/** Rounded, slightly-squared lens centered on cx. */
function lensPath(cx) {
  const w = 92
  const h = 84
  const r = 34
  const x = cx - w / 2
  const y = 100 - h / 2
  return `M${x + r} ${y}
    H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r}
    V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h}
    H${x + r} Q${x} ${y + h} ${x} ${y + h - r}
    V${y + r} Q${x} ${y} ${x + r} ${y} Z`
}

export default function AuraGlasses({
  finish,
  lensTint = { color: '#9fb4c4', opacity: 0.18 },
  glow = 0,
  hud = 0,
  size = 340,
}) {
  // Stable per-instance id for gradient/clip references.
  const instanceIdRef = useRef(0)
  if (instanceIdRef.current === 0) instanceIdRef.current = ++_seq
  const instanceId = instanceIdRef.current
  const uid = (part) => `ag-${instanceId}-${part}`

  const accent = finish.accent

  return (
    <div
      className="glasses"
      style={{ width: '100%', maxWidth: size + 'px' }}
      role="img"
      aria-label={`Apple Glass Aura, ${finish.name} frame`}
    >
      <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="glasses__svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id={uid('frame')} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={finish.frame} />
            <stop offset="0.5" stopColor={finish.frameEdge} />
            <stop offset="1" stopColor={finish.frame} />
          </linearGradient>
          <radialGradient id={uid('lensBase')} cx="0.4" cy="0.3" r="0.85">
            <stop offset="0" stopColor="#11151c" stopOpacity="0.55" />
            <stop offset="1" stopColor="#05070b" stopOpacity="0.85" />
          </radialGradient>
          <radialGradient id={uid('glow')} cx="0.5" cy="0.5" r="0.65">
            <stop offset="0" stopColor={accent} stopOpacity="0.9" />
            <stop offset="0.55" stopColor={accent} stopOpacity="0.25" />
            <stop offset="1" stopColor={accent} stopOpacity="0" />
          </radialGradient>
          <clipPath id={uid('clipL')}>
            <path d={lensPath(LX)} />
          </clipPath>
          <clipPath id={uid('clipR')}>
            <path d={lensPath(RX)} />
          </clipPath>
        </defs>

        {/* Temple arms (hinted) */}
        <path d={`M40 96 Q14 92 8 104`} fill="none" stroke={`url(#${uid('frame')})`} strokeWidth="9" strokeLinecap="round" />
        <path d={`M${VB_W - 40} 96 Q${VB_W - 14} 92 ${VB_W - 8} 104`} fill="none" stroke={`url(#${uid('frame')})`} strokeWidth="9" strokeLinecap="round" />

        {/* Lenses (base + tint + glow + HUD) */}
        {[LX, RX].map((cx) => (
          <g key={cx}>
            <path d={lensPath(cx)} fill={`url(#${uid('lensBase')})`} />
            <path d={lensPath(cx)} fill={lensTint.color} fillOpacity={lensTint.opacity} />
            <path
              d={lensPath(cx)}
              fill={`url(#${uid('glow')})`}
              style={{ opacity: glow * 0.85, transition: 'opacity 0.2s linear' }}
            />
            {/* reflection sweep */}
            <path
              d={`M${cx - 46} 70 L${cx - 10} 70 L${cx - 40} 134 L${cx - 70} 134 Z`}
              fill="#ffffff"
              fillOpacity="0.05"
              clipPath={`url(#${uid(cx === LX ? 'clipL' : 'clipR')})`}
            />
          </g>
        ))}

        {/* HUD inside the right lens */}
        <g clipPath={`url(#${uid('clipR')})`} style={{ opacity: hud, transition: 'opacity 0.2s linear' }}>
          <g fill={accent}>
            <text x={RX - 36} y="78" className="glasses__hud-time">10:09</text>
            <text x={RX - 36} y="92" className="glasses__hud-label">TUESDAY</text>
          </g>
          {/* navigation chip */}
          <g transform={`translate(${RX - 38} 104)`}>
            <rect width="76" height="22" rx="11" fill={accent} fillOpacity="0.16" stroke={accent} strokeOpacity="0.5" />
            <path d="M10 15 L16 6 L22 15 L16 12 Z" fill={accent} />
            <text x="30" y="15" className="glasses__hud-chip" fill={accent}>450 m</text>
          </g>
          {/* translate chip */}
          <text x={RX - 36} y="146" className="glasses__hud-chip" fill={accent}>menú → menu</text>
        </g>

        {/* Frame outlines on top */}
        <path d={lensPath(LX)} fill="none" stroke={`url(#${uid('frame')})`} strokeWidth="8" />
        <path d={lensPath(RX)} fill="none" stroke={`url(#${uid('frame')})`} strokeWidth="8" />
        {/* bridge */}
        <path d={`M${LX + 46} 78 Q${VB_W / 2} 64 ${RX - 46} 78`} fill="none" stroke={`url(#${uid('frame')})`} strokeWidth="8" strokeLinecap="round" />

        {/* camera + indicator */}
        <circle cx={LX - 40} cy="74" r="4.5" fill="#0a0a0c" stroke={finish.frameEdge} strokeWidth="1.5" />
        <circle cx={LX - 40} cy="74" r="1.6" fill={accent} style={{ opacity: 0.4 + glow * 0.6 }} />
      </svg>
    </div>
  )
}
