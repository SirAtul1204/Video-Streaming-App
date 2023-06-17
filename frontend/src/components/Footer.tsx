import { Box, Paper, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Paper
      sx={{
        paddingY: 1,
        borderTop: "1px solid #fff",
        borderRadius: 0,
        textAlign: "center",
      }}
    >
      <Typography textAlign="center" variant="caption">
        Copyright &copy;{new Date().getFullYear()}, SirAtul1204
      </Typography>
    </Paper>
  );
}
