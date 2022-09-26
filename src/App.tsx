import React from "react";

import { Routes, Route } from "react-router-dom";

import Nav from "./Layout/Nav";
import Login from "./pages/login/Login";
import Regist from "./pages/login/Regist";
import FindPassword from "./pages/login/FindPassword";
import ChangePassword from "./pages/login/ChangePassword";
import Home from "./pages/home/Home";
import FindPasswordSuccess from "./pages/login/FindPasswordSuccess";

export default function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route path="/" element={<Login />} />
        <Route path="/regist" element={<Regist />} />
        <Route path="/findpassword" element={<FindPassword />} />
        <Route path="/findpassword/success" element={<FindPasswordSuccess />} />
        <Route path="/changepassword" element={<ChangePassword />} />
        <Route path="/changepassword/:id" element={<ChangePassword />} />
      </Route>
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}
