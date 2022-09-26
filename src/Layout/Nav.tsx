import React from "react";
import { Outlet, Link } from "react-router-dom";
import LogoPath from "../assets/logo.svg";
import useApi from "../hooks/useApi";

const Nav = (): JSX.Element => {
  const { dispatch } = useApi();

  return (
    <div className="flex h-screen items-center justify-center py-5">
      <Link
        to="/"
        onClick={() => {
          dispatch({ type: "RESET" });
        }}
      >
        <img
          src={LogoPath}
          alt="LOGO"
          className="absolute top-3 left-3 w-32 lg:hidden"
        />
      </Link>
      <div className="-mt-10 flex w-full items-center justify-center px-8">
        <Link
          to="/"
          onClick={() => {
            dispatch({ type: "RESET" });
          }}
          className="mr-32 hidden w-max lg:block"
        >
          <img src={LogoPath} alt="LOGO" className="w-72" />
        </Link>
        <Outlet />
      </div>
    </div>
  );
};
export default Nav;
