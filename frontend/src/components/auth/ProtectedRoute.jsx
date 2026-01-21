import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

export default function ProtectedRoute() {
  const { isAuthenticated, isInitializing } = useAuth();
  const location = useLocation();

  // Svarbu: kad po refresh nevyktų "false redirect" kol initFromStorage dar vyksta
  if (isInitializing) return null; // arba: <div>Loading...</div>

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  return <Outlet />;
}
