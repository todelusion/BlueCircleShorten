import { createContext } from "react";

interface ApiProps {
  children: JSX.Element;
}

const api = {
  baseUrl: "test",
  token: "test",
};
export const ApiContext = createContext({});

export const ApiProvider = ({ children }: ApiProps): JSX.Element => (
  <ApiContext.Provider value={api}>{children}</ApiContext.Provider>
);
