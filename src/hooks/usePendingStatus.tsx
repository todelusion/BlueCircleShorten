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
  message?: string;
}

interface IUsePendingStatus {
  setPendingStatus: (
    pendingType: PendingType,
    boolean: boolean,
    message?: string
  ) => void;
  pendingResult: PendingResult;
}

export default function usePendingStatus(): IUsePendingStatus {
  const [pendingResult, setPendingResult] =
    useState<PendingResult>(initialState);

  const setPendingStatus = (
    pendingType: string,
    boolean: boolean,
    message?: string
  ): void => {
    setPendingResult((prevState) => ({
      ...prevState,
      [pendingType]: boolean,
      message: message !== undefined ? message : "",
    }));
  };
  return { pendingResult, setPendingStatus };
}
