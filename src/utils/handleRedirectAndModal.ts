// 負責處理轉址，與設定axios狀態鉤子

import { NavigateFunction } from "react-router-dom";
import { PendingType } from "../types/Enum";
import { ErrorResponse, SuccessResponse } from "../types/Schema";

interface ResponseResult {
  setPendingStatus: (pendingType: PendingType, boolean: boolean) => void;
  successResponse?: SuccessResponse;
  errorData?: ErrorResponse;
  navigate?: NavigateFunction;
  baseUrl?: string;
  path?: string;
}

const handleRedirectAndModal = (promiseResultConfig: ResponseResult): void => {
  const { setPendingStatus, successResponse, errorData, navigate, path } =
    promiseResultConfig;
  console.log(successResponse);
  setPendingStatus(PendingType.isPending, false);

  if (successResponse !== undefined && successResponse.status === 200) {
    setPendingStatus(PendingType.isSuccess, true);
    setTimeout(() => {
      setPendingStatus(PendingType.isSuccess, false);
    }, 1000);

    if (navigate !== undefined && path !== undefined) {
      // if(successResponse.config.url === `${baseUrl}/users/updatePassword`){
      navigate(path);
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
