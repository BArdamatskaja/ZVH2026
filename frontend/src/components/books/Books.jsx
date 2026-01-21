import { useEffect, useMemo, useState } from "react";
import {
  createBook,
  deleteBook,
  getBook,
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
  const [searchBook, setSearchBook] = useState("");

  const [categoryId, setCategoryId] = useState("");
  const [title, setTitle] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadCategories = () => {
    return getCategories()
      .then((res) => setCategories(res.data))
      .catch(() => setError("Failed to load categories"));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const loadBooks = async (filters = {}) => {
    setLoading(true);
    setError("");
    try {
      const res = await getBooks(filters);
      setBooks(res.data);
    } catch {
      setError("faild to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  const categoryNameById = useMemo(() => {
    const map = new Map();
    categories.forEach((c) => map.set(String(c.id), c.name));
    return map;
  }, [categories]);

  const handleSave = async (bookData) => {
    setLoading(true);
    try {
      const dataList = {
        ...bookData,
        categoryId: parseInt(bookData.categoryId, 10),
        numberOfPages: parseInt(bookData.numberOfPages, 10) || 0,
      };

      if (editBook) {
        await updateBook(editBook.id, dataList);
      } else {
        await createBook(dataList);
      }
      const params = {};
      if (categoryId) params.categoryId = categoryId;
      if (title.trim()) params.title = title.trim();
      await loadBooks(params);

      await loadCategories();
      setEditBook(null);
    } catch (err) {
      console.error("Error saving book:", err);
      setError("Error saving book");
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

  const handleSearchClick = () => {
    if (!searchBook) return;

    getBook(searchBook)
      .then((res) => {
        handleEdit(res.data);
        setSearchBook("");
      })
      .catch(() => {
        alert("Book not found!");
      });
  };

  return (
    <div>
      <h2>Books</h2>
      <div>
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
          <div className="flex gap-2">
            <button onClick={handleApplyFilters}>Apply</button>

            <button onClick={clearFilters}>Clear</button>
          </div>
        </div>
      </div>
      {error && <div>{error}</div>}

      {loading && <div>Loading...</div>}

      <BookForm
        onSave={handleSave}
        editBook={editBook}
        onCancel={() => setEditBook(null)}
        categories={categories}
      />

      <BookList
        books={books}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
