import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useApi from "../../hooks/useApi";
import usePendingStatus from "../../hooks/usePendingStatus";
import { PendingType, ThemeColor } from "../../types/Enum";
import axiosGET from "../../utils/axiosGET";
import type { InitialEditModal } from "./Shorten";

// 此頁面的路由到app.tsx寫成edit:id才能用useParam()抓從主頁面navigate到edit的ID

interface IEditProps {
  urlID: string;
  setToggleEditModal: (object: InitialEditModal) => void;
}

const Edit = ({ urlID, setToggleEditModal }: IEditProps): JSX.Element => {
  console.log(urlID);
  const { baseUrl, token } = useApi();
  const { pendingResult, setPendingStatus } = usePendingStatus();
  const location = useLocation();

  const fetchSingleData = async (): Promise<void> => {
    if (urlID === undefined || urlID === "") return;

    setPendingStatus(PendingType.isPending, true);
    const res = await axiosGET({ url: `${baseUrl}/url/${urlID}`, token });
    setPendingStatus(PendingType.isPending, false);
    console.log(res);
  };

  useEffect(() => {
    fetchSingleData().catch((error) => console.log(error));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      key={location.pathname}
      className="fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-black/50"
    >
      <div
        className={`lg-Pseudo box-shadow relative -mt-10 mb-10 flex w-1/3 justify-between border-2 bg-white ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
      >
        {/* <div
            className={`${
              pendingResult.isPending ? "show" : "close"
            } absolute left-0 right-0 top-1/3 mx-auto mt-5 h-14 w-20 animate-spin rounded-[100%] border-2 border-primary first-line:mb-14 md:h-20 md:w-32`}
          /> */}
        <p className="font-dela text-4xl">預留位</p>
        <button
          type="button"
          onClick={() => {
            setToggleEditModal({ showEditModal: false });
          }}
        >
          X
        </button>
      </div>
    </motion.div>
  );
};

export default Edit;
