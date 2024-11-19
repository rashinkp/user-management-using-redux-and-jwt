import React from "react";
import { Outlet } from "react-router-dom";
import UserHead from "../components/user/UserHead";

const UserLayout = () => {
  return (
    <div>
      <UserHead />
      <div className="user-layout">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
