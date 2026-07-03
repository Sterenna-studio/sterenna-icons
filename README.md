# Sterenna Icons

Sources et exports favicon / app icons pour les projets Sterenna Studio, Nitro, Gwen Ha Star, BZH Chronicles et Pokegang.

Ce dépôt centralise :

- les sources SVG ;
- les exports `favicon.ico` / PNG ;
- les `apple-touch-icon` ;
- les `site.webmanifest` ;
- le registre des icônes par projet ;
- les checklists de déploiement favicon.

## Convention de nommage

Chaque icône possède un identifiant stable :

```txt
<scope>-<project>
```

Exemples :

```txt
star-gwen-ha-star
bzh-universe
nitro-clicker
botanica-obscura
nitro-skill-arena
nitro-titan-rocket-run
pokegang
chronicles-tcg
```

## Arborescence

```txt
sterenna-icons/
├── README.md
├── icons.registry.json
├── brands/
├── sources/
│   └── <iconId>/
│       ├── icon.svg
│       ├── icon-dark.svg
│       ├── icon-light.svg
│       └── notes.md
├── exports/
│   └── <iconId>/
│       ├── favicon.ico
│       ├── favicon.svg
│       ├── favicon-16.png
│       ├── favicon-32.png
│       ├── icon-192.png
│       ├── icon-512.png
│       ├── apple-touch-icon.png
│       └── site.webmanifest
└── tools/
    └── rollout-checklist.md
```

## Kit minimum par repo web

```txt
/favicon.ico
/favicon.svg
/favicon-32.png
/apple-touch-icon.png
/site.webmanifest
```

## Balises HTML recommandées

Pour un site servi à la racine :

```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#070b14">
```

Pour un sous-projet servi dans un sous-dossier :

```html
<link rel="icon" href="./favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="./favicon.svg">
<link rel="icon" type="image/png" sizes="32x32" href="./favicon-32.png">
<link rel="apple-touch-icon" href="./apple-touch-icon.png">
<link rel="manifest" href="./site.webmanifest">
<meta name="theme-color" content="#070b14">
```

## Priorité P0

- `star-gwen-ha-star`
- `bzh-universe`
- `nitro-clicker`
- `botanica-obscura`
- `nitro-skill-arena`
- `nitro-titan-rocket-run`
- `pokegang`
- `chronicles-tcg`

## Priorité P1

- `bzh-breach-storm`
- `bzh-nemeton-lockdown`
- `spirit-overdrive`

## Notes

Les fichiers `.ico` et `.png` sont binaires. Ils doivent être générés localement ou via workflow avant commit. Les sources SVG et manifests sont versionnés ici comme source de vérité.
