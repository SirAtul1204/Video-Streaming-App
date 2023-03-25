import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useEffect, useState } from "react";
import CenterBox from "../components/CenterBox";
import CustomPaper from "../components/CustomPaper";
import FormTextField from "../components/FormTextField";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isLoginButtonDisabled, setLoginButtonDisabled] = useState(true);

  const fields = [
    {
      label: "Email",
      placeholder: "someone@example.com",
      type: "email",
      value: email,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
    },
    {
      label: "Password",
      placeholder: "Alphanumeric, minimum 6 characters",
      type: "password",
      value: password,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
    },
  ];

  useEffect(() => {
    if (email && password) setLoginButtonDisabled(false);
  }, [email, password]);

  return (
    <CenterBox>
      <CustomPaper>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Fill out your credentials to login
            </Typography>
          </Grid>
          {fields.map((field, ind) => (
            <Grid item xs={12} key={ind}>
              <FormTextField {...field} />
            </Grid>
          ))}
          <Grid item>
            <Button variant="contained" disabled={isLoginButtonDisabled}>
              Login
            </Button>
          </Grid>
        </Grid>
      </CustomPaper>
      <Typography>
        Don&apos;t have an account?&nbsp;
        <Link variant="body1" color="secondary" href="/signup">
          Sign Up
        </Link>
      </Typography>
    </CenterBox>
  );
}
