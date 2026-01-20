const STORAGE_KEY = "accessToken";
let accessToken = null;

export function setAccessToken(token) {
  accessToken = token || null;

  if (token) localStorage.setItem(STORAGE_KEY, token);
  else localStorage.removeItem(STORAGE_KEY);
}

export function getAccessToken() {
  if (accessToken) return accessToken;

  const stored = localStorage.getItem(STORAGE_KEY);
  accessToken = stored || null;
  return accessToken;
}

export function clearAccessToken() {
  accessToken = null;
  localStorage.removeItem(STORAGE_KEY);
}
