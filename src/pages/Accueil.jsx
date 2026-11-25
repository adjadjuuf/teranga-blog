import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import { API_URL } from "../constants";
import EtatRequete from "../components/EtatRequete";
import ListeArticles from "../components/ListeArticles";

export default function Accueil() {
  const { favoris, basculerFavori } = useOutletContext();
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/posts?_limit=3`, { signal: controller.signal })
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
        setErreur("Impossible de charger les derniers articles.");
        setChargement(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <section className="page page-accueil">
      <h1 className="titre-page">Bienvenue sur Teranga Blog</h1>
      <p className="chapeau">Lis les articles, découvre leurs auteurs et garde tes préférés.</p>
      <h2 className="titre-section">Derniers articles</h2>
      <EtatRequete chargement={chargement} erreur={erreur}>
        <ListeArticles
          articles={articles}
          favoris={favoris}
          onBasculerFavori={basculerFavori}
        />
      </EtatRequete>
    </section>
  );
}