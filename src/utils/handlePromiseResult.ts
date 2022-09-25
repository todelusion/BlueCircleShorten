import { NavigateFunction } from "react-router-dom";
import { PendingType } from "../types/Enum";

const handlePromiseResult = async (
  state: Promise<any>,
  handleResult: (pendingType: PendingType, boolean: boolean) => void,
  navigate: NavigateFunction,
  path: string
): Promise<void> => {
  const value = await state;
  console.log(value);
  if (value === undefined) return;
  handleResult(PendingType.isPending, false);
  if (value.user === undefined) {
    handleResult(PendingType.isError, true);
    setTimeout(() => {
      handleResult(PendingType.isError, false);
    }, 1000);
    return;
  }
  navigate(path);
};

export default handlePromiseResult;
