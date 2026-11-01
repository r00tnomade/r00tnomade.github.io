import type { ImageMetadata } from 'astro';

// Vite bundles every file a pattern matches, so the patterns decide what ships.
// Only web-ready WebP/AVIF (plus the logo PNGs) are loaded; large JPG/PNG originals are ignored.
const files = import.meta.glob<{ default: ImageMetadata }>([
  '/src/assets/images/{hero,about,research,projects}/**/*.{webp,avif}',
  '/src/assets/images/logos/*.png',
]);

/** Resolves a path from src/content/site.ts (relative to src/assets/images/). */
export async function resolveImage(path: string): Promise<ImageMetadata> {
  const load = files[`/src/assets/images/${path}`];
  if (!load) {
    throw new Error(
      `Image "${path}" is not loaded. Use a WebP/AVIF file in src/assets/images/.`,
    );
  }
  return (await load()).default;
}
