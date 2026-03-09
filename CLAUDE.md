# Portfolio - phatjam98.com

## Overview
Personal portfolio site for Travis Carter (Software Architect). Built with Astro 5, Tailwind CSS v4, MDX content collections, and deployed to Firebase Hosting.

## Master Plan
Full PRD archived in Claude Code session:
`/Users/traviscarter/.claude/projects/-Users-traviscarter-src/5cf8bffe-426e-494e-9076-d27f54bc830e.jsonl`

## Current State
All 4 original build phases complete. A full launch readiness pass has also been completed:
- **Phase 1**: Foundation (design system, layouts, theme toggle, nav, footer)
- **Phase 2**: Pages & components (all routes, cards, listing/detail pages)
- **Phase 3**: Content & interactivity (MDX case studies, Mermaid diagrams, D3 chart, scroll animations)
- **Phase 4**: Polish & launch (SEO meta tags, JSON-LD, robots.txt, favicon, 404 page, CI/CD workflow)
- **Launch Readiness**: Real About page content (Civil Engineering -> ECFX career arc), case studies rewritten with real interview data, explorations section added, nav/footer links extracted to shared data file, OG image generated, a11y improvements, social links fixed

Site has 12 pages. Writing articles are published.

### Known Follow-Ups
- [ ] **GitHub Actions** - `.github/workflows/deploy.yml` exists but needs Firebase project setup before it will run
- [ ] **Firebase deployment** - `firebase.json` + `.firebaserc` configured; Firebase project needs initialization (`firebase init`)
- [ ] **Default branch** - Should be changed to `main` in GitHub repo settings
- [x] **Writing articles** - `protobuf-elasticsearch` and `copy-paste-to-context-engineering` rewritten with real interview data and published
- [ ] **Custom domain** - `phatjam98.com` needs DNS + custom domain setup on Firebase Hosting

## Tech Stack
- **Framework**: Astro 5 (static output)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin (NOT `@astrojs/tailwind`)
- **Content**: MDX via `@astrojs/mdx`, Astro Content Collections with `glob()` loader
- **Charts**: D3.js v7 (client-side islands)
- **Diagrams**: astro-mermaid (client-side rendering, auto theme support)
- **Hosting**: Firebase Hosting
- **Repo**: github.com/phatjam98/portfolio

## Key Patterns

### Tailwind v4 Integration
- Use `@tailwindcss/vite` in `astro.config.mjs` vite plugins (NOT the deprecated `@astrojs/tailwind`)
- Dark mode via `@custom-variant dark (&:where(.dark, .dark *));` in global.css
- Design tokens in `@theme` block
- Light theme overrides via `html.light { ... }` CSS custom properties

### Content Collections (Astro 5)
- Config at `src/content.config.ts` (NOT `src/content/config.ts`)
- Uses `glob()` from `astro/loaders` and `z` from `astro/zod`
- Render with `import { render } from 'astro:content'` then `const { Content } = await render(entry)`
- Dynamic routes: `getStaticPaths()` returns `{ params: { slug: entry.id }, props: { entry } }`
- Writing articles use `status: "draft" | "published"` — only `published` entries appear in listings

### Navigation Data
- Nav and footer links are defined in `src/data/navigation.ts` (NOT duplicated in each component)
- Import and use this single source of truth in Nav and Footer components

### Content Conventions
- No em dashes anywhere — use colons, commas, parentheses, or restructure the sentence
- ECFX is anonymized as "law-tech startup" in all case study content
- Contact email: `phatjam98@gmail.com`

### Theme System
- Default: dark theme (`<html class="dark">`)
- Classes: `html.dark` / `html.light`
- FOUC prevention via `is:inline` script in `<head>` reading localStorage
- Components listen for `theme-change` CustomEvent for re-renders (D3 charts, Mermaid)
- ThemeToggle uses `data-theme-toggle` attribute (NOT id) to support multiple instances

### Mermaid Diagrams
- `astro-mermaid` integration (placed FIRST in integrations array)
- Uses fenced code blocks with `mermaid` language in MDX (NOT component imports)
- Auto theme switching is enabled by default

### D3 Charts
- Astro components with `<script>` tags importing D3
- Data passed via `data-*` attributes
- IntersectionObserver for lazy rendering
- CSS custom properties for theme-aware colors
- `theme-change` event listener for re-render on toggle

### Scroll Animations
- `src/scripts/scroll-animations.ts` imported in BaseLayout
- `data-animate` attribute triggers IntersectionObserver
- Variants: default (translateY 20px), `fade` (opacity only), `slide-up` (translateY 30px)
- `data-animate-delay="1-4"` for staggered animations
- `prefers-reduced-motion: reduce` disables all animations

### SEO
- BaseLayout accepts `title`, `description`, `image`, `url`, `type` props
- OG + Twitter meta tags on all pages
- JSON-LD Person schema on all pages, Article schema on case study/writing detail pages
- Sitemap via `@astrojs/sitemap` (auto-generated at `/sitemap-index.xml`)
- `public/robots.txt` references sitemap

## Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build to dist/
npm run preview      # Preview production build
node scripts/generate-og-image.mjs  # Regenerate public/og-image.png
```

## Directory Structure
```
src/
  components/         # Astro components (Nav, Footer, ThemeToggle, cards, etc.)
    charts/           # D3.js chart components (BuildTimeChart)
  content/            # MDX content collections
    case-studies/     # 4 case study MDX files (real content, ECFX anonymized)
    explorations/     # Short-form exploration posts
    writing/          # 2 writing article MDX files (both draft)
  data/               # Shared data (navigation.ts)
  layouts/            # BaseLayout, PageLayout, CaseStudyLayout, ArticleLayout, ExplorationLayout
  pages/              # File-based routing (index, about, 404, case-studies/*, explorations/*, writing/*)
  scripts/            # Client-side scripts (scroll-animations.ts)
  styles/             # global.css design system
  content.config.ts   # Content collection schemas
public/
  fonts/              # Self-hosted WOFF2 fonts (Syne, Source Sans 3, JetBrains Mono)
  favicon.svg         # TC monogram favicon
  og-image.png        # 1200x630 OG image (generated via Sharp script)
  robots.txt          # Search engine directives
scripts/
  generate-og-image.mjs  # Sharp-based OG image generator
```

## Git Workflow
- Never commit to main directly
- Feature branches -> develop -> main via PRs
- Use `gh` CLI for GitHub operations
