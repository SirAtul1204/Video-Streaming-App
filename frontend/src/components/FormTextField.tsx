import TextField from "@mui/material/TextField";
import { FC } from "react";

export interface FormTextFieldProps {
  label: string;
  placeholder: string;
  type: string;
}

const FormTextField: FC<FormTextFieldProps> = (props) => {
  return <TextField size="small" variant="outlined" fullWidth {...props} />;
};

export default FormTextField;
