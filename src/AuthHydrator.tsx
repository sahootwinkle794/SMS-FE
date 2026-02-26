"use client";

import { useEffect } from "react";
import { useAuthStore } from "./store/auth.store";
import apiServer from "./service/axios-server";

export default function AuthHydrator({
  children,
}: {
  children: React.ReactNode;
}) {
  const setUser = useAuthStore((s) => s.setUser);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      try {
        console.log("Welcome to Auth Hydrator");
        const res = await apiServer.get("/api/auth/session");
        console.log(res, "result");
        if (!mounted) return;
        setUser(res.data.user);
      } catch {
        if (!mounted) return;
        logout();
      }
    }

    loadSession();

    return () => {
      mounted = false;
    };
  }, [setUser, logout]);

  return <>{children}</>;
}
