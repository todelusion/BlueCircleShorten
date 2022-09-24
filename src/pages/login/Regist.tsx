import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

const RegExpEmail = /^[a-zA-Z_-\d]+@[a-zA-Z_-\d]+(\.[a-zA-Z_-\d]+)+$/g;
const RegExpPassword = /^(?![a-zA-Z\d]+$)(?![a-z\W\d_]+$)[a-zA-Z\d_\W]{8,32}$/g;

export default function Login(): JSX.Element {
  // react hooks
  const [RegistInfo, setRegistInfo] =
    useState<typeof initialState>(initialState);
  const { state, resData, dispatch, baseUrl }: IApiReducer = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    // if (resData !== undefined && resData.status === "success") navigate("/");
    void state.then((res) => {
      console.log(res);
      // alert("請填寫正確資訊");
    });
  }, [state]);

  // function expression
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setRegistInfo((prevState: typeof initialState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (): void => {
    if (dispatch === undefined) return window.location.reload();
    console.log(RegistInfo);
    const res = dispatch({
      type: "POST",
      payload: { url: `${baseUrl}/users/sign_up`, body: RegistInfo },
    });
    return console.log(res);
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
          errorHint={{
            status: RegistInfo.email.match(RegExpEmail) === null,
            message: "請輸入正確的電子郵件格式",
          }}
        />
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-10`}
          label={{ name: "name", description: "姓名" }}
          handleChange={handleChange}
          errorHint={{
            status: RegistInfo.name.length === 0,
            message: "請輸入姓名",
          }}
        />
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-10`}
          label={{ name: "password", description: "密碼" }}
          handleChange={handleChange}
          errorHint={{
            status: RegistInfo.password.match(RegExpPassword) === null,
            message: "｜密碼至少8個字元以上｜包含1個大小與1個特殊字元｜",
          }}
        />
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-5`}
          label={{ name: "confirmPassword", description: "確認密碼" }}
          handleChange={handleChange}
          errorHint={{
            status:
              RegistInfo.password !== RegistInfo.confirmPassword ||
              RegistInfo.confirmPassword.length === 0,
            message: "請確認密碼是否一致",
          }}
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
