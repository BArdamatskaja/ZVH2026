export default function BookCard({ book }) {
  return (
    <article className="card cardPad stack">
      <div
        className="row"
        style={{ justifyContent: "space-between" }}
      >
        <h3 style={{ margin: 0 }}>{book.title}</h3>
        {book.category?.name && (
          <span className="badge">{book.category.name}</span>
        )}
      </div>

      <div
        className="muted"
        style={{ fontSize: 13 }}
      >
        ISBN: {book.isbn}
      </div>

      <p className="muted">
        {String(book.description ?? "").length > 160
          ? String(book.description).slice(0, 160) + "…"
          : String(book.description ?? "")}
      </p>
    </article>
  );
}
