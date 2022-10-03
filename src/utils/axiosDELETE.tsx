import axios, { AxiosResponse } from "axios";
import Headers from "./Headers";

export interface IAxiosDELETE {
  url: string;
  token: string;
  tag?: string[];
}

const axiosDELETE = async ({
  url,
  token,
  tag,
}: IAxiosDELETE): Promise<AxiosResponse> => {
  const headers = { Authorization: `Bearer ${token}` };
  const data = { tag };
  const res = await axios.delete(url, { headers, data });
  return res;
};
export default axiosDELETE;
