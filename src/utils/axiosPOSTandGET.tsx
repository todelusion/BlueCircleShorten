import axios from "axios";
import Headers from "./Headers";

export interface IaxiosPOSTandGET {
  postUrl: string;
  getUrl: string;
  body: IuserAccounts | IUrlPosts;
  token: string;
}

export interface IuserAccounts {
  email: string;
  password: string;
}

export interface IUrlPosts {
  url: string;
}

const axiosPOSTandGET = async ({
  postUrl,
  getUrl,
  body,
  token,
}: IaxiosPOSTandGET): Promise<unknown> => {
  const headers = token !== undefined ? new Headers(token) : {};
  try {
    const res = await axios.post(postUrl, body, headers);
    console.log(res);
  } catch (error) {
    console.log(error);
  }

  try {
    const res = await axios.get(getUrl, headers);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default axiosPOSTandGET;
