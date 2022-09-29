/* ApiContext.tsx功能
  1. 創建<contextComponent>
  2. 回傳用<contextComponent.Provider>包裹children的JSX.Element

  效益：
  1. 往後只要被ApiProvider包裹的JSX都將自動視為ApiProvider底下的children
  2. 可在ApiContext.tsx檔案本身撰寫全域鉤子（例如useReducer）或其他邏輯
*/

import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosGET, { IAxiosGET } from "../utils/axiosGET";
import axiosPATCH from "../utils/axiosPATCH";
import axiosPOST, { IAxiosPOST } from "../utils/axiosPOST";
import handleRedirectAndModal from "../utils/handleRedirectAndModal";
import usePendingStatus, { PendingResult } from "../hooks/usePendingStatus";
import { PendingType } from "../types/Enum";

import {
  schemaPOST,
  schemaError,
  PostPatchResponse,
  ErrorResponse,
} from "../types/Schema";

const baseUrl = "https://fast-headland-09301.herokuapp.com";
const baseShorten = "https://bc.chudaobao.com";

const initialState = new Promise<void>((resolve) => {
  resolve();
});

interface Props {
  children: JSX.Element;
}
export interface IApiReducer {
  state: Promise<any>;
  dispatch: React.Dispatch<AxiosType>;
  baseUrl: typeof baseUrl;
  baseShorten: typeof baseShorten;
  token: string;
  resData: PostPatchResponse;
  errorData: ErrorResponse;
  pendingResult: PendingResult;
  setPendingStatus: (pendingType: PendingType, boolean: boolean) => void;
}

type AxiosType =
  | { type: "GET"; payload: IAxiosGET }
  | { type: "POST"; payload: IAxiosPOST }
  | { type: "PATCH"; payload: IAxiosPOST }
  | { type: "RESET" };

const axiosReducer = async (
  state: Promise<unknown>,
  action: AxiosType
): Promise<unknown> => {
  switch (action.type) {
    // 將case拆細一點比較好
    case "GET":
      return axiosGET(action.payload);
    case "POST":
      return axiosPOST(action.payload);
    case "PATCH":
      return axiosPATCH(action.payload);
    case "RESET":
      return null;
    default:
      throw new Error("AXIOS 執行失敗");
  }
};

export const ApiContext = createContext({});

export const ApiProvider = ({ children }: Props): JSX.Element => {
  const [state, dispatch] = useReducer(axiosReducer, initialState);

  /* usePendingStatus()自製鉤子注意事項
    1. 只能透過context傳到子層
    2. 若在各自的子層引入則會被React視為各自的狀態管理，而非統一狀態管理
  */
  const { pendingResult, setPendingStatus } = usePendingStatus();

  const navigate = useNavigate();

  const [resData, setResData] = useState<PostPatchResponse | null>(null);

  const [errorData, setErrorData] = useState<ErrorResponse | null>(null);

  const token = sessionStorage.getItem("token");
  // const [token, setToken] = useState<string | null>(null);
  console.log(resData);

  // 每當state發生變化（或在記憶體的位置發生變化）就觸發useEffect
  // state: axios回傳的promise物件
  // resposne: resData, errorData, token: promise物件視情況解析後的資料
  // state與response拆開是因為，需要在useEffect的裡面setResData才能更新resData狀態
  useEffect(() => {
    const parsePromise = async (): Promise<void> => {
      const res = await state;
      if (res === undefined || res === null) return;

      try {
        const successResponse = schemaPOST.parse(res);
        setResData(successResponse);
        // Redirect and ShowModal management
        if (successResponse !== null && successResponse !== undefined) {
          if (
            successResponse.config.url === `${baseUrl}/users/sign_in` ||
            successResponse.config.url === `${baseUrl}/users/sign_up`
          )
            handleRedirectAndModal({
              setPendingStatus,
              resData: successResponse,
              navigate,
              path: "/home",
            });

          if (successResponse.config.url === `${baseUrl}/users/updatePassword`)
            handleRedirectAndModal({
              setPendingStatus,
              resData: successResponse,
              navigate,
              path: "/findpassword/success",
            });
          if (successResponse.config.url === `${baseUrl}/users/updatePassword`)
            handleRedirectAndModal({
              setPendingStatus,
              resData: successResponse,
              navigate,
              path: "/",
            });
        }

        if (successResponse.data.user === undefined) return;
      } catch (error) {
        // console.log(error);
        const errorResponse = schemaError.parse(res);
        setErrorData(errorResponse);
        if (errorResponse !== null && errorResponse !== undefined) {
          handleRedirectAndModal({
            setPendingStatus,
            errorData: errorResponse,
          });
        }
      }
    };

    parsePromise().catch((error) => error);
  }, [state]);

  return (
    <ApiContext.Provider
      value={{
        state,
        dispatch,
        baseUrl,
        baseShorten,
        resData,
        errorData,
        token,
        pendingResult,
        setPendingStatus,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};
