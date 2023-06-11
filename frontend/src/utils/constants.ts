export const Errors = {
  NAME_ERROR: "Enter name",
  EMAIL_ERROR: "Enter a valid email address",
  PASSWORD_ERROR:
    "Password must be at least 6 characters, one letter & one digit",
  CONFIRM_PASSWORD_ERROR: "Passwords don't match",
};

export const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:8080";

export const ApiRoutes = {
  USER_SIGNUP: "/user/signup",
  USER_LOGIN: "/user/login",
};

export const ToastMessages = {
  PASSWORDS_DONT_MATCH: "Passwords don't match",
  ACCOUNT_CREATED: "Account Created, please login to continue",
};
