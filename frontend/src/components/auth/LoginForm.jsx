import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "./useAuth";
import { login as loginRequest } from "../../services/authService";

export default function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/books";

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await loginRequest(form);

      // axios response -> res.data
      const payload = res?.data ?? res;

      // suderinam su galimais backend field pavadinimais
      const accessToken =
        payload?.accessToken ?? payload?.token ?? payload?.jwt ?? payload?.access_token;

      const user = payload?.user ?? null;

      if (!accessToken) {
        throw new Error("Login response does not contain accessToken/token.");
      }

      // į Auth state + localStorage (per AuthProvider login() implementaciją)
      login({ accessToken, user });

      // profesionalus UX: grąžinam į page, kurio norėjo
      navigate(from, { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Login failed. Please check your credentials.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: "0 auto", padding: 16 }}>
      <h2>Login</h2>

      {error && (
        <div style={{ marginBottom: 12 }}>
          <strong style={{ color: "red" }}>{error}</strong>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            required
            style={{ display: "block", width: "100%", padding: 8 }}
            autoComplete="email"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
            style={{ display: "block", width: "100%", padding: 8 }}
            autoComplete="current-password"
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}
