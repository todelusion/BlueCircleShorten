import React, { ReactNode, useEffect, useState } from "react";
import { Outlet, useOutletContext, useLocation } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import { AnimatePresence } from "framer-motion";
import Form from "../../components/Form";

import { PendingType, ThemeColor } from "../../types/Enum";
import { UrlLists, schemaUrlLists, schemaUrl } from "../../types/Schema";

import { iconAddPath } from "../../assets/icon";
import Button from "../../components/Button";
import axiosGET from "../../utils/axiosGET";
import useApi from "../../hooks/useApi";
import usePendingStatus from "../../hooks/usePendingStatus";
import StatusModal from "../../components/StatusModal";
import axiosPOST from "../../utils/axiosPOST";
import axiosDELETE from "../../utils/axiosDELETE";

// type UrlListsType = { type:"SET_URLLISTS",  }

// const urlListsReducer = (urlLists: any, action) => {
//   switch(action.)
// }
interface HomeContext {
  fetchData: (pageNum?: number) => Promise<void>;
  urlLists: UrlLists | null;
  onDelete: (urlID: string) => Promise<void>;
}

const initialCountsOfPages = {
  amountOfPages: [1],
  currentPage: 1,
};

export const initialUrlInfo = {
  url: "",
  title: "",
  photo: "",
  description: "",
};

