import type { ImageMetadata } from 'astro';

// Vite bundles every file a pattern matches, whether or not a page uses it, so the
// patterns decide what ships. Keep them narrow:
// - hero/about/research: web-ready WebP/AVIF only. Large JPG/PNG originals stay out of dist/.
// - logos: the PNG derivatives made by scripts/prepare-logos.mjs.
// - projects: only published projects. When you add a slug to `published` in
//   src/content/site.ts, add that project's image file name here too.
const files = import.meta.glob<{ default: ImageMetadata }>([
  '/src/assets/images/{hero,about,research}/**/*.{webp,avif}',
  '/src/assets/images/logos/*.png',
  '/src/assets/images/projects/aeroagent.{webp,avif}',
]);

/** Resolves a path from src/content/site.ts (relative to src/assets/images/). */
export async function resolveImage(path: string): Promise<ImageMetadata> {
  const load = files[`/src/assets/images/${path}`];
  if (!load) {
    throw new Error(
      `Image "${path}" is not loaded. Use a WebP/AVIF file in src/assets/images/, and for projects add the file to the list in src/lib/images.ts. See ASSETS_NEEDED.md.`,
    );
  }
  return (await load()).default;
}
