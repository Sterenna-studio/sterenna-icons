import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const registry = JSON.parse(readFileSync(join(root, 'icons.registry.json'), 'utf8'));

function manifestFor(icon) {
  const name = icon.name || icon.iconId;
  const shortName = icon.shortName || icon.iconId.slice(0, 12);
  return {
    name,
    short_name: shortName,
    description: icon.description || `Icon manifest for ${icon.iconId}`,
    start_url: '.',
    display: 'standalone',
    background_color: icon.themeColor || '#070b14',
    theme_color: icon.themeColor || '#070b14',
    icons: [
      { src: './icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: './icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  };
}

for (const icon of registry.icons) {
  const sourceSvg = join(root, 'sources', icon.iconId, 'icon.svg');
  const exportDir = join(root, 'exports', icon.iconId);
  mkdirSync(exportDir, { recursive: true });

  if (existsSync(sourceSvg)) {
    copyFileSync(sourceSvg, join(exportDir, 'favicon.svg'));
  }

  writeFileSync(
    join(exportDir, 'site.webmanifest'),
    `${JSON.stringify(manifestFor(icon), null, 2)}\n`,
    'utf8'
  );

  const readme = `# ${icon.iconId}\n\nRepo cible : ${icon.repo}\n\nPriorité : ${icon.priority}\n\nBase visuelle : ${icon.visualBase}\n\nTheme color : ${icon.themeColor}\n\n## Exports\n\n- favicon.svg : généré depuis source SVG si disponible\n- site.webmanifest : généré automatiquement\n- favicon.ico / png : à générer via outil graphique ou pipeline binaire\n`;
  writeFileSync(join(exportDir, 'README.md'), readme, 'utf8');
}

console.log(`Generated lightweight exports for ${registry.icons.length} icons.`);
console.log('PNG and ICO generation remains a binary step to run locally or via a dedicated workflow.');
