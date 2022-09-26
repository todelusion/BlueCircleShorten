import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { PendingType, ThemeColor } from "../../types/Enum";

import useApi from "../../hooks/useApi";
import usePendingStatus from "../../hooks/usePendingStatus";

import handlePromiseResult from "../../utils/handlePromiseResult";
import Form from "../../components/Form";
import Button from "../../components/Button";
import PendingResultModal from "../../components/PendingResultModal";
import { RegExpPassword } from "../../utils/RegExp";

const initialState = {
  password: "",
  confirmPassword: "",
};

export default function ChangePassword(): JSX.Element {
  const [newPasswordInfo, setNewPasswordInfo] = useState(initialState);
  const { token } = useParams();
  const navigate = useNavigate();

  const { state, dispatch, baseUrl } = useApi();
  const { pendingResult, setPendingStatus } = usePendingStatus();

  useEffect(() => {
    handlePromiseResult({ state, setPendingStatus, navigate, path: "/" }).catch(
      (err) => err
    );
  }, [state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setNewPasswordInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (): void => {
    if (dispatch === undefined) return window.location.reload();
    if (
      newPasswordInfo.password.match(RegExpPassword) === null ||
      newPasswordInfo.password !== newPasswordInfo.confirmPassword ||
      newPasswordInfo.confirmPassword.length === 0
    )
      return undefined;
    setPendingStatus(PendingType.isPending, true);
    return dispatch({
      type: "PATCH",
      payload: {
        url: `${baseUrl as string}/users/updatePassword`,
        body: newPasswordInfo,
        token,
      },
    });
  };
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
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-10 w-max font-serif text-lg font-black`}
          label={{ description: "修改密碼" }}
          input="hidden"
        />
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-10`}
          label={{ name: "password", description: "新密碼" }}
          handleChange={handleChange}
          errorHint={{
            status: newPasswordInfo.password.match(RegExpPassword) === null,
            message: "｜密碼至少8個字元以上｜包含1個大小與1個特殊字元｜",
          }}
        />
        <Form
          className={`${ThemeColor.Slate_Pseudo} mb-10`}
          label={{ name: "confirmPassword", description: "確認新密碼" }}
          handleChange={handleChange}
          errorHint={{
            status:
              newPasswordInfo.password !== newPasswordInfo.confirmPassword ||
              newPasswordInfo.confirmPassword.length === 0,
            message: "請確認密碼是否一致",
          }}
        />
        <div className="mb-10 flex justify-start">
          <Button
            label="送出"
            buttonColor={ThemeColor.Primary}
            underline="no-underline"
            className={`${ThemeColor.Primary_Pseudo} h-10 max-w-[70px] text-sm md:h-14`}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </>
  );
}
