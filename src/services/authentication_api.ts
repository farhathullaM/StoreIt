import apiClient from "@/lib/apiClient";
import { isAxiosError } from "axios";
import { toast } from "react-toastify";

const registerUser = async (formData: any) => {
  try {
    const response = await apiClient.post("auth/register", formData);
    toast.success("Registration successful");
    return response.status;
  } catch (error) {
    console.error(error);
    if (isAxiosError(error)) {
      const message = error.response?.data?.message || "Invalid credentials";
      toast.error(message);
    } else {
      toast.error("An unknown error occurred");
    }
  }
};

export { registerUser };
