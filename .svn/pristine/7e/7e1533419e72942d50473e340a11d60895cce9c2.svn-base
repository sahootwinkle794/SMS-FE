"use client";

import { create } from "zustand";
import { UserResponse } from "@/types/auth/login/login";

type AuthState = {
    user: UserResponse | null;
    isAuthenticated: boolean;
    setUser: (user: UserResponse) => void;
    logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user) =>
        set({
            user,
            isAuthenticated: true,
        }),

    logout: () =>
        set({
            user: null,
            isAuthenticated: false,
        }),
}));

