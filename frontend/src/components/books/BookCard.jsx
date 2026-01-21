import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <Link to={`/books/${book.id}`}>
      <h3>{book.title}</h3>

      <div>
        <span>{book.category?.name}</span>
        <span>ISBN: {book.isbn}</span>
      </div>

      <p>
        {book.description.length > 160
          ? book.description.slice(0, 160) + "…"
          : book.description}
      </p>
    </Link>
  );
}
