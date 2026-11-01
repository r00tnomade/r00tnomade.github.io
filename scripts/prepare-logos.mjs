// Builds the white, transparent, tightly cropped logo derivatives used in the
// affiliation strip. The uploaded originals (hsm-logo.png, open-ai-logo.webp)
// are only read, never modified.
//
//   node scripts/prepare-logos.mjs
//
// - hsm-logo.png: black glyphs on a transparent background. The alpha channel
//   is the logo, so it is kept and the colour is set to white.
// - open-ai-logo.webp: white mark on solid black, no alpha. Pixel brightness is
//   used as the alpha channel, which reproduces the antialiased edges exactly
//   when composited over black.

import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'src/assets/images/logos');
mkdirSync(outDir, { recursive: true });

const logos = [
  { src: 'hsm-logo.png', out: 'th-mannheim-white.png', alpha: 'alpha' },
  { src: 'open-ai-logo.webp', out: 'openai-white.png', alpha: 'luminance' },
];

const THRESHOLD = 6; // ignore compression noise when finding the logo's bounds

for (const { src, out, alpha } of logos) {
  const input = join(root, src);
  const { width, height } = await sharp(input).metadata();

  // Single-channel alpha mask, 8-bit.
  const mask = await (alpha === 'alpha'
    ? sharp(input).ensureAlpha().extractChannel('alpha')
    : sharp(input).removeAlpha().greyscale()
  )
    .raw()
    .toBuffer();

  // Tight bounding box of the visible logo.
  let minX = width, minY = height, maxX = -1, maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (mask[y * width + x] > THRESHOLD) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  const box = { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };

  const white = Buffer.alloc(width * height * 3, 255);
  // Compose at full size first; cropping in the same pipeline would run before the join.
  const full = await sharp(white, { raw: { width, height, channels: 3 } })
    .joinChannel(mask, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();

  const info = await sharp(full)
    .extract(box)
    .png({ compressionLevel: 9 })
    .toFile(join(outDir, out));

  console.log(`${out}: ${info.width}x${info.height} (aspect ${(info.width / info.height).toFixed(3)}) from ${src} ${width}x${height}, crop`, box);
}
