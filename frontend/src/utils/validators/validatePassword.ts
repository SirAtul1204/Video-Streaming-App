import { passwordSchema } from "../zodSchemas";

const validatePassword = (pwd: string) => {
  try {
    passwordSchema.parse(pwd);
    return true;
  } catch (e) {
    return false;
  }
};

export default validatePassword;
