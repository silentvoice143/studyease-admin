import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import { toast } from "sonner";
let state: any;
export const storeInit = (_store: any) => {
  state = _store;
};

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL_PROD || process.env.NEXT_PUBLIC_BASE_URL_DEV;
const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config: any) => {
    const token = state.auth?.accessToken || config.headers.Authorization;
    console.log("Requesting:", config.url, token);

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // toast.error("❌ Request setup failed");
    return Promise.reject(error);
  }
);

// ⚡ Handle all API errors globally
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (!error.response) {
      // Network error / timeout
      // toast.error("⚠️ Network error — please check your connection");
      return Promise.reject(error);
    }

    const { status, data } = error.response;
    const message =
      data?.message ||
      data?.error ||
      "An unexpected error occurred. Please try again.";

    switch (status) {
      case 400:
        // toast.error(`Bad Request: ${message}`);
        break;

      case 401:
        toast.error(`Unauthorized: ${message}`);
        // store.dispatch(logoutUser());
        break;

      case 403:
        // toast.error("You don't have permission to perform this action");
        break;

      case 404:
        // toast.error("Requested resource not found");
        break;

      case 500:
        // toast.error("Internal Server Error — please try later");
        break;

      default:
      // toast.error(`Error (${status}): ${message}`);
    }

    return Promise.reject(error);
  }
);

export default api;
