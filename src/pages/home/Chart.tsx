import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import useApi from "../../hooks/useApi";
import usePendingStatus from "../../hooks/usePendingStatus";
import { PendingType, ThemeColor } from "../../types/Enum";
import { ISingleUrlChart, schemaSingleUrlChart } from "../../types/Schema";
import axiosGET from "../../utils/axiosGET";
import type { InitialToggleModal } from "./Shorten";

// 此頁面的路由到app.tsx寫成edit:id才能用useParam()抓從主頁面navigate到edit的ID

interface IChartProps {
  urlID: string;
  setToggleModal: (value: React.SetStateAction<InitialToggleModal>) => void;
}

const Chart = ({ urlID, setToggleModal }: IChartProps): JSX.Element => {
  const [singleUrlInfo, setSingleUrlInfo] = useState<ISingleUrlChart | null>(
    null
  );
  const { baseUrl, token } = useApi();
  const { pendingResult, setPendingStatus } = usePendingStatus();
  const location = useLocation();

  console.log(singleUrlInfo);

  const fetchSingleData = async (): Promise<void> => {
    if (urlID === undefined || urlID === "") return;

    setPendingStatus(PendingType.isPending, true);
    const res = await axiosGET({ url: `${baseUrl}/url/${urlID}`, token });
    setPendingStatus(PendingType.isPending, false);

    try {
      setSingleUrlInfo(schemaSingleUrlChart.parse(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSingleData().catch((error) => console.log(error));
  }, []);

  if (singleUrlInfo === null)
    return (
      <div className="fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center">
        <div
          className={`${
            pendingResult.isPending ? "show" : "close"
          } mt-5 h-14 w-20 animate-spin rounded-[100%] border-2 border-primary first-line:mb-14 md:h-20 md:w-32`}
        />
      </div>
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-black/50"
    >
      <div
        className={`lg-Pseudo box-shadow relative -mt-10 mb-10 flex w-1/3 justify-between border-2 bg-white ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
      >
        <p className="font-dela text-4xl">預留位</p>
        <button
          type="button"
          onClick={() => {
            setToggleModal((prevState) => ({
              ...prevState,
              showChartModal: false,
              urlID: "",
            }));
          }}
        >
          X
        </button>
      </div>
    </motion.div>
  );
};

export default Chart;
