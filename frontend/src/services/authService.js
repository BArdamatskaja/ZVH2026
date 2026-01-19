import httpClient from "./httpClient";

export const register = (payload) => {
  return httpClient.post("/api/auth/register", payload);
};
