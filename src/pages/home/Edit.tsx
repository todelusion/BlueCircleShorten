import { motion } from "framer-motion";
import React, { ReactNode, useEffect, useState, useRef } from "react";
import { AxiosResponse } from "axios";
import { ISingleUrlList } from "../../types/Schema";

import useApi from "../../hooks/useApi";
import usePendingStatus from "../../hooks/usePendingStatus";
import { PendingType, ThemeColor } from "../../types/Enum";
import type { InitialToggleModal } from "./Shorten";
import Button from "../../components/Button";
import { iconAddPath } from "../../assets/icon";
import StatusModal from "../../components/StatusModal";
import axiosPOST from "../../utils/axiosPOST";
import axiosPATCH from "../../utils/axiosPATCH";
import { useHome } from "./Home";
import axiosDELETE from "../../utils/axiosDELETE";

// 此頁面的路由到app.tsx寫成edit:id才能用useParam()抓從主頁面navigate到edit的ID

interface IEditProps {
  urlList: ISingleUrlList | null;
  urlID: string;
  _id: string;
  setToggleModal: (value: React.SetStateAction<InitialToggleModal>) => void;
}

interface IImageFile {
  file: File[];
  localUrl: string;
}

const Edit = ({
  urlID,
  _id,
  urlList,
  setToggleModal,
}: IEditProps): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const { baseUrl, token } = useApi();
  const { fetchData, countsOfPages } = useHome();
  const { pendingResult, setPendingStatus } = usePendingStatus();

  const [ImageFile, setImageFile] = useState<IImageFile>();
  // console.log(ImageFile);

  const [tag, setTag] = useState<string[]>([]);
  // console.log(tag);
  const [editInfo, setEditInfo] = useState({
    title: "",
    description: "",
  });

  const FileToFormdata = async (
    file: File[]
  ): Promise<AxiosResponse | undefined> => {
    if (formRef.current === null) return undefined;
    const formData = new FormData(
      formRef !== null ? formRef.current : undefined
    );
    formData.append("photo", file[0]);

    const res = await axiosPOST({
      url: `${baseUrl}/upload/url_img`,
      formData,
      token,
    });
    return res as AxiosResponse;
  };

  const previewFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (formRef.current === null || e.target.files === null) return;

    const file = Array.from(e.target.files);
    // console.log(file[0]);

    if (file[0].size > 1048576) {
      setPendingStatus(PendingType.isError, true, "檔案不得超過1mb");
      setTimeout(() => {
        setPendingStatus(PendingType.isError, false);
      }, 1000);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file[0]);

    reader.onload = () => {
      const image = new Image();
      image.src = reader.result as string;
      image.onload = () => {
        if (image.width < image.height) {
          setPendingStatus(PendingType.isError, true, "圖片高度不得長於寬度");
          setTimeout(() => {
            setPendingStatus(PendingType.isError, false);
          }, 2000);
          return;
        }
        setImageFile({ file, localUrl: reader.result as string });
      };
    };
  };

  const onSubmit = async (): Promise<void> => {
    if (editInfo.title !== "" && editInfo.description === "") return;
    if (editInfo.title === "" && editInfo.description !== "") return;
    setPendingStatus(PendingType.isPending, true);

    let body = {};
    if (ImageFile !== undefined) {
      const res = await FileToFormdata(ImageFile.file).catch((err) =>
        console.log(err)
      );
      const photo = (res as unknown as AxiosResponse).data.imgUrl;

      if (photo === undefined) {
        setPendingStatus(
          PendingType.isError,
          true,
          "無法上傳重複的圖片且無法在短時間內重複上傳圖片"
        );
        setTimeout(() => {
          setPendingStatus(PendingType.isError, false);
        }, 2000);
        return;
      }
      body = { ...editInfo, photo };
    } else {
      body = editInfo;
    }
    console.log(tag);

    // axiosPOST({
    //   url: `${baseUrl}/url/${_id}/tag`,
    //   body: { tag },
    //   token,
    // }).catch((err) => console.log(err));

    axiosPATCH({ url: `${baseUrl}/url/${_id}`, body, token }).catch((err) =>
      console.log(err)
    );
    fetchData(countsOfPages.currentPage).catch((err) => console.log(err));
    setPendingStatus(PendingType.isPending, false);
    setToggleModal((prevState) => ({ ...prevState, showEditModal: false }));
  };

  const addTags = (e: React.KeyboardEvent): void => {
    const singleTagValue = (e.target as HTMLInputElement).value;

    if (tag.length > 5 || singleTagValue === "") return;

    if (tag.includes(singleTagValue)) {
      setPendingStatus(PendingType.isError, true, "不能輸入相同標籤");
      setTimeout(() => {
        setPendingStatus(PendingType.isError, false);
      }, 1000);
      return;
    }

    setPendingStatus(PendingType.isPending, true);
    axiosPOST({
      url: `${baseUrl}/url/${_id}/tag`,
      body: { tag: [singleTagValue] },
      token,
    })
      .then((res) => {
        console.log(res);
        setPendingStatus(PendingType.isPending, false);
        setTag([...tag, singleTagValue]);
      })
      .catch((err) => console.log(err));

    (e.target as HTMLInputElement).value = "";
  };

  const deleteTags = (singleTag: string): void => {
    setPendingStatus(PendingType.isPending, true);

    axiosDELETE({
      url: `${baseUrl}/url/${_id}/tag`,
      token,
      tag: [singleTag],
    })
      .then((res) => {
        console.log(res);
        setPendingStatus(PendingType.isPending, false);
        setTag(tag.filter((item) => item !== singleTag));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setTag(
      (urlList?.tag as string[]).map((item) => (item !== undefined ? item : ""))
    );
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed left-0 right-0 top-0 bottom-0 flex items-center justify-center bg-black/50 pt-20"
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
            fetchData(countsOfPages.currentPage).catch((err) =>
              console.log(err)
            );
          }}
          className="absolute right-3 top-3 font-sans text-2xl font-bold"
        >
          X
        </button>
        <div className="grid w-full gap-y-7 px-6 py-10 xs:py-14 xs:px-12">
          {/* 這裡記得需下判斷更改前與更改後的內容若相同則不發出 */}
          <div>
            <p>
              標題
              {editInfo.title !== "" && editInfo.description === "" && (
                <span className="ml-2 text-xs text-primary">
                  提醒：標題與描述必須同時不得為空
                </span>
              )}
            </p>

            <input
              type="text"
              placeholder={urlList?.title}
              value={editInfo.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditInfo((prevState) => ({
                  ...prevState,
                  title: e.target.value,
                }))
              }
              className="w-full rounded-lg border-2 border-slate-600 outline-none"
            />
          </div>

          <div>
            <p>
              描述
              {editInfo.title === "" && editInfo.description !== "" && (
                <span className="ml-2 text-xs text-primary">
                  提醒：標題與描述必須同時不得為空
                </span>
              )}
            </p>
            <input
              type="text"
              placeholder={urlList?.description}
              value={editInfo.description}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEditInfo((prevState) => ({
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
              {tag.length === 6 && (
                <span className="text-xs text-red-700">標籤最多6個</span>
              )}
            </p>
            <input
              type="text"
              className="w-full rounded-lg border-2 border-slate-600 outline-none"
              onKeyUp={(e: React.KeyboardEvent): void => {
                if (e.key !== "Enter") return;
                addTags(e);
              }}
            />
            <div className="flex flex-wrap">
              {tag.map((singleTag, index) => (
                <button
                  type="button"
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  onClick={() => deleteTags(singleTag)}
                  className="relative m-1 rounded-lg border-2 border-black bg-slate-600 px-2 py-1 text-xs text-white hover:line-through"
                >
                  {singleTag}
                </button>
              ))}
            </div>
          </div>
          <form ref={formRef}>
            <input
              type="file"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                previewFile(e);
              }}
              className="text-grey-500
                pointer-events-none
                mb-10
                text-xs
                file:pointer-events-auto
                file:mr-5
                file:cursor-pointer
                file:rounded-full
                file:border-2
                file:border-black
                file:p-4 file:text-xs hover:file:bg-third"
            />
            {ImageFile !== undefined && ImageFile.localUrl !== "" && (
              <img
                src={ImageFile.localUrl}
                alt="preview"
                className="max-w-[100px] xs:max-w-[200px]"
              />
            )}
          </form>
        </div>
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
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Edit;
