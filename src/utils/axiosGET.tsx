import axios from "axios";
import Headers from "./Headers";

export interface IAxiosGET {
  url: string;
  token?: string;
}

const axiosPOST = async ({ url, token }: IAxiosGET): Promise<unknown> => {
  console.log(url, token !== undefined ? new Headers(token) : {});
  try {
    const res = await axios.get(
      url,
      token !== undefined ? new Headers(token) : {}
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default axiosPOST;
