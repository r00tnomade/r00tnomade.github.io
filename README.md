# Sami Adam Moughli: personal website

A static, image-led personal website built with [Astro](https://astro.build). It ships no JavaScript apart from a small script for the mobile menu.

## Run it

Requires Node.js 18.20+ (developed on Node 26).

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # static site in dist/
npm run preview   # serve the built site locally
```

`dist/` can be deployed to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages).

## Editing content

**Everything you are likely to change is in `src/content/site.ts`**: name, description, navigation, hero line, areas of focus, about cards, research, projects, contact details and footer.

- Text wrapped in `todo('…')` is placeholder copy. It renders muted with a dashed underline. Replace it with a plain string.
- Projects: the `projects` array. The first is shown as a large feature on the home page; each gets a page at `/work/<slug>/`.
- Each project gets a detail page at `/work/<slug>/` with role, year, tools and free-form sections.
- `ownership` (`personal`, `team`, `research`) and `status` (`in-progress`, `completed`, `concept`) are shown on the cards so it is always clear who did what. Leave them as `'tbd'` until you have decided.
- `hero.navTone` switches the navigation between dark (`'ink'`, for a light sky) and white (`'light'`, for a dark photo).

## Images

Put web-ready **WebP/AVIF** files in `src/assets/images/` (hero, about, research, projects; logos as PNG) and reference them by path in `src/content/site.ts`. Responsive AVIF/WebP versions are generated at build time. JPG/PNG files are ignored, so convert them first:

```bash
node -e "require('sharp')('in.jpg').resize(2400).webp({quality:90}).toFile('out.webp')"
```

Social sharing image: `public/og-image.jpg` (1200 × 630, currently a grey placeholder).

## Structure

```
src/
  content/site.ts         all copy, links and image paths
  assets/images/          hero/, about/, research/, projects/
  styles/global.css       design tokens (colour, type scale, spacing) and base styles
  layouts/Base.astro      <head>, SEO and social meta
  components/
    Hero.astro            full-screen photograph with the name
    Nav.astro             split navigation and mobile menu
    SectionHead.astro     vertical-line transition and section title
    StoryCard.astro       image-and-text card
    Feature.astro         wide image-led block
    Contact.astro, Footer.astro, Media.astro, Text.astro, Icon.astro
  pages/
    index.astro           home page
    work/[slug].astro     project detail pages
    404.astro
```

## Logo strip

The two logos beneath the hero are configured in `affiliations` in `src/content/site.ts`; the files are in `src/assets/images/logos/`. The OpenAI mark represents the OpenAI Student Collective affiliation and implies no employment or partnership.

## Design notes

The visual language follows the reference brief: a full-bleed cinematic hero with a large white serif name across the photograph, a split navigation with the name in the centre, then a pure black page of dark cards with hairline edges, linked by thin vertical lines and centred serif titles.

- **Type:** Fraunces (display serif), Mona Sans Condensed (navigation) and Inter (body). All three are open-source and **self-hosted** through Fontsource, so there are no requests to Google's servers. That matters for GDPR compliance in Germany.
- **Colour:** black `#000`, cards from `#181818` to `#0c0c0c`, white text at 100 / 72 / 50 % opacity.
- **Motion:** a single entrance on load (the photograph settles, the name fades in), plus hover feedback on project cards. All motion is disabled under `prefers-reduced-motion`.
- **Accessibility:** semantic landmarks, a skip link, visible focus states, 44 px touch targets and a keyboard-operable menu (Escape closes it).
- **SEO:** per-page titles and descriptions, canonical URLs, Open Graph and Twitter cards, and `Person` structured data on the home page.

## Before launch

- Replace `public/og-image.jpg` with a real sharing image.
- **Impressum / Datenschutz:** a website run from Germany may need an Impressum (§ 5 DDG) and a privacy notice, depending on how it is used. Add the pages under `src/pages/` and link them through `footer.links` in `site.ts`.
- Get approval before publishing anything about the TH Mannheim research beyond the current high-level description.
