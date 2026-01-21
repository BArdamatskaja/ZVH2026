import httpClient from "./httpClient.js";

export const register = (payload) => {
  return httpClient.post("/api/auth/register", payload);
};
export const login = (payload) => {
  return httpClient.post("/api/v1/auth/login", payload);
};
