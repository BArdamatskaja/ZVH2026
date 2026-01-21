import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Register from "../pages/Register/Register";
import LoginPage from "../pages/LoginPage";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import BooksPage from "../pages/BooksPage";
import BooksAdminPage from "../pages/BooksAdminPage";
import CategoriesAdminPage from "../pages/CategoriesAdminPage";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      // Public
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <LoginPage /> },

      // Protected
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/books", element: <BooksPage /> },
          { path: "/admin/books", element: <BooksAdminPage /> },
          { path: "/admin/categories", element: <CategoriesAdminPage /> },
          {
            path: "/app",
            element: (
              <Navigate
                to="/books"
                replace
              />
            ),
          },
        ],
      },

      // Fallback
      { path: "*", element: <NotFound /> },
    ],
  },
]);

export default router;
