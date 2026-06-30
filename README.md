# QA&C — HITEC University

Website for the **Directorate of Quality Assurance & Collaborations (QA&C)**,
HITEC University, Taxila. This repository is **MVP 0**: a polished,
university-matched site shell with a working navigation, animated home page,
placeholder interior pages, and a CI pipeline. It auto-deploys to production via
Vercel on every push to `main`.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-based config via `@theme` in `globals.css`)
- **shadcn/ui** (Radix primitives, CSS variables, neutral base)
- **framer-motion** for subtle, reduced-motion-aware entrance animations
- **lucide-react** icons
- Fonts via `next/font/google`: **Plus Jakarta Sans** (headings), **Inter** (body)
- **ESLint** + **Prettier** (with `prettier-plugin-tailwindcss`)

## Brand colours

Design tokens live as CSS variables in [`src/app/globals.css`](src/app/globals.css)
and are exposed to Tailwind via the `@theme` block (e.g. `bg-navy`, `text-gold`,
`bg-surface`). shadcn's semantic tokens (`--primary`, `--ring`, …) are mapped
onto the brand palette so components inherit the theme.

The palette was refined against the official HITEC logo
([`public/hitec-logo.svg`](public/hitec-logo.svg)), whose fills are `#172058`,
`#0b97dd`, `#69bbdf`, `#f8f213`, `#5d587a` and `#f6f7f2`:

| Token    | Brief     | Used     | Note                                                            |
| -------- | --------- | -------- | -------------------------------------------------------------- |
| `--navy` | `#0A2C4D` | `#172058`| Adopted the logo's exact deep indigo-navy.                     |
| `--blue` | `#15538C` | `#0E6FB8`| Logo azure `#0b97dd`, darkened to meet WCAG AA as link text.   |
| `--gold` | `#E0A422` | `#E0A422`| Retained — the logo's neon `#f8f213` reads garish as a CTA.    |
| `--ink`  | `#0F172A` | `#0F172A`| Body text.                                                     |
| `--muted`| `#5B6B7B` | `#5B6B7B`| Secondary text (`text-muted-foreground`).                      |
| `--bg`   | `#F4F7FA` | `#F4F7FA`| Subtle section background (`bg-surface`).                      |
| `--card` | `#FFFFFF` | `#FFFFFF`| Card / base surface.                                           |

The site ships **light-theme only**.

## Run locally

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

### Other scripts

```bash
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
npm run format       # Prettier write
```

## Project structure

```
src/
  app/                 App Router pages (home + about, self-assessment,
                       activities, resources, contact) and globals.css
  components/
    sections/          Home-page sections (hero, what-we-do, stats, activities)
    ui/                shadcn/ui primitives
    motion/            Reveal (scroll-in animation wrapper)
    site-header.tsx    Sticky navy header (desktop nav + mobile sheet)
    site-footer.tsx    Three-column footer
    page-header.tsx    Shared interior-page hero
  lib/
    nav.ts             Single source of truth for navigation
```

## Deployment

The repository is linked to **Vercel**. Pushing to `main` triggers a
**production deployment** automatically; pull requests get preview deployments.
The [CI workflow](.github/workflows/ci.yml) runs lint, type-check and build on
every push to `main` and on every pull request.
