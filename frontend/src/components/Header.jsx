import { NavLink } from "react-router-dom";
import { useAuth } from "./auth/useAuth";

export default function Header() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  const linkClass = ({ isActive }) =>
    `navLink ${isActive ? "navLink--active" : ""}`;

  return (
    <header className="appHeader">
      <div className="container headerInner">
        <div className="brand">
          <div className="brandMark" aria-hidden="true" />
          <div className="brandText">
            <div className="brandTitle">BookHub</div>
            <div className="brandSubtitle">Projektas</div>
          </div>
        </div>

        <nav className="nav">
          <NavLink to="/" className={linkClass} end>
            Pagrindinis
          </NavLink>
          <NavLink to="/books" className={linkClass}>
            Knygos
          </NavLink>
          {isAuthenticated && isAdmin && (
            <>
              <NavLink to="/admin/books" className={linkClass}>
                Admin • Knygos
              </NavLink>
              <NavLink to="/admin/categories" className={linkClass}>
                Admin • Kategorijos
              </NavLink>
            </>
          )}
        </nav>

        <div className="headerRight">
          {isAuthenticated ? (
            <>
              <div className="userPill" title={user?.email ?? ""}>
                {user?.email ?? "Prisijungta"}
              </div>
              <button type="button" className="btn btn--ghost" onClick={logout}>
                Atsijungti
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn btn--ghost">
                Prisijungti
              </NavLink>
              <NavLink to="/register" className="btn btn--primary">
                Registruotis
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
