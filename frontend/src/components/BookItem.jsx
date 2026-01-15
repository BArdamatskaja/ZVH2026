export default function BookItem({ book, onEdit, onDelete }) {
  return (
    <li>
      {book.title}
      <button onClick={() => onEdit(book)}>Edit</button>
      <button onClick={() => onDelete(book.id)}>Delete</button>
    </li>
  );
}
