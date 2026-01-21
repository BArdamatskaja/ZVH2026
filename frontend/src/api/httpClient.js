import axios from "axios";
import {
  readAuthFromStorage,
  clearAuthStorage,
} from "../components/auth/authStorage";

// ✅ baseURL su fallback, kad aplikacija nevežtų, jei .env nėra
const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const httpClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false,
});

let isRedirectingToLogin = false;

function normalizeAxiosError(error) {
  if (!error?.response) {
    const isTimeout = error?.code === "ECONNABORTED";
    return {
      type: "network",
      status: null,
      message: isTimeout
        ? "Request timeout"
        : "Network error / backend unreachable",
      details: { code: error?.code, originalMessage: error?.message },
    };
  }

  const status = error.response.status;
  const data = error.response.data;

  return {
    type: "api",
    status,
    message: data?.message || `HTTP ${status}`,
    details: data,
  };
}

httpClient.interceptors.request.use(
  (config) => {
    const stored = readAuthFromStorage();
    const token = stored?.accessToken;

    if (!token) return config;

    config.headers = config.headers ?? {};
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(normalizeAxiosError(error)),
);

httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      clearAuthStorage();

      if (!isRedirectingToLogin) {
        isRedirectingToLogin = true;

        const isAlreadyOnLogin = window.location.pathname.startsWith("/login");
        if (!isAlreadyOnLogin) {
          window.location.assign("/login?reason=expired");
        }
      }

      return Promise.reject({
        type: "auth",
        status: 401,
        message: "Unauthorized (token expired or invalid)",
      });
    }

    if (status === 403) {
      return Promise.reject({
        type: "forbidden",
        status: 403,
        message: "Forbidden (insufficient permissions)",
        details: error?.response?.data,
      });
    }

    return Promise.reject(normalizeAxiosError(error));
  },
);

export default httpClient;
