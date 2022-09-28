import React, { ReactNode } from "react";
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
    <div className="absolute top-10 flex w-full items-end justify-center px-3 ">
      <Form
        className={`h-max w-full max-w-md rounded-full  ${ThemeColor.Slate_Pseudo} after:rounded-full `}
        label={{ name: "TEST", description: "TEST" }}
        hideLabel="hidden"
        showSearchIcon
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
    </div>
    <div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat quam
        rem neque voluptatum minus similique necessitatibus velit enim ratione
        porro?
      </p>
    </div>
  </>
);

export default Home;
