# phatjam98.com — Personal Portfolio

Personal portfolio site for Travis Carter, Senior Software Engineer & Architect. Showcases case studies in distributed systems, event-driven architectures, and cloud infrastructure.

**Live site**: [phatjam98.com](https://phatjam98.com)

## Tech Stack

- **Framework**: [Astro 5](https://astro.build/) (static output)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Content**: MDX via Astro Content Collections
- **Charts**: D3.js (client-side islands)
- **Diagrams**: Mermaid (via astro-mermaid)
- **Hosting**: Firebase Hosting

## Development

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at localhost:4321
npm run build        # Production build to dist/
npm run preview      # Preview production build
```

## Project Structure

```
src/
  components/       # Astro components (Nav, Footer, ThemeToggle, cards, charts)
  content/          # MDX content collections (case studies, writing)
  layouts/          # Page layouts (Base, Page, CaseStudy, Article)
  pages/            # File-based routing
  scripts/          # Client-side scripts
  styles/           # Design system (Tailwind v4 + custom properties)
public/
  fonts/            # Self-hosted WOFF2 fonts
```
