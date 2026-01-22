export default function BookCard({ book }) {
  return (
    <article className="card cardPad stack">
      <div
        className="row"
        style={{ justifyContent: "space-between" }}
      >
        {book.picture && (
          <div
            style={{
              width: "100%",
              height: "220px",
              backgroundColor: "#f3f4f6",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={book.picture}
              alt={book.title}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
              loading="lazy"
              onError={(e) => {
                e.currentTarget.src =
                  "https://via.placeholder.com/200x300?text=No+Cover";
              }}
            />
          </div>
        )}
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
