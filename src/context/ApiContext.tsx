/* 這裡做了兩件事
1. 創建<contextComponent>
2. 回傳用<contextComponent.Provider>包裹children的JSX.Element

效益：
1. 往後只要被ApiProvider包裹的JSX都將自動視為ApiProvider底下的children
2. 可在這檔案本身撰寫全域鉤子（例如useReducer）或其他邏輯
*/

import { createContext, useEffect, useReducer, useState } from "react";
import { ErrorResponse, SuccessResponse } from "../types/Interface";
import axiosGET from "../utils/axiosGET";
import axiosPATCH from "../utils/axiosPATCH";
import axiosPOST, { IAxiosPOST } from "../utils/axiosPOST";
import handlePromiseResult from "../utils/handlePromiseResult";

const baseUrl = "https://fast-headland-09301.herokuapp.com";

interface Props {
  children: JSX.Element;
}
export interface IApiReducer {
  state: Promise<any>;
  dispatch: React.Dispatch<AxiosType>;
  baseUrl: typeof baseUrl;
  token: string;
  resData: ErrorResponse | SuccessResponse;
}

type AxiosType =
  | { type: "GET"; payload: string }
  | { type: "POST"; payload: IAxiosPOST }
  | { type: "PATCH"; payload: IAxiosPOST }
  | { type: "RESET" };

const initialState = new Promise((resolve) => {
  resolve(undefined);
});

const axiosReducer = async (
  state: Promise<SuccessResponse | ErrorResponse | unknown>,
  action: AxiosType
): Promise<SuccessResponse | ErrorResponse | unknown> => {
  switch (action.type) {
    case "GET":
      return axiosGET(action.payload);
    case "POST":
      return axiosPOST(action.payload);
    case "PATCH":
      return axiosPATCH(action.payload);
    case "RESET":
      return undefined;
    default:
      throw new Error("AXIOS 執行失敗");
  }
};

export const ApiContext = createContext({});

export const ApiProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(axiosReducer, initialState);
  const [resData, setResData] = useState<
    ErrorResponse | SuccessResponse | null
  >(null);
  const [token, setToken] = useState<string | null>(null);

  // 每當state發生變化（或在記憶體的位置發生變化）就觸發useEffect
  useEffect(() => {
    // const waitForEdit = ()=> {
    //   if (value.config.method === "patch") return undefined;
    //   return handlePromiseResult({
    //     state,
    //     setPendingStatus,
    //     navigate,
    //     path: "/home",
    //   }).catch((error) => error);
    // }

    const parsePromise = async (): Promise<void> => {
      const res = await state;
      setResData(res as SuccessResponse | ErrorResponse);
      console.log(res);

      if ((res as SuccessResponse).data === undefined) return;
      const { user } = (res as SuccessResponse).data;
      if (user !== undefined) setToken(user.token);

      // handlePromiseResult()

      /* 待修正
      1. 將handlePromiseResult改名為handleRedirectndModal
      2. 將使用到的state改為傳入parsePromise底下的const res = await state
      3. handlePromiseResult不為async function（因為透過傳入res參數就不需要async）

      */
    };

    parsePromise().catch((error) => error);
  }, [state]);

  return (
    <ApiContext.Provider value={{ state, dispatch, baseUrl, resData, token }}>
      {children}
    </ApiContext.Provider>
  );
};
