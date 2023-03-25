import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { ChangeEvent, useEffect, useState } from "react";
import CenterBox from "../components/CenterBox";
import CustomPaper from "../components/CustomPaper";
import FormTextField from "../components/FormTextField";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fields = [
    {
      label: "Name",
      placeholder: "John Doe",
      type: "text",
      value: name,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
    },
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
    {
      label: "Confirm Password",
      placeholder: "Should match the password",
      type: "password",
      value: confirmPassword,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setConfirmPassword(e.target.value),
    },
  ];

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
            <Button variant="contained">Sign Up</Button>
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
