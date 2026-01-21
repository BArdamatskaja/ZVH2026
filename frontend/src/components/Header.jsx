import { Link } from "react-router-dom";
import { useAuth } from "./auth/useAuth";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header style={{ padding: 12, borderBottom: "1px solid #ddd" }}>
      <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            gap: 12,
            alignItems: "center",
          }}
        >
          {isAuthenticated ? (
            <>
              <span>{user?.email ?? "Authenticated"}</span>
              <button
                type="button"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
