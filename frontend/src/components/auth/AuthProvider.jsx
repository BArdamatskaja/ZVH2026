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

export default function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null); // paliekam ateičiai
  const [user, setUser] = useState(null);
  const [isInitializing, setIsInitializing] = useState(true);

  const isAuthenticated = Boolean(user);

  const initFromStorage = useCallback(() => {
    const stored = readAuthFromStorage();
    if (stored?.user) {
      setUser(stored.user);
      setAccessToken(stored.accessToken ?? null);
    }
    setIsInitializing(false);
  }, []);

  useEffect(() => {
    initFromStorage();
  }, [initFromStorage]);

  const login = useCallback(({ user, accessToken }) => {
    setUser(user ?? null);
    setAccessToken(accessToken ?? null);
    writeAuthToStorage({ user, accessToken });
  }, []);

  const loginWithCredentials = useCallback(
    async (email, password) => {
      const res = await loginApi({ email, password });
      const payload = res?.data ?? res;

      const nextUser = payload?.user ?? payload;
      if (!nextUser?.email && !nextUser?.id) {
        throw new Error("Login response does not contain user data.");
      }

      login({ user: nextUser, accessToken: null });
      return { user: nextUser };
    },
    [login],
  );

  const logout = useCallback(() => {
    setAccessToken(null);
    setUser(null);
    clearAuthStorage();
  }, []);

  const role = user?.role;
  const isAdmin = role === "ADMIN" || role === "ROLE_ADMIN";

  const value = useMemo(
    () => ({
      accessToken,
      user,
      isAuthenticated,
      isInitializing,
      login,
      loginWithCredentials,
      logout,
      isAdmin,
    }),
    [
      accessToken,
      user,
      isAuthenticated,
      isInitializing,
      login,
      loginWithCredentials,
      logout,
      isAdmin,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
