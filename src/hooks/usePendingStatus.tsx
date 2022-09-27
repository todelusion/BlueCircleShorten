// axios狀態管理鉤子，用在handlePromiseResult()

import { useState } from "react";
import { PendingType } from "../types/Enum";

const initialState = {
  isPending: false,
  isSuccess: false,
  isError: false,
};

export interface PendingResult {
  isPending: boolean;
  isSuccess: boolean;
  isError: boolean;
}

interface IUsePendingStatus {
  setPendingStatus: (pendingType: PendingType, boolean: boolean) => void;
  pendingResult: PendingResult;
}

export default function usePendingStatus(): IUsePendingStatus {
  const [pendingResult, setPendingResult] =
    useState<PendingResult>(initialState);

  const setPendingStatus = (pendingType: string, boolean: boolean): void => {
    setPendingResult((prevState) => ({ ...prevState, [pendingType]: boolean }));
  };
  return { pendingResult, setPendingStatus };
}
