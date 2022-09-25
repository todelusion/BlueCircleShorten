import { NavigateFunction } from "react-router-dom";
import { PendingType } from "../types/Enum";

interface PromiseResultConfig {
  state: Promise<any>;
  handleResult: (pendingType: PendingType, boolean: boolean) => void;
  navigate?: NavigateFunction;
  path?: string;
}

const handlePromiseResult = async (
  promiseResultConfig: PromiseResultConfig
): Promise<void> => {
  const { state, handleResult, navigate, path } = promiseResultConfig;
  // console.log(state);
  const value = await state;

  if (value === undefined) return;
  handleResult(PendingType.isPending, false);

  if (value.status === "success") {
    console.log(value);
    handleResult(PendingType.isSuccess, true);
    setTimeout(() => {
      handleResult(PendingType.isSuccess, false);
    }, 1000);
    return;
  }

  if (value.response.status === 400) {
    handleResult(PendingType.isError, true);
    setTimeout(() => {
      handleResult(PendingType.isError, false);
    }, 1000);
    return;
  }

  if (navigate !== undefined && path !== undefined) navigate(path);
};

export default handlePromiseResult;
