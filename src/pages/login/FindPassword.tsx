import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PendingType, ThemeColor } from "../../types/Enum";
import useApi from "../../hooks/useApi";
import Form from "../../components/Form";
import Button from "../../components/Button";

import type { IApiReducer } from "../../context/ApiContext";

import handlePromiseResult from "../../utils/handlePromiseResult";
import usePendingStatus from "../../hooks/usePendingStatus";
import { RegExpEmail } from "../../utils/RegExp";
import PendingResultModal from "../../components/PendingResultModal";

const initialState = {
  email: "",
};

export default function FindPassword(): JSX.Element {
  const [findPasswordInfo, setFindPasswordInfo] =
    useState<typeof initialState>(initialState);

  const { state, dispatch, baseUrl }: IApiReducer = useApi();
  const { pendingResult, setPendingStatus } = usePendingStatus();
  const navigate = useNavigate();

  useEffect(() => {
    handlePromiseResult({
      state,
      setPendingStatus,
      navigate,
      path: "/findpassword/success",
    }).catch((error) => error);
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFindPasswordInfo((prevState: typeof initialState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmit = (): void => {
    if (dispatch === undefined) return window.location.reload();
    console.log(findPasswordInfo);
    if (findPasswordInfo.email.match(RegExpEmail) === null) return;
    setPendingStatus(PendingType.isPending, true);
    return dispatch({
      type: "POST",
      payload: { url: `${baseUrl}/users/forget`, body: findPasswordInfo },
    });
  };
  // console.log(findPasswordInfo);
  return (
    <>
      <div
        className={
          Object.values(pendingResult).includes(true) ? "show" : "close"
        }
      >
        <PendingResultModal pendingResult={pendingResult} />
      </div>
      <div className="max-h-screen w-full max-w-sm py-10 md:max-w-lg lg:pt-16 lg:text-base">
        <div>
          <Form
            className={`${ThemeColor.Slate_Pseudo} mb-10 w-max font-serif text-lg font-black`}
            label={{ description: "忘記密碼" }}
            input="hidden"
          />
          <Form
            className={`${ThemeColor.Slate_Pseudo} mb-10`}
            label={{ name: "email", description: "電子郵件" }}
            handleChange={handleChange}
            errorHint={{
              status: findPasswordInfo.email.match(RegExpEmail) === null,
              message: "請輸入正確的電子郵件格式",
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
                  buttonColor={ThemeColor.Primary}
                  underline="underline"
                  className={`${ThemeColor.Primary_Pseudo} text-sm`}
                  onReset={() => dispatch({ type: "RESET" })}
                />
              </Link>
            </div>
            <Button
              label="送出"
              buttonColor={ThemeColor.Black}
              underline="no-underline"
              className={`${ThemeColor.Slate_Pseudo} h-16 w-full max-w-[100px] md:h-20`}
              onSubmit={onSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
