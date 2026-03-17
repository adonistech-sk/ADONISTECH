# Mobile Performance Audit — AdonisТech

> Audited: 2026-03-14
> Scope: Full codebase — mobile jank, blank hero, broken navbar, FPS drops
> Priority order: P0 (broken) → P1 (severe jank) → P2 (bundle/load) → P3 (minor)

---

## P0 — CRITICAL BUGS (UI is broken on mobile)

---

### BUG-01: Hero section is completely blank on mobile

**File:** `src/spline skill/react-spline-wrapper.tsx` — lines 24–36, 98–118
**File:** `src/pages/Home.tsx` — line 22

**Problem:**
`shouldLoadSpline()` correctly skips the 3D scene on mobile. But `onLoad` is wired to the Spline component's load event. When Spline is never mounted (because `canLoad = false`), `onLoad` is never called, so `setHeroLoaded(true)` in `Home.tsx` never fires. Additionally `fallbackColor="transparent"` is passed, making the entire hero div invisible. The children slot (the CTA button) is also hidden because it reads `opacity: splineLoaded ? 1 : 0`, and `splineLoaded` is forever `false` on mobile.

**Why it causes mobile jank specifically:**
The hero is 100vh of nothing. Users see a white screen. This is not jank — it is completely broken on every mobile device.

**Fix — `src/spline skill/react-spline-wrapper.tsx`:**

```tsx
// Line 54 — after setCanLoad, immediately fire onLoad if Spline won't be loaded
useEffect(() => {
  const capable = shouldLoadSpline(mobileBreakpoint);
  setCanLoad(capable);
  // If device can't load Spline, signal the parent immediately
  if (!capable && onLoadProp) {
    onLoadProp();
  }
}, [mobileBreakpoint]);
```

Also set `splineLoaded = true` immediately when not capable so children become visible:

```tsx
// Replace the canLoad state initialization
const [splineLoaded, setSplineLoaded] = useState(false);

// In the useEffect above, also set:
if (!capable) {
  setSplineLoaded(true);
}
```

**Fix — `src/pages/Home.tsx` line 22:**
Change `fallbackColor` from `"transparent"` to a visible color that matches your design:

```tsx
// Before
fallbackColor="transparent"

// After — use the same gradient color the background already provides
fallbackColor="rgba(220, 235, 255, 0.0)"  // or simply remove it; the App.tsx gradient shows through
```

The children visibility fix is already handled by setting `splineLoaded = true` above.

---

### BUG-02: Navbar permanently hidden on mobile home page

**File:** `src/App.tsx` — lines 11–16
**File:** `src/spline skill/react-spline-wrapper.tsx` — line 75 (`onLoad` prop)

**Problem:**
`showNavBar = !isHomePage || heroLoaded`. On mobile, `heroLoaded` is set via `onLoad={() => setHeroLoaded(true)}` passed into `SplineBackground`. Since Spline never mounts on mobile, this callback never fires. The navbar sits at `opacity: 0, translateY(-24px)` with a `3.5s` transition delay forever.

**Why it causes mobile jank specifically:**
Not jank — the nav is completely invisible. Users cannot navigate. This is the most critical functional bug.

**Fix — `src/App.tsx`:**
This is fixed automatically once BUG-01 is fixed (`onLoadProp()` fires immediately on incapable devices). No additional change needed beyond BUG-01's fix.

---

## P1 — SEVERE JANK (causes dropped frames, sluggish feel)

---

### JANK-01: `filter: blur(80px)` on a 1200×1200px fixed background — no GPU layer

**File:** `src/App.tsx` — lines 38–47

**Problem:**
```tsx
<div
  className="w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] absolute"
  style={{
    background: 'radial-gradient(...)',
    filter: 'blur(80px)',          // <-- the killer
    transform: 'translateY(-10%)'
  }}
/>
```
This element is up to 1,440,000px² (1200×1200). `filter: blur(80px)` is a Gaussian blur with a huge radius applied to that entire surface. The browser must rasterize the full element and run a multi-pass blur kernel on every repaint. On mobile, this runs on a low-end GPU with shared memory. The `transform` does NOT create a compositing layer here because there is no `will-change` or `translateZ(0)` to promote it. Every scroll causes a repaint of this element.

