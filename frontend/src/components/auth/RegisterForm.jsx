import { useMemo, useState } from "react";
import { register } from "../../services/authService.js";
import { validateRegister } from "../../utils/validation/registerValidation.js";

export default function RegisterForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const errors = useMemo(() => validateRegister(values), [values]);
  const isFormValid = useMemo(() => Object.keys(errors).length === 0, [errors]);

  function shouldShowError(field) {
    return Boolean((touched[field] || submitAttempted) && errors[field]);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleBlur(e) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitAttempted(true);

    // FE validacija prieš API
    if (!isFormValid) {
      setSuccessMessage("");
      setErrorMessage("");
      setTouched({
        email: true,
        password: true,
        confirmPassword: true,
      });
      return;
    }

    setSuccessMessage("");
    setErrorMessage("");
    setLoading(true);

    try {
      // Backend'ui siunčiam tik tai, ką jis priima
      await register({ email: values.email, password: values.password });

      setSuccessMessage("Account created");
      setValues({ email: "", password: "", confirmPassword: "" });
      setTouched({});
      setSubmitAttempted(false);
      setShowPassword(false);
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
    <form
      onSubmit={handleSubmit}
      noValidate
    >
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="email@example.com"
          autoComplete="email"
          aria-invalid={shouldShowError("email")}
        />
        {shouldShowError("email") && (
          <p className="field-error">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">Password</label>

        <div className="password-field">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="••••••••"
            autoComplete="new-password"
            aria-invalid={shouldShowError("password")}
          />

          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {shouldShowError("password") && (
          <p className="field-error">{errors.password}</p>
        )}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={values.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="••••••••"
          autoComplete="new-password"
          aria-invalid={shouldShowError("confirmPassword")}
        />
        {shouldShowError("confirmPassword") && (
          <p className="field-error">{errors.confirmPassword}</p>
        )}
      </div>

      {}
      <button
        type="submit"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </form>
  );
}
