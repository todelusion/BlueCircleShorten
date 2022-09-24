import axios from "axios";
import Headers from "../utils/Headers";

export interface IAxiosPOST {
  url: string;
  body: {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
  };
  token?: string;
}

const hookPOST = async ({
  url,
  body,
  token,
}: IAxiosPOST): Promise<Response> => {
  const headers = new Headers(token);
  const axiosPOST = async (): Promise<Response> => {
    try {
      const res = await axios.post(
        url,
        body,
        headers.Authorization !== undefined ? (headers as object) : {}
      );
      console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  };
  const data = await axiosPOST();
  console.log(data);
  return data;
};

export default hookPOST;
