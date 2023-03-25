import Box from "@mui/material/Box";
import { FC, ReactNode } from "react";

export interface CenterBoxProps {
  children: ReactNode;
}

const CenterBox: FC<CenterBoxProps> = ({ children }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100svh",
        flexDirection: "column",
        gap: "2rem",
      }}
    >
      {children}
    </Box>
  );
};

export default CenterBox;
