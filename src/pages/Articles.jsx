import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { API_URL } from "../constants";
import EtatRequete from "../components/EtatRequete";
import BarreRecherche from "../components/BarreRecherche";
import ListeArticles from "../components/ListeArticles";

export default function Articles() {
  const { favoris, basculerFavori } = useOutletContext();
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const [recherche, setRecherche] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/posts?_limit=6`, { signal: controller.signal })
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error(`Erreur ${reponse.status}`);
        }
        return reponse.json();
      })
      .then((donnees) => {
        setArticles(donnees);
        setChargement(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setErreur("Impossible de charger les articles.");
        setChargement(false);
      });

    return () => controller.abort();
  }, []);

  const articlesFiltres = articles.filter((a) =>
    a.title.toLowerCase().includes(recherche.toLowerCase())
  );

  return (
    <section className="page">
      <h1 className="titre-page">Articles</h1>
      <BarreRecherche valeur={recherche} onChangement={setRecherche} />
      <EtatRequete chargement={chargement} erreur={erreur}>
        <ListeArticles
          articles={articlesFiltres}
          favoris={favoris}
          onBasculerFavori={basculerFavori}
        />
      </EtatRequete>
    </section>
  );
}