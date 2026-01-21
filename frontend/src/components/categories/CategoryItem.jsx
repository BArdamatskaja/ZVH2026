export default function CategoryItem({ category, onEdit, onDelete }) {
  return (
    <li>
      {category.name}
      <button onClick={() => onEdit(category)}>Edit</button>
      <button onClick={() => onDelete(category.id)}>Delete</button>
    </li>
  );
}
