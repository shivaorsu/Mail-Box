import ReactDOM from "react-dom/client";
import Store from "./Store/index";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={Store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </Provider>
);
