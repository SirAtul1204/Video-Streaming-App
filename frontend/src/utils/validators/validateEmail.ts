import { z } from "zod";
import { emailSchema } from "../zodSchemas";

const validateEmail = (email: string) => {
  try {
    emailSchema.parse(email);
    return true;
  } catch (e) {
    return false;
  }
};

export default validateEmail;
