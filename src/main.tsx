import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";

import App from "./App";
import { ApiProvider } from "./context/ApiContext";
import "./assets/tailwind.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <ApiProvider>
        <App />
      </ApiProvider>
    </HashRouter>
  </React.StrictMode>
);
