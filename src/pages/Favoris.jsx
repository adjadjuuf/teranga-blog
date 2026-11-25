import { useOutletContext } from "react-router";
import ListeArticles from "../components/ListeArticles";

export default function Favoris() {
  const { favoris, basculerFavori } = useOutletContext();

  return (
    <section className="page">
      <h1 className="titre-page">Mes favoris</h1>
      {favoris.length === 0 ? (
        <p className="vide">Aucun favori pour le moment.</p>
      ) : (
        <ListeArticles
          articles={favoris}
          favoris={favoris}
          onBasculerFavori={basculerFavori}
        />
      )}
    </section>
  );
}