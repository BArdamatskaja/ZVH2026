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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submit = (e) => {
    e.preventDefault();

    const dataToSend = {
      ...formData,
      categoryId: parseInt(formData.categoryId) || 0,
      numberOfPages: parseInt(formData.numberOfPages) || 0,
    };

    if (!dataToSend.title?.trim()) return alert("Title is required!");
    if (!dataToSend.isbn?.trim()) return alert("ISBN is required!");
    if (!dataToSend.numberOfPages || dataToSend.numberOfPages <= 0)
      return alert("Please enter a valid number of pages (greater than 0)!");
    if (!dataToSend.categoryId || dataToSend.categoryId <= 0)
      return alert("Please select a category!");

    onSave(dataToSend);

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
    <form
      onSubmit={submit}
      className="form"
    >
      <div className="field">
        <label className="label">Pavadinimas</label>
        <input
          className="input"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Pavadinimas"
          required
        />
      </div>

      <div className="field">
        <label className="label">ISBN</label>
        <input
          className="input"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          placeholder="ISBN"
          required
        />
      </div>

      <div className="field">
        <label className="label">Aprašymas</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Trumpas aprašymas..."
          required
        />
      </div>

      <div className="field">
        <label className="label">Puslapių skaičius</label>
        <input
          className="input"
          name="numberOfPages"
          type="number"
          value={formData.numberOfPages}
          onChange={handleChange}
          placeholder="Pvz. 320"
          required
        />
      </div>

      <div className="field">
        <label className="label">Kategorija</label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
        >
          <option value="">Pasirink kategoriją</option>
          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label className="label">Viršelio URL</label>
        <input
          className="input"
          name="picture"
          value={formData.picture}
          onChange={handleChange}
          placeholder="https://..."
        />
      </div>

      <div
        className="row"
        style={{ justifyContent: "flex-end" }}
      >
        {editBook && (
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
          {editBook ? "Išsaugoti" : "Pridėti"}
        </button>
      </div>
    </form>
  );
}
