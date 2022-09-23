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

const usePOST = async ({ url, body, token }: IAxiosPOST): Promise<Response> => {
  console.log(url, body, token);
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
    }
  };
  return axiosPOST();
};

export default usePOST;
