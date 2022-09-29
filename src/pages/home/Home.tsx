import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from "react";
import {
  Outlet,
  useOutletContext,
  useParams,
  useSearchParams,
} from "react-router-dom";
import Form from "../../components/Form";

import { PendingType, ThemeColor } from "../../types/Enum";
import { UrlLists, schemaUrlLists } from "../../types/Schema";

import { iconAddPath } from "../../assets/icon";
import Button from "../../components/Button";
import axiosGET from "../../utils/axiosGET";
import useApi from "../../hooks/useApi";
import usePendingStatus from "../../hooks/usePendingStatus";
import StatusModal from "../../components/StatusModal";

// type UrlListsType = { type:"SET_URLLISTS",  }

// const urlListsReducer = (urlLists: any, action) => {
//   switch(action.)
// }
interface HomeContext {
  urlLists: UrlLists | null;
}

const initialState = {
  url: "",
  title: "",
  photo: "",
  description: "",
};

const Home = (): JSX.Element => {
  const { baseUrl, token } = useApi();
  const { pendingResult, setPendingStatus } = usePendingStatus();
  // const [urlLists, dispatch] = useReducer(urlListsReducer, []);

  const [countsOfPages, setCountsOfPages] = useState<number[]>([]);
  const [urlLists, setUrlLists] = useState<UrlLists | null>(null);
  const [urlInfo, setUrlInfo] = useState(initialState);

  // const query = useParams();
  // console.log(query);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUrlInfo((prevState: typeof initialState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // console.log(urlInfo);
  const fetchData = async (): Promise<void> => {
    setPendingStatus(PendingType.isPending, true);
    try {
      // 取得全部頁面數
      const AllListsRes = await axiosGET({ url: `${baseUrl}/url/list`, token });
      const numOfPages = Math.ceil(
        (AllListsRes.data.urlList as any[]).length / 4
      );
      const arr = [];
      for (let i = 1; i <= numOfPages; i += 1) {
        arr.push(i);
      }
      setCountsOfPages(arr);

      // 透過qeury params取得單一列表資訊
      const res = await axiosGET({
        url: `${baseUrl}/url?page=1&limit=4&sort=asc`,
        token,
      });
      setPendingStatus(PendingType.isPending, false);
      // console.log(res);
      setUrlLists(schemaUrlLists.parse(res.data));
    } catch (error) {
      setPendingStatus(PendingType.isPending, false);
      setPendingStatus(PendingType.isError, true);
      setTimeout(() => {
        setPendingStatus(PendingType.isError, false);
      }, 1000);
    }
  };

  useEffect(() => {
    fetchData().catch((error) => {
      throw error;
    });
  }, []);

  return (
    <>
      <div
        className={
          Object.values(pendingResult).includes(true) ? "show" : "close"
        }
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
            {countsOfPages.map((num) => (
              <input
                key={num}
                type="button"
                value={num}
                onClick={(e: React.MouseEvent<HTMLInputElement>) => {
                  const clickNum = (e.target as HTMLInputElement).value;
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
                }}
                className="cursor-pointer px-3 underline"
              />
            ))}
          </div>
        </li>
      </ul>

      <Outlet context={{ urlLists }} />
    </>
  );
};

export function useHome(): HomeContext {
  return useOutletContext<HomeContext>();
}

export default Home;
