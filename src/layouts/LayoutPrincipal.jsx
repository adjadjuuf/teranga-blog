import { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";

export default function LayoutPrincipal() {
  const [favoris, setFavoris] = useState([]);
  const [connecte, setConnecte] = useState(false);

  function basculerFavori(article) {
    setFavoris((actuels) =>
      actuels.some((f) => f.id === article.id)
        ? actuels.filter((f) => f.id !== article.id)
        : [...actuels, article]
    );
  }

  return (
    <>
      <header className="barre-nav">
        <nav className="conteneur">
          <Link to="/" className="lien-logo">
            <img src="/logo-teranga-blog.png" alt="Teranga Blog" height="40" className="logo" />
          </Link>
          <NavLink to="/" end>Accueil</NavLink>
          <NavLink to="/articles">Articles</NavLink>
          <NavLink to="/auteurs">Auteurs</NavLink>
          <NavLink to="/favoris">Favoris ({favoris.length})</NavLink>
          <NavLink to="/mon-espace">Mon espace</NavLink>
          <NavLink to="/connexion">Connexion</NavLink>
        </nav>
      </header>
      <main className="conteneur contenu">
        <Outlet context={{ favoris, basculerFavori, connecte, setConnecte }} />
      </main>
    </>
  );
}