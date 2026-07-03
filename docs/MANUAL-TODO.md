# Manual TODO

Certains fichiers peuvent être ajoutés localement plus facilement que via le connecteur GitHub.

## À ajouter localement

1. Copier `templates/package.template.json` vers `package.json`.
2. Créer les fichiers `sources/<iconId>/icon.svg`.
3. Générer les exports binaires : PNG et ICO.
4. Relancer `node tools/check-registry.mjs`.
5. Relancer `node tools/generate-favicons.mjs`.

## Source bloquée via connecteur

- `sources/nitro-skill-arena/notes.md`
- fichiers `.svg` directs
- `package.json` direct

Ces fichiers peuvent être créés sans souci en local puis poussés avec Git.
