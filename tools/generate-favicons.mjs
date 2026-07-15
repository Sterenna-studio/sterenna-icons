import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const registry = JSON.parse(readFileSync(join(root, 'icons.registry.json'), 'utf8'));

// ── GitHub raw fetch (pour sourceRef) ────────────────────────────────────────
async function fetchGitHubRaw(repo, path) {
  const token = process.env.GITHUB_TOKEN ?? '';
  const url = `https://raw.githubusercontent.com/${repo}/main/${path}`;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  const res = await fetch(url, { headers });
  if (!res.ok) throw new Error(`fetch ${url} → HTTP ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

// ── Webmanifest ───────────────────────────────────────────────────────────────
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

// ── Main ──────────────────────────────────────────────────────────────────────
let fetched = 0;
let skipped = 0;

for (const icon of registry.icons) {
  const sourceSvg = join(root, 'sources', icon.iconId, 'icon.svg');
  const exportDir = join(root, 'exports', icon.iconId);
  mkdirSync(exportDir, { recursive: true });

  // 1. SVG local
  if (existsSync(sourceSvg)) {
    copyFileSync(sourceSvg, join(exportDir, 'favicon.svg'));
  }

  // 2. sourceRef PNG distant
  if (icon.sourceRef?.type === 'png') {
    const destPath = join(exportDir, 'favicon-source.png');
    if (existsSync(destPath)) {
      console.log(`  [skip] ${icon.iconId} — favicon-source.png déjà présent`);
      skipped++;
    } else {
      try {
        const buf = await fetchGitHubRaw(icon.sourceRef.repo, icon.sourceRef.path);
        writeFileSync(destPath, buf);
        console.log(`  [⬇️ ] ${icon.iconId} — ${icon.sourceRef.path} (${(buf.length / 1024).toFixed(1)} KB)`);
        fetched++;
      } catch (err) {
        console.warn(`  [⚠️ ] ${icon.iconId} — impossible de fetcher sourceRef : ${err.message}`);
      }
    }
  }

  // 3. Webmanifest
  writeFileSync(
    join(exportDir, 'site.webmanifest'),
    `${JSON.stringify(manifestFor(icon), null, 2)}\n`,
    'utf8'
  );

  // 4. README par icon
  const sourceSection = icon.sourceRef
    ? `## Source externe\n\n- Repo : \`${icon.sourceRef.repo}\`\n- Fichier : \`${icon.sourceRef.path}\`\n- Type : \`${icon.sourceRef.type}\`\n${icon.sourceRef.note ? `- Note : ${icon.sourceRef.note}` : ''}\n\n`
    : '';

  const readme = `# ${icon.iconId}\n\nRepo cible : ${icon.repo}\nPriorité : ${icon.priority}\nBase visuelle : ${icon.visualBase}\nTheme color : ${icon.themeColor}\n\n${sourceSection}## Exports\n\n- \`favicon.svg\` : généré depuis source SVG locale si disponible\n- \`favicon-source.png\` : fetché depuis le repo source (si sourceRef défini)\n- \`site.webmanifest\` : généré automatiquement\n- \`favicon.ico\` / \`favicon-32.png\` / \`apple-touch-icon.png\` : à générer depuis favicon-source.png ou favicon.svg\n`;
  writeFileSync(join(exportDir, 'README.md'), readme, 'utf8');
}

console.log(`\nGenerated exports for ${registry.icons.length} icons.`);
if (fetched) console.log(`Fetched ${fetched} external PNG source(s).`);
if (skipped) console.log(`Skipped ${skipped} already-present source(s).`);
console.log('PNG/ICO binary generation: run via outil graphique ou pipeline dédié.');
