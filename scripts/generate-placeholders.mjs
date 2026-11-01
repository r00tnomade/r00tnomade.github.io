// Generates the placeholder images listed in ASSETS_NEEDED.md.
// Existing files are never overwritten (pass --force to regenerate),
// so dropping a real photograph in place of a placeholder is always safe.
//
//   npm run placeholders
//   npm run placeholders -- --force

import { existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const force = process.argv.includes('--force');

// tone: [highlight, mid, shadow] used for the light leak, body and vignette.
const assets = [
  { file: 'src/assets/images/hero/hero-portrait.webp', w: 2560, h: 1440, kind: 'hero', label: 'Hero photograph', note: 'Wide environmental portrait, subject centred, open sky in the upper half' },
  { file: 'src/assets/images/hero/hero-portrait-mobile.webp', w: 1080, h: 1920, kind: 'hero', label: 'Hero photograph, mobile crop', note: 'Portrait crop of the hero image, subject centred' },
  { file: 'src/assets/images/research/visuotactile-sensing.webp', w: 2400, h: 1029, tone: ['#8a8f96', '#2b2e33', '#0a0a0b'], label: 'Visuotactile sensing research', note: 'Approved photo of the robotic fingertip or test setup' },
  { file: 'src/assets/images/projects/dynaptics-studio.webp', w: 2400, h: 1350, tone: ['#6f7782', '#272a2f', '#0a0b0c'], label: 'Dynaptics Studio', note: 'Interface screenshot or product shot' },
  { file: 'src/assets/images/projects/tactile-intelligence-platform.webp', w: 1600, h: 1000, tone: ['#7c776f', '#2b2926', '#0c0b0a'], label: 'Tactile Intelligence Platform', note: 'Screenshot, data visualisation or hardware photo' },
  { file: 'src/assets/images/projects/aeroagent.webp', w: 1600, h: 1200, tone: ['#6d7a88', '#262c33', '#0a0b0d'], label: 'AeroAgent', note: 'Screenshot, simulation still or flight footage frame' },
  { file: 'src/assets/images/projects/vesselx.webp', w: 1600, h: 1200, tone: ['#737373', '#292929', '#0b0b0b'], label: 'VesselX', note: 'Screenshot or product visual' },
  { file: 'public/og-image.jpg', w: 1200, h: 630, kind: 'og', label: 'Social sharing image', note: 'Name over a crop of the hero photograph' },
];

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const grain = `
  <filter id="grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
    <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0"/>
  </filter>`;

function caption({ w, h, label, note, file }, ink = '#ffffff') {
  const s = Math.min(w, h) / 1000;
  const name = file.split('/').pop();
  return `
  <g font-family="Georgia, 'Times New Roman', serif" fill="${ink}" text-anchor="middle">
    <text x="${w / 2}" y="${h / 2 - 34 * s}" font-family="Helvetica, Arial, sans-serif" font-size="${18 * s}" letter-spacing="${4 * s}" opacity="0.55">PLACEHOLDER</text>
    <text x="${w / 2}" y="${h / 2 + 22 * s}" font-size="${46 * s}" opacity="0.92">${esc(label)}</text>
    <text x="${w / 2}" y="${h / 2 + 64 * s}" font-family="Helvetica, Arial, sans-serif" font-size="${19 * s}" opacity="0.6">${esc(note)}</text>
    <text x="${w / 2}" y="${h / 2 + 100 * s}" font-family="Menlo, monospace" font-size="${17 * s}" opacity="0.45">${esc(name)}</text>
  </g>`;
}

function frame(w, h) {
  const m = Math.min(w, h) * 0.04;
  const t = Math.min(w, h) * 0.035;
  const c = (x, y, dx, dy) => `<path d="M${x} ${y + dy * t}V${y}H${x + dx * t}" />`;
  return `<g fill="none" stroke="#fff" stroke-opacity="0.28" stroke-width="${Math.max(1, w / 1200)}">
    ${c(m, m, 1, 1)}${c(w - m, m, -1, 1)}${c(m, h - m, 1, -1)}${c(w - m, h - m, -1, -1)}
  </g>`;
}

function studio({ w, h, tone }) {
  const [hi, mid, lo] = tone;
  return `
  <defs>
    <radialGradient id="leak" cx="0.32" cy="0.28" r="0.9">
      <stop offset="0" stop-color="${hi}"/><stop offset="0.45" stop-color="${mid}"/><stop offset="1" stop-color="${lo}"/>
    </radialGradient>
    <radialGradient id="vig" cx="0.5" cy="0.5" r="0.75">
      <stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity="0.65"/>
    </radialGradient>
    ${grain}
  </defs>
  <rect width="${w}" height="${h}" fill="url(#leak)"/>
  <rect width="${w}" height="${h}" fill="url(#vig)"/>
  <rect width="${w}" height="${h}" filter="url(#grain)"/>`;
}

// Dusk sky over dark water, echoing the cinematic hero the design is built for.
// The dashed figure only marks where the subject should stand.
function dusk({ w, h }) {
  const horizon = h * (w > h ? 0.62 : 0.6);
  const s = Math.min(w, h) / 1000;
  const cx = w / 2;
  const fig = `M${cx - 120 * s} ${h} L${cx - 150 * s} ${horizon + 40 * s} Q${cx - 165 * s} ${h * 0.46} ${cx - 95 * s} ${h * 0.43}
    Q${cx - 55 * s} ${h * 0.41} ${cx - 50 * s} ${h * 0.39} Q${cx - 70 * s} ${h * 0.3} ${cx} ${h * 0.3}
    Q${cx + 70 * s} ${h * 0.3} ${cx + 50 * s} ${h * 0.39} Q${cx + 55 * s} ${h * 0.41} ${cx + 95 * s} ${h * 0.43}
    Q${cx + 165 * s} ${h * 0.46} ${cx + 150 * s} ${horizon + 40 * s} L${cx + 120 * s} ${h}`;
  const clouds = [
    [0.14, 0.2, 0.13, 0.05], [0.36, 0.14, 0.1, 0.035], [0.55, 0.24, 0.16, 0.055], [0.8, 0.12, 0.14, 0.05],
    [0.9, 0.36, 0.12, 0.04], [0.24, 0.4, 0.15, 0.04], [0.68, 0.42, 0.18, 0.045], [0.05, 0.5, 0.1, 0.03],
  ].map(([x, y, rx, ry]) => `<ellipse cx="${x * w}" cy="${y * h}" rx="${rx * w}" ry="${ry * h}" />`).join('');
  return `
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#c3c9d1"/><stop offset="0.7" stop-color="#d9d4cb"/><stop offset="1" stop-color="#cfc8bd"/>
    </linearGradient>
    <linearGradient id="sea" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#5a616b"/><stop offset="0.5" stop-color="#2c3138"/><stop offset="1" stop-color="#0c0d0f"/>
    </linearGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="${28 * s}"/></filter>
    ${grain}
  </defs>
  <rect width="${w}" height="${horizon}" fill="url(#sky)"/>
  <g fill="#8c8f99" opacity="0.55" filter="url(#soft)">${clouds}</g>
  <rect y="${horizon}" width="${w}" height="${h - horizon}" fill="url(#sea)"/>
  <rect y="${horizon}" width="${w}" height="${2 * s}" fill="#9aa0a8" opacity="0.5"/>
  <path d="${fig}" fill="#1b2230" fill-opacity="0.18" stroke="#ffffff" stroke-opacity="0.45" stroke-width="${2 * s}" stroke-dasharray="${10 * s} ${8 * s}"/>
  <rect width="${w}" height="${h}" filter="url(#grain)"/>
  <g font-family="Helvetica, Arial, sans-serif" fill="#ffffff" text-anchor="middle" opacity="0.7">
    <text x="${cx}" y="${horizon + (h - horizon) * 0.22}" font-size="${17 * s}" letter-spacing="${3 * s}">PLACEHOLDER  ·  REPLACE WITH YOUR PHOTOGRAPH</text>
    <text x="${cx}" y="${horizon + (h - horizon) * 0.22 + 30 * s}" font-family="Menlo, monospace" font-size="${15 * s}" opacity="0.8">${esc('src/assets/images/hero/' + (w > h ? 'hero-portrait.webp' : 'hero-portrait-mobile.webp'))}</text>
  </g>`;
}

function og(a) {
  const { w, h } = a;
  return `${studio({ w, h, tone: ['#6b7079', '#24272c', '#050505'] })}
  <text x="${w / 2}" y="${h / 2 + 10}" text-anchor="middle" font-family="Georgia, serif" font-size="74" fill="#fff" letter-spacing="2">SAMI ADAM MOUGHLI</text>
  <text x="${w / 2}" y="${h / 2 + 60}" text-anchor="middle" font-family="Helvetica, Arial, sans-serif" font-size="22" fill="#fff" opacity="0.6">Placeholder sharing image  ·  public/og-image.jpg</text>`;
}

for (const a of assets) {
  const out = join(root, a.file);
  if (existsSync(out) && !force) {
    console.log(`skip   ${a.file} (exists)`);
    continue;
  }
  const body = a.kind === 'hero' ? dusk(a) : a.kind === 'og' ? og(a) : `${studio(a)}${frame(a.w, a.h)}${caption(a)}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${a.w}" height="${a.h}" viewBox="0 0 ${a.w} ${a.h}">${body}</svg>`;
  mkdirSync(dirname(out), { recursive: true });
  const img = sharp(Buffer.from(svg));
  await (out.endsWith('.jpg') ? img.jpeg({ quality: 86 }) : img.webp({ quality: 88 })).toFile(out);
  console.log(`write  ${a.file}`);
}
