import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button";
import { ThemeColor } from "../../types/Enum";

const FindPasswordSuccess = (): JSX.Element => (
  <div className="mx-auto h-10 max-w-sm">
    <Link to="/">
      <Button
        label="送出成功"
        buttonColor={ThemeColor.Primary}
        underline="no-underline"
        className={`${ThemeColor.Primary_Pseudo} mb-10 text-sm`}
      />
    </Link>
  </div>
);

export default FindPasswordSuccess;
