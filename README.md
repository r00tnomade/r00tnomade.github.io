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
- Projects: all project content stays in `allProjects`, but only the slugs in `published` appear on the site (currently just `aeroagent`). The first published project is shown as a large feature, the next two as image-and-text rows, the rest as tiles. To publish another project, add its slug to `published` **and** its image file name to the list in `src/lib/images.ts`.
- Each project gets a detail page at `/work/<slug>/` with role, year, tools and free-form sections.
- `ownership` (`personal`, `team`, `research`) and `status` (`in-progress`, `completed`, `concept`) are shown on the cards so it is always clear who did what. Leave them as `'tbd'` until you have decided.
- `hero.navTone` switches the navigation between dark (`'ink'`, for a light sky) and white (`'light'`, for a dark photo).

## Images

See **[ASSETS_NEEDED.md](ASSETS_NEEDED.md)** for every image, its filename, ratio, resolution and photographic direction.

In short: overwrite the placeholder in `src/assets/images/…` with your own image under the same filename. Only **WebP/AVIF** files are loaded (plus the logo PNGs), so large JPG/PNG originals can sit in the folder without being shipped; convert them to WebP first. Responsive AVIF/WebP versions are generated at build time.

`npm run placeholders` recreates any missing placeholder. It never overwrites existing files unless you pass `--force`.

## Structure

```
src/
  content/site.ts         all copy, links and image paths
  assets/images/          hero/, about/, research/, projects/
  styles/global.css       design tokens (colour, type scale, spacing) and base styles
  layouts/Base.astro      <head>, SEO and social meta
  components/
    Hero.astro            full-screen photograph with the blended name
    Nav.astro             split navigation and mobile menu
    SectionHead.astro     vertical-line transition and section title
    StoryCard.astro       image-and-text card
    Feature.astro         wide image-led block
    Tile.astro            compact project tile
    Contact.astro, Footer.astro, Media.astro, Text.astro, Icon.astro
  pages/
    index.astro           home page
    work/[slug].astro     project detail pages
    404.astro
scripts/generate-placeholders.mjs
scripts/prepare-logos.mjs  white, transparent, cropped logo derivatives
```

## Logo strip

The two logos beneath the hero (Technische Hochschule Mannheim, OpenAI) are configured in `affiliations` in `src/content/site.ts`. The uploaded originals, `hsm-logo.png` and `open-ai-logo.webp`, stay untouched in the project root. `node scripts/prepare-logos.mjs` turns them into white, transparent, tightly cropped PNGs in `src/assets/images/logos/`. Re-run it if you replace an original. Tune each logo's `height` in the config to keep their visual weight matched. The OpenAI mark represents the OpenAI Student Collective affiliation and implies no employment or partnership.

## Design notes

The visual language follows the reference brief: a full-bleed cinematic hero with a large white serif name across the photograph, a split navigation with the name in the centre, then a pure black page of dark cards with hairline edges, linked by thin vertical lines and centred serif titles.

- **Type:** Fraunces (display serif), Mona Sans Condensed (navigation) and Inter (body). All three are open-source and **self-hosted** through Fontsource, so there are no requests to Google's servers. That matters for GDPR compliance in Germany.
- **Colour:** black `#000`, cards from `#181818` to `#0c0c0c`, white text at 100 / 72 / 50 % opacity.
- **Motion:** a single entrance on load (the photograph settles, the name fades in), plus hover feedback on project cards. All motion is disabled under `prefers-reduced-motion`.
- **Accessibility:** semantic landmarks, a skip link, visible focus states, 44 px touch targets and a keyboard-operable menu (Escape closes it).
- **SEO:** per-page titles and descriptions, canonical URLs, Open Graph and Twitter cards, and `Person` structured data on the home page.

## Before launch

- Replace the placeholders listed in `ASSETS_NEEDED.md` and set `site.url`.
- **Impressum / Datenschutz:** a website run from Germany may need an Impressum (§ 5 DDG) and a privacy notice, depending on how it is used. Add the pages under `src/pages/` and link them through `footer.links` in `site.ts`.
- Get approval before publishing anything about the TH Mannheim research beyond the current high-level description.
