import z from "zod";
export interface SignupCredentials {
  name: String;
  email: String;
  password: String;
}

export const SignupResponse = z.object({
  success: z.boolean(),
  message: z.string(),
});
