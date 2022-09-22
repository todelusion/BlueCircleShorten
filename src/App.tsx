import React from "react";

import { Routes, Route } from "react-router-dom";

import { ApiContext } from "./hooks/useApi";

import Login from "./pages/Login";

const api = {
  baseUrl: "https://challenge.thef2e.com/api/thef2e2019/stage6",
  token: "Bearer saSb3FzqHIjWaweZP9llX8Y9oixK9X7aZZq5jPyq9XFnFUdOdUwuZc5iTZwv",
};

export default function Router(): JSX.Element {
  return (
    <ApiContext.Provider value={api}>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </ApiContext.Provider>
  );
}
