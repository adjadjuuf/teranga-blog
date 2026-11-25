import { Navigate, useOutletContext } from "react-router";

export default function Connexion() {
  const { connecte, setConnecte } = useOutletContext();

  if (connecte) {
    return <Navigate to="/mon-espace" replace />;
  }

  return (
    <section className="page carte carte-centree">
      <h1 className="titre-page">Connexion</h1>
      <p className="chapeau">Connexion simulée : aucun mot de passe n'est demandé.</p>
      <button className="bouton" onClick={() => setConnecte(true)}>Se connecter</button>
    </section>
  );
}