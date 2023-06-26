import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import "./index.css";

import axios from "axios";

axios.defaults.withCredentials = true;

const handleBeforeUnload = () => {
  // Save the current page URL in localStorage
  localStorage.setItem("previousPage", window.location.href);
};

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

// Listen for the beforeunload event to save the current page URL
window.addEventListener("beforeunload", handleBeforeUnload);
