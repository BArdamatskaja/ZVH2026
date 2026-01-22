import BookItem from "./BookItem";

export default function BookList({ books, onEdit, onDelete }) {
  return (
    <ul className="list">
      {books.map((b) => (
        <BookItem
          key={b.id}
          book={b}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
