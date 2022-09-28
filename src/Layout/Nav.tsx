import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import LogoPath from "../assets/logo.svg";
import useApi from "../hooks/useApi";

const Nav = (): JSX.Element => {
  const { dispatch } = useApi();
  const { pathname } = useLocation();
  console.log();

  return (
    <div className="flex h-screen items-center justify-center py-5">
      <Link
        to={pathname.startsWith("/home") ? "/home" : "/"}
        onClick={() => {
          dispatch({ type: "RESET" });
        }}
        className={`absolute top-3 left-3 max-w-[128px] ${
          pathname.startsWith("/home") ? "block lg:max-w-[170px]" : "lg:hidden"
        }`}
      >
        <img src={LogoPath} alt="LOGO" className="w-full" />
      </Link>
      <div
        className={`${
          pathname.startsWith("/home") ? "flex-col" : ""
        } mt-10 flex w-full items-center justify-center px-8`}
      >
        {!pathname.startsWith("/home") && (
          <Link
            to="/"
            onClick={() => {
              dispatch({ type: "RESET" });
            }}
            className="mr-32 hidden w-max lg:block"
          >
            <img src={LogoPath} alt="LOGO" className="w-72" />
          </Link>
        )}
        <Outlet />
      </div>
    </div>
  );
};
export default Nav;
