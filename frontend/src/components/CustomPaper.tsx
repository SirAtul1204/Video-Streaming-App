import Paper from "@mui/material/Paper";
import { FC, ReactNode } from "react";

export interface CustomPaperProps {
  children: ReactNode;
  width?: number;
}

const CustomPaper: FC<CustomPaperProps> = ({ children, width }) => {
  return (
    <form>
      <Paper elevation={5} sx={{ padding: 2, width: width ?? 350 }}>
        {children}
      </Paper>
    </form>
  );
};

export default CustomPaper;
