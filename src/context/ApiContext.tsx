import { createContext } from "react";

interface Props {
  children: JSX.Element;
}

const api = {
  baseUrl: "https://fast-headland-09301.herokuapp.com/",
  token: null,
};

export const ApiContext = createContext({});

export const ApiProvider = ({ children }: Props): JSX.Element => {
  // 允許撰寫客製邏輯
  console.log("inside ApiProvider...");
  return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
