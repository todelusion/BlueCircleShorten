import React from "react";

import LogoPath from "../assets/logo.svg";

export default function Form(): JSX.Element {
  return (
    <>
      <img src={LogoPath} alt="LOGO" className="mt-3 ml-3 w-40" />
      <div className="flex justify-center px-8">
        <div className="w-full max-w-sm border-2 border-black bg-white py-3 px-5">
          <p>電子郵件</p>
          <input
            type="text"
            className="w-full border-b-2 border-black outline-none"
          />
        </div>
      </div>
    </>
  );
}
