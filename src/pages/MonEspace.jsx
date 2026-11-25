import { Navigate, useOutletContext } from "react-router";

export default function MonEspace() {
  const { connecte, setConnecte, favoris } = useOutletContext();

  if (!connecte) {
    return <Navigate to="/connexion" replace />;
  }

  return (
    <section className="page carte carte-centree">
      <h1 className="titre-page">Mon espace</h1>
      <p className="chapeau">Tu es connecté(e) et tu as {favoris.length} favori(s).</p>
      <button className="bouton bouton-secondaire" onClick={() => setConnecte(false)}>Se déconnecter</button>
    </section>
  );
}