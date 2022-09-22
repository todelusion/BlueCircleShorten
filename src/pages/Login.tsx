import React from "react";

import ThemeColor from "../types/Enum";

import useApi from "../hooks/useApi";

import LogoPath from "../assets/logo.svg";

import Form from "../components/Form";

import Button from "../components/Button";

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
    <>
      <img
        src={LogoPath}
        alt="LOGO"
        className="mt-3 ml-3 mb-12 w-32 md:w-44 lg:hidden"
      />
      <div className="flex items-center justify-center px-8 lg:h-screen">
        <img src={LogoPath} alt="LOGO" className="mr-32 hidden w-72 lg:block" />
        <div className="w-full max-w-sm md:max-w-lg lg:text-lg">
          <Form
            className={`${ThemeColor.Slate_Pseudo} mb-9`}
            label="電子郵件"
          />
          <Form className={`${ThemeColor.Slate_Pseudo} mb-14`} label="密碼" />
          <div className="mb-16 flex items-end justify-between">
            <Button
              label="註冊"
              buttonColor={ThemeColor.Primary}
              underline="underline"
              className={`${ThemeColor.Primary_Pseudo} h-11 max-w-[50px] text-sm md:h-14 md:max-w-[70px]`}
            />
            <Button
              label="登入"
              buttonColor={ThemeColor.Black}
              underline="no-underline"
              className={`${ThemeColor.Slate_Pseudo} h-16 max-w-[100px] md:h-20`}
            />
          </div>
          <input
            type="button"
            value="...忘記密碼"
            className="ml-1 w-full text-left text-xs text-primary underline lg:text-sm"
          />
        </div>
      </div>
    </>
  );
}
