import { format } from "date-fns";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChartMain from "../../components/ChartMain";
import StatusModal from "../../components/StatusModal";
import useApi from "../../hooks/useApi";
import usePendingStatus from "../../hooks/usePendingStatus";
import { PendingType, ThemeColor } from "../../types/Enum";
import { ISingleUrlChart, schemaSingleUrlChart } from "../../types/Schema";
import axiosGET from "../../utils/axiosGET";

// 此頁面的路由到app.tsx寫成edit:id才能用useParam()抓從主頁面navigate到edit的ID

export interface ICalcNoRepeatClick {
  browserClick?: {
    [index: string]: number;
  };
  systemClick?: {
    [index: string]: number;
  };
  dateClick?: {
    [index: string]: number;
  };
}

const Chart = (): JSX.Element => {
  const [singleUrlInfo, setSingleUrlInfo] = useState<ISingleUrlChart | null>(
    null
  );
  const { baseUrl, token } = useApi();
  const { urlid } = useParams();
  const navigate = useNavigate();
  const { pendingResult, setPendingStatus } = usePendingStatus();

  const fetchSingleData = async (): Promise<void> => {
    if (urlid === undefined || urlid === "") return;

    setPendingStatus(PendingType.isPending, true);
    const res = await axiosGET({ url: `${baseUrl}/url/${urlid}`, token });
    setPendingStatus(PendingType.isPending, false);

    try {
      setSingleUrlInfo(schemaSingleUrlChart.parse(res.data));
    } catch (error) {
      console.log(error);
    }
  };

  const calcNoRepeatClick = (
    _singleUrlInfo: ISingleUrlChart
  ): ICalcNoRepeatClick => {
    const browserClick = _singleUrlInfo?.notRepeatList.reduce<{
      [index: string]: number;
    }>((result, item) => {
      type User = Extract<typeof item, { UserBowse: string }>;
      const itemUser = item as User;
      if (itemUser.UserBowse in result) {
        result[itemUser.UserBowse] += 1;
      } else {
        result[itemUser.UserBowse] = 1;
      }
      return result;
    }, {});

    const systemClick = _singleUrlInfo?.notRepeatList.reduce<{
      [index: string]: number;
    }>((result, item) => {
      type User = Extract<typeof item, { UserSystem: string }>;
      const itemUser = item as User;
      if (itemUser.UserSystem in result) {
        result[itemUser.UserSystem] += 1;
      } else {
        result[itemUser.UserSystem] = 1;
      }
      return result;
    }, {});

    const dateClick = _singleUrlInfo?.notRepeatList.reduce<{
      [index: string]: number;
    }>((result, item) => {
      const date = format(new Date(item.createdAt), "Y-MM-dd");

      if (date in result) {
        result[date] += 1;
      } else {
        result[date] = 1;
      }
      return result;
    }, {});

    return { browserClick, systemClick, dateClick };
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
      className="absolute top-32 mb-10 flex w-full justify-center px-10"
    >
      <div
        className={`${
          Object.values(pendingResult).includes(true) ? "show" : "close"
        } z-10`}
      >
        <StatusModal pendingResult={pendingResult} />
      </div>
      <div
        className={`lg-Pseudo box-shadow col-span-2 flex w-full flex-col items-center justify-between border-2 bg-white ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
      >
        <button
          type="button"
          onClick={() => {
            navigate("/home");
          }}
          className="absolute right-3 top-3 font-sans text-2xl font-bold"
        >
          X
        </button>
        <ChartMain calcNoRepeatClick={calcNoRepeatClick(singleUrlInfo)} />
      </div>
    </motion.div>
  );
};

export default Chart;
