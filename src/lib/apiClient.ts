// apiClient.ts - Updated to work with cookies
import { API_URL } from "@/constants/url";
import { refreshAccessToken } from "./auth";
import axios, { AxiosError, type AxiosInstance } from "axios";
import { addToQueue, processQueue } from "@/utils/processQueue";
import {
  getAccessToken,
  setAccessToken,
  clearTokens,
} from "@/services/tokenServices";

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

let isRefreshing = false;

apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as any;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          addToQueue({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const response = await refreshAccessToken();
        console.log(response, "response");

        setAccessToken(response.accessToken);

        processQueue(null, response.accessToken);
        originalRequest.headers.Authorization = `Bearer ${response.accessToken}`;

        return apiClient(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        clearTokens();
        return Promise.reject(refreshErr);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
