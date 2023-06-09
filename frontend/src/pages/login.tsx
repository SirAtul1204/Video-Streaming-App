import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import CenterBox from "../components/CenterBox";
import CustomFormPaper from "../components/CustomFormPaper";
import FormTextField from "../components/FormTextField";
import { Errors } from "../utils/constants";
import helperTextResolver from "../utils/helperTextResolver";
import validateEmail from "../utils/validators/validateEmail";
import validatePassword from "../utils/validators/validatePassword";
import { Service } from "@/service/service";
import { useDispatch } from "react-redux";
import { openToast } from "@/redux/toastSlice";
import { useRouter } from "next/router";
import { Loader } from "@/components/Loader";
import useAuth from "@/hooks/useAuth";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const isAuth = useAuth();

  const [isLoading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isEmailError, setEmailError] = useState<boolean | null>(null);
  const [isPasswordError, setPasswordError] = useState<boolean | null>(null);

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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await Service.login({ email, password });
    dispatch(
      openToast({
        message: response.message,
        color: response.success ? "success" : "error",
      })
    );
    if (response.success) router.push("/");
    else setLoading(false);
  };

  if (isAuth === null) return <Loader />;

  if (isAuth) {
    router.push("/");
    return <Loader />;
  }

  if (isLoading) return <Loader message="Logging you in ..." />;

  return (
    <CenterBox>
      <CustomFormPaper handleSubmit={handleSubmit}>
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
            <Button variant="contained" type="submit">
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
