// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';

export default defineConfig({
  site: 'https://phatjam98.com',
  output: 'static',
  integrations: [mermaid({ theme: 'dark', autoTheme: false }), mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
  markdown: { shikiConfig: { theme: 'github-dark' } },
});
