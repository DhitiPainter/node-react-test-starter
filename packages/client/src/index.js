import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";

import "./index.css";
import App from "./App";
import store from "./store/store";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <Provider store={store}>
    <div data-testid="error">{toast.configure()}</div>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can changes
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
