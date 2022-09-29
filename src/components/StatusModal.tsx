import errorIcon from "../assets/errorIcon.svg";
import successIcon from "../assets/successIcon.svg";

import { PendingResult } from "../hooks/usePendingStatus";

interface IStatusModal {
  pendingResult: PendingResult;
}

export default function PendingResultModal({
  pendingResult,
}: IStatusModal): JSX.Element {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 flex h-screen items-center justify-center">
      <ul className="relative h-44 w-96">
        <li className="absolute left-0 right-0 flex justify-center">
          <div
            className={`${
              pendingResult.isPending ? "show" : "close"
            } mt-5 h-14 w-20 animate-spin rounded-[100%] border-2 border-primary first-line:mb-14 md:h-20 md:w-32`}
          />
        </li>
        <li
          className={`${
            pendingResult.isSuccess ? "show" : "close"
          } absolute left-0 right-0 flex flex-col items-center`}
        >
          <div className="mb-20 -mt-5 h-14 w-20 md:h-20 md:w-32">
            <img src={successIcon} alt="success" />
          </div>
          <p className="text-center font-serif text-2xl font-black text-primary">
            {pendingResult.message}
          </p>
        </li>

        <li
          className={`${
            pendingResult.isError ? "show" : "close"
          } absolute left-0 right-0 flex flex-col items-center`}
        >
          <div className="mb-20 -mt-5 h-14 w-20 md:h-20 md:w-32">
            <img src={errorIcon} alt="error" />
          </div>
          <p className="text-center font-serif text-2xl font-black text-primary">
            {pendingResult.message}
          </p>
        </li>
      </ul>
    </div>
  );
}
