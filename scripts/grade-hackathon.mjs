// Darkens the hackathon photograph to sit on the black page (cinematic grade).
// Reads the untouched original and writes the web version; re-run after replacing the original.
//   node scripts/grade-hackathon.mjs [strength 0-1, default 0.7]
import sharp from 'sharp';

const t = Number(process.argv[2] ?? 0.7);
const src = 'src/assets/images/about/about-hackathon.jpg';
const out = process.argv[3] ?? 'src/assets/images/about/about-hackathon.webp';
const W = 2400, H = 1600;

// Edge vignette so the frame melts into the black card.
const vignette = Buffer.from(
  `<svg width="${W}" height="${H}"><defs><radialGradient id="v" cx="0.5" cy="0.55" r="0.78">
     <stop offset="0.45" stop-color="#000" stop-opacity="0"/>
     <stop offset="1" stop-color="#000" stop-opacity="${0.55 * t}"/>
   </radialGradient></defs><rect width="100%" height="100%" fill="url(#v)"/></svg>`,
);

// Pass 1: pull the white point down (the screen and wall are clipped), then deepen the midtones.
const base = await sharp(src)
  .rotate()
  .resize(W, H, { fit: 'cover' })
  .linear(1 - 0.55 * t, 0)
  .toBuffer();

await sharp(base)
  .gamma(1 + 0.6 * t, 1) // gamma encodes against the reduced range; keeps shadows from lifting
  .modulate({ saturation: 1 - 0.08 * t })
  .composite([{ input: vignette }])
  .webp({ quality: 86 })
  .toFile(out)
  .then((i) => console.log(out, i.width + 'x' + i.height, Math.round(i.size / 1024) + ' KB'));
