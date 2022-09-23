import axios from "axios";

const useFetch = (url: string): object => {
  const axiosGET = async (): Promise<void> => {
    const res = await axios.get(url, {
      headers: {
        Authorization: "",
      },
    });
    return res.data;
  };

  return axiosGET();
};

export default useFetch;
