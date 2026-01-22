export default function BookItem({ book, onEdit, onDelete }) {
  return (
    <li className="listRow">
      <div>
        <div className="listTitle">{book.title}</div>
        <div className="listMeta">
          {book.category?.name ? `${book.category.name} • ` : ""}ISBN:{" "}
          {book.isbn}
        </div>
      </div>
      <div
        className="row"
        style={{ justifyContent: "flex-end" }}
      >
        <button
          className="btn btn--sm"
          onClick={() => onEdit(book)}
        >
          Edit
        </button>
        <button
          className="btn btn--sm btn--danger"
          onClick={() => onDelete(book.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
