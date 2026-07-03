import { existsSync, mkdirSync, copyFileSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';

const [iconId, targetDir] = process.argv.slice(2);

if (!iconId || !targetDir) {
  console.error('Usage: node tools/copy-to-repo.mjs <iconId> <targetDir>');
  process.exit(1);
}

const root = process.cwd();
const registry = JSON.parse(readFileSync(join(root, 'icons.registry.json'), 'utf8'));
const icon = registry.icons.find((entry) => entry.iconId === iconId);

if (!icon) {
  console.error(`Unknown iconId: ${iconId}`);
  process.exit(1);
}

const exportDir = join(root, 'exports', iconId);
if (!existsSync(exportDir)) {
  console.error(`Missing export directory: ${exportDir}`);
  console.error('Run: node tools/generate-favicons.mjs');
  process.exit(1);
}

mkdirSync(targetDir, { recursive: true });

const files = [
  'favicon.ico',
  'favicon.svg',
  'favicon-32.png',
  'apple-touch-icon.png',
  'site.webmanifest'
];

for (const file of files) {
  const source = join(exportDir, file);
  if (!existsSync(source)) {
    console.warn(`WARN: missing ${file}; skipped`);
    continue;
  }
  copyFileSync(source, join(targetDir, basename(file)));
  console.log(`Copied ${file}`);
}

console.log(`Done for ${iconId} -> ${targetDir}`);
