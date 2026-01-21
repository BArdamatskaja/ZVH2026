import { useAuth } from "../components/auth/useAuth";
import Categories from "../components/categories/Categories";

export default function CategoriesAdminPage() {
  const { isAdmin, isInitializing } = useAuth();

  if (isInitializing) return null;

  if (!isAdmin) {
    return <div>Access denied</div>;
  }

  return <Categories />;
}