**Why it causes mobile jank specifically:**
Mobile GPUs have a fraction of the memory bandwidth of desktop GPUs. A 1200×1200px blur at 80px radius requires sampling thousands of pixels per output pixel. This alone causes 16ms+ frame overruns, dropping you below 30fps during any scroll.

**Fix:**
```tsx
<div
  className="w-[120vw] h-[120vw] max-w-[1200px] max-h-[1200px] absolute"
  style={{
    background: 'radial-gradient(circle at center, rgba(160,200,255,0.8) 0%, rgba(220,150,255,0.6) 30%, rgba(255,160,180,0.4) 60%, rgba(255,255,255,0) 100%)',
    filter: 'blur(80px)',
    transform: 'translateY(-10%) translateZ(0)',  // promotes to own GPU layer
    willChange: 'transform',                       // tells browser to keep layer alive
  }}
/>
```

---

### JANK-02: SVG `feTurbulence + feDisplacementMap + feGaussianBlur` filter on CTA button

**File:** `src/components/ui/liquid-glass-button.tsx` — lines 119–122, 134–177

**Problem:**
```tsx
<div
  className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-md"
  style={{ backdropFilter: 'url("#container-glass")' }}  // <-- SVG filter
/>
```
The SVG filter `#container-glass` runs: `feTurbulence` (noise generation) → `feGaussianBlur` (blur the noise) → `feDisplacementMap` (distort source graphic) → `feGaussianBlur` (blur result). This is a 4-stage filter pipeline applied as a `backdropFilter`, meaning it has to sample and process every pixel behind the button on every frame. This is among the most GPU-expensive operations possible.

**Why it causes mobile jank specifically:**
`backdropFilter` with an SVG filter requires the browser to: (1) flatten all layers behind the element, (2) run all four filter passes, (3) composite the result back. On mobile this easily takes 8–30ms per frame, alone causing the page to miss its 16ms frame budget.

**Fix — disable the expensive SVG backdrop on mobile, keep it on desktop:**
```tsx
function LiquidButton({ className, variant, size, asChild = false, children, ...props }) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    setIsMobile(window.innerWidth < 768 ||
      !window.matchMedia('(hover: hover)').matches);
  }, []);

  return (
    <>
      <Comp ...>
        <div className="absolute top-0 left-0 z-0 h-full w-full rounded-full shadow-[...]
          transition-all" />
        {/* Only apply the expensive SVG filter on capable (desktop) devices */}
        {!isMobile && (
          <div
            className="absolute top-0 left-0 isolate -z-10 h-full w-full overflow-hidden rounded-md"
            style={{ backdropFilter: 'url("#container-glass")' }}
          />
        )}
        <div className="pointer-events-none z-10">{children}</div>
        {!isMobile && <GlassFilter />}
      </Comp>
    </>
  );
}
```

---

### JANK-03: `filter: blur(10px)` animation on `BlurIn` — not GPU-composited

**File:** `src/components/ui/blur-in.tsx` — lines 17–19

**Problem:**
```tsx
const defaultVariants = {
  hidden: { filter: "blur(10px)", opacity: 0 },  // <-- filter animation
  visible: { filter: "blur(0px)", opacity: 1 },
};
```
Animating `filter: blur()` is **not** GPU-composited. The browser must repaint the element every frame of this animation, executing the blur kernel on each frame. On desktop this is fine. On mobile, every frame of this entrance animation takes 5–15ms for the blur pass alone.

**Why it causes mobile jank specifically:**
The entrance animation ("Recent Projects" title in `HeroScrollDemo`) fires on scroll into view. On mobile, the blur-to-clear transition causes visible frame drops during what should be the smoothest moment of the scroll experience.

