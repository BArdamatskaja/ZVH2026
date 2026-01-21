const AUTH_KEY = "zvh2026.auth";

export function readAuthFromStorage() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);

    if (!parsed?.user) return null;

    return {
      accessToken: parsed.accessToken ?? null, 
      user: parsed.user ?? null,
    };
  } catch {
    return null;
  }
}

export function writeAuthToStorage({ accessToken, user }) {
  const payload = {
    accessToken: accessToken ?? null,
    user: user ?? null,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
}

export function clearAuthStorage() {
  localStorage.removeItem(AUTH_KEY);
}
