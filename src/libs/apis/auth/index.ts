// services/auth.ts
import api from "../axiosClinet";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data } = await api.post("/auth/login", { email, password });

  return data;
}

export async function refreshAccessToken(): Promise<string> {
  const { data } = await api.post("/auth/refresh"); // refresh_token comes from httpOnly cookie
  return data.accessToken;
}

export async function logout() {
  await api.post("/auth/logout");
  return true;
}
