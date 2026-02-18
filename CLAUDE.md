# Portfolio - phatjam98.com

## Overview
Personal portfolio site for Travis Carter (Senior Software Engineer & Architect). Built with Astro 5, Tailwind CSS v4, MDX content collections, and deployed to Firebase Hosting.

## Master Plan
The full PRD and implementation plan is archived in the Claude Code session transcript:
`/Users/traviscarter/.claude/projects/-Users-traviscarter-src/5cf8bffe-426e-494e-9076-d27f54bc830e.jsonl`

This contains the complete PRD with design decisions, color palette, typography, page specifications, content strategy, and the 4-phase implementation plan that was executed.

## Current State (Post-Initial Build)
All 4 phases of the initial plan have been executed:
- **Phase 1**: Foundation (design system, layouts, theme toggle, nav, footer)
- **Phase 2**: Pages & components (all routes, cards, listing/detail pages)
- **Phase 3**: Content & interactivity (MDX case studies, Mermaid diagrams, D3 chart, scroll animations)
- **Phase 4**: Polish & launch (SEO meta tags, JSON-LD, robots.txt, favicon, 404 page, CI/CD workflow)

### Known Follow-Ups
1. **GitHub Actions workflow** - `.github/workflows/deploy.yml` exists locally but could not be pushed (OAuth token lacks `workflow` scope). Must be pushed manually or after re-auth.
2. **Default branch on GitHub** - Currently `feature/initial-scaffold`; should be changed to `develop` or `main` in repo settings.
3. **OG image** - `public/og-image.png` (1200x630) placeholder still needed.
4. **Case study content** - All 4 case studies have placeholder prose. Real metrics/details needed for EventHorizon and EKS migrations.
5. **About page copy** - Placeholder; needs Travis's actual career narrative.
6. **Social links** - LinkedIn URL is `#` placeholder in Footer.
7. **Devil's Advocate minor issues** - From Phase 1 review: nav links duplicated in Nav + Footer (extract to shared data file), missing `aria-controls` on hamburger, footer heading hierarchy (`h3` without `h2` ancestor), add `color: transparent` fallback for `.text-gradient`.
8. **Firebase deployment** - `firebase.json` is configured but Firebase project needs to be initialized and connected.

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
```

## Directory Structure
```
src/
  components/         # Astro components (Nav, Footer, ThemeToggle, cards, etc.)
    charts/           # D3.js chart components (BuildTimeChart)
  content/            # MDX content collections
    case-studies/     # 4 case study MDX files
    writing/          # 2 writing article MDX files
  layouts/            # BaseLayout, PageLayout, CaseStudyLayout, ArticleLayout
  pages/              # File-based routing (index, about, 404, case-studies/*, writing/*)
  scripts/            # Client-side scripts (scroll-animations.ts)
  styles/             # global.css design system
  content.config.ts   # Content collection schemas
public/
  fonts/              # Self-hosted WOFF2 fonts (Syne, Source Sans 3, JetBrains Mono)
  favicon.svg         # TC monogram favicon
  robots.txt          # Search engine directives
```

## Git Workflow
- Never commit to main directly
- Feature branches -> develop -> main via PRs
- Use `gh` CLI for GitHub operations
- Current branches: `develop`, `feature/initial-scaffold` (both at same commit)
