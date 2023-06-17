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
        flexDirection: "column",
        gap: "2rem",
        flexGrow: 1,
        flexShrink: 1,
        flexBasis: "auto",
      }}
    >
      {children}
    </Box>
  );
};

export default CenterBox;
