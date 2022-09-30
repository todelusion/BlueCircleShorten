import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/useApi";
import usePendingStatus from "../../hooks/usePendingStatus";
import { PendingType, ThemeColor } from "../../types/Enum";
import axiosGET from "../../utils/axiosGET";

// 此頁面的路由到app.tsx寫成edit:id才能用useParam()抓從主頁面navigate到edit的ID

const Edit = (): JSX.Element => {
  const { urlID } = useParams();
  const { baseUrl, token } = useApi();
  const { pendingResult, setPendingStatus } = usePendingStatus();

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
    <div
      className={`lg-Pseudo box-shadow relative -mt-10 mb-10 hidden w-1/3 border-2 bg-white xl:block ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
    >
      <div
        className={`${
          pendingResult.isPending ? "show" : "close"
        } absolute left-0 right-0 top-1/3 mx-auto mt-5 h-14 w-20 animate-spin rounded-[100%] border-2 border-primary first-line:mb-14 md:h-20 md:w-32`}
      />
      <p className="font-dela text-4xl">預留位</p>
    </div>
  );
};

export default Edit;
