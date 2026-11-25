export default function BarreRecherche({ valeur, onChangement }) {
  return (
    <input
      className="champ champ-recherche"
      type="text"
      placeholder="Rechercher un article par titre"
      value={valeur}
      onChange={(e) => onChangement(e.target.value)}
    />
  );
}