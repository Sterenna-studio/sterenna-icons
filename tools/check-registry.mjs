import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const registryPath = join(root, 'icons.registry.json');
let hasError = false;

function error(message) {
  console.error(`ERROR: ${message}`);
  hasError = true;
}

function warn(message) {
  console.warn(`WARN: ${message}`);
}

if (!existsSync(registryPath)) {
  error('icons.registry.json is missing');
  process.exit(1);
}

const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
const ids = new Set();

if (!Array.isArray(registry.icons)) {
  error('registry.icons must be an array');
  process.exit(1);
}

for (const icon of registry.icons) {
  if (!icon.iconId) error('icon entry missing iconId');
  if (!icon.repo) error(`${icon.iconId} missing repo`);
  if (!icon.priority) error(`${icon.iconId} missing priority`);
  if (!icon.themeColor) error(`${icon.iconId} missing themeColor`);
  if (!icon.visualBase) error(`${icon.iconId} missing visualBase`);

  if (ids.has(icon.iconId)) error(`duplicate iconId: ${icon.iconId}`);
  ids.add(icon.iconId);

  const sourceDir = join(root, 'sources', icon.iconId);
  const notesPath = join(sourceDir, 'notes.md');
  const svgPath = join(sourceDir, 'icon.svg');

  if (!existsSync(sourceDir)) warn(`${icon.iconId}: missing sources directory`);
  if (!existsSync(notesPath)) warn(`${icon.iconId}: missing notes.md`);
  if (!existsSync(svgPath)) warn(`${icon.iconId}: missing icon.svg`);
}

if (hasError) process.exit(1);
console.log(`OK: ${registry.icons.length} registry entries checked.`);
