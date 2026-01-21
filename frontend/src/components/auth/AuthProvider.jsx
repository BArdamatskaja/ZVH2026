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

export const AuthContext = createContext(null);

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

  const login = useCallback(({ accessToken, user }) => {
    setAccessToken(accessToken);
    setUser(user ?? null);

    writeAuthToStorage({ accessToken, user });
  }, []);

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
      logout,
    }),
    [accessToken, user, isAuthenticated, isInitializing, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
