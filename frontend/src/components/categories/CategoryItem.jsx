export default function CategoryItem({ category, onEdit, onDelete }) {
  return (
    <li className="listRow">
      <div>
        <div className="listTitle">{category.name}</div>
        <div className="listMeta">ID: {category.id}</div>
      </div>
      <div
        className="row"
        style={{ justifyContent: "flex-end" }}
      >
        <button
          className="btn btn--sm"
          onClick={() => onEdit(category)}
        >
          Edit
        </button>
        <button
          className="btn btn--sm btn--danger"
          onClick={() => onDelete(category.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}
