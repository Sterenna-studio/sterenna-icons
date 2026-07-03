import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const registryPath = join(root, 'icons.registry.json');

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
}

if (!existsSync(registryPath)) {
  fail('icons.registry.json is missing');
  process.exit();
}

const registry = JSON.parse(readFileSync(registryPath, 'utf8'));
const ids = new Set();

if (!Array.isArray(registry.icons)) {
  fail('registry.icons must be an array');
  process.exit();
}

for (const icon of registry.icons) {
  if (!icon.iconId) fail('icon entry missing iconId');
  if (!icon.repo) fail(`${icon.iconId} missing repo`);
  if (!icon.priority) fail(`${icon.iconId} missing priority`);
  if (!icon.themeColor) fail(`${icon.iconId} missing themeColor`);
  if (!icon.visualBase) fail(`${icon.iconId} missing visualBase`);

  if (ids.has(icon.iconId)) fail(`duplicate iconId: ${icon.iconId}`);
  ids.add(icon.iconId);

  const sourceDir = join(root, 'sources', icon.iconId);
  const notesPath = join(sourceDir, 'notes.md');
  const svgPath = join(sourceDir, 'icon.svg');

  if (!existsSync(sourceDir)) fail(`${icon.iconId}: missing sources directory`);
  if (!existsSync(notesPath)) fail(`${icon.iconId}: missing sources/${icon.iconId}/notes.md`);
  if (!existsSync(svgPath)) console.warn(`WARN: ${icon.iconId}: missing sources/${icon.iconId}/icon.svg`);
}

if (!process.exitCode) {
  console.log(`OK: ${registry.icons.length} icon entries checked.`);
}
