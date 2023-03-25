import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100svh",
        gap: "1rem",
      }}
    >
      <Button variant="contained" onClick={() => router.push("/signup")}>
        Sign Up
      </Button>
      <Button variant="contained" onClick={() => router.push("/login")}>
        Login
      </Button>
    </Box>
  );
}
