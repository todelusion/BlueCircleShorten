import errorIcon from "../assets/errorIcon.svg";
import successIcon from "../assets/successIcon.svg";

import { PendingResult } from "../hooks/usePendingResult";
import useApi from "../hooks/useApi";
import { ErrorResponse, ForgetPasswordResponse } from "../types/Interface";

interface IPendingResultModal {
  pendingResult: PendingResult;
}

export default function PendingResultModal({
  pendingResult,
}: IPendingResultModal): JSX.Element {
  const { resData } = useApi();

  const showResultMessage = (): string => {
    if (resData === null || resData === undefined) return "";

    if (
      (resData as ErrorResponse).response !== undefined &&
      (resData as ErrorResponse).response.status === 400
    )
      return (resData as ErrorResponse).response.data.message;

    if ((resData as ForgetPasswordResponse).message === "已寄出驗證信")
      return (resData as ErrorResponse).message.trim();

    return "發生技術錯誤";
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-10 flex h-screen items-center justify-center">
      <div className="relative h-44 w-32 ">
        <div
          className={`${
            pendingResult.isPending ? "show" : "close"
          } absolute mt-5 h-14 w-20 animate-spin rounded-[100%] border-2 border-primary first-line:mb-14 md:h-20 md:w-32`}
        />
        <div
          className={`${
            pendingResult.isSuccess ? "show" : "close"
          } absolute flex flex-col items-center`}
        >
          <div className="mb-20 -mt-5 h-14 w-20 md:h-20 md:w-32">
            <img src={successIcon} alt="error" />
          </div>
          <p className="w-max font-serif text-2xl font-black text-primary">
            {showResultMessage()}
          </p>
        </div>

        <div
          className={`${
            pendingResult.isError ? "show" : "close"
          } absolute flex flex-col items-center`}
        >
          <div className="mb-20 -mt-5 h-14 w-20 md:h-20 md:w-32">
            <img src={errorIcon} alt="error" />
          </div>
          <p className="w-max font-serif text-2xl font-black text-primary">
            {showResultMessage()}
          </p>
        </div>
      </div>
    </div>
  );
}
