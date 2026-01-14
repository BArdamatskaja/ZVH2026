import { useEffect, useState } from "react";

export default function CategoryForm({ onSave, editCategory, onCancel }) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (editCategory) setName(editCategory.name);
  }, [editCategory]);

  const submit = (e) => {
    e.preventDefault();
    onSave(name);
    setName("");
  };

  return (
    <form onSubmit={submit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
      />
      <button>{editCategory ? "Update" : "Add"}</button>
      {editCategory && <button onClick={onCancel}>Cancel</button>}
    </form>
  );
}
