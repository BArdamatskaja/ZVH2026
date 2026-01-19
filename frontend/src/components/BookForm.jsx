import { useEffect, useState } from "react";

export default function BookForm({
  onSave,
  editBook,
  onCancel,
  categories = [],
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isbn: "",
    picture: "",
    numberOfPages: "",
    categoryId: "",
  });

  useEffect(() => {
    if (editBook) {
      setFormData({
        title: editBook.title || "",
        description: editBook.description || "",
        isbn: editBook.isbn || "",
        picture: editBook.picture || "",
        numberOfPages: editBook.numberOfPages || "",
        categoryId: editBook.category?.id || "",
      });
    }
  }, [editBook]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      categoryId: parseInt(formData.categoryId) || 0,
      numberOfPages: parseInt(formData.numberOfPages) || 0,
    };
    if (!dataToSend.title || !dataToSend.title.trim()) {
      alert("Title is required!");
      return;
    }
    if (!dataToSend.isbn || !dataToSend.isbn.trim()) {
      alert("ISBN is required!");
      return;
    }
    if (!dataToSend.numberOfPages || dataToSend.numberOfPages <= 0) {
      alert("Please enter a valid number of pages (greater than 0)!");
      return;
    }

    if (!dataToSend.categoryId || dataToSend.categoryId <= 0) {
      alert("Please select a category!");
      return;
    }
    onSave(dataToSend);
    setFormData("");
    alert(editBook ? "Book updated successfully!" : "Book added successfully!");

    if (!editBook) {
      setFormData({
        title: "",
        description: "",
        isbn: "",
        picture: "",
        numberOfPages: "",
        categoryId: "",
      });
    }
  };
  return (
    <form onSubmit={submit}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <input
        name="isbn"
        value={formData.isbn}
        onChange={handleChange}
        placeholder="ISBN"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        required
      />
      <input
        name="numberOfPages"
        type="number"
        value={formData.numberOfPages}
        onChange={handleChange}
        placeholder="Number of pages"
        required
      />
      <select
        name="categoryId"
        value={formData.categoryId}
        onChange={handleChange}
        required
      >
        <option value="">Select category</option>
        {categories.map((category) => (
          <option
            key={category.id}
            value={category.id}
          >
            {category.name}
          </option>
        ))}
      </select>
      <input
        name="picture"
        value={formData.picture}
        onChange={handleChange}
        placeholder="Cover image URL"
      />
      <button type="submit">{editBook ? "Update" : "Add"}</button>
      {editBook && (
        <button
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
}
