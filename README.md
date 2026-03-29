# Ameli Nimbus Portfolio — Next.js

A modular, production-ready portfolio site built with **Next.js 14**, **Tailwind CSS**, and **GSAP** animations.

## Demo

- Live site: https://ui-ux-designer-portfolio-01.netlify.app/

## Features

- Responsive portfolio layout with modern UX/UI design.
- Animated scroll and entrance effects using **GSAP + ScrollTrigger**.
- Organized sections for hero, services, about, stats, skills, projects, and contact.
- Easy content editing through a single data source.
- Built with **Next.js App Router** and **TypeScript**.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — custom design token system (amber/gold palette)
- **GSAP + ScrollTrigger** — scroll-driven and entrance animations
- **Google Fonts** — Space Grotesk + Manrope
- **Material Symbols** — icon font

## Getting Started

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

If you prefer npm:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Start the Project

1. Clone the repository.
2. Install dependencies with `pnpm install` (or `npm install`).
3. Run `pnpm dev` (or `npm run dev`).
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

- `pnpm dev` / `npm run dev` - Start the development server.
- `pnpm build` / `npm run build` - Build the production app.
- `pnpm start` / `npm run start` - Start the production server after building.
- `pnpm lint` / `npm run lint` - Run ESLint.

## Social

- GitHub: https://github.com/lucy-sees
- LinkedIn: https://www.linkedin.com/in/lucy-wanjiru-mwangi/
- Twitter: https://twitter.com/lucy_w_mwangi/

## Contribution

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature`.
3. Make your changes and commit them.
4. Push to your fork and open a pull request.

Feel free to open issues for bugs, enhancements, or questions.

## Acknowledgements

- Built with **Next.js 14**.
- Styling powered by **Tailwind CSS**.
- Animations powered by **GSAP** and **ScrollTrigger**.
- Icons from **Material Symbols**.
- Fonts provided by **Google Fonts**.

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

## Deployment

This project can be deployed to **Netlify**, **Vercel**, or any platform that supports Next.js. The live demo is already hosted on Netlify.
