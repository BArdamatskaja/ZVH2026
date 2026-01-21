import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { login as loginApi } from "../services/authService";
import { useAuth } from "../components/context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, login } = useAuth();

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (user) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  const handleLoginSubmit = async ({ email, password }) => {
    setError("");
    setIsSubmitting(true);

    try {
      const res = await loginApi({ email, password });
      login(res.data);

      navigate("/");
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Invalid credentials");
      } else {
        setError("Server error. Try one more time");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div>
        <h1>Login</h1>
        <p>Enter your credentials to continue.</p>

        {error && <div>{error}</div>}

        <LoginForm
          onSubmit={handleLoginSubmit}
          setPageError={setError}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
