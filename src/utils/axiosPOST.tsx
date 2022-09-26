import axios from "axios";
import { z } from "zod";
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
}: IAxiosPOST): Promise<PostPatchResponse | ErrorResponse> => {
  try {
    const res = await axios.post(
      url,
      body,
      token !== undefined ? new Headers(token) : {}
    );
    return schemaPOST.parse(res);
  } catch (error) {
    console.log(error);
    console.log(JSON.stringify(error.response));
    return schemaError.parse(error);
  }
};

export default axiosPOST;
