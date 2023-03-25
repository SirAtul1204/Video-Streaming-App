import { z } from "zod";

export const emailSchema = z.string().email();

export const stringSchema = z.string().min(1);

export const numberSchema = z.number();

export const nameSchema = z.string().min(2);

export const passwordSchema = z
  .string()
  .min(6)
  .regex(/^(?=.*\d)(?=.*[a-zA-Z])[\w\s\S]{6,}$/);
