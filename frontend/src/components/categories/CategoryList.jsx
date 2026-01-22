import CategoryItem from "./CategoryItem";

export default function CategoryList({ categories, onEdit, onDelete }) {
  return (
    <ul className="list">
      {categories.map((C) => (
        <CategoryItem
          key={C.id}
          category={C}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
