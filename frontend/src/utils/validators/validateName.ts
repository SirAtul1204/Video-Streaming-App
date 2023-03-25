import { nameSchema } from "../zodSchemas";

const validateName = (name: string) => {
  try {
    nameSchema.parse(name);
    return true;
  } catch (e) {
    return false;
  }
};

export default validateName;
