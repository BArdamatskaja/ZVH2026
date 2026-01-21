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
    <div className="space-y-4">
      <h2>Books</h2>

      <div className="flex flex-col gap-3 md:flex-row md:items-end">
        <div className="flex flex-col gap-1 md:w-64">
          <label>Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">All categories</option>
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

        <div className="flex flex-1 flex-col gap-1">
          <label>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Search by title..."
          />
        </div>

        <button onClick={clearFilters}>Clear</button>
      </div>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}

      {!loading && !error && filteredBooks.length === 0 && (
        <div>No books found.</div>
      )}

      <div className="grid gap-3 md:grid-cols-2">
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
