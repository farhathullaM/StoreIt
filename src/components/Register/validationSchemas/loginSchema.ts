import * as yup from "yup";
import type { LoginType } from "../types/LoginType";

export const loginSchema: yup.ObjectSchema<LoginType> = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long"),
});
