import React from "react";

import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import { ApiProvider } from "./context/ApiContext";

export default function Router(): JSX.Element {
  return (
    <ApiProvider>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </ApiProvider>
  );
}
