# Apple Glass Aura — front-end showcase

A fictional Apple-style product page for invented smart glasses, **Apple Glass Aura**, built as a
front-end engineering portfolio piece. Every visual is drawn in **live SVG and CSS** — no product
photography, no UI libraries beyond React. The goal is to demonstrate Apple-grade interaction craft:
typography, motion, and component state.

> This is a concept/showcase. Apple and Apple Glass are trademarks of Apple Inc. Not affiliated
> with or endorsed by Apple.

## Highlights

- **Scroll-driven product film** — a pinned, scroll-scrubbed sequence (GSAP ScrollTrigger) where the
  glasses fly in, rotate to a three-quarter angle, ignite their lenses, zoom into the in-lens AR HUD,
  and settle — captions cross-fading at each beat (`GlassesShowcase.jsx`).
- **Live SVG glasses** — a titanium frame with tintable lenses, an illuminating display, and an
  animated AR HUD (time, navigation, live translation) drawn entirely in SVG (`AuraGlasses.jsx`).
- **Interactive customizer** — pick a frame finish and lens tint; the live glasses re-render
  instantly from reactive state (`GlassesCustomizer.jsx`).
- **Scroll-reveal sections** — every section eases in via `IntersectionObserver`; an animated
  spatial-audio equalizer and a brightness scale add motion (`RevealOnScroll.jsx`).
- **Apple-clean chrome** — frosted, scroll-aware sticky nav; gradient display type; responsive down
  to 375px.
- **Accessible & reduced-motion aware** — semantic landmarks, ARIA on the customizer radio groups, a
  skip link, and a static fallback for the scroll film when `prefers-reduced-motion` is set.

## Stack

| Area      | Choice                            |
| --------- | --------------------------------- |
| Framework | React 18                          |
| Routing   | React Router 6 (locale segments)  |
| Styling   | Plain component-scoped CSS        |
| Graphics  | Hand-authored SVG, no images      |
| Tooling   | Vite 5                            |

## Structure

- `src/views/Product.jsx` — page composition and section choreography.
- `src/components/product/*` — nav, hero, scroll film, feature sections, customizer, specs, footer.
- `src/data/product.js` — all product copy, finishes, lens tints, specs, and the scroll-film
  storyboard in one content model.

Root `/` redirects to the default locale; the page lives at `/:locale` (`en` or `tw`).

## Local development

```bash
npm install
npm run dev
```

```bash
npm run build
npm run preview
```

Uses [Vite configuration](https://vitejs.dev/config/) (`vite.config.js`).

## Deploy (GitHub Pages)

Project sites need the correct asset base URL. Build with `PUBLIC_PATH` set to your repository path:

```bash
PUBLIC_PATH=/your-repo-name/ npm run build
```

`PUBLIC_PATH` defaults to `/` and is read by `vite.config.js` as the base URL.