**Fix — replace blur animation with a composited opacity + transform only:**
```tsx
// blur-in.tsx — keep the same visual result using only GPU-composited properties
const defaultVariants = {
  hidden: { opacity: 0, y: 8 },      // translateY is composited
  visible: { opacity: 1, y: 0 },
};
```
This is visually nearly identical (text fades up into place) but runs entirely on the GPU compositor with zero paint cost.

---

### JANK-04: 178 individual `motion.span` scroll subscriptions in `TextGradientScroll`

**File:** `src/components/ui/text-gradient-scroll.tsx` — lines 102–148
**File:** `src/components/TextGradientScrollExample.tsx` — line 11

**Problem:**
The text passed is 178 characters long. The component splits by word (31 words), then each word splits by character. Each character creates:
- A `Char` component with `useTransform(progress, range, [0, 1])` — a derived MotionValue
- A `motion.span` that subscribes to that MotionValue

Result: **178 active MotionValue subscriptions** to the scroll position, each recomputing on every scroll tick. Additionally, each `motion.span` has `style={{ transition: "all .5s", opacity }}` — `transition: "all"` forces the browser to monitor ALL CSS properties for transitions, not just opacity.

**Why it causes mobile jank specifically:**
On mobile, scroll events fire at 60Hz. Each tick executes 178 MotionValue derivations + 178 DOM style updates + "all" property transition recalculation. This alone can consume 8–20ms of JS execution per scroll frame, more than the entire frame budget.

**Fix — Part 1, remove `transition: "all"`:**
```tsx
// text-gradient-scroll.tsx line 95 — Word component
<motion.span style={{ opacity: opacity }}>   // remove transition:"all .5s"

// line 141 — Char component
<motion.span style={{ opacity: opacity }}>   // remove transition:"all .5s"
```

**Fix — Part 2, reduce subscriptions by animating words, not characters:**
In `TextGradientScrollExample.tsx`, switch from letter-by-letter to word-by-word:
```tsx
<TextGradientScroll
  text="Behind every successful business..."
  type="word"          // was: type="letter" (default)
  className="justify-center"
/>
```
This reduces 178 subscriptions to 31 — an 83% reduction in scroll-tick work.

---

### JANK-05: `backdrop-blur` on 16 simultaneously rendered carousel cards

**File:** `src/components/ProjectsCarousel.tsx` — line 169

**Problem:**
```tsx
className="group flex-none w-[75vw] md:w-[480px] bg-white/40 backdrop-blur-xl rounded-[32px]..."
```
The projects array is duplicated (`[...projects, ...projects]` = 8 cards). Each visible card has `backdrop-blur-xl` (`blur(24px)`). On a mobile screen showing 1–2 cards, 3–4 cards are in the render buffer. Each `backdrop-blur` requires compositing everything behind that card and applying a blur. With multiple overlapping elements, this cascades.

**Why it causes mobile jank specifically:**
Backdrop-blur is one of the most GPU-expensive CSS properties. Multiple simultaneous instances on mobile can cause the compositor to exceed VRAM limits, triggering software fallbacks (zero FPS).

**Fix — reduce blur radius significantly on mobile:**
```tsx
// ProjectsCarousel.tsx line 169
className="group flex-none w-[75vw] md:w-[480px] bg-white/40
  backdrop-blur-sm md:backdrop-blur-xl  // blur(4px) on mobile, full blur on desktop
  rounded-[32px] border border-white/50 overflow-hidden..."
```
`backdrop-blur-sm` is `blur(4px)` — visually similar at mobile resolutions, ~36× cheaper GPU cost.

---

### JANK-06: `backdrop-blur-2xl` on 9 testimonial cards running infinite animation simultaneously

**File:** `src/components/ui/testimonials-columns-1.tsx` — line 36
**File:** `src/components/TestimonialsDemo.tsx` — lines 92–94

**Problem:**
```tsx
<div className="p-10 rounded-3xl border border-white/40 bg-white/40 backdrop-blur-2xl ...">
```
Three columns of testimonials, each with 6 cards (3 real + duplicated for infinite scroll) = up to 18 backdrop-blur instances. All three columns run `motion.div` with `animate={{ translateY: "-50%" }}` in an infinite loop. Every frame of this animation recomposites every backdrop-blurred card.

