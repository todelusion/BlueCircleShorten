import React, { MouseEventHandler, ReactNode } from "react";
import Form from "../../components/Form";
import { ThemeColor } from "../../types/Enum";
import { useHome } from "./Home";

import { iconTrashPath, iconChartPath, iconEditPath } from "../../assets/icon";
import useApi from "../../hooks/useApi";

const Shorten = (): JSX.Element => {
  const { baseShorten } = useApi();
  const { urlLists } = useHome();
  if (urlLists === null || urlLists === undefined) return <p>Loading</p>;

  return (
    <div className="flex h-screen w-full justify-center pt-56 xl:justify-between">
      <ul className="grid w-full grid-cols-1 justify-items-center gap-x-5 gap-y-5 xl:w-1/2 xl:grid-cols-2">
        {urlLists.urlList.map((urlList) => (
          <li key={urlList.urlId} className="w-full max-w-lg">
            <div
              className={`lg-Pseudo box-shadow flex h-60 flex-col justify-between border-2 bg-white py-3 px-4 ${ThemeColor.Black} ${ThemeColor.Slate_Pseudo}`}
            >
              <div className="relative">
                {urlList.tag.map((tag) => (
                  <button
                    type="button"
                    className="rounded-lg bg-slate-600 px-2 py-1 text-xs text-white"
                  >
                    {`#${tag as string}`}
                  </button>
                ))}
                <img
                  src={iconTrashPath}
                  alt="delete"
                  className="absolute top-0 right-0"
                />
              </div>
              <div className="grid max-w-md grid-cols-3 items-center justify-items-center">
                <p className="w-max text-center">
                  <span className="text-4xl font-black">
                    {urlList.notRepeatTimes}
                  </span>
                  <br />
                  點擊次數
                </p>
                <img src={iconChartPath} alt="chart" />
                <img src={iconEditPath} alt="edit" />
                <input
                  type="button"
                  onClick={(e: React.MouseEvent<HTMLElement>) => {
                    const inputValue =
                      baseShorten + (e.target as HTMLInputElement).value;
                    console.log(inputValue);

                    // navigator.clipboard
                    //   .writeText(inputValue)
                    //   .catch((error) => console.log(error));
                    // console.log((e.target as HTMLInputElement).value);
                  }}
                  value={`${baseShorten.replace("https://", "")}/${
                    urlList.shortUrl
                  }`}
                  className="col-span-3 max-w-md text-2xl font-black"
                />
                <p className="col-span-3 max-w-md truncate text-xs font-light">{`${baseShorten}/${urlList.url}`}</p>
              </div>
            </div>
          </li>
        ))}
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
