import axios, { AxiosResponse } from "axios";
import Headers from "./Headers";

export interface IAxiosDELETE {
  url: string;
  token: string;
}

const axiosDELETE = async ({
  url,
  token,
}: IAxiosDELETE): Promise<AxiosResponse> => {
  const headers = token !== undefined ? new Headers(token) : {};
  const res = await axios.delete(url, headers);
  return res;
};
export default axiosDELETE;
