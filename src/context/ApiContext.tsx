/* 這裡做了兩件事
1. 創建<contextComponent>
2. 回傳用<contextComponent.Provider>包裹children的JSX.Element

效益：
1. 往後只要被ApiProvider包裹的JSX都將自動視為ApiProvider底下的children
2. 可在這檔案本身撰寫全域鉤子（例如useReducer）或其他邏輯
*/

import { createContext, useEffect, useReducer } from "react";
import useGET from "../hooks/useGET";
import usePOST, { IAxiosPOST } from "../hooks/usePOST";

interface Props {
  children: JSX.Element;
}
export interface IApiReducer {
  state: Promise<Response>;
  dispatch: React.Dispatch<AxiosType>;
  baseUrl: string;
}

type AxiosType =
  | { type: "GET"; payload: string }
  | { type: "POST"; payload: IAxiosPOST };

const baseUrl = "https://fast-headland-09301.herokuapp.com";

const axiosReducer = (state: object, action: AxiosType): object => {
  switch (action.type) {
    case "GET":
      return useGET(action.payload);
    case "POST":
      return usePOST(action.payload);
    default:
      throw new Error();
  }
};

export const ApiContext = createContext({});

export const ApiProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(axiosReducer, {});
  useEffect(() => {}, []);

  console.log("inside ApiProvider...");
  console.log(state);
  return (
    <ApiContext.Provider value={{ state, dispatch, baseUrl }}>
      {children}
    </ApiContext.Provider>
  );
};
