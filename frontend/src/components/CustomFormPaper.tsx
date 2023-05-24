import Paper from "@mui/material/Paper";
import { FC, FormEvent, ReactNode } from "react";

export interface CustomFormPaperProps {
  children: ReactNode;
  width?: number;
  handleSubmit?: (e: FormEvent) => void;
}

const CustomFormPaper: FC<CustomFormPaperProps> = ({
  children,
  width,
  handleSubmit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <Paper elevation={5} sx={{ padding: 2, width: width ?? 350 }}>
        {children}
      </Paper>
    </form>
  );
};

export default CustomFormPaper;
