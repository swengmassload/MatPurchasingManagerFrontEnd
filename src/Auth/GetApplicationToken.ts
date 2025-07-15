import axios from "axios";

import { AuthUrls } from "../Constants/FixValues";
import {
  // ITokenGenerationRequest,
  ITokenGenerationResponse,
  ProblemDetails,
} from "../Models/JWTModels/TokenGenerationRequest";
import { IApplicationTokenGenerationRequest } from "../Models/JWTModels/IApplicationTokenGenerationRequest";

export async function GetApplicationToken(flightToken: string, applicationCode: string): Promise<ProblemDetails> {
  const postdata: IApplicationTokenGenerationRequest = { flightToken, applicationCode };

  try {
    axios.defaults.headers.common["Authorization"] = `Bearer ${flightToken}`;
    const response = await axios.post<ITokenGenerationResponse>(AuthUrls.APPLICATIONTOKEN_BASEURL, postdata, {
      withCredentials: true,
    });

    if (response?.data?.success) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${response?.data?.token}`;
      const resp = {
        title: "Success",
        status: 200,
        detail: response?.data?.token,
      } as ProblemDetails;
      console.log(response?.data?.token);
      return resp;
      // return response.data.success;
    } else {
      const resp = {
        title: "Success",
        status: 400,
        detail: "Login Failed",
      } as ProblemDetails;

      return resp;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      let err = "An error occured while trying to login, please try again later";
      if (error.code === "ERR_NETWORK") {
        err = "Connection Problems.. Check your network connection and try again";
      } else if (error.code === "ERR_BAD_REQUEST") {
        console.log(error);
        err = "Bad Request Error.. Check your Parameter";
      } else if (error.code === "ERR_CANCELED") {
        err = "Connection cancelled..";
      } else if (error.code === "ECONNABORTED") {
        err = "Connection timeout.. Please try again later";
      } else {
        err = `${JSON.stringify(error.response?.data?.errors)} please check and try again`;
      }

      const resp = {
        title: error.message,
        status: 400,
        detail: err,
      } as ProblemDetails;

      return resp;
    } else {
      const probresponse = {
        title: "Error in Login",
        status: 500,
        detail: "An error occured while trying to login, please try again later",
      } as ProblemDetails;

      return probresponse;
    }
  }
}
