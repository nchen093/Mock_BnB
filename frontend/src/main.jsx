import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import configureStore from "./store";
import * as sessionActions from "./store/session";
import "./index.css";
import { Provider } from "react-redux";
import { restoreCSRF, csrfFetch } from "./store/csrf";

const store = configureStore();

if (import.meta.env.MODE !== "production") {
  restoreCSRF();

  window.csrfFetch = csrfFetch;
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
