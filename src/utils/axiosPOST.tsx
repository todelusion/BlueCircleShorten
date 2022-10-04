import axios, { AxiosResponse } from "axios";
import Headers from "./Headers";

const baseUrl = "https://fast-headland-09301.herokuapp.com";

export interface IAxiosPOST {
  url: string;
  body?: {
    email?: string;
    name?: string;
    password?: string;
    confirmPassword?: string;
    url?: string;
    tag?: string[];
  };
  formData?: FormData;
  token?: string;
}

const axiosPOST = async ({
  url,
  body,
  token,
  formData,
}: IAxiosPOST): Promise<unknown | AxiosResponse> => {
  try {
    const res = await axios.post(
      url,
      formData !== undefined ? formData : body,
      token !== undefined ? new Headers(token) : {}
    );

    if (
      res.config.url === `${baseUrl}/users/sign_in` ||
      res.config.url === `${baseUrl}/users/sign_up`
    ) {
      sessionStorage.setItem("token", res.data.user.token);
    }
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default axiosPOST;
