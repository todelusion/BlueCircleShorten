import { useState } from "react";
import { PendingType } from "../types/Enum";

const initialState = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

interface IUsePendingResult {
  handleResult: (pendingType: PendingType, boolean: boolean) => void;
  pendingResult: typeof initialState;
}

export default function usePendingResult(): IUsePendingResult {
  const [pendingResult, setPendingResult] = useState(initialState);

  const handleResult = (pendingType: string, boolean: boolean): void => {
    setPendingResult((prevState) => ({ ...prevState, [pendingType]: boolean }));
  };

  return { pendingResult, handleResult };
}
