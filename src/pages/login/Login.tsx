import React, { useState } from "react";

import { Link } from "react-router-dom";

import ThemeColor from "../../types/Enum";

import useApi from "../../hooks/useApi";

import Form from "../../components/Form";

import Button from "../../components/Button";

interface Contex {
  api?: {
    baseUrl: string;
    token: string;
  };
}
interface LoginInfo {
  email?: string;
  password?: string;
}

export default function Login(): JSX.Element {
  const [loginInfo, setLoginInfo] = useState<LoginInfo>({});
  const api: Contex = useApi();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginInfo((prevState): LoginInfo => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (): void => {
    console.log(api);
    console.log(loginInfo);
  };

  return (
    <>
      <div className="w-full max-w-sm md:max-w-lg lg:text-lg">
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-9 lg:h-24`}
          label={{ name: "email", description: "電子郵件" }}
          handleChange={handleChange}
        />
        {loginInfo.email}
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-14 lg:h-24`}
          label={{ name: "password", description: "密碼" }}
          handleChange={handleChange}
        />
        {loginInfo.password}
        <div className="mb-10 flex items-end justify-between">
          <Link
            to="/regist"
            className="h-11 w-full max-w-[50px] md:h-14 md:max-w-[70px]"
          >
            <Button
              label="註冊"
              buttonColor={ThemeColor.Primary}
              underline="underline"
              className={`${ThemeColor.Primary_Pseudo}  text-sm`}
            />
          </Link>
          <Button
            onSubmit={onSubmit}
            label="登入"
            buttonColor={ThemeColor.Black}
            underline="no-underline"
            className={`${ThemeColor.Slate_Pseudo} h-16 max-w-[100px] md:h-20`}
          />
        </div>
        <Link to="/findpassword">
          <button
            type="button"
            className="ml-1 w-full text-left text-xs text-primary underline lg:text-sm"
          >
            ...忘記密碼
          </button>
        </Link>
      </div>
    </>
  );
}
