# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

THE NORTH FACE Maternity+ 2025FW Landing Page - Built with Astro + Tailwind CSS v4

## Commands

```bash
# Development
pnpm dev          # Start development server (http://localhost:4321)
pnpm build        # Type check + production build
pnpm preview      # Preview production build

# Package management
pnpm install      # Install dependencies
pnpm add -D <pkg> # Add dev dependency
```

## Architecture & Key Decisions

### Technology Stack

- **Astro** (v5.13.5) - Static site generation with Island architecture
- **Tailwind CSS v4** (v4.1.12) - Using @theme directive and Vite plugin integration
- **Three.js** (v0.179.1) - For komorebi (dappled light) background animations
- **TypeScript** - Strict mode enabled

### Tailwind CSS v4 Configuration

Located in `/src/app.css`:

- Uses `@theme` directive for custom design tokens
- Custom colors: navy, beige, paper, terra, tnf-blue, muted
- Custom fonts: Noto Sans JP (sans), Lexend (display)
- Custom shadows: shadow-card, shadow-card-strong

### Path Aliases

- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`

## Design Specifications

Detailed specifications exist in `/docs/research/仕様書.md` covering:

### Key Design Elements

- **Color Palette**: Deep navy (#0e2540), Beige (#efe5d6), Paper (#e7dac5), Terracotta (#9c6a4a), TNF Blue (#1e75bb)
- **Typography**: Noto Sans JP (Japanese), Lexend (English)
- **Grid**: 4px base spacing scale
- **Breakpoints**: Mobile (390px), Tablet (768px), Desktop (1280-1440px)

### Page Sections (10 total)

1. Hero - Family visual with minimal nav
2. Intro Copy - Handwritten label style
3. Highlight Gallery - 3-4 image grid/swipe
4. Product Lines banner
5. 2025FW Collection - Card carousels in multiple rows
6. Dual CTA (ALL ITEMS / STAFF STYLING)
7. Baby Blanket Collection
8. Pickup Products (3 columns)
9. Family Photo (full bleed)
10. Footer

### Special Components

- **Tape Label** (`.label-tape`) - Rotated label with torn edge effect
- **Carousel** - With numeric pager (`.pager`)
- **Product Cards** - 3:4 aspect ratio with navigation dots

### Background Animation

Three.js WebGL shader implementation planned for:

- Komorebi (dappled sunlight through trees) effect
- Performance-optimized with `prefers-reduced-motion` support
- Uses fractal noise for natural shadow movement

## Development Notes

### Current Implementation Status

✅ Astro + Tailwind CSS v4 setup
✅ Base layout and color system
✅ Custom component styles (tape label, pager)
❌ Section components
❌ Three.js background animation
❌ Data models and content management
❌ Interactive components (carousel, etc.)

### Performance Targets

- LCP < 2.5s
- CLS < 0.1
- Respect `prefers-reduced-motion`

### Analytics Integration

FTL templates require:

1. `<#ftl output_format="HTML" auto_esc=true>` at file start
2. `<#include '/common/google-analytics.ftl'>` before `</head>`
3. `<#include '/common/google-tagmanager_noscript.ftl'>` after `<body>`

### Directory Structure (Production)

- **Goldwin Desktop**: `/web/template/ja/full/page/`
- **Goldwin Mobile**: `/web/template/ja/lite/page/`
- **TNF Desktop**: `/web/template/ja/full/page/tnf/`
- **TNF Mobile**: `/web/template/ja/lite/page/tnf/`
- **Assets**: `/web/template/ja/full/page/static/full/[tnf/]`

Note: User agent switching requires files in both desktop and mobile directories.
