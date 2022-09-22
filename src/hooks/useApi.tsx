import { useContext } from "react";
import { ApiContext } from "../context/ApiContext";

const useApi = (): object => {
  const context = useContext(ApiContext);
  if (context === undefined)
    throw new Error("useApi() muse be used inside a ApiContext");

  return context;
};

export default useApi;
