import React from "react";

import { Routes, Route } from "react-router-dom";

import { ApiProvider } from "./context/ApiContext";
import Nav from "./Layout/Nav";
import Login from "./pages/login/Login";
import Regist from "./pages/login/Regist";
import FindPassword from "./pages/login/FindPassword";
import ChangePassword from "./pages/login/ChangePassword";

export default function Router(): JSX.Element {
  return (
    <ApiProvider>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="/" element={<Login />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/changepassword/:id" element={<ChangePassword />} />
        </Route>
      </Routes>
    </ApiProvider>
  );
}
