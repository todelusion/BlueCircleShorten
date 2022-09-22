import React from "react";

import useApi from "../hooks/useApi";

import Form from "../components/Form";

interface Contex {
  api?: {
    baseUrl: string;
    token: string;
  };
}

export default function Login(): JSX.Element {
  const api: Contex = useApi();
  console.log(api);
  return <div></div>;
}
