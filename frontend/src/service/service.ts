import { ApiRoutes } from "../utils/constants";
import { MakePostRequest } from "../utils/MakePostRequest";
import {
  LoginCredentials,
  LoginResponse,
  SignupCredentials,
  SignupResponse,
} from "./interface";

const failMessage = {
  success: false,
  message: "Server Response Not Valid",
};

export class Service {
  static async signup(signUpCredentials: SignupCredentials) {
    try {
      const response = await MakePostRequest(
        ApiRoutes.USER_SIGNUP,
        signUpCredentials
      );
      const typedResponse = SignupResponse.parse(response);
      return typedResponse;
    } catch (e: any) {
      return failMessage;
    }
  }

  static async login(loginCredentials: LoginCredentials) {
    try {
      const response = await MakePostRequest(
        ApiRoutes.USER_LOGIN,
        loginCredentials
      );
      const typedResponse = LoginResponse.parse(response);
      return typedResponse;
    } catch (e: any) {
      return failMessage;
    }
  }
}