**Why it causes mobile jank specifically:**
The infinite translateY animation means the compositor layer for each card is being moved every frame. Each move requires re-compositing the blur. 18 blurred cards × continuous animation = constant GPU saturation on mobile.

**Fix — reduce to `backdrop-blur-sm` on mobile, and only render 1 column on mobile (which is already done via `hidden md:block` on columns 2 and 3):**
```tsx
// testimonials-columns-1.tsx line 36
<div className="p-10 rounded-3xl border border-white/40 bg-white/40
  backdrop-blur-sm md:backdrop-blur-2xl    // 4px blur on mobile
  shadow-xl shadow-black/5 max-w-xs w-full text-black">
```

---

### JANK-07: Two competing Lenis smooth-scroll instances

**File:** `src/components/ui/stacking-card.tsx` — line 2 (`ReactLenis root`)
**File:** `src/components/ui/scroll-stack.tsx` — line 202–259 (own Lenis instance)

**Problem:**
```tsx
// stacking-card.tsx line 110
<ReactLenis root>   // Creates a global Lenis instance for the window
  <main ...>{/* stacking cards */}</main>
</ReactLenis>
```
And separately, `scroll-stack.tsx` `setupLenis()` creates its own Lenis instance (either also on the window or on a scroller element). Two Lenis instances both listening to scroll/wheel events causes them to fight: each applies easing independently, resulting in double-eased scroll on mobile.

**Why it causes mobile jank specifically:**
On mobile, touch events are particularly sensitive. Double-processing of touch scroll velocity produces stuttery, rubber-band-like scroll that fights native momentum scrolling. iOS Safari in particular has strict expectations about how touch scroll is handled.

**Fix — use only ONE Lenis instance.** The `ReactLenis root` in `stacking-card.tsx` should be the single source of truth. Remove the Lenis creation from `scroll-stack.tsx` when `useWindowScroll = true` and instead subscribe to window scroll events directly:

```tsx
// scroll-stack.tsx — in setupLenis(), when useWindowScroll is true,
// skip creating a new Lenis instance and just listen to native scroll
if (useWindowScroll) {
  const onScroll = () => handleScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  return () => window.removeEventListener('scroll', onScroll);
}
// Only create a contained Lenis for the scroller-element path
```

---

### JANK-08: `resize` event listener without throttle/debounce in navbar

**File:** `src/components/ui/tubelight-navbar.tsx` — lines 25–32

**Problem:**
```tsx
useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768)   // state update on every pixel of resize
  }
  window.addEventListener("resize", handleResize)  // no throttle
  return () => window.removeEventListener("resize", handleResize)
}, []);
```
Every pixel of window resize triggers a React state update → re-render of the full navbar. On mobile, the virtual keyboard opening/closing fires a rapid burst of resize events.

**Why it causes mobile jank specifically:**
When a user taps an input on any page, the virtual keyboard slides up, firing dozens of resize events. Each fires a setState, causing the navbar to re-render during the keyboard animation — producing visible frame drops at exactly the wrong moment.

**Fix:**
```tsx
useEffect(() => {
  let rafId: number;
  const handleResize = () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      setIsMobile(window.innerWidth < 768);
    });
  };
  window.addEventListener("resize", handleResize, { passive: true });
  return () => {
    window.removeEventListener("resize", handleResize);
    cancelAnimationFrame(rafId);
  };
}, []);
```

---

### JANK-09: `resize` event listener without throttle in `ContainerScroll`

**File:** `src/components/ui/container-scroll-animation.tsx` — lines 18–27

**Problem:**
```tsx
React.useEffect(() => {
  const checkMobile = () => {
    setIsMobile(window.innerWidth <= 768)   // setState on every resize pixel
  }
  checkMobile()
  window.addEventListener("resize", checkMobile)   // no throttle
  return () => window.removeEventListener("resize", checkMobile)
}, []);
```
Same as JANK-08. The `scaleDimensions()` function is called every render and recalculates the `useTransform` scale range. Rapid resize events cause rapid re-renders and scroll subscription rebuilds.

