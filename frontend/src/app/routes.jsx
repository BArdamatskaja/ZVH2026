import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Register from "../pages/Register/Register";
import LoginForm from "../components/auth/LoginForm";

import Books from "../components/Books";
import Categories from "../components/Categories";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const router = createBrowserRouter([
  // Public
  { path: "/", element: <Home /> },
  { path: "/register", element: <Register /> },
  { path: "/login", element: <LoginForm /> },

  // Protected group
  {
    element: <ProtectedRoute />,
    children: [
      { path: "/books", element: <Books /> },
      { path: "/categories", element: <Categories /> },

      // optional: jei norit, kad /app nuvestų į /books
      { path: "/app", element: <Navigate to="/books" replace /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default router;
