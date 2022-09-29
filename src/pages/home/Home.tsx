import React, { ReactNode, useEffect, useReducer, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
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

const Home = (): JSX.Element => {
  const { baseUrl, token } = useApi();
  const { pendingResult, setPendingStatus } = usePendingStatus();
  const [urlLists, setUrlLists] = useState<UrlLists | null>(null);
  // const [urlLists, dispatch] = useReducer(urlListsReducer, []);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      setPendingStatus(PendingType.isPending, true);
      try {
        const res = await axiosGET({ url: `${baseUrl}/url/list`, token });
        setPendingStatus(PendingType.isPending, false);
        console.log(res);
        setUrlLists(schemaUrlLists.parse(res.data));
      } catch (error) {
        setPendingStatus(PendingType.isPending, false);
        setPendingStatus(PendingType.isError, true);
        setTimeout(() => {
          setPendingStatus(PendingType.isError, false);
        }, 1000);
      }
    };

    fetchData().catch((error) => console.log(error));
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
            label={{ name: "TEST", description: "TEST" }}
            hideLabel="hidden"
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
        <li className="ml-5">
          <Form
            className="w-full max-w-[100px] xs:max-w-[200px]"
            label={{ name: "TEST", description: "TEST" }}
            hideLabel="hidden"
            showSearchIcon
            showOutline={false}
            input="bg-[#F5F5F5]"
          />
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
