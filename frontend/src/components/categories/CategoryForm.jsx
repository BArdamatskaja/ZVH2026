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
    alert(
      editCategory
        ? "Category updated successfully!"
        : "Category added successfully!",
    );
  };

  return (
    <form
      onSubmit={submit}
      className="form"
    >
      <div className="field">
        <label className="label">Pavadinimas</label>
        <input
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Pvz. Fantastika"
          required
        />
      </div>

      <div
        className="row"
        style={{ justifyContent: "flex-end" }}
      >
        {editCategory && (
          <button
            type="button"
            className="btn btn--ghost"
            onClick={onCancel}
          >
            Atšaukti
          </button>
        )}
        <button
          type="submit"
          className="btn btn--primary"
        >
          {editCategory ? "Išsaugoti" : "Pridėti"}
        </button>
      </div>
    </form>
  );
}
