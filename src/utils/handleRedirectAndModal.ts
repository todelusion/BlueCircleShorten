// 負責處理轉址，與設定axios狀態鉤子

import { NavigateFunction } from "react-router-dom";
import { PendingType } from "../types/Enum";
import { ErrorResponse, PostPatchResponse } from "../types/Schema";

interface ResponseResult {
  setPendingStatus: (pendingType: PendingType, boolean: boolean) => void;
  resData?: PostPatchResponse;
  errorData?: ErrorResponse;
  navigate?: NavigateFunction;
  baseUrl?: string;
  path?: string;
}

const handleRedirectAndModal = (promiseResultConfig: ResponseResult): void => {
  const { setPendingStatus, resData, errorData, navigate, path } =
    promiseResultConfig;

  setPendingStatus(PendingType.isPending, false);

  if (resData !== undefined) {
    setPendingStatus(PendingType.isSuccess, true);
    setTimeout(() => {
      setPendingStatus(PendingType.isSuccess, false);
    }, 1000);
    if (resData.status === 200 || resData.status === 201) {
      if (navigate !== undefined && path !== undefined) {
        // if(resData.config.url === `${baseUrl}/users/updatePassword`){
        console.log(path);
        navigate(path);
      }
    }

    return;
  }

  if (errorData === undefined) return;

  if (
    String(errorData.response.status).startsWith("4") ||
    String(errorData.response.status).startsWith("5")
  ) {
    setPendingStatus(PendingType.isError, true);
    setTimeout(() => {
      setPendingStatus(PendingType.isError, false);
    }, 1000);
  }
};
export default handleRedirectAndModal;
