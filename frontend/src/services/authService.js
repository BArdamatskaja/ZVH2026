import httpClient from "./httpClient.js";

export const register = (payload) => {
  return httpClient.post("/api/auth/register", payload);
};
