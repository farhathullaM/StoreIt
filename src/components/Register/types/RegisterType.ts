export interface RegisterType {
  firstName: string;
  lastName?: string | null;
  phone?: string | null;
  email: string;
  password: string;
  confirmPassword: string;
}
