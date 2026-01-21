import httpClient from "../api/httpClient.js";

export const register = (payload) => {
  return httpClient.post("/api/auth/register", payload);
};

export const login = (payload) => {
  return httpClient.post("/api/auth/login", payload);
};
