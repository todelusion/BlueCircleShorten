import React from "react";

import { Link } from "react-router-dom";

import { ThemeColor } from "../../types/Enum";

import useApi from "../../hooks/useApi";

import Form from "../../components/Form";

import Button from "../../components/Button";

export default function FindPassword(): JSX.Element {
  const { dispatch } = useApi();
  return (
    <>
      <div className="max-h-screen w-full max-w-sm py-10 md:max-w-lg lg:pt-16 lg:text-base">
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-10 w-max font-serif text-lg font-black`}
          label={{ description: "修改密碼" }}
          input="hidden"
        />
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-10`}
          label={{ name: "password", description: "新密碼" }}
        />
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-10`}
          label={{ name: "confirmPassword", description: "確認新密碼" }}
        />
        <div className="mb-10 flex justify-start">
          <Button
            label="送出"
            buttonColor={ThemeColor.Primary}
            underline="no-underline"
            className={`${ThemeColor.Primary_Pseudo} h-10 max-w-[70px] text-sm md:h-14`}
          />
        </div>
      </div>
    </>
  );
}
