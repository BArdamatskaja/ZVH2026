import httpClient from "../api/httpClient";

export const register = (payload) => {
  return httpClient.post("/api/v1/auth/register", payload);
};

export const login = (payload) => {
  return httpClient.post("/api/v1/auth/login", payload);
};
