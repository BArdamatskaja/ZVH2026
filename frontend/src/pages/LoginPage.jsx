import LoginForm from "../components/auth/LoginForm";
import { useAuth } from "../components/auth/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export default function LoginPage() {
  const { isAuthenticated, isInitializing, loginWithCredentials } = useAuth();
  const location = useLocation();

  // Kur grįžti po login (jei ateita per ProtectedRoute)
  const from = location.state?.from?.pathname || "/";

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return (
      <Navigate
        to={from}
        replace
      />
    );
  }

  return (
    <div>
      <h1>Login</h1>
      <p>Enter your credentials to continue.</p>

      {/* LoginForm tikėtina priima onSubmit({ email, password }) */}
      <LoginForm onSubmit={loginWithCredentials} />
    </div>
  );
}
