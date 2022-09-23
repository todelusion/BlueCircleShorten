/* 這裡做了兩件事
1. 創建<contextComponent>
2. 回傳用<contextComponent.Provider>包裹children的JSX.Element

效益：
1. 往後只要被ApiProvider包裹的JSX都將自動視為ApiProvider底下的children
2. 可在這檔案本身撰寫全域鉤子（例如useReducer）或其他邏輯
*/

import { createContext } from "react";

// import useFetch from "../hooks/useFetch";
interface Props {
  children: JSX.Element;
}

const api = {
  baseUrl: "https://fast-headland-09301.herokuapp.com/",
  token: null,
};

export const ApiContext = createContext({});

export const ApiProvider = ({ children }: Props): JSX.Element => {
  // 撰寫useReducer
  console.log("inside ApiProvider...");
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
