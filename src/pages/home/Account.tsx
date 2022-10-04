import { motion } from "framer-motion";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { AxiosResponse } from "axios";
import { schemaProfileData, IProfileData } from "../../types/Schema";
import StatusModal from "../../components/StatusModal";
import useApi from "../../hooks/useApi";
import usePendingStatus from "../../hooks/usePendingStatus";
import { PendingType, ThemeColor } from "../../types/Enum";
import axiosGET from "../../utils/axiosGET";
import Button from "../../components/Button";
import { iconAddPath } from "../../assets/icon";
import axiosPOST from "../../utils/axiosPOST";
import axiosPATCH from "../../utils/axiosPATCH";

interface IAccountProps {
  setToggleAccountsModal: (value: React.SetStateAction<boolean>) => void;
}
interface IImageFile {
  file: File[];
  localUrl: string;
}
interface IAccountInfo {
  name: string;
}

const Account = ({ setToggleAccountsModal }: IAccountProps): JSX.Element => {
  const formRef = useRef<HTMLFormElement>(null);
  const { pendingResult, setPendingStatus } = usePendingStatus();
  const [ImageFile, setImageFile] = useState<IImageFile>();

  const [accountInfo, setAccountInfo] = useState<IAccountInfo>({
    name: "",
  });

  const [profileData, setProfileData] = useState<IProfileData | null>(null);
  const { baseUrl, token } = useApi();
  console.log(profileData);

  const fetchProfileData = async (): Promise<void> => {
    setPendingStatus(PendingType.isPending, true);
    const res = await axiosGET({ url: `${baseUrl}/users/profile`, token });
    setPendingStatus(PendingType.isPending, false);
    setProfileData(schemaProfileData.parse(res.data));
  };

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

  const onSubmit = async (): Promise<void> => {
    if (accountInfo.name === "") {
      setPendingStatus(PendingType.isError, true, "名稱不得重複");
      setTimeout(() => {
        setPendingStatus(PendingType.isError, false);
      }, 1000);
      return;
    }
    setPendingStatus(PendingType.isPending, true);

    let body = {};
    console.log(ImageFile !== undefined);

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

      body = { ...accountInfo, photo };
    } else {
      body = accountInfo;
    }

    await axiosPATCH({ url: `${baseUrl}/users/profile`, body, token });
    await fetchProfileData();
    setPendingStatus(PendingType.isPending, false);
    setToggleAccountsModal(false);
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

  useEffect(() => {
    fetchProfileData().catch((err) => console.log(err));
  }, []);

  if (profileData === null)
    return (
      <div className="fixed left-0 right-0 top-0 bottom-0 z-20 flex items-center justify-center">
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
      className="fixed top-0 bottom-0 left-0 right-0 z-20 flex items-center justify-center bg-black/50"
    >
      <div
        className={`${
          Object.values(pendingResult).includes(true) ? "show" : "close"
        } z-20`}
      >
        <StatusModal pendingResult={pendingResult} />
      </div>
      <div
        className={`lg-Pseudo box-shadow relative -mt-10 mb-10 flex w-4/5 flex-col items-center justify-between border-2 bg-white py-20 px-5 md:w-1/3  ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
      >
        <button
          type="button"
          onClick={() => setToggleAccountsModal(false)}
          className="absolute right-3 top-3 font-sans text-2xl font-bold"
        >
          X
        </button>
        <div className="mb-20 h-10 w-full max-w-[100px] text-center">
          <p className="text-sm">你的名稱</p>
          <p className="mb-5 font-black text-primary">
            {profileData.user.name}
          </p>
          <input
            // defaultValue={profileData.user.name}
            className="w-full border-b-2 border-primary font-black text-primary outline-none"
            onChange={(e) => {
              setAccountInfo(() => ({
                name: e.target.value,
              }));
            }}
          />
        </div>
        <div>
          <p className="mb-5 text-center text-sm">大頭照</p>
          <img
            src={
              ImageFile !== undefined
                ? ImageFile.localUrl
                : profileData.user.photo
            }
            alt="preview"
            className="max-w-[100px] xs:max-w-[200px]"
          />
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
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Account;
