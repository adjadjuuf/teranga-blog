import { Link } from "react-router";

export default function Introuvable() {
  return (
    <section className="page page-404">
      <h1 className="titre-page">404 : page introuvable</h1>
      <p className="chapeau">Cette adresse n'existe pas.</p>
      <Link to="/" className="bouton">Retour à l'accueil</Link>
    </section>
  );
}