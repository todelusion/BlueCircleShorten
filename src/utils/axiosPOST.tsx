import axios from "axios";
import Headers from "./Headers";
import {
  schemaPOST,
  schemaError,
  PostPatchResponse,
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
}: IAxiosPOST): Promise<unknown> => {
  try {
    const res = await axios.post(
      url,
      body,
      token !== undefined ? new Headers(token) : {}
    );
    if (res.data.user.token !== undefined) {
      sessionStorage.setItem("token", res.data.user.token);
    }
    return res;
  } catch (error) {
    return error;
  }
};

export default axiosPOST;
