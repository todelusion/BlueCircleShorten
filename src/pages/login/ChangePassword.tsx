import React from "react";

import { Link } from "react-router-dom";

import { ThemeColor } from "../../types/Enum";

import useApi from "../../hooks/useApi";

import Form from "../../components/Form";

import Button from "../../components/Button";

interface Contex {
  api?: {
    baseUrl: string;
    token: string;
  };
}

export default function FindPassword(): JSX.Element {
  const api: Contex = useApi();
  console.log(api);
  return (
    <>
      <div className="max-h-screen w-full max-w-sm py-10 md:max-w-lg lg:pt-16 lg:text-base">
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-10 w-max font-serif text-lg font-black`}
          label="修改密碼"
          input="hidden"
        />
        <Form className={`${ThemeColor.Slate_Pseudo} mb-10`} label="新密碼" />
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-10`}
          label="確認新密碼"
        />
        <div className="mb-10 flex items-end justify-between">
          <div className="flex w-full items-end">
            <Link
              to="/"
              className="h-11 w-full max-w-[50px] md:h-14 md:max-w-[70px]"
            >
              <Button
                label="返回"
                buttonColor={ThemeColor.Primary}
                underline="underline"
                className={`${ThemeColor.Primary_Pseudo} text-sm`}
              />
            </Link>
          </div>
          <Button
            label="送出"
            buttonColor={ThemeColor.Black}
            underline="no-underline"
            className={`${ThemeColor.Slate_Pseudo} h-16 max-w-[100px] md:h-20`}
          />
        </div>
      </div>
    </>
  );
}
