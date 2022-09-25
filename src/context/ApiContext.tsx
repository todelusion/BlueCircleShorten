/* 這裡做了兩件事
1. 創建<contextComponent>
2. 回傳用<contextComponent.Provider>包裹children的JSX.Element

效益：
1. 往後只要被ApiProvider包裹的JSX都將自動視為ApiProvider底下的children
2. 可在這檔案本身撰寫全域鉤子（例如useReducer）或其他邏輯
*/

import { createContext, useEffect, useReducer, useState } from "react";
import { ErrorResponse, TokenResponse } from "../types/Interface";
import axiosGET from "../utils/axiosGET";
import axiosPOST, { IAxiosPOST } from "../utils/axiosPOST";

interface Props {
  children: JSX.Element;
}
export interface IApiReducer {
  state: Promise<any>;
  dispatch: React.Dispatch<AxiosType>;
  baseUrl: string;
  token: string;
  resData: ErrorResponse | TokenResponse | null;
}

type AxiosType =
  | { type: "GET"; payload: string }
  | { type: "POST"; payload: IAxiosPOST }
  | { type: "RESET" };

const baseUrl = "https://fast-headland-09301.herokuapp.com";

const initialState = new Promise((resolve) => {
  resolve(undefined);
});

const axiosReducer = async (
  state: Promise<boolean | unknown>,
  action: AxiosType
): Promise<any> => {
  switch (action.type) {
    case "GET":
      return axiosGET(action.payload);
    case "POST":
      return axiosPOST(action.payload);
    case "RESET":
      return undefined;
    default:
      throw new Error("AXIOS 執行失敗");
  }
};

export const ApiContext = createContext({});

export const ApiProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(axiosReducer, initialState);
  const [resData, setResData] = useState<ErrorResponse | TokenResponse | null>(
    null
  );
  const [token, setToken] = useState("");

  // 每當state發生變化（或在記憶體的位置發生變化）就觸發useEffect
  useEffect(() => {
    const parsePromise = async (): Promise<void> => {
      const res = await state;
      setResData(res);
      if (res.user !== undefined) setToken(res.user.token);
    };
    parsePromise().catch((error) => error);
  }, [state]);

  return (
    <ApiContext.Provider value={{ state, dispatch, baseUrl, resData, token }}>
      {children}
    </ApiContext.Provider>
  );
};
