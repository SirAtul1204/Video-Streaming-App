import { ApiRoutes } from "../utils/constants";
import { MakePostRequest } from "../utils/MakePostRequest";
import { SignupCredentials, SignupResponse } from "./interface";

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
}
