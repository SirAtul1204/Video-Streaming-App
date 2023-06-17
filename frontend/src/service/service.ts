import { ApiRoutes } from "../utils/constants";
import { MakePostRequest } from "../utils/MakePostRequest";
import {
  GeneralResponse,
  LoginCredentials,
  SignupCredentials,
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
      const typedResponse = GeneralResponse.parse(response);
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
      const typedResponse = GeneralResponse.parse(response);
      return typedResponse;
    } catch (e: any) {
      return failMessage;
    }
  }

  static async logout() {
    try {
      const response = await MakePostRequest(ApiRoutes.USER_LOGOUT, {});
      const typedResponse = GeneralResponse.parse(response);
      return typedResponse;
    } catch (e: any) {
      return failMessage;
    }
  }
}
