import React from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";

const AdminLayout = () => {
  return (
    <div>
      <AdminHeader />
      <div className="admin-layout">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
