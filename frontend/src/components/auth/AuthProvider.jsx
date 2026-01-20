import { useEffect, useMemo, useState } from "react";
import { setAccessToken, clearAccessToken } from "./authTokenService";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // ✅ Bootstrap token per useState initializer
  const [accessTokenState, setAccessTokenState] = useState(() => {
    return localStorage.getItem("accessToken");
  });

  // ✅ Sync į authTokenService (skirta interceptor'iui)
  useEffect(() => {
    if (accessTokenState) setAccessToken(accessTokenState);
    else clearAccessToken();
  }, [accessTokenState]);

  const value = useMemo(
    () => ({
      user,
      accessToken: accessTokenState,
      setUser,

      setAccessToken: (token) => {
        const normalized = token || null;
        setAccessTokenState(normalized);

        if (normalized) localStorage.setItem("accessToken", normalized);
        else localStorage.removeItem("accessToken");
      }, // ⬅️ ŠITAS KABLELIS buvo būtinas

      logout: () => {
        setUser(null);
        setAccessTokenState(null);
        localStorage.removeItem("accessToken");
      },
    }),
    [user, accessTokenState],
  );

  // Kol kas be Context (kaip pas jus projekte)
  return children;
}
