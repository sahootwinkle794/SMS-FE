import { API_PATH } from "@/utils/apiPath";
import axios from "axios";

const api = axios.create({
  timeout: 20000,
});

// SKIP TOKEN ENDPOINTS
const SKIP_TOKEN_ENDPOINTS = [API_PATH.SEND_OTP, API_PATH.VERIFY_OTP];

// REQUEST INTERCEPTOR
api.interceptors.request.use((config) => {
  const isSkip = SKIP_TOKEN_ENDPOINTS.some((url) => config.url?.includes(url));

  if (!isSkip && typeof window !== "undefined") {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },

  (error) => {
    // This block now *only* handles true physical HTTP errors (network issues, 404/500 *headers*)
    const err = error.response?.data ?? {};

    // Reject here so calling code can catch these specific *physical* errors
    return Promise.reject({
      status: err.status || error.response?.status || 500,
      message:
        err.message || error.message || "Unknown error (Network/Server Down)",
      data: err.data ?? null,
    });
  },
);

export default api;
