import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeColor, PendingType } from "../../types/Enum";

import useApi from "../../hooks/useApi";
import type { IApiReducer } from "../../context/ApiContext";
import usePendingResult from "../../hooks/usePendingResult";

import Form from "../../components/Form";
import Button from "../../components/Button";

const initialState = {
  email: "",
  password: "",
};

export default function Login(): JSX.Element {
  const [loginInfo, setLoginInfo] = useState<typeof initialState>(initialState);
  const { state, dispatch, baseUrl }: IApiReducer = useApi();
  const { pendingResult, handleResult } = usePendingResult();
  const navigate = useNavigate();

  useEffect(() => {
    const handlePromiseResult = async (): Promise<void> => {
      const value = await state;
      console.log(value);
      if (value === undefined) return;
      handleResult(PendingType.isPending, false);
      if (value.user === undefined) {
        handleResult(PendingType.isError, true);
        setTimeout(() => {
          handleResult(PendingType.isError, false);
        }, 1000);
        return;
      }
      navigate("/home");
    };

    handlePromiseResult().catch((error) => error);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setLoginInfo((prevState: typeof initialState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (): void => {
    if (dispatch === undefined) return window.location.reload();
    console.log(loginInfo);
    return dispatch({
      type: "POST",
      payload: { url: `${baseUrl}/users/sign_up`, body: loginInfo },
    });
  };

  return (
    <>
      <div className="w-full max-w-sm md:max-w-lg lg:text-lg">
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-9 lg:h-24`}
          label={{ name: "email", description: "電子郵件" }}
          handleChange={handleChange}
        />
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-14 lg:h-24`}
          label={{ name: "password", description: "密碼" }}
          handleChange={handleChange}
        />
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
