/**
 * Content model for the Apple Glass Aura product page.
 * A fictional flagship used to showcase front-end interaction craft.
 */

/** Frame finishes — `frame`/`frameEdge` drive the SVG gradient, `accent` tints the HUD glow. */
export const FINISHES = [
  { id: 'titanium', name: 'Natural Titanium', frame: '#bcb8b1', frameEdge: '#8f8b84', accent: '#7fd7ff' },
  { id: 'graphite', name: 'Graphite', frame: '#48484d', frameEdge: '#222226', accent: '#8ad7ff' },
  { id: 'sand', name: 'Desert Sand', frame: '#e3c9a4', frameEdge: '#bd9f74', accent: '#ffd18a' },
  { id: 'aura', name: 'Aura Rose', frame: '#f4a3c0', frameEdge: '#d96f9a', accent: '#ff9ad1' },
]

/** Lens tints for the customizer. */
export const TINTS = [
  { id: 'clear', name: 'Clear', color: '#9fb4c4', opacity: 0.18 },
  { id: 'smoke', name: 'Smoke', color: '#2a2c33', opacity: 0.55 },
  { id: 'rose', name: 'Rose', color: '#d98aa6', opacity: 0.4 },
  { id: 'gold', name: 'Gold', color: '#caa861', opacity: 0.42 },
]

export const SPECS = [
  { k: 'Display', v: 'microLED', sub: '4,000 nits, etched onto each lens' },
  { k: 'Field of view', v: '48°', sub: 'Edge-to-edge spatial canvas' },
  { k: 'Weight', v: '32 g', sub: 'Grade 5 titanium, all-day light' },
  { k: 'Cameras', v: '12 MP ×2', sub: 'Stereo capture + depth' },
  { k: 'Battery', v: '18 hours', sub: 'Magnetic clip-on top-up' },
  { k: 'Audio', v: 'Spatial', sub: 'Beam-formed, private to you' },
]

export const FEATURES = [
  {
    id: 'display',
    eyebrow: 'Display',
    title: 'A private display,\netched into glass.',
    body: 'Two microLED engines paint 4,000-nit imagery directly onto the lens. Bright enough for noon sun, invisible to everyone but you.',
  },
  {
    id: 'spatial',
    eyebrow: 'Spatial Audio',
    title: 'Sound that only\nyou can hear.',
    body: 'Beam-formed drivers in each temple place audio in the world around you — turn-by-turn in your ear, music over your shoulder, nothing leaking out.',
  },
  {
    id: 'intelligence',
    eyebrow: 'Apple Intelligence',
    title: 'It sees what\nyou see.',
    body: 'On-device intelligence reads signs, translates menus, and remembers where you parked — privately, the instant you glance.',
  },
]

export const HERO = {
  badge: 'New',
  product: 'Apple Glass',
  model: 'Aura',
  tagline: 'Look up. The world, annotated.',
  sub: 'The first Apple display you wear on your face — 32 grams of titanium, all day, hands-free.',
  priceLine: 'From $899 or $74.91/mo. for 12 mo.',
  ctaPrimary: 'Buy',
  ctaSecondary: 'Watch the film',
}

/** Scroll-driven storyboard captions (used by GlassesShowcase). */
export const SHOWCASE = [
  { at: 0.06, title: 'Apple Glass Aura', sub: 'Hello, heads-up.' },
  { at: 0.30, title: 'Featherlight titanium', sub: '32 grams. You’ll forget it’s on.' },
  { at: 0.54, title: 'microLED on glass', sub: 'A bright, private display, etched into the lens.' },
  { at: 0.76, title: 'Your world, annotated', sub: 'Directions, translations, and moments — right where you look.' },
  { at: 0.95, title: 'Look up.', sub: 'Everything’s there.' },
]

export const METRICS = [
  { v: '32 g', label: 'Titanium frame' },
  { v: '48°', label: 'Field of view' },
  { v: '18 hr', label: 'All-day battery' },
]
