import { useAuth } from "../components/auth/useAuth";
import Books from "../components/books/Books";

export default function BooksAdminPage() {
  const { isAdmin, isInitializing } = useAuth();

  if (isInitializing) return null;

  if (!isAdmin) {
    return <div >Access denied</div>;
  }

  return <Books />;
}
