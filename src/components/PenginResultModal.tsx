import errorIcon from "../assets/errorIcon.svg";
import { PendingResult } from "../hooks/usePendingResult";

interface IPenginResultModal {
  pendingResult: PendingResult;
}

export default function PenginResultModal({
  pendingResult,
}: IPenginResultModal): JSX.Element {
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
            pendingResult.isError ? "show" : "close"
          } show absolute flex flex-col items-center`}
        >
          <div className="mb-20 -mt-5 h-14 w-20 md:h-20 md:w-32">
            <img src={errorIcon} alt="error" />
          </div>
          <p className="w-max font-dela text-2xl text-primary">處理失敗</p>
        </div>
      </div>
    </div>
  );
}
