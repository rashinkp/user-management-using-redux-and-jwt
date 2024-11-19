import React from "react";
import Head from "./components/Head";
import { Outlet } from "react-router-dom";
import { Container } from "postcss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <>
      <Head />
      <ToastContainer />
      <Outlet />
    </>
  );
};

export default App;
