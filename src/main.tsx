import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/pages/App/App";
import "./index.scss";

const rootElement = document.getElementById("root") as HTMLElement;

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
