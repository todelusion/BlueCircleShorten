// 使用這個鉤子調用context value就能預先判斷context是否有值或是否在指定的context component底下
import { useContext } from "react";
import { ApiContext, IApiReducer } from "../context/ApiContext";

const useApi = (): IApiReducer => {
  const context = useContext(ApiContext);
  if (context === undefined)
    throw new Error("useApi() muse be used inside a ApiContext");

  return context as IApiReducer;
};

export default useApi;
