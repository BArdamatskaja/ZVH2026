import { useEffect, useState } from "react";
import {
  createBook,
  deleteBook,
  getBooks,
  updateBook,
} from "../../services/bookService";
import { getCategories } from "../../services/categoryService";
import BookForm from "./BookForm";
import BookList from "./BookList";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [editBook, setEditBook] = useState(null);

  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCategories = () =>
    getCategories()
      .then((res) => setCategories(res.data))
      .catch(() => setError("Failed to load categories"));

  const loadBooks = async (filters = {}) => {
    setLoading(true);
    setError("");
    try {
      const res = await getBooks(filters);
      setBooks(res.data);
    } catch {
      setError("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
    loadBooks();
  }, []);

  const handleApplyFilters = () => {
    const params = {};
    if (categoryId) params.categoryId = categoryId;
    if (title.trim()) params.title = title.trim();
    loadBooks(params);
  };

  const clearFilters = () => {
    setCategoryId("");
    setTitle("");
  };

  const handleSave = async (bookData) => {
    setLoading(true);
    setError("");

    const payload = {
      ...bookData,
      categoryId: Number(bookData.categoryId),
      numberOfPages: Number(bookData.numberOfPages),
    };

    if (!payload.categoryId || payload.categoryId <= 0) {
      setError("Pasirink kategoriją");
      setLoading(false);
      return;
    }

    try {
      if (editBook) {
        await updateBook(editBook.id, payload);
      } else {
        await createBook(payload);
      }

      await loadBooks();
      await loadCategories();
      setEditBook(null);
    } catch (err) {
      const status = err?.response?.status;
      const msg = err?.response?.data?.message || err?.response?.data;

      if (status === 409) {
        setError(msg || "Knyga su tokiu ISBN jau egzistuoja");
      } else {
        setError("Įvyko klaida kuriant knygą");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (book) => setEditBook(book);

  const handleDelete = async (id) => {
    await deleteBook(id);
    const params = {};
    if (categoryId) params.categoryId = categoryId;
    if (title.trim()) params.title = title.trim();
    loadBooks(params);
  };

  return (
    <div className="stack">
      <div className="pageHeader">
        <h1>Admin • Knygos</h1>
        <p className="muted">
          Tvarkyk knygas: filtravimas, pridėjimas, redagavimas, trynimas.
        </p>
      </div>

      <div className="card cardPad stack">
        <div
          className="grid grid--2"
          style={{ alignItems: "end" }}
        >
          <div className="field">
            <label className="label">Kategorija</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value="">Visos kategorijos</option>
              {categories.map((c) => (
                <option
                  key={c.id}
                  value={c.id}
                >
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label className="label">Pavadinimas</label>
            <input
              className="input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ieškoti pagal pavadinimą..."
            />
          </div>
        </div>

        <div
          className="row"
          style={{ justifyContent: "flex-end" }}
        >
          <button
            className="btn"
            onClick={handleApplyFilters}
          >
            Taikyti
          </button>
          <button
            className="btn btn--ghost"
            onClick={clearFilters}
          >
            Išvalyti
          </button>
        </div>
      </div>

      {error && <div className="errorBox">{error}</div>}
      {loading && <div>Loading...</div>}

      <div
        className="grid grid--2"
        style={{ alignItems: "start" }}
      >
        <div className="card cardPad stack">
          <h2>{editBook ? "Redaguoti knygą" : "Pridėti knygą"}</h2>
          <BookForm
            onSave={handleSave}
            editBook={editBook}
            onCancel={() => setEditBook(null)}
            categories={categories}
          />
        </div>

        <div className="card cardPad stack">
          <h2>Esamos knygos</h2>
          <BookList
            books={books}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
