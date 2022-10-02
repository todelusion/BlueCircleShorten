import axios from "axios";
import Headers from "./Headers";

export interface IAxiosPATCH {
  url: string;
  body?: IAccountsInfo | IUrlInfo;
  formData?: FormData;
  token?: string;
}

interface IUrlInfo {
  url?: string;
  title?: string;
  description?: string;
  photo?: string;
}
interface IAccountsInfo {
  email?: string;
  name?: string;
  password?: string;
  confirmPassword?: string;
}

const axiosPATCH = async ({
  url,
  body,
  token,
  formData,
}: IAxiosPATCH): Promise<Response | unknown> => {
  try {
    console.log(body);
    console.log(formData);
    const res = await axios.patch(
      url,
      formData !== undefined ? formData : body,
      token !== undefined ? new Headers(token) : {}
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default axiosPATCH;
