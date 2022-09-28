import React from "react";
import Form from "../../components/Form";
import { ThemeColor } from "../../types/Enum";

const Shorten = (): JSX.Element => {
  console.log("this is shorten pages");
  return (
    <div className="flex h-screen w-full justify-center pt-56 xl:justify-between">
      <ul className="grid w-full grid-cols-1 justify-items-center gap-x-5 gap-y-5 xl:w-1/2 xl:grid-cols-2">
        <li className="w-full max-w-lg">
          <div
            className={`lg-Pseudo box-shadow h-60 border-2 bg-white ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
          >
            Shorten is right here
          </div>
        </li>
        <li className="w-full max-w-lg">
          <div
            className={`lg-Pseudo box-shadow h-60 w-full max-w-lg border-2 bg-white ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
          >
            Shorten is right here
          </div>
        </li>
        <li className="w-full max-w-lg">
          <div
            className={`lg-Pseudo box-shadow h-60 w-full max-w-lg border-2 bg-white ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
          >
            Shorten is right here
          </div>
        </li>
        <li className="w-full max-w-lg">
          <div
            className={`lg-Pseudo box-shadow h-60 w-full max-w-lg border-2 bg-white ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
          >
            Shorten is right here
          </div>
        </li>
        <li>
          <div
            className={`lg-Pseudo box-shadow h-60 w-full max-w-lg border-2 bg-white ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
          >
            Shorten is right here
          </div>
        </li>
        <li>
          <div
            className={`lg-Pseudo box-shadow h-60 w-full max-w-lg border-2 bg-white ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
          >
            Shorten is right here
          </div>
        </li>
        <li>
          <div
            className={`lg-Pseudo box-shadow h-60 w-full max-w-lg border-2 bg-white ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
          >
            Shorten is right here
          </div>
        </li>
      </ul>
      <div
        className={`lg-Pseudo box-shadow hidden h-60 w-1/3 border-2 bg-white xl:block ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
      >
        <p className="font-dela text-4xl">預留位</p>
      </div>
    </div>
  );
};

export default Shorten;
