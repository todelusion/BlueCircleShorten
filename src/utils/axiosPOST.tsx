import axios from "axios";
import Headers from "./Headers";
import {
  schemaSuccess,
  schemaError,
  SuccessResponse,
  ErrorResponse,
} from "../types/Schema";

export interface IAxiosPOST {
  url: string;
  body: {
    email?: string;
    name?: string;
    password?: string;
    confirmPassword?: string;
  };
  token?: string;
}

const axiosPOST = async ({
  url,
  body,
  token,
}: IAxiosPOST): Promise<SuccessResponse | ErrorResponse> => {
  try {
    const res = await axios.post(
      url,
      body,
      token !== undefined ? new Headers(token) : {}
    );
    sessionStorage.setItem("token", res.data.user.token);
    return schemaSuccess.parse(res);
  } catch (error) {
    return schemaError.parse(error);
  }
};

export default axiosPOST;
