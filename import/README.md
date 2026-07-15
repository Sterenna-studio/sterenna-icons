# import/

Dossier de dépôt temporaire pour les **assets bruts** (SVG, PNG, AI, PDF…)
à traiter avant intégration dans le pipeline d'icônes.

## Utilisation

1. Dépose ici tes fichiers bruts : `pokegang-logo-v2.svg`, `bzh-universe-dark.png`, etc.
2. Une fois traité (optimisé, renommé, placé dans `sources/{iconId}/icon.svg`), supprime le fichier de ce dossier.
3. Ce dossier **n'est pas déployé** sur nitro (exclu dans le workflow).

## Convention de nommage

```
{iconId}[-variante][-version].{ext}

Exemples :
  pokegang-logo-v2.svg
  star-gwen-ha-star-dark.png
  nitro-clicker.ai
```

## Formats acceptés

| Format | Usage |
|--------|-------|
| `.svg` | Idéal — directement utilisable dans `sources/` |
| `.png` | Logo existant — base pour génération favicon |
| `.ai` / `.eps` | Source Illustrator — à exporter en SVG avant traitement |
| `.pdf` | Logo vectoriel — à convertir |

> Ce dossier est ignoré par `check-registry.mjs` et `generate-favicons.mjs`.
> Il sert uniquement de zone de transit.