const Home = (): JSX.Element => {
  const location = useLocation();
  const { baseUrl, token } = useApi();
  const { pendingResult, setPendingStatus } = usePendingStatus();
  // const [urlLists, dispatch] = useReducer(urlListsReducer, []);
  const [countsOfPages, setCountsOfPages] = useState(initialCountsOfPages);
  const [urlLists, setUrlLists] = useState<UrlLists | null>(null);
  const [urlInfo, setUrlInfo] = useState(initialUrlInfo);

  const fetchData = async (pageNum?: number): Promise<void> => {
    console.log(pageNum);
    setPendingStatus(PendingType.isPending, true);
    try {
      // 取得全部頁面數//
      const AllListsRes = await axiosGET({ url: `${baseUrl}/url/list`, token });
      const numOfPages = Math.ceil(
        (AllListsRes.data.urlList as any[]).length / 4
      );
      const arr: number[] = [];
      for (let i = 1; i <= numOfPages; i += 1) {
        arr.push(i);
      }
      setCountsOfPages((prevState) => ({ ...prevState, amountOfPages: arr }));

      // 透過qeury params取得單一列表資訊//
      const res = await axiosGET({
        url: `${baseUrl}/url?page=${
          pageNum === undefined ? "1" : pageNum
        }&limit=4&sort=asc`,
        token,
      });
      setPendingStatus(PendingType.isPending, false);
      // console.log(res);
      setUrlLists(schemaUrlLists.parse(res.data));
    } catch (error) {
      setPendingStatus(PendingType.isPending, false);
      setPendingStatus(PendingType.isError, true, "系統錯誤請重新登入");
      setTimeout(() => {
        setPendingStatus(PendingType.isError, false);
      }, 1000);
    }
  };

  // const query = useParams();
  // console.log(query);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUrlInfo((prevState: typeof initialUrlInfo) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = async (): Promise<void> => {
    const { url } = urlInfo;
    try {
      schemaUrl.parse(url);
    } catch (error) {
      setPendingStatus(PendingType.isError, true, "url格式錯誤");
      setTimeout(() => {
        setPendingStatus(PendingType.isError, false);
      }, 1000);
      return;
    }

    setPendingStatus(PendingType.isPending, true);
    const errorRes = await axiosPOST({
      url: `${baseUrl}/url`,
      body: { url },
      token,
    });
    setPendingStatus(PendingType.isPending, false);
    if ((errorRes as AxiosError).response?.status === 400) {
      setPendingStatus(PendingType.isError, true, "重複的網址");
      setTimeout(() => {
        setPendingStatus(PendingType.isError, false);
      }, 1000);
      return;
    }

    await fetchData(countsOfPages.currentPage).catch((error) =>
      console.log(error)
    );
    setPendingStatus(PendingType.isSuccess, true, "添加成功！");
    setTimeout(() => {
      setPendingStatus(PendingType.isSuccess, false);
    }, 1000);
    setUrlInfo((prevSate) => ({ ...prevSate, url: "" }));
  };

  const onDelete = async (urlID: string): Promise<void> => {
    try {
      setPendingStatus(PendingType.isPending, true);
      await axiosDELETE({ url: `${baseUrl}/url/${urlID}`, token });
    } catch (error) {
      console.log(error);
    }
    try {
      await fetchData(countsOfPages.currentPage);
    } catch (error) {
      console.log(error);
    }
  };

  const onSwitchPage = (e: React.MouseEvent): void => {
    const clickNum = (e.target as HTMLInputElement | HTMLButtonElement).value;

    setCountsOfPages((prevState) => ({
      ...prevState,
      currentPage: Number(clickNum),
    }));
    setPendingStatus(PendingType.isPending, true);

    axiosGET({
      url: `${baseUrl}/url?page=${clickNum}&limit=4&sort=asc`,
      token,
    })
      .then((res) => {
        setPendingStatus(PendingType.isPending, false);
        setUrlLists(schemaUrlLists.parse(res.data));
      })
      .catch((error) => {
        throw error;
      });
  };

  useEffect(() => {
    fetchData().catch((error) => {
      throw error;
    });
  }, []);

  return (
    <>
      <div
        className={`${
          Object.values(pendingResult).includes(true) ? "show" : "close"
        } z-10`}
      >
        <StatusModal pendingResult={pendingResult} />
      </div>
      <ul className="absolute top-10 w-full max-w-2xl px-3">
        <li className="border2 mb-10 flex justify-center">
          <Form
            className={`h-max w-full rounded-full  ${ThemeColor.Slate_Pseudo} after:rounded-full `}
            label={{ name: "url", description: "TEST" }}
            hideLabel="hidden"
            handleChange={handleChange}
            onSubmit={onSubmit}
            urlInfo={urlInfo}
          />
          <Button
            label={
              (
                <img src={iconAddPath} alt="add" className="inline w-7" />
              ) as ReactNode
            }
            buttonColor={`${ThemeColor.Black} rounded-full`}
            underline="no-underline"
            className={`${ThemeColor.Primary_Pseudo} ml-11 h-14 max-w-[70px] rounded-full after:rounded-full`}
            onSubmit={onSubmit}
          />
        </li>
        <li className="ml-5 flex">
          <Form
            className="w-full max-w-[100px] xs:max-w-[200px]"
            label={{ name: "TEST", description: "TEST" }}
            hideLabel="hidden"
            showSearchIcon
            showOutline={false}
            input="bg-[#F5F5F5]"
          />
          <div className="ml-10 md:ml-20">
            {countsOfPages.amountOfPages.map((num, index, array) => (
              <React.Fragment key={num}>
                {index === countsOfPages.currentPage - 3 ? (
                  <button
                    type="button"
                    value="1"
                    onClick={(e) => onSwitchPage(e)}
                  >
                    ...
                  </button>
                ) : (
                  ""
                )}
                <input
                  type="button"
                  value={num}
                  onClick={(e) => onSwitchPage(e)}
                  className={`${
                    countsOfPages.currentPage === index + 1 ? "bg-third" : ""
                  }${
                    index >= countsOfPages.currentPage - 3 &&
                    index < countsOfPages.currentPage + 2
                      ? ""
                      : "hidden"
                  } relative cursor-pointer rounded-xl px-3 underline`}
                />
                <span>
                  {index === countsOfPages.currentPage + 1 ? (
                    <button
                      type="button"
                      value={array.length}
                      onClick={(e) => onSwitchPage(e)}
                    >
                      ...
                    </button>
                  ) : (
                    ""
                  )}
                </span>
              </React.Fragment>
            ))}
          </div>
        </li>
      </ul>
      <Outlet context={{ urlLists, onDelete, fetchData }} />
    </>
  );
};

export function useHome(): HomeContext {
  return useOutletContext<HomeContext>();
}

export default Home;
