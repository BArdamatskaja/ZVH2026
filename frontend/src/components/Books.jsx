import { useEffect, useState } from "react";
import {
  createBook,
  deleteBook,
  getBook,
  getBooks,
  updateBook,
} from "../services/bookService";
import { getCategories } from "../services/categoryService";
import BookForm from "./BookForm";
import BookList from "./BookList";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [editBook, setEditBook] = useState(null);
  const [searchBook, setSearchBook] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBooks();
    loadCategories();
  }, []);

  const loadBooks = () => {
    getBooks().then((res) => setBooks(res.data));
  };

  const loadCategories = () => {
    getCategories()
      .then((res) => {
        console.log("📚 Loaded categories:", res.data);
        setCategories(res.data);
      })
      .catch((err) => {
        console.error("Error loading categories:", err);
      });
  };

  const handleSave = async (bookData) => {
    setLoading(true);
    try {
      const dataList = {
        ...bookData,
        categoryId: parseInt(bookData.categoryId),
        numberOfPages: parseInt(bookData.numberOfPages) || 0,
      };

      if (editBook) {
        await updateBook(editBook.id, dataList);
      } else {
        await createBook(dataList);
      }
      loadBooks();
      loadCategories();
      setEditBook(null);
    } catch (error) {
      console.error("Error saving book:", error);
      alert(
        "Error saving book: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (book) => setEditBook(book);
  const handleDelete = (id) => deleteBook(id).then(loadBooks);

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
        <input
          type="text"
          value={searchBook}
          onChange={(e) => setSearchBook(e.target.value)}
          placeholder="Search book by ID"
        />
        <button onClick={handleSearchClick}>Search</button>
      </div>
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
