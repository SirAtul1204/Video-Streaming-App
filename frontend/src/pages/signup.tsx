import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useEffect, useState } from "react";
import CenterBox from "../components/CenterBox";
import CustomPaper from "../components/CustomPaper";
import FormTextField from "../components/FormTextField";
import { Errors } from "../utils/contants";
import helperTextResolver from "../utils/helperTextResolver";
import validateEmail from "../utils/validators/validateEmail";
import validateName from "../utils/validators/validateName";
import validatePassword from "../utils/validators/validatePassword";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isNameError, setNameError] = useState<boolean | null>(null);
  const [isEmailError, setEmailError] = useState<boolean | null>(null);
  const [isPasswordError, setPasswordError] = useState<boolean | null>(null);
  const [isConfirmPasswordError, setConfirmPasswordError] = useState<
    boolean | null
  >(null);

  const [isSignUpButtonDisabled, setSignUpButtonDisabled] = useState(true);

  const fields = [
    {
      label: "Name",
      placeholder: "John Doe",
      type: "text",
      value: name,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
      error: isNameError,
      helperText: helperTextResolver(isNameError, Errors.NAME_ERROR),
      onBlur: (e: FocusEvent) => setNameError(!validateName(name)),
    },
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
    {
      label: "Confirm Password",
      placeholder: "Should match the password",
      type: "password",
      value: confirmPassword,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setConfirmPassword(e.target.value),
      error: isConfirmPasswordError,
      helperText: helperTextResolver(
        isConfirmPasswordError,
        Errors.CONFIRM_PASSWORD_ERROR
      ),
      onBlur: (e: FocusEvent) =>
        setConfirmPasswordError(!(password === confirmPassword)),
    },
  ];

  useEffect(() => {
    if (
      isNameError === false &&
      isEmailError === false &&
      isPasswordError === false &&
      isConfirmPasswordError === false
    )
      setSignUpButtonDisabled(false);
  }, [isNameError, isEmailError, isPasswordError, isConfirmPasswordError]);

  return (
    <CenterBox>
      <CustomPaper>
        <Grid container alignItems="center" justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Fill out the details below to create an account
            </Typography>
          </Grid>
          {fields.map((field, ind) => (
            <Grid item xs={12} key={ind}>
              <FormTextField {...field} />
            </Grid>
          ))}
          <Grid item>
            <Button variant="contained" disabled={isSignUpButtonDisabled}>
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </CustomPaper>
      <Typography>
        Already have an account?&nbsp;
        <Link color="secondary" href="/login">
          Login
        </Link>
      </Typography>
    </CenterBox>
  );
};

export default Signup;
