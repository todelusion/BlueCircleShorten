import { AnimatePresence, motion } from "framer-motion";
import React, { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ISingleUrlList } from "../../types/Schema";

import useApi from "../../hooks/useApi";
import usePendingStatus from "../../hooks/usePendingStatus";
import { PendingType, ThemeColor } from "../../types/Enum";
import axiosGET from "../../utils/axiosGET";
import type { InitialToggleModal } from "./Shorten";
import { unknown } from "zod";
import Button from "../../components/Button";
import { iconAddPath } from "../../assets/icon";
import StatusModal from "../../components/StatusModal";

// 此頁面的路由到app.tsx寫成edit:id才能用useParam()抓從主頁面navigate到edit的ID

interface IEditProps {
  urlList: ISingleUrlList | null;
  urlID: string;
  setToggleModal: (value: React.SetStateAction<InitialToggleModal>) => void;
}

const Edit = ({ urlID, urlList, setToggleModal }: IEditProps): JSX.Element => {
  // const [editInfo, setEditInfo] = useState(initialEditInfo)
  const [tages, setTages] = useState<string[]>([]);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    photo: "",
  });
  const { pendingResult, setPendingStatus } = usePendingStatus();

  useEffect(() => {
    setTages(
      (urlList?.tag as string[]).map((item) => (item !== undefined ? item : ""))
    );
  }, []);

  const deleteTags = (tag: string): void => {
    setTages(tages.filter((item) => item !== tag));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-black/50"
    >
      <div
        className={`${
          Object.values(pendingResult).includes(true) ? "show" : "close"
        } z-10`}
      >
        <StatusModal pendingResult={pendingResult} />
      </div>
      <div
        className={`lg-Pseudo box-shadow relative -mt-10 mb-10 flex w-4/5 flex-col items-center justify-between border-2 bg-white sm:w-1/2 lg:w-1/3 ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
      >
        <button
          type="button"
          onClick={() => {
            setToggleModal((prevState) => ({
              ...prevState,
              showEditModal: false,
              urlID: "",
            }));
          }}
          className="absolute right-3 top-3 font-sans text-2xl font-bold"
        >
          X
        </button>
        <form className="grid w-full gap-y-7 px-12 py-14">
          {/* 這裡記得需下判斷更改前與更改後的內容若相同則不發出 */}
          <div>
            <p>
              標題
              {/* {editForm.title !== "" && (
                <span className="text-xs text-red-700">
                  標題與描述必須同時一起送出
                </span>
              )} */}
            </p>

            <input
              type="text"
              placeholder={urlList?.title}
              value={editForm.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditForm((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
              className="w-full rounded-lg border-2 border-slate-600 outline-none"
            />
          </div>

          <div>
            <p>描述</p>
            <input
              type="text"
              placeholder={urlList?.description}
              value={editForm.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditForm((prevState) => ({
                  ...prevState,
                  description: e.target.value,
                }))
              }
              className="w-full rounded-lg border-2 border-slate-600 outline-none"
            />
          </div>
          <div className="mb-5">
            <p>
              請輸入標籤（可選）
              {tages.length === 6 && (
                <span className="text-xs text-red-700">標籤最多6個</span>
              )}
            </p>
            <input
              type="text"
              className="w-full rounded-lg border-2 border-slate-600 outline-none"
              onKeyUp={(e: React.KeyboardEvent): void => {
                if (e.key === "Enter") {
                  console.log(tages.length);
                  if (
                    tages.length > 5 ||
                    (e.target as HTMLInputElement).value === ""
                  )
                    return;

                  if (tages.includes((e.target as HTMLInputElement).value)) {
                    setPendingStatus(
                      PendingType.isError,
                      true,
                      "不能輸入相同標籤"
                    );
                    setTimeout(() => {
                      setPendingStatus(PendingType.isError, false);
                    }, 1000);
                    return;
                  }
                  setTages([...tages, (e.target as HTMLInputElement).value]);
                  (e.target as HTMLInputElement).value = "";
                }
              }}
            />
            <div className="flex flex-wrap">
              {tages.map((tag, index) => (
                <button
                  // eslint-disable-next-line react/no-array-index-key
                  type="button"
                  key={index}
                  onClick={() => deleteTags(tag)}
                  className="tag relative m-1 rounded-md border-2 border-black bg-third px-3 hover:line-through"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          <Button
            label="新增縮圖"
            className={`${ThemeColor.Third_Pseudo} z-10 h-14 max-w-[100px] rounded-full after:rounded-full`}
            buttonColor={`${ThemeColor.Black} rounded-full text-sm`}
            underline="no-underline"
          />
        </form>
        <div className="absolute bottom-5 right-20">
          <Button
            label={
              (
                <img src={iconAddPath} alt="add" className="inline w-7" />
              ) as ReactNode
            }
            buttonColor={`${ThemeColor.Black} rounded-full border-primary`}
            underline="no-underline"
            className={`${ThemeColor.Primary_Pseudo} ml-11 h-14 max-w-[70px] rounded-full after:rounded-full`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Edit;
