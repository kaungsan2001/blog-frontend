import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";
const axiosParams = {
  baseURL: import.meta.env.VITE_API_BASE_URL + "/api/v1",
};

const axiosInstance = axios.create(axiosParams);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "Something went wrong";
    if (error.response) {
      message = error.response.data?.message || "Something went wrong";
    } else if (error.request) {
      message = "Network error";
    } else {
      message = error.message;
    }

    return Promise.reject(new Error(message));
  },
);

const api = (axios: AxiosInstance) => {
  return {
    get: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.get<T>(url, config),
    delete: <T>(url: string, config: AxiosRequestConfig = {}) =>
      axios.delete<T>(url, config),
    post: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.post<T>(url, body, config),
    patch: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.patch<T>(url, body, config),
    put: <T>(url: string, body: unknown, config: AxiosRequestConfig = {}) =>
      axios.put<T>(url, body, config),
  };
};

export default api(axiosInstance);
