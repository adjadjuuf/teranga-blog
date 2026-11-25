import { Link } from "react-router";

export default function ArticleCard({ article, estFavori, onBasculerFavori }) {
  const extrait =
    article.body.length > 100
      ? article.body.slice(0, 100) + "…"
      : article.body;

  return (
    <article className="carte carte-article">
      <h3 className="carte-titre">
        <Link to={`/articles/${article.id}`}>{article.title}</Link>
      </h3>
      <p className="carte-extrait">{extrait}</p>
      <button
        className={`bouton bouton-favori${estFavori ? " actif" : ""}`}
        onClick={() => onBasculerFavori(article)}
      >
        {estFavori ? "★ Retirer des favoris" : "☆ Ajouter aux favoris"}
      </button>
    </article>
  );
}