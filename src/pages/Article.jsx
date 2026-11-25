import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { API_URL } from "../constants";
import EtatRequete from "../components/EtatRequete";
import ListeCommentaires from "../components/ListeCommentaires";
import CommentaireForm from "../components/CommentaireForm";

export default function Article() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [commentaires, setCommentaires] = useState([]);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setChargement(true);
    setErreur(null);

    Promise.all([
      fetch(`${API_URL}/posts/${id}`, { signal: controller.signal }),
      fetch(`${API_URL}/posts/${id}/comments`, { signal: controller.signal }),
    ])
      .then(([repArticle, repCommentaires]) => {
        if (!repArticle.ok || !repCommentaires.ok) {
          throw new Error("Article introuvable.");
        }
        return Promise.all([repArticle.json(), repCommentaires.json()]);
      })
      .then(([donneesArticle, donneesCommentaires]) => {
        setArticle(donneesArticle);
        setCommentaires(donneesCommentaires);
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

  function ajouterCommentaire(nouveau) {
    setCommentaires((actuels) => [...actuels, nouveau]);
  }

  return (
    <EtatRequete chargement={chargement} erreur={erreur}>
      {article && (
        <article className="page article-detail">
          <h1 className="titre-page">{article.title}</h1>
          <p className="article-texte">{article.body}</p>
          <h2 className="titre-section">Commentaires</h2>
          <ListeCommentaires commentaires={commentaires} />
          <CommentaireForm onAjouter={ajouterCommentaire} />
        </article>
      )}
    </EtatRequete>
  );
}