import axios from "axios";
import Headers from "./Headers";

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

const axiosPATCH = async ({
  url,
  body,
  token,
}: IAxiosPOST): Promise<Response | unknown> => {
  try {
    console.log(url, body, token !== undefined ? new Headers(token) : {});

    const res = await axios.patch(
      url,
      body,
      token !== undefined ? new Headers(token) : {}
    );
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
};

export default axiosPATCH;
