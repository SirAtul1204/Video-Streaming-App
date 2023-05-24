import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useEffect, useState } from "react";
import CenterBox from "../components/CenterBox";
import CustomFormPaper from "../components/CustomFormPaper";
import FormTextField from "../components/FormTextField";
import { Errors } from "../utils/constants";
import helperTextResolver from "../utils/helperTextResolver";
import validateEmail from "../utils/validators/validateEmail";
import validatePassword from "../utils/validators/validatePassword";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailError, setEmailError] = useState<boolean | null>(null);
  const [isPasswordError, setPasswordError] = useState<boolean | null>(null);

  const [isLoginButtonDisabled, setLoginButtonDisabled] = useState(true);

  const fields = [
    {
      label: "Email",
      placeholder: "someone@example.com",
      type: "email",
      value: email,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value),
      error: isEmailError,
      helperText: helperTextResolver(isEmailError, Errors.EMAIL_ERROR),
      onBlur: (e: FocusEvent) => setEmailError(!validateEmail(email)),
    },
    {
      label: "Password",
      placeholder: "Alphanumeric, minimum 6 characters",
      type: "password",
      value: password,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value),
      error: isPasswordError,
      helperText: helperTextResolver(isPasswordError, Errors.PASSWORD_ERROR),
      onBlur: (e: FocusEvent) => setPasswordError(!validatePassword(password)),
    },
  ];

  useEffect(() => {
    if (isEmailError === false && isPasswordError === false)
      setLoginButtonDisabled(false);
  }, [isEmailError, isPasswordError]);

  return (
    <CenterBox>
      <CustomFormPaper>
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
      </CustomFormPaper>
      <Typography>
        Don&apos;t have an account?&nbsp;
        <Link variant="body1" color="secondary" href="/signup">
          Sign Up
        </Link>
      </Typography>
    </CenterBox>
  );
}
