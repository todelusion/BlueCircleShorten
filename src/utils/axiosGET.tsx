import axios from "axios";

const hookFetch = async (url: string): Promise<Response> => {
  const axiosGET = async (): Promise<Response> => {
    const res = await axios.get(url, {
      headers: {
        Authorization: "",
      },
    });
    return res.data;
  };
  return axiosGET();
};

export default hookFetch;
