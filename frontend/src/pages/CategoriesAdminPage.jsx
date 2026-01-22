import { useAuth } from "../components/auth/useAuth";
import Categories from "../components/categories/Categories";

export default function CategoriesAdminPage() {
  const { isAdmin, isInitializing } = useAuth();

  if (isInitializing) return null;

  if (!isAdmin) {
    return (
      <div
        className="card cardPad stack"
        style={{ maxWidth: 720, margin: "0 auto" }}
      >
        <h1>Access denied</h1>
        <p className="muted">Šis puslapis matomas tik administratoriui.</p>
      </div>
    );
  }

  return <Categories />;
}
