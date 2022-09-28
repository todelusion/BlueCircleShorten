import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Form from "../../components/Form";
import { ThemeColor } from "../../types/Enum";
import {
  iconTrashPath,
  iconAddPath,
  iconChartPath,
  iconEditPath,
} from "../../assets/icon";
import Button from "../../components/Button";

const Home = (): JSX.Element => (
  <>
    <ul className="absolute top-10 w-full max-w-2xl px-3">
      <li className="border2 mb-10 flex justify-center">
        <Form
          className={`h-max w-full rounded-full  ${ThemeColor.Slate_Pseudo} after:rounded-full `}
          label={{ name: "TEST", description: "TEST" }}
          hideLabel="hidden"
        />
        <Button
          label={
            (
              <img src={iconAddPath} alt="add" className="inline w-7" />
            ) as ReactNode
          }
          buttonColor={`${ThemeColor.Black} rounded-full`}
          underline="no-underline"
          className={`${ThemeColor.Primary_Pseudo} ml-11 h-14 max-w-[70px] rounded-full after:rounded-full`}
        />
      </li>
      <li className="ml-5">
        <Form
          className="w-full max-w-[100px] xs:max-w-[200px]"
          label={{ name: "TEST", description: "TEST" }}
          hideLabel="hidden"
          showSearchIcon
          showOutline={false}
        />
      </li>
    </ul>

    <Outlet />
  </>
);

export default Home;
