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

  const handleDelete = (id) => deleteCategory(id).then(loadCategories);

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
    <div>
      <h2>Categories</h2>
      <div>
        <input
          type="text"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          placeholder="Search category by ID"
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
      <CategoryForm
        onSave={handleSave}
        editCategory={editCategory}
        onCancel={() => setEditCategory(null)}
      />
      <CategoryList
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
