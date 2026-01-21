import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  readAuthFromStorage,
  writeAuthToStorage,
  clearAuthStorage,
} from "./authStorage";

import { login as loginApi } from "../../services/authService";

export const AuthContext = createContext(null);

function extractAccessToken(payload) {
  return (
    payload?.accessToken ??
    payload?.token ??
    payload?.jwt ??
    payload?.access_token ??
    null
  );
}

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  // 🔴 KRITIŠKAI SVARBU ProtectedRoute'ui
  const [isInitializing, setIsInitializing] = useState(true);

  const isAuthenticated = Boolean(accessToken);

  // INIT from localStorage (vieną kartą per app startą)
  const initFromStorage = useCallback(() => {
    const stored = readAuthFromStorage();

    if (stored?.accessToken) {
      setAccessToken(stored.accessToken);
      setUser(stored.user ?? null);
    }

    setIsInitializing(false);
  }, []);

  useEffect(() => {
    initFromStorage();
  }, [initFromStorage]);

  // ✅ Set auth state from already-known payload (token/user)
  const login = useCallback(({ accessToken, user }) => {
    setAccessToken(accessToken);
    setUser(user ?? null);

    writeAuthToStorage({ accessToken, user });
  }, []);

  // ✅ ZVH2-105: login via credentials through authService + httpClient
  const loginWithCredentials = useCallback(
    async (email, password) => {
      const res = await loginApi({ email, password });

      // axios response -> res.data
      const payload = res?.data ?? res;

      const token = extractAccessToken(payload);
      const nextUser = payload?.user ?? null;

      if (!token) {
        throw new Error("Login response does not contain access token.");
      }

      // Use existing login() to update state + persist
      login({ accessToken: token, user: nextUser });

      return { accessToken: token, user: nextUser };
    },
    [login],
  );

  const logout = useCallback(() => {
    setAccessToken(null);
    setUser(null);

    clearAuthStorage();
  }, []);

  const value = useMemo(
    () => ({
      accessToken,
      user,
      isAuthenticated,
      isInitializing, // 👈 BŪTINA
      login,
      loginWithCredentials, // 👈 ZVH2-105
      logout,
    }),
    [
      accessToken,
      user,
      isAuthenticated,
      isInitializing,
      login,
      loginWithCredentials,
      logout,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
