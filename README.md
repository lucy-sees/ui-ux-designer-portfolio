# Ameli Nimbus Portfolio — Next.js

A modular, production-ready portfolio site built with **Next.js 14**, **Tailwind CSS**, and **GSAP** animations.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — custom design token system (amber/gold palette)
- **GSAP + ScrollTrigger** — scroll-driven and entrance animations
- **Google Fonts** — Space Grotesk + Manrope
- **Material Symbols** — icon font

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── layout.tsx        # Root layout (fonts, metadata)
│   ├── page.tsx          # Page composition
│   └── globals.css       # Tailwind + base styles
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx    # Sticky nav + mobile menu
│   │   └── Footer.tsx
│   ├── sections/
│   │   ├── HeroSection.tsx
│   │   ├── ServicesSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── StatsSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   └── ContactSection.tsx
│   └── ui/
│       ├── ServiceCard.tsx
│       ├── SkillBar.tsx
│       └── ProjectCard.tsx
├── hooks/
│   └── useGSAPAnimation.ts
└── lib/
    └── data.ts           # All site content / constants
```

## Customisation

All content (nav links, services, stats, skills, projects, contact info) lives in `src/lib/data.ts`. Edit that file to update the site without touching components.
