import { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  getCategories,
  updateCategory,
} from "../../services/categoryService";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((res) => setCategories(res.data));
  };

  const handleSave = (name) => {
    if (editCategory) {
      updateCategory(editCategory.id, { name }).then(loadCategories);
    } else {
      createCategory({ name }).then(loadCategories);
    }
    setEditCategory(null);
  };

  const handleEdit = (category) => setEditCategory(category);

  const handleDelete = async (id) => {
    setError("");

    try {
      await deleteCategory(id);
      loadCategories();
    } catch (err) {
      const status = err?.response?.status;

      if (status === 409) {
        setError(
          "Šios kategorijos ištrinti negalima, nes ji priskirta vienai ar daugiau knygų.",
        );
      } else {
        setError("Įvyko klaida trinant kategoriją.");
      }
    }
  };

  const handleSearchClick = () => {
    if (!searchId) return;

    getCategoryById(searchId)
      .then((res) => {
        handleEdit(res.data);
        setSearchId("");
      })
      .catch(() => {
        alert("Category not found!");
      });
  };

  return (
    <div className="stack">
      <div className="pageHeader">
        <h1>Admin • Kategorijos</h1>
        <p className="muted">Pridėk, redaguok ir trink kategorijas.</p>
      </div>
      {error && <div className="errorBox">{error}</div>}

      <div className="card cardPad stack">
        <div
          className="row"
          style={{ justifyContent: "space-between" }}
        >
          <div
            className="field"
            style={{ flex: 1, minWidth: 240 }}
          >
            <label className="label">Paieška pagal ID</label>
            <input
              className="input"
              type="text"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              placeholder="Pvz. 3"
            />
          </div>
          <button
            className="btn"
            onClick={handleSearchClick}
          >
            Ieškoti
          </button>
        </div>
      </div>

      <div
        className="grid grid--2"
        style={{ alignItems: "start" }}
      >
        <div className="card cardPad stack">
          <h2>
            {editCategory ? "Redaguoti kategoriją" : "Pridėti kategoriją"}
          </h2>
          <CategoryForm
            onSave={handleSave}
            editCategory={editCategory}
            onCancel={() => setEditCategory(null)}
          />
        </div>

        <div className="card cardPad stack">
          <h2>Esamos kategorijos</h2>
          <CategoryList
            categories={categories}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
