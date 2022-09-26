// 負責處理轉址與處理axios狀態管理鉤子

import { NavigateFunction } from "react-router-dom";
import { PendingType } from "../types/Enum";

interface PromiseResultConfig {
  state: Promise<any>;
  setPendingStatus: (pendingType: PendingType, boolean: boolean) => void;
  navigate?: NavigateFunction;
  path?: string;
}

const handlePromiseResult = async (
  promiseResultConfig: PromiseResultConfig
): Promise<void> => {
  const { state, setPendingStatus, navigate, path } = promiseResultConfig;
  const value = await state;
  console.log(value);

  if (value === undefined) return;
  setPendingStatus(PendingType.isPending, false);

  if (value.status === 200) {
    setPendingStatus(PendingType.isSuccess, true);
    setTimeout(() => {
      setPendingStatus(PendingType.isSuccess, false);
    }, 1000);
    if (navigate !== undefined && path !== undefined) navigate(path);
    return;
  }

  if (
    value.response.status === 400 ||
    value.response.status === 404 ||
    value.response.status === 500
  ) {
    setPendingStatus(PendingType.isError, true);
    setTimeout(() => {
      setPendingStatus(PendingType.isError, false);
    }, 1000);
  }
};

export default handlePromiseResult;
