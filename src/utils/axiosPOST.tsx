import axios from "axios";
import Headers from "./Headers";

export interface IAxiosPOST {
  url: string;
  body: {
    email: string;
    name?: string;
    password: string;
    confirmPassword?: string;
  };
  token?: string;
}

const usePOST = async ({
  url,
  body,
  token,
}: IAxiosPOST): Promise<Response | unknown> => {
  const headers = new Headers(token);
  const axiosPOST = async (): Promise<Response | unknown> => {
    try {
      const res = await axios.post(
        url,
        body,
        headers.Authorization !== undefined ? (headers as object) : {}
      );
      console.log(res);
      return res.data;
    } catch (error) {
      return error;
    }
  };
  const data = await axiosPOST();
  return data;
};

export default usePOST;
