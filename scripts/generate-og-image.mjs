import sharp from 'sharp';

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#00e5ff;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#ffab40;stop-opacity:1" />
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="#0a0a0f"/>

  <!-- Subtle grid pattern -->
  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-opacity="0.03" stroke-width="1"/>
  </pattern>
  <rect width="${width}" height="${height}" fill="url(#grid)"/>

  <!-- Top accent line -->
  <rect x="0" y="0" width="${width}" height="4" fill="url(#accent)"/>

  <!-- TC Monogram -->
  <text x="${width/2}" y="250" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="140" font-weight="bold" fill="#00e5ff" filter="url(#glow)">TC</text>

  <!-- Name -->
  <text x="${width/2}" y="360" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="48" font-weight="bold" fill="#e0e0e8">Travis Carter</text>

  <!-- Subtitle -->
  <text x="${width/2}" y="420" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#8888a0">Software Architect</text>

  <!-- Divider line -->
  <rect x="${width/2 - 100}" y="460" width="200" height="2" fill="url(#accent)" opacity="0.6"/>

  <!-- Domain -->
  <text x="${width/2}" y="520" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="22" fill="#55556a">phatjam98.com</text>

  <!-- Bottom accent line -->
  <rect x="0" y="${height - 4}" width="${width}" height="4" fill="url(#accent)"/>
</svg>
`;

await sharp(Buffer.from(svg))
  .png()
  .toFile('public/og-image.png');

// Verify
const meta = await sharp('public/og-image.png').metadata();
console.log(`Generated OG image: ${meta.width}x${meta.height} (${meta.format})`);

if (meta.width !== 1200 || meta.height !== 630) {
  console.error('ERROR: Dimensions mismatch!');
  process.exit(1);
}

console.log('OG image generated successfully!');
