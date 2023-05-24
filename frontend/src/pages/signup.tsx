import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CenterBox from "../components/CenterBox";
import CustomFormPaper from "../components/CustomFormPaper";
import FormTextField from "../components/FormTextField";
import { Service } from "../service/service";
import { Errors, ToastMessages } from "../utils/constants";
import helperTextResolver from "../utils/helperTextResolver";
import validateEmail from "../utils/validators/validateEmail";
import validateName from "../utils/validators/validateName";
import validatePassword from "../utils/validators/validatePassword";
import { useDispatch } from "react-redux";
import { openToast } from "@/redux/toastSlice";
import { useRouter } from "next/router";
import { Loader } from "@/components/Loader";

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      dispatch(
        openToast({
          message: ToastMessages.PASSWORDS_DONT_MATCH,
          color: "error",
        })
      );
      return;
    }

    setLoading(true);
    const response = await Service.signup({ name, email, password });
    dispatch(
      openToast({
        message: response.message,
        color: response.success ? "success" : "error",
      })
    );

    if (response.success) router.push("/login");
    else setLoading(false);
  };

  useEffect(() => {
    if (
      isNameError === false &&
      isEmailError === false &&
      isPasswordError === false &&
      isConfirmPasswordError === false
    )
      setSignUpButtonDisabled(false);
  }, [isNameError, isEmailError, isPasswordError, isConfirmPasswordError]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <CenterBox>
      <CustomFormPaper handleSubmit={handleSubmit}>
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
            <Button
              variant="contained"
              disabled={isSignUpButtonDisabled}
              type="submit"
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </CustomFormPaper>
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
