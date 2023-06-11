import z from "zod";
export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export const SignupResponse = z.object({
  success: z.boolean(),
  message: z.string(),
});

export interface LoginCredentials {
  email: string;
  password: string;
}

export const LoginResponse = z.object({
  token: z.string(),
  success: z.boolean(),
  message: z.string(),
});
