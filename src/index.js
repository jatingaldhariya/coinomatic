import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export const server = "https://api.coingecko.com/api/v3";
export const server2 = "https://openapiv1.coinstats.app";
