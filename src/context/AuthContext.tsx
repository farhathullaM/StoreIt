import { isAxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { login as loginApi } from "@/lib/auth";
import { useNavigate } from "react-router-dom";
import type { LoginType } from "@/components/Register/types/LoginType";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  clearTokens,
  getAccessToken,
  setAccessToken,
  setRefreshToken,
} from "@/services/tokenServices";

interface AuthContextProps {
  user: any | null;
  isAuthenticated: boolean;
  login: (formData: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Decodes access token and sets user
  const loadUserFromToken = () => {
    const accessToken = getAccessToken();
    if (accessToken) {
      try {
        const decodedUser = jwtDecode(accessToken);
        setUser(decodedUser);
      } catch {
        clearTokens();
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
  };

  console.log(user, "user");

  // Initial load
  useEffect(() => {
    loadUserFromToken();
    setLoading(false);
  }, []);

  // Login function
  const login = async (formData: LoginType) => {
    setLoading(true);
    try {
      const res = await loginApi(formData);
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);
      loadUserFromToken();
      toast.success("Login successful");
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        const message = error.response?.data?.message || "Invalid credentials";
        toast.error(message);
      } else {
        toast.error("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearTokens();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
