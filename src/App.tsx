import React from "react";

import { Routes, Route } from "react-router-dom";

import { ApiProvider } from "./context/ApiContext";
import Nav from "./Layout/Nav";
import Login from "./pages/Login";
import Regist from "./pages/Regist";
import FindPassword from "./pages/FindPassword";
import ChangePassword from "./pages/ChangePassword";

export default function Router(): JSX.Element {
  return (
    <ApiProvider>
      <Routes>
        <Route path="/" element={<Nav />}>
          <Route path="/" element={<Login />} />
          <Route path="/regist" element={<Regist />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Route>
      </Routes>
    </ApiProvider>
  );
}
