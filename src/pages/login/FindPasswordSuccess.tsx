import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { ThemeColor } from "../../types/Enum";
import useApi from "../../hooks/useApi";

const FindPasswordSuccess = (): JSX.Element => {
  const { dispatch } = useApi();
  return (
    <div className="h-20 w-full max-w-sm">
      <Link to="/" onClick={() => dispatch({ type: "RESET" })}>
        <Button
          label="送出成功，請查看信箱"
          buttonColor={ThemeColor.Black}
          underline="no-underline"
          className={`${ThemeColor.Primary_Pseudo} mb-10 text-sm`}
        />
      </Link>
    </div>
  );
};

export default FindPasswordSuccess;
