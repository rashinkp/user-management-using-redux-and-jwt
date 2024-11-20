import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const adminInfo = useSelector((state) => state.adminAuth.adminInfo);
  const navigate = useNavigate();

  if (!adminInfo) {
    return navigate("/admin/login");
  }

  return Component ? Component : null;
};

export default PrivateRoute;
