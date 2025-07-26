import axios from "axios";
import type {
  LoginResponse,
  RefreshTokenResponse,
} from "@/constants/auth.types";
import { API_URL } from "@/constants/url";
import type { LoginType } from "@/components/Register/types/LoginType";

export const login = async (formData: LoginType): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(`${API_URL}/auth/login`, formData);
  return res.data;
};

export const refreshAccessToken = async (
  refreshToken: string | null
): Promise<RefreshTokenResponse> => {
  if (!refreshToken) throw new Error("No refresh token found");

  const res = await axios.post<RefreshTokenResponse>(`${API_URL}/auth/refresh`, {
    refresh_token: refreshToken,
  });

  return res.data;
};
