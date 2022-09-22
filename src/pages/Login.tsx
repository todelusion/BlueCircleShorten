import React from "react";

import useApi from "../hooks/useApi";

import Form from "../components/Form";

import LogoPath from "../assets/logo.svg";

interface Contex {
  api?: {
    baseUrl: string;
    token: string;
  };
}

export default function Login(): JSX.Element {
  const api: Contex = useApi();
  console.log(api);
  return (
    <div>
      <img src={LogoPath} alt="LOGO" className="mt-3 ml-3 w-40" />
      <div className="flex flex-col items-center px-8">
        <Form
          className="mt-5 w-full max-w-sm"
          label="電子郵件"
          type="text"
          border="border-b-2"
        />
        <Form
          className="mt-5 w-full max-w-sm"
          label="密碼"
          type="text"
          border="border-b-2"
        />

        {/* 登入component */}
      </div>
    </div>
  );
}
