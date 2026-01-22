import { NavLink } from "react-router-dom";
import { useAuth } from "../../components/auth/useAuth";

function Home() {
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <div className="stack">
      <section className="card hero">
        <div className="stack">
          <div className="heroKicker">
            <span className="badge">2026 • ZVH</span>
          </div>

          <h1>Knygų biblioteka</h1>

          <div className="row heroActions">
            {isAuthenticated ? (
              <NavLink
                to="/books"
                className="btn btn--primary"
              >
                Peržiūrėti knygas
              </NavLink>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="btn btn--primary"
                >
                  Prisijungti
                </NavLink>
                <NavLink
                  to="/register"
                  className="btn"
                >
                  Susikurti paskyrą
                </NavLink>
              </>
            )}

            {isAuthenticated && isAdmin && (
              <NavLink
                to="/admin/books"
                className="btn"
              >
                Admin zona
              </NavLink>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