**Fix:** Apply identical `requestAnimationFrame` throttle as JANK-08.

---

## P2 — BUNDLE & LOADING ISSUES

---

### LOAD-01: Both `framer-motion` AND `motion` packages bundled simultaneously

**File:** `src/components/ui/tubelight-navbar.tsx` — line 4 (`from "framer-motion"`)
**File:** `src/components/ui/blur-in.tsx` — line 3 (`from "framer-motion"`)
**File:** `src/components/ui/text-gradient-scroll.tsx` — line 4 (`from "framer-motion"`)
**File:** `src/components/ui/stacking-card.tsx` — line 3 (`from "motion/react"`)
**File:** `src/components/ui/testimonials-columns-1.tsx` — line 3 (`from "motion/react"`)
**File:** `src/components/TestimonialsDemo.tsx` — line 3 (`from "motion/react"`)
**File:** `package.json` — lines listing both `"framer-motion"` and `"motion"`

**Problem:**
`framer-motion` is the old package name; `motion` is the new one. They are **not** deduplicated by bundlers because they have different package names. Both ship with full animation engines, React bindings, and easing utilities. The user's bundle contains both — approximately doubling the animation library size (~130KB minified vs ~65KB for one).

**Fix — standardise on `motion/react` everywhere:**
```tsx
// Change all framer-motion imports:
// Before:
import { motion } from "framer-motion"
import { useScroll, useTransform, motion, MotionValue } from "framer-motion"

// After:
import { motion } from "motion/react"
import { useScroll, useTransform, motion, MotionValue } from "motion/react"
```

Files to update: `tubelight-navbar.tsx`, `blur-in.tsx`, `text-gradient-scroll.tsx`
Then remove `"framer-motion"` from `package.json` dependencies.

> **Note:** Do NOT add a Vite alias `'framer-motion': 'motion'` — lenis internally imports `framer-motion/dom` which is a subpath that does not exist in the `motion` package, causing build failures. Change source imports directly.

---

### LOAD-02: No code splitting — entire app in one JS bundle

**File:** `vite.config.ts` — no `build.rollupOptions` configured
**File:** `src/App.tsx` — all pages imported statically
**File:** `src/pages/Home.tsx` — all sections imported statically

**Problem:**
Every page, every animation library, every component loads on the first visit. The Spline runtime alone is ~2MB. The main JS bundle clocks in at ~27,000ms CPU parse+execute time on a mid-range mobile device (from Lighthouse TBT metric).

**Fix — `vite.config.ts`:**
```ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vendor-react':  ['react', 'react-dom', 'react-router-dom'],
        'vendor-motion': ['motion'],
        'vendor-spline': ['@splinetool/react-spline', '@splinetool/runtime'],
        'vendor-lenis':  ['lenis'],
        'vendor-radix':  ['@radix-ui/react-accordion', '@radix-ui/react-slot'],
      },
    },
  },
  chunkSizeWarningLimit: 1000,
},
```

**Fix — `src/App.tsx` — lazy-load non-Home pages:**
```tsx
import React, { lazy, Suspense } from 'react';
const ContactPage     = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const AboutPage       = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ProjectsPage    = lazy(() => import('./pages/ProjectsPage').then(m => ({ default: m.ProjectsPage })));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage').then(m => ({ default: m.PrivacyPolicyPage })));

// Wrap <Routes> in:
<Suspense fallback={null}>
  <Routes>...</Routes>
</Suspense>
```

