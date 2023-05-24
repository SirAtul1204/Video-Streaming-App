import { ApiRoutes, BACKEND_URL } from "../utils/constants";
import { MakePostRequest } from "../utils/MakePostRequest";
import { SignupCredentials } from "./interface";

export class Service {
  static async signup(signUpCredentials: SignupCredentials) {
    return await MakePostRequest(ApiRoutes.USER_SIGNUP, signUpCredentials);
  }
}
