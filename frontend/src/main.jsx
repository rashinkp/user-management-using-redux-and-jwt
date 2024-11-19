import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"; // Add ToastContainer import
import "react-toastify/dist/ReactToastify.css";
import router from "./router.jsx";
import { Provider } from "react-redux";
import store from "./store/store.js";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
