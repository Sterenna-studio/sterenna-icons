# Rollout checklist favicon

Pour chaque repo web :

- [ ] choisir ou créer le `iconId` dans `icons.registry.json` ;
- [ ] créer `sources/<iconId>/icon.svg` ;
- [ ] générer les exports binaires ;
- [ ] copier les exports dans le repo cible ;
- [ ] ajouter les balises `<link rel="icon">` ;
- [ ] vérifier l'absence de 404 sur `favicon.ico` ;
- [ ] tester après déploiement.

## Fichiers minimum

```txt
favicon.ico
favicon.svg
favicon-32.png
apple-touch-icon.png
site.webmanifest
```

## Priorité P0

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

## Priorité P1

```txt
bzh-breach-storm
bzh-nemeton-lockdown
spirit-overdrive
```
