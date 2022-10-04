import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import StatusModal from "../../components/StatusModal";
import useApi from "../../hooks/useApi";
import usePendingStatus from "../../hooks/usePendingStatus";
import { PendingType } from "../../types/Enum";
import axiosPATCH from "../../utils/axiosPATCH";

const Redirect = (): JSX.Element => {
  const { pendingResult, setPendingStatus } = usePendingStatus();
  const params = useParams();
  const navigate = useNavigate();
  const { baseUrl } = useApi();
  const { token, name } = params;

  useEffect(() => {
    setPendingStatus(PendingType.isPending, true);
    if (token === undefined || name === undefined) {
      setPendingStatus(PendingType.isError, true, "登入錯誤請再試一次");
      setTimeout(() => {
        setPendingStatus(PendingType.isError, false);
      }, 2000);
      return;
    }
    const newName = name?.replaceAll(/(name)=+/g, "");

    sessionStorage.setItem("token", token);
    axiosPATCH({
      url: `${baseUrl}/users/profile`,
      body: { name: newName },
      token,
    })
      .then(() => {
        navigate("/home");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <StatusModal pendingResult={pendingResult} />
    </div>
  );
};

export default Redirect;
