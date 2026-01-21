import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AuthProvider from "./components/auth/AuthProvider"; // ✅ default import
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
