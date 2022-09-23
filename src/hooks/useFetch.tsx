import { useState, useEffect, Dispatch, SetStateAction } from "react";
import axios from "axios";

const useFetch = (url: string): [object, Dispatch<SetStateAction<object>>] => {
  const [data, setData] = useState<object>({});
  const fetchData = async (): Promise<void> => {
    const res = await axios.get(url, {
      headers: {
        Authorization:
          "Bearer saSb3FzqHIjWaweZP9llX8Y9oixK9X7aZZq5jPyq9XFnFUdOdUwuZc5iTZwv",
      },
    });
    if (typeof res.data === undefined) return;
    setData(res.data);
  };
  useEffect(() => {
    void fetchData();
  }, []);
  return [data, setData];
};

export default useFetch;
