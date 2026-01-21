import { useState } from "react";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginForm({ onSubmit, setPageError, isSubmitting }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [touched, setTouched] = useState({ email: false, password: false });
  const [localError, setLocalError] = useState("");

  const validate = () => {
    if (!email.trim() || !password.trim())
      return "Email and password are required.";
    if (!emailRegex.test(email.trim()))
      return "Please enter a valid email address.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({ email: true, password: true });

    const err = validate();
    if (err) {
      setLocalError(err);
      setPageError?.("");
      return;
    }

    setLocalError("");
    setPageError?.("");

    await onSubmit({
      email: email.trim(),
      password,
    });
  };

  const showEmailError =
    touched.email && (!email.trim() || !emailRegex.test(email.trim()));
  const showPasswordError = touched.password && !password.trim();

  return (
    <form
      onSubmit={handleSubmit}
      className="form"
    >
      {localError && <div className="errorBox">{localError}</div>}

      <label className="label">
        Email
        <input
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, email: true }))}
          className={`input ${showEmailError ? "inputError" : ""}`}
          disabled={isSubmitting}
          autoComplete="email"
        />
      </label>
      {showEmailError && (
        <div className="fieldError">
          {!email.trim() ? "Email is required." : "Email format is invalid."}
        </div>
      )}

      <label className="label">
        Password
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched((t) => ({ ...t, password: true }))}
          className={`input ${showPasswordError ? "inputError" : ""}`}
          disabled={isSubmitting}
          autoComplete="current-password"
        />
      </label>
      {showPasswordError && (
        <div className="fieldError">Password is required.</div>
      )}

      <button
        type="submit"
        className="btn"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
