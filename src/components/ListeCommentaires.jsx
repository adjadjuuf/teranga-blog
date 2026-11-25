export default function ListeCommentaires({ commentaires }) {
  return (
    <ul className="commentaires">
      {commentaires.map((c) => (
        <li key={c.id} className="commentaire">
          <strong className="commentaire-auteur">{c.name}</strong> : {c.body}
        </li>
      ))}
    </ul>
  );
}