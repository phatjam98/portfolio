# Portfolio - phatjam98.com

## Overview
Personal portfolio site for Travis Carter (Senior Software Engineer & Architect). Built with Astro 5, Tailwind CSS v4, MDX content collections, and deployed to Firebase Hosting.

## Tech Stack
- **Framework**: Astro 5 (static output)
- **Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin (NOT `@astrojs/tailwind`)
- **Content**: MDX via `@astrojs/mdx`, Astro Content Collections with `glob()` loader
- **Charts**: D3.js v7 (client-side islands)
- **Diagrams**: astro-mermaid (client-side rendering with theme support)
- **Hosting**: Firebase Hosting
- **Repo**: github.com/phatjam98/portfolio

## Key Patterns

### Tailwind v4 Integration
- Use `@tailwindcss/vite` in `astro.config.mjs` vite plugins (NOT the deprecated `@astrojs/tailwind`)
- Dark mode via `@custom-variant dark (&:where(.dark, .dark *));` in global.css
- Design tokens in `@theme` block

### Content Collections (Astro 5)
- Config at `src/content.config.ts` (NOT `src/content/config.ts`)
- Uses `glob()` from `astro/loaders` and `z` from `astro/zod`
- Render with `import { render } from 'astro:content'` then `const { Content } = await render(entry)`

### Theme System
- Default: dark theme
- Classes: `html.dark` / `html.light`
- FOUC prevention via `is:inline` script in `<head>`
- Components listen for `theme-change` CustomEvent

## Commands
```bash
npm run dev          # Start dev server
npm run build        # Production build to dist/
npm run preview      # Preview production build
```

## Directory Structure
```
src/
  components/       # Astro components
  content/          # MDX content collections
    case-studies/   # Case study MDX files
    writing/        # Blog/article MDX files
  layouts/          # Layout components
  pages/            # File-based routing
  scripts/          # Client-side scripts
  styles/           # global.css design system
public/
  fonts/            # Self-hosted WOFF2 fonts
```

## Git Workflow
- Never commit to main directly
- Feature branches -> develop -> main via PRs
- Use `gh` CLI for GitHub operations
