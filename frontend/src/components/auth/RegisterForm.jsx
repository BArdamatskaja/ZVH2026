import { useState } from "react";
import { register } from "../../services/authService";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ZVH2-53: minimal state handling (no client-side validation)
    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);

    try {
      await register({ email, password });
      setSuccessMessage("Account created");
      setEmail("");
      setPassword("");
    } catch (error) {
      const backendMsg =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Registration failed";

      setErrorMessage(String(backendMsg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          autoComplete="email"
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          autoComplete="new-password"
        />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>

      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
