import axios from "axios";
import type {
  LoginResponse,
  RefreshTokenResponse,
} from "@/constants/auth.types";
import { API_URL } from "@/constants/url";
import type { LoginType } from "@/components/Register/types/LoginType";

export const login = async (formData: LoginType): Promise<LoginResponse> => {
  const res = await axios.post<LoginResponse>(
    `${API_URL}/auth/login`,
    formData,
    {
      withCredentials: true,
    }
  );
  return res.data;
};

export const refreshAccessToken = async (): Promise<RefreshTokenResponse> => {
  const res = await axios.post<RefreshTokenResponse>(
    `${API_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );

  return res.data;
};
