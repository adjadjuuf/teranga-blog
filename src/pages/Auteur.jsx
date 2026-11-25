import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { API_URL } from "../constants";
import EtatRequete from "../components/EtatRequete";

export default function Auteur() {
  const { id } = useParams();
  const [auteur, setAuteur] = useState(null);
  const [articles, setArticles] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setChargement(true);
    setErreur(null);

    Promise.all([
      fetch(`${API_URL}/users/${id}`, { signal: controller.signal }),
      fetch(`${API_URL}/posts?userId=${id}`, { signal: controller.signal }),
    ])
      .then(([repAuteur, repArticles]) => {
        if (!repAuteur.ok || !repArticles.ok) {
          throw new Error("Auteur introuvable.");
        }
        return Promise.all([repAuteur.json(), repArticles.json()]);
      })
      .then(([donneesAuteur, donneesArticles]) => {
        setAuteur(donneesAuteur);
        setArticles(donneesArticles);
        setChargement(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setErreur(
          err instanceof TypeError
            ? "Impossible de joindre le serveur. Vérifie ta connexion."
            : err.message
        );
        setChargement(false);
      });

    return () => controller.abort();
  }, [id]);

  return (
    <EtatRequete chargement={chargement} erreur={erreur}>
      {auteur && (
        <section className="page">
          <h1 className="titre-page">{auteur.name}</h1>
          <p className="auteur-contact">
            @{auteur.username} · {auteur.email} · {auteur.phone}
          </p>
          <p className="auteur-societe">Société : {auteur.company.name}</p>
          <h2 className="titre-section">Ses articles</h2>
          <ul className="liste-articles-auteur">
            {articles.map((a) => (
              <li key={a.id}>
                <Link to={`/articles/${a.id}`}>{a.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </EtatRequete>
  );
}