# Creative Thought Haven - 个人博客与作品集平台

## Overview

Creative Thought Haven is a modern, static blog and portfolio website built with React and Vite. It uses Markdown for content management, automatically converting content into static data for high-performance display. The platform supports various content types including blog posts, AI tool information, project showcases, design portfolios, and video content.

Key features include a Static Site Generation (SSG) architecture for easy deployment and excellent performance, a Markdown/MDX driven content management system, multi-modal content support, an AI tools and resources navigation system, and a responsive design with dark mode. The project aims to provide a personal showcase for creative works and a resource hub for AI-related information.

## Recent Changes

### User Engagement Features - Phase 1 & 2 (October 2025)
- **Reading Progress & Time Tracking**: Real-time progress bar, reading duration tracking with multi-tab support and visibility handling
- **Article Interactions**: Like/share functionality with localStorage persistence
- **Notes & Highlights**: Text selection highlighting with color options, note-taking sidebar, localStorage persistence
- **Achievement System**: Badge system tracking likes, reading time/count, and highlights; unlock notifications; dedicated achievements page
- **Comments Integration**: Giscus-based comment system for community engagement
- **Bug Fixes**: Multi-layer blog routing (blog/*), TOC duplicate ID resolution, reading time calculation fixes

### Favicon Loading Optimization (October 2025)
- **Multi-source fallback system**: Implemented `FaviconImage` component with 5 fallback services for AI tool icons
- **China-friendly**: Resolves icon loading issues in restricted networks without VPN requirement

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Technology Stack
- **Framework**: React 18 + Vite
- **Routing**: React Router v6
- **UI Components**: Radix UI (accessibility-focused), shadcn/ui (Radix-based), Material-UI (`@mui/material`, `@mui/icons-material`)
- **Styling**: Tailwind CSS, CSS variables for theming, light/dark mode support
- **State Management**: React Query for async states, React Context for global states (theme, cursor effects).

### Content Management Architecture
- **Content Storage**: Markdown/MDX files in `/content` directory, categorized by type (e.g., `/content/ai-news/`, `/content/projects/`, `/content/ai/`).
- **Build Process**: Markdown files with YAML Front Matter are parsed by build scripts (`scripts/build-*.js`). `gray-matter` extracts metadata, generating JSON data files in `/src/data/**/generated-*.json`.
- **Key Build Scripts**: `build-ai-news.js`, `build-projects.js`, `build-designs.js`, `build-videos.js`, `build-ai-sections.js`.
- **AI News Automation**: `fetch-ai-news-auto.js` automatically fetches AI news from configured RSS sources (`config/ai-news-sources.json`), extracts metadata, grabs cover images, and generates Markdown files with proper YAML frontmatter, supporting automatic Chinese translation and YAML escaping.

### Data Flow
Markdown source files are parsed by build scripts, which generate static JSON data files. These JSON files are then indexed and consumed by custom React Hooks, which feed data to React components for display. Data is fully static at build time, eliminating runtime processing.

### MDX Support
- Vite configured with `@mdx-js/rollup` for MDX processing.
- Plugins: `remark-gfm`, `remark-frontmatter`, `remark-mdx-frontmatter`, `rehype-slug`, `rehype-autolink-headings`.
- Supports embedding React components within MDX files via `@mdx-js/react`.

### Routing Architecture
- **Main Routes**: `/`, `/about`, `/blog`, `/blog/:slug`, `/portfolio`, `/portfolio/:id`, `/designs`, `/designs/:id`, `/ai`, `/videos/:id`.
- **Lazy Loading**: Page components use `React.lazy()` for code splitting and `<Suspense>` for loading states to reduce initial bundle size.

### Theming System
- Implemented with CSS variables and Tailwind CSS.
- `ThemeProvider` (React Context) manages theme state.
- Supports system theme detection and persistent user preferences.
- Uses HSL color space for flexible color adjustments.

### Special Effects & Interactivity
- **SplashCursor**: Custom cursor with particle effects on homepage and about page, implemented using Canvas.
- **Image Viewer**: Global image lightbox with zoom and drag functionality via `ImageViewerProvider`.

### Performance Optimization
- **Code Splitting**: Route-level lazy loading for pages.
- **Resource Optimization**: Image compression, WebP support, quality parameters.
- **Build Optimization**: Vite's HMR, production build optimization, tree-shaking.
- **Caching**: Static data generated at build time, browser caching, cache-control headers.

### Error Handling
- **Error Boundary**: Global component to catch rendering errors and display friendly messages.
- **404 Handling**: Custom 404 page.

### SEO Optimization
- **Metadata**: Comprehensive meta tags, Open Graph, Twitter Card support, structured data.
- **Title Management**: Dynamic page title updates with site name suffix.

## External Dependencies

### Core Dependencies
- **React Ecosystem**: `react`, `react-dom` (v18), `react-router-dom`, `@tanstack/react-query`.
- **Build Tools**: `vite`, `@vitejs/plugin-react-swc`, `typescript`.
- **UI Libraries**: `@radix-ui/*`, `@mui/material`, `@mui/icons-material`, `@emotion/react`, `@emotion/cache`.
- **Styling**: `tailwindcss`, `autoprefixer`, `postcss`.
- **Content Processing**: `@mdx-js/rollup`, `@mdx-js/react`, `gray-matter`, `remark-gfm`, `remark-frontmatter`, `rehype-slug`, `rehype-autolink-headings`.
- **Utilities**: `axios`, `cheerio` (for build-time scraping), `class-variance-authority`, `clsx`, `tailwind-merge`.

### Deployment Platform
- **Replit Deployment**: Autoscale, `npm run build`, `npm run preview`, dynamic `PORT` environment variable, binds to `0.0.0.0`.

### Third-Party Services
- **AI-Powered Chinese Translation**: Google Gemini API for automated Chinese translation and summarization, integrated with a multi-account API key rotation system for rate limiting.
- **Content Scraping**: Axios + Cheerio for automatic fetching of article cover images and descriptions during build time (supports Open Graph metadata and User-Agent simulation).
- **Icons**: `lucide-react`, Material Icons.

### Data Sources
- **RSS Feeds**: Configured in `config/ai-news-sources.json` for fetching AI news (e.g., OpenAI Blog, DeepMind Blog, The Verge AI).
- **GitHub Awesome Lists**: Scraped by `scripts/fetch-ai-tools-auto.js` to update AI tools, which are auto-categorized and translated using the Gemini API.