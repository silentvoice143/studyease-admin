"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { createAuthSlice, AuthSlice } from "./slices/authSlice";

// 👇 Define combined store type
type AppState = AuthSlice;

// ✅ Helper for SSR safety (Next.js)
const safeStorage = () => {
  if (typeof window !== "undefined") return localStorage;
  return {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
    key: () => null,
    length: 0,
  } as unknown as Storage;
};

// ✅ Combine slices with persistence
export const useAppStore = create<AppState>()(
  persist(
    (set, get, api) => ({
      ...createAuthSlice(set, get, api),
    }),
    {
      name: "app-storage",
      storage: createJSONStorage(safeStorage),

      // 👇 Optional: Only persist selected parts of the store
      //   partialize: (state) => ({
      //     token: state.token, // persist only token
      //     user: state.user,
      //   }),
    }
  )
);
