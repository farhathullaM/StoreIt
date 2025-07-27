import * as yup from "yup";
import type { RegisterType } from "../types/RegisterType";
import { PHONE_REGEX } from "@/utils/regex";
import { toNullIfEmpty } from "@/utils/transform";

export const registerSchema: yup.ObjectSchema<RegisterType> = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .min(3, "First name must be at least 3 characters long")
    .max(50, "First name must be at most 50 characters long"),
  lastName: yup
    .string()
    .optional()
    .nullable()
    .transform(toNullIfEmpty)
    .max(50, "Last name must be at most 50 characters long"),
  phone: yup
    .string()
    .nullable()
    .optional()
    .transform(toNullIfEmpty)
    .matches(PHONE_REGEX, "Invalid phone number"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must be at most 50 characters long"),
  confirmPassword: yup
    .string()
    .required("Confirm Password is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});
