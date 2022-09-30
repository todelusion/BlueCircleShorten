import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import usePendingStatus from "../../hooks/usePendingStatus";
import { PendingType, ThemeColor } from "../../types/Enum";
import axiosGET from "../../utils/axiosGET";
import { useShortenPages } from "./Shorten";

// 此頁面的路由到app.tsx寫成edit:id才能用useParam()抓從主頁面navigate到edit的ID

const Edit = (): JSX.Element => {
  const { urlID } = useParams();
  const { baseUrl, token } = useApi();
  const { pendingResult, setPendingStatus } = usePendingStatus();
  const { toggleEdit } = useShortenPages();

  const fetchSingleData = async (): Promise<void> => {
    if (urlID === undefined) return;

    setPendingStatus(PendingType.isPending, true);
    const res = await axiosGET({ url: `${baseUrl}/url/${urlID}`, token });
    setPendingStatus(PendingType.isPending, false);
    console.log(res);
  };

  useEffect(() => {
    fetchSingleData().catch((error) => console.log(error));
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-black/50">
      <div
        className={`lg-Pseudo box-shadow relative -mt-10 mb-10 flex w-1/3 justify-between border-2 bg-white ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
      >
        <div
          className={`${
            pendingResult.isPending ? "show" : "close"
          } absolute left-0 right-0 top-1/3 mx-auto mt-5 h-14 w-20 animate-spin rounded-[100%] border-2 border-primary first-line:mb-14 md:h-20 md:w-32`}
        />
        <p className="font-dela text-4xl">預留位</p>
        <button
          type="button"
          onClick={() => {
            toggleEdit();
          }}
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Edit;
