import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/pages/App/App";
import "./index.scss";
import { Provider } from "react-redux";
import store from "./services/reducers/store";

const rootElement = document.getElementById("root") as HTMLElement;

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}
