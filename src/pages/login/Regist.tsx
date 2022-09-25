import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ThemeColor, PendingType } from "../../types/Enum";
import type { IApiReducer } from "../../context/ApiContext";

import useApi from "../../hooks/useApi";
import usePendingResult from "../../hooks/usePendingResult";

import Form from "../../components/Form";
import Button from "../../components/Button";
import PenginResultModal from "../../components/PenginResultModal";

import { RegExpEmail, RegExpPassword } from "../../utils/RegExp";
import handlePromiseResult from "../../utils/handlePromiseResult";

const initialState = {
  email: "",
  name: "",
  password: "",
  confirmPassword: "",
};

export default function Login(): JSX.Element {
  // react hooks
  const [RegistInfo, setRegistInfo] =
    useState<typeof initialState>(initialState);
  const { state, dispatch, baseUrl }: IApiReducer = useApi();
  const navigate = useNavigate();
  const { pendingResult, handleResult } = usePendingResult();

  useEffect(() => {
    handlePromiseResult(state, handleResult, navigate, "/home").catch(
      (error) => error
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    console.log(RegistInfo);
    if (dispatch === undefined) return window.location.reload();
    handleResult(PendingType.isPending, true);
    return dispatch({
      type: "POST",
      payload: { url: `${baseUrl}/users/sign_up`, body: RegistInfo },
    });
  };

  return (
    <>
      <div
        className={
          Object.values(pendingResult).includes(true) ? "show" : "close"
        }
      >
        <PenginResultModal pendingResult={pendingResult} />
      </div>
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
                onReset={() => dispatch({ type: "RESET" })}
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
