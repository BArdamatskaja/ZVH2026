// src/api/httpClient.js
import axios from "axios";
import { getAccessToken, clearAccessToken } from "../components/auth/authTokenService";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 15000, // optional, bet naudinga network scenarijams
});

let isRedirectingToLogin = false;

function normalizeAxiosError(error) {
  // Network / CORS / backend down / timeout -> axios neturi response
  if (!error?.response) {
    const isTimeout = error?.code === "ECONNABORTED";
    return {
      type: "network",
      status: null,
      message: isTimeout ? "Request timeout" : "Network error / backend unreachable",
      details: { code: error?.code, originalMessage: error?.message },
    };
  }

  const status = error.response.status;
  const data = error.response.data;

  // Bendra API klaida
  return {
    type: "api",
    status,
    message: data?.message || `HTTP ${status}`,
    details: data,
  };
}

// Request interceptor (jūs jau turite iš ZVH2-102 – palikite, čia tik pilnas pavyzdys)
httpClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (!token) return config;

    config.headers = config.headers ?? {};
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(normalizeAxiosError(error))
);

// Response interceptor (ZVH2-103)
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    // 401: force logout + redirect
    if (status === 401) {
      clearAccessToken();

      // Guard nuo multi-redirect
      if (!isRedirectingToLogin) {
        isRedirectingToLogin = true;

        // Jei jau esam /login – nereikia dar kartą
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

    // 403: no logout, tik standartizuota klaida UI
    if (status === 403) {
      return Promise.reject({
        type: "forbidden",
        status: 403,
        message: "Forbidden (insufficient permissions)",
        details: error?.response?.data,
      });
    }

    // Kitos klaidos (4xx/5xx/network)
    return Promise.reject(normalizeAxiosError(error));
  }
);
