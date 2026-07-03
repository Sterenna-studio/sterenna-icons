# Rollout checklist

Pour chaque repo web :

- [ ] choisir `iconId` dans `icons.registry.json`
- [ ] créer `sources/<iconId>/icon.svg`
- [ ] générer les exports
- [ ] copier à la racine du repo cible :
  - `favicon.ico`
  - `favicon.svg`
  - `favicon-32.png`
  - `apple-touch-icon.png`
  - `site.webmanifest`
- [ ] ajouter les balises `<link rel="icon">`
- [ ] tester l’absence de 404 sur `/favicon.ico`
