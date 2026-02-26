import axios, { AxiosResponse } from "axios";

const apiServer = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_URL ?? "",
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

apiServer.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  (error) => Promise.reject(error)
);
export type ApiResponse<T> = T;
export default apiServer;
