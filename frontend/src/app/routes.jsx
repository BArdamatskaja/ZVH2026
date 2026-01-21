import { createBrowserRouter, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import NotFound from "../pages/NotFound/NotFound";
import Register from "../pages/Register/Register";
import LoginPage from "../pages/LoginPage";

import MainLayout from "../layouts/MainLayout";

import Books from "../components/Books";
import Categories from "../components/Categories";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      // Public
      { path: "/", element: <Home /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <LoginPage /> },
