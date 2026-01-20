import axios from "axios";
import { getAccessToken } from "../components/auth/authTokenService";

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

httpClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (!token) return config;

  config.headers = config.headers ?? {};
  if (!config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

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
  (error) => Promise.reject(error),
);
