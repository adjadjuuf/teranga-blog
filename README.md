# Teranga Blog

Un mini-blog multipage en React : lire des articles, découvrir leurs auteurs, commenter et garder ses articles favoris. Les données viennent de l'API publique JSONPlaceholder (lecture seule).

## Fonctionnalités

- Navigation sans rechargement (React Router), lien de la page courante mis en valeur
- Liste d'articles chargée depuis l'API, avec recherche par titre
- Détail d'un article par adresse (`/articles/3`) avec ses commentaires
- Formulaire de commentaire validé (le commentaire reste local, rien n'est envoyé à l'API)
- Favoris partagés entre les pages, compteur dans la barre de navigation
- Liste des auteurs et fiche de chaque auteur avec ses articles
- Messages de chargement et d'erreur, page 404
- Niveau Or : connexion simulée et page « Mon espace » protégée

## Lancer le projet

```bash
git clone https://github.com/TON-PSEUDO/teranga-blog.git
cd teranga-blog
git checkout projet/mini-blog
npm install
npm run dev
```

Puis ouvrir l'adresse affichée dans le terminal (souvent http://localhost:5173).

## Lien en ligne

https://TON-PROJET.vercel.app

## Trois choses que j'ai apprises

1. L'état se remonte au plus proche ancêtre commun : les favoris vivent dans le layout, car la barre de navigation et plusieurs pages en ont besoin.
2. Un `useEffect` qui charge des données doit annuler sa requête (`AbortController`) et vérifier `reponse.ok`, car `fetch` ne rejette pas la promesse sur un code 404.
3. `useParams` renvoie toujours du texte, et une application à plusieurs routes demande une règle de réécriture au déploiement (`vercel.json`) pour survivre à un rechargement sur une adresse profonde.