**Fix — `src/pages/Home.tsx` — lazy-load every below-fold section:**
```tsx
import React, { lazy, Suspense } from 'react';
// Keep eagerly: SplineBackground, LiquidButton
const LogoCarousel             = lazy(() => import('../components/ui/logo-carousel').then(m => ({ default: m.LogoCarousel })));
const ProjectsCarousel         = lazy(() => import('../components/ProjectsCarousel').then(m => ({ default: m.ProjectsCarousel })));
const StackingCardDemo         = lazy(() => import('../components/StackingCardDemo').then(m => ({ default: m.StackingCardDemo })));
const HeroScrollDemo           = lazy(() => import('../components/HeroScrollDemo').then(m => ({ default: m.HeroScrollDemo })));
const TextGradientScrollExample = lazy(() => import('../components/TextGradientScrollExample').then(m => ({ default: m.TextGradientScrollExample })));
const TestimonialsDemo         = lazy(() => import('../components/TestimonialsDemo').then(m => ({ default: m.TestimonialsDemo })));
const FAQs                     = lazy(() => import('../components/ui/text-reveal-faqs'));
const HoverFooter              = lazy(() => import('../components/HoverFooterDemo').then(m => ({ default: m.HoverFooter })));

// Wrap the below-fold div in:
<Suspense fallback={null}>
  {/* all below-fold sections */}
</Suspense>
```

---

### LOAD-03: Google Fonts stylesheet is render-blocking

**File:** `index.html` — line 9

**Problem:**
```html
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:...&display=swap" rel="stylesheet">
```
Even though `display=swap` is set, the `<link rel="stylesheet">` tag blocks the browser from painting anything until the CSS file is downloaded and parsed. On a mobile 4G connection this adds 150–400ms to First Contentful Paint.

**Fix:**
```html
<!-- Replace the blocking link with async preload -->
<link rel="preload" as="style"
  href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
  onload="this.onload=null;this.rel='stylesheet'">
<noscript>
  <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet">
</noscript>
```

---

### LOAD-04: No lazy loading on any below-fold images

**Files and lines:**
- `src/components/HeroScrollDemo.tsx:17` — large Supabase image, no `loading`
- `src/components/ProjectsCarousel.tsx:177` — 8 carousel images, no `loading`
- `src/components/BentoDemo.tsx:10,18,26,34,42` — 5 bento images, no `loading`
- `src/components/ui/stacking-card.tsx:89` — 5 card images, no `loading`
- `src/components/ui/testimonials-columns-1.tsx:41` — 18 avatar images, no `loading`

**Problem:**
All images begin downloading immediately on page load regardless of their scroll position. On mobile, this competes with JS parsing and critical render-path resources for limited bandwidth.

**Fix — add to every below-fold `<img>`:**
```tsx
loading="lazy"
decoding="async"
```

For carousel images, also add intrinsic size hints to prevent CLS:
```tsx
width={480}
height={320}
```

---

## P3 — MINOR OPTIMISATIONS

---

### MINOR-01: `will-change: opacity, transform` on ALL `[data-reveal]` elements from page load

**File:** `src/index.css` — line 183

**Problem:**
```css
[data-reveal] {
  will-change: opacity, transform;  /* applied to every section immediately */
}
```
`will-change` tells the browser to create a GPU compositor layer in advance. Applied globally to every `[data-reveal]` element — including those far below the fold — this creates many GPU layers at page load, consuming mobile GPU memory and potentially causing memory pressure that itself causes jank.

**Fix — set `will-change` via JS only immediately before the animation, remove it after:**
In `src/hooks/useScrollReveal.ts`, when observing an element:
```ts
// When element is about to enter viewport, set will-change
observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target as HTMLElement;
      el.classList.add('revealed');
      if (once) {
        observer.unobserve(el);
        // Release GPU layer ~600ms after animation completes
        const delay = el.getAttribute('data-reveal-delay');
        const duration = 600 + (delay ? parseInt(delay, 10) : 0);
        setTimeout(() => { el.style.willChange = 'auto'; }, duration);
      }
    }
  });
}, { threshold, rootMargin });
```

And remove from CSS:
```css
[data-reveal] {
  opacity: 0;
  transform: translateY(32px) scale(0.97);
  transition: opacity 0.55s cubic-bezier(...), transform 0.55s cubic-bezier(...);
  /* Remove: will-change: opacity, transform; */
}
```

---

### MINOR-02: `transition: "all"` on motion spans

**File:** `src/components/ui/text-gradient-scroll.tsx` — lines 95, 141

