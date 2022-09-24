/* 這裡做了兩件事
1. 創建<contextComponent>
2. 回傳用<contextComponent.Provider>包裹children的JSX.Element

效益：
1. 往後只要被ApiProvider包裹的JSX都將自動視為ApiProvider底下的children
2. 可在這檔案本身撰寫全域鉤子（例如useReducer）或其他邏輯
*/

import { AxiosPromise, AxiosResponse } from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
import hookGET from "../hooks/hookGET";
import hookPOST, { IAxiosPOST } from "../hooks/hookPOST";

interface Props {
  children: JSX.Element;
}
export interface IApiReducer {
  state: Promise<void>;
  dispatch: React.Dispatch<AxiosType>;
  baseUrl: string;
  resData: {
    status: string;
  };
}

type AxiosType =
  | { type: "GET"; payload: string }
  | { type: "POST"; payload: IAxiosPOST };

const baseUrl = "https://fast-headland-09301.herokuapp.com";

const initialState = new Promise((resolve) => {
  resolve(undefined);
});

const axiosReducer = async (
  state: Promise<boolean | unknown>,
  action: AxiosType
): Promise<boolean | unknown> => {
  switch (action.type) {
    case "GET":
      return hookGET(action.payload);
    case "POST":
      return hookPOST(action.payload);
    default:
      throw new Error("AXIOS 執行失敗");
  }
};

export const ApiContext = createContext({});

export const ApiProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(axiosReducer, initialState);
  const [resData, setResData] = useState<Response | unknown>({});

  // 每當parsePromise函式被重新宣告（在記憶體的位置發生變化）就觸發useEffect
  useEffect(() => {
    const parsePromise = async (): Promise<void> => {
      const res = await state;
      setResData(res);
    };
    parsePromise().catch((error) => {
      console.log(error);
    });
  }, [state]);

  console.log("inside ApiProvider...", resData);
  return (
    <ApiContext.Provider value={{ state, dispatch, baseUrl, resData }}>
      {children}
    </ApiContext.Provider>
  );
};
