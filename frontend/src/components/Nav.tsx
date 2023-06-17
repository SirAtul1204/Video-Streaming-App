import { openToast } from "@/redux/toastSlice";
import { Service } from "@/service/service";
import {
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Loader } from "./Loader";
import { useState } from "react";

const Nav = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const response = await Service.logout();
    if (response.success) {
      dispatch(openToast({ message: response.message, color: "success" }));
      router.push("/login");
    } else {
      dispatch(openToast({ message: response.message, color: "error" }));
    }
    setLoading(false);
  };

  return (
    <Paper
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        paddingY: 2,
        paddingX: 1,
        borderBottom: "1px solid #fff",
        borderRadius: 0,
      }}
    >
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={3}>
          {/* eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src="/images/Streamify Logo.png"
            alt="logo"
            className="logo"
            onClick={() => router.push("/")}
          />
        </Grid>
        <Grid item xs={8} container alignItems="center" justifyContent="right">
          {router.asPath === "/signup" && (
            <Grid item>
              <Button variant="outlined" onClick={() => router.push("/login")}>
                Login
              </Button>
            </Grid>
          )}
          {router.asPath === "/login" && (
            <Grid item>
              <Button variant="outlined" onClick={() => router.push("/signup")}>
                Sign Up
              </Button>
            </Grid>
          )}
          {router.asPath !== "/login" && router.asPath !== "/signup" && (
            <Grid item>
              <Button
                variant="outlined"
                color="warning"
                onClick={handleLogout}
                endIcon={isLoading && <CircularProgress size={10} />}
              >
                Logout
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Nav;