**Problem:**
```tsx
<motion.span style={{ transition: "all .5s", opacity: opacity }}>
```
`transition: "all"` instructs the CSS engine to prepare transitions for every animatable property. This adds overhead to every style recalculation.

**Fix:**
```tsx
// Remove transition:"all .5s" — framer-motion/motion handles its own animation scheduling
<motion.span style={{ opacity: opacity }}>
```

---

### MINOR-03: Scroll to top on nav link click uses `behavior: 'smooth'`

**File:** `src/components/ui/tubelight-navbar.tsx` — line 65

**Problem:**
```tsx
onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
```
`behavior: 'smooth'` triggers a JavaScript-driven scroll animation that runs on the main thread, competing with route transition animations. On mobile this causes a visual stutter when navigating between pages.

**Fix:**
```tsx
onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}
```
Instant scroll on navigation is standard UX — React Router already handles the scroll restoration, and the page transition handles the visual reveal.

---

### MINOR-04: Spline runtime bundled eagerly for mobile (then discarded)

**File:** `src/spline skill/react-spline-wrapper.tsx` — line 10

**Problem:**
```tsx
const Spline = lazy(() => import('@splinetool/react-spline'));
```
The Spline component itself is lazy-loaded, but the `shouldLoadSpline()` check runs synchronously on mount. On mobile, `canLoad` becomes `false` and Spline never imports. However, `@splinetool/runtime` is still in `manualChunks` (if code-splitting is set up), and on the `vendor-spline` chunk being included in the build. This is fine if the chunk is truly never loaded — verify with bundle analyzer.

**No code fix needed** if `lazy()` is already wrapping the Spline import — the chunk should only download when `canLoad` is true. Confirm with: `npm run build && npx vite-bundle-visualizer`.

---

## Summary — Fix Priority Order

| # | ID | Impact | File(s) | Effort |
|---|-----|--------|---------|--------|
| 1 | BUG-01 | Hero blank on mobile | `react-spline-wrapper.tsx` | Low |
| 2 | BUG-02 | Navbar hidden on mobile | Fixed by BUG-01 | Zero |
| 3 | JANK-01 | `blur(80px)` background no GPU layer | `App.tsx:42` | 2 lines |
| 4 | JANK-02 | SVG filter on CTA button | `liquid-glass-button.tsx:119` | Low |
| 5 | JANK-03 | `filter:blur` animation (not composited) | `blur-in.tsx:18` | 2 lines |
| 6 | JANK-04 | 178 motion subscriptions per scroll tick | `text-gradient-scroll.tsx`, `TextGradientScrollExample.tsx` | Low |
| 7 | JANK-05 | backdrop-blur on 16 carousel cards | `ProjectsCarousel.tsx:169` | 1 line |
| 8 | JANK-06 | backdrop-blur on 18 animated testimonial cards | `testimonials-columns-1.tsx:36` | 1 line |
| 9 | JANK-07 | Two competing Lenis instances | `stacking-card.tsx:2`, `scroll-stack.tsx:202` | Medium |
| 10 | JANK-08 | Resize listener floods React with state updates (navbar) | `tubelight-navbar.tsx:26` | Low |
| 11 | JANK-09 | Same as JANK-08 (ContainerScroll) | `container-scroll-animation.tsx:19` | Low |
| 12 | LOAD-01 | Both `framer-motion` + `motion` in bundle | Multiple files | Low |
| 13 | LOAD-02 | No code splitting | `vite.config.ts`, `App.tsx`, `Home.tsx` | Low |
| 14 | LOAD-03 | Render-blocking Google Fonts | `index.html:9` | 2 lines |
| 15 | LOAD-04 | No lazy loading on images | Multiple files | Low |
| 16 | MINOR-01 | `will-change` on all reveal elements from load | `index.css:183`, `useScrollReveal.ts` | Low |
| 17 | MINOR-02 | `transition:"all"` on motion spans | `text-gradient-scroll.tsx:95,141` | 2 lines |
| 18 | MINOR-03 | Smooth scroll on nav click | `tubelight-navbar.tsx:65` | 1 word |
