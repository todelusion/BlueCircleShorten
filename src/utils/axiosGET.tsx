import axios, { AxiosError, AxiosResponse } from "axios";
import Headers from "./Headers";

export interface IAxiosGET {
  url: string;
  token: string;
}

const axiosGET = async ({ url, token }: IAxiosGET): Promise<AxiosResponse> => {
  const headers = token !== undefined ? new Headers(token) : {};
  const res = await axios.get(url, headers);
  // console.log(res);
  return res;
};
export default axiosGET;
