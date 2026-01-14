import { useEffect, useState } from "react";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../services/categoryService";
import CategoryForm from "./CategoryForm";
import CategoryList from "./CategoryList";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    getCategories().then((res) => setCategories(res.data));
  };

  const handleSave = (name) => {
    if (editCategory) {
      updateCategory(editCategory, { name }).then(loadCategories);
    } else {
      createCategory({ name }).then(loadCategories);
    }
    setEditCategory(null);
  };

  const handleEdit = (category) => setEditCategory(category);

  const handleDelete = (id) => deleteCategory(id).then(loadCategories);

  return (
    <div>
      <h2>Categories</h2>
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
