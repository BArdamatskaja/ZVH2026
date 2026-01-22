import { useEffect, useMemo, useState } from "react";
import { getBooks } from "../services/bookService";
import { getCategories } from "../services/categoryService";
import BookCard from "../components/books/BookCard";

export default function BooksPage() {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    Promise.all([getBooks(), getCategories()])
      .then(([booksRes, categoriesRes]) => {
        setBooks(booksRes.data);
        setCategories(categoriesRes.data);
      })
      .catch(() => setError("Failed to load books"))
      .finally(() => setLoading(false));
  }, []);

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchTitle =
        !title || book.title.toLowerCase().includes(title.toLowerCase());

      const matchCategory =
        !categoryId || String(book.category?.id) === categoryId;

      return matchTitle && matchCategory;
    });
  }, [books, title, categoryId]);

  const clearFilters = () => {
    setTitle("");
    setCategoryId("");
  };

  return (
    <div className="stack">
      <div className="pageHeader">
        <h1>Knygos</h1>
        <p className="muted">
          Filtruok pagal kategoriją ir ieškok pagal pavadinimą.
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
            onClick={clearFilters}
          >
            Išvalyti
          </button>
        </div>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="errorBox">{error}</div>}

      {!loading && !error && filteredBooks.length === 0 && (
        <div className="muted">Knygų nerasta.</div>
      )}

      <div className="grid grid--2">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
          />
        ))}
      </div>
    </div>
  );
}
