import axios from "axios";
import {
  readAuthFromStorage,
  clearAuthStorage,
} from "../components/auth/authStorage";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

export const httpClient = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

let isRedirectingToLogin = false;

/**
 * Normalizuojam axios klaidas,
 * kad UI galėtų dirbti su vieninga struktūra
 */
function normalizeAxiosError(error) {
  if (!error?.response) {
    const isTimeout = error?.code === "ECONNABORTED";
    return {
      type: "network",
      status: null,
      message: isTimeout
        ? "Request timeout"
        : "Network error / backend unreachable",
      details: {
        code: error?.code,
        originalMessage: error?.message,
      },
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

/**
 * ZVH2-102 — Request interceptor
 * Jei turim tokeną → uždedam Bearer
 * Jei neturim → NIEKO nedarom
 */
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

/**
 * ZVH2-103 — Response interceptor
 */
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const url = error?.config?.url ?? "";

    // 401 iš login/register — NE redirektinam
    if (
      status === 401 &&
      (url.includes("/auth/login") || url.includes("/auth/register"))
    ) {
      return Promise.reject(normalizeAxiosError(error));
    }

    // 401 iš kitur — logout + redirect
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
