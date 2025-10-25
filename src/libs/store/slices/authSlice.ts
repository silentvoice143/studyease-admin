import { StateCreator } from "zustand";

export interface AuthSlice {
  accessToken: string | null;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  isAuthenticated: boolean;
  login: (
    accessToken: string,
    user: { id: string; name: string; email: string }
  ) => void;
  logout: () => void;
}

export const createAuthSlice: StateCreator<AuthSlice> = (set) => ({
  accessToken: null,
  user: null,
  isAuthenticated: false,

  login: (accessToken, user) =>
    set({ accessToken, user, isAuthenticated: true }),
  logout: () => set({ user: null, isAuthenticated: false }),
});
