import { useState } from "react";

export default function CommentaireForm({ onAjouter }) {
  const [nom, setNom] = useState("");
  const [message, setMessage] = useState("");
  const [erreur, setErreur] = useState("");

  function envoyer(e) {
    e.preventDefault();

    if (nom.trim() === "") {
      setErreur("Le nom est obligatoire.");
      return;
    }
    if (message.trim().length < 5) {
      setErreur("Le message doit contenir au moins 5 caractères.");
      return;
    }

    onAjouter({ id: Date.now(), name: nom.trim(), body: message.trim() });
    setNom("");
    setMessage("");
    setErreur("");
  }

  return (
    <form className="formulaire" onSubmit={envoyer}>
      <input
        className="champ"
        type="text"
        placeholder="Votre nom"
        value={nom}
        onChange={(e) => setNom(e.target.value)}
      />
      <textarea
        className="champ champ-texte"
        placeholder="Votre commentaire"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {erreur && <p className="message-erreur" role="alert">{erreur}</p>}
      <button className="bouton" type="submit">Publier</button>
    </form>
  );
}