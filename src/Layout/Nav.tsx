import React from "react";
import { Outlet, Link } from "react-router-dom";
import LogoPath from "../assets/logo.svg";

const Nav = (): JSX.Element => (
  <div className="flex h-screen items-center justify-center py-5">
    <Link to="/">
      <img
        src={LogoPath}
        alt="LOGO"
        className="absolute top-3 left-3 w-32 lg:hidden"
      />
    </Link>
    <div className="-mt-10 flex w-full items-center justify-center px-8">
      <Link to="/" className="mr-32 w-max">
        <img src={LogoPath} alt="LOGO" className="hidden w-72 lg:block" />
      </Link>
      <Outlet />
    </div>
  </div>
);
export default Nav;
