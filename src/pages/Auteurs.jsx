import { useEffect, useState } from "react";
import { Link } from "react-router";
import { API_URL } from "../constants";
import EtatRequete from "../components/EtatRequete";

export default function Auteurs() {
  const [auteurs, setAuteurs] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/users`, { signal: controller.signal })
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error(`Erreur ${reponse.status}`);
        }
        return reponse.json();
      })
      .then((donnees) => {
        setAuteurs(donnees);
        setChargement(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;
        setErreur("Impossible de charger les auteurs.");
        setChargement(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <section className="page">
      <h1 className="titre-page">Auteurs</h1>
      <EtatRequete chargement={chargement} erreur={erreur}>
        <ul className="liste-auteurs">
          {auteurs.map((a) => (
            <li key={a.id} className="carte carte-auteur">
              <Link to={`/auteurs/${a.id}`}>
                <strong>{a.name}</strong>
              </Link>{" "}
              (@{a.username}), {a.company.name}
            </li>
          ))}
        </ul>
      </EtatRequete>
    </section>
  );
}