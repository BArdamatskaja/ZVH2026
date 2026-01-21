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
</div?
  );
}
