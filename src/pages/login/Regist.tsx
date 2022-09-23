import React, { useState } from "react";
import { Link } from "react-router-dom";

import ThemeColor from "../../types/Enum";
import type { IApiReducer } from "../../context/ApiContext";

import useApi from "../../hooks/useApi";
import Form from "../../components/Form";
import Button from "../../components/Button";

const initialState = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
};

export default function Login(): JSX.Element {
  const [RegistInfo, setRegistInfo] =
    useState<typeof initialState>(initialState);

  const { state, dispatch, baseUrl }: IApiReducer = useApi();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setRegistInfo((prevState: typeof initialState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  if (dispatch === undefined) return <h1>Loading</h1>;

  const onSubmit = (): void => {
    console.log(RegistInfo);
    dispatch({
      type: "POST",
      payload: { url: `${baseUrl}/users/sign_up`, body: RegistInfo },
    });
  };

  return (
    <>
      <div className="max-h-screen w-full max-w-sm py-10 md:max-w-lg lg:pt-16 lg:text-base">
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-10 w-max font-serif text-lg font-black`}
          label={{ name: "註冊會員", description: "註冊會員" }}
          input="hidden"
          handleChange={handleChange}
        />
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-10`}
          label={{ name: "email", description: "電子郵件" }}
          handleChange={handleChange}
        />
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-10`}
          label={{ name: "name", description: "姓名" }}
          handleChange={handleChange}
        />
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-10`}
          label={{ name: "password", description: "密碼" }}
          handleChange={handleChange}
        />
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-5`}
          label={{ name: "confirmPassword", description: "確認密碼" }}
          handleChange={handleChange}
        />
        <div className="mb-10 flex items-end justify-between">
          <div className="flex w-full items-end">
            <Link
              to="/"
              className="h-11 w-full max-w-[50px] md:h-14 md:max-w-[70px]"
            >
              <Button
                label="返回"
                buttonColor={ThemeColor.Black}
                underline="underline"
                className={`${ThemeColor.Slate_Pseudo} text-sm`}
              />
            </Link>
          </div>
          <Button
            label="送出"
            buttonColor={ThemeColor.Primary}
            underline="no-underline"
            className={`${ThemeColor.Primary_Pseudo} h-16 max-w-[100px] md:h-20`}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </>
  );
}
