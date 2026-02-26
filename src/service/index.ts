import api from "./axios-client";

export const getRequest = async <R = unknown>(
  endpoint: string,
  params?: Record<string, string | number | boolean>,
): Promise<R> => {
  const res: R = await api.get(endpoint, { params }); // interceptor returns data
  return res;
};

export const postRequest = async <T, R = unknown>(
  endpoint: string,
  body: T,
): Promise<R> => {
  console.log("Endpoint:", endpoint);
  const res: R = await api.post<T, R>(endpoint, body);
  console.log("Response:", res);
  return res;
};

export const putRequest = async <T, R = unknown>(
  endpoint: string,
  body: T,
): Promise<R> => {
  const res: R = await api.put<T, R>(endpoint, body);
  return res;
};

export const patchRequest = async <T, R = unknown>(
  endpoint: string,
  body: T,
): Promise<R> => {
  const res: R = await api.patch<T, R>(endpoint, body);
  return res;
};

export const deleteRequest = async <R = unknown>(
  endpoint: string,
): Promise<R> => {
  const res: R = await api.delete(endpoint);
  return res;
};
