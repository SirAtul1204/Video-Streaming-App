import { Box, CircularProgress, Typography } from "@mui/material";
import { FC } from "react";

interface LoaderProps {
  message?: string;
}

export const Loader: FC<LoaderProps> = ({ message }) => {
  return (
    <Box
      sx={{
        height: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <CircularProgress />
      {message && <Typography variant="h6">{message}</Typography>}
    </Box>
  );
};
