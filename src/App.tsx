import React from "react";

import { Routes, Route } from "react-router-dom";

import Nav from "./Layout/Nav";
import Login from "./pages/login/Login";
import Regist from "./pages/login/Regist";
import FindPassword from "./pages/login/FindPassword";
import ChangePassword from "./pages/login/ChangePassword";
import FindPasswordSuccess from "./pages/login/FindPasswordSuccess";
import Edit from "./pages/home/Edit";
import Home from "./pages/home/Home";

import Shorten from "./pages/home/Shorten";

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route path="/" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/findpassword/success" element={<FindPasswordSuccess />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/changepassword/:token" element={<ChangePassword />} />
        <Route path="/home" element={<Home />}>
          <Route path="/home" element={<Shorten />}>
            <Route path="edit/:urlID" element={<Edit />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}
