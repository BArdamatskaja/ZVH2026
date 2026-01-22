import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../components/auth/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, loginWithCredentials } = useAuth();

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    return (
      <Navigate
        to="/books"
        replace
      />
    );
  }

  const handleLoginSubmit = async ({ email, password }) => {
    setError("");
    setIsSubmitting(true);

    try {
      await loginWithCredentials(email, password);
      navigate("/books");
    } catch (err) {
      const status = err?.status || err?.response?.status;
      setError(status === 401 ? "Invalid credentials" : "Server error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="stack"
      style={{ maxWidth: 560, margin: "0 auto" }}
    >
      <div className="pageHeader">
        <h1>Prisijungimas</h1>
        <p className="muted">Įvesk prisijungimo duomenis, kad tęstum.</p>
      </div>

      <div className="card cardPad">
        {error && <div className="errorBox">{error}</div>}

        <LoginForm
          onSubmit={handleLoginSubmit}
          setPageError={setError}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